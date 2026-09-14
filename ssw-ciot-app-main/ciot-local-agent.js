const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const HOST = '127.0.0.1';
const PORT = 30248;
const WORKDIR = path.resolve(__dirname);

function sendCors(res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
}

const server = http.createServer((req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    sendCors(res);
    res.writeHead(204);
    return res.end();
  }

  if (req.method === 'POST' && req.url === '/emitir-ciot') {
    sendCors(res);
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const csv = String(payload.csv || '');
        let filename = String(payload.filename || 'ciot.csv').replace(/[<>:\"/\\|?*]/g, '_');
        const filePath = path.join(WORKDIR, filename);
        fs.writeFileSync(filePath, csv, 'utf8');

        // Try to start start.bat in a detached process (Windows)
        try {
          const child = spawn('cmd.exe', ['/c', 'start', 'start.bat'], {
            cwd: WORKDIR,
            detached: true,
            stdio: 'ignore',
          });
          child.unref();
        } catch (e) {
          try {
            const child2 = spawn('start.bat', { cwd: WORKDIR, shell: true, detached: true, stdio: 'ignore' });
            child2.unref();
          } catch (e2) {
            // ignore
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, filename }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, message: String(err && err.message ? err.message : err) }));
      }
    });
    return;
  }

  // Not found
  sendCors(res);
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, message: 'Not found' }));
});

server.listen(PORT, HOST, () => {
  console.log(`CIOT local agent listening at http://${HOST}:${PORT}/emitir-ciot`);
});
