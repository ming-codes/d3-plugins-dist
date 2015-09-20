
var path = require('path');

var chai = require('chai');
var expect = chai.expect;

var camelCase = require('./utils').camelCase;
var runScript = require('./utils').runScript;

module.exports = function (author, plugin) {
  var namespace = 'd3.plugins.' + camelCase(author) + '.' + camelCase(plugin);

  return function () {
    var context = {};

    context.window = context;
    context.d3 = {};
    context = Object.freeze(context);
    context = runScript(path.join('dist', author, plugin, 'globals', 'main.js'), context);

    it('should have module in namespace ' + namespace, function () {
      expect(context)
        .has.property('d3')
        .has.property('plugins')
        .has.property(camelCase(author))
        .has.property(camelCase(plugin));
    });

    it('should not corrupt global namespace', function () {
      expect(context)
        .to.have.all.keys([ 'window', 'd3' ]);
    });

    it('should not corrupt d3 namespace', function () {
      expect(context.d3)
        .to.have.all.keys([ 'plugins' ]);
    });

    it('should not corrupt ' + author + ' namespace', function () {
      expect(context.d3.plugins)
        .to.have.all.keys([ author ]);
    });
  };
}
