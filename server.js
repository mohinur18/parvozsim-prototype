const http = require('http');
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const PORT = 8080;
const TYPES = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.png':'image/png', '.svg':'image/svg+xml', '.json':'application/json' };

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/' || p === '') p = '/index.html';
  const file = path.join(DIR, path.normalize(p).replace(/^(\.\.[\/\\])+/, ''));
  if (!file.startsWith(DIR)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => console.log('Serving '+DIR+' on http://localhost:'+PORT));
