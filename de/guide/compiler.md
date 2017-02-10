---
layout: default
title: Compiler
---

{% include guide-tabs.html %}

## In-browser compilation

Custom tags need to be transformed to JavaScript before the browser can execute them. You can do this by setting a `type="riot/tag"` attribute for your script tags. For example:


``` html
<!-- mount point -->
<my-tag></my-tag>

<!-- inlined tag definition -->
<script type="riot/tag">
  <my-tag>
    <h3>Tag layout</h3>
    <inner-tag />
  </my-tag>
</script>

<!-- <inner-tag/> is specified on external file -->
<script src="path/to/javascript/with-tags.js" type="riot/tag"></script>

<!-- include riot.js and the compiler -->
<script src="//cdn.jsdelivr.net/g/riot@2.2(riot.min.js+compiler.min.js)"></script>


<!-- mount normally -->
<script>
riot.mount('*')
</script>
```

The script tag and the external file can contain multiple tags definitions combined with regular javascript.

Riot automatically takes inlined and external tags and compiles them before the tags are rendered with the `riot.mount()` call.

### Access tag instances
If you are loading tags with `script src` and want to get access to the mounted tags you need to wrap the call with `riot.compile` as follows:

``` html
<script>
riot.compile(function() {
  // here tags are compiled and riot.mount works synchronously
  var tags = riot.mount('*')
})
</script>
```

### Compiler performance

