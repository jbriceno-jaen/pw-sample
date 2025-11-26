module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    // project preferences
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'off'
  },
  overrides: [
    {
      files: ['**/tests/**/*.ts', '**/*.spec.ts'],
      rules: {
        'no-console': 'off'
      },
    },
  ],
};
