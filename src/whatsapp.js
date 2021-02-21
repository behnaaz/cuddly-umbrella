const puppeteer = require('puppeteer');

(async () => {
  const url = "https://web.whatsapp.com/";
  const outname = "output/"+url.replace("https://", "").replace(/\//g, "").replace(/\./g, "-");
  const browser = await puppeteer.launch();//{ executablePath: '/usr/bin/firefox', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3641.0 Safari/537.36');
  await page.pdf({path: outname+'.pdf', format: 'A4'});
  await page.screenshot({ path: outname+'.png' });
  c = await page.cookies();
  console.log(JSON.stringify(c));
  await browser.close();
})();

