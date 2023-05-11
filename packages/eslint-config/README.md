# @clari/eslint-config

> ESLint configs for JavaScript/TypeScript code at Clari.

## Usage

```sh
npm install --save-dev @clari/eslint-config
```

## Configuration

```js
/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['@clari', 'prettier'],
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