Compilation phase is basically free and takes no time at all. Compiling a [timer tag](https://github.com/riot/riot/blob/master/test/tag/timer.tag) 30 times takes 2 milliseconds on a regular laptop. If you have a crazy page with 1000 different timer-sized tags, the compilation takes around 35ms.

The compiler weights only 3.2KB (1.7K gzipped) so you can safely perform client side compilation on production without download or performance or issues.

Read the [compiler API](/api/compiler/) for more details.


### Demos

- [In-browser compiled](http://muut.github.io/riotjs/demo/)
- [Pre-compiled](http://muut.github.io/riotjs/demo/)
- [Source code](https://github.com/riot/riot/tree/gh-pages/demo)
- Download the demo as a [zip file](https://github.com/riot/riot/archive/gh-pages.zip)



## Pre-compilation

Pre- compilation on the server gives you following benefits:

- Ability to compile tags with your [favorite pre-processor](#pre-processors).
- Small performance benefit. No need to load and execute the compiler on browser.
- Universal (isomorphic) apps and the ability to pre- render tags on the server (released soon).


Pre-compilation happens with a `riot` executable, which can be installed with NPM as follows:

``` sh
npm install riot -g
```

Type `riot --help` and make sure it works. [node.js](http://nodejs.org/) is required on your machine.

With pre-compilation your HTML is something like this:

``` html
<!-- mount point -->
<my-tag></my-tag>

<!-- include riot.js only -->
<script src="//cdn.jsdelivr.net/riot/2.2/riot.min.js"></script>

<!-- include pre-compiled tags (normal javascript) -->
<script src="path/to/javascript/with-tags.js"></script>

<!-- mount the same way -->
<script>
riot.mount('*')
</script>
```

### Using

Here is how `riot` command works:

``` sh
# compile a file to current folder
riot some.tag

# compile file to target folder
riot some.tag some_folder

# compile file to target path
riot some.tag some_folder/some.js

# compile all files from source folder to target folder
riot some/folder path/to/dist

# compile all files from source folder to a single concatenated file
riot some/folder all-my-tags.js

```

The source file can contain one or more custom tags and there can be regular JavaScript mixed together with custom tags. The compiler will only transform the custom tags and does not touch other parts of the source file.

For more information, type: `riot --help`


### Watch mode

You can watch directories and automatically transform files when they are changed.

``` sh
# watch for
riot -w src dist
```


### Custom extension

You're free to use any file extension for your tags (instead of default `.tag`):

``` sh
riot --ext html
```


### Node module

``` javascript
var riot = require('riot')

var js = riot.compile(source_string)
```

The compile function takes a string and returns a string.

### Plug into your workflow

- [Gulp](https://github.com/e-jigsaw/gulp-riot)
- [Grunt](https://github.com/ariesjia/grunt-riot)
- [Browserify](https://github.com/jhthorsen/riotify)


## Pre-processors

This is the main fruit of pre- compilation. You can use your favourite pre- processor to create custom tags. Both HTML and JavaScript processor can be customized.

The source language is specified with `--type` or `-t` argument on the command line or you can define the language on the script tag as follows:

``` html
<my-tag>
  <h3>My layout</h3>

  <script type="coffee">
    @hello = 'world'
  </script>
</my-tag>
```


### CoffeeScript

``` sh
# use coffeescript pre-processor
riot --type coffee --expr source.tag
```

The `--expr` argument specifies that all the expressions are also processed as well. You can also use "cs" as an alias to "coffee". Here is a sample tag written in CoffeeScript:

``` javascript
<kids>

  <h3 each={ kids[1 .. 2] }>{ name }</h3>

  # Here are the kids
  this.kids = [
    { name: "Max" }
    { name: "Ida" }
    { name: "Joe" }
  ]

</kids>
```

Note that `each` attribute is CoffeeScript as well. CoffeeScript must be present on your machine:

``` sh
npm install coffee-script -g
```


### EcmaScript 6

ECMAScript 6 is enabled with a type "es6":

``` sh
# use ES6 pre-processor
riot --type es6 source.tag
```

An sample tag written in ES6:

``` html
<test>

  <h3>{ test }</h3>

  var type = 'JavaScript'
  this.test = `This is ${type}`

</test>
```

All ECMAScript 6 [features](https://github.com/lukehoban/es6features) can be used. [Babel](https://babeljs.io/) is used for the transformation:

``` sh
npm install babel
```

Here is a [bigger example](https://github.com/txchen/feplay/tree/gh-pages/riot_babel) on using Babel with Riot.

### TypeScript

TypeScript adds optional static typing to JavaScript. Use `--type typescript` to enable it:

``` sh
# use TypeScript pre-processor
riot --type typescript source.tag
```

An sample tag written in TypeScript:

``` html
<test>

  <h3>{ test }</h3>

  var test: string = 'JavaScript';
  this.test = test;

</test>
```

[typescript-simple](https://github.com/teppeis/typescript-simple) is used for the transformation:

``` sh
npm install typescript-simple
```
### LiveScript

Check out [LiveScript](http://livescript.net) for language features and documentation.

The source language is specified with `--type` or `-t` argument:

``` sh
# use livescript pre-processor
riot --type livescript --expr source.tag
```

The `--expr` argument specifies that all the expressions are also processed as well. You can also use "ls" as an alias to "livescript". Here is a sample tag written in LiveScript:

``` html
<kids>

<h3 each={ kids[1 .. 2] }>{ name }</h3>

# Here are the kids
this.kids =
* name: \Max
* name: \Ida
* name: \Joe

</kids>
```

Note that `each` attribute is LiveScript as well. LiveScript must be present on your machine:

``` sh
npm install LiveScript -g
```

### Jade

HTML layout can be processed with `template` configuration option. Here's an example with Jade – a "clean, whitespace sensitive syntax for writing html"


``` sh
# use Jade HTML pre-processor
riot --template jade source.tag
```

A Jade sample:

``` jade
sample
  p test { value }
  script(type='text/coffee').
    @value = 'sample'
```

As you notice, you can define the script type on the template as well. Above we use coffee. [jade](https://github.com/jadejs/jade) is used for the transformation:

``` sh
npm install jade
```



### Any language

You can configure your favourite language by making a custom parser function. For example:

``` js
function myParser(js, options) {
  return doYourThing(js, options)
}
```

This parser is then passed for the compiler with `parser` option:

``` js
var riot = require('riot')

var js = riot.compile(source_string, { parser: myParser, expr: true })
```

Set `expr: true` if you want the expressions to be parsed as well.

#### riot.parsers on the browser and the server

You can also create your custom riot parsers adding them to the `riot.parsers` property and share them across the browsers and server. For example

```js
riot.parsers.js.myJsParser = function(js, options) {
  return doYourThing(js, options)
}

riot.parsers.css.myCssParser = function(tagName, css) {
  return doYourThing(tagName, css)
}
```

Once you have created your own `riot.parsers` you will be able to compile your tags using them in the following way

```html
<custom-parsers>
  <p>hi</p>
  <style type="text/myCssParser">
    @tag {color: red;}
  </style>
  <script type="text/myJsParser">
    this.version = "@version"
  </script>
</custom-parsers>
```




### No transformation

By default Riot uses a build-in transpiler that simply enables shorter ES6- stylish method signatures. You can disable all transformation with `--type none`:

``` sh
# no pre-processor
riot --type none --expr source.tag
```

### AMD and CommonJS

Riot tags can be compiled with `AMD` (Asynchronous Module Definition) and `CommonJS` support. This configuration option is necessary if Riot is used with an AMD loader such as [RequireJS](http://requirejs.org/) or a CommonJS loader such as [Browserify](http://browserify.org/).

The Riot library must be defined / required as `riot` in both cases.

``` sh
# enable AMD and CommonJS
riot --m
```

Example AMD:

``` js

define(['riot', 'tags'], function (riot) {
  riot.mount('*')
})
```

Example CommonJS:

``` js
var riot = require('riot')
var tags = require('tags')

riot.mount('*')
```


If you make something great, please [share it](https://github.com/riot/riot/issues/58) !
