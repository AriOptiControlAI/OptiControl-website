import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({headless:true,args:['--no-sandbox']});
const page = await browser.newPage();
await page.setViewport({width:1440,height:900});
await page.goto('http://localhost:3001',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,800));
// Screenshot just top 1400px to see hero → trust transition
await page.screenshot({path:'temporary screenshots/screenshot-12-hero-trust.png', clip:{x:0,y:0,width:1440,height:1400}});
await browser.close();
console.log('done');
