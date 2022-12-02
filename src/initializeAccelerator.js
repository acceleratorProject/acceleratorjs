import { initializePurposes } from './purposes/initializePurposes.js'
import { initializeVite } from './vite/init/initializeVite.js'

export async function initializeAccelerator() {
  initializeVite().then(() => {
    initializePurposes()
  })
}
