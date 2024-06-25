// 使用code code runner 运行此脚本，生成推荐插件id列表。
// code runner需要 pnpm add -D ts-node
// 并且  需要设置code runner执行环境为
/*
    "code-runner.executorMap": {
      "typescript": "cd $dir && node --es-module-specifier-resolution=node --loader ts-node/esm $fullFileName",
      "javascript": "cd $dir && node  --es-module-specifier-resolution=node  $fullFileName"
    },

  */
// 最后将输出内容复制到code-workspace的对应位置
import * as fs from 'node:fs'
import JSON5 from 'json5'

function parseJsonWithComments(jsonString: string) {
  return JSON5.parse(jsonString)
}

async function readFileToJson(filePath: string): Promise<any> {
  const fileContent = await fs.promises.readFile(filePath, 'utf8')
  const jsonObject = parseJsonWithComments(fileContent)
  return jsonObject
}

async function writeJsonToFile(filePath: string, content: string): Promise<void> {
  await fs.promises.writeFile(filePath, content, 'utf8')
  console.log(`JSON data has been successfully written to ${filePath}`)
}
async function findInstalledExtensions(data): Promise<string[]> {
  const extensions = parseJsonWithComments(data.extensions) as Array<any>
  const ids = []
  for (let i = 0, n = extensions.length; i < n; i++) {
    const m = extensions[i]
    if (!m.disabled) {
      ids.push(m.identifier.id)
    }
  }
  return ids
}

console.log('-----------------------------', 'start', '-----------------------------')
const codeProfile = './tswindows.code-profile'
const codeWorkspace = './../cnjimbo.github.io.code-workspace'
readFileToJson(codeProfile)
  .then((data) => {
    return findInstalledExtensions(data)
  })
  .then(async (ids) => {
    const target = await readFileToJson(codeWorkspace)
    return { ids, target }
  })
  .then(({ ids, target }) => {
    target.extensions.recommendations = ids
    writeJsonToFile(codeWorkspace, JSON.stringify(target, null, "\t"))
  })
