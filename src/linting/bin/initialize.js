import { getPeerDependencies } from '../getPeerDependencies.js'
import { initializeConfig } from '../initializeConfig.js'

getPeerDependencies.cache = new Map()
initializeConfig('none')
