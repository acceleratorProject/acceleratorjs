import { setupCounter } from './counter.js'
import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
  
  </div>
`

setupCounter(document.querySelector('#counter'))
