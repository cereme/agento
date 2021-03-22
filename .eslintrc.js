module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended', 'preact', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['dist/**/*'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
};
