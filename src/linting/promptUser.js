import enquirer from 'enquirer'
import semver from 'semver'
import { askInstallModules } from './askInstallModules.js'
import { customConfig } from './customConfig.js'
import { getModulesList } from './getModulesList.js'
import { hasESLintVersionConflict } from './hasEslintVersionConflict.js'
import * as npmUtils from './npm-utils.js'
import { processAnswers } from './processAnswers.js'
import { info } from './shared/logging.js'
import { writeFile } from './writeFile.js'
export function promptUser() {
  const packageJsonExists = npmUtils.checkPackageJson()

  if (!packageJsonExists) {
    throw new Error(
      'A package.json file is necessary to initialize ESLint. Run `npm init` to create a package.json file and try again.'
    )
  }

  const styleGuides = []

  return enquirer
    .prompt([
      {
        type: 'select',
        name: 'purpose',
        message: 'How would you like to use ESLint?',

        // The returned number matches the name value of nth in the choices array.
        initial: 1,
        choices: [
          { message: 'To check syntax only', name: 'syntax' },
          { message: 'To check syntax and find problems', name: 'problems' },
          {
            message: 'To check syntax, find problems, and enforce code style',
            name: 'style'
          }
        ]
      },
      {
        type: 'select',
        name: 'moduleType',
        message: 'What type of modules does your project use?',
        initial: 0,
        choices: [
          { message: 'JavaScript modules (import/export)', name: 'esm' },
          { message: 'CommonJS (require/exports)', name: 'commonjs' },
          { message: 'None of these', name: 'none' }
        ]
      },
      {
        type: 'select',
        name: 'framework',
        message: 'Which framework does your project use?',
        initial: 0,
        choices: [
          { message: 'React', name: 'react' },
          { message: 'Vue.js', name: 'vue' },
          { message: 'None of these', name: 'none' }
        ]
      },
      {
        type: 'toggle',
        name: 'typescript',
        message: 'Does your project use TypeScript?',
        enabled: 'Yes',
        disabled: 'No',
        initial: 0,
        result(val) {
          if (val) {
            // remove airbnb/google javascript style guide, as they do not support ts
            styleGuides.push(
              {
                message:
                  'Standard: https://github.com/standard/eslint-config-standard-with-typescript',
                name: 'standard-with-typescript'
              },
              {
                message:
                  'XO: https://github.com/xojs/eslint-config-xo-typescript',
                name: 'xo-typescript'
              }
            )
          } else {
            styleGuides.push(
              {
                message: 'Airbnb: https://github.com/airbnb/javascript',
                name: 'airbnb'
              },
              {
                message: 'Standard: https://github.com/standard/standard',
                name: 'standard'
              },
              {
                message:
                  'Google: https://github.com/google/eslint-config-google',
                name: 'google'
              },
              {
                message: 'XO: https://github.com/xojs/eslint-config-xo',
                name: 'xo'
              }
            )
          }
          return val
        }
      },
      {
        type: 'multiselect',
        name: 'env',
        message: 'Where does your code run?',
        hint: '(Press <space> to select, <a> to toggle all, <i> to invert selection)',
        initial: 0,
        choices: [
          { message: 'Browser', name: 'browser' },
          { message: 'Node', name: 'node' }
        ]
      },
      {
        type: 'select',
        name: 'source',
        message: 'How would you like to define a style for your project?',
        choices: [
          { message: 'Use a popular style guide', name: 'guide' },
          { message: 'Answer questions about your style', name: 'prompt' }
        ],
        skip() {
          return this.state.answers.purpose !== 'style'
        },
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
      }
    ])
    .then((earlyAnswers) => {
      // early exit if no style guide is necessary
      if (earlyAnswers.purpose !== 'style') {
        const config = processAnswers(earlyAnswers)
        const modules = getModulesList(config)

        return askInstallModules(modules).then(() =>
          writeFile(config, earlyAnswers.format)
        )
      }

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
      return customConfig()
    })
}
