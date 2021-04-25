module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    module: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  // extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  extends: ['eslint:recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    curly: 'off'
  }
}
