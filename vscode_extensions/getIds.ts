import data from './tswindows.json' assert{type: 'json'}
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
const ids = []
for (const m of data.extensions) {
  if (!m.disabled) {
    ids.push(m.identifier.id)
  }
}
console.log(`["${ids.join('","')}"]`)
