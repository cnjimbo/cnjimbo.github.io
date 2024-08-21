// 使用code code runner 运行此脚本，生成推荐插件id列表。
// code runner需要 pnpm add -D ts-node -w
// 并且  需要设置code runner执行环境为
/*
    "code-runner.executorMap": {
      "typescript": "cd $dir && node --es-module-specifier-resolution=node --loader ts-node/esm $fullFileName",
      "javascript": "cd $dir && node  --es-module-specifier-resolution=node  $fullFileName"
    },
    //或者使用如下 tsx包 来运行，需安装 pnpm add -D tsx -w
    "code-runner.executorMap": {
      "typescript": "cd $dir && npx tsx $fullFileName",
    },

    "code-runner.executorMap": {
    "typescript": "cd $dir && npx tsx $fullFileName"
    }

    "code-runner.executorMapByFileExtension": {
    ".ts": "cd $dir && npx tsx $fullFileName"
    }
  */
// 最后将输出内容复制到code-workspace的对应位置
import * as fs from 'node:fs'
import { fileURLToPath } from 'url'
import path from 'node:path'
import { syncConfigurationRetainCodeWorkspace } from './syncWorkspaceToVscode'
import {
  checkCodeWorkspaceFilePath,
  ensureConfigured,
  log,
  parseJsonWithComments,
  readFileToJson,
  tryMerge
  , writeJsonToFile
} from './util'

import type { CodeProfile } from './util'

async function findInstalledExtensions(data: CodeProfile): Promise<string[]> {
  const extensions = parseJsonWithComments(data.extensions)
  const ids = []
  for (let i = 0, n = extensions.length; i < n; i++) {
    const m = extensions[i]
    if (!m.disabled) {
      ids.push(m.identifier.id)
    }
  }
  return ids
}

console.log('-----------------------------', 'start', 'export extensions to configuration', '-----------------------------')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __currentDir = path.resolve(__dirname)

const cp_file = './tswindows.code-profile'
const codeWorkspace_file = '../*.code-workspace'
const vs_settings_folder = '../.vscode'

const vs_extension_filepath = path.resolve(__currentDir, path.resolve(vs_settings_folder, 'extensions.json'))
const cw_filepath = await checkCodeWorkspaceFilePath(
  __currentDir,
  codeWorkspace_file
)

readFileToJson(cp_file)
  .then((data) => {
    return findInstalledExtensions(data)
  })
  .then(async (ids) => {
    const cw_filepath = await checkCodeWorkspaceFilePath(__currentDir, codeWorkspace_file)
    const exist_codework_file = cw_filepath && fs.existsSync(cw_filepath)
    if (exist_codework_file) {
      const target = await readFileToJson(codeWorkspace_file)
      target.extensions = {}
      target.extensions.recommendations = ids
      await writeJsonToFile(codeWorkspace_file, target)
    }
    return ids
  })
  .then(async (ids) => {
    let target
    if (!fs.existsSync(vs_extension_filepath))
      target = {}
    else
      target = await readFileToJson(vs_extension_filepath)
    target.recommendations = ids
    await writeJsonToFile(vs_extension_filepath, target)
    return { ids, target }
  })
  .then(async (v) => {
    await syncConfigurationRetainCodeWorkspace()
  })
  .catch(err => console.error(err))
  .then(_ => console.log('-----------------------------', 'end', '-----------------------------  '))
