import { processor } from "./screenshot-processor.mjs"


const VERSION = 'airborne-63'



let imagesTotal = 0
let imagesProcessed = 0
let stockpiles = []

/** @type {string|null} */
let stockpilesJSON = null



let /** @type {HTMLElement} */ renderDiv
let /** @type {HTMLElement} */ reportDiv
let /** @type {HTMLElement} */ countSpan


let CATALOG




/**
 * @param {Object} options
 * @param {HTMLElement} options.renderDiv
 * @param {HTMLElement} options.reportDiv
 * @param {HTMLElement} options.countSpan
 */
export function initStockpiles(options)
{
  const { renderDiv: rd, reportDiv: rpd, countSpan: cs } = options
  renderDiv = rd
  reportDiv = rpd
  countSpan = cs

  import(`../../foxhole/${VERSION}/catalog.json`,{ with: {type: 'json'}})
    .then(value => CATALOG = value.default)
}



function updateCounter()
{
  countSpan.textContent = `${imagesProcessed} of ${imagesTotal}`
}



/**
 * @param {File[]} files
 */
export function addImages(files)
{
  imagesTotal += files.length
  updateCounter()


  for (const file of files)
  {
    const container = document.createElement('div')

    const label = document.createElement('span')
    label.textContent = file.name
    label.contentEditable = "true"
    label.spellcheck = false
    
    container.appendChild(label)
  
    const image = document.createElement('img')
    image.style.display = 'none'
    image.addEventListener('load', getProcessImage(label, file.lastModified), { once: true })
    image.src = URL.createObjectURL(file)
    
    container.appendChild(image)
  
    renderDiv.appendChild(container)
  }
}




function getProcessImage(label, lastModified)
{
  return function()
  {
    return processImage.call(this, label, lastModified)
  }



  /** @this {HTMLImageElement} */
  async function processImage(label, lastModified)
  {
    URL.revokeObjectURL(this.src)

    const canvas = document.createElement('canvas')
    const width = this.width
    const height = this.height
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d', { alpha: false, willReadFrequently: true })
    context.drawImage(this, 0, 0)
    const rgba = new Uint8Array(context.getImageData(0, 0, width, height).data)


    const stockpile = processor.extract_stockpile(rgba, width)

    if (!stockpile)
    {
      canvas.remove()
      return 
    }
    

    const box = stockpile.bounds
    const stockpileCanvas = document.createElement('canvas')
    stockpileCanvas.width = box.width
    stockpileCanvas.height = box.height

    const stockpileContext = stockpileCanvas.getContext('2d', { alpha: false, willReadFrequently: true })
    stockpileContext.drawImage(canvas, box.x, box.y, box.width, box.height, 0, 0, box.width, box.height)

    this.src = stockpileCanvas.toDataURL()
    stockpile.label = label
    stockpile.lastModified = lastModified
    stockpile.canvas = stockpileCanvas
    stockpiles.push(stockpile)
    


    this.style.display = 'revert'
    ++imagesProcessed
    updateCounter()
    outputTotals()
  }
}



