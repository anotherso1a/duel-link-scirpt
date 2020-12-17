const base = require('./webpack.config')
const path = require('path')
const resolve = path.resolve.bind(path, __dirname)

module.exports = Object.assign({}, base, {
  entry: resolve('../src/index.js')
})