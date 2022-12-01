import enquirer from 'enquirer'
import { installModules } from './installModules.js'
import { info } from './shared/logging.js'

export async function askInstallModules(modules) {
  // If no modules, do nothing.
  if (modules.length === 0) {
    return Promise.resolve()
  }

  info("The config that you've selected requires the following dependencies:\n")
  info(modules.join(' '))
  return enquirer
    .prompt([
      {
        type: 'toggle',
        name: 'executeInstallation',
        message: 'Would you like to install them now?',
        enabled: 'Yes',
        disabled: 'No',
        initial: 1,
        skip() {
          return !modules.length
        },
        result(input) {
          return this.skipped ? null : input
        }
      },
      {
        type: 'select',
        name: 'packageManager',
        message: 'Which package manager do you want to use?',
        initial: 0,
        choices: ['npm', 'yarn', 'pnpm'],
        skip() {
          return !this.state.answers.executeInstallation
        }
      }
    ])
    .then(({ executeInstallation, packageManager }) => {
      if (executeInstallation) {
        installModules(modules, packageManager)
      }
    })
}
