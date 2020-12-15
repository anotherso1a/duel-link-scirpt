const fs = require("fs")
const path = require("path")
class TransformAUIPlugin {
  constructor(options) {
    // this.options = options
  }
  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise('TransformAUIPlugin', compilation => {

      return new Promise((resolve, reject) => {
        let output = compilation.compiler.outputPath
        Object.keys(compilation.assets).forEach(file => {
          let filePath = path.join(output, file)
          let auiReg = /['"]\$\$([\s\S]*?)\$\$['"]/g
          fs.writeFileSync(
            filePath,
            fs.readFileSync(filePath, 'utf8').replace(auiReg, '$1').replace(/\\n\s*?</g, '<')
          )
        })
        try {
          resolve()
        } catch (err) {
          reject('Error in TransformAUIPlugin: ', err)
        }
      });
    });
  }
}

module.exports = TransformAUIPlugin;