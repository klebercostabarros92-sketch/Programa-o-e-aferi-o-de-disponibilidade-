function gerarFlashLastMile() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dados = coletarDadosFlashLastMile_();
  var norm = normalizarDadosFlashLastMile_(dados);
  var modelo = montarMatrizesFlash_(norm);

  var sheet = findSheetCaseInsensitive_(ss, 'FLASH LAST MILE');
  if (!sheet) sheet = ss.insertSheet('FLASH LAST MILE');

  prepararAbaFlashLastMile_(sheet);
  escreverBlocosFlashLastMile_(sheet, modelo);
  aplicarEstilosFlash_(sheet, modelo.layout);
  atualizarGraficoDisponibilidadeFlash_(sheet, modelo.layout.chart, modelo.grafico);
  SpreadsheetApp.flush();

  return {
    ok: true,
    data: {
      sheet: sheet.getName(),
      dataReferencia: norm.dataReferencia,
      tipos: norm.tiposOrdenados.length,
      totalVeiculos: norm.totalVeiculos,
      totalUtilizado: norm.totalUtilizado
    }
  };
}

function coletarDadosFlashLastMile_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var shDisp = findSheetCaseInsensitive_(ss, 'DISPONIBILIDADE');
  var shProg = findSheetCaseInsensitive_(ss, 'PROGRAMACAO');
  if (!shDisp) throw new Error('Aba DISPONIBILIDADE nao encontrada.');
  if (!shProg) throw new Error('Aba PROGRAMACAO nao encontrada.');

  var tz = Session.getScriptTimeZone() || 'America/Sao_Paulo';
  var hoje = toDateOnly_(new Date());
  var dataReferencia = Utilities.formatDate(hoje, tz, 'dd/MM/yyyy');

  var dispHeaderRow = (typeof getDisponibilidadeHeaderRow_ === 'function' ? getDisponibilidadeHeaderRow_() : 1) || 1;
  var dispMap = mapHeaders_(shDisp, dispHeaderRow);
  var cDispData = getHeaderColRequired_(dispMap, ['DATA'], 'DISPONIBILIDADE');
  var cDispPerfil = getHeaderColRequired_(dispMap, ['PERFIL'], 'DISPONIBILIDADE');
  var cDispStatus = getHeaderColRequired_(dispMap, ['DISPONIBILIDADE'], 'DISPONIBILIDADE');
  var cDispPlaca = getHeaderColOptional_(dispMap, ['PLACA']);
  var dispRows = getSheetDataRowsDisplay_(shDisp, shDisp.getLastColumn(), dispHeaderRow);

  var disponibilidadePorTipo = {};
  var seenDisp = {};
  for (var i = 0; i < dispRows.length; i++) {
    var rowDisp = dispRows[i] || [];
    var dtDisp = parseDateBR_(rowDisp[cDispData - 1]) || toDateOnly_(rowDisp[cDispData - 1]);
    if (!dtDisp || !isSameDay_(dtDisp, hoje)) continue;
    if (!statusDisponivelFlash_(rowDisp[cDispStatus - 1])) continue;

    if (cDispPlaca) {
      var placaKeyDisp = normalizePlate_(rowDisp[cDispPlaca - 1]);
      if (placaKeyDisp) {
        if (seenDisp[placaKeyDisp]) continue;
        seenDisp[placaKeyDisp] = true;
      }
    }

    var tipoDisp = canonicalizarTipoFlash_(rowDisp[cDispPerfil - 1]);
    if (!tipoDisp) continue;
    disponibilidadePorTipo[tipoDisp] = (disponibilidadePorTipo[tipoDisp] || 0) + 1;
  }

  var progHeaderRow = (typeof getProgramacaoHeaderRow_ === 'function' ? getProgramacaoHeaderRow_() : 3) || 3;
  var progMap = mapHeaders_(shProg, progHeaderRow);
  var cProgPerfil = getHeaderColRequired_(progMap, ['PERFIL'], 'PROGRAMACAO');
  var cProgDataCarreg = getHeaderColOptional_(progMap, ['DATA DE CARREGAMENTO']);
  var cProgDataSaida = getHeaderColOptional_(progMap, ['DATA DE SAIDA', 'DATA DE SAÍDA']);
  var cProgPlaca = getHeaderColOptional_(progMap, ['PLACA']);
  if (!cProgDataCarreg && !cProgDataSaida) {
    throw new Error('PROGRAMACAO sem colunas de data (DATA DE CARREGAMENTO / DATA DE SAIDA).');
  }

  var progRows = getSheetDataRowsDisplay_(shProg, shProg.getLastColumn(), progHeaderRow);
  var utilizadosPorTipo = {};
  var seenUtil = {};
  for (var j = 0; j < progRows.length; j++) {
    var rowProg = progRows[j] || [];
    var dtProg = null;
    if (cProgDataCarreg) dtProg = parseDateBR_(rowProg[cProgDataCarreg - 1]) || toDateOnly_(rowProg[cProgDataCarreg - 1]);
    if (!dtProg && cProgDataSaida) dtProg = parseDateBR_(rowProg[cProgDataSaida - 1]) || toDateOnly_(rowProg[cProgDataSaida - 1]);
    if (!dtProg || !isSameDay_(dtProg, hoje)) continue;

    if (cProgPlaca) {
      var placaKeyProg = normalizePlate_(rowProg[cProgPlaca - 1]);
      if (placaKeyProg) {
        if (seenUtil[placaKeyProg]) continue;
        seenUtil[placaKeyProg] = true;
      }
    }

    var tipoProg = canonicalizarTipoFlash_(rowProg[cProgPerfil - 1]);
    if (!tipoProg) continue;
    utilizadosPorTipo[tipoProg] = (utilizadosPorTipo[tipoProg] || 0) + 1;
  }

  return {
    dataReferencia: dataReferencia,
    disponibilidadePorTipo: disponibilidadePorTipo,
    utilizadosPorTipo: utilizadosPorTipo,
    metaPorTipo: coletarMetaPorTipoFlash_(ss)
  };
}

