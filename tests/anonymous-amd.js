
var path = require('path');

var chai = require('chai');
var expect = chai.expect;

var d3 = require('d3');

var camelCase = require('./utils').camelCase;
var runScript = require('./utils').runScript;

module.exports = function (author, plugin) {
  return function () {
    var window = runScript(path.join('dist', author, plugin, 'amd', plugin + '.js'), {
      define: function define(deps, factory) {
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

        it('anonymous-amd should be passed 2 arguments', function () {
          expect(defineArgs).to.have.length(2);
        });

      }
    });
  };
};
