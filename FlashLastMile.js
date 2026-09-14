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
      totalUtilizado: norm.totalUtilizado,
    },
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

  var metaPorTipo = coletarMetaPorTipoFlash_(ss);

  return {
    dataReferencia: dataReferencia,
    disponibilidadePorTipo: disponibilidadePorTipo,
    utilizadosPorTipo: utilizadosPorTipo,
    metaPorTipo: metaPorTipo,
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
    totalUtilizado: totalUtilizado,
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
  var seen = {};
  var out = [];

  fixed.forEach(function (t) {
    seen[normalizeHeader_(t)] = true;
    out.push(t);
    if (disp[t] == null) disp[t] = 0;
    if (util[t] == null) util[t] = 0;
    if (meta[t] == null) meta[t] = Number(meta[t] || 0);
  });

  (tiposDin || []).forEach(function (t) {
    var key = normalizeHeader_(t);
    if (!key || seen[key]) return;
    seen[key] = true;
    out.push(t);
  });

  return out;
}

function montarMatrizesFlash_(dataset) {
  var tipos = dataset.tiposOrdenados || [];
  var disp = dataset.disponibilidadePorTipo || {};
  var util = dataset.utilizadosPorTipo || {};
  var meta = dataset.metaPorTipo || {};
  var totalVeiculos = Number(dataset.totalVeiculos || 0);
  var totalUtilizado = Number(dataset.totalUtilizado || 0);
  var tiposVisao = compactarTiposParaFlash_(tipos, disp, util, meta, 7);

  var segundoCorte = {};
  for (var i = 0; i < tiposVisao.length; i++) {
    var tipo = tiposVisao[i];
    segundoCorte[tipo] = Math.max(Number(disp[tipo] || 0) - Number(util[tipo] || 0), 0);
  }

  var block1Rows = Math.max(9, 2 + tiposVisao.length);
  var block1 = matrizVaziaFlash_(block1Rows, 3, '');
  block1[0] = ['DISPONIBILIDADE', dataset.dataReferencia, ''];
  for (var r1 = 0; r1 < tiposVisao.length; r1++) {
    var t1 = tiposVisao[r1];
    var dispQtd = Number(disp[t1] || 0);
    var metaKey1 = obterMetaTipoAplicavelFlash_(t1, meta);
    var metaQtd = Number(meta[metaKey1] || 0);
    block1[1 + r1] = [t1, dispQtd, metaQtd > 0 ? (dispQtd / metaQtd) : 0];
  }
  var totalRow1 = 1 + tiposVisao.length;
  block1[totalRow1] = ['TOTAL VEICULOS', totalVeiculos, ''];

  var metaTipos = Object.keys(meta || {}).filter(function (t) { return Number(meta[t] || 0) > 0; });
  if (!metaTipos.length) metaTipos = tiposVisao.slice();
  var block2Rows = Math.max(5, 3 + metaTipos.length);
  var block2 = matrizVaziaFlash_(block2Rows, 3, '');
  block2[0] = ['META DIARIA', '', ''];
  block2[1] = ['TIPO', 'META', ''];
  for (var r2 = 0; r2 < metaTipos.length; r2++) {
    var t2 = metaTipos[r2];
    block2[2 + r2] = [t2, Number(meta[t2] || 0), ''];
  }

  var block3Rows = Math.max(5, 3 + metaTipos.length);
  var block3 = matrizVaziaFlash_(block3Rows, 3, '');
  block3[0] = ['PERCENTUAL DA META OBTIDO NO DIA', '', ''];
  block3[1] = ['TIPO', 'QTD', '%'];
  for (var r3 = 0; r3 < metaTipos.length; r3++) {
    var t3 = metaTipos[r3];
    var m3 = Number(meta[t3] || 0);
    var d3 = somarDisponibilidadePorMetaTipoFlash_(disp, t3);
    block3[2 + r3] = [t3, d3, m3 > 0 ? (d3 / m3) : 0];
  }

  var block4Rows = Math.max(10, 4 + tiposVisao.length);
  var block4 = matrizVaziaFlash_(block4Rows, 3, '');
  block4[0] = ['Utilizados pelo Cafe', '', ''];
  block4[1] = ['TIPO', 'QTD', ''];
  for (var r4 = 0; r4 < tiposVisao.length; r4++) {
    var t4 = tiposVisao[r4];
    block4[2 + r4] = [t4, Number(util[t4] || 0), ''];
  }
  var usedTotalRow = 2 + tiposVisao.length;
  var usedPctRow = 3 + tiposVisao.length;
  block4[usedTotalRow] = ['Total Utilizado', totalUtilizado, ''];
  block4[usedPctRow] = ['% Utilizado', '', totalVeiculos > 0 ? (totalUtilizado / totalVeiculos) : 0];

  var block5Rows = Math.max(9, 3 + tiposVisao.length);
  var block5 = matrizVaziaFlash_(block5Rows, 3, '');
  block5[0] = ['disponiveis para ofertar segundo corte', '', ''];
  block5[1] = ['TIPO', 'QTD', ''];
  for (var r5 = 0; r5 < tiposVisao.length; r5++) {
    var t5 = tiposVisao[r5];
    block5[2 + r5] = [t5, Number(segundoCorte[t5] || 0), ''];
  }

  var b2Start = 12;
  var b3Start = Math.max(18, b2Start + block2Rows + 1);
  var b4Start = 1;
  var b5Start = Math.max(12, b4Start + block4Rows + 1);

  var chartAux = [['TIPO', 'QTD']];
  for (var d = 0; d < tiposVisao.length; d++) {
    var tc = tiposVisao[d];
    var qtd = Number(disp[tc] || 0);
    if (qtd <= 0) continue;
    var pct = totalVeiculos > 0 ? Math.round((qtd / totalVeiculos) * 100) : 0;
    chartAux.push([tc + '-' + qtd + '-' + pct + '%', qtd]);
  }

  return {
    blocks: {
      b1: block1,
      b2: block2,
      b3: block3,
      b4: block4,
      b5: block5,
      chartAux: chartAux,
    },
    grafico: { hasData: chartAux.length > 1, rows: chartAux.length },
    layout: {
      area: { row: 1, col: 1, rows: 28, cols: 17 },
      b1: { row: 1, col: 1, rows: block1Rows, cols: 3, totalRow: totalRow1 + 1 },
      b2: { row: b2Start, col: 1, rows: block2Rows, cols: 3 },
      b3: { row: b3Start, col: 1, rows: block3Rows, cols: 3 },
      b4: { row: b4Start, col: 5, rows: block4Rows, cols: 3, usedTotalRow: usedTotalRow + 1, usedPctRow: usedPctRow + 1 },
      b5: { row: b5Start, col: 5, rows: block5Rows, cols: 3 },
      panel: { row: 1, col: 9, rows: 24, cols: 9 },
      chart: {
        title: { row: 2, col: 9, rows: 2, cols: 9 },
        place: { row: 4, col: 10 },
        aux: { row: 26, col: 9 },
      },
    },
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

  sheet.getRange(l.b1.row, l.b1.col, l.b1.rows, l.b1.cols).setValues(b.b1);
  sheet.getRange(l.b2.row, l.b2.col, l.b2.rows, l.b2.cols).setValues(b.b2);
  sheet.getRange(l.b3.row, l.b3.col, l.b3.rows, l.b3.cols).setValues(b.b3);
  sheet.getRange(l.b4.row, l.b4.col, l.b4.rows, l.b4.cols).setValues(b.b4);
  sheet.getRange(l.b5.row, l.b5.col, l.b5.rows, l.b5.cols).setValues(b.b5);
  sheet.getRange(l.chart.aux.row, l.chart.aux.col, b.chartAux.length, 2).setValues(b.chartAux);

  sheet.getRange(l.panel.row, l.panel.col, l.panel.rows, l.panel.cols)
    .setValues(matrizVaziaFlash_(l.panel.rows, l.panel.cols, ''));
  var titulo = matrizVaziaFlash_(l.chart.title.rows, l.chart.title.cols, '');
  titulo[0][0] = 'DISPONIBILIDADE';
  sheet.getRange(l.chart.title.row, l.chart.title.col, l.chart.title.rows, l.chart.title.cols).setValues(titulo);

  sheet.getRange('A1:C1').breakApart();
  sheet.getRange(l.b2.row, l.b2.col, 1, 3).merge();
  sheet.getRange(l.b3.row, l.b3.col, 1, 3).merge();
  sheet.getRange(l.b4.row, l.b4.col, 1, 3).merge();
  sheet.getRange(l.b5.row, l.b5.col, 1, 3).merge();
  sheet.getRange(l.chart.title.row, l.chart.title.col, l.chart.title.rows, l.chart.title.cols).merge();
}

function aplicarEstilosFlash_(sheet, layout) {
  var COLORS = {
    blue: '#18a7d5',
    yellowStrong: '#f7c948',
    yellowLight: '#fde68a',
    grayLight: '#e5e7eb',
    panel: '#4b5563',
    black: '#000000',
    white: '#ffffff',
  };

  sheet.getRange(layout.area.row, layout.area.col, layout.area.rows, layout.area.cols)
    .setBackground(COLORS.blue)
    .setFontFamily('Arial');

  sheet.setColumnWidth(1, 185);
  sheet.setColumnWidth(2, 160);
  sheet.setColumnWidth(3, 85);
  sheet.setColumnWidth(4, 26);
  sheet.setColumnWidth(5, 175);
  sheet.setColumnWidth(6, 120);
  sheet.setColumnWidth(7, 95);
  sheet.setColumnWidth(8, 26);
  sheet.setColumnWidths(9, 9, 88);
  sheet.setRowHeights(1, 28, 22);
  sheet.setRowHeight(1, 28);

  estilizarTabelaFlash_(sheet, layout.b1, COLORS, {
    dataStartOffset: 1,
    percentCol: 3,
    totalRow: layout.b1.totalRow,
  });
  estilizarTabelaFlash_(sheet, layout.b2, COLORS, {
    headerRowOffset: 1,
    dataStartOffset: 2,
  });
  estilizarTabelaFlash_(sheet, layout.b3, COLORS, {
    headerRowOffset: 1,
    dataStartOffset: 2,
    percentCol: 3,
  });
  estilizarTabelaFlash_(sheet, layout.b4, COLORS, {
    headerRowOffset: 1,
    dataStartOffset: 2,
    percentCol: 3,
    totalRows: [layout.b4.usedTotalRow, layout.b4.usedPctRow],
  });
  estilizarTabelaFlash_(sheet, layout.b5, COLORS, {
    headerRowOffset: 1,
    dataStartOffset: 2,
  });

  sheet.getRange(layout.panel.row, layout.panel.col, layout.panel.rows, layout.panel.cols)
    .setBackground(COLORS.panel)
    .setBorder(true, true, true, true, false, false, '#1f2937', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  sheet.getRange(layout.chart.title.row, layout.chart.title.col, layout.chart.title.rows, layout.chart.title.cols)
    .setBackground(COLORS.panel)
    .setFontColor(COLORS.white)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setFontSize(18);

  // Bloco principal exatamente no formato do print: colunas amarelo/cinza/amarelo.
  if (layout && layout.b1) {
    var b1 = layout.b1;
    if (b1.rows > 1) {
      sheet.getRange(b1.row + 1, b1.col, b1.rows - 1, 1).setBackground(COLORS.yellowLight).setFontWeight('bold');
      sheet.getRange(b1.row + 1, b1.col + 1, b1.rows - 1, 1).setBackground(COLORS.grayLight).setFontWeight('bold');
      sheet.getRange(b1.row + 1, b1.col + 2, b1.rows - 1, 1).setBackground(COLORS.yellowLight).setFontWeight('bold');
      sheet.getRange(b1.row + 1, b1.col + 1, b1.rows - 1, 1).setNumberFormat('0');
      sheet.getRange(b1.totalRow, b1.col, 1, 2).setBackground(COLORS.yellowStrong).setFontWeight('bold');
      sheet.getRange(b1.totalRow, b1.col + 2, 1, 1).setBackground(COLORS.blue).setBorder(false, false, false, false, false, false);
      sheet.getRange(b1.totalRow, b1.col + 2).clearContent().setNumberFormat('@');
    }
  }
}

function estilizarTabelaFlash_(sheet, box, colors, opts) {
  var cfg = opts || {};
  var rg = sheet.getRange(box.row, box.col, box.rows, box.cols);
  rg.setBorder(true, true, true, true, true, true, colors.black, SpreadsheetApp.BorderStyle.SOLID)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setFontSize(10);

  sheet.getRange(box.row, box.col, 1, box.cols)
    .setBackground(colors.yellowStrong)
    .setFontWeight('bold');

  if (cfg.dateRowOffset != null && box.rows > cfg.dateRowOffset) {
    sheet.getRange(box.row + cfg.dateRowOffset, box.col, 1, box.cols)
      .setBackground(colors.yellowLight)
      .setFontWeight('bold');
  }
  if (cfg.headerRowOffset != null && box.rows > cfg.headerRowOffset) {
    sheet.getRange(box.row + cfg.headerRowOffset, box.col, 1, box.cols)
      .setBackground(colors.yellowStrong)
      .setFontWeight('bold');
  }
  var dataStartOffset = cfg.dataStartOffset == null ? 1 : cfg.dataStartOffset;
  if (box.rows > dataStartOffset) {
    sheet.getRange(box.row + dataStartOffset, box.col, box.rows - dataStartOffset, box.cols).setBackground(colors.grayLight);
    sheet.getRange(box.row + dataStartOffset, box.col, box.rows - dataStartOffset, 1).setBackground(colors.yellowLight);
  }

  if (cfg.dateRow && box.col === 1) {
    sheet.getRange(cfg.dateRow, 2, 1, 3).setBackground(colors.grayLight).setFontWeight('bold');
  }
  if (cfg.totalRow) {
    sheet.getRange(cfg.totalRow, box.col, 1, box.cols).setBackground(colors.yellowStrong).setFontWeight('bold');
  }
  if (cfg.totalRows && cfg.totalRows.length) {
    cfg.totalRows.forEach(function (r) {
      sheet.getRange(r, box.col, 1, box.cols).setBackground(colors.yellowStrong).setFontWeight('bold');
    });
  }
  if (cfg.percentCol) {
    var pctStart = box.row + dataStartOffset;
    var pctRows = Math.max(1, box.rows - dataStartOffset);
    sheet.getRange(pctStart, box.col + cfg.percentCol - 1, pctRows, 1).setNumberFormat('0%');
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
    .setOption('pieHole', 0.55)
    .setOption('legend', { position: 'none' })
    .setOption('pieSliceText', 'label')
    .setOption('backgroundColor', 'transparent')
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
    'VUC': 2,
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
      if (kn === normalizeHeader_('HR') || kn === normalizeHeader_('VAN')) {
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
    TRIGGER_FN: 'monitorarAtualizacaoFlashLastMile',
  };
}

function gerarAssinaturaFlashLastMile_() {
  var dados = coletarDadosFlashLastMile_();
  var norm = normalizarDadosFlashLastMile_(dados);
  var base = {
    dataReferencia: norm.dataReferencia,
    disponibilidadePorTipo: norm.disponibilidadePorTipo,
    utilizadosPorTipo: norm.utilizadosPorTipo,
    metaPorTipo: norm.metaPorTipo,
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
