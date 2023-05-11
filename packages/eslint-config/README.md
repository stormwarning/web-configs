# @clari/eslint-config

> ESLint configs for JavaScript/TypeScript code at Clari.

## Usage

```sh
npm install --save-dev @clari/eslint-config
```

## Configuration

Include the Clari config in your ESLint config `extends` list. Including the
`prettier` config ensures ESLint won't yell about formatting errors that will be
fixed automatically.

The base config also includes rules for Jest test files. Make sure to configure
the plugin for accurate reporting. If your project uses Vitest instead of Jest,
this can be skipped; most of the Jest-related rules will still work with Vitest
although some (like `'jest/no-deprecated-functions'`) may need to be disabled.

```js
/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['@clari', 'prettier'],
  settings: {
    jest: {
      version: 27,
    },
  },
};
```

> **Remember:**  
> The `prettier` config should always be _last_ in the extends list, as it
> ensures conflicting ESLint rules are disabled.

## Additional extensions

The main config provides standards for general JavaScript and testing. Additional configs are available for different tech stacks.

### React

Includes rules specific to React and JSX coding practices.

```js
/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['@clari', '@clari/eslint-config/conf/react', 'prettier'],
  settings: {
    react: {
      // Confgure your project’s version of React for accurate rule reporting.
      version: '18',
    },
  },
};
```

### TypeScript

Additional code style rules provided by the `@typescript-eslint` parser. Although TypeScript is in the name, these rules work on regular JavaScript files too.

```js
/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['@clari', '@clari/eslint-config/conf/typescript', 'prettier'],
};
```

### TypeScript with type checking

This is an additional set of rules that _are_ specific to TypeScript, and requires a tsconfig.json file that includes the same set of files that ESLint runs on.

```js
/** @type {import('eslint').Linter.Config} */
const config = {
  extends: [
    '@clari',
    '@clari/eslint-config/conf/typescript',
    '@clari/eslint-config/conf/typescript-type-check',
    'prettier',
  ],
  parserOptions: {
    // This can be different from the project’s main tsconfig.
    project: 'tsconfig.json',
  },
};
```
