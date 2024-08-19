import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import {
  checkCodeWorkspaceFilePath,
  ensureConfigured,
  readFileToJson,
  writeJsonToFile
} from './util.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __currentDir = path.resolve(__dirname)

log('root path:', __currentDir)
const codeWorkspace_file = '../../*.code-workspace'
const settings_file = '../../.vscode/settings.json'
const defaultSettings = {
  'code-runner.executorMap': {
    typescript: 'cd $dir && npx tsx $fullFileName'
  },
  'code-runner.executorMapByFileExtension': {
    '.ts': 'cd $dir && npx tsx $fullFileName'
  }
}
async function main() {
  log('-----------------------------', 'start', '-----------------------------')

  const vs_filepath = path.resolve(__currentDir, settings_file)
  const cwfile = await checkCodeWorkspaceFilePath(
    __currentDir,
    codeWorkspace_file
  )
  const exist_codework_file = cwfile && fs.existsSync(cwfile)
  const exist_vs_setting_file = fs.existsSync(vs_filepath)

  if (exist_codework_file) {
    const cw = await readFileToJson(cwfile)
    const cw_setting = cw.settings
    const config = ensureConfigured(cw_setting, defaultSettings)
    if (config.needRewrite) {
      cw.settings = config.data
      await writeJsonToFile(cwfile, cw)
      log('Configured .code-workspace:', cwfile)
    }
    else {
      log('No changed .code-workspace:', cwfile)
    }
  }

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
  }

  if (!exist_vs_setting_file && !exist_codework_file) {
    log('found neither settings.json nor *.code-workspace:')
    log('paths:', vs_filepath, codeWorkspace_file)
    log('create settings.json with default settings', vs_filepath)
    await writeJsonToFile(vs_filepath, defaultSettings)
  }
}
function log(...msg) {
  console.log(...msg)
}

main()
  .catch(err => log('error:', err))
  .finally(() => log('running end, exist'))
