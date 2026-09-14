// ============================================================
// Flash Passagem de Turno
// Envia resumo de turno para Google Chat via webhook
// ============================================================

var PASSAGEM_TURNO_WEBHOOK_ =
  'https://chat.googleapis.com/v1/spaces/AAAAJaf6vHA/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=lz0cWcjsxvS6dIDE07iwxW-y1myfQDBoBAXciG8EBHM';

// ----- Funções públicas (Acionadores do Menu) -----

function enviarFlashPassagemProgramacao() {
  var dados = coletarDadosPassagemTurno_();
  var payload = montarPayloadPassagemTurnoChat_(dados, 'PROGRAMACAO');
  var result = enviarPassagemTurnoChat_(payload);
  toast_(SpreadsheetApp.getActiveSpreadsheet(), 'Flash: Programação enviado!');
  return { ok: true, chat: result };
}

function enviarFlashPassagemJornada() {
  var dados = coletarDadosPassagemTurno_();
  var payload = montarPayloadPassagemTurnoChat_(dados, 'JORNADA');
  var result = enviarPassagemTurnoChat_(payload);
  toast_(SpreadsheetApp.getActiveSpreadsheet(), 'Flash: Jornada Interna enviado!');
  return { ok: true, chat: result };
}

function enviarFlashPassagemDisponibilidade() {
  var dados = coletarDadosPassagemTurno_();
  var payload = montarPayloadPassagemTurnoChat_(dados, 'DISPONIBILIDADE');
  var result = enviarPassagemTurnoChat_(payload);
  toast_(SpreadsheetApp.getActiveSpreadsheet(), 'Flash: Disponibilidade enviado!');
  return { ok: true, chat: result };
}

/** @deprecated Mantido apenas para transição **/
function executarFlashPassagemTurnoAgora() {
  var dados = coletarDadosPassagemTurno_();
  var payload = montarPayloadPassagemTurnoChat_(dados, 'FULL');
  var result = enviarPassagemTurnoChat_(payload);
  toast_(SpreadsheetApp.getActiveSpreadsheet(), 'Flash Passagem de Turno COMPLETO enviado!');
  return { ok: true, data: dados, chat: result };
}

