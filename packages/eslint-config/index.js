const importSortOrder = require('./lib/import-sorting');

/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution');

/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,

  reportUnusedDisableDirectives: true,

  plugins: ['import'],

  /**
   * @see https://eslint.org/docs/latest/rules/
   * @see https://github.com/import-js/eslint-plugin-import
   */
  extends: ['eslint:recommended', 'plugin:import/recommended'],

  settings: {
    'import/internal-regex': '^~/',
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },

  rules: {
    /**
     * If setters are defined without getters it's probably a mistake.
     * @see https://eslint.org/docs/latest/rules/accessor-pairs
     */
    'accessor-pairs': 'error',

    /**
     * In TypeScript, if you write `x['y']` instead of `x.y`, it disables
     * type checking.
     *
     * @see https://eslint.org/docs/latest/rules/dot-notation
     */
    'dot-notation': ['warn', { allowPattern: '^_' }],

    /**
     * Catches code that is likely to be incorrect.
     * @see https://eslint.org/docs/latest/rules/eqeqeq
     */
    eqeqeq: ['error', 'smart'],

    /**
     * Avoid unexpected items in `for-in` loops.
     * @see https://eslint.org/docs/latest/rules/guard-for-in
     */
    'guard-for-in': 'error',

    /**
     * If you have more than 2,000 lines in a single source file, it's probably
     * time to split up your code.
     *
     * @see https://eslint.org/docs/latest/rules/max-lines
     */
    'max-lines': ['warn', { max: 2000 }],

    /**
     * `|` and `&` are relatively rare, and are more likely to appear as a
     * mistake when someone meant `||` or `&&`.
     *
     * @see https://eslint.org/docs/latest/rules/no-bitwise
     */
    'no-bitwise': [
      'warn',
      {
        allow: [
          '^',
          // '|',
          // '&',
          '<<',
          '>>',
          '>>>',
          '^=',
          // '|=',
          // '&=',
          '<<=',
          '>>=',
          '>>>=',
          '~',
        ],
      },
    ],

    /**
     * Deprecated language feature.
     * @see https://eslint.org/docs/latest/rules/no-caller
     */
    'no-caller': 'error',

    /**
     * Eval is a security concern and a performance concern.
     * @see https://eslint.org/docs/latest/rules/no-eval
     */
    'no-eval': 'warn',

    /**
     * System types are global and should not be tampered with in a scalable
     * code base.  If two different libraries (or two versions of the same
     * library) both try to modify a type, only one of them can win.  Polyfills
     * are acceptable because they implement a standardized interoperable
     * contract, but polyfills are generally coded in plain JavaScript.
     *
     * @see https://eslint.org/docs/latest/rules/no-extend-native
     */
    'no-extend-native': 'error',

    /**
     * Disallow `eval()`-like methods.
     * @see https://eslint.org/docs/latest/rules/no-implied-eval
     */
    'no-implied-eval': 'error',

    /**
     * Prevent confusion between labels and variables in the same scope.
     * @see https://eslint.org/docs/latest/rules/no-label-var
     */
    'no-label-var': 'error',

    /**
     * Eliminates redundant code.
     * @see https://eslint.org/docs/latest/rules/no-lone-blocks
     */
    'no-lone-blocks': 'warn',

    /**
     * Use concatenation (or template strings) instead.
     * @see https://eslint.org/docs/latest/rules/no-multi-str
     */
    'no-multi-str': 'error',

    /**
     * It's generally a bad practice to call `new Thing()` without assigning the
     * result to a variable.  Either it's part of an awkward expression like
     * `(new Thing()).doSomething()`, or else implies that the constructor is
     * doing nontrivial computations, which is often a poor class design.
     *
     * @see https://eslint.org/docs/latest/rules/no-new
     */
    'no-new': 'warn',

    /**
     * Deprecated language feature.
     * @see https://eslint.org/docs/latest/rules/no-new-func
     */
    'no-new-func': 'error',

    /**
     * Deprecated language feature.
     * @see https://eslint.org/docs/latest/rules/no-new-object
     */
    'no-new-object': 'error',

    /**
     * Obsolete notation.
     * @see https://eslint.org/docs/latest/rules/no-new-wrappers
     */
    'no-new-wrappers': 'warn',

    /**
     * Deprecated language feature.
     * @see https://eslint.org/docs/latest/rules/no-octal-escape
     */
    'no-octal-escape': 'error',

    /**
     * Avoid confusing or accidental assignment.
     * @see https://eslint.org/docs/latest/rules/no-return-assign
     */
    'no-return-assign': 'error',

    /**
     * Security risk.
     * @see https://eslint.org/docs/latest/rules/no-script-url
     */
    'no-script-url': 'warn',

    /**
     * Comparing a variable against itself is usually an error.
     * @see https://eslint.org/docs/latest/rules/no-self-compare
     */
    'no-self-compare': 'error',

    /**
     * This avoids statements such as `while (a = next(), a && a.length);` that
     * use commas to create compound expressions.  In general code is more
     * readable if each step is split onto a separate line.  This also makes it
     * easier to set breakpoints in the debugger.
     *
     * @see https://eslint.org/docs/latest/rules/no-sequences
     */
    'no-sequences': 'error',

    /**
     * Although in theory JavaScript allows any possible data type to be thrown
     * as an exception, such flexibility adds pointless complexity, by requiring
     * every catch block to test the type of the object that it receives.
     * Whereas if catch blocks can always assume that their object implements
     * the "Error" contract, then the code is simpler, and we generally get
     * useful additional information like a call stack.
     *
     * @see https://eslint.org/docs/latest/rules/no-throw-literal
     */
    'no-throw-literal': 'error',

    /**
     * Remember to modify loop condition variables.
     * @see https://eslint.org/docs/latest/rules/no-unmodified-loop-condition
     */
    'no-unmodified-loop-condition': 'warn',

    /**
     * Avoid potential logic errors.
     * @see https://eslint.org/docs/latest/rules/no-unused-expressions
     */
    'no-unused-expressions': 'warn',

    /**
     * Allow functions to be defined after use.  This allows small utility
     * functions to be within the file they are used, but keeping the more
     * "important" code at the top.
     *
     * @see https://eslint.org/docs/latest/rules/no-use-before-define
     */
    'no-use-before-define': ['error', 'nofunc'],

    /**
     * Avoid a potential performance problem.
     * @see https://eslint.org/docs/latest/rules/no-useless-concat
     */
    'no-useless-concat': 'warn',

    /**
     * Generally not needed in modern code.
     * @see https://eslint.org/docs/latest/rules/no-void
     */
    'no-void': 'error',

    /**
     * Keep the import stack clean by importing from a single source.  Will use
     * inline type imports in TypeScript when possible.
     *
     * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md
     */
    'import/no-duplicates': ['error', { 'prefer-inline': true }],

    /**
     * Automatically sort import statements sensibly consistently.
     * @see /lib/import-sorting.js
     */
    ...importSortOrder(),
  },

  overrides: [
    // Test files.
    {
      files: ['**/__tests__/**/*.{js,ts,tsx}', '**/*.@(spec|test).{js,ts,tsx}'],
      /**
       * @see https://github.com/jest-community/eslint-plugin-jest
       * @see https://github.com/testing-library/eslint-plugin-jest-dom
       * @see https://github.com/testing-library/eslint-plugin-testing-library
       */
      extends: [
        'plugin:jest/recommended',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
      ],
      plugins: ['jest', 'jest-formatting'],
      env: {
        'jest/globals': true,
      },
      rules: {
        'jest/no-deprecated-functions': 'warn',

        /**
         * @see https://github.com/dangreenisrael/eslint-plugin-jest-formatting
         */
        'jest-formatting/padding-around-all': 'error',

        /**
         * Encourage use of `userEvent` method instead of `fireEvent` when
         * simulating user interactions.  `userEvent` simulates browser events
         * more closely, for more realistic tests.
         *
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-user-event.md
         */
        'testing-library/prefer-user-event': 'warn',
      },
    },
  ],
};

module.exports = config;
