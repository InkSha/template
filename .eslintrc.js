module.exports = {
  env: { node: true },
  globals: { uni: true, wx: true, my: true, swan: true },
  parser: 'vue-eslint-parser',
  parserOptions: { parser: '@typescript-eslint/parser', sourceType: 'module' },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'linebreak-style': ['error', 'windows'],
    '@typescript-eslint/no-explicit-any': [2, { ignoreRestArgs: true }],
    'vue/multi-word-component-names': 0,
  },
}
