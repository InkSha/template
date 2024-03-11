module.exports = {
  parser: '@typescript-eslint/parser', // 定义ESLint的解析器
  extends: ['plugin:prettier/recommended', 'plugin:react/jsx-runtime'], //定义文件继承的子规范
  plugins: ['@typescript-eslint', 'react-hooks', 'eslint-plugin-react'], //定义了该eslint文件所依赖的插件
  env: {
    //指定代码的运行环境
    browser: true,
    node: true,
  },
  settings: {
    //自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parserOptions: {
    //指定ESLint可以解析JSX语法
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // 自定义的一些规则
    'prettier/prettier': 'error',
    'linebreak-style': ['error', 'unix'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    'react/jsx-uses-vars': 'error',
    'valid-typeof': [
      'warn',
      {
        requireStringLiterals: false,
      },
    ],
  },
}
