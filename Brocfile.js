
var chalk = require('chalk');
var dist = require('broccoli-dist-es6-module');
var funnel = require('broccoli-funnel');
var merge = require('broccoli-merge-trees');
var path = require('path');

var plugins = require('./index');
var trees = [];

for (var author in plugins) {
  trees.push(buildPlugin(author, plugins[author]));
}

module.exports = merge(trees);

function buildPlugin(author, plugin) {
  var globalName = 'd3.plugins.' + author + '.' + plugin;
  var packageName = 'd3-plugins/' + author + '/' + plugin;

  var pluginBasePath = path.join('lib', author, plugin);

  var srcTree = funnel(pluginBasePath, {
    srcDir: '/',
    files: [ plugin + '.js', 'LICENSE' ]
  });
  var es6Tree = funnel(srcTree, {
    srcDir: '/',
    files: [ plugin + '.js', 'LICENSE' ],
    destDir: 'es6'
  });

  var distTree = dist(srcTree, {
    // the entry script, and module that becomes the global
    main: plugin,

    // will become window.ic.ajax with the exports from `main`
    global: globalName,

    // the prefix for named-amd modules
    packageName: packageName,

    // global output only: naive shimming, when the id 'ember' is imported,
    // substitute with `window.Ember` instead
    shim: { 'd3': 'd3' }
  });

  var prefix = ' ' + chalk.green('ok') + ' ';

  console.log(chalk.underline(author + '/' + plugin));
  console.log(prefix + 'es6');
  console.log(prefix + 'cjs');
  console.log(prefix + 'anonymous-amd');
  console.log(prefix + 'named-amd -> ' + packageName);
  console.log(prefix + 'global -> ' + globalName);

  return funnel(merge([ es6Tree, distTree ]), {
    destDir: path.join(author, plugin)
  });
}