// ----- Coleta de dados -----
function coletarDadosPassagemTurno_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tz = Session.getScriptTimeZone() || 'America/Sao_Paulo';
  var agora = new Date();
  var hoje = toDateOnly_(agora);
  var ontem = new Date(hoje.getTime());
  ontem.setDate(hoje.getDate() - 1);

  var dataRef = Utilities.formatDate(hoje, tz, 'dd/MM/yyyy');
  var dataRefOntem = Utilities.formatDate(ontem, tz, 'dd/MM/yyyy');
  var horaAtual = Utilities.formatDate(agora, tz, 'dd/MM/yyyy HH:mm:ss');

  // ========== DISPONIBILIDADE ==========
  var shDisp = findSheetCaseInsensitive_(ss, 'DISPONIBILIDADE');
  if (!shDisp) throw new Error('Aba DISPONIBILIDADE não encontrada.');
  var dispHeaderRow = (typeof getDisponibilidadeHeaderRow_ === 'function' ? getDisponibilidadeHeaderRow_() : 1) || 1;
  var dispMap = mapHeaders_(shDisp, dispHeaderRow);
  var cDispData = getHeaderColOptional_(dispMap, ['DATA']);
  var cDispPerfil = getHeaderColRequired_(dispMap, ['PERFIL'], 'DISPONIBILIDADE');
  var cDispStatus = getHeaderColRequired_(dispMap, ['DISPONIBILIDADE'], 'DISPONIBILIDADE');
  var cDispPlaca = getHeaderColRequired_(dispMap, ['PLACA'], 'DISPONIBILIDADE');
  var cDispMotorista = getHeaderColOptional_(dispMap, ['MOTORISTA']);
  var cDispPlano = getHeaderColOptional_(dispMap, ['PLANO', 'PLANO DE VIAGEM', 'PLANO VIAGEM', 'SITUACAO', 'SITUAÇÃO']);
  var dispRows = getSheetDataRowsDisplay_(shDisp, shDisp.getLastColumn(), dispHeaderRow);

  var programados = 0;
  var disponiveis = 0;
  var indisponiveis = 0;
  var totalDisp = 0;
  var veiculosComPlano = [];
  var veiculosDisponiveis = [];
  var seen = {};

  for (var i = 0; i < dispRows.length; i++) {
    var row = dispRows[i] || [];
    // Filtrar pela data de hoje OU ontem (transição de turno)
    var ontem = new Date(hoje.getTime());
    ontem.setDate(hoje.getDate() - 1);

    if (cDispData) {
      var dtDisp = parseDateBR_(row[cDispData - 1]) || toDateOnly_(row[cDispData - 1]);
      if (!dtDisp || (!isSameDay_(dtDisp, hoje) && !isSameDay_(dtDisp, ontem))) continue;
    }
    var placa = String(row[cDispPlaca - 1] || '').trim();
    var placaNorm = normalizePlate_(placa);
    if (placaNorm) {
      if (seen[placaNorm]) continue;
      seen[placaNorm] = true;
    }

    totalDisp++;
    var statusRaw = String(row[cDispStatus - 1] || '').trim();
    var statusNorm = normalizeHeader_(statusRaw);
    var perfil = canonicalizarTipoFlash_(row[cDispPerfil - 1]) || 'OUTROS';
    var motorista = cDispMotorista ? String(row[cDispMotorista - 1] || '').trim() : '';
    var planoVal = cDispPlano ? String(row[cDispPlano - 1] || '').trim() : '';

    if (statusNorm === normalizeHeader_('Programado')) {
      programados++;
      veiculosComPlano.push({
        placa: placa || '-',
        motorista: motorista || '-',
        perfil: perfil,
        plano: planoVal
      });
    } else if (statusNorm === normalizeHeader_('Indisponível')) {
      indisponiveis++;
    } else {
      // Disponível / vazio
      disponiveis++;
      veiculosDisponiveis.push({
        placa: placa || '-',
        motorista: motorista || '-',
        perfil: perfil
      });
    }
  }

  // ========== MAPA PERFIL POR PLACA (a partir da Disponibilidade já processada) ==========
  var perfilPorPlaca = {};
  var todosVeicDisp = veiculosComPlano.concat(veiculosDisponiveis);
  for (var ppi = 0; ppi < todosVeicDisp.length; ppi++) {
    var vd = todosVeicDisp[ppi];
    if (vd.placa && vd.perfil) {
      perfilPorPlaca[normalizePlate_(vd.placa) || vd.placa] = vd.perfil;
    }
  }

  // ========== JORNADA INTERNA ==========
  var shJornada = findSheetCaseInsensitive_(ss, getJornadaSheetName_());
  var jornadaData = {
    carregadosLiberados: 0,
    emCarregamento: 0,
    naoIniciado: 0,
    somaDuracaoMs: 0,
    totalFinalizados: 0,
    tempoMedioMin: 0,
    veiculosCarregados: [],
    veiculosEmCarregamento: [],
    veiculosNoShow: [],
    somaMsPorPerfil: {},
    countPorPerfil: {},
    mediaPorPerfil: {}
  };

  if (shJornada) {
    var jMap = mapHeaders_(shJornada, 1);
    var cJData = getHeaderColOptional_(jMap, ['DATA']);
    var cJChkIn = getHeaderColOptional_(jMap, ['CHEGADA NO CD']);
    var cJChkOut = getHeaderColOptional_(jMap, ['SAIDA DO CD', 'SAÍDA DO CD']);
    var cJHoraIn = getHeaderColOptional_(jMap, ['HORA CHEGADA']);
    var cJHoraOut = getHeaderColOptional_(jMap, ['HORA SAIDA', 'HORA SAÍDA']);
    var cJDur = getHeaderColOptional_(jMap, ['JORNADA INTERNA']);
    var cJClass = getHeaderColOptional_(jMap, ['CLASSIFICACAO JORNADA', 'CLASSIFICAÇÃO JORNADA']);
    var cJPlaca = getHeaderColOptional_(jMap, ['PLACA']);
    var cJMotorista = getHeaderColOptional_(jMap, ['MOTORISTA']);
    var cJPlano = getHeaderColOptional_(jMap, ['PLANO DE VIAGEM']);
    var cJPerfil = getHeaderColOptional_(jMap, ['PERFIL DO VEICULO', 'PERFIL DO VEÍCULO', 'PERFIL', 'TIPO VEICULO', 'TIPO VEÍCULO', 'TIPO']);

    var jLastRow = shJornada.getLastRow();
    var jLastCol = shJornada.getLastColumn();

    if (jLastRow > 1 && jLastCol > 0) {
      var jDisplay = shJornada.getRange(2, 1, jLastRow - 1, jLastCol).getDisplayValues();
      var jValues = shJornada.getRange(2, 1, jLastRow - 1, jLastCol).getValues();

      for (var j = 0; j < jDisplay.length; j++) {
        var jRow = jDisplay[j] || [];
        var jRowVal = jValues[j] || [];

        // IDENTIFICAÇÃO DE "HOJE" OU "ONTEM CRUZA MEIA-NOITE" NA JORNADA
        var dateToCompare = null;
        var hInVal = cJHoraIn ? jRowVal[cJHoraIn - 1] : null;
        var hOutVal = cJHoraOut ? jRowVal[cJHoraOut - 1] : null;
        
        if (hInVal instanceof Date && hInVal.getFullYear() > 2000) dateToCompare = toDateOnly_(hInVal);
        else if (hOutVal instanceof Date && hOutVal.getFullYear() > 2000) dateToCompare = toDateOnly_(hOutVal);
        else if (cJData) dateToCompare = parseDateBR_(jRow[cJData - 1]) || toDateOnly_(jRowVal[cJData - 1]);

        var ontem = new Date(hoje.getTime());
        ontem.setDate(hoje.getDate() - 1);

        var isToday = dateToCompare && isSameDay_(dateToCompare, hoje);
        var isYesterday = dateToCompare && isSameDay_(dateToCompare, ontem);

        if (!isToday && !isYesterday) continue;

        var placaVal = cJPlaca ? String(jRow[cJPlaca - 1] || '').trim() : '';
        var planoVal = cJPlano ? String(jRow[cJPlano - 1] || '').trim() : '';
        if (!placaVal && !planoVal) continue;

        var jMot = cJMotorista ? String(jRow[cJMotorista - 1] || '').trim() : '';
        var jPerf = cJPerfil ? String(jRow[cJPerfil - 1] || '').trim().toUpperCase() : '';
        // Normaliza perfil para categorias padrão
        if (jPerf.indexOf('FIORINO') !== -1) jPerf = 'FIORINO';
        else if (jPerf.indexOf('HR') !== -1 || jPerf.indexOf('VAN') !== -1) jPerf = 'HR/VAN';
        else if (jPerf.indexOf('VUC') !== -1) jPerf = 'VUC';
        else if (jPerf.indexOf('TOCO') !== -1) jPerf = 'TOCO';
        else if (jPerf.indexOf('CAVALO') !== -1 || jPerf.indexOf('CARRETA') !== -1) jPerf = 'CAVALO';
        // Fallback: busca perfil pelo mapa da Disponibilidade (cruza por placa)
        if (!jPerf && placaVal) {
          var placaNormJ = (typeof normalizePlate_ === 'function' ? normalizePlate_(placaVal) : null) || placaVal;
          jPerf = perfilPorPlaca[placaNormJ] || '';
        }
        var chegou = false;
        var saiu = false;

        if (cJChkIn) {
          var chkInRaw = jRowVal[cJChkIn - 1];
          var chkInDisp = String(jRow[cJChkIn - 1] || '').trim().toUpperCase();
          chegou = (chkInRaw === true || chkInDisp === 'TRUE' || chkInDisp === 'CHECKED');
        }
        if (cJChkOut) {
          var chkOutRaw = jRowVal[cJChkOut - 1];
          var chkOutDisp = String(jRow[cJChkOut - 1] || '').trim().toUpperCase();
          saiu = (chkOutRaw === true || chkOutDisp === 'TRUE' || chkOutDisp === 'CHECKED');
        }

        if (chegou && saiu) {
          var duracaoStr = cJDur ? String(jRow[cJDur - 1] || '').trim() : '';
          var classeStr = cJClass ? String(jRow[cJClass - 1] || '').trim() : '';
          
          jornadaData.carregadosLiberados++;
          jornadaData.veiculosCarregados.push({
            placa: placaVal,
            motorista: jMot,
            duracao: duracaoStr,
            classificacao: classeStr,
            perfil: jPerf
          });
          if (cJHoraIn && cJHoraOut) {
            var hIn = jRowVal[cJHoraIn - 1];
            var hOut = jRowVal[cJHoraOut - 1];
            if (hIn instanceof Date && hOut instanceof Date && hOut.getTime() >= hIn.getTime()) {
              var durMs = hOut.getTime() - hIn.getTime();
              jornadaData.somaDuracaoMs += durMs;
              jornadaData.totalFinalizados++;
              // Acumula por perfil
              if (jPerf) {
                jornadaData.somaMsPorPerfil[jPerf] = (jornadaData.somaMsPorPerfil[jPerf] || 0) + durMs;
                jornadaData.countPorPerfil[jPerf] = (jornadaData.countPorPerfil[jPerf] || 0) + 1;
              }
            }
          }
        } else if (chegou && !saiu) {
          jornadaData.emCarregamento++;
          jornadaData.veiculosEmCarregamento.push({ placa: placaVal, motorista: jMot });
        } else {
          jornadaData.naoIniciado++;
          jornadaData.veiculosNoShow.push({ placa: placaVal, motorista: jMot });
        }
      }
    }
  }

  if (jornadaData.totalFinalizados > 0) {
    jornadaData.tempoMedioMin = Math.round((jornadaData.somaDuracaoMs / jornadaData.totalFinalizados) / 60000);
  }
  // Calcula média por perfil
  var perfilKeys = Object.keys(jornadaData.countPorPerfil);
  for (var pk = 0; pk < perfilKeys.length; pk++) {
    var pKey = perfilKeys[pk];
    var pCount = jornadaData.countPorPerfil[pKey];
    var pSoma = jornadaData.somaMsPorPerfil[pKey];
    if (pCount > 0) {
      jornadaData.mediaPorPerfil[pKey] = { mediaMin: Math.round(pSoma / pCount / 60000), count: pCount };
    }
  }

  return {
    dataRef: dataRef,
    dataRefOntem: dataRefOntem,
    horaAtual: horaAtual,
    programados: programados,
    disponiveis: disponiveis,
    indisponiveis: indisponiveis,
    totalDisp: totalDisp,
    veiculosComPlano: veiculosComPlano,
    veiculosDisponiveis: veiculosDisponiveis,
    jornada: jornadaData
  };
}

