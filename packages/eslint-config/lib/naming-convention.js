const DOUBLE_UNDERSCORE_PREFIX = '^__';
/**
 * This is a special exception for naming patterns that use an underscore to
 * separate two camel-cased parts.
 * Example:  `checkBox1_onChanged` or `_checkBox1_onChanged`
 */
const CAMEL_CASE_WITH_JOINING_UNDERSCORE =
  '^_?[a-z][a-z0-9]*([A-Z][a-z]?[a-z0-9]*)*_[a-z][a-z0-9]*([A-Z][a-z]?[a-z0-9]*)*$';
/**
 * Ignore quoted identifiers such as `{ "X+Y": 123 }`.  Currently
 * @typescript-eslint/naming-convention cannot detect whether an identifier is
 * quoted or not, so we simply assume that it is quoted if-and-only-if it
 * contains characters that require quoting.
 */
const SAFE_UNQUOTED = '[^a-zA-Z0-9_]';

const namingConvention = {
  /**
   * @see https://typescript-eslint.io/rules/naming-convention
   */
  '@typescript-eslint/naming-convention': [
    'warn',
    {
      /**
       * We should be stricter about 'enumMember', but it often functions
       * legitimately as an ad-hoc namespace.
       */
      selector: ['variable', 'enumMember', 'function'],

      format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      leadingUnderscore: 'allow',

      filter: {
        regex: [CAMEL_CASE_WITH_JOINING_UNDERSCORE]
          .map((x) => `(${x})`)
          .join('|'),
        match: false,
      },
    },

    {
      selector: 'parameter',

      format: ['camelCase'],

      filter: {
        regex: [DOUBLE_UNDERSCORE_PREFIX].map((x) => `(${x})`).join('|'),
        match: false,
      },
    },

    // Genuine properties
    ...enforcePrivateLeadingUnderscore({
      selector: ['parameterProperty', 'accessor'],

      format: ['camelCase', 'UPPER_CASE'],

      filter: {
        regex: [
          DOUBLE_UNDERSCORE_PREFIX,
          SAFE_UNQUOTED,
          CAMEL_CASE_WITH_JOINING_UNDERSCORE,
        ]
          .map((x) => `(${x})`)
          .join('|'),
        match: false,
      },
    }),

    // Properties that incorrectly match other contexts
    // See issue https://github.com/typescript-eslint/typescript-eslint/issues/2244
    ...enforcePrivateLeadingUnderscore({
      selector: ['property'],

      // The @typescript-eslint/naming-convention "property" selector matches cases like this:
      //
      //   someLegacyApiWeCannotChange.invokeMethod({ SomeProperty: 123 });
      //
      // and this:
      //
      //   const { CONSTANT1, CONSTANT2 } = someNamespace.constants;
      //
      // Thus for now "property" is more like a variable than a class member.
      format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      leadingUnderscore: 'allow',

      filter: {
        regex: [
          DOUBLE_UNDERSCORE_PREFIX,
          SAFE_UNQUOTED,
          CAMEL_CASE_WITH_JOINING_UNDERSCORE,
        ]
          .map((x) => `(${x})`)
          .join('|'),
        match: false,
      },
    }),

    ...enforcePrivateLeadingUnderscore({
      selector: ['method'],

      // A PascalCase method can arise somewhat legitimately in this way:
      //
      // class MyClass {
      //    public static MyReactButton(props: IButtonProps): JSX.Element {
      //      . . .
      //    }
      // }
      format: ['camelCase', 'PascalCase'],
      leadingUnderscore: 'allow',

      filter: {
        regex: [DOUBLE_UNDERSCORE_PREFIX, CAMEL_CASE_WITH_JOINING_UNDERSCORE]
          .map((x) => `(${x})`)
          .join('|'),
        match: false,
      },
    }),

    // Types should use PascalCase
    {
      selector: ['class', 'typeAlias', 'enum', 'typeParameter'],
      format: ['PascalCase'],
      leadingUnderscore: 'allow',
    },

    {
      selector: 'interface',

      // It is very common for a class to implement an interface of the same name.
      // For example, the Widget class may implement the IWidget interface.  The "I" prefix
      // avoids the need to invent a separate name such as "AbstractWidget" or "WidgetInterface".
      // In TypeScript it is also common to declare interfaces that are implemented by primitive
      // objects, here the "I" prefix also helps by avoiding spurious conflicts with classes
      // by the same name.
      format: ['PascalCase'],

      custom: {
        regex: '^I[A-Z]',
        match: false,
      },
    },
  ],
};

module.exports = namingConvention;

function enforcePrivateLeadingUnderscore(block) {
  const allowedBlock = {
    ...block,
    leadingUnderscore: 'allow',
  };
  const requiredBlock = {
    ...block,
    modifiers: ['private'],
    leadingUnderscore: 'require',
  };

  return [allowedBlock, requiredBlock];
}
