'use strict'

const reshape = require('reshape')

exports.name = 'reshape'
exports.outputFormat = 'html'

exports.renderAsync = function (str, options, locals) {
  return new Promise((resolve, reject) => {
    const plugins = []
    options = options || {}
    options.plugins = options.plugins || {}

    if (Array.isArray(options.plugins)) {
      for (const plugin of options.plugins) {
        if (typeof plugin === 'string') {
          // eslint-disable-next-line import/no-dynamic-require
          plugins.push(require(plugin)())
        } else {
          plugins.push(plugin)
        }
      }
    } else if (typeof options.plugins === 'object') {
      for (const key in options.plugins) {
        if ({}.hasOwnProperty.call(options.plugins, key)) {
          const settings = options.plugins[key] || {}
          // eslint-disable-next-line import/no-dynamic-require
          plugins.push(require(key)(settings))
        }
      }
    }

    if (typeof options.parser === 'string') {
      // eslint-disable-next-line import/no-dynamic-require
      options.parser = require(options.parser)
    }

    const modifiedOptions = options
    modifiedOptions.plugins = plugins

    // Process with Reshape.
    reshape(modifiedOptions)
      .process(str)
      .then(result => {
        resolve(result.output(locals))
      }, reject)
  })
}