function normalizarDadosFlashLastMile_(input) {
  var inObj = input || {};
  var disp = normalizarMapaNumericoFlash_(inObj.disponibilidadePorTipo);
  var util = normalizarMapaNumericoFlash_(inObj.utilizadosPorTipo);
  var meta = normalizarMapaNumericoFlash_(inObj.metaPorTipo);
  var tipos = comporTiposExibicaoFlash_(obterTiposOrdenadosFlash_(disp, util, meta), disp, util, meta);

  var totalVeiculos = 0;
  var totalUtilizado = 0;
  for (var i = 0; i < tipos.length; i++) {
    var t = tipos[i];
    totalVeiculos += Number(disp[t] || 0);
    totalUtilizado += Number(util[t] || 0);
  }

  return {
    dataReferencia: String(inObj.dataReferencia || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy')),
    disponibilidadePorTipo: disp,
    utilizadosPorTipo: util,
    metaPorTipo: meta,
    tiposOrdenados: tipos,
    totalVeiculos: totalVeiculos,
    totalUtilizado: totalUtilizado
  };
}

function obterTiposOrdenadosFlash_(disp, util, meta) {
  var map = {};
  Object.keys(disp || {}).forEach(function (k) { if (String(k || '').trim()) map[String(k).trim()] = true; });
  Object.keys(util || {}).forEach(function (k) { if (String(k || '').trim()) map[String(k).trim()] = true; });
  Object.keys(meta || {}).forEach(function (k) { if (String(k || '').trim()) map[String(k).trim()] = true; });

  return Object.keys(map).sort(function (a, b) {
    var da = Number((disp && disp[a]) || 0);
    var db = Number((disp && disp[b]) || 0);
    if (db !== da) return db - da;
    return String(a).localeCompare(String(b), 'pt-BR');
  });
}

function comporTiposExibicaoFlash_(tiposDin, disp, util, meta) {
  var fixed = ['FIORINO', 'HR / VAN', 'VUC', 'TOCO', 'CAVALO'];
  var out = [];
  for (var i = 0; i < fixed.length; i++) {
    var t = fixed[i];
    out.push(t);
    if (disp[t] == null) disp[t] = 0;
    if (util[t] == null) util[t] = 0;
    if (meta[t] == null) meta[t] = Number(meta[t] || 0);
  }
  return out;
}

function montarMatrizesFlash_(dataset) {
  var tipos = dataset.tiposOrdenados || [];
  var disp = dataset.disponibilidadePorTipo || {};
  var util = dataset.utilizadosPorTipo || {};
  var meta = dataset.metaPorTipo || {};
  var totalVeiculos = Number(dataset.totalVeiculos || 0);
  var totalUtilizado = Number(dataset.totalUtilizado || 0);
  var pctUtil = totalVeiculos > 0 ? (totalUtilizado / totalVeiculos) : 0;
  if (pctUtil > 1) pctUtil = 1;

  var tiposVisao = compactarTiposParaFlash_(tipos, disp, util, meta, 7);

  var segundoCorte = {};
  for (var i = 0; i < tiposVisao.length; i++) {
    var tipo = tiposVisao[i];
    segundoCorte[tipo] = Math.max(Number(disp[tipo] || 0) - Number(util[tipo] || 0), 0);
  }

  var cards = [
    ['TOTAL DISPONIVEL', '', 'TOTAL UTILIZADO', '', '% UTILIZACAO', '', 'DATA REF', ''],
    [totalVeiculos, '', totalUtilizado, '', pctUtil, '', dataset.dataReferencia, '']
  ];

  var tabelaDisp = [['TIPO', 'DISPONIVEL', '% META', '% PART']];
  for (var d = 0; d < tiposVisao.length; d++) {
    var td = tiposVisao[d];
    var qtdD = Number(disp[td] || 0);
    var mk = obterMetaTipoAplicavelFlash_(td, meta);
    var mq = Number(meta[mk] || 0);
    tabelaDisp.push([td, qtdD, mq > 0 ? (qtdD / mq) : 0, totalVeiculos > 0 ? (qtdD / totalVeiculos) : 0]);
  }
  tabelaDisp.push(['TOTAL', totalVeiculos, '', '']);

  var tabelaUtil = [['TIPO', 'UTILIZADO', '% DISP']];
  for (var u = 0; u < tiposVisao.length; u++) {
    var tu = tiposVisao[u];
    var qtdU = Number(util[tu] || 0);
    var pctDisp = Number(disp[tu] || 0) > 0 ? (qtdU / Number(disp[tu] || 1)) : 0;
    if (pctDisp > 1) pctDisp = 1;
    tabelaUtil.push([tu, qtdU, pctDisp]);
  }
  tabelaUtil.push(['TOTAL', totalUtilizado, pctUtil]);

  var tabelaCorte = [['TIPO', '2o CORTE', '% DISP']];
  for (var c = 0; c < tiposVisao.length; c++) {
    var tc = tiposVisao[c];
    var sc = Number(segundoCorte[tc] || 0);
    tabelaCorte.push([tc, sc, Number(disp[tc] || 0) > 0 ? (sc / Number(disp[tc] || 1)) : 0]);
  }

  var metaTipos = Object.keys(meta || {}).filter(function (k) { return Number(meta[k] || 0) > 0; });
  var tabelaMeta = [['TIPO', 'META']];
  for (var m = 0; m < metaTipos.length; m++) {
    tabelaMeta.push([metaTipos[m], Number(meta[metaTipos[m]] || 0)]);
  }

  var tabelaMetaDia = [['TIPO', 'REALIZADO', '% META']];
  for (var md = 0; md < metaTipos.length; md++) {
    var tm = metaTipos[md];
    var metaVal = Number(meta[tm] || 0);
    var realizado = somarDisponibilidadePorMetaTipoFlash_(disp, tm);
    tabelaMetaDia.push([tm, realizado, metaVal > 0 ? (realizado / metaVal) : 0]);
  }

  var chartAux = [['TIPO', 'QTD']];
  var legend = [['TIPO', 'QTD', '%']];
  for (var g = 0; g < tiposVisao.length; g++) {
    var tg = tiposVisao[g];
    var qtdG = Number(disp[tg] || 0);
    if (qtdG <= 0) continue;
    var p = totalVeiculos > 0 ? (qtdG / totalVeiculos) : 0;
    chartAux.push([tg, qtdG]);
    legend.push([tg, qtdG, p]);
  }
  while (legend.length < 6) legend.push(['', '', '']);

  return {
    blocks: {
      cards: cards,
      disp: tabelaDisp,
      util: tabelaUtil,
      corte: tabelaCorte,
      meta: tabelaMeta,
      metaDia: tabelaMetaDia,
      chartAux: chartAux
    },
    grafico: { hasData: chartAux.length > 1, rows: chartAux.length },
    layout: {
      area: { row: 1, col: 1, rows: 34, cols: 18 },
      title: { row: 1, col: 1, rows: 2, cols: 18 },
      cards: { row: 3, col: 1, rows: 2, cols: 8 },
      disp: { row: 6, col: 1, rows: tabelaDisp.length, cols: 4 },
      util: { row: 6, col: 6, rows: tabelaUtil.length, cols: 3 },
      corte: { row: 19, col: 1, rows: tabelaCorte.length, cols: 3 },
      meta: { row: 19, col: 5, rows: tabelaMeta.length, cols: 2 },
      metaDia: { row: 19, col: 8, rows: tabelaMetaDia.length, cols: 3 },
      panel: { row: 6, col: 11, rows: 23, cols: 8 },
      chart: {
        title: { row: 7, col: 11, rows: 2, cols: 8 },
        place: { row: 9, col: 11 },
        aux: { row: 1, col: 22 }
      }
    }
  };
}

function prepararAbaFlashLastMile_(sheet) {
  sheet.clearConditionalFormatRules();
  sheet.getCharts().forEach(function (chart) { sheet.removeChart(chart); });
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).breakApart();
  sheet.clearContents();
  sheet.clearFormats();
  sheet.setHiddenGridlines(true);
}

