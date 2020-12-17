const path = require('path')
const TransformAUIPlugin = require('./plugins/transform-aui-plugin.js')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: {
    xx: path.resolve(__dirname, 'src/xx.js'),
    csm: path.resolve(__dirname, 'src/csm.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: path.resolve(__dirname, 'loader/android-ui-loader')
    }]
  },
  plugins: [
    new ESLintPlugin(),
    new TransformAUIPlugin()
  ]
}