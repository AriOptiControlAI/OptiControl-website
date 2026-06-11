import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({headless:true,args:['--no-sandbox']});
const page = await browser.newPage();
await page.setViewport({width:1440,height:900});
await page.goto('http://localhost:3001',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,800));
const pageHeight = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y <= pageHeight; y += 500) {
  await page.evaluate(s => window.scrollTo(0, s), y);
  await new Promise(r=>setTimeout(r,60));
}
await new Promise(r=>setTimeout(r,600));
const el = await page.$('#skiftet');
await el.screenshot({path:'temporary screenshots/screenshot-9-skiftet.png'});
await browser.close();
console.log('done');
