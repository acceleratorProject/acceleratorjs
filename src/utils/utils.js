import fs from 'node:fs'
import path from 'node:path'

export function formatTargetDir(targetDir) {
  return targetDir?.trim().replace(/\/+$/g, '')
}

export function copy(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

export function isValidPackageName(projectName) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName
  )
}

export function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-')
}

export function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

export function isEmpty(path) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

export function emptyDir(dir) {
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

export function pkgFromUserAgent(userAgent) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1]
  }
}

export const extractTemplatePath = (variant) => {
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

export function indications(
  pkg,
  packageName,
  getProjectName,
  write,
  root,
  pkgManager,
  cwd
) {
  pkg.name = packageName || getProjectName()

  write('package.json', JSON.stringify(pkg, null, 2))

  const pkgManagerInstructions =
    pkgManager === 'yarn'
      ? 'yarn -> Install dependencies      yarn dev -> Run application in development mode\n      Start Developing 🔥\n      You can also learn more about this template here -> https://example.es'
      : `${pkgManager} install -> Install dependencies\n      ${pkgManager} run dev -> Run application in development mode\n      Start Developing 🔥\n      You can also learn more about this template here -> https://example.es`
  const instructions = `
    Done! Now Run:
      ${
        root !== cwd
          ? `cd ${path.relative(cwd, root)} -> Enter in the folder`
          : ''
      }
      ${pkgManagerInstructions}
  `

  console.log(instructions)
}