function outputTotals()
{
  if(!CATALOG)
  {
    console.error('Catalog not loaded')
    return
  }

  if (imagesProcessed != imagesTotal)
    return

  const totals = {}
  const categories = {}

  for (const stockpile of stockpiles) {
    for (const element of stockpile.contents) {
      let key = element.icon.code_name
      if (element.icon.is_crated) {
        key += '-crated'
      }

      if (!totals[key]) {
        const catalogItem = CATALOG.find(e=>e.CodeName == element.icon.code_name)
        if (!catalogItem) {
          console.error(`${element.icon.code_name} missing from catalog`)
          continue
        }

        const category = catalogItem.__FIG__.ui_category
        categories[category] ||= []
        categories[category].push(key)

        totals[key] = {
          CodeName: element.icon.code_name,
          isCrated: element.icon.is_crated,
          name: catalogItem.DisplayName,
          category: category,
          total: 0,
          collection: [],
        }
      }
      totals[key].firstStockpile ||= stockpile
      totals[key].total += element.quantity.value
      totals[key].collection.push(element)
    }
  }

  const categoryOrder = {
    'Small Weapons': 1,
    'Heavy Weapons': 2,
    'Heavy Ammunition': 3,
    'Utility': 4,
    'Medical': 5,
    'Resources': 6,
    'Uniforms': 7,
    'Vehicles': 8,
    'Shippables': 9,
  }
  const sortedCategories = Object.keys(categories).sort(function(a, b) {
    return (categoryOrder[a] || Infinity) - (categoryOrder[b] || Infinity)
  })

  const report = reportDiv
  report.innerHTML = ''
  for (const category of sortedCategories) {
    const keys = categories[category]
    if (!keys) {
      continue
    }
    keys.sort(function(a, b) {
      const crateDiff = totals[b].isCrated - totals[a].isCrated
      if (crateDiff != 0) {
        return crateDiff
      }
      return totals[b].total - totals[a].total
    })

    const headerPrinted = {}
    for (const key of keys) {
      const type = totals[key]
      if (!headerPrinted[type.isCrated]) {
        if (type.isCrated || (!type.isCrated && !headerPrinted[true])) {
          const columnBreak = document.createElement('div')
          columnBreak.classList.add('column-break')
          report.appendChild(columnBreak)
        }

        const cell = document.createElement('div')
        const quantity = document.createElement('div')
        cell.appendChild(quantity)

        const name = document.createElement('h3')
        const suffix = type.isCrated ? ' (crated)' : ''
        name.textContent = category.replace(/([A-Z])/g, ' $1').trim() + suffix
        cell.appendChild(name)
        report.appendChild(cell)

        headerPrinted[type.isCrated] = true
      }

      const cell = document.createElement('div')
      const quantity = document.createElement('div')
      quantity.textContent = type.total
      cell.appendChild(quantity)

      const iconBox = type.collection[0].icon.bounds
      const iconCanvas = document.createElement('canvas')
      iconCanvas.width = iconBox.width
      iconCanvas.height = iconBox.height

      const iconContext = iconCanvas.getContext('2d', { alpha: false, willReadFrequently: true })
      iconContext.drawImage(type.firstStockpile.canvas,
        iconBox.x - type.firstStockpile.bounds.x, iconBox.y - type.firstStockpile.bounds.y,
        iconBox.width, iconBox.height,
        0, 0, iconBox.width, iconBox.height)

      cell.appendChild(iconCanvas)

      const name = document.createElement('div')
      name.textContent = type.name
      cell.appendChild(name)

      report.appendChild(cell)
    }
  }
}


export function getAppendGoogleRows()
{
  const exportTime = new Date()
  const rows = []
  stockpiles.sort( (a, b) => a.lastModified - b.lastModified )

  for (const stockpile of stockpiles)
  {
    const stockpileTime = new Date(stockpile.lastModified)
    const stockpileID = Math.floor(Math.random() * 1000000000000000)
    const stockpileType = stockpile.header && stockpile.header.structure_type.value || ''
    const stockpileName = stockpile.header && stockpile.header.stockpile_name && stockpile.header.stockpile_name.value || ''

    let isEmpty = true

    for (const element of stockpile.contents)
    {
      if (element.quantity.value == 0)
        continue

      const details = CATALOG.find(e => e.CodeName == element.icon.code_name)
      if (typeof details == 'undefined')
        continue

      isEmpty = false

      
      rows.push([
        exportTime.toString(),
        stockpileTime.toString(),
        stockpileType,
        stockpileName,
        stockpile.label.textContent.trim(),
        element.icon.code_name,
        details.DisplayName,
        element.quantity.value,
        element.icon.is_crated,
        stockpileID,
      ])
      
    }

    if (isEmpty)
    {
      rows.push([
        exportTime.toString(),
        stockpileTime.toString(),
        stockpileType,
        stockpileName,
        stockpile.label.textContent.trim(),
        "__FIR_EMPTY__",
        "Stockpile is empty.",
        0,
        true,
        stockpileID,
      ])
    }

  }
  return rows
}