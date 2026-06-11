import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({headless:true,args:['--no-sandbox']});
const page = await browser.newPage();
await page.setViewport({width:1440,height:900});
await page.goto('http://localhost:3001',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,800));
// Scroll full page slowly to trigger all IntersectionObservers
const pageHeight = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y <= pageHeight; y += 300) {
  await page.evaluate(s => window.scrollTo(0, s), y);
  await new Promise(r=>setTimeout(r,80));
}
await new Promise(r=>setTimeout(r,1000));
// Force all rv elements visible as fallback
await page.evaluate(() => {
  document.querySelectorAll('.rv').forEach(el => el.classList.add('on'));
});
await new Promise(r=>setTimeout(r,400));
const el = await page.$('#infra');
await el.screenshot({path:'temporary screenshots/screenshot-13-infra.png'});
await browser.close();
console.log('done');
