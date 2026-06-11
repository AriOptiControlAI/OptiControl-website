import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({headless:'new'});
const page = await browser.newPage();
await page.setViewport({width:1280,height:900,deviceScaleFactor:1});
await page.goto('http://localhost:3001',{waitUntil:'networkidle2'});

for(let y=0;y<=12000;y+=500){
  await page.evaluate((s)=>window.scrollTo(0,s),y);
  await new Promise(r=>setTimeout(r,80));
}
await new Promise(r=>setTimeout(r,800));

// Full team section: starts ~10298, height ~926
await page.screenshot({
  path:'temporary screenshots/team-cards.png',
  clip:{x:0,y:10450,width:1280,height:850}
});
await browser.close();
console.log('done');
