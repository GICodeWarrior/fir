import { initStockpiles, addImages, getAppendGoogleRows } from './stockpiles.js'





/** @type {Array<HTMLElement>} */
let [fileForm, renderDiv, reportDiv, countSpan] = []

/** @type {HTMLInputElement} */
let fileInput

/** @type {HTMLButtonElement} */
let appendButton





const init = () =>
{
  fileForm = document.getElementById('file-form')
  fileInput = fileForm.querySelector('input[type="file"]')
  renderDiv = document.getElementById('render-div')
  reportDiv = document.getElementById('report-div')
  countSpan = document.getElementById('processed-count')
  appendButton = document.querySelector('button#append')

  initStockpiles({ renderDiv, reportDiv, countSpan })
  setupEventListeners()
}



if (document.readyState === "complete" || document.readyState === "interactive")
  init()
else
  window.addEventListener("load", init)





function setupEventListeners()
{
  fileForm.addEventListener('submit', (e) => e.preventDefault())


  /** paste event listener */
  window.addEventListener('paste', (event) =>
  {
    if(!event.clipboardData.files || !event.clipboardData.files)
      return
    
    const images = Array.from(event.clipboardData.files).filter(f => f.type.startsWith('image/'))
    addImages(images)
  })



  /** file input event listener */
  fileInput.addEventListener('change', () =>
  {
    if(!fileInput.files || !fileInput.files.length)
      return

    const unsortedImages = Array.from(fileInput.files).filter(f => f.type.startsWith('image/'))
    const images = unsortedImages.sort((a, b) => a.lastModified - b.lastModified)
    
    addImages(images)
  })



  /** append to google sheet button event listener */
  appendButton.addEventListener('click', () =>
  {
    const rows = getAppendGoogleRows()
    
    // @ts-ignore
    google.script.run
    .withFailureHandler((error) => {
      console.error(error)
      googleScriptAlert(error)
    })
    .firAppend(rows, [0, 1]) // rows and which cols have to be converted to Date
  })

}


// @ts-ignore
const googleScriptAlert = (msg) => google.script.run.fhAlert(msg)