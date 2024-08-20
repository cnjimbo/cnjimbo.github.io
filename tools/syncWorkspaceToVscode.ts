import path from 'path'
import process from 'process'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import {
  checkCodeWorkspaceFilePath,
  ensureConfigured,
  log,
  readFileToJson,
  tryMerge,
  writeJsonToFile
} from './util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __currentDir = path.resolve(__dirname)

log('root path:', __currentDir)
const codeWorkspace_file = '../*.code-workspace'
const vs_settings_folder = '../.vscode'

/**
 * 同步项目配置
 * Settings生效优先级高到低 Folder(Monorepo) > .vscode/settings.json > .code-workspace > user setting)(C:\Users\xxx\AppData\Roaming\Code\User\profiles\)
 * 本方法将会把.code-workspace中extensions.recomondations和settings删除，并将其配置（未在.vscode中设置的配置）移到.vscode的extensions.json和settings.json中
 */
export async function main() {
  log('-----------------------------', 'start', 'sync workspace to vscode', '-----------------------------')

  const vs_setting_filepath = path.resolve(__currentDir, path.resolve(vs_settings_folder, 'settings.json'))
  const vs_extension_filepath = path.resolve(__currentDir, path.resolve(vs_settings_folder, 'extensions.json'))
  const cw_filepath = await checkCodeWorkspaceFilePath(
    __currentDir,
    codeWorkspace_file
  )
  const exist_codework_file = cw_filepath && fs.existsSync(cw_filepath)

  if (exist_codework_file) {
    const cw = await readFileToJson(cw_filepath)

    const cw_extensions = cw.extensions
    if (cw_extensions) {
      const vs_extensions = await readFileToJson(vs_extension_filepath, {})
      const merged_extension = tryMerge(vs_extensions, cw_extensions)
      // delete cw.extensions
      cw.extensions = undefined
      await writeJsonToFile(vs_extension_filepath, merged_extension.data)
    }

    const cw_setting = cw.settings
    if (cw_setting) {
      const vs_settings = await readFileToJson(vs_setting_filepath, {})
      const merged_settings = tryMerge(cw_setting, vs_settings)
      // delete cw.settings
      cw.settings = undefined
      await writeJsonToFile(vs_setting_filepath, merged_settings.data)
    }

    if (cw_extensions || cw_setting) {
      await writeJsonToFile(cw_filepath, cw)
    }
  }
}

function isMainScript() {
  const scriptpath = path.resolve(__filename)
  const firsttArg = path.resolve(process.argv[1])
  console.log('scriptpath      ', scriptpath)
  console.log('process.argv[1] ', firsttArg)
  const ret = scriptpath === firsttArg
  console.log(ret)
  return scriptpath === firsttArg
}

if (isMainScript()) {
  main()
    .catch(err => log('error:', err))
    .finally(() => log('running end, exist'))
}
