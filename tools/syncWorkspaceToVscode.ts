import path from 'path'
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

async function main() {
  log('-----------------------------', 'start', '-----------------------------')

  const vs_setting_filepath = path.resolve(__currentDir, path.resolve(vs_settings_folder, 'settings.json'))
  const vs_extension_filepath = path.resolve(__currentDir, path.resolve(vs_settings_folder, 'extensions.json'))
  const cw_filepath = await checkCodeWorkspaceFilePath(
    __currentDir,
    codeWorkspace_file
  )
  const exist_codework_file = cw_filepath && fs.existsSync(cw_filepath)

  if (exist_codework_file) {
    const cw = await readFileToJson(cw_filepath)

    const cw_extensions = cw.extensions || {}

    const vs_extensions = await readFileToJson(vs_extension_filepath, {})

    const merged_extension = tryMerge(cw_extensions, vs_extensions)
    if (merged_extension.needRewrite) {
      cw.extensions = merged_extension.data
      await writeJsonToFile(vs_extension_filepath, merged_extension.data)
    }
    const cw_setting = cw.settings || {}
    const vs_settings = await readFileToJson(vs_setting_filepath, {})

    const merged_settings = tryMerge(cw_setting, vs_settings)

    if (merged_settings.needRewrite) {
      cw.settings = merged_settings.data
      await writeJsonToFile(vs_setting_filepath, merged_settings.data)
    }
    if (merged_extension.needRewrite || merged_settings.needRewrite) {
      await writeJsonToFile(cw_filepath, cw)
    }
  }
}

main()
  .catch(err => log('error:', err))
  .finally(() => log('running end, exist'))
