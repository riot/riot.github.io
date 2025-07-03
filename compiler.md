---
title: Compiler
layout: detail
---

## Introduction

Custom tags need to be transformed to JavaScript before the browser can execute them.
The Riot compiler is designed to transform Riot tags into JavaScript modules.
A compiled Riot tag will look like this:

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

The `riot+compiler.js` (~90kb Gzip) bundle lets you compile and execute Riot tags directly in your browser.
You can load Riot tags into your browser by setting a `type="riot"` attribute on your script tags.
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
(async function main() {
  await riot.compile()

  riot.mount('my-tag')
}())
</script>
```

Notice that in this case Riot will internally transform all of the `export default` expressions to enable better support for browsers that don't support JavaScript modules yet.

Riot can asynchronously compile all of the external tags included via `<script>` into the DOM and it will render them via `riot.mount`.

You might prefer using `data-src` instead of `src` on your `<script>` tags to prevent the browser from  automatically prefetching any Riot script tag in order and avoid loading the same resources twice. Riot will automatically fetch and compile your tags via AJAX.

### In-browser compilation with inline templates

Your Riot.js components could be also be included directly in your page via `<template>` tags. For example:

```html
<!-- somewhere in your page -->
<template id="my-tag">
  <my-tag>
    <p>{ props.message }</p>
  </my-tag>
</template>
```

The `riot+compiler.js` bundle exposes the `compileFromString` and `inject` methods that combined together, can help you compiling the above component:

```js
const tagString = document.getElementById('my-tag').innerHTML

// get the compiled code
const {code} = riot.compileFromString(tagString)

// create the riot component in runtime
riot.inject(code, 'my-tag', './my-tag.html')

riot.mount('my-tag')
```

<aside class="note note--warning">
Note that <code>document.getElementById('my-tag').innerHTML</code> will show ampersands <code>&</code> within your template as HTML entities <code>&amp;</code>, which will break the compiler.
</aside>

To compile tags with attribute expressions like `<div class="{ condition1 && condition2 ? 'someclass': '' }">...</div>`, you can simply replace with `.innerHTML.replace(/&amp;/g, '&')`.

<aside class="note note--warning">
:warning: When using in-browser rendering, take extra care to use valid HTML, especially when writing attributes.
</aside>

For example, the following will not compile correctly because the `onclick` handler is not surrounded in quotes:

```html
<!-- will not compile correctly when using in-browser compilation -->
<button onclick={ helloAgain }>Click Me!</button>
```

Instead, either enclose the attribute value in quotes or avoid spaces:

```html
<!-- both of these should compile correctly -->
<button onclick="{ helloAgain }">Click Me!</button>
<button onclick={helloAgain}>Click Me!</button>
```

## Pre-compilation

The Compilation phase is asynchronous and it will not block your application rendering. However you should use the browser compilation only for prototyping or for quick experiments.

Pre-compilation has the following benefits:

- Ability to compile tags with your [favorite pre-processor](#pre-processors).
- Big performance benefit. No need to load and execute the compiler on the browser.
- Sourcemaps support for debugging.

### Riot loaders

Tools like [`webpack`](https://webpack.js.org/) and [`Rollup`](https://rollupjs.org/) are the perfect match to bundle your Riot application tags.
For such tools we provide Riot official loaders to natively import riot components into your source code:
  - [webpack](https://github.com/riot/webpack-loader)
  - [Rollup](https://github.com/riot/rollup-plugin-riot)
  - [Parcel](https://github.com/riot/parcel-plugin-riot)
  - [Browserify](https://github.com/riot/riotify)

With the Riot loaders your application entry script might look like this:

```js
import { component } from 'riot'
import MyTag from './path/to/tags/my-tag.riot'

component(MyTag)(document.getElementById('root'))
```

### TypeScript support

The Riot.js compiler supports typescript syntax out of the box.
If you want to enable the type checking for your component API and expressions you will export its `RiotComponent` interface as it follows:

```html
<my-component>
  <!-- notice that lang="ts" is optional and eventually needed just for your IDE code highlighting -->
  <script lang="ts">
    import { RiotComponent } from 'riot'

    export interface MyComponent extends RiotComponent<MyComponentProps, MyComponentState> {
      /* additional component custom methods and properties */
    }
  </script>
</my-component>
```

If you want to enhance your component types you might want to check also the [`riot.withTypes`](/api/#riotwithtypes) method

You might want to check the Riot.js [typescript example](https://github.com/riot/examples/tree/gh-pages/typescript) to setup your project config files.

### Compilation via Node

``` javascript
import {compile} from '@riotjs/compiler'

const { code, map } = compile('<p>{hello}</p>', {
  //...options
  file: 'my/path/to/my-component.riot',
  // transform the `:host` css rules
  scopedCss: true,
  // expressions delimiters
  brackets: ['{', '}'],
  // keep HTML comments
  comments: false
})
```

The compile function takes a string and returns an object containing the `code` and `map` keys.
You can handle the code generated however you like and use it in your build system.

Remember that the Riot compiler outputs JavaScript modules, and you might want to transpile them in your bundle.


### Compilation via Riot.js CLI

You can precompile Riot.js files also via the [`riot`](https://github.com/riot/cli) executable, which can be installed with NPM as follows:

```sh
npm install @riotjs/cli -g
```

#### Using

Here is how `riot` command works:

```sh
# compile a file to current folder
riot some.riot

