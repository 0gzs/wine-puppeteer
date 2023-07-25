import pLimit from 'p-limit'
import getWineLinksFromPage from './wine/wineLinks.js'
import getWineData from './wine/wineData.js'
import { saveWineData, data } from './utils/fileOps.js'

const page = 1
const limit = pLimit(5)
const baseLink = `https://www.bevmo.com/shop/wine/red_wine/other_italian/d/897664#!/?page=${page}` 

async function main() {
  // Get all wine links
  const links = await getWineLinksFromPage(baseLink)

  // Log wine link length
  console.log(`Found ${links.length} wine links`)

  // Get wine data
  const wineData = await Promise.all(links.map(link => limit(() => getWineData(link))))

  // Save wine data
  saveWineData(wineData)
}

main()
// console.log(data.length)
