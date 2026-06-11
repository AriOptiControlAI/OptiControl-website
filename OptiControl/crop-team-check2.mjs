import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({headless:'new'});
const page = await browser.newPage();
await page.setViewport({width:1280,height:900,deviceScaleFactor:1});
await page.goto('http://localhost:3001',{waitUntil:'networkidle2'});
await new Promise(r=>setTimeout(r,1000));

const rect = await page.evaluate(()=>{
  const el = document.getElementById('team');
  if(!el) return null;
  const b = el.getBoundingClientRect();
  return {x:b.left,y:b.top+window.scrollY,w:b.width,h:b.height};
});
console.log('Team rect:', rect);

const fullH = await page.evaluate(()=>document.body.scrollHeight);
console.log('Full height:', fullH);

// Screenshot bottom portion
await page.screenshot({
  path:'temporary screenshots/team-photo-check2.png',
  clip:{x:0,y:Math.max(0,fullH-900),width:1280,height:900}
});
await browser.close();
