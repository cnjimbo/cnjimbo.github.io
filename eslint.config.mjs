import globals from "globals"
// 预定义配置
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"

// import babelParser from "@typescript-eslint/parser";
import commpnParser from "vue-eslint-parser"
import prettier from "eslint-plugin-prettier"

// "@babel/eslint-parser";

// import customConfig from "./esconfig/custom_config.js";

export default [
  // languageOptions：配置如何检查 js 代码
  {

    // 1.1 处理 与 JavaScript 相关的配置项
    // - ecmaVersion
    // - sourceType
    // - globals
    // - parser
    // - parserOptions
    // files: ["**/*.ts", "**/*.vue"],
    // ignores: ["**/*.config.js"],
    ignores: [
      "**/*.config.js",
      "**/*.config.mjs",
      "dist/**",
      "node_modules/**",
      "!**/eslint.config.js",
    ],
    languageOptions: {
      // 1.11 定义可用的全局变量
      globals: globals.browser,
      // 1.12 扩展
      // ecmaVersion: "latest",
      // sourceType: "module",
      parser: commpnParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: "@typescript-eslint/parser",
        jsxPragma: "React",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  // 原来的extends替换为如下模式
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    globals: {
      process: "readonly",
    },
    plugins: {
      prettier,
    },
    rules: {
      // 开启这条规则后，会将prettier的校验规则传递给eslint，这样eslint就可以按照prettier的方式来进行代码格式的校验
      "prettier/prettier": "error",
      // eslint（https://eslint.bootcss.com/docs/rules/）
      "no-var": "error", // 要求使用 let 或 const 而不是 var
      "no-multiple-empty-lines": ["warn", { max: 1 }], // 不允许多个空行
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-unexpected-multiline": "error", // 禁止空余的多行
      "no-useless-escape": "off", // 禁止不必要的转义字符

      // typeScript (https://typescript-eslint.io/rules)
      "@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
      "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
      "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间。
      "@typescript-eslint/semi": "off",

      // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
      "vue/multi-word-component-names": "off", // 要求组件名称始终为 “-” 链接的单词
      "vue/script-setup-uses-vars": "error", // 防止<script setup>使用的变量<template>被标记为未使用
      "vue/no-mutating-props": "off", // 不允许组件 prop的改变
      "vue/attribute-hyphenation": "off", // 对模板中的自定义组件强制执行属性命名样式
    },
  },
]
