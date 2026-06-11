import http from 'http';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const PORT = 3001;

const mime = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  const urlPath = req.url === '/' ? '/index-v2.html' : req.url;
  const filePath = path.join(rootDir, urlPath);
  const ext = path.extname(filePath);
  const contentType = mime[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => console.log(`Server running at http://localhost:${PORT}`));
