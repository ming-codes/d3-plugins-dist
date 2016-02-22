
var path = require('path');

var plugins = expand({
  'larskotthoff':     [ 'chernoff' ],
  'skokenes':         [ 'lasso' ],
  'tmcw':             [ 'jsonp', 'keybinding' ],
  'zjonsson':         [ 'force-labels' ],
  'prcweb':           [ 'circular-heat-chart' ],
  'deprecated':       [ 'interpolate-zoom' ],
  'jasondavies':      [ 'cloud', 'longscroll', 'parsets' ],
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

function Plugin(author, plugin) {
  this.name = plugin;
  this.author = author;
}

Plugin.prototype.pathFor = function (format) {
  return path.join(this.author, this.name, format, fileNameFor(format));
};

Plugin.prototype.absolutePathFor = function (format) {
  return path.join(__dirname, 'dist', this.author, this.name, format, fileNameFor(format));
};

function fileNameFor(format) {
  switch (format) {
    case 'amd': case 'cjs': case 'es6': return 'index.js';
    case 'globals': case 'named-amd': return 'main.js';
    default: throw new TypeError('Expected amd, cjs, es6, globals, or named-amd as format');
  }
}

function expand(index) {
  var trees = [];
  var lookup = {};

  for (var author in index) {
    var plugins = index[author];

    lookup[author] = lookup[author] || {};

    plugins.forEach(function (plugin) {
      trees.push(lookup[author][plugin] = new Plugin(author, plugin));
    });
  }

  trees.lookup = function (author, plugin) {
    return lookup[author][plugin];
  };

  trees.toTree = function () {
    return path.join(__dirname, 'dist');
  };

  return trees;
};

module.exports = plugins;
