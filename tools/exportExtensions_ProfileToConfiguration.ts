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
import JSON5 from 'json5'

function parseJsonWithComments(jsonString: string) {
  return JSON5.parse(jsonString)
}

async function readFileToJson(filePath: string): Promise<any> {
  if (!fs.existsSync(filePath))
    return {}
  const fileContent = await fs.promises.readFile(filePath, 'utf8')
  const jsonObject = parseJsonWithComments(fileContent)
  return jsonObject
}

async function writeJsonToFile(filePath: string, target: object): Promise<void> {
  const content = JSON.stringify(target, null, '  ')
  await fs.promises.writeFile(filePath, content, 'utf8')
  console.log(`JSON data has been successfully written to ${filePath}`)
}

export interface ObjType {
  [key: string]: ObjType | string | Array<string> | Array<ObjType>
}

export interface CodeWorkspace {
  extensions: ObjType
  settings: ObjType
}

export interface CodeProfile {
  extensions: string
}
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

console.log('-----------------------------', 'start', '-----------------------------')
const codeProfile = './tswindows.code-profile'
const codeWorkspace_file = './../cnjimbo.github.io.code-workspace'
const vsextensionfilepath = './../.vscode/extensions.json'

readFileToJson(codeProfile)
  .then((data) => {
    return findInstalledExtensions(data)
  })
  .then(async (ids) => {
    if (fs.existsSync(codeWorkspace_file)) {
      const target = await readFileToJson(codeWorkspace_file)
      target.extensions.recommendations = ids
      await writeJsonToFile(codeWorkspace_file, target)
    }
    return ids
  })
  .then(async (ids) => {
    if (!fs.existsSync(vsextensionfilepath))
      fs.writeFileSync(vsextensionfilepath, '{}')
    const target = await readFileToJson(vsextensionfilepath)
    target.recommendations = ids
    await writeJsonToFile(vsextensionfilepath, target)
    return { ids, target }
  })
  .catch(err => console.error(err))
  .then(_ => console.log('-----------------------------', 'end', '-----------------------------  '))
