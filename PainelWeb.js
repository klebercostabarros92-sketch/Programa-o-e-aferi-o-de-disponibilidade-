/**
 * PainelWeb.js
 * Funções expostas ao painel HTML via google.script.run
 */

// ═══════════════════════════════════════════════════════════════════
// DIAGNÓSTICO — lista abas disponíveis (útil para debug)
// ═══════════════════════════════════════════════════════════════════

function getPainelSheetNames() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    return { ok: true, names: ss.getSheets().map(function(s){ return s.getName(); }) };
  } catch(e) {
    return { ok: false, error: String(e.message || e) };
  }
}

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD  — reutiliza a lógica existente em FlashWeb.js
// ═══════════════════════════════════════════════════════════════════

function getPainelDashboardData() {
  try {
    return getFlashDashboardData_();
  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
}

// ═══════════════════════════════════════════════════════════════════
// HELPER: tenta ler display values de uma aba com fallback de nome
// ═══════════════════════════════════════════════════════════════════

function _findSheet_(ss, names) {
  for (var i = 0; i < names.length; i++) {
    var sh = findSheetCaseInsensitive_(ss, names[i]);
    if (sh) return sh;
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// DISPONIBILIDADE — lista completa (hoje → fallback: sem filtro data)
// ═══════════════════════════════════════════════════════════════════

function getPainelDispData() {
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var shDisp = _findSheet_(ss, ['DISPONIBILIDADE','Disponibilidade','disponibilidade']);
    if (!shDisp) return { ok: false, error: 'Aba Disponibilidade não encontrada. Abas: '+
        ss.getSheets().map(function(s){return s.getName();}).join(', ') };

    var headerRow = (typeof getDisponibilidadeHeaderRow_ === 'function')
      ? (getDisponibilidadeHeaderRow_() || 1) : 1;
    var hMap  = mapHeaders_(shDisp, headerRow);
    var tz    = Session.getScriptTimeZone() || 'America/Sao_Paulo';
    var hoje  = toDateOnly_(new Date());

    var cData   = getHeaderColOptional_(hMap, ['DATA']);
    var cPlaca  = getHeaderColRequired_(hMap, ['PLACA'], 'DISPONIBILIDADE');
    var cMotor  = getHeaderColOptional_(hMap, ['MOTORISTA']);
    var cPerfil = getHeaderColRequired_(hMap, ['PERFIL'], 'DISPONIBILIDADE');
    var cStatus = getHeaderColRequired_(hMap, ['DISPONIBILIDADE'], 'DISPONIBILIDADE');
    var cCont   = getHeaderColOptional_(hMap, ['CONTATO','CONTATO MOTORISTA','FONE','TELEFONE','CELULAR']);

    var lastRow = shDisp.getLastRow();
    if (lastRow <= headerRow) return { ok: true, rows: [], dataRef: '', filtrado: false };

    var nCols   = shDisp.getLastColumn();
    var rawRows = shDisp.getRange(headerRow + 1, 1, lastRow - headerRow, nCols).getValues();
    var dspRows = shDisp.getRange(headerRow + 1, 1, lastRow - headerRow, nCols).getDisplayValues();

    // ── 1ª tentativa: filtrar pela data de hoje ──
    var out = _coletarDispRows_(rawRows, dspRows, cData, cPlaca, cMotor, cPerfil, cStatus, cCont, hoje, tz);
    var filtrado = true;

    // ── Fallback: sem filtro de data (mostra tudo) ──
    if (out.length === 0) {
      out = _coletarDispRows_(rawRows, dspRows, null, cPlaca, cMotor, cPerfil, cStatus, cCont, hoje, tz);
      filtrado = false;
    }

    var dataRef = out.length > 0 ? out[0].data : Utilities.formatDate(hoje, tz, 'dd/MM/yyyy');
    return { ok: true, rows: out, dataRef: dataRef, filtrado: filtrado };

  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
}

function _coletarDispRows_(rawRows, dspRows, cData, cPlaca, cMotor, cPerfil, cStatus, cCont, hoje, tz) {
  var out = [], seen = {};
  for (var i = 0; i < dspRows.length; i++) {
    var d = dspRows[i], r = rawRows[i] || [];

    if (cData) {
      var dt = toDateOnly_(r[cData - 1]) || parseDateBR_(d[cData - 1]);
      if (!dt || !isSameDay_(dt, hoje)) continue;
    }

    var placa = String(d[cPlaca - 1] || '').trim();
    var placaKey = normalizePlate_(placa);
    if (placaKey && seen[placaKey]) continue;
    if (placaKey) seen[placaKey] = true;
    if (!placa) continue;

    var dtDisp = cData ? (toDateOnly_(r[cData - 1]) || parseDateBR_(d[cData - 1]) || hoje) : hoje;
    var perfil = '';
    if (typeof canonicalizarTipoFlash_ === 'function') {
      perfil = canonicalizarTipoFlash_(d[cPerfil - 1]) || String(d[cPerfil - 1] || '').trim();
    } else {
      perfil = String(d[cPerfil - 1] || '').trim();
    }

    out.push({
      data:      Utilities.formatDate(dtDisp, tz, 'dd/MM/yyyy'),
      placa:     placa,
      motorista: cMotor ? String(d[cMotor  - 1] || '').trim() : '',
      perfil:    perfil,
      status:    String(d[cStatus - 1] || '').trim(),
      contato:   cCont  ? String(d[cCont   - 1] || '').trim() : ''
    });
  }
  return out;
}

// ═══════════════════════════════════════════════════════════════════
// PROGRAMAÇÃO — hoje → fallback: sem filtro data
// ═══════════════════════════════════════════════════════════════════

function getPainelProgramacaoData() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var shProg = _findSheet_(ss, ['PROGRAMACAO','Programação','Programacao','programacao']);
    if (!shProg) return { ok: false, error: 'Aba Programação não encontrada. Abas: '+
        ss.getSheets().map(function(s){return s.getName();}).join(', ') };

    var headerRow = (typeof getProgramacaoHeaderRow_ === 'function')
      ? (getProgramacaoHeaderRow_() || 3) : 3;
    var hMap   = mapHeaders_(shProg, headerRow);
    var tz     = Session.getScriptTimeZone() || 'America/Sao_Paulo';
    var hoje   = toDateOnly_(new Date());

    var cPlano  = getHeaderColOptional_(hMap, ['PLANOS','PLANO']);
    var cPerfil = getHeaderColOptional_(hMap, ['PERFIL']);
    var cSaida  = getHeaderColOptional_(hMap, ['DATA DE SAÍDA','DATA DE SAIDA','DATA SAIDA']);
    var cCarreg = getHeaderColOptional_(hMap, ['DATA DE CARREGAMENTO','CARREGAMENTO','DT CARREGAMENTO']);
    var cPlaca  = getHeaderColOptional_(hMap, ['PLACA']);
    var cMotor  = getHeaderColOptional_(hMap, ['MOTORISTA']);
    var cGM     = getHeaderColOptional_(hMap, ['GREEN MILE','GREENMILE','GM']);
    var cWA     = getHeaderColOptional_(hMap, ['WHATSAPP','WA','ZAP']);
    var cCUSt   = getHeaderColOptional_(hMap, ['CLICKUP STATUS','CU STATUS','STATUS CLICKUP']);
    var cCUUrl  = getHeaderColOptional_(hMap, ['CLICKUP']);
    var cXML    = getHeaderColOptional_(hMap, ['XML STATUS','XML','STATUS XML']);

    var lastRow = shProg.getLastRow();
    if (lastRow <= headerRow) return { ok: true, rows: [], filtrado: false };

    var nCols   = shProg.getLastColumn();
    var rawVals = shProg.getRange(headerRow + 1, 1, lastRow - headerRow, nCols).getValues();
    var dspVals = shProg.getRange(headerRow + 1, 1, lastRow - headerRow, nCols).getDisplayValues();

    // ── 1ª tentativa: filtrar pela data de hoje ──
    var rows = _coletarProgRows_(rawVals, dspVals, cPlano, cPerfil, cSaida, cCarreg, cPlaca, cMotor, cGM, cWA, cCUSt, cCUUrl, cXML, hoje, tz, true);
    var filtrado = true;

    // ── Fallback: últimos 50 registros sem filtro ──
    if (rows.length === 0) {
      var start = Math.max(0, rawVals.length - 50);
      rows = _coletarProgRows_(rawVals.slice(start), dspVals.slice(start), cPlano, cPerfil, cSaida, cCarreg, cPlaca, cMotor, cGM, cWA, cCUSt, cCUUrl, cXML, hoje, tz, false);
      filtrado = false;
    }

    var dataRef = filtrado ? Utilities.formatDate(hoje, tz, 'dd/MM/yyyy') : (rows.length > 0 ? (rows[0].dataCarreg || rows[0].dataSaida) : '');
    return { ok: true, rows: rows, dataRef: dataRef, filtrado: filtrado };

  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
}

function _coletarProgRows_(rawVals, dspVals, cPlano, cPerfil, cSaida, cCarreg, cPlaca, cMotor, cGM, cWA, cCUSt, cCUUrl, cXML, hoje, tz, filtrarData) {
  var rows = [];
  var fmtD = function(dtObj) {
    if (!dtObj) return '';
    try { return Utilities.formatDate(dtObj, tz, 'dd/MM/yyyy'); } catch(e2) { return ''; }
  };

  for (var i = 0; i < rawVals.length; i++) {
    var r = rawVals[i], d = dspVals[i];

    if (filtrarData) {
      var dtC = cCarreg ? (toDateOnly_(r[cCarreg-1]) || parseDateBR_(d[cCarreg-1])) : null;
      var dtS = cSaida  ? (toDateOnly_(r[cSaida -1]) || parseDateBR_(d[cSaida -1])) : null;
      var dt  = dtC || dtS;
      if (!dt || !isSameDay_(dt, hoje)) continue;
    }

    var plano = cPlano ? String(d[cPlano-1] || '').trim() : '';
    if (!plano) continue;

    var perfil = '';
    if (cPerfil) {
      perfil = (typeof canonicalizarTipoFlash_ === 'function')
        ? (canonicalizarTipoFlash_(d[cPerfil-1]) || String(d[cPerfil-1]||'').trim())
        : String(d[cPerfil-1]||'').trim();
    }

    var dtC2 = cCarreg ? (toDateOnly_(r[cCarreg-1]) || parseDateBR_(d[cCarreg-1])) : null;
    var dtS2 = cSaida  ? (toDateOnly_(r[cSaida -1]) || parseDateBR_(d[cSaida -1])) : null;

    rows.push({
      plano:      plano,
      perfil:     perfil,
      dataSaida:  fmtD(dtS2),
      dataCarreg: fmtD(dtC2),
      placa:      cPlaca ? String(d[cPlaca -1]||'').trim() : '',
      motorista:  cMotor ? String(d[cMotor -1]||'').trim() : '',
      gm:         cGM    ? String(d[cGM    -1]||'').trim() : '',
      wa:         cWA    ? String(d[cWA    -1]||'').trim() : '',
      cu:         cCUSt  ? String(d[cCUSt  -1]||'').trim() : '',
      url:        cCUUrl ? String(d[cCUUrl -1]||'').trim() : '',
      xml:        cXML   ? String(d[cXML   -1]||'').trim() : '',
      valor:      0
    });
  }
  return rows;
}

// ═══════════════════════════════════════════════════════════════════
// JORNADA INTERNA — tenta vários nomes de aba
// ═══════════════════════════════════════════════════════════════════

function getPainelJornadaData() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    // Lista todos os nomes para tentar encontrar a aba
    var allNames = ss.getSheets().map(function(s){ return s.getName(); });
    var jornadaNames = ['JORNADA INTERNA','Jornada Interna','jornada interna','JORNADA','Jornada','jornada'];
    var sh = _findSheet_(ss, jornadaNames);

    if (!sh) {
      // Tentar qualquer aba que contenha "jornada" no nome
      var found = allNames.filter(function(n){ return n.toLowerCase().indexOf('jornada') >= 0; });
      if (found.length > 0) sh = ss.getSheetByName(found[0]);
    }

    if (!sh) {
      return { ok: true, rows: [], warn: 'Aba Jornada não encontrada. Abas disponíveis: ' + allNames.join(' | ') };
    }

    var tz   = Session.getScriptTimeZone() || 'America/Sao_Paulo';
    var hoje = toDateOnly_(new Date());
    var hMap = mapHeaders_(sh, 1);

    var cData  = getHeaderColOptional_(hMap, ['DATA']);
    var cPlano = getHeaderColOptional_(hMap, ['PLANO DE VIAGEM','PLANO','PLANOS']);
    var cPlaca = getHeaderColOptional_(hMap, ['PLACA']);
    var cMotor = getHeaderColOptional_(hMap, ['MOTORISTA']);
    var cPerf  = getHeaderColOptional_(hMap, ['PERFIL']);
    var cIn    = getHeaderColOptional_(hMap, ['CHEGADA NO CD','CHEGADA','ENTRADA','CHECKIN']);
    var cOut   = getHeaderColOptional_(hMap, ['SAIDA DO CD','SAÍDA DO CD','SAIDA','SAÍDA','CHECKOUT']);
    var cDur   = getHeaderColOptional_(hMap, ['JORNADA INTERNA','DURACAO','DURAÇÃO','TEMPO']);
    var cClass = getHeaderColOptional_(hMap, ['CLASSIFICACAO JORNADA','CLASSIFICAÇÃO JORNADA','CLASSIFICACAO','CLASSIFICAÇÃO','CLASS']);

    var lastRow = sh.getLastRow();
    if (lastRow < 2) return { ok: true, rows: [], sheetName: sh.getName() };

    var nCols   = sh.getLastColumn();
    var rawRows = sh.getRange(2, 1, lastRow - 1, nCols).getValues();
    var dspRows = sh.getRange(2, 1, lastRow - 1, nCols).getDisplayValues();

    // Filtrar hoje → fallback sem filtro
    var out = _coletarJornadaRows_(rawRows, dspRows, cData, cPlano, cPlaca, cMotor, cPerf, cIn, cOut, cDur, cClass, hoje, true);
    var filtrado = true;
    if (out.length === 0) {
      var start = Math.max(0, rawRows.length - 50);
      out = _coletarJornadaRows_(rawRows.slice(start), dspRows.slice(start), null, cPlano, cPlaca, cMotor, cPerf, cIn, cOut, cDur, cClass, hoje, false);
      filtrado = false;
    }

    return { ok: true, rows: out, filtrado: filtrado, sheetName: sh.getName() };

  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
}

function _coletarJornadaRows_(rawRows, dspRows, cData, cPlano, cPlaca, cMotor, cPerf, cIn, cOut, cDur, cClass, hoje, filtrarData) {
  var out = [];
  for (var i = 0; i < dspRows.length; i++) {
    var d = dspRows[i], r = rawRows[i] || [];

    if (filtrarData && cData) {
      var dt = toDateOnly_(r[cData-1]) || parseDateBR_(d[cData-1]);
      if (!dt || !isSameDay_(dt, hoje)) continue;
    }

    var chegada = cIn  ? String(d[cIn -1]||'').trim() : '';
    var saida   = cOut ? String(d[cOut-1]||'').trim() : '';
    var status  = !chegada ? 'Não Iniciado' : !saida ? 'Em Carregamento' : 'Carregado / Saiu';
    var perfil  = '';
    if (cPerf) {
      perfil = (typeof canonicalizarTipoFlash_ === 'function')
        ? (canonicalizarTipoFlash_(d[cPerf-1]) || String(d[cPerf-1]||'').trim())
        : String(d[cPerf-1]||'').trim();
    }

    out.push({
      plano:     cPlano ? String(d[cPlano-1]||'').trim() : '',
      placa:     cPlaca ? String(d[cPlaca-1]||'').trim() : '',
      motorista: cMotor ? String(d[cMotor-1]||'').trim() : '',
      perfil:    perfil,
      chegada:   chegada,
      saida:     saida,
      duracao:   cDur   ? (String(d[cDur  -1]||'').trim()||'—') : '—',
      class:     cClass ? (String(d[cClass-1]||'').trim()||'—') : '—',
      status:    status
    });
  }
  return out;
}
