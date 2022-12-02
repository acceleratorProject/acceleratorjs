import { Legacy } from '@eslint/eslintrc'
const { ConfigOps } = Legacy

export function processAnswers(answers) {
  // answers.purpose = 'style'
  // answers.moduleType = 'esm'
  const config = {
    rules: {},
    env: {},
    parserOptions: {},
    extends: [],
    overrides: []
  }

  config.parserOptions.ecmaVersion = 'latest'
  config.env.es2021 = true

  // set the module type
  if (answers.moduleType === 'esm') config.parserOptions.sourceType = 'module'
  // } else if (answers.moduleType === 'commonjs') {
  //   config.env.commonjs = true
  // }

  // add in browser and node environments if necessary
  if (!answers.env) answers.env = ['browser']
  answers.env.forEach((env) => {
    config.env[env] = true
  })

  // add in library information
  if (answers.framework === 'react') {
    config.plugins = ['react']
    config.extends.push('plugin:react/recommended')
  }

  // set config.extends based the selected guide
  if (answers.source === 'guide') {
    if (answers.styleguide === 'airbnb' && answers.framework !== 'react') {
      config.extends.push('airbnb-base')
    } else {
      config.extends.push(answers.styleguide)
    }
  }

  /*   else if (answers.styleguide === 'xo-typescript') {
    config.extends.push('xo')
    config.overrides.push({
      files: ['*.ts', '*.tsx'],
      extends: ['xo-typescript']
    })
  }  */

  if (answers.purpose === 'style') {
    if (answers.source === 'prompt') {
      config.extends.unshift('eslint:recommended')
      config.rules.indent = ['error', answers.indent]
      config.rules.quotes = ['error', answers.quotes]
      config.rules['linebreak-style'] = ['error', answers.linebreak]
      config.rules.semi = ['error', answers.semi ? 'always' : 'never']
    }
  }
  if (answers.typescript && config.extends.includes('eslint:recommended')) {
    config.extends.push('plugin:@typescript-eslint/recommended')
  }

  // normalize extends
  if (config.extends.length === 0) {
    delete config.extends
  } else if (config.extends.length === 1) {
    config.extends = config.extends[0]
  }

  ConfigOps.normalizeToStrings(config)
  return config
}
