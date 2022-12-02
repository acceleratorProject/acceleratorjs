import enquirer from 'enquirer'
import { red } from 'kolorist'
import semver from 'semver'
import { state } from '../../../state/state.js'
import { askInstallModules } from './askInstallModules.js'
import { customConfig } from './customConfig.js'
import { getModulesList } from './getModulesList.js'
import { hasESLintVersionConflict } from './hasEslintVersionConflict.js'
import * as npmUtils from './npm-utils.js'
import { processAnswers } from './processAnswers.js'
import { info } from './shared/logging.js'
import { writeFile } from './writeFile.js'

export function promptUser(framework) {
  const packageJsonExists = npmUtils.checkPackageJson()

  if (!packageJsonExists) {
    throw new Error(
      'A package.json file is necessary to initialize ESLint. Run `npm init` to create a package.json file and try again.'
    )
  }

  const styleGuides = [
    {
      message: 'Airbnb: https://github.com/airbnb/javascript',
      name: 'airbnb'
    },
    {
      message: 'Standard: https://github.com/standard/standard',
      name: 'standard'
    },
    {
      message: 'Google: https://github.com/google/eslint-config-google',
      name: 'google'
    },
    {
      message: 'XO: https://github.com/xojs/eslint-config-xo',
      name: 'xo'
    }
  ]

  return enquirer
    .prompt([
      {
        type: 'select',
        name: 'source',
        message: 'How would you like to define a style for your project?',
        choices: [
          { message: 'Use a popular style guide', name: 'guide' },
          { message: 'Answer questions about your style', name: 'prompt' }
        ],

        result(input) {
          return this.skipped ? null : input
        }
      },
      {
        type: 'select',
        name: 'styleguide',
        message: 'Which style guide do you want to follow?',
        choices: styleGuides,
        skip() {
          return this.state.answers.source !== 'guide'
        },
        result(input) {
          return this.skipped ? null : input
        }
      },
      {
        type: 'select',
        name: 'format',
        message: 'What format do you want your config file to be in?',
        initial: 0,
        choices: ['JavaScript', 'YAML', 'JSON']
      },
      {
        type: 'toggle',
        name: 'installESLint',
        message() {
          const { answers } = this.state
          const verb = semver.ltr(
            answers.localESLintVersion,
            answers.requiredESLintVersionRange
          )
            ? 'upgrade'
            : 'downgrade'

          return `The style guide "${answers.styleguide}" requires eslint@${answers.requiredESLintVersionRange}. You are currently using eslint@${answers.localESLintVersion}.\n  Do you want to ${verb}?`
        },
        enabled: 'Yes',
        disabled: 'No',
        initial: 1,
        skip() {
          return !(
            this.state.answers.source === 'guide' &&
            hasESLintVersionConflict(this.state.answers)
          )
        },
        result(input) {
          return this.skipped ? null : input
        }
      },
      {
        onCancel: () => {
          throw new Error(`${red('✖')} Operation cancelled`)
        }
      }
    ])
    .then((earlyAnswers) => {
      earlyAnswers.purpose = 'style'
      earlyAnswers.moduleType = 'esm'
      earlyAnswers.framework = state.framework
      earlyAnswers.typescript = false
      earlyAnswers.env = ['browser']

      // early exit if you are using a style guide
      if (earlyAnswers.source === 'guide') {
        if (
          earlyAnswers.installESLint === false &&
          !semver.satisfies(
            earlyAnswers.localESLintVersion,
            earlyAnswers.requiredESLintVersionRange
          )
        ) {
          info(
            `Note: it might not work since ESLint's version is mismatched with the ${earlyAnswers.styleguide} config.`
          )
        }

        const config = processAnswers(earlyAnswers)
        const modules = getModulesList(config)

        return askInstallModules(modules).then(() =>
          writeFile(config, earlyAnswers.format)
        )
      }

      // continue with the style questions otherwise...
      return customConfig(earlyAnswers)
    })
}
