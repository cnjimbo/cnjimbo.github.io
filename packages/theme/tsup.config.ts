// import path from 'path'
import { defineConfig } from 'tsup'

import { sassPlugin } from 'esbuild-sass-plugin'
import pluginVue from 'esbuild-plugin-vue-next'

export default defineConfig({
  entry: ['src/node.ts', 'src/index.ts'],
  // outDir: path.resolve(__dirname, './'),
  dts: true,
  noExternal: ['vitepress-plugin-tabs'],
  external: ['vitepress', 'vue'],
  format: ['cjs', 'esm'],
  shims: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  minify: true,
  treeshake: true,
  bundle: true,
  target: 'esnext',
  esbuildPlugins: [
    pluginVue(),
    sassPlugin({
      filter: /.(s[ac]ss|css)$/,
    }),
  ],
})
