import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from './app.module';
import { EMITIR_CIOT_SSW, LoginCreds } from './ssw/services/emission-ciot-ssw';

const creds: LoginCreds = {
  dominio: 'THX',
  cpf: '23203015935',
  usuario: 'automaca',
  senha: 'Thx@2025',
};

type CsvRow = {
  taskId: string;
  unidade: string;
  plano: string;
  placa: string;
  valor: string;
  lineIndex: number; // índice da linha original no CSV (base 0, começando após o header)
};

function findFirstCsv(dir: string): string | null {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f.toLowerCase().endsWith('.csv')) {
      return path.join(dir, f);
    }
  }
  return null;
}

function detectDelimiter(headerLine: string): string {
  const semis = (headerLine.match(/;/g) || []).length;
  const commas = (headerLine.match(/,/g) || []).length;
  return semis > commas ? ';' : ',';
}

function parseCsvLine(line: string, delim: string): string[] {
  const out: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += c;
      }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === delim) {
        out.push(cur);
        cur = '';
      } else cur += c;
    }
  }
  out.push(cur);
  return out.map((c) => c.trim());
}

function normalizeValor(raw: string): string | null {
  const t = (raw || '').toString().trim().replace(/\s+/g, '').replace(',', '.');
  if (!t) return null;
  const n = Number(t);
  if (!Number.isFinite(n)) return null;
  return n.toFixed(2);
}

function parseCsv(filePath: string, logger: Logger): { rows: CsvRow[]; delim: string } {
  const content = fs.readFileSync(filePath, 'utf8').replace(/^﻿/, '');
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return { rows: [], delim: ';' };

  const delim = detectDelimiter(lines[0]);
  const rows: CsvRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i], delim);
    const taskId = cols[0] || '';
    const plano = cols[2] || '';
    const unidade = cols[3] || '';
    const placa = cols[6] || '';
    const valorRaw = cols[7] || '';
    const valor = normalizeValor(valorRaw);

    if (!taskId || !unidade || !plano || !placa || !valor) {
      logger.warn(
        `Linha ${i + 1} ignorada (campos faltando): taskId="${taskId}" unidade="${unidade}" plano="${plano}" placa="${placa}" valor="${valorRaw}"`,
      );
      continue;
    }

    rows.push({ taskId, unidade, plano, placa, valor, lineIndex: i });
  }

  return { rows, delim };
}

/**
 * Escreve um valor na coluna J (índice 9) da linha `lineIndex` do CSV.
 * Preserva todo o restante do conteúdo inalterado.
 */
function writeCsvColumnJ(filePath: string, lineIndex: number, value: string, delim: string): void {
  const raw = fs.readFileSync(filePath, 'utf8');
  const hasBom = raw.startsWith('﻿');
  const content = hasBom ? raw.slice(1) : raw;
  const lines = content.split(/\r?\n/);

  if (lineIndex < 0 || lineIndex >= lines.length) return;

  const cols = parseCsvLine(lines[lineIndex], delim);

  // garante ao menos 10 colunas (A–J)
  while (cols.length < 10) cols.push('');

  // escapa o valor se necessário (contém delimitador, aspas ou quebra de linha)
  const needsQuote = value.includes(delim) || value.includes('"') || value.includes('\n') || value.includes('\r');
  cols[9] = needsQuote ? `"${value.replace(/"/g, '""')}"` : value;

  lines[lineIndex] = cols.join(delim);

  const output = (hasBom ? '﻿' : '') + lines.join('\n');
  fs.writeFileSync(filePath, output, 'utf8');
}

function cleanSessionsDir(logger: Logger): void {
  const sessionsDir = path.resolve(process.cwd(), 'ssw-sessions');
  if (fs.existsSync(sessionsDir)) {
    fs.rmSync(sessionsDir, { recursive: true, force: true });
    logger.log(`Pasta ssw-sessions removida: ${sessionsDir}`);
  }
}

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  cleanSessionsDir(logger);

  const app = await NestFactory.createApplicationContext(AppModule);
  logger.log('SSW CIOT App initialized.');

  const cwd = process.cwd();
  const csvPath = findFirstCsv(cwd);
  if (!csvPath) {
    logger.warn(`Nenhum arquivo .csv encontrado em ${cwd}. Encerrando.`);
    await app.close();
    return;
  }
  logger.log(`Lendo CSV: ${path.basename(csvPath)}`);

  const { rows, delim } = parseCsv(csvPath, logger);
  if (rows.length === 0) {
    logger.warn('Nenhuma linha válida no CSV. Encerrando.');
    await app.close();
    return;
  }
  logger.log(`${rows.length} linha(s) válida(s) para processar.`);

  const emitter = app.get(EMITIR_CIOT_SSW);

  for (const row of rows) {
    logger.log(`Iniciando processamento do card com id ${row.taskId}`);
    try {
      const result = await emitter.executar(row.placa, row.valor, row.plano, row.unidade, creds);
      logger.log(`Card ${row.taskId} → ${JSON.stringify(result)}`);

      if (!result.ok && result.message) {
        logger.warn(`Card ${row.taskId}: gravando erro na coluna J — "${result.message}"`);
        writeCsvColumnJ(csvPath, row.lineIndex, result.message, delim);
      }
    } catch (e: any) {
      logger.error(`Card ${row.taskId} falhou: ${e?.message || e}`);
    }
  }

  await app.close();
}

bootstrap();
