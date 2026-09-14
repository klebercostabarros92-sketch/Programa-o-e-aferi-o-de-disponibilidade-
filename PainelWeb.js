/**
 * PainelWeb.js
 * Funções expostas ao painel HTML via google.script.run
 * Todas as funções helper (findSheetCaseInsensitive_, mapHeaders_, etc.)
 * já existem em Código.js e FlashLastMile.js — mesmo escopo global do projeto.
 */

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD  — reutiliza a lógica existente em FlashWeb.js
// ═══════════════════════════════════════════════════════════════════

function getPainelDashboardData() {
  try {
    return getFlashDashboardData_(); // definida em FlashWeb.js
  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
}

// ═══════════════════════════════════════════════════════════════════
// PROGRAMAÇÃO
// ═══════════════════════════════════════════════════════════════════

function getPainelProgramacaoData() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var shProg = findSheetCaseInsensitive_(ss, 'PROGRAMACAO')
              || findSheetCaseInsensitive_(ss, 'Programação')
              || findSheetCaseInsensitive_(ss, 'Programacao');
    if (!shProg) return { ok: false, error: 'Aba Programação não encontrada' };

    var headerRow = (typeof getProgramacaoHeaderRow_ === 'function')
      ? (getProgramacaoHeaderRow_() || 3) : 3;
    var hMap   = mapHeaders_(shProg, headerRow);
    var tz     = Session.getScriptTimeZone() || 'America/Sao_Paulo';
    var hoje   = toDateOnly_(new Date());

    // Colunas — tenta vários aliases
    var cPlano  = getHeaderColOptional_(hMap, ['PLANOS', 'PLANO']);
    var cPerfil = getHeaderColOptional_(hMap, ['PERFIL']);
    var cSaida  = getHeaderColOptional_(hMap, ['DATA DE SAÍDA', 'DATA DE SAIDA', 'DATA SAIDA']);
    var cCarreg = getHeaderColOptional_(hMap, ['DATA DE CARREGAMENTO', 'CARREGAMENTO', 'DT CARREGAMENTO']);
    var cPlaca  = getHeaderColOptional_(hMap, ['PLACA']);
    var cMotor  = getHeaderColOptional_(hMap, ['MOTORISTA']);
    var cGM     = getHeaderColOptional_(hMap, ['GREEN MILE', 'GREENMILE', 'GM']);
    var cWA     = getHeaderColOptional_(hMap, ['WHATSAPP', 'WA', 'ZAP']);
    var cCUSt   = getHeaderColOptional_(hMap, ['CLICKUP STATUS', 'CU STATUS', 'STATUS CLICKUP']);
    var cCUUrl  = getHeaderColOptional_(hMap, ['CLICKUP']);
    var cXML    = getHeaderColOptional_(hMap, ['XML STATUS', 'XML', 'STATUS XML']);

    var lastRow = shProg.getLastRow();
    if (lastRow <= headerRow) return { ok: true, rows: [] };

    var nCols   = shProg.getLastColumn();
    var rawVals = shProg.getRange(headerRow + 1, 1, lastRow - headerRow, nCols).getValues();
    var dspVals = shProg.getRange(headerRow + 1, 1, lastRow - headerRow, nCols).getDisplayValues();
    var rows = [];

    for (var i = 0; i < rawVals.length; i++) {
      var r = rawVals[i], d = dspVals[i];

      // Filtrar somente registros do dia de hoje
      var dtC = cCarreg ? (toDateOnly_(r[cCarreg - 1]) || parseDateBR_(d[cCarreg - 1])) : null;
      var dtS = cSaida  ? (toDateOnly_(r[cSaida  - 1]) || parseDateBR_(d[cSaida  - 1])) : null;
      var dt  = dtC || dtS;
      if (!dt || !isSameDay_(dt, hoje)) continue;

      var plano = cPlano ? String(d[cPlano - 1] || '').trim() : '';
      if (!plano) continue;

      var perfil = '';
      if (cPerfil) {
        perfil = (typeof canonicalizarTipoFlash_ === 'function')
          ? (canonicalizarTipoFlash_(d[cPerfil - 1]) || String(d[cPerfil - 1] || '').trim())
          : String(d[cPerfil - 1] || '').trim();
      }

      var fmtD = function (dtObj) {
        if (!dtObj) return '';
        try { return Utilities.formatDate(dtObj, tz, 'dd/MM/yyyy'); } catch (e2) { return ''; }
      };

      rows.push({
        plano:      plano,
        perfil:     perfil,
        dataSaida:  fmtD(dtS),
        dataCarreg: fmtD(dtC),
        placa:      cPlaca ? String(d[cPlaca - 1] || '').trim() : '',
        motorista:  cMotor ? String(d[cMotor - 1] || '').trim() : '',
        gm:         cGM    ? String(d[cGM    - 1] || '').trim() : '',
        wa:         cWA    ? String(d[cWA    - 1] || '').trim() : '',
        cu:         cCUSt  ? String(d[cCUSt  - 1] || '').trim() : '',
        url:        cCUUrl ? String(d[cCUUrl - 1] || '').trim() : '',
        xml:        cXML   ? String(d[cXML   - 1] || '').trim() : '',
        valor:      0
      });
    }

    return { ok: true, rows: rows, dataRef: Utilities.formatDate(hoje, tz, 'dd/MM/yyyy') };

  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
}

