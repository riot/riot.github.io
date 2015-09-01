---
title: 编译器
layout: zh
class: apidoc
---

{% include zh/api-tabs.html %}

## On browser 

以下方法仅适用于浏览器内编译器. 如果希望用node或io.js编译，请参考 [服务端编译](#compile-on-server) .

### <a name="compile"></a> riot.compile(callback) 

将所有用 `<script type="riot/tag">` 定义的标签编译成 JavaScript. 这些标签可以是页面上的脚本定义或用 script `src` 属性加载的外部资源。 当所有脚本被编译完成后会调用指定的 `callback` 方法。 例如:

``` javascript
riot.compile(function() {
  var tags = riot.mount('*')
})
```

可以省去 `riot.compile` 直接写:

``` javascript
var tags = riot.mount('*')
```

但我们无法确定外部资源何时被加载和编译完成，所以如果有外部脚本，riot.mount的返回值可能是空数组。所以只有当所有的脚本定义在当前页面上时才能省略掉 riot.compile。

了解更多细节，请阅读编译器 [介绍](/riotjs/compiler.html).

### <a name="compile-fn"></a> riot.compile(url, callback)

加载指定的 URL 并编译所有的标签，编译完成后调用 `callback` 。例如:

``` javascript
riot.compile('my/tags.tag', function() {
  // 加载的标签定义已经可用
})
```

### <a name="compile-tag"></a> riot.compile(tag)

编译并执行指定的 `tag`. 例如:

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

调用返回后可以正常使用 `my-tag` .

如果第一个非空字符是 `<` 其内容被认为是一个标签定义，否则被认为是一个 URL

@返回值 编译生成的 JavaScript 代码字符串

### <a name="compile-to-str"></a> riot.compile(tag, true)

将 `tag` 编译成字符串。Only the transformation from the tag to JavaScript is performed and the tag is not executed on the browser. You can use this method to benchmark the compiler performance for example.

``` js
var js = riot.compile(my_tag.innerHTML, true)
```

## 服务端编译

`npm install riot` 后你可以做这些:

```
var riot = require('riot')

var js = riot.compile(tag)
```

`compile` 函数参数是标签定义字符串，返回 JavaScript 字符串.

### <a name="css-parser"></a> riot.parser.css [tagName, css]

可以使用自定义的预处理器来处理标签中的css. 例如

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

将被编译为：

```html
<custom-parsers>
  <p>hi</p>
  <style type="text/myparser">
    custom-parsers {color: red;}
  </style>
</custom-parsers>
```

### <a name="js-parser"></a> riot.parsers.js [js, options]

可以使用自定义的预处理器来处理标签中的javascript. 例如

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

将被编译为:

```html
<custom-parsers>
  <p>hi</p>
  <script type="text/myparser">
    this.version = "1.0.0"
  </script>
</custom-parsers>
```

### <a name="html-parser"></a> riot.parsers.html [html]

指定用来编译html的自定义编译器