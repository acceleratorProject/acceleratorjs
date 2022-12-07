import { red, reset } from 'kolorist'
import minimist from 'minimist'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import prompts from 'prompts'
import { FRAMEWORKS } from './utils/frameworks.js'
import {
  formatTargetDir,
  copy,
  isValidPackageName,
  toValidPackageName,
  isEmpty,
  emptyDir,
  pkgFromUserAgent,
  extractTemplatePath,
  indications
} from './utils/utils.js'

const argv = minimist(process.argv.slice(2), { string: ['_'] })
const cwd = process.cwd()

const TEMPLATES = FRAMEWORKS.map(({ variants: options }) =>
  options.map(({ variants }) => variants.map(({ name }) => name))
).flat(Infinity)

const renameFiles = {
  _gitignore: '.gitignore'
}

const defaultTargetDir = 'accelerator-project'

export async function init() {
  const argTargetDir = formatTargetDir(argv._[0])
  const argTemplate = argv.template || argv.t

  let targetDir = argTargetDir || defaultTargetDir

  /* If the user puts the name of the project a . the name of the project will be the name of the directory in which it is */
  const getProjectName = () =>
    targetDir === '.' ? path.basename(path.resolve()) : targetDir

  let result
  try {
    result = await prompts(
      [
        {
          type: argTargetDir ? null : 'text',
          name: 'projectName',
          message: reset('Project name:'),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir
          }
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
          name: 'overwrite',
          message: () =>
            `${
              targetDir === '.'
                ? 'Current directory'
                : `Target directory "${targetDir}"`
            } is not empty. Remove existing files and continue?`
        },
        {
          type: (_, { overwrite }) => {
            if (overwrite === false) {
              throw new Error(`${red('✖')} Operation cancelled`)
            }
            return null
          },
          name: 'overwriteChecker'
        },
        {
          type: () => (isValidPackageName(getProjectName()) ? null : 'text'),
          name: 'packageName',
          message: reset('Package name:'),
          initial: () => toValidPackageName(getProjectName()),
          validate: (dir) =>
            isValidPackageName(dir) || 'Invalid package.json name'
        },
        {
          type:
            argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
          name: 'framework',
          message:
            typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
              ? reset(
                  `"${argTemplate}" isn't a valid template. Please choose from below: `
                )
              : reset('What would you like to use?'),
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color
            return {
              title: frameworkColor(framework.display || framework.name),
              value: framework
            }
          })
        },
        {
          type: (framework) => {
            return framework && framework.variants ? 'select' : null
          },
          name: 'testing',
          message: 'What do you want to use to test?',
          choices: (framework) => {
            return framework.variants.map((library) => {
              const libraryColor = library.color
              return {
                title: libraryColor(library.display || library.name),
                value: library
              }
            })
          }
        },
        {
          type: (selected) => {
            return selected && selected.variants ? 'select' : null
          },
          name: 'variant',
          message: reset('Select a variant:'),
          choices: (selected) => {
            return selected.variants.map((variant) => {
              const variantColor = variant.color
              return {
                title: variantColor(variant.display || variant.name),
                value: variant.name
              }
            })
          }
        }
      ],
      {
        onCancel: () => {
          const msg = `${red('✖')} Operation cancelled`
          throw new Error(msg)
        }
      }
    )
  } catch (cancelled) {
    console.log(cancelled.message)
    return
  }

  const { overwrite, packageName, variant } = result

  const root = path.join(cwd, targetDir)

  if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }

  const template = variant || argTemplate

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

  // Extract template dir
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    extractTemplatePath(template)
  )

  const write = (file, content) => {
    const targetPath = path.join(root, renameFiles[file] ?? file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  const files = fs.readdirSync(templateDir)

  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8')
  )

  indications(pkg, packageName, getProjectName, write, root, pkgManager, cwd)
}
