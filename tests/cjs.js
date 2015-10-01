
var path = require('path');

var chai = require('chai');
var expect = chai.expect;

var d3 = require('d3');

var runScript = require('./utils').runScript;
var globals = require('./utils').globals;

module.exports = function (author, plugin) {
  return function () {
    var exports = {};
    var requireModule = function (dep) {
      if (dep === 'd3') {
        return d3;
      }
      else if (dep === 'exports') {
        return {};
      }
      else {
        return require(path.join(__dirname, '..', 'dist', author, plugin, 'cjs', dep));
      }
    };
    var module = globals({ exports: exports, require: requireModule });
    var window = runScript(path.join('dist', author, plugin, 'cjs', plugin + '.js'), module);

    it('should export at least 1 item', function () {
      expect(Object.keys(exports)).to.have.length.above(0);
    });
  };
};
