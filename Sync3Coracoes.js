/**
 * Sincroniza a disponibilidade de hoje para a planilha externa da 3 Corações.
 * Acionado pelo botão "3 corações" no menu.
 */
function syncDisponibilidadePara3CoracoesExterno() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const shLocal = findSheetCaseInsensitive_(ss, 'DISPONIBILIDADE');
  if (!shLocal) {
    SpreadsheetApp.getUi().alert('Erro: Aba "DISPONIBILIDADE" não encontrada.');
    return;
  }

  const targetId = '1Ysk4oXy18uuWbqTMbFNq0zZuNBDdnJWqL4L7dsmZm0g';
  let targetSs;
  try {
    targetSs = SpreadsheetApp.openById(targetId);
  } catch (e) {
    SpreadsheetApp.getUi().alert('Erro: Não foi possível abrir a planilha externa. Verifique as permissões.\nID: ' + targetId);
    return;
  }
  
  const targetSh = targetSs.getSheets()[0]; // Sincroniza na primeira aba
  
  const today = toDateOnly_(new Date());
  const dayOfWeek = new Date().getDay(); // 0=Sunday, 1=Monday, ...
  
  // Mapeamento local
  const localHeaderRow = (typeof getDisponibilidadeHeaderRow_ === 'function' ? getDisponibilidadeHeaderRow_() : 1) || 1;
  const localMap = mapHeaders_(shLocal, localHeaderRow);
  const cData = getHeaderColOptional_(localMap, ['DATA']);
  const cPlaca = getHeaderColRequired_(localMap, ['PLACA'], 'DISPONIBILIDADE');
  const cMot = getHeaderColOptional_(localMap, ['MOTORISTA']);
  const cPerf = getHeaderColOptional_(localMap, ['PERFIL']);
  const cCont = getHeaderColOptional_(localMap, ['CONTATO']);
  const cDisp = getHeaderColRequired_(localMap, ['DISPONIBILIDADE'], 'DISPONIBILIDADE');
  const cObs = getHeaderColOptional_(localMap, ['OBSERVACAO', 'OBSERVAÇÃO']);
  const cPlan = getHeaderColOptional_(localMap, ['PLANO', 'PLANO DE VIAGEM', 'SITUAÇÃO', 'SITUACAO']);
  const cPallets = getHeaderColOptional_(localMap, ['PALLETS']);
  const cTara = getHeaderColOptional_(localMap, ['TARA']);
  const cCpf = getHeaderColOptional_(localMap, ['CPF']);
  const cTransp = getHeaderColOptional_(localMap, ['TRANSP.', 'TRANSPORTE', 'TRANSP']);

  const localRows = getSheetDataRowsDisplay_(shLocal, shLocal.getLastColumn(), localHeaderRow);
  const toSync = [];

  for (let i = 0; i < localRows.length; i++) {
    const row = localRows[i];
    
    // Filtrar por data
    if (cData) {
      const rowDate = parseDateBR_(row[cData - 1]) || toDateOnly_(row[cData - 1]);
      if (!rowDate || !isSameDay_(rowDate, today)) continue;
    }

    const placa = String(row[cPlaca - 1] || '').trim().toUpperCase();
    if (!placa) continue;

    const motorista = cMot ? String(row[cMot - 1] || '').trim() : '';
    let perfil = cPerf ? String(row[cPerf - 1] || '').trim().toUpperCase() : '';
    const contato = cCont ? String(row[cCont - 1] || '').trim() : '';
    const statusRaw = cDisp ? String(row[cDisp - 1] || '').trim() : '';
    const obsOriginal = cObs ? String(row[cObs - 1] || '').trim() : '';
    const plano = cPlan ? String(row[cPlan - 1] || '').trim() : '';
    
    // Tradução de Perfil: Cavalo -> CARRETA
    if (perfil === 'CAVALO') {
      perfil = 'CARRETA';
    }

    // Auto-preenchimento de Pallets e Tara com base no Perfil
    let pallets = cPallets ? String(row[cPallets - 1] || '').trim() : '';
    let tara = cTara ? String(row[cTara - 1] || '').trim() : '';

    const profileMap = {
      'TOCO': { p: '12', t: '8000' },
      'FIORINO': { p: '1', t: '500' },
      'CARRETA': { p: '26', t: '25000' },
      'VUC': { p: '4', t: '1500' },
      'VAN': { p: '2', t: '1200' },
      '3/4': { p: '8', t: '4500' },
      'HR': { p: '2', t: '1500' }
    };

    if (profileMap[perfil]) {
      // Se estiver vazio localmente, preenche com o padrão do perfil
      if (!pallets) pallets = profileMap[perfil].p;
      if (!tara) tara = profileMap[perfil].t;
    }

    const cpf = cCpf ? String(row[cCpf - 1] || '').trim() : '';
    const transp = cTransp ? String(row[cTransp - 1] || '').trim() || 'THX' : 'THX';

    // Converter status para inicial (D, I, P) conforme padrão da planilha alvo
    // Sincroniza Disponíveis (D) e Programados (P)
    const sn = normalizeHeader_(statusRaw);
    let statusAlvo = '';
    
    if (sn === 'DISPONIVEL' || sn === 'D' || sn === '') {
      statusAlvo = 'D';
    } else if (sn === 'PROGRAMADO' || sn === 'P') {
      statusAlvo = 'P';
    } else {
      // Outros status (ex: Indisponível) são filtrados
      continue;
    }

    // Alerta de Rodízio (São Paulo) - PRÓXIMO DIA ÚTIL
    /**
     * Regras SP:
     * 1 e 2 -> Segunda (1)
     * 3 e 4 -> Terça (2)
     * 5 e 6 -> Quarta (3)
     * 7 e 8 -> Quinta (4)
     * 9 e 0 -> Sexta (5)
     */
    let alertaRodizio = '';
    
    // Cálculo do PRÓXIMO DIA ÚTIL (Pula Sáb/Dom)
    const proxDiaUtil = new Date(today.getTime());
    do {
      proxDiaUtil.setDate(proxDiaUtil.getDate() + 1);
    } while (proxDiaUtil.getDay() === 0 || proxDiaUtil.getDay() === 6);
    
    const dayOfWeekProx = proxDiaUtil.getDay();
    const lastDigitMatch = placa.match(/\d$/);
    
    if (lastDigitMatch) {
      const lastDigit = parseInt(lastDigitMatch[0]);
      let rodizioDayRequired = -1;
      if (lastDigit === 1 || lastDigit === 2) rodizioDayRequired = 1;
      else if (lastDigit === 3 || lastDigit === 4) rodizioDayRequired = 2;
      else if (lastDigit === 5 || lastDigit === 6) rodizioDayRequired = 3;
      else if (lastDigit === 7 || lastDigit === 8) rodizioDayRequired = 4;
      else if (lastDigit === 9 || lastDigit === 0) rodizioDayRequired = 5;

      if (rodizioDayRequired === dayOfWeekProx) {
        const proxDtStr = Utilities.formatDate(proxDiaUtil, Session.getScriptTimeZone(), 'dd/MM/yyyy');
        alertaRodizio = 'RODIZIO SP PROX DIA UTIL (' + proxDtStr + ')';
      }
    }

    let obsFinal = obsOriginal;
    if (alertaRodizio) {
      obsFinal = (obsFinal ? obsFinal + ' | ' : '') + alertaRodizio;
    }


    // Formatar data para DD/MM/YYYY
    const dataStr = Utilities.formatDate(today, Session.getScriptTimeZone(), 'dd/MM/yyyy');

    // Montar linha para planilha alvo (A-K: 11 colunas)
    // A: DATA, B: PLACA, C: PERFIL, D: PALLETS, E: TARA, F: MOTORISTA, G: CPF, H: TRANSP., I: STATUS, J: SITUAÇÃO, K: OBSERVAÇÃO
    toSync.push([
      dataStr,        // A: DATA
      placa,          // B: PLACA
      perfil,         // C: PERFIL
      pallets,        // D: PALLETS
      tara,           // E: TARA
      motorista,      // F: MOTORISTA
      cpf,            // G: CPF
      transp,         // H: TRANSP.
      statusAlvo,     // I: STATUS
      plano,          // J: SITUAÇÃO
      obsFinal        // K: OBSERVAÇÃO
    ]);
  }

  if (toSync.length === 0) {
    SpreadsheetApp.getUi().alert('Nenhum dado de hoje encontrado para sincronizar.');
    return;
  }

  // Gravar na planilha alvo
  // Busca se já existem dados para hoje e limpa ou substitui?
  // O usuário disse "replique", geralmente isso significa limpar e preencher ou apendar.
  // Dado que é um "acionador", vou apendar ou substituir as mesmas placas.
  // Para simplificar e garantir o "padrão que está lá", vou buscar pela DATA + PLACA e atualizar ou inserir.

  const targetHeaderRow = 1;
  const targetDataRange = targetSh.getRange(targetHeaderRow + 1, 1, Math.max(1, targetSh.getLastRow() - targetHeaderRow), targetSh.getLastColumn());
  const targetValues = targetDataRange.getValues();
  const targetDisplay = targetDataRange.getDisplayValues();

  for (let s = 0; s < toSync.length; s++) {
    const rowToSync = toSync[s];
    const dataSync = rowToSync[0];
    const placaSync = normalizePlate_(rowToSync[1]);
    
    let foundIdx = -1;
    for (let t = 0; t < targetValues.length; t++) {
      const tData = targetDisplay[t][0]; // Coluna A (DATA)
      const tPlaca = normalizePlate_(targetDisplay[t][1]); // Coluna B (PLACA)
      
      if (tData === dataSync && tPlaca === placaSync) {
        foundIdx = t;
        break;
      }
    }

    if (foundIdx !== -1) {
      // Atualiza linha existente
      targetSh.getRange(targetHeaderRow + 1 + foundIdx, 1, 1, rowToSync.length).setValues([rowToSync]);
    } else {
      // Insere nova linha
      targetSh.appendRow(rowToSync);
    }
  }

  SpreadsheetApp.getUi().alert('Sincronização concluída! ' + toSync.length + ' veículos processados.');
}

