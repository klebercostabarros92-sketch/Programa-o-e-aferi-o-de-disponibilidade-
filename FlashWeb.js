// doGet function moved to Código.js to prevent conflicts
function renderFlashDashboard_(e) {
  var tpl = HtmlService.createTemplateFromFile('FlashDashboard');
  tpl.payload = JSON.stringify(getFlashDashboardData_());
  return tpl
    .evaluate()
    .setTitle('FLASH LAST MILE')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getFlashDashboardData() {
  return getFlashDashboardData_();
}

function getFlashDashboardData_() {
  var dados = coletarDadosFlashLastMile_();
  var norm = normalizarDadosFlashLastMile_(dados);
  var tipos = norm.tiposOrdenados || [];
  var disp = norm.disponibilidadePorTipo || {};
  var util = norm.utilizadosPorTipo || {};
  var meta = norm.metaPorTipo || {};
  var totalVeiculos = Number(norm.totalVeiculos || 0);
  var totalUtilizado = Number(norm.totalUtilizado || 0);
  var pctUtil = totalVeiculos > 0 ? (totalUtilizado / totalVeiculos) : 0;
  if (pctUtil > 1) pctUtil = 1;

  var disponibilidade = [];
  var utilizados = [];
  var segundoCorte = [];
  for (var i = 0; i < tipos.length; i++) {
    var t = tipos[i];
    var d = Number(disp[t] || 0);
    var u = Number(util[t] || 0);
    var mKey = obterMetaTipoAplicavelFlash_(t, meta);
    var m = Number(meta[mKey] || 0);
    var c = Math.max(d - u, 0);
    disponibilidade.push({
      tipo: t,
      qtd: d,
      pctMeta: m > 0 ? (d / m) : 0,
      pctPart: totalVeiculos > 0 ? (d / totalVeiculos) : 0
    });
    utilizados.push({
      tipo: t,
      qtd: u,
      pctDisp: d > 0 ? (u / d) : 0
    });
    segundoCorte.push({
      tipo: t,
      qtd: c,
      pctDisp: d > 0 ? (c / d) : 0
    });
  }

  var metaTipos = Object.keys(meta || {}).filter(function (k) { return Number(meta[k] || 0) > 0; });
  var metaDiaria = [];
  var metaObtida = [];
  for (var j = 0; j < metaTipos.length; j++) {
    var mt = metaTipos[j];
    var metaVal = Number(meta[mt] || 0);
    var realizado = somarDisponibilidadePorMetaTipoFlash_(disp, mt);
    metaDiaria.push({ tipo: mt, meta: metaVal });
    metaObtida.push({
      tipo: mt,
      realizado: realizado,
      pctMeta: metaVal > 0 ? (realizado / metaVal) : 0
    });
  }

  var chart = disponibilidade
    .filter(function (x) { return Number(x.qtd || 0) > 0; })
    .map(function (x) {
      return {
        tipo: x.tipo,
        qtd: x.qtd,
        pct: x.pctPart
      };
    });

  return {
    dataReferencia: norm.dataReferencia,
    generatedAt: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss'),
    kpis: {
      totalDisponivel: totalVeiculos,
      totalUtilizado: totalUtilizado,
      pctUtilizacao: pctUtil
    },
    disponibilidade: disponibilidade,
    utilizados: utilizados,
    segundoCorte: segundoCorte,
    metaDiaria: metaDiaria,
    metaObtida: metaObtida,
    chart: chart
  };
}
