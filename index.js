
var merge = require('broccoli-merge-trees');
var chalk = require('chalk');
var dist = require('broccoli-dist-es6-module');
var funnel = require('broccoli-funnel');
var path = require('path');

var camelCase = require('./tests/utils').camelCase;

function Plugin(author, plugin) {
  this.name = plugin;
  this.author = author;

  this.packageName = 'd3/plugins/' + author + '/' + plugin;
  this.globalName = 'd3.plugins.' + camelCase(author) + '.' + camelCase(plugin);
  this.basePath = path.join('vendor', author, plugin);
}

Plugin.fromIndex = function (index) {
  var trees = [];

  for (var author in index) {
    var plugins = index[author];

    plugins.forEach(function (plugin) {
      trees = trees.concat(new Plugin(author, plugin));
    });
  }

  return trees;
};

Plugin.prototype.log = function log() {
  var prefix = ' ' + chalk.green('ok') + ' ';

  console.log(chalk.underline(this.author + '/' + this.name));
  console.log(prefix + 'es6');
  console.log(prefix + 'cjs');
  console.log(prefix + 'anonymous-amd');
  console.log(prefix + 'named-amd -> ' + this.packageName);
  console.log(prefix + 'global -> ' + this.globalName);
};

Plugin.prototype.toTree = function toTree() {
  var plugin = this.name;
  var author = this.author;
  var packageName = this.packageName;
  var globalName = this.globalName;

  var pluginBasePath = this.basePath;

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
    destDir: path.join(author, plugin)
  });
};

module.exports = Plugin.fromIndex({
  'larskotthoff':     [ 'chernoff' ],
  'skokenes':         [ 'lasso' ],
  'tmcw':             [ 'jsonp', 'keybinding' ],
  'zjonsson':         [ 'force-labels' ],
  'prcweb':           [ 'circular-heat-chart' ],
  'deprecated':       [ 'interpolate-zoom' ],
  'jasondavies':      [ 'longscroll', 'parsets' ],
  'emeeks':           [ 'adjacency-matrix', 'graph', 'orbit', 'timeline', 'legend', 'circular-brush' ],
  'susielu':          [ 'legend' ],
  'square':           [ 'crossfilter' ],
  'riccardoscalco':   [ 'textures' ],
  'adnan-wahab':      [ 'pathgl' ],
  'mbostock': [
    'box',
    'bullet',
    'fisheye',
    'hive',
    'hexbin',
    'horizon',
    'sankey',
    'rollup',
    'qq',
    'geodesic',
    'contour',
    'urlencode',
    'superformula',
    'cubehelix',
    'tile',
    'topojson'
  ],
});

