module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/recommended', '@vue/prettier'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': ['error', { args: 'none' }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
