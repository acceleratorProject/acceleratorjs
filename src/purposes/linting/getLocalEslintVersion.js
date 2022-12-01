import { Legacy } from '@eslint/eslintrc'
import fs from 'fs'
import path from 'path'
const { ModuleResolver } = Legacy
export function getLocalESLintVersion() {
  try {
    const eslintPkgPath = path.join(
      ModuleResolver.resolve(
        'eslint/package.json',
        path.join(process.cwd(), '__placeholder__.js')
      )
    )
    const eslintPkg = JSON.parse(fs.readFileSync(eslintPkgPath, 'utf8'))

    return eslintPkg.version || null
  } catch {
    return null
  }
}
