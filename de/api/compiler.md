---
title: Compiler
layout: default
class: apidoc
---

{% include api-tabs.html %}

## On browser

Following methods apply to browsers only. Jump to [server section](#compile-on-server) if you want to compile under node or io.js.

### <a name="compile"></a> riot.compile(callback)

Compile all tags defined with `<script type="riot/tag">` to JavaScript. These can be inlined script definitions or external resources that load scripts defined with `src` attribute. After all scripts are compiled the given `callback` method is called. For example:

``` javascript
riot.compile(function() {
  var tags = riot.mount('*')
})
```

You can leave out the `riot.compile` call and write just:

``` javascript
var tags = riot.mount('*')
```

but you don't get to know when external resources are loaded and compiled and the return value is an empty array if you have external scripts. If all scripts are defined on the page then riot.compile step can be left out.

For more details, read the compiler [general introduction](/guide/compiler/).

### <a name="compile-fn"></a> riot.compile(url, callback)

Loads the given URL and compiles all tags after which the `callback` is called. For example:

``` javascript
riot.compile('my/tags.tag', function() {
  // the loaded tags are ready to be used
})
```

### <a name="compile-tag"></a> riot.compile(tag)

Compiles and executes the given `tag`. For example:

```
<template id="my_tag">
  <my-tag>
    <p>Hello, World!</p>
  </my-tag>
</template>

<script>
riot.compile(my_tag.innerHTML)
</script>
```

After the call you can use `my-tag` normally.

A tag definition is assumed if the first non- empty character is `<`, otherwise the argument is taken as URL.

@returns the compiled JavaScript as string

### <a name="compile-to-str"></a> riot.compile(tag, true)

Compiles the `tag` and returns it as a string. Only the transformation from the tag to JavaScript is performed and the tag is not executed on the browser. You can use this method to benchmark the compiler performance for example.

``` js
var js = riot.compile(my_tag.innerHTML, true)
```

## On server

After `npm install riot` you can do following:

```
var riot = require('riot')

var js = riot.compile(tag)
```

The compile function takes the tag definition (string) and returns JavaScript (string).

### <a name="css-parser"></a> riot.parsers.css [tagName, css]

Custom parsers that could be used to compile your tags css. For example:

```js
riot.parsers.css.myparser = function(tag, css) {
  return css.replace(/@tag/, tag)
}
```

```html
<custom-parsers>
  <p>hi</p>
  <style type="text/myparser">
    @tag {color: red;}
  </style>
</custom-parsers>
```

will be compiled to:

```html
<custom-parsers>
  <p>hi</p>
  <style type="text/myparser">
    custom-parsers {color: red;}
  </style>
</custom-parsers>
```

### <a name="js-parser"></a> riot.parsers.js [js, options]

Custom parsers that could be used to compile your tags javascript. For example

```js
riot.parsers.js.myparser = function(js) {
  return js.replace(/@version/, '1.0.0')
}
```

```html
<custom-parsers>
  <p>hi</p>
  <script type="text/myparser">
    this.version = "@version"
  </script>
</custom-parsers>
```

will be compiled to:

```html
<custom-parsers>
  <p>hi</p>
  <script type="text/myparser">
    this.version = "1.0.0"
  </script>
</custom-parsers>
```

### <a name="html-parser"></a> riot.parsers.html [html]

Custom parsers that could be used to compile your tags html


