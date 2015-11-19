
var path = require('path');
var chalk = require('chalk');

var dist = require('broccoli-dist-es6-module');
var funnel = require('broccoli-funnel');
var merge = require('broccoli-merge-trees');
var plugins = require('./index');

function makeTree(plugin) {
  var name = plugin.name;
  var author = plugin.author;
  var packageName = plugin.packageName;
  var globalName = plugin.globalName;

  var pluginBasePath = plugin.basePath;

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

  console.log(chalk.underline(plugin.author + '/' + plugin.name));
  console.log(prefix + 'es6');
  console.log(prefix + 'cjs');
  console.log(prefix + 'anonymous-amd');
  console.log(prefix + 'named-amd -> ' + plugin.packageName);
  console.log(prefix + 'global -> ' + plugin.globalName);

  return makeTree(plugin);
})));
