---
title: Custom tags
layout: default
class: apidoc
---

{% include api-tabs.html %}


## Mounting

### <a name="mount"></a> riot.mount(customTagSelector, [opts])

`customTagSelector` selecciona los elementos de la página y los monta con una etiqueta personalizada. Los nombres de los elementos seleccionados deben coincidir con el nombre de la etiqueta personalizada.

El objeto opcional `opts` es pasado a las etiquetas para su consumo. Este puede ser cualquier cosa, desde un simple objeto a una API de aplicación completa. O puede ser un depósito Flux. Realmente depende de cómo quiere usted estructurar sus aplicaciones de lado cliente. Lea más acerca de [aplicaciones Riot modulares](/guide/application-design/#modularity).


``` js
// seleccina y monta todas las etiquetas <pricing> en la página
var tags = riot.mount('pricing')

// monta todas las etiquetas personalizadas con un nombre de clase .customer
var tags = riot.mount('.customer')

// monta la etiqueta <account> y le pasa un objeto API de opciones
var tags = riot.mount('account', api)
```

Devuelve: un arreglo con las [instancias de las etiquetas](#tag-instance) montadas.

### <a name="mount-star"></a> riot.mount('*', [opts])

El selector Riot especial "*" puede usarse para montar todas las etiquetas personalizadas en la página:

``` js
riot.mount('*')
```

Devuelve: un arreglo con las [instancias de las etiquetas](#tag-instance) montadas.

### <a name="mount-tag"></a> riot.mount(selector, tagName, [opts])

Donde

- `selector` selecciona no o más nodos DOM de la página para ser montados
- `tagName` especifica el nombre de la etiqueta personalizada a usarse
- `opts` es un objeto opcional pasado a las etiquetas para su consumo


``` js
// monta la etiqueta "my-tag" en div#main y le pasa api
var tags = riot.mount('div#main', 'my-tag', api)
```

Devuelve: un arreglo con las [instancias de las etiquetas](#tag-instance) montadas.

### <a name="mount-dom"></a> riot.mount(domNode, tagName, [opts])

Monta una etiqueta personalizada llamada `tagName` en un `domNode` dado, pasandole datos opcionales con `opts`. Por ejemplo:

```
// monta la etiqueta "users" en el nodo #slide y le pasa api
riot.mount(document.getElementById('slide'), 'users', api)
```

Devuelve: un arreglo con las [instancias de las etiquetas](#tag-instance) montadas.

### <a name="mount-to"></a> riot.mountTo(domNode, tagName, [opts])

Éste método está obsoleto desde la versión *2.0.11*. Es lo mismo que `riot.mount(domNode, tagName, [opts])`.




## Renderizado

### <a name="render"></a> riot.render(tagName, [opts])

Crea la representación (renderiza) una etiqueta como html. Este método solamente está disponible en el *lado servidor* (Node/io.js). Por ejemplo:

```
// renderiza "my-tag" a html
var mytag = require('my-tag')
riot.render(mytag, { foo: 'bar' })
```

Devuelve: las etiquetas representadas como html


## Instancias de etiquetas

Las siguientes propiedades se establecen para cada instancia de etiqueta:

- `opts` - el objeto de opciones
- `parent` - la etiqueta padre, si la hay
- `root` - nodo DOM raíz
- `tags` - etiquetas personalizadas anidadas


Usted puede usar estas referencias en el texto HTML y/o en el código JavaScript. Por ejemplo:


``` html
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


## Actualizando

### <a name="tag-update"></a> this.update()

Actualiza todas las expresiones de la instancia actual de la etiqueta, así como en todos los hijos. Este método es ejecutado automáticamente cada vez que un controlador de eventos se llama por la interacción del usuario con la aplicación.

Aparte de eso, riot no actualiza la interfaz de usuario automáticamente, por lo que deberá llamar a este método de forma explícita. Esto normalmente se hace después de algunos eventos no relacionados con la UI: después de `setTimeout`, una llamada AJAX o algún evento del servidor. Por ejemplo:

``` html
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

En el ejemplo anterior, el mensaje de error se muestra en la interfaz de usuario después de que el método `update()` se ha llamado. Asignamos `this` a la variable` self` debido a que, dentro de la función de retorno (callback) AJAX, la variable `this` apunta al objeto de la respuesta y no a la instancia de la etiqueta.

### <a name="tag-update-data"></a> this.update(data)

Establece los valores de la instancia actual y actualiza las expresiones. Esto es igual que `this.update()`, pero le permite establecer datos de contexto al mismo tiempo. Así que en lugar de esto:

``` js
self.error = error_message
self.update()
```

usted puede escribir esto:

``` js
self.update({ error: error_message })
```

lo cual es más corto y claro.

### <a name="update"></a> riot.update()

Actualiza todas las etiquetas montadas y sus expresiones en la página.

Devuelve: un arreglo de las [instancias de etiquetas](#tag-instance) que fueron montadas en la página.



## Desmontando

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

  // accede a la etiqueta hija
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

## <a name="yield"></a> Yielding nested HTML

The `<yield>` tag is a special riot core feature that allows you to inject and compile the content of any custom tag inside its template in runtime
This technique allows you to extend your tags templates with html contents rendered eventually from the server

For example using the following riot tag `my-post`

``` html
<my-post>
  <h1>{ opts.title }</h1>
  <yield/>
  this.id = 666
</my-post>
```

anytime you will include the `<my-post>` tag in your app

``` html
<my-post title="What a great title">
  <p id="my-content-{ id }">My beautiful post is just awesome</p>
</my-post>
```

once mounted `riot.mount('my-post')` it will be rendered in this way:

``` html
<my-post>
  <h1>What a great title</h1>
  <p id="my-content-666">My beautiful post is just awesome</p>
</my-post>
```

#### Yield and loops

The `<yield>` tag could be used also in a loop or in a child tag but you should be aware that __it will be always parsed and compiled using the child data__

The following `blog.tag` riot component


``` html
<blog>
  <h1>{ title }</h1>
  <my-post each={ posts }>
    <a href={ this.parent.backToHome }>Back to home</a>
    <div onclick={ this.parent.deleteAllPosts }>Delete all the posts</div>
  </my-post>

  this.backToHome = '/homepage'
  this.title = 'my blog title'

  this.posts = [
    { title: "post 1", description: 'my post description' },
    { title: "post 2", description: 'my post description' }
  ]

  // the bind is needed in this case to keep the parent context
  // also in the child tags
  deleteAllPosts() {
    this.posts = []

    // we need to trigger manually the update function
    // because this function gets triggered from a child tag
    // and it does not bubble up automatically
    this.update()
  }.bind(this)

</blog>

<my-post>
  <h2>{ title }</h2>
  <p>{ description }</p>
  <yield/>
</my-post>

```

will be compiled in this way:

``` html
<blog>
  <h1>my blog title</h1>
  <my-post>
    <h2>post 1</h2>
    <p>my post description</p>
    <a href="/homepage">Back to home</a>
    <div>Delete all the posts</div>
  </my-post>
  <my-post>
    <h2>post 2</h2>
    <p>my post description</p>
    <a href="/homepage">Back to home</a>
    <div>Delete all the posts</div>
  </my-post>
</blog>
```


## Events

Each tag instance is an [observable](#observable) so you can use `on` and `one` methods to listen to the events that happen on the tag instance. Here's the list of supported events:


- "update" – right before the tag is updated. allows recalculation of context data before the UI expressions are updated.
- "updated" – right after the tag is updated. allows do some work with updated DOM
- "mount" – right after tag is mounted on the page
- "unmount" – after the tag is removed from the page

For example:

``` js
// cleanup resources after tag is no longer part of DOM
this.on('unmount', function() {
  clearTimeout(timer)
})
```

## Reserved words

The above method and property names are reserved words for Riot tags. Don't use any of following as your instance variable or method name: `opts`, `parent`, `root`, `update`, `unmount`, `on`, `off`, `one` and `trigger`. Variables beginning with an underscore (e.g.: ```this._item```) are reserved for internal use too. Local variables can be freely named. For example:

``` javascript
<my-tag>

  // allowed
  function update() { } 

  // not allowed
  this.update = function() { }

  // not allowed
  update() {

  }

</my-tag>
```

## Manual construction

### <a name="tag"></a> riot.tag(tagName, html, [css], [attrs], [constructor])

Creates a new custom tag "manually" without the compiler.

- `tagName` the tag name
- `html` is the layout with [expressions](/guide/#expressions)
- `css` is the style for the tag (optional)
- `attrs` string of attributes for the tag (optional).
- `constructor` is the initialization function being called before the tag expressions are calculated and before the tag is mounted


#### Example

``` javascript
riot.tag('timer',
  '<p>Seconds Elapsed: { time }</p>',
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

See [timer demo](http://jsfiddle.net/gnumanth/h9kuozp5/) and [riot.tag](/api/#tag-instance) API docs for more details and *limitations*.


<span class="tag red">Warning</span> by using `riot.tag` you cannot enjoy the advantages of the compiler and the following features are not supported:

1. Self-closing tags
2. Unquoted expressions. Write `value="{ val }"` instead of `value={ val }`
3. Boolean attributes. Write `__checked="{ flag }"` instead of `checked={ flag }`
4. Shorthand ES6 method signatures
5. `<img src={ src }>` must be written as `<img riot-src={ src }>` in order to avoid illegal server requests
6. `style="color: { color }"` must be written as `riot-style="color: { color }"` so that style attribute expressions work in IE
7. Scoped CSS precompilation.


You can take advantage of `<template>` or `<script>` tags as follows:

``` html
<script type="tmpl" id="my_tmpl">
  <h3>{ opts.hello }</h3>
  <p>And a paragraph</p>
</script>

<script>
riot.tag('tag-name', my_tmpl.innerHTML, function(opts) {

})
</script>
```




