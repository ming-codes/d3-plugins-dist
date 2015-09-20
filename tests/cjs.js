
var path = require('path');

var chai = require('chai');
var expect = chai.expect;

var d3 = require('d3');

var runScript = require('./utils').runScript;

module.exports = function (author, plugin) {
  return function () {
    var exports = {};
    var require = function (dep) {
      if (dep === 'd3') {
        return d3;
      }
      else if (dep === 'exports') {
        return {};
      }
      else {
        throw 'Unexpected dependency ' + dep;
      }
    };
    var module = { exports: exports, require: require };
    var window = runScript(path.join('dist', author, plugin, 'cjs', plugin + '.js'), module);

    it('should export default', function () {
      expect(exports['default']).to.exist;
    });
  };
};