function escreverBlocosFlashLastMile_(sheet, modelo) {
  var b = modelo.blocks;
  var l = modelo.layout;

  sheet.getRange(l.cards.row, l.cards.col, l.cards.rows, l.cards.cols).setValues(b.cards);
  sheet.getRange(l.disp.row, l.disp.col, l.disp.rows, l.disp.cols).setValues(b.disp);
  sheet.getRange(l.util.row, l.util.col, l.util.rows, l.util.cols).setValues(b.util);
  sheet.getRange(l.corte.row, l.corte.col, l.corte.rows, l.corte.cols).setValues(b.corte);
  sheet.getRange(l.meta.row, l.meta.col, l.meta.rows, l.meta.cols).setValues(b.meta);
  sheet.getRange(l.metaDia.row, l.metaDia.col, l.metaDia.rows, l.metaDia.cols).setValues(b.metaDia);
  sheet.getRange(l.chart.aux.row, l.chart.aux.col, b.chartAux.length, 2).setValues(b.chartAux);
  sheet.getRange(l.chart.aux.row, l.chart.aux.col, b.chartAux.length, 2).setFontColor('#ffffff').setBackground('#ffffff');

  sheet.getRange(l.title.row, l.title.col, l.title.rows, l.title.cols).setValues(matrizVaziaFlash_(l.title.rows, l.title.cols, ''));
  sheet.getRange(l.title.row, l.title.col).setValue('FLASH LAST MILE');
  sheet.getRange(l.chart.title.row, l.chart.title.col, l.chart.title.rows, l.chart.title.cols).setValues(matrizVaziaFlash_(l.chart.title.rows, l.chart.title.cols, ''));
  sheet.getRange(l.chart.title.row, l.chart.title.col).setValue('DISPONIBILIDADE');

  sheet.getRange(l.title.row, l.title.col, l.title.rows, l.title.cols).merge();
  sheet.getRange(l.chart.title.row, l.chart.title.col, l.chart.title.rows, l.chart.title.cols).merge();

  sheet.getRange(l.cards.row, 1, 1, 2).merge();
  sheet.getRange(l.cards.row, 3, 1, 2).merge();
  sheet.getRange(l.cards.row, 5, 1, 2).merge();
  sheet.getRange(l.cards.row, 7, 1, 2).merge();
  sheet.getRange(l.cards.row + 1, 1, 1, 2).merge();
  sheet.getRange(l.cards.row + 1, 3, 1, 2).merge();
  sheet.getRange(l.cards.row + 1, 5, 1, 2).merge();
  sheet.getRange(l.cards.row + 1, 7, 1, 2).merge();
}

