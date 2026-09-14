const CONFIG = {
  // Configurações de Planilhas
  SHEET_PROGRAMACAO: 'Programa\u00e7\u00e3o',
  SHEET_DISPONIBILIDADE: 'Disponibilidade',
  PROGRAMACAO_HEADER_ROW: 3,
  DISPONIBILIDADE_HEADER_ROW: 1,
  MSG_HEADER_ROW: 1,
  TOAST_TITLE: 'Sincroniza\u00e7\u00e3o',
  
  // Cabeçalhos Padrão
  PROGRAMACAO_HEADERS: { 
    placa: 'Placa', 
    motorista: 'Motorista', 
    greenMileStatus: 'GREEN MILE', 
    attemicsStatus: 'WhatsApp', 
    clickupStatus: 'CLICKUP STATUS', 
    clickup: 'CLICKUP', 
    notaFiscal: 'Nota fiscal' 
  },
  DISP_HEADERS: { placa: 'PLACA', motorista: 'MOTORISTA' },

  SOURCE_SPREADSHEET_ID: '1v3vHmzNQWFwnQ4JsZKn70hM8OtscQlVlvS4OnGZJ4IU',
  SOURCE_SHEET_NAME: 'PROG DIARIA THX',
  TARGET_SHEET_NAME: 'Programa\u00e7\u00e3o',
  MESSAGE_SHEET_NAME: 'Programa\u00e7\u00e3o_Mensagem_Base',
  HEADER_SCAN_MAX_ROWS: 10,
  MAIN_HEADERS: ['PLANOS', 'COMPLEMENTO', 'PERFIL', 'Data de sa\u00edda', 'Data de carregamento', 'Faixa de agenda', 'Zona', 'Placa', 'Motorista', 'GREEN MILE', 'WhatsApp', 'CLICKUP STATUS', 'CLICKUP', 'Nota fiscal'],
  MESSAGE_HEADERS: ['PLANOS', 'Hor\u00e1rio agenda', 'SENHA/PROTOC.', 'Quantidade de entregas', 'Peso', 'Valor', 'Cidades', 'Bairros'],
  GREENMILE: {
    ENABLED: true,
    BASE_URL: 'https://3coracoes.greenmile.com',
    LOGIN_USERNAME: '',
    LOGIN_PASSWORD: '',
    RESTRICTIONS_FILTERS_QUERY:
      '%7B%22filters%22:%5B%22id%22,%22stop.orders.number%22,%22routeView.route.key%22,%22stop.location.key%22,%22stop.orders.plannedSize3%22,%22stop.orders.damagedSize3%22,%22stop.location.description%22,%22stop.orders.plannedSize1%22,%22stop.orders.stop.id%22,%22stop.orders.stop.key%22%5D,%22firstResult%22:0,%22maxResults%22:200%7D',
    SUMMARY_FILTERS_QUERY:
      '%7B%22filters%22:%5B%22id%22,%22stop.location.description%22,%22stop.location.key%22,%22stop.location.district%22,%22stop.location.city%22,%22stop.plannedSequenceNum%22,%22route.id%22,%22route.key%22%5D,%22firstResult%22:0,%22maxResults%22:500%7D',
    LOCATION_FILTERS_QUERY:
      '%7B%22filters%22:%5B%22id%22,%22description%22,%22locationType.id%22,%22locationType.description%22,%22district%22,%22zipCode%22,%22city%22,%22addressLine1%22,%22key%22%5D,%22firstResult%22:0,%22maxResults%22:51%7D',
  },
  CLICKUP: {
    TOKEN: '',
    BASE_URL: 'https://api.clickup.com/api/v2',
    LIST_ID_MOTORISTAS: '901308597214',
    PAGE_SIZE: 500,
    UNIDADE_FIELD: '🟢 Cliente / Unidade',
    UNIDADE_ALVO: 'CAFÉ 3C GUARULHOS',
    STATUS_FIELD: 'STATUS',
    STATUS_ALVO: 'MOTORISTA ATIVO',
    STATUS_ALVO_SECUNDARIO: 'AGUARDANDO PRIMEIRA ESCALA',
    PLACA_FIELD: '🟢 Placa',
    PERFIL_FIELD: '🟢 Perfil de veículo',
    MOTORISTA_FIELD: '🟢 Nome Motorista',
    CONTATO_FIELD: '🟢 Contato Motorista',
    PROGRAMACAO: {
      LIST_ID_CARDS: '901314444834',
      LIST_ID_MAPA: '90136429320',
      TEMPLATE_TASK_ID: '86aenj71r',
      SHEET_STATUS_COLUMN_NAME: 'CLICKUP STATUS',
      SHEET_LINK_COLUMN_NAME: 'CLICKUP',
      PENDING_PREFIX: '[Buscando dados]',
      ERROR_PREFIX: '[ERROR]',
      DEBOUNCE_MS: 3000,
      ENABLE_ONEDIT_JANELA_SYNC: true,
      UNIT_DEFAULT: 'GUARULHOS',
      CUSTOM_FIELDS: {
        PLAN: 'a729695f-9331-4dc2-9c69-a3bac00125ac',
        UNIT: '00d3531b-d5f9-4feb-8190-5add8a7d3750',
        INVOICE_VALUE: 'b5140ee9-3c4d-4a99-8ff5-916758af4121',
        WEIGHT: '10aef632-0456-4dca-aaa3-4b8d3aa50246',
        DELIVERIES: 'd90d0ef8-38a5-4bb7-93f8-093199455d00',
        MODALITY: '1ccf5e86-41cf-40a4-9178-fe15d3b47b6b',
        LOADING_DATE_TEXT: 'bff54544-f232-4f89-b994-6185855b3719', // 🤖 DATA DE SAÍDA
        LOADING_DATE_TS: 'b874d22f-a42d-4b83-84dc-752d9c4a4d2d',
        LOADING_DATE_CARG: 'c2766029-b7e2-4f54-a844-f88c9da0c651', // ⏰ DATA CARREGAMENTO
        PLACA_BOT: '08c3c2bb-d87a-4a14-8711-8385ed687f94',
        JANELA_COLETA: 'f7bd644e-c363-4842-9474-51bc1d537b59', // Atualizado de 5b1c para 51bc
        MOTORISTA: '86362270-4f7c-4700-b4d9-8d307cf14339',
      },
    },
  },
  ATTEMICS: {
    BASE_URL_SEND_TEXT: 'https://api.attemics.com.br/core/v2/api/chats/send-text',
    ACCESS_TOKEN: '669557bad8699aa536cfb9bb',
    TEST_MODE_DEFAULT: true,
    TEST_NUMBER: '4192312058',
    SEND_DELAY_SECONDS: 2,
    MAX_PER_RUN: 30,
    LOCK_TIMEOUT_MS: 10000,
    RETRY_HTTP_ONCE: true,
    RETRY_DELAY_MS: 1000,
    REQUIRE_FIRST_MESSAGE_FOR_SECOND: true,
    LOG_SHEET_NAME: 'LOG_ATTEMICS',
  },
  XML_COBRANCA: {
    TO: 'LISTA LOGISTICA SÃO PAULO <listalogisticasp@3coracoes.com.br>, Vitor Farias <vitorfarias@3coracoes.com.br>',
    CC: 'Nathanael Silva <nathanael.silva@thxgroup.com.br>, Carlos Peixoto <carlos.peixoto@thxgroup.com.br>',
    BCC: '',
    SUBJECT_PREFIX: 'XML',
    FILTER_TODAY_ONLY: false,
  },
  XML_RECEBIMENTO: {
    ENABLED: true,
    TIME_ZONE: 'America/Sao_Paulo',
    POLL_MINUTES: 1,
    LABEL_INBOX: 'XML_IMPORTAR',
    LABEL_DONE: 'XML_PROCESSADO',
    LABEL_ERROR: 'XML_ERRO',
    FALLBACK_SUBJECT_PREFIX: 'XML',
    FALLBACK_LOOKBACK_DAYS: 3,
    FALLBACK_ANY_LOOKBACK_DAYS: 30,
    ENABLE_ANY_ATTACHMENT_FALLBACK: false,
    REQUIRE_TODAY_DATE_IN_TEXT: true,
    REQUIRE_TODAY_IN_SUBJECT: false,
    STRICT_TODAY_SUBJECT_QUERY: false,
    DATE_WINDOW_DAYS: 0,
    ENABLE_FALLBACK_SEARCH: true,
    EXCLUDE_DONE_LABEL: true,
    LIGHT_LOG: false,
    MAX_THREADS_PER_RUN: 30,
    MAX_XML_PER_RUN: 1200,
    EXISTING_KEYS_LOOKBACK_ROWS: 100000,
    SHEET_XML: 'XML_IMPORTADOS',
    SHEET_LOG: 'LOG_XML_IMPORT',
    DRIVE_FOLDER: 'THX_XML_RECEBIDOS',
    SAVE_ZIP_TO_DRIVE: false,
    SAVE_XML_TO_DRIVE: false,
    UPDATE_PROGRAMACAO: true,
    GRU_BASE_PESO_ENABLED: true,
    GRU_BASE_PESO_SPREADSHEET_ID: '1St8O-qyxbA3StLc388RERlHNdghKFZ1crux0W-EOExU',
    GRU_BASE_PESO_SHEET: 'GRU - Base Peso',
    PROGRAMACAO_STATUS_HEADER: 'XML STATUS',
    PROGRAMACAO_MISSING_HEADER: 'XML FALTANTES',
    PROGRAMACAO_FOUND_HEADER: 'XML RECEBIDAS',
    PROGRAMACAO_LAST_HEADER: 'XML ULTIMO RECEBIMENTO',
  },
  DEBUG: {
    LOG_TO_SHEET: true,
    SHOW_MENU_ITEMS: false,
    SHEET_NAME: 'DEBUG_LOG',
    BATCH_SIZE: 50,
    MAX_ITEM_LOGS: 25,
  },
};

const DEBUG_LOG_BUFFER_ = [];
let ATTEMICS_STATUS_SYNC_COUNTER_ = 0;
const CLICKUP_TASK_CF_META_CACHE_ = {};
const AUTO_PROG_MONITOR_TRIGGER_FN_ = 'monitorarAtualizacaoProgramacaoPorMudanca';
const AUTO_PROG_MONITOR_PROP_HASH_ = 'AUTO_PROG_MONITOR_LAST_HASH';
const AUTO_PROG_MONITOR_PROP_LASTRUN_ = 'AUTO_PROG_MONITOR_LAST_RUN';
const AUTO_PROG_MONITOR_PROP_LASTCHANGE_ = 'AUTO_PROG_MONITOR_LAST_CHANGE';
const XML_RECEBIMENTO_TRIGGER_FN_ = 'monitorarAtualizacaoXmlRecebidos';
const SHEET_3C_DISPONIBILIDADE_ID_ = '1Ysk4oXy18uuWbqTMbFNq0zZuNBDdnJWqL4L7dsmZm0g';

const SECRET_KEYS_ = {
  CLICKUP_API_KEY: 'CLICKUP_API_KEY',
  GREENMILE_LOGIN_USERNAME: 'GREENMILE_LOGIN_USERNAME',
  GREENMILE_LOGIN_PASSWORD: 'GREENMILE_LOGIN_PASSWORD',
  ATTEMICS_ACCESS_TOKEN: 'ATTEMICS_ACCESS_TOKEN',
  FLASH_LAST_MILE_CHAT_WEBHOOK_URL: 'FLASH_LAST_MILE_CHAT_WEBHOOK_URL',
};

function getClickUpApiKey_() {
  const props = PropertiesService.getScriptProperties();
  let value = normalizeClickUpApiKey_(props.getProperty(SECRET_KEYS_.CLICKUP_API_KEY));
  if (!value) value = normalizeClickUpApiKey_(props.getProperty('CLICKUP_TOKEN'));
  if (!value) throw new Error('Required secret is missing: ' + SECRET_KEYS_.CLICKUP_API_KEY);
  return value;
}

function normalizeClickUpApiKey_(rawValue) {
  let value = String(rawValue || '');
  if (!value) return '';
  value = value.replace(/[\u0000-\u001F\u007F]/g, '');
  value = value.replace(/^Bearer\s+/i, '').trim();
  value = value.replace(/^['"]+|['"]+$/g, '').trim();
  const pkMatch = value.match(/\bpk_[A-Za-z0-9_\\-]+\b/);
  if (pkMatch && pkMatch[0]) return pkMatch[0].trim();
  return value.trim();
}

function diagnosticarAuthClickUp() {
  const props = PropertiesService.getScriptProperties();
  const rawPrimary = String(props.getProperty(SECRET_KEYS_.CLICKUP_API_KEY) || '');
  const rawLegacy = String(props.getProperty('CLICKUP_TOKEN') || '');
  const token = getClickUpApiKey_();
  const url = CONFIG.CLICKUP.BASE_URL + '/user';
  const response = UrlFetchApp.fetch(url, {
    method: 'get',
    muteHttpExceptions: true,
    headers: { Authorization: token },
  });
  const code = response.getResponseCode();
  const text = String(response.getContentText() || '').slice(0, 300);
  return {
    ok: code >= 200 && code < 300,
    httpCode: code,
    hasClickUpApiKeyProperty: !!rawPrimary.trim(),
    hasLegacyClickUpTokenProperty: !!rawLegacy.trim(),
    tokenPrefix: token ? token.slice(0, 3) : '',
    tokenLength: token ? token.length : 0,
    responsePreview: redact(text),
  };
}

function diagnosticarEstruturaMotoristasClickUp() {
  const ctx = { step: 'diagnostico_clickup' };
  try {
    const listId = CONFIG.CLICKUP.LIST_ID_MOTORISTAS;
    appDebugPrint_('--- INICIO DIAGNOSTICO ESTRUTURA CLICKUP ---', { listId: listId });
    
    // Busca sem filtros de status na API para ver tudo o que existe
    const tasks = fetchClickUpTasksByList_(listId, { debug: true });
    appDebugPrint_('Tasks brutas baixadas', { count: tasks.length });

    if (tasks.length === 0) {
      appDebugPrint_('[ALERTA] Nenhuma task retornada pela API para esta lista.');
      return { ok: false, error: 'Lista vazia' };
    }

    const sample = tasks.slice(0, 5);
    sample.forEach(function(t, i) {
      appDebugPrint_('Amostra ' + (i+1) + ': ' + t.name, {
        id: t.id,
        status: t.status && t.status.status,
        tags: Array.isArray(t.tags) ? t.tags.map(function(tag){ return tag.name || tag; }) : [],
        custom_fields: (t.custom_fields || []).map(function(cf) {
          return {
            name: cf.name,
            value: cf.value,
            resolved: resolveClickUpCustomFieldValue_(cf)
          };
        })
      });
    });

    appDebugPrint_('--- FIM DIAGNOSTICO ---');
    return { ok: true, count: tasks.length };
  } catch (e) {
    appDebugError_(e, ctx);
    return { ok: false, error: String(e) };
  } finally {
    flushDebugLogBuffer_();
  }
}

/**
 * Função de auto-diagnóstico para descobrir IDs de listas e campos no novo Workspace.
 */
function diagnosticarNovoClickUp() {
  const ui = SpreadsheetApp.getUi();
  const listId = '901314444834';
  
  try {
    const token = getClickUpApiKey_();
    let report = '--- IDs ENCONTRADOS PARA A LISTA: ' + listId + ' --- \n\n';
    
    const fieldsUrl = CONFIG.CLICKUP.BASE_URL + '/list/' + listId + '/field';
    const fieldsResp = UrlFetchApp.fetch(fieldsUrl, { headers: { Authorization: token } });
    const fields = JSON.parse(fieldsResp.getContentText()).fields;
    
    const targets = ['PLACA', 'MOTORISTA', 'PLANO', 'JANELA', 'UNIDADE', 'DATA'];
    
    fields.forEach(function(f) {
      const name = String(f.name || '').toUpperCase();
      const match = targets.some(function(t) { return name.indexOf(t) !== -1; });
      if (match) {
        report += f.name + ': ' + f.id + '\n';
      }
    });

    report += '\n(Se algum campo faltar, me avise ou mande o log completo do console)';
    
    console.log(report);
    ui.alert('IDs Selecionados', report, ui.ButtonSet.OK);
    
    return report;
    
  } catch (e) {
    ui.alert('Erro no diagnóstico: ' + e.message);
    return 'Erro: ' + e.message;
  }
}

function listarCamposClickUpSemAcessoEdicao(taskIdOrUrl) {
  const cfg = getClickUpProgramacaoConfig_();
  let taskId = extractClickUpTaskIdFromInput_(taskIdOrUrl);
  if (!taskId) {
    const listId = String((cfg && cfg.LIST_ID_CARDS) || '').trim();
    if (!listId) throw new Error('LIST_ID_CARDS nao configurado para diagnostico.');
    const tasks = fetchClickUpTasksByList_(listId, false) || [];
    taskId = String(tasks[0] && tasks[0].id ? tasks[0].id : '').trim();
  }
  if (!taskId) throw new Error('Task ID nao informado e nenhuma task encontrada para diagnostico.');

  const task = fetchClickUpTaskById_(taskId);
  const customFields = asArray_(task && task.custom_fields);
  const semAcesso = [];
  const outrosErros = [];

  for (let i = 0; i < customFields.length; i++) {
    const cf = customFields[i] || {};
    const fieldId = String(cf.id || '').trim();
    const fieldName = String(cf.name || '').trim() || ('FIELD_' + (i + 1));
    if (!fieldId) continue;

    let valueForApi = null;
    try {
      valueForApi = normalizeClickUpCustomFieldValueForApi_(taskId, fieldId, resolveClickUpCustomFieldValue_(cf));
    } catch (e) {
      valueForApi = cf && Object.prototype.hasOwnProperty.call(cf, 'value') ? cf.value : '';
    }

    const response = UrlFetchApp.fetch(
      CONFIG.CLICKUP.BASE_URL + '/task/' + encodeURIComponent(taskId) + '/field/' + encodeURIComponent(fieldId),
      {
        method: 'post',
        muteHttpExceptions: true,
        contentType: 'application/json',
        headers: { Authorization: getClickUpApiKey_() },
        payload: JSON.stringify({ value: valueForApi }),
      }
    );

    const code = response.getResponseCode();
    const text = String(response.getContentText() || '');
    if (code === 401 && text.indexOf('ACCESS_606') !== -1) {
      semAcesso.push(fieldName);
    } else if (code < 200 || code >= 300) {
      outrosErros.push(fieldName);
    }
  }

  console.log('=== ClickUp | Campos sem acesso de edicao ===');
  console.log('Task: ' + taskId);
  if (!semAcesso.length) {
    console.log('Nenhum campo bloqueado por permissao (ACCESS_606).');
  } else {
    for (let i = 0; i < semAcesso.length; i++) {
      console.log((i + 1) + '. ' + semAcesso[i]);
    }
  }
  console.log('Resumo: semAcesso=' + semAcesso.length + ' | outrosErros=' + outrosErros.length);

  return {
    ok: true,
    taskId: taskId,
    semAcesso: semAcesso,
    outrosErros: outrosErros,
  };
}

function listarCamposClickUpSemAcessoEdicao86afvbu0h() {
  return listarCamposClickUpSemAcessoEdicao('86afvbu0h');
}

function getAttemicsAccessToken_() {
  return requireSecret(SECRET_KEYS_.ATTEMICS_ACCESS_TOKEN);
}

function getGreenMileCredentials_() {
  return {
    username: requireSecret(SECRET_KEYS_.GREENMILE_LOGIN_USERNAME),
    password: requireSecret(SECRET_KEYS_.GREENMILE_LOGIN_PASSWORD),
  };
}

function getInputValue_(input, keys) {
  const source = input || {};
  const aliases = Array.isArray(keys) ? keys : [keys];
  for (let i = 0; i < aliases.length; i++) {
    const key = aliases[i];
    if (!key) continue;
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const raw = source[key];
      if (raw == null) continue;
      const value = String(raw).trim();
      if (value) return value;
    }
  }
  return '';
}

function migrateHardcodedSecretsToProperties(input) {
  /*
   * TEMPORÁRIO: APAGAR APÓS EXECUTAR 1X
   * TEMPORÁRIO: APAGAR APÓS EXECUTAR 1X
   * TEMPORÁRIO: APAGAR APÓS EXECUTAR 1X
   * Migra segredos que estavam hardcoded para Script Properties.
   * Esta funcao nao deve permanecer no codigo apos a migracao.
   */
  const props = PropertiesService.getScriptProperties();
  const payload = input || {};
  const created = [];
  const alreadyExisted = [];
  const missingInput = [];
  const toCreate = {};
  const legacyHardcoded = {
    CLICKUP_API_KEY: 'pk_106123901_7ST9EIKIS7QV2LTN9XZNXNMH67LR7GQ8',
    GREENMILE_LOGIN_USERNAME: 'richardthx',
    GREENMILE_LOGIN_PASSWORD: 'GM@thx2025',
    ATTEMICS_ACCESS_TOKEN: '669557bad8699aa536cfb9bb',
    FLASH_LAST_MILE_CHAT_WEBHOOK_URL: 'https://chat.googleapis.com/v1/spaces/AAAAtIxsN8E/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=0ykhfXhAadLLFBm3bXeSr4oGFikl8YumJ-KiXK374bs',
  };
  const legacyClickUpToken = String(props.getProperty('CLICKUP_TOKEN') || '').trim();
  const currentClickUpApiKey = String(props.getProperty(SECRET_KEYS_.CLICKUP_API_KEY) || '').trim();
  const providedClickUpApiKey = getInputValue_(payload, ['clickupApiKey', 'clickupToken']);
  const clickUpFromLegacy = !currentClickUpApiKey && legacyClickUpToken ? legacyClickUpToken : legacyHardcoded.CLICKUP_API_KEY;

  const candidates = {};
  candidates[SECRET_KEYS_.CLICKUP_API_KEY] = providedClickUpApiKey || clickUpFromLegacy;
  candidates[SECRET_KEYS_.GREENMILE_LOGIN_USERNAME] = getInputValue_(payload, ['greenMileLoginUsername', 'greenmileLoginUsername']) || legacyHardcoded.GREENMILE_LOGIN_USERNAME;
  candidates[SECRET_KEYS_.GREENMILE_LOGIN_PASSWORD] = getInputValue_(payload, ['greenMileLoginPassword', 'greenmileLoginPassword']) || legacyHardcoded.GREENMILE_LOGIN_PASSWORD;
  candidates[SECRET_KEYS_.ATTEMICS_ACCESS_TOKEN] = getInputValue_(payload, ['attemicsAccessToken']) || legacyHardcoded.ATTEMICS_ACCESS_TOKEN;
  candidates[SECRET_KEYS_.FLASH_LAST_MILE_CHAT_WEBHOOK_URL] = getInputValue_(payload, ['flashLastMileChatWebhookUrl', 'chatWebhookUrl']) || legacyHardcoded.FLASH_LAST_MILE_CHAT_WEBHOOK_URL;

  Object.keys(candidates).forEach(function (key) {
    const existing = String(props.getProperty(key) || '').trim();
    if (existing) {
      alreadyExisted.push(key);
      return;
    }

    const candidate = String(candidates[key] || '').trim();
    if (!candidate) {
      missingInput.push(key);
      return;
    }

    toCreate[key] = candidate;
    created.push(key);
  });

  if (Object.keys(toCreate).length) {
    props.setProperties(toCreate, true);
  }

  return {
    created: created,
    alreadyExisted: alreadyExisted,
    missingInput: missingInput,
  };
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  const menuOps = ui.createMenu('⚙️ Atualiza\u00e7\u00e3o');
  const menuFlash = ui.createMenu('⚡ FLASH');
  const menuMsg = ui.createMenu('✉️ Mensagens');
  const menu3C = ui.createMenu('☕ 3cora\u00e7\u00f5es');
  const menuClickUp = ui.createMenu('📌 ClickUp');
  const menuJornada = ui.createMenu('🕒 Jornada Interna');

  menuOps
    .addItem('\u{1f69a} Atualizar Programa\u00e7\u00e3o', 'atualizarProgramacao')
    .addItem('\u{1f4cb} Atualizar Disponibilidade (ClickUp)', 'atualizarDisponibilidadeClickUp')
    .addSeparator()
    .addItem('\u{1f3b2} Aleatorizar Placas', 'aleatorizarPlacasProgramacao');

  menuFlash
    .addItem('\ud83d\ude9a FLASH GUARULHOS (Atualizar + Enviar)', 'executarFlashGuarulhosAgora')
    .addSeparator()
    .addItem('📱 Passagem de Turno: Programação', 'enviarFlashPassagemProgramacao')
    .addItem('🏭 Passagem de Turno: Jornada Interna', 'enviarFlashPassagemJornada')
    .addItem('🔵 Passagem de Turno: Disponibilidade', 'enviarFlashPassagemDisponibilidade')
    .addSeparator()
    .addItem('🔄 Flash Passagem de Turno (Completo)', 'executarFlashPassagemTurnoAgora');

  if (CONFIG.DEBUG && CONFIG.DEBUG.SHOW_MENU_ITEMS) {
    menuOps
      .addSeparator()
      .addItem('\u{1f9ea} Debug Programa\u00e7\u00e3o', 'debugAlimentarContainer')
      .addItem('\u{1f9ea} Debug Disponibilidade', 'debugAtualizarDisponibilidadeClickUp')
      .addItem('\u{1f9ea} Debug Aleatorizar Placas', 'debugAleatorizarPlacasProgramacao');
  }

  menuMsg
    .addItem('\ud83d\udce8 Enviar 1a Mensagem (REAL)', 'enviarAttemicsPrimeiraMensagemProd')
    .addItem('\ud83d\udcec Enviar 2a Mensagem (REAL)', 'enviarAttemicsSegundaMensagemProd')
    .addSeparator()
    .addItem('\ud83e\uddea Enviar TESTE (Número Configurado)', 'enviarAttemicsPrimeiraMensagemTeste');

  menu3C
    .addItem('Atualizar planilhas', 'atualizarPlanilhas3Coracoes')
    .addItem('🔄 Sincronizar Disponibilidade (Padrão D,I,P)', 'syncDisponibilidadePara3CoracoesExterno')
    .addItem('📋 Reportar Placas', 'reportarPlacas')
    .addItem('✉️ Cobrar XML', 'cobrarXmlProgramacaoPorEmail')
    .addSeparator()
    .addItem('\ud83d\udce6 Processar XML agora', 'processarXmlRecebidosAgora')
    .addSeparator()
    .addItem('\ud83d\udee0\ufe0f Corrigir Cores (Amarelo)', 'ensureDisponibilidadeStatusValidation_');

  menuClickUp
    .addItem('\u{1f4cc} Criar Cards', 'criarCardsClickUpProgramacao')
    .addItem('\u{1f50e} Buscando dados', 'preencherCamposCardsClickUpProgramacao')
    ;

  menuOps.addToUi();
  menuFlash.addToUi();
  menu3C.addToUi();
  menuMsg.addToUi();
  menuClickUp.addToUi();
  menuJornada
    .addItem('🛠️ Configurar aba', 'setupJornadaInterna')
    .addItem('🔄 Sincronizar dados de hoje', 'syncJornadaInternaToday')
    .addItem('⏰ Criar gatilho diário', 'createJornadaDailyTrigger')
    .addToUi();

  // Garante o loop de XML sempre ativo, mesmo sem acao manual no menu.
  try { ensureXmlRecebimentoMonitorSempreAtivo_(); } catch (e) {}
  try { ensureFlashLastMileMonitorSempreAtivo_(); } catch (e) {}
  try { ensureDisponibilidadeObservacaoValidation_(); } catch (e) {}
  try { ensureDisponibilidadeStatusValidation_(); } catch (e) {}
}

function executarFlashGuarulhosAgora() {
  var run = gerarFlashLastMile();
  var chat = enviarFlashLastMileNoChatAgora();
  toast_(SpreadsheetApp.getActiveSpreadsheet(), 'FLASH GUARULHOS enviado no chat.');
  return { ok: true, run: run, chat: chat };
}

function atualizarProgramacao() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const triggers = ScriptApp.getProjectTriggers().filter(function (t) {
    return t.getHandlerFunction && t.getHandlerFunction() === AUTO_PROG_MONITOR_TRIGGER_FN_;
  });
  if (triggers.length) {
    triggers.forEach(function (t) { ScriptApp.deleteTrigger(t); });
    toast_(ss, 'Loop auto da Programacao desativado.');
    return { ok: true, mode: 'auto_off', removed: triggers.length };
  }
  ScriptApp.newTrigger(AUTO_PROG_MONITOR_TRIGGER_FN_).timeBased().everyMinutes(1).create();
  const result = monitorarAtualizacaoProgramacaoPorMudanca();
  toast_(ss, 'Loop auto da Programacao ativado (1min).');
  return { ok: true, mode: 'auto_on', run: result };
}

function atualizarPlanilhas3Coracoes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const resultFonte = syncPlacaMotoristaParaFonte3CoracoesByPlano_();
  const resultDisp = syncDisponibilidadeParaPlanilha3Coracoes_();
  toast_(ss, '3corações: fonte=' + (resultFonte.updated || 0) + ' | disponibilidade=' + (resultDisp.updated || 0) + ' (novas ' + (resultDisp.inserted || 0) + ')');
  return { ok: true, data: { fonte: resultFonte, disponibilidade: resultDisp } };
}

function cobrarXmlProgramacaoPorEmail() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = findSheetCaseInsensitive_(ss, CFG.SHEET_PROGRAMACAO);
  if (!sh) throw new Error('Aba Programacao nao encontrada.');

  const headerRow = getProgramacaoHeaderRow_();
  const hMap = mapHeaders_(sh, headerRow);
  const cPlano = getHeaderColRequired_(hMap, ['PLANOS'], 'Programacao');
  const cComp = getHeaderColOptional_(hMap, ['COMPLEMENTO']);
  const cPerfil = getHeaderColOptional_(hMap, ['PERFIL']);
  const cDataCarreg = getHeaderColOptional_(hMap, ['DATA DE CARREGAMENTO']);
  const cDataSaida = getHeaderColOptional_(hMap, ['DATA DE SAIDA', 'DATA DE SAÍDA']);

  const rows = getSheetDataRowsDisplay_(sh, sh.getLastColumn(), headerRow);
  const today = toDateOnly_(new Date());
  const items = [];
  const seen = {};

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i] || [];
    const plano = String(r[cPlano - 1] || '').trim();
    if (!plano) continue;

    if (CONFIG.XML_COBRANCA && CONFIG.XML_COBRANCA.FILTER_TODAY_ONLY) {
      let dt = null;
      if (cDataCarreg) dt = parseDateBR_(r[cDataCarreg - 1]) || toDateOnly_(r[cDataCarreg - 1]);
      if (!dt && cDataSaida) dt = parseDateBR_(r[cDataSaida - 1]) || toDateOnly_(r[cDataSaida - 1]);
      if (!dt || !isSameDay_(dt, today)) continue;
    }

    const key = normalizePlanoDigitsKey_(plano) || plano;
    if (seen[key]) continue;
    seen[key] = true;

    items.push({
      plano: plano,
      complemento: cComp ? String(r[cComp - 1] || '').trim() : '',
      perfil: cPerfil ? String(r[cPerfil - 1] || '').trim() : '',
    });
  }

  if (!items.length) {
    toast_(ss, 'XML: nenhum plano elegivel para hoje.');
    return { ok: true, data: { sent: false, rows: 0 } };
  }

  items.sort(function (a, b) {
    const pa = normalizeHeader_(a.perfil || '');
    const pb = normalizeHeader_(b.perfil || '');
    if (pa !== pb) return pa < pb ? -1 : 1;
    return String(a.plano || '').localeCompare(String(b.plano || ''));
  });

  const cfg = CONFIG.XML_COBRANCA || {};
  const executorEmail = getExecutorEmail_();
  const to = String(cfg.TO || '').trim() || executorEmail;
  if (!to) throw new Error('Nao foi possivel identificar destinatario (TO) nem usuario executor.');

  const dataRefTxt = Utilities.formatDate(today, Session.getScriptTimeZone(), 'dd/MM/yyyy');
  const subject = String(cfg.SUBJECT_PREFIX || 'XML').trim() + ' ' + dataRefTxt;
  const htmlBody = buildXmlCobrancaEmailHtml_(items, {
    dataRefTxt: dataRefTxt,
    executorEmail: executorEmail,
    sheetName: sh.getName(),
  });
  const textBody = buildXmlCobrancaEmailText_(items, dataRefTxt, executorEmail);

  const mailOpts = {
    htmlBody: htmlBody,
    name: 'THX - Programacao',
  };
  if (cfg.CC) mailOpts.cc = String(cfg.CC).trim();
  if (cfg.BCC) mailOpts.bcc = String(cfg.BCC).trim();

  GmailApp.sendEmail(to, subject, textBody, mailOpts);
  toast_(ss, 'XML: e-mail enviado (' + items.length + ' planos).');
  return { ok: true, data: { sent: true, rows: items.length, to: to, subject: subject } };
}

function getXmlRecebimentoConfig_() {
  const cfg = CONFIG.XML_RECEBIMENTO || {};
  return {
    ENABLED: cfg.ENABLED !== false,
    TIME_ZONE: String(cfg.TIME_ZONE || 'America/Sao_Paulo').trim(),
    POLL_MINUTES: Math.max(1, Number(cfg.POLL_MINUTES || 1)),
    LABEL_INBOX: String(cfg.LABEL_INBOX || 'XML_IMPORTAR').trim(),
    LABEL_DONE: String(cfg.LABEL_DONE || 'XML_PROCESSADO').trim(),
    LABEL_ERROR: String(cfg.LABEL_ERROR || 'XML_ERRO').trim(),
    FALLBACK_SUBJECT_PREFIX: String(cfg.FALLBACK_SUBJECT_PREFIX || 'XML').trim(),
    FALLBACK_LOOKBACK_DAYS: Math.max(1, Number(cfg.FALLBACK_LOOKBACK_DAYS || 3)),
    FALLBACK_ANY_LOOKBACK_DAYS: Math.max(1, Number(cfg.FALLBACK_ANY_LOOKBACK_DAYS || 30)),
    ENABLE_ANY_ATTACHMENT_FALLBACK: cfg.ENABLE_ANY_ATTACHMENT_FALLBACK === true,
    REQUIRE_TODAY_DATE_IN_TEXT: cfg.REQUIRE_TODAY_DATE_IN_TEXT !== false,
    REQUIRE_TODAY_IN_SUBJECT: cfg.REQUIRE_TODAY_IN_SUBJECT === true,
    STRICT_TODAY_SUBJECT_QUERY: cfg.STRICT_TODAY_SUBJECT_QUERY === true,
    DATE_WINDOW_DAYS: Math.max(0, Number(cfg.DATE_WINDOW_DAYS || 0)),
    ENABLE_FALLBACK_SEARCH: cfg.ENABLE_FALLBACK_SEARCH !== false,
    EXCLUDE_DONE_LABEL: cfg.EXCLUDE_DONE_LABEL !== false,
    LIGHT_LOG: cfg.LIGHT_LOG === true,
    MAX_THREADS_PER_RUN: Math.max(1, Number(cfg.MAX_THREADS_PER_RUN || 30)),
    MAX_XML_PER_RUN: Math.max(1, Number(cfg.MAX_XML_PER_RUN || 1200)),
    EXISTING_KEYS_LOOKBACK_ROWS: Math.max(100, Number(cfg.EXISTING_KEYS_LOOKBACK_ROWS || 100000)),
    SHEET_XML: String(cfg.SHEET_XML || 'XML_IMPORTADOS').trim(),
    SHEET_LOG: String(cfg.SHEET_LOG || 'LOG_XML_IMPORT').trim(),
    DRIVE_FOLDER: String(cfg.DRIVE_FOLDER || 'THX_XML_RECEBIDOS').trim(),
    SAVE_ZIP_TO_DRIVE: cfg.SAVE_ZIP_TO_DRIVE === true,
    SAVE_XML_TO_DRIVE: cfg.SAVE_XML_TO_DRIVE === true,
    UPDATE_PROGRAMACAO: cfg.UPDATE_PROGRAMACAO !== false,
    GRU_BASE_PESO_ENABLED: cfg.GRU_BASE_PESO_ENABLED !== false,
    GRU_BASE_PESO_SPREADSHEET_ID: String(cfg.GRU_BASE_PESO_SPREADSHEET_ID || '').trim(),
    GRU_BASE_PESO_SHEET: String(cfg.GRU_BASE_PESO_SHEET || 'GRU - Base Peso').trim(),
    PROGRAMACAO_STATUS_HEADER: String(cfg.PROGRAMACAO_STATUS_HEADER || 'XML STATUS').trim(),
    PROGRAMACAO_MISSING_HEADER: String(cfg.PROGRAMACAO_MISSING_HEADER || 'XML FALTANTES').trim(),
    PROGRAMACAO_FOUND_HEADER: String(cfg.PROGRAMACAO_FOUND_HEADER || 'XML RECEBIDAS').trim(),
    PROGRAMACAO_LAST_HEADER: String(cfg.PROGRAMACAO_LAST_HEADER || 'XML ULTIMO RECEBIMENTO').trim(),
  };
}

function applyXmlRecebimentoOverrides_(baseCfg, overrides) {
  const out = Object.assign({}, baseCfg || {});
  const o = overrides || {};
  Object.keys(o).forEach(function (k) {
    if (o[k] === undefined) return;
    out[k] = o[k];
  });
  return out;
}

function getXmlRecebimentoTimeZone_(cfg) {
  const tz = String((cfg && cfg.TIME_ZONE) || Session.getScriptTimeZone() || 'America/Sao_Paulo').trim();
  return tz || 'America/Sao_Paulo';
}

function getXmlImportSheetHeaders_() {
  return [
    'Arquivo', 'nNF', 'modFrete', 'TRANSPORTA_CNPJ', 'TRANSPORTA_CPF', 'TRANSPORTA_xNome', 'TRANSPORTA_IE', 'TRANSPORTA_xEnder', 'TRANSPORTA_xMun', 'TRANSPORTA_UF',
    'RETTRANSP_vServ', 'RETTRANSP_vBCRet', 'RETTRANSP_pICMSRet', 'RETTRANSP_vICMSRet', 'RETTRANSP_CFOP', 'RETTRANSP_cMunFG',
    'VEICTRANSP_placa', 'VEICTRANSP_UF', 'VEICTRANSP_RNTC', 'REBOQUE_placa', 'REBOQUE_UF', 'REBOQUE_RNTC',
    'vagao', 'balsa', 'VOL_qVol', 'VOL_esp', 'VOL_marca', 'VOL_nVol', 'VOL_pesoL', 'VOL_pesoB', 'VOL_nLacre',
  ];
}

function getXmlImportLogHeaders_() {
  return [
    'DataHora', 'RunId', 'Nivel', 'Evento', 'ThreadId', 'MessageId', 'Arquivo', 'Status', 'Detalhe',
    'Emails', 'Anexos', 'XmlLidos', 'XmlNovos', 'Duplicados', 'Erros', 'DuracaoMs',
  ];
}

function ativarMonitorXmlRecebidos1Min() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ensure = ensureXmlRecebimentoMonitorSempreAtivo_();
  toast_(ss, 'Monitor XML ativo (' + ensure.everyMinutes + 'min).');
  return { ok: true, data: ensure };
}

function desativarMonitorXmlRecebidos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const handlerNames = getXmlRecebimentoTriggerHandlerNames_();
  let removed = 0;
  ScriptApp.getProjectTriggers().forEach(function (t) {
    const fn = t.getHandlerFunction ? String(t.getHandlerFunction() || '') : '';
    if (fn && handlerNames.indexOf(fn) !== -1) {
      ScriptApp.deleteTrigger(t);
      removed++;
    }
  });
  toast_(ss, 'Monitor XML desativado (' + removed + ').');
  return { ok: true, data: { removed: removed } };
}

function getXmlRecebimentoTriggerHandlerNames_() {
  return [
    String(XML_RECEBIMENTO_TRIGGER_FN_ || ''),
    'processarXmlRecebidosAgora',
    'processarXmlRecebidosExpress',
    'monitorarAtualizacaoXmlRecebidos',
  ].filter(function (s, idx, arr) { return !!s && arr.indexOf(s) === idx; });
}

function ensureXmlRecebimentoMonitorSempreAtivo_() {
  const cfg = getXmlRecebimentoConfig_();
  const handlerNames = getXmlRecebimentoTriggerHandlerNames_();
  const triggers = ScriptApp.getProjectTriggers().filter(function (t) {
    const fn = t.getHandlerFunction ? String(t.getHandlerFunction() || '') : '';
    return !!fn && handlerNames.indexOf(fn) !== -1;
  });

  let removed = 0;
  const active = [];
  for (let i = 0; i < triggers.length; i++) {
    const t = triggers[i];
    const fn = t.getHandlerFunction ? String(t.getHandlerFunction() || '') : '';
    if (fn !== XML_RECEBIMENTO_TRIGGER_FN_) {
      ScriptApp.deleteTrigger(t);
      removed++;
      continue;
    }
    active.push(t);
  }

  if (active.length > 1) {
    for (let j = 1; j < active.length; j++) {
      ScriptApp.deleteTrigger(active[j]);
      removed++;
    }
  }

  let created = 0;
  if (!active.length) {
    ScriptApp.newTrigger(XML_RECEBIMENTO_TRIGGER_FN_).timeBased().everyMinutes(cfg.POLL_MINUTES).create();
    created = 1;
  }

  return {
    handler: XML_RECEBIMENTO_TRIGGER_FN_,
    everyMinutes: cfg.POLL_MINUTES,
    created: created,
    removed: removed,
    active: true,
  };
}

function ensureXmlRecebimentoInfra_(ss, cfg) {
  const xmlSheet = getOrCreateSheet_(ss, cfg.SHEET_XML);
  const targetHeaders = getXmlImportSheetHeaders_();
  const currentFirst = String(xmlSheet.getRange(1, 1).getDisplayValue() || '').trim();
  // Migra do layout antigo para o layout enxuto atual sem deslocar colunas antigas.
  if (normalizeHeader_(currentFirst) === normalizeHeader_('DataProcessamento') && xmlSheet.getLastRow() > 1) {
    xmlSheet.getRange(2, 1, xmlSheet.getLastRow() - 1, Math.max(1, xmlSheet.getLastColumn())).clearContent();
  }
  ensureHeaders_(xmlSheet, targetHeaders, 1);
  const logSheet = getOrCreateSheet_(ss, cfg.SHEET_LOG);
  ensureHeaders_(logSheet, getXmlImportLogHeaders_(), 1);
  return { xmlSheet: xmlSheet, logSheet: logSheet };
}

function buildXmlRecebimentoSearchQuery_(cfg, todayTokens) {
  const inboxRaw = String(cfg.LABEL_INBOX || '').trim();
  const inboxClause = inboxRaw ? ('label:"' + inboxRaw.replace(/"/g, '\\"') + '" ') : '';
  const doneClause = cfg.EXCLUDE_DONE_LABEL
    ? (' -label:"' + String(cfg.LABEL_DONE || 'XML_PROCESSADO').replace(/"/g, '\\"') + '"')
    : '';
  if (cfg.STRICT_TODAY_SUBJECT_QUERY) {
    const lookbackDays = Math.max(2, Number((cfg && cfg.DATE_WINDOW_DAYS) || 0) + 2);
    const parts = [];
    const seen = {};
    const list = (todayTokens && todayTokens.list) || [];
    for (let i = 0; i < list.length; i++) {
      const tok = String(list[i] || '').trim();
      if (!tok || seen[tok]) continue;
      seen[tok] = true;
      parts.push('subject:"XML ' + tok.replace(/"/g, '\\"') + '"');
    }
    const subjectClause = parts.length ? ('(' + parts.join(' OR ') + ')') : 'subject:"XML"';
    return inboxClause + 'newer_than:' + lookbackDays + 'd has:attachment ' + subjectClause + doneClause;
  }
  const todayClause = todayTokens && todayTokens.gmailQuoted ? (' "' + todayTokens.gmailQuoted + '"') : '';
  return (inboxClause ? inboxClause : '') + '(filename:zip OR filename:xml)' + doneClause + todayClause;
}

function buildXmlRecebimentoFallbackQuery_(cfg, todayTokens) {
  const subject = String(cfg.FALLBACK_SUBJECT_PREFIX || 'XML').replace(/"/g, '\\"');
  const days = Math.max(1, Number(cfg.FALLBACK_LOOKBACK_DAYS || 15));
  const doneClause = cfg.EXCLUDE_DONE_LABEL
    ? (' -label:"' + String(cfg.LABEL_DONE || 'XML_PROCESSADO').replace(/"/g, '\\"') + '"')
    : '';
  const todayClause = todayTokens && todayTokens.gmailQuoted ? (' "' + todayTokens.gmailQuoted + '"') : '';
  return 'newer_than:' + days + 'd' + doneClause + ' subject:"' + subject + '" (filename:zip OR filename:xml)' + todayClause;
}

function buildXmlRecebimentoAnyFallbackQuery_(cfg, todayTokens) {
  const days = Math.max(1, Number(cfg.FALLBACK_ANY_LOOKBACK_DAYS || 30));
  const doneClause = cfg.EXCLUDE_DONE_LABEL
    ? (' -label:"' + String(cfg.LABEL_DONE || 'XML_PROCESSADO').replace(/"/g, '\\"') + '"')
    : '';
  const todayClause = todayTokens && todayTokens.gmailQuoted ? (' "' + todayTokens.gmailQuoted + '"') : '';
  return 'newer_than:' + days + 'd' + doneClause + ' has:attachment' + todayClause;
}

function buildXmlTodayTokens_(dateObj, cfg) {
  const d = dateObj instanceof Date ? dateObj : new Date();
  const tz = getXmlRecebimentoTimeZone_(cfg);
  const windowDays = Math.max(0, Number((cfg && cfg.DATE_WINDOW_DAYS) || 0));
  const list = [];
  const gmailQuotedList = [];
  const seen = {};
  for (let offset = 0; offset <= windowDays; offset++) {
    const dx = new Date(d.getTime());
    dx.setDate(dx.getDate() - offset);
    const dd = Utilities.formatDate(dx, tz, 'dd/MM/yyyy');
    const dSimple = dx.getDate() + '/' + (dx.getMonth() + 1) + '/' + dx.getFullYear();
    const dash = Utilities.formatDate(dx, tz, 'dd-MM-yyyy');
    const iso = Utilities.formatDate(dx, tz, 'yyyy-MM-dd');
    gmailQuotedList.push(dd);
    [dd, dSimple, dash, iso].forEach(function (tok) {
      const k = String(tok || '').trim();
      if (!k || seen[k]) return;
      seen[k] = true;
      list.push(k);
    });
  }
  return {
    gmailQuoted: gmailQuotedList.length ? gmailQuotedList[0] : '',
    gmailQuotedList: gmailQuotedList,
    list: list,
  };
}

function messageMatchesXmlTodayFilter_(message, cfg, todayTokens) {
  if (!cfg.REQUIRE_TODAY_DATE_IN_TEXT) return true;
  if (!message) return false;
  const tokens = (todayTokens && todayTokens.list) || [];
  const subject = String((message.getSubject && message.getSubject()) || '');
  const subjectUp = subject.toUpperCase();
  const hasXmlInSubject = subjectUp.indexOf('XML') !== -1;
  let hasDateInSubject = false;
  for (let i = 0; i < tokens.length; i++) {
    if (subjectUp.indexOf(String(tokens[i] || '').toUpperCase()) !== -1) {
      hasDateInSubject = true;
      break;
    }
  }
  if (hasXmlInSubject && hasDateInSubject) return true;
  if (cfg.REQUIRE_TODAY_IN_SUBJECT) return false;

  let body = '';
  try { body = String((message.getPlainBody && message.getPlainBody()) || ''); } catch (e) { body = ''; }
  if (!body) return false;
  const bodyUp = body.slice(0, 6000).toUpperCase();
  if (bodyUp.indexOf('XML') === -1) return false;
  for (let j = 0; j < tokens.length; j++) {
    if (bodyUp.indexOf(String(tokens[j] || '').toUpperCase()) !== -1) return true;
  }
  return false;
}

function getOrCreateGmailLabelByName_(labelName) {
  const name = String(labelName || '').trim();
  if (!name) throw new Error('Nome de label de Gmail nao informado.');
  let label = GmailApp.getUserLabelByName(name);
  if (!label) label = GmailApp.createLabel(name);
  return label;
}

function getOrCreateOptionalGmailLabelByName_(labelName) {
  const name = String(labelName || '').trim();
  if (!name) return null;
  let label = GmailApp.getUserLabelByName(name);
  if (!label) label = GmailApp.createLabel(name);
  return label;
}

function ensureXmlRecebimentoRunFolder_(cfg, runId, now) {
  const tz = getXmlRecebimentoTimeZone_(cfg);
  const root = getOrCreateDriveFolderByName_(null, cfg.DRIVE_FOLDER || 'THX_XML_RECEBIDOS');
  const year = Utilities.formatDate(now || new Date(), tz, 'yyyy');
  const month = Utilities.formatDate(now || new Date(), tz, 'MM');
  const day = Utilities.formatDate(now || new Date(), tz, 'dd');
  const fYear = getOrCreateDriveFolderByName_(root, year);
  const fMonth = getOrCreateDriveFolderByName_(fYear, month);
  const fDay = getOrCreateDriveFolderByName_(fMonth, day);
  return getOrCreateDriveFolderByName_(fDay, String(runId || Date.now()));
}

function getOrCreateDriveFolderByName_(parentFolder, name) {
  const folderName = String(name || '').trim();
  if (!folderName) throw new Error('Nome de pasta invalido.');
  let it;
  if (parentFolder) it = parentFolder.getFoldersByName(folderName);
  else it = DriveApp.getFoldersByName(folderName);
  if (it.hasNext()) return it.next();
  return parentFolder ? parentFolder.createFolder(folderName) : DriveApp.createFolder(folderName);
}

function appendRowsToSheet_(sheet, rows) {
  if (!sheet || !rows || !rows.length) return;
  const startRow = sheet.getLastRow() + 1;
  const cols = rows[0].length;
  sheet.getRange(startRow, 1, rows.length, cols).setValues(rows);
}

function pushXmlImportLog_(logRows, runId, level, event, payload) {
  const p = payload || {};
  logRows.push([
    formatDateTimeBR_(new Date()),
    runId || '',
    level || 'INFO',
    event || '',
    p.threadId || '',
    p.messageId || '',
    p.arquivo || '',
    p.status || '',
    p.detalhe || '',
    p.emails == null ? '' : p.emails,
    p.anexos == null ? '' : p.anexos,
    p.xmlLidos == null ? '' : p.xmlLidos,
    p.xmlNovos == null ? '' : p.xmlNovos,
    p.duplicados == null ? '' : p.duplicados,
    p.errors == null ? '' : p.errors,
    p.duracaoMs == null ? '' : p.duracaoMs,
  ]);
}

function applyXmlImportThreadLabels_(thread, labels, hasErrors) {
  if (!thread || !labels) return;
  if (hasErrors) {
    try { thread.addLabel(labels.error); } catch (e1) {}
    try { if (labels.inbox) thread.addLabel(labels.inbox); } catch (e2) {}
    try { thread.removeLabel(labels.done); } catch (e3) {}
    try { thread.markUnread(); } catch (e4) {}
    return;
  }
  try { thread.addLabel(labels.done); } catch (e5) {}
  try { thread.removeLabel(labels.error); } catch (e6) {}
  try { if (labels.inbox) thread.removeLabel(labels.inbox); } catch (e7) {}
  try { thread.markRead(); } catch (e8) {}
}

function getXmlRecebimentoFluxoPadraoOverrides_() {
  return {
    LABEL_INBOX: '',
    SAVE_ZIP_TO_DRIVE: false,
    SAVE_XML_TO_DRIVE: false,
    UPDATE_PROGRAMACAO: true,
    EXCLUDE_DONE_LABEL: true,
    LIGHT_LOG: true,
    REQUIRE_TODAY_DATE_IN_TEXT: true,
    REQUIRE_TODAY_IN_SUBJECT: true,
    STRICT_TODAY_SUBJECT_QUERY: true,
    ENABLE_FALLBACK_SEARCH: false,
    ENABLE_ANY_ATTACHMENT_FALLBACK: false,
    DATE_WINDOW_DAYS: 0,
    MAX_THREADS_PER_RUN: 12,
    MAX_XML_PER_RUN: 800,
    EXISTING_KEYS_LOOKBACK_ROWS: 100000,
    FALLBACK_LOOKBACK_DAYS: 2,
    FALLBACK_ANY_LOOKBACK_DAYS: 2,
  };
}

function monitorarAtualizacaoXmlRecebidos() {
  const cfgBase = getXmlRecebimentoConfig_();
  const cfgPadrao = getXmlRecebimentoFluxoPadraoOverrides_();
  const cfg = applyXmlRecebimentoOverrides_(cfgBase, cfgPadrao);
  if (!cfg.ENABLED) return { ok: true, skipped: true, reason: 'disabled' };

  const now = new Date();
  const todayTokens = buildXmlTodayTokens_(now, cfg);
  const queryPrimary = buildXmlRecebimentoSearchQuery_(cfg, todayTokens);
  const queryFallback = buildXmlRecebimentoFallbackQuery_(cfg, todayTokens);
  const queryAnyFallback = buildXmlRecebimentoAnyFallbackQuery_(cfg, todayTokens);
  let selectedQuery = queryPrimary;
  let threads = GmailApp.search(queryPrimary, 0, 1);

  if (!threads.length && cfg.ENABLE_FALLBACK_SEARCH) {
    threads = GmailApp.search(queryFallback, 0, 1);
    if (threads.length) selectedQuery = queryFallback;
  }
  if (!threads.length && cfg.ENABLE_FALLBACK_SEARCH && cfg.ENABLE_ANY_ATTACHMENT_FALLBACK) {
    threads = GmailApp.search(queryAnyFallback, 0, 1);
    if (threads.length) selectedQuery = queryAnyFallback;
  }
  if (!threads.length) {
    return { ok: true, skipped: true, reason: 'no_new_xml', query: selectedQuery };
  }

  return processarXmlRecebidosAgora();
}

function processarXmlRecebidosAgora(options) {
  const cfgBase = getXmlRecebimentoConfig_();
  const cfgPadrao = getXmlRecebimentoFluxoPadraoOverrides_();
  const cfg = applyXmlRecebimentoOverrides_(applyXmlRecebimentoOverrides_(cfgBase, cfgPadrao), options || {});
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!cfg.ENABLED) {
    toast_(ss, 'XML recebimento desativado em CONFIG.XML_RECEBIMENTO.ENABLED.');
    return { ok: true, skipped: true, reason: 'disabled' };
  }

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return { ok: false, skipped: true, reason: 'lock_busy' };

  const startedMs = Date.now();
  const startedAt = new Date(startedMs);
  const xmlTz = getXmlRecebimentoTimeZone_(cfg);
  const runId = Utilities.formatDate(startedAt, xmlTz, 'yyyyMMdd_HHmmss') + '_' + Math.floor(Math.random() * 100000);
  const stats = {
    threads: 0,
    messages: 0,
    attachments: 0,
    xmlLidos: 0,
    xmlNovos: 0,
    duplicados: 0,
    filteredByDate: 0,
    errors: 0,
    programacao: null,
    gruBasePeso: null,
    durationMs: 0,
  };
  const logRows = [];
  const lightLog = cfg.LIGHT_LOG === true;
  function logEvent_(level, event, payload, force) {
    if (!force && lightLog && level !== 'WARN' && level !== 'ERROR') return;
    pushXmlImportLog_(logRows, runId, level, event, payload);
  }

  try {
    const infra = ensureXmlRecebimentoInfra_(ss, cfg);
    let runFolder = null;
    function getRunFolderLazy_() {
      if (!runFolder) runFolder = ensureXmlRecebimentoRunFolder_(cfg, runId, startedAt);
      return runFolder;
    }
    const labels = {
      inbox: getOrCreateOptionalGmailLabelByName_(cfg.LABEL_INBOX),
      done: getOrCreateGmailLabelByName_(cfg.LABEL_DONE),
      error: getOrCreateGmailLabelByName_(cfg.LABEL_ERROR),
    };
    const existingKeys = loadXmlImportExistingKeys_(infra.xmlSheet, cfg.EXISTING_KEYS_LOOKBACK_ROWS);
    const todayTokens = buildXmlTodayTokens_(startedAt, cfg);
    const queryPrimary = buildXmlRecebimentoSearchQuery_(cfg, todayTokens);
    const queryFallback = buildXmlRecebimentoFallbackQuery_(cfg, todayTokens);
    const queryAnyFallback = buildXmlRecebimentoAnyFallbackQuery_(cfg, todayTokens);
    let selectedQuery = queryPrimary;
    let threads = GmailApp.search(queryPrimary, 0, cfg.MAX_THREADS_PER_RUN);
    if (!threads.length && cfg.ENABLE_FALLBACK_SEARCH) {
      threads = GmailApp.search(queryFallback, 0, cfg.MAX_THREADS_PER_RUN);
      if (threads.length) selectedQuery = queryFallback;
    }
    if (!threads.length && cfg.ENABLE_FALLBACK_SEARCH && cfg.ENABLE_ANY_ATTACHMENT_FALLBACK) {
      threads = GmailApp.search(queryAnyFallback, 0, cfg.MAX_THREADS_PER_RUN);
      if (threads.length) selectedQuery = queryAnyFallback;
    }
    stats.threads = threads.length;

    logEvent_('INFO', 'RUN_START', { status: 'STARTED', detalhe: 'query=' + selectedQuery, emails: threads.length }, true);

    if (selectedQuery !== queryPrimary) {
      logEvent_('WARN', 'QUERY_FALLBACK', {
        status: 'FALLBACK',
        detalhe: 'Sem e-mail na label; fallback por assunto/periodo aplicado',
      });
    }

    if (!threads.length) {
      stats.durationMs = Date.now() - startedMs;
      logEvent_('INFO', 'RUN_END', {
        status: 'SEM_EMAIL',
        detalhe: 'Nenhum e-mail encontrado para a query',
        emails: 0,
        duracaoMs: stats.durationMs,
      }, true);
      appendRowsToSheet_(infra.logSheet, logRows);
      toast_(ss, 'XML recebidos: nenhum e-mail encontrado (label e fallback).');
      return { ok: true, data: { runId: runId, query: selectedQuery, stats: stats } };
    }

    const rowsToAppend = [];
    let stopByLimit = false;

    for (let t = 0; t < threads.length; t++) {
      if (stopByLimit) break;
      const thread = threads[t];
      const threadId = String(thread.getId() || '').trim();
      const messages = thread.getMessages() || [];
      let threadHadRelevantMessage = false;
      let threadHasError = false;

      for (let m = 0; m < messages.length; m++) {
        if (stopByLimit) break;
        const message = messages[m];
        if (!message) continue;

        if (!messageMatchesXmlTodayFilter_(message, cfg, todayTokens)) {
          stats.filteredByDate++;
          continue;
        }

        const messageId = String(message.getId() || '').trim();
        const from = String(message.getFrom() || '').trim();
        const subject = String(message.getSubject() || '').trim();
        const messageDate = message.getDate ? message.getDate() : new Date();
        const attachments = message.getAttachments({ includeInlineImages: false, includeAttachments: true }) || [];

        let messageRelevant = false;
        let messageErrors = 0;
        let messageAttachments = 0;
        let messageXmlLidos = 0;
        let messageXmlNovos = 0;
        let messageDuplicados = 0;

        for (let a = 0; a < attachments.length; a++) {
          if (stopByLimit) break;
          const att = attachments[a];
          const attResult = buildXmlCandidatesFromAttachment_(att, getRunFolderLazy_, cfg, {
            runId: runId,
            threadId: threadId,
            messageId: messageId,
            attachmentIndex: a + 1,
          });

          messageAttachments += attResult.countedAttachments;
          stats.attachments += attResult.countedAttachments;
          if (attResult.countedAttachments > 0) messageRelevant = true;
          if (attResult.errors > 0) {
            messageErrors += attResult.errors;
            stats.errors += attResult.errors;
          }
          for (let li = 0; li < attResult.logItems.length; li++) {
            const it = attResult.logItems[li];
            const lv = String(it.level || 'INFO').toUpperCase();
            if (lightLog && lv !== 'WARN' && lv !== 'ERROR') continue;
            logEvent_(it.level || 'INFO', it.event || 'ATTACHMENT', {
              threadId: threadId,
              messageId: messageId,
              arquivo: it.file || '',
              status: it.status || '',
              detalhe: it.detail || '',
            });
          }

          const candidates = attResult.candidates || [];
          for (let c = 0; c < candidates.length; c++) {
            if (stats.xmlLidos >= cfg.MAX_XML_PER_RUN) {
              stopByLimit = true;
              logEvent_('WARN', 'RUN_LIMIT_XML', {
                status: 'LIMIT',
                detalhe: 'Limite de XML por execucao atingido: ' + cfg.MAX_XML_PER_RUN,
              });
              break;
            }
            const candidate = candidates[c];
            messageXmlLidos++;
            stats.xmlLidos++;

            try {
              const parsed = parseNfeXmlForImport_(candidate.xmlText || '');
              const nf = normalizeXmlNfNumber_(parsed.nNF || '');
              const arquivo = normalizeXmlArquivoNome_(candidate.xmlName || '');
              if ((nf && existingKeys.byNf[nf]) || (arquivo && existingKeys.byArquivo[arquivo])) {
                messageDuplicados++;
                stats.duplicados++;
                if (!lightLog) {
                  logEvent_('INFO', 'XML_DUPLICADO', {
                    threadId: threadId,
                    messageId: messageId,
                    arquivo: candidate.xmlName,
                    status: 'IGNORADO_DUPLICADO',
                    detalhe: nf ? ('nNF=' + nf) : ('Arquivo=' + arquivo),
                  });
                }
                continue;
              }

              rowsToAppend.push(buildXmlImportSheetRow_({
                xmlNome: candidate.xmlName,
                parsed: parsed,
              }));

              if (nf) existingKeys.byNf[nf] = true;
              if (arquivo) existingKeys.byArquivo[arquivo] = true;
              messageXmlNovos++;
              stats.xmlNovos++;
            } catch (e) {
              const errMsg = String(e && e.message ? e.message : e);
              messageErrors++;
              stats.errors++;
              logEvent_('ERROR', 'XML_PARSE_ERRO', {
                threadId: threadId,
                messageId: messageId,
                arquivo: candidate.xmlName,
                status: 'ERRO',
                detalhe: truncateText_(errMsg, 500),
              });
            }
          }
        }

        if (messageRelevant) {
          threadHadRelevantMessage = true;
          stats.messages++;
          if (messageErrors > 0) threadHasError = true;

          logEvent_(messageErrors > 0 ? 'WARN' : 'INFO', 'MESSAGE_SUMMARY', {
            threadId: threadId,
            messageId: messageId,
            status: messageErrors > 0 ? 'PARCIAL_ERRO' : 'OK',
            detalhe: 'Mensagem processada',
            anexos: messageAttachments,
            xmlLidos: messageXmlLidos,
            xmlNovos: messageXmlNovos,
            duplicados: messageDuplicados,
            errors: messageErrors,
          });
        }
      }

      if (threadHadRelevantMessage) {
        applyXmlImportThreadLabels_(thread, labels, threadHasError);
        logEvent_(threadHasError ? 'WARN' : 'INFO', 'THREAD_LABEL_UPDATE', {
          threadId: threadId,
          status: threadHasError ? 'XML_ERRO' : 'XML_PROCESSADO',
          detalhe: threadHasError ? 'Mantida label de inbox para retry' : 'Thread marcada como processada',
        });
      }
    }

    if (rowsToAppend.length) {
      appendRowsToSheet_(infra.xmlSheet, rowsToAppend);
    }

    if (cfg.UPDATE_PROGRAMACAO && rowsToAppend.length) {
      try {
        stats.programacao = refreshProgramacaoXmlStatusFromImportSheet_(ss, infra.xmlSheet, cfg);
      } catch (eProg) {
        stats.errors++;
        logEvent_('ERROR', 'PROGRAMACAO_UPDATE_ERRO', {
          status: 'ERRO',
          detalhe: truncateText_(String(eProg && eProg.message ? eProg.message : eProg), 500),
        });
      }
    }

    if (cfg.GRU_BASE_PESO_ENABLED && rowsToAppend.length) {
      try {
        stats.gruBasePeso = syncXmlImportRowsToGruBasePeso_(rowsToAppend, cfg);
        logEvent_('INFO', 'GRU_BASE_PESO_SYNC', {
          status: 'OK',
          detalhe: 'Linhas adicionadas na base de peso',
          xmlNovos: stats.gruBasePeso && stats.gruBasePeso.inserted ? stats.gruBasePeso.inserted : 0,
        });
      } catch (eGru) {
        stats.errors++;
        logEvent_('ERROR', 'GRU_BASE_PESO_SYNC_ERRO', {
          status: 'ERRO',
          detalhe: truncateText_(String(eGru && eGru.message ? eGru.message : eGru), 500),
        });
      }
    }

    stats.durationMs = Date.now() - startedMs;
    logEvent_(stats.errors ? 'WARN' : 'INFO', 'RUN_END', {
      status: stats.errors ? 'COM_ERROS' : 'OK',
      detalhe: stopByLimit ? 'Execucao finalizada (limite de lote atingido)' : 'Execucao finalizada',
      emails: stats.messages,
      anexos: stats.attachments,
      xmlLidos: stats.xmlLidos,
      xmlNovos: stats.xmlNovos,
      duplicados: stats.duplicados,
      errors: stats.errors,
      duracaoMs: stats.durationMs,
    }, true);

    appendRowsToSheet_(infra.logSheet, logRows);
    toast_(
      ss,
      'XML recebidos: threads=' + stats.threads +
      ' | anexos=' + stats.attachments +
      ' | lidos=' + stats.xmlLidos +
      ' | novos=' + stats.xmlNovos +
      ' | dup=' + stats.duplicados +
      ' | filtro_data=' + stats.filteredByDate +
      ' | base_peso=' + (stats.gruBasePeso && stats.gruBasePeso.inserted ? stats.gruBasePeso.inserted : 0) +
      ' | erros=' + stats.errors
    );
    return {
      ok: stats.errors === 0,
      data: {
        runId: runId,
        query: selectedQuery,
        limitReached: stopByLimit,
        stats: stats,
      },
    };
  } catch (err) {
    stats.durationMs = Date.now() - startedMs;
    logEvent_('ERROR', 'RUN_FATAL', {
      status: 'ERRO_FATAL',
      detalhe: truncateText_(String(err && err.message ? err.message : err), 500),
      duracaoMs: stats.durationMs,
    });
    try {
      const ssErr = SpreadsheetApp.getActiveSpreadsheet();
      const infraErr = ensureXmlRecebimentoInfra_(ssErr, cfg);
      appendRowsToSheet_(infraErr.logSheet, logRows);
    } catch (e2) {}
    throw err;
  } finally {
    try { lock.releaseLock(); } catch (e3) {}
  }
}

function processarXmlRecebidosExpress() {
  // Alias legado: mantido para nao quebrar gatilhos antigos.
  return processarXmlRecebidosAgora();
}

function atualizarStatusXmlProgramacaoAgora() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const cfg = getXmlRecebimentoConfig_();
  let infra = ensureXmlRecebimentoInfra_(ss, cfg);
  let importedRows = Math.max(0, infra.xmlSheet.getLastRow() - 1);

  if (importedRows === 0) {
    const proc = processarXmlRecebidosAgora();
    if (proc && proc.skipped && proc.reason === 'lock_busy') {
      toast_(ss, 'XML status: processamento em andamento. Tente novamente em alguns segundos.');
      return { ok: true, data: { rows: 0, completo: 0, faltando: 0, semNf: 0, importedRows: 0, processing: 'lock_busy' } };
    }
    infra = ensureXmlRecebimentoInfra_(ss, cfg);
    importedRows = Math.max(0, infra.xmlSheet.getLastRow() - 1);
  }

  if (importedRows === 0) {
    const todayRef = Utilities.formatDate(new Date(), getXmlRecebimentoTimeZone_(cfg), 'dd/MM/yyyy');
    toast_(ss, 'XML status: nenhuma linha em ' + cfg.SHEET_XML + ' (sem XML novo para ' + todayRef + ').');
    return { ok: true, data: { rows: 0, completo: 0, faltando: 0, semNf: 0, importedRows: 0 } };
  }

  const result = refreshProgramacaoXmlStatusFromImportSheet_(ss, infra.xmlSheet, cfg);
  toast_(ss, 'XML status atualizado: linhas=' + result.rows + ' | completo=' + result.completo + ' | faltando=' + result.faltando + ' | sem_nf=' + result.semNf);
  return { ok: true, data: Object.assign({ importedRows: importedRows }, result) };
}

function buildXmlCandidatesFromAttachment_(attachment, runFolderOrFactory, cfg, ctx) {
  const out = { countedAttachments: 0, errors: 0, candidates: [], logItems: [] };
  if (!attachment) return out;

  const attNameRaw = attachment.getName ? attachment.getName() : '';
  const attName = sanitizeXmlImportFileName_(attNameRaw || ('anexo_' + String((ctx && ctx.attachmentIndex) || 1)));
  const attContentType = String((attachment.getContentType && attachment.getContentType()) || '').toLowerCase();
  const isZip = isZipAttachment_(attName, attContentType);
  const isXml = isXmlAttachment_(attName, attContentType);
  if (!isZip && !isXml) return out;
  const resolvedCfg = cfg || getXmlRecebimentoConfig_();

  out.countedAttachments = 1;

  if (isZip) {
    let zipFileId = '';
    if (resolvedCfg.SAVE_ZIP_TO_DRIVE) {
      const runFolder = typeof runFolderOrFactory === 'function'
        ? runFolderOrFactory()
        : runFolderOrFactory;
      if (!runFolder) {
        out.errors++;
        out.logItems.push({
          level: 'ERROR',
          event: 'RUN_FOLDER_ERRO',
          file: attName,
          status: 'ERRO',
          detail: 'Pasta de execucao nao disponivel para salvar arquivos',
        });
        return out;
      }
      const savedZip = saveBlobToFolderSafe_(runFolder, attachment, attName);
      if (savedZip.ok) zipFileId = savedZip.fileId;
      else {
        out.errors++;
        out.logItems.push({
          level: 'ERROR',
          event: 'ZIP_SAVE_ERRO',
          file: attName,
          status: 'ERRO',
          detail: savedZip.error,
        });
      }
    }

    let innerBlobs = [];
    try {
      innerBlobs = Utilities.unzip(attachment.copyBlob()) || [];
    } catch (e) {
      out.errors++;
      out.logItems.push({
        level: 'ERROR',
        event: 'ZIP_EXTRACT_ERRO',
        file: attName,
        status: 'ERRO',
        detail: truncateText_(String(e && e.message ? e.message : e), 500),
      });
      return out;
    }

    let xmlCountInZip = 0;
    for (let i = 0; i < innerBlobs.length; i++) {
      const inner = innerBlobs[i];
      const innerNameRaw = inner && inner.getName ? inner.getName() : ('arquivo_' + (i + 1) + '.xml');
      const innerName = sanitizeXmlImportFileName_(innerNameRaw);
      if (!isXmlFileName_(innerName)) continue;
      xmlCountInZip++;

      let xmlText = '';
      try { xmlText = inner.getDataAsString(); } catch (e1) { xmlText = ''; }
      if (!xmlText) {
        try { xmlText = inner.getDataAsString('UTF-8'); } catch (e2) { xmlText = ''; }
      }
      xmlText = normalizeXmlTextForParse_(xmlText);
      if (!xmlText) {
        out.errors++;
        out.logItems.push({
          level: 'ERROR',
          event: 'XML_VAZIO',
          file: innerName,
          status: 'ERRO',
          detail: 'Conteudo XML vazio',
        });
        continue;
      }

      out.candidates.push({
        origemTipo: 'ZIP',
        zipName: attName,
        zipFileId: zipFileId,
        xmlName: innerName,
        xmlFileId: '',
        xmlText: xmlText,
      });
    }

    if (xmlCountInZip === 0) {
      out.errors++;
      out.logItems.push({
        level: 'WARN',
        event: 'ZIP_SEM_XML',
        file: attName,
        status: 'SEM_XML',
        detail: 'Nenhum arquivo .xml encontrado dentro do ZIP',
      });
    }

    return out;
  }

  let xmlText = '';
  try { xmlText = attachment.getDataAsString(); } catch (e3) { xmlText = ''; }
  if (!xmlText) {
    try { xmlText = attachment.getDataAsString('UTF-8'); } catch (e4) { xmlText = ''; }
  }
  xmlText = normalizeXmlTextForParse_(xmlText);
  if (!xmlText) {
    out.errors++;
    out.logItems.push({
      level: 'ERROR',
      event: 'XML_VAZIO',
      file: attName,
      status: 'ERRO',
      detail: 'Conteudo XML vazio',
    });
    return out;
  }

  out.candidates.push({
    origemTipo: 'XML',
    zipName: '',
    zipFileId: '',
    xmlName: attName,
    xmlFileId: '',
    xmlText: xmlText,
  });
  return out;
}

function sanitizeXmlImportFileName_(name) {
  const n = String(name == null ? '' : name).replace(/[\\/:*?"<>|]+/g, '_').trim();
  if (!n) return 'arquivo.xml';
  return n;
}

function isZipFileName_(name) {
  return /\.zip$/i.test(String(name || '').trim());
}

function isXmlFileName_(name) {
  return /\.xml$/i.test(String(name || '').trim());
}

function isZipAttachment_(name, contentType) {
  const n = String(name || '').toLowerCase();
  const ct = String(contentType || '').toLowerCase();
  if (isZipFileName_(n)) return true;
  if (ct.indexOf('zip') !== -1) return true;
  if (ct.indexOf('compressed') !== -1) return true;
  return false;
}

function isXmlAttachment_(name, contentType) {
  const n = String(name || '').toLowerCase();
  const ct = String(contentType || '').toLowerCase();
  if (isXmlFileName_(n)) return true;
  if (n.indexOf('.xml') !== -1) return true;
  if (ct.indexOf('xml') !== -1) return true;
  return false;
}

function saveBlobToFolderSafe_(folder, blob, fileName) {
  try {
    if (!folder || !blob) throw new Error('Folder/blob invalido');
    const copy = blob.copyBlob();
    copy.setName(sanitizeXmlImportFileName_(fileName || blob.getName() || 'arquivo'));
    const file = folder.createFile(copy);
    return { ok: true, fileId: file.getId() };
  } catch (e) {
    return { ok: false, error: truncateText_(String(e && e.message ? e.message : e), 500) };
  }
}

function normalizeXmlTextForParse_(text) {
  return String(text == null ? '' : text).replace(/^\uFEFF/, '').trim();
}

function normalizeXmlChaveAcesso_(value) {
  const digits = String(value == null ? '' : value).replace(/\D/g, '');
  if (digits.length < 44) return '';
  return digits.slice(-44);
}

function normalizeXmlNfNumber_(value) {
  let digits = String(value == null ? '' : value).replace(/\D/g, '');
  if (!digits) return '';
  digits = digits.replace(/^0+(?=\d)/, '');
  return digits;
}

function computeSha1Hex_(text) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_1, String(text == null ? '' : text), Utilities.Charset.UTF_8);
  return digestBytesToHex_(bytes);
}

function digestBytesToHex_(bytes) {
  return (bytes || []).map(function (b) {
    const v = (b < 0 ? b + 256 : b).toString(16);
    return v.length === 1 ? ('0' + v) : v;
  }).join('');
}

function loadXmlImportExistingKeys_(xmlSheet, lookbackRows) {
  const byNf = {};
  const byArquivo = {};
  if (!xmlSheet) return { byNf: byNf, byArquivo: byArquivo };
  const lastRow = xmlSheet.getLastRow();
  if (lastRow < 2) return { byNf: byNf, byArquivo: byArquivo };
  const h = mapHeaders_(xmlSheet, 1);
  const cNf = getHeaderColOptional_(h, ['nNF']);
  const cArquivo = getHeaderColOptional_(h, ['Arquivo']);
  if (!cNf && !cArquivo) return { byNf: byNf, byArquivo: byArquivo };

  const maxRows = Math.max(1, Number(lookbackRows || (lastRow - 1)));
  const numRows = Math.min(lastRow - 1, maxRows);
  const startRow = lastRow - numRows + 1;
  if (cNf) {
    const nfVals = xmlSheet.getRange(startRow, cNf, numRows, 1).getDisplayValues();
    for (let i = 0; i < nfVals.length; i++) {
      const nf = normalizeXmlNfNumber_(nfVals[i] && nfVals[i][0]);
      if (nf) byNf[nf] = true;
    }
  }
  if (cArquivo) {
    const arqVals = xmlSheet.getRange(startRow, cArquivo, numRows, 1).getDisplayValues();
    for (let j = 0; j < arqVals.length; j++) {
      const arquivo = normalizeXmlArquivoNome_(arqVals[j] && arqVals[j][0]);
      if (arquivo) byArquivo[arquivo] = true;
    }
  }
  return { byNf: byNf, byArquivo: byArquivo };
}

function buildXmlImportSheetRow_(ctx) {
  const parsed = (ctx && ctx.parsed) || {};
  const arquivo = normalizeXmlArquivoNome_(ctx && ctx.xmlNome);
  return [
    arquivo,
    parsed.nNF || '',
    parsed.modFrete || '',
    parsed.TRANSPORTA_CNPJ || '',
    parsed.TRANSPORTA_CPF || '',
    parsed.TRANSPORTA_xNome || '',
    parsed.TRANSPORTA_IE || '',
    parsed.TRANSPORTA_xEnder || '',
    parsed.TRANSPORTA_xMun || '',
    parsed.TRANSPORTA_UF || '',
    parsed.RETTRANSP_vServ || '',
    parsed.RETTRANSP_vBCRet || '',
    parsed.RETTRANSP_pICMSRet || '',
    parsed.RETTRANSP_vICMSRet || '',
    parsed.RETTRANSP_CFOP || '',
    parsed.RETTRANSP_cMunFG || '',
    parsed.VEICTRANSP_placa || '',
    parsed.VEICTRANSP_UF || '',
    parsed.VEICTRANSP_RNTC || '',
    parsed.REBOQUE_placa || '',
    parsed.REBOQUE_UF || '',
    parsed.REBOQUE_RNTC || '',
    parsed.vagao || '',
    parsed.balsa || '',
    parsed.VOL_qVol || '',
    parsed.VOL_esp || '',
    parsed.VOL_marca || '',
    parsed.VOL_nVol || '',
    parsed.VOL_pesoL || '',
    parsed.VOL_pesoB || '',
    parsed.VOL_nLacre || '',
  ];
}

function normalizeXmlArquivoNome_(fileName) {
  let name = String(fileName == null ? '' : fileName).trim();
  if (!name) return '';
  name = name.replace(/\s+/g, '');
  name = name.replace(/\.xml$/i, '');
  if (!/-nfe$/i.test(name)) name += '-nfe';
  return name + '.xml';
}

function parseNfeXmlForImport_(xmlText) {
  const txt = normalizeXmlTextForParse_(xmlText);
  if (!txt) throw new Error('XML vazio');
  // Parse leve por regex para reduzir tempo em lotes grandes.
  const ide = extractXmlBlockByTag_(txt, 'ide');
  const transp = extractXmlBlockByTag_(txt, 'transp');
  const transporta = extractXmlBlockByTag_(transp, 'transporta');
  const retTransp = extractXmlBlockByTag_(transp, 'retTransp');
  const veicTransp = extractXmlBlockByTag_(transp, 'veicTransp');
  const reboque = extractXmlBlockByTag_(transp, 'reboque');
  const vol = extractXmlBlockByTag_(transp, 'vol');
  const lacres = extractXmlBlockByTag_(vol, 'lacres') || extractXmlBlockByTag_(vol, 'lacre');

  const nf = normalizeXmlNfNumber_(extractXmlTagValue_(ide || txt, 'nNF'));
  if (!nf) throw new Error('nNF nao encontrado');

  return {
    nNF: nf,
    modFrete: extractXmlTagValue_(transp, 'modFrete'),
    TRANSPORTA_CNPJ: extractXmlTagValue_(transporta, 'CNPJ'),
    TRANSPORTA_CPF: extractXmlTagValue_(transporta, 'CPF'),
    TRANSPORTA_xNome: extractXmlTagValue_(transporta, 'xNome'),
    TRANSPORTA_IE: extractXmlTagValue_(transporta, 'IE'),
    TRANSPORTA_xEnder: extractXmlTagValue_(transporta, 'xEnder'),
    TRANSPORTA_xMun: extractXmlTagValue_(transporta, 'xMun'),
    TRANSPORTA_UF: extractXmlTagValue_(transporta, 'UF'),
    RETTRANSP_vServ: normalizeXmlDecimalText_(extractXmlTagValue_(retTransp, 'vServ')),
    RETTRANSP_vBCRet: normalizeXmlDecimalText_(extractXmlTagValue_(retTransp, 'vBCRet')),
    RETTRANSP_pICMSRet: normalizeXmlDecimalText_(extractXmlTagValue_(retTransp, 'pICMSRet')),
    RETTRANSP_vICMSRet: normalizeXmlDecimalText_(extractXmlTagValue_(retTransp, 'vICMSRet')),
    RETTRANSP_CFOP: extractXmlTagValue_(retTransp, 'CFOP'),
    RETTRANSP_cMunFG: extractXmlTagValue_(retTransp, 'cMunFG'),
    VEICTRANSP_placa: extractXmlTagValue_(veicTransp, 'placa'),
    VEICTRANSP_UF: extractXmlTagValue_(veicTransp, 'UF'),
    VEICTRANSP_RNTC: extractXmlTagValue_(veicTransp, 'RNTC'),
    REBOQUE_placa: extractXmlTagValue_(reboque, 'placa'),
    REBOQUE_UF: extractXmlTagValue_(reboque, 'UF'),
    REBOQUE_RNTC: extractXmlTagValue_(reboque, 'RNTC'),
    vagao: extractXmlTagValue_(transp, 'vagao'),
    balsa: extractXmlTagValue_(transp, 'balsa'),
    VOL_qVol: extractXmlTagValue_(vol, 'qVol'),
    VOL_esp: extractXmlTagValue_(vol, 'esp'),
    VOL_marca: extractXmlTagValue_(vol, 'marca'),
    VOL_nVol: normalizeXmlDecimalText_(extractXmlTagValue_(vol, 'nVol')),
    VOL_pesoL: normalizeXmlDecimalText_(extractXmlTagValue_(vol, 'pesoL')),
    VOL_pesoB: normalizeXmlDecimalText_(extractXmlTagValue_(vol, 'pesoB')),
    VOL_nLacre: extractXmlTagValue_(lacres, 'nLacre'),
  };
}

function normalizeXmlDecimalText_(value) {
  const text = String(value == null ? '' : value).trim();
  if (!text) return '';
  if (text.indexOf('.') === -1) return text;
  if (!/^-?\d+(?:\.\d+)?$/.test(text)) return text;
  return text.replace('.', ',');
}

function extractXmlBlockByTag_(xmlText, tagName) {
  const src = String(xmlText || '');
  if (!src || !tagName) return '';
  const re = new RegExp('<(?:\\w+:)?' + tagName + '(?:\\s[^>]*)?>([\\s\\S]*?)<\\/(?:\\w+:)?' + tagName + '>', 'i');
  const m = src.match(re);
  return m && m[1] ? String(m[1]) : '';
}

function extractXmlTagValue_(xmlText, tagName) {
  const block = extractXmlBlockByTag_(xmlText, tagName);
  if (!block) return '';
  return decodeXmlEntities_(String(block || '').trim());
}

function decodeXmlEntities_(text) {
  return String(text == null ? '' : text)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function xmlFindFirstElementByLocalName_(element, localName) {
  if (!element || !localName) return null;
  const wanted = String(localName).toLowerCase();
  const name = String(element.getName ? element.getName() : '').toLowerCase();
  if (name === wanted) return element;
  const children = element.getChildren ? element.getChildren() : [];
  for (let i = 0; i < children.length; i++) {
    const hit = xmlFindFirstElementByLocalName_(children[i], localName);
    if (hit) return hit;
  }
  return null;
}

function xmlFindFirstChildByLocalName_(element, localName) {
  if (!element || !localName) return null;
  const wanted = String(localName).toLowerCase();
  const children = element.getChildren ? element.getChildren() : [];
  for (let i = 0; i < children.length; i++) {
    const nm = String(children[i].getName ? children[i].getName() : '').toLowerCase();
    if (nm === wanted) return children[i];
  }
  return null;
}

function xmlGetChildTextByLocalName_(element, localName) {
  const child = xmlFindFirstChildByLocalName_(element, localName);
  return xmlGetElementText_(child);
}

function xmlGetElementText_(element) {
  if (!element || !element.getText) return '';
  return String(element.getText() || '').trim();
}

function xmlGetAttributeValueByName_(element, attrName) {
  if (!element || !attrName || !element.getAttributes) return '';
  const wanted = String(attrName).toLowerCase();
  const attrs = element.getAttributes() || [];
  for (let i = 0; i < attrs.length; i++) {
    const a = attrs[i];
    const nm = String(a && a.getName ? a.getName() : '').toLowerCase();
    if (nm === wanted) return String(a.getValue ? a.getValue() : '').trim();
  }
  return '';
}

function refreshProgramacaoXmlStatusFromImportSheet_(ss, xmlSheet, cfg) {
  const shProg = findSheetCaseInsensitive_(ss, CFG.SHEET_PROGRAMACAO);
  if (!shProg) throw new Error('Aba ' + CFG.SHEET_PROGRAMACAO + ' nao encontrada.');
  const headerRow = getProgramacaoHeaderRow_();
  const notaCol = findBestHeaderColumnByAliases_(shProg, headerRow, ['NOTA FISCAL', CFG.PROGRAMACAO_HEADERS.notaFiscal], 'Programacao');
  const xmlCols = ensureProgramacaoXmlStatusColumns_(shProg, headerRow, cfg, notaCol);
  // Recalcula apos ajustar/remover/realocar colunas XML.
  const xmlIndex = buildXmlIndexByNfFromImportSheet_(xmlSheet);
  const startRow = headerRow + 1;
  const lastRow = shProg.getLastRow();
  if (lastRow < startRow) return { rows: 0, completo: 0, faltando: 0, semNf: 0 };
  const rowCount = lastRow - headerRow;
  const notaVals = shProg.getRange(startRow, notaCol, rowCount, 1).getDisplayValues();

  const statusVals = [];
  const missingVals = [];
  let completo = 0;
  let faltando = 0;
  let semNf = 0;

  for (let i = 0; i < notaVals.length; i++) {
    const expected = extractExpectedNfsFromNotaFiscal_(notaVals[i] && notaVals[i][0]);
    let status = '';
    let missingText = '';

    if (!expected.length) {
      status = '\u26aa Sem NF';
      semNf++;
    } else {
      const missing = [];
      for (let j = 0; j < expected.length; j++) {
        const nf = expected[j];
        const entry = xmlIndex[nf];
        if (!entry) missing.push(nf);
      }
      missingText = missing.join(', ');
      if (missing.length) {
        status = '\ud83d\udd34 Faltando XML (' + (expected.length - missing.length) + '/' + expected.length + ')';
        faltando++;
      } else {
        status = '\ud83d\udfe2 XML OK (' + expected.length + '/' + expected.length + ')';
        completo++;
      }
    }

    statusVals.push([status]);
    missingVals.push([missingText]);
  }

  const statusRange = shProg.getRange(startRow, xmlCols.statusCol, statusVals.length, 1);
  statusRange.setValues(statusVals);
  try { statusRange.setBackground(null); } catch (e1) {}
  try { statusRange.setHorizontalAlignment('center'); } catch (e2) {}
  try { statusRange.setFontWeight('bold'); } catch (e3) {}
  try { statusRange.setWrap(false); } catch (e4) {}
  shProg.getRange(startRow, xmlCols.missingCol, missingVals.length, 1).setValues(missingVals);

  return { rows: notaVals.length, completo: completo, faltando: faltando, semNf: semNf };
}

function ensureProgramacaoXmlStatusColumns_(sheet, headerRow, cfg, notaCol) {
  const statusHeader = cfg.PROGRAMACAO_STATUS_HEADER;
  const missingHeader = cfg.PROGRAMACAO_MISSING_HEADER;
  removeProgramacaoXmlLegacyColumns_(sheet, headerRow, [
    cfg.PROGRAMACAO_FOUND_HEADER,
    cfg.PROGRAMACAO_LAST_HEADER,
    'XML RECEBIDAS',
    'XML ULTIMO RECEBIMENTO',
  ]);

  const ordered = [statusHeader, missingHeader];
  for (let i = 0; i < ordered.length; i++) {
    const header = String(ordered[i] || '').trim();
    if (!header) continue;
    ensureProgramacaoColumnBeforeNotaFiscal_(sheet, headerRow, notaCol, header);
  }

  const map = mapHeaders_(sheet, headerRow);
  const statusCol = getHeaderColRequired_(map, [statusHeader], 'Programacao');
  const missingCol = getHeaderColRequired_(map, [missingHeader], 'Programacao');
  try { sheet.setColumnWidth(statusCol, 140); } catch (e1) {}
  try { sheet.setColumnWidth(missingCol, 250); } catch (e2) {}
  return { statusCol: statusCol, missingCol: missingCol };
}

function removeProgramacaoXmlLegacyColumns_(sheet, headerRow, headerNames) {
  const names = headerNames || [];
  const required = {};
  for (let i = 0; i < names.length; i++) {
    const nm = String(names[i] || '').trim();
    if (!nm) continue;
    required[normalizeHeader_(nm)] = true;
  }
  const keys = Object.keys(required);
  for (let k = 0; k < keys.length; k++) {
    const norm = keys[k];
    let guard = 0;
    while (guard < 3) {
      guard++;
      const map = mapHeaders_(sheet, headerRow);
      let foundCol = 0;
      map.forEach(function (col, key) {
        if (foundCol) return;
        if (normalizeHeader_(key) === norm) foundCol = Number(col) || 0;
      });
      if (!foundCol) break;
      try { sheet.deleteColumn(foundCol); } catch (e) { break; }
    }
  }
}

function ensureProgramacaoColumnBeforeNotaFiscal_(sheet, headerRow, notaColOriginal, headerName) {
  const header = String(headerName || '').trim();
  if (!header) return 0;

  let map = mapHeaders_(sheet, headerRow);
  let notaCol = findBestHeaderColumnByAliases_(sheet, headerRow, ['NOTA FISCAL', CFG.PROGRAMACAO_HEADERS.notaFiscal], 'Programacao');
  if (!notaCol && Number(notaColOriginal)) notaCol = Number(notaColOriginal);
  let col = getHeaderColOptional_(map, [header]);

  if (!col) {
    sheet.insertColumnBefore(notaCol);
    sheet.getRange(headerRow, notaCol).setValue(header);
    return notaCol;
  }

  if (col > notaCol) {
    // Move existing XML column to stay immediately before "Nota fiscal".
    sheet.moveColumns(sheet.getRange(1, col, sheet.getMaxRows(), 1), notaCol);
    return notaCol;
  }

  return col;
}

function findBestHeaderColumnByAliases_(sheet, headerRow, aliases, ctxName) {
  const row = Math.max(1, Number(headerRow) || 1);
  const lastCol = sheet.getLastColumn();
  if (lastCol < 1) throw new Error('Cabecalho nao encontrado em ' + ctxName + ': ' + aliases.join(' | '));

  const aliasNorm = {};
  for (let i = 0; i < (aliases || []).length; i++) {
    const key = normalizeHeader_(aliases[i]);
    if (key) aliasNorm[key] = true;
  }

  const headerVals = sheet.getRange(row, 1, 1, lastCol).getDisplayValues()[0] || [];
  const candidates = [];
  for (let c = 0; c < headerVals.length; c++) {
    const raw = String(headerVals[c] || '').trim();
    if (!raw) continue;
    if (aliasNorm[normalizeHeader_(raw)]) candidates.push(c + 1);
  }
  if (!candidates.length) throw new Error('Cabecalho nao encontrado em ' + ctxName + ': ' + aliases.join(' | '));
  if (candidates.length === 1) return candidates[0];

  const lastRow = sheet.getLastRow();
  if (lastRow <= row) return candidates[0];
  const sampleRows = Math.min(lastRow - row, 5000);
  let bestCol = candidates[0];
  let bestScore = -1;
  for (let i = 0; i < candidates.length; i++) {
    const col = candidates[i];
    const vals = sheet.getRange(row + 1, col, sampleRows, 1).getDisplayValues();
    let filled = 0;
    for (let r = 0; r < vals.length; r++) {
      if (String(vals[r] && vals[r][0] || '').trim()) filled++;
    }
    if (filled > bestScore) {
      bestScore = filled;
      bestCol = col;
    }
  }
  return bestCol;
}

function buildXmlIndexByNfFromImportSheet_(xmlSheet) {
  const index = {};
  if (!xmlSheet) return index;
  const lastRow = xmlSheet.getLastRow();
  if (lastRow < 2) return index;

  const h = mapHeaders_(xmlSheet, 1);
  const cNf = getHeaderColOptional_(h, ['nNF']);
  const cDataProc = getHeaderColOptional_(h, ['DataProcessamento']);
  const cDataEmail = getHeaderColOptional_(h, ['DataEmail']);
  if (!cNf) return index;

  const numRows = lastRow - 1;
  const nfVals = xmlSheet.getRange(2, cNf, numRows, 1).getDisplayValues();
  const dataProcVals = cDataProc ? xmlSheet.getRange(2, cDataProc, numRows, 1).getValues() : null;
  const dataEmailVals = cDataEmail ? xmlSheet.getRange(2, cDataEmail, numRows, 1).getValues() : null;

  for (let i = 0; i < numRows; i++) {
    const nf = normalizeXmlNfNumber_(nfVals[i] && nfVals[i][0]);
    if (!nf) continue;

    let dt = null;
    if (dataProcVals) dt = parseXmlDateValue_(dataProcVals[i] && dataProcVals[i][0]);
    if (!dt && dataEmailVals) dt = parseXmlDateValue_(dataEmailVals[i] && dataEmailVals[i][0]);

    if (!index[nf]) index[nf] = { latestDate: dt || null, count: 1 };
    else {
      index[nf].count++;
      if (dt && (!index[nf].latestDate || dt > index[nf].latestDate)) {
        index[nf].latestDate = dt;
      }
    }
  }
  return index;
}

function syncXmlImportRowsToGruBasePeso_(xmlRows, cfg) {
  const rows = xmlRows || [];
  if (!rows.length) return { inserted: 0, matchedCols: 0, sheet: '' };
  if (!cfg || !cfg.GRU_BASE_PESO_ENABLED) return { inserted: 0, matchedCols: 0, skipped: true, reason: 'disabled' };

  const spreadsheetId = String(cfg.GRU_BASE_PESO_SPREADSHEET_ID || '').trim();
  if (!spreadsheetId) throw new Error('GRU base peso: Spreadsheet ID nao configurado.');

  const targetSs = SpreadsheetApp.openById(spreadsheetId);
  const sheetName = String(cfg.GRU_BASE_PESO_SHEET || 'GRU - Base Peso').trim();
  const targetSheet = findSheetCaseInsensitive_(targetSs, sheetName) || targetSs.getSheetByName(sheetName);
  if (!targetSheet) throw new Error('Aba "' + sheetName + '" nao encontrada na base de peso.');

  const srcHeaders = getXmlImportSheetHeaders_();
  let targetHeaderMap = mapHeaders_(targetSheet, 1);
  const hasHeader = targetSheet.getLastRow() >= 1 && String(targetSheet.getRange(1, 1).getDisplayValue() || '').trim() !== '';
  if (!hasHeader) {
    targetSheet.getRange(1, 1, 1, srcHeaders.length).setValues([srcHeaders]);
    targetHeaderMap = mapHeaders_(targetSheet, 1);
  }

  const mappings = [];
  for (let i = 0; i < srcHeaders.length; i++) {
    const h = srcHeaders[i];
    const col = getHeaderColOptional_(targetHeaderMap, [h]);
    if (!col) continue;
    mappings.push({ sourceIndex: i, targetCol: col });
  }

  // FALLBACK: Se não encontrou nenhum cabeçalho mapeado, mas a planilha tem dados ou cabeçalhos sumiram,
  // tenta usar mapeamento por posição (1:1) se a Coluna A parecer um arquivo XML.
  if (!mappings.length && targetSheet.getLastRow() >= 1) {
    const firstColVal = String(targetSheet.getRange(1, 1).getDisplayValue() || '').trim().toLowerCase();
    if (firstColVal.indexOf('.xml') !== -1 || firstColVal === 'arquivo') {
      for (let i = 0; i < srcHeaders.length; i++) {
        mappings.push({ sourceIndex: i, targetCol: i + 1 });
      }
    }
  }

  if (!mappings.length) {
    throw new Error('GRU base peso: nenhuma coluna compativel com XML_IMPORTADOS foi encontrada e o fallback posicional falhou.');
  }

  const startRow = targetSheet.getLastRow() + 1;
  for (let m = 0; m < mappings.length; m++) {
    const mapItem = mappings[m];
    const colVals = [];
    for (let r = 0; r < rows.length; r++) {
      const row = rows[r] || [];
      colVals.push([row[mapItem.sourceIndex] == null ? '' : row[mapItem.sourceIndex]]);
    }
    targetSheet.getRange(startRow, mapItem.targetCol, rows.length, 1).setValues(colVals);
  }

  return { inserted: rows.length, matchedCols: mappings.length, sheet: sheetName };
}

function parseXmlDateValue_(value) {
  if (!value) return null;
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value)) {
    return new Date(value.getTime());
  }
  const s = String(value || '').trim();
  if (!s) return null;
  const d1 = new Date(s);
  if (!isNaN(d1)) return d1;
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/);
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]) - 1;
  const year = Number(m[3]);
  const hh = Number(m[4] || 0);
  const mm = Number(m[5] || 0);
  const ss = Number(m[6] || 0);
  const d2 = new Date(year, month, day, hh, mm, ss);
  return isNaN(d2) ? null : d2;
}

function extractExpectedNfsFromNotaFiscal_(value) {
  const text = String(value == null ? '' : value).trim();
  if (!text) return [];
  const matches = text.match(/\d+(?:\s*-\s*\d+)?/g) || [];
  const seen = {};
  const out = [];
  for (let i = 0; i < matches.length; i++) {
    const token = String(matches[i] || '').split('-')[0];
    const nf = normalizeXmlNfNumber_(token);
    if (!nf || seen[nf]) continue;
    seen[nf] = true;
    out.push(nf);
  }
  return out;
}

function buildXmlCobrancaEmailText_(items, dataRefTxt, executorEmail) {
  const lines = [];
  lines.push('Boa tarde!');
  lines.push('');
  lines.push('Solicito XML dos planos (' + dataRefTxt + '):');
  lines.push('');
  lines.push('PLANOS | COMPLEMENTO | PERFIL +/-');
  lines.push('----------------------------------');
  (items || []).forEach(function (it) {
    lines.push([
      String(it.plano || ''),
      String(it.complemento || '-'),
      String(it.perfil || '-'),
    ].join(' | '));
  });
  lines.push('');
  lines.push('Solicitacao enviada por: ' + (executorEmail || 'usuario executor'));
  return lines.join('\n');
}

function buildXmlCobrancaEmailHtml_(items, ctx) {
  const dataRefTxt = String((ctx && ctx.dataRefTxt) || '');
  const executorEmail = String((ctx && ctx.executorEmail) || '');
  const total = (items || []).length;
  const rowsHtml = (items || []).map(function (it, idx) {
    const bg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
    return (
      '<tr style="background:' + bg + ';">' +
        '<td style="padding:10px 12px;border:1px solid #e5e7eb;font-family:Arial,sans-serif;font-size:13px;">' + escapeHtml_(it.plano || '') + '</td>' +
        '<td style="padding:10px 12px;border:1px solid #e5e7eb;font-family:Arial,sans-serif;font-size:13px;">' + escapeHtml_(it.complemento || '-') + '</td>' +
        '<td style="padding:10px 12px;border:1px solid #e5e7eb;font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#0f172a;">' + escapeHtml_(it.perfil || '-') + '</td>' +
      '</tr>'
    );
  }).join('');

  return (
    '<div style="font-family:Arial,sans-serif;color:#111827;max-width:860px;">' +
      '<div style="margin-bottom:14px;font-size:14px;">Boa tarde!</div>' +
      '<div style="margin-bottom:16px;font-size:14px;">Solicito <b>XML</b> dos planos da data <b>' + escapeHtml_(dataRefTxt) + '</b>.</div>' +
      '<div style="margin-bottom:10px;padding:10px 12px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;font-size:13px;color:#1e3a8a;">' +
        '<b>Resumo</b>: ' + total + ' plano(s) na cobranca' +
      '</div>' +
      '<table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:760px;">' +
        '<thead>' +
          '<tr>' +
            '<th style="text-align:left;padding:10px 12px;background:#e11d48;color:#ffffff;border:1px solid #be123c;font-family:Arial,sans-serif;font-size:13px;">PLANOS</th>' +
            '<th style="text-align:left;padding:10px 12px;background:#e11d48;color:#ffffff;border:1px solid #be123c;font-family:Arial,sans-serif;font-size:13px;">COMPLEMENTO</th>' +
            '<th style="text-align:left;padding:10px 12px;background:#e11d48;color:#ffffff;border:1px solid #be123c;font-family:Arial,sans-serif;font-size:13px;">PERFIL +/-</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>' + rowsHtml + '</tbody>' +
      '</table>' +
      '<div style="margin-top:18px;font-size:12px;color:#6b7280;">Solicitacao enviada por: <b>' + escapeHtml_(executorEmail || 'usuario executor') + '</b></div>' +
    '</div>'
  );
}

function getExecutorEmail_() {
  let email = '';
  try { email = String(Session.getActiveUser().getEmail() || '').trim(); } catch (e) {}
  if (!email) {
    try { email = String(Session.getEffectiveUser().getEmail() || '').trim(); } catch (e2) {}
  }
  return email;
}

function escapeHtml_(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function ativarAutoAtualizacaoProgramacao1Min() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction && t.getHandlerFunction() === AUTO_PROG_MONITOR_TRIGGER_FN_) ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger(AUTO_PROG_MONITOR_TRIGGER_FN_).timeBased().everyMinutes(1).create();
  toast_(ss, 'Auto atualizacao 1min ativada.');
  return { ok: true, data: { handler: AUTO_PROG_MONITOR_TRIGGER_FN_ } };
}

function desativarAutoAtualizacaoProgramacao() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let removed = 0;
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction && t.getHandlerFunction() === AUTO_PROG_MONITOR_TRIGGER_FN_) { ScriptApp.deleteTrigger(t); removed++; }
  });
  toast_(ss, 'Auto atualizacao desativada (' + removed + ').');
  return { ok: true, data: { removed: removed } };
}

function monitorarAtualizacaoProgramacaoPorMudanca() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return { ok: false, skipped: true, reason: 'lock_busy' };
  try {
    const props = PropertiesService.getScriptProperties();
    const fp = computeSourceProgramacaoFingerprint_();
    props.setProperty(AUTO_PROG_MONITOR_PROP_LASTRUN_, new Date().toISOString());
    const prevHash = props.getProperty(AUTO_PROG_MONITOR_PROP_HASH_) || '';
    if (prevHash && prevHash === fp.hash) return { ok: true, changed: false, skipped: true, hash: fp.hash, rows: fp.rows };
    const result = runAlimentarContainer_({ debug: false, forceFormatting: false });
    let alertaAttemics = { sent: false, skipped: true };
    try {
      alertaAttemics = enviarAlertaAttemicsMudancaOrigemProgramacao_(result, {
        sourceRows: fp.rows,
        sourceHash: fp.hash,
      });
    } catch (e) {
      alertaAttemics = { sent: false, skipped: false, error: String(e && e.message ? e.message : e) };
    }
    props.setProperty(AUTO_PROG_MONITOR_PROP_HASH_, fp.hash);
    props.setProperty(AUTO_PROG_MONITOR_PROP_LASTCHANGE_, new Date().toISOString());

    // Sincroniza disponibilidade automaticamente apos mudanca na programacao.
    let resultDisp = { skipped: true };
    try {
      resultDisp = syncDisponibilidadeParaPlanilha3Coracoes_();
      syncDisponibilidadeProgramadoFromProgramacao_();
    } catch (e) {
      appDebugError_(e, { step: 'sync_disponibilidade_auto' });
    }

    return { 
      ok: true, 
      changed: true, 
      hash: fp.hash, 
      rows: fp.rows, 
      update: result, 
      disponibilidade: resultDisp,
      alertaAttemics: alertaAttemics 
    };
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

function previewAttemicsPrimeiraMensagemTeste() {
  return runAttemicsPrimeiraMensagem_({ previewOnly: true, testMode: true, debug: false });
}

function previewAttemicsSegundaMensagemTeste() {
  return runAttemicsSegundaMensagem_({ previewOnly: true, testMode: true, debug: false });
}

function enviarAttemicsPrimeiraMensagemTeste() {
  return runAttemicsPrimeiraMensagem_({ previewOnly: false, testMode: true, debug: false });
}

function enviarAttemicsSegundaMensagemTeste() {
  return runAttemicsSegundaMensagem_({ previewOnly: false, testMode: true, debug: false });
}

function enviarAttemicsPrimeiraMensagemProd() {
  return runAttemicsPrimeiraMensagem_({ previewOnly: false, testMode: false, debug: false });
}

function enviarAttemicsSegundaMensagemProd() {
  return runAttemicsSegundaMensagem_({ previewOnly: false, testMode: false, debug: false });
}

function syncPlacaMotoristaParaFonte3CoracoesByPlano_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const shProg = findSheetCaseInsensitive_(ss, 'PROGRAMACAO');
  if (!shProg) throw new Error('Aba Programacao nao encontrada.');

  const progHeaderRow = getProgramacaoHeaderRow_();
  const progHeaderMap = mapHeaders_(shProg, progHeaderRow);
  const cProgPlanos = getHeaderColRequired_(progHeaderMap, ['PLANOS'], 'Programacao');
  const cProgPlaca = getHeaderColRequired_(progHeaderMap, ['PLACA'], 'Programacao');
  const cProgMotorista = getHeaderColRequired_(progHeaderMap, ['MOTORISTA'], 'Programacao');
  const progRows = getSheetDataRowsDisplay_(shProg, shProg.getLastColumn(), progHeaderRow);

  const progByPlano = {};
  for (let i = 0; i < progRows.length; i++) {
    const r = progRows[i] || [];
    const planoRaw = String(r[cProgPlanos - 1] || '').trim();
    const planoKey = normalizePlanoDigitsKey_(planoRaw);
    if (!planoKey) continue;
    progByPlano[planoKey] = {
      placa: String(r[cProgPlaca - 1] || '').trim(),
      motorista: String(r[cProgMotorista - 1] || '').trim(),
    };
  }

  const sourceSs = SpreadsheetApp.openById(CONFIG.SOURCE_SPREADSHEET_ID);
  const sourceSheet = sourceSs.getSheetByName(CONFIG.SOURCE_SHEET_NAME);
  if (!sourceSheet) throw new Error('Aba fonte nao encontrada: ' + CONFIG.SOURCE_SHEET_NAME);
  const sourceValues = sourceSheet.getDataRange().getDisplayValues();
  if (!sourceValues || !sourceValues.length) return { updated: 0, rows: 0, source: CONFIG.SOURCE_SHEET_NAME };

  const headerInfo = findHeaderInfo_(sourceValues);
  const headerRow1 = headerInfo.headerRow + 1;
  const headerRowVals = sourceValues[headerInfo.headerRow] || [];
  const sourceHeaderMap = new Map();
  for (let c = 0; c < headerRowVals.length; c++) {
    const h = String(headerRowVals[c] || '');
    if (!h) continue;
    sourceHeaderMap.set(normalizeHeader_(h), c + 1);
    sourceHeaderMap.set(normHeader_(h), c + 1);
  }
  const cSrcPlanos = getHeaderColRequired_(sourceHeaderMap, ['PLANOS'], '3coracoes fonte');
  const cSrcPlaca = getHeaderColRequired_(sourceHeaderMap, ['PLACA'], '3coracoes fonte');
  const cSrcMotorista = getHeaderColRequired_(sourceHeaderMap, ['MOTORISTA'], '3coracoes fonte');

  const startRow = headerRow1 + 1;
  const numRows = Math.max(0, sourceSheet.getLastRow() - headerRow1);
  if (!numRows) return { updated: 0, rows: 0, source: CONFIG.SOURCE_SHEET_NAME };

  const totalCols = Math.max(sourceSheet.getLastColumn(), Math.max(cSrcPlanos, cSrcPlaca, cSrcMotorista));
  const data = sourceSheet.getRange(startRow, 1, numRows, totalCols).getDisplayValues();
  const placaOut = [];
  const motoristaOut = [];
  let changedPlaca = false;
  let changedMotorista = false;
  let updated = 0;

  for (let i = 0; i < data.length; i++) {
    const r = data[i] || [];
    const planoRaw = String(r[cSrcPlanos - 1] || '').trim();
    const planoKey = normalizePlanoDigitsKey_(planoRaw);
    const src = planoKey ? progByPlano[planoKey] : null;
    const newPlaca = src ? (src.placa || '') : '';
    const newMotorista = src ? (src.motorista || '') : '';
    const oldPlaca = String(r[cSrcPlaca - 1] || '').trim();
    const oldMotorista = String(r[cSrcMotorista - 1] || '').trim();
    if (oldPlaca !== newPlaca || oldMotorista !== newMotorista) updated++;
    if (oldPlaca !== newPlaca) changedPlaca = true;
    if (oldMotorista !== newMotorista) changedMotorista = true;
    placaOut.push([newPlaca]);
    motoristaOut.push([newMotorista]);
  }

  if (changedPlaca) sourceSheet.getRange(startRow, cSrcPlaca, numRows, 1).setValues(placaOut);
  if (changedMotorista) sourceSheet.getRange(startRow, cSrcMotorista, numRows, 1).setValues(motoristaOut);
  return {
    updated: updated,
    rows: numRows,
    source: CONFIG.SOURCE_SHEET_NAME,
    headerRow: headerRow1,
    placaCol: cSrcPlaca,
    motoristaCol: cSrcMotorista,
  };
}

function getTaraMap3Coracoes_() {
  return {
    VUC: { perfil: 'VUC', pallets: 4, tara: 1500 },
    VAN: { perfil: 'VAN', pallets: 2, tara: 1200 },
    FIORINO: { perfil: 'FIORINO', pallets: 1, tara: 500 },
    TOCO: { perfil: 'TOCO', pallets: 12, tara: 8000 },
    CARRETA: { perfil: 'CARRETA', pallets: 26, tara: 25000 },
    CAVALO: { perfil: 'CAVALO', pallets: 26, tara: 25000 },
    HR: { perfil: 'HR', pallets: 2, tara: 1500 },
    '3/4': { perfil: '3/4', pallets: 8, tara: 4500 },
    MEDIO: { perfil: '3/4', pallets: 8, tara: 4500 },
    'MEDIO-3/4': { perfil: '3/4', pallets: 8, tara: 4500 },
    'MEDIO/3/4': { perfil: '3/4', pallets: 8, tara: 4500 },
    'MEDIO 3/4': { perfil: '3/4', pallets: 8, tara: 4500 },
  };
}

function normalizePerfil3CoracoesKey_(perfil) {
  const n = normalizeHeader_(perfil);
  if (!n) return '';
  if (n.indexOf('FIORINO') !== -1) return 'FIORINO';
  if (n.indexOf('VUC') !== -1) return 'VUC';
  if (n.indexOf('VAN') !== -1) return 'VAN';
  if (n.indexOf('TOCO') !== -1) return 'TOCO';
  if (n.indexOf('CARRETA') !== -1) return 'CARRETA';
  if (n.indexOf('CAVALO') !== -1) return 'CAVALO';
  if (n === 'HR' || n.indexOf(' HR') !== -1 || n.indexOf('HR ') !== -1) return 'HR';
  if (n.indexOf('3/4') !== -1 || n.indexOf('3 4') !== -1 || n.indexOf('MEDIO') !== -1) return 'MEDIO';
  return n;
}

function resolveTaraInfo3Coracoes_(perfil) {
  const map = getTaraMap3Coracoes_();
  const key = normalizePerfil3CoracoesKey_(perfil);
  return map[key] || { perfil: String(perfil || '').trim(), pallets: '', tara: '' };
}

function nextBusinessDay_(dateLike) {
  const base = toDateOnly_(dateLike) || new Date();
  const d = new Date(base.getFullYear(), base.getMonth(), base.getDate());
  do {
    d.setDate(d.getDate() + 1);
  } while (d.getDay() === 0 || d.getDay() === 6);
  return d;
}

function isRodizioSPNoDia_(placa, dateLike) {
  const p = normalizePlate_(placa);
  const lastCh = p ? p.slice(-1) : '';
  if (!/^[0-9]$/.test(lastCh)) return false;
  const d = Number(lastCh);
  const dt = toDateOnly_(dateLike);
  if (!dt) return false;
  const jsDay = dt.getDay(); // 0 dom ... 6 sab
  if (jsDay === 1) return d === 1 || d === 2; // seg
  if (jsDay === 2) return d === 3 || d === 4; // ter
  if (jsDay === 3) return d === 5 || d === 6; // qua
  if (jsDay === 4) return d === 7 || d === 8; // qui
  if (jsDay === 5) return d === 9 || d === 0; // sex
  return false;
}

function buildObservacaoRodizio3Coracoes_(placa, dataRef, obsOrigem) {
  const parts = [];
  const nextBiz = nextBusinessDay_(dataRef || new Date());
  if (isRodizioSPNoDia_(placa, nextBiz)) {
    const dataTxt = Utilities.formatDate(nextBiz, Session.getScriptTimeZone(), 'dd/MM/yyyy');
    parts.push('RODIZIO SP PROX DIA UTIL (' + dataTxt + ')');
  }
  const obs = String(obsOrigem || '').trim();
  if (obs) parts.push(obs);
  return parts.join(' | ');
}

function syncDisponibilidadeParaPlanilha3Coracoes_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const shDisp = findSheetCaseInsensitive_(ss, 'DISPONIBILIDADE');
  const shProg = findSheetCaseInsensitive_(ss, 'PROGRAMACAO');
  if (!shDisp) throw new Error('Aba Disponibilidade nao encontrada.');
  if (!shProg) throw new Error('Aba Programacao nao encontrada.');

  const progHeaderRow = getProgramacaoHeaderRow_();
  const progMap = mapHeaders_(shProg, progHeaderRow);
  const cPPlanos = getHeaderColRequired_(progMap, ['PLANOS'], 'Programacao');
  const cPPlaca = getHeaderColRequired_(progMap, ['PLACA'], 'Programacao');
  const cPMotorista = getHeaderColRequired_(progMap, ['MOTORISTA'], 'Programacao');
  const cPDataCarreg = getHeaderColOptional_(progMap, ['DATA DE CARREGAMENTO']);
  const progRows = getSheetDataRowsDisplay_(shProg, shProg.getLastColumn(), progHeaderRow);
  const planoByPlaca = {};
  const planoByMotorista = {};
  const todayProg = toDateOnly_(new Date());
  for (let i = 0; i < progRows.length; i++) {
    const r = progRows[i] || [];
    if (cPDataCarreg) {
      const dataCarregTxt = String(r[cPDataCarreg - 1] || '').trim();
      const dataCarregObj = parseDateBR_(dataCarregTxt) || toDateOnly_(r[cPDataCarreg - 1]);
      if (!dataCarregObj || !isSameDay_(dataCarregObj, todayProg)) continue;
    }
    const plano = String(r[cPPlanos - 1] || '').trim();
    if (!plano) continue;
    const placaKeyProg = normalizePlate_(r[cPPlaca - 1]);
    const motoristaKeyProg = normalizeTextLoose_(r[cPMotorista - 1]);
    if (placaKeyProg && !planoByPlaca[placaKeyProg]) planoByPlaca[placaKeyProg] = plano;
    if (motoristaKeyProg && !planoByMotorista[motoristaKeyProg]) planoByMotorista[motoristaKeyProg] = plano;
  }

  const dispHeaderRow = getDisponibilidadeHeaderRow_();
  const dispMap = mapHeaders_(shDisp, dispHeaderRow);
  const cData = getHeaderColRequired_(dispMap, ['DATA'], 'Disponibilidade');
  const cPlaca = getHeaderColRequired_(dispMap, ['PLACA'], 'Disponibilidade');
  const cMotorista = getHeaderColRequired_(dispMap, ['MOTORISTA'], 'Disponibilidade');
  const cPerfil = getHeaderColOptional_(dispMap, ['PERFIL']);
  const cStatusDisp = getHeaderColOptional_(dispMap, ['DISPONIBILIDADE']);
  const cObsDisp = getHeaderColOptional_(dispMap, ['OBSERVACAO', 'OBSERVAÇÃO']);

  const dispRows = getSheetDataRowsDisplay_(shDisp, shDisp.getLastColumn(), dispHeaderRow);
  const sourceRows = [];
  const seenKeys = {};
  const today = toDateOnly_(new Date());
  for (let i = 0; i < dispRows.length; i++) {
    const r = dispRows[i] || [];
    const placa = String(r[cPlaca - 1] || '').trim();
    if (!placa) continue;
    const dataTxt = String(r[cData - 1] || '').trim();
    if (!dataTxt) continue;
    const dataObj = parseDateBR_(dataTxt) || toDateOnly_(r[cData - 1]);
    if (!dataObj || !isSameDay_(dataObj, today)) continue;
    const statusTxt = cStatusDisp ? String(r[cStatusDisp - 1] || '').trim() : '';
    if (statusTxt && !isDisponibilidadeStatusDisponivel_(statusTxt)) continue;
    const key = dataTxt + '|' + normalizePlate_(placa);
    if (seenKeys[key]) continue;
    seenKeys[key] = true;
    const perfilRaw = cPerfil ? String(r[cPerfil - 1] || '').trim() : '';
    const taraInfo = resolveTaraInfo3Coracoes_(perfilRaw);
    const motorista = String(r[cMotorista - 1] || '').trim();
    const placaKey = normalizePlate_(placa);
    const motoristaKey = normalizeTextLoose_(motorista);
    const planoProgramacao = (placaKey && planoByPlaca[placaKey]) || (motoristaKey && planoByMotorista[motoristaKey]) || '';
    sourceRows.push({
      data: dataTxt,
      placa: placa,
      perfil: taraInfo.perfil || perfilRaw,
      pallets: taraInfo.pallets,
      tara: taraInfo.tara,
      motorista: motorista,
      cpf: '',
      transp: 'THX',
      status: planoProgramacao ? 'P' : 'D',
      situacao: planoProgramacao || '',
      observacao: buildObservacaoRodizio3Coracoes_(placa, dataObj, cObsDisp ? r[cObsDisp - 1] : ''),
    });
  }

  const targetSs = SpreadsheetApp.openById(SHEET_3C_DISPONIBILIDADE_ID_);
  const targetSheet = targetSs.getSheets()[0];
  if (!targetSheet) throw new Error('Planilha 3coracoes (disponibilidade) sem abas.');
  const targetValues = targetSheet.getDataRange().getDisplayValues();
  if (!targetValues || !targetValues.length) throw new Error('Planilha 3coracoes sem cabecalho.');
  const headers = targetValues[0] || [];
  const hMap = new Map();
  for (let i = 0; i < headers.length; i++) {
    const h = String(headers[i] || '');
    if (!h) continue;
    hMap.set(normalizeHeader_(h), i + 1);
    hMap.set(normHeader_(h), i + 1);
  }
  const cTData = getHeaderColOptional_(hMap, ['DATA', '/']) || 1;
  const cTPlaca = getHeaderColRequired_(hMap, ['PLACA'], 'DISPONIBILIDADE THX');
  const cTPerfil = getHeaderColRequired_(hMap, ['PERFIL'], 'DISPONIBILIDADE THX');
  const cTPallets = getHeaderColRequired_(hMap, ['PALLETS'], 'DISPONIBILIDADE THX');
  const cTTara = getHeaderColRequired_(hMap, ['TARA'], 'DISPONIBILIDADE THX');
  const cTMotorista = getHeaderColRequired_(hMap, ['MOTORISTA'], 'DISPONIBILIDADE THX');
  const cTCPF = getHeaderColOptional_(hMap, ['CPF']);
  const cTTransp = getHeaderColOptional_(hMap, ['TRANSP.', 'TRANSP']);
  const cTStatus = getHeaderColOptional_(hMap, ['STATUS', 'DISPONIBILIDADE']);
  const cTSituacao = getHeaderColOptional_(hMap, ['SITUACAO', 'SITUAÇÃO', 'PLANO']);
  const cTObs = getHeaderColOptional_(hMap, ['OBSERVACAO', 'OBSERVAÇÃO']);

  const lastRow = targetSheet.getLastRow();
  const totalCols = Math.max(targetSheet.getLastColumn(), 11);
  const existing = lastRow >= 2 ? targetSheet.getRange(2, 1, lastRow - 1, totalCols).getDisplayValues() : [];
  const idxByKey = {};
  for (let i = 0; i < existing.length; i++) {
    const rr = existing[i] || [];
    const key = String(rr[cTData - 1] || '').trim() + '|' + normalizePlate_(rr[cTPlaca - 1]);
    if (!key || key === '|') continue;
    if (idxByKey[key] == null) idxByKey[key] = i;
  }

  const maxColNeeded = Math.max(cTData, cTPlaca, cTPerfil, cTPallets, cTTara, cTMotorista, cTCPF || 1, cTTransp || 1, cTStatus || 1, cTSituacao || 1, cTObs || 1);
  const appendRows = [];
  let updated = 0;
  let inserted = 0;

  function applyToRowBuffer_(buf, item) {
    while (buf.length < maxColNeeded) buf.push('');
    buf[cTData - 1] = item.data || '';
    buf[cTPlaca - 1] = item.placa || '';
    buf[cTPerfil - 1] = item.perfil || '';
    buf[cTPallets - 1] = item.pallets === '' ? '' : item.pallets;
    buf[cTTara - 1] = item.tara === '' ? '' : item.tara;
    buf[cTMotorista - 1] = item.motorista || '';
    if (cTCPF) buf[cTCPF - 1] = item.cpf || '';
    if (cTTransp) buf[cTTransp - 1] = item.transp || 'THX';
    if (cTStatus) {
      const currentStatus = normalizeHeader_(buf[cTStatus - 1]);
      const nextStatus = item.status === 'P' ? 'Programado' : 'Disponível';
      // Nunca rebaixa Programado para Disponível automaticamente
      if (!(currentStatus === normalizeHeader_('Programado') && normalizeHeader_(nextStatus) === normalizeHeader_('Disponível'))) {
        buf[cTStatus - 1] = nextStatus;
      }
    }
    if (cTSituacao) {
      const currentStatus = cTStatus ? normalizeHeader_(buf[cTStatus - 1]) : '';
      const nextStatusNorm = normalizeHeader_(item.status === 'P' ? 'Programado' : 'Disponível');
      const preserveSituacao = currentStatus === normalizeHeader_('Programado') && nextStatusNorm === normalizeHeader_('Disponível');
      if (!preserveSituacao) {
        buf[cTSituacao - 1] = item.situacao || '';
      }
    }
    if (cTObs) buf[cTObs - 1] = item.observacao || '';
  }

  for (let i = 0; i < sourceRows.length; i++) {
    const item = sourceRows[i];
    const key = String(item.data || '').trim() + '|' + normalizePlate_(item.placa);
    const idx = idxByKey[key];
    if (idx == null) {
      const rowBuf = new Array(maxColNeeded).fill('');
      applyToRowBuffer_(rowBuf, item);
      appendRows.push(rowBuf);
      inserted++;
      continue;
    }
    const current = (existing[idx] || []).slice();
    const before = JSON.stringify(current);
    applyToRowBuffer_(current, item);
    if (JSON.stringify(current) !== before) {
      targetSheet.getRange(idx + 2, 1, 1, Math.max(current.length, maxColNeeded)).setValues([current]);
      updated++;
    }
  }

  if (appendRows.length) {
    targetSheet.getRange(targetSheet.getLastRow() + 1, 1, appendRows.length, maxColNeeded).setValues(appendRows);
  }
  return { rowsSource: sourceRows.length, updated: updated, inserted: inserted, targetSheet: targetSheet.getName() };
}

function parseDateBR_(value) {
  const s = String(value == null ? '' : value).trim();
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  return isNaN(d) ? null : d;
}

function enviarAttemicsSegundaMensagemTeste() {
  return runAttemicsSegundaMensagem_({ previewOnly: false, testMode: false, debug: false });
}

function precheckAttemicsEnvio_(kind, options) {
  const opts = options || {};
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const cfg = getAttemicsConfig_();
  const previewOnly = !!opts.previewOnly;
  const testMode = opts.testMode !== false;
  const forcedNumber = String(opts.forcedNumber || cfg.TEST_NUMBER || '').trim();
  const dateRef = formatDateRefBR_(new Date());
  const logSheet = ensureAttemicsLogSheet_(ss);
  const logState = loadAttemicsLogState_(logSheet);
  let rows = buildAttemicsMessageRowsByPlano_({ ss: ss, forcedNumber: testMode ? forcedNumber : '' });
  if (kind === 'primeira') rows = rows.concat(buildAttemicsSemPlanoRows_({ ss: ss }));
  const precheck = buildAttemicsPreCheckSummary_(kind, rows, {
    logSheet: logSheet,
    logState: logState,
    dateRef: dateRef,
    previewOnly: previewOnly,
    testMode: testMode,
    forcedNumber: forcedNumber,
  });
  return { rows: rows, precheck: precheck, dateRef: dateRef };
}

function getClickUpProgramacaoConfig_() {
  return (CONFIG.CLICKUP && CONFIG.CLICKUP.PROGRAMACAO) || {};
}

function ensureProgramacaoClickUpColumn_() {
  setupProgramacaoColumns();
  const cols = findRequiredColumns_();
  if (!cols.programacao.clickupCol) throw new Error('Coluna CLICKUP nao encontrada na Programacao.');
  return cols;
}

function diagnosticarCamposClickUpProgramacao() {
  const cfg = getClickUpProgramacaoConfig_();
  const listId = cfg.LIST_ID_CARDS;
  if (!listId) throw new Error('LIST_ID_CARDS nao configurado em CONFIG.CLICKUP.PROGRAMACAO.');
  const tasks = fetchClickUpTasksByList_(listId, false) || [];
  const map = {};
  for (let i = 0; i < tasks.length && i < 20; i++) {
    const cfs = Array.isArray(tasks[i] && tasks[i].custom_fields) ? tasks[i].custom_fields : [];
    for (let j = 0; j < cfs.length; j++) {
      const cf = cfs[j] || {};
      const name = String(cf.name || '').trim();
      const id = String(cf.id || '').trim();
      if (!name || !id) continue;
      if (!map[name]) map[name] = id;
    }
  }
  const keys = Object.keys(map).sort();
  const plateId = map['?? PLACA'] || map['PLACA'] || '';
  const janelaId = map['?? Janela de coleta'] || map['Janela de coleta'] || '';
  const resumo = [
    'Campos encontrados: ' + keys.length,
    plateId ? ('?? PLACA: ' + plateId) : '?? PLACA: NAO ENCONTRADO',
    janelaId ? ('?? Janela de coleta: ' + janelaId) : '?? Janela de coleta: NAO ENCONTRADO',
  ].join('\n');
  try { SpreadsheetApp.getUi().alert('Diagnostico ClickUp', resumo, SpreadsheetApp.getUi().ButtonSet.OK); } catch (e) {}
  return { ok: true, data: { totalCampos: keys.length, placaBot: plateId, janelaColeta: janelaId, fields: map } };
}

function criarCardsClickUpProgramacao() {
  return runClickUpCardsProgramacao_({ mode: 'create' });
}

function preencherCamposCardsClickUpProgramacao() {
  return runClickUpCardsProgramacao_({ mode: 'fill' });
}

function criarOuAtualizarCardsClickUpProgramacao() {
  return runClickUpCardsProgramacao_({ mode: 'upsert' });
}

function runClickUpCardsProgramacao_(options) {
  const mode = String((options && options.mode) || 'upsert');
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new Error('Fluxo ClickUp de Programacao ja esta em execucao.');
  try {
    const cols = ensureProgramacaoClickUpColumn_();
    const rows = buildProgramacaoClickUpRows_({ ss: ss, cols: cols });
    if (!rows.length) {
      toast_(ss, 'ClickUp: Programacao sem linhas elegiveis.');
      return { ok: true, data: { total: 0, created: 0, updated: 0, linked: 0, errors: 0, skipped: 0 } };
    }
    const listId = getClickUpProgramacaoConfig_().LIST_ID_CARDS;
    const tasks = mode === 'create' ? [] : (fetchClickUpTasksByList_(listId, false) || []);
    const index = mode === 'create'
      ? { byPlanoKey: {}, byPlanoBase: {}, byTaskName: {}, byTaskId: {} }
      : indexClickUpTasksByPlano_(tasks);
    const stats = { total: rows.length, created: 0, updated: 0, linked: 0, errors: 0, skipped: 0 };

    // Feedback visual em massa: marca todas as linhas candidatas como "Verificando".
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (!row || !row.rowProgramacao || !row.plano) continue;
      if (getClickUpProgramacaoMissingRequiredFields_(row).length) continue;
      if (!cols.programacao.clickupStatusCol) continue;
      const statusCell = cols.programacao.sheet.getRange(row.rowProgramacao, cols.programacao.clickupStatusCol);
      setProgramacaoClickUpStatusCell_(statusCell, 'VERIFICANDO', 'Fila de verificacao ClickUp iniciada');
    }
    SpreadsheetApp.flush();

    if (mode === 'fill') {
      const fillResult = runClickUpFillProgramacaoBatch_(rows, cols, index, stats);
      toast_(ss, 'ClickUp(fill): criados=' + stats.created + ' | atualizados=' + stats.updated + ' | erros=' + stats.errors);
      return { ok: true, data: fillResult || stats };
    }

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      let step = 'init_row';
      const linkCell = cols.programacao.sheet.getRange(row.rowProgramacao, cols.programacao.clickupCol);
      const statusCell = cols.programacao.clickupStatusCol ? cols.programacao.sheet.getRange(row.rowProgramacao, cols.programacao.clickupStatusCol) : null;
      const currentLink = String(linkCell.getDisplayValue() || '').trim();
      if (!row.plano) { stats.skipped++; continue; }
      const missingRequired = getClickUpProgramacaoMissingRequiredFields_(row);
      if (missingRequired.length) {
        const statusInfo = resolveClickUpMissingRequiredStatus_(missingRequired);
        setProgramacaoClickUpStatusCell_(statusCell, statusInfo.code, statusInfo.note);
        stats.skipped++;
        continue;
      }
      setProgramacaoClickUpStatusCell_(statusCell, 'VERIFICANDO', 'Verificando card e campos no ClickUp');
      if (mode !== 'fill') upsertProgramacaoClickUpCell_(linkCell, getClickUpProgramacaoConfig_().PENDING_PREFIX + ' Processando...');
      let task = null;
      let taskId = extractClickUpTaskIdFromUrl_(currentLink);
      try {
        step = 'resolve_task';
        if (!taskId && mode !== 'create') {
          const found = findExistingClickUpTaskForPlano_(row, index);
          if (found) {
            task = found.task;
            taskId = String(task.id || '');
            row.clickupTaskName = String((task && task.name) || '').trim();
          }
        } else {
          task = (index.byTaskId && index.byTaskId[taskId] && index.byTaskId[taskId].task)
            ? index.byTaskId[taskId].task
            : { id: taskId, url: currentLink };
          row.clickupTaskName = String((task && task.name) || row.clickupTaskName || '').trim();
        }
        if (taskId && !String(row.clickupTaskName || '').trim()) {
          row.clickupTaskName = resolveClickUpTaskNameForProgramacao_(taskId, task, '');
        }
        if (!taskId && mode === 'fill') {
          setProgramacaoClickUpStatusCell_(statusCell, 'PARCIAL', 'Sem card/link para preencher campos');
          stats.skipped++;
          continue;
        }
        if (!taskId) {
          step = 'clone_task';
          row.clickupTaskName = buildClickUpTaskNameProgramacao_(row, index);
          if (mode === 'create') {
            setProgramacaoClickUpStatusCell_(statusCell, 'PREENCHENDO', 'Clonando card template no ClickUp');
          }
          task = createClickUpTaskProgramacao_(row);
          taskId = String(task && task.id || '');
          if (taskId) stats.created++;
        } else {
          stats.linked += task && task.url ? 1 : 0;
        }
        if (!taskId) throw new Error('Falha ao criar/localizar task');
        const finalUrl = task && task.url ? String(task.url) : ('https://app.clickup.com/t/' + taskId);
        upsertProgramacaoClickUpCell_(linkCell, finalUrl);
        step = 'sync_fields';
        setProgramacaoClickUpStatusCell_(statusCell, 'PREENCHENDO', 'Preenchendo campos do card no ClickUp');
        const fieldSync = updateClickUpTaskCustomFieldsProgramacao_(taskId, row, {
          includePlaca: true,
          softFail: mode === 'create',
        });
        setProgramacaoClickUpStatusCell_(statusCell, fieldSync.hasErrors ? 'ERRO' : (fieldSync.complete ? 'COMPLETO' : 'PARCIAL'), fieldSync.note);
        stats.updated++;
        if (fieldSync.hasErrors) stats.errors++;
        const planKey = normalizePlanoDigitsKey_(row.plano);
        if (planKey) index.byPlanoKey[planKey] = { task: Object.assign({}, task || {}, { id: taskId, url: finalUrl }) };
        if (taskId) index.byTaskId[taskId] = { task: Object.assign({}, task || {}, { id: taskId, url: finalUrl }) };
        const taskNameForIndex = String((task && task.name) || row.clickupTaskName || row.plano || '').trim();
        const baseForIndex = getClickUpPlanoBaseProgramacao_(taskNameForIndex || row.plano);
        if (baseForIndex) {
          if (!index.byPlanoBase[baseForIndex]) index.byPlanoBase[baseForIndex] = [];
          index.byPlanoBase[baseForIndex].push(Object.assign({}, task || {}, { id: taskId, url: finalUrl, name: taskNameForIndex }));
        }
        if (taskNameForIndex) index.byTaskName[normalizeHeader_(taskNameForIndex)] = { task: Object.assign({}, task || {}, { id: taskId, url: finalUrl, name: taskNameForIndex }) };
        if (mode !== 'fill') Utilities.sleep(200);
      } catch (e) {
        appCodeLog_('[ERRO] ClickUp run row', {
          mode: mode,
          step: step,
          rowProgramacao: row && row.rowProgramacao ? row.rowProgramacao : '',
          plano: row && row.plano ? row.plano : '',
          clickupLinkAtual: currentLink,
          taskId: taskId || '',
          message: e && e.message ? e.message : String(e),
          stack: e && e.stack ? String(e.stack).slice(0, 600) : '',
        });
        upsertProgramacaoClickUpCell_(linkCell, getClickUpProgramacaoConfig_().ERROR_PREFIX + ' ' + truncateText_(e && e.message ? e.message : String(e), 90));
        setProgramacaoClickUpStatusCell_(statusCell, 'ERRO', String(e && e.message ? e.message : e));
        stats.errors++;
      }
    }
    toast_(ss, 'ClickUp(' + mode + '): criados=' + stats.created + ' | atualizados=' + stats.updated + ' | erros=' + stats.errors);
    return { ok: true, data: stats };
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

function runClickUpFillProgramacaoBatch_(rows, cols, index, stats) {
  const sheet = cols.programacao.sheet;
  const batchSize = 10;
  for (let start = 0; start < rows.length; start += batchSize) {
    const chunk = rows.slice(start, start + batchSize);
    const prepared = [];

    // Etapa 1: resolver task/link da chunk (ainda por linha, mas sem preencher fields ainda)
    for (let i = 0; i < chunk.length; i++) {
      const row = chunk[i];
      const linkCell = sheet.getRange(row.rowProgramacao, cols.programacao.clickupCol);
      const statusCell = cols.programacao.clickupStatusCol ? sheet.getRange(row.rowProgramacao, cols.programacao.clickupStatusCol) : null;
      const currentLink = String(linkCell.getDisplayValue() || '').trim();
      if (!row.plano) { stats.skipped++; continue; }
      const missingRequired = getClickUpProgramacaoMissingRequiredFields_(row);
      if (missingRequired.length) {
        const statusInfo = resolveClickUpMissingRequiredStatus_(missingRequired);
        setProgramacaoClickUpStatusCell_(statusCell, statusInfo.code, statusInfo.note);
        stats.skipped++;
        continue;
      }
      let task = null;
      let taskId = extractClickUpTaskIdFromUrl_(currentLink);
      if (!taskId) {
        const found = findExistingClickUpTaskForPlano_(row, index);
        if (found) {
          task = found.task;
          taskId = String(task.id || '');
          row.clickupTaskName = String((task && task.name) || '').trim();
        }
      } else {
        task = (index.byTaskId && index.byTaskId[taskId] && index.byTaskId[taskId].task)
          ? index.byTaskId[taskId].task
          : { id: taskId, url: currentLink };
        row.clickupTaskName = String((task && task.name) || row.clickupTaskName || '').trim();
      }
      if (taskId && !String(row.clickupTaskName || '').trim()) {
        row.clickupTaskName = resolveClickUpTaskNameForProgramacao_(taskId, task, '');
      }
      if (!taskId) {
        setProgramacaoClickUpStatusCell_(statusCell, 'PARCIAL', 'Sem card/link para preencher campos');
        stats.skipped++;
        continue;
      }
      setProgramacaoClickUpStatusCell_(statusCell, 'PREENCHENDO', 'Preenchendo campos em lote');
      prepared.push({
        row: row,
        task: task || { id: taskId, url: currentLink },
        taskId: taskId,
        linkCell: linkCell,
        statusCell: statusCell,
      });
    }
    SpreadsheetApp.flush();

    // Etapa 2: preencher campos em lote por card (cada card internamente usa fetchAll)
    for (let i = 0; i < prepared.length; i++) {
      const item = prepared[i];
      try {
        const fieldSync = updateClickUpTaskCustomFieldsProgramacao_(item.taskId, item.row, {
          includePlaca: true,
          softFail: true,
        });
        const finalUrl = item.task && item.task.url ? String(item.task.url) : ('https://app.clickup.com/t/' + item.taskId);
        upsertProgramacaoClickUpCell_(item.linkCell, finalUrl);
        setProgramacaoClickUpStatusCell_(item.statusCell, fieldSync.hasErrors ? 'ERRO' : (fieldSync.complete ? 'COMPLETO' : 'PARCIAL'), fieldSync.note);
        stats.updated++;
        if (fieldSync.hasErrors) stats.errors++;
      } catch (e) {
        upsertProgramacaoClickUpCell_(item.linkCell, getClickUpProgramacaoConfig_().ERROR_PREFIX + ' ' + truncateText_(e && e.message ? e.message : String(e), 90));
        setProgramacaoClickUpStatusCell_(item.statusCell, 'ERRO', String(e && e.message ? e.message : e));
        stats.errors++;
      }
    }
    SpreadsheetApp.flush();
  }
  return stats;
}

function reconciliarLinksClickUpProgramacao() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const cols = ensureProgramacaoClickUpColumn_();
  const rows = buildProgramacaoClickUpRows_({ ss: ss, cols: cols });
  const tasks = fetchClickUpTasksByList_(getClickUpProgramacaoConfig_().LIST_ID_CARDS, false) || [];
  const index = indexClickUpTasksByPlano_(tasks);
  let linked = 0, scanned = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    scanned++;
    const cell = cols.programacao.sheet.getRange(row.rowProgramacao, cols.programacao.clickupCol);
    if (extractClickUpTaskIdFromUrl_(cell.getDisplayValue())) continue;
    const found = findExistingClickUpTaskForPlano_(row, index);
    if (!found || !found.task || !found.task.url) continue;
    upsertProgramacaoClickUpCell_(cell, String(found.task.url));
    linked++;
  }
  toast_(ss, 'ClickUp: links reconciliados=' + linked);
  return { ok: true, data: { scanned: scanned, linked: linked } };
}

function moverCardsClickUpParaMapa() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const cols = ensureProgramacaoClickUpColumn_();
  const sh = cols.programacao.sheet;
  const headerRow = cols.programacao.headerRow;
  const lastRow = sh.getLastRow();
  if (lastRow <= headerRow) {
    toast_(ss, 'ClickUp mapa: sem linhas na Programacao.');
    return { ok: true, data: { total: 0, moved: 0, blocked: 0, errors: 0 } };
  }

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new Error('Fluxo ClickUp ja esta em execucao.');
  try {
    const values = sh.getRange(headerRow + 1, 1, lastRow - headerRow, sh.getLastColumn()).getDisplayValues();
    const rowsForPlanoLookup = buildProgramacaoClickUpRows_({ ss: ss, cols: cols }) || [];
    const byRowNum = new Map();
    for (let i = 0; i < rowsForPlanoLookup.length; i++) {
      byRowNum.set(Number(rowsForPlanoLookup[i].rowProgramacao || 0), rowsForPlanoLookup[i]);
    }
    const listMapaId = String((getClickUpProgramacaoConfig_().LIST_ID_MAPA || '')).trim();
    const listOrigemId = String((getClickUpProgramacaoConfig_().LIST_ID_CARDS || '')).trim();
    let mapaIndex = null;
    if (listMapaId) {
      try {
        const mapaTasks = fetchClickUpTasksByList_(listMapaId, false) || [];
        mapaIndex = indexClickUpTasksByPlano_(mapaTasks);
      } catch (e0) {
        mapaIndex = null;
      }
    }
    const stats = { total: 0, moved: 0, blocked: 0, errors: 0 };
    for (let i = 0; i < values.length; i++) {
      const rowNum = headerRow + 1 + i;
      const rowVals = values[i];
      const rowCtx = byRowNum.get(rowNum) || null;
      const clickupRaw = cols.programacao.clickupCol ? String(rowVals[cols.programacao.clickupCol - 1] || '').trim() : '';
      const taskId = extractClickUpTaskIdFromUrl_(clickupRaw);
      if (!taskId) {
        if (rowCtx && mapaIndex && rowCtx.plano) {
          const statusCellNoLink = cols.programacao.clickupStatusCol ? sh.getRange(rowNum, cols.programacao.clickupStatusCol) : null;
          try {
            setProgramacaoClickUpStatusCell_(statusCellNoLink, 'VERIFICANDO', 'Verificando se o plano ja esta no mapa');
            const foundMapa = findExistingClickUpTaskForPlano_(rowCtx, mapaIndex);
            if (foundMapa && foundMapa.task) {
              setProgramacaoClickUpStatusCell_(statusCellNoLink, 'NO_MAPA', 'Card ja encontrado na lista do mapa');
            }
          } catch (e00) {}
        }
        continue;
      }
      stats.total++;

      const statusCell = cols.programacao.clickupStatusCol ? sh.getRange(rowNum, cols.programacao.clickupStatusCol) : null;
      try {
        setProgramacaoClickUpStatusCell_(statusCell, 'VERIFICANDO', 'Verificando status atual do card');
        const task = fetchClickUpTaskById_(taskId);
        const taskListId = String((task && task.list && task.list.id) || '').trim();
        const taskListName = String((task && task.list && task.list.name) || '').trim();
        const taskListNameNorm = normalizeHeader_(taskListName);
        if (taskListId && listMapaId && taskListId === listMapaId) {
          setProgramacaoClickUpStatusCell_(statusCell, 'NO_MAPA', 'Card ja esta na lista do mapa');
          continue;
        }
        if (taskListNameNorm && taskListNameNorm.indexOf(normalizeHeader_('MAPA')) !== -1) {
          setProgramacaoClickUpStatusCell_(statusCell, 'NO_MAPA', 'Card ja esta em lista de mapa: ' + taskListName);
          continue;
        }
        if (taskListId && listOrigemId && taskListId !== listOrigemId) {
          if (statusCell) {
            statusCell.setValue('\uD83D\uDD34 ' + (taskListName || ('Lista ' + taskListId)));
            try { statusCell.setBackground(null); } catch (e0x) {}
            statusCell.setHorizontalAlignment('center');
            statusCell.setFontWeight('bold');
            statusCell.setWrap(false);
            statusCell.setNote('Card esta em outra lista: ' + (taskListName || taskListId));
          }
          stats.blocked++;
          continue;
        }
        const currentStatus = String((task && task.status && task.status.status) || '').trim();
        if (
          normalizeHeader_(currentStatus) === normalizeHeader_('MOVER PARA O MAPA') ||
          normalizeHeader_(currentStatus) === normalizeHeader_('NO MAPA')
        ) {
          setProgramacaoClickUpStatusCell_(statusCell, 'NO_MAPA', 'Card ja esta no fluxo de mapa');
          continue;
        }
        if (normalizeHeader_(currentStatus) !== normalizeHeader_('DADOS ENCONTRADOS')) {
          if (statusCell) {
            statusCell.setValue('\uD83D\uDD34 ' + (currentStatus || 'SEM STATUS'));
            try { statusCell.setBackground(null); } catch (e0) {}
            statusCell.setHorizontalAlignment('center');
            statusCell.setFontWeight('bold');
            statusCell.setWrap(false);
            statusCell.setNote('Status atual do card (nao moveu): ' + (currentStatus || '(vazio)'));
          }
          if (mapaIndex && rowCtx && rowCtx.plano) {
            try {
              setProgramacaoClickUpStatusCell_(statusCell, 'VERIFICANDO', 'Verificando lista do mapa');
              const foundMapa2 = findExistingClickUpTaskForPlano_(rowCtx, mapaIndex);
              if (foundMapa2 && foundMapa2.task) {
                setProgramacaoClickUpStatusCell_(statusCell, 'NO_MAPA', 'Plano encontrado na lista de mapa');
                continue;
              }
            } catch (e01) {}
            if (statusCell) {
              statusCell.setValue('\uD83D\uDD34 ' + (currentStatus || 'SEM STATUS'));
              statusCell.setNote('Status atual do card (nao moveu): ' + (currentStatus || '(vazio)'));
            }
          }
          stats.blocked++;
          continue;
        }
        setProgramacaoClickUpStatusCell_(statusCell, 'PREENCHENDO', 'Mudando para MOVER PARA O MAPA');
        updateClickUpTaskStatus_(taskId, 'MOVER PARA O MAPA');
        setProgramacaoClickUpStatusCell_(statusCell, 'NO_MAPA', 'Status alterado para MOVER PARA O MAPA');
        stats.moved++;
      } catch (e) {
        setProgramacaoClickUpStatusCell_(statusCell, 'ERRO', String(e && e.message ? e.message : e));
        stats.errors++;
      }
    }
    SpreadsheetApp.flush();
    toast_(ss, 'ClickUp mapa: movidos=' + stats.moved + ' | bloqueados=' + stats.blocked + ' | erros=' + stats.errors);
    return { ok: true, data: stats };
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

function buildProgramacaoClickUpRows_(options) {
  const opts = options || {};
  const ss = opts.ss || SpreadsheetApp.getActiveSpreadsheet();
  const cols = opts.cols || ensureProgramacaoClickUpColumn_();
  const rows = buildAttemicsMessageRowsByPlano_({ ss: ss }).filter(function (r) { return !r.isSemPlano; });
  if (!cols.programacao.clickupCol) return rows;
  const sh = cols.programacao.sheet;
  const lastRow = sh.getLastRow();
  if (lastRow <= cols.programacao.headerRow) return rows;
  const clickupVals = sh.getRange(cols.programacao.headerRow + 1, cols.programacao.clickupCol, lastRow - cols.programacao.headerRow, 1).getDisplayValues();
  rows.forEach(function (r) {
    const idx = Number(r.rowProgramacao || 0) - (cols.programacao.headerRow + 1);
    r.clickup = idx >= 0 && clickupVals[idx] ? String(clickupVals[idx][0] || '').trim() : '';
    r.clickupPlanBase = getClickUpPlanoBaseProgramacao_(r.plano);
    r.clickupTaskName = '';
  });
  return rows;
}

function indexClickUpTasksByPlano_(tasks) {
  const out = { byPlanoKey: {}, byPlanoBase: {}, byTaskName: {}, byTaskId: {} };
  const cfg = getClickUpProgramacaoConfig_();
  const planCfId = String((((cfg || {}).CUSTOM_FIELDS || {}).PLAN) || '');
  (tasks || []).forEach(function (task) {
    if (!task) return;
    const taskId = String(task.id || '').trim();
    if (taskId && !out.byTaskId[taskId]) out.byTaskId[taskId] = { task: task };
    const keys = [];
    const taskName = String(task.name || '').trim();
    const taskNameNorm = normalizeHeader_(taskName);
    if (taskNameNorm && !out.byTaskName[taskNameNorm]) out.byTaskName[taskNameNorm] = { task: task };
    const baseFromName = getClickUpPlanoBaseProgramacao_(taskName);
    if (baseFromName) {
      if (!out.byPlanoBase[baseFromName]) out.byPlanoBase[baseFromName] = [];
      out.byPlanoBase[baseFromName].push(task);
    }
    const nameKey = normalizePlanoDigitsKey_(task.name);
    if (nameKey) keys.push(nameKey);
    const cfs = Array.isArray(task.custom_fields) ? task.custom_fields : [];
    for (let i = 0; i < cfs.length; i++) {
      const cf = cfs[i] || {};
      if (planCfId && String(cf.id || '') !== planCfId) continue;
      const k = normalizePlanoDigitsKey_(resolveClickUpCustomFieldValue_(cf));
      if (k) keys.push(k);
    }
    keys.forEach(function (k) { if (k && !out.byPlanoKey[k]) out.byPlanoKey[k] = { task: task }; });
  });
  return out;
}

function findExistingClickUpTaskForPlano_(rowCtx, index) {
  const rawPlano = String((rowCtx && rowCtx.plano) || '').trim();
  const exactTaskNameNorm = normalizeHeader_(rawPlano);
  if (exactTaskNameNorm && index && index.byTaskName && index.byTaskName[exactTaskNameNorm]) {
    return index.byTaskName[exactTaskNameNorm];
  }
  const k = normalizePlanoDigitsKey_(rawPlano);
  if (k && index && index.byPlanoKey && index.byPlanoKey[k]) return index.byPlanoKey[k];
  const base = getClickUpPlanoBaseProgramacao_(rawPlano);
  const list = (base && index && index.byPlanoBase && index.byPlanoBase[base]) ? index.byPlanoBase[base] : null;
  if (list && list.length === 1) return { task: list[0] };
  return null;
}

function getClickUpPlanoBaseProgramacao_(plano) {
  const s = String(plano == null ? '' : plano).trim();
  if (!s) return '';
  const parts = s.split('-');
  return String(parts[0] || '').trim();
}

function buildClickUpTaskNameProgramacao_(rowCtx, index) {
  const base = getClickUpPlanoBaseProgramacao_(rowCtx && rowCtx.plano);
  if (!base) return String((rowCtx && rowCtx.plano) || '').trim();
  const list = (index && index.byPlanoBase && index.byPlanoBase[base]) ? index.byPlanoBase[base] : [];
  let maxN = 0;
  for (let i = 0; i < list.length; i++) {
    const task = list[i] || {};
    const nm = String(task.name || '').trim();
    const m = nm.match(new RegExp('^' + base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '-(\\d+)$'));
    if (m) maxN = Math.max(maxN, Number(m[1] || 0));
    else if (normalizeHeader_(nm) === normalizeHeader_(base)) maxN = Math.max(maxN, 1);
  }
  return base + '-' + (maxN > 0 ? (maxN + 1) : 1);
}

function resolveClickUpTaskNameForProgramacao_(taskId, taskObj, fallbackName) {
  const fromTask = String((taskObj && taskObj.name) || '').trim();
  if (fromTask) return fromTask;
  const id = String(taskId || '').trim();
  if (id) {
    try {
      const full = fetchClickUpTaskById_(id);
      const fromApi = String((full && full.name) || '').trim();
      if (fromApi) return fromApi;
    } catch (e) {}
  }
  return String(fallbackName || '').trim();
}

function getClickUpProgramacaoFieldEntries_(rowCtx, options) {
  const opts = options || {};
  const includePlaca = opts.includePlaca !== false;
  const c = (getClickUpProgramacaoConfig_().CUSTOM_FIELDS || {});
  const dateFromSheet = rowCtx ? rowCtx.dataSaida : '';
  const loadingDate = parseDateBR_(dateFromSheet) || toDateOnly_(dateFromSheet);
  const loadingDateText = loadingDate
    ? Utilities.formatDate(loadingDate, Session.getScriptTimeZone(), 'dd/MM/yyyy')
    : String(dateFromSheet == null ? '' : dateFromSheet).trim();
  const loadingDateTs = loadingDate
    ? new Date(loadingDate.getFullYear(), loadingDate.getMonth(), loadingDate.getDate(), 12, 0, 0, 0).getTime()
    : null;
  const entries = [];
  function add(id, value) {
    if (!id || value == null || value === '') return;
    entries.push({ id: String(id), value: value });
  }
  add(c.PLAN, String(rowCtx.clickupTaskName || rowCtx.plano || ''));
  add(c.UNIT, normalizeClickUpUnitValueProgramacao_(getClickUpProgramacaoConfig_().UNIT_DEFAULT || 'GUARULHOS'));
  const invoice = normalizeInvoiceValueClickUpProgramacao_(rowCtx.valor);
  const weight = normalizeClickUpNumericFieldValue_(rowCtx.peso, { decimals: 3 });
  const deliveries = normalizeClickUpNumericFieldValue_(rowCtx.entregas, { decimals: 0 });
  add(c.INVOICE_VALUE, invoice);
  add(c.WEIGHT, weight == null ? '' : weight);
  add(c.DELIVERIES, deliveries == null ? '' : deliveries);
  add(c.MODALITY, rowCtx.perfil ? String(rowCtx.perfil).toUpperCase().trim() : '');
  add(c.LOADING_DATE_TEXT, loadingDateText);
  if (loadingDateTs != null) add(c.LOADING_DATE_TS, loadingDateTs);
  
  // Data de Carregamento (⏰ DATA CARREGAMENTO)
  const loadingDateCargStr = String(rowCtx.dataCarregamento || '').trim();
  if (loadingDateCargStr) {
    add(c.LOADING_DATE_CARG, loadingDateCargStr);
  }

  if (includePlaca) add(c.PLACA_BOT, rowCtx.placa ? String(rowCtx.placa) : '');
  add(c.JANELA_COLETA, rowCtx.faixaAgendaProgramacao ? String(rowCtx.faixaAgendaProgramacao) : '');
  add(c.MOTORISTA, rowCtx.motorista ? String(rowCtx.motorista) : '');
  
  return entries;
}

function normalizeClickUpNumericFieldValue_(rawValue, options) {
  const opts = options || {};
  const decimals = Number(opts.decimals);
  const text = String(rawValue == null ? '' : rawValue).trim();
  if (!text) return null;

  // Aceita "1.234,56", "1234.56", "1234", "1 234,56", etc.
  let normalized = text.replace(/\s+/g, '');
  if (/,/.test(normalized) && /\./.test(normalized)) {
    normalized = normalized.replace(/\./g, '').replace(',', '.');
  } else if (/,/.test(normalized)) {
    normalized = normalized.replace(',', '.');
  }
  normalized = normalized.replace(/[^0-9.-]/g, '');

  const parsed = Number(normalized);
  if (isNaN(parsed)) return null;
  if (isNaN(decimals)) return parsed;
  return Number(parsed.toFixed(Math.max(0, decimals)));
}

function getClickUpProgramacaoMissingRequiredFields_(rowCtx) {
  const missing = [];
  if (!String((rowCtx && rowCtx.perfil) || '').trim()) missing.push('PERFIL');
  if (!String((rowCtx && rowCtx.dataSaida) || '').trim()) missing.push('DATA DE SAIDA');
  return missing;
}

function normalizeClickUpUnitValueProgramacao_(rawValue) {
  const unit = String(rawValue == null ? '' : rawValue).toUpperCase().trim();
  if (!unit) return '';
  return unit.replace(/^3\s*C\s+/i, '').trim();
}

function createClickUpTaskProgramacao_(rowCtx) {
  const cfg = getClickUpProgramacaoConfig_();
  const templateTaskId = String(cfg.TEMPLATE_TASK_ID || '').trim() || '86aenj71r';
  const taskName = String(rowCtx.clickupTaskName || rowCtx.plano || '').trim();
  if (!taskName) throw new Error('Nome da task vazio para clonagem.');
  return duplicateClickUpTaskById_(templateTaskId, taskName);
}

function updateClickUpTaskCustomFieldsProgramacao_(taskId, rowCtx, options) {
  const opts = options || {};
  const includePlaca = opts.includePlaca !== false;
  const softFail = opts.softFail === true;
  const cfg = getClickUpProgramacaoConfig_();
  const c = cfg.CUSTOM_FIELDS || {};
  const placaFieldIdResolved = resolveClickUpProgramacaoFieldIdByName_(taskId, c.PLACA_BOT, ['?? PLACA', 'PLACA']);
  const janelaFieldIdResolved = resolveClickUpProgramacaoFieldIdByName_(taskId, c.JANELA_COLETA, ['?? Janela de coleta', 'Janela de coleta']);
  const attempted = [];
  const errors = [];
  const warnings = [];
  const missing = [];

  function trySetField_(id, value, label, optional) {
    if (!id) {
      if (!optional) missing.push('ID ' + label);
      return;
    }
    const strVal = String(value == null ? '' : value).trim();
    if (!strVal) {
      if (!optional) missing.push(label);
      return;
    }
    pendingFieldRequests.push({
      fieldId: id,
      label: label,
      value: value,
      required: !optional,
    });
  }

  const pendingFieldRequests = [];

  // Campos base sem derrubar o restante em caso de falha de um field.
  const resolvedPlanName = resolveClickUpTaskNameForProgramacao_(taskId, null, rowCtx && rowCtx.clickupTaskName);
  const planFieldId = String(c.PLAN || '').trim();
  const baseEntries = getClickUpProgramacaoFieldEntries_(Object.assign({}, rowCtx, {
    clickupTaskName: resolvedPlanName,
    placa: '',
    faixaAgendaProgramacao: '',
  }));
  for (let i = 0; i < baseEntries.length; i++) {
    const item = baseEntries[i];
    if (planFieldId && String(item.id || '').trim() === planFieldId && !resolvedPlanName) {
      // Nao sobrescreve ?? PLANO com valor base quando o nome completo da task nao foi resolvido.
      continue;
    }
    pendingFieldRequests.push({
      fieldId: item.id,
      label: 'base:' + item.id,
      value: item.value,
      required: true,
    });
  }

  // Extras independentes: PLACA nao depende de agenda.
  if (includePlaca) {
    trySetField_(placaFieldIdResolved, rowCtx && rowCtx.placa, '\uD83E\uDD16 PLACA', false);
  }
  const agendaValue =
    String((rowCtx && rowCtx.faixaAgendaProgramacao) || '').trim() ||
    String((rowCtx && rowCtx.agendaCarregamento) || '').trim() ||
    String((rowCtx && rowCtx.horarioAgendaMsgBase) || '').trim();
  trySetField_(janelaFieldIdResolved, agendaValue, '\u26A0\uFE0F Janela', false);

  const placaInput = String((rowCtx && rowCtx.placa) || '').trim();
  const agendaInput = String(agendaValue || '').trim();
  if (!placaInput) missing.push('Placa');
  if (!agendaInput) missing.push('Faixa de agenda');
  if (!janelaFieldIdResolved) {
    appCodeLog_('[DEBUG] ClickUp Janela sem fieldId resolvido', {
      taskId: taskId,
      configuredFieldId: String(c.JANELA_COLETA || ''),
      agendaValue: agendaInput,
    });
  } else if (!agendaInput) {
    appCodeLog_('[DEBUG] ClickUp Janela sem valor de agenda', {
      taskId: taskId,
      rowProgramacao: rowCtx && rowCtx.rowProgramacao ? rowCtx.rowProgramacao : '',
      faixaAgendaProgramacao: String((rowCtx && rowCtx.faixaAgendaProgramacao) || ''),
      agendaCarregamento: String((rowCtx && rowCtx.agendaCarregamento) || ''),
      horarioAgendaMsgBase: String((rowCtx && rowCtx.horarioAgendaMsgBase) || ''),
    });
  }

  // Atualiza os fields em lote (massa) para este card.
  if (pendingFieldRequests.length) {
    const requests = pendingFieldRequests.map(function (item) {
      return buildClickUpTaskCustomFieldRequest_(taskId, item.fieldId, item.value);
    });
    const responses = UrlFetchApp.fetchAll(requests);
    for (let i = 0; i < responses.length; i++) {
      const resp = responses[i];
      const meta = pendingFieldRequests[i];
      const code = resp.getResponseCode();
      const bodyText = String(resp.getContentText() || '');
      const isCriticalField = /PLACA|Janela/i.test(String(meta.label || ''));
      const isJanelaFieldLabel = /Janela/i.test(String(meta.label || ''));
      const isWeightField = String(meta.fieldId || '').trim() === String(c.WEIGHT || '').trim();
      const isInvoiceField = String(meta.fieldId || '').trim() === String(c.INVOICE_VALUE || '').trim();
      if (code >= 200 && code < 300) {
        attempted.push(meta.label);
      } else if (isJanelaFieldLabel && code === 400) {
        const fallback = trySetClickUpJanelaWithFallback_(taskId, meta.fieldId, meta.value);
        if (fallback.ok) {
          attempted.push(meta.label);
          appCodeLog_('[DEBUG] ClickUp Janela fallback aplicado', {
            taskId: taskId,
            fieldId: meta.fieldId,
            strategy: fallback.strategy,
          });
        } else if (softFail) {
          errors.push(meta.label + ': ClickUp field HTTP 400 (fallback falhou): ' + String(fallback.message || '').slice(0, 140));
        } else {
          errors.push(meta.label + ': ClickUp field HTTP 400 (fallback falhou): ' + String(fallback.message || '').slice(0, 140));
        }
      } else if (isWeightField && code === 400) {
        const fallbackPeso = trySetClickUpWeightWithFallback_(taskId, meta.fieldId, rowCtx && rowCtx.peso);
        if (fallbackPeso.ok) {
          attempted.push(meta.label);
          appCodeLog_('[DEBUG] ClickUp Peso fallback aplicado', {
            taskId: taskId,
            fieldId: meta.fieldId,
            strategy: fallbackPeso.strategy,
          });
        } else if (softFail) {
          warnings.push(meta.label + ': ignorado (peso HTTP 400)');
        } else {
          errors.push(meta.label + ': ClickUp peso HTTP 400 (fallback falhou): ' + String(fallbackPeso.message || '').slice(0, 140));
        }
      } else if (isInvoiceField && code === 400) {
        const fallbackNf = trySetClickUpInvoiceWithFallback_(taskId, meta.fieldId, rowCtx && rowCtx.valor);
        if (fallbackNf.ok) {
          attempted.push(meta.label);
          appCodeLog_('[DEBUG] ClickUp Valor NF fallback aplicado', {
            taskId: taskId,
            fieldId: meta.fieldId,
            strategy: fallbackNf.strategy,
          });
        } else if (softFail) {
          warnings.push(meta.label + ': ignorado (valor_nf HTTP 400)');
        } else {
          errors.push(meta.label + ': ClickUp valor_nf HTTP 400 (fallback falhou): ' + String(fallbackNf.message || '').slice(0, 140));
        }
      } else if (code === 401 && bodyText.indexOf('ACCESS_606') !== -1) {
        if (isCriticalField) {
          errors.push(meta.label + ': sem permissao para editar campo no ClickUp (ACCESS_606)');
        } else {
          warnings.push(meta.label + ': sem permissao para editar campo no ClickUp');
          appCodeLog_('[WARN] ClickUp campo sem permissao (ACCESS_606)', {
            taskId: taskId,
            fieldLabel: meta.label,
            fieldId: meta.fieldId,
            httpCode: code,
            responsePreview: bodyText.slice(0, 250),
          });
        }
      } else if (softFail) {
        if (isCriticalField) {
          errors.push(meta.label + ': ClickUp field HTTP ' + code + ': ' + bodyText.slice(0, 140));
        } else {
          warnings.push(meta.label + ': ignorado (HTTP ' + code + ')');
        }
      } else {
        errors.push(meta.label + ': ClickUp field HTTP ' + code + ': ' + bodyText.slice(0, 140));
      }
    }
  }

  const effectiveErrors = softFail
    ? errors.filter(function (e) { return /PLACA|Janela|Faixa de agenda/i.test(String(e || '')); })
    : errors;
  const complete = missing.length === 0 && effectiveErrors.length === 0;
  const parts = [];
  if (missing.length) parts.push('Faltando: ' + missing.join(', '));
  if (warnings.length) parts.push('Avisos: ' + truncateText_(warnings.join(' | '), 180));
  if (effectiveErrors.length) parts.push('Erros: ' + truncateText_(effectiveErrors.join(' | '), 180));
  return {
    complete: complete,
    hasErrors: effectiveErrors.length > 0,
    note: complete ? ('Campos sincronizados (' + attempted.length + ')') : ('Parcial: ' + parts.join(' | ')),
  };
}

function trySetClickUpJanelaWithFallback_(taskId, fieldId, rawValue) {
  const taskIdStr = String(taskId || '').trim();
  const fieldIdStr = String(fieldId || '').trim();
  const raw = String(rawValue == null ? '' : rawValue).trim();
  if (!taskIdStr || !fieldIdStr || !raw) return { ok: false, message: 'dados insuficientes para fallback' };

  let meta = null;
  try { meta = getClickUpTaskCustomFieldMeta_(taskIdStr, fieldIdStr); } catch (e) { meta = null; }
  const options = asArray_(meta && meta.type_config && meta.type_config.options);
  if (!options.length) return { ok: false, message: 'campo sem options para dropdown' };

  const rawNorm = normalizeHeader_(raw);
  const rawRangeNorm = normalizeJanelaColetaOptionText_(raw);
  let found = null;
  for (let i = 0; i < options.length; i++) {
    const opt = options[i] || {};
    const name = String(opt.name || '').trim();
    if (!name) continue;
    if (
      name === raw ||
      normalizeHeader_(name) === rawNorm ||
      normalizeJanelaColetaOptionText_(name) === rawRangeNorm
    ) {
      found = opt;
      break;
    }
  }
  if (!found) return { ok: false, message: 'opcao nao encontrada para "' + raw + '"' };

  const candidates = [];
  const optId = String(found.id || '').trim();
  const optUuid = String(found.uuid || '').trim();
  const optOrder = found.orderindex != null && String(found.orderindex).trim() !== '' ? Number(found.orderindex) : null;
  const optName = String(found.name || '').trim();

  if (optId) candidates.push({ value: optId, strategy: 'id' });
  if (optUuid && optUuid !== optId) candidates.push({ value: optUuid, strategy: 'uuid' });
  if (optOrder != null && !isNaN(optOrder)) candidates.push({ value: optOrder, strategy: 'orderindex_number' });
  if (optOrder != null && !isNaN(optOrder)) candidates.push({ value: String(optOrder), strategy: 'orderindex_string' });
  if (optName) candidates.push({ value: optName, strategy: 'name' });
  if (raw && raw !== optName) candidates.push({ value: raw, strategy: 'raw' });

  let lastMessage = '';
  const url = CONFIG.CLICKUP.BASE_URL + '/task/' + encodeURIComponent(taskIdStr) + '/field/' + encodeURIComponent(fieldIdStr);
  for (let i = 0; i < candidates.length; i++) {
    const c = candidates[i];
    const response = UrlFetchApp.fetch(url, {
      method: 'post',
      muteHttpExceptions: true,
      contentType: 'application/json',
      headers: { Authorization: getClickUpApiKey_() },
      payload: JSON.stringify({ value: c.value }),
    });
    const code = response.getResponseCode();
    const text = String(response.getContentText() || '');
    if (code >= 200 && code < 300) {
      return { ok: true, strategy: c.strategy };
    }
    lastMessage = 'HTTP ' + code + ': ' + text.slice(0, 180);
  }
  return { ok: false, message: lastMessage || 'nao foi possivel aplicar fallback' };
}

function trySetClickUpWeightWithFallback_(taskId, fieldId, rawWeight) {
  const taskIdStr = String(taskId || '').trim();
  const fieldIdStr = String(fieldId || '').trim();
  const raw = String(rawWeight == null ? '' : rawWeight).trim();
  if (!taskIdStr || !fieldIdStr || !raw) return { ok: false, message: 'peso vazio ou ids invalidos' };

  const normalized = normalizeClickUpNumericFieldValue_(raw, { decimals: 3 });
  const candidates = [];
  if (normalized != null && !isNaN(normalized)) {
    candidates.push({ value: normalized, strategy: 'number_3_decimals' });
    candidates.push({ value: Number(normalized.toFixed(2)), strategy: 'number_2_decimals' });
    candidates.push({ value: Number(normalized.toFixed(0)), strategy: 'number_integer' });
    candidates.push({ value: String(normalized), strategy: 'string_dot' });
    candidates.push({ value: String(normalized).replace('.', ','), strategy: 'string_comma' });
  }
  candidates.push({ value: raw, strategy: 'raw' });

  const url = CONFIG.CLICKUP.BASE_URL + '/task/' + encodeURIComponent(taskIdStr) + '/field/' + encodeURIComponent(fieldIdStr);
  let lastMessage = '';
  for (let i = 0; i < candidates.length; i++) {
    const c = candidates[i];
    const response = UrlFetchApp.fetch(url, {
      method: 'post',
      muteHttpExceptions: true,
      contentType: 'application/json',
      headers: { Authorization: getClickUpApiKey_() },
      payload: JSON.stringify({ value: c.value }),
    });
    const code = response.getResponseCode();
    const text = String(response.getContentText() || '');
    if (code >= 200 && code < 300) return { ok: true, strategy: c.strategy };
    lastMessage = 'HTTP ' + code + ': ' + text.slice(0, 180);
  }
  return { ok: false, message: lastMessage || 'fallback de peso falhou' };
}

function trySetClickUpInvoiceWithFallback_(taskId, fieldId, rawInvoice) {
  const taskIdStr = String(taskId || '').trim();
  const fieldIdStr = String(fieldId || '').trim();
  const raw = String(rawInvoice == null ? '' : rawInvoice).trim();
  if (!taskIdStr || !fieldIdStr || !raw) return { ok: false, message: 'valor_nf vazio ou ids invalidos' };

  const normalized = normalizeInvoiceValueClickUpProgramacao_(raw);
  const numeric = normalized == null || isNaN(Number(normalized)) ? null : Number(normalized);
  const candidates = [];
  if (numeric != null) {
    candidates.push({ value: numeric, strategy: 'number' });
    candidates.push({ value: Number(numeric.toFixed(2)), strategy: 'number_2_decimals' });
    candidates.push({ value: String(numeric), strategy: 'string_dot' });
    candidates.push({ value: String(numeric).replace('.', ','), strategy: 'string_comma' });
  }
  candidates.push({ value: raw, strategy: 'raw' });

  const url = CONFIG.CLICKUP.BASE_URL + '/task/' + encodeURIComponent(taskIdStr) + '/field/' + encodeURIComponent(fieldIdStr);
  let lastMessage = '';
  for (let i = 0; i < candidates.length; i++) {
    const c = candidates[i];
    const response = UrlFetchApp.fetch(url, {
      method: 'post',
      muteHttpExceptions: true,
      contentType: 'application/json',
      headers: { Authorization: getClickUpApiKey_() },
      payload: JSON.stringify({ value: c.value }),
    });
    const code = response.getResponseCode();
    const text = String(response.getContentText() || '');
    if (code >= 200 && code < 300) return { ok: true, strategy: c.strategy };
    lastMessage = 'HTTP ' + code + ': ' + text.slice(0, 180);
  }
  return { ok: false, message: lastMessage || 'fallback de valor_nf falhou' };
}

function buildClickUpTaskCustomFieldRequest_(taskId, fieldId, value) {
  const apiValue = normalizeClickUpCustomFieldValueForApi_(taskId, fieldId, value);
  return {
    url: CONFIG.CLICKUP.BASE_URL + '/task/' + encodeURIComponent(taskId) + '/field/' + encodeURIComponent(fieldId),
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: getClickUpApiKey_() },
    payload: JSON.stringify({ value: apiValue }),
    muteHttpExceptions: true,
  };
}

function setClickUpTaskCustomFieldValue_(taskId, fieldId, value) {
  if (!taskId || !fieldId) return;
  const apiValue = normalizeClickUpCustomFieldValueForApi_(taskId, fieldId, value);
  const url = CONFIG.CLICKUP.BASE_URL + '/task/' + encodeURIComponent(taskId) + '/field/' + encodeURIComponent(fieldId);
  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: getClickUpApiKey_() },
    payload: JSON.stringify({ value: apiValue }),
    muteHttpExceptions: true,
  });
  const code = response.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error('ClickUp field HTTP ' + code + ': ' + (response.getContentText() || '').slice(0, 180));
  }
}

function normalizeClickUpCustomFieldValueForApi_(taskId, fieldId, value) {
  const cfg = getClickUpProgramacaoConfig_();
  const cfs = (cfg && cfg.CUSTOM_FIELDS) || {};
  const fieldIdStr = String(fieldId || '').trim();
  if (!fieldIdStr) return value;
  let meta = null;
  try { meta = getClickUpTaskCustomFieldMeta_(taskId, fieldIdStr); } catch (e) { meta = null; }
  const fieldNameNorm = normalizeHeader_(meta && meta.name ? meta.name : '');
  const isJanelaField =
    fieldNameNorm === normalizeHeader_('?? Janela de coleta') ||
    fieldNameNorm === normalizeHeader_('Janela de coleta') ||
    (cfs.JANELA_COLETA && fieldIdStr === String(cfs.JANELA_COLETA));

  // Janela de coleta e dropdown: enviar ID/UUID da opcao (nunca texto bruto).
  if (isJanelaField) {
    const raw = String(value == null ? '' : value).trim();
    if (!raw) return value;
    const options = asArray_(meta && meta.type_config && meta.type_config.options);
    if (!options.length) return value;
    const rawNorm = normalizeHeader_(raw);
    const rawFaixaNorm = normalizeJanelaColetaOptionText_(raw);
    let found = null;
    for (let i = 0; i < options.length; i++) {
      const opt = options[i] || {};
      const name = String(opt.name || '').trim();
      if (!name) continue;
      if (
        name === raw ||
        normalizeHeader_(name) === rawNorm ||
        normalizeJanelaColetaOptionText_(name) === rawFaixaNorm
      ) { found = opt; break; }
    }
    if (!found) {
      throw new Error('Opcao dropdown nao encontrada para Janela de coleta: ' + raw);
    }
    const orderIndex = found.orderindex != null && String(found.orderindex).trim() !== ''
      ? Number(found.orderindex)
      : null;
    const optionUuid = String(found.id || found.uuid || '').trim();
    appCodeLog_('[DEBUG] ClickUp Janela match', {
      taskId: String(taskId || ''),
      fieldId: fieldIdStr,
      raw: raw,
      matchedName: String(found.name || ''),
      hasOrderIndex: orderIndex != null,
      hasUuid: !!optionUuid,
    });
    if (orderIndex != null && !isNaN(orderIndex)) return orderIndex;
    if (optionUuid) return optionUuid;
    throw new Error('Opcao dropdown sem id/uuid/orderindex para Janela de coleta');
  }
  return value;
}

function normalizeJanelaColetaOptionText_(text) {
  const raw = String(text == null ? '' : text);
  const canonicalRange = extractTimeRangeKey_(raw);
  if (canonicalRange) return canonicalRange;
  return raw
    .trim()
    .replace(/\s*-\s*/g, '-')
    .replace(/\s*[àa]\s*s?\s*/gi, '-')
    .replace(/\s*as\s*/gi, '-')
    .replace(/h/g, ':00')
    .replace(/\s+/g, ' ')
    .toUpperCase();
}

function extractTimeRangeKey_(text) {
  const raw = String(text == null ? '' : text);
  const matches = raw.match(/(\d{1,2})(?::(\d{2}))?/g);
  if (!matches || matches.length < 2) return '';

  function toHm_(token) {
    const m = String(token || '').match(/^(\d{1,2})(?::(\d{2}))?$/);
    if (!m) return '';
    const h = Number(m[1]);
    const min = Number(m[2] || '0');
    if (isNaN(h) || isNaN(min) || h < 0 || h > 23 || min < 0 || min > 59) return '';
    return pad2_(h) + ':' + pad2_(min);
  }

  const start = toHm_(matches[0]);
  const end = toHm_(matches[1]);
  if (!start || !end) return '';
  return start + '-' + end;
}

function getClickUpTaskCustomFieldMeta_(taskId, fieldId) {
  const key = String(taskId || '').trim() + '|' + String(fieldId || '').trim();
  if (!key || key === '|') return null;
  if (CLICKUP_TASK_CF_META_CACHE_[key]) return CLICKUP_TASK_CF_META_CACHE_[key];

  const url = CONFIG.CLICKUP.BASE_URL + '/task/' + encodeURIComponent(String(taskId || '').trim());
  const response = UrlFetchApp.fetch(url, {
    method: 'get',
    headers: { Authorization: getClickUpApiKey_() },
    muteHttpExceptions: true,
  });
  const code = response.getResponseCode();
  const text = response.getContentText() || '';
  if (code < 200 || code >= 300) {
    throw new Error('ClickUp task HTTP ' + code + ': ' + text.slice(0, 180));
  }
  let data = null;
  try { data = JSON.parse(text); } catch (e) { throw new Error('Resposta task ClickUp invalida'); }
  const cfs = asArray_(data && data.custom_fields);
  for (let i = 0; i < cfs.length; i++) {
    const cf = cfs[i] || {};
    const cfId = String(cf.id || '').trim();
    if (!cfId) continue;
    const cacheKey = String(taskId || '').trim() + '|' + cfId;
    CLICKUP_TASK_CF_META_CACHE_[cacheKey] = cf;
  }
  return CLICKUP_TASK_CF_META_CACHE_[key] || null;
}

function getClickUpTaskCustomFieldsByName_(taskId) {
  const taskIdStr = String(taskId || '').trim();
  if (!taskIdStr) return new Map();
  const url = CONFIG.CLICKUP.BASE_URL + '/task/' + encodeURIComponent(taskIdStr);
  const response = UrlFetchApp.fetch(url, {
    method: 'get',
    headers: { Authorization: getClickUpApiKey_() },
    muteHttpExceptions: true,
  });
  const code = response.getResponseCode();
  const text = response.getContentText() || '';
  if (code < 200 || code >= 300) {
    throw new Error('ClickUp task HTTP ' + code + ': ' + text.slice(0, 180));
  }
  let data = null;
  try { data = JSON.parse(text); } catch (e) { throw new Error('Resposta task ClickUp invalida'); }
  const cfs = asArray_(data && data.custom_fields);
  const byName = new Map();
  for (let i = 0; i < cfs.length; i++) {
    const cf = cfs[i] || {};
    const cfId = String(cf.id || '').trim();
    const cfName = String(cf.name || '').trim();
    if (!cfId) continue;
    CLICKUP_TASK_CF_META_CACHE_[taskIdStr + '|' + cfId] = cf;
    if (cfName) byName.set(normalizeHeader_(cfName), cf);
  }
  return byName;
}

function resolveClickUpProgramacaoFieldIdByName_(taskId, configuredId, candidateNames) {
  const cfgId = String(configuredId || '').trim();
  if (cfgId) {
    try {
      const meta = getClickUpTaskCustomFieldMeta_(taskId, cfgId);
      if (meta && String(meta.id || '').trim()) return cfgId;
    } catch (e) {
      // fallback por nome quando o ID configurado estiver errado
    }
  }
  const byName = getClickUpTaskCustomFieldsByName_(taskId);
  const names = asArray_(candidateNames);
  for (let i = 0; i < names.length; i++) {
    const cf = byName.get(normalizeHeader_(names[i]));
    if (cf && String(cf.id || '').trim()) return String(cf.id || '').trim();
  }

  // Fallback tolerante: alguns workspaces mudam o label (emoji/prefixo), mas mantem "JANELA"/"COLETA".
  let keywordMatch = '';
  byName.forEach(function (cf, normalizedName) {
    if (keywordMatch) return;
    const n = String(normalizedName || '');
    if (n.indexOf('JANELA') !== -1 && n.indexOf('COLETA') !== -1) {
      const id = String((cf && cf.id) || '').trim();
      if (id) keywordMatch = id;
    }
  });
  if (keywordMatch) return keywordMatch;

  // Ultimo fallback: usa o ID configurado mesmo sem metadata, para tentar escrita direta.
  if (cfgId) return cfgId;
  return '';
}

function extractClickUpTaskIdFromUrl_(urlOrText) {
  return extractClickUpTaskIdFromInput_(String(urlOrText || '').trim());
}

function upsertProgramacaoClickUpCell_(cell, valueOrStatus) {
  if (!cell) return;
  cell.setValue(String(valueOrStatus || '').trim());
}

function resolveClickUpMissingRequiredStatus_(missingRequired) {
  const missing = asArray_(missingRequired).map(function (v) { return String(v || '').trim(); }).filter(Boolean);
  if (missing.length === 1 && missing[0] === 'DATA DE SAIDA') {
    return { code: 'AGUARDANDO_DATA_SAIDA', note: 'Aguardando DATA DE SAIDA' };
  }
  return { code: 'PARCIAL', note: 'Bloqueado: Campos obrigatorios ausentes: ' + missing.join(', ') };
}

function setProgramacaoClickUpStatusCell_(cell, code, note) {
  if (!cell) return;
  const c = String(code || '').toUpperCase();
  let label = '';
  if (c === 'COMPLETO') label = '\ud83d\udfe2 Mover para o mapa';
  else if (c === 'NO_MAPA') label = '\ud83d\udfe2 No mapa';
  else if (c === 'PARCIAL') label = '\ud83d\udfe1 Parcial';
  else if (c === 'AGUARDANDO_DATA_SAIDA') label = '\ud83d\udfe1 Aguardando DATA DE SAIDA';
  else if (c === 'ERRO') label = '\ud83d\udd34 Erro';
  else if (c === 'VERIFICANDO') label = '\ud83d\udd35 Verificando';
  else if (c === 'PREENCHENDO') label = '\ud83d\udd35 Preenchendo';
  else label = '';
  cell.setValue(label);
  try { cell.setBackground(null); } catch (e) {}
  cell.setHorizontalAlignment('center');
  cell.setFontWeight('bold');
  cell.setWrap(false);
  if (note) cell.setNote(truncateText_(String(note), 250)); else cell.clearNote();
}

function normalizeInvoiceValueClickUpProgramacao_(rawValue) {
  if (rawValue == null || rawValue === '') return null;
  if (typeof rawValue === 'number') return rawValue;
  var value = String(rawValue || '').trim();
  if (!value) return null;
  value = value.replace(/[R$\s]/g, '').replace(/[^0-9,.-]/g, '');
  if (!value) return null;
  if (value.indexOf('.') !== -1 && value.indexOf(',') !== -1) {
    return parseFloat(value.replace(/\./g, '').replace(',', '.'));
  }
  if (value.indexOf(',') !== -1) return parseFloat(value.replace(',', '.'));
  const n = parseFloat(value);
  return isNaN(n) ? null : n;
}

function syncClickUpProgramacaoOnEditRow_(sheet, rowNumber, cols, options) {
  const opts = options || {};
  const pcols = (cols || findRequiredColumns_()).programacao;
  if (!pcols.clickupCol || !pcols.planosCol) return;
  const rowVals = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
  const statusCell = pcols.clickupStatusCol ? sheet.getRange(rowNumber, pcols.clickupStatusCol) : null;
  if (!pcols.dataSaidaCol) {
    setProgramacaoClickUpStatusCell_(statusCell, 'ERRO', 'Coluna obrigatoria ausente: DATA DE SAIDA');
    return;
  }
  const dataSaida = String(rowVals[pcols.dataSaidaCol - 1] || '').trim();
  if (!dataSaida) {
    setProgramacaoClickUpStatusCell_(statusCell, 'AGUARDANDO_DATA_SAIDA', 'Aguardando DATA DE SAIDA');
    return;
  }
  const plano = String(rowVals[pcols.planosCol - 1] || '').trim();
  if (!plano) return;
  let taskId = extractClickUpTaskIdFromUrl_(rowVals[pcols.clickupCol - 1]);
  if (!taskId) {
    const tasks = fetchClickUpTasksByList_(getClickUpProgramacaoConfig_().LIST_ID_CARDS, false) || [];
    const found = findExistingClickUpTaskForPlano_({ plano: plano }, indexClickUpTasksByPlano_(tasks));
    if (found && found.task) {
      taskId = String(found.task.id || '');
      if (found.task.url) sheet.getRange(rowNumber, pcols.clickupCol).setValue(String(found.task.url));
    }
  }
  if (!taskId) return;
  const cfs = getClickUpProgramacaoConfig_().CUSTOM_FIELDS || {};
  const placaFieldIdResolved = resolveClickUpProgramacaoFieldIdByName_(taskId, cfs.PLACA_BOT, ['?? PLACA', 'PLACA']);
  const janelaFieldIdResolved = resolveClickUpProgramacaoFieldIdByName_(taskId, cfs.JANELA_COLETA, ['?? Janela de coleta', 'Janela de coleta']);
  if (opts.syncPlaca && placaFieldIdResolved && pcols.placaCol) {
    const placa = String(rowVals[pcols.placaCol - 1] || '').trim();
    if (placa) setClickUpTaskCustomFieldValue_(taskId, placaFieldIdResolved, placa);
  }
  if (opts.syncJanela && janelaFieldIdResolved && pcols.faixaAgendaCol) {
    const janela = String(rowVals[pcols.faixaAgendaCol - 1] || '').trim();
    if (janela) setClickUpTaskCustomFieldValue_(taskId, janelaFieldIdResolved, janela);
  }
}

function alimentarContainer() {
  return runAlimentarContainer_({ debug: false });
}

function debugAlimentarContainer() {
  return runAlimentarContainer_({ debug: true });
}

function atualizarDisponibilidadeClickUp() {
  return runAtualizarDisponibilidadeClickUp_({ debug: false });
}

function debugAtualizarDisponibilidadeClickUp() {
  return runAtualizarDisponibilidadeClickUp_({ debug: true });
}

function debugTaskClickUpPorUrlOuId() {
  // Troque aqui quando quiser testar outra task:
  return debugTaskClickUp_('https://app.clickup.com/t/86abx3yfr', { debug: true });
}

function debugTaskClickUp_(urlOuId, options) {
  const debug = !!(options && options.debug);
  const ctx = { step: 'inicio' };

  try {
    ctx.step = 'extrair_task_id';
    const input = String(urlOuId == null ? '' : urlOuId).trim();
    const taskId = extractClickUpTaskIdFromInput_(input);
    if (!taskId) throw new Error('Nao foi possivel extrair o taskId do input: ' + input);

    appDebugPrint_('[DEBUG] Debug task ClickUp - inicio', {
      input: input,
      taskId: taskId,
      debug: debug,
      timestamp: new Date(),
    });

    ctx.step = 'buscar_task_clickup';
    const task = fetchClickUpTaskById_(taskId);
    const customFields = Array.isArray(task && task.custom_fields) ? task.custom_fields : [];
    const cfResolved = resolverCustomFieldsClickUp_(task);
    const parsedDisponibilidade = parseClickUpTaskDisponibilidade_(task);

    appDebugPrint_('[DEBUG] Debug task ClickUp - resposta', {
      id: task && task.id,
      name: task && task.name,
      status: task && task.status ? task.status.status : '',
      customFieldsCount: customFields.length,
      url: task && task.url ? task.url : '',
    });

    appDebugPrint_('[DEBUG] Debug task ClickUp - custom fields (raw)', {
      fields: customFields.map(function (cf) {
        return {
          id: cf && cf.id,
          name: cf && cf.name,
          type: cf && cf.type,
          value: cf && Object.prototype.hasOwnProperty.call(cf, 'value') ? cf.value : '',
          hasTypeConfig: !!(cf && cf.type_config),
          optionsCount:
            cf && cf.type_config && Array.isArray(cf.type_config.options)
              ? cf.type_config.options.length
              : 0,
        };
      }),
    });

    appDebugPrint_('[DEBUG] Debug task ClickUp - mapeamento disponibilidade', {
      camposConfigurados: {
        unidade: CONFIG.CLICKUP.UNIDADE_FIELD,
        status: CONFIG.CLICKUP.STATUS_FIELD,
        placa: CONFIG.CLICKUP.PLACA_FIELD,
        perfil: CONFIG.CLICKUP.PERFIL_FIELD,
        motorista: CONFIG.CLICKUP.MOTORISTA_FIELD,
        contato: CONFIG.CLICKUP.CONTATO_FIELD,
      },
      valoresResolvidosDiretos: {
        unidade: cfResolved[CONFIG.CLICKUP.UNIDADE_FIELD] || '',
        status: cfResolved[CONFIG.CLICKUP.STATUS_FIELD] || '',
        placa: cfResolved[CONFIG.CLICKUP.PLACA_FIELD] || '',
        perfil: cfResolved[CONFIG.CLICKUP.PERFIL_FIELD] || '',
        motorista: cfResolved[CONFIG.CLICKUP.MOTORISTA_FIELD] || '',
        contato: cfResolved[CONFIG.CLICKUP.CONTATO_FIELD] || '',
      },
      parsedDisponibilidade: parsedDisponibilidade,
      matchesFiltro: {
        unidadeOk:
          normalizeTextLoose_(parsedDisponibilidade.unidade) ===
          normalizeTextLoose_(CONFIG.CLICKUP.UNIDADE_ALVO),
        statusOk:
          normalizeTextLoose_(parsedDisponibilidade.status) ===
          normalizeTextLoose_(CONFIG.CLICKUP.STATUS_ALVO),
      },
    });

    appDebugPrint_('[OK] Debug task ClickUp - concluido', { taskId: taskId });
    return {
      ok: true,
      data: {
        taskId: taskId,
        parsedDisponibilidade: parsedDisponibilidade,
      },
    };
  } catch (error) {
    appDebugError_(error, ctx);
    throw error;
  } finally {
    flushDebugLogBuffer_();
  }
}

function runAtualizarDisponibilidadeClickUp_(options) {
  const debug = !!(options && options.debug);
  const ctx = { step: 'inicio' };

  try {
    appDebugPrint_('[INFO] Inicio atualizacao disponibilidade ClickUp', {
      debug: debug,
      listId: CONFIG.CLICKUP.LIST_ID_MOTORISTAS,
      unidadeAlvo: CONFIG.CLICKUP.UNIDADE_ALVO,
      statusAlvo: CONFIG.CLICKUP.STATUS_ALVO,
      timestamp: new Date(),
    });

    ctx.step = 'fetch_clickup';
    // Otimização: Filtrando por Status em minúsculas (Funciona bem e traz ~200 tarefas em vez de 8000)
    const apiStatuses = [CONFIG.CLICKUP.STATUS_ALVO, CONFIG.CLICKUP.STATUS_ALVO_SECUNDARIO]
      .filter(Boolean)
      .map(function(s) { return s.toLowerCase(); });

    const tasks = fetchClickUpTasksByList_(CONFIG.CLICKUP.LIST_ID_MOTORISTAS, {
      debug: debug,
      statuses: apiStatuses
    });
    if (debug) {
      appDebugPrint_('[DEBUG] ClickUp filtragem API concluida (Statuses apenas)', {
        solicitado: { statuses: apiStatuses },
        totalRecebido: tasks.length,
      });
    }
    const parsed = tasks.map(parseClickUpTaskDisponibilidade_).filter(Boolean);
    if (debug) {
      appDebugPrint_('[DEBUG] ClickUp tasks parseadas', {
        total: parsed.length,
        amostra: parsed.slice(0, 5),
      });
      appDebugPrint_('[DEBUG] ClickUp diagnostico parse', {
        semPlaca: parsed.filter(function (x) { return !String(x.placa || '').trim(); }).length,
        semContato: parsed.filter(function (x) { return !String(x.contato || '').trim(); }).length,
        semUnidade: parsed.filter(function (x) { return !String(x.unidade || '').trim(); }).length,
        semStatus: parsed.filter(function (x) { return !String(x.status || '').trim(); }).length,
      });
    }
    const filtrados = filtrarMotoristasDisponibilidade_(parsed, debug);
    if (debug) {
      appDebugPrint_('[DEBUG] ClickUp tasks filtradas (unidade/status)', {
        total: filtrados.length,
        unidadeAlvo: CONFIG.CLICKUP.UNIDADE_ALVO,
        statusAlvo: CONFIG.CLICKUP.STATUS_ALVO,
        amostra: filtrados.slice(0, 5),
      });
    }

    ctx.step = 'abrir_aba_disponibilidade';
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = findSheetCaseInsensitive_(ss, 'disponibilidade');
    if (!sheet) throw new Error('Aba "disponibilidade" nao encontrada.');

    ctx.step = 'append_ou_atualizar';
    if (debug) {
      appDebugPrint_('[INFO] Disponibilidade: iniciando append/atualizacao', {
        totalFiltrados: filtrados.length,
      });
    }
    const stats = appendOuAtualizarContatoDisponibilidade_(sheet, filtrados, debug);

    ctx.step = 'formatar';
    formatarDisponibilidade();
    SpreadsheetApp.flush();

    appDebugPrint_('[OK] Atualizacao disponibilidade concluida', {
      clickupTasks: tasks.length,
      parsed: parsed.length,
      filtrados: filtrados.length,
      stats: stats,
    });

    return { ok: true, data: { clickupTasks: tasks.length, filtrados: filtrados.length, stats: stats } };
  } catch (error) {
    appDebugError_(error, ctx);
    throw error;
  } finally {
    flushDebugLogBuffer_();
  }
}

function formatarDisponibilidade() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet =
    ss.getSheetByName('disponibilidade') ||
    ss.getSheetByName('Disponibilidade') ||
    ss.getSheetByName('DISPONIBILIDADE');

  if (!sheet) {
    throw new Error('Aba "disponibilidade" nao encontrada.');
  }

  const lastRow = sheet.getLastRow();
  const lastCol = Math.max(sheet.getLastColumn(), 6);
  if (lastRow < 1) return;

  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const idx = mapDisponibilidadeHeaders_(headers);

  // Layout basico
  sheet.setHiddenGridlines(false);
  sheet.setFrozenRows(1);

  const headerRange = sheet.getRange(1, 1, 1, lastCol);
  headerRange
    .setFontWeight('bold')
    .setFontColor('#ffffff')
    .setBackground('#0c4a6e')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, true, true, '#164e63', SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(1, 28);

  if (lastRow > 1) {
    const dataRange = sheet.getRange(2, 1, lastRow - 1, lastCol);
    dataRange
      .setVerticalAlignment('middle')
      .setBorder(true, true, true, true, true, true, '#d1d5db', SpreadsheetApp.BorderStyle.SOLID);
  }

  // Filtro
  const filter = sheet.getFilter();
  if (filter) filter.remove();
  sheet.getRange(1, 1, Math.max(lastRow, 1), lastCol).createFilter();

  // Formatos por coluna
  if (idx.data != null && lastRow > 1) {
    sheet.getRange(2, idx.data + 1, lastRow - 1, 1).setNumberFormat('dd/MM/yyyy');
  }

  // Dropdown DISPONIBILIDADE
  if (idx.disponibilidade != null && lastRow > 1) {
    const col = idx.disponibilidade + 1;
    const rangeStatus = sheet.getRange(2, col, lastRow - 1, 1);
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Disponível', 'Indisponível'], true)
      .setAllowInvalid(false)
      .build();
    rangeStatus.setDataValidation(rule);

    // Regras de cor por status (mantem outras regras e substitui apenas da coluna)
    const existingRules = sheet.getConditionalFormatRules() || [];
    const keepRules = existingRules.filter(function (r) {
      const ranges = r.getRanges() || [];
      return !ranges.some(function (rg) {
        return rg.getColumn() === col && rg.getNumColumns() === 1;
      });
    });

    const disponivelRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Dispon\u00edvel')
      .setBackground('#dcfce7')
      .setFontColor('#166534')
      .setRanges([rangeStatus])
      .build();

    const indisponivelRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Indispon\u00edvel')
      .setBackground('#fee2e2')
      .setFontColor('#991b1b')
      .setRanges([rangeStatus])
      .build();

    keepRules.push(disponivelRule, indisponivelRule);
    sheet.setConditionalFormatRules(keepRules);
  }

  // Larguras sugeridas (se colunas existirem)
  if (idx.data != null) sheet.setColumnWidth(idx.data + 1, 95);
  if (idx.placa != null) sheet.setColumnWidth(idx.placa + 1, 90);
  if (idx.motorista != null) sheet.setColumnWidth(idx.motorista + 1, 360);
  if (idx.perfil != null) sheet.setColumnWidth(idx.perfil + 1, 90);
  if (idx.disponibilidade != null) sheet.setColumnWidth(idx.disponibilidade + 1, 140);
  if (idx.observacao != null) sheet.setColumnWidth(idx.observacao + 1, 220);
  if (idx.contato != null) sheet.setColumnWidth(idx.contato + 1, 150);

  SpreadsheetApp.flush();
  appDebugPrint_('Disponibilidade formatada', {
    sheetName: sheet.getName(),
    rows: lastRow,
    cols: lastCol,
    headers: headers,
  });
}

function aplicarVisualTHX() {
  return runAplicarVisualTHX_({ debug: false });
}

function runAplicarVisualTHX_(options) {
  const debug = !!(options && options.debug);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Planilha ativa nao encontrada.');

  const shDisp = findSheetCaseInsensitive_(ss, 'Disponibilidade');
  const shProg = findSheetCaseInsensitive_(ss, 'Programacao') || findSheetCaseInsensitive_(ss, 'Programação');
  const shMsg = findSheetCaseInsensitive_(ss, 'Programacao_Mensagem_Base') || findSheetCaseInsensitive_(ss, 'Programação_Mensagem_Base');

  if (shDisp) {
    formatarDisponibilidade();
  }
  if (shProg) {
    formatarProgramacaoTHX_(shProg);
    applyProgramacaoLogoTHX_(shProg);
  }
  if (shMsg) {
    formatarProgramacaoMensagemBaseTHX_(shMsg);
  }

  SpreadsheetApp.flush();
  toast_(ss, 'Visual THX aplicado.');

  if (debug) {
    appDebugPrint_('[OK] Visual THX aplicado', {
      programacao: shProg ? shProg.getName() : '',
      mensagem: shMsg ? shMsg.getName() : '',
      disponibilidade: shDisp ? shDisp.getName() : '',
    });
  }

  return {
    ok: true,
    data: {
      programacao: !!shProg,
      mensagem: !!shMsg,
      disponibilidade: !!shDisp,
    },
  };
}

function formatarProgramacaoTHX_(sheet) {
  const headerRow = getProgramacaoHeaderRow_();
  if (!ensureProgramacaoVisualHeaderRowsTHX_(sheet)) return;

  const lastRow = Math.max(sheet.getLastRow(), 1);
  const lastCol = Math.max(sheet.getLastColumn(), CONFIG.MAIN_HEADERS.length);
  const headers = sheet.getRange(headerRow, 1, 1, lastCol).getValues()[0];
  const map = {};
  headers.forEach(function (h, i) { map[normalizeHeader_(h)] = i + 1; });

  const theme = getTHXTheme_();
  const headerRange = sheet.getRange(headerRow, 1, 1, lastCol);
  const dataStartRow = headerRow + 1;

  sheet.setHiddenGridlines(true);
  sheet.setFrozenRows(headerRow);
  sheet.setRowHeight(1, 54);
  sheet.setRowHeight(2, 30);
  sheet.setRowHeight(headerRow, 32);

  applyProgramacaoExecutiveHeaderTHX_(sheet, {
    headerRow: headerRow,
    lastRow: lastRow,
    lastCol: lastCol,
  });

  headerRange
    .setBackground(theme.header)
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontFamily('Montserrat')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, true, true, theme.headerBorder, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  if (lastRow > headerRow) {
    const dataRange = sheet.getRange(dataStartRow, 1, lastRow - headerRow, lastCol);
    dataRange
      .setFontFamily('Arial')
      .setFontSize(10)
      .setVerticalAlignment('middle')
      .setBorder(true, true, true, true, true, true, '#e5e7eb', SpreadsheetApp.BorderStyle.SOLID);
    removeOverlappingBandingsTHX_(sheet, dataRange);
    dataRange.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY);
  }

  ensureSheetFilterTHX_(sheet, lastRow, lastCol, headerRow);
  setProgramacaoWidthsTHX_(sheet, map);
  applyProgramacaoFormatsTHX_(sheet, map, lastRow, headerRow);
  applyProgramacaoConditionalRulesTHX_(sheet, map, lastRow, headerRow);
}

function formatarProgramacaoMensagemBaseTHX_(sheet) {
  const lastRow = Math.max(sheet.getLastRow(), 1);
  const lastCol = Math.max(sheet.getLastColumn(), CONFIG.MESSAGE_HEADERS.length);
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const map = {};
  headers.forEach(function (h, i) { map[normalizeHeader_(h)] = i + 1; });
  const theme = getTHXTheme_();

  sheet.setHiddenGridlines(true);
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 32);

  sheet.getRange(1, 1, 1, lastCol)
    .setBackground(theme.header2)
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontFamily('Montserrat')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, true, true, theme.headerBorder, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  if (lastRow > 1) {
    const dataRange = sheet.getRange(2, 1, lastRow - 1, lastCol);
    dataRange
      .setFontFamily('Arial')
      .setFontSize(10)
      .setVerticalAlignment('middle')
      .setBorder(true, true, true, true, true, true, '#e5e7eb', SpreadsheetApp.BorderStyle.SOLID);
    removeOverlappingBandingsTHX_(sheet, dataRange);
    dataRange.applyRowBanding(SpreadsheetApp.BandingTheme.BLUE);
  }

  ensureSheetFilterTHX_(sheet, lastRow, lastCol, 1);

  if (map[normalizeHeader_('PLANOS')]) sheet.setColumnWidth(map[normalizeHeader_('PLANOS')], 120);
  if (map[normalizeHeader_('HORARIO AGENDA')] || map[normalizeHeader_('HORÁRIO AGENDA')]) {
    const cHora = map[normalizeHeader_('HORARIO AGENDA')] || map[normalizeHeader_('HORÁRIO AGENDA')];
    sheet.setColumnWidth(cHora, 110);
    if (lastRow > 1) sheet.getRange(2, cHora, lastRow - 1, 1).setNumberFormat('HH:mm');
  }
  if (map[normalizeHeader_('SENHA/PROTOC.')]) sheet.setColumnWidth(map[normalizeHeader_('SENHA/PROTOC.')], 130);
  if (map[normalizeHeader_('QUANTIDADE DE ENTREGAS')]) sheet.setColumnWidth(map[normalizeHeader_('QUANTIDADE DE ENTREGAS')], 150);
  if (map[normalizeHeader_('PESO')]) {
    sheet.setColumnWidth(map[normalizeHeader_('PESO')], 100);
    if (lastRow > 1) sheet.getRange(2, map[normalizeHeader_('PESO')], lastRow - 1, 1).setNumberFormat('0.000');
  }
  if (map[normalizeHeader_('VALOR')]) {
    sheet.setColumnWidth(map[normalizeHeader_('VALOR')], 120);
    if (lastRow > 1) sheet.getRange(2, map[normalizeHeader_('VALOR')], lastRow - 1, 1).setNumberFormat('"R$" #,##0.00');
  }
  if (map[normalizeHeader_('CIDADES')]) sheet.setColumnWidth(map[normalizeHeader_('CIDADES')], 360);
  if (map[normalizeHeader_('BAIRROS')]) sheet.setColumnWidth(map[normalizeHeader_('BAIRROS')], 320);
}

function getTHXTheme_() {
  return {
    header: '#0B2A4A',
    header2: '#123A63',
    headerBorder: '#081A2D',
    accent: '#1D5FA8',
    lightBlue: '#EAF2FB',
    softBlue: '#F5F9FF',
    warning: '#FFF3CD',
    error: '#FCE8E6',
  };
}

function ensureSheetFilterTHX_(sheet, lastRow, lastCol, headerRow) {
  const filter = sheet.getFilter();
  if (filter) filter.remove();
  const hdrRow = Math.max(1, Number(headerRow) || 1);
  const totalRows = Math.max(lastRow - hdrRow + 1, 1);
  sheet.getRange(hdrRow, 1, totalRows, Math.max(lastCol, 1)).createFilter();
}

function removeOverlappingBandingsTHX_(sheet, targetRange) {
  try {
    const bandings = typeof sheet.getBandings === 'function' ? (sheet.getBandings() || []) : [];
    const tRow1 = targetRange.getRow();
    const tCol1 = targetRange.getColumn();
    const tRow2 = tRow1 + targetRange.getNumRows() - 1;
    const tCol2 = tCol1 + targetRange.getNumColumns() - 1;
    bandings.forEach(function (banding) {
      try {
        const r = banding.getRange && banding.getRange();
        if (!r) return;
        const rRow1 = r.getRow();
        const rCol1 = r.getColumn();
        const rRow2 = rRow1 + r.getNumRows() - 1;
        const rCol2 = rCol1 + r.getNumColumns() - 1;
        const overlaps = !(rRow2 < tRow1 || rRow1 > tRow2 || rCol2 < tCol1 || rCol1 > tCol2);
        if (overlaps && banding.remove) banding.remove();
      } catch (e) {}
    });
  } catch (e) {}
}

function setProgramacaoWidthsTHX_(sheet, map) {
  if (map[normalizeHeader_('PLANOS')]) sheet.setColumnWidth(map[normalizeHeader_('PLANOS')], 120);
  if (map[normalizeHeader_('COMPLEMENTO')]) sheet.setColumnWidth(map[normalizeHeader_('COMPLEMENTO')], 140);
  if (map[normalizeHeader_('PERFIL')]) sheet.setColumnWidth(map[normalizeHeader_('PERFIL')], 120);
  if (map[normalizeHeader_('DATA DE SAIDA')] || map[normalizeHeader_('DATA DE SAÍDA')]) {
    sheet.setColumnWidth(map[normalizeHeader_('DATA DE SAIDA')] || map[normalizeHeader_('DATA DE SAÍDA')], 115);
  }
  if (map[normalizeHeader_('DATA DE CARREGAMENTO')]) sheet.setColumnWidth(map[normalizeHeader_('DATA DE CARREGAMENTO')], 140);
  if (map[normalizeHeader_('FAIXA DE AGENDA')]) sheet.setColumnWidth(map[normalizeHeader_('FAIXA DE AGENDA')], 145);
  if (map[normalizeHeader_('ZONA')]) sheet.setColumnWidth(map[normalizeHeader_('ZONA')], 280);
  if (map[normalizeHeader_('PLACA')]) sheet.setColumnWidth(map[normalizeHeader_('PLACA')], 95);
  if (map[normalizeHeader_('MOTORISTA')]) sheet.setColumnWidth(map[normalizeHeader_('MOTORISTA')], 260);
  if (map[normalizeHeader_('NOTA FISCAL')]) sheet.setColumnWidth(map[normalizeHeader_('NOTA FISCAL')], 420);
}

function applyProgramacaoFormatsTHX_(sheet, map, lastRow, headerRow) {
  const hdrRow = Math.max(1, Number(headerRow) || 1);
  if (lastRow <= hdrRow) return;
  const dataStartRow = hdrRow + 1;
  const dataRows = lastRow - hdrRow;

  const cDataSaida = map[normalizeHeader_('DATA DE SAIDA')] || map[normalizeHeader_('DATA DE SAÍDA')];
  const cDataCarr = map[normalizeHeader_('DATA DE CARREGAMENTO')];
  const cFaixa = map[normalizeHeader_('FAIXA DE AGENDA')];
  const cPlaca = map[normalizeHeader_('PLACA')];
  const cMotorista = map[normalizeHeader_('MOTORISTA')];
  const cNota = map[normalizeHeader_('NOTA FISCAL')];

  if (cDataSaida) sheet.getRange(dataStartRow, cDataSaida, dataRows, 1).setNumberFormat('dd/MM/yyyy');
  if (cDataCarr) sheet.getRange(dataStartRow, cDataCarr, dataRows, 1).setNumberFormat('dd/MM/yyyy');
  if (cFaixa) applyAgendaFaixaDropdown_(sheet, dataStartRow, cFaixa, dataRows);
  if (cPlaca) sheet.getRange(dataStartRow, cPlaca, dataRows, 1).setHorizontalAlignment('center').setFontWeight('bold');
  if (cMotorista) sheet.getRange(dataStartRow, cMotorista, dataRows, 1).setWrap(true);
  if (cNota) sheet.getRange(dataStartRow, cNota, dataRows, 1).setWrap(true);
}

function applyProgramacaoConditionalRulesTHX_(sheet, map, lastRow, headerRow) {
  const hdrRow = Math.max(1, Number(headerRow) || 1);
  if (lastRow <= hdrRow) return;
  const dataStartRow = hdrRow + 1;
  const dataRows = lastRow - hdrRow;
  const cFaixa = map[normalizeHeader_('FAIXA DE AGENDA')];
  const cPlaca = map[normalizeHeader_('PLACA')];
  if (!cFaixa && !cPlaca) return;

  const existing = sheet.getConditionalFormatRules() || [];
  const keep = existing.filter(function (rule) {
    const ranges = rule.getRanges() || [];
    return !ranges.some(function (r) {
      const col = r.getColumn();
      const numCols = r.getNumColumns();
      const hitsFaixa = cFaixa && col <= cFaixa && (col + numCols - 1) >= cFaixa;
      const hitsPlaca = cPlaca && col <= cPlaca && (col + numCols - 1) >= cPlaca;
      return hitsFaixa || hitsPlaca;
    });
  });

  if (cFaixa) {
    keep.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied('=AND(ROW()>' + hdrRow + ',$' + columnToLetter_(cFaixa) + dataStartRow + '=\"\")')
        .setBackground('#fff7ed')
        .setRanges([sheet.getRange(dataStartRow, cFaixa, dataRows, 1)])
        .build()
    );
  }
  if (cPlaca) {
    keep.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied('=AND(ROW()>' + hdrRow + ',$' + columnToLetter_(cPlaca) + dataStartRow + '=\"\")')
        .setBackground('#eff6ff')
        .setRanges([sheet.getRange(dataStartRow, cPlaca, dataRows, 1)])
        .build()
    );
  }

  sheet.setConditionalFormatRules(keep);
}

function findProgramacaoHeaderRow_(sheet, maxScanRows) {
  const lastCol = Math.max(sheet.getLastColumn(), CONFIG.MAIN_HEADERS.length, 1);
  const scanRows = Math.max(1, Math.min(Number(maxScanRows) || 5, Math.max(sheet.getLastRow(), 1)));
  const required = [
    normalizeHeader_('PLANOS'),
    normalizeHeader_('PERFIL'),
    normalizeHeader_('PLACA'),
    normalizeHeader_('MOTORISTA'),
    normalizeHeader_('NOTA FISCAL'),
  ];
  for (let row = 1; row <= scanRows; row++) {
    const values = sheet.getRange(row, 1, 1, lastCol).getDisplayValues()[0] || [];
    const present = {};
    for (let i = 0; i < values.length; i++) {
      const key = normalizeHeader_(values[i]);
      if (key) present[key] = true;
    }
    if (required.every(function (k) { return !!present[k]; })) return row;
  }
  return 0;
}

function ensureProgramacaoVisualHeaderRowsTHX_(sheet) {
  const targetHeaderRow = getProgramacaoHeaderRow_();
  const foundRow = findProgramacaoHeaderRow_(sheet, 5);
  if (foundRow === targetHeaderRow) return true;
  if (foundRow === 1) {
    sheet.insertRowsBefore(1, targetHeaderRow - 1);
    return true;
  }
  appDebugPrint_('[WARN] Cabecalho Programacao em linha inesperada; topo visual nao aplicado', {
    sheetName: sheet && sheet.getName ? sheet.getName() : '',
    foundHeaderRow: foundRow,
    expectedHeaderRow: targetHeaderRow,
  });
  return false;
}

function applyProgramacaoExecutiveHeaderTHX_(sheet, options) {
  const opts = options || {};
  const theme = getTHXTheme_();
  const headerRow = Math.max(1, Number(opts.headerRow) || getProgramacaoHeaderRow_());
  const lastCol = Math.max(Number(opts.lastCol) || 1, sheet.getLastColumn(), CONFIG.MAIN_HEADERS.length);
  const lastRow = Math.max(Number(opts.lastRow) || 1, sheet.getLastRow());
  const dataCount = Math.max(lastRow - headerRow, 0);
  const now = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm');
  const titleEndCol = lastCol >= 3 ? lastCol - 2 : lastCol;

  sheet.getRange(1, 1, 1, lastCol).breakApart();
  sheet.getRange(2, 1, 1, lastCol).breakApart();
  if (titleEndCol >= 1) {
    sheet.getRange(1, 1, 1, titleEndCol).mergeAcross();
    sheet.getRange(2, 1, 1, titleEndCol).mergeAcross();
  }
  if (titleEndCol < lastCol) {
    sheet.getRange(1, titleEndCol + 1, 2, lastCol - titleEndCol)
      .setBackground(theme.header)
      .setBorder(true, true, true, true, false, false, theme.headerBorder, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  }

  sheet.getRange(1, 1)
    .setValue('PROGRAMAÇÃO')
    .setBackground(theme.header)
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontFamily('Montserrat')
    .setFontSize(14)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  sheet.getRange(2, 1)
    .setValue('Atualizado em ' + now + '  |  Total de linhas: ' + dataCount)
    .setBackground(theme.header2)
    .setFontColor('#dbeafe')
    .setFontWeight('normal')
    .setFontFamily('Arial')
    .setFontSize(10)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  sheet.getRange(1, 1, 2, lastCol)
    .setBorder(true, true, true, true, false, false, theme.headerBorder, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
}

function applyProgramacaoLogoTHX_(sheet, options) {
  try {
    const opts = options || {};
    const logoUrl = 'https://drive.google.com/file/d/1Ft7TTx-y4bLisPyCnBeXZmh9gPgLFZ1T/view?usp=drive_link';
    const defaultAnchorCol = Math.max(1, (sheet.getLastColumn() || 1) - 1);
    const anchorCol = Math.max(1, Number(opts.anchorCol) || defaultAnchorCol);
    const anchorRow = Math.max(1, Number(opts.anchorRow) || 1);
    const images = typeof sheet.getImages === 'function' ? sheet.getImages() : [];
    images.forEach(function (img) {
      try {
        const anchor = img.getAnchorCell && img.getAnchorCell();
        if (!anchor) return;
        const isTargetAnchor = anchor.getRow() === anchorRow && anchor.getColumn() === anchorCol;
        const isTopRightLegacy = anchor.getRow() === 1 && anchor.getColumn() >= Math.max(1, (sheet.getLastColumn() || 1) - 2);
        if (isTargetAnchor || isTopRightLegacy) {
          img.remove();
        }
      } catch (e) {}
    });

    const blob = fetchProgramacaoLogoBlobTHX_(logoUrl);
    const image = sheet.insertImage(blob, anchorCol, anchorRow);
    if (image && image.setWidth) image.setWidth(135);
    if (image && image.setHeight) image.setHeight(36);
  } catch (e) {
    appDebugPrint_('[WARN] Falha ao inserir logo THX', {
      message: e && e.message ? e.message : String(e),
    });
  }
}

function extractDriveFileIdFromUrl_(url) {
  const text = String(url || '');
  let m = text.match(/\/d\/([A-Za-z0-9_-]+)/);
  if (m && m[1]) return m[1];
  m = text.match(/[?&]id=([A-Za-z0-9_-]+)/);
  if (m && m[1]) return m[1];
  return '';
}

function fetchProgramacaoLogoBlobTHX_(logoUrl) {
  const fileId = extractDriveFileIdFromUrl_(logoUrl) || '1Ft7TTx-y4bLisPyCnBeXZmh9gPgLFZ1T';

  try {
    const file = DriveApp.getFileById(fileId);
    const blobByDrive = file && file.getBlob ? file.getBlob() : null;
    if (blobByDrive) return blobByDrive.setName('thx-logo.png');
  } catch (e) {}

  const directUrl = 'https://drive.google.com/uc?export=download&id=' + fileId;
  const response = UrlFetchApp.fetch(directUrl, { muteHttpExceptions: true, followRedirects: true });
  const code = response && response.getResponseCode ? response.getResponseCode() : 0;
  const blob = response && response.getBlob ? response.getBlob() : null;
  const mime = blob && blob.getContentType ? String(blob.getContentType() || '') : '';
  if (code >= 200 && code < 300 && /^image\\//i.test(mime)) {
    return blob.setName('thx-logo.png');
  }
  throw new Error('Logo THX indispon\u00edvel (HTTP ' + code + ', mime=' + mime + ')');
}

function columnToLetter_(column) {
  let n = Number(column) || 1;
  let s = '';
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s || 'A';
}

function fetchClickUpTasksByList_(listId, options) {
  const opts = options || {};
  const debug = !!opts.debug;
  const statuses = Array.isArray(opts.statuses) ? opts.statuses : [];
  const tags = Array.isArray(opts.tags) ? opts.tags : [];
  
  const allTasks = [];
  let page = 0;

  let queryBase = 'archived=false&subtasks=false&include_closed=true';
  statuses.forEach(function (s) { queryBase += '&statuses[]=' + encodeURIComponent(s); });
  tags.forEach(function (t) { queryBase += '&tags[]=' + encodeURIComponent(t); });

  while (true) {
    const url =
      CONFIG.CLICKUP.BASE_URL +
      '/list/' +
      encodeURIComponent(String(listId)) +
      '/task?' + queryBase +
      '&page=' +
      page +
      '&page_size=' +
      CONFIG.CLICKUP.PAGE_SIZE;

    const response = UrlFetchApp.fetch(url, {
      method: 'get',
      muteHttpExceptions: true,
      headers: {
        Authorization: getClickUpApiKey_(),
        'Content-Type': 'application/json',
      },
    });

    const code = response.getResponseCode();
    const text = response.getContentText();
    if (code !== 200) {
      throw new Error('ClickUp HTTP ' + code + ': ' + text.slice(0, 300));
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      throw new Error('ClickUp JSON invalido: ' + text.slice(0, 300));
    }

    const tasks = Array.isArray(parsed && parsed.tasks) ? parsed.tasks : [];
    allTasks.push.apply(allTasks, tasks);

    if (debug) {
      appDebugPrint_('[DEBUG] ClickUp pagina carregada', {
        page: page,
        tasks: tasks.length,
        requestedPageSize: CONFIG.CLICKUP.PAGE_SIZE,
        totalAcumulado: allTasks.length,
      });
      if (tasks.length) {
        appDebugPrint_('[DEBUG] ClickUp pagina amostra bruta', {
          page: page,
          sample: tasks.slice(0, 3).map(function (t) {
            return {
              id: t.id,
              name: t.name,
              status: t.status && t.status.status,
              tags: Array.isArray(t.tags) ? t.tags.map(function(tag){ return tag.name || tag; }) : [],
              cf_count: Array.isArray(t.custom_fields) ? t.custom_fields.length : 0,
            };
          }),
        });
      }
    }

    // Parada segura: se a API ignorar page_size=500 e usar 100 por pagina, nao pode parar cedo.
    const effectiveStopThreshold = Math.min(CONFIG.CLICKUP.PAGE_SIZE, 100);
    if (!tasks.length || tasks.length < effectiveStopThreshold) break;
    page++;
  }

  return allTasks;
}

function fetchClickUpTaskById_(taskId) {
  const url =
    CONFIG.CLICKUP.BASE_URL +
    '/task/' +
    encodeURIComponent(String(taskId));

  const response = UrlFetchApp.fetch(url, {
    method: 'get',
    muteHttpExceptions: true,
    headers: {
      Authorization: getClickUpApiKey_(),
      'Content-Type': 'application/json',
    },
  });

  const code = response.getResponseCode();
  const text = response.getContentText();
  if (code !== 200) {
    throw new Error('ClickUp task HTTP ' + code + ': ' + text.slice(0, 300));
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error('ClickUp task JSON invalido: ' + text.slice(0, 300));
  }
}

function clonarCardClickUp86aenj71rMesmoLugar(novoNome) {
  return clonarCardClickUpBasicoNaMesmaLista_('86aenj71r', novoNome);
}

function clonarCardClickUpBasicoNaMesmaLista_(taskIdOrigem, novoNome) {
  const sourceTaskId = extractClickUpTaskIdFromInput_(taskIdOrigem);
  if (!sourceTaskId) throw new Error('Task de origem invalida para clone.');

  const cloneName = String(novoNome || '').trim();
  if (!cloneName) throw new Error('Informe o novo nome do card.');

  const source = fetchClickUpTaskById_(sourceTaskId);
  const listId = String(source && source.list && source.list.id ? source.list.id : '').trim();
  const created = duplicateClickUpTaskById_(sourceTaskId, cloneName);
  return {
    ok: true,
    sourceTaskId: sourceTaskId,
    listId: listId,
    clonedTaskId: String((created && created.id) || ''),
    clonedTaskUrl: String((created && created.url) || ''),
    name: cloneName,
  };
}

function duplicateClickUpTaskById_(sourceTaskId, newName) {
  const sourceId = String(sourceTaskId || '').trim();
  const cloneName = String(newName || '').trim();
  if (!sourceId) throw new Error('Task de origem invalida para clonagem.');
  if (!cloneName) throw new Error('Nome da task de clone vazio.');

  const url = CONFIG.CLICKUP.BASE_URL + '/task/' + encodeURIComponent(sourceId) + '/duplicate';
  const headers = {
    Authorization: getClickUpApiKey_(),
    'Content-Type': 'application/json',
  };

  // Alguns workspaces aceitam nome no duplicate; se ignorar, renomeamos no passo seguinte.
  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    muteHttpExceptions: true,
    contentType: 'application/json',
    headers: headers,
    payload: JSON.stringify({ name: cloneName }),
  });

  const code = response.getResponseCode();
  const text = response.getContentText() || '';
  appCodeLog_('[DEBUG] ClickUp duplicate response', {
    sourceTaskId: sourceId,
    requestedName: cloneName,
    httpCode: code,
    responsePreview: String(text || '').slice(0, 300),
  });
  if (code === 404) {
    appCodeLog_('[WARN] ClickUp duplicate endpoint indisponivel; usando fallback create', {
      sourceTaskId: sourceId,
      httpCode: code,
    });
    return duplicateClickUpTaskFallbackByCreate_(sourceId, cloneName);
  }
  if (code < 200 || code >= 300) {
    throw new Error('ClickUp duplicate HTTP ' + code + ': ' + text.slice(0, 300));
  }

  let created = {};
  try {
    created = text ? JSON.parse(text) : {};
  } catch (e) {
    created = {};
  }

  const clonedTaskId = String((created && created.id) || '').trim();
  if (!clonedTaskId) {
    throw new Error('ClickUp duplicate sem id da task clonada.');
  }

  const clonedName = String((created && created.name) || '').trim();
  if (clonedName !== cloneName) {
    renameClickUpTask_(clonedTaskId, cloneName);
    try {
      created = fetchClickUpTaskById_(clonedTaskId);
    } catch (e) {}
  }

  return created;
}

function duplicateClickUpTaskFallbackByCreate_(sourceTaskId, cloneName) {
  const source = fetchClickUpTaskById_(sourceTaskId);
  const listId = String(source && source.list && source.list.id ? source.list.id : '').trim();
  if (!listId) throw new Error('Fallback clone: lista da task origem nao encontrada.');

  const url =
    CONFIG.CLICKUP.BASE_URL +
    '/list/' +
    encodeURIComponent(listId) +
    '/task';

  const payload = {
    name: cloneName,
    description: String((source && source.description) || ''),
  };

  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    muteHttpExceptions: true,
    contentType: 'application/json',
    headers: {
      Authorization: getClickUpApiKey_(),
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify(payload),
  });
  const code = response.getResponseCode();
  const text = response.getContentText() || '';
  appCodeLog_('[DEBUG] ClickUp fallback create response', {
    sourceTaskId: sourceTaskId,
    listId: listId,
    requestedName: cloneName,
    httpCode: code,
    responsePreview: String(text || '').slice(0, 300),
  });
  if (code < 200 || code >= 300) {
    throw new Error('ClickUp fallback create HTTP ' + code + ': ' + text.slice(0, 300));
  }

  try {
    return text ? JSON.parse(text) : {};
  } catch (e) {
    return {};
  }
}

function renameClickUpTask_(taskId, newName) {
  const id = String(taskId || '').trim();
  const name = String(newName || '').trim();
  if (!id || !name) return;

  const url = CONFIG.CLICKUP.BASE_URL + '/task/' + encodeURIComponent(id);
  const response = UrlFetchApp.fetch(url, {
    method: 'put',
    muteHttpExceptions: true,
    contentType: 'application/json',
    headers: {
      Authorization: getClickUpApiKey_(),
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify({ name: name }),
  });
  const code = response.getResponseCode();
  const text = response.getContentText() || '';
  appCodeLog_('[DEBUG] ClickUp rename response', {
    taskId: id,
    requestedName: name,
    httpCode: code,
    responsePreview: String(text || '').slice(0, 300),
  });
  if (code < 200 || code >= 300) {
    throw new Error('ClickUp rename HTTP ' + code + ': ' + text.slice(0, 300));
  }
}

function updateClickUpTaskStatus_(taskId, statusName) {
  const url =
    CONFIG.CLICKUP.BASE_URL +
    '/task/' +
    encodeURIComponent(String(taskId));

  const response = UrlFetchApp.fetch(url, {
    method: 'put',
    muteHttpExceptions: true,
    contentType: 'application/json',
    headers: {
      Authorization: getClickUpApiKey_(),
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify({ status: String(statusName || '').trim() }),
  });

  const code = response.getResponseCode();
  const text = response.getContentText() || '';
  if (code < 200 || code >= 300) {
    throw new Error('ClickUp status HTTP ' + code + ': ' + text.slice(0, 300));
  }
  try { return JSON.parse(text); } catch (e) { return { ok: true, raw: text }; }
}

function deletarCardsClickUpProgramacaoFixos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const taskIds = ['86aftz90v'];
  const stats = { total: taskIds.length, deleted: 0, errors: [] };

  for (let i = 0; i < taskIds.length; i++) {
    const rawId = String(taskIds[i] || '').trim();
    if (!rawId) continue;
    try {
      deleteClickUpTaskById_(rawId);
      stats.deleted++;
    } catch (e) {
      stats.errors.push({
        taskId: rawId,
        error: String(e && e.message ? e.message : e),
      });
    }
  }

  const msg = 'ClickUp delete: excluidos=' + stats.deleted + ' | erros=' + stats.errors.length;
  toast_(ss, msg);
  return { ok: stats.errors.length === 0, data: stats };
}

function deleteClickUpTaskById_(taskIdOrUrl) {
  const taskId = extractClickUpTaskIdFromInput_(taskIdOrUrl);
  if (!taskId) throw new Error('Task ID invalido para delete.');

  const url =
    CONFIG.CLICKUP.BASE_URL +
    '/task/' +
    encodeURIComponent(String(taskId));

  const response = UrlFetchApp.fetch(url, {
    method: 'delete',
    muteHttpExceptions: true,
    headers: {
      Authorization: getClickUpApiKey_(),
      'Content-Type': 'application/json',
    },
  });

  const code = response.getResponseCode();
  const text = response.getContentText() || '';
  if (code < 200 || code >= 300) {
    throw new Error('ClickUp delete HTTP ' + code + ': ' + text.slice(0, 300));
  }

  if (!text) return { ok: true };
  try { return JSON.parse(text); } catch (e) { return { ok: true, raw: text }; }
}

function extractClickUpTaskIdFromInput_(input) {
  const text = String(input == null ? '' : input).trim();
  if (!text) return '';
  if (/^\s*\[ERROR\]/i.test(text)) return '';
  if (/^\s*\[BUSCANDO DADOS\]/i.test(text)) return '';

  function validTaskId_(value) {
    const id = String(value || '').trim();
    return /^86[a-z0-9]+$/i.test(id);
  }

  let match = text.match(/\/t\/([a-zA-Z0-9]+)/i);
  if (match && match[1] && validTaskId_(match[1])) return match[1];

  match = text.match(/\/task\/([a-zA-Z0-9]+)/i);
  if (match && match[1] && validTaskId_(match[1])) return match[1];

  if (validTaskId_(text)) return text;

  return '';
}

/**
 * Formata um número de telefone para o padrão brasileiro (XX XXXXXXXXX).
 * Remove +55, hífens, parênteses e espaços extras.
 * 
 * @param {string|number} raw O valor bruto do telefone.
 * @return {string} O telefone formatado ou o valor original se não for processável.
 */
function formatPhoneNumberBR_(raw) {
  if (raw == null) return '';
  let cleaned = String(raw).replace(/\D/g, '');
  if (!cleaned) return '';

  // Se começar com 55 e tiver 12 ou 13 dígitos, remove o 55 (DDI)
  if (cleaned.startsWith('55') && (cleaned.length === 12 || cleaned.length === 13)) {
    cleaned = cleaned.substring(2);
  }

  // Formata: XX XXXXXXXXX (DDD espaço Número)
  if (cleaned.length >= 2) {
    const ddd = cleaned.substring(0, 2);
    const num = cleaned.substring(2);
    return ddd + ' ' + num;
  }

  return cleaned;
}

function parseClickUpTaskDisponibilidade_(task) {
  if (!task) return null;
  const cf = resolverCustomFieldsClickUp_(task);
  const placa = pickClickUpFieldValue_(cf, [
    CONFIG.CLICKUP.PLACA_FIELD,
    'PLACA',
  ]);
  const motorista = pickClickUpFieldValue_(cf, [
    CONFIG.CLICKUP.MOTORISTA_FIELD,
    'MOTORISTA',
  ]);
  const perfil = pickClickUpFieldValue_(cf, [
    CONFIG.CLICKUP.PERFIL_FIELD,
    'MODELO',
    'PERFIL',
  ]);
  const contato = pickClickUpFieldValue_(cf, [
    CONFIG.CLICKUP.CONTATO_FIELD,
    'CONTATO MOTORISTA',
    'CONTATO',
    'TELEFONE',
  ]);
  const unidade = pickClickUpFieldValue_(cf, [
    CONFIG.CLICKUP.UNIDADE_FIELD,
    'UNIDADE',
  ]);
  const status = (task.status && (task.status.status || task.status)) || pickClickUpFieldValue_(cf, [
    CONFIG.CLICKUP.STATUS_FIELD,
    'STATUS',
  ]);

  const parsed = {
    taskId: String(task.id || '').trim(),
    taskName: String(task.name || '').trim(),
    placa: String(placa || '').trim(),
    motorista: String(motorista || task.name || '').trim().toUpperCase(),
    perfil: String(perfil || '').trim(),
    contato: formatPhoneNumberBR_(contato),
    unidade: String(unidade || '').trim(),
    status: String(status || '').trim(),
    tags: Array.isArray(task.tags) ? task.tags.map(function (t) { 
      return (typeof t === 'object' ? (t.name || '') : String(t)).trim(); 
    }).filter(Boolean) : [],
  };

  return parsed;
}

function resolverCustomFieldsClickUp_(task) {
  const out = {};
  const customFields = Array.isArray(task && task.custom_fields) ? task.custom_fields : [];
  customFields.forEach(function (cf) {
    const name = String(cf && cf.name || '').trim();
    if (!name) return;
    const value = resolveClickUpCustomFieldValue_(cf);
    out[name] = value;
    out[normalizeHeader_(name)] = value;
  });
  return out;
}

function resolveClickUpCustomFieldValue_(cf) {
  if (!cf || !Object.prototype.hasOwnProperty.call(cf, 'value') || cf.value == null) return '';

  const type = cf.type;
  if (type === 'drop_down' || type === 3) {
    const rawVal = String(cf.value);
    const opts = cf.type_config && Array.isArray(cf.type_config.options) ? cf.type_config.options : [];
    for (let i = 0; i < opts.length; i++) {
      const opt = opts[i] || {};
      const optId = Object.prototype.hasOwnProperty.call(opt, 'id') ? String(opt.id) : '';
      const optOrderIndex = Object.prototype.hasOwnProperty.call(opt, 'orderindex')
        ? String(opt.orderindex)
        : '';
      if (optId === rawVal) return String(opt.name || rawVal);
      if (optOrderIndex === rawVal) return String(opt.name || rawVal);
    }
    return rawVal;
  }

  if (Array.isArray(cf.value)) {
    return cf.value.join(', ');
  }

  return String(cf.value);
}

function filtrarMotoristasDisponibilidade_(items, debug) {
  return (items || []).filter(function (item) {
    const unitTarget = normalizeTextLoose_(CONFIG.CLICKUP.UNIDADE_ALVO);
    const unidade = normalizeTextLoose_(item.unidade);
    const tags = (item.tags || []).map(normalizeTextLoose_);
    const status = normalizeTextLoose_(item.status);
    const s1 = normalizeTextLoose_(CONFIG.CLICKUP.STATUS_ALVO);
    const s2 = normalizeTextLoose_(CONFIG.CLICKUP.STATUS_ALVO_SECUNDARIO || '');

    const unitMatch = (unidade && unitTarget && (unidade === unitTarget || unidade.indexOf(unitTarget) !== -1 || unitTarget.indexOf(unidade) !== -1)) || tags.indexOf(unitTarget) !== -1;
    const statusMatch = status === s1 || (s2 && status === s2);

    // LOG BRUTAL DE DIAGNÓSTICO (FORÇADO NO CONSOLE)
    if (items.indexOf(item) < 5) {
      const traceMsg = '[TRACE] ' + item.motorista + 
        ' | Unidade: ' + item.unidade + ' (Norm: ' + unidade + ') Alvo: ' + unitTarget +
        ' | Status: ' + item.status + ' (Norm: ' + status + ') Alvo: ' + s1 + ' / ' + s2 +
        ' | Match: ' + (unitMatch && statusMatch);
      console.log(traceMsg);
      appDebugPrint_(traceMsg);
    }

    if (debug) {
      if (unitMatch && statusMatch) {
        appDebugPrint_('[MATCH] Motorista alvo encontrado', {
          nome: item.motorista,
          placa: item.placa,
          unidade: item.unidade,
          status: item.status
        });
      } else {
        // Log de rejeição para depuração fina
        appDebugPrint_('[REJECT] Motorista descartado pelo filtro', {
          nome: item.name || item.motorista,
          unitMatch: unitMatch,
          statusMatch: statusMatch,
          detalhes: {
            unidade: item.unidade,
            unidadeTarget: CONFIG.CLICKUP.UNIDADE_ALVO,
            tags: item.tags,
            status: item.status,
            statusAlvo: [CONFIG.CLICKUP.STATUS_ALVO, CONFIG.CLICKUP.STATUS_ALVO_SECUNDARIO].filter(Boolean)
          }
        });
      }
    }

    return unitMatch && statusMatch;
  });
}

function appendOuAtualizarContatoDisponibilidade_(sheet, items, debug) {
  const lastRow = Math.max(sheet.getLastRow(), 1);
  const lastCol = Math.max(sheet.getLastColumn(), 7);
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const idx = mapDisponibilidadeHeaders_(headers);
  validateDisponibilidadeHeadersForSync_(idx);

  const dataRows = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, lastCol).getValues() : [];
  const today = toDateOnly_(new Date());
  const todayKeyPrefix = formatDateKey_(today) + '|';
  const mapHojePorPlaca = {};

  if (debug) {
    appDebugPrint_('[DEBUG] Disponibilidade: contexto da aba', {
      sheetName: sheet.getName(),
      lastRow: lastRow,
      lastCol: lastCol,
      headers: headers,
      headerIndex: idx,
      todayKeyPrefix: todayKeyPrefix,
      existingDataRows: dataRows.length,
    });
  }

  dataRows.forEach(function (row, i) {
    const dataVal = row[idx.data];
    const placaVal = normalizePlate_(row[idx.placa]);
    if (!placaVal) return;
    const dataNorm = toDateOnly_(dataVal);
    if (!dataNorm) return;
    if (!isSameDay_(dataNorm, today)) return;
    const key = todayKeyPrefix + placaVal;
    if (!mapHojePorPlaca[key]) {
      mapHojePorPlaca[key] = {
        rowNumber: i + 2,
        row: row,
      };
    }
  });

  if (debug) {
    appDebugPrint_('[DEBUG] Disponibilidade: indice de hoje montado', {
      totalPlacasHoje: Object.keys(mapHojePorPlaca).length,
      amostraChaves: Object.keys(mapHojePorPlaca).slice(0, 10),
    });
  }

  const stats = {
    inseridas: 0,
    contatosPreenchidos: 0,
    duplicadasIgnoradas: 0,
    semPlaca: 0,
  };

  const rowsToAppend = [];
  const contactUpdates = [];
  let perItemLogCount = 0;

  (items || []).forEach(function (item) {
    const placaNorm = normalizePlate_(item.placa);
    if (!placaNorm) {
      stats.semPlaca++;
      if (debug) {
        appDebugPrint_('[WARN] Disponibilidade: item ignorado sem placa', {
          taskId: item.taskId,
          taskName: item.taskName,
          item: item,
        });
      }
      return;
    }

    if (debug && perItemLogCount < (CONFIG.DEBUG.MAX_ITEM_LOGS || 25)) {
      appDebugPrint_('[DEBUG] Disponibilidade: avaliando item filtrado', {
        taskId: item.taskId,
        placa: item.placa,
        placaNorm: placaNorm,
        motorista: item.motorista,
        perfil: item.perfil,
        contato: item.contato,
        unidade: item.unidade,
        status: item.status,
      });
      perItemLogCount++;
    }

    const key = todayKeyPrefix + placaNorm;
    const existente = mapHojePorPlaca[key];
    if (existente) {
      const contatoAtual = String(existente.row[idx.contato] == null ? '' : existente.row[idx.contato]).trim();
      const contatoNovo = String(item.contato == null ? '' : item.contato).trim();
      if (!contatoAtual && contatoNovo) {
        contactUpdates.push({ rowNumber: existente.rowNumber, value: contatoNovo });
        existente.row[idx.contato] = contatoNovo;
        stats.contatosPreenchidos++;
        if (debug) {
          appDebugPrint_('[INFO] Disponibilidade: contato preenchido em linha existente', {
            rowNumber: existente.rowNumber,
            placa: item.placa,
            contato: contatoNovo,
          });
        }
      } else {
        stats.duplicadasIgnoradas++;
        if (debug) {
          appDebugPrint_('[INFO] Disponibilidade: duplicada ignorada (placa ja lancada hoje)', {
            placa: item.placa,
            taskId: item.taskId,
          });
        }
      }
      return;
    }

    const newRow = new Array(lastCol).fill('');
    newRow[idx.data] = today;
    newRow[idx.placa] = String(item.placa || '').trim();
    newRow[idx.motorista] = String(item.motorista || '').trim();
    newRow[idx.perfil] = String(item.perfil || '').trim();
    newRow[idx.contato] = String(item.contato || '').trim();
    rowsToAppend.push(newRow);

    // reserva no mapa para evitar duplicar no mesmo lote
    mapHojePorPlaca[key] = { rowNumber: -1, row: newRow };
    stats.inseridas++;
    if (debug) {
      appDebugPrint_('[DEBUG] Disponibilidade: linha preparada para append', {
        placa: item.placa,
        motorista: item.motorista,
        perfil: item.perfil,
        contato: item.contato,
      });
    }
  });

  if (rowsToAppend.length) {
    const startRow = sheet.getLastRow() + 1;
    sheet.getRange(startRow, 1, rowsToAppend.length, lastCol).setValues(rowsToAppend);
    if (debug) {
      appDebugPrint_('[INFO] Disponibilidade: append em lote executado', {
        startRow: startRow,
        totalLinhas: rowsToAppend.length,
      });
    }
  }

  contactUpdates.forEach(function (u) {
    sheet.getRange(u.rowNumber, idx.contato + 1).setValue(u.value);
  });

  if (debug && contactUpdates.length) {
    appDebugPrint_('[INFO] Disponibilidade: updates de contato aplicados', {
      total: contactUpdates.length,
      updates: contactUpdates.slice(0, 20),
    });
  }

  if (debug) {
    appDebugPrint_('[DEBUG] Disponibilidade sync stats', stats);
  }

  return stats;
}

function pickClickUpFieldValue_(cfMap, aliases) {
  const map = cfMap || {};
  const list = aliases || [];

  for (let i = 0; i < list.length; i++) {
    const alias = String(list[i] || '').trim();
    if (!alias) continue;
    if (!isBlank_(map[alias])) return map[alias];
    const normalized = normalizeHeader_(alias);
    if (!isBlank_(map[normalized])) return map[normalized];
  }

  // Fallback por "contém" no nome do campo (robusto contra emoji/prefixos)
  const normalizedKeys = Object.keys(map).filter(function (k) {
    return k === normalizeHeader_(k); // somente chaves normalizadas
  });
  for (let j = 0; j < list.length; j++) {
    const needle = normalizeHeader_(list[j]);
    if (!needle) continue;
    for (let k = 0; k < normalizedKeys.length; k++) {
      const key = normalizedKeys[k];
      if (key.indexOf(needle) !== -1 && !isBlank_(map[key])) {
        return map[key];
      }
    }
  }

  return '';
}

function validateDisponibilidadeHeadersForSync_(idx) {
  const missing = [];
  if (idx.data == null) missing.push('DATA');
  if (idx.placa == null) missing.push('PLACA');
  if (idx.motorista == null) missing.push('MOTORISTA');
  if (idx.perfil == null) missing.push('PERFIL');
  if (idx.disponibilidade == null) missing.push('DISPONIBILIDADE');
  if (idx.observacao == null) missing.push('OBSERVA??O/OBSERVACAO');
  if (idx.contato == null) missing.push('Contato');
  if (missing.length) {
    throw new Error('Colunas obrigatorias da disponibilidade nao encontradas: ' + missing.join(', '));
  }
}

function findSheetCaseInsensitive_(ss, targetName) {
  const wanted = normalizeHeader_(targetName);
  const sheets = ss.getSheets();
  for (let i = 0; i < sheets.length; i++) {
    if (normalizeHeader_(sheets[i].getName()) === wanted) return sheets[i];
  }
  return null;
}

function normalizePlate_(value) {
  return String(value == null ? '' : value)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .trim();
}

function normalizeTextLoose_(value) {
  return normalizeHeader_(value || '');
}

function toDateOnly_(value) {
  if (!value) return null;
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value)) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  if (typeof value === 'string') {
    const text = value.trim();
    if (!text) return null;
    const m = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})(?:\s+\d{1,2}:\d{2}(?::\d{2})?)?$/);
    if (m) {
      const d = Number(m[1]);
      const mo = Number(m[2]);
      let y = Number(m[3]);
      if (y < 100) y += 2000;
      return new Date(y, mo - 1, d);
    }
    const parsed = new Date(text);
    if (!isNaN(parsed)) return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  }
  return null;
}

function isSameDay_(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDateKey_(d) {
  return d.getFullYear() + '-' + pad2_(d.getMonth() + 1) + '-' + pad2_(d.getDate());
}

function computeSourceProgramacaoFingerprint_() {
  const sourceSpreadsheet = SpreadsheetApp.openById(CONFIG.SOURCE_SPREADSHEET_ID);
  const sourceSheet = sourceSpreadsheet.getSheetByName(CONFIG.SOURCE_SHEET_NAME);
  if (!sourceSheet) throw new Error('Aba de origem nao encontrada: ' + CONFIG.SOURCE_SHEET_NAME);
  const values = sourceSheet.getDataRange().getValues();
  if (!values || !values.length) return { hash: 'empty', rows: 0, cols: 0 };
  const headerInfo = findHeaderInfo_(values);
  const start = headerInfo.headerRow + 1;
  const chunks = [];
  for (let i = start; i < values.length; i++) {
    const r = values[i] || [];
    const rowSerialized = [];
    let hasAnyValue = false;
    for (let c = 0; c < r.length; c++) {
      const v = stringifyFingerprintCell_(r[c]);
      if (v !== '') hasAnyValue = true;
      rowSerialized.push(v);
    }
    if (!hasAnyValue) continue;
    chunks.push(rowSerialized.join('|'));
  }
  chunks.sort();
  const payload = JSON.stringify({ sourceSheet: CONFIG.SOURCE_SHEET_NAME, count: chunks.length, rows: chunks });
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, payload, Utilities.Charset.UTF_8);
  const hash = bytes.map(function (b) { const v = (b < 0 ? b + 256 : b).toString(16); return v.length === 1 ? '0' + v : v; }).join('');
  return { hash: hash, rows: chunks.length, cols: values[0].length };
}

function stringifyFingerprintCell_(v) {
  if (v == null) return '';
  if (Object.prototype.toString.call(v) === '[object Date]' && !isNaN(v)) {
    return Utilities.formatDate(v, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  }
  return String(v).trim();
}

function runAlimentarContainer_(options) {
  const debug = !!(options && options.debug);
  const forceFormatting = !!(options && options.forceFormatting);
  const ctx = { step: 'inicio' };
  const perf = {
    totalStart: Date.now(),
    stepStart: Date.now(),
  };

  function perfMark_(stepName, extra) {
    const now = Date.now();
    appDebugPrint_('[PERF] ' + stepName, Object.assign({ ms: now - perf.stepStart }, extra || {}));
    perf.stepStart = now;
  }

  try {
    appDebugPrint_('Inicio da carga', {
      debug: debug,
      forceFormatting: forceFormatting,
      sourceSpreadsheetId: CONFIG.SOURCE_SPREADSHEET_ID,
      sourceSheetName: CONFIG.SOURCE_SHEET_NAME,
      targetSheetName: CONFIG.TARGET_SHEET_NAME,
      messageSheetName: CONFIG.MESSAGE_SHEET_NAME,
      timestamp: new Date(),
    });

    ctx.step = 'abrir_origem';
    const sourceSpreadsheet = SpreadsheetApp.openById(CONFIG.SOURCE_SPREADSHEET_ID);
    const sourceSheet = sourceSpreadsheet.getSheetByName(CONFIG.SOURCE_SHEET_NAME);
    if (!sourceSheet) throw new Error('Aba de origem nao encontrada: ' + CONFIG.SOURCE_SHEET_NAME);
    perfMark_('abrir_origem');

    ctx.step = 'ler_origem';
    const sourceValues = sourceSheet.getDataRange().getValues();
    if (sourceValues.length < 2) throw new Error('A aba de origem nao possui dados para processar.');
    perfMark_('ler_origem', { sourceRowsLidas: sourceValues.length });

    ctx.step = 'detectar_cabecalho';
    const headerInfo = findHeaderInfo_(sourceValues);
    const headerIndex = headerInfo.index;
    const dataStartRow = headerInfo.headerRow + 1;
    perfMark_('detectar_cabecalho', { headerRow: headerInfo.headerRow + 1 });

    if (debug) {
      appDebugPrint_('Cabecalho detectado', {
        headerRowPlanilha: headerInfo.headerRow + 1,
        headers: headerInfo.headers,
        headerIndex: headerIndex,
      });
    }

    ctx.step = 'processar';
    const today = new Date();
    const baseRows = [];

    for (let i = dataStartRow; i < sourceValues.length; i++) {
      const row = sourceValues[i];
      const planos = getCell_(row, headerIndex.planos);
      const complemento = getCell_(row, headerIndex.complemento);
      const perfil = getCell_(row, headerIndex.perfil);
      const ordemCarreg = getCell_(row, headerIndex.ordemCarreg);
      const horarioAgenda = getCell_(row, headerIndex.consolidadoHorario);
      const senhaProtocoloRaw = getCell_(row, headerIndex.senhaProtocolo);
      const senhaProtocValor = getCell_(row, headerIndex.senhaProtocValor);

      if (
        isBlank_(planos) &&
        isBlank_(complemento) &&
        isBlank_(perfil) &&
        isBlank_(ordemCarreg) &&
        isBlank_(horarioAgenda) &&
        isBlank_(senhaProtocoloRaw) &&
        isBlank_(senhaProtocValor)
      ) {
        continue;
      }

      const parsed = splitSenhaProtocValor_(senhaProtocValor);
      const senhaProtocoloFinal = !isBlank_(senhaProtocoloRaw)
        ? senhaProtocoloRaw
        : parsed.senhaProtocolo;

      const dataSaida = resolveLoadingDate_(ordemCarreg, today);

      baseRows.push({
        planos: planos,
        complemento: complemento,
        perfil: perfil,
        dataSaida: dataSaida,
        horarioAgenda: horarioAgenda,
        senhaProtocolo: senhaProtocoloFinal,
      });
    }
    perfMark_('processar_origem', { baseRows: baseRows.length });

    ctx.step = 'planilhas_destino';
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const programacaoSheet = getOrCreateSheet_(ss, CONFIG.TARGET_SHEET_NAME);
    const mensagemSheet = getOrCreateSheet_(ss, CONFIG.MESSAGE_SHEET_NAME);
    perfMark_('planilhas_destino');

    const programacaoHeaderRow = getProgramacaoHeaderRow_();
    try {
      if (programacaoSheet.getLastRow() >= programacaoHeaderRow) setupProgramacaoColumns();
    } catch (e) {}
    const existingProgramacaoRows = getSheetDataRows_(programacaoSheet, CONFIG.MAIN_HEADERS.length, programacaoHeaderRow);
    const existingMensagemRows = getSheetDataRows_(mensagemSheet, CONFIG.MESSAGE_HEADERS.length);
    const existingProgramacaoByPlano = buildRowsByKeyIndex_(existingProgramacaoRows, 0);
    const existingMensagemByPlano = buildRowsByKeyIndex_(existingMensagemRows, 0);
    const pIdxZona = CONFIG.MAIN_HEADERS.indexOf('Zona');
    const pIdxGmStatus = CONFIG.MAIN_HEADERS.indexOf('GREEN MILE');
    const pIdxAttemics = CONFIG.MAIN_HEADERS.indexOf('WhatsApp');
    const pIdxClickupStatus = CONFIG.MAIN_HEADERS.indexOf('CLICKUP STATUS');
    const pIdxClickup = CONFIG.MAIN_HEADERS.indexOf('CLICKUP');
    const pIdxNota = CONFIG.MAIN_HEADERS.indexOf('Nota fiscal');

    ctx.step = 'greenmile_enriquecimento';
    const routeKeys = baseRows.map(function (r) { return r.planos; });
    const routeKeysMissingNota = routeKeys.filter(function (planos) {
      const key = String(planos == null ? '' : planos).trim();
      if (!key) return false;
      const existing = existingProgramacaoByPlano[key];
      if (!existing) return true;
      const existingNota = existing[pIdxNota];
      return isBlank_(existingNota);
    });
    const greenMileMap = buildGreenMileRouteMapCached_(routeKeysMissingNota, debug);
    perfMark_('greenmile_enriquecimento', {
      rotasSolicitadas: uniqueNonEmptyStrings_(routeKeysMissingNota).length,
      rotasTotaisBase: uniqueNonEmptyStrings_(routeKeys).length,
    });

    const mainRows = [];
    const messageRows = [];
    baseRows.forEach(function (r) {
      const planoKey = String(r.planos == null ? '' : r.planos).trim();
      const gm = greenMileMap[planoKey] || {};
      const existingProg = existingProgramacaoByPlano[planoKey] || [];
      const existingMsg = existingMensagemByPlano[planoKey] || [];
      const existingNota = existingProg[pIdxNota] || '';
      const gmNota = gm.notaFiscal || '';
      const notaFinal = gmNota || existingNota || '';
      const gmFetchedThisRun = !!String(gmNota || gm.zona || gm.quantidadeEntregas || gm.cidades || '').trim();
      let gmStatus = '';
      if (String(notaFinal || '').trim()) {
        gmStatus = '\ud83d\udfe2 OK';
      } else if (routeKeysMissingNota.indexOf(planoKey) !== -1) {
        gmStatus = '\ud83d\udd34 Falha';
      } else {
        gmStatus = (existingProg[pIdxGmStatus] || '');
      }

      mainRows.push([
        r.planos,
        r.complemento,
        r.perfil,
        r.dataSaida,
        '',
        '',
        gm.zona || existingProg[pIdxZona] || '',
        '',
        '',
        gmStatus,
        existingProg[pIdxAttemics] || '',
        existingProg[pIdxClickupStatus] || '',
        existingProg[pIdxClickup] || '',
        notaFinal,
      ]);

      messageRows.push([
        r.planos,
        r.horarioAgenda,
        r.senhaProtocolo,
        gm.quantidadeEntregas || existingMsg[3] || '',
        gm.peso || existingMsg[4] || '',
        gm.valor || existingMsg[5] || '',
        gm.cidades || existingMsg[6] || '',
        gm.bairros || existingMsg[7] || '',
      ]);
    });

    ctx.step = 'preparar_layout_basico';
    if (forceFormatting) {
      preparePlainSheet_(programacaoSheet);
      preparePlainSheet_(mensagemSheet);
    }
    perfMark_('preparar_layout_basico', { aplicado: forceFormatting });

    ctx.step = 'upsert_programacao';
    const programacaoStats = upsertByKey_(programacaoSheet, {
      headers: CONFIG.MAIN_HEADERS,
      rows: mainRows,
      keyColumnIndex: 0,
      // Preserva campos preenchidos manualmente no destino por chave PLANOS.
      preserveExistingColumns: [4, 5, 7, 8, 10, 11, 12],
      shouldPreserveColumns: shouldPreserveProgramacaoManualFields_,
      headerRow: programacaoHeaderRow,
      debug: debug,
      tag: 'programacao',
      pruneMissingRows: true,
      refreshFilter: forceFormatting,
    });

    const incomingProgramacaoKeys = {};
    mainRows.forEach(function (r) {
      const k = String(r && r[0] != null ? r[0] : '').trim();
      if (k) incomingProgramacaoKeys[k] = true;
    });
    const removedProgramacaoRows = existingProgramacaoRows.filter(function (r) {
      const k = String(r && r[0] != null ? r[0] : '').trim();
      if (!k) return false;
      return !incomingProgramacaoKeys[k];
    });
    const removedProgramacaoResumo = removedProgramacaoRows.map(function (r) {
      return {
        plano: String(r[0] || '').trim(),
        complemento: String(r[1] || '').trim(),
        perfil: String(r[2] || '').trim(),
        dataSaida: String(r[3] || '').trim(),
        dataCarregamento: String(r[4] || '').trim(),
        faixaAgenda: String(r[5] || '').trim(),
        zona: String(r[6] || '').trim(),
        placa: String(r[7] || '').trim(),
        motorista: String(r[8] || '').trim(),
        clickupStatus: String(r[11] || '').trim(),
        clickup: String(r[12] || '').trim(),
        notaFiscal: String(r[13] || '').trim(),
      };
    });
    perfMark_('upsert_programacao', programacaoStats);

    ctx.step = 'dropdown_faixa_agenda';
    const programacaoLastRowAfterUpsert = Math.max(programacaoSheet.getLastRow(), 1);
    if (programacaoLastRowAfterUpsert > programacaoHeaderRow) {
      // Mantem a validacao da faixa mesmo no modo rapido.
      applyAgendaFaixaDropdown_(programacaoSheet, programacaoHeaderRow + 1, 6, programacaoLastRowAfterUpsert - programacaoHeaderRow);
    }
    perfMark_('dropdown_faixa_agenda', { rows: Math.max(0, programacaoLastRowAfterUpsert - programacaoHeaderRow) });

    ctx.step = 'upsert_mensagem';
    const mensagemStats = upsertByKey_(mensagemSheet, {
      headers: CONFIG.MESSAGE_HEADERS,
      rows: messageRows,
      keyColumnIndex: 0,
      preserveExistingColumns: [],
      debug: debug,
      tag: 'mensagem',
      pruneMissingRows: true,
      refreshFilter: forceFormatting,
    });
    perfMark_('upsert_mensagem', mensagemStats);

    const cancelamentosAttemics = { sent: 0, skipped: 0, errors: 0, totalCandidates: 0, disabled: true };

    ctx.step = 'formatacao';
    if (forceFormatting) {
      const programacaoRows = getSheetDataRows_(programacaoSheet, CONFIG.MAIN_HEADERS.length, programacaoHeaderRow);
      if (programacaoRows.length) {
        programacaoSheet.getRange(programacaoHeaderRow + 1, 4, programacaoRows.length, 1).setNumberFormat('dd/MM/yyyy');
        programacaoSheet.getRange(programacaoHeaderRow + 1, 5, programacaoRows.length, 1).setNumberFormat('dd/MM/yyyy');
        applyAgendaFaixaDropdown_(programacaoSheet, programacaoHeaderRow + 1, 6, programacaoRows.length);
      }

      const mensagemRowsLoaded = getSheetDataRows_(mensagemSheet, CONFIG.MESSAGE_HEADERS.length);
      if (mensagemRowsLoaded.length) {
        mensagemSheet.getRange(2, 2, mensagemRowsLoaded.length, 1).setNumberFormat('HH:mm');
        mensagemSheet.getRange(2, 5, mensagemRowsLoaded.length, 1).setNumberFormat('0.000');
        mensagemSheet.getRange(2, 6, mensagemRowsLoaded.length, 1).setNumberFormat('"R$" #,##0.00');
      }
    }
    perfMark_('formatacao', { aplicada: forceFormatting });

    SpreadsheetApp.flush();
    perfMark_('flush');

    appDebugPrint_('Carga concluida', {
      totalMs: Date.now() - perf.totalStart,
      sourceRows: mainRows.length,
      programacao: programacaoStats,
      mensagem: mensagemStats,
    });

    return {
      ok: true,
      data: {
        sourceRows: mainRows.length,
        programacao: programacaoStats,
        mensagem: mensagemStats,
        cancelamentosAttemics: cancelamentosAttemics,
        removedProgramacaoRows: removedProgramacaoResumo,
        totalMs: Date.now() - perf.totalStart,
      },
    };
  } catch (error) {
    appDebugError_(error, ctx);
    throw error;
  }
}


function findHeaderInfo_(allRows) {
  const scanLimit = Math.min(CONFIG.HEADER_SCAN_MAX_ROWS, allRows.length);
  let best = null;

  for (let r = 0; r < scanLimit; r++) {
    const headers = allRows[r] || [];
    const index = buildLogicalHeaderIndex_(headers);
    const score = scoreHeaderIndex_(index);
    if (!best || score > best.score) {
      best = { headerRow: r, headers: headers, index: index, score: score };
    }
  }

  if (!best || best.score < 5) {
    throw new Error('Nao foi possivel identificar o cabecalho automaticamente.');
  }
  ensureRequiredLogicalColumns_(best.index);
  return best;
}

function buildLogicalHeaderIndex_(headers) {
  const normalizedToColumn = {};
  headers.forEach(function (header, col) {
    const normalized = normalizeHeader_(header);
    if (normalized) normalizedToColumn[normalized] = col;
  });

  return {
    planos: findHeaderByAliases_(normalizedToColumn, ['PLANOS']),
    consolidadoHorario: findHeaderByAliases_(normalizedToColumn, [
      'CONSOLIDADO / HORARIO',
      'CONSOLIDADO/ HORARIO',
      'CONSOLIDADO/HORARIO',
      'HORARIO AGENDA',
      'HORÁRIO AGENDA',
    ]),
    senhaProtocolo: findHeaderByAliases_(normalizedToColumn, ['SENHA/PROTOC.', 'SENHA / PROTOC.']),
    senhaProtocValor: findHeaderByAliases_(normalizedToColumn, ['SENHA/PROTOC./ VALOR DO PLANO']),
    complemento: findHeaderByAliases_(normalizedToColumn, ['COMPLEMENTO']),
    perfil: findHeaderByAliases_(normalizedToColumn, ['PERFIL']),
    ordemCarreg: findHeaderByAliases_(normalizedToColumn, ['ORDEM CARREG']),
  };
}

function scoreHeaderIndex_(index) {
  let score = 0;
  ['planos', 'consolidadoHorario', 'complemento', 'perfil', 'ordemCarreg'].forEach(function (k) {
    if (index[k] != null) score++;
  });
  if (index.senhaProtocolo != null || index.senhaProtocValor != null) score++;
  return score;
}

function ensureRequiredLogicalColumns_(index) {
  const missing = [];
  if (index.planos == null) missing.push('PLANOS');
  if (index.complemento == null) missing.push('COMPLEMENTO');
  if (index.perfil == null) missing.push('PERFIL');
  if (index.ordemCarreg == null) missing.push('ORDEM CARREG');
  if (index.consolidadoHorario == null) missing.push('CONSOLIDADO / HORARIO (ou Horário agenda)');
  if (index.senhaProtocolo == null && index.senhaProtocValor == null) {
    missing.push('SENHA/PROTOC. (ou combinado)');
  }

  if (missing.length) {
    throw new Error('Colunas obrigatorias nao encontradas: ' + missing.join(', '));
  }
}

function getOrCreateSheet_(ss, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) sheet = ss.insertSheet(sheetName);
  return sheet;
}

function preparePlainSheet_(sheet) {
  // Fluxo rapido: evitar custo alto de desfazer merge e recriar filtro em toda execucao.
  sheet.setHiddenGridlines(false);
}

function upsertByKey_(sheet, options) {
  const headers = options.headers;
  const rows = options.rows || [];
  const keyColumnIndex = options.keyColumnIndex || 0;
  const preserveExistingColumns = options.preserveExistingColumns || [];
  const headerRow = Math.max(1, Number(options.headerRow) || 1);
  const debug = !!options.debug;
  const tag = options.tag || 'sheet';
  const refreshFilter = !!options.refreshFilter;
  const pruneMissingRows = !!options.pruneMissingRows;
  const shouldPreserveColumns = typeof options.shouldPreserveColumns === 'function'
    ? options.shouldPreserveColumns
    : null;

  ensureHeaders_(sheet, headers, headerRow);

  const existingRows = getSheetDataRows_(sheet, headers.length, headerRow);
  const finalRows = pruneMissingRows ? [] : existingRows.map(function (row) { return row.slice(); });
  const existingMap = {};
  existingRows.forEach(function (row, idx) {
    const key = buildRowKeyFromIndex_(row, keyColumnIndex);
    if (!key) return;
    if (existingMap[key] == null) {
      existingMap[key] = { rowIndex: idx, values: row };
    }
  });

  const stats = {
    inserted: 0,
    updated: 0,
    unchanged: 0,
    skippedWithoutKey: 0,
    deleted: 0,
  };
  const seenIncoming = {};

  rows.forEach(function (incomingRow) {
    const key = buildRowKeyFromIndex_(incomingRow, keyColumnIndex);
    if (!key) {
      stats.skippedWithoutKey++;
      return;
    }
    if (seenIncoming[key]) {
      return;
    }
    seenIncoming[key] = true;

    const incomingCopy = incomingRow.slice();
    const existing = existingMap[key];
    if (!existing) {
      finalRows.push(incomingCopy);
      existingMap[key] = { rowIndex: finalRows.length - 1, values: finalRows[finalRows.length - 1] };
      stats.inserted++;
      return;
    }

    const preserveColsForThisRow = shouldPreserveColumns
      ? (shouldPreserveColumns({
          incomingRow: incomingCopy,
          existingRow: existing.values,
          key: key,
          sheet: sheet,
          tag: tag,
        }) ? preserveExistingColumns : [])
      : preserveExistingColumns;
    const mergedRow = mergePreservingColumns_(incomingCopy, existing.values, preserveColsForThisRow);
    const isSameRow = rowsEqual_(existing.values, mergedRow);

    if (pruneMissingRows) {
      finalRows.push(mergedRow);
      if (isSameRow) {
        stats.unchanged++;
      } else {
        if (debug) {
          appDebugPrint_('Linha atualizada (' + tag + ')', {
            key: key,
            rowNumber: existing.rowIndex + headerRow + 1,
            before: existing.values,
            after: mergedRow,
          });
        }
        stats.updated++;
      }
      return;
    }

    if (isSameRow) {
      stats.unchanged++;
      return;
    }

    if (debug) {
      appDebugPrint_('Linha atualizada (' + tag + ')', {
        key: key,
        rowNumber: existing.rowIndex + headerRow + 1,
        before: existing.values,
        after: mergedRow,
      });
    }

    finalRows[existing.rowIndex] = mergedRow;
    existing.values = mergedRow;
    stats.updated++;
  });

  if (pruneMissingRows) {
    stats.deleted = Math.max(0, existingRows.length - finalRows.length);
  }

  const hadDataRows = existingRows.length;
  const hasChangesToWrite = stats.inserted > 0 || stats.updated > 0 || (pruneMissingRows && stats.deleted > 0);

  if (hasChangesToWrite && finalRows.length > 0) {
    sheet.getRange(headerRow + 1, 1, finalRows.length, headers.length).setValues(finalRows);
  }

  if (pruneMissingRows && hadDataRows > finalRows.length) {
    sheet.deleteRows(headerRow + 1 + finalRows.length, hadDataRows - finalRows.length);
  }

  if (refreshFilter) {
    const filter = sheet.getFilter();
    if (filter) filter.remove();
    const filterRows = Math.max(sheet.getLastRow() - headerRow + 1, 1);
    sheet.getRange(headerRow, 1, filterRows, headers.length).createFilter();
  }

  return stats;
}


function ensureHeaders_(sheet, headers, headerRow) {
  const hdrRow = Math.max(1, Number(headerRow) || 1);
  const current = sheet.getRange(hdrRow, 1, 1, headers.length).getValues()[0];
  let isSame = true;
  for (let i = 0; i < headers.length; i++) {
    if (String(current[i] || '') !== String(headers[i])) {
      isSame = false;
      break;
    }
  }
  if (!isSame) {
    sheet.getRange(hdrRow, 1, 1, headers.length).setValues([headers]);
  }
}

function getSheetDataRows_(sheet, totalCols, headerRow) {
  const hdrRow = Math.max(1, Number(headerRow) || 1);
  const lastRow = sheet.getLastRow();
  if (lastRow < hdrRow + 1) return [];
  return sheet.getRange(hdrRow + 1, 1, lastRow - hdrRow, totalCols).getValues();
}

function mergePreservingColumns_(incomingRow, existingRow, preserveColumns) {
  const merged = incomingRow.slice();
  preserveColumns.forEach(function (idx) {
    if (!isBlank_(existingRow[idx])) {
      merged[idx] = existingRow[idx];
    }
  });
  return merged;
}

function buildRowKeyFromIndex_(row, keyColumnIndex) {
  const value = row && row.length ? row[keyColumnIndex] : '';
  return String(value == null ? '' : value).trim();
}

function buildRowsByKeyIndex_(rows, keyColumnIndex) {
  const out = {};
  (rows || []).forEach(function (row) {
    const key = buildRowKeyFromIndex_(row, keyColumnIndex);
    if (!key) return;
    if (out[key] == null) out[key] = row;
  });
  return out;
}

function normalizePlanoKeyForMatch_(value) {
  let s = String(value == null ? '' : value).trim();
  if (!s) return '';
  s = s.replace(/\s+/g, '');
  s = s.replace(/\.0+$/, '');
  const digits = s.replace(/\D/g, '');
  if (digits.length >= 6) return digits;
  return s;
}

function scoreMensagemBaseAttemicsRow_(row, cols) {
  if (!row) return 0;
  let score = 0;
  const list = [
    cols && cols.cMsgHora,
    cols && cols.cMsgSenha,
    cols && cols.cMsgQtd,
    cols && cols.cMsgPeso,
    cols && cols.cMsgValor,
    cols && cols.cMsgCidade,
    cols && cols.cMsgBairros,
  ];
  for (let i = 0; i < list.length; i++) {
    const c = Number(list[i]) || 0;
    if (!c) continue;
    const v = String(row[c - 1] == null ? '' : row[c - 1]).trim();
    if (v) score++;
  }
  return score;
}

function scoreMensagemBaseAttemicsRowChars_(row, cols) {
  if (!row) return 0;
  let score = 0;
  const list = [
    cols && cols.cMsgHora,
    cols && cols.cMsgSenha,
    cols && cols.cMsgQtd,
    cols && cols.cMsgPeso,
    cols && cols.cMsgValor,
    cols && cols.cMsgCidade,
    cols && cols.cMsgBairros,
  ];
  for (let i = 0; i < list.length; i++) {
    const c = Number(list[i]) || 0;
    if (!c) continue;
    score += String(row[c - 1] == null ? '' : row[c - 1]).trim().length;
  }
  return score;
}

function buildMensagemBaseIndexAttemics_(msgRows, cMsgPlanos, cols) {
  const idx = {
    byPlanoDigits: {},
    matchesInfo: {},
    duplicates: {},
  };
  const rows = msgRows || [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i] || [];
    const planoRaw = String(row[(cMsgPlanos || 1) - 1] == null ? '' : row[(cMsgPlanos || 1) - 1]).trim();
    const key = normalizePlanoDigitsKey_(planoRaw);
    if (!key) continue;
    const candidate = {
      row: row,
      rowIndex: i + 2, // header row = 1
      planoRaw: planoRaw,
      score: scoreMensagemBaseAttemicsRow_(row, cols),
      charScore: scoreMensagemBaseAttemicsRowChars_(row, cols),
    };
    const current = idx.byPlanoDigits[key];
    if (!current) {
      idx.byPlanoDigits[key] = candidate;
      idx.matchesInfo[key] = { count: 1 };
      continue;
    }
    idx.matchesInfo[key].count++;
    idx.duplicates[key] = true;
    const shouldReplace =
      candidate.score > current.score ||
      (candidate.score === current.score && candidate.charScore > current.charScore) ||
      (candidate.score === current.score && candidate.charScore === current.charScore && candidate.rowIndex > current.rowIndex);
    if (shouldReplace) idx.byPlanoDigits[key] = candidate;
  }
  return idx;
}

function describeMensagemBaseMatchAttemics_(rowObj) {
  if (!rowObj) return 'msgBase=NAO_ENCONTRADA';
  if (!rowObj.msgBaseMatched) return 'msgBase=NAO_ENCONTRADA key=' + String(rowObj.planoKey || '');
  const campos = [];
  if (rowObj.senhaProtocolo) campos.push('senha');
  if (rowObj.horarioAgendaMsgBase) campos.push('hora');
  if (rowObj.entregas) campos.push('qtd');
  if (rowObj.peso) campos.push('peso');
  if (rowObj.valor) campos.push('valor');
  if (rowObj.cidade) campos.push('cidade');
  if (rowObj.bairros) campos.push('bairros');
  if (rowObj.regiao) campos.push('regiao');
  const base = 'msgBase=OK row=' + String(rowObj.msgBaseRowIndex || '') + ' plano=' + String(rowObj.msgBasePlanoRaw || rowObj.planoKey || '');
  if (!campos.length) return base + ' campos=SEM_DADOS';
  return base + ' campos=' + campos.join(',');
}

function resolveMensagemBaseRowByPlanoAttemics_(msgByPlano, planoKey) {
  const key = normalizePlanoDigitsKey_(planoKey);
  if (!key) return null;
  if (msgByPlano[key]) return msgByPlano[key];
  const keys = Object.keys(msgByPlano || {});
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (!k) continue;
    if (k === key) return msgByPlano[k];
    if (k.indexOf(key) !== -1 || key.indexOf(k) !== -1) return msgByPlano[k];
  }
  return null;
}

function buildMensagemBaseResumoAttemics_(row) {
  if (!row) return 'msgBase:NAO_ENCONTRADA';
  const partes = [];
  if (row.senhaProtocolo) partes.push('senha=OK');
  if (row.agendaCarregamento) partes.push('hora=OK');
  if (row.entregas) partes.push('qtd=OK');
  if (row.peso) partes.push('peso=OK');
  if (row.valor) partes.push('valor=OK');
  if (row.regiao) partes.push('regiao=OK');
  if (row.cidade) partes.push('cidade=OK');
  if (row.bairros) partes.push('bairros=OK');
  return 'msgBase:' + (partes.length ? partes.join(',') : 'SEM_DADOS');
}

function rowsEqual_(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!valuesEqual_(a[i], b[i])) return false;
  }
  return true;
}

function valuesEqual_(a, b) {
  if (a instanceof Date || b instanceof Date) {
    if (!(a instanceof Date) || !(b instanceof Date)) return false;
    return a.getTime() === b.getTime();
  }
  if ((a === '' || a == null) && (b === '' || b == null)) return true;
  return String(a) === String(b);
}

function findHeaderByAliases_(normalizedToColumn, aliases) {
  for (let i = 0; i < aliases.length; i++) {
    const key = normalizeHeader_(aliases[i]);
    if (normalizedToColumn[key] != null) return normalizedToColumn[key];
  }
  return null;
}

function normalizeHeader_(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toUpperCase();
}

function getCell_(row, index) {
  if (index == null) return '';
  return row[index];
}

function isBlank_(value) {
  return value === '' || value == null;
}

function splitSenhaProtocValor_(value) {
  const text = String(value == null ? '' : value).trim();
  if (!text) return { senhaProtocolo: '', valorPlano: '' };

  const moneyMatches = text.match(/(\d{1,3}(?:\.\d{3})*,\d{2}|\d+[.,]\d{2})(?!.*\d)/);
  if (!moneyMatches) return { senhaProtocolo: text, valorPlano: '' };

  const valorTexto = moneyMatches[1];
  const senhaTexto = text.replace(valorTexto, '').replace(/[\/\-\s]+$/, '').trim();
  return { senhaProtocolo: senhaTexto, valorPlano: valorTexto };
}

function getGreenMileRouteCacheKey_(routeKey) {
  return 'gm:route:' + String(routeKey == null ? '' : routeKey).trim();
}

function serializeGreenMileRouteData_(obj) {
  try {
    return JSON.stringify(obj || {});
  } catch (e) {
    return '{}';
  }
}

function deserializeGreenMileRouteData_(text) {
  if (!text) return null;
  try {
    const parsed = JSON.parse(text);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (e) {
    return null;
  }
}

function buildGreenMileRouteMapCached_(routeKeysRaw, debug) {
  const routeKeys = uniqueNonEmptyStrings_(routeKeysRaw);
  const result = {};
  routeKeys.forEach(function (k) { result[k] = {}; });

  if (!CONFIG.GREENMILE.ENABLED || !routeKeys.length) return result;

  const ttlSeconds = 900;
  const cache = CacheService.getScriptCache();
  const cacheKeys = routeKeys.map(getGreenMileRouteCacheKey_);
  const cacheKeyToRoute = {};
  cacheKeys.forEach(function (k, i) { cacheKeyToRoute[k] = routeKeys[i]; });

  let cachedRaw = {};
  try {
    cachedRaw = cache.getAll(cacheKeys) || {};
  } catch (e) {
    appDebugPrint_('GreenMile cache getAll falhou; seguindo sem cache', {
      error: e && e.message ? e.message : String(e),
    });
  }

  const missingMap = {};
  let hitCount = 0;
  routeKeys.forEach(function (routeKey) {
    missingMap[routeKey] = true;
  });

  Object.keys(cachedRaw).forEach(function (cacheKey) {
    const routeKey = cacheKeyToRoute[cacheKey];
    if (!routeKey) return;
    const parsed = deserializeGreenMileRouteData_(cachedRaw[cacheKey]);
    if (!parsed) return;
    result[routeKey] = parsed;
    delete missingMap[routeKey];
    hitCount++;
  });

  const missingRouteKeys = Object.keys(missingMap);
  appDebugPrint_('GreenMile cache status', {
    totalRotas: routeKeys.length,
    cacheHits: hitCount,
    cacheMisses: missingRouteKeys.length,
    ttlSeconds: ttlSeconds,
  });

  if (!missingRouteKeys.length) {
    return result;
  }

  const freshMap = buildGreenMileRouteMap_(missingRouteKeys, debug);
  const toCache = {};
  missingRouteKeys.forEach(function (routeKey) {
    const fresh = freshMap[routeKey] || {};
    result[routeKey] = fresh;
    toCache[getGreenMileRouteCacheKey_(routeKey)] = serializeGreenMileRouteData_(fresh);
  });

  try {
    cache.putAll(toCache, ttlSeconds);
  } catch (e) {
    appDebugPrint_('GreenMile cache putAll falhou', {
      error: e && e.message ? e.message : String(e),
      entries: Object.keys(toCache).length,
    });
  }

  return result;
}

function buildGreenMileRouteMap_(routeKeysRaw, debug) {
  const routeKeys = uniqueNonEmptyStrings_(routeKeysRaw);
  const result = {};
  routeKeys.forEach(function (k) {
    result[k] = {};
  });

  if (!CONFIG.GREENMILE.ENABLED || !routeKeys.length) {
    return result;
  }

  appDebugPrint_('GreenMile: iniciando enriquecimento', {
    totalRotas: routeKeys.length,
  });

  const auth = getGreenMileAuth_();
  if (!auth.token) {
    appDebugPrint_('GreenMile sem token; seguindo sem enriquecimento', {});
    return result;
  }

  const locationCepCache = {};
  const batchSize = 20; // 20 rotas => 40 requests (restrictions + summary)
  for (let start = 0; start < routeKeys.length; start += batchSize) {
    const batchRouteKeys = routeKeys.slice(start, start + batchSize);
    let batchPairMap = null;

    try {
      batchPairMap = fetchGreenMileRoutePairsBatch_(batchRouteKeys, auth, debug);
    } catch (e) {
      appDebugPrint_('GreenMile lote falhou; fallback sequencial', {
        batchStart: start,
        batchSize: batchRouteKeys.length,
        error: e && e.message ? e.message : String(e),
      });
      batchPairMap = null;
    }

    batchRouteKeys.forEach(function (routeKey) {
      try {
        let restrictionsData;
        let summaryData;

        if (batchPairMap && batchPairMap[routeKey] && !batchPairMap[routeKey].error) {
          restrictionsData = batchPairMap[routeKey].restrictions || [];
          summaryData = batchPairMap[routeKey].summary || [];
        } else {
          restrictionsData = fetchGreenMileRestrictionsByRoute_(routeKey, auth, debug);
          summaryData = fetchGreenMileSummaryByRoute_(routeKey, auth, debug);
        }

        result[routeKey] = mergeGreenMileRouteData_(
          routeKey,
          restrictionsData,
          summaryData,
          auth,
          locationCepCache,
          debug
        );
        if (debug) {
          appDebugPrint_('GreenMile consolidado por rota', result[routeKey]);
        }
      } catch (e) {
        appDebugPrint_('Falha no enriquecimento GreenMile para rota', {
          routeKey: routeKey,
          error: e && e.message ? e.message : String(e),
        });
        result[routeKey] = {};
      }
    });
  }

  return result;
}

function getGreenMileAuth_() {
  let credentials = null;
  try {
    credentials = getGreenMileCredentials_();
  } catch (e) {
    appDebugPrint_('GreenMile login ausente (usuario/senha)', { error: e && e.message ? e.message : String(e) });
    return { build: '1705315', version: '26.0130', module: 'LIVE', username: '', password: '', token: '' };
  }

  const auth = {
    build: '1705315',
    version: '26.0130',
    module: 'LIVE',
    username: credentials.username,
    password: credentials.password,
    token: '',
  };

  auth.token = loginGreenMile_(auth);
  return auth;
}

function loginGreenMile_(auth) {
  if (!auth.username || !auth.password) {
    appDebugPrint_('GreenMile login ausente (usuario/senha)', {});
    return '';
  }

  const response = UrlFetchApp.fetch(CONFIG.GREENMILE.BASE_URL + '/login', {
    method: 'post',
    payload:
      'j_username=' +
      encodeURIComponent(auth.username) +
      '&j_password=' +
      encodeURIComponent(auth.password),
    contentType: 'application/x-www-form-urlencoded',
    muteHttpExceptions: true,
    headers: {
      Accept: 'application/json',
      'Greenmile-Module': auth.module,
    },
  });

  const code = response.getResponseCode();
  const text = response.getContentText();
  if (code !== 200) {
    appDebugPrint_('GreenMile login falhou', {
      httpCode: code,
      response: text.slice(0, 300),
    });
    return '';
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    appDebugPrint_('GreenMile login respondeu JSON invalido', { response: text.slice(0, 300) });
    return '';
  }

  const token =
    (parsed &&
      parsed.analyticsToken &&
      parsed.analyticsToken.access_token) ||
    (parsed && parsed.access_token) ||
    '';

  if (!token) {
    appDebugPrint_('GreenMile login sem access_token', { response: text.slice(0, 300) });
    return '';
  }

  appDebugPrint_('GreenMile login OK', {});
  return token;
}

function fetchGreenMileRestrictionsByRoute_(routeKey, auth, debug) {
  const url =
    CONFIG.GREENMILE.BASE_URL +
    '/StopView/restrictions?criteria=' +
    CONFIG.GREENMILE.RESTRICTIONS_FILTERS_QUERY;

  const body = {
    criteriaChain: [
      { and: [{ matchMode: 'EXACT', attr: 'routeView.route.key', eq: String(routeKey) }] },
    ],
    sort: [],
  };

  const data = greenMilePost_(url, body, auth);
  if (debug) {
    appDebugPrint_('GreenMile restrictions carregado', {
      routeKey: routeKey,
      count: asArray_(data).length,
    });
  }
  return asArray_(data);
}

function fetchGreenMileSummaryByRoute_(routeKey, auth, debug) {
  const url =
    CONFIG.GREENMILE.BASE_URL +
    '/StopView/Summary?criteria=' +
    CONFIG.GREENMILE.SUMMARY_FILTERS_QUERY;

  const body = {
    criteriaChain: [
      { and: [{ matchMode: 'EXACT', attr: 'route.key', eq: String(routeKey) }] },
    ],
    sort: [{ attr: 'stop.plannedSequenceNum', type: 'ASC' }],
  };

  const data = greenMilePost_(url, body, auth);
  if (debug) {
    appDebugPrint_('GreenMile summary carregado', {
      routeKey: routeKey,
      count: asArray_(data).length,
    });
  }
  return asArray_(data);
}

function fetchGreenMileLocationByKey_(locationKey, auth) {
  const url =
    CONFIG.GREENMILE.BASE_URL +
    '/Location/restrictions?criteria=' +
    CONFIG.GREENMILE.LOCATION_FILTERS_QUERY;

  const body = {
    criteriaChain: [
      { and: [{ matchMode: 'EXACT', attr: 'key', eq: String(locationKey) }] },
    ],
  };

  const data = greenMilePost_(url, body, auth);
  return asArray_(data);
}

function buildGreenMilePostRequest_(url, bodyObj, auth) {
  return {
    url: url,
    method: 'post',
    contentType: 'application/json;charset=UTF-8',
    payload: JSON.stringify(bodyObj),
    muteHttpExceptions: true,
    headers: {
      accept: 'application/json, text/plain, */*',
      'greenmile-build': auth.build,
      'greenmile-module': auth.module,
      'greenmile-version': auth.version,
      Authorization: 'Bearer ' + auth.token,
    },
  };
}

function parseGreenMileResponse_(response) {
  const code = response.getResponseCode();
  const text = response.getContentText();
  if (code < 200 || code >= 300) {
    throw new Error('GreenMile HTTP ' + code + ': ' + text.slice(0, 300));
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error('Resposta GreenMile invalida (JSON): ' + text.slice(0, 300));
  }
}

function fetchGreenMileRoutePairsBatch_(routeKeys, auth, debug) {
  const jobs = [];
  (routeKeys || []).forEach(function (routeKey) {
    const routeKeyStr = String(routeKey == null ? '' : routeKey).trim();
    if (!routeKeyStr) return;

    const restrictionsUrl =
      CONFIG.GREENMILE.BASE_URL +
      '/StopView/restrictions?criteria=' +
      CONFIG.GREENMILE.RESTRICTIONS_FILTERS_QUERY;
    const restrictionsBody = {
      criteriaChain: [
        { and: [{ matchMode: 'EXACT', attr: 'routeView.route.key', eq: routeKeyStr }] },
      ],
      sort: [],
    };
    jobs.push({
      routeKey: routeKeyStr,
      type: 'restrictions',
      request: buildGreenMilePostRequest_(restrictionsUrl, restrictionsBody, auth),
    });

    const summaryUrl =
      CONFIG.GREENMILE.BASE_URL +
      '/StopView/Summary?criteria=' +
      CONFIG.GREENMILE.SUMMARY_FILTERS_QUERY;
    const summaryBody = {
      criteriaChain: [
        { and: [{ matchMode: 'EXACT', attr: 'route.key', eq: routeKeyStr }] },
      ],
      sort: [{ attr: 'stop.plannedSequenceNum', type: 'ASC' }],
    };
    jobs.push({
      routeKey: routeKeyStr,
      type: 'summary',
      request: buildGreenMilePostRequest_(summaryUrl, summaryBody, auth),
    });
  });

  const requests = jobs.map(function (j) { return j.request; });
  const responses = UrlFetchApp.fetchAll(requests);
  const out = {};

  jobs.forEach(function (job, idx) {
    if (!out[job.routeKey]) out[job.routeKey] = { restrictions: [], summary: [] };
    try {
      const parsed = parseGreenMileResponse_(responses[idx]);
      const rows = asArray_(parsed);
      out[job.routeKey][job.type] = rows;
      if (debug) {
        appDebugPrint_('GreenMile lote carregado', {
          routeKey: job.routeKey,
          tipo: job.type,
          count: rows.length,
        });
      }
    } catch (e) {
      out[job.routeKey].error = e && e.message ? e.message : String(e);
      if (debug) {
        appDebugPrint_('GreenMile lote erro por rota/tipo', {
          routeKey: job.routeKey,
          tipo: job.type,
          error: out[job.routeKey].error,
        });
      }
    }
  });

  return out;
}

function greenMilePost_(url, bodyObj, auth) {
  const response = UrlFetchApp.fetch(url, buildGreenMilePostRequest_(url, bodyObj, auth));
  return parseGreenMileResponse_(response);
}

function mergeGreenMileRouteData_(routeKey, restrictionsRows, summaryRows, auth, locationCepCache, debug) {
  const byLocation = {};
  const allNotas = {};
  let pesoTotal = 0;
  let valorTotal = 0;

  restrictionsRows.forEach(function (item) {
    const stop = item && item.stop ? item.stop : {};
    const location = stop.location || {};
    const locationKey = String(location.key || '').trim();
    if (!locationKey) return;

    if (!byLocation[locationKey]) {
      byLocation[locationKey] = {
        notas: {},
        cidade: '',
        bairro: '',
      };
    }

    const orders = Array.isArray(stop.orders) ? stop.orders : [];
    orders.forEach(function (order) {
      const nota = normalizeNotaFiscal_(order && order.number);
      if (nota) {
        byLocation[locationKey].notas[nota] = true;
        allNotas[nota] = true;
      }

      const peso = toNumber_(order && order.plannedSize1);
      const valor = toNumber_(order && order.plannedSize3);
      if (!isNaN(peso)) pesoTotal += peso;
      if (!isNaN(valor)) valorTotal += valor;
    });
  });

  summaryRows.forEach(function (item) {
    const stop = item && item.stop ? item.stop : {};
    const location = stop.location || {};
    const locationKey = String(location.key || '').trim();
    if (!locationKey) return;

    if (!byLocation[locationKey]) {
      byLocation[locationKey] = {
        notas: {},
        cidade: '',
        bairro: '',
      };
    }

    const cidade = String(location.city || '').trim();
    const bairro = String(location.district || '').trim();
    if (cidade) byLocation[locationKey].cidade = cidade;
    if (bairro) byLocation[locationKey].bairro = bairro;
  });

  const zonasSet = {};
  Object.keys(byLocation).forEach(function (locationKey) {
    let cep = locationCepCache[locationKey];
    if (cep === undefined) {
      cep = '';
      try {
        const locRows = fetchGreenMileLocationByKey_(locationKey, auth);
        cep = extractBestZipCodeFromLocationRows_(locRows);
      } catch (e) {
        if (debug) {
          appDebugPrint_('GreenMile location CEP falhou', {
            routeKey: routeKey,
            locationKey: locationKey,
            error: e && e.message ? e.message : String(e),
          });
        }
      }
      locationCepCache[locationKey] = cep || '';
    }

    byLocation[locationKey].cep = cep || '';
    const zona = detectarRegiaoSP_(cep);
    byLocation[locationKey].zona = zona;
    if (zona && zona !== 'CEP VAZIO' && zona !== 'CEP INVALIDO') zonasSet[zona] = true;
  });

  const notasLista = Object.keys(allNotas).sort();
  const cidadesSet = {};
  const bairrosSet = {};
  Object.keys(byLocation).forEach(function (locationKey) {
    const loc = byLocation[locationKey];
    if (loc.cidade) cidadesSet[loc.cidade] = true;
    if (loc.bairro) bairrosSet[loc.bairro] = true;
  });

  return {
    routeKey: routeKey,
    zona: Object.keys(zonasSet).sort().join(', '),
    notaFiscal: notasLista.join(', '),
    quantidadeEntregas: Object.keys(byLocation).length || '',
    peso: notasLista.length ? round3_(pesoTotal) : '',
    valor: notasLista.length ? round2_(valorTotal) : '',
    cidades: Object.keys(cidadesSet).sort().join(', '),
    bairros: Object.keys(bairrosSet).sort().join(', '),
  };
}

function extractBestZipCodeFromLocationRows_(rows) {
  const items = asArray_(rows);
  if (!items.length) return '';

  const withCep = items.filter(function (item) {
    return !!normalizeZipCode_(item && (item.zipCode || (item.location && item.location.zipCode)));
  });
  if (!withCep.length) return '';

  // Preferir tipo SIT quando existir (como no exemplo enviado).
  const sit = withCep.find(function (item) {
    const desc = String(item && item.locationType && item.locationType.description || '').toUpperCase();
    return desc === 'SIT';
  });
  return normalizeZipCode_((sit || withCep[0]).zipCode || ((sit || withCep[0]).location || {}).zipCode);
}

function normalizeZipCode_(value) {
  const raw = String(value == null ? '' : value).trim();
  if (!raw) return '';
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 8) return digits.slice(0, 5) + '-' + digits.slice(5);
  return digits;
}

function asArray_(value) {
  if (Array.isArray(value)) return value;
  if (value && Array.isArray(value.content)) return value.content;
  if (value && Array.isArray(value.items)) return value.items;
  if (value && Array.isArray(value.rows)) return value.rows;
  if (value && Array.isArray(value.results)) return value.results;
  if (value && Array.isArray(value.data)) return value.data;
  if (value && value.page && Array.isArray(value.page.items)) return value.page.items;
  return [];
}

function uniqueNonEmptyStrings_(values) {
  const map = {};
  (values || []).forEach(function (v) {
    const key = String(v == null ? '' : v).trim();
    if (key) map[key] = true;
  });
  return Object.keys(map);
}

function toNumber_(v) {
  if (typeof v === 'number') return v;
  if (v == null || v === '') return NaN;
  const s = String(v).replace(/\./g, '').replace(',', '.');
  return Number(s);
}

function round2_(n) {
  return Math.round(n * 100) / 100;
}

function round3_(n) {
  return Math.round(n * 1000) / 1000;
}

function normalizeNotaFiscal_(value) {
  let nota = String(value == null ? '' : value).trim();
  if (!nota) return '';

  // Remove sufixo de item/lote no final (ex.: -1, -2).
  nota = nota.replace(/-\d+$/, '');

  // Remove zeros a esquerda da parte numerica principal.
  nota = nota.replace(/^0+/, '');

  return nota;
}

function detectarRegiaoSP_(cep) {
  if (!cep) return 'CEP VAZIO';
  let cepLimpo = String(cep).replace(/\D/g, '');

  if (cepLimpo.length > 8 || cepLimpo.length < 7) return 'CEP INVALIDO';
  while (cepLimpo.length < 8) cepLimpo = '0' + cepLimpo;

  const prefixo3 = parseInt(cepLimpo.substring(0, 3), 10);
  const prefixo5 = parseInt(cepLimpo.substring(0, 5), 10);

  if (prefixo3 >= 70 && prefixo3 <= 73) return 'MUNICIPAL';
  if (prefixo5 >= 13170 && prefixo5 <= 13182) return 'MUNICIPAL';

  if (prefixo3 >= 10 && prefixo3 <= 15) return 'ZONA CENTRAL (centro)';
  if (prefixo3 >= 16 && prefixo3 <= 19) return 'INTERIOR';
  if (prefixo3 >= 20 && prefixo3 <= 29) return 'ZONA NORTE';
  if (prefixo3 >= 30 && prefixo3 <= 39) return 'ZONA LESTE';

  if (prefixo3 >= 40 && prefixo3 <= 49) {
    if (prefixo3 >= 48 && prefixo3 <= 49) return 'EXTREMO SUL';
    return 'ZONA SUL';
  }

  if (prefixo3 >= 50 && prefixo3 <= 59) return 'ZONA OESTE';
  if (prefixo3 >= 80 && prefixo3 <= 84) return 'ZONA LESTE';
  if (prefixo3 >= 85 && prefixo3 <= 89) return 'INTERIOR';
  if (prefixo3 >= 90 && prefixo3 <= 99) return 'ABC';
  if (prefixo3 >= 100 && prefixo3 <= 109) return 'INTERIOR';

  if (prefixo3 >= 110 && prefixo3 <= 119) {
    if (prefixo3 === 116) return 'LITORAL NORTE';
    return 'LITORAL SUL';
  }

  if ((prefixo3 >= 60 && prefixo3 <= 79) || (prefixo3 >= 120 && prefixo3 <= 199)) {
    return 'INTERIOR';
  }

  return 'FORA DE SP';
}

function resolveLoadingDate_(ordemCarregValue, baseDate) {
  const text = String(ordemCarregValue == null ? '' : ordemCarregValue).trim();
  if (!text) return '';

  if (/^ROTA$/i.test(text)) return nextBusinessDay_(baseDate);

  const dateMatch = text.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/);
  if (dateMatch) {
    const day = Number(dateMatch[1]);
    const month = Number(dateMatch[2]);
    const currentYear = baseDate.getFullYear();
    let year = dateMatch[3] ? normalizeYear_(Number(dateMatch[3])) : currentYear;
    let parsed = new Date(year, month - 1, day);

    if (!dateMatch[3]) {
      const diffDays = Math.round((stripTime_(parsed) - stripTime_(baseDate)) / 86400000);
      if (diffDays < -180) parsed = new Date(year + 1, month - 1, day);
    }
    return parsed;
  }

  return text;
}

function normalizeYear_(year) {
  return year < 100 ? 2000 + year : year;
}

function nextBusinessDay_(date) {
  const d = stripTime_(date);
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

function stripTime_(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function breakMergedRangesIn_(range) {
  const merged = range.getMergedRanges();
  merged.forEach(function (r) {
    r.breakApart();
  });
}

function applyAgendaFaixaDropdown_(sheet, startRow, col, numRows) {
  if (!numRows || numRows < 1) return;

  const options = buildAgendaFaixaOptions_();
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(options, true)
    .setAllowInvalid(false)
    .build();

  sheet.getRange(startRow, col, numRows, 1).setDataValidation(rule);
}

function buildAgendaFaixaOptions_() {
  const options = [];
  for (let h = 0; h <= 23; h++) {
    const next = (h + 1) % 24;
    options.push(pad2_(h) + ':00 - ' + pad2_(next) + ':00');
  }
  return options;
}

function pad2_(n) {
  return n < 10 ? '0' + n : String(n);
}

function mapDisponibilidadeHeaders_(headers) {
  const map = {};
  const normHeaders = (headers || []).map(function (h) { return normalizeHeader_(h); });
  
  normHeaders.forEach(function (norm, i) {
    if (norm) map[norm] = i;
  });

  // Fallback robusto para DATA na coluna A caso esteja vazio ou com outro nome 
  // mas saibamos que a primeira coluna deve ser DATA.
  let dataIdx = map[normalizeHeader_('DATA')];
  if (dataIdx == null && normHeaders.length > 0 && !normHeaders[0]) {
    dataIdx = 0; // Assume que a primeira coluna (vazia) é DATA se as outras baterem
  }

  return {
    data: dataIdx,
    placa: map[normalizeHeader_('PLACA')],
    motorista: map[normalizeHeader_('MOTORISTA')],
    perfil: map[normalizeHeader_('PERFIL')],
    disponibilidade: map[normalizeHeader_('DISPONIBILIDADE')],
    observacao: map[normalizeHeader_('OBSERVA??O')] != null
      ? map[normalizeHeader_('OBSERVA??O')]
      : map[normalizeHeader_('OBSERVACAO')],
    contato: map[normalizeHeader_('CONTATO')],
  };
}

function appDebugPrint_(message, payload) {
  const safeMessage = redact(String(message || ''));
  const safePayload = redact(payload || {});
  const entry = { message: safeMessage, payload: safePayload };
  Logger.log(JSON.stringify(entry));
  console.log(JSON.stringify(entry));
  appendDebugLogToSheet_(safeMessage, safePayload);
}

function appCodeLog_(message, payload) {
  const safeMessage = redact(String(message || ''));
  const safePayload = redact(payload || {});
  const entry = { message: safeMessage, payload: safePayload };
  Logger.log(JSON.stringify(entry));
  console.log(JSON.stringify(entry));
}

function appDebugError_(error, ctx) {
  appDebugPrint_('ERRO na carga', {
    step: ctx && ctx.step ? ctx.step : '',
    name: error && error.name ? error.name : 'Error',
    message: error && error.message ? error.message : String(error),
    stack: error && error.stack ? error.stack : '',
  });
}

function appendDebugLogToSheet_(message, payload) {
  if (!CONFIG.DEBUG || !CONFIG.DEBUG.LOG_TO_SHEET) return;

  try {
    DEBUG_LOG_BUFFER_.push([
      new Date(),
      String(message || ''),
      safeStringify_(payload || {}),
    ]);

    if (DEBUG_LOG_BUFFER_.length >= (CONFIG.DEBUG.BATCH_SIZE || 50)) {
      flushDebugLogBuffer_();
    }
  } catch (e) {
    // Evita loop de erro no proprio logger.
    Logger.log('Falha ao gravar DEBUG_LOG: ' + (e && e.message ? e.message : e));
  }
}

function flushDebugLogBuffer_() {
  if (!CONFIG.DEBUG || !CONFIG.DEBUG.LOG_TO_SHEET) return;
  if (!DEBUG_LOG_BUFFER_.length) return;

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return;

    let sheet = ss.getSheetByName(CONFIG.DEBUG.SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(CONFIG.DEBUG.SHEET_NAME);
      sheet.getRange(1, 1, 1, 3).setValues([['DataHora', 'Mensagem', 'Payload']]);
      sheet.setFrozenRows(1);
    }

    const rows = DEBUG_LOG_BUFFER_.splice(0, DEBUG_LOG_BUFFER_.length);
    const startRow = sheet.getLastRow() + 1;
    sheet.getRange(startRow, 1, rows.length, 3).setValues(rows);
    sheet.getRange(startRow, 1, rows.length, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
  } catch (e) {
    Logger.log('Falha ao flush DEBUG_LOG: ' + (e && e.message ? e.message : e));
  }
}

function safeStringify_(value) {
  try {
    return JSON.stringify(value);
  } catch (e) {
    return String(value);
  }
}

function aleatorizarPlacasProgramacao() {
  return runAleatorizarPlacasProgramacao_({ debug: false });
}

function debugAleatorizarPlacasProgramacao() {
  return runAleatorizarPlacasProgramacao_({ debug: true });
}

function confirmAleatorizacaoPlacasYesNo_(info) {
  const ui = SpreadsheetApp.getUi();
  const x = info || {};
  const linhas = [
    'Aleatorizacao de placas' + (x.debug ? ' (DEBUG)' : ''),
    '',
    'Resumo antes de executar:',
    '• Linhas candidatas: ' + (x.total || 0),
    '• Sao Paulo: ' + (x.saoPaulo || 0),
    '• Outras regioes: ' + (x.outras || 0),
    '• Duplicadas no pool (hoje): ' + (x.poolDuplicadas || 0),
  ];
  if (x.samplePlanos && x.samplePlanos.length) {
    linhas.push('');
    linhas.push('Amostra de planos: ' + x.samplePlanos.join(', '));
  }
  linhas.push('');
  linhas.push('YES = executar');
  linhas.push('NO = cancelar');
  return ui.alert('Confirmar aleatorizacao', linhas.join('\n'), ui.ButtonSet.YES_NO) === ui.Button.YES;
}

function showAleatorizacaoResumoAlert_(stats, meta) {
  const ui = SpreadsheetApp.getUi();
  const s = stats || {};
  const m = meta || {};
  const linhas = [
    '? Aleatorizacao concluida' + (m.debug ? ' (DEBUG)' : ''),
    '',
    '• Processadas: ' + (s.processadas || 0),
    '• Atribuidas: ' + (s.atribuidas || 0),
    '• Sem opcao: ' + (s.semOpcao || 0),
    '• Fallback rodizio SP: ' + (s.fallbackRodizioSP || 0),
    '• Fallback perfil compativel: ' + (s.fallbackPerfilCompat || 0),
    '• Ignoradas: ' + (s.ignoradas || 0),
    '• Duplicadas no pool (hoje): ' + (s.poolDuplicadas || 0),
  ];
  if (m.sampleAtribuidas && m.sampleAtribuidas.length) {
    linhas.push('');
    linhas.push('Atribuidas (amostra): ' + m.sampleAtribuidas.join(', '));
  }
  if (m.sampleSemOpcao && m.sampleSemOpcao.length) {
    linhas.push('Sem opcao (amostra): ' + m.sampleSemOpcao.join(', '));
  }
  ui.alert('Resumo da aleatorizacao', linhas.join('\n'), ui.ButtonSet.OK);
}

function runAleatorizarPlacasProgramacao_(options) {
  const debug = !!(options && options.debug);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const ctx = { step: 'inicio' };

  try {
    ctx.step = 'resolver_abas';
    const shProg = findSheetCaseInsensitive_(ss, 'PROGRAMACAO');
    const shDisp = findSheetCaseInsensitive_(ss, 'DISPONIBILIDADE');
    const shMsg = findSheetCaseInsensitive_(ss, 'PROGRAMACAO_MENSAGEM_BASE');
    if (!shProg) throw new Error('Aba Programacao nao encontrada.');
    if (!shDisp) throw new Error('Aba Disponibilidade nao encontrada.');
    if (!shMsg) throw new Error('Aba Programacao_Mensagem_Base nao encontrada.');

    ctx.step = 'mapas';
    const progHeaderRow = getProgramacaoHeaderRow_();
    const progHeaders = mapHeaders_(shProg, progHeaderRow);
    const dispHeaders = mapHeaders_(shDisp, 1);
    const msgHeaders = mapHeaders_(shMsg, 1);

    const cProgPlanos = getHeaderColRequired_(progHeaders, ['PLANOS'], 'Programacao');
    const cProgPerfil = getHeaderColRequired_(progHeaders, ['PERFIL'], 'Programacao');
    const cProgDataSaida = getHeaderColRequired_(progHeaders, ['DATA DE SAIDA', 'DATA DE SAÍDA'], 'Programacao');
    const cProgPlaca = getHeaderColRequired_(progHeaders, ['PLACA'], 'Programacao');
    const cProgMotorista = getHeaderColRequired_(progHeaders, ['MOTORISTA'], 'Programacao');
    const cProgNota = getHeaderColRequired_(progHeaders, ['NOTA FISCAL'], 'Programacao');

    const cDispData = getHeaderColRequired_(dispHeaders, ['DATA'], 'Disponibilidade');
    const cDispPlaca = getHeaderColRequired_(dispHeaders, ['PLACA'], 'Disponibilidade');
    const cDispMotorista = getHeaderColRequired_(dispHeaders, ['MOTORISTA'], 'Disponibilidade');
    const cDispPerfil = getHeaderColRequired_(dispHeaders, ['PERFIL'], 'Disponibilidade');
    const cDispStatus = getHeaderColRequired_(dispHeaders, ['DISPONIBILIDADE'], 'Disponibilidade');

    const cMsgPlanos = getHeaderColRequired_(msgHeaders, ['PLANOS'], 'Programacao_Mensagem_Base');
    const cMsgCidades = getHeaderColRequired_(msgHeaders, ['CIDADES'], 'Programacao_Mensagem_Base');

    ctx.step = 'ler_dados';
    const progLastRow = shProg.getLastRow();
    if (progLastRow <= progHeaderRow) {
      toast_(ss, 'Programacao sem dados para aleatorizar.');
      return { ok: true, data: { processadas: 0 } };
    }
    const progLastCol = shProg.getLastColumn();
    const progDataStartRow = progHeaderRow + 1;
    const progRange = shProg.getRange(progDataStartRow, 1, progLastRow - progHeaderRow, progLastCol);
    const progData = progRange.getValues();
    const progDisplayData = progRange.getDisplayValues();
    const dispRange = shDisp.getDataRange();
    const dispData = dispRange.getValues();
    const dispDisplayData = dispRange.getDisplayValues();
    const msgData = shMsg.getDataRange().getValues();

    ctx.step = 'cidade_map';
    const cidadesByPlano = buildMensagemBaseCidadeMapByPlano_(msgData, cMsgPlanos, cMsgCidades);

    ctx.step = 'pool_disponibilidade';
    const pool = buildDisponibilidadePoolForRandomizacao_(dispData, dispDisplayData, {
      cData: cDispData,
      cPlaca: cDispPlaca,
      cMotorista: cDispMotorista,
      cPerfil: cDispPerfil,
      cStatus: cDispStatus,
    });

    ctx.step = 'linhas_programacao';
    const proc = buildProgramacaoRowsForRandomizacao_(progData, progDisplayData, {
      headerRow: progHeaderRow,
      cPlanos: cProgPlanos,
      cPerfil: cProgPerfil,
      cDataSaida: cProgDataSaida,
      cPlaca: cProgPlaca,
      cMotorista: cProgMotorista,
      cNota: cProgNota,
    }, cidadesByPlano);

    const used = {};
    const stats = {
      processadas: 0,
      atribuidas: 0,
      semOpcao: 0,
      fallbackRodizioSP: 0,
      fallbackPerfilCompat: 0,
      ignoradas: 0,
      poolDuplicadas: pool.duplicadas.length,
    };

    const orderedRows = proc.saoPaulo.concat(proc.outras);
    const precheck = {
      debug: debug,
      total: orderedRows.length,
      saoPaulo: proc.saoPaulo.length,
      outras: proc.outras.length,
      poolDuplicadas: pool.duplicadas.length,
      samplePlanos: orderedRows.slice(0, 6).map(function (x) { return x.plano; }),
    };
    if (!confirmAleatorizacaoPlacasYesNo_(precheck)) {
      toast_(ss, 'Aleatorizacao cancelada pelo usuario.');
      return { ok: false, cancelled: true, data: precheck };
    }

    orderedRows.forEach(function (item) {
      processProgramacaoRowForRandomizacao_(item, pool.byPerfil, used, stats, debug);
    });

    ctx.step = 'gravar_batch';
    const writeRange = shProg.getRange(progDataStartRow, cProgPlaca, progData.length, 2);
    const writeValues = progData.map(function (row) {
      return [row[cProgPlaca - 1], row[cProgMotorista - 1]];
    });
    writeRange.setValues(writeValues);

    ctx.step = 'feedback_visual';
    orderedRows.forEach(function (item) {
      markRandomizacaoRowResult_(shProg, item.rowNumber, cProgNota, item._resultado || {});
    });

    toast_(ss, 'Aleatorizacao concluida. Atribuidas: ' + stats.atribuidas + ' | Sem opcao: ' + stats.semOpcao);
    showAleatorizacaoResumoAlert_(stats, {
      debug: debug,
      sampleAtribuidas: orderedRows.filter(function (x) { return x && x._resultado && (x._resultado.tipo === 'ok' || x._resultado.tipo === 'fallbackRodizio'); }).slice(0, 6).map(function (x) { return x.plano + '=' + (x.rowRef[x.cPlaca - 1] || ''); }),
      sampleSemOpcao: orderedRows.filter(function (x) { return x && x._resultado && x._resultado.tipo === 'erro'; }).slice(0, 6).map(function (x) { return x.plano; }),
    });

    if (debug) {
      appDebugPrint_('[DEBUG] Aleatorizacao placas concluida', {
        stats: stats,
        poolPerfis: Object.keys(pool.byPerfil).length,
        linhasSP: proc.saoPaulo.length,
        linhasOutras: proc.outras.length,
      });
    }

    return { ok: true, data: stats };
  } catch (error) {
    appDebugError_(error, ctx);
    throw error;
  }
}

function getHeaderColRequired_(headerMap, aliases, ctxName) {
  for (let i = 0; i < aliases.length; i++) {
    const alias = String(aliases[i] || '');
    const col = headerMap.get(normalizeHeader_(alias)) || headerMap.get(normHeader_(alias));
    if (col) return col;
  }
  throw new Error('Cabecalho nao encontrado em ' + ctxName + ': ' + aliases.join(' | '));
}

function buildMensagemBaseCidadeMapByPlano_(data, cPlanos, cCidades) {
  const map = {};
  for (let r = 1; r < (data || []).length; r++) {
    const row = data[r] || [];
    const plano = String(row[cPlanos - 1] == null ? '' : row[cPlanos - 1]).trim();
    if (!plano) continue;
    if (map[plano] == null) {
      map[plano] = String(row[cCidades - 1] == null ? '' : row[cCidades - 1]);
    }
  }
  return map;
}

function buildDisponibilidadePoolForRandomizacao_(data, displayData, cols) {
  const byPerfil = {};
  const dupCheck = {};
  const duplicadas = [];
  const today = toDateOnly_(new Date());

  for (let r = 1; r < (data || []).length; r++) {
    const row = data[r] || [];
    const rowDisplay = (displayData && displayData[r]) || [];
    const dt = toDateOnly_(row[cols.cData - 1]);
    if (!dt || !isSameDay_(dt, today)) continue;

    const status = normalizeHeader_(rowDisplay[cols.cStatus - 1] != null ? rowDisplay[cols.cStatus - 1] : row[cols.cStatus - 1]);
    if (status !== normalizeHeader_('DISPONIVEL') && status !== normalizeHeader_('DISPONÍVEL')) continue;

    const placa = normalizePlate_(rowDisplay[cols.cPlaca - 1] != null ? rowDisplay[cols.cPlaca - 1] : row[cols.cPlaca - 1]);
    const motorista = String(rowDisplay[cols.cMotorista - 1] == null ? '' : rowDisplay[cols.cMotorista - 1]).trim();
    const perfil = normalizePerfilRandomizacao_(rowDisplay[cols.cPerfil - 1] != null ? rowDisplay[cols.cPerfil - 1] : row[cols.cPerfil - 1]);
    if (!placa || !perfil) continue;

    if (dupCheck[placa]) {
      dupCheck[placa].duplicada = true;
      duplicadas.push(placa);
      continue;
    }
    dupCheck[placa] = { placa: placa, motorista: motorista, perfil: perfil, duplicada: false };
  }

  Object.keys(dupCheck).forEach(function (placa) {
    const item = dupCheck[placa];
    if (item.duplicada) return;
    if (!byPerfil[item.perfil]) byPerfil[item.perfil] = [];
    byPerfil[item.perfil].push({ placa: item.placa, motorista: item.motorista });
  });

  return { byPerfil: byPerfil, duplicadas: uniqueNonEmptyStrings_(duplicadas) };
}

function buildProgramacaoRowsForRandomizacao_(progData, progDisplayData, cols, cidadesByPlano) {
  const headerRow = Math.max(1, Number(cols && cols.headerRow) || 1);
  const saoPaulo = [];
  const outras = [];

  for (let i = 0; i < (progData || []).length; i++) {
    const row = progData[i];
    const rowDisplay = (progDisplayData && progDisplayData[i]) || [];
    const plano = String(rowDisplay[cols.cPlanos - 1] == null ? row[cols.cPlanos - 1] : rowDisplay[cols.cPlanos - 1]).trim();
    if (!plano) continue;

    const perfilRaw = String(rowDisplay[cols.cPerfil - 1] == null ? row[cols.cPerfil - 1] : rowDisplay[cols.cPerfil - 1]).trim();
    const perfilKey = normalizePerfilRandomizacao_(perfilRaw);
    const dataSaida = toDateOnly_(row[cols.cDataSaida - 1]) || nextBusinessDay_(new Date());
    const cidades = String(cidadesByPlano[plano] == null ? '' : cidadesByPlano[plano]);
    const isSP = normalizeCityContainsSaoPaulo_(cidades);

    const item = {
      rowRef: row,
      rowIndex: i,
      rowNumber: headerRow + 1 + i,
      plano: plano,
      perfilRaw: perfilRaw,
      perfilKey: perfilKey,
      dataSaida: dataSaida,
      cidades: cidades,
      cPlaca: cols.cPlaca,
      cMotorista: cols.cMotorista,
      _resultado: null,
    };

    if (isSP) saoPaulo.push(item);
    else outras.push(item);
  }

  return { saoPaulo: saoPaulo, outras: outras };
}

function processProgramacaoRowForRandomizacao_(item, poolByPerfil, used, stats, debug) {
  stats.processadas++;

  if (!item.perfilKey) {
    item.rowRef[item.cPlaca - 1] = '';
    item.rowRef[item.cMotorista - 1] = '';
    item._resultado = { tipo: 'erro', msg: 'PERFIL vazio' };
    stats.ignoradas++;
    return;
  }

  const pick = pickVehicleByPerfilCompat_(poolByPerfil, used, item.perfilRaw || item.perfilKey, item.dataSaida, item.cidades, true);
  if (!pick) {
    item.rowRef[item.cPlaca - 1] = '';
    item.rowRef[item.cMotorista - 1] = '';
    item._resultado = {
      tipo: 'erro',
      msg: 'Sem placa disponivel para PERFIL=' + (item.perfilRaw || item.perfilKey) +
        ' (compat: ' + resolvePerfilCandidatesForProgramacao_(item.perfilRaw || item.perfilKey).join(', ') + ')',
    };
    stats.semOpcao++;
    return;
  }

  item.rowRef[item.cPlaca - 1] = pick.placa;
  item.rowRef[item.cMotorista - 1] = pick.motorista || '';
  used[pick.placa] = true;
  stats.atribuidas++;
  if (pick.usedPerfilFallback) {
    stats.fallbackPerfilCompat++;
  }
  const msgs = [];
  if (pick.usedPerfilFallback) {
    msgs.push('Fallback perfil: ' + (pick.requestPerfil || item.perfilRaw || item.perfilKey) + ' -> ' + pick.usedPerfilCandidate);
  }
  if (pick.usedRodizioFallback && normalizeCityContainsSaoPaulo_(item.cidades)) {
    stats.fallbackRodizioSP++;
    msgs.push('Fallback rodízio em SP');
    item._resultado = { tipo: 'fallbackRodizio', msg: msgs.join(' | ') || 'Fallback rodízio em SP' };
  } else {
    item._resultado = { tipo: 'ok', msg: msgs.join(' | ') };
  }

  if (debug) {
    appDebugPrint_('[DEBUG] Aleatorizacao linha', {
      rowNumber: item.rowNumber,
      plano: item.plano,
      perfil: item.perfilKey,
      placa: pick.placa,
      perfilEscolhido: pick.usedPerfilCandidate,
      fallbackPerfil: pick.usedPerfilFallback,
      fallbackRodizio: pick.usedRodizioFallback,
    });
  }
}

function normalizePerfilRandomizacao_(text) {
  // Se o Sheets converteu "3/4" em data (ex.: 03/04/2026), recupera o perfil "3/4".
  if (Object.prototype.toString.call(text) === '[object Date]' && !isNaN(text)) {
    return String(text.getDate()) + '/' + String(text.getMonth() + 1);
  }

  const raw = String(text == null ? '' : text).trim();
  const dateLike = raw.match(/^(\d{1,2})\/(\d{1,2})(?:\/\d{2,4})$/);
  if (dateLike) {
    return String(Number(dateLike[1])) + '/' + String(Number(dateLike[2]));
  }

  return normalizeHeader_(raw)
    .replace(/\s*-\s*/g, ' - ')
    .replace(/\s*\/\s*/g, '/')
    .trim();
}

function parsePerfilProgramacaoTokens_(text) {
  const norm = normalizePerfilRandomizacao_(text);
  if (!norm) return [];
  const tokens = {};
  tokens[norm] = true;

  // Quebra casos compostos comuns, ex.: "MEDIO - 3/4"
  norm.split('-').forEach(function (part) {
    const p = normalizePerfilRandomizacao_(part);
    if (p) tokens[p] = true;
  });
  return Object.keys(tokens);
}

function resolvePerfilCandidatesForProgramacao_(perfilProgramacaoRaw) {
  const raw = normalizePerfilRandomizacao_(perfilProgramacaoRaw);
  const tokens = parsePerfilProgramacaoTokens_(perfilProgramacaoRaw);
  const out = [];
  const seen = {};

  function add(x) {
    const v = normalizePerfilRandomizacao_(x);
    if (!v || seen[v]) return;
    seen[v] = true;
    out.push(v);
  }

  // Casos especiais compostos / compatibilidade
  const hasMedio = tokens.indexOf('MEDIO') !== -1;
  const has34 = tokens.indexOf('3/4') !== -1 || tokens.indexOf('34') !== -1;
  if (hasMedio && has34) {
    add('MEDIO');
    add('3/4');
    return out;
  }

  if (raw === 'HR') {
    add('HR');
    add('VAN');
    return out;
  }
  if (raw === 'VAN') {
    add('VAN');
    return out;
  }
  if (raw === 'CARRETA') {
    add('CARRETA');
    add('CAVALO');
    return out;
  }

  // Se vier exatamente MEDIO-3/4 de outra forma, ainda aceita ambos
  if (hasMedio || has34) {
    if (hasMedio) add('MEDIO');
    if (has34) add('3/4');
    if (out.length) return out;
  }

  add(raw);
  return out;
}

function pickVehicleByPerfilCompat_(poolByPerfil, used, perfilProgramacaoRaw, dtSaida, cidadesText, allowRodizioFallback) {
  const candidates = resolvePerfilCandidatesForProgramacao_(perfilProgramacaoRaw);
  if (!candidates.length) return null;

  // 1) tenta todos os candidatos sem fallback de rodízio
  for (let i = 0; i < candidates.length; i++) {
    const cand = candidates[i];
    const pick = pickVehicleByPerfil_(poolByPerfil, used, cand, dtSaida, cidadesText, false);
    if (pick) {
      pick.requestPerfil = perfilProgramacaoRaw;
      pick.usedPerfilCandidate = cand;
      pick.usedPerfilFallback = i > 0;
      return pick;
    }
  }

  // 2) fallback de rodízio (mesma ordem de compatibilidade)
  if (allowRodizioFallback) {
    for (let j = 0; j < candidates.length; j++) {
      const cand2 = candidates[j];
      const pick2 = pickVehicleByPerfil_(poolByPerfil, used, cand2, dtSaida, cidadesText, true);
      if (pick2) {
        pick2.requestPerfil = perfilProgramacaoRaw;
        pick2.usedPerfilCandidate = cand2;
        pick2.usedPerfilFallback = j > 0;
        return pick2;
      }
    }
  }
  return null;
}

function pickVehicleByPerfil_(poolByPerfil, used, perfilKey, dtSaida, cidadesText, allowRodizioFallback) {
  const arr = poolByPerfil[perfilKey];
  if (!arr || !arr.length) return null;

  const startAt = Math.floor(Math.random() * arr.length);
  let fallback = null;
  for (let i = 0; i < arr.length; i++) {
    const idx = (startAt + i) % arr.length;
    const item = arr[idx];
    if (!item || !item.placa) continue;
    if (used[item.placa]) continue;

    const inRodizio = isRodizioForCidade_(item.placa, dtSaida, cidadesText);
    if (!inRodizio) {
      return { placa: item.placa, motorista: item.motorista, usedRodizioFallback: false };
    }
    if (allowRodizioFallback && !fallback) {
      fallback = { placa: item.placa, motorista: item.motorista, usedRodizioFallback: true };
    }
  }
  return fallback;
}

function isRodizioForCidade_(placa, dataSaida, cidadesText) {
  if (!normalizeCityContainsSaoPaulo_(cidadesText)) return false;
  return plateRestrictedOnDate_(placa, dataSaida);
}

function normalizeCityContainsSaoPaulo_(text) {
  return normalizeHeader_(text || '').indexOf('SAO PAULO') !== -1;
}

function plateRestrictedOnDate_(placa, dtRef) {
  const p = normalizePlate_(placa);
  const lastCh = p ? p.slice(-1) : '';
  if (!/^[0-9]$/.test(lastCh)) return false;
  const d = Number(lastCh);

  const ref = toDateOnly_(dtRef) || new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const wdSaida = jsDayToVbMonday_(ref);       // 1=Seg ... 7=Dom
  const wdTomorrow = jsDayToVbMonday_(tomorrow);

  if (d === 1 || d === 2) return wdTomorrow === 1;
  if (d === 3 || d === 4) return wdSaida === 2;
  if (d === 5 || d === 6) return wdSaida === 3;
  if (d === 7 || d === 8) return wdSaida === 4;
  if (d === 9 || d === 0) return wdSaida === 5;
  return false;
}

function jsDayToVbMonday_(date) {
  const js = (toDateOnly_(date) || new Date()).getDay(); // 0=Dom..6=Sab
  return js === 0 ? 7 : js; // 1=Seg..7=Dom
}

function markRandomizacaoRowResult_(sheet, rowNumber, notaFiscalCol, result) {
  const msg = result && result.msg ? result.msg : '';

  try {
    // Sem pintar linha no aleatorizar: feedback apenas por nota na Placa.
    const placaCol = findRequiredColumns_().programacao.placaCol;
    const cell = sheet.getRange(rowNumber, placaCol);
    try { cell.setBackground(null); } catch (e) {}
    if (msg) cell.setNote(msg);
    else cell.clearNote();
  } catch (e) {}
}
function getAttemicsConfig_() {
  return CONFIG.ATTEMICS || {};
}

function getAttemicsLogHeaders_() {
  return [
    'DataHora',
    'DataRef',
    'Modo',
    'TipoMensagem',
    'Plano',
    'Complemento',
    'Motorista',
    'Placa',
    'TelefoneOriginal',
    'TelefoneDestino',
    'Regiao',
    'Cidade',
    'Bairros',
    'AgendaCarregamento',
    'DataSaida',
    'Status',
    'HTTPStatus',
    'HTTPStatusText',
    'ResponseBodyResumo',
    'MessagePreview',
    'PayloadResumo',
    'HashDedupe',
    'Observacao',
    'RowProgramacao',
    'ExecId',
    'ChavePlanoPlaca',
  ];
}

function ensureAttemicsLogSheet_(ss) {
  const cfg = getAttemicsConfig_();
  const name = cfg.LOG_SHEET_NAME || 'LOG_ATTEMICS';
  const sheet = getOrCreateSheet_(ss, name);
  const headers = getAttemicsLogHeaders_();
  const current = sheet.getRange(1, 1, 1, headers.length).getDisplayValues()[0];
  let same = true;
  for (let i = 0; i < headers.length; i++) {
    if (String(current[i] || '') !== headers[i]) { same = false; break; }
  }
  if (!same) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  try {
    sheet.setFrozenRows(1);
    sheet.setRowHeight(1, 28);
    sheet.setColumnWidth(1, 145);
    sheet.setColumnWidth(4, 165);
    sheet.setColumnWidth(19, 340);
    sheet.setColumnWidth(20, 420);
    sheet.setColumnWidth(21, 300);
    sheet.setColumnWidth(23, 280);
    sheet.setColumnWidth(26, 180);
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, headers.length).setWrap(false);
      sheet.setRowHeights(2, lastRow - 1, 21);
    }
  } catch (e) {}
  return sheet;
}

function truncateText_(value, maxLen) {
  const s = String(value == null ? '' : value);
  const n = Math.max(0, Number(maxLen) || 0);
  if (!n || s.length <= n) return s;
  return s.slice(0, Math.max(0, n - 3)) + '...';
}

function formatDateTimeBR_(value) {
  const d = value instanceof Date ? value : new Date(value || Date.now());
  return Utilities.formatDate(d, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
}

function formatDateRefBR_(value) {
  const d = toDateOnly_(value) || toDateOnly_(new Date()) || new Date();
  return formatDateKey_(d);
}

function appendAttemicsLogRow_(sheet, rowObj) {
  const headers = getAttemicsLogHeaders_();
  const base = rowObj ? Object.assign({}, rowObj) : {};
  const status = String(base.Status || '').trim();
  if (status.indexOf('IGNORADO_') === 0) {
    return;
  }
  if (!Object.prototype.hasOwnProperty.call(base, 'ChavePlanoPlaca')) {
    base.ChavePlanoPlaca = buildAttemicsPlanoPlacaKey_(base.Plano, base.Placa);
  }
  const row = headers.map(function (h) { return Object.prototype.hasOwnProperty.call(base, h) ? base[h] : ''; });
  sheet.appendRow(row);
  try {
    const r = sheet.getLastRow();
    sheet.getRange(r, 1, 1, headers.length).setWrap(false);
    sheet.setRowHeight(r, 21);
  } catch (e) {}
  try { maybeSyncProgramacaoAttemicsStatusFromLogRow_(base); } catch (e) {}
}

function appendAttemicsExecLog_(logSheet, kind, status, execId, extra) {
  const base = extra || {};
  appendAttemicsLogRow_(logSheet, {
    DataHora: formatDateTimeBR_(new Date()),
    DataRef: formatDateRefBR_(new Date()),
    Modo: base.Modo || 'TESTE',
    TipoMensagem: 'EXEC_' + String(kind || '').toUpperCase(),
    Plano: '',
    Complemento: '',
    Motorista: '',
    Placa: '',
    TelefoneOriginal: '',
    TelefoneDestino: '',
    Regiao: '',
    Cidade: '',
    Bairros: '',
    AgendaCarregamento: '',
    DataSaida: '',
    Status: status,
    HTTPStatus: '',
    HTTPStatusText: '',
    ResponseBodyResumo: truncateText_(base.ResponseBodyResumo || '', 340),
    MessagePreview: '',
    PayloadResumo: truncateText_(base.PayloadResumo || '', 300),
    HashDedupe: '',
    Observacao: truncateText_(base.Observacao || '', 280),
    RowProgramacao: '',
    ExecId: execId || '',
  });
}

function buildAttemicsPlanoPlacaKey_(plano, placa) {
  const planoRaw = String(plano == null ? '' : plano).trim();
  const planoRawNorm = normalizeHeader_(planoRaw);
  const planoKey = normalizePlanoDigitsKey_(plano);
  const placaKey = normalizePlate_(placa);
  if (!planoKey) {
    if (planoRawNorm === normalizeHeader_('SEM_PLANO')) {
      return 'SEM_PLANO|' + (placaKey || '');
    }
    return '';
  }
  return planoKey + '|' + (placaKey || '');
}

function getAttemicsStatusVisualPalette_() {
  return {
    NAO_ENVIADO: { label: '', bg: '', fg: '#1F1F1F', clearVisual: true },
    PARCIAL: { label: '\ud83d\udfe1 Parcial', bg: '#FFE699', fg: '#1F1F1F' },
    ENVIADO: { label: '\ud83d\udfe2 Enviado', bg: '#C6EFCE', fg: '#1F1F1F' },
    ERRO_API: { label: '\ud83d\udd34 Erro API', bg: '#F4CCCC', fg: '#1F1F1F' },
  };
}

function loadAttemicsLogState_(logSheet) {
  const state = {
    sentByPlanoTipoDia: {},
    sentFirstByPlanoDia: {},
    sentFirstWithHorarioByPlanoDia: {},
    sentSecondByPlanoDiaAgenda: {},
    lastSecondAgendaByPlanoDia: {},
  };
  const lastRow = logSheet.getLastRow();
  const headers = getAttemicsLogHeaders_();
  if (lastRow < 2) return state;
  const values = logSheet.getRange(2, 1, lastRow - 1, headers.length).getDisplayValues();
  for (let i = 0; i < values.length; i++) {
    const row = values[i];
    const dataRef = String(row[1] || '').trim();
    const tipo = String(row[3] || '').trim();
    const plano = String(row[4] || '').trim();
    const placa = String(row[7] || '').trim();
    const status = String(row[15] || '').trim();
    if (!dataRef || !tipo || !plano || status !== 'ENVIADO_OK') continue;
    const planoPlacaKey = buildAttemicsPlanoPlacaKey_(plano, placa);
    if (!planoPlacaKey) continue;
    state.sentByPlanoTipoDia[dataRef + '|' + tipo + '|' + planoPlacaKey] = true;
    if (tipo === 'PRIMEIRA_610' || tipo === 'PRIMEIRA_REENTREGA') {
      state.sentFirstByPlanoDia[dataRef + '|' + planoPlacaKey] = true;
      const msgPreview = String(row[19] || '').trim();
      if (msgPreview.indexOf('Hor\u00e1rio de carregamento:') !== -1) {
        state.sentFirstWithHorarioByPlanoDia[dataRef + '|' + planoPlacaKey] = true;
      }
    } else if (tipo === 'SEGUNDA_HORARIO') {
      const agenda = normalizeAttemicsAgendaKey_(row[13]);
      if (agenda) {
        state.sentSecondByPlanoDiaAgenda[dataRef + '|SEGUNDA_HORARIO|' + planoPlacaKey + '|' + agenda] = true;
        state.lastSecondAgendaByPlanoDia[dataRef + '|' + planoPlacaKey] = {
          agenda: String(row[13] || '').trim(),
          agendaKey: agenda,
          messagePreview: String(row[19] || '').trim(),
        };
      }
    }
  }
  return state;
}

function normalizeAttemicsAgendaKey_(value) {
  return normalizeHeader_(String(value == null ? '' : value).replace(/\s+/g, ' ').trim());
}

function hasAttemicsSegundaMesmaAgendaHoje_(planoPlacaKey, dateRef, agenda, state) {
  const dref = String(dateRef || '').trim();
  const key = String(planoPlacaKey || '').trim();
  const agendaKey = normalizeAttemicsAgendaKey_(agenda);
  if (!dref || !key || !agendaKey) return false;
  return !!(state && state.sentSecondByPlanoDiaAgenda && state.sentSecondByPlanoDiaAgenda[dref + '|SEGUNDA_HORARIO|' + key + '|' + agendaKey]);
}

function getAttemicsSegundaAgendaAnteriorHoje_(planoPlacaKey, dateRef, state) {
  const dref = String(dateRef || '').trim();
  const key = String(planoPlacaKey || '').trim();
  if (!dref || !key) return null;
  return (state && state.lastSecondAgendaByPlanoDia && state.lastSecondAgendaByPlanoDia[dref + '|' + key]) || null;
}

function hasAttemicsLogForPlanoTipoDia_(logSheet, planoPlacaKey, tipoMensagem, dateRef, statusFilter, state) {
  const key = String(planoPlacaKey == null ? '' : planoPlacaKey).trim();
  const tipo = String(tipoMensagem || '').trim();
  const dref = String(dateRef || '').trim();
  if (!key || !tipo || !dref) return false;
  if (state && state.sentByPlanoTipoDia) {
    return !!state.sentByPlanoTipoDia[dref + '|' + tipo + '|' + key];
  }
  const lastRow = logSheet.getLastRow();
  if (lastRow < 2) return false;
  const headers = getAttemicsLogHeaders_();
  const rows = logSheet.getRange(2, 1, lastRow - 1, headers.length).getDisplayValues();
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (String(row[1] || '').trim() !== dref) continue;
    if (String(row[3] || '').trim() !== tipo) continue;
    if (buildAttemicsPlanoPlacaKey_(row[4], row[7]) !== key) continue;
    if (statusFilter && String(row[15] || '').trim() !== String(statusFilter)) continue;
    return true;
  }
  return false;
}

function setupProgramacaoStatusColumns_() {
  const ss = SpreadsheetApp.getActive();
  const sheet = findSheetCaseInsensitive_(ss, CFG.SHEET_PROGRAMACAO);
  if (!sheet) throw new Error('Aba nao encontrada: ' + CFG.SHEET_PROGRAMACAO);
  const headerRow = getProgramacaoHeaderRow_();

  function applyWidths_() {
    const h = mapHeaders_(sheet, headerRow);
    const gmCol = h.get(normHeader_(CFG.PROGRAMACAO_HEADERS.greenMileStatus));
    const attCol = h.get(normHeader_(CFG.PROGRAMACAO_HEADERS.attemicsStatus));
    const clickupStatusCol = h.get(normHeader_(CFG.PROGRAMACAO_HEADERS.clickupStatus));
    const clickupCol = h.get(normHeader_(CFG.PROGRAMACAO_HEADERS.clickup));
    try { if (gmCol) sheet.setColumnWidth(gmCol, 120); } catch (e) {}
    try { if (attCol) sheet.setColumnWidth(attCol, 140); } catch (e) {}
    try { if (clickupStatusCol) sheet.setColumnWidth(clickupStatusCol, 140); } catch (e) {}
    try { if (clickupCol) sheet.setColumnWidth(clickupCol, 220); } catch (e) {}
  }

  let headers = mapHeaders_(sheet, headerRow);
  let notaCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.notaFiscal));
  if (!notaCol) throw new Error('Cabecalho Nota fiscal nao encontrado em ' + CFG.SHEET_PROGRAMACAO);

  let gmCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.greenMileStatus));
  let attCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.attemicsStatus));
  let clickupStatusCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.clickupStatus));
  let clickupCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.clickup));

  if (!gmCol && !attCol && !clickupStatusCol && !clickupCol) {
    sheet.insertColumnsBefore(notaCol, 4);
    sheet.getRange(headerRow, notaCol, 1, 4).setValues([[CFG.PROGRAMACAO_HEADERS.greenMileStatus, CFG.PROGRAMACAO_HEADERS.attemicsStatus, CFG.PROGRAMACAO_HEADERS.clickupStatus, CFG.PROGRAMACAO_HEADERS.clickup]]);
    applyWidths_();
    return;
  }

  headers = mapHeaders_(sheet, headerRow);
  notaCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.notaFiscal));
  gmCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.greenMileStatus));
  attCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.attemicsStatus));
  clickupStatusCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.clickupStatus));
  clickupCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.clickup));

  if (!gmCol) {
    const insertAt = attCol || notaCol;
    sheet.insertColumnBefore(insertAt);
    sheet.getRange(headerRow, insertAt).setValue(CFG.PROGRAMACAO_HEADERS.greenMileStatus);
  }

  headers = mapHeaders_(sheet, headerRow);
  notaCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.notaFiscal));
  attCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.attemicsStatus));
  if (!attCol) {
    sheet.insertColumnBefore(notaCol);
    sheet.getRange(headerRow, notaCol).setValue(CFG.PROGRAMACAO_HEADERS.attemicsStatus);
  }
  headers = mapHeaders_(sheet, headerRow);
  notaCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.notaFiscal));
  clickupStatusCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.clickupStatus));
  if (!clickupStatusCol) {
    sheet.insertColumnBefore(notaCol);
    sheet.getRange(headerRow, notaCol).setValue(CFG.PROGRAMACAO_HEADERS.clickupStatus);
  }
  headers = mapHeaders_(sheet, headerRow);
  notaCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.notaFiscal));
  clickupCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.clickup));
  if (!clickupCol) {
    sheet.insertColumnBefore(notaCol);
    sheet.getRange(headerRow, notaCol).setValue(CFG.PROGRAMACAO_HEADERS.clickup);
  }
  applyWidths_();
}

function shouldPreserveProgramacaoManualFields_(ctx) {
  const incoming = (ctx && ctx.incomingRow) || [];
  const existing = (ctx && ctx.existingRow) || [];
  // Assinatura da carga (sem campos manuais): COMPLEMENTO, PERFIL, DATA DE SAÍDA.
  const sigIncoming = [
    String(incoming[1] == null ? '' : incoming[1]).trim(),
    String(incoming[2] == null ? '' : incoming[2]).trim(),
    stringifyFingerprintCell_(incoming[3]),
  ].join('|');
  const sigExisting = [
    String(existing[1] == null ? '' : existing[1]).trim(),
    String(existing[2] == null ? '' : existing[2]).trim(),
    stringifyFingerprintCell_(existing[3]),
  ].join('|');
  return sigIncoming === sigExisting;
}

function setupProgramacaoAttemicsStatusColumn_() { return setupProgramacaoStatusColumns_(); }

function buildProgramacaoRowIndexByPlanoPlacaForAttemics_(sheet) {
  const sh = sheet || findRequiredColumns_().programacao.sheet;
  const cols = findRequiredColumns_();
  const pcols = cols.programacao;
  const out = {};
  const lastRow = sh.getLastRow();
  const lastCol = sh.getLastColumn();
  if (lastRow < pcols.headerRow + 1 || lastCol < 1) return out;
  const planoCol = getHeaderColRequired_(mapHeaders_(sh, pcols.headerRow), ['PLANOS'], 'Programacao');
  const rows = sh.getRange(pcols.headerRow + 1, 1, lastRow - pcols.headerRow, lastCol).getDisplayValues();
  for (let r = 0; r < rows.length; r++) {
    const rr = rows[r];
    const k = buildAttemicsPlanoPlacaKey_(rr[planoCol - 1], rr[pcols.placaCol - 1]);
    if (!k) continue;
    if (!out[k]) out[k] = pcols.headerRow + 1 + r;
  }
  return out;
}

function setProgramacaoAttemicsStatusCell_(sheet, rowNumber, colNumber, stateObj) {
  if (!sheet || !rowNumber || !colNumber || !stateObj) return;
  const cell = sheet.getRange(rowNumber, colNumber);
  if (stateObj.clearVisual) {
    cell.clearContent();
    try { cell.setBackground(null); } catch (e) {}
    cell.clearNote();
    return;
  }
  cell.setValue(stateObj.label || '');
  try { cell.setBackground(null); } catch (e) {}
  cell.setFontColor(stateObj.fg || '#1F1F1F');
  cell.setFontWeight('bold');
  cell.setHorizontalAlignment('center');
  cell.setVerticalAlignment('middle');
  cell.setWrap(false);
  if (stateObj.note) cell.setNote(String(stateObj.note));
  else cell.clearNote();
}

function computeAttemicsProgramacaoVisualStateFromLogRows_(rows, dateRef, planoPlacaKey) {
  const palette = getAttemicsStatusVisualPalette_();
  let firstSent = false;
  let secondSent = false;
  let secondDispensed = false;
  let hasApiError = false;
  let lastReason = '';
  for (let i = 0; i < (rows || []).length; i++) {
    const row = rows[i];
    const dref = String(row[1] || '').trim();
    const tipo = String(row[3] || '').trim();
    const status = String(row[15] || '').trim();
    const key = String(row[25] || '').trim() || buildAttemicsPlanoPlacaKey_(row[4], row[7]);
    if (dref !== String(dateRef || '').trim()) continue;
    if (!tipo || tipo.indexOf('EXEC_') === 0 || tipo.indexOf('PREVIA_') === 0) continue;
    if (key !== String(planoPlacaKey || '').trim()) continue;
    if (tipo === 'PRIMEIRA_610' || tipo === 'PRIMEIRA_REENTREGA') {
      if (status === 'ENVIADO_OK') firstSent = true;
    }
    if (tipo === 'SEGUNDA_HORARIO') {
      if (status === 'ENVIADO_OK') secondSent = true;
      if (status === 'IGNORADO_HORARIO_JA_ENVIADO_NA_PRIMEIRA') secondDispensed = true;
    }
    if (status === 'ERRO_HTTP' || status === 'ERRO_EXCECAO') hasApiError = true;
    lastReason = status || lastReason;
  }
  if (firstSent && (secondSent || secondDispensed)) {
    const st = Object.assign({}, palette.ENVIADO);
    st.note = secondDispensed ? '2a dispensada: horario ja enviado na 1a' : 'Fluxo WhatsApp concluido';
    return st;
  }
  if (hasApiError) {
    const st = Object.assign({}, palette.ERRO_API);
    st.note = 'Erro de API WhatsApp';
    return st;
  }
  if (firstSent) {
    const st = Object.assign({}, palette.PARCIAL);
    st.note = '1a enviada; 2a pendente/nao enviada';
    return st;
  }
  const st = Object.assign({}, palette.NAO_ENVIADO);
  st.note = lastReason ? ('Ultimo status: ' + lastReason) : 'Nenhum envio realizado hoje';
  return st;
}

function refreshProgramacaoAttemicsStatusFromLog_(options) {
  const opts = options || {};
  const ss = opts.ss || SpreadsheetApp.getActiveSpreadsheet();
  const dateRef = String(opts.dateRef || formatDateRefBR_(new Date()));
  const plano = opts.plano;
  const placa = opts.placa;
  const planoPlacaKey = String(opts.planoPlacaKey || buildAttemicsPlanoPlacaKey_(plano, placa)).trim();
  if (!planoPlacaKey) return false;
  setupProgramacaoColumns();
  setupProgramacaoAttemicsStatusColumn_();
  const cols = findRequiredColumns_();
  const shProg = cols.programacao.sheet;
  const rowMap = buildProgramacaoRowIndexByPlanoPlacaForAttemics_(shProg);
  let rowNumber = 0;
  const candidateRow = Number(opts.rowProgramacao) || 0;
  if (candidateRow > cols.programacao.headerRow) {
    try {
      const planoCol = getHeaderColRequired_(mapHeaders_(shProg, cols.programacao.headerRow), ['PLANOS'], 'Programacao');
      const planoCell = shProg.getRange(candidateRow, planoCol).getDisplayValue();
      const placaCell = shProg.getRange(candidateRow, cols.programacao.placaCol).getDisplayValue();
      const candidateKey = buildAttemicsPlanoPlacaKey_(planoCell, placaCell);
      if (candidateKey && candidateKey === planoPlacaKey) rowNumber = candidateRow;
    } catch (e) {}
  }
  if (!rowNumber) rowNumber = rowMap[planoPlacaKey];
  if (!rowNumber) return false;
  const logSheet = ensureAttemicsLogSheet_(ss);
  const lastRow = logSheet.getLastRow();
  if (lastRow < 2) {
    setProgramacaoAttemicsStatusCell_(shProg, rowNumber, cols.programacao.attemicsStatusCol, Object.assign({}, getAttemicsStatusVisualPalette_().NAO_ENVIADO, { note: 'Sem log Attemics' }));
    return true;
  }
  const logRows = logSheet.getRange(2, 1, lastRow - 1, getAttemicsLogHeaders_().length).getDisplayValues();
  const stateObj = computeAttemicsProgramacaoVisualStateFromLogRows_(logRows, dateRef, planoPlacaKey);
  setProgramacaoAttemicsStatusCell_(shProg, rowNumber, cols.programacao.attemicsStatusCol, stateObj);
  return true;
}

function maybeSyncProgramacaoAttemicsStatusFromLogRow_(logRowObj) {
  const row = logRowObj || {};
  const tipo = String(row.TipoMensagem || '');
  if (!tipo || tipo.indexOf('EXEC_') === 0 || tipo.indexOf('PREVIA_') === 0) return;
  const planoPlacaKey = String(row.ChavePlanoPlaca || buildAttemicsPlanoPlacaKey_(row.Plano, row.Placa)).trim();
  if (!planoPlacaKey) return;
  const ok = refreshProgramacaoAttemicsStatusFromLog_({
    dateRef: row.DataRef || formatDateRefBR_(new Date()),
    planoPlacaKey: planoPlacaKey,
    rowProgramacao: row.RowProgramacao || '',
    plano: row.Plano || '',
    placa: row.Placa || '',
  });
  if (ok) {
    ATTEMICS_STATUS_SYNC_COUNTER_ = (ATTEMICS_STATUS_SYNC_COUNTER_ || 0) + 1;
    if (ATTEMICS_STATUS_SYNC_COUNTER_ % 10 === 0) SpreadsheetApp.flush();
  }
}

function reconstruirStatusAttemicsProgramacaoHoje() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const logSheet = ensureAttemicsLogSheet_(ss);
  const lastRow = logSheet.getLastRow();
  if (lastRow < 2) { toast_(ss, 'LOG_ATTEMICS sem dados.'); return; }
  setupProgramacaoColumns();
  setupProgramacaoAttemicsStatusColumn_();
  const cols = findRequiredColumns_();
  const shProg = cols.programacao.sheet;
  const startRow = cols.programacao.headerRow + 1;
  const lastProgRow = shProg.getLastRow();
  if (lastProgRow >= startRow && cols.programacao.attemicsStatusCol) {
    const clearRange = shProg.getRange(startRow, cols.programacao.attemicsStatusCol, lastProgRow - startRow + 1, 1);
    clearRange.clearContent();
    try { clearRange.setBackground(null); } catch (e) {}
    clearRange.clearNote();
  }
  const values = logSheet.getRange(2, 1, lastRow - 1, getAttemicsLogHeaders_().length).getDisplayValues();
  const dateRef = formatDateRefBR_(new Date());
  const keys = {};
  for (let i = 0; i < values.length; i++) {
    if (String(values[i][1] || '') !== dateRef) continue;
    const k = String(values[i][25] || '').trim() || buildAttemicsPlanoPlacaKey_(values[i][4], values[i][7]);
    if (k) keys[k] = true;
  }
  const list = Object.keys(keys);
  for (let i = 0; i < list.length; i++) {
    refreshProgramacaoAttemicsStatusFromLog_({ ss: ss, dateRef: dateRef, planoPlacaKey: list[i] });
    if ((i + 1) % 10 === 0) SpreadsheetApp.flush();
  }
  SpreadsheetApp.flush();
  toast_(ss, 'Status Attemics reconstruido: ' + list.length + ' linha(s).');
}

function getSheetDataRowsDisplay_(sheet, totalCols, headerRow) {
  const hdrRow = Math.max(1, Number(headerRow) || 1);
  const lastRow = sheet.getLastRow();
  if (lastRow < hdrRow + 1) return [];
  return sheet.getRange(hdrRow + 1, 1, lastRow - hdrRow, totalCols).getDisplayValues();
}

function findFirstEmptyRowInColumn_(sheet, column, startRow) {
  const col = Math.max(1, Number(column) || 1);
  const firstRow = Math.max(1, Number(startRow) || 1);
  const lastRow = sheet.getLastRow();
  if (lastRow < firstRow) return firstRow;
  const values = sheet.getRange(firstRow, col, lastRow - firstRow + 1, 1).getDisplayValues();
  for (let i = 0; i < values.length; i++) {
    if (!String(values[i][0] == null ? '' : values[i][0]).trim()) return firstRow + i;
  }
  return lastRow + 1;
}

function getHeaderColOptional_(headerMap, aliases) {
  for (let i = 0; i < aliases.length; i++) {
    const alias = String(aliases[i] || '');
    const col = headerMap.get(normalizeHeader_(alias)) || headerMap.get(normHeader_(alias));
    if (col) return col;
  }
  return 0;
}

function getDisponibilidadeObservacaoReasons_() {
  return [
    'Veículo em manutenção',
    'Veículo já carregado / em viagem',
    'Problema com documentação',
    'Indisponibilidade pessoal',
    'Problema de saúde',
    'Descanso obrigatório (Lei do motorista)',
    'Condutor não responde aos contatos',
    'Distância ou prazo inviável',
    'Recusa operacional',
    'Pane ou avaria no veículo'
  ];
}

function buildDisponibilidadeStatusOptions_(sheet, statusCol, headerRow) {
  const lastRow = sheet.getLastRow();
  const values = lastRow > headerRow
    ? sheet.getRange(headerRow + 1, statusCol, lastRow - headerRow, 1).getDisplayValues()
    : [];
  
  // Opções padrão que DEVEM existir
  const standardOptions = ['Programado', 'Disponível', 'Indisponível'];
  const seenNorm = {};
  standardOptions.forEach(opt => seenNorm[normalizeHeader_(opt)] = true);
  
  const out = [...standardOptions];
  
  for (let i = 0; i < values.length; i++) {
    const raw = String(values[i][0] == null ? '' : values[i][0]).trim();
    if (!raw) continue;
    
    const norm = normalizeHeader_(raw);
    if (!norm || seenNorm[norm]) continue;
    seenNorm[norm] = true;
    out.push(raw);
  }
  
  return out;
}

function ensureDisponibilidadeObservacaoValidation_() {
  const ss = SpreadsheetApp.getActive();
  let sh = findSheetCaseInsensitive_(ss, 'DISPONIBILIDADE');
  if (!sh) sh = findSheetCaseInsensitive_(ss, 'THX');
  if (!sh) sh = findSheetCaseInsensitive_(ss, 'DISPONIBILIDADE THX');
  
  if (!sh) return;
  const headerRow = getDisponibilidadeHeaderRow_();
  const hmap = mapHeaders_(sh, headerRow);
  const cObs = getHeaderColOptional_(hmap, ['OBSERVACAO', 'OBSERVAÇÃO']);
  if (!cObs) return;
  const dv = SpreadsheetApp.newDataValidation()
    .requireValueInList(getDisponibilidadeObservacaoReasons_(), true)
    .build();
  const maxRows = sh.getMaxRows();
  sh.getRange(headerRow + 1, cObs, Math.max(1, maxRows - headerRow), 1).setDataValidation(dv);
}

function ensureDisponibilidadeStatusValidation_() {
  const ss = SpreadsheetApp.getActive();
  // Busca robusta que aceita 'THX' ou 'DISPONIBILIDADE'
  let sh = findSheetCaseInsensitive_(ss, 'DISPONIBILIDADE');
  if (!sh) sh = findSheetCaseInsensitive_(ss, 'THX');
  if (!sh) sh = findSheetCaseInsensitive_(ss, 'DISPONIBILIDADE THX');
  
  if (!sh) return;
  const headerRow = getDisponibilidadeHeaderRow_();
  const hmap = mapHeaders_(sh, headerRow);
  const cStatus = getHeaderColOptional_(hmap, ['DISPONIBILIDADE']);
  if (!cStatus) return;
  const options = buildDisponibilidadeStatusOptions_(sh, cStatus, headerRow);
  const dv = SpreadsheetApp.newDataValidation()
    .requireValueInList(options, true)
    .build();
  const maxRows = sh.getMaxRows();
  sh.getRange(headerRow + 1, cStatus, Math.max(1, maxRows - headerRow), 1).setDataValidation(dv);
  ensureDisponibilidadeStatusConditionalFormatting_(sh, cStatus, headerRow);
}

function columnToLetter_(col) {
  let n = Math.max(1, Number(col) || 1);
  let out = '';
  while (n > 0) {
    const m = (n - 1) % 26;
    out = String.fromCharCode(65 + m) + out;
    n = Math.floor((n - 1) / 26);
  }
  return out;
}

function ensureDisponibilidadeStatusConditionalFormatting_(sheet, statusCol, headerRow) {
  const maxRows = sheet.getMaxRows();
  const startRow = headerRow + 1;
  const range = sheet.getRange(startRow, statusCol, Math.max(1, maxRows - startRow + 1), 1);
  const colLetter = columnToLetter_(statusCol);
  
  // Limpa regras existentes apenas para esse range para evitar duplicidade
  const currentRules = sheet.getConditionalFormatRules();
  const otherRules = currentRules.filter(r => {
    const ranges = r.getRanges();
    return !ranges.some(rng => rng.getA1Notation() === range.getA1Notation());
  });

  // Regras com alta prioridade (no topo da lista)
  const ruleProg = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Programado")
    .setBackground('#FBFF00') // Amarelo Vivo (mais intenso que o anterior)
    .setRanges([range])
    .build();

  const formulaDisp = '=REGEXMATCH($' + colLetter + startRow + ',"(?i)^DISPON[IÍ]VEL")';
  const formulaIndisp = '=REGEXMATCH($' + colLetter + startRow + ',"(?i)^INDISPON[IÍ]VEL")';
  
  const ruleDisp = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(formulaDisp)
    .setBackground('#c6efce') // Verde
    .setRanges([range])
    .build();
    
  const ruleIndisp = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(formulaIndisp)
    .setBackground('#ffc7ce') // Vermelho
    .setRanges([range])
    .build();
    
  // Prepend as novas regras para garantir prioridade máxima
  sheet.setConditionalFormatRules([ruleProg, ruleDisp, ruleIndisp].concat(otherRules));
}

function buildDisponibilidadeContatoIndexForAttemics_() {
  const cols = findRequiredColumns_();
  const sheet = cols.disponibilidade.sheet;
  const headerRow = cols.disponibilidade.headerRow;
  const headerMap = mapHeaders_(sheet, headerRow);
  const cPlaca = getHeaderColOptional_(headerMap, ['PLACA']);
  const cMotorista = getHeaderColOptional_(headerMap, ['MOTORISTA']);
  const cContato = getHeaderColOptional_(headerMap, ['CONTATO', 'CONTATO MOTORISTA', 'TELEFONE']);
  const index = { byPlate: {}, byMotorista: {} };
  if (!cContato || (!cPlaca && !cMotorista)) return index;
  const rows = getSheetDataRowsDisplay_(sheet, sheet.getLastColumn(), headerRow);
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const contato = sanitizePhoneForAttemics_(row[cContato - 1]);
    if (!contato) continue;
    const placaKey = cPlaca ? normalizePlate_(row[cPlaca - 1]) : '';
    const motoristaKey = cMotorista ? normalizeTextLoose_(row[cMotorista - 1]) : '';
    if (placaKey && !index.byPlate[placaKey]) index.byPlate[placaKey] = contato;
    if (motoristaKey && !index.byMotorista[motoristaKey]) index.byMotorista[motoristaKey] = contato;
  }
  return index;
}

function buildAttemicsMessageRowsByPlano_(options) {
  const opts = options || {};
  const ss = opts.ss || SpreadsheetApp.getActiveSpreadsheet();
  const shProg = findSheetCaseInsensitive_(ss, 'PROGRAMACAO');
  const shMsg = findSheetCaseInsensitive_(ss, 'PROGRAMACAO_MENSAGEM_BASE');
  if (!shProg) throw new Error('Aba Programação não encontrada.');
  if (!shMsg) throw new Error('Aba Programação_Mensagem_Base não encontrada.');

  const progHeaderRow = getProgramacaoHeaderRow_();
  const progHeaderMap = mapHeaders_(shProg, progHeaderRow);
  const msgHeaderMap = mapHeaders_(shMsg, 1);
  const cProgPlanos = getHeaderColRequired_(progHeaderMap, ['PLANOS'], 'Programacao');
  const cProgComp = getHeaderColRequired_(progHeaderMap, ['COMPLEMENTO'], 'Programacao');
  const cProgPerfil = getHeaderColOptional_(progHeaderMap, ['PERFIL']);
  const cProgDataSaida = getHeaderColRequired_(progHeaderMap, ['DATA DE SAIDA', 'DATA DE SAÍDA'], 'Programacao');
  const cProgDataCarr = getHeaderColOptional_(progHeaderMap, ['DATA DE CARREGAMENTO']);
  const cProgFaixa = getHeaderColOptional_(progHeaderMap, ['FAIXA DE AGENDA']);
  const cProgZona = getHeaderColOptional_(progHeaderMap, ['ZONA']);
  const cProgPlaca = getHeaderColRequired_(progHeaderMap, ['PLACA'], 'Programacao');
  const cProgMotorista = getHeaderColRequired_(progHeaderMap, ['MOTORISTA'], 'Programacao');
  const cProgNota = getHeaderColOptional_(progHeaderMap, ['NOTA FISCAL']);

  const cMsgPlanos = getHeaderColRequired_(msgHeaderMap, ['PLANOS'], 'Programacao_Mensagem_Base');
  const cMsgHora = getHeaderColOptional_(msgHeaderMap, ['HORARIO AGENDA', 'HORÁRIO AGENDA']);
  const cMsgSenha = getHeaderColOptional_(msgHeaderMap, ['SENHA/PROTOC.', 'SENHA/PROTOC', 'SENHA PROTOC', 'SENHA']);
  const cMsgQtd = getHeaderColOptional_(msgHeaderMap, ['QUANTIDADE DE ENTREGAS']);
  const cMsgPeso = getHeaderColOptional_(msgHeaderMap, ['PESO']);
  const cMsgValor = getHeaderColOptional_(msgHeaderMap, ['VALOR']);
  const cMsgCidade = getHeaderColOptional_(msgHeaderMap, ['CIDADES', 'CIDADE']);
  const cMsgBairros = getHeaderColOptional_(msgHeaderMap, ['BAIRROS']);

  const progRows = getSheetDataRowsDisplay_(shProg, shProg.getLastColumn(), progHeaderRow);
  const msgRows = getSheetDataRowsDisplay_(shMsg, shMsg.getLastColumn(), 1);
  const msgCols = { cMsgHora: cMsgHora, cMsgSenha: cMsgSenha, cMsgQtd: cMsgQtd, cMsgPeso: cMsgPeso, cMsgValor: cMsgValor, cMsgCidade: cMsgCidade, cMsgBairros: cMsgBairros };
  const msgIndex = buildMensagemBaseIndexAttemics_(msgRows, cMsgPlanos, msgCols);

  const contatoIndex = buildDisponibilidadeContatoIndexForAttemics_();
  const attCfg = getAttemicsConfig_();
  const testNumber = sanitizePhoneForAttemics_(opts.forcedNumber || attCfg.TEST_NUMBER);
  const rows = [];

  for (let i = 0; i < progRows.length; i++) {
    const p = progRows[i];
    const plano = String(p[cProgPlanos - 1] || '').trim();
    if (!plano) continue;
    const planoKey = normalizePlanoDigitsKey_(plano);
    const msgMatch = resolveMensagemBaseRowByPlanoAttemics_(msgIndex.byPlanoDigits || {}, planoKey) || null;
    const msg = msgMatch && msgMatch.row ? msgMatch.row : [];
    const placa = String(p[cProgPlaca - 1] || '').trim();
    const motorista = String(p[cProgMotorista - 1] || '').trim();
    const placaKey = normalizePlate_(placa);
    const motoristaKey = normalizeTextLoose_(motorista);
    const telefoneOriginal = placaKey && contatoIndex.byPlate[placaKey]
      ? contatoIndex.byPlate[placaKey]
      : (motoristaKey && contatoIndex.byMotorista[motoristaKey] ? contatoIndex.byMotorista[motoristaKey] : '');
    rows.push({
      planoKey: planoKey || plano,
      plano: plano,
      complemento: String(p[cProgComp - 1] || '').trim(),
      perfil: cProgPerfil ? String(p[cProgPerfil - 1] || '').trim() : '',
      motorista: motorista,
      placa: placa,
      telefoneOriginal: telefoneOriginal,
      telefoneDestino: testNumber,
      dataSaida: String(p[cProgDataSaida - 1] || '').trim(),
      dataCarregamento: cProgDataCarr ? String(p[cProgDataCarr - 1] || '').trim() : '',
      faixaAgendaProgramacao: cProgFaixa ? String(p[cProgFaixa - 1] || '').trim() : '',
      agendaCarregamento: (cProgFaixa ? String(p[cProgFaixa - 1] || '').trim() : '') || (cMsgHora ? String(msg[cMsgHora - 1] || '').trim() : ''),
      horarioAgendaMsgBase: cMsgHora ? String(msg[cMsgHora - 1] || '').trim() : '',
      regiao: cProgZona ? String(p[cProgZona - 1] || '').trim() : '',
      cidade: cMsgCidade ? String(msg[cMsgCidade - 1] || '').trim() : '',
      bairros: cMsgBairros ? String(msg[cMsgBairros - 1] || '').trim() : '',
      senhaProtocolo: cMsgSenha ? String(msg[cMsgSenha - 1] || '').trim() : '',
      peso: cMsgPeso ? String(msg[cMsgPeso - 1] || '').trim() : '',
      valor: cMsgValor ? String(msg[cMsgValor - 1] || '').trim() : '',
      entregas: cMsgQtd ? String(msg[cMsgQtd - 1] || '').trim() : '',
      notaFiscal: cProgNota ? String(p[cProgNota - 1] || '').trim() : '',
      isPlano610: String(plano).indexOf('610') === 0,
      rowProgramacao: progHeaderRow + 1 + i,
      msgBaseMatched: !!msgMatch,
      msgBaseRowIndex: msgMatch ? msgMatch.rowIndex : '',
      msgBasePlanoRaw: msgMatch ? msgMatch.planoRaw : '',
      _attMsgResumo: '',
    });
    rows[rows.length - 1]._attMsgResumo = describeMensagemBaseMatchAttemics_(rows[rows.length - 1]);
  }
  return rows;
}

function appendLocalizacaoMensagemTHX_(parts, row) {
  if (!parts || !row) return;
  if (row.regiao) parts.push('\u2022 Regi\u00e3o: ' + row.regiao);
  if (row.cidade) parts.push('\u2022 Cidade(s): ' + row.cidade);
  if (row.bairros) parts.push('\u2022 Bairro(s): ' + row.bairros);
}

function buildAttemicsPrimeiraMensagemTexto_(row) {
  const parts = [];
  if (row && row.isSemPlano) {
    parts.push('\u26a0\ufe0f *ATUALIZACAO DE ESCALA*');
    parts.push('');
    parts.push('Ola ' + (row.motorista || 'motorista') + ',');
    parts.push('No momento voce esta *sem plano/carga* na programacao.');
    parts.push('Voce *pode ser chamado no segundo corte*.');
    parts.push('');
    parts.push('\u2022 Placa: *' + (row.placa || '-') + '*');
    if (row.perfil) parts.push('\u2022 Perfil: ' + row.perfil);
    parts.push('');
    parts.push('Permane\u00e7a dispon\u00edvel e aguarde orientacao do responsavel.');
    parts.push('Qualquer duvida, entre em contato: 41 9231-2058 (KLEBER)');
    return parts.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }
  const plano = String((row && row.plano) || '').trim();
  if (!plano) throw new Error('Plano vazio para primeira mensagem');

  const horarioCarregamento = String((row && row.faixaAgendaProgramacao) || '').trim();
  const horarioAgendamento = String((row && row.horarioAgendaMsgBase) || '').trim();

  if (row.isPlano610) {
    parts.push('\u{1f69a} *INFORMA\u00c7\u00d5ES DA CARGA*');
    parts.push('');
    parts.push('\u{1f4e6} *Carga*');
    parts.push('\u2022 Plano: *' + plano + '*');
    if (row.complemento) parts.push('\u2022 Complemento: ' + row.complemento);
    if (row.dataCarregamento) parts.push('\u2022 Data de carregamento: ' + row.dataCarregamento);
    if (row.dataSaida) parts.push('\u2022 Data de entrega: ' + row.dataSaida);
    if (row.entregas) parts.push('\u2022 Quantidade de entregas: ' + row.entregas);
    if (row.peso) parts.push('\u2022 Peso: ' + row.peso);
    if (row.valor) parts.push('\u2022 Valor: ' + row.valor);

    if (horarioCarregamento) {
      parts.push('');
      parts.push('\u23f0 *Hor\u00e1rio de carregamento*');
      parts.push('\u2022 ' + horarioCarregamento);
    }

    if (row.senhaProtocolo || horarioAgendamento) {
      parts.push('');
      parts.push('\u{1f5d3}\ufe0f *Agendamento*');
      if (row.senhaProtocolo) parts.push('\u2022 Senha/Protocolo: ' + row.senhaProtocolo);
      if (horarioAgendamento) parts.push('\u2022 Hor\u00e1rio de agendamento: ' + horarioAgendamento);
    }

    if (row.regiao || row.cidade || row.bairros) {
      parts.push('');
      parts.push('\u{1f4cd} *Rota / Localiza\u00e7\u00e3o*');
      if (row.regiao) parts.push('\u2022 Regi\u00e3o: ' + row.regiao);
      if (row.cidade) parts.push('\u2022 Cidade(s): ' + row.cidade);
      if (row.bairros) parts.push('\u2022 Bairro(s): ' + row.bairros);
    }

    parts.push('');
    parts.push('\u26a0\ufe0f Plano de Viagem sujeito a altera\u00e7\u00e3o, *OBRIGAT\u00d3RIO responder com ok via mensagem para o numero: 41 9231-2058 (KLEBER)*');
  } else {
    parts.push('\u{1f501} *REENTREGA - AVISO DE CARREGAMENTO*');
    parts.push('');
    parts.push('Ol\u00e1 ' + (row.motorista || 'motorista') + ',');
    parts.push('Informamos que voc\u00ea seguir\u00e1 com uma *Reentrega*.');
    parts.push('');
    parts.push('\u{1f4e6} *Carga*');
    parts.push('\u2022 Plano: *' + plano + '*');
    if (row.complemento) parts.push('\u2022 Complemento: ' + row.complemento);
    if (row.entregas) parts.push('\u2022 Quantidade de entregas: ' + row.entregas);

    if (horarioCarregamento) {
      parts.push('');
      parts.push('\u23f0 *Hor\u00e1rio de carregamento*');
      parts.push('\u2022 ' + horarioCarregamento);
    }

    if (row.senhaProtocolo || horarioAgendamento) {
      parts.push('');
      parts.push('\u{1f5d3}\ufe0f *Agendamento*');
      if (row.senhaProtocolo) parts.push('\u2022 Senha/Protocolo: ' + row.senhaProtocolo);
      if (horarioAgendamento) parts.push('\u2022 Hor\u00e1rio de agendamento: ' + horarioAgendamento);
    }

    parts.push('');
    parts.push('\u2705 *Favor confirmar o recebimento.* *OBRIGAT\u00d3RIO responder com ok via mensagem para o numero: 41 9231-2058 (KLEBER)*');
  }

  return parts.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
function buildAttemicsSegundaMensagemTexto_(row) {
  const plano = String((row && row.plano) || '').trim();
  if (!plano) throw new Error('Plano vazio para segunda mensagem');
  if (!String((row && row.agendaCarregamento) || '').trim()) throw new Error('Agenda de carregamento vazia');

  const temHorarioCarregamento = !!String((row && row.faixaAgendaProgramacao) || '').trim();
  const rotuloHorario = temHorarioCarregamento ? 'Hor\u00e1rio de carregamento' : 'Hor\u00e1rio de agendamento';

  const parts = [
    '\u23f0 *HOR\u00c1RIO*',
    '',
    'Ol\u00e1 ' + (row.motorista || 'motorista') + ',',
    '',
    '\u{1f4e6} Plano: *' + plano + '*',
    '\u23f0 ' + rotuloHorario + ': *' + row.agendaCarregamento + '*',
  ];
  if (row.dataCarregamento) {
    parts.push('\u{1f4c5} Data de carregamento: *' + row.dataCarregamento + '*');
  }
  if (row.complemento || row.senhaProtocolo) {
    parts.push('');
    if (row.complemento) parts.push('\u2022 Complemento: ' + row.complemento);
    if (row.senhaProtocolo) parts.push('\u2022 Senha/Protocolo: ' + row.senhaProtocolo);
  }
  parts.push('');
  parts.push('*Por favor, esteja dispon\u00edvel no hor\u00e1rio indicado.*');
  parts.push('Qualquer d\u00favida, entre em contato: 41 9231-2058 (KLEBER)');
  return parts.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
function sanitizeMessageTextForAttemics_(text) {
  return String(text == null ? '' : text)
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\t/g, ' ')
    .trim();
}

function sanitizePhoneForAttemics_(value) {
  const raw = String(value == null ? '' : value).trim();
  if (!raw) return '';
  const matches = raw.match(/\d+/g);
  if (!matches || !matches.length) return '';
  for (let i = 0; i < matches.length; i++) {
    const digits = matches[i].replace(/\D/g, '');
    if (digits.length >= 10 && digits.length <= 13) return digits;
  }
  const all = raw.replace(/\D/g, '');
  if (all.length >= 10) return all;
  return '';
}

function normalizePlanoDigitsKey_(value) {
  return normalizePlanoKeyForMatch_(value);
}

function hasAttemicsMsgBaseEnrichment_(row) {
  if (!row) return false;
  return !!(
    row.senhaProtocolo ||
    row.horarioAgendaMsgBase ||
    row.entregas ||
    row.peso ||
    row.valor ||
    row.cidade ||
    row.bairros
  );
}

function isRodizioAttemics_(row) {
  const perfil = normalizeHeader_((row && row.perfil) || '');
  return perfil.indexOf('RODIZIO') !== -1 || perfil.indexOf('RODIZIO') !== -1;
}

function getAttemicsPrimeiraCamposFaltantes_(row) {
  const obrigatorios = [];
  const complementares = [];
  if (row && row.isSemPlano) {
    if (!String((row && row.placa) || '').trim()) obrigatorios.push('placa');
    return { obrigatorios: obrigatorios, complementares: complementares };
  }
  if (!String((row && row.plano) || '').trim()) obrigatorios.push('plano');
  if (!String((row && row.dataSaida) || '').trim()) obrigatorios.push('data_saida');
  if (!String((row && row.dataCarregamento) || '').trim()) complementares.push('data_carregamento');
  if (!String((row && row.senhaProtocolo) || '').trim()) complementares.push('senha_agendamento');
  if (!String((row && (row.horarioAgendaMsgBase || row.faixaAgendaProgramacao || row.agendaCarregamento)) || '').trim()) complementares.push('horario_agendamento');

  if (!String((row && row.complemento) || '').trim()) complementares.push('complemento');
  if (!String((row && row.entregas) || '').trim()) complementares.push('quantidade_entregas');
  if (!String((row && row.peso) || '').trim()) complementares.push('peso');
  if (!String((row && row.valor) || '').trim()) complementares.push('valor');
  if (!String((row && row.regiao) || '').trim()) complementares.push('regiao');
  if (!String((row && row.cidade) || '').trim()) complementares.push('cidades');
  if (!String((row && row.bairros) || '').trim()) complementares.push('bairros');
  return { obrigatorios: obrigatorios, complementares: complementares };
}

function hasPrimeiraMensagemComHorarioHoje_(logSheet, planoPlacaKey, dateRef, state) {
  const dref = String(dateRef || '').trim();
  const key = String(planoPlacaKey || '').trim();
  if (!dref || !key) return false;
  if (state && state.sentFirstWithHorarioByPlanoDia) {
    return !!state.sentFirstWithHorarioByPlanoDia[dref + '|' + key];
  }
  const values = logSheet.getDataRange().getValues();
  if (!values || values.length < 2) return false;
  const headers = values[0];
  const idx = {};
  for (let i = 0; i < headers.length; i++) idx[String(headers[i] || '')] = i;
  const iDataRef = idx.DataRef;
  const iTipo = idx.TipoMensagem;
  const iPlano = idx.Plano;
  const iStatus = idx.Status;
  const iPreview = idx.MessagePreview;
  if ([iDataRef, iTipo, iPlano, iStatus, iPreview].some(function (x) { return x == null; })) return false;
  for (let r = values.length - 1; r >= 1; r--) {
    const row = values[r];
    if (String(row[iDataRef] || '') !== dref) continue;
    const tipo = String(row[iTipo] || '');
    if (tipo !== 'PRIMEIRA_610' && tipo !== 'PRIMEIRA_REENTREGA') continue;
    if (buildAttemicsPlanoPlacaKey_(row[iPlano], row[7]) !== key) continue;
    if (String(row[iStatus] || '') !== 'ENVIADO_OK') continue;
    const msg = String(row[iPreview] || '');
    if (msg.indexOf('Hor\u00e1rio de carregamento:') !== -1) return true;
  }
  return false;
}

function buildAttemicsSegundaMensagemAlteracaoTexto_(row, agendaAnterior) {
  const plano = String((row && row.plano) || '').trim();
  if (!plano) throw new Error('Plano vazio para segunda mensagem');
  if (!String((row && row.agendaCarregamento) || '').trim()) throw new Error('Agenda de carregamento vazia');
  const temHorarioCarregamento = !!String((row && row.faixaAgendaProgramacao) || '').trim();
  const rotuloHorario = temHorarioCarregamento ? 'Hor\u00e1rio de carregamento' : 'Hor\u00e1rio de agendamento';
  const parts = [
    '\u26a0\ufe0f *ALTERA\u00c7\u00c3O DE HOR\u00c1RIO*',
    '',
    'Ol\u00e1 ' + (row.motorista || 'motorista') + ',',
    '',
    '\u{1f4e6} Plano: *' + plano + '*',
  ];
  if (agendaAnterior) parts.push('\u23ea Hor\u00e1rio anterior: *' + agendaAnterior + '*');
  parts.push('\u23f0 Novo ' + rotuloHorario.toLowerCase() + ': *' + row.agendaCarregamento + '*');
  if (row.dataCarregamento) parts.push('\u{1f4c5} Data de carregamento: *' + row.dataCarregamento + '*');
  if (row.complemento || row.senhaProtocolo) {
    parts.push('');
    if (row.complemento) parts.push('\u2022 Complemento: ' + row.complemento);
    if (row.senhaProtocolo) parts.push('\u2022 Senha/Protocolo: ' + row.senhaProtocolo);
  }
  parts.push('');
  parts.push('*Aten\u00e7\u00e3o: houve altera\u00e7\u00e3o no hor\u00e1rio informado anteriormente.*');
  parts.push('Qualquer d\u00favida, entre em contato: 41 9231-2058 (KLEBER)');
  return parts.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function syncProgramacaoPlacaMotoristaParaMensagemBaseAttemics_(options) {
  const opts = options || {};
  const ss = opts.ss || SpreadsheetApp.getActiveSpreadsheet();
  const shProg = findSheetCaseInsensitive_(ss, 'PROGRAMACAO');
  const shMsg = findSheetCaseInsensitive_(ss, 'PROGRAMACAO_MENSAGEM_BASE');
  if (!shProg || !shMsg) return { ok: false, skipped: true, reason: 'sheet_missing' };

  const progHeaderRow = getProgramacaoHeaderRow_();
  const progHeaderMap = mapHeaders_(shProg, progHeaderRow);
  const cProgPlanos = getHeaderColRequired_(progHeaderMap, ['PLANOS'], 'Programacao');
  const cProgPlaca = getHeaderColRequired_(progHeaderMap, ['PLACA'], 'Programacao');
  const cProgMotorista = getHeaderColRequired_(progHeaderMap, ['MOTORISTA'], 'Programacao');

  let msgHeaderMap = mapHeaders_(shMsg, 1);
  const cMsgPlanos = getHeaderColRequired_(msgHeaderMap, ['PLANOS'], 'Programacao_Mensagem_Base');
  let cMsgPlaca = getHeaderColOptional_(msgHeaderMap, ['PLACA']);
  let cMsgMotorista = getHeaderColOptional_(msgHeaderMap, ['MOTORISTA']);

  if (!cMsgPlaca || !cMsgMotorista) {
    const lastCol = Math.max(1, shMsg.getLastColumn());
    let nextCol = lastCol + 1;
    if (!cMsgPlaca) {
      shMsg.getRange(1, nextCol).setValue('PLACA');
      cMsgPlaca = nextCol;
      nextCol++;
    }
    if (!cMsgMotorista) {
      shMsg.getRange(1, nextCol).setValue('MOTORISTA');
      cMsgMotorista = nextCol;
    }
    msgHeaderMap = mapHeaders_(shMsg, 1);
    cMsgPlaca = cMsgPlaca || getHeaderColOptional_(msgHeaderMap, ['PLACA']);
    cMsgMotorista = cMsgMotorista || getHeaderColOptional_(msgHeaderMap, ['MOTORISTA']);
  }

  const progRows = getSheetDataRowsDisplay_(shProg, shProg.getLastColumn(), progHeaderRow);
  const progByPlano = {};
  for (let i = 0; i < progRows.length; i++) {
    const r = progRows[i] || [];
    const planoRaw = String(r[cProgPlanos - 1] || '').trim();
    const planoKey = normalizePlanoDigitsKey_(planoRaw);
    const payload = {
      placa: String(r[cProgPlaca - 1] || '').trim(),
      motorista: String(r[cProgMotorista - 1] || '').trim(),
    };
    if (planoKey) progByPlano[planoKey] = payload;
    if (planoRaw) progByPlano['RAW|' + planoRaw] = payload;
  }

  const lastRow = shMsg.getLastRow();
  if (lastRow < 2) return { ok: true, updated: 0, rows: 0 };
  const numRows = lastRow - 1;
  const totalCols = Math.max(shMsg.getLastColumn(), cMsgMotorista || cMsgPlaca || 1);
  const msgValues = shMsg.getRange(2, 1, numRows, totalCols).getDisplayValues();
  const placaOut = [];
  const motoristaOut = [];
  let changedPlaca = false;
  let changedMotorista = false;
  let updatedRows = 0;

  for (let i = 0; i < msgValues.length; i++) {
    const row = msgValues[i] || [];
    const planoRaw = String(row[cMsgPlanos - 1] || '').trim();
    const planoKey = normalizePlanoDigitsKey_(planoRaw);
    const src = (planoKey ? progByPlano[planoKey] : null) || (planoRaw ? progByPlano['RAW|' + planoRaw] : null);
    const newPlaca = src ? (src.placa || '') : '';
    const newMotorista = src ? (src.motorista || '') : '';
    const oldPlaca = String(row[(cMsgPlaca || 1) - 1] || '').trim();
    const oldMotorista = String(row[(cMsgMotorista || 1) - 1] || '').trim();
    if (oldPlaca !== newPlaca || oldMotorista !== newMotorista) updatedRows++;
    if (oldPlaca !== newPlaca) changedPlaca = true;
    if (oldMotorista !== newMotorista) changedMotorista = true;
    placaOut.push([newPlaca]);
    motoristaOut.push([newMotorista]);
  }

  const result = { ok: true, updated: updatedRows, rows: numRows, placaCol: cMsgPlaca, motoristaCol: cMsgMotorista, placaWrite: 'skip', motoristaWrite: 'skip' };
  if (changedPlaca && cMsgPlaca) {
    try {
      shMsg.getRange(2, cMsgPlaca, numRows, 1).setValues(placaOut);
      result.placaWrite = 'ok';
    } catch (e) {
      result.placaWrite = 'erro: ' + String(e && e.message ? e.message : e);
    }
  }
  if (changedMotorista && cMsgMotorista) {
    try {
      shMsg.getRange(2, cMsgMotorista, numRows, 1).setValues(motoristaOut);
      result.motoristaWrite = 'ok';
    } catch (e) {
      result.motoristaWrite = 'erro: ' + String(e && e.message ? e.message : e);
    }
  }
  return result;
}

function sendAttemicsTextMessage_(payload, options) {
  const cfg = getAttemicsConfig_();
  const number = String(payload.number || '');
  const message = sanitizeMessageTextForAttemics_(payload.message || '');
  if (!number) throw new Error('Número de telefone vazio');
  if (!message) throw new Error('Mensagem vazia');

  // URL e Token do CONFIG
  const url = cfg.BASE_URL_SEND_TEXT;
  const token = cfg.ACCESS_TOKEN;

  if (!token) throw new Error('Token da Attemics não configurado.');

  // Conforme OpenAPI: Header "access-token"
  const headers = {
    'access-token': token,
    'Content-Type': 'application/json'
  };

  const body = {
    number: number,
    message: message,
    forceSend: true
  };

  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: headers,
    payload: JSON.stringify(body),
    muteHttpExceptions: true
  });

  const code = response.getResponseCode();
  const responseText = response.getContentText() || '';

  return {
    ok: code === 200 || code === 201 || code === 202,
    httpStatus: code,
    httpStatusText: responseText.slice(0, 50),
    responseText: responseText,
    requestBody: body,
  };
}

function buildAttemicsDedupeHash_(dateRef, tipoMensagem, planoKey) {
  return String(dateRef || '') + '|' + String(tipoMensagem || '') + '|' + String(planoKey || '');
}

function buildAttemicsTipoPrimeira_(row) {
  if (row && row.isSemPlano) return 'PRIMEIRA_SEM_PLANO';
  return row && row.isPlano610 ? 'PRIMEIRA_610' : 'PRIMEIRA_REENTREGA';
}

function getAttemicsNumeroResponsavelOperacao_() {
  return sanitizePhoneForAttemics_('+55 41 9231-2058');
}

function buildAttemicsAlertaMudancaProgramacaoTexto_(payload) {
  const p = payload || {};
  const prog = p.programacao || {};
  const msg = p.mensagem || {};
  const removed = Array.isArray(p.removedProgramacaoRows) ? p.removedProgramacaoRows : [];
  const parts = [
    '\u{1f6a8} *ATUALIZACAO DA PROGRAMACAO (ORIGEM)*',
    '',
    'Foram detectadas mudancas na planilha original e a sincronizacao foi executada.',
    '',
    '\u{1f4ca} *Resumo*',
    '\u2022 Programacao - Inseridas: ' + (prog.inserted || 0),
    '\u2022 Programacao - Atualizadas: ' + (prog.updated || 0),
    '\u2022 Programacao - Deletadas: ' + (prog.deleted || 0),
    '\u2022 Programacao - Inalteradas: ' + (prog.unchanged || 0),
    '\u2022 MsgBase - Inseridas: ' + (msg.inserted || 0),
    '\u2022 MsgBase - Atualizadas: ' + (msg.updated || 0),
    '\u2022 MsgBase - Deletadas: ' + (msg.deleted || 0),
  ];

  if (removed.length) {
    parts.push('');
    parts.push('\u26a0\ufe0f *Linhas removidas da Programacao (amostra)*');
    const max = Math.min(8, removed.length);
    for (let i = 0; i < max; i++) {
      const r = removed[i] || {};
      const linha = [
        (r.plano ? ('Plano ' + r.plano) : 'Plano ?'),
        (r.placa ? ('Placa ' + r.placa) : ''),
        (r.motorista ? ('Motorista ' + r.motorista) : ''),
      ].filter(Boolean).join(' | ');
      parts.push('\u2022 ' + linha);
      if (r.complemento || r.faixaAgenda || r.dataSaida) {
        const detalhe = [
          r.complemento ? ('Comp: ' + r.complemento) : '',
          r.faixaAgenda ? ('Horario: ' + r.faixaAgenda) : '',
          r.dataSaida ? ('Saida: ' + r.dataSaida) : '',
        ].filter(Boolean).join(' | ');
        if (detalhe) parts.push('  ' + detalhe);
      }
    }
    if (removed.length > max) parts.push('\u2022 ... + ' + (removed.length - max) + ' linha(s)');
  }

  if (p.sourceRows != null) {
    parts.push('');
    parts.push('\u2022 Linhas lidas na origem: ' + p.sourceRows);
  }

  parts.push('');
  parts.push('Atualizado em: ' + formatDateTimeBR_(new Date()));
  return parts.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function enviarAlertaAttemicsMudancaOrigemProgramacao_(updateResult, meta) {
  const data = updateResult && updateResult.data ? updateResult.data : {};
  const prog = data.programacao || {};
  const msg = data.mensagem || {};
  const hasRelevantChange = !!(
    (prog.inserted || 0) + (prog.updated || 0) + (prog.deleted || 0) +
    (msg.inserted || 0) + (msg.updated || 0) + (msg.deleted || 0)
  );
  if (!hasRelevantChange) return { sent: false, skipped: true, reason: 'sem_mudancas_relevantes' };

  const numero = getAttemicsNumeroResponsavelOperacao_();
  if (!numero) return { sent: false, skipped: true, reason: 'numero_responsavel_invalido' };

  const payloadInfo = {
    programacao: prog,
    mensagem: msg,
    removedProgramacaoRows: data.removedProgramacaoRows || [],
    sourceRows: meta && meta.sourceRows,
    sourceHash: meta && meta.sourceHash,
  };
  const mensagem = buildAttemicsAlertaMudancaProgramacaoTexto_(payloadInfo);
  const sendResult = sendAttemicsTextMessage_({ number: numero, message: mensagem }, { testMode: false });

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const logSheet = ensureAttemicsLogSheet_(ss);
    appendAttemicsLogRow_(logSheet, {
      DataHora: formatDateTimeBR_(new Date()),
      DataRef: formatDateRefBR_(new Date()),
      Modo: 'REAL',
      TipoMensagem: 'ALERTA_ATUALIZACAO_PROGRAMACAO',
      Plano: '',
      Complemento: '',
      Motorista: '',
      Placa: '',
      TelefoneOriginal: numero,
      TelefoneDestino: numero,
      Regiao: '',
      Cidade: '',
      Bairros: '',
      AgendaCarregamento: '',
      DataSaida: '',
      Status: sendResult.ok ? 'ENVIADO_OK' : 'ERRO_HTTP',
      HTTPStatus: sendResult.httpStatus || '',
      HTTPStatusText: sendResult.httpStatusText || '',
      ResponseBodyResumo: truncateText_(sendResult.responseText || '', 340),
      MessagePreview: truncateText_(mensagem, 420),
      PayloadResumo: truncateText_(JSON.stringify(sendResult.requestBody || { number: numero }), 300),
      HashDedupe: buildAttemicsDedupeHash_(formatDateRefBR_(new Date()), 'ALERTA_ATUALIZACAO_PROGRAMACAO', String(meta && meta.sourceHash || '')),
      Observacao: 'Alerta automatico de mudanca na planilha origem',
      RowProgramacao: '',
      ExecId: String(Date.now()) + '_ALERTA_ORIGEM',
    });
  } catch (e) {}

  return {
    sent: !!sendResult.ok,
    skipped: false,
    httpStatus: sendResult.httpStatus || '',
    changes: {
      programacao: prog,
      mensagem: msg,
      removed: (data.removedProgramacaoRows || []).length,
    },
  };
}


function runAttemicsPrimeiraMensagem_(options) {
  return runAttemicsMensagemFlow_('primeira', options);
}

function runAttemicsSegundaMensagem_(options) {
  return runAttemicsMensagemFlow_('segunda', options);
}

function pushSampleAttemics_(arr, text, max) {
  if (!arr) return;
  if (arr.length >= (max || 5)) return;
  arr.push(String(text || ''));
}

function buildAttemicsPreCheckSummary_(kind, rows, ctx) {
  const data = rows || [];
  const logSheet = ctx.logSheet;
  const logState = ctx.logState;
  const dateRef = ctx.dateRef;
  const previewOnly = !!ctx.previewOnly;
  const testMode = !!ctx.testMode;
  const forcedNumber = String(ctx.forcedNumber || '').trim();
  const out = {
    total: data.length, elegiveis: 0, trava: 0, travaHorarioPrimeira: 0, dados: 0, faltaPrimeira: 0, errosTemplate: 0,
    amostraEnviar: [], amostraBloqueados: [],
  };
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const planoPlacaKey = buildAttemicsPlanoPlacaKey_(row.planoKey || row.plano, row.placa);
    const tipoMensagem = kind === 'primeira' ? buildAttemicsTipoPrimeira_(row) : 'SEGUNDA_HORARIO';
    const telefoneOriginal = sanitizePhoneForAttemics_(row.telefoneOriginal);
    const telefoneDestino = sanitizePhoneForAttemics_(testMode ? forcedNumber : row.telefoneOriginal);
    const hasTelefoneUsavel = !!(testMode ? telefoneDestino : telefoneOriginal);
    const requiresPlaca = !previewOnly;
    if (kind === 'segunda' && !row.agendaCarregamento) {
      out.dados++;
      pushSampleAttemics_(out.amostraBloqueados, (row.plano || 'sem_plano') + ' (sem horario)', 6);
      continue;
    }
    try {
      if (kind === 'primeira') buildAttemicsPrimeiraMensagemTexto_(row); else buildAttemicsSegundaMensagemTexto_(row);
    } catch (e) {
      out.errosTemplate++;
      pushSampleAttemics_(out.amostraBloqueados, (row.plano || 'sem_plano') + ' (template)', 6);
      continue;
    }
    if (!row.planoKey || !planoPlacaKey) { out.dados++; pushSampleAttemics_(out.amostraBloqueados, 'sem_plano', 6); continue; }
    if (isRodizioAttemics_(row)) { out.dados++; pushSampleAttemics_(out.amostraBloqueados, row.plano + ' (rodizio)', 6); continue; }
    if ((requiresPlaca && !row.placa) || !hasTelefoneUsavel) { out.dados++; pushSampleAttemics_(out.amostraBloqueados, row.plano + ' (contato/placa)', 6); continue; }
    if (kind === 'primeira') {
      const falt = getAttemicsPrimeiraCamposFaltantes_(row);
      if (falt.obrigatorios.length) { out.dados++; pushSampleAttemics_(out.amostraBloqueados, row.plano + ' (faltando dados)', 6); continue; }
    }
    if (kind === 'segunda' && hasPrimeiraMensagemComHorarioHoje_(logSheet, planoPlacaKey, dateRef, logState)) {
      out.trava++; out.travaHorarioPrimeira++;
      pushSampleAttemics_(out.amostraBloqueados, row.plano + ' (horario ja enviado na 1a)', 6);
      continue;
    }
    if (kind === 'segunda' && !logState.sentFirstByPlanoDia[dateRef + '|' + planoPlacaKey]) {
      out.faltaPrimeira++;
      pushSampleAttemics_(out.amostraBloqueados, row.plano + ' (falta 1a msg)', 6);
      continue;
    }
    if (!previewOnly && !testMode && kind === 'segunda' && hasAttemicsSegundaMesmaAgendaHoje_(planoPlacaKey, dateRef, row.agendaCarregamento, logState)) {
      out.trava++;
      pushSampleAttemics_(out.amostraBloqueados, row.plano + ' (duplicidade agenda)', 6);
      continue;
    }
    if (!previewOnly && !testMode && kind !== 'segunda' && hasAttemicsLogForPlanoTipoDia_(logSheet, planoPlacaKey, tipoMensagem, dateRef, 'ENVIADO_OK', logState)) {
      out.trava++;
      pushSampleAttemics_(out.amostraBloqueados, row.plano + ' (duplicidade)', 6);
      continue;
    }
    out.elegiveis++;
    pushSampleAttemics_(out.amostraEnviar, row.plano, 6);
  }
  return out;
}

function confirmAttemicsEnvioYesNo_(kind, opts) {
  const ui = SpreadsheetApp.getUi();
  const isPrimeira = kind === 'primeira';
  const testMode = !!(opts && opts.testMode);
  const pre = opts && opts.precheck ? opts.precheck : null;
  const title = 'Confirmar envio Attemics';
  const linhas = [
    (isPrimeira ? '1a mensagem' : '2a mensagem') + (testMode ? ' (TESTE)' : ' (REAL)'),
  ];
  if (pre) {
    linhas.push('');
    linhas.push('Resumo antes do envio:');
    linhas.push('• Total lidos: ' + (pre.total || 0));
    linhas.push('• Elegiveis para envio: ' + (pre.elegiveis || 0));
    linhas.push('• Bloqueados por trava: ' + (pre.trava || 0));
    linhas.push('• Bloqueados (horario ja na 1a): ' + (pre.travaHorarioPrimeira || 0));
    linhas.push('• Bloqueados por dados/regras: ' + (pre.dados || 0));
    linhas.push('• Bloqueados por falta da 1a: ' + (pre.faltaPrimeira || 0));
    linhas.push('• Erros de template: ' + (pre.errosTemplate || 0));
    if (pre.amostraEnviar && pre.amostraEnviar.length) {
      linhas.push('');
      linhas.push('Vai enviar (amostra): ' + pre.amostraEnviar.join(', '));
    }
    if (pre.amostraBloqueados && pre.amostraBloqueados.length) {
      linhas.push('Bloqueados (amostra): ' + pre.amostraBloqueados.join(', '));
    }
  }
  linhas.push('');
  linhas.push('YES = continuar');
  linhas.push('NO = cancelar');
  const msg = linhas.join('\n');
  return ui.alert(title, msg, ui.ButtonSet.YES_NO) === ui.Button.YES;
}

function showAttemicsResumoExecucaoAlert_(kind, previewOnly, testMode, stats) {
  const ui = SpreadsheetApp.getUi();
  const linhas = [
    (previewOnly ? '?? Prévia ' : '? Envio ') + (kind === 'primeira' ? '1a mensagem' : '2a mensagem') + (testMode ? ' (TESTE)' : ' (REAL)'),
    '',
    '• Total lidos: ' + (stats.totalLidos || 0),
    '• Elegíveis: ' + (stats.elegiveis || 0),
    '• ' + (previewOnly ? 'Prévias geradas' : 'Enviados') + ': ' + (previewOnly ? (stats.previews || 0) : (stats.enviados || 0)),
    '• Ignorados por trava: ' + (stats.ignoradosTrava || 0),
    '• Ignorados (horário já na 1a): ' + (stats.ignoradosHorarioJaEnviadoPrimeira || 0),
    '• Ignorados (dados/regras): ' + (stats.ignoradosDados || 0),
    '• Ignorados (falta 1a): ' + (stats.ignoradosFaltaPrimeira || 0),
    '• Erros: ' + (stats.erros || 0),
  ];
  if (stats.sampleEnviados && stats.sampleEnviados.length) {
    linhas.push('');
    linhas.push('Enviados (amostra):');
    linhas.push(stats.sampleEnviados.join(', '));
  }
  if (stats.sampleBloqueados && stats.sampleBloqueados.length) {
    linhas.push('');
    linhas.push('Bloqueados (amostra):');
    linhas.push(stats.sampleBloqueados.join(', '));
  }
  ui.alert(previewOnly ? 'Resumo da previa' : 'Resumo do envio', linhas.join('\n'), ui.ButtonSet.OK);
}

function runAttemicsMensagemFlow_(kind, options) {
  const opts = options || {};
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const cfg = getAttemicsConfig_();
  const previewOnly = !!opts.previewOnly;
  const testMode = opts.testMode !== false;
  const forcedNumber = String(opts.forcedNumber || cfg.TEST_NUMBER || '').trim();
  const execId = String(Date.now()) + '_' + String(kind || '').toUpperCase();
  const dateRef = formatDateRefBR_(new Date());
  const logSheet = ensureAttemicsLogSheet_(ss);
  const logState = loadAttemicsLogState_(logSheet);
  const modeLabel = testMode ? 'TESTE' : 'REAL';
  const startedAt = Date.now();
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(Number(cfg.LOCK_TIMEOUT_MS || 10000))) {
    throw new Error('Envio Attemics já está em execução. Tente novamente em instantes.');
  }

  appendAttemicsExecLog_(logSheet, kind, 'EXEC_START', execId, {
    Modo: modeLabel,
    Observacao: previewOnly ? 'Pr?via' : 'Envio',
  });

  const stats = {
    totalLidos: 0,
    elegiveis: 0,
    enviados: 0,
    previews: 0,
    ignoradosTrava: 0,
    ignoradosHorarioJaEnviadoPrimeira: 0,
    ignoradosDados: 0,
    ignoradosFaltaPrimeira: 0,
    erros: 0,
    sampleEnviados: [],
    sampleBloqueados: [],
  };
  const processedKeysThisRun = {};

  try {
    try {
      syncProgramacaoPlacaMotoristaParaMensagemBaseAttemics_({ ss: ss });
    } catch (e) {
      appDebugPrint_('Sync PLACA/MOTORISTA MsgBase falhou', { erro: String(e && e.message ? e.message : e) });
    }
    let rows = buildAttemicsMessageRowsByPlano_({
      ss: ss,
      forcedNumber: testMode ? forcedNumber : '',
    });
    if (kind === 'primeira') {
      rows = rows.concat(buildAttemicsSemPlanoRows_({ ss: ss }));
    }
    stats.totalLidos = rows.length;

    let processedEnvioCandidates = 0;
    const maxPerRun = Math.max(1, Number(cfg.MAX_PER_RUN || 30));

    if (!previewOnly) {
      const precheck = buildAttemicsPreCheckSummary_(kind, rows, {
        logSheet: logSheet,
        logState: logState,
        dateRef: dateRef,
        previewOnly: previewOnly,
        testMode: testMode,
        forcedNumber: forcedNumber,
      });
      if ((precheck.elegiveis || 0) === 0) {
        appendAttemicsExecLog_(logSheet, kind, 'EXEC_END', execId, {
          Modo: modeLabel,
          Observacao:
            'Sem elegiveis. total=' + (precheck.total || 0) +
            ', trava=' + (precheck.trava || 0) +
            ', dados=' + (precheck.dados || 0) +
            ', faltaPrimeira=' + (precheck.faltaPrimeira || 0) +
            ', errosTemplate=' + (precheck.errosTemplate || 0),
        });
        toast_(ss, (kind === 'primeira' ? '1a msg' : '2a msg') + ': 0 elegiveis (nada para enviar)');
        return { ok: true, data: { kind: kind, previewOnly: previewOnly, testMode: testMode, stats: stats, execId: execId, skippedNoEligible: true, precheck: precheck } };
      }
      if (!confirmAttemicsEnvioYesNo_(kind, { testMode: testMode, precheck: precheck })) {
        toast_(ss, 'Envio Attemics cancelado pelo usuario.');
        return { ok: false, cancelled: true, data: { kind: kind, previewOnly: previewOnly, testMode: testMode, precheck: precheck } };
      }
    }

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const planoPlacaKey = buildAttemicsPlanoPlacaKey_(row.planoKey || row.plano, row.placa);
      const tipoMensagem = kind === 'primeira' ? buildAttemicsTipoPrimeira_(row) : 'SEGUNDA_HORARIO';
      const dedupeHash = buildAttemicsDedupeHash_(
        dateRef,
        tipoMensagem,
        (kind === 'segunda')
          ? ((planoPlacaKey || row.planoKey) + '|' + normalizeAttemicsAgendaKey_(row.agendaCarregamento || ''))
          : (planoPlacaKey || row.planoKey)
      );
      const localRunKey = dateRef + '|' + tipoMensagem + '|' + String(planoPlacaKey || row.planoKey || row.plano || '') +
        (kind === 'segunda' ? ('|' + normalizeAttemicsAgendaKey_(row.agendaCarregamento || '')) : '');
      const telefoneOriginal = sanitizePhoneForAttemics_(row.telefoneOriginal);
      const telefoneDestino = sanitizePhoneForAttemics_(testMode ? forcedNumber : row.telefoneOriginal);
      const hasTelefoneUsavel = !!(testMode ? telefoneDestino : telefoneOriginal);

      let mensagem = '';
      let segundaAgendaAnteriorInfo = null;
      let observacaoMsgBase = row._attMsgResumo || '';
      if (!row.msgBaseMatched || !hasAttemicsMsgBaseEnrichment_(row)) {
        observacaoMsgBase = (observacaoMsgBase ? observacaoMsgBase + '|' : '') + 'warning=mensagem_sem_enriquecimento';
      }
      try {
        mensagem = kind === 'primeira'
          ? buildAttemicsPrimeiraMensagemTexto_(row)
          : buildAttemicsSegundaMensagemTexto_(row);
        if (!observacaoMsgBase) observacaoMsgBase = buildMensagemBaseResumoAttemics_(row);
      } catch (e) {
        stats.erros++;
        appendAttemicsLogRow_(logSheet, {
          DataHora: formatDateTimeBR_(new Date()),
          DataRef: dateRef,
          Modo: modeLabel,
          TipoMensagem: previewOnly ? 'PREVIA_' + tipoMensagem : tipoMensagem,
          Plano: row.plano,
          Complemento: row.complemento || '',
          Motorista: row.motorista || '',
          Placa: row.placa || '',
          TelefoneOriginal: telefoneOriginal,
          TelefoneDestino: telefoneDestino,
          Regiao: row.regiao || '',
          Cidade: row.cidade || '',
          Bairros: row.bairros || '',
          AgendaCarregamento: row.agendaCarregamento || '',
          DataSaida: row.dataSaida || '',
          Status: 'ERRO_TEMPLATE',
          HTTPStatus: '',
          HTTPStatusText: '',
          ResponseBodyResumo: '',
          MessagePreview: '',
          PayloadResumo: '',
          HashDedupe: dedupeHash,
          Observacao: truncateText_(e && e.message ? e.message : String(e), 280),
          RowProgramacao: row.rowProgramacao || '',
          ExecId: execId,
        });
        pushSampleAttemics_(stats.sampleBloqueados, (row.plano || 'sem_plano') + ' (template)', 8);
        continue;
      }

      if (!row.planoKey || !planoPlacaKey) {
        stats.ignoradosDados++;
        appendAttemicsLogRow_(logSheet, {
          DataHora: formatDateTimeBR_(new Date()), DataRef: dateRef, Modo: modeLabel,
          TipoMensagem: previewOnly ? 'PREVIA_' + tipoMensagem : tipoMensagem, Plano: '', Complemento: row.complemento || '',
          Motorista: row.motorista || '', Placa: row.placa || '', TelefoneOriginal: telefoneOriginal, TelefoneDestino: telefoneDestino,
          Regiao: row.regiao || '', Cidade: row.cidade || '', Bairros: row.bairros || '', AgendaCarregamento: row.agendaCarregamento || '',
          DataSaida: row.dataSaida || '', Status: 'IGNORADO_SEM_PLANO', HTTPStatus: '', HTTPStatusText: '',
          ResponseBodyResumo: '', MessagePreview: truncateText_(mensagem, 420), PayloadResumo: '', HashDedupe: dedupeHash,
          Observacao: observacaoMsgBase, RowProgramacao: row.rowProgramacao || '', ExecId: execId,
        });
        pushSampleAttemics_(stats.sampleBloqueados, 'sem_plano', 8);
        continue;
      }

      if (isRodizioAttemics_(row)) {
        stats.ignoradosDados++;
        appendAttemicsLogRow_(logSheet, {
          DataHora: formatDateTimeBR_(new Date()), DataRef: dateRef, Modo: modeLabel,
          TipoMensagem: previewOnly ? 'PREVIA_' + tipoMensagem : tipoMensagem, Plano: row.plano, Complemento: row.complemento || '',
          Motorista: row.motorista || '', Placa: row.placa || '', TelefoneOriginal: telefoneOriginal, TelefoneDestino: telefoneDestino,
          Regiao: row.regiao || '', Cidade: row.cidade || '', Bairros: row.bairros || '', AgendaCarregamento: row.agendaCarregamento || '',
          DataSaida: row.dataSaida || '', Status: 'IGNORADO_RODIZIO_CONFIRMAR_RESPONSAVEL', HTTPStatus: '', HTTPStatusText: '',
          ResponseBodyResumo: '', MessagePreview: truncateText_(mensagem, 420), PayloadResumo: '', HashDedupe: dedupeHash,
          Observacao: 'Motorista/perfil em rod\u00edzio. Confirmar com responsável antes de enviar.', RowProgramacao: row.rowProgramacao || '', ExecId: execId,
        });
        pushSampleAttemics_(stats.sampleBloqueados, row.plano + ' (rodizio)', 8);
        continue;
      }

      const requiresPlaca = !previewOnly;
      if ((requiresPlaca && !row.placa) || !hasTelefoneUsavel) {
        stats.ignoradosDados++;
        appendAttemicsLogRow_(logSheet, {
          DataHora: formatDateTimeBR_(new Date()), DataRef: dateRef, Modo: modeLabel,
          TipoMensagem: previewOnly ? 'PREVIA_' + tipoMensagem : tipoMensagem, Plano: row.plano, Complemento: row.complemento || '',
          Motorista: row.motorista || '', Placa: row.placa || '', TelefoneOriginal: telefoneOriginal, TelefoneDestino: telefoneDestino,
          Regiao: row.regiao || '', Cidade: row.cidade || '', Bairros: row.bairros || '', AgendaCarregamento: row.agendaCarregamento || '',
          DataSaida: row.dataSaida || '', Status: !hasTelefoneUsavel ? 'IGNORADO_SEM_TELEFONE' : 'ERRO_TEMPLATE', HTTPStatus: '', HTTPStatusText: '',
          ResponseBodyResumo: '', MessagePreview: truncateText_(mensagem, 420), PayloadResumo: '', HashDedupe: dedupeHash,
          Observacao: !hasTelefoneUsavel
            ? (testMode ? 'N?mero de teste ausente/inv?lido' : 'Contato n?o localizado na disponibilidade')
            : 'Placa obrigat\u00f3ria para envio Attemics',
          RowProgramacao: row.rowProgramacao || '', ExecId: execId,
        });
        pushSampleAttemics_(stats.sampleBloqueados, row.plano + ' (contato/placa)', 8);
        continue;
      }

      if (kind === 'primeira') {
        const faltantesPrimeira = getAttemicsPrimeiraCamposFaltantes_(row);
        if (faltantesPrimeira.obrigatorios.length) {
          stats.ignoradosDados++;
          appendAttemicsLogRow_(logSheet, {
            DataHora: formatDateTimeBR_(new Date()), DataRef: dateRef, Modo: modeLabel,
            TipoMensagem: previewOnly ? 'PREVIA_' + tipoMensagem : tipoMensagem, Plano: row.plano, Complemento: row.complemento || '',
            Motorista: row.motorista || '', Placa: row.placa || '', TelefoneOriginal: telefoneOriginal, TelefoneDestino: telefoneDestino,
            Regiao: row.regiao || '', Cidade: row.cidade || '', Bairros: row.bairros || '', AgendaCarregamento: row.agendaCarregamento || '',
            DataSaida: row.dataSaida || '', Status: 'IGNORADO_CAMPOS_OBRIGATORIOS', HTTPStatus: '', HTTPStatusText: '',
            ResponseBodyResumo: '', MessagePreview: truncateText_(mensagem, 420), PayloadResumo: '', HashDedupe: dedupeHash,
            Observacao: truncateText_('Faltando obrigatórios: ' + faltantesPrimeira.obrigatorios.join(', ') + ' | sinalizar responsável', 280),
            RowProgramacao: row.rowProgramacao || '', ExecId: execId,
          });
          pushSampleAttemics_(stats.sampleBloqueados, row.plano + ' (faltando dados)', 8);
          continue;
        }
      }

      if (kind === 'segunda' && !row.agendaCarregamento) {
        stats.ignoradosDados++;
        appendAttemicsLogRow_(logSheet, {
          DataHora: formatDateTimeBR_(new Date()), DataRef: dateRef, Modo: modeLabel,
          TipoMensagem: previewOnly ? 'PREVIA_' + tipoMensagem : tipoMensagem, Plano: row.plano, Complemento: row.complemento || '',
          Motorista: row.motorista || '', Placa: row.placa || '', TelefoneOriginal: telefoneOriginal, TelefoneDestino: telefoneDestino,
          Regiao: row.regiao || '', Cidade: row.cidade || '', Bairros: row.bairros || '', AgendaCarregamento: row.agendaCarregamento || '',
          DataSaida: row.dataSaida || '', Status: 'ERRO_TEMPLATE', HTTPStatus: '', HTTPStatusText: '',
          ResponseBodyResumo: '', MessagePreview: truncateText_(mensagem, 420), PayloadResumo: '', HashDedupe: dedupeHash,
          Observacao: 'Agenda de carregamento vazia', RowProgramacao: row.rowProgramacao || '', ExecId: execId,
        });
        pushSampleAttemics_(stats.sampleBloqueados, row.plano + ' (sem horario)', 8);
        continue;
      }

      if (kind === 'segunda' && hasPrimeiraMensagemComHorarioHoje_(logSheet, planoPlacaKey, dateRef, logState)) {
        stats.ignoradosTrava++;
        stats.ignoradosHorarioJaEnviadoPrimeira++;
        appendAttemicsLogRow_(logSheet, {
          DataHora: formatDateTimeBR_(new Date()), DataRef: dateRef, Modo: modeLabel,
          TipoMensagem: previewOnly ? 'PREVIA_' + tipoMensagem : tipoMensagem, Plano: row.plano, Complemento: row.complemento || '',
          Motorista: row.motorista || '', Placa: row.placa || '', TelefoneOriginal: telefoneOriginal, TelefoneDestino: telefoneDestino,
          Regiao: row.regiao || '', Cidade: row.cidade || '', Bairros: row.bairros || '', AgendaCarregamento: row.agendaCarregamento || '',
          DataSaida: row.dataSaida || '', Status: 'IGNORADO_HORARIO_JA_ENVIADO_NA_PRIMEIRA', HTTPStatus: '', HTTPStatusText: '',
          ResponseBodyResumo: '', MessagePreview: truncateText_(mensagem, 420), PayloadResumo: '', HashDedupe: dedupeHash,
          Observacao: 'Primeira mensagem já continha horário/faixa de carregamento hoje', RowProgramacao: row.rowProgramacao || '', ExecId: execId,
        });
        pushSampleAttemics_(stats.sampleBloqueados, row.plano + ' (horario ja na 1a)', 8);
        continue;
      }

      if (kind === 'segunda' && !hasTelefoneUsavel) {
        stats.ignoradosDados++;
        appendAttemicsLogRow_(logSheet, {
          DataHora: formatDateTimeBR_(new Date()), DataRef: dateRef, Modo: modeLabel,
          TipoMensagem: previewOnly ? 'PREVIA_' + tipoMensagem : tipoMensagem, Plano: row.plano, Complemento: row.complemento || '',
          Motorista: row.motorista || '', Placa: row.placa || '', TelefoneOriginal: telefoneOriginal, TelefoneDestino: telefoneDestino,
          Regiao: row.regiao || '', Cidade: row.cidade || '', Bairros: row.bairros || '', AgendaCarregamento: row.agendaCarregamento || '',
          DataSaida: row.dataSaida || '', Status: 'IGNORADO_SEM_TELEFONE', HTTPStatus: '', HTTPStatusText: '',
          ResponseBodyResumo: '', MessagePreview: truncateText_(mensagem, 420), PayloadResumo: '', HashDedupe: dedupeHash,
          Observacao: testMode ? 'N?mero de teste ausente/inv?lido' : 'Contato n?o localizado na disponibilidade',
          RowProgramacao: row.rowProgramacao || '', ExecId: execId,
        });
        pushSampleAttemics_(stats.sampleBloqueados, row.plano + ' (sem telefone)', 8);
        continue;
      }

      if (kind === 'segunda' && (cfg.REQUIRE_FIRST_MESSAGE_FOR_SECOND !== false)) {
        if (!logState.sentFirstByPlanoDia[dateRef + '|' + planoPlacaKey]) {
          stats.ignoradosFaltaPrimeira++;
          appendAttemicsLogRow_(logSheet, {
            DataHora: formatDateTimeBR_(new Date()), DataRef: dateRef, Modo: modeLabel,
            TipoMensagem: previewOnly ? 'PREVIA_' + tipoMensagem : tipoMensagem, Plano: row.plano, Complemento: row.complemento || '',
            Motorista: row.motorista || '', Placa: row.placa || '', TelefoneOriginal: telefoneOriginal, TelefoneDestino: telefoneDestino,
            Regiao: row.regiao || '', Cidade: row.cidade || '', Bairros: row.bairros || '', AgendaCarregamento: row.agendaCarregamento || '',
            DataSaida: row.dataSaida || '', Status: 'IGNORADO_FALTA_PRIMEIRA', HTTPStatus: '', HTTPStatusText: '',
            ResponseBodyResumo: '', MessagePreview: truncateText_(mensagem, 420), PayloadResumo: '', HashDedupe: dedupeHash,
            Observacao: 'Primeira mensagem não enviada hoje para este plano', RowProgramacao: row.rowProgramacao || '', ExecId: execId,
          });
          pushSampleAttemics_(stats.sampleBloqueados, row.plano + ' (falta 1a)', 8);
          continue;
        }
      }

      if (kind === 'segunda') {
        segundaAgendaAnteriorInfo = getAttemicsSegundaAgendaAnteriorHoje_(planoPlacaKey, dateRef, logState);
        if (!previewOnly && hasAttemicsSegundaMesmaAgendaHoje_(planoPlacaKey, dateRef, row.agendaCarregamento, logState)) {
          stats.ignoradosTrava++;
          pushSampleAttemics_(stats.sampleBloqueados, row.plano + ' (duplicidade agenda)', 8);
          continue;
        }
        if (segundaAgendaAnteriorInfo && normalizeAttemicsAgendaKey_(segundaAgendaAnteriorInfo.agenda) !== normalizeAttemicsAgendaKey_(row.agendaCarregamento || '')) {
          mensagem = buildAttemicsSegundaMensagemAlteracaoTexto_(row, segundaAgendaAnteriorInfo.agenda);
          observacaoMsgBase = truncateText_((observacaoMsgBase ? observacaoMsgBase + '|' : '') + 'alteracao_horario=SIM', 280);
        }
      }

      if (!previewOnly && kind !== 'segunda' && hasAttemicsLogForPlanoTipoDia_(logSheet, planoPlacaKey, tipoMensagem, dateRef, 'ENVIADO_OK', logState)) {
        stats.ignoradosTrava++;
        appendAttemicsLogRow_(logSheet, {
          DataHora: formatDateTimeBR_(new Date()), DataRef: dateRef, Modo: modeLabel,
          TipoMensagem: tipoMensagem, Plano: row.plano, Complemento: row.complemento || '',
          Motorista: row.motorista || '', Placa: row.placa || '', TelefoneOriginal: telefoneOriginal, TelefoneDestino: telefoneDestino,
          Regiao: row.regiao || '', Cidade: row.cidade || '', Bairros: row.bairros || '', AgendaCarregamento: row.agendaCarregamento || '',
          DataSaida: row.dataSaida || '', Status: 'IGNORADO_DUPLICIDADE_DIA', HTTPStatus: '', HTTPStatusText: '',
          ResponseBodyResumo: '', MessagePreview: truncateText_(mensagem, 420), PayloadResumo: '', HashDedupe: dedupeHash,
          Observacao: 'Trava Plano + Tipo + Dia', RowProgramacao: row.rowProgramacao || '', ExecId: execId,
        });
        pushSampleAttemics_(stats.sampleBloqueados, row.plano + ' (duplicidade)', 8);
        continue;
      }
      if (!previewOnly && processedKeysThisRun[localRunKey]) {
        stats.ignoradosTrava++;
        pushSampleAttemics_(stats.sampleBloqueados, row.plano + ' (dup exec)', 8);
        continue;
      }

      stats.elegiveis++;
      if (!previewOnly && processedEnvioCandidates >= maxPerRun) {
        stats.ignoradosTrava++;
        appendAttemicsLogRow_(logSheet, {
          DataHora: formatDateTimeBR_(new Date()), DataRef: dateRef, Modo: modeLabel,
          TipoMensagem: tipoMensagem, Plano: row.plano, Complemento: row.complemento || '',
          Motorista: row.motorista || '', Placa: row.placa || '', TelefoneOriginal: telefoneOriginal, TelefoneDestino: telefoneDestino,
          Regiao: row.regiao || '', Cidade: row.cidade || '', Bairros: row.bairros || '', AgendaCarregamento: row.agendaCarregamento || '',
          DataSaida: row.dataSaida || '', Status: 'IGNORADO_LIMITE_LOTE', HTTPStatus: '', HTTPStatusText: '',
          ResponseBodyResumo: '', MessagePreview: truncateText_(mensagem, 420), PayloadResumo: '', HashDedupe: dedupeHash,
          Observacao: 'Limite por execução atingido (' + maxPerRun + '). Rode novamente para continuar.', RowProgramacao: row.rowProgramacao || '', ExecId: execId,
        });
        pushSampleAttemics_(stats.sampleBloqueados, row.plano + ' (limite lote)', 8);
        continue;
      }
      const payload = { number: telefoneDestino, message: mensagem };
      if (previewOnly) {
        stats.previews++;
        pushSampleAttemics_(stats.sampleEnviados, row.plano, 8);
        appendAttemicsLogRow_(logSheet, {
          DataHora: formatDateTimeBR_(new Date()), DataRef: dateRef, Modo: modeLabel,
          TipoMensagem: 'PREVIA_' + tipoMensagem, Plano: row.plano, Complemento: row.complemento || '',
          Motorista: row.motorista || '', Placa: row.placa || '', TelefoneOriginal: telefoneOriginal, TelefoneDestino: telefoneDestino,
          Regiao: row.regiao || '', Cidade: row.cidade || '', Bairros: row.bairros || '', AgendaCarregamento: row.agendaCarregamento || '',
          DataSaida: row.dataSaida || '', Status: 'PREVIEW_OK', HTTPStatus: '', HTTPStatusText: '',
          ResponseBodyResumo: '', MessagePreview: truncateText_(mensagem, 420), PayloadResumo: truncateText_(JSON.stringify(payload), 300), HashDedupe: dedupeHash,
          Observacao: truncateText_(
            (observacaoMsgBase || '') +
            ((!row.msgBaseMatched || !hasAttemicsMsgBaseEnrichment_(row)) ? '|warning=mensagem_sem_enriquecimento' : ''),
            280
          ),
          RowProgramacao: row.rowProgramacao || '', ExecId: execId,
        });
        continue;
      }

      try {
        processedEnvioCandidates++;
        processedKeysThisRun[localRunKey] = true;
        let result = sendAttemicsTextMessage_(payload, { testMode: testMode });
        const shouldRetryOnce = !!cfg.RETRY_HTTP_ONCE && !result.ok && [429, 500, 502, 503, 504].indexOf(Number(result.httpStatus || 0)) !== -1;
        if (shouldRetryOnce) {
          Utilities.sleep(Math.max(500, Number(cfg.RETRY_DELAY_MS || 1500)));
          result = sendAttemicsTextMessage_(payload, { testMode: testMode });
        }
        if (result.ok) {
          stats.enviados++;
          pushSampleAttemics_(stats.sampleEnviados, row.plano, 8);
          logState.sentByPlanoTipoDia[dateRef + '|' + tipoMensagem + '|' + planoPlacaKey] = true;
          if (tipoMensagem === 'PRIMEIRA_610' || tipoMensagem === 'PRIMEIRA_REENTREGA') {
            logState.sentFirstByPlanoDia[dateRef + '|' + planoPlacaKey] = true;
            if (String(mensagem || '').indexOf('Hor\u00e1rio de carregamento:') !== -1) {
              logState.sentFirstWithHorarioByPlanoDia[dateRef + '|' + planoPlacaKey] = true;
            }
          } else if (tipoMensagem === 'SEGUNDA_HORARIO') {
            const agendaKey2 = normalizeAttemicsAgendaKey_(row.agendaCarregamento || '');
            if (agendaKey2) {
              logState.sentSecondByPlanoDiaAgenda[dateRef + '|SEGUNDA_HORARIO|' + planoPlacaKey + '|' + agendaKey2] = true;
              logState.lastSecondAgendaByPlanoDia[dateRef + '|' + planoPlacaKey] = {
                agenda: String(row.agendaCarregamento || '').trim(),
                agendaKey: agendaKey2,
                messagePreview: String(mensagem || ''),
              };
            }
          }
          appendAttemicsLogRow_(logSheet, {
            DataHora: formatDateTimeBR_(new Date()), DataRef: dateRef, Modo: modeLabel,
            TipoMensagem: tipoMensagem, Plano: row.plano, Complemento: row.complemento || '',
            Motorista: row.motorista || '', Placa: row.placa || '', TelefoneOriginal: telefoneOriginal, TelefoneDestino: telefoneDestino,
            Regiao: row.regiao || '', Cidade: row.cidade || '', Bairros: row.bairros || '', AgendaCarregamento: row.agendaCarregamento || '',
            DataSaida: row.dataSaida || '', Status: 'ENVIADO_OK', HTTPStatus: result.httpStatus, HTTPStatusText: result.httpStatusText || '',
            ResponseBodyResumo: truncateText_(result.responseText || '', 340), MessagePreview: truncateText_(mensagem, 420), PayloadResumo: truncateText_(JSON.stringify(result.requestBody || payload), 300),
            HashDedupe: dedupeHash, Observacao: observacaoMsgBase, RowProgramacao: row.rowProgramacao || '', ExecId: execId,
          });
          if ((cfg.SEND_DELAY_SECONDS || 0) > 0) Utilities.sleep(Number(cfg.SEND_DELAY_SECONDS) * 1000);
        } else {
          stats.erros++;
          delete processedKeysThisRun[localRunKey];
          appendAttemicsLogRow_(logSheet, {
            DataHora: formatDateTimeBR_(new Date()), DataRef: dateRef, Modo: modeLabel,
            TipoMensagem: tipoMensagem, Plano: row.plano, Complemento: row.complemento || '',
            Motorista: row.motorista || '', Placa: row.placa || '', TelefoneOriginal: telefoneOriginal, TelefoneDestino: telefoneDestino,
            Regiao: row.regiao || '', Cidade: row.cidade || '', Bairros: row.bairros || '', AgendaCarregamento: row.agendaCarregamento || '',
            DataSaida: row.dataSaida || '', Status: 'ERRO_HTTP', HTTPStatus: result.httpStatus, HTTPStatusText: result.httpStatusText || '',
            ResponseBodyResumo: truncateText_(result.responseText || '', 340), MessagePreview: truncateText_(mensagem, 420), PayloadResumo: truncateText_(JSON.stringify(result.requestBody || payload), 300),
            HashDedupe: dedupeHash, Observacao: observacaoMsgBase, RowProgramacao: row.rowProgramacao || '', ExecId: execId,
          });
        }
      } catch (e) {
        stats.erros++;
        delete processedKeysThisRun[localRunKey];
        appendAttemicsLogRow_(logSheet, {
          DataHora: formatDateTimeBR_(new Date()), DataRef: dateRef, Modo: modeLabel,
          TipoMensagem: tipoMensagem, Plano: row.plano, Complemento: row.complemento || '',
          Motorista: row.motorista || '', Placa: row.placa || '', TelefoneOriginal: telefoneOriginal, TelefoneDestino: telefoneDestino,
          Regiao: row.regiao || '', Cidade: row.cidade || '', Bairros: row.bairros || '', AgendaCarregamento: row.agendaCarregamento || '',
          DataSaida: row.dataSaida || '', Status: 'ERRO_EXCECAO', HTTPStatus: '', HTTPStatusText: '',
          ResponseBodyResumo: '', MessagePreview: truncateText_(mensagem, 420), PayloadResumo: truncateText_(JSON.stringify(payload), 300),
          HashDedupe: dedupeHash, Observacao: truncateText_(e && e.message ? e.message : String(e), 280), RowProgramacao: row.rowProgramacao || '', ExecId: execId,
        });
      }
    }

    appendAttemicsExecLog_(logSheet, kind, 'EXEC_END', execId, {
      Modo: modeLabel,
      Observacao:
        'total=' + stats.totalLidos +
        ', elegiveis=' + stats.elegiveis +
        ', enviados=' + stats.enviados +
        ', previews=' + stats.previews +
        ', trava=' + stats.ignoradosTrava +
        ', semDados=' + stats.ignoradosDados +
        ', faltaPrimeira=' + stats.ignoradosFaltaPrimeira +
        ', erros=' + stats.erros +
        ', ms=' + (Date.now() - startedAt),
    });

    toast_(ss, (previewOnly ? 'Previa ' : 'Envio ') + (kind === 'primeira' ? '1a msg' : '2a msg') + ': ' +
      (previewOnly ? stats.previews : stats.enviados) + ' ok | ' + stats.ignoradosTrava + ' trava | ' + stats.erros + ' erro(s)');
    try { SpreadsheetApp.flush(); } catch (e) {}
    showAttemicsResumoExecucaoAlert_(kind, previewOnly, testMode, stats);

    return { ok: true, data: { kind: kind, previewOnly: previewOnly, testMode: testMode, stats: stats, execId: execId } };
  } catch (e) {
    appendAttemicsExecLog_(logSheet, kind, 'EXEC_END', execId, {
      Modo: modeLabel,
      Observacao: 'Erro fatal: ' + truncateText_(e && e.message ? e.message : String(e), 260),
    });
    throw e;
  }
}


/** 
 * Alias global para compatibilidade. 
 * Centralizado em CONFIG no topo do arquivo.
 */
var CFG = CONFIG;
function getProgramacaoHeaderRow_() { return CFG.PROGRAMACAO_HEADER_ROW || 3; }
function getDisponibilidadeHeaderRow_() { return CFG.DISPONIBILIDADE_HEADER_ROW || 1; }
function setupProgramacaoColumns() {
  const ss = SpreadsheetApp.getActive();
  const sheet = findSheetCaseInsensitive_(ss, CFG.SHEET_PROGRAMACAO);
  if (!sheet) throw new Error('Aba n\u00e3o encontrada: ' + CFG.SHEET_PROGRAMACAO);
  const headerRow = getProgramacaoHeaderRow_();
  const headers = mapHeaders_(sheet, headerRow);
  const notaCol = headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.notaFiscal));
  if (!notaCol) throw new Error('Cabe\u00e7alho Nota fiscal n\u00e3o encontrado em ' + CFG.SHEET_PROGRAMACAO);
  const hasPlaca = !!headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.placa));
  const hasMotorista = !!headers.get(normHeader_(CFG.PROGRAMACAO_HEADERS.motorista));
  if (!hasPlaca || !hasMotorista) {
    sheet.insertColumnsBefore(notaCol, 2);
    sheet.getRange(headerRow, notaCol, 1, 2).setValues([[CFG.PROGRAMACAO_HEADERS.placa, CFG.PROGRAMACAO_HEADERS.motorista]]);
  }
  setupProgramacaoStatusColumns_();
}

function buildAttemicsSemPlanoRows_(options) {
  const opts = options || {};
  const ss = opts.ss || SpreadsheetApp.getActiveSpreadsheet();
  const shDisp = findSheetCaseInsensitive_(ss, 'DISPONIBILIDADE');
  const shProg = findSheetCaseInsensitive_(ss, 'PROGRAMACAO');
  if (!shDisp || !shProg) return [];

  const progHeaderRow = getProgramacaoHeaderRow_();
  const progHeaderMap = mapHeaders_(shProg, progHeaderRow);
  const cProgPlanos = getHeaderColRequired_(progHeaderMap, ['PLANOS'], 'Programacao');
  const cProgPlaca = getHeaderColRequired_(progHeaderMap, ['PLACA'], 'Programacao');
  const progRows = getSheetDataRowsDisplay_(shProg, shProg.getLastColumn(), progHeaderRow);
  const placasComPlano = {};
  for (let i = 0; i < progRows.length; i++) {
    const p = progRows[i] || [];
    const plano = String(p[cProgPlanos - 1] || '').trim();
    const placa = normalizePlate_(p[cProgPlaca - 1]);
    if (plano && placa) placasComPlano[placa] = true;
  }

  const dispHeaderRow = getDisponibilidadeHeaderRow_();
  const dispHeaderMap = mapHeaders_(shDisp, dispHeaderRow);
  const cDispData = getHeaderColOptional_(dispHeaderMap, ['DATA']);
  const cDispPlaca = getHeaderColRequired_(dispHeaderMap, ['PLACA'], 'Disponibilidade');
  const cDispMotorista = getHeaderColOptional_(dispHeaderMap, ['MOTORISTA']);
  const cDispPerfil = getHeaderColOptional_(dispHeaderMap, ['PERFIL']);
  const cDispStatus = getHeaderColOptional_(dispHeaderMap, ['DISPONIBILIDADE']);
  const cDispContato = getHeaderColOptional_(dispHeaderMap, ['CONTATO', 'CONTATO MOTORISTA', 'TELEFONE']);
  const dispRows = getSheetDataRowsDisplay_(shDisp, shDisp.getLastColumn(), dispHeaderRow);
  const today = toDateOnly_(new Date());
  const out = [];
  const seenSemPlanoByPlaca = {};

  for (let i = 0; i < dispRows.length; i++) {
    const r = dispRows[i] || [];
    if (cDispData) {
      const dt = toDateOnly_(r[cDispData - 1]);
      if (!dt || !isSameDay_(dt, today)) continue;
    }
    const statusNorm = cDispStatus ? normalizeHeader_(r[cDispStatus - 1]) : '';
    if (statusNorm && !isDisponibilidadeStatusDisponivel_(statusNorm)) continue;
    const placa = String(r[cDispPlaca - 1] || '').trim();
    const placaKey = normalizePlate_(placa);
    if (!placaKey) continue;
    if (placasComPlano[placaKey]) continue;
    if (seenSemPlanoByPlaca[placaKey]) continue;
    seenSemPlanoByPlaca[placaKey] = true;
    out.push({
      planoKey: 'SEM_PLANO',
      plano: 'SEM PLANO',
      complemento: '',
      perfil: cDispPerfil ? String(r[cDispPerfil - 1] || '').trim() : '',
      motorista: cDispMotorista ? String(r[cDispMotorista - 1] || '').trim() : '',
      placa: placa,
      telefoneOriginal: cDispContato ? sanitizePhoneForAttemics_(r[cDispContato - 1]) : '',
      telefoneDestino: '',
      dataSaida: '',
      dataCarregamento: '',
      faixaAgendaProgramacao: '',
      agendaCarregamento: '',
      horarioAgendaMsgBase: '',
      regiao: '',
      cidade: '',
      bairros: '',
      senhaProtocolo: '',
      peso: '',
      valor: '',
      entregas: '',
      notaFiscal: '',
      isPlano610: false,
      isSemPlano: true,
      rowProgramacao: '',
      msgBaseMatched: false,
      msgBaseRowIndex: '',
      msgBasePlanoRaw: '',
      _attMsgResumo: 'sem_plano=disponibilidade',
    });
  }
  return out;
}

function isDisponibilidadeStatusDisponivel_(statusValue) {
  const s = normalizeHeader_(statusValue);
  if (!s) return true;
  if (s === normalizeHeader_('DISPONIVEL')) return true;
  if (s === normalizeHeader_('DISPONIVEL TOTAL')) return true;
  if (s === normalizeHeader_('DISPONIVEL PARCIAL')) return true;
  return false;
}
function onEdit(e) {
  if (!e || !e.range) return;
  try {
    const range = e.range, sheet = range.getSheet();
    if (normalizeHeader_(sheet.getName()) === normalizeHeader_(getJornadaSheetName_())) {
      handleJornadaOnEdit_(e);
      return;
    }
    const sheetNameNorm = normalizeHeader_(sheet.getName());
    const isProgSheet = sheetNameNorm === normalizeHeader_(CFG.SHEET_PROGRAMACAO) || 
                       sheetNameNorm.indexOf('PROGRAMACAO') !== -1 ||
                       sheetNameNorm.indexOf('PROGRAMAÇÃO') !== -1;

    if (!isProgSheet) return;
    
    // Diagnóstico inicial para o usuário
    toast_(SpreadsheetApp.getActive(), "🔍 Processando sincronização automática...");

    const cols = findRequiredColumns_();
    if (cols.disponibilidade.sheet) {
       toast_(SpreadsheetApp.getActive(), "✅ Aba de Disponibilidade detectada: " + cols.disponibilidade.sheet.getName());
    }

    const startCol = range.getColumn();
    const endCol = startCol + range.getNumColumns() - 1;
    const isPlacaCol = cols.programacao.placaCol >= startCol && cols.programacao.placaCol <= endCol;
    const isMotoristaCol = cols.programacao.motoristaCol >= startCol && cols.programacao.motoristaCol <= endCol;
    const isFaixaCol = !!cols.programacao.faixaAgendaCol && cols.programacao.faixaAgendaCol >= startCol && cols.programacao.faixaAgendaCol <= endCol;
    const isDataSaidaCol = !!cols.programacao.dataSaidaCol && cols.programacao.dataSaidaCol >= startCol && cols.programacao.dataSaidaCol <= endCol;
    const isPlanoCol = !!cols.programacao.planosCol && cols.programacao.planosCol >= startCol && cols.programacao.planosCol <= endCol;
    if (!isPlacaCol && !isMotoristaCol && !isFaixaCol && !isDataSaidaCol && !isPlanoCol) return;

    const startRow = Math.max(range.getRow(), cols.programacao.headerRow + 1);
    const endRow = range.getRow() + range.getNumRows() - 1;
    if (endRow < startRow) return;

    for (let r = startRow; r <= endRow; r++) {
      if (isPlacaCol || isMotoristaCol) preencherMotoristaPorPlaca_(sheet, r, cols);
      if (isFaixaCol) {
        try { preencherDataCarregamentoPorFaixaAgenda_(sheet, r, cols); } catch (e2) {}
      }
      if (isDataSaidaCol) {
        try { syncJornadaInternaFromProgramacaoRow_(sheet, r, cols); } catch (e2) {}
      }
      if (isPlacaCol || isPlanoCol || isDataSaidaCol) {
        try { syncDisponibilidadeProgramadoFromProgramacaoRow_(sheet, r, cols, e); } catch (e2) {}
      }
      if (isFaixaCol || isPlacaCol) {
        if (getClickUpProgramacaoConfig_().ENABLE_ONEDIT_JANELA_SYNC) {
          try { syncClickUpProgramacaoOnEditRow_(sheet, r, cols, { syncPlaca: isPlacaCol, syncJanela: isFaixaCol || isPlacaCol }); } catch (e2) {}
        }
      }
    }
  } catch (err) { toast_(SpreadsheetApp.getActive(), 'Erro no onEdit: ' + (err && err.message ? err.message : err)); }

  // --- TRATAMENTO DE XML_IMPORTADOS (Sincronização Externa Manual) ---
  try {
    const xmlSheetName = (CONFIG.XML_RECEBIMENTO && CONFIG.XML_RECEBIMENTO.SHEET_XML) || 'XML_IMPORTADOS';
    if (sheet.getName() === xmlSheetName) {
      const startR = e.range.getRow();
      const numR = e.range.getNumRows();
      // Apenas se não for a linha de cabeçalho
      if (startR > 1) {
        const rowsToSync = sheet.getRange(startR, 1, numR, sheet.getLastColumn()).getValues();
        const cfg = CONFIG.XML_RECEBIMENTO || {};
        if (cfg.GRU_BASE_PESO_ENABLED) {
          syncXmlImportRowsToGruBasePeso_(rowsToSync, cfg);
        }
      }
    }
  } catch (eXml) {
    console.error('Erro na sincronização onEdit XML: ' + eXml);
  }
}

function preencherDataCarregamentoPorFaixaAgenda_(sheet, row, cachedCols) {
  const cols = cachedCols || findRequiredColumns_();
  const pcols = cols.programacao || {};
  if (!pcols.faixaAgendaCol || !pcols.dataCarregamentoCol) return;

  const faixaText = String(sheet.getRange(row, pcols.faixaAgendaCol).getDisplayValue() || '').trim();
  if (!faixaText) {
    sheet.getRange(row, pcols.dataCarregamentoCol).clearContent();
    return;
  }

  const faixaStartMinutes = parseFaixaAgendaStartMinutes_(faixaText);
  if (faixaStartMinutes == null) return;

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const target = new Date(now);
  target.setHours(0, 0, 0, 0);
  if (faixaStartMinutes <= nowMinutes) {
    target.setDate(target.getDate() + 1);
  }

  sheet.getRange(row, pcols.dataCarregamentoCol).setValue(target);
}

function parseFaixaAgendaStartMinutes_(faixaText) {
  const s = String(faixaText || '').trim();
  if (!s) return null;
  const m = s.match(/(\d{1,2})\s*:\s*(\d{2})/);
  if (!m) return null;
  const hh = Number(m[1]);
  const mm = Number(m[2]);
  if (!isFinite(hh) || !isFinite(mm) || hh < 0 || hh > 23 || mm < 0 || mm > 59) return null;
  return hh * 60 + mm;
}

function preencherMotoristaPorPlaca_(sheet, row, cachedCols) {
  const cols = cachedCols || findRequiredColumns_();
  const pcols = cols.programacao || {};
  const placaCell = sheet.getRange(row, pcols.placaCol);
  const motoristaCell = sheet.getRange(row, pcols.motoristaCol);
  const placaRaw = String(placaCell.getDisplayValue() || '').trim();
  const placaKey = normalizePlate_(placaRaw);
  if (!placaKey) {
    motoristaCell.clearContent();
    placaCell.clearNote();
    clearProgramacaoRowError_(sheet, row, cols.programacao.notaFiscalCol);
    return;
  }
  if (placaRaw !== placaKey) placaCell.setValue(placaKey);
  if (isDuplicatePlacaInProgramacao_(sheet, row, pcols.placaCol, placaKey)) {
    rejectPlacaInput_(sheet, row, cols.programacao, placaCell, motoristaCell, 'Placa duplicada na Programacao: ' + placaRaw);
    return;
  }

  // Obter a data de referência da linha. Prioriza Data de CARREGAMENTO, pois o vínculo 
  // com a Disponibilidade geralmente ocorre no dia do carregamento.
  let dateRef = toDateOnly_(new Date());
  let dRefLoaded = false;
  
  if (pcols.dataCarregamentoCol) {
    const dVal = sheet.getRange(row, pcols.dataCarregamentoCol).getValue();
    const dTxt = sheet.getRange(row, pcols.dataCarregamentoCol).getDisplayValue();
    const dRef = toDateOnly_(dVal) || parseDateBR_(dTxt) || toDateOnly_(dTxt);
    if (dRef) {
      dateRef = dRef;
      dRefLoaded = true;
    }
  }

  if (!dRefLoaded && pcols.dataSaidaCol) {
    const dVal = sheet.getRange(row, pcols.dataSaidaCol).getValue();
    const dTxt = sheet.getRange(row, pcols.dataSaidaCol).getDisplayValue();
    const dRef = toDateOnly_(dVal) || parseDateBR_(dTxt) || toDateOnly_(dTxt);
    if (dRef) dateRef = dRef;
  }

  // Tenta encontrar a placa no índice da data correspondente
  let idx = buildDisponibilidadeIndexCached_(cols.disponibilidade.sheet, cols.disponibilidade.headerRow, dateRef);
  let motorista = idx.byPlate.get(placaKey);
  let resolvedDate = dateRef;

  // FALLBACK: Se não encontrou na data programada e a data é futura, tenta HOJE
  const today = toDateOnly_(new Date());
  if (!motorista && !isSameDay_(dateRef, today) && dateRef > today) {
    const todayIndex = buildDisponibilidadeIndexCached_(cols.disponibilidade.sheet, cols.disponibilidade.headerRow, today);
    const mToday = todayIndex.byPlate.get(placaKey);
    if (mToday) {
      idx = todayIndex;
      motorista = mToday;
      resolvedDate = today;
    }
  }

  if (idx.duplicatesToday.has(placaKey)) {
    rejectPlacaInput_(sheet, row, cols.programacao, placaCell, motoristaCell, 'Placa duplicada na disponibilidade em ' + Utilities.formatDate(resolvedDate, Session.getScriptTimeZone(), 'dd/MM/yyyy') + ': ' + placaRaw);
    return;
  }
  if (!motorista && idx.unavailableToday.has(placaKey)) {
    rejectPlacaInput_(sheet, row, cols.programacao, placaCell, motoristaCell, 'Placa indisponível em ' + Utilities.formatDate(resolvedDate, Session.getScriptTimeZone(), 'dd/MM/yyyy') + ': ' + placaRaw);
    return;
  }
  if (!motorista) {
    rejectPlacaInput_(sheet, row, cols.programacao, placaCell, motoristaCell, 'Placa não encontrada/disponível em ' + Utilities.formatDate(dateRef, Session.getScriptTimeZone(), 'dd/MM/yyyy') + ': ' + placaRaw);
    return;
  }
  motoristaCell.setValue(motorista || '');
  placaCell.clearNote();
  clearProgramacaoRowError_(sheet, row, cols.programacao.notaFiscalCol);
}
function findRequiredColumns_() {
  const ss = SpreadsheetApp.getActive();
  const prog = findSheetCaseInsensitive_(ss, CFG.SHEET_PROGRAMACAO);
  // Tenta encontrar a aba Disponibilidade por múltiplos nomes (inclusive 'THX')
  let disp = findSheetCaseInsensitive_(ss, CFG.SHEET_DISPONIBILIDADE);
  if (!disp) disp = findSheetCaseInsensitive_(ss, 'THX');
  if (!disp) disp = findSheetCaseInsensitive_(ss, 'DISPONIBILIDADE THX');
  if (!prog) throw new Error('Aba não encontrada: ' + CFG.SHEET_PROGRAMACAO);
  if (!disp) throw new Error('Aba Disponibilidade não encontrada. Tentados: DISPONIBILIDADE, THX');
  const progHeaderRow = getProgramacaoHeaderRow_();
  const dispHeaderRow = getDisponibilidadeHeaderRow_();
  const progHeaders = mapHeaders_(prog, progHeaderRow), dispHeaders = mapHeaders_(disp, dispHeaderRow);
  const placaCol = progHeaders.get(normHeader_(CFG.PROGRAMACAO_HEADERS.placa));
  const motoristaCol = progHeaders.get(normHeader_(CFG.PROGRAMACAO_HEADERS.motorista));
  const greenMileStatusCol = progHeaders.get(normHeader_(CFG.PROGRAMACAO_HEADERS.greenMileStatus));
  const attemicsStatusCol = progHeaders.get(normHeader_(CFG.PROGRAMACAO_HEADERS.attemicsStatus));
  const clickupStatusCol = progHeaders.get(normHeader_(CFG.PROGRAMACAO_HEADERS.clickupStatus));
  const clickupCol = progHeaders.get(normHeader_(CFG.PROGRAMACAO_HEADERS.clickup));
  const faixaAgendaCol = getHeaderColOptional_(progHeaders, ['FAIXA DE AGENDA']);
  const dataCarregamentoCol = getHeaderColOptional_(progHeaders, ['DATA DE CARREGAMENTO']);
  const dataSaidaCol = getHeaderColOptional_(progHeaders, ['DATA DE SAIDA', 'DATA DE SAÍDA']);
  const planosCol = getHeaderColOptional_(progHeaders, ['PLANOS']);
  const notaFiscalCol = progHeaders.get(normHeader_(CFG.PROGRAMACAO_HEADERS.notaFiscal));
  const dispPlacaCol = dispHeaders.get(normHeader_(CFG.DISP_HEADERS.placa));
  const dispMotoristaCol = dispHeaders.get(normHeader_(CFG.DISP_HEADERS.motorista));
  if (!placaCol || !motoristaCol) throw new Error('Cabeçalhos Placa/Motorista não encontrados na aba ' + CFG.SHEET_PROGRAMACAO + '. Execute setupProgramacaoColumns().');
  if (!notaFiscalCol) throw new Error('Cabeçalho Nota fiscal não encontrado na aba ' + CFG.SHEET_PROGRAMACAO + '.');
  if (!dispPlacaCol || !dispMotoristaCol) throw new Error('Cabeçalhos PLACA/MOTORISTA não encontrados na aba Disponibilidade.');
  return { programacao: { sheet: prog, headerRow: progHeaderRow, planosCol, faixaAgendaCol, dataCarregamentoCol, dataSaidaCol, placaCol, motoristaCol, greenMileStatusCol, attemicsStatusCol, clickupStatusCol, clickupCol, notaFiscalCol }, disponibilidade: { sheet: disp, headerRow: dispHeaderRow, placaCol: dispPlacaCol, motoristaCol: dispMotoristaCol } };
}
function buildDisponibilidadeIndex_(sheet, headerRow, refDate) {
  const result = {
    byPlate: new Map(),
    duplicatesToday: new Set(),
    unavailableToday: new Set(),
  };
  const lastRow = sheet.getLastRow(), lastCol = sheet.getLastColumn();
  if (lastRow < headerRow + 1 || lastCol < 1) return result;
  const data = sheet.getRange(headerRow, 1, lastRow - headerRow + 1, lastCol).getDisplayValues();
  const headers = data[0] || [];
  let pIdx = -1, mIdx = -1, dIdx = -1, sIdx = -1;
  for (let i = 0; i < headers.length; i++) {
    const h = normalizeHeader_(headers[i]);
    if (h === normalizeHeader_(CFG.DISP_HEADERS.placa)) pIdx = i;
    if (h === normalizeHeader_(CFG.DISP_HEADERS.motorista)) mIdx = i;
    if (h === normalizeHeader_('DATA')) dIdx = i;
    if (h === normalizeHeader_('DISPONIBILIDADE')) sIdx = i;
  }
  if (pIdx === -1 || mIdx === -1) throw new Error('Cabeçalhos PLACA/MOTORISTA não encontrados na aba Disponibilidade.');
  // Usa refDate se fornecida, caso contrário usa hoje
  const targetDate = (refDate && !isNaN(refDate)) ? refDate : toDateOnly_(new Date());
  for (let r = 1; r < data.length; r++) {
    if (dIdx !== -1) {
      const rowDate = parseDisponibilidadeDateForIndex_(data[r][dIdx]);
      if (!rowDate || !isSameDay_(rowDate, targetDate)) continue;
    }

    const key = normalizePlate_(data[r][pIdx]);
    if (!key) continue;
    const motorista = String(data[r][mIdx] || '').trim();
    const status = sIdx !== -1 ? normalizeHeader_(data[r][sIdx]) : '';
    const isIndisponivel = status === normalizeHeader_('INDISPONIVEL') || status === normalizeHeader_('INDISPONÍVEL');

    if (isIndisponivel) {
      if (!result.byPlate.has(key) && !result.unavailableToday.has(key)) result.unavailableToday.add(key);
      continue;
    }

    if (!result.byPlate.has(key)) {
      result.byPlate.set(key, motorista);
      result.unavailableToday.delete(key);
    }
  }
  return result;
}

function parseDisponibilidadeDateForIndex_(value) {
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value)) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }
  const text = String(value == null ? '' : value).trim();
  if (!text) return null;
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(text)) return null;
  return parseDateBR_(text);
}
function buildDisponibilidadeIndexCached_(sheet, headerRow, refDate) {
  const cache = CacheService.getScriptCache();
  const targetDate = (refDate && !isNaN(refDate)) ? refDate : new Date();
  const dayKey = targetDate.getFullYear() + '-' + (targetDate.getMonth() + 1) + '-' + targetDate.getDate();
  const cacheKey = [
    'dispIndex',
    normalizeHeader_(sheet.getName()),
    String(headerRow || 1),
    String(sheet.getLastRow()),
    String(sheet.getLastColumn()),
    dayKey,
  ].join(':');

  try {
    const raw = cache.get(cacheKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        byPlate: new Map(parsed.byPlate || []),
        duplicatesToday: new Set(parsed.duplicatesToday || []),
        unavailableToday: new Set(parsed.unavailableToday || []),
      };
    }
  } catch (e) {
    // fallback para rebuild
  }

  const built = buildDisponibilidadeIndex_(sheet, headerRow, refDate);
  try {
    cache.put(cacheKey, JSON.stringify({
      byPlate: Array.from(built.byPlate.entries()),
      duplicatesToday: Array.from(built.duplicatesToday.values()),
      unavailableToday: Array.from(built.unavailableToday.values()),
    }), 30);
  } catch (e) {
    // sem cache, segue normal
  }
  return built;
}
function mapHeaders_(sheet, headerRow) { const out = new Map(); const lastCol = sheet.getLastColumn(); if (lastCol < 1) return out; const values = sheet.getRange(headerRow, 1, 1, lastCol).getDisplayValues()[0]; for (let c = 0; c < values.length; c++) { const raw = String(values[c] || '').trim(); if (!raw) continue; out.set(normHeader_(raw), c + 1); out.set(normalizeHeader_(raw), c + 1); } return out; }
function rejectPlacaInput_(sheet, row, programacaoCols, placaCell, motoristaCell, msg) {
  placaCell.clearContent();
  motoristaCell.clearContent();
  placaCell.setNote(msg);
  markProgramacaoRowError_(sheet, row, programacaoCols.notaFiscalCol);
  toast_(SpreadsheetApp.getActive(), msg);
}
function isDuplicatePlacaInProgramacao_(sheet, currentRow, placaCol, placaKey) {
  const lastRow = sheet.getLastRow();
  const headerRow = getProgramacaoHeaderRow_();
  if (lastRow <= headerRow) return false;
  const values = sheet.getRange(headerRow + 1, placaCol, lastRow - headerRow, 1).getDisplayValues();
  let count = 0;
  for (let i = 0; i < values.length; i++) {
    const rowNumber = headerRow + 1 + i;
    if (rowNumber === currentRow) continue;
    if (normalizePlate_(values[i][0]) === placaKey) {
      count++;
      if (count >= 1) return true;
    }
  }
  return false;
}
function markProgramacaoRowError_(sheet, row, lastCol) { try { sheet.getRange(row, 1, 1, Math.max(1, lastCol || 1)).setBackground('#fce8e6'); } catch (e) {} }
function clearProgramacaoRowError_(sheet, row, lastCol) { try { sheet.getRange(row, 1, 1, Math.max(1, lastCol || 1)).setBackground(null); } catch (e) {} }
function normalizePlate_(value) { return String(value || '').toUpperCase().trim().replace(/\s+/g, '').replace(/-/g, ''); }
function normHeader_(value) { return String(value || '').trim().toLowerCase(); }
function toast_(ss, message) { try { ss.toast(message, CFG.TOAST_TITLE, 5); } catch (err) {} }

function getJornadaSheetName_() { return 'Jornada Interna Mot.'; }
function getJornadaHeaders_() {
  return [
    'Data',
    'Plano de Viagem',
    'Perfil do Ve\u00edculo',
    'Placa',
    'Motorista',
    'Quantidade de entregas',
    'Chegada no CD',
    'Hora Chegada',
    'Sa\u00edda do CD',
    'Hora Sa\u00edda',
    'Jornada interna',
    'Classifica\u00e7\u00e3o Jornada'
  ];
}

function setupJornadaInterna() { ensureJornadaInternaSheet_(); }

function ensureJornadaInternaSheet_() {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(getJornadaSheetName_()) || findSheetCaseInsensitive_(ss, getJornadaSheetName_());
  if (!sh) sh = ss.insertSheet(getJornadaSheetName_());
  const headers = getJornadaHeaders_();
  ensureHeaders_(sh, headers, 1);
  sh.setFrozenRows(1);
  const hmap = mapHeaders_(sh, 1);
  const cData = getHeaderColRequired_(hmap, ['DATA'], 'Jornada');
  const cChkIn = getHeaderColRequired_(hmap, ['CHEGADA NO CD'], 'Jornada');
  const cHoraIn = getHeaderColRequired_(hmap, ['HORA CHEGADA'], 'Jornada');
  const cChkOut = getHeaderColRequired_(hmap, ['SAIDA DO CD', 'SA\u00cdDA DO CD'], 'Jornada');
  const cHoraOut = getHeaderColRequired_(hmap, ['HORA SAIDA', 'HORA SA\u00cdDA'], 'Jornada');
  const cDur = getHeaderColRequired_(hmap, ['JORNADA INTERNA'], 'Jornada');
  const maxRows = sh.getMaxRows();
  const dv = SpreadsheetApp.newDataValidation().requireCheckbox().build();
  sh.getRange(2, cChkIn, Math.max(maxRows - 1, 1), 1).setDataValidation(dv);
  sh.getRange(2, cChkOut, Math.max(maxRows - 1, 1), 1).setDataValidation(dv);
  sh.getRange(2, cData, Math.max(maxRows - 1, 1), 1).setNumberFormat('dd/mm/yyyy');
  sh.getRange(2, cHoraIn, Math.max(maxRows - 1, 1), 1).setNumberFormat('hh:mm:ss');
  sh.getRange(2, cHoraOut, Math.max(maxRows - 1, 1), 1).setNumberFormat('hh:mm:ss');
  sh.getRange(2, cDur, Math.max(maxRows - 1, 1), 1).setNumberFormat('[h]:mm');
  return sh;
}

function syncJornadaInternaToday() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const src = findSheetCaseInsensitive_(ss, CFG.SHEET_PROGRAMACAO);
  if (!src) throw new Error('Aba Programacao nao encontrada.');
  const tgt = ensureJornadaInternaSheet_();
  const msgBase = findSheetCaseInsensitive_(ss, CONFIG.MESSAGE_SHEET_NAME || 'Programacao_Mensagem_Base');
  const headerRow = getProgramacaoHeaderRow_();
  const hmap = mapHeaders_(src, headerRow);
  const cPlanos = getHeaderColRequired_(hmap, ['PLANOS'], 'Programacao');
  const cPerfil = getHeaderColRequired_(hmap, ['PERFIL'], 'Programacao');
  const cPlaca = getHeaderColRequired_(hmap, ['PLACA'], 'Programacao');
  const cMotorista = getHeaderColRequired_(hmap, ['MOTORISTA'], 'Programacao');
  const cDataSaida = getHeaderColOptional_(hmap, ['DATA DE SAIDA', 'DATA DE SA\u00cdDA']);
  const cDataCarreg = getHeaderColOptional_(hmap, ['DATA DE CARREGAMENTO']);
  const lastRowSrc = src.getLastRow();
  const lastColSrc = src.getLastColumn();
  const rows = getSheetDataRowsDisplay_(src, lastColSrc, headerRow);
  const rowsRaw = lastRowSrc > headerRow ? src.getRange(headerRow + 1, 1, lastRowSrc - headerRow, lastColSrc).getValues() : [];
  const hmapTgt = mapHeaders_(tgt, 1);
  const cDataTgt = getHeaderColRequired_(hmapTgt, ['DATA'], 'Jornada');
  const cPlanoTgt = getHeaderColRequired_(hmapTgt, ['PLANO DE VIAGEM'], 'Jornada');
  const cPlacaTgt = getHeaderColRequired_(hmapTgt, ['PLACA'], 'Jornada');
  const lastRowTgt = tgt.getLastRow();
  const existingRows = lastRowTgt > 1 ? tgt.getRange(2, 1, lastRowTgt - 1, tgt.getLastColumn()).getDisplayValues() : [];
  const existingPlanoPlaca = {};
  for (let i = 0; i < existingRows.length; i++) {
    const row = existingRows[i] || [];
    const plano = String(row[cPlanoTgt - 1] == null ? '' : row[cPlanoTgt - 1]).trim();
    const placa = String(row[cPlacaTgt - 1] == null ? '' : row[cPlacaTgt - 1]).trim().toUpperCase();
    if (!plano || !placa) continue;
    existingPlanoPlaca[plano + '|' + placa] = true;
  }
  const quantidadeByPlano = {};
  if (msgBase) {
    const msgHeaderMap = mapHeaders_(msgBase, 1);
    const cMsgPlanos = getHeaderColRequired_(msgHeaderMap, ['PLANOS'], 'Programacao_Mensagem_Base');
    const cMsgQtd = getHeaderColOptional_(msgHeaderMap, ['QUANTIDADE DE ENTREGAS', 'QTD ENTREGAS', 'ENTREGAS']);
    if (cMsgQtd) {
      const msgRows = getSheetDataRowsDisplay_(msgBase, msgBase.getLastColumn(), 1);
      for (let i = 0; i < msgRows.length; i++) {
        const m = msgRows[i] || [];
        const plano = String(m[cMsgPlanos - 1] == null ? '' : m[cMsgPlanos - 1]).trim();
        const key = normalizePlanoKeyForMatch_(plano);
        if (!key || quantidadeByPlano[key] != null) continue;
        quantidadeByPlano[key] = m[cMsgQtd - 1];
      }
    }
  }
  const today = toDateOnly_(new Date());
  const out = [];
  let withPlacaCount = 0;
  let duplicateCount = 0;
  let firstDuplicateKey = '';
  let insertedStartRow = 0;
  function alreadyExistsByPlanoPlaca_(plano, placa) {
    const planoKey = String(plano == null ? '' : plano).trim();
    const placaKey = String(placa == null ? '' : placa).trim().toUpperCase();
    if (!planoKey || !placaKey) return false;
    const key = planoKey + '|' + placaKey;
    if (existingPlanoPlaca[key]) {
      if (!firstDuplicateKey) firstDuplicateKey = key;
      return true;
    }

    for (let j = 0; j < out.length; j++) {
      const row = out[j] || [];
      const p = String(row[1] == null ? '' : row[1]).trim();
      const pl = String(row[3] == null ? '' : row[3]).trim().toUpperCase();
      if (p === planoKey && pl === placaKey) return true;
    }

    return false;
  }
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i] || [];
    const rr = rowsRaw[i] || [];
    const dtSaida = cDataSaida ? (toDateOnly_(rr[cDataSaida - 1]) || parseDateBR_(r[cDataSaida - 1]) || toDateOnly_(r[cDataSaida - 1])) : null;
    const dtCarreg = cDataCarreg ? (toDateOnly_(rr[cDataCarreg - 1]) || parseDateBR_(r[cDataCarreg - 1]) || toDateOnly_(r[cDataCarreg - 1])) : null;
    const dtRef = dtSaida || dtCarreg || today;
    const planoDisplay = String(r[cPlanos - 1] == null ? '' : r[cPlanos - 1]).trim();
    const perfilDisplay = String(cPerfil ? (r[cPerfil - 1] == null ? '' : r[cPerfil - 1]) : '').trim();
    const placaDisplay = String(r[cPlaca - 1] == null ? '' : r[cPlaca - 1]).trim();
    const motoristaDisplay = String(r[cMotorista - 1] == null ? '' : r[cMotorista - 1]).trim();
    const plano = planoDisplay || String(rr[cPlanos - 1] == null ? '' : rr[cPlanos - 1]).trim();
    const perfil = perfilDisplay || (cPerfil ? String(rr[cPerfil - 1] == null ? '' : rr[cPerfil - 1]).trim() : '');
    const placa = (placaDisplay || String(rr[cPlaca - 1] == null ? '' : rr[cPlaca - 1]).trim()).toUpperCase();
    const motorista = motoristaDisplay || String(rr[cMotorista - 1] == null ? '' : rr[cMotorista - 1]).trim();
    if (!placa) continue;
    withPlacaCount++;
    const planoKey = normalizePlanoKeyForMatch_(plano);
    const qtd = quantidadeByPlano[planoKey] != null ? quantidadeByPlano[planoKey] : '';
    if (alreadyExistsByPlanoPlaca_(plano, placa)) {
      duplicateCount++;
      continue;
    }
    out.push([dtRef || new Date(), plano, perfil, placa, motorista, qtd, false, '', false, '', '', '']);
  }
  if (out.length) {
    const startRow = findFirstEmptyRowInColumn_(tgt, 1, 2);
    insertedStartRow = startRow;
    tgt.getRange(startRow, 1, out.length, getJornadaHeaders_().length).setValues(out);
    const cChkIn = getHeaderColRequired_(hmapTgt, ['CHEGADA NO CD'], 'Jornada');
    const cHoraIn = getHeaderColRequired_(hmapTgt, ['HORA CHEGADA'], 'Jornada');
    const cChkOut = getHeaderColRequired_(hmapTgt, ['SAIDA DO CD', 'SA\u00cdDA DO CD'], 'Jornada');
    const cHoraOut = getHeaderColRequired_(hmapTgt, ['HORA SAIDA', 'HORA SA\u00cdDA'], 'Jornada');
    const cDur = getHeaderColRequired_(hmapTgt, ['JORNADA INTERNA'], 'Jornada');
    tgt.getRange(startRow, cDataTgt, out.length, 1).setNumberFormat('dd/mm/yyyy');
    tgt.getRange(startRow, cHoraIn, out.length, 1).setNumberFormat('hh:mm:ss');
    tgt.getRange(startRow, cHoraOut, out.length, 1).setNumberFormat('hh:mm:ss');
    tgt.getRange(startRow, cDur, out.length, 1).setNumberFormat('[h]:mm');
    const dv = SpreadsheetApp.newDataValidation().requireCheckbox().build();
    tgt.getRange(startRow, cChkIn, out.length, 1).setDataValidation(dv);
    tgt.getRange(startRow, cChkOut, out.length, 1).setDataValidation(dv);
  }
  try { syncDisponibilidadeProgramadoFromProgramacao_(); } catch (e) {}
  toast_(
    ss,
    'Jornada: inseridas=' + out.length + ' | com placa=' + withPlacaCount + ' | duplicadas=' + duplicateCount + (firstDuplicateKey ? ' | dup=' + firstDuplicateKey : '') + ' | aba=' + tgt.getName() + ' | linha inicial=' + (insertedStartRow || '-')
  );
  return { ok: true, inserted: out.length, scanned: rows.length, withPlaca: withPlacaCount, duplicated: duplicateCount, firstDuplicateKey: firstDuplicateKey };
}

function debugJornadaDuplicidade() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const src = findSheetCaseInsensitive_(ss, CFG.SHEET_PROGRAMACAO);
  if (!src) throw new Error('Aba Programacao nao encontrada.');
  const tgt = ensureJornadaInternaSheet_();

  const srcHeaderRow = getProgramacaoHeaderRow_();
  const hSrc = mapHeaders_(src, srcHeaderRow);
  const cSrcPlano = getHeaderColRequired_(hSrc, ['PLANOS'], 'Programacao');
  const cSrcPlaca = getHeaderColRequired_(hSrc, ['PLACA'], 'Programacao');

  const hTgt = mapHeaders_(tgt, 1);
  const cTgtPlano = getHeaderColRequired_(hTgt, ['PLANO DE VIAGEM'], 'Jornada');
  const cTgtPlaca = getHeaderColRequired_(hTgt, ['PLACA'], 'Jornada');

  const srcLastRow = src.getLastRow();
  const srcLastCol = src.getLastColumn();
  const srcRows = srcLastRow > srcHeaderRow ? src.getRange(srcHeaderRow + 1, 1, srcLastRow - srcHeaderRow, srcLastCol).getDisplayValues() : [];

  const tgtLastRow = tgt.getLastRow();
  const tgtLastCol = tgt.getLastColumn();
  const tgtRows = tgtLastRow > 1 ? tgt.getRange(2, 1, tgtLastRow - 1, tgtLastCol).getDisplayValues() : [];

  const byKeyInTgt = {};
  for (let i = 0; i < tgtRows.length; i++) {
    const row = tgtRows[i] || [];
    const plano = String(row[cTgtPlano - 1] == null ? '' : row[cTgtPlano - 1]).trim();
    const placa = String(row[cTgtPlaca - 1] == null ? '' : row[cTgtPlaca - 1]).trim().toUpperCase();
    if (!plano || !placa) continue;
    const key = plano + '|' + placa;
    if (!byKeyInTgt[key]) byKeyInTgt[key] = [];
    byKeyInTgt[key].push(i + 2);
  }

  const duplicates = [];
  const srcWithoutPlaca = [];
  for (let i = 0; i < srcRows.length; i++) {
    const row = srcRows[i] || [];
    const plano = String(row[cSrcPlano - 1] == null ? '' : row[cSrcPlano - 1]).trim();
    const placa = String(row[cSrcPlaca - 1] == null ? '' : row[cSrcPlaca - 1]).trim().toUpperCase();
    const srcRow = srcHeaderRow + 1 + i;
    if (!placa) {
      srcWithoutPlaca.push(srcRow);
      continue;
    }
    const key = plano + '|' + placa;
    if (byKeyInTgt[key] && byKeyInTgt[key].length) {
      duplicates.push({
        key: key,
        sourceRow: srcRow,
        targetRows: byKeyInTgt[key].slice(0, 20),
      });
    }
  }

  const report = {
    ok: true,
    sourceSheet: src.getName(),
    targetSheet: tgt.getName(),
    sourceRowsScanned: srcRows.length,
    targetRowsScanned: tgtRows.length,
    sourceRowsWithoutPlaca: srcWithoutPlaca,
    duplicatedCount: duplicates.length,
    duplicatesSample: duplicates.slice(0, 30),
  };

  try {
    console.log('=== DEBUG JORNADA DUPLICIDADE ===');
    console.log('Source sheet: ' + report.sourceSheet);
    console.log('Target sheet: ' + report.targetSheet);
    console.log('Source rows scanned: ' + report.sourceRowsScanned);
    console.log('Target rows scanned: ' + report.targetRowsScanned);
    console.log('Source rows without placa: ' + JSON.stringify(report.sourceRowsWithoutPlaca));
    console.log('Duplicated count: ' + report.duplicatedCount);
    console.log('Duplicates sample: ' + JSON.stringify(report.duplicatesSample));
  } catch (e) {}

  return report;
}

function syncJornadaInternaFromProgramacaoRow_(sheet, row, cachedCols) {
  const cols = cachedCols || findRequiredColumns_();
  const pcols = cols.programacao || {};
  if (!pcols.planosCol || !pcols.placaCol || !pcols.motoristaCol) return;
  if (!pcols.dataSaidaCol && !pcols.dataCarregamentoCol) return;
  const progHeaderMap = mapHeaders_(sheet, pcols.headerRow || getProgramacaoHeaderRow_());
  const cPerfil = getHeaderColOptional_(progHeaderMap, ['PERFIL']);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tgt = ensureJornadaInternaSheet_();
  const hmapTgt = mapHeaders_(tgt, 1);
  const cDataTgt = getHeaderColRequired_(hmapTgt, ['DATA'], 'Jornada');
  const cPlanoTgt = getHeaderColRequired_(hmapTgt, ['PLANO DE VIAGEM'], 'Jornada');
  const cPlacaTgt = getHeaderColRequired_(hmapTgt, ['PLACA'], 'Jornada');
  const dataSaidaDisplay = pcols.dataSaidaCol ? sheet.getRange(row, pcols.dataSaidaCol).getDisplayValue() : '';
  const dataSaidaValue = pcols.dataSaidaCol ? sheet.getRange(row, pcols.dataSaidaCol).getValue() : '';
  const dataCarregDisplay = pcols.dataCarregamentoCol ? sheet.getRange(row, pcols.dataCarregamentoCol).getDisplayValue() : '';
  const dataCarregValue = pcols.dataCarregamentoCol ? sheet.getRange(row, pcols.dataCarregamentoCol).getValue() : '';
  const dtSaida = parseDateBR_(dataSaidaDisplay) || toDateOnly_(dataSaidaValue);
  const dtCarreg = parseDateBR_(dataCarregDisplay) || toDateOnly_(dataCarregValue);
  const dtRef = dtSaida || dtCarreg;
  if (!dtRef) return;
  const plano = String(sheet.getRange(row, pcols.planosCol).getDisplayValue() || '').trim();
  const perfil = cPerfil ? String(sheet.getRange(row, cPerfil).getDisplayValue() || '').trim() : '';
  const placa = String(sheet.getRange(row, pcols.placaCol).getDisplayValue() || '').trim();
  const motorista = String(sheet.getRange(row, pcols.motoristaCol).getDisplayValue() || '').trim();
  if (!plano && !placa && !motorista) return;
  const planoKey = normalizePlanoKeyForMatch_(plano);
  const placaKey = normalizePlate_(placa);
  const dtKey = Utilities.formatDate(dtRef, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  const existingRows = getSheetDataRowsDisplay_(tgt, tgt.getLastColumn(), 1);
  for (let i = 0; i < existingRows.length; i++) {
    const rowT = existingRows[i] || [];
    const dataVal = rowT[cDataTgt - 1];
    const dataObj = toDateOnly_(dataVal);
    if (!dataObj) continue;
    const dataKey = Utilities.formatDate(dataObj, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    const planoKeyT = normalizePlanoKeyForMatch_(rowT[cPlanoTgt - 1]);
    const placaKeyT = normalizePlate_(rowT[cPlacaTgt - 1]);
    if (dataKey === dtKey && planoKeyT === planoKey && placaKeyT === placaKey) return;
  }
  const qtd = getQuantidadeEntregasByPlano_(planoKey);
  const newRow = [[dtRef, plano, perfil, placa, motorista, qtd, false, '', false, '', '', '']];
  const startRow = tgt.getLastRow() + 1;
  tgt.getRange(startRow, 1, 1, getJornadaHeaders_().length).setValues(newRow);
  const cChkIn = getHeaderColRequired_(hmapTgt, ['CHEGADA NO CD'], 'Jornada');
  const cHoraIn = getHeaderColRequired_(hmapTgt, ['HORA CHEGADA'], 'Jornada');
  const cChkOut = getHeaderColRequired_(hmapTgt, ['SAIDA DO CD', 'SAÍDA DO CD'], 'Jornada');
  const cHoraOut = getHeaderColRequired_(hmapTgt, ['HORA SAIDA', 'HORA SAÍDA'], 'Jornada');
  const cDur = getHeaderColRequired_(hmapTgt, ['JORNADA INTERNA'], 'Jornada');
  tgt.getRange(startRow, cDataTgt, 1, 1).setNumberFormat('dd/mm/yyyy');
  tgt.getRange(startRow, cHoraIn, 1, 1).setNumberFormat('hh:mm:ss');
  tgt.getRange(startRow, cHoraOut, 1, 1).setNumberFormat('hh:mm:ss');
  tgt.getRange(startRow, cDur, 1, 1).setNumberFormat('[h]:mm');
  const dv = SpreadsheetApp.newDataValidation().requireCheckbox().build();
  tgt.getRange(startRow, cChkIn, 1, 1).setDataValidation(dv);
  tgt.getRange(startRow, cChkOut, 1, 1).setDataValidation(dv);
}

function syncDisponibilidadeProgramadoFromProgramacaoRow_(sheet, row, cachedCols, e) {
  const cols = cachedCols || findRequiredColumns_();
  const pcols = cols.programacao || {};
  if (!pcols.planosCol || !pcols.placaCol) return;
  
  const plano = String(sheet.getRange(row, pcols.planosCol).getDisplayValue() || '').trim();
  const editPlaca = String(sheet.getRange(row, pcols.placaCol).getDisplayValue() || '').trim();
  
  // No caso de deleção da placa, pegamos o valor antigo se disponível
  const oldPlacaValue = (e && e.oldValue && editPlaca === '') ? String(e.oldValue).trim() : '';
  const placa = editPlaca || oldPlacaValue;
  if (!placa) return;

  const today = toDateOnly_(new Date());
  let dtRef = null;
  
  // Determina a data de referência da linha na Programação
  if (pcols.dataCarregamentoCol) {
    const dVal = sheet.getRange(row, pcols.dataCarregamentoCol).getValue();
    const dTxt = sheet.getRange(row, pcols.dataCarregamentoCol).getDisplayValue();
    dtRef = toDateOnly_(dVal) || parseDateBR_(dTxt) || toDateOnly_(dTxt);
  }
  if (!dtRef && pcols.dataSaidaCol) {
    const dVal = sheet.getRange(row, pcols.dataSaidaCol).getValue();
    const dTxt = sheet.getRange(row, pcols.dataSaidaCol).getDisplayValue();
    dtRef = toDateOnly_(dVal) || parseDateBR_(dTxt) || toDateOnly_(dTxt);
  }
  
  // "Data Vigente": Se não achou data na linha, usa HOJE.
  if (!dtRef) dtRef = today;

  const dispSheet = cols.disponibilidade.sheet || findSheetCaseInsensitive_(SpreadsheetApp.getActiveSpreadsheet(), CONFIG.SHEET_DISPONIBILIDADE);
  if (!dispSheet) return;

  const headerRow = cols.disponibilidade.headerRow || getDisponibilidadeHeaderRow_();
  const hmap = mapHeaders_(dispSheet, headerRow);
  const cDispData = getHeaderColOptional_(hmap, ['DATA']);
  const cDispPlaca = getHeaderColRequired_(hmap, ['PLACA'], 'Disponibilidade');
  const cDispStatus = getHeaderColOptional_(hmap, ['DISPONIBILIDADE']);
  let cDispPlano = getHeaderColOptional_(hmap, ['PLANO', 'PLANO DE VIAGEM', 'PLANO VIAGEM', 'SITUACAO', 'SITUAÇÃO']);
  if (!cDispPlano) cDispPlano = 8; // Coluna H padrão
  const cDispPlanoFixed = 8;
  
  const lastRow = dispSheet.getLastRow();
  if (lastRow <= headerRow) return;

  const lastCol = dispSheet.getLastColumn();
  const range = dispSheet.getRange(headerRow + 1, 1, lastRow - headerRow, lastCol);
  const values = range.getValues();
  const display = range.getDisplayValues();
  
  const placaKey = normalizePlate_(placa);
  const planoFinal = editPlaca ? (plano || findPlanoByPlacaInProgramacao_(sheet, pcols, placaKey)) : '';
  const shouldProgramar = !!planoFinal && !!editPlaca;
  
  let updated = false;
  for (let i = 0; i < values.length; i++) {
    const rowDisp = values[i] || [];
    const rowDispTxt = display[i] || [];
    const pDisp = normalizePlate_(rowDispTxt[cDispPlaca - 1] || rowDisp[cDispPlaca - 1]);
    
    if (!pDisp || pDisp !== placaKey) continue;
    
    // Validamos a data na Disponibilidade
    const dtTxt = rowDispTxt[cDispData - 1];
    const dtVal = rowDisp[cDispData - 1];
    const dtDisp = toDateOnly_(dtVal) || parseDateBR_(dtTxt) || toDateOnly_(dtTxt);
    
    // Só sincroniza se for o DIA VIGENTE (dtRef) 
    // ou se dtRef for futuro e estivermos olhando a linha de HOJE no Disponibilidade
    let isMatch = isSameDay_(dtDisp, dtRef);
    if (!isMatch && dtRef > today && isSameDay_(dtDisp, today)) {
       isMatch = true;
    }
    
    if (!isMatch) continue;

    const currentStatus = cDispStatus ? String(rowDispTxt[cDispStatus - 1] || rowDisp[cDispStatus - 1] || '').trim() : '';
    const normCurrentStatus = normalizeHeader_(currentStatus);

    if (shouldProgramar) {
      // Altera para Programado se NÃO estiver Indisponível
      if (cDispStatus && normCurrentStatus !== normalizeHeader_('Indisponível')) {
        dispSheet.getRange(headerRow + 1 + i, cDispStatus).setValue('Programado');
      }
      dispSheet.getRange(headerRow + 1 + i, cDispPlano).setValue(planoFinal);
      if (cDispPlanoFixed !== cDispPlano) dispSheet.getRange(headerRow + 1 + i, cDispPlanoFixed).setValue(planoFinal);
      updated = true;
    } else {
      // Reverte para Disponível apenas se estiver Programado ou Vazio
      if (normCurrentStatus === normalizeHeader_('Programado') || !normCurrentStatus) {
        if (cDispStatus) dispSheet.getRange(headerRow + 1 + i, cDispStatus).setValue('Disponível');
        dispSheet.getRange(headerRow + 1 + i, cDispPlano).setValue('');
        if (cDispPlanoFixed !== cDispPlano) dispSheet.getRange(headerRow + 1 + i, cDispPlanoFixed).setValue('');
        updated = true;
      }
    }
  }

  // Backup: Se não achou a placa com a data certa, tenta achar a placa em qualquer linha (mais abrangente)
  if (!updated && shouldProgramar) {
    for (let i = 0; i < values.length; i++) {
      const rowDispTxt = display[i] || [];
      const pDisp = normalizePlate_(rowDispTxt[cDispPlaca - 1]);
      if (pDisp === placaKey) {
        if (cDispStatus) dispSheet.getRange(headerRow + 1 + i, cDispStatus).setValue('Programado');
        dispSheet.getRange(headerRow + 1 + i, cDispPlano).setValue(planoFinal);
        updated = true;
        break;
      }
    }
  }
}

function findPlanoByPlacaInProgramacao_(sheet, pcols, placaKey) {
  if (!placaKey) return '';
  const headerRow = pcols.headerRow || getProgramacaoHeaderRow_();
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow <= headerRow) return '';
  const rows = sheet.getRange(headerRow + 1, 1, lastRow - headerRow, lastCol).getDisplayValues();
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i] || [];
    const placa = normalizePlate_(r[pcols.placaCol - 1]);
    if (!placa || placa !== placaKey) continue;
    const plano = String(r[pcols.planosCol - 1] == null ? '' : r[pcols.planosCol - 1]).trim();
    if (plano) return plano;
  }
  return '';
}

function syncDisponibilidadeProgramadoFromProgramacao_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const shProg = findSheetCaseInsensitive_(ss, CFG.SHEET_PROGRAMACAO);
  const shDisp = findSheetCaseInsensitive_(ss, CFG.SHEET_DISPONIBILIDADE);
  if (!shProg || !shDisp) return;
  const progHeaderRow = getProgramacaoHeaderRow_();
  const progMap = mapHeaders_(shProg, progHeaderRow);
  const cProgPlanos = getHeaderColRequired_(progMap, ['PLANOS'], 'Programacao');
  const cProgPlaca = getHeaderColRequired_(progMap, ['PLACA'], 'Programacao');
  const cProgDataSaida = getHeaderColOptional_(progMap, ['DATA DE SAIDA', 'DATA DE SAÍDA']);
  const cProgDataCarreg = getHeaderColOptional_(progMap, ['DATA DE CARREGAMENTO']);
  const progLastRow = shProg.getLastRow();
  const progLastCol = shProg.getLastColumn();
  if (progLastRow <= progHeaderRow) return;
  const progValues = shProg.getRange(progHeaderRow + 1, 1, progLastRow - progHeaderRow, progLastCol).getValues();
  const progDisplay = shProg.getRange(progHeaderRow + 1, 1, progLastRow - progHeaderRow, progLastCol).getDisplayValues();
  const planosByPlaca = {};
  for (let i = 0; i < progValues.length; i++) {
    const rv = progValues[i] || [];
    const rd = progDisplay[i] || [];
    const placaKey = normalizePlate_(rd[cProgPlaca - 1] || rv[cProgPlaca - 1]);
    const placaKeyO = normalizePlate_(rd[15 - 1] || rv[15 - 1]); // Coluna O
    const placaKeyP = normalizePlate_(rd[16 - 1] || rv[16 - 1]); // Coluna P
    
    if (!placaKey && !placaKeyO && !placaKeyP) continue;
    const plano = String(rd[cProgPlanos - 1] || rv[cProgPlanos - 1] || '').trim();
    if (!plano) continue;
    let dtRef = null;
    if (cProgDataSaida) dtRef = toDateOnly_(rv[cProgDataSaida - 1]) || parseDateBR_(rd[cProgDataSaida - 1]) || toDateOnly_(rd[cProgDataSaida - 1]);
    if (!dtRef && cProgDataCarreg) dtRef = toDateOnly_(rv[cProgDataCarreg - 1]) || parseDateBR_(rd[cProgDataCarreg - 1]) || toDateOnly_(rd[cProgDataCarreg - 1]);
    
    const keys = [placaKey, placaKeyO, placaKeyP];
    for (let k = 0; k < keys.length; k++) {
      const key = keys[k];
      if (!key) continue;
      if (!planosByPlaca[key]) planosByPlaca[key] = [];
      planosByPlaca[key].push({ plano: plano, dtRef: dtRef });
    }
  }

  const dispHeaderRow = getDisponibilidadeHeaderRow_();
  const dispMap = mapHeaders_(shDisp, dispHeaderRow);
  const cDispData = getHeaderColOptional_(dispMap, ['DATA']);
  const cDispPlaca = getHeaderColRequired_(dispMap, ['PLACA'], 'Disponibilidade');
  const cDispStatus = getHeaderColOptional_(dispMap, ['DISPONIBILIDADE']);
  let cDispPlano = getHeaderColOptional_(dispMap, ['PLANO', 'PLANO DE VIAGEM', 'PLANO VIAGEM', 'SITUACAO', 'SITUAÇÃO']);
  if (!cDispPlano) cDispPlano = 8;
  const cDispPlanoFixed = 8;
  const dispLastRow = shDisp.getLastRow();
  const dispLastCol = shDisp.getLastColumn();
  if (dispLastRow <= dispHeaderRow) return;
  const dispValues = shDisp.getRange(dispHeaderRow + 1, 1, dispLastRow - dispHeaderRow, dispLastCol).getValues();
  const dispDisplay = shDisp.getRange(dispHeaderRow + 1, 1, dispLastRow - dispHeaderRow, dispLastCol).getDisplayValues();
  for (let i = 0; i < dispValues.length; i++) {
    const rv = dispValues[i] || [];
    const rd = dispDisplay[i] || [];
    const placaKey = normalizePlate_(rd[cDispPlaca - 1] || rv[cDispPlaca - 1]);
    if (!placaKey) continue;
    let dtDisp = null;
    if (cDispData) dtDisp = toDateOnly_(rv[cDispData - 1]) || parseDateBR_(rd[cDispData - 1]) || toDateOnly_(rd[cDispData - 1]);
    const candidates = planosByPlaca[placaKey] || [];
    let matchPlano = '';
    if (candidates.length) {
      if (dtDisp) {
        for (let k = 0; k < candidates.length; k++) {
          const c = candidates[k];
          if (c.dtRef && isSameDay_(c.dtRef, dtDisp)) {
            matchPlano = c.plano;
            break;
          }
        }
      }
      if (!matchPlano) matchPlano = candidates[0].plano;
    }
    const currentStatus = cDispStatus ? String(rd[cDispStatus - 1] || rv[cDispStatus - 1] || '').trim() : '';
    if (matchPlano) {
      if (cDispStatus) shDisp.getRange(dispHeaderRow + 1 + i, cDispStatus).setValue('Programado');
      shDisp.getRange(dispHeaderRow + 1 + i, cDispPlano).setValue(matchPlano);
      if (cDispPlanoFixed !== cDispPlano) shDisp.getRange(dispHeaderRow + 1 + i, cDispPlanoFixed).setValue(matchPlano);
    } else if (!currentStatus || normalizeHeader_(currentStatus) === normalizeHeader_('Programado')) {
      if (cDispStatus) shDisp.getRange(dispHeaderRow + 1 + i, cDispStatus).setValue('Disponível');
      shDisp.getRange(dispHeaderRow + 1 + i, cDispPlano).setValue('');
      if (cDispPlanoFixed !== cDispPlano) shDisp.getRange(dispHeaderRow + 1 + i, cDispPlanoFixed).setValue('');
    }
  }
}

function getQuantidadeEntregasByPlano_(planoKey) {
  if (!planoKey) return '';
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const msgBase = findSheetCaseInsensitive_(ss, CONFIG.MESSAGE_SHEET_NAME || 'Programacao_Mensagem_Base');
  if (!msgBase) return '';
  const msgHeaderMap = mapHeaders_(msgBase, 1);
  const cMsgPlanos = getHeaderColRequired_(msgHeaderMap, ['PLANOS'], 'Programacao_Mensagem_Base');
  const cMsgQtd = getHeaderColOptional_(msgHeaderMap, ['QUANTIDADE DE ENTREGAS', 'QTD ENTREGAS', 'ENTREGAS']);
  if (!cMsgQtd) return '';
  const msgRows = getSheetDataRowsDisplay_(msgBase, msgBase.getLastColumn(), 1);
  for (let i = 0; i < msgRows.length; i++) {
    const m = msgRows[i] || [];
    const plano = String(m[cMsgPlanos - 1] == null ? '' : m[cMsgPlanos - 1]).trim();
    const key = normalizePlanoKeyForMatch_(plano);
    if (key === planoKey) return m[cMsgQtd - 1];
  }
  return '';
}

function handleJornadaOnEdit_(e) {
  const sh = e.range.getSheet();
  const r = e.range.getRow();
  if (r === 1) return;
  const hmap = mapHeaders_(sh, 1);
  const cChkIn = getHeaderColRequired_(hmap, ['CHEGADA NO CD'], 'Jornada');
  const cHoraIn = getHeaderColRequired_(hmap, ['HORA CHEGADA'], 'Jornada');
  const cChkOut = getHeaderColRequired_(hmap, ['SAIDA DO CD','SA\u00cdDA DO CD'], 'Jornada');
  const cHoraOut = getHeaderColRequired_(hmap, ['HORA SAIDA','HORA SA\u00cdDA'], 'Jornada');
  const cDur = getHeaderColRequired_(hmap, ['JORNADA INTERNA'], 'Jornada');
  const cClass = getHeaderColRequired_(hmap, ['CLASSIFICACAO JORNADA', 'CLASSIFICA\u00c7\u00c3O JORNADA'], 'Jornada');
  const c = e.range.getColumn();
  if (c === cChkIn) {
    if (e.value === 'TRUE') sh.getRange(r, cHoraIn).setValue(new Date());
    else {
      sh.getRange(r, cHoraIn).clearContent();
      sh.getRange(r, cDur).clearContent();
      sh.getRange(r, cClass).clearContent().setBackground(null);
    }
  } else if (c === cChkOut) {
    if (e.value === 'TRUE') sh.getRange(r, cHoraOut).setValue(new Date());
    else {
      sh.getRange(r, cHoraOut).clearContent();
      sh.getRange(r, cDur).clearContent();
      sh.getRange(r, cClass).clearContent().setBackground(null);
    }
  }
  const start = sh.getRange(r, cHoraIn).getValue();
  const end = sh.getRange(r, cHoraOut).getValue();
  if (start && end && start instanceof Date && end instanceof Date && end.getTime() >= start.getTime()) {
    const diff = (end.getTime() - start.getTime()) / 86400000;
    sh.getRange(r, cDur).setValue(diff).setNumberFormat('[h]:mm');
    const hours = diff * 24;
    let label = '';
    let color = null;
    if (hours <= 2) {
      label = 'Normal';
      color = '#c6efce';
    } else if (hours <= 4) {
      label = 'M\u00e9dio';
      color = '#ffeb9c';
    } else {
      label = 'Cr\u00edtico';
      color = '#ffc7ce';
    }
    sh.getRange(r, cClass).setValue(label).setBackground(color);
  } else {
    sh.getRange(r, cDur).clearContent();
    sh.getRange(r, cClass).clearContent().setBackground(null);
  }
}

function createJornadaDailyTrigger() {
  const fn = 'syncJornadaInternaToday';
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    const t = triggers[i];
    if (t.getHandlerFunction && t.getHandlerFunction() === fn) ScriptApp.deleteTrigger(t);
  }
  ScriptApp.newTrigger(fn).timeBased().everyDays(1).atHour(6).create();
}

function doGet(e) {
  const action = e && e.parameter && e.parameter.action;
  
  if (action === 'flash_dashboard') {
    if (typeof renderFlashDashboard_ === 'function') {
      return renderFlashDashboard_(e);
    }
  }

  return ContentService.createTextOutput('3C Programação Automática API Online')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  return ContentService.createTextOutput('Method Not Allowed')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Funcao utilitaria para atualizar a API Key do ClickUp.
 * EXECUTE ESTA FUNCAO UMA VEZ NO EDITOR DO APPS SCRIPT.
 */
function manuallyUpdateClickUpApiKey() {
  const newKey = 'pk_254580721_G2XVY9NUAWY8EHFSBT7IPTXJEUE1292R';
  PropertiesService.getScriptProperties().setProperty('CLICKUP_API_KEY', newKey);
  console.log('API Key do ClickUp atualizada com sucesso!');
  return 'OK';
}
