---
layout: default
title: El compilador
---

{% include guide-tabs.html %}

## Compilación en el navegador

Las etiquetas personalizadas[<sup>(1)</sup>](#note1) necesitan ser transformadas a JavaScript antes de que el navegador puede ejecutarlas. Usted puede hacer esto estableciendo un atributo `type="riot/tag"` en sus <dfn lang="en">scripts</dfn>. Por ejemplo:

```html
<!-- punto de montaje -->
<my-tag></my-tag>

<!-- definición de etiqueta en línea -->
<script type="riot/tag">
  <my-tag>
    <h3>Diseño de la etiqueta</h3>
    <inner-tag />
  </my-tag>
</script>

<!-- <inner-tag/> está especificada en un archivo externo -->
<script src="path/to/javascript/with-tags.js" type="riot/tag"></script>

<!-- incluya riot.js y el compilador -->
<script src="//cdn.jsdelivr.net/g/riot@2.2(riot.min.js+compiler.min.js)"></script>

<!-- montar normalmente -->
<script>
riot.mount('*')
</script>
```

El código de la etiqueta `script` y el del archivo externo pueden contener definiciones de varias etiquetas personalizadas combinadas con código JavaScript regular.

Riot toma automáticamente las etiquetas internas y externas, y las compila antes de que las etiquetas sean renderizadas con una llamada a `riot.mount()`.

<a name="note1">1)</a> _n.t._ La terminología de riot usa "custom tags" para nombrar sus etiquetas personalizadas. Esto crea cierta confusión con la palabra "tag" usada por HTML para nombrar el bloque básico de sus elementos. En realidad las etiquetas personalizadas de riot son componentes que combinan HTML, CSS y JavaScript, transformados por el compilador en JavaScript puro. Estos componentes, aunque similares a elementos HTML, usan un lenguaje combinado que puede "vivir" en un bloque especial de JavaScript, por lo cual en una página HTML deben insertarse dentro de un bloque <code>&lt;script&gt;</code> de tipo "riot/tag", o en un archivo externo.

### Acceso a instancias de las etiquetas

Si está cargando etiquetas con `script src` y desea tener acceso a las etiquetas montadas, necesita envolver la llamada con ` riot.compile` de la siguiente manera:

```html
<script>
riot.compile(function() {
  // aquí las etiquetas son compiladas y riot.mount trabaja síncronamente
  var tags = riot.mount('*')
})
</script>
```

### Desempeño del compilador