function aplicarEstilosFlash_(sheet, layout) {
  var COLORS = {
    bg: '#f1f5f9',
    panel: '#ffffff',
    header: '#1e3a8a',
    headerText: '#ffffff',
    card: '#ffffff',
    border: '#d1d5db',
    text: '#0f172a'
  };

  sheet.getRange(layout.area.row, layout.area.col, layout.area.rows, layout.area.cols)
    .setBackground(COLORS.bg)
    .setFontFamily('Arial')
    .setFontColor(COLORS.text);

  sheet.setColumnWidths(1, 18, 90);
  sheet.setColumnWidth(1, 170);
  sheet.setColumnWidth(2, 115);
  sheet.setColumnWidth(3, 100);
  sheet.setColumnWidth(4, 100);
  sheet.setColumnWidth(5, 160);
  sheet.setColumnWidth(6, 110);
  sheet.setColumnWidth(7, 110);
  sheet.setColumnWidth(8, 160);
  sheet.setColumnWidth(9, 110);
  sheet.setColumnWidth(10, 110);
  sheet.setColumnWidth(11, 120);

  sheet.getRange(layout.title.row, layout.title.col, layout.title.rows, layout.title.cols)
    .setBackground(COLORS.header)
    .setFontColor(COLORS.headerText)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setFontSize(16)
    .setBorder(true, true, true, true, false, false, COLORS.border, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  sheet.getRange(layout.cards.row, layout.cards.col, layout.cards.rows, layout.cards.cols)
    .setBackground(COLORS.card)
    .setBorder(true, true, true, true, true, true, COLORS.border, SpreadsheetApp.BorderStyle.SOLID)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.getRange(layout.cards.row, layout.cards.col, 1, layout.cards.cols)
    .setBackground('#bfdbfe')
    .setFontWeight('bold')
    .setFontColor('#1e3a8a');
  sheet.getRange(layout.cards.row + 1, 1, 1, 2).setNumberFormat('0');
  sheet.getRange(layout.cards.row + 1, 3, 1, 2).setNumberFormat('0');
  sheet.getRange(layout.cards.row + 1, 5, 1, 2).setNumberFormat('0%');

  estilizarTabelaCardFlash_(sheet, layout.disp, { pctCols: [3, 4], totalRow: layout.disp.row + layout.disp.rows - 1 }, COLORS);
  estilizarTabelaCardFlash_(sheet, layout.util, { pctCols: [3], totalRow: layout.util.row + layout.util.rows - 1 }, COLORS);
  estilizarTabelaCardFlash_(sheet, layout.corte, { pctCols: [3] }, COLORS);
  estilizarTabelaCardFlash_(sheet, layout.meta, {}, COLORS);
  estilizarTabelaCardFlash_(sheet, layout.metaDia, { pctCols: [3] }, COLORS);

  sheet.getRange(layout.panel.row, layout.panel.col, layout.panel.rows, layout.panel.cols)
    .setBackground(COLORS.panel)
    .setBorder(true, true, true, true, false, false, '#94a3b8', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  sheet.getRange(layout.chart.title.row, layout.chart.title.col, layout.chart.title.rows, layout.chart.title.cols)
    .setBackground('#0f172a')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setFontSize(13);
}

function estilizarTabelaCardFlash_(sheet, box, opts, colors) {
  var cfg = opts || {};
  var rg = sheet.getRange(box.row, box.col, box.rows, box.cols);
  rg.setBackground(colors.card)
    .setBorder(true, true, true, true, true, true, colors.border, SpreadsheetApp.BorderStyle.SOLID)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setFontSize(9);

  sheet.getRange(box.row, box.col, 1, box.cols)
    .setBackground('#e2e8f0')
    .setFontWeight('bold');

  if (cfg.totalRow) {
    sheet.getRange(cfg.totalRow, box.col, 1, box.cols)
      .setBackground('#dbeafe')
      .setFontWeight('bold');
  }

  var pctCols = cfg.pctCols || [];
  for (var i = 0; i < pctCols.length; i++) {
    sheet.getRange(box.row + 1, box.col + pctCols[i] - 1, Math.max(1, box.rows - 1), 1).setNumberFormat('0%');
  }
}

function atualizarGraficoDisponibilidadeFlash_(sheet, chartLayout, chartData) {
  sheet.getCharts().forEach(function (chart) { sheet.removeChart(chart); });
  if (!chartData || !chartData.hasData) return;

  var auxStart = chartLayout.aux;
  var rows = Math.max(2, Number(chartData.rows || 2));
  var dataRange = sheet.getRange(auxStart.row, auxStart.col, rows, 2);

  var chart = sheet.newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(dataRange)
    .setNumHeaders(1)
    .setOption('title', '')
    .setOption('pieHole', 0.58)
    .setOption('legend', { position: 'right', textStyle: { fontSize: 10 } })
    .setOption('pieSliceText', 'percentage')
    .setOption('colors', ['#3b82f6', '#ef4444', '#f59e0b', '#22c55e', '#a855f7'])
    .setOption('pieSliceTextStyle', { color: '#111827', fontSize: 11, bold: true })
    .setOption('backgroundColor', '#ffffff')
    .setOption('chartArea', { left: 20, top: 16, width: '72%', height: '82%' })
    .setPosition(chartLayout.place.row, chartLayout.place.col, 0, 0)
    .build();
  sheet.insertChart(chart);
}

function statusDisponivelFlash_(valorStatus) {
  var s = normalizeHeader_(valorStatus);
  if (!s) return true;
  if (s === normalizeHeader_('DISPONIVEL')) return true;
  if (s === normalizeHeader_('DISPONÍVEL')) return true;
  if (s === normalizeHeader_('DISPONIVEL TOTAL')) return true;
  if (s === normalizeHeader_('DISPONIVEL PARCIAL')) return true;
  return false;
}

function coletarMetaPorTipoFlash_(ss) {
  var out = Object.assign({}, getDefaultMetaPorTipoFlash_());
  var shMeta = findSheetCaseInsensitive_(ss, 'META DIARIA') || findSheetCaseInsensitive_(ss, 'FLASH META');
  if (!shMeta) return out;
  if (shMeta.getLastRow() < 2 || shMeta.getLastColumn() < 2) return out;

  var hMap = mapHeaders_(shMeta, 1);
  var cTipo = getHeaderColOptional_(hMap, ['TIPO', 'PERFIL']);
  var cMeta = getHeaderColOptional_(hMap, ['META', 'META DIARIA', 'QTD']);
  if (!cTipo || !cMeta) return out;

  var rows = getSheetDataRowsDisplay_(shMeta, shMeta.getLastColumn(), 1);
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i] || [];
    var tipo = canonicalizarTipoFlash_(row[cTipo - 1]);
    if (!tipo) continue;
    var val = Number(row[cMeta - 1] || 0);
    if (!isFinite(val) || val < 0) val = 0;
    out[tipo] = Number(out[tipo] || 0) + val;
  }
  return out;
}

