const puppeteer = require('puppeteer');

(async () => {
  const url = "www.google.com";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://'+url);
  await page.screenshot({ path: url.replace('.','_')+'.png' });

  await browser.close();
})();
