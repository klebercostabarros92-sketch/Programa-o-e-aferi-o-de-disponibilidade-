// src/ssw/services/emitir-ciot-ssw.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { By, until, WebDriver, WebElement } from 'selenium-webdriver';
import { SSW_SESSION_SERVICE } from '../session-ssw.service';

export type LoginCreds = {
  dominio: string;
  cpf: string;
  usuario: string;
  senha: string;
};

type EmitirCiotResultado = {
  ok: boolean;
  message: string;
  sessionCode?: string;
  pageTitle?: string;
  pageUrl?: string;
  dados?: {
    placa: string;
    unidadeMenu?: string;
    filial_dest?: string;
    valor_ficha?: string;
    obs1?: string | null;
    tela_inicial_ok?: boolean;
    tela_detalhe_ok?: boolean;
    _href?: string;
    _title?: string;
  };
};

@Injectable()
export class EMITIR_CIOT_SSW implements OnModuleInit {
  private readonly logger = new Logger(EMITIR_CIOT_SSW.name);

  constructor(private readonly ssw: SSW_SESSION_SERVICE) {}

  async onModuleInit() {}

  /**
   * Converte o nome da unidade (vindo da planilha) no código de filial usado pelo SSW.
   * Regras:
   *  - sumare OU guarulhos                                   → EUS
   *  - cambe, curitiba, ponta grossa, guarapuava             → APR
   *  - regente, rio preto, catanduva                         → ASP
   *  - farroupilha                                           → ARS
   */
  private normalizarUnidadeParaFilial(unidade: string): string | null {
    const u = (unidade || '')
      .toString()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '') // remove acentos
      .toLowerCase()
      .trim();
    if (!u) return null;

    if (u.includes('sumare') || u.includes('guarulhos')) return 'EUS';
    if (
      u.includes('cambe') ||
      u.includes('curitiba') ||
      u.includes('ponta grossa') ||
      u.includes('guarapuava')
    ) return 'APR';
    if (u.includes('regente') || u.includes('rio preto') || u.includes('catanduva')) return 'ASP';
    if (u.includes('farroupilha')) return 'ARS';

