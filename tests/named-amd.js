
var path = require('path');

var chai = require('chai');
var expect = chai.expect;

var d3 = require('d3');

var camelCase = require('./utils').camelCase;
var runScript = require('./utils').runScript;

module.exports = function (author, plugin) {
  var namespace = 'd3-plugins/' + author + '/' + plugin;

  return function () {
    var window = runScript(path.join('dist', author, plugin, 'named-amd', 'main.js'), {
      define: function define(name, deps, factory) {
        var defineArgs = arguments;

        var resolvedDeps = deps.map(function (dep) {
          if (dep === 'd3') {
            return d3;
          }
          else if (dep === 'exports') {
            return {};
          }
          else {
            throw 'Unexpected dependency ' + dep;
          }
        });

        var module = factory.apply(null, resolvedDeps);

        it('named-amd should be passed 3 arguments', function () {
          expect(defineArgs).to.have.length(3);
        });

        it('should have module in namespace ' + namespace, function () {
          expect(name).to.equal(namespace);
        });
      }
    });
  };
};
