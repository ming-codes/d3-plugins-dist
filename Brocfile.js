
var path = require('path');
var chalk = require('chalk');

var dist = require('broccoli-dist-es6-module');
var funnel = require('broccoli-funnel');
var merge = require('broccoli-merge-trees');

var plugins = require('./index');
var camelCase = require('./tests/utils').camelCase;

function makeTree(plugin) {
  var name = plugin.name;
  var author = plugin.author;

  var packageName = 'd3/plugins/' + author + '/' + name;
  var globalName = 'd3.plugins.' + camelCase(author) + '.' + camelCase(name);

  var pluginBasePath = path.join('vendor', author, name);

  var srcTree = funnel(pluginBasePath, {
    srcDir: '/',
    include: [ '*.js', 'LICENSE' ]
  });
  var es6Tree = funnel(srcTree, {
    srcDir: '/',
    include: [ '*.js', 'LICENSE' ],
    destDir: 'es6'
  });

  var distTree = dist(srcTree, {
    // the entry script, and module that becomes the global
    main: 'index',

    // will become window.ic.ajax with the exports from `main`
    global: globalName,

    // the prefix for named-amd modules
    packageName: packageName,

    // global output only: naive shimming, when the id 'ember' is imported,
    // substitute with `window.Ember` instead
    shim: { 'd3': 'd3' }
  });

  return funnel(merge([ es6Tree, distTree ]), {
    destDir: path.join(author, name)
  });
};

module.exports = merge([].concat(plugins.map(function (plugin) {
  var prefix = ' ' + chalk.green('ok') + ' ';
  var name = plugin.name;
  var author = plugin.author;
  var packageName = 'd3/plugins/' + author + '/' + name;
  var globalName = 'd3.plugins.' + camelCase(author) + '.' + camelCase(name);

  console.log(chalk.underline(author + '/' + name));
  console.log(prefix + 'es6');
  console.log(prefix + 'cjs');
  console.log(prefix + 'anonymous-amd');
  console.log(prefix + 'named-amd -> ' + packageName);
  console.log(prefix + 'global -> ' + globalName);

  return makeTree(plugin);
})));
