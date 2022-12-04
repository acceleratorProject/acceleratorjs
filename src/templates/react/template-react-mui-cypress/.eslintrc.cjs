module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'standard'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier', 'jsx-a11y'],
  rules: {
    'space-before-function-paren': 'off'
  },
  globals: {
    expect: 'writable',
    describe: 'writable',
    test: 'writable',
    it: 'writable',
    cy: 'writable'
  }
}
