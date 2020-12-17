module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true
  },
  globals: {
    sleep: false,
    click: false,
    swipe: false,
    ui: false,
    device: false,
    files: false,
    exit: false,
    threads: false,
    toastLog: false,
    engines: false,
    events: false,
    findImage: false,
    auto: false,
    images: false,
    setScreenMetrics: false,
    requestScreenCapture: false,
    captureScreen: false,
    toast: false
  },
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  rules:{
    // styles
    'indent': ["error", 2, { "SwitchCase": 1 }],
    'semi': ['error', 'always'],
    'comma-spacing': ['error', { "before": false, "after": true }],
    'space-infix-ops': ['error', { 'int32Hint': true }],
    'space-before-blocks': ['error', { "functions": "never", "keywords": "always", "classes": "never" }],
    'arrow-spacing': 'error',
    'comma-dangle': 'error',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'no-multi-spaces': 'error',
  }
}