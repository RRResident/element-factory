module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "jest/globals": true
  },
  extends: [
    'eslint:recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: [
    '@typescript-eslint',
    'jest'
  ],
  rules: {
    
  }
}
