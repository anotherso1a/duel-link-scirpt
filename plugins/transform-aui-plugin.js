const fs = require("fs-extra")
const path = require("path")
const resolve = path.resolve.bind(path, __dirname)
class TransformAUIPlugin {
  constructor(options) {
    // this.options = options
  }
  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise('TransformAUIPlugin', compilation => {

      return new Promise((resl, reject) => {
        let output = compilation.compiler.outputPath
        Object.keys(compilation.assets).forEach(file => {
          let filePath = path.join(output, file)
          let auiReg = /['"]\$\$([\s\S]*?)\$\$['"]/g
          fs.writeFileSync(
            filePath,
            `auto();requestScreenCapture();setScreenMetrics(720, 1280);` + fs.readFileSync(filePath, 'utf8')
              .replace(auiReg, '$1')
              .replace(/\\n\s*?</g, '<')
          )
        })
        setTimeout(() => {
          fs.writeFileSync(
            resolve('../dist/main.js'),
            fs.readFileSync(resolve('../src/index/main.js'), 'utf8')
          )
          let destImgPath = resolve('../dist/images')
          let srcImgPath = resolve('../src/images')
          fs.ensureDirSync(destImgPath)
          fs.readdirSync(srcImgPath).forEach(item => {
            fs.copy(resolve(srcImgPath, item), resolve(destImgPath, item))
          })
        }, 500)
        try {
          resl()
        } catch (err) {
          reject('Error in TransformAUIPlugin: ', err)
        }
      });
    });
  }
}

module.exports = TransformAUIPlugin;