
var path = require('path');

var chai = require('chai');
var expect = chai.expect;

var runScript = require('./utils').runScript;

module.exports = function (author, plugin) {
  return function () {
    var exports = {};
    var require = function (dep) {
      if (dep === 'd3') {
        return Object.freeze({});
      }
      else if (dep === 'exports') {
        return {};
      }
      else {
        throw 'Unexpected dependency ' + dep;
      }
    };
    var module = Object.freeze({ exports: exports, require: require });
    var window = runScript(path.join('dist', author, plugin, 'cjs', plugin + '.js'), module);

    it('should export default', function () {
      expect(exports['default']).to.exist;
    });
  };
};
