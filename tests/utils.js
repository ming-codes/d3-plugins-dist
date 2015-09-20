
var vm = require('vm');
var fs = require('fs');

module.exports.camelCase = function camelCase(str) {
  var arr = str.split('-');

  return [ arr[0] ].concat(arr.slice(1).map(function (chunk) {
    return chunk[0].toUpperCase() + chunk.substring(1);
  })).join('');
};

module.exports.readScript = function readScript(filePath) {
  return fs.readFileSync(filePath, 'utf8');
};

module.exports.runScript = function runScript(filePath, context) {
  var scriptContent = fs.readFileSync(filePath, 'utf8');

  var script = new vm.Script(scriptContent);

  context = context || {};
  context.window = context;

  script.runInNewContext(context);

  return context;
};