function getDefaultMetaPorTipoFlash_() {
  return {
    'HR / VAN': 15,
    'FIORINO': 10,
    'VUC': 2
  };
}

function obterMetaTipoAplicavelFlash_(tipo, metaMap) {
  var tNorm = normalizeHeader_(tipo);
  var keys = Object.keys(metaMap || {});
  for (var i = 0; i < keys.length; i++) {
    if (normalizeHeader_(keys[i]) === tNorm) return keys[i];
  }

  if (tNorm === normalizeHeader_('HR') || tNorm === normalizeHeader_('VAN')) {
    for (var j = 0; j < keys.length; j++) {
      var kn = normalizeHeader_(keys[j]);
      if (kn.indexOf('HR') !== -1 && kn.indexOf('VAN') !== -1) return keys[j];
    }
  }
  return '';
}

function somarDisponibilidadePorMetaTipoFlash_(dispMap, metaTipo) {
  var tipoNorm = normalizeHeader_(metaTipo);
  var total = 0;
  var keys = Object.keys(dispMap || {});

  if (tipoNorm.indexOf('HR') !== -1 && tipoNorm.indexOf('VAN') !== -1) {
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var kn = normalizeHeader_(k);
      if (kn === normalizeHeader_('HR') || kn === normalizeHeader_('VAN') || kn === normalizeHeader_('HR / VAN') || kn === normalizeHeader_('HR/VAN')) {
        total += Number(dispMap[k] || 0);
      }
    }
    return total;
  }

  for (var j = 0; j < keys.length; j++) {
    var kk = keys[j];
    if (normalizeHeader_(kk) === tipoNorm) total += Number(dispMap[kk] || 0);
  }
  return total;
}

