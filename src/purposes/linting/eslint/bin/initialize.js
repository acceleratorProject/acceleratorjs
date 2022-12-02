import { state } from '../../../../state/state.js'
import { getPeerDependencies } from '../getPeerDependencies.js'
import { initializeConfig } from '../initializeConfig.js'

getPeerDependencies.cache = new Map()
export async function initializeESlint() {
  if (state.error) {
    console.log(state.errorMessage)
    return
  }
  await initializeConfig()
}
