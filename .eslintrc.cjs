module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    // More on TypeScript ESLint configuration: https://typescript-eslint.io/docs/
    'plugin:@typescript-eslint/recommended',
    // More on Vue.js ESLint configuration: https://eslint.vuejs.org/user-guide/
    'plugin:vue/recommended',
    // More on Prettier ESLint configuration: https://prettier.io/docs/en/integrating-with-linters.html
    'plugin:prettier/recommended',
  ],
  env: { browser: true, node: true },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
};
