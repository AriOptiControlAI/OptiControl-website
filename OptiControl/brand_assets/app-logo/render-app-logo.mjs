import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let svg = fs.readFileSync(path.join(__dirname, 'app-logo.svg'), 'utf-8');

const W = 1600, H = 320; // 2x for crispness

async function render(svgContent, filename, bg) {
  const html = `<!doctype html><html><head><style>
    *{margin:0;padding:0}
    html,body{width:${W}px;height:${H}px;background:${bg==='transparent'?'transparent':bg};display:flex;align-items:center;justify-content:center}
    svg{width:${W}px;height:${H}px}
  </style></head><body>${svgContent}</body></html>`;

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, filename), omitBackground: bg === 'transparent' });
  await browser.close();
}

// Light-background variant (navy wordmark) — as authored
await render(svg, 'OptiControl-app-logo-light.png', 'transparent');

// Dark-background variant (white "Opti", same gradient "Control") — swap base fill
const svgDark = svg.replace('id="wordmark-base" fill="#0A1628"', 'id="wordmark-base" fill="#FFFFFF"');
await render(svgDark, 'OptiControl-app-logo-dark.png', 'transparent');

console.log('done');
