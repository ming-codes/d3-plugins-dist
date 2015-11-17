
var path = require('path');

var plugins = require('../index');

var global = require('./global');
var namedAMD = require('./named-amd');
var anonymousAMD = require('./anonymous-amd');
var cjs = require('./cjs');
var es6 = require('./es6');

plugins.forEach(function (plugin) {
  var author = plugin.author;
  var name = plugin.name;

  describe(path.join(author, name), function () {
    describe('es6', es6(author, name));
    describe('cjs', cjs(author, name));
    describe('anonymous-amd', anonymousAMD(author, name));
    describe('named-amd', namedAMD(author, name));
    describe('global', global(author, name));
  });
});
