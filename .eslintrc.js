/** @type {import('eslint').Linter.Config} */
const config = {
  env: { node: true },

  extends: ['@clari/eslint-config', 'prettier'],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};

module.exports = config;