function compactarTiposParaFlash_(tipos, disp, util, meta, maxRows) {
  var list = (tipos || []).slice();
  var max = Math.max(1, Number(maxRows || 7));
  if (list.length <= max) return list;

  var keep = list.slice(0, max - 1);
  var others = list.slice(max - 1);
  var sumDisp = 0;
  var sumUtil = 0;
  var sumMeta = 0;
  for (var i = 0; i < others.length; i++) {
    var t = others[i];
    sumDisp += Number(disp[t] || 0);
    sumUtil += Number(util[t] || 0);
    sumMeta += Number(meta[t] || 0);
    delete disp[t];
    delete util[t];
    delete meta[t];
  }
  disp['OUTROS'] = Number(disp['OUTROS'] || 0) + sumDisp;
  util['OUTROS'] = Number(util['OUTROS'] || 0) + sumUtil;
  meta['OUTROS'] = Number(meta['OUTROS'] || 0) + sumMeta;
  keep.push('OUTROS');
  return keep;
}

function canonicalizarTipoFlash_(value) {
  var raw = String(value == null ? '' : value).trim();
  if (!raw) return '';
  var n = normalizeHeader_(raw);
  if (n === normalizeHeader_('HR') || n === normalizeHeader_('VAN') || n === normalizeHeader_('HR / VAN') || n === normalizeHeader_('HR/VAN')) {
    return 'HR / VAN';
  }
  return raw.toUpperCase();
}

