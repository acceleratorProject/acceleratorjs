import enquirer from 'enquirer'
import { askInstallModules } from './askInstallModules.js'
import { getModulesList } from './getModulesList.js'
import { processAnswers } from './processAnswers.js'
import { writeFile } from './writeFile.js'
export function customConfig(earlyAnswers) {
  return enquirer
    .prompt([
      {
        type: 'select',
        name: 'indent',
        message: 'What style of indentation do you use?',
        initial: 0,
        choices: [
          { message: 'Tabs', name: 'tab' },
          { message: 'Spaces', name: 4 }
        ]
      },
      {
        type: 'select',
        name: 'quotes',
        message: 'What quotes do you use for strings?',
        initial: 0,
        choices: [
          { message: 'Double', name: 'double' },
          { message: 'Single', name: 'single' }
        ]
      },
      {
        type: 'select',
        name: 'linebreak',
        message: 'What line endings do you use?',
        initial: 0,
        choices: [
          { message: 'Unix', name: 'unix' },
          { message: 'Windows', name: 'windows' }
        ]
      },
      {
        type: 'toggle',
        name: 'semi',
        message: 'Do you require semicolons?',
        enabled: 'Yes',
        disabled: 'No',
        initial: 1
      }
    ])
    .then((answers) => {
      const totalAnswers = Object.assign({}, earlyAnswers, answers)

      const config = processAnswers(totalAnswers)
      const modules = getModulesList(config)

      return askInstallModules(modules).then(() =>
        writeFile(config, earlyAnswers.format)
      )
    })
}
