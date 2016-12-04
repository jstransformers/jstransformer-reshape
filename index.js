'use strict';

var reshape = require('reshape')

exports.name = 'reshape';
exports.inputFormats = ['reshape', 'html'];
exports.outputFormat = 'html';

exports.renderAsync = function (str, options) {
  return new Promise(function (resolve, reject) {

    var plugins = []

    if (Array.isArray(options.plugins)) {
      for (var i in options.plugins) {
        var plugin = options.plugins[i]
        plugins.push(require(plugin)())
      }
    } else if (typeof options.plugins === 'object') {
      for (var key in options.plugins) {
        var settings = options.plugins[key] || {}
        plugins.push(require(key)(settings))
      }
    }

    var modifiedOptions = options
    modifiedOptions.plugins = plugins

    // Process with Reshape.
    reshape(modifiedOptions)
      .process(str)
      .then(function (result) {
        resolve(result.output(options.locals))
      }, reject)
  })
}
