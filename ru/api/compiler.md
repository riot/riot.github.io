---
title: Компилятор
layout: ru
class: apidoc
---

{% include ru/api-tabs.html %}

## В браузере

Следующие методы применимы только в браузере. Смотрите [серверные методы](#compile-on-server) если используете компиляцию на сервере.

### <a name="compile"></a> riot.compile(callback)

Компиляция в JavaScript всех тегов с типом `<script type="riot/tag">`. Они могут быть встроены в страницу, или могут быть подключены как внешний ресурс с помощью атрибута `src`. После того как все теги скомпилируются, вызывается метод `callback`. Например:

``` javascript
riot.compile(function() {
  var tags = riot.mount('*')
})
```

Вы можете опустить метод `riot.compile` и писать просто:

``` javascript
var tags = riot.mount('*')
```

но так вы не сможете определить когда пользовательские теги были загружены и скомпилированы.

Для более подробной информации, смотрите [основное описание](/guide/compiler/).

### <a name="compile-fn"></a> riot.compile(url, callback)

Загружает и компилирует все теги, которые содержатся в ресурсе по URL. После компиляции вызывается `callback`. Например:

``` javascript
riot.compile('my/tags.tag', function() {
  // загруженные теги готовы к использованию
})
```

### <a name="compile-tag"></a> riot.compile(tag)

Компилирует и выполняет полученный тег `tag`. Например:

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

После вызова, вы можете использовать `my-tag` как обычно.

Предполагается, что первый непробельный символ строки - `<`, в противном случае аргумент воспринимается как URL.

@returns скомпилированный JavaScript в виде строка

### <a name="compile-to-str"></a> riot.compile(tag, true)

Компилирует `tag` и возвращает его в виде строки. Выполняется только трансформация тега в JavaScript, но полученный тег не исполняется в браузере. Вы можете использовать этот метод, например, для сравнения производительности компилятора.

``` js
var js = riot.compile(my_tag.innerHTML, true)
```

## На сервере

После того, как вы установите riot (`npm install riot`), вы сможете использовать следующий функционал:

```
var riot = require('riot')

var js = riot.compile(tag)
```

Принимает пользовательский тег в виде строки и возвращает JavaScript так же в виде строки.

### <a name="css-parser"></a> riot.parsers.css [tagName, css]

Пользовательские парсеры, которые могут быть использованы для компиляции CSS. Например:

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

скомпилируется в:

```html
<custom-parsers>
  <p>hi</p>
  <style type="text/myparser">
    custom-parsers {color: red;}
  </style>
</custom-parsers>
```

### <a name="js-parser"></a> riot.parsers.js [js, options]

Пользовательские парсеры, которые могут быть использованы для компиляции javascript. Например:

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

скомпилируется в:

```html
<custom-parsers>
  <p>hi</p>
  <script type="text/myparser">
    this.version = "1.0.0"
  </script>
</custom-parsers>
```

### <a name="html-parser"></a> riot.parsers.html [html]

Пользовательские парсеры, которые могут быть использованы для компиляции html.
