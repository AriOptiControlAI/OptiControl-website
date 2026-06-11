import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({headless:'new'});
const page = await browser.newPage();
await page.setViewport({width:1280,height:900,deviceScaleFactor:2});
await page.goto('http://localhost:3001',{waitUntil:'networkidle2'});
await new Promise(r=>setTimeout(r,1000));

const rect = await page.evaluate(()=>{
  const el = document.getElementById('team');
  const b = el.getBoundingClientRect();
  return {x:b.left,y:b.top+window.scrollY,w:b.width,h:b.height};
});

await page.evaluate((y)=>window.scrollTo(0,y-50),rect.y);
await new Promise(r=>setTimeout(r,500));

const viewY = await page.evaluate(()=>window.scrollY);

await page.screenshot({
  path:'temporary screenshots/team-photo-check.png',
  clip:{x:0,y:rect.y-viewY,width:1280,height:Math.min(rect.h,800)}
});
await browser.close();
console.log('Done');
