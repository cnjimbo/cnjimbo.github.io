import path from 'path'
import { fileURLToPath } from 'url'
import _ from 'lodash'
import fs from 'fs-extra'
import JSON5 from 'json5'
import { glob } from 'glob'

export interface ObjType {
  [key: string]: any
}

export interface CodeWorkspace {
  extensions: ObjType
  settings: ObjType
}

export interface CodeProfile {
  extensions: string
}

export function deepEqual(obj1: ObjType, obj2: ObjType): boolean {
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

export function tryMerge(preferSettings: ObjType, newSettings: ObjType) {
  const needRewrite = !deepEqual(preferSettings, newSettings)
  const obj: { needRewrite: boolean, data: object } = { needRewrite, data: preferSettings }
  if (needRewrite) {
    obj.data = _.merge({}, newSettings, preferSettings)
  }
  else {
    obj.data = preferSettings
  }
  return obj
}
export function ensureConfigured(currentSettings: ObjType, part_settings: ObjType) {
  const needRewrite = !objectKeysIncludes(part_settings, currentSettings)
  if (needRewrite) {
    return tryMerge(part_settings, currentSettings)
  }
  return { needRewrite: false, data: currentSettings }
}

export function parseJsonWithComments(jsonString: string) {
  return JSON5.parse(jsonString)
}
export
async function readFileToJson(filePath: string, def: ObjType | undefined = undefined) {
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
export
async function writeJsonToFile(filePath: string, jsonObject: object): Promise<boolean> {
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
export function objectKeysIncludes(subObj: ObjType, parentObj: ObjType) {
  if (parentObj == null)
    throw new Error('parent object can\'t be undefined or null')
  if (subObj == null || subObj === undefined)
    return true
  const sourceKeys = Object.keys(subObj)
  const referenceKeys = Object.keys(parentObj)
  // 检查 subObj 的所有键是否都在 parentObj 中
  return sourceKeys.every(key => referenceKeys.includes(key))
}
export async function checkCodeWorkspaceFilePath(basedir: string, codeWorkspaceFilePath: string) {
  return await glob(codeWorkspaceFilePath, { cwd: basedir, absolute: true })
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

export function log(...msg: any[]) {
  console.log(...msg)
}

export async function tryReadFile(filepath: string, defaultSettings: ObjType) {
  let vs_filepath
  if (path.isAbsolute(filepath)) {
    vs_filepath = filepath
  }
  else {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const __currentDir = path.resolve(__dirname)
    vs_filepath = path.resolve(__currentDir, filepath)
  }
  const exist_vs_setting_file = fs.existsSync(vs_filepath)
  if (exist_vs_setting_file) {
    let vs = await readFileToJson(vs_filepath)
    const config = await ensureConfigured(vs, defaultSettings)
    if (config.needRewrite) {
      vs = config.data
      await writeJsonToFile(vs_filepath, vs)
      log('Configured  settings.json:', vs_filepath)
    }
    else {
      log('No changed settings.json:', vs_filepath)
    }
    return { exist: exist_vs_setting_file, data: config.data }
  }
  return { exist: exist_vs_setting_file, data: undefined }
}
