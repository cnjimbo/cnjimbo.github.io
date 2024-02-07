declare module '*.vue' {
  import type { ComponentOptions } from 'vue'

  const comp: ComponentOptions
  export default comp
}

declare module 'markdown-it-task-checkbox' {
  export interface Options { /* 描述选项接口 */ }
  export function plugin(_md: any, _options?: Options): void
}
