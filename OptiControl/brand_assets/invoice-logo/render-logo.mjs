import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svg = fs.readFileSync(path.join(__dirname, 'logo.svg'), 'utf-8');

// 56mm x 22mm @ 600dpi ≈ 1323 x 520px. Render at 2x for headroom.
const W = 2646, H = 1040;

const html = `<!doctype html><html><head><style>
  *{margin:0;padding:0}
  html,body{width:${W}px;height:${H}px;background:transparent;display:flex;align-items:center;justify-content:center}
  svg{width:${W}px;height:${H}px}
</style></head><body>${svg}</body></html>`;

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle0' });

await page.screenshot({ path: path.join(__dirname, 'OptiControl-faktura-logo.png'), omitBackground: true });

await page.evaluate(() => { document.body.style.background = '#FFFFFF'; });
await page.screenshot({ path: path.join(__dirname, 'OptiControl-faktura-logo-hvit-bakgrunn.png'), omitBackground: false });

await browser.close();
console.log('done');
