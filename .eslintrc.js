module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended', 'preact', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  ignorePatterns: ['dist/**/*'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
};
