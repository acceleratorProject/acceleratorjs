import mri from 'mri'
import { askInstallModules } from './askInstallModules.js'
import { getModulesList } from './getModulesList.js'
import { promptUser } from './promptUser.js'
import { writeFile } from './writeFile.js'
export function initializeConfig() {
  const argv = mri(process.argv.slice(2))

  if (argv.config) {
    const config = {
      extends:
        typeof argv.config === 'string' ? argv.config.split(',') : argv.config
    }
    const modules = getModulesList(config)

    return askInstallModules(modules).then(() =>
      writeFile(config, 'JavaScript')
    )
  }

  return promptUser()
}
