import puppeteer from 'puppeteer'

const getWineLinksFromPage = async link => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' })
    let page = await browser.newPage()
    page.setDefaultNavigationTimeout(50000);

    await page.goto(link, { "waitUntil": "networkidle0" })
    await page.waitForSelector('.fp-result-list-content .fp-item-container')

    const links = await page.evaluate(() => (
      Array.from(document.querySelectorAll('.fp-result-list-content .fp-item-container'), e => (
        e.querySelector('.fp-item-content .fp-item-image a').href
      ))
    ))

    await browser.close()

    return links
  } catch (err) {
    console.log(err)
  }
}

export default getWineLinksFromPage
