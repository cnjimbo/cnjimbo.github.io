import _ from 'lodash'
import fs from 'fs-extra'
import JSON5 from 'json5'
import { glob } from 'glob'

export interface ObjType {
  [key: string]: any
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
async function readFileToJson(filePath: string) {
  if (!fs.existsSync(filePath)) {
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
  if (subObj == null)
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
