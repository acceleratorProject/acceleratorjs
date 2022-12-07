import { blue, cyan, green, magenta, red, reset, yellow } from 'kolorist'
import minimist from 'minimist'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import prompts from 'prompts'

const argv = minimist(process.argv.slice(2), { string: ['_'] })
const cwd = process.cwd()

const FRAMEWORKS = [
  {
    name: 'react',
    display: 'React',
    color: cyan,
    variants: [
      {
        name: 'vitest',
        display: 'Vitest',
        color: green,
        variants: [
          {
            name: 'react-css-vitest',
            display: 'CSS',
            color: green
          },
          {
            name: 'react-chakra-vitest',
            display: 'Chakra UI',
            color: red
          },
          {
            name: 'react-mui-vitest',
            display: 'MUI',
            color: blue
          },
          {
            name: 'react-tailwind-vitest',
            display: 'Tailwind',
            color: magenta
          },
          {
            name: 'react-styledComponents-vitest',
            display: 'Styled-Components',
            color: cyan
          }
        ]
      },
      {
        name: 'cypress',
        display: 'Cypress',
        color: blue,
        variants: [
          {
            name: 'react-css-cypress',
            display: 'CSS',
            color: green
          },
          {
            name: 'react-chakra-cypress',
            display: 'Chakra UI ',
            color: red
          },
          {
            name: 'react-mui-cypress',
            display: 'MUI',
            color: blue
          },
          {
            name: 'react-tailwind-cypress',
            display: 'Tailwind',
            color: magenta
          },
          {
            name: 'react-styledComponents-cypress',
            display: 'Styled-Components',
            color: cyan
          }
        ]
      },
      {
        name: 'vitest&cypress',
        display: 'Vitest & Cypress',
        color: yellow,
        variants: [
          {
            name: 'react-css-vitest-cypress',
            display: 'CSS',
            color: green
          },
          {
            name: 'react-chakra-vitest-cypress',
            display: 'Chakra UI',
            color: red
          },
          {
            name: 'react-mui-vitest-cypress',
            display: 'MUI',
            color: blue
          },
          {
            name: 'react-tailwind-vitest-cypress',
            display: 'Tailwind',
            color: magenta
          },
          {
            name: 'react-styledComponents-vitest-cypress',
            display: 'Styled-Components',
            color: cyan
          }
        ]
      },

      {
        name: 'none',
        display: 'None',
        color: red,
        variants: [
          {
            name: 'react-css',
            display: 'Only React ',
            color: cyan
          },
          {
            name: 'react-chakra',
            display: 'Chakra UI',
            color: red
          },
          {
            name: 'react-mui',
            display: 'MUI',
            color: blue
          },
          {
            name: 'react-tailwind',
            display: 'Tailwind',
            color: magenta
          },
          {
            name: 'react-styledComponents',
            display: 'Styled-Components',
            color: cyan
          }
        ]
      }
    ]
  },

  {
    name: 'vanilla',
    display: 'Vanilla',
    color: yellow,
    variants: [
      {
        name: 'vitest',
        display: 'Vitest',
        color: green,
        variants: [
          {
            name: 'vanilla-css-vitest',
            display: 'CSS ',
            color: green
          },
          {
            name: 'vanilla-tailwind-vitest',
            display: 'Tailwind',
            color: magenta
          }
        ]
      },
      {
        name: 'cypress',
        display: 'Cypress',
        color: blue,
        variants: [
          {
            name: 'vanilla-css-cypress',
            display: 'CSS',
            color: green
          },
          {
            name: 'vanilla-tailwind-cypress',
            display: 'Tailwind',
            color: magenta
          }
        ]
      },
      {
        name: 'vitest&cypress',
        display: 'Vitest & Cypress',
        color: yellow,
        variants: [
          {
            name: 'vanilla-css-vitest-cypress',
            display: 'CSS',
            color: green
          },
          {
            name: 'vanilla-tailwind-vitest-cypress',
            display: 'Tailwind',
            color: magenta
          }
        ]
      },
      {
        name: 'none',
        display: 'None',
        color: red,
        variants: [
          {
            name: 'vanilla-css',
            display: 'Only Vanilla',
            color: yellow
          },
          {
            name: 'vanilla-tailwind',
            display: 'Tailwind ',
            color: magenta
          }
        ]
      }
    ]
  }
]

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

  indications(pkg, packageName, getProjectName, write, root, pkgManager)
}
const extractTemplatePath = (variant) => {
  const splitVariant = variant.split('-')
  const templetePath = ['../templates']
  splitVariant.forEach((e, i) => {
    if (e === 'vitest' && splitVariant[i + 1] === 'cypress') {
      templetePath.push('/vitest-cypress')
      return
    }
    if (templetePath.includes('/vitest-cypress')) return
    templetePath.push(`/${e}`)
  })
  templetePath.push('/template')
  return templetePath.toString().replaceAll(',', '')
}

function indications(
  pkg,
  packageName,
  getProjectName,
  write,
  root,
  pkgManager
) {
  pkg.name = packageName || getProjectName()

  write('package.json', JSON.stringify(pkg, null, 2))

  const pkgManagerInstructions =
    pkgManager === 'yarn'
      ? 'yarn -> Install dependencies      yarn dev -> Run application in development mode\n      Start Developing 🔥\n      You can also learn more about this template here -> https://example.es'
      : `${pkgManager} install -> Install dependencies\n      ${pkgManager} run dev -> Run application in development mode\n      Start Developing 🔥\n      You can also learn more about this template here -> https://example.es`
  const instructions = `
    Done Now Run:
      ${
        root !== cwd
          ? `cd ${path.relative(cwd, root)} -> Enter in the folder`
          : ''
      }
      ${pkgManagerInstructions}
  `

  console.log(instructions)
}

function formatTargetDir(targetDir) {
  return targetDir?.trim().replace(/\/+$/g, '')
}

function copy(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

function isValidPackageName(projectName) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName
  )
}

function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-')
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

function isEmpty(path) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}

function pkgFromUserAgent(userAgent) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1]
  }
}
