import puppeteer from 'puppeteer'

const getWineData = async link => {
  const browser = await puppeteer.launch({ headless: 'new' })
  let page = await browser.newPage()
  page.setDefaultNavigationTimeout(50000);

  try {
    await page.goto(link, { "waitUntil": "networkidle0" })
    await page.waitForSelector('.fp-item-details')

    const wines = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.fp-item-details'), e => {
        return {
          name: e.querySelector('.fp-col-item-details h1').innerText || '',
          price: e.querySelector('.fp-col-item-details .fp-item-sale-price').innerText || '',
          base_price: e.querySelector('.fp-col-item-details .fp-item-base-price') ? e.querySelector('.fp-col-item-details .fp-item-base-price').innerText : '',
          image: e.querySelector('.fp-col-item-image .fp-item-image img').src || '',
          rating: e.querySelector('.fp-col-item-details .fp-review-rating') ? e.querySelector('.fp-col-item-details .fp-review-rating').innerText : e.querySelector('.fp-col-item-details .fp-review-count'),
          description: e.querySelector('.fp-col-item-details .fp-item-description-content').children[1] ? e.querySelector('.fp-col-item-details .fp-item-description-content').children[1].innerText : '',
          on_hand: e.querySelector('.fp-col-item-details .fp-item-quantity-on-hand') ? e.querySelector('.fp-col-item-details .fp-item-quantity-on-hand').innerText : '',
          sku: e.querySelector('.fp-item-description .fp-item-upc .fp-item-tag-value') ? e.querySelector('.fp-item-description .fp-item-upc .fp-item-tag-value').innerText : '',
          type: e.querySelector('.fp-item-description .fp-product-tags').children[1].children[1].children[0] ? e.querySelector('.fp-item-description .fp-product-tags').children[1].children[1].children[0].innerText : '',
          brand: e.querySelector('.fp-item-description .fp-product-tags').children[2].children[1].children[0] ? e.querySelector('.fp-item-description .fp-product-tags').children[2].children[1].children[0].innerText : '',
          region: e.querySelector('.fp-item-description .fp-product-tags').children[3].children[1].children[0] ? e.querySelector('.fp-item-description .fp-product-tags').children[3].children[1].children[0].innerText : '',
          size: e.querySelector('.fp-item-description .fp-product-tags').children[4].children[1].children[0] ? e.querySelector('.fp-item-description .fp-product-tags').children[4].children[1].children[0].innerText : '',
          country: e.querySelector('.fp-item-description .fp-product-tags').children[5].children[1].children[0] ? e.querySelector('.fp-item-description .fp-product-tags').children[5].children[1].children[0].innerText : '',
          appellation: e.querySelector('.fp-item-description .fp-product-tags').children[6] ? e.querySelector('.fp-item-description .fp-product-tags').children[6].children[1].children[0].innerText : ''
        }
      })
    })

    await browser.close()

    return wines[0]
  } catch (err) {
    console.log(`Error processing ${link}`)
    console.log(err)
    await browser.close()
  }
}

export default getWineData

// let found = await getWineData("https://www.bevmo.com/shop/wine/champagne_and_sparkling/champagne/sparkling/gruet_cuvee_89_sparkling_brut_750_ml/p/1564405684704525192#!/?department_id=897519")
