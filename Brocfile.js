
var merge = require('broccoli-merge-trees');
var plugins = require('./index');

module.exports = merge([].concat(plugins.map(function (plugin) {
  plugin.log();

  return plugin.toTree();
})));
