import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({headless:'new'});
const page = await browser.newPage();
await page.setViewport({width:1280,height:1100,deviceScaleFactor:1});
await page.goto('http://localhost:3001',{waitUntil:'networkidle2'});
await new Promise(r=>setTimeout(r,1000));

await page.screenshot({
  path:'temporary screenshots/team-photo-check3.png',
  clip:{x:0,y:10200,width:1280,height:1000}
});
await browser.close();
