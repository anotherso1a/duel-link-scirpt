const base = require('./webpack.config')
const fs = require('fs')
const path = require('path')
const resolve = path.resolve.bind(path, __dirname)

const entry = fs.readdirSync(resolve('../src/split')).reduce((res, item) => {
  const name = item.replace(/(\.\/|\.[jt]s)/g, '')
  res[name] = resolve('../src/split', item)
  return res
}, {})


module.exports = Object.assign({}, base, {
  entry
})