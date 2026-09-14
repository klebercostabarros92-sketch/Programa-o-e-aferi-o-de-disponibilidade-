const CIOT_CLICKUP_CONFIG_ = {
  VIEW_ID: '8cdtzje-83333',
  LIST_ID: '901314444834',
  LOCAL_AGENT_URL: 'http://127.0.0.1:30248/emitir-ciot',
  LOG_SHEET_NAME: 'LOG_CIOT',
  REPORT_WEBHOOK_URL: 'https://chat.googleapis.com/v1/spaces/5mTLgyAAAAE/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=2UgHe0GO03HrYSJO8WikqObLd1ZKUrJpNjnJ9C2fgPM',
};

function emitirCiot() {
  var tpl = HtmlService.createTemplateFromFile('EmitirCiotDialog');
  tpl.localAgentUrl = CIOT_CLICKUP_CONFIG_.LOCAL_AGENT_URL;
  SpreadsheetApp.getUi().showModalDialog(
    tpl.evaluate().setWidth(420).setHeight(250),
    'Emitir CIOT'
  );
}

function prepararCiotClickUpCsv() {
  var tasks = fetchClickUpTasksByViewCiot_(CIOT_CLICKUP_CONFIG_.VIEW_ID);
  if (!tasks.length) {
    tasks = fetchClickUpTasksByList_(CIOT_CLICKUP_CONFIG_.LIST_ID, {});
  }

  var rows = [];
  for (var i = 0; i < tasks.length; i++) {
    var row = buildCiotCsvRowFromClickUpTask_(tasks[i]);
    if (!row) continue;
    rows.push(row);
  }

  if (!rows.length) {
    throw new Error('Nenhum card com taskId, plano, unidade, placa e valor foi encontrado na view/lista do ClickUp.');
  }

  var header = ['taskId', 'taskName', 'plano', 'unidade', 'status', 'motorista', 'placa', 'valor', 'clickupUrl', 'resultado'];
  var csvRows = [header].concat(rows);
  var csv = csvRows.map(function (r) {
    return r.map(escapeCiotCsvCell_).join(';');
  }).join('\r\n');

  var filename = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd'T'HH_mm_ss.SSS'Z'") +
    ' THX Group - Operacional 3 C - 3 C Programacao.csv';

  return {
    ok: true,
    filename: filename,
    csv: csv,
    rows: rows.length,
    viewId: CIOT_CLICKUP_CONFIG_.VIEW_ID,
    listId: CIOT_CLICKUP_CONFIG_.LIST_ID,
    logCallbackUrl: getCiotLogCallbackUrl_(),
  };
}

function getCiotLogCallbackUrl_() {
  try {
    return ScriptApp.getService().getUrl() || '';
  } catch (e) {
    return '';
  }
}

function fetchClickUpTasksByViewCiot_(viewId) {
  var allTasks = [];
  var page = 0;
  while (true) {
    var url = CONFIG.CLICKUP.BASE_URL + '/view/' + encodeURIComponent(String(viewId)) + '/task?page=' + page;
    var response = UrlFetchApp.fetch(url, {
      method: 'get',
      muteHttpExceptions: true,
      headers: {
        Authorization: getClickUpApiKey_(),
        'Content-Type': 'application/json',
      },
    });

    var code = response.getResponseCode();
    var text = response.getContentText();
    if (code !== 200) {
      throw new Error('ClickUp view HTTP ' + code + ' (view: ' + viewId + '): ' + text.slice(0, 300));
    }

    var parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      throw new Error('ClickUp view JSON invalido: ' + text.slice(0, 300));
    }

    var tasks = Array.isArray(parsed && parsed.tasks) ? parsed.tasks : [];
    allTasks.push.apply(allTasks, tasks);
    if (!tasks.length || tasks.length < 100) break;
    page++;
  }
  return allTasks;
}

function buildCiotCsvRowFromClickUpTask_(task) {
  if (!task) return null;
  var fields = resolverCustomFieldsClickUp_(task);
  var taskId = String(task.id || '').trim();
  var taskName = String(task.name || '').trim();
  var plano = pickCiotField_(fields, [
    'PLANO',
    'PLANOS',
    'ROTA',
    'OBS1',
    'OBS',
    'OBSERVACAO',
    'OBSERVAÇÃO',
    '?? PLANO',
  ]) || taskName;
  var unidade = pickCiotField_(fields, [
    'UNIDADE',
    'CLIENTE / UNIDADE',
    '🟢 Cliente / Unidade',
    'CLIENTE',
    'FILIAL',
    'BASE',
  ]) || getClickUpProgramacaoConfig_().UNIT_DEFAULT || 'GUARULHOS';
  var placa = pickCiotField_(fields, [
    'PLACA',
    '🟢 Placa',
    '🤖 PLACA',
    'PLACA BOT',
    'CAVALO',
    'VEICULO',
    'VEÍCULO',
  ]);
  var valor = pickCiotField_(fields, [
    'VALOR',
    'VALOR NF',
    'VALOR DA NF',
    'VALOR DA FICHA',
    'VALOR FICHA',
    'INVOICE VALUE',
    'NOTA FISCAL',
  ]);

  valor = normalizeInvoiceValueClickUpProgramacao_(valor);
  if (valor != null && !isNaN(Number(valor))) valor = Number(valor).toFixed(2);

  if (!taskId || !plano || !unidade || !placa || !valor) return null;

  var status = task.status && (task.status.status || task.status) ? String(task.status.status || task.status) : '';
  var motorista = pickCiotField_(fields, [
    'MOTORISTA',
    'NOME MOTORISTA',
    '🟢 Nome Motorista',
    '🤖 MOTORISTA',
  ]);
  var url = String(task.url || ('https://app.clickup.com/t/' + taskId));
  return [taskId, taskName, plano, unidade, status, motorista, placa, valor, url, ''];
}

