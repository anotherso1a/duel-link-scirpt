const path = require('path')
const TransformAUIPlugin = require('./plugins/transform-aui-plugin.js')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: path.resolve(__dirname, 'loader/android-ui-loader')
    }]
  },
  plugins: [new TransformAUIPlugin()]
}