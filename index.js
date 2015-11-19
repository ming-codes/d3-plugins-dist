
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

module.exports = Plugin.fromIndex({
  'larskotthoff':     [ 'chernoff' ],
  'skokenes':         [ 'lasso' ],
  'tmcw':             [ 'jsonp', 'keybinding' ],
  'zjonsson':         [ 'force-labels' ],
  'prcweb':           [ 'circular-heat-chart' ],
  'deprecated':       [ 'interpolate-zoom' ],
  'jasondavies':      [ 'longscroll', 'parsets' ],
  'emeeks':           [ 'adjacency-matrix', 'graph', 'orbit', 'timeline', 'legend', 'circular-brush', 'ribbon', 'sketchy' ],
  'klortho':          [ 'flex-tree' ],
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
