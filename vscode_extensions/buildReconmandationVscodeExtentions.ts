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

import data from './tswindows.json' assert{type: 'json'}
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

// 使用示例
(async () => {
  try {
    const filePath = './data.json'; // 假设data.json是你要读取的文件路径
    const jsonData = await readFileToJson(filePath);
    console.log(jsonData);
  } catch (error) {
    // 这里可以进一步处理错误
  }
})();
// const workspace_path = './../cnjimbo.github.io.code-workspace'
const extensions = JSON.parse(data.extensions)

const ids = []
for (const m of extensions) {
  if (!m.disabled) {
    ids.push(m.identifier.id)
  }
}
console.log('')
console.log('')
console.log(`["${ids.join('","')}"]`)