// ═══════════════════════════════════════════════════════════════════
// DISPONIBILIDADE  — lista completa do dia
// ═══════════════════════════════════════════════════════════════════

function getPainelDispData() {
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var shDisp = findSheetCaseInsensitive_(ss, 'DISPONIBILIDADE')
              || findSheetCaseInsensitive_(ss, 'Disponibilidade');
    if (!shDisp) return { ok: false, error: 'Aba Disponibilidade não encontrada' };

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
    var cCont   = getHeaderColOptional_(hMap, ['CONTATO', 'CONTATO MOTORISTA', 'FONE', 'TELEFONE', 'CELULAR']);

    var lastRow = shDisp.getLastRow();
    if (lastRow <= headerRow) return { ok: true, rows: [] };

    var nCols   = shDisp.getLastColumn();
    var rawRows = shDisp.getRange(headerRow + 1, 1, lastRow - headerRow, nCols).getValues();
    var dspRows = shDisp.getRange(headerRow + 1, 1, lastRow - headerRow, nCols).getDisplayValues();

    var out = [], seen = {};

    for (var i = 0; i < dspRows.length; i++) {
      var d = dspRows[i], r = rawRows[i] || [];

      // Filtrar pela data de hoje
      if (cData) {
        var dt = toDateOnly_(r[cData - 1]) || parseDateBR_(d[cData - 1]);
        if (!dt || !isSameDay_(dt, hoje)) continue;
      }

      // Deduplica por placa
      var placaKey = normalizePlate_(d[cPlaca - 1]);
      if (placaKey && seen[placaKey]) continue;
      if (placaKey) seen[placaKey] = true;

      var dtDisp = cData
        ? (toDateOnly_(r[cData - 1]) || parseDateBR_(d[cData - 1]) || hoje)
        : hoje;

      var perfil = '';
      if (typeof canonicalizarTipoFlash_ === 'function') {
        perfil = canonicalizarTipoFlash_(d[cPerfil - 1]) || String(d[cPerfil - 1] || '').trim();
      } else {
        perfil = String(d[cPerfil - 1] || '').trim();
      }

      out.push({
        data:      Utilities.formatDate(dtDisp, tz, 'dd/MM/yyyy'),
        placa:     String(d[cPlaca  - 1] || '').trim(),
        motorista: cMotor ? String(d[cMotor  - 1] || '').trim() : '',
        perfil:    perfil,
        status:    String(d[cStatus - 1] || '').trim(),
        contato:   cCont  ? String(d[cCont   - 1] || '').trim() : ''
      });
    }

    return { ok: true, rows: out };

  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
}

