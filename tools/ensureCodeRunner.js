import path from 'path'
import { fileURLToPath } from 'url'
import JSON5 from 'json5'
import { glob } from 'glob'
import fs from 'fs-extra'
import _ from 'lodash'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __parentdir = path.resolve(__dirname, '../')

log('root path:', __parentdir)
function parseJsonWithComments(jsonString) {
  return JSON5.parse(jsonString)
}

/**
 *
 * @param {string} filePath new settings
 * @returns {object} json data
 */
async function readFileToJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`file not exist: ${filePath}`)
  }
  const fileContent = fs.readFileSync(filePath, 'utf8')
  if (!fileContent || fileContent.length === 0)
    throw new Error(`can not read any json string from file: ${filePath}`)
  return parseJsonWithComments(fileContent)
}
/**
 *
 * @param {string} filePath
 * @param {object} jsonObject
 */
async function writeJsonToFile(filePath, jsonObject) {
  const content = JSON.stringify(jsonObject, null, '  ')
  return fs.writeFile(filePath, content, 'utf8')
    .then(() => {
      log(`JSON data has been successfully written to ${filePath}`)
      return true
    })
    .catch((err) => {
      log(`error on writting to ${filePath}`, err)
      return false
    })
}

/**
 *
 * @param {{filepath:string,:object}} preferSettings current settings
 * @param {{filepath:string,:object}} newSettings new settings
 * @returns {{needRewrite:boolean,data:object}} merged ojbec
 */
async function tryMerge(preferSettings, newSettings) {
  const needRewrite = !deepEqual(preferSettings, newSettings)
  const obj = { needRewrite }
  if (needRewrite) {
    obj.data = _.merge({}, newSettings, preferSettings)
  }
  else {
    obj.data = preferSettings
  }
  return obj
}

log('-----------------------------', 'start', '-----------------------------')
const defaultSettings = {
  'code-runner.executorMap': {
    typescript: 'cd $dir && npx tsx $fullFileName'
  },
  'code-runner.executorMapByFileExtension': {
    '.ts': 'cd $dir && npx tsx $fullFileName'
  }
}

async function checkCodeWorkspaceFilePath(codeWorkspaceFilePath) {
  return await glob(codeWorkspaceFilePath, { __parentdir, absolute: true })
    .then((files) => {
      if (files && files.length > 0) {
        if (files.length > 1) {
          log('not support two or more files with .code-workspace in the project folder. selected file:', files[0])
        }
        return files[0]
      }
      log(`not find any code-workspace file with parttern: ${codeWorkspaceFilePath}`)
      return undefined
    })
}

function objectKeysIncludes(subObj, parentObj) {
  if (parentObj == null)
    throw new Error('parentObj can\'t be undefined or null')
  if (subObj == null)
    throw new Error('subObj can\'t be undefined or null')
  const subKeys = Object.keys(subObj)
  const parentKeys = Object.keys(parentObj)
  // 检查 subObj 的所有键是否都在 parentObj 中
  return subKeys.every(key => parentKeys.includes(key))
}

async function main() {
  const codeWorkspaceFilePath = '*.code-workspace'
  const vs_filepath = path.resolve(__parentdir, '.vscode/settings.json')

  const cwfile = await checkCodeWorkspaceFilePath(codeWorkspaceFilePath)
  const exist_codework_file = cwfile && fs.existsSync(cwfile)
  const exist_vs_setting_file = fs.existsSync(vs_filepath)

  if (exist_codework_file) {
    log('checking .code-workspace:', cwfile)
    const cw = await readFileToJson(cwfile)
    const cw_setting = cw.settings
    const config = ensureConfiged(cw_setting, defaultSettings)
    if (config.needRewrite) {
      cw.settings = config.data
      await writeJsonToFile(cwfile, cw)
    }
  }

  if (exist_vs_setting_file) {
    log('checking settings.json:', vs_filepath)
    let vs = await readFileToJson(vs_filepath)
    const config = await ensureConfiged(vs, defaultSettings)
    if (config.needRewrite) {
      vs = config.data
      await writeJsonToFile(vs_filepath, vs)
    }
  }

  if (!exist_vs_setting_file && !exist_codework_file) {
    log('found neither settings.json nor *.code-workspace:')
    log('paths:', vs_filepath, codeWorkspaceFilePath)
    log('create settings.json with default settings', vs_filepath)
    await writeJsonToFile(vs_filepath, defaultSettings)
  }
}
function log(...msg) {
  console.log(...msg)
}

async function ensureConfiged(currentSettings, part_settings) {
  const needRewrite = !objectKeysIncludes(part_settings, currentSettings)
  if (needRewrite) {
    return await tryMerge(part_settings, currentSettings)
  }
  return { needRewrite: false, data: currentSettings }
}

main()
  .catch(err => log('error:', err))
  .finally(() => log('running end, exist'))
