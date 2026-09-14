import { Injectable, Logger } from '@nestjs/common';
import { Builder, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';
import { Command } from 'selenium-webdriver/lib/command';

type SessionPaths = {
  code: string;
  rootDir: string;
  profileDir: string;
  downloadsDir: string;
};

type LoginCreds = {
  dominio: string; // id="1" name="f1"
  cpf: string; // id="2" name="f2"
  usuario: string; // id="3" name="f3"
  senha: string; // id="4" name="f4"
};

type LoginOutcome = { ok: true; message: string } | { ok: false; message: string };

type CreateLoggedReturn = {
  driver: WebDriver;
  session: SessionPaths;
  message: string;
};

/** Envia comandos CDP via endpoint nativo do ChromeDriver (compatível com Selenium Node). */
async function sendCdp(driver: WebDriver, cmd: string, params: Record<string, any> = {}) {
  const EXEC_CDP = 'chromium:send_command';
  // @ts-ignore getExecutor é público
  const exec = driver.getExecutor();
  // @ts-ignore registra o endpoint do ChromeDriver
  exec.defineCommand(EXEC_CDP, 'POST', '/session/:sessionId/chromium/send_command_and_get_result');

  const command = new Command(EXEC_CDP);
  // @ts-ignore
  command.setParameter('cmd', cmd);
  // @ts-ignore
  command.setParameter('params', params);
  // @ts-ignore
  return driver.execute(command);
}

@Injectable()
export class SSW_SESSION_SERVICE {
  private readonly logger = new Logger(SSW_SESSION_SERVICE.name);
  private readonly baseSessionsDir = path.resolve(process.cwd(), 'ssw-sessions');

  /**
   * Cria sessão isolada, tenta login e retorna driver autenticado.
   * Em caso de falha, fecha o driver e lança Error com a mensagem amigável.
   */
  async createLoggedSession(
    creds: LoginCreds,
    opts?: { headless?: boolean; blockCss?: boolean; timeoutMs?: number },
  ): Promise<CreateLoggedReturn> {
    const session = this.createSessionDirs();
    const driver = await this.createDriver(session, opts);
    try {
      const outcome = await this.loginOnSswUltraFast(driver, creds, opts?.timeoutMs ?? 12000);
      if (!outcome.ok) {
        throw new Error(outcome.message || 'Falha ao autenticar no SSW');
      }
      return { driver, session, message: outcome.message };
    } catch (e) {
      try {
        await driver.quit();
      } catch {}
      throw e;
    }
  }

  /**
   * Abre → usa → fecha já logado. Se o login falhar, lança erro com mensagem amigável.
   */
  async withLoggedSession<T>(
    creds: LoginCreds,
    runner: (driver: WebDriver, session: SessionPaths) => Promise<T>,
    opts?: { headless?: boolean; blockCss?: boolean; timeoutMs?: number },
  ): Promise<T> {
    const { driver, session } = await this.createLoggedSession(creds, opts);
    try {
      return await runner(driver, session);
    } finally {
      try {
        await driver.quit();
      } catch (e) {
        this.logger.warn('Falha ao encerrar o WebDriver', e as any);
      }
    }
  }

  // ----------------- Sessão / diretórios -----------------

  private createSessionDirs(): SessionPaths {
    const code = this.generateSessionCode();
    const rootDir = path.join(this.baseSessionsDir, code);
    const profileDir = path.join(rootDir, 'profile');
    const downloadsDir = path.join(rootDir, 'downloads');

    fs.mkdirSync(profileDir, { recursive: true });
    fs.mkdirSync(downloadsDir, { recursive: true });

    return { code, rootDir, profileDir, downloadsDir };
  }

  private generateSessionCode(): string {
    const ts = new Date()
      .toISOString()
      .replace(/[-:TZ.]/g, '')
      .slice(0, 14); // AAAAMMDDhhmmss
    const rnd = randomUUID().split('-')[0];
    return `${ts}-${rnd}`;
  }

  // ----------------- Driver / CDP -----------------

  private async createDriver(session: SessionPaths, opts?: { headless?: boolean; blockCss?: boolean }): Promise<WebDriver> {
    const { headless = false, blockCss = true } = opts ?? {};
    const options = new chrome.Options();

    if (headless) options.addArguments('--headless=new');

    options.addArguments(
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-extensions',
      '--disable-gpu',
      '--window-size=1366,768',
      '--blink-settings=imagesEnabled=false',
      `--user-data-dir=${session.profileDir}`,
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
      '--disable-backgrounding-occluded-windows',
      '--disable-features=Translate,TextFragmentAnchor,MediaRouter,OptimizationHints,InterestFeedContentSuggestions,PaintHolding',
      '--enable-features=NetworkServiceInProcess',
      '--prerender-from-omnibox=disabled',
      '--dns-prefetch-disable',
      '--no-default-browser-check',
    );

    options.setUserPreferences({
      'download.default_directory': session.downloadsDir,
      'download.prompt_for_download': false,
      'download.directory_upgrade': true,
      'safebrowsing.enabled': true,

      'profile.managed_default_content_settings.images': 2,
      'profile.managed_default_content_settings.plugins': 2,
      'profile.managed_default_content_settings.popups': 2,
      'profile.default_content_setting_values.notifications': 2,

      credentials_enable_service: false,
      'profile.password_manager_enabled': false,
    });

    const driver = await new Builder()
      .forBrowser('chrome')
      .withCapabilities({ pageLoadStrategy: 'none' as any })
      .setChromeOptions(options)
      .build();

    await driver.manage().setTimeouts({
      pageLoad: 0,
      implicit: 0,
      script: 6000,
    });

    try {
      await sendCdp(driver, 'Page.enable');
      await sendCdp(driver, 'Network.enable');
      await sendCdp(driver, 'Network.setCacheDisabled', { cacheDisabled: true });
      await sendCdp(driver, 'Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: session.downloadsDir,
      });

      const blocked: string[] = [
        '*.png',
        '*.jpg',
        '*.jpeg',
        '*.gif',
        '*.svg',
        '*.webp',
        '*.woff',
        '*.woff2',
        '*.ttf',
        '*.otf',
        '*.map',
        '*.mp4',
        '*.webm',
        '*.avi',
        '*.mov',
        '*.m4v',
        '*.mp3',
        '*.wav',
        '*.aac',
        '*.ogg',
      ];
      if (blockCss) blocked.push('*.css');

      await sendCdp(driver, 'Network.setBlockedURLs', { urls: blocked });
    } catch (e) {
      this.logger.warn('CDP não disponível; seguindo com prefs/args.', e as any);
    }

    return driver;
  }

  // ----------------- Login ULTRA-RÁPIDO + robusto -----------------

  private async loginOnSswUltraFast(driver: WebDriver, creds: LoginCreds, timeoutMs: number): Promise<LoginOutcome> {
    const url = 'https://sistema.ssw.inf.br/bin/ssw0422';
    await driver.get(url);

    // 1) Espera DOM mínimo (inputs presentes) e, se possível, ajaxEnvia
    const readyOk = await this.waitLoginDomReady(driver, 5000);
    if (!readyOk) {
      return { ok: false, message: 'Tela de login não ficou pronta.' };
    }

    // 2) Preenche e envia — sem nenhum cast TS no JS injetado
    const fillAndSubmit = `
      try {
        var byId = function(id){ return document.getElementById(id); };
        var setVal = function(id, v){ var el = byId(id); if (el) el.value = v; };

        setVal('1', ${JSON.stringify(creds.dominio)});
        setVal('2', ${JSON.stringify(creds.cpf)});
        setVal('3', ${JSON.stringify(creds.usuario)});
        setVal('4', ${JSON.stringify(creds.senha)});

        var hasAjax = (typeof window.ajaxEnvia === 'function');
        if (hasAjax) {
          var btn = byId('5');
          if (btn && typeof btn.click === 'function') { btn.click(); }
          else { window.ajaxEnvia('L', 0); }
        } else {
          var frm = document.getElementById('frm') || (document.forms && document.forms['frm']);
          if (frm) {
            var act = frm.querySelector && frm.querySelector('input[name="act"]');
            if (act) act.value = 'L';
            if (typeof frm.submit === 'function') frm.submit();
          }
        }
        return true;
      } catch (e) {
        return String(e);
      }
    `;
    await driver.executeScript(fillAndSubmit);

    // 3) Aguardar redirecionamento automático para o menu (sem forçar get)
    const menuOk = await this.waitForMenuRedirect(driver, timeoutMs);
    if (!menuOk) {
      const err = await this.tryExtractErrorTextFast(driver);
      return { ok: false, message: err || 'Falha no login: menu não abriu.' };
    }

    return { ok: true, message: 'Autenticado' };
  }

  /** Aguarda DOM da tela de login: inputs e (se possível) ajaxEnvia. */
  private async waitLoginDomReady(driver: WebDriver, timeoutMs: number): Promise<boolean> {
    const start = Date.now();
    while (true) {
      if (Date.now() - start > timeoutMs) return false;
      try {
        const state = (await driver.executeScript(`
          var ready = document.readyState;
          var has1 = !!document.getElementById('1');
          var has2 = !!document.getElementById('2');
          var has3 = !!document.getElementById('3');
          var has4 = !!document.getElementById('4');
          var has5 = !!document.getElementById('5');
          var ajax = (typeof window.ajaxEnvia === 'function');
          return { ready: ready, has1: has1, has2: has2, has3: has3, has4: has4, has5: has5, ajax: ajax };
        `)) as any;
        if (
          (state.ready === 'interactive' || state.ready === 'complete') &&
          state.has1 &&
          state.has2 &&
          state.has3 &&
          state.has4 &&
          state.has5
        ) {
          return true;
        }
      } catch {
        /* ignore */
      }
      await this.sleep(80);
    }
  }

  /** Espera o redirecionamento natural do login para /bin/menu01 (sem forçar get). */
  private async waitForMenuRedirect(driver: WebDriver, timeoutMs: number): Promise<boolean> {
    const start = Date.now();
    const initialTitle = (await driver.executeScript('return document.title || ""')) as string;
    const initialUrl = (await driver.executeScript('return location.href || ""')) as string;

    while (true) {
      if (Date.now() - start > timeoutMs) return false;

      try {
        const state = (await driver.executeScript(`
          var title = document.title || '';
          var href  = location.href || '';
          var isLogin = /Login Sistema SSW/i.test(title);
          var isMenu  = /\\/bin\\/menu01/i.test(href);
          var hasHeader = !!document.getElementById('tituloprog');
          var hasCrumb  = !!document.querySelector('a.tituloprog[href="/bin/menu01"]');
          return { title: title, href: href, isLogin: isLogin, isMenu: isMenu, hasHeader: hasHeader, hasCrumb: hasCrumb };
        `)) as any;

        if (state.title !== initialTitle || state.href !== initialUrl) {
          if (state.isMenu && !state.isLogin && (state.hasHeader || state.hasCrumb)) {
            return true;
          }
        }

        // erro explícito?
        const err = await this.tryExtractErrorTextFast(driver);
        if (err) return false;
      } catch {
        /* ignore */
      }

      await this.sleep(80);
    }
  }

  /** Lê o painel de erro (#errormsglabel) por JS. */
  private async tryExtractErrorTextFast(driver: WebDriver): Promise<string> {
    try {
      const js = `
        var el = document.getElementById('errormsglabel');
        if (!el) return '';
        var st = getComputedStyle(el);
        var visible = st && st.visibility !== 'hidden' && st.display !== 'none';
        if (!visible) return '';
        return (el.innerText || el.textContent || '').trim();
      `;
      const t = await driver.executeScript(js);
      return (t || '').toString().trim();
    } catch {
      return '';
    }
  }

  private async tryDismissErrorDialogFast(driver: WebDriver): Promise<void> {
    try {
      const js = `
        var ok = document.getElementById('0');
        if (ok && typeof ok.click === 'function') { ok.click(); true; } else { false; }
      `;
      await driver.executeScript(js);
    } catch {
      /* ignore */
    }
  }

  private async sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }
}