/**
 * Reporta as placas da planilha externa (H e I) para a planilha de destino (O e P).
 * Acionado pelo botão "reportar placas" no menu.
 */
function reportarPlacas() {
  const ss = SpreadsheetApp.getActive();
  
  // Planilha de Origem
  const sourceId = '1ooEtvTdPAzAynx1UaRLYR7YCO8BJLitojJjxyBqriUg';
  let sourceSs;
  try {
    sourceSs = SpreadsheetApp.openById(sourceId);
  } catch (e) {
    SpreadsheetApp.getUi().alert('Erro: Não foi possível abrir a planilha de ORIGEM. Verifique as permissões.\nID: ' + sourceId);
    return;
  }
  
  const sourceSh = sourceSs.getSheetByName('Programação');
  if (!sourceSh) {
    SpreadsheetApp.getUi().alert('Erro: Aba "Programação" não encontrada na planilha de ORIGEM.');
    return;
  }
  
  // Planilha de Destino
  const targetId = '1v3vHmzNQWFwnQ4JsZKn70hM8OtscQlVlvS4OnGZJ4IU';
  let targetSs;
  try {
    targetSs = SpreadsheetApp.openById(targetId);
  } catch (e) {
    SpreadsheetApp.getUi().alert('Erro: Não foi possível abrir a planilha de DESTINO. Verifique as permissões.\nID: ' + targetId);
    return;
  }
  
  // Usar a aba "PROG DIARIA THX" conforme CONFIG ou a primeira aba se não encontrar
  let targetSh = targetSs.getSheetByName('PROG DIARIA THX');
  if (!targetSh) {
    targetSh = targetSs.getSheets()[0];
  }

  const lastRowSource = sourceSh.getLastRow();
  if (lastRowSource < 2) {
    SpreadsheetApp.getUi().alert('A planilha de ORIGEM está vazia.');
    return;
  }

  // Pegar dados das colunas H (8) e I (9) da origem
  const sourceData = sourceSh.getRange(2, 8, lastRowSource - 1, 2).getValues();
  
  // Limpar e preencher colunas O (15) e P (16) do destino
  // O usuário quer "preencher a planilha", vou assumir que ele quer espelhar o conteúdo.
  // Vou limpar o conteúdo anterior a partir da linha 2
  const lastRowTarget = targetSh.getLastRow();
  if (lastRowTarget >= 2) {
    targetSh.getRange(2, 15, lastRowTarget - 1, 2).clearContent();
  }
  
  // Gravar os dados na coluna O e P
  targetSh.getRange(2, 15, sourceData.length, 2).setValues(sourceData);

  // Forçar sincronização do status Programado na aba Disponibilidade
  try {
    if (typeof syncDisponibilidadeProgramadoFromProgramacao_ === 'function') {
      syncDisponibilidadeProgramadoFromProgramacao_();
    }
  } catch (e) {
    console.error('Erro ao sincronizar status Programado: ' + e);
    SpreadsheetApp.getActive().toast('⚠️ Erro ao sincronizar Programado: ' + (e && e.message ? e.message : e), 'Sync', 10);
  }

  SpreadsheetApp.getUi().alert('Relatório de placas concluído! ' + sourceData.length + ' linhas processadas.');
}
