/**
 * @typedef {Object} Group
 * @property {string} pattern
 * @property {Object} [patternOptions]
 * @property {string} group
 * @property {'after' | 'before'} [position]
 */

/**
 * Sorting and grouping of import statements.  Sorts alphabetically by `from`
 * module (rather than by member) and groups modules by source.  Use the
 * `settings['import/internal-regex']` setting to match modules that should be
 * part of the "internal" group (i.e. within the same repo but not local to a
 * module).  By default, imports with a source starting with `~/` are matched to
 * the "internal" group.
 *
 * Other custom groups can also be defined via the `groups` param.  See the
 * `react` config for an example that collects official React packages into a
 * "framework" group that appears before other third-party packages.
 *
 * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
 *
 * @param {Array<Group>} [groups]
 * @returns {Object} The `import/order` rule settings.
 */
function importSortOrder(groups = []) {
  return {
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          ['sibling', 'index'],
        ],
        'newlines-between': 'always',
        pathGroups: [
          ...groups,

          {
            pattern: '*.+(?(s)css)',
            group: 'index',
            position: 'after',
            patternOptions: {
              matchBase: true,
            },
          },
        ],
        distinctGroup: true,
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  };
}

module.exports = importSortOrder;
