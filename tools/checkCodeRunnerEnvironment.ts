import path from 'path'
import process from 'process'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import type { ObjType } from './util'

import { checkCodeWorkspaceFilePath, ensureConfigured, readFileToJson, tryMerge, writeJsonToFile } from './util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __parentdir = path.resolve(__dirname, '../')

console.log('-----------------------------', 'start', '-----------------------------')
const defaultSettings: ObjType = {
  'code-runner.executorMap': {
    typescript: 'cd $dir && npx tsx $fullFileName'
  },
  'code-runner.executorMapByFileExtension': {
    '.ts': 'cd $dir && npx tsx $fullFileName'
  }
}

async function main() {
  const codeWorkspaceFilePath = '*.code-workspace'
  const vs_filepath = path.resolve(process.cwd(), '.vscode/settings.json')

  const cwfile = await checkCodeWorkspaceFilePath(__parentdir, codeWorkspaceFilePath)
  const exist_codework_file = cwfile && fs.existsSync(cwfile)
  const exist_vs_setting_file = fs.existsSync(vs_filepath)

  if (exist_codework_file && exist_vs_setting_file) {
    const cw = await readFileToJson(cwfile)
    const cw_setting = cw.settings
    let vs_setting = await readFileToJson(vs_filepath)
    const merged = tryMerge(cw_setting, vs_setting)
    const config = await ensureConfigured(merged.data, defaultSettings)
    if (config.needRewrite || merged.needRewrite) {
      cw.settings = config.data
      vs_setting = config.data
      await writeJsonToFile(cwfile, cw)
      await writeJsonToFile(vs_filepath, vs_setting)
    }
  }
  else if (exist_codework_file) {
    const cw = await readFileToJson(cwfile)
    const cw_setting = cw.settings
    const config = ensureConfigured(cw_setting, defaultSettings)
    if (config.needRewrite) {
      cw.settings = config.data
      await writeJsonToFile(cwfile, cw)
    }
  }
  else if (exist_vs_setting_file) {
    let vs = await readFileToJson(vs_filepath)
    const config = ensureConfigured(vs, defaultSettings)
    if (config.needRewrite) {
      vs = config.data
      await writeJsonToFile(vs_filepath, vs)
    }
  }
}

main()
  .catch(err => console.log('error:', err))
  .finally(() => console.log('running end, exist'))
