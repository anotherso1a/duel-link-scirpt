const path = require('path')
const TransformAUIPlugin = require('../plugins/transform-aui-plugin.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const resolve = path.resolve.bind(path, __dirname)

module.exports = {
  output: {
    path: resolve('../dist'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: resolve('../loader/android-ui-loader')
    }]
  },
  plugins: [
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
    new TransformAUIPlugin()
  ]
}