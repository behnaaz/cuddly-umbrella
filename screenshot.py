#pip3 install pyppeteer
#python3 screenshot.py > out.json
import asyncio
from pyppeteer import launch

async def main():
    browser = await launch()
    page = await browser.newPage()
    await page.goto('https://www.google.com/search?q=dress')
    await page.screenshot({'path': 'screenshot.jpg'})
    links = await page.evaluate('''() => {var res=[]; var ls = document.getElementsByTagName("a"); for (const l of ls) { res.push( {"text":l.innerText,"href":l.href} ); }  return res; } ''')
    print(links)
    await browser.close()

asyncio.get_event_loop().run_until_complete(main())

