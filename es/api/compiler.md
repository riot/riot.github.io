---
title: El compilador
layout: default
class: apidoc
---

{% include api-tabs.html %}

## En el navegador

Los siguientes métodos se aplican solo a los navegadores. Vaya a la [sección del servidor](#compile-on-server) si quiere compilar bajo node o io.js.

### <a name="compile"></a> riot.compile(callback)

Compila todas las etiquetas (<dfn lang="en">tags</dfn>) definidas con `<script type="riot/tag">` como JavaScript. Estas pueden ser definiciones en <dfn lang="en">scripts</dfn> incorporados en la página, o recursos externos que cargan scripts definidos con el atributo `src`. Después que todos los scripts son compilados, se llama al método `callback` dado. Por ejemplo:

```javascript
riot.compile(function() {
  var tags = riot.mount('*')
})
```

Puede omitir la llamada a `riot.compile` y solamente escribir:

```javascript
var tags = riot.mount('*')
```

pero no podrá saber cuándo se cargan y compilan los recursos externos, y el valor de retorno es un arreglo vacío si usted tiene scripts externos. Si todos los scripts son definidos en la página, puede omitir la etapa riot.compile.

Para más detalles, lea la [introducción general](/guide/compiler/) al compilador.

### <a name="compile-fn"></a> riot.compile(url, callback)

Carga el <abbr title="Uniform Resource Locator, por sus siglas en inglés">URL</abbr> dado y compila todos las etiquetas, después de lo cuál la función `callback` es llamada. Por ejemplo:

```javascript
riot.compile('my/tags.tag', function() {
  // las etiquetas cargadas están listas para ser usadas
})
```

### <a name="compile-tag"></a> riot.compile(tag)

Compila y ejecuta la etiqueta `tag` dada. Por ejemplo:

```html
<template id="my_tag">
  <my-tag>
    <p>Hola, mundo!</p>
  </my-tag>
</template>

<script>
riot.compile(my_tag.innerHTML)
</script>
```

Después de la llamada, usted puede usar `my-tag` de manera normal.

Se asume una definición de etiqueta si el primer carácter no-blanco es `<`, en caso contrario el argumento es considerado un URL.

Devuelve el código JavaScript compilado como una cadena de caracteres (string).

### <a name="compile-to-str"></a> riot.compile(tag, true)

Compila `tag` y lo devuelve como una cadena de caracteres. Solo se lleva a cabo la transformación de la etiqueta a JavaScript, sin ejecutarla en el navegador. Se puede usar éste método para medir el desempeño del compilador. Por ejemplo:

```js
var js = riot.compile(my_tag.innerHTML, true)
```

## <a name="compile-on-server"></a> En el servidor

Después de `npm install riot`, usted puede hacer lo siguiente:

```js
var riot = require('riot')

var js = riot.compile(tag)
```

La función `compile` toma la definición de la etiqueta (string) y devuelve JavaScript (string).

### <a name="css-parser"></a> riot.parsers.css [tagName, css]

Analizadores (<dfn lang="en">parsers</dfn>) personalizados que se pueden usar para compilar el contenido CSS de sus etiquetas. Por ejemplo:

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

será compilado como:

```html
<custom-parsers>
  <p>hi</p>
  <style type="text/myparser">
    custom-parsers {color: red;}
  </style>
</custom-parsers>
```

### <a name="js-parser"></a> riot.parsers.js [js, options]

Analizadores personalizados que se pueden usar para compilar el código JavaScript de sus etiquetas. Por ejemplo:

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

será compilado como:

```html
<custom-parsers>
  <p>hi</p>
  <script type="text/myparser">
    this.version = "1.0.0"
  </script>
</custom-parsers>
```

### <a name="html-parser"></a> riot.parsers.html [html]

Analizadores personalizados que pueden usarse para compilar el contenido HTML de sus etiquetas.
