import pLimit from 'p-limit'
import getWineLinksFromPage from './wine/wineLinks.js'
import getWineData from './wine/wineData.js'
import { saveWineData } from './utils/fileOps.js'

const page = 1
const limit = pLimit(5)
const baseLink = process.argv[2] || `https://www.bevmo.com/shop/wine/white_wine/gewurztraminer/d/897508#!/?page=${page}`
const type = process.argv[3] || 'multi'

async function main() {
  // If type is multi, get all wine links 
  // If type is single, links is null
  const links = type === 'multi' ? await getWineLinksFromPage(baseLink) : null

  // If links is null, get wine data from baseLink
  if (!links) {
    console.log("here")
    const wineData = await getWineData(baseLink)
    saveWineData(wineData)
  } else {

    // Log wine link length
    console.log(`Found ${links.length} wine links`)
    // Get wine data from each link
    const wineData = await Promise.all(links.map(link => limit(() => getWineData(link))))

    // Save wine data
    saveWineData(wineData)
  }
}

main()
// console.log(data.length)
