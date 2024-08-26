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
  config,
  ensureConfigured,
  log,
  parseJsonWithComments,
  readFileToJson
  , writeJsonToFile
} from './util'

import type { CodeProfile } from './util'

const entryFileUrl = import.meta.url
const codeWorkspaceFileRelativePath = '../*.code-workspace'
const vsSettingsFolderRelativePath = '../.vscode'
const {
  codeWorkOriginFilePath,
  vsExtensionOriginFilePath,
  existCodeWorkOriginFilePath,
  existVsExtensionOriginFilePath,
} = config(entryFileUrl, codeWorkspaceFileRelativePath, vsSettingsFolderRelativePath)

function findInstalledExtensions(data: CodeProfile): string[] {
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

const cp_file = './tswindows.code-profile'
const vs_extension_filepath = vsExtensionOriginFilePath

readFileToJson(cp_file)
  .then((data) => {
    return findInstalledExtensions(data)
  })
  .then(async (ids) => {
    if (existCodeWorkOriginFilePath && codeWorkOriginFilePath) {
      const target = await readFileToJson(codeWorkOriginFilePath)
      target.extensions = {}
      target.extensions.recommendations = ids
      await writeJsonToFile(codeWorkOriginFilePath, target)
    }
    return ids
  })
  .then(async (ids) => {
    if (existVsExtensionOriginFilePath) {
      const target = await readFileToJson(vs_extension_filepath)
      target.recommendations = ids
      await writeJsonToFile(vs_extension_filepath, target)
    }
    return { ids }
  })
  .then(async (v) => {
    await syncConfigurationRetainCodeWorkspace()
  })
  .catch(err => console.error(err))
  .then(_ => console.log('-----------------------------', 'end', '-----------------------------  '))
