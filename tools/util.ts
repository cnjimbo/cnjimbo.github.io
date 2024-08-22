import path from 'path'
import { fileURLToPath } from 'url'
import * as _ from 'radash'
import fs from 'fs-extra'
import JSON5 from 'json5'
import { glob, globSync } from 'glob'
import { DateTime } from 'luxon'

export
interface ObjType {
  [key: string]: any
}
export
interface CodeWorkspace {
  extensions: ObjType
  settings: ObjType
}
export
interface CodeProfile {
  extensions: string
}
export function deepEqual(obj1: ObjType, obj2: ObjType): boolean {
  const n1 = _.crush(obj1)
  const n2 = _.crush(obj2)
  const keys1 = _.keys(n1)
  const keys2 = _.keys(n2)

  if (keys1.length !== keys2.length)
    return false
  for (const key of keys1) {
    if (!keys2.includes(key))
      return false

    if (!_.isEqual(_.get(n1, key), _.get(n2, key)))
      return false
  }

  // 所有键值对都相等
  return true
}
export function tryMerge(newSettings: ObjType, preferSettings: ObjType) {
  const needRewrite = !deepEqual(preferSettings, newSettings)
  const obj: { needRewrite: boolean, data: object } = { needRewrite, data: preferSettings }
  if (needRewrite) {
    obj.data = _.assign(newSettings, preferSettings)
  }
  else {
    obj.data = preferSettings
  }
  return obj
}
export function ensureConfigured(currentSettings: ObjType, part_settings: ObjType) {
  const needRewrite = !objectKeysIncludes(part_settings, currentSettings)
  if (needRewrite) {
    return tryMerge(currentSettings, part_settings)
  }
  return { needRewrite: false, data: currentSettings }
}

export function parseJsonWithComments(jsonString: string) {
  return JSON5.parse(jsonString)
}
export async function readFileToJson(filePath: string, def: ObjType | undefined = undefined) {
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
  const sourceKeys = _.keys(subObj)
  const referenceKeys = _.keys(parentObj)
  return sourceKeys.every(key => referenceKeys.includes(key))
}
export function checkCodeWorkspaceFilePath(basedir: string, codeWorkspaceFilePath: string) {
  const files = globSync(codeWorkspaceFilePath, { cwd: basedir, absolute: true })
  if (files && files.length > 0) {
    if (files.length > 1) {
      console.log('only support one file with .code-workspace in the current project. selected file:', files[0])
    }
    return files[0]
  }
  console.log(`can't find any code-workspace file with parttern: ${codeWorkspaceFilePath}`)
  return undefined
}

export function log(...msg: any[]) {
  console.log(...msg)
}

export function getBackupFilePath(fsPath: string) {
  const parts = fsPath.split(path.sep)
  const fileNameParts = parts[parts.length - 1].split('.')
  fileNameParts[fileNameParts.length - 1] = `${DateTime.now().toFormat('yyMMddHHmmss')}.${fileNameParts[fileNameParts.length - 1]}`
  parts[parts.length - 1] = fileNameParts.join('.')
  return parts.join(path.sep)
}
export function isEqualWithoutOrder<TType>(x: TType, y: TType): boolean {
  if (Object.is(x, y))
    return true
  if (Array.isArray(x) && Array.isArray(y)) {
    //
    if (x.length !== y.length)
      return false

    return _.diff(x, y).length === 0 && _.diff(y, x).length === 0
  }
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime()
  }
  if (x instanceof RegExp && y instanceof RegExp) {
    return x.toString() === y.toString()
  }
  if (
    typeof x !== 'object' || x === null || typeof y !== 'object' || y === null
  ) {
    return false
  }
  const keysX = Reflect.ownKeys(x as unknown as object) as (keyof typeof x)[]
  const keysY = Reflect.ownKeys(y as unknown as object)
  if (keysX.length !== keysY.length)
    return false
  for (let i = 0; i < keysX.length; i++) {
    if (!Reflect.has(y as unknown as object, keysX[i]))
      return false
    if (!isEqualWithoutOrder(x[keysX[i]], y[keysX[i]]))
      return false
  }
  return true
}

function init(entryFileUrl: string, codeWorkspaceFileRelativePath: string, vsSettingsFolderRelativePath: string) {
  // const entryFileUrl = import.meta.url
  // const codeWorkspaceFileRelativePath = '../*.code-workspace'
  // const vsSettingsFolderRelativePath = '../.vscode'
  const utilEntryFilename = fileURLToPath(entryFileUrl)
  const untilEntryDir = path.resolve(path.dirname(utilEntryFilename))

  log('entryDir     ', untilEntryDir)

  const codeWorkOriginFilePath = checkCodeWorkspaceFilePath(untilEntryDir, codeWorkspaceFileRelativePath)
  const vsExtensionOriginFilePath = path.resolve(untilEntryDir, vsSettingsFolderRelativePath, 'extensions.json')
  const vsSettingOriginFilePath = path.resolve(untilEntryDir, vsSettingsFolderRelativePath, 'settings.json')
  const codeWorkBackupFilePath = codeWorkOriginFilePath ? getBackupFilePath(codeWorkOriginFilePath) : undefined
  const vsExtensionBackupFilePath = getBackupFilePath(vsExtensionOriginFilePath)
  const vsSettingBackupFilePath = getBackupFilePath(vsSettingOriginFilePath)

  const existCodeWorkOriginFilePath = existFile(codeWorkOriginFilePath)
  const existVsExtensionOriginFilePath = existFile(vsExtensionOriginFilePath)
  const existVsSettingOriginFilePath = existFile(vsSettingOriginFilePath)

  return { utilEntryFilename, untilEntryDir, vsSettingsFolder: vsSettingsFolderRelativePath, codeWorkOriginFilePath, vsExtensionOriginFilePath, vsSettingOriginFilePath, existCodeWorkOriginFilePath, existVsExtensionOriginFilePath, existVsSettingOriginFilePath, codeWorkBackupFilePath, vsExtensionBackupFilePath, vsSettingBackupFilePath, }
}

function existFile(filePath: string | undefined) {
  const existFile = filePath && fs.existsSync(filePath)
  if (!existFile)
    log('No found file:', filePath)
  return existFile
}

export const config = _.memo(init)
