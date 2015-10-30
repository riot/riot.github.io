---
title: Compiler
layout: default
class: apidoc
---

{% include api-tabs.html %}

## En el navegador

Los siguientes métodos se aplican solo a los navegadores. Vaya a la [sección del servidor](#compile-on-server) si quiere compilar bajo node o io.js.

### <a name="compile"></a> riot.compile(callback)

Compila todas las etiquetas (tags) definidas con `<script type="riot/tag">` como JavaScript. Estas pueden ser definiciones en scripts incrustados o recursos externos que cargan scripts definidos con el atributo `src`. Después que todos los scripts son compilados, se llama al método `callback` dado. Por ejemplo:

``` javascript
riot.compile(function() {
  var tags = riot.mount('*')
})
```

Puede omitir la llamada a `riot.compile` y solamente escribir:

``` javascript
var tags = riot.mount('*')
```

pero no podrá saber cuándo se cargan y compilan los recursos externos, y el valor de retorno es un arreglo vacío si usted tiene scripts externos. Si todos los scripts son definidos en la página, puede omitir la etapa riot.compile.

Para más detalles, lea la [introducción general](/guide/compiler/) al compilador.

### <a name="compile-fn"></a> riot.compile(url, callback)

Carga el URL dado y compila todos las etiquetas, después de lo cuál el `callback` es llamado. Por ejemplo:

``` javascript
riot.compile('my/tags.tag', function() {
  // los tags cargados están listos para ser usados
})
```

### <a name="compile-tag"></a> riot.compile(tag)

Compila y ejecuta el `tag` dado. Por ejemplo:

```
<template id="my_tag">
  <my-tag>
    <p>Hola, mundo!</p>
  </my-tag>
</template>

<script>
riot.compile(my_tag.innerHTML)
</script>
```

Después de la llamada, usted puede usar `my-tag` normalmente.

Se asume una definición de etiqueta si el primer carácter no-blanco es `<`, en caso contrario, el argumento es considerado un URL.

Devuelve el código JavaScript compilado como una cadena de caracteres (string).

### <a name="compile-to-str"></a> riot.compile(tag, true)

Compila `tag` y lo devuelve como una cadena. Solo se lleva a cabo la transformación de la etiqueta a JavaScript, la etiqueta no es ejecutada en el navegador. Se puede usar éste método para medir el desempeño del compilador. Por ejemplo.

``` js
var js = riot.compile(my_tag.innerHTML, true)
```

## <a name="compile-on-server"></a> En el servidor

Después de `npm install riot`, usted puede hacer lo siguiente:

```
var riot = require('riot')

var js = riot.compile(tag)
```

La función compile toma la definición de la etiqueta (string) y devuelve JavaScript (string).

### <a name="css-parser"></a> riot.parsers.css [tagName, css]

Analizadores (parsers) personalizados que se pueden usar para compilar el contenido css de sus etiquetas. Por ejemplo:

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

Analizadores personalizados que se pueden usar para compilar el código JavaScript de sus etiquetas. Por ejemplo

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

Analizadores personalizados que pueden usarse para compilar el contenido html de sus etiquetas.

