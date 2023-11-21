module.exports = {
  root: true,
  options: {
    editorConfig: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: { parser: '@typescript-eslint/parser', sourceType: 'module' },
  plugins: ['vitest', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vitest-globals/recommended',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'plugin:vue/vue3-recommended'
  ],
  env: {
    'vitest-globals/env': true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['default', 'index']
      }
    ]
  }
}
