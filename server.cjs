const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'dist');

http.createServer((request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400).end(); return; }
  const clean = pathname === '/' ? '/index.html' : pathname;
  let file = path.resolve(root, `.${clean}`);
  if (!file.startsWith(`${root}${path.sep}`) && file !== path.join(root, 'index.html')) { response.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!path.extname(file) && fs.existsSync(`${file}${path.sep}index.html`)) file = `${file}${path.sep}index.html`;
  fs.readFile(file, (error, data) => {
    if (error) { response.writeHead(404).end('Not found'); return; }
    const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.glb':'model/gltf-binary', '.wasm':'application/wasm' };
    response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    response.setHeader('Cache-Control', /\.(glb|png|wasm)$/.test(file) ? 'public, max-age=31536000, immutable' : 'no-cache');
    response.end(data);
  });
}).listen(4173, '127.0.0.1', () => console.log('SALA preview: http://127.0.0.1:4173'));