// ═══════════════════════════════════════════════════════════════════
// JORNADA INTERNA
// ═══════════════════════════════════════════════════════════════════

function getPainelJornadaData() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = findSheetCaseInsensitive_(ss, 'JORNADA INTERNA')
          || findSheetCaseInsensitive_(ss, 'Jornada Interna')
          || findSheetCaseInsensitive_(ss, 'JORNADA')
          || findSheetCaseInsensitive_(ss, 'Jornada');
    if (!sh) return { ok: true, rows: [], warn: 'Aba Jornada Interna não encontrada' };

    var tz   = Session.getScriptTimeZone() || 'America/Sao_Paulo';
    var hoje = toDateOnly_(new Date());
    var hMap = mapHeaders_(sh, 1);

    var cData  = getHeaderColOptional_(hMap, ['DATA']);
    var cPlano = getHeaderColOptional_(hMap, ['PLANO DE VIAGEM', 'PLANO', 'PLANOS']);
    var cPlaca = getHeaderColOptional_(hMap, ['PLACA']);
    var cMotor = getHeaderColOptional_(hMap, ['MOTORISTA']);
    var cPerf  = getHeaderColOptional_(hMap, ['PERFIL']);
    var cIn    = getHeaderColOptional_(hMap, ['CHEGADA NO CD', 'CHEGADA', 'ENTRADA', 'CHECKIN']);
    var cOut   = getHeaderColOptional_(hMap, ['SAIDA DO CD', 'SAÍDA DO CD', 'SAIDA', 'SAÍDA', 'CHECKOUT']);
    var cDur   = getHeaderColOptional_(hMap, ['JORNADA INTERNA', 'DURACAO', 'DURAÇÃO', 'TEMPO']);
    var cClass = getHeaderColOptional_(hMap, ['CLASSIFICACAO JORNADA', 'CLASSIFICAÇÃO JORNADA', 'CLASSIFICACAO', 'CLASSIFICAÇÃO', 'CLASS']);

    var lastRow = sh.getLastRow();
    if (lastRow < 2) return { ok: true, rows: [] };

    var nCols   = sh.getLastColumn();
    var rawRows = sh.getRange(2, 1, lastRow - 1, nCols).getValues();
    var dspRows = sh.getRange(2, 1, lastRow - 1, nCols).getDisplayValues();
    var out = [];

    for (var i = 0; i < dspRows.length; i++) {
      var d = dspRows[i], r = rawRows[i] || [];

      if (cData) {
        var dt = toDateOnly_(r[cData - 1]) || parseDateBR_(d[cData - 1]);
        if (!dt || !isSameDay_(dt, hoje)) continue;
      }

      var chegada = cIn  ? String(d[cIn  - 1] || '').trim() : '';
      var saida   = cOut ? String(d[cOut - 1] || '').trim() : '';
      var status  = !chegada ? 'Não Iniciado'
                  : !saida   ? 'Em Carregamento'
                              : 'Carregado / Saiu';

      var perfil = '';
      if (cPerf) {
        perfil = (typeof canonicalizarTipoFlash_ === 'function')
          ? (canonicalizarTipoFlash_(d[cPerf - 1]) || String(d[cPerf - 1] || '').trim())
          : String(d[cPerf - 1] || '').trim();
      }

      out.push({
        plano:     cPlano ? String(d[cPlano - 1] || '').trim() : '',
        placa:     cPlaca ? String(d[cPlaca - 1] || '').trim() : '',
        motorista: cMotor ? String(d[cMotor - 1] || '').trim() : '',
        perfil:    perfil,
        chegada:   chegada,
        saida:     saida,
        duracao:   cDur   ? (String(d[cDur   - 1] || '').trim() || '—') : '—',
        class:     cClass ? (String(d[cClass - 1] || '').trim() || '—') : '—',
        status:    status
      });
    }

    return { ok: true, rows: out };

  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
}