# compile file to target folder
riot some.riot --output some-folder

# compile file to target path
riot some.riot --output some-folder/some.js

# compile all files from source folder to target folder
riot some/folder --output path/to/dist

```

For more information, type: `riot --help`

#### Watch mode

You can watch directories and automatically transform files when they are changed.

```sh
# watch for
riot -w src -o dist
```


#### Custom extension

You're free to use any file extension for your tags (instead of default `.riot`):

```sh
riot --extension html
```

#### ES6 Config file

You can use a config file to store and easily configure all of your `@riotjs/cli` options and create your custom parsers:

```sh
riot --config riot.config src
```

The riot `riot.config.js` file:

```js
export default {
  output: 'tags/dist',
  // sourcemap type
  sourcemap: 'inline',
  // files extension
  extension: 'foo'
}
```

If you want to use custom preprocessors in your project you should install `@riotjs/cli` as a `devDependency` and run it via npm scripts:


```json

{
  "scripts": {
    "build": "npx riot -c riot.config src"
  },
  "devDependencies": {
    "@riotjs/cli": "^9.0.0",
    "@riotjs/compiler": "^9.0.0",
    "pug": "^2.0.3"
  }
}
```

That's how your `riot.config.js` file might look like in case you want to use `pug` as components template engine.

```js
import { registerPreprocessor } from '@riotjs/compiler'
import { render } from 'pug'

// register the pug preprocessor
registerPreprocessor('template', 'pug', (code, options) => {
  const { file } = options

  return {
    code: render(code, {
      filename: file,
      pretty: true,
      doctype: 'html'
    })
  }
})

export default {
  extension: 'pug',

  // assign the pug preprocessor to the riot compiler options
  riot: {
    template: 'pug'
  }
}
```

#### Build your whole application

You can also use the CLI to bundle your entire application.

The `app.js` file:

```js
import {component} from 'riot'
import App from './app.riot'

component(App)(document.getElementById('root'))
```

```sh
riot app.js -o dist/app.js
```

Your `dist/app.js` file will contain all the Riot.js components imported in your application and the code to run it.

## Pre-processors

You can pre-process your components' contents using your favorite programming language.

The `@riotjs/compiler` gives the possibility to register your preprocessors:

```js
import { registerPreprocessor } from '@riotjs/compiler'
import pug from 'pug'
import sass from 'sass'
import babel from '@babel/core'

registerPreprocessor('template', 'pug', function(code, { options }) {
  const { file } = options
  console.log('Preprocess the template', file)

  return {
    code: pug.render(code),
    // no sourcemap here
    map: null
  }
})

registerPreprocessor('css', 'sass', function(code, { options }) {
  const { file } = options
  console.log('Compile the sass code in', file)

  return {
    code: sass.compileString(code, {syntax: 'indented'}).css,
    map: null
  }
})


registerPreprocessor('javascript', 'babel', function(code, { options }) {
  const { file } = options

  return babel.transform(code, {
    sourceFileName: file
  })
})
```

The Riot.js preprocessors can be only of three types: `template`, `css`, `javascript` (the first argument of the `registerPreprocessor` function).
To compile your components with a different template engine you will need to specify the `template` option via compiler:

```js
import { compile } from '@riotjs/compiler'

compile(source, {
  template: 'pug'
})
```

For the `css` and `javascript` preprocessors you can simply enable them directly in your components via `type="{preprocessor}"` attribute

```html
<my-component>
  <p>{getMessage}</p>

  <style type="scss">
    import 'color/vars'

    p {
      color: $primary;
    }
  </style>

  <script type="ts">
    export default {
      getMessage():string {
        return 'hello world'
      }
    }
  </script>
</my-component>
```

### Pre-processors Caveats

The Riot.js compiler generates sourcempas out of the code provided by the pre-processors. If your preprocessor will not provide any `map` output the compiler will not output proper sourcemaps.

```js

import { registerPreprocessor } from '@riotjs/compiler'
import babel from '@babel/core'

registerPreprocessor('javascript', 'babel', function(code, { options }) {
  // the babel.transform returns properly an object containing the keys {map, code}
  return babel.transform(code, {
    sourceMaps: true,
    // notice that whitelines should be preserved
    retainLines: true,
    sourceFileName: options.file,
    presets: [[
      '@babel/env',
      {
        targets: {
          edge: true
        },
        loose: true,
        modules: false,
        useBuiltIns: 'usage'
      }
    ]]
  })
})


registerPreprocessor('javascript', 'my-js-preprocessor', function(code, { options }) {
  // the Riot.js compiler will not be able to generate sourcemaps
  return {
    code: myPreprocessor(code),
    map: null
  }
})

```

The JavaScript preprocessors should preserve the code whitelines of the original source code. Otherwise the resulting sourcemap will have a broken offset.

## Post-processors

Similar to the preprocessor, the compiler output can be modified via `registerPostprocessor`:

```js
import { registerPostprocessor } from '@riotjs/compiler'
import buble from 'buble'

// your compiler output will pass from here
registerPostprocessor(function(code, { options }) {
  const { file } = options
  console.log('your file path is:', file)

  // notice that buble.transform returns {code, map}
  return buble.transform(code)
})
```

In this case we make sure that the output code will be converted to es2015 via `buble`.

### Compilation via Riot.js Online Compiler

Finally, you can also compile a tag online

[Riot.js Online Compiler](https://riot.js.org/online-compiler)
