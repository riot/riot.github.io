---
title: Etiquetas personalizadas
layout: default
class: apidoc
---

{% include api-tabs.html %}


## Montaje

### <a name="mount"></a> riot.mount(customTagSelector, [opts])

`customTagSelector` selecciona elementos de la página y los monta con una etiqueta personalizada. Los nombres de los elementos seleccionados deben coincidir con el nombre de la etiqueta personalizada.

El objeto opcional `opts` es pasado a las etiquetas para su consumo. Este puede ser cualquier cosa, desde un simple objeto a una API de aplicación completa. O puede ser un depósito <dfn lang="en">Flux</dfn>. Realmente depende de cómo quiera usted estructurar sus aplicaciones de lado cliente. Lea más acerca de las [aplicaciones Riot modulares](/guide/application-design/#modularity).


```js
// seleccina y monta todas las etiquetas <pricing> en la página
var tags = riot.mount('pricing')

// monta todas las etiquetas personalizadas con un nombre de clase .customer
var tags = riot.mount('.customer')

// monta la etiqueta <account> y le pasa un objeto API de opciones
var tags = riot.mount('account', api)
```

Devuelve: un arreglo con las [instancias de las etiquetas](#tag-instance) montadas.

### <a name="mount-star"></a> riot.mount('\*', [opts])

El selector Riot especial "\*" puede usarse para montar todas las etiquetas personalizadas en la página:

```js
riot.mount('*')
```

Devuelve: un arreglo con las [instancias de las etiquetas](#tag-instance) montadas.

### <a name="mount-tag"></a> riot.mount(selector, tagName, [opts])

Donde

- `selector` selecciona uno o más nodos DOM de la página para ser montados
- `tagName` especifica el nombre de la etiqueta personalizada a usarse
- `opts` es un objeto opcional pasado a las etiquetas para su consumo


```js
// monta la etiqueta "my-tag" en div#main y le pasa api
var tags = riot.mount('div#main', 'my-tag', api)
```

Devuelve: un arreglo con las [instancias de las etiquetas](#tag-instance) montadas.

### <a name="mount-dom"></a> riot.mount(domNode, tagName, [opts])

Monta una etiqueta personalizada llamada `tagName` en un `domNode` dado, pasándole datos opcionales con `opts`. Por ejemplo:

```js
// monta la etiqueta "users" en el nodo #slide y le pasa api
riot.mount(document.getElementById('slide'), 'users', api)
```

Devuelve: un arreglo con las [instancias de las etiquetas](#tag-instance) montadas.

### <a name="mount-to"></a> riot.mountTo(domNode, tagName, [opts])

Éste método está obsoleto desde la versión *2.0.11*. Es lo mismo que `riot.mount(domNode, tagName, [opts])`.


## Renderizado

### <a name="render"></a> riot.render(tagName, [opts])

Crea la representación (renderiza) una etiqueta como html. Este método solamente está disponible en el *lado servidor* (Node/io.js). Por ejemplo:

```js
// renderiza "my-tag" a html
var mytag = require('my-tag')
riot.render(mytag, { foo: 'bar' })
```

Devuelve: las etiquetas representadas como HTML


## <a name="tag-instance"></a> Instancias de etiquetas

Las siguientes propiedades se establecen para cada instancia de etiqueta:

- `opts` - el objeto de opciones
- `parent` - la etiqueta padre, si la hay
- `root` - nodo DOM raíz
- `tags` - etiquetas personalizadas anidadas


Usted puede usar estas referencias en el texto HTML y/o en el código JavaScript. Por ejemplo:


```html
<my-tag>
  <h3>{ opts.title }</h3>

  var title = opts.title
</my-tag>
```

Puede establecer libremente cualquier dato de la instancia (aka "contexto") y éste estará disponible en las expresiones HTML. Por ejemplo:

``` html
<my-tag>
  <h3>{ title }</h3>

  this.title = opts.title
</my-tag>
```


## Actualización

### <a name="tag-update"></a> this.update()

Actualiza todas las expresiones de la instancia actual de la etiqueta, así como en todas las hijas. Este método es ejecutado automáticamente cada vez que un controlador de eventos es llamado por la interacción del usuario con la aplicación.

Aparte de eso, riot no actualiza la interfaz de usuario automáticamente, por lo que deberá llamar a este método de forma explícita. Esto normalmente se hace después de algunos eventos no relacionados con la UI: después de `setTimeout`, una llamada AJAX, o algún evento del servidor. Por ejemplo:

```html
<my-tag>

  <input name="username" onblur={ validate }>
  <span class="tooltip" show={ error }>{ error }</span>

  var self = this

  validate() {
    $.get('/validate/username/' + this.username.value)
      .fail(function(error_message) {
        self.error = error_message
        self.update()
      })
  }
</my-tag>
```

En el ejemplo anterior, el mensaje de error se muestra en la interfaz de usuario después de que el método `update()` se ha llamado. Asignamos `this` a la variable `self` debido a que, dentro de la función de retorno (callback) AJAX, la variable `this` apunta al objeto de la respuesta y no a la instancia de la etiqueta.

### <a name="tag-update-data"></a> this.update(data)

Establece los valores de la instancia actual y actualiza las expresiones. Esto es igual que `this.update()`, pero le permite establecer los datos de contexto al mismo tiempo. Así que en lugar de esto:

```js
self.error = error_message
self.update()
```

usted puede escribir esto:

```js
self.update({ error: error_message })
```

lo cual es más corto y claro.

### <a name="update"></a> riot.update()

Actualiza todas las etiquetas montadas y sus expresiones en la página.

Devuelve: un arreglo de las [instancias de etiquetas](#tag-instance) que fueron montadas en la página.


## Desmontaje

### <a name="tag-unmount"></a> this.unmount(keepTheParent)

Separa la etiqueta y sus "hijas" de la página. Se dispara un evento "unmount".
Si desea desmontar una etiqueta sin remover la etiqueta principal, necesita pasar `true` al método unmount.

Remueve la etiqueta `mytag` del DOM:

``` js
mytag.unmount()
```

Remueve las etiquetas hijas conservando solamente la etiqueta principal:

``` js
mytag.unmount(true)
```

## Etiquetas anidadas

Usted tiene acceso a las etiquetas anidadas vía la variable `tags`:

``` html
<my-tag>

  <child></child>

  // accede a la etiqueta hija "child"
  var child = this.tags.child

</my-tag>
```

Si se utiliza más de una misma etiqueta hija, se accede a ella como en una matriz `this.tags.child[n]`

Puede también usar el atributo `name` para dar otro nombre a la etiqueta anidada.

``` html
<my-tag>

  <child name="my_nested_tag"></child>

  // accede a la etiqueta hija
  var child = this.tags.my_nested_tag

</my-tag>
```

Las etiquetas hijas se inicializan después de la etiqueta principal, por lo que sus métodos y propiedades están disponibles en el evento "mount".

``` html
<my-tag>

  <child name="my_nested_tag"></child>

  // accede a métodos de la etiqueta hija
  this.on('mount', function() {
    this.tags.my_nested_tag.someMethod()
  })

</my-tag>
```

## <a name="yield"></a> Produciendo HTML anidado con Yield

La etiqueta `<yield>` es una característica especial del núcleo de riot que le permite inyectar y compilar el contenido de cualquier etiqueta personalizada a su plantilla en tiempo de ejecución.
Esta técnica le permite ampliar sus plantillas de etiquetas con contenido HTML renderizado eventualmente desde el servidor.

Por ejemplo, al usar la siguiente etiqueta riot `my-post`

``` html
<my-post>
  <h1>{ opts.title }</h1>
  <yield/>
  this.id = 666
</my-post>
```

e incluir la etiqueta `<my-post>` en su aplicación

``` html
<my-post title="Qué gran título">
  <p id="my-content-{ id }">Mi hermosa publicación es impresionante</p>
</my-post>
```

una vez montada con `riot.mount('my-post')` será generada así:

``` html
<my-post>
  <h1>Qué gran título</h1>
  <p id="my-content-666">Mi hermosa publicación es impresionante</p>
</my-post>
```

#### Yield y bucles

La etiqueta `<yield>` puede ser usada también en un bucle o en una etiqueta hija, pero debe tener en cuenta que ésta __siempre será compilada usando los datos del bucle o la etiqueta hija__.

El siguiente componente `blog.tag` de riot

``` html
<blog>
  <h1>{ title }</h1>
  <my-post each={ posts }>
    <a href={ this.parent.backToHome }>Regresar a Inicio</a>
    <div onclick={ this.parent.deleteAllPosts }>Eliminar todas las publicaciones</div>
  </my-post>

  this.backToHome = '/homepage'
  this.title = 'Título de mi blog'

  this.posts = [
    { title: "post 1", description: 'descripción de mi publicación' },
    { title: "post 2", description: 'descripción de mi publicación' }
  ]

  // `bind` es necesario en este caso para conservar el contexto principal
  // (de la etiqueta madre) también en las etiquetas hijas
  deleteAllPosts() {
    this.posts = []

    // tenemos que ejecutar manualmente la función update porque
    // esta función se activa desde una etiqueta hija y no se
    // replica automáticamente a la etiqueta madre.
    this.update()
  }.bind(this)

</blog>

<my-post>
  <h2>{ title }</h2>
  <p>{ description }</p>
  <yield/>
</my-post>

```

será compilado en esta manera:

``` html
<blog>
  <h1>Título de mi blog</h1>
  <my-post>
    <h2>post 1</h2>
    <p>descripción de mi publicación</p>
    <a href="/homepage">Regresar a Inicio</a>
    <div>Eliminar todas las publicaciones</div>
  </my-post>
  <my-post>
    <h2>post 2</h2>
    <p>descripción de mi publicación</p>
    <a href="/homepage">Regresar a Inicio</a>
    <div>Eliminar todas las publicaciones</div>
  </my-post>
</blog>
```


## Eventos

Cada instancia de etiqueta es un [observable](#observable), así que usted puede usar los métodos `on` y `one` para "escuchar" los eventos que suceden en la instancia de la etiqueta. Esta es una lista de los eventos soportados:


- "update" – Sucede justo antes de que la etiqueta se actualice. Permite la modificación de los datos del contexto antes de que las expresiones de la UI sean reevaluadas
- "updated" – Sucede después de que la etiqueta es actualizada. Permite trabajar con el DOM ya actualizado
- "mount" – Sucede después de que la etiqueta es montada en la página
- "unmount" – Sucede después de que la etiqueta es removida de la página

Por ejemplo:

``` js
// limpia los recursos después que la etiqueta ya no es parte del DOM
this.on('unmount', function() {
  clearTimeout(timer)
})
```

## Palabras reservadas

Los nombres de los métodos y propiedades anteriores están reservados para las etiquetas de Riot. No use ninguno de los siguientes nombres para sus métodos o variables de instancia: `opts`, `parent`, `root`, `update`, `unmount`, `on`, `off`, `one` and `trigger`. Las variables que comienzan con un subrayado (ej.: ```this._item```) también están reservadas para uso interno. Las variables locales pueden ser nombradas libremente. Por ejemplo:

``` javascript
<my-tag>

  // permitido
  function update() { } 

  // no permitido
  this.update = function() { }

  // no permitido
  update() {

  }

</my-tag>
```

## Construcción manual

### <a name="tag"></a> riot.tag(tagName, html, [css], [attrs], [constructor])

Crea una nueva etiqueta personalizada "manualmente", sin el compilador.

- `tagName` - El nombre de la etiqueta
- `html` - Es el diseño con [expresiones](/guide/#expressions)
- `css` - Es el estilo para la etiqueta (opcional)
- `attrs` - Cadena de caracteres con los atributos para la etiqueta (opcional).
- `constructor` - Función de inicialización llamada antes de que las expresiones de la etiqueta sean calculadas y antes de que la etiqueta sea montada


#### Ejemplo

``` javascript
riot.tag('timer',
  '<p>Segundos transcurridos: { time }</p>',
  'timer { display: block; border: 2px }',
  'class="tic-toc"',
  function (opts) {
    var self = this
    this.time = opts.start || 0

    this.tick = function () {
      self.update({ time: ++self.time })
    }

    var timer = setInterval(this.tick, 1000)

    this.on('unmount', function () {
      clearInterval(timer)
    })

  })
```

Vea el [demo timer](http://jsfiddle.net/gnumanth/h9kuozp5/) y la documentación de la API de [riot.tag](/api/#tag-instance) para más detalles y *limitaciones*.


<span class="tag red">Cuidado</span> al usar `riot.tag` no podrá disfrutar de las ventajas del compilador ni las siguientes características que no están soportadas por ésta función:

1. Etiquetas de cierre automático (terminadas en "/>")
2. Expresiones no entrecomilladas. Debe escribir `value="{ val }"` en lugar de `value={ val }`
3. Atributos booleanos. Debe escribir `__checked="{ flag }"` en lugar de `checked={ flag }`
4. Formato abreviado para métodos estilo ES6
5. `<img src={ src }>` debe escribirse como `<img riot-src={ src }>` para evitar solicitudes ilegales al servidor
6. `style="color: { color }"` debe escribirse como `riot-style="color: { color }"` para que las expresiones en los estilos funcionen en IE
7. Precompilación de <dfn lang="en">Scoped CSS</dfn> (estilos limitados al contexto).


Puede tomar ventaja de las etiquetas `<template>` o `<script>` como se muestra:

``` html
<script type="tmpl" id="my_tmpl">
  <h3>{ opts.hello }</h3>
  <p>Y un párrafo</p>
</script>

<script>
riot.tag('tag-name', my_tmpl.innerHTML, function(opts) {

})
</script>
```
