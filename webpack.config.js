const path = require('path')
const fs = require('fs')
const TransformAUIPlugin = require('./plugins/transform-aui-plugin.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const resolve = path.resolve.bind(path, __dirname)


const entry = fs.readdirSync(resolve('src/index')).reduce((res, item) => {
  const name = item.replace(/(\.\/|\.[jt]s)/g, '')
  res[name] = resolve('src/index', item)
  return res
}, {})

module.exports = {
  entry,
  output: {
    path: resolve('dist'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: resolve('loader/android-ui-loader')
    }]
  },
  plugins: [
    new CopyPlugin({
      patterns: [{
        from: resolve('src/images'),
        to: resolve('dist/images')
      }],
    }),
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
    new TransformAUIPlugin()
  ]
}