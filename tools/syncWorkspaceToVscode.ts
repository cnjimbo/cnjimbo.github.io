import path from 'path'
import process from 'process'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import {
  checkCodeWorkspaceFilePath,
  ensureConfigured,
  getBackupFilePath,
  log,
  readFileToJson,
  tryMerge
  , writeJsonToFile
} from './util'
//  pnpm add -Dw luxon @types/luxon lodash fs-extra json5 glob lodash

const entryFilename = fileURLToPath(import.meta.url)
const entryDirname = path.dirname(entryFilename)
const entryDir = path.resolve(entryDirname)

const codeWorkspaceFile = '../*.code-workspace'
const vsSettingsFolder = '../.vscode'

const codeWorkOriginFilePath = checkCodeWorkspaceFilePath(entryDir, codeWorkspaceFile)
const vsExtensionOriginFilePath = path.resolve(entryDir, vsSettingsFolder, 'extensions.json')
const vsSettingOriginFilePath = path.resolve(entryDir, vsSettingsFolder, 'settings.json')

const existCodeWorkOriginFilePath = codeWorkOriginFilePath && fs.existsSync(codeWorkOriginFilePath)
const existVsExtensionOriginFilePath = fs.existsSync(vsExtensionOriginFilePath)
const existVsSettingOriginFilePath = fs.existsSync(vsSettingOriginFilePath)

const codeWorkBackupFilePath = codeWorkOriginFilePath ? getBackupFilePath(codeWorkOriginFilePath) : undefined
const vsExtensionBackupFilePath = getBackupFilePath(vsExtensionOriginFilePath)
const vsSettingBackupFilePath = getBackupFilePath(vsSettingOriginFilePath)

function saveAsBackupFile(oldPath: string, newPath: string) {
  const oldFilePath = path.resolve(oldPath)
  const newFilePath = path.resolve(newPath)
  fs.renameSync(oldFilePath, newFilePath)
  log(`backup file done:${newFilePath}`)
  return newFilePath
}

/**
 * 同步项目配置
 * Settings生效优先级高到低 Folder(Monorepo) > .vscode/settings.json > .code-workspace > user setting)(C:\Users\xxx\AppData\Roaming\Code\User\profiles\)
 * 本方法将会把.code-workspace中extensions.recomondations和settings删除，并将其配置（未在.vscode中设置的配置）移到.vscode的extensions.json和settings.json中
 */
export async function syncConfigurationRetainVscode() {
  log('-----------------------------', 'start', 'syncConfigurationRetainVscode', '-----------------------------')

  if (existCodeWorkOriginFilePath && codeWorkOriginFilePath) {
    const cw = await readFileToJson(codeWorkOriginFilePath)

    const cw_extensions = cw.extensions
    if (cw_extensions) {
      const vs_extensions = await readFileToJson(vsExtensionOriginFilePath, {})
      const merged_extension = tryMerge(vs_extensions, cw_extensions)
      // delete cw.extensions
      cw.extensions = undefined
      await writeJsonToFile(vsExtensionOriginFilePath, merged_extension.data)
    }

    const cw_setting = cw.settings
    if (cw_setting) {
      const vs_settings = await readFileToJson(vsSettingOriginFilePath, {})
      const merged_settings = tryMerge(cw_setting, vs_settings)
      // delete cw.settings
      cw.settings = undefined
      await writeJsonToFile(vsSettingOriginFilePath, merged_settings.data)
    }

    if (cw_extensions || cw_setting) {
      await writeJsonToFile(codeWorkOriginFilePath, cw)
    }
  }
}

function isMainScript() {
  const scriptpath = path.resolve(entryFilename)
  const firsttArg = path.resolve(process.argv[1])
  return scriptpath === firsttArg
}

export async function syncConfigurationRetainCodeWorkspace() {
  log('-----------------------------', 'start', 'syncConfigurationRetainCodeWorkspace', '-----------------------------')

  if (existCodeWorkOriginFilePath && codeWorkOriginFilePath) {
    const cw = await readFileToJson(codeWorkOriginFilePath)
    const cw_extensions = cw.extensions

    if (existVsExtensionOriginFilePath) {
      saveAsBackupFile(vsExtensionOriginFilePath, vsExtensionBackupFilePath)
      const vs_extensions = await readFileToJson(vsExtensionBackupFilePath, {})
      const merged_extension = tryMerge(vs_extensions, cw_extensions)
      cw.extensions = merged_extension.data
    }

    const cw_setting = cw.settings
    if (existVsSettingOriginFilePath) {
      saveAsBackupFile(vsSettingOriginFilePath, vsSettingBackupFilePath)
      const vs_settings = await readFileToJson(vsSettingBackupFilePath, {})
      const merged_settings = tryMerge(vs_settings, cw_setting)
      cw.settings = merged_settings.data
    }

    if (existVsExtensionOriginFilePath || existVsSettingOriginFilePath) {
      await writeJsonToFile(codeWorkOriginFilePath, cw)
    }
  }
}

if (isMainScript()) {
  syncConfigurationRetainCodeWorkspace()
    .catch(err => log('error:', err))
    .finally(() => log('running end, exist'))
}

// if (isMainScript()) {
//   let f = await config()
//   console.log(f)
//   f = await config()
//   console.log(f)
//   f = await config()
//   console.log(f)
// }
