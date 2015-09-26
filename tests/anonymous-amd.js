
var path = require('path');

var chai = require('chai');
var expect = chai.expect;

var d3 = require('d3');

var camelCase = require('./utils').camelCase;
var runScript = require('./utils').runScript;
var load = require('./utils').loadAMDModules;

module.exports = function (author, plugin) {
  var basedir = path.join(__dirname, '..', 'dist', author, plugin, 'amd');

  return function () {
    var modules = [];
    var main = path.join(basedir, plugin + '.js');

    modules.seen = { d3: d3 };
    modules.index = {};

    load(basedir, function (args, file) {
      var original = args.slice();
      var factory = args.pop();
      var deps = args.pop() || [];
      var name = args.pop() || file.replace(basedir, '.').replace(/\.js$/, '');

      describe(file.replace(basedir, '.'), function () {
        it('should be passed 2 arguments', function () {
          expect(original).to.have.length(2);
        });
      });

      modules.push(modules.index[name] = {
        factory: factory,
        deps: deps,
        name: name,
        file: file
      });

      file === main && (modules.main = modules.index[name]);
    });

    var main = (function resolve(module) {
      var exports = {};
      // factory dont actually return anything
      return modules.seen[module.name] = (module.factory.apply(null, module.deps.map(function (dep) {
        if (dep === 'exports') {
          return exports;
        }
        else if (modules.seen[dep]) {
          return modules.seen[dep];
        }
        else {
          return resolve(modules.index[dep]);
        }
      })) || exports);
    })(modules.main);
  };
};
