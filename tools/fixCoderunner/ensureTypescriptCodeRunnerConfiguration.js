import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import JSON5 from 'json5'
import { globSync } from 'glob'
import { assign, keys } from 'radash'

function checkCodeWorkspaceFilePath(basedir, codeWorkspaceFilePath) {
  const files = globSync(codeWorkspaceFilePath, {
    cwd: basedir,
    absolute: true
  })
  if (files && files.length > 0) {
    if (files.length > 1) {
      console.log(
        'only support one file with .code-workspace in the current project. selected file:',
        files[0]
      )
    }
    return files[0]
  }
  console.log(
    `can't find any code-workspace file with parttern: ${codeWorkspaceFilePath}`
  )
  return undefined
}
function readFileToJson(filePath, def = undefined) {
  if (!fs.existsSync(filePath)) {
    if (def)
      return def
    throw new Error(`file not exist: ${filePath}`)
  }
  const fileContent = fs.readFileSync(filePath, 'utf8')
  if (!fileContent || fileContent.length === 0)
    throw new Error(`do not read any json string from file: ${filePath}`)
  return parseJsonWithComments(fileContent)
}

function parseJsonWithComments(jsonString) {
  return JSON5.parse(jsonString)
}

function _ensureConfigured(currentSettings, preferSettings) {
  const preferKeys = Object.keys(preferSettings)
  const currentKeys = Object.keys(currentSettings)
  const notExistKeys = preferKeys.filter(value => !currentKeys.includes(value))
  const needRewrite = notExistKeys.length > 0
  console.log(preferSettings)
  for (const key in notExistKeys) {
    currentSettings[key] = preferSettings[key]

    console.log(currentSettings[key])
  }
  return { needRewrite, data: currentSettings }
}

function ensureConfigured(currentSettings, defaultSetting) {
  const data = assign(defaultSetting, currentSettings)

  const needRewrite = !keys(defaultSetting).every(val =>
    keys(currentSettings).includes(val)
  )

  return { needRewrite, data }
}

const entryFilename = fileURLToPath(import.meta.url)
const entryDir = path.resolve(path.dirname(entryFilename))

log('root path:', entryDir)
const codeWorkspace_file = '../../*.code-workspace'
const settings_file = '../../.vscode/settings.json'
const defaultSettings = {
  'code-runner.executorMap': {
    typescript: 'cd $dir && pnpx tsx $fullFileName'
  },
  'code-runner.executorMapByFileExtension': {
    '.ts': 'cd $dir && pnpx tsx $fullFileName'
  }
}
async function main() {
  log('-----------------------------', 'start', '-----------------------------')

  const vsSettingOriginFilePath = path.resolve(entryDir, settings_file)
  const codeWorkOriginFilePath = checkCodeWorkspaceFilePath(
    entryDir,
    codeWorkspace_file
  )
  const existCodeWorkOriginFilePath
    = codeWorkOriginFilePath && fs.existsSync(codeWorkOriginFilePath)
  const existVsSettingOriginFilePath = fs.existsSync(vsSettingOriginFilePath)

  if (existCodeWorkOriginFilePath) {
    const cwData = await readFileToJson(codeWorkOriginFilePath)
    const cw_setting = cwData.settings
    const config = ensureConfigured(cw_setting, defaultSettings)
    if (config.needRewrite) {
      cwData.settings = config.data
      await writeJsonToFile(codeWorkOriginFilePath, cwData)
      log('Configured .code-workspace:', codeWorkOriginFilePath)
    }
    else {
      log('No changed .code-workspace:', codeWorkOriginFilePath)
    }
  }
  async function writeJsonToFile(filePath, jsonObject) {
    const content = JSON.stringify(jsonObject, null, '  ')
    return fs
      .writeFile(filePath, content, 'utf8')
      .then(() => {
        console.log(`JSON data has been successfully written to ${filePath}`)
        return true
      })
      .catch((err) => {
        console.log(`error on writting to ${filePath}`, err)
        return false
      })
  }
  if (existVsSettingOriginFilePath) {
    let vsSettings = await readFileToJson(vsSettingOriginFilePath)
    const config = await ensureConfigured(vsSettings, defaultSettings)
    if (config.needRewrite) {
      vsSettings = config.data
      await writeJsonToFile(vsSettingOriginFilePath, vsSettings)
      log('Configured  settings.json:', vsSettingOriginFilePath)
    }
    else {
      log('No changed settings.json:', vsSettingOriginFilePath)
    }
  }

  if (!existVsSettingOriginFilePath && !existCodeWorkOriginFilePath) {
    log('found neither settings.json nor *.code-workspace:')
    log('paths:', vsSettingOriginFilePath, codeWorkspace_file)
    log('create settings.json with default settings', vsSettingOriginFilePath)
    await writeJsonToFile(vsSettingOriginFilePath, defaultSettings)
  }
}
function log(...msg) {
  console.log(...msg)
}

main()
  .catch(err => log('error:', err))
  .finally(() => log('running end and exit'))
