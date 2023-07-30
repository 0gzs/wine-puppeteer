import fs from 'fs'

export const loadJSON = path => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))

export const data = loadJSON('../data/all_wine.json')

const isWineValid = wineObj => {
  return wineObj && !data.find(item => item.sku === wineObj.sku)
}

const isSingle = wine => !Array.isArray(wine)

// Concat new wine data to existing data
const concat = (results) => {
  if (isSingle(results)) return isWineValid(results) && typeof results === 'object' && [...data, results]
  const newWine = results.filter(wine => isWineValid(wine))
  return [...data, ...newWine]
}

export const saveWineData = results => {
  // Check if wine is exists in data file
  results = concat(results)
  const fileURL = new URL('../../winesearch/src/data/wine.json', import.meta.url)

  // Save results to file
  fs.writeFile(fileURL, JSON.stringify(results, null, 4), 'utf8', err => {
    if (err) throw err
    console.log('The file has been saved!')
  })

  // saveFieldData('type')
}

const saveFieldData = field => {
  const fieldData = [...new Set(data.map(item => item[field]))]
  const results = JSON.stringify(fieldData, null, 4)

  fs.writeFile('../data/varietals.json', results, 'utf8', err => {
    if (err) throw err
    console.log('The file has been saved!')
  })
}

