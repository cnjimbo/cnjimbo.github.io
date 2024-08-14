import path from 'path'
import process from 'process'
import JSON5 from 'json5'
import { glob } from 'glob'
import fs from 'fs-extra'
import _ from 'lodash'

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
    throw new Error(`do not read any json string from file: ${filePath}`)
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
      console.log(`JSON data has been successfully written to ${filePath}`)
      return true
    })
    .catch((err) => {
      console.log(`error on writting to ${filePath}`, err)
      return false
    })
}

function deepEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length)
    return false

  for (const key of keys1) {
    if (!keys2.includes(key))
      return false

    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (!deepEqual(obj1[key], obj2[key]))
        return false
    }
    else {
      if (obj1[key] !== obj2[key])
        return false
    }
  }

  // 所有键值对都相等
  return true
}
/**
 *
 * @param {{filepath:string,:object}} preferSettings current settings
 * @param {{filepath:string,:object}} newSettings new settings
 * @returns {{needRewrite:boolean,data:object}} merged ojbec
 */
async function tryMerge(preferSettings, newSettings) {
  const needRewrite = !deepEqual(preferSettings, newSettings)
  const obj = { needRewrite, data: preferSettings }
  if (needRewrite) {
    obj.data = _.merge({}, newSettings, preferSettings)
  }
  return obj
}

console.log('-----------------------------', 'start', '-----------------------------')
const defaultSettings = {
  'code-runner.executorMap': {
    typescript: 'cd $dir && npx tsx $fullFileName'
  },
  'code-runner.executorMapByFileExtension': {
    '.ts': 'cd $dir && npx tsx $fullFileName'
  }
}

async function checkCodeWorkspaceFilePath(codeWorkspaceFilePath) {
  return await glob(codeWorkspaceFilePath, { cwd: process.cwd(), absolute: true })
    .then((files) => {
      if (files && files.length > 0) {
        if (files.length > 1) {
          console.log('only support one file with .code-workspace in the current project. selected file:', files[0])
        }
        return files[0]
      }
      console.log(`can't find any code-workspace file with parttern: ${codeWorkspaceFilePath}`)
      return undefined
    })
}

function objectKeysIncludes(subObj, parentObj) {
  if (parentObj == null)
    throw new Error('parent object can\'t be undefined or null')
  if (subObj == null)
    return true
  const sourceKeys = Object.keys(subObj)
  const referenceKeys = Object.keys(parentObj)
  // 检查 subObj 的所有键是否都在 parentObj 中
  return sourceKeys.every(key => referenceKeys.includes(key))
}

async function main() {
  const codeWorkspaceFilePath = './../*.code-workspace'
  const vs_filepath = path.resolve(process.cwd(), '../.vscode/settings.json')

  const cwfile = await checkCodeWorkspaceFilePath(codeWorkspaceFilePath)
  const exist_codework_file = fs.existsSync(cwfile)
  const exist_vs_setting_file = fs.existsSync(vs_filepath)

  if (exist_codework_file && exist_vs_setting_file) {
    const cw = await readFileToJson(cwfile)
    const cw_setting = cw.settings
    const vs_setting = await readFileToJson(vs_filepath)
    const merged = tryMerge(cw_setting, vs_setting)
    const config = ensureConfiged(merged.data, defaultSettings)
    if (config.needRewrite || merged.needRewrite) {
      cw.settings = config.data
      vs = config.data
      await writeJsonToFile(cwfile, cw)
      await writeJsonToFile(vs_filepath, vs)
    }
  }
  else if (exist_codework_file) {
    const cw = await readFileToJson(cwfile)
    const cw_setting = cw.settings
    const config = ensureConfiged(cw_setting, defaultSettings)
    if (config.needRewrite) {
      cw.settings = config.data
      await writeJsonToFile(cwfile, cw)
    }
  }
  else if (exist_vs_setting_file) {
    console.log('cccccc')
    let vs = await readFileToJson(vs_filepath)
    const config = ensureConfiged(vs, defaultSettings)
    if (config.needRewrite) {
      vs = config.data
      await writeJsonToFile(vs_filepath, vs)
    }
  }
  else {
    await writeJsonToFile(vs_filepath, defaultSettings)
  }
}

function ensureConfiged(currentSettings, part_settings) {
  const needRewrite = !objectKeysIncludes(part_settings, currentSettings)
  if (needRewrite) {
    return tryMerge(currentSettings, part_settings)
  }
  return { needRewrite: false, data: currentSettings }
}

main()
  .catch(err => console.log('error:', err))
  .finally(() => console.log('running end, exist'))
