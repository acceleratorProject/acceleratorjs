import { Legacy } from '@eslint/eslintrc'
import { getPeerDependencies } from './getPeerDependencies.js'
import * as npmUtils from './npm-utils.js'
import { info } from './shared/logging.js'
const { naming } = Legacy

export function getModulesList(config, installESLint) {
  const modules = {}

  // Create a list of modules which should be installed based on config
  if (config.plugins) {
    for (const plugin of config.plugins) {
      const moduleName = naming.normalizePackageName(plugin, 'eslint-plugin')

      modules[moduleName] = 'latest'
    }
  }

  const extendList = []
  const overrides = config.overrides || []

  for (const item of [config, ...overrides]) {
    if (typeof item.extends === 'string') {
      extendList.push(item.extends)
    } else if (Array.isArray(item.extends)) {
      extendList.push(...item.extends)
    }
  }

  for (const extend of extendList) {
    if (extend.startsWith('eslint:') || extend.startsWith('plugin:')) {
      continue
    }
    const moduleName = naming.normalizePackageName(extend, 'eslint-config')

    modules[moduleName] = 'latest'
    Object.assign(modules, getPeerDependencies(`${moduleName}@latest`))
  }

  const parser =
    config.parser || (config.parserOptions && config.parserOptions.parser)

  if (parser) {
    modules[parser] = 'latest'
  }

  if (installESLint === false) {
    delete modules.eslint
  } else {
    const installStatus = npmUtils.checkDevDeps(['eslint'])

    // Mark to show messages if it's new installation of eslint.
    if (installStatus.eslint === false) {
      info('Local ESLint installation not found.')
      modules.eslint = modules.eslint || 'latest'
      config.installedESLint = true
    }
  }

  return Object.keys(modules).map((name) => `${name}@${modules[name]}`)
}
