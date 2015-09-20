
var path = require('path');

var plugins = require('../index');

var $each = require('lodash/collection/each');

var global = require('./global');
var namedAMD = require('./named-amd');
var anonymousAMD = require('./anonymous-amd');
var cjs = require('./cjs');
var es6 = require('./es6');

$each(plugins, function (plugins, author) {
  $each(plugins, function (type, plugin) {
    describe(path.join(author, plugin), function () {
      describe('es6', es6(author, plugin));
      describe('cjs', cjs(author, plugin));
      describe('anonymous-amd', anonymousAMD(author, plugin));
      describe('named-amd', namedAMD(author, plugin));
      describe('global', global(author, plugin));
    });
  });
});

