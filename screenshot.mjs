import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const dir = path.join(process.cwd(), 'temporary screenshots');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Find next available N
const existing = fs.readdirSync(dir).map(f => {
  const m = f.match(/^screenshot-(\d+)/);
  return m ? parseInt(m[1]) : 0;
});
const n = existing.length ? Math.max(...existing) + 1 : 1;
const filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
const outPath = path.join(dir, filename);

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 800));

// Scroll through entire page to trigger IntersectionObserver reveals
const pageHeight = await page.evaluate(() => document.body.scrollHeight);
const step = 600;
for (let y = 0; y <= pageHeight; y += step) {
  await page.evaluate(s => window.scrollTo(0, s), y);
  await new Promise(r => setTimeout(r, 80));
}
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 600));

await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Screenshot saved: ${outPath}`);
