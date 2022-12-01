import { initPurpose } from './purposes/init.js'
import { initVite } from './vite/init/init.js'

export async function initAccelerator() {
  initVite().then(() => initPurpose())
}
