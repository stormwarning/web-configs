/** @type {import('eslint').Linter.Config} */
const config = {
  /**
   * @see https://typescript-eslint.io/rules/?supported-rules=recommended-typeInformation
   */
  extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
};

module.exports = config;
