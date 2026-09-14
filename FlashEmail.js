// ============================================================
// Flash Email — Envio de relatório operacional por email
// Diário / Semanal / Mensal
// Destinatários: Script Property "FLASH_EMAIL_DESTINATARIOS"
// (emails separados por vírgula)
// ============================================================

// ----- Funções públicas (Menu + Painel) -----

function enviarFlashEmailDiario() {
  return _enviarFlashEmail_('DIARIO', false);
}

function enviarFlashEmailSemanal() {
  return _enviarFlashEmail_('SEMANAL', false);
}

function enviarFlashEmailMensal() {
  return _enviarFlashEmail_('MENSAL', false);
}

// Teste: envia apenas para o remetente (você mesmo)
function enviarFlashEmailTeste() {
  return _enviarFlashEmail_('DIARIO', true);
}

// ----- Núcleo de envio -----

function _enviarFlashEmail_(periodo, isTeste) {
  var dados = coletarDadosPassagemTurno_();
  var html  = _montarHtmlEmail_(dados, periodo, isTeste);
  var assunto = (isTeste ? '[TESTE] ' : '') + _montarAssunto_(dados, periodo);

  var to, cc;
  if (isTeste) {
    to = Session.getEffectiveUser().getEmail();
    cc = undefined;
  } else {
    var dest = _getEmailDestinatarios_();
    to = dest.to;
    cc = dest.cc || undefined;
  }

  GmailApp.sendEmail(to, assunto, '', {
    htmlBody: html,
    cc: cc,
    name: 'THX Group — Operações Guarulhos'
  });

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var msg = isTeste
    ? 'TESTE enviado para: ' + to
    : 'Email ' + periodo.toLowerCase() + ' enviado para: ' + to;
  toast_(ss, msg);
  return { ok: true, periodo: periodo, teste: isTeste, to: to };
}

function _getEmailDestinatarios_() {
  var props = PropertiesService.getScriptProperties();
  var to  = (props.getProperty('FLASH_EMAIL_TO')  || 'erickramos@3coracoes.com.br').trim();
  var cc  = (props.getProperty('FLASH_EMAIL_CC')  || 'rodrigo@thxtransportes.com.br,anaerica@3coracoes.com.br,laurence@thxgroup.com.br,sidneidiniz@3coracoes.com').trim();
  return { to: to, cc: cc };
}

function _montarAssunto_(dados, periodo) {
  var tz  = Session.getScriptTimeZone() || 'America/Sao_Paulo';
  var agora = new Date();
  var labels = { DIARIO: 'Diário', SEMANAL: 'Semanal', MENSAL: 'Mensal' };

  if (periodo === 'SEMANAL') {
    var semInicio = new Date(agora);
    semInicio.setDate(agora.getDate() - agora.getDay() + 1); // segunda
    return '[THX] Flash Semanal — Semana de ' + Utilities.formatDate(semInicio, tz, 'dd/MM/yyyy');
  }
  if (periodo === 'MENSAL') {
    return '[THX] Flash Mensal — ' + Utilities.formatDate(agora, tz, 'MMMM/yyyy');
  }
  return '[THX] Flash Diário — ' + (dados.dataRef || Utilities.formatDate(agora, tz, 'dd/MM/yyyy'));
}

// ----- Montagem do HTML do email -----

