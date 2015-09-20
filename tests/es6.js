
var path = require('path');

var babylon = require('babylon');

var readScript = require('./utils').readScript;

module.exports = function (author, plugin) {
  return function () {
    var content = readScript(path.join('dist', author, plugin, 'globals', 'main.js'));

    it('should be well formed ES6 javascript', function () {
      babylon.parse(content);
    });
  };
};
