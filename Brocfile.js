
var dist = require('broccoli-dist-es6-module');
var funnel = require('broccoli-funnel');
var merge = require('broccoli-merge-trees');
var path = require('path');

module.exports = merge([ 'sankey', 'lasso', 'bullet' ].map(buildPlugin));

function buildPlugin(name) {
  var srcPath = path.join('lib', name);

  var srcTree = funnel(srcPath, {
    srcDir: '/',
    files: [ name + '.js', 'LICENSE' ],
  });
  var es6Tree = funnel(srcTree, {
    destDir: 'es6'
  });

  var distTree = dist(srcTree, {
    // the entry script, and module that becomes the global
    main: name,

    // will become window.ic.ajax with the exports from `main`
    global: 'd3.plugins.' + name,

    // the prefix for named-amd modules
    packageName: 'd3-plugins/' + name,

    // global output only: naive shimming, when the id 'ember' is imported,
    // substitute with `window.Ember` instead
    shim: { 'd3': 'd3' }
  });

  return funnel(merge([ es6Tree, distTree ]), {
    destDir: name
  });
}