    return null;
  }

  async executar(
    placa: string,
    valorFicha: string | number,
    obs1: string,
    unidade: string,
    creds: LoginCreds,
  ): Promise<any> {
    const placaNorm = (placa || '').toString().trim().toUpperCase();
    if (!/^[A-Z0-9]{6,8}$/.test(placaNorm)) {
      return { ok: false, message: 'Placa inválida (esperado: 6–8 caracteres alfanuméricos).' };
    }

    const valorStr = (valorFicha ?? '').toString().trim();
    if (!valorStr) {
      return { ok: false, message: 'Valor da ficha não informado.' };
    }

    const obsStr = (obs1 ?? '').toString().trim();
    if (!obsStr) {
      return { ok: false, message: 'Observação (obs1) não informada.' };
    }

    const filial = this.normalizarUnidadeParaFilial(unidade);
    if (!filial) {
      return { ok: false, message: `Unidade não mapeada: "${unidade}".` };
    }

    const { driver, session } = await this.ssw.createLoggedSession(creds, { headless: false, blockCss: true, timeoutMs: 15000 });

    try {
      await driver.get('https://sistema.ssw.inf.br/bin/menu01');

      await new Promise<WebElement>(async (resolve, reject) => {
        const start = Date.now();
        const timeout = 15000;
        while (Date.now() - start < timeout) {
          try {
            const of = await driver.findElement(By.id('3'));
            if (of && (await driver.wait(until.elementIsVisible(of)))) {
              return resolve(of);
            }
          } catch {}
          await new Promise((r) => setTimeout(r, 200));
        }

        reject(new Error('Timeout: Nenhuma nova janela foi aberta dentro do tempo limite.'));
      });

      const setMenuUnidade = `
        (function(){
          try {
            var f2 = document.getElementById('2');   // unidade/sigla destino
            var f3 = document.getElementById('3');   // código numérico
            if (!f2) return 'NO_FIELD_2';
            if (!f3) return 'NO_FIELD_3';

            f2.value = ${JSON.stringify(filial)};
            f3.value = '72';

            ['input','change','blur'].forEach(function(evt){
              try { f2.dispatchEvent(new Event(evt, {bubbles:true})); } catch(_){}
              try { f3.dispatchEvent(new Event(evt, {bubbles:true})); } catch(_){}
            });

            return 'OK_SET_2_3';
          } catch(e) {
            return 'ERR:' + String(e);
          }
        })();
      `;
      await (driver as any).executeScript(setMenuUnidade);

      await new Promise<string>(async (resolve, reject) => {
        const start = Date.now();
        const timeout = 60000;
        while (Date.now() - start < timeout) {
          try {
            const now = await driver.getAllWindowHandles();
            if (now.length > 1) {
              await driver.switchTo().window(now.pop()!);
              return resolve(now.pop()!);
            }
          } catch (e) {
            console.log(e);
          }
          await new Promise((r) => setTimeout(r, 200));
        }

        reject(new Error('Timeout: Nenhuma nova janela foi aberta dentro do tempo limite.'));
      });

      await new Promise<WebElement>(async (resolve, reject) => {
        const start = Date.now();
        const timeout = 15000;
        while (Date.now() - start < timeout) {
          try {
            const of = await driver.findElement(By.id('placa_veic'));
            if (of && (await driver.wait(until.elementIsVisible(of)))) {
              return resolve(of);
            }
          } catch {}
          await new Promise((r) => setTimeout(r, 200));
        }
        reject(new Error('Timeout: Nenhuma nova janela foi aberta dentro do tempo limite.'));
      });

      const fillAndConfirm = `
        (function(){
          try {
            var byId = function(id){ return document.getElementById(id); };
            var placa = byId('placa_veic');
            if (!placa) return 'NO_PLACA';

            placa.value = ${JSON.stringify(placaNorm)};
            ['input','change','blur'].forEach(function(evt){
              try { placa.dispatchEvent(new Event(evt, {bubbles:true})); } catch(_){}
            });

            var btn = byId('btn_env');
            if (btn && typeof btn.click === 'function') { btn.click(); return 'OK_CLICK'; }
            if (typeof window.ajaxEnvia === 'function') { window.ajaxEnvia('ENV', 1); return 'OK_AJAX'; }

            var frm = byId('frm') || (document.forms && document.forms['frm']);
            if (frm && typeof frm.submit === 'function') { frm.submit(); return 'OK_SUBMIT'; }

            return 'FILLED_NO_ACTION';
          } catch(e) {
            return 'ERR:' + String(e);
          }
        })();
      `;
      await (driver as any).executeScript(fillAndConfirm);

      // Aguarda nova janela OU erro na janela de placa (errormsglabel)
      const afterPlate = await new Promise<{ kind: 'window' } | { kind: 'error'; text: string }>(
        async (resolve, reject) => {
          const start = Date.now();
          const timeout = 60000;

          while (Date.now() - start < timeout) {
            try {
              try { await driver.switchTo().defaultContent(); } catch {}

              // 1. verifica errormsglabel na janela atual (tela de placa)
              const errText = await this.tryExtractErrorTextFast(driver);
              if (errText) {
                return resolve({ kind: 'error', text: errText });
              }
              // 2. verifica se nova janela foi aberta
              const now = await driver.getAllWindowHandles();
              if (now.length > 2) {
                await driver.switchTo().window(now[now.length - 1]);
                return resolve({ kind: 'window' });
              }
            } catch (e) {
              console.log(e);
            }
            await new Promise((r) => setTimeout(r, 200));
          }
          reject(new Error('Timeout: Nenhuma nova janela foi aberta dentro do tempo limite.'));
        },
      );

      if (afterPlate.kind === 'error') {
        this.logger.warn(
          `Placa ${placaNorm}: erro ao inserir placa → "${afterPlate.text}" — aguardando 5s e fechando janelas.`,
        );
        await this.sleep(5000);
        return { ok: false, message: afterPlate.text, dados: { placa: placaNorm } };
      }

      await new Promise<WebElement>(async (resolve, reject) => {
        const start = Date.now();
        const timeout = 15000;
        while (Date.now() - start < timeout) {
          try {
            const of = await driver.findElement(By.id('id_filial_sigla_dest'));
            if (of && (await driver.wait(until.elementIsVisible(of)))) {
              return resolve(of);
            }
          } catch {}
          await new Promise((r) => setTimeout(r, 200));
        }

        reject(new Error('Timeout: Nenhuma nova janela foi aberta dentro do tempo limite.'));
      });

      type ApplyRes = {
        okFilial: boolean;
        okValor: boolean;
        okObs1: boolean;
        clicked: boolean;
        message?: string;
        os?: string | null;
        ciot?: string | null;
        timeout?: boolean;
        err?: string;
      };

      //
      // 1️⃣  preencher campos e clicar no botão
      //
      await (driver as any).executeScript(`
  (function(){
    try {
      const byId = id => document.getElementById(id);
      const setVal = (id, v) => {
        const el = byId(id);
        if (!el) return false;
        el.value = v;
        try { el.dispatchEvent(new Event('input', {bubbles:true})); } catch(_){}
        try { el.dispatchEvent(new Event('change',{bubbles:true})); } catch(_){}
        try { el.dispatchEvent(new Event('blur',  {bubbles:true})); } catch(_){}
        return true;
      };

      setVal('id_filial_sigla_dest', ${JSON.stringify(filial)});
      setVal('id_vlr_ficha', ${JSON.stringify(valorStr)});
      setVal('id_obs1', ${JSON.stringify(obsStr)});

      // aguarda 1 segundo antes do clique
      setTimeout(() => {
        const el = byId('id_link_env');
        if (!el) return;
        try { el.click(); }
        catch(_) {
          try { el.dispatchEvent(new MouseEvent('click', {bubbles:true, cancelable:true})); }
          catch(__){}
        }
      }, 2500);
    } catch(e) {
      console.error('Erro no preenchimento:', e);
    }
  })();
`);

      //
      // 2️⃣  aguardar a resposta aparecer na tela (id='errormsglabel')
      //
      const msgElement = await new Promise<WebElement>(async (resolve, reject) => {
        const start = Date.now();
        const timeout = 60000 * 10; // 10min
        while (Date.now() - start < timeout) {
          try {
            const el = await driver.findElement(By.id('errormsglabel'));
            if (el && (await el.isDisplayed())) {
              return resolve(el);
            }
          } catch {}
          await new Promise((r) => setTimeout(r, 200));
        }
        reject(new Error('Timeout: Nenhuma mensagem encontrada em até 600s.'));
      });

      //
      // 3️⃣  capturar o texto da mensagem
      //
      const msgText = (await msgElement.getText())?.trim() || '';

      //
      // 4️⃣  extrair OS e CIOT com regex
      //
      const osMatch = /\bOS\b[^A-Z0-9]*([A-Z]{3}\d{6}-\d+)/i.exec(msgText);
      const ciotMatch = /\bCIOT\b[:\s-]*([A-Z0-9-]{5,})/i.exec(msgText);
      const osCode = osMatch ? osMatch[1].toUpperCase() : null;
      const ciotCode = ciotMatch ? ciotMatch[1].toUpperCase() : null;

      //
      // 4.1️⃣  se não encontrou CIOT, a mensagem é um erro — fechar janelas e abortar esta linha
      //
      if (!ciotCode) {
        this.logger.warn(`Placa ${placaNorm}: mensagem de erro detectada → "${msgText}" — aguardando 5s e fechando janelas.`);
        await this.sleep(5000);
        return { ok: false, message: msgText, dados: { placa: placaNorm } };
      }

      //
      // 5️⃣  montar resposta
      //
      const pageTitle = await driver.executeScript("return document.title || ''");
      const pageUrl = await driver.executeScript("return location.href || ''");

      const applyRes: ApplyRes = {
        okFilial: true,
        okValor: true,
        okObs1: true,
        clicked: true,
        message: msgText,
        os: osCode,
        ciot: ciotCode,
        timeout: false,
      };

      //
      // 6️⃣  montar mensagem final
      //
      const base = `Filial:${applyRes.okFilial ? 'OK' : 'NOK'} | Valor:${applyRes.okValor ? 'OK' : 'NOK'} | Obs1:${applyRes.okObs1 ? 'OK' : 'NOK'} | Click:${applyRes.clicked ? 'OK' : 'NOK'}`;
      const extras: string[] = [];
      if (applyRes.os) extras.push(`OS:${applyRes.os}`);
      if (applyRes.ciot) extras.push(`CIOT:${applyRes.ciot}`);
      const finalMsg = [base, ...extras].join(' | ');

      //
      // 7️⃣  retorno final
      //
      return {
        ok: true,
        message: finalMsg || 'CIOT: tela aberta e campos aplicados com sucesso.',
        sessionCode: session.code,
        pageTitle,
        pageUrl,
        dados: {
          placa: placaNorm,
          unidadeMenu: filial,
          filial_dest: filial,
          valor_ficha: valorStr,
          obs1: obsStr,
          os: applyRes.os,
          ciot: applyRes.ciot,
          tela_detalhe_ok: true,
          _href: pageUrl,
          _title: pageTitle,
        },
      };
    } catch (e: any) {
      return { ok: false, message: e?.message || 'Falha ao emitir/abrir CIOT.' };
    } finally {
      // encerra o browser por completo (todas as janelas) — próxima iteração cria sessão nova do zero
      try { await driver.quit(); } catch {}
    }
  }

  // ===== Helpers / waits =====

  private async waitForDocReady(driver: WebDriver, timeoutMs: number) {
    const start = Date.now();
    while (Date.now() - start <= timeoutMs) {
      try {
        const rs = await (driver as any).executeScript('return document.readyState || ""');
        if (rs === 'interactive' || rs === 'complete') return;
      } catch {}
      await this.sleep(60);
    }
  }

  private async waitForSsw0331Dom(driver: WebDriver, timeoutMs: number): Promise<boolean> {
    const start = Date.now();
    while (Date.now() - start <= timeoutMs) {
      try {
        const ok = await (driver as any).executeScript(`
          var rs = document.readyState;
          var okPlaca = !!document.getElementById('placa_veic');
          var okBtn = !!document.getElementById('btn_env');
          return (rs==='interactive'||rs==='complete') && okPlaca && okBtn;
        `);
        if (ok) return true;
      } catch {}
      await this.sleep(80);
    }
    return false;
  }

  /** Aguarda a página de detalhe do CIOT após enviar na ssw0331. */
  private async waitForCiotDetailDom(driver: WebDriver, oldHandles: string[], timeoutMs: number): Promise<boolean> {
    const start = Date.now();
    const initialTitle = (await (driver as any).executeScript('return document.title || ""')) as string;
    const initialUrl = (await (driver as any).executeScript('return location.href || ""')) as string;

    const hasDetailFields = async () => {
      try {
        return await (driver as any).executeScript(`
          var rs = document.readyState;
          var ok1 = !!document.getElementById('id_filial_sigla_dest');
          var ok2 = !!document.getElementById('id_vlr_ficha');
          var ok3 = !!document.getElementById('id_obs1');
          return (rs==='interactive'||rs==='complete') && (ok1||ok2||ok3);
        `);
      } catch {
        return false;
      }
    };

    while (Date.now() - start <= timeoutMs) {
      // Nova janela/aba?
      try {
        const now = await driver.getAllWindowHandles();
        if (now.length > oldHandles.length) {
          const diff = now.find((h) => !oldHandles.includes(h));
          if (diff) {
            await driver.switchTo().window(diff);
            const ok =
              (await this.waitForElementByIdFast(driver, 'id_filial_sigla_dest', 2500)) ||
              (await this.waitForElementByIdFast(driver, 'id_vlr_ficha', 2500)) ||
              (await this.waitForElementByIdFast(driver, 'id_obs1', 2500));
            if (ok) return true;
          }
        }
      } catch {}

      // Mesma aba?
      try {
        const title = (await (driver as any).executeScript('return document.title || ""')) as string;
        const href = (await (driver as any).executeScript('return location.href || ""')) as string;
        const ok = await hasDetailFields();
        if ((title !== initialTitle || href !== initialUrl) && ok) return true;
      } catch {}

      // Erro explícito?
      const err = await this.tryExtractErrorTextFast(driver);
      if (err) return false;

      await this.sleep(120);
    }
    return false;
  }

  private async waitForElementByIdFast(driver: WebDriver, id: string, timeoutMs: number): Promise<boolean> {
    const start = Date.now();
    while (Date.now() - start <= timeoutMs) {
      try {
        const ok = await (driver as any).executeScript(`return !!document.getElementById(${JSON.stringify(id)});`);
        if (ok) return true;
      } catch {}
      await this.sleep(60);
    }
    return false;
  }

  private async tryExtractErrorTextFast(driver: WebDriver): Promise<string> {
    try {
      // O SSW alterna apenas `visibility` (não `display`) para mostrar/ocultar errormsg.
      // Usar textContent (e não innerText) pois innerText retorna vazio quando display:none.
      const js =
        'try {' +
        '  var c = document.getElementById("errormsg");' +
        '  if (!c) return "";' +
        '  if (getComputedStyle(c).visibility === "hidden") return "";' +
        '  var lb = document.getElementById("errormsglabel");' +
        '  if (lb) { var t = (lb.textContent||"").trim(); if (t) return t; }' +
        '  return (c.textContent||"").trim();' +
        '} catch(e) { return ""; }';

      const t = await (driver as any).executeScript(js);
      return (t || '').toString().trim();
    } catch {
      return '';
    }
  }

  private async sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }
}