function monitorarAtualizacaoFlashLastMile() {
  var props = PropertiesService.getScriptProperties();
  var assinaturaAtual = gerarAssinaturaFlashLastMile_();
  var assinaturaAnterior = props.getProperty('FLASH_LAST_MILE_SIGNATURE') || '';
  if (assinaturaAtual === assinaturaAnterior) {
    return { ok: true, skipped: true, reason: 'sem_mudanca' };
  }

  var result = gerarFlashLastMile();
  props.setProperty('FLASH_LAST_MILE_SIGNATURE', assinaturaAtual);
  props.setProperty('FLASH_LAST_MILE_LAST_RUN', new Date().toISOString());
  return { ok: true, skipped: false, run: result };
}

function ativarMonitorFlashLastMile1Min() {
  var cfg = getFlashLastMileConfig_();
  var triggerName = cfg.TRIGGER_FN;
  var removed = 0;
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction && String(t.getHandlerFunction() || '') === triggerName) {
      ScriptApp.deleteTrigger(t);
      removed++;
    }
  });
  ScriptApp.newTrigger(triggerName).timeBased().everyMinutes(cfg.POLL_MINUTES).create();
  var firstRun = monitorarAtualizacaoFlashLastMile();
  return { ok: true, trigger: triggerName, removed: removed, firstRun: firstRun };
}

function desativarMonitorFlashLastMile() {
  var cfg = getFlashLastMileConfig_();
  var triggerName = cfg.TRIGGER_FN;
  var removed = 0;
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction && String(t.getHandlerFunction() || '') === triggerName) {
      ScriptApp.deleteTrigger(t);
      removed++;
    }
  });
  return { ok: true, removed: removed };
}

function ensureFlashLastMileMonitorSempreAtivo_() {
  var cfg = getFlashLastMileConfig_();
  if (!cfg.ENABLED) return { active: false, reason: 'disabled' };

  var triggerName = cfg.TRIGGER_FN;
  var active = [];
  var removed = 0;
  ScriptApp.getProjectTriggers().forEach(function (t) {
    var fn = t.getHandlerFunction ? String(t.getHandlerFunction() || '') : '';
    if (fn !== triggerName) return;
    if (!active.length) active.push(t);
    else {
      ScriptApp.deleteTrigger(t);
      removed++;
    }
  });
  if (!active.length) {
    ScriptApp.newTrigger(triggerName).timeBased().everyMinutes(cfg.POLL_MINUTES).create();
  }
  return { active: true, removed: removed, handler: triggerName, everyMinutes: cfg.POLL_MINUTES };
}

function getFlashLastMileConfig_() {
  return {
    ENABLED: true,
    POLL_MINUTES: 1,
    TRIGGER_FN: 'monitorarAtualizacaoFlashLastMile'
  };
}

function gerarAssinaturaFlashLastMile_() {
  var dados = coletarDadosFlashLastMile_();
  var norm = normalizarDadosFlashLastMile_(dados);
  var base = {
    dataReferencia: norm.dataReferencia,
    disponibilidadePorTipo: norm.disponibilidadePorTipo,
    utilizadosPorTipo: norm.utilizadosPorTipo,
    metaPorTipo: norm.metaPorTipo
  };
  var json = JSON.stringify(base);
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, json);
  return Utilities.base64Encode(digest);
}

function normalizarMapaNumericoFlash_(obj) {
  var src = obj || {};
  var out = {};
  Object.keys(src).forEach(function (k) {
    var tipo = String(k || '').trim();
    if (!tipo) return;
    var num = Number(src[k] || 0);
    if (!isFinite(num)) num = 0;
    out[tipo] = num;
  });
  return out;
}

function matrizVaziaFlash_(rows, cols, fill) {
  var out = [];
  for (var r = 0; r < rows; r++) {
    var line = [];
    for (var c = 0; c < cols; c++) line.push(fill);
    out.push(line);
  }
  return out;
}
