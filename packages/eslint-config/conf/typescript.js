const namingConvention = require('../lib/naming-convention');

/** @type {import('eslint').Linter.Config} */
const config = {
  plugins: ['@typescript-eslint'],

  /**
   * @see https://typescript-eslint.io/rules/?supported-rules=recommended-xtypeInformation
   */
  extends: ['plugin:@typescript-eslint/recommended'],

  rules: {
    /**
     * @see https://typescript-eslint.io/rules/ban-ts-comment
     */
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        minimumDescriptionLength: 6,
      },
    ],

    /**
     * Avoid array primitive types.
     * @see https://typescript-eslint.io/rules/ban-types
     */
    '@typescript-eslint/ban-types': [
      'warn',
      {
        types: {
          Array: { message: 'Use a more specific type instead' },
        },
      },
    ],

    /**
     * This rule only makes sense in TypeScript files — we disable it here, but
     * re-enable it in explicit .ts file overrides.
     *
     * @see https://typescript-eslint.io/rules/explicit-function-return-type/#configuring-in-a-mixed-jsts-codebase
     */
    '@typescript-eslint/explicit-function-return-type': 'off',

    /**
     * Object-oriented programming organizes code into "classes" that associate
     * data structures (the class's fields) and the operations performed on
     * those data structures (the class's members).  Studying the fields often
     * reveals the "idea" behind a class.  The choice of which class a field
     * belongs to may greatly impact the code readability and complexity.  Thus,
     * we group the fields prominently at the top of the class declaration.  We
     * do NOT enforce sorting based on public/protected/private or
     * static/instance, because these designations tend to change as code
     * evolves, and reordering methods produces spurious diffs that make PRs
     * hard to read.  For classes with lots of methods, alphabetization is
     * probably a more useful secondary ordering.
     *
     * @see https://typescript-eslint.io/rules/member-ordering
     */
    '@typescript-eslint/member-ordering': [
      'warn',
      {
        default: 'never',
        classes: ['field', 'constructor', 'method'],
      },
    ],

    /**
     * @see https://typescript-eslint.io/rules/naming-convention
     */
    ...namingConvention,

    /**
     * @see https://typescript-eslint.io/rules/no-empty-function
     */
    '@typescript-eslint/no-empty-function': 'warn',

    /**
     * @see https://typescript-eslint.io/rules/no-empty-interface/
     */
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],

    /**
     * The #1 rule of promises is that every promise chain must be terminated by
     * a `catch()` handler.  Thus wherever a Promise arises, the code must
     * either append a catch handler, or else return the object to a caller (who
     * assumes this responsibility).  Unterminated promise chains are a serious
     * issue.  Besides causing errors to be silently ignored, they can also
     * cause a NodeJS process to terminate unexpectedly.
     *
     * @see https://typescript-eslint.io/rules/no-floating-promises/
     */
    '@typescript-eslint/no-floating-promises': 'error',

    /**
     * @see https://typescript-eslint.io/rules/no-unused-vars
     */
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        /**
         * Unused function arguments often indicate a mistake in JavaScript
         * code.  However in TypeScript code, the compiler catches most of those
         * mistakes, and unused arguments are fairly common for type signatures
         * that are overriding a base class method or implementing an interface.
         */
        args: 'none',
      },
    ],

    /**
     * Allow functions to be defined after use.  This allows small utility
     * functions to be within the file they are used, but keeping the more
     * "important" code at the top.
     *
     * @see https://typescript-eslint.io/rules/no-use-before-define/
     * @see https://eslint.org/docs/latest/rules/no-use-before-define
     */
    '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],

    /**
     * NOTE: Test this rule against some existing code to see if it's too
     *       strict/annoying to be worth enforcing.
     *
     * @see https://typescript-eslint.io/rules/typedef
     */
    '@typescript-eslint/typedef': [
      'warn',
      {
        arrayDestructuring: false,
        arrowParameter: false,
        memberVariableDeclaration: true,
        objectDestructuring: false,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: false,
        variableDeclarationIgnoreFunction: true,
      },
    ],
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        /**
         * Code is more readable when the type of every variable is immediately
         * obvious.  Even if the compiler may be able to infer a type, this
         * inference will be unavailable to a person who is reviewing a GitHub
         * diff.  This rule makes writing code harder, but writing code is a
         * much less important activity than reading it.
         *
         * @see https://typescript-eslint.io/rules/explicit-function-return-type
         */
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: false,
          },
        ],
      },
    },
  ],
};

module.exports = config;