function _montarHtmlEmail_(dados, periodo, isTeste) {
  var d   = dados || {};
  var jd  = d.jornada || {};
  var tz  = Session.getScriptTimeZone() || 'America/Sao_Paulo';
  var agora = new Date();

  var labels = { DIARIO: 'Diário', SEMANAL: 'Semanal', MENSAL: 'Mensal' };
  var labelPeriodo = labels[periodo] || periodo;

  var periodoStr = '';
  if (periodo === 'SEMANAL') {
    var sem = new Date(agora);
    sem.setDate(agora.getDate() - agora.getDay() + 1);
    var semFim = new Date(sem); semFim.setDate(sem.getDate() + 6);
    periodoStr = Utilities.formatDate(sem, tz, 'dd/MM') + ' a ' + Utilities.formatDate(semFim, tz, 'dd/MM/yyyy');
  } else if (periodo === 'MENSAL') {
    periodoStr = Utilities.formatDate(agora, tz, 'MMMM/yyyy');
  } else {
    periodoStr = d.dataRef || Utilities.formatDate(agora, tz, 'dd/MM/yyyy');
  }

  var tempoMedioStr = jd.tempoMedioMin > 0 ? _fmtMin_(jd.tempoMedioMin) : '--:--';

  // --- Veículos carregados ---
  var rowsCarregados = '';
  var stats = { normal: 0, medio: 0, critico: 0, total: 0 };
  if (jd.veiculosCarregados && jd.veiculosCarregados.length) {
    for (var i = 0; i < jd.veiculosCarregados.length; i++) {
      var vc = jd.veiculosCarregados[i];
      var clNorm = _normStr_(vc.classificacao || '');
      var cor = '#555555'; var bg = '#f8f8f8';
      if (clNorm.indexOf('CRITICO') !== -1)    { cor = '#cc0000'; bg = '#fff0f0'; stats.critico++; }
      else if (clNorm.indexOf('MEDIO') !== -1) { cor = '#b8860b'; bg = '#fffbe6'; stats.medio++;  }
      else if (clNorm.indexOf('NORMAL') !== -1){ cor = '#006400'; bg = '#f0fff0'; stats.normal++; }
      stats.total++;
      var perfTag = vc.perfil ? '<span style="background:#e0e0e0;border-radius:3px;padding:1px 5px;font-size:11px;margin-right:4px;">' + _escHtml_(vc.perfil) + '</span>' : '';
      rowsCarregados +=
        '<tr style="background:' + bg + ';">' +
        '<td style="padding:5px 8px;border-bottom:1px solid #eee;font-weight:600;">' + _escHtml_(vc.placa) + '</td>' +
        '<td style="padding:5px 8px;border-bottom:1px solid #eee;">' + perfTag + _escHtml_(vc.motorista) + '</td>' +
        '<td style="padding:5px 8px;border-bottom:1px solid #eee;text-align:center;">' + _escHtml_(vc.duracao || '—') + '</td>' +
        '<td style="padding:5px 8px;border-bottom:1px solid #eee;text-align:center;color:' + cor + ';font-weight:700;">' + _escHtml_(vc.classificacao || '—') + '</td>' +
        '</tr>';
    }
  } else {
    rowsCarregados = '<tr><td colspan="4" style="padding:8px;color:#999;text-align:center;font-style:italic;">Nenhum veículo finalizado</td></tr>';
  }

  // --- Veículos em carregamento ---
  var rowsEmCarg = '';
  if (jd.veiculosEmCarregamento && jd.veiculosEmCarregamento.length) {
    for (var j = 0; j < jd.veiculosEmCarregamento.length; j++) {
      var ve = jd.veiculosEmCarregamento[j];
      rowsEmCarg += '<tr><td style="padding:4px 8px;">' + _escHtml_(ve.placa) + '</td><td style="padding:4px 8px;">' + _escHtml_(ve.motorista) + '</td></tr>';
    }
  }

  // --- Média por perfil ---
  var rowsPerfil = '';
  var mediaPorPerfil = jd.mediaPorPerfil || {};
  var perfilOrdem = ['FIORINO', 'HR/VAN', 'VUC', 'TOCO', 'CAVALO'];
  var perfilEmoji = { 'FIORINO': '🚗', 'HR/VAN': '🚐', 'VUC': '🚛', 'TOCO': '🚚', 'CAVALO': '🔴' };
  var todosPerf = [];
  for (var pi = 0; pi < perfilOrdem.length; pi++) {
    if (mediaPorPerfil[perfilOrdem[pi]]) todosPerf.push(perfilOrdem[pi]);
  }
  var outrosK = Object.keys(mediaPorPerfil);
  for (var oi = 0; oi < outrosK.length; oi++) {
    if (perfilOrdem.indexOf(outrosK[oi]) === -1) todosPerf.push(outrosK[oi]);
  }

  if (todosPerf.length > 0) {
    for (var ti = 0; ti < todosPerf.length; ti++) {
      var pNome = todosPerf[ti];
      var pm = mediaPorPerfil[pNome];
      var emoji = perfilEmoji[pNome] || '🚘';
      rowsPerfil +=
        '<tr style="background:' + (ti % 2 === 0 ? '#f9f9f9' : '#fff') + ';">' +
        '<td style="padding:6px 10px;">' + emoji + ' <strong>' + _escHtml_(pNome) + '</strong></td>' +
        '<td style="padding:6px 10px;text-align:center;font-weight:700;color:#1a4a8a;">' + _fmtMin_(pm.mediaMin) + '</td>' +
        '<td style="padding:6px 10px;text-align:center;color:#555;">' + pm.count + ' veíc.</td>' +
        '</tr>';
    }
  } else {
    rowsPerfil = '<tr><td colspan="3" style="padding:8px;color:#999;text-align:center;font-style:italic;">Sem dados por perfil</td></tr>';
  }

  // --- Programados ---
  var rowsProg = '';
  if (d.veiculosComPlano && d.veiculosComPlano.length) {
    for (var vi = 0; vi < d.veiculosComPlano.length; vi++) {
      var vp = d.veiculosComPlano[vi];
      rowsProg +=
        '<tr style="background:' + (vi % 2 === 0 ? '#f9f9f9' : '#fff') + ';">' +
        '<td style="padding:5px 8px;">' + _escHtml_(vp.placa) + '</td>' +
        '<td style="padding:5px 8px;">' + _escHtml_(vp.perfil || '—') + '</td>' +
        '<td style="padding:5px 8px;">' + _escHtml_(vp.motorista) + '</td>' +
        '<td style="padding:5px 8px;">' + _escHtml_(vp.plano || '—') + '</td>' +
        '</tr>';
    }
  } else {
    rowsProg = '<tr><td colspan="4" style="padding:8px;color:#999;text-align:center;font-style:italic;">Nenhum veículo programado</td></tr>';
  }

  // --- Disponíveis ---
  var rowsDisp = '';
  if (d.veiculosDisponiveis && d.veiculosDisponiveis.length) {
    for (var di = 0; di < d.veiculosDisponiveis.length; di++) {
      var vdi = d.veiculosDisponiveis[di];
      rowsDisp +=
        '<tr style="background:' + (di % 2 === 0 ? '#f9f9f9' : '#fff') + ';">' +
        '<td style="padding:5px 8px;">' + _escHtml_(vdi.placa) + '</td>' +
        '<td style="padding:5px 8px;">' + _escHtml_(vdi.perfil || '—') + '</td>' +
        '<td style="padding:5px 8px;">' + _escHtml_(vdi.motorista) + '</td>' +
        '</tr>';
    }
  } else {
    rowsDisp = '<tr><td colspan="3" style="padding:8px;color:#999;text-align:center;font-style:italic;">Nenhum veículo disponível</td></tr>';
  }

  // --- % Classificação ---
  var pNormal  = stats.total > 0 ? Math.round(stats.normal  / stats.total * 100) : 0;
  var pMedio   = stats.total > 0 ? Math.round(stats.medio   / stats.total * 100) : 0;
  var pCritico = stats.total > 0 ? Math.round(stats.critico / stats.total * 100) : 0;

  var frotaAtiva = (d.programados || 0) + (d.disponiveis || 0);
  var pctUtil    = frotaAtiva > 0 ? Math.round((d.programados || 0) / frotaAtiva * 100) : 0;

  // ====== HTML FINAL ======
  var bannerTeste = isTeste
    ? '<tr><td style="background:#ff9800;padding:10px 30px;text-align:center;font-size:13px;font-weight:700;color:#fff;letter-spacing:1px;">⚠️ EMAIL DE TESTE — NÃO É O ENVIO OFICIAL &nbsp;|&nbsp; Verifique o conteúdo antes de enviar para a diretoria</td></tr>'
    : '';

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial,Helvetica,sans-serif;">' +

  // CONTAINER
  '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:20px 0;"><tr><td align="center">' +
  '<table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">' +

  bannerTeste +

  // HEADER
  '<tr><td style="background:#0d1b3e;padding:28px 30px;border-radius:10px 10px 0 0;">' +
  '<table width="100%"><tr>' +
  '<td><span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:1px;">THX GROUP</span><br>' +
  '<span style="color:#7eb3f5;font-size:13px;">Operações Guarulhos — Café 3 Corações</span></td>' +
  '<td align="right"><span style="background:#1a4a8a;color:#ffffff;padding:6px 14px;border-radius:20px;font-size:13px;font-weight:700;">Flash ' + _escHtml_(labelPeriodo) + '</span></td>' +
  '</tr></table>' +
  '<div style="margin-top:12px;color:#aac8f0;font-size:13px;">📅 Período: <strong style="color:#fff;">' + _escHtml_(periodoStr) + '</strong> &nbsp;|&nbsp; 🕒 Gerado: ' + _escHtml_(d.horaAtual || '') + '</div>' +
  '</td></tr>' +

  // RESUMO GERAL (cards)
  '<tr><td style="background:#1a4a8a;padding:16px 30px;">' +
  '<table width="100%" cellpadding="0" cellspacing="0"><tr>' +
  _cardMetrica_('🚛 Programados', d.programados || 0, '#ffffff', '#1a4a8a') +
  _cardMetrica_('🎯 Utilização', pctUtil + '%', '#ffffff', '#1a4a8a') +
  _cardMetrica_('🔵 Disponíveis', d.disponiveis || 0, '#ffffff', '#1a4a8a') +
  _cardMetrica_('✅ Finalizados', jd.carregadosLiberados || 0, '#ffffff', '#1a4a8a') +
  _cardMetrica_('⏱️ Tmo Médio', tempoMedioStr, '#ffffff', '#1a4a8a') +
  '</tr></table>' +
  '</td></tr>' +

  // CORPO
  '<tr><td style="background:#ffffff;padding:24px 30px;">' +

  // --- Jornada Interna ---
  _secTitle_('🏭 Jornada Interna — CD/Armazém') +
  '<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0;border-radius:6px;overflow:hidden;margin-bottom:20px;">' +
  '<tr style="background:#0d1b3e;"><th style="padding:8px 8px;color:#fff;font-size:12px;text-align:left;">Placa</th><th style="padding:8px;color:#fff;font-size:12px;text-align:left;">Perfil / Motorista</th><th style="padding:8px;color:#fff;font-size:12px;text-align:center;">Tempo</th><th style="padding:8px;color:#fff;font-size:12px;text-align:center;">Classificação</th></tr>' +
  rowsCarregados +
  '</table>' +

  // Em carregamento (se houver)
  (rowsEmCarg ? (
    '<p style="margin:0 0 6px;font-size:13px;color:#555;"><strong>⏳ Em carregamento:</strong></p>' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ffe082;border-radius:6px;overflow:hidden;background:#fffde7;margin-bottom:20px;">' +
    '<tr style="background:#f9a825;"><th style="padding:7px 8px;color:#fff;font-size:12px;text-align:left;">Placa</th><th style="padding:7px;color:#fff;font-size:12px;text-align:left;">Motorista</th></tr>' +
    rowsEmCarg + '</table>'
  ) : '') +

  // Resumo classificação
  (stats.total > 0 ? (
    '<div style="background:#f5f7fa;border-radius:6px;padding:12px 16px;margin-bottom:20px;font-size:13px;">' +
    '<strong>📈 Resumo de Classificação:</strong> &nbsp;' +
    '<span style="color:#006400;">🟢 Normal: <strong>' + pNormal + '%</strong> (' + stats.normal + ')</span> &nbsp;|&nbsp; ' +
    '<span style="color:#b8860b;">🟡 Médio: <strong>' + pMedio + '%</strong> (' + stats.medio + ')</span> &nbsp;|&nbsp; ' +
    '<span style="color:#cc0000;">🔴 Crítico: <strong>' + pCritico + '%</strong> (' + stats.critico + ')</span>' +
    '</div>'
  ) : '') +

  // Média por perfil
  (todosPerf.length > 0 ? (
    _secTitle_('📊 Média por Tipo de Veículo') +
    '<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0;border-radius:6px;overflow:hidden;margin-bottom:20px;">' +
    '<tr style="background:#0d1b3e;"><th style="padding:8px 10px;color:#fff;font-size:12px;text-align:left;">Perfil</th><th style="padding:8px;color:#fff;font-size:12px;text-align:center;">Tempo Médio</th><th style="padding:8px;color:#fff;font-size:12px;text-align:center;">Qtd</th></tr>' +
    rowsPerfil + '</table>'
  ) : '') +

  // --- Programação ---
  _secTitle_('🚛 Veículos Programados') +
  '<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0;border-radius:6px;overflow:hidden;margin-bottom:20px;">' +
  '<tr style="background:#0d1b3e;"><th style="padding:8px;color:#fff;font-size:12px;text-align:left;">Placa</th><th style="padding:8px;color:#fff;font-size:12px;text-align:left;">Perfil</th><th style="padding:8px;color:#fff;font-size:12px;text-align:left;">Motorista</th><th style="padding:8px;color:#fff;font-size:12px;text-align:left;">Plano</th></tr>' +
  rowsProg + '</table>' +

  // --- Disponíveis ---
  _secTitle_('🔵 Disponíveis para 2º Corte') +
  '<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0;border-radius:6px;overflow:hidden;margin-bottom:10px;">' +
  '<tr style="background:#0d1b3e;"><th style="padding:8px;color:#fff;font-size:12px;text-align:left;">Placa</th><th style="padding:8px;color:#fff;font-size:12px;text-align:left;">Perfil</th><th style="padding:8px;color:#fff;font-size:12px;text-align:left;">Motorista</th></tr>' +
  rowsDisp + '</table>' +

  '</td></tr>' +

  // FOOTER
  '<tr><td style="background:#0d1b3e;padding:16px 30px;border-radius:0 0 10px 10px;text-align:center;">' +
  '<span style="color:#7eb3f5;font-size:12px;">THX Group — Guarulhos &nbsp;|&nbsp; Email gerado automaticamente via Google Apps Script</span>' +
  '</td></tr>' +

  '</table></td></tr></table>' +
  '</body></html>';
}

// ----- Helpers internos -----

function _cardMetrica_(label, valor, corTexto, corBg) {
  return '<td align="center" style="padding:8px 4px;">' +
    '<div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:8px 6px;min-width:80px;">' +
    '<div style="color:rgba(255,255,255,0.75);font-size:10px;margin-bottom:4px;">' + label + '</div>' +
    '<div style="color:#ffffff;font-size:18px;font-weight:700;">' + valor + '</div>' +
    '</div></td>';
}

function _secTitle_(text) {
  return '<div style="font-size:15px;font-weight:700;color:#0d1b3e;margin:0 0 8px;padding-bottom:6px;border-bottom:2px solid #1a4a8a;">' + text + '</div>';
}

function _escHtml_(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function _normStr_(s) {
  return String(s || '').toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^A-Z0-9]/g,'');
}

function _fmtMin_(totalMin) {
  if (!totalMin || totalMin <= 0) return '--:--';
  var h = Math.floor(totalMin / 60);
  var m = totalMin % 60;
  return h + ':' + (m < 10 ? '0' : '') + m;
}
