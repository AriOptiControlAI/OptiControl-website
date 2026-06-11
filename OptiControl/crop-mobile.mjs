import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({headless:true,args:['--no-sandbox']});
const page = await browser.newPage();
await page.setViewport({width:390,height:844,deviceScaleFactor:2});
await page.goto('http://localhost:3001',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,800));
const pageHeight = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y <= pageHeight; y += 400) {
  await page.evaluate(s => window.scrollTo(0, s), y);
  await new Promise(r=>setTimeout(r,60));
}
await page.evaluate(() => document.querySelectorAll('.rv').forEach(el=>el.classList.add('on')));
await new Promise(r=>setTimeout(r,400));
await page.evaluate(() => window.scrollTo(0,0));
await page.screenshot({path:'temporary screenshots/screenshot-15-mobile.png', fullPage:true});
await browser.close();
console.log('done');
