const importSortOrder = require('../lib/import-sorting');

/** @type {import('eslint').Linter.Config} */
const config = {
  env: {
    browser: true,
  },

  plugins: ['react', 'react-hooks', 'jsx-a11y'],

  /**
   * @see https://github.com/jsx-eslint/eslint-plugin-react
   * @see https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
   */
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],

  rules: {
    /**
     * Group official React packages into a "framework" group that appears
     * before other third-party packages.
     *
     * @see /lib/import-sorting.js
     */
    ...importSortOrder([
      {
        pattern: 'react?(-dom|-router)',
        group: 'external',
        position: 'before',
      },
    ]),

    /**
     * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
     */
    'react/jsx-handler-names': 'error',

    /**
     * Catches a common coding practice that significantly impacts performance.
     * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
     */
    'react/jsx-no-bind': 'warn',

    /**
     * Avoid unexpected values being rendered.
     * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md
     */
    'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],

    /**
     * Improves syntax for some cases that are not already handled by Prettier.
     * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
     */
    'react/self-closing-comp': 'warn',

    /**
     * Consolidating rules.
     */
    // From design-system
    // 'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
  },
};

module.exports = config;
