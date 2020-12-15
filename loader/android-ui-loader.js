const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const core = require("@babel/core")

module.exports = function(content, map, meta) {
  var callback = this.async();

  const ast = parser.parse(content, {
    sourceType: "module",
    plugins: [
      // enable jsx and flow syntax
      "jsx"
    ]
  });
  
  traverse(ast, {
    JSXElement(path) {
      // path.replaceWithSourceString('asdasd', path.node)
      let str = content.slice(path.node.start, path.node.end)
      path.replaceWithSourceString(`\`$$${str}$$\``)
    }
  });

  let result = core.transformFromAstSync(ast, null, {
    configFile: false // 屏蔽 babel.config.js，否则会注入 polyfill 使得调试变得困难
  }).code;

  callback(null, result, map, meta);
};
