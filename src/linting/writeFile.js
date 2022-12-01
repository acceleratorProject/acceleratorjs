import fs from 'fs'
import * as ConfigFile from './config-file.js'
import * as npmUtils from './npm-utils.js'
import { info } from './shared/logging.js'
export async function writeFile(config, format) {
  // default is .js
  let extname = '.js'

  if (format === 'YAML') {
    extname = '.yml'
  } else if (format === 'JSON') {
    extname = '.json'
  } else if (format === 'JavaScript') {
    const pkgJSONPath = npmUtils.findPackageJson()

    if (pkgJSONPath) {
      const pkgJSONContents = JSON.parse(fs.readFileSync(pkgJSONPath, 'utf8'))

      if (pkgJSONContents.type === 'module') {
        extname = '.cjs'
      }
    }
  }

  delete config.installedESLint

  await ConfigFile.write(config, `./.eslintrc${extname}`)
  info(`Successfully created .eslintrc${extname} file in ${process.cwd()}`)
}
