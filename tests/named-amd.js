
var path = require('path');

var chai = require('chai');
var expect = chai.expect;

var d3 = require('d3');

var camelCase = require('./utils').camelCase;
var runScript = require('./utils').runScript;
var load = require('./utils').loadAMDModules;

module.exports = function (author, plugin) {
  var basedir = path.join(__dirname, '..', 'dist', author, plugin, 'named-amd');
  var namespace = 'd3/plugins/' + author + '/' + plugin;

  return function () {
    var modules = [];

    modules.seen = { d3: d3 };
    modules.index = {};

    load(basedir, function (args, file) {
      var original = args.slice();
      var factory = args.pop();
      var deps = args.pop() || [];
      var name = args.pop() || file.replace(basedir, '.').replace(/\.js$/, '');

      describe(name, function () {
        it('should be passed 3 arguments', function () {
          expect(original).to.have.length(3);
        });

        it('should have module in namespace ' + namespace, function () {
          expect(name).to.contain(namespace);
        });
      });

      modules.push(modules.index[name] = {
        factory: factory,
        deps: deps,
        name: name,
        file: file
      });

      name === namespace && (modules.main = modules.index[name]);
    });

  };
};
