
var path = require('path');
var vm = require('vm');
var fs = require('fs');
var glob = require('glob');

var elements = [ 'HTMLCanvasElement' ];

function makeCtor(name) {
  return Function('return function ' + name + ' () {};')();
}

module.exports.globals = globals;
function globals(context) {
  elements.forEach(function (el) {
    context[el] = makeCtor(el);
  });

  return context;
};

module.exports.camelCase = function camelCase(str) {
  var arr = str.split('-');

  return [ arr[0] ].concat(arr.slice(1).map(function (chunk) {
    return chunk[0].toUpperCase() + chunk.substring(1);
  })).join('');
};

module.exports.readScript = readScript;
function readScript(filePath) {
  return fs.readFileSync(filePath, 'utf8');
};

module.exports.runScript = runScript;
function runScript(filePath, context) {
  var scriptContent = fs.readFileSync(filePath, 'utf8');

  var script = new vm.Script(scriptContent);

  context = globals(context || {});
  context.window = context;

  script.runInNewContext(context);

  return context;
};

module.exports.loadAMDModules = function load(basedir, define) {
  var dir = path.join(basedir, '**', '*.js');

  glob.sync(dir).forEach(function (file) {
    runScript(file, globals({
      define: function () {
        define(Array.prototype.slice.call(arguments), file);
      }
    }));
  });
};
