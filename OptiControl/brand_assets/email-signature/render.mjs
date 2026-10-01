import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Render icon-only.svg -> icon-only.png (transparent, high-res)
const iconSvg = fs.readFileSync(path.join(__dirname, 'icon-only.svg'), 'utf-8');
{
  // Native pixel size kept small on purpose — Gmail's signature editor defaults to
  // "Original size" unless you remember to click "Small" every time you re-insert
  // the image (e.g. after redoing the copy-paste for a text/color change). A small
  // native file means even an un-resized insert looks right.
  const W = 90, H = 90;
  const html = `<!doctype html><html><head><style>*{margin:0;padding:0}html,body{width:${W}px;height:${H}px;background:transparent;display:flex;align-items:center;justify-content:center}svg{width:${W}px;height:${H}px}</style></head><body>${iconSvg}</body></html>`;
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, 'icon-only.png'), omitBackground: true });
  await browser.close();
}

// Screenshot the full signature.html for visual review
{
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 700, height: 260, deviceScaleFactor: 2 });
  await page.goto('file://' + path.join(__dirname, 'signature.html'), { waitUntil: 'networkidle0' });
  const el = await page.$('table');
  await el.screenshot({ path: path.join(__dirname, 'signature-preview.png') });
  await browser.close();
}

console.log('done');
