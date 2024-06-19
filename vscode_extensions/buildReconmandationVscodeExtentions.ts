// 使用code code runner 运行此脚本，生成推荐插件id列表。
// code runner需要 pnpm add -D ts-node
// 并且  需要设置code runner执行环境为
/*
"code-runner.executorMap": {
    "typescript": "node --es-module-specifier-resolution=node --loader ts-node/esm $fullFileName",
    "ts": "node --es-module-specifier-resolution=node --loader ts-node/esm $fullFileName",
    "javascript": "node  --es-module-specifier-resolution=node  $fullFileName",
  },

  */
// 最后将输出内容复制到code-workspace的对应位置

import * as fs from 'fs';


export interface RootObject {
  name: string;
  icon: string;
  settings: string;
  extensions: string;
  globalState: string;
}
// 定义一个异步函数来读取文件并解析为JSON
async function readFileToJson(filePath: string): Promise<any> {
  try {
    // 读取文件内容
    const fileContent = await fs.promises.readFile(filePath, 'utf8');

    // 将文件内容解析为JSON对象
    const jsonObject = JSON.parse(fileContent);

    return jsonObject;
  } catch (error) {
    // 处理读取文件或解析JSON时的错误
    console.error(`Error reading or parsing JSON from file: ${error}`);
    throw error;
  }
}
// 定义一个异步函数来写入文件
async function writeJsonToFile(filePath: string, content: string): Promise<void> {
  try {
    // 将JSON字符串写入文件
    await fs.promises.writeFile(filePath, content, 'utf8');
    console.log(`JSON data has been successfully written to ${filePath}`);
  } catch (error) {
    // 处理写入文件时的错误
    console.error(`Error writing JSON to file: ${error}`);
    throw error;
  }
}
async function findInstalledExtensions(data): Promise<string[]> {
  const extensions = JSON.parse(data.extensions)
  console.log("xxxx", extensions)
  const ids = []
  for (const m of extensions) {
    if (!m.disabled) {
      ids.push(m.identifier.id)
    }
  }
  return ids
}
const codeProfile = './tswindows.code-profile';
const codeWorkspace = './../cnjimbo.github.io.code-workspace'
readFileToJson(codeProfile)
  .then(data => findInstalledExtensions(data))
  .then(ids => {
    console.log(ids)
  })
