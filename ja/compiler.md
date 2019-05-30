---
layout: detail
title: Compiler
---

## Introduction

Custom tags need to be transformed to javascript before the browser can execute them.
The riot compiler is designed to transpile riot tags into javascript modules.
A compiled riot tag will look like this:

```js
export default {
  css: `my-tag { color: red; }`, // component css string
  template: function() {}, // internal riot template factory function
  exports: {}, // component events and lifecycle methods
  name: 'my-tag' // component id
}
```

**Each tag file must contain only one tag definition**.

## In-browser compilation

The `riot+compiler.js` bundle lets you compile and execute riot tags directly in your browser for quick prototypes and tests.
You can load riot tags into your browser by setting a `type="riot"` attribute on your script tags.
For example:

``` html
<!-- mount point -->
<my-tag></my-tag>

<!-- <my-tag/> is specified in an external file -->
<script src="path/to/javascript/my-tag.riot" type="riot"></script>

<!-- include riot.js and the compiler -->
<script src="https://unpkg.com/riot@{{ site.data.globals.version }}/riot+compiler.min.js"></script>

<!-- compile and mount -->
<script>
(function async main() {
  await riot.compile()

  riot.mount('my-tag')
}())
</script>
```

Notice that in this case riot will internally transform all the `export default` expressions to enable a better support for browsers that don't support javascript modules yet.

Riot can compile asynchronously all the external tags included via `<script>` into the DOM and via `riot.mount` it will render them.

You might prefer using `data-src` instead of `src` on your `<script>` tags stop your browser prefetching automatically any riot script tag in order to avoid to load the same resources twice. Riot will automatically fetch and compile your tags via ajax.

## Pre-compilation

The Compilation phase is asynchronous and it will not block your application rendering. However you should use the browser compilation only for prototyping or for quick experiments.

Pre-compilation on gives you following benefits:

- Ability to compile tags with your [favorite pre-processor](#pre-processors).
- Big performance benefit. No need to load and execute the compiler on browser.
- Sourcemaps support for debugging.

### Riot loaders

Tools like [`webpack`](https://webpack.js.org/) and [`rollup`](https://rollupjs.org/) are the perfect match to bundle your riot application tags.
For such tools we provide riot official loaders to let import natively riot components into your source code:
  - [webpack](https://github.com/riot/webpack-loader)
  - [rollup](https://github.com/riot/rollup-plugin-riot).
  - [parcel](https://github.com/riot/parcel-plugin-riot)
  - [riotify](https://github.com/riot/riotify)

With the riot loaders your application entry script might look like this:

```js
import { component } from 'riot'
import MyTag from './path/to/tags/my-tag.riot'

component(MyTag)(document.getElementById('root'))
```

### Compilation via Node

``` javascript
import {compile} from '@riotjs/compiler'

const { code, map } = compile('<p>{hello}</p>')
```

The compile function takes a string and returns an object containing the `code` and `map` keys.
You can handle the code generated however you like and use it into your build system.

Remember that the riot compiler outputs javascript modules and you might want to transpile them in your bundle.



