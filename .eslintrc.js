'use strict'

module.exports = {
  root: true,
  extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/interface-name-prefix': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
}
