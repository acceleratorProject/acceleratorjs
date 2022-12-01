import semver from 'semver'
import { getLocalESLintVersion } from './getLocalEslintVersion.js'
import { getPeerDependencies } from './getPeerDependencies.js'
import { getStyleGuideName } from './getStyleGuideName.js'
export function hasESLintVersionConflict(answers) {
  // Get the local ESLint version.
  const localESLintVersion = getLocalESLintVersion()

  if (!localESLintVersion) {
    return false
  }

  // Get the required range of ESLint version.
  const configName = getStyleGuideName(answers)
  const moduleName = `eslint-config-${configName}@latest`
  const peerDependencies = getPeerDependencies(moduleName) || {}
  const requiredESLintVersionRange = peerDependencies.eslint

  if (!requiredESLintVersionRange) {
    return false
  }

  answers.localESLintVersion = localESLintVersion
  answers.requiredESLintVersionRange = requiredESLintVersionRange

  // Check the version.
  if (semver.satisfies(localESLintVersion, requiredESLintVersionRange)) {
    answers.installESLint = false
    return false
  }

  return true
}
