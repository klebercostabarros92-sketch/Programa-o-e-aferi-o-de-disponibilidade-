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

  // --- Contagem de classificações (sem listar veículos) ---
  var stats = { normal: 0, medio: 0, critico: 0, total: 0 };
  if (jd.veiculosCarregados && jd.veiculosCarregados.length) {
    for (var i = 0; i < jd.veiculosCarregados.length; i++) {
      var clNorm = _normStr_(jd.veiculosCarregados[i].classificacao || '');
      if (clNorm.indexOf('CRITICO') !== -1)    stats.critico++;
      else if (clNorm.indexOf('MEDIO') !== -1) stats.medio++;
      else if (clNorm.indexOf('NORMAL') !== -1) stats.normal++;
      stats.total++;
    }
  }
  var pNormal  = stats.total > 0 ? Math.round(stats.normal  / stats.total * 100) : 0;
  var pMedio   = stats.total > 0 ? Math.round(stats.medio   / stats.total * 100) : 0;
  var pCritico = stats.total > 0 ? Math.round(stats.critico / stats.total * 100) : 0;

  // --- Veículos em carregamento (apenas os pendentes) ---
  var rowsEmCarg = '';
  if (jd.veiculosEmCarregamento && jd.veiculosEmCarregamento.length) {
    for (var j = 0; j < jd.veiculosEmCarregamento.length; j++) {
      var ve = jd.veiculosEmCarregamento[j];
      rowsEmCarg += '<tr style="background:' + (j%2===0?'#fffde7':'#fff8e1') + ';"><td style="padding:6px 10px;font-weight:600;">' + _escHtml_(ve.placa) + '</td><td style="padding:6px 10px;">' + _escHtml_(ve.motorista) + '</td></tr>';
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
  for (var ti = 0; ti < todosPerf.length; ti++) {
    var pNome = todosPerf[ti];
    var pm = mediaPorPerfil[pNome];
    var emoji = perfilEmoji[pNome] || '🚘';
    rowsPerfil +=
      '<tr style="background:' + (ti%2===0?'#f5f7fa':'#fff') + ';">' +
      '<td style="padding:10px 14px;font-size:15px;">' + emoji + ' <strong>' + _escHtml_(pNome) + '</strong></td>' +
      '<td style="padding:10px 14px;text-align:center;font-size:22px;font-weight:700;color:#0d1b3e;">' + _fmtMin_(pm.mediaMin) + '</td>' +
      '<td style="padding:10px 14px;text-align:center;color:#777;font-size:13px;">' + pm.count + ' veíc.</td>' +
      '</tr>';
  }
  if (!rowsPerfil) rowsPerfil = '<tr><td colspan="3" style="padding:10px;color:#aaa;text-align:center;font-style:italic;">Sem dados por perfil</td></tr>';

  // ====== HTML FINAL ======
  var bannerTeste = isTeste
    ? '<tr><td style="background:#ff9800;padding:10px 30px;text-align:center;font-size:13px;font-weight:700;color:#fff;letter-spacing:1px;">⚠️ EMAIL DE TESTE — NÃO É O ENVIO OFICIAL &nbsp;|&nbsp; Verifique antes de enviar para a diretoria</td></tr>'
    : '';

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial,Helvetica,sans-serif;">' +

  '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:24px 0;"><tr><td align="center">' +
  '<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">' +

  bannerTeste +

  // HEADER
  '<tr><td style="background:#0d1b3e;padding:28px 30px;border-radius:12px 12px 0 0;">' +
  '<span style="color:#fff;font-size:24px;font-weight:700;letter-spacing:1px;">THX GROUP</span><br>' +
  '<span style="color:#7eb3f5;font-size:13px;">Operações Guarulhos — Café 3 Corações</span><br><br>' +
  '<span style="background:#1a4a8a;color:#fff;padding:5px 14px;border-radius:20px;font-size:13px;font-weight:700;">🏭 Jornada Interna — Flash ' + _escHtml_(labelPeriodo) + '</span>' +
  '<div style="margin-top:10px;color:#aac8f0;font-size:12px;">📅 ' + _escHtml_(periodoStr) + ' &nbsp;|&nbsp; 🕒 ' + _escHtml_(d.horaAtual || '') + '</div>' +
  '</td></tr>' +

  // MÉTRICAS PRINCIPAIS
  '<tr><td style="background:#1a4a8a;padding:18px 30px;">' +
  '<table width="100%" cellpadding="0" cellspacing="0"><tr>' +
  _cardMetrica_('✅ Finalizados', jd.carregadosLiberados || 0) +
  _cardMetrica_('⏳ Em Carga', jd.emCarregamento || 0) +
  _cardMetrica_('⏱️ Tempo Médio', tempoMedioStr) +
  '</tr></table>' +
  '</td></tr>' +

  // CORPO
  '<tr><td style="background:#ffffff;padding:28px 30px;">' +

  // Classificação — barra visual
  (stats.total > 0 ? (
    '<div style="margin-bottom:24px;">' +
    '<div style="font-size:14px;font-weight:700;color:#0d1b3e;margin-bottom:10px;">📈 Classificação da Jornada (' + stats.total + ' veículos)</div>' +
    '<div style="display:flex;border-radius:6px;overflow:hidden;height:20px;margin-bottom:10px;">' +
    '<div style="width:' + pNormal  + '%;background:#2ecc71;" title="Normal"></div>' +
    '<div style="width:' + pMedio   + '%;background:#f39c12;" title="Médio"></div>' +
    '<div style="width:' + pCritico + '%;background:#e74c3c;" title="Crítico"></div>' +
    '</div>' +
    '<table width="100%" cellpadding="0" cellspacing="0"><tr>' +
    '<td style="text-align:center;padding:8px;background:#f0fff4;border-radius:6px;margin:2px;"><span style="color:#27ae60;font-size:22px;font-weight:700;">' + pNormal + '%</span><br><span style="font-size:11px;color:#555;">🟢 Normal<br>(' + stats.normal + ')</span></td>' +
    '<td width="8"></td>' +
    '<td style="text-align:center;padding:8px;background:#fffde7;border-radius:6px;"><span style="color:#e67e22;font-size:22px;font-weight:700;">' + pMedio + '%</span><br><span style="font-size:11px;color:#555;">🟡 Médio<br>(' + stats.medio + ')</span></td>' +
    '<td width="8"></td>' +
    '<td style="text-align:center;padding:8px;background:#fff0f0;border-radius:6px;"><span style="color:#e74c3c;font-size:22px;font-weight:700;">' + pCritico + '%</span><br><span style="font-size:11px;color:#555;">🔴 Crítico<br>(' + stats.critico + ')</span></td>' +
    '</tr></table></div>'
  ) : '') +

  // Média por perfil
  '<div style="font-size:14px;font-weight:700;color:#0d1b3e;margin-bottom:10px;">📊 Tempo Médio por Tipo de Veículo</div>' +
  '<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8eaf0;border-radius:8px;overflow:hidden;margin-bottom:24px;">' +
  '<tr style="background:#0d1b3e;"><th style="padding:9px 14px;color:#fff;font-size:12px;text-align:left;">Tipo</th><th style="padding:9px;color:#fff;font-size:12px;text-align:center;">Média</th><th style="padding:9px;color:#fff;font-size:12px;text-align:center;">Qtd</th></tr>' +
  rowsPerfil + '</table>' +

  // Em carregamento (se houver)
  (rowsEmCarg ? (
    '<div style="font-size:14px;font-weight:700;color:#e67e22;margin-bottom:8px;">⏳ Ainda em Carregamento</div>' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ffe082;border-radius:8px;overflow:hidden;margin-bottom:10px;">' +
    '<tr style="background:#f9a825;"><th style="padding:8px 10px;color:#fff;font-size:12px;text-align:left;">Placa</th><th style="padding:8px;color:#fff;font-size:12px;text-align:left;">Motorista</th></tr>' +
    rowsEmCarg + '</table>'
  ) : '<div style="background:#f0fff4;border-radius:8px;padding:12px 16px;text-align:center;color:#27ae60;font-size:13px;">✅ Todos os veículos finalizaram o carregamento</div>') +

  '</td></tr>' +

  // FOOTER
  '<tr><td style="background:#0d1b3e;padding:14px 30px;border-radius:0 0 12px 12px;text-align:center;">' +
  '<span style="color:#7eb3f5;font-size:11px;">THX Group · Guarulhos &nbsp;|&nbsp; Gerado automaticamente via Google Apps Script</span>' +
  '</td></tr>' +

  '</table></td></tr></table></body></html>';
}

// ----- Helpers internos -----

function _cardMetrica_(label, valor) {
  return '<td align="center" style="padding:6px 4px;">' +
    '<div style="background:rgba(255,255,255,0.13);border-radius:10px;padding:12px 8px;min-width:100px;">' +
    '<div style="color:rgba(255,255,255,0.7);font-size:11px;margin-bottom:6px;">' + label + '</div>' +
    '<div style="color:#ffffff;font-size:24px;font-weight:700;line-height:1;">' + valor + '</div>' +
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
