// eslint.config.js
import antfu from '@antfu/eslint-config'

// TODO DDL 迭代
export default antfu(
  {},
  {
    ignores: ['packages/theme/*.js', 'node_modules/**/*'],
  },
  {
    rules: {
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/extensions': 'off',
      'quotes': ['warn', 'single'],
      'semi': ['warn', 'never'],
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      'no-param-reassign': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-restricted-syntax': 'off',
      'no-bitwise': 'off',
      'camelcase': 'off',
      'no-case-declarations': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'no-undef': 'off',
      'no-shadow': 'off',
      'max-len': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'no-use-before-define': 'off',
      'no-continue': 'off',
      'no-extend-native': 'warn',
      'no-underscore-dangle': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'non-null-expression': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'consistent-return': 'off',
      'no-console': 'off',
      'ts/comma-dangle': 'off',
      'curly': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'ts/no-var-requires': 'off',
      'ts/no-require-imports': 'off',
      'ts/ban-ts-comment': 'off',
      'vue/prefer-import-from-vue': 'off',
      // 设置 'no-unused-vars' 规则
      'no-unused-vars': [
        'warn',
        {
          vars: 'all', // 检查所有类型的变量
          args: 'after-used', // 参数在使用后可以被忽略
          ignoreRestSiblings: true, // 允许剩余参数对象的兄弟参数未使用
          varsIgnorePattern: '[iI]gnored', // 忽略以_开头的未使用变量
        },
      ],

      // 或者如果你使用的是 'unused-imports/no-unused-vars' 插件的特定规则
      // 注意：这个规则名可能因具体插件而异，这里仅作为示例
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          // 插件相关的其他选项...
          varsIgnorePattern: '[iI]gnored', // 同样可以设置一个正则表达式来忽略匹配的未使用变量
        },
      ],
    },
  },
)