function pickCiotField_(fields, aliases) {
  fields = fields || {};
  for (var i = 0; i < aliases.length; i++) {
    var alias = String(aliases[i] || '');
    var direct = fields[alias];
    if (direct != null && String(direct).trim()) return String(direct).trim();
    var normalized = fields[normalizeHeader_(alias)];
    if (normalized != null && String(normalized).trim()) return String(normalized).trim();
  }
  return '';
}

function escapeCiotCsvCell_(value) {
  var text = String(value == null ? '' : value);
  if (/[;"\r\n]/.test(text)) return '"' + text.replace(/"/g, '""') + '"';
  return text;
}

function handleCiotLogPost_(e) {
  try {
    var payload = {};
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    }

    if (!payload || payload.action !== 'ciot_log') {
      return jsonCiotResponse_({ ok: false, message: 'Acao invalida.' }, 400);
    }

    var row = appendCiotLog_(payload);
    return jsonCiotResponse_({ ok: true, row: row }, 200);
  } catch (err) {
    return jsonCiotResponse_({ ok: false, message: String(err && err.message ? err.message : err) }, 500);
  }
}

function appendCiotLog_(payload) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getCiotLogSheet_();
  var dataEmissao = String(payload.data || payload.dataEmissao || '');
  if (!dataEmissao) {
    dataEmissao = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
  }

  var row = [
    dataEmissao,
    String(payload.placa || ''),
    String(payload.motorista || ''),
    String(payload.plano || ''),
    String(payload.ciot || ''),
    String(payload.ctrb || payload.os || ''),
    String(payload.unidade || ''),
    String(payload.valor || ''),
    String(payload.taskId || ''),
    String(payload.status || ''),
    String(payload.pdfPath || ''),
    String(payload.message || ''),
    Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss'),
  ];

  sheet.appendRow(row);
  try { ss.toast('CIOT log registrado: ' + (payload.placa || ''), 'CIOT', 4); } catch (e) {}
  return sheet.getLastRow();
}

function getCiotLogSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var name = CIOT_CLICKUP_CONFIG_.LOG_SHEET_NAME;
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }

  var headers = [
    'Data',
    'Placa',
    'Motorista',
    'Plano de viagem',
    'CIOT',
    'CTRB',
    'Unidade',
    'Valor',
    'Task ID',
    'Status',
    'PDF',
    'Mensagem',
    'Registrado em',
  ];

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  } else {
    var current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    var needsHeader = false;
    for (var i = 0; i < headers.length; i++) {
      if (String(current[i] || '') !== headers[i]) {
        needsHeader = true;
        break;
      }
    }
    if (needsHeader) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  try {
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#e2e8f0');
    sheet.autoResizeColumns(1, Math.min(headers.length, 13));
  } catch (e) {}

  return sheet;
}

function enviarRelatorioCiotHoje() {
  var sheet = getCiotLogSheet_();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert('Relatorio CIOT', 'Nenhuma emissao registrada na aba LOG_CIOT.', SpreadsheetApp.getUi().ButtonSet.OK);
    return { ok: false, sent: 0 };
  }

  var values = sheet.getRange(2, 1, lastRow - 1, 13).getDisplayValues();
  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy');
  var rows = values.filter(function (r) {
    return String(r[0] || '').indexOf(today) === 0 && String(r[9] || '').toUpperCase() === 'OK';
  });

  if (!rows.length) {
    SpreadsheetApp.getUi().alert('Relatorio CIOT', 'Nenhuma emissao CIOT com status OK encontrada hoje (' + today + ').', SpreadsheetApp.getUi().ButtonSet.OK);
    return { ok: false, sent: 0 };
  }

  var lines = [];
  lines.push('*Relatorio CIOT - ' + today + '*');
  lines.push('Total emitido: ' + rows.length);
  lines.push('');
  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    lines.push(
      (i + 1) + '. CIOT: ' + (r[4] || '-') +
      ' | CTRB: ' + (r[5] || '-') +
      ' | Placa: ' + (r[1] || '-') +
      ' | Data: ' + (r[0] || '-')
    );
  }

  sendCiotReportToWebhook_(lines.join('\n'));
  SpreadsheetApp.getUi().alert('Relatorio CIOT', 'Relatorio enviado com ' + rows.length + ' emissao(oes).', SpreadsheetApp.getUi().ButtonSet.OK);
  return { ok: true, sent: rows.length };
}

function sendCiotReportToWebhook_(text) {
  var response = UrlFetchApp.fetch(CIOT_CLICKUP_CONFIG_.REPORT_WEBHOOK_URL, {
    method: 'post',
    contentType: 'application/json',
    muteHttpExceptions: true,
    payload: JSON.stringify({ text: text }),
  });
  var code = response.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error('Webhook CIOT HTTP ' + code + ': ' + String(response.getContentText() || '').slice(0, 300));
  }
  return true;
}

function jsonCiotResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload || {}))
    .setMimeType(ContentService.MimeType.JSON);
}