La fase de compilación prácticamente no toma tiempo. Compilar una [etiqueta timer](https://github.com/riot/riot/blob/master/test/tag/timer.tag) 30 veces toma 2 milisegundos en una laptop regular. Si usted tiene una página "alocada" con 1000 etiquetas diferentes del tamaño de `timer`, la compilación toma alrededor de 35ms.

El compilador pesa sólo 3.2 kb (1.7k gzip), así que puede realizar con seguridad la compilación en el cliente en producción sin problemas en la descarga o el rendimiento.

Lea el [API del compilador](/api/compiler/) para más detalles.


### Demos (en inglés)

- [Compilación en el navegador](http://muut.github.io/riotjs/demo/)
- [Precompilado](http://muut.github.io/riotjs/demo/)
- [Código fuente](https://github.com/riot/riot/tree/gh-pages/demo)
- Descargue el demo como un [archivo zip](https://github.com/riot/riot/archive/gh-pages.zip)



## Compilación previa

La precompilación en el servidor le brinda los siguientes beneficios:

- La habilidad de compilar etiquetas con su [preprocesador favorito](#preprocesadores)
- Beneficios en el desempeño. No hay necesidad de cargar y ejecutar el compilador en el navegador
- Aplicaciones universales (isomorfas) y la habilidad de pre-renderizar etiquetas en el servidor


La precompilación se lleva a cabo con un ejecutable `riot`, que puede ser instalado con NPM como sigue:

```sh
npm install riot -g
```

Escriba `riot --help` y asegúrese de que trabaja. Se requiere [node.js](http://nodejs.org/) instalado en su equipo.

Con la compilación previa, su HTML será algo así:

```html
<!-- punto de montaje -->
<my-tag></my-tag>

<!-- incluya riot.js solamente -->
<script src="//cdn.jsdelivr.net/riot/2.2/riot.min.js"></script>

<!-- incluya las etiquetas precompiladas (JavaScript normal) -->
<script src="path/to/javascript/with-tags.js"></script>

<!-- montar de la misma forma -->
<script>
riot.mount('*')
</script>
```

### Uso

He aquí como trabajan los comandos de `riot`:

```sh
# compila un archivo a la carpeta actual
riot some.tag

# compila un archivo a una carpeta diferente
riot some.tag some_folder

# compila el archivo a una ruta diferente
riot some.tag some_folder/some.js

# compila todos los archivos de la carpeta origen a una carpeta destino
riot some/folder path/to/dist

# compila todos los archivos de la carpeta origen a un único archivo
riot some/folder all-my-tags.js

```

El archivo de origen puede contener una o más etiquetas personalizadas y puede tener JavaScript regular mezclado con etiquetas personalizadas. El compilador sólo transformará las etiquetas personalizadas sin tocar otras partes del archivo de origen.

Para mayor información, escriba: `riot --help`


### Modo de observación (<dfn lang="en">Watch mode</dfn>)

Se pueden observar directorios y transformar los archivos automáticamente cuando éstos cambian.

```sh
# observar
riot -w src dist
```


### Extensiones personalizadas

Usted tiene la libertad de utilizar cualquier extensión de archivo para las etiquetas (en lugar de la extensión predeterminada `.tag`):

```sh
riot --ext html
```


## Módulo node

```js
var riot = require('riot')

var js = riot.compile(source_string)
```

La función `compile` toma y devuelve una cadena de caracteres.

### Incorpórelo a su flujo de trabajo

- [Gulp](https://github.com/e-jigsaw/gulp-riot)
- [Grunt](https://github.com/ariesjia/grunt-riot)
- [Browserify](https://github.com/jhthorsen/riotify)


## Preprocesadores

Este es el fruto principal de la compilación previa. Puede utilizar su preprocesador favorito para crear etiquetas personalizadas. Se pueden personalizar ambos preprocesadores, HTML y JavaScript.

El lenguaje fuente se especifica con el argumento `--type` o `-t` en la línea de comandos, o puede definir el lenguaje en la etiqueta script de la siguiente manera:

```html
<my-tag>
  <h3>Mi diseño</h3>

  <script type="coffee">
    @hola = 'mundo'
  </script>
</my-tag>
```


### CoffeeScript

```sh
# use el preprocesador coffee-script
riot --type coffee --expr source.tag
```

El argumento `--expr` especifica que todas las expresiones deberán ser procesadas también. He aquí una etiqueta de ejemplo escrita en CoffeeScript:

``` javascript
<kids>

  <h3 each={ kids[1 .. 2] }>{ name }</h3>

  # Aquí está kids
  this.kids = [
    { name: "Max" }
    { name: "Ida" }
    { name: "Joe" }
  ]

</kids>
```

Note que el atributo `each` también está en CoffeeScript. CoffeeScript debe estar instalado como un módulo de su aplicación:

```sh
npm install coffee-script
```


### EcmaScript 6

ECMAScript 6 se habilita con un tipo "es6":

```sh
# use el preprocesador ES6
riot --type es6 source.tag
```

Una etiqueta de ejemplo escrita en ES6:

```html
<test>

  <h3>{ test }</h3>

  var type = 'JavaScript'
  this.test = `Esto es ${type}`

</test>
```

Se pueden usar todas las [características de ECMAScript 6](https://github.com/lukehoban/es6features). Se usa [Babel](https://babeljs.io/) para la transformación:

```sh
npm install babel
```

Aquí está un [mayor ejemplo](https://github.com/txchen/feplay/tree/gh-pages/riot_babel) del uso de Babel con Riot.

### TypeScript

TypeScript agrega tipos estáticos opcionales a JavaScript. Use `--type typescript` para habilitarlo:

```sh
# use el preprocesador TypeScript
riot --type typescript source.tag
```

Una etiqueta de ejemplo en TypeScript:

```html
<test>

  <h3>{ test }</h3>

  var test: string = 'JavaScript';
  this.test = test;

</test>
```

Se usa [typescript-simple](https://github.com/teppeis/typescript-simple) para la transformación:

```sh
npm install typescript-simple
```

### LiveScript

Vea [LiveScript](http://livescript.net) para la documentación y características de este lenguage.

El lenguaje se especifica con los parámetros `--type` o `-t`:

```sh
# use el preprocesador livescript
riot --type livescript --expr source.tag
```

El argumento `--expr` especifica que todas las expresiones deberán ser procesadas también. He aquí una etiqueta de ejemplo escrita en LiveScript:

```html
<kids>

<h3 each={ kids[1 .. 2] }>{ name }</h3>

# Aquí está kids
this.kids =
* name: \Max
* name: \Ida
* name: \Joe

</kids>
```

Note que el atributo `each` también está en LiveScript. LiveScript debe estar instalado como un módulo de su aplicación:

```sh
npm install LiveScript
```

### Jade

El diseño HTML puede ser procesado con la opción de configuración `template`. He aquí un ejemplo con Jade – una "clara sintaxis, sensitiva a espacios, para escribir html"

```sh
# use el preprocesador Jade HTML
riot --template jade source.tag
```

Un ejemplo con Jade:

```jade
sample
  p test { value }
  script(type='text/coffee').
    @value = 'ejemplo'
```

Como usted habrá notado, se puede definir el tipo de secuencia de comandos en la plantilla también. En el ejemplo usamos coffee. [jade](https://github.com/jadejs/jade) es usado para la transformación:

```sh
npm install jade
```


### Cualquier lenguaje

Puede configurar su lenguaje favorito creando una función para como analizador personalizado. Por ejemplo:

```js
function myParser(js, options) {
  return doYourThing(js, options)
}
```

Este analizador es pasado al compilador con la opción `parser`:

``` js
var riot = require('riot')

var js = riot.compile(source_string, { parser: myParser, expr: true })
```

Establezca `expr: true` si quiere que las expresiones también sean procesadas.

#### riot.parsers en el navegador y en el servidor

También puede crear sus analizadores riot personalizados agregándolos a la propiedad `riot.parsers` y compartirlos con navegadores y servidores. Por ejemplo:

```js
riot.parsers.js.myJsParser = function(js, options) {
  return doYourThing(js, options)
}

riot.parsers.css.myCssParser = function(tagName, css) {
  return doYourThing(tagName, css)
}
```

Una vez que haya creado su `riot.parsers` propio, podrá compilar sus etiquetas usándolos de la manera siguiente:

```html
<custom-parsers>
  <p>hola</p>
  <style type="text/myCssParser">
    @tag {color: red;}
  </style>
  <script type="text/myJsParser">
    this.version = "@version"
  </script>
</custom-parsers>
```

### Sin transformación

De forma predeterminada, Riot utiliza una transcompilador (<dfn lang="en">transpiler</dfn> incorporado que simplemente permite una forma abreviada de definir métodos estilo ES6. Puede desactivar toda transformación con `--type none`:

```sh
# sin preprocesador
riot --type none --expr source.tag
```

### AMD y CommonJS

Las etiquetas Riot pueden compiladas con soporte `AMD` (<dfn lang="en">Asynchronous Module Definition</dfn>) o `CommonJS`. Esta opción de configuración es necesaria si Riot se utiliza con un cargador AMD, como [RequireJS](http://requirejs.org/) o un cargador CommonJS, como [Browserify](http://browserify.org/).

La biblioteca Riot debe ser definida/requerida como `riot` en ambos casos.

```sh
# habilitar AMD y CommonJS
riot --m
```

Ejemplo con AMD:

```js

define(['riot', 'tags'], function (riot) {
  riot.mount('*')
})
```

Ejemplo con CommonJS:

``` js
var riot = require('riot')
var tags = require('tags')

riot.mount('*')
```


Si usted crea algo notable, por favor ¡[compártalo](https://github.com/riot/riot/issues/58)!
