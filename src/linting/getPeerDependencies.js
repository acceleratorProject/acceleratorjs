import * as npmUtils from './npm-utils.js'
import { info } from './shared/logging.js'

export function getPeerDependencies(moduleName) {
  let result = getPeerDependencies.cache.get(moduleName)

  if (!result) {
    info(`Checking peerDependencies of ${moduleName}`)

    result = npmUtils.fetchPeerDependencies(moduleName)
    getPeerDependencies.cache.set(moduleName, result)
  }

  return result
}
