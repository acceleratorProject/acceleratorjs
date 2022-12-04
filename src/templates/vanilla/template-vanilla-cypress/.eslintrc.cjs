module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:prettier/recommended', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {},
  globals: {
    describe: 'writable',
    test: 'writable',
    it: 'writable',
    cy: 'writable'
  }
}
