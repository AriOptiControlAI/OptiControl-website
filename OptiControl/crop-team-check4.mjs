import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({headless:'new'});
const page = await browser.newPage();
await page.setViewport({width:1280,height:900,deviceScaleFactor:1});
await page.goto('http://localhost:3001',{waitUntil:'networkidle2'});

// Scroll gradually to trigger IntersectionObserver
for(let y=0;y<=12000;y+=500){
  await page.evaluate((s)=>window.scrollTo(0,s),y);
  await new Promise(r=>setTimeout(r,80));
}
await new Promise(r=>setTimeout(r,600));

await page.screenshot({
  path:'temporary screenshots/team-photo-check4.png',
  clip:{x:0,y:10200,width:1280,height:1000}
});
await browser.close();
console.log('done');
