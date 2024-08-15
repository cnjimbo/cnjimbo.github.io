// tsup.config.js
export default {
  entry: ['tools/**/*.ts'],
  format: ['esm'],
  outDir: 'tools/dist',
  target: 'es2022',
  dts: false,
  clean: true,
  sourcemap: false,
  splitting: false,
}
