
var path = require('path');

var chai = require('chai');
var expect = chai.expect;

var d3 = require('d3');

var camelCase = require('./utils').camelCase;
var runScript = require('./utils').runScript;

var d3props = Object.keys(d3);

var globals = Object.keys(require('./utils').globals({ window: '', d3: '' }));

var plugins = Object.keys(require('../index')).map(camelCase);

module.exports = function (author, plugin) {
  var namespace = 'd3.plugins.' + camelCase(author) + '.' + camelCase(plugin);

  return function () {
    var context = runScript(path.join('dist', author, plugin, 'globals', 'main.js'), {
      d3: d3
    });

    it('should have module in namespace ' + namespace, function () {
      expect(context)
        .has.property('d3')
        .has.property('plugins')
        .has.property(camelCase(author))
        .has.property(camelCase(plugin));
    });

    it('should not corrupt global namespace', function () {
      expect(context)
        .to.have.all.keys(globals);
    });

    it('should not corrupt d3 namespace', function () {
      // chernoff is the only one don't have d3.plugins
      expect(context.d3)
        .to.have.all.keys(d3props.concat('plugins'));
    });

    it('should not corrupt ' + camelCase(author) + ' namespace', function () {
      expect(context.d3.plugins)
        .to.have.all.keys(plugins);
    });
  };
}
