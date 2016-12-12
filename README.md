# jstransformer-reshape

[reshape](https://reshape.ml/) support for [JSTransformers](http://github.com/jstransformers).

[![Build Status](https://img.shields.io/travis/jstransformers/jstransformer-reshape/master.svg)](https://travis-ci.org/jstransformers/jstransformer-reshape)
[![Coverage Status](https://img.shields.io/codecov/c/github/jstransformers/jstransformer-reshape/master.svg)](https://codecov.io/gh/jstransformers/jstransformer-reshape)
[![Dependency Status](https://img.shields.io/david/jstransformers/jstransformer-reshape/master.svg)](http://david-dm.org/jstransformers/jstransformer-reshape)
[![NPM version](https://img.shields.io/npm/v/jstransformer-reshape.svg)](https://www.npmjs.org/package/jstransformer-reshape)

## Installation

`npm install jstransformer-reshape`

> **Note:** Reshape requires node v6 or above.

## API

```js
const reshape = require('jstransformer')(require('jstransformer-reshape'))
const customElements = require('reshape-custom-elements')

const text = `
<my-component>
  <my-text class="text">Text</my-text>
</my-component>
`

// pass an array of plugins
const options = { plugins: [customElements()] }

reshape.renderAsync(text, options).then((result) => {
  console.log(result.body)
})
//=> '<div class="my-component">\n<div class="text my-text">Text</div>\n</div>'

// or pass an object of plugins and settings
const options2 = { plugins: [customElements({ defaultTag: 'span' })] }

reshape.renderAsync(text, options2).then(function (result) {
  console.log(result.body)
})
//=> '<span class="my-component">\n<span class="text my-text">Text</span>\n</span>'
```

## License

MIT
