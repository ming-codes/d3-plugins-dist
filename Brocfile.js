
var dist = require('broccoli-dist-es6-module');
var funnel = require('broccoli-funnel');
var merge = require('broccoli-merge-trees');
var path = require('path');

module.exports = buildPlugin('sankey');

function buildPlugin(name) {
  var srcPath = path.join('lib', name);

  var srcTree = funnel(srcPath, {
    srcDir: '/',
    files: [ name + '.js' ],
  });
  var es6Tree = funnel(srcTree, {
    destDir: 'es6'
  });

  var distTree = dist(srcTree, {
    // the entry script, and module that becomes the global
    main: name,

    // will become window.ic.ajax with the exports from `main`
    global: 'd3.' + name,

    // the prefix for named-amd modules
    packageName: 'd3/' + name,

    // global output only: naive shimming, when the id 'ember' is imported,
    // substitute with `window.Ember` instead
    shim: { 'd3': 'd3' }
  });

  return funnel(merge([ es6Tree, distTree ]), {
    destDir: name
  });
}
