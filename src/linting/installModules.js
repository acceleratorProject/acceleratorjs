import * as npmUtils from './npm-utils.js'
import { info } from './shared/logging.js'

export function installModules(modules, packageManager) {
  info(`Installing ${modules.join(', ')}`)
  npmUtils.installSyncSaveDev(modules, packageManager)
}