// ----- Montagem do payload do Google Chat -----
function montarPayloadPassagemTurnoChat_(data, tema) {
  var d = data || {};
  var t = (tema || 'FULL').toUpperCase();
  
  var useDate = (t === 'JORNADA') ? d.dataRefOntem : d.dataRef;
  
  var sections = [];
  var title = '🔄 FLASH PASSAGEM DE TURNO';
  var fallbackText = 'FLASH PASSAGEM DE TURNO';

  // --- SEÇÃO 1: STATUS DE PROGRAMAÇÃO ---
  if (t === 'PROGRAMACAO' || t === 'FULL') {
    var frotaAtiva = d.programados + d.disponiveis;
    var pctUtil = frotaAtiva > 0 ? Math.round((d.programados / frotaAtiva) * 100) : 0;
    if (pctUtil > 100) pctUtil = 100;

    var resumoText =
      '<b>📊 Resumo de Programação</b><br>' +
      '🚛 Programados: <b>' + d.programados + '</b> &nbsp;|&nbsp; ' +
      '🎯 Utilização: <b>' + pctUtil + '%</b> (Frota Ativa: ' + frotaAtiva + ')';

    var linhasComPlano = (d.veiculosComPlano || []).map(function (v, idx) {
      var planoStr = v.plano ? ' — Plano: <b>' + escapeHtmlForChat_(v.plano) + '</b>' : '';
      return '🟢 ' + (idx + 1) + '. <b>' + escapeHtmlForChat_(v.placa) + '</b> — ' +
        escapeHtmlForChat_(v.motorista) + ' (' + escapeHtmlForChat_(v.perfil) + ')' + planoStr;
    });
    if (!linhasComPlano.length) linhasComPlano.push('⚪ <b>Nenhum veículo programado</b>');

    sections.push({
      widgets: [{ textParagraph: { text: resumoText } }]
    });
    sections.push({
      header: '🚛 Lista de Programados (' + (d.veiculosComPlano || []).length + ')',
      widgets: [{ textParagraph: { text: linhasComPlano.join('<br>') } }]
    });
    
    if (t === 'PROGRAMACAO') {
      title = '📱 PASSAGEM DE TURNO: PROGRAMAÇÃO';
      fallbackText = 'Flash Programação | ' + d.programados + ' veíc.';
    }
  }

  // --- SEÇÃO 2: DISPONIBILIDADE E INDISPONÍVEIS ---
  if (t === 'DISPONIBILIDADE' || t === 'FULL') {
    var linhasDisponiveis = (d.veiculosDisponiveis || []).map(function (v, idx) {
      return '🔵 ' + (idx + 1) + '. <b>' + escapeHtmlForChat_(v.placa) + '</b> — ' +
        escapeHtmlForChat_(v.motorista) + ' (' + escapeHtmlForChat_(v.perfil) + ')';
    });
    if (!linhasDisponiveis.length) linhasDisponiveis.push('⚪ <b>Nenhum veículo disponível</b>');
    
    var resumoDisp = '✅ Disponíveis p/ 2º corte: <b>' + d.disponiveis + '</b> &nbsp;|&nbsp; ' +
                     '🚫 Indisponíveis: <b>' + d.indisponiveis + '</b>';

    sections.push({
      header: '🔵 Veículos Disponíveis (' + d.disponiveis + ')',
      widgets: [
        { textParagraph: { text: resumoDisp } },
        { textParagraph: { text: linhasDisponiveis.join('<br>') + '<br><br>📌 <i>Ofertar no segundo corte</i>' } }
      ]
    });
    
    if (t === 'DISPONIBILIDADE') {
      title = '🔵 PASSAGEM DE TURNO: DISPONIBILIDADE';
      fallbackText = 'Flash Disponibilidade | ' + d.disponiveis + ' disp.';
    }
  }

  // --- SEÇÃO 3: JORNADA INTERNA ---
  if (t === 'JORNADA' || t === 'FULL') {
    var jd = d.jornada || {};
    var tempoMedioStr = jd.tempoMedioMin > 0 ? formatarMinutos_(jd.tempoMedioMin) : '--:--';

    var stats = { normal: 0, medio: 0, critico: 0, total: 0 };
    var jornadaLines = [];
    
    // 1. Carregados
    jornadaLines.push('✅ Carregados e liberados: <b>' + jd.carregadosLiberados + '</b>');
    if (jd.veiculosCarregados && jd.veiculosCarregados.length) {
      for (var c = 0; c < jd.veiculosCarregados.length; c++) {
        var vc = jd.veiculosCarregados[c];
        var clNorm = normalizeHeader_(vc.classificacao || '');
        var color = '#777777'; 
        var label = vc.classificacao || 'N/A';
        
        if (clNorm.indexOf('CRITICO') !== -1) { stats.critico++; color = '#FF0000'; }
        else if (clNorm.indexOf('MEDIO') !== -1) { stats.medio++; color = '#E6AC00'; }
        else if (clNorm.indexOf('NORMAL') !== -1) { stats.normal++; color = '#008000'; }
        stats.total++;

        var infoExtra = ' — <b><font color="' + color + '">' + (vc.duracao ? vc.duracao + ' | ' : '') + label + '</font></b>';
        jornadaLines.push('&nbsp;&nbsp;&nbsp;&nbsp;• ' + escapeHtmlForChat_(vc.placa) + ' — ' + escapeHtmlForChat_(vc.motorista) + infoExtra);
      }
    }

    // 2. Em carregamento
    jornadaLines.push('⏳ Em carregamento: <b>' + jd.emCarregamento + '</b>');
    if (jd.veiculosEmCarregamento && jd.veiculosEmCarregamento.length) {
      for (var e = 0; e < jd.veiculosEmCarregamento.length; e++) {
        var ve = jd.veiculosEmCarregamento[e];
        jornadaLines.push('&nbsp;&nbsp;&nbsp;&nbsp;• ' + escapeHtmlForChat_(ve.placa) + ' — ' + escapeHtmlForChat_(ve.motorista));
      }
    }

    jornadaLines.push('⏱️ Tempo médio de carregamento: <b>' + tempoMedioStr + '</b>');

    sections.push({
      header: '🏭 Jornada Interna (CD/Armazém)',
      widgets: [{ textParagraph: { text: jornadaLines.join('<br>') } }]
    });

    // --- Resumo de classificação ---
    if (stats.total > 0) {
      var pNormal = Math.round((stats.normal / stats.total) * 100);
      var pMedio = Math.round((stats.medio / stats.total) * 100);
      var pCritico = Math.round((stats.critico / stats.total) * 100);

      var resText = '<b>📈 Resumo de Classificação:</b><br>' +
        '🟢 Normal: ' + pNormal + '% (' + stats.normal + ') | ' +
        '🟡 Médio: ' + pMedio + '% (' + stats.medio + ') | ' +
        '🔴 Crítico: ' + pCritico + '% (' + stats.critico + ')';

      sections.push({ widgets: [{ textParagraph: { text: resText } }] });
    }

    // --- Análise de tempo médio por perfil de veículo ---
    var mediaPorPerfil = jd.mediaPorPerfil || {};
    var perfilOrdem = ['FIORINO', 'HR/VAN', 'VUC', 'TOCO', 'CAVALO'];
    var perfilEmoji = { 'FIORINO': '🚗', 'HR/VAN': '🚐', 'VUC': '🚛', 'TOCO': '🚚', 'CAVALO': '🔴' };
    var perfilLines = [];
    // Perfis na ordem padrão
    for (var pi = 0; pi < perfilOrdem.length; pi++) {
      var pNome = perfilOrdem[pi];
      if (mediaPorPerfil[pNome]) {
        var pm = mediaPorPerfil[pNome];
        perfilLines.push((perfilEmoji[pNome] || '🚘') + ' ' + pNome + ': <b>' + formatarMinutos_(pm.mediaMin) + '</b> (' + pm.count + ' veic.)');
      }
    }
    // Perfis fora da ordem padrão (outros)
    var outrosPerfisMp = Object.keys(mediaPorPerfil);
    for (var opi = 0; opi < outrosPerfisMp.length; opi++) {
      var opNome = outrosPerfisMp[opi];
      if (perfilOrdem.indexOf(opNome) === -1) {
        var opm = mediaPorPerfil[opNome];
        perfilLines.push('🚘 ' + opNome + ': <b>' + formatarMinutos_(opm.mediaMin) + '</b> (' + opm.count + ' veic.)');
      }
    }
    if (perfilLines.length > 0) {
      var perfilText = '<b>📊 Média por Tipo de Veículo:</b><br>' + perfilLines.join('<br>');
      sections.push({ widgets: [{ textParagraph: { text: perfilText } }] });
    }

    if (t === 'JORNADA') {
      title = '🏭 JORNADA INTERNA Referente a ' + useDate;
      fallbackText = 'Jornada Interna | ' + jd.carregadosLiberados + ' ok | ' + jd.emCarregamento + ' em carg.';
    }
  }

  return {
    text: fallbackText + ' | Ref ' + useDate,
    cardsV2: [{
      cardId: 'flash_passagem_' + t.toLowerCase(),
      card: {
        header: {
          title: title,
          subtitle: '📅 Ref ' + useDate + ' | 🕒 Atualizado ' + d.horaAtual
        },
        sections: sections
      }
    }]
  };
}

// ----- Envio ao Google Chat -----
function enviarPassagemTurnoChat_(payload) {
  var webhook = PASSAGEM_TURNO_WEBHOOK_;
  if (typeof PropertiesService !== 'undefined') {
    try {
      var prop = PropertiesService.getScriptProperties().getProperty('FLASH_LAST_MILE_CHAT_WEBHOOK_URL');
      if (prop) webhook = prop;
    } catch (e) {}
  }
  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  var response = UrlFetchApp.fetch(webhook, options);
  return { code: response.getResponseCode(), body: response.getContentText() };
}

// ----- Utilitários -----
function formatarMinutos_(totalMinutos) {
  if (!totalMinutos || totalMinutos <= 0) return '--:--';
  var h = Math.floor(totalMinutos / 60);
  var m = totalMinutos % 60;
  return h + ':' + (m < 10 ? '0' : '') + m;
}
