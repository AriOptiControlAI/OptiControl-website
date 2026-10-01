import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svg = fs.readFileSync(path.join(__dirname, 'logo.svg'), 'utf-8');

// Signature-appropriate size: display ~280px wide, rendered @2x for retina = 560x220
const W = 560, H = 220;

const html = `<!doctype html><html><head><style>
  *{margin:0;padding:0}
  html,body{width:${W}px;height:${H}px;background:#FFFFFF;display:flex;align-items:center;justify-content:center}
  svg{width:${W}px;height:${H}px}
</style></head><body>${svg}</body></html>`;

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.screenshot({ path: path.join(__dirname, 'OptiControl-signatur-logo.png'), omitBackground: false });
await browser.close();
console.log('done');
