module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'standard',
    'prettier'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'jsx-a11y'],
  rules: {

  },
  globals: {
    describe: 'writable',
    it: 'writable',
    expect: 'writable',
    cy: 'writable'
  }
}
