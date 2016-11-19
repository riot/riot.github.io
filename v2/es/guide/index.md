---
layout: es
title: Etiquetas personalizadas
---

{% include es/guide-tabs.html %}

## Ejemplo

Las etiquetas personalizadas (<dfn lang="en">custom tags</dfn>) de Riot son los bloques de construcción para la interfaz de usuario. Ellas representan la parte visual de la aplicación (<dfn lang="es">View</dfn> en el modelo MVC). Comencemos con un ejemplo <abbr title="El típico “Cosas por hacer”, o “To Do”, en inglés)">TODO</abbr> extendido que destaca varias características de Riot:

```html
<todo>

  <h3>{ opts.title }</h3>

  <ul>
    <li each={ items }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggle }> { title }
      </label>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input name="input" onkeyup={ edit }>
    <button disabled={ !text }>Agregar #{ items.length + 1 }</button>
  </form>

  <script>
    this.disabled = true

    this.items = opts.items

    edit(e) {
      this.text = e.target.value
    }

    add(e) {
      if (this.text) {
        this.items.push({ title: this.text })
        this.text = this.input.value = ''
      }
    }

    toggle(e) {
      var item = e.item
      item.done = !item.done
      return true
    }
  </script>

</todo>
```

Las etiquetas personalizadas son [compiladas](/guide/compiler/) a JavaScript.

Vea el [demo en vivo](http://muut.github.io/riotjs/demo/), examine el [código fuente](https://github.com/riot/riot/tree/gh-pages/demo), o descargue el [archivo zip](https://github.com/riot/riot/archive/gh-pages.zip).


## Sintaxis de las etiquetas

Una etiqueta Riot es una combinación de diseño (HTML) y lógica (JavaScript). He aquí las reglas básicas:

* Primero se define el HTML y la lógica es encerrada dentro de una etiqueta `<script>` opcional. *nota: la etiqueta script no se puede utilizar en definiciones de etiquetas dentro del cuerpo del documento, solamente en archivos de .tag externos*
* Sin la etiqueta `<script>`, el código JavaScript inicia donde la última etiqueta HTML termina.
* Las etiquetas personalizadas pueden estar vacías, o contener HTML o JavaScript solamente.
* Las comillas son opcionales: `<foo bar={ baz }>` se convierte a `<foo bar="{ baz }">`.
* Se soporta la sintaxis de métodos ES6: `methodName()` se convierte a `this.methodName = function()` y la variable `this` siempre apunta a la instancia de la etiqueta actual.
* Está disponible un sintáxis abreviada para nombres de clases: `class={ completed: done }` se renderiza a `class="completed"` cuando el valor de `done` es verdadero.
* Los atributos booleanos (checked, selected, etc.) se ignoran cuando el valor de la expresión es falso o vacío: `<input checked={ undefined }>` se convierte a `<input>`.
* Todos los nombres de los atributos *deben estar en minúsculas*. Esto se debe a las especificaciones de los navegadores.
* Se soportan etiquetas cerradas: `<div/>` es igual a `<div></div>`. Las "etiquetas abiertas" conocidas, como `<br>`, `<hr>`, `<img>` o `<input>` se dejan siempre abiertas después la compilación.
* Las etiquetas personalizadas necesitan cerrarse siempre (finalizarse con `/>` o con su etiqueta de cierre).
* Las etiquetas HTML estándar (`label`, `table`, `a`, etc.) también pueden personalizarse, pero no es necesariamente una buena idea.


La definición de una etiqueta en archivos .tag siempre inicia al principio de una línea:

```html
<!-- funciona -->
<my-tag>

</my-tag>

<!-- también funciona -->
<my-tag></my-tag>

  <!-- esto falla, debido a la indentación -->
  <my-tag>

  </my-tag>
```

Las definiciones de etiqueta en línea (en el cuerpo del documento) deben ser indentadas adecuadamente, con todas las etiquetas personalizadas igualmente indentadas un nivel más, no se recomienda mezclar tabuladores y espacios.

### Sin etiqueta script

Puede omitir la etiqueta `<script>`:

```html
<todo>

  <!-- diseño -->
  <h3>{ opts.title }</h3>

  // la lógica viene aquí
  this.items = [1, 2, 3]

</todo>
```

En cuyo caso, la lógica inicia después de la última etiqueta HTML. Esta "sintaxis abierta" se usa comúnmente en los ejemplos en este sitio web.


## Preprocesador

Usted puede especificar un preprocesador con el atributo `type`. Por ejemplo:

```html
<my-tag>
  <script type="coffee">
    # su lógica coffeescript va aquí
  </script>
</my-tag>
````

Las opciones disponibles actualmente son "coffee", "typescript", "es6" y "none". También se puede prefijar el lenguaje con "text/", como en "text/coffee".

Vea [preprocesadores](/guide/compiler/#Preprocesadores) para mayores detalles.


## Estilado de las etiquetas

Puede colocar una etiqueta `style` dentro. Riot.js la remueve y la inyecta en la cabecera de la página (el elemento `<head>`) automáticamente.

```html
<todo>

  <!-- diseño -->
  <h3>{ opts.title }</h3>

  <style>
    todo { display: block }
    todo h3 { font-size: 120% }
    /** otros estilos específicos a la etiqueta "todo" **/
  </style>

</todo>
```

### Scoped CSS

También está disponible [Scoped CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/:scope). El siguiente ejemplo es equivalente al anterior:

```html
<todo>

  <!-- diseño -->
  <h3>{ opts.title }</h3>

  <style scoped>
    :scope { display: block }
    h3 { font-size: 120% }
    /** otros estilos específicos a la etiqueta "todo" **/
  </style>

</todo>
```

Esto sucede una sola vez, no importa cuántas veces se inicialice la etiqueta.

Para hacer más fácil la sobreescritura de CSS, se puede especificar en qué lugar del `<head>` Riot debe inyectar los estilos de la etiqueta:

```html
<style type="riot"></style>
```

Un ejemplo de su uso sería insertar los estilos de la etiqueta desde una biblioteca de componentes, después de normalize.css pero antes del CSS del tema de su sitio web, lo que le permitiría anular los estilos por defecto de la biblioteca.

## Montaje

Una vez que se crea una etiqueta, se puede montar en la página de la siguiente manera:


```html
<body>

  <!-- coloque la etiqueta personalizada en cualquier lugar dentro del cuerpo -->
  <todo></todo>

  <!-- incluya riot.js -->
  <script src="riot.min.js"></script>

  <!-- incluya la etiqueta -->
  <script src="todo.js" type="riot/tag"></script>

  <!-- monte la etiqueta -->
  <script>riot.mount('todo')</script>

</body>
```

Las etiquetas personalizadas dentro del `body` de la página necesitan cerrarse normalmente: `<todo></todo>`. El cierre abreviado, como `<todo/>`, no está soportado.

Algunos ejemplos del uso del método mount:

```js
// monta todas las etiquetas personalizadas en la página
riot.mount('*')

// monta un elemento con id específico
riot.mount('#my-element')

// monta los elementos seleccionados
riot.mount('todo, forum, comments')
```

Un documento puede contener múltiples instancias de la misma etiqueta.


### Accediendo a elementos DOM

Riot le da acceso a elementos que tienen un atributo `name` directamente por medio de la palabra clave `this`, y varias propiedades y métodos abreviados como el atributo `if="{...}"`, pero en ocasiones necesitará referenciar y llegar a piezas HTML que no pueden ser accedidas por medio de las funciones predefinidas.


### Cómo usar jQuery, Zepto, querySelector, etc...

Si necesita acceder al DOM dentro de Riot, querrá echar un vistazo al [ciclo de vida de la etiqueta](#tag-lifecycle). Notará que los elementos DOM no son instanciados hasta después de dispararse el evento `update()`, lo que origina que falle cualquier intento de seleccionar un elemento antes de este evento.

```html
<example-tag>
  <p id="findMe">¿Debo siquiera existir?</p>

  <script>
  var test1 = document.getElementById('findMe')
  console.log('test1', test1)  // Falla

  this.on('update', function(){
    var test2 = document.getElementById('findMe')
    console.log('test2', test2) // Tiene éxito
  })
  </script>
</example-tag>
```

Es probable que no desee ejecutar lo que esté intentando hacer en cada actualización. En su lugar, lo más probable desee ejecutarlo en el evento `mount`.

```html
<example-tag>
  <p id="findMe">¿Debo siquiera existir?</p>

  <script>
  var test1 = document.getElementById('findMe')
  console.log('test1', test1)  // Falla

  this.on('update', function(){
    var test2 = document.getElementById('findMe')
    console.log('test2', test2) // Tiene éxito, se ejecuta en cada actualización
  })

  this.on('mount', function(){
    var test3 = document.getElementById('findMe')
    console.log('test3', test3) // Tiene éxito, se ejecuta una sola vez (por montaje)
  })
  </script>
</example-tag>
```

### Consulta DOM contextual

Ahora que sabemos cómo obtener elementos DOM esperando eventos `update` o `mount`, podemos hacer esto más útil agregando como contexto a nuestras consultas el elemento raíz (el <dfn lang="en">`root element`</dfn>, la etiqueta riot que estamos creando).

```html
<example-tag>
  <p id="findMe">¿Debo siquiera existir?</p>
  <p>¿Es esta la vida real?</p>
  <p>¿O sólo una fantasía?</p>

  <script>
  this.on('mount', function(){
    // jQuery contextual
    $('p', this.root)

    // Selector de consulta contextual
    this.root.querySelectorAll('p')
  })
  </script>
</example-tag>
```

### Opciones

Puede pasar opciones para las etiquetas en el segundo argumento

```html
<script>
riot.mount('todo', { title: 'Mi aplicación TODO', items: [ ... ] })
</script>
```

Los datos pasados pueden ser cualquier cosa, desde un simple objeto hasta una API de aplicación completa. O puede ser un depósito <dfn lang="en">Flux</dfn>. Depende de la arquitectura diseñada.

Dentro de la etiqueta las opciones pueden referenciarse con la variable `opts` de la siguiente manera:

```html
<my-tag>

  <!-- Opciones en HTML -->
  <h3>{ opts.title }</h3>

  // Opciones en JavaScript
  var title = opts.title

</my-tag>
```


### Mixins

Los <dfn lang="en">Mixins</dfn> proporcionan una forma fácil de compartir funcionalidad a través de las etiquetas. Cuando una etiqueta es compilada por riot, los mixins definidos se añaden y están disponibles para su uso en la etiqueta.

```js
var OptsMixin = {
  init: function() {
    this.on('updated', function() { console.log('¡Actualizado!') })
  },

  getOpts: function() {
    return this.opts
  },

  setOpts: function(opts, update) {
    this.opts = opts
    if (!update) this.update()
    return this
  }
}

<my-tag>
  <h1>{ opts.title }</h1>

  this.mixin(OptsMixin)
</my-tag>
```

En este ejemplo, usted está dando a cualquier instancia de la etiqueta `my-tag` el mixin `OptsMixin` que proporciona los métodos `setOpts` y `getOpts`. El método especial `init` puede inicializar el mixin cuando se carga a la etiqueta (el método `init` no es accesible desde la etiqueta en que fue insertado).

```js
var my_tag_instance = riot.mount('my-tag')[0]

console.log(my_tag_instance.getOpts()) // registrará las opciones que tenga la etiqueta
```

Las etiquetas aceptarán cualquier objeto -- `{'key': 'val'}` `var mix = new function(...)` -- y generarán un error cuando les sea pasado cualquier otro tipo.

La definición de `my-tag` ahora tiene un método `getId` agregado junto con todos los definidos en el mixin `OptsMixin`, a excepción de la función `init`.

```js
function IdMixin() {
  this.getId = function() {
    return this._id
  }
}

var id_mixin_instance = new IdMixin()

<my-tag>
  <h1>{ opts.title }</h1>

  this.mixin(OptsMixin, id_mixin_instance)
</my-tag>
```

Al estar definidos en el nivel de la etiqueta, los mixins no sólo extienden la funcionalidad de su etiqueta, sino que también permiten una interfaz repetible. Cada vez que se monta una etiqueta, incluso sub-etiquetas, la instancia tendrá el código de los mixins.

### Compartiendo mixins

Para compartir los mixins en archivos o proyectos, se proporciona la API `riot.mixin`. Puede registrar su mixin a nivel global así:

```js
riot.mixin('mixinName', mixinObject)
```

Para cargar el mixin a la etiqueta, use el método `mixin()` con la llave (el nombre del mixin).

```html
<my-tag>
  <h1>{ opts.title }</h1>

  this.mixin('mixinName')
</my-tag>
```


### Ciclo de vida de las etiquetas

Una etiqueta se crea en la siguiente secuencia:

1. Se construye la etiqueta
2. Se ejecuta la lógica JavaScript de la etiqueta
3. Se computan las expresiones HTML y se dispara el evento "update"
4. La etiqueta se monta en la página y se dispara el evento "mount"

Después de montar la etiqueta, las expresiones se actualizan de la siguiente manera:

1. Automáticamente después de que un controlador es llamado (a menos que establezca e.preventUpdate en true en su controlador de eventos).
2. Cuando `this.update()` es llamado en la instancia de la etiqueta actual.
3. Cuando `this.update()` es llamado en una etiqueta de un nivel superior. Las actualizaciones fluyen unidireccionalmente, de las etiquetas "madre" a las hijas.
4. Cuando `riot.update()` es llamado, lo cual actualiza globalmente todas las expresiones en la página.

El evento "update" se dispara cada vez que la etiqueta se actualiza.

Dado que los valores se calculan antes del montaje, no hay problemas sorpresivos como llamadas `<img src={ src }>` fallidas.


### Escuchando los eventos del ciclo de vida

Puede escuchar varios eventos del ciclo de vida dentro de la etiqueta de la siguiente manera:


```js
<todo>

  this.on('mount', function() {
    // justo después de que la etiqueta se monta en la página
  })

  this.on('update', function() {
    // permite recalcular los datos del contexto antes de la actualización
  })

  this.on('unmount', function() {
    // cuando la etiqueta se remueve de la página
  })

  // ¿curiosidad por todos los eventos?
  this.on('mount update unmount', function(eventName) {
    console.info(eventName)
  })

</todo>
```

Puede tener varios escuchas de eventos para el mismo evento. Ver [observable](/api/observable/) para más detalles sobre los eventos.


## Expresiones

Su HTML puede ser mezclado con expresiones que se encierran entre llaves:

```js
{ /* mi_expresion va aquí */ }
```

Las expresiones pueden establecer atributos o nodos de texto anidados:

```html
<h3 id={ /* atributo_como_expresion */ }>
  { /* expresion_anidada */ }
</h3>
```

Las expresiones son 100% JavaScript. Unos cuantos ejemplos:

```js
{ title || 'Sin título' }
{ results ? 'preparado' : 'cargando' }
{ new Date() }
{ message.length > 140 && 'El mansaje es demasiado largo' }
{ Math.round(rating) }
```

El objetivo es mantener las expresiones pequeñas, de tal forma que su código HTML se mantenga lo más limpio posible. Si su expresión crece en complejidad, considere trasladar algo de lógica al evento "update". Por ejemplo:


```html
<my-tag>

  <!-- `val` se calcula abajo .. -->
  <p>{ val }</p>

  // ..en cada actualización
  this.on('update', function() {
    this.val = some / complex * expression ^ here
  })
</my-tag>
```


### Atributos booleanos

Los atributos lógicos, o booleanos, (checked, selected, etc.) se ignoran cuando el valor de la expresión es falso[<sup>(1)</sup>](#note1):

`<input checked={ null }>` se convierte en `<input>`.

La W3C establece que una propiedad booleana es verdadera si el atributo está presente en alguna forma — incluso si el valor está vacío o es `false`.

<a name="note1">1)</a> _n.t._: <dfn lang="en">falsy</dfn> en la documentación original en inglés, es cualquier valor cuya comprobación en JavaScript devuelve falso, lo que incluye `null`, `undefined`, y cadenas de caracteres vacías.

La siguiente expresión no funciona:

```html
<input type="checkbox" { true ? 'checked' : ''}>
```

ya que solamente se reconocen los atributos y las expresiones de texto iternas. Riot detecta 44 atributos booleanos diferentes.


### Atajos de clases

Riot posee una sintaxis especial para nombres de clases CSS. Por ejemplo:

```html
<p class={ foo: true, bar: 0, baz: new Date(), zorro: 'un valor' }></p>
```

se evalúa a "foo baz zorro". Los nombres de las propiedades cuyo valor es verdadero se agrega a la lista de nombres de clase. Por supuesto, puede utilizar esta notación en otros lugares además de los nombres de clase, si encuentra un uso adecuado.


### Imprimiendo llaves

Puede generar la salida de una expresión sin evaluarla, escapando las llaves:

`\\{ esto no es evaluado \\}` genera `{ esto no es evaluado }`


### Personalizando las llaves

Usted tiene la libertad de personalizar las llaves a su gusto. Por ejemplo:

```js
riot.settings.brackets = '${ }'
riot.settings.brackets = '\{\{ }}'
```

El inicio y el final se separan con un carácter de espacio.

Cuando se utiliza la [compilación previa](/guide/compiler/#compilación-previa) se deberá configurar la opción `brackets` allí también.



### Miscelanea

Se ignoran las expresiones dentro de etiquetas `style`.


### Renderizado de HTML sin escapar

Las expresiones de Riot sólo pueden representar valores de texto sin formato HTML. Sin embargo, se puede crear una etiqueta personalizada para renderizar HTML. Por ejemplo:

```html
<raw>
  <span></span>

  this.root.innerHTML = opts.content
</raw>
```

Después de definir la etiqueta, ésta se puede utilizar dentro de otras etiquetas. Por ejemplo:

```html
<my-tag>
  <p>He aquí un contenido sin formato: <raw content="{ html }"/> </p>

  this.html = 'Hola, <strong>mundo!</strong>'
</my-tag>
```

[demo en jsfiddle](http://jsfiddle.net/23g73yvx/)

<span class="tag red">advertencia</span> esto podría exponer al usuario a ataques XSS, así que asegúrese de que nunca cargar datos desde fuentes no confiables.



## Etiquetas anidadas

Vamos a definir una etiqueta principal `<account>` y una etiqueta anidada `<subscription>`:


```html
<account>
  <subscription  plan={ opts.plan } show_details="true" />
</account>


<subscription>
  <h3>{ opts.plan.name }</h3>

  // lee los valores de las opciones
  var plan = opts.plan,
      show_details = opts.show_details

  // accede a la etiqueta principal
  var parent = this.parent

</subscription>
```

<span class="tag red">importante</span> Note que nombramos el atributo `show_details` utilizando un guión en lugar de un formato [CamelCase](https://es.wikipedia.org/wiki/CamelCase) que, debido a sus especificaciones, el navegador convertiría automáticamente a minúsculas.

Luego montamos la etiqueta `account` a la página con una opción de configuración `plan`:

```html
<body>
  <account></account>
</body>

<script>
riot.mount('account', { plan: { name: 'small', term: 'monthly' } })
</script>
```

Las opciones de las etiquetas superiores se pasan con el método `riot.mount` y las opciones de las etiquetas anidadas se pasan en el atributo de la etiqueta.

<span class="tag red">importante</span> Las etiquetas anidadas siempre se declaran dentro de una etiqueta personalizada principal (la etiqueta "madre"). No se inicializan si se definen en la página.

### HTML anidado

La "[Transclusión HTML](https://es.wikipedia.org/wiki/Transclusi%C3%B3n)" es una manera de procesar el HTML interno en la página. Esto se consigue con una etiqueta `<yield>` incorporada. Ejemplo:


### Definición de la etiqueta

```html
<my-tag>
  <p>Hola <yield/></p>
  this.text = 'mundo'
</my-tag>
```

### Uso

La etiqueta personalizada se coloca en una página con HTML anidado

```html
<my-tag>
  <b>{ text }</b>
</my-tag>
```

### Resultado

```html
<my-tag>
  <p>Hola <b>mundo</b><p>
</my-tag>
```

Var la documentación del [API](/api/#yield) para más detalles sobre `yield`.

## Elementos con nombre

Los elementos con un atributo `name` o `id` se incluyen automáticamente en el contexto por lo que tendrá un fácil acceso a ellos con JavaScript:

```html
<login>
  <form id="login" onsubmit={ submit }>
    <input name="username">
    <input name="password">
    <button name="submit">
  </form>

  // obtener los elementos HTML anteriores
  var form = this.login,
    username = this.username.value,
    password = this.password.value,
    button = this.submit

</login>
```

Por supuesto que estos elementos con nombre pueden referenciarse en HTML también: `<div>{ username.value }</div>`


## Controladores de eventos

Una función que se ocupa de eventos DOM es llamada un "controlador de eventos". Los controladores de eventos se definen como sigue:

```html
<login>
  <form onsubmit={ submit }>

  </form>

  // este método se llama cuando el formulario anterior es enviado
  submit(e) {

  }
</login>
```

Los atributos que comienzan con "on" (`onclick`, `onsubmit`, `oninput`, etc.) aceptan como valor una función que es llamada cuando ocurre el evento. Esta función también se puede definir de forma dinámica con una expresión. Por ejemplo:


```html
<form onsubmit={ condition ? method_a : method_b }>
```

En la función, `this` se refiere a la instancia de la etiqueta actual. Después de que el controlador se ejecuta, `this.update()` es llamado automáticamente, reflejando todos los posibles cambios a la interfaz de usuario.

El comportamiento del controlador de eventos predeterminado *se cancelará automáticamente* a menos que el elemento sea una casilla de comprobación o un botón de radio. Es decir, `e.preventDefault()` se llama implícitamente porque esto es lo que normalmente se desea (y se olvida hacer). Puede dejar que el navegador haga lo predeterminado devolviendo `true` en el controlador.

Por ejemplo, este controlador eventualmente enviará el formulario al servidor:

```js
submit() {
  return true
}
```



### El objeto Event

El controlador de eventos recibe el objeto event estándar como primer argumento. Las siguientes propiedades se normalizan para que funcionen en todos los navegadores:

- `e.currentTarget` apunta al elemento donde se especificó el controlador de eventos.
- `e.target` es el elemento de origen. Este no es necesariamente el mismo que `currentTarget`.
- `e.which` es el código de tecla en un evento de teclado (`keypress`, `keyup`, etc.).
- `e.item` es el elemento actual en un bucle. Ver [bucles](#bucles) para mayores detalles.


## Condicionales

Las condicionales permiten mostrar u ocultar elementos basándose en una condición. Por ejemplo:

```html
<div if={ is_premium }>
  <p>Esto es para usuarios premium solamente</p>
</div>
```

De nuevo, la expresión puede solamente ser una simple propiedad o una expresión JavaScript completa. Los siguientes atributos especiales están disponibles:

- `show` – muestra el elemento usando `style="display: ''"` cuando el valor es verdadero
- `hide` – oculta el elemento usando `style="display: none"` cuando el valor es verdadero
- `if` – agrega (si verdadero) o remueve (si falso) el elemento del documento.
El operador de igualdad es `==`, y no `===`. Por ejemplo: `'una cadena' == true`.


## Bucles

Los bucles se implementan por medio del atributo `each` como sigue:

```html
<todo>
  <ul>
    <li each={ items } class={ completed: done }>
      <input type="checkbox" checked={ done }> { title }
    </li>
  </ul>

  this.items = [
    { title: 'Primer elemento', done: true },
    { title: 'Segundo elemento' },
    { title: 'Tercer elemento' }
  ]
</todo>
```

El elemento con el atributo `each` se repite para todos los elementos de la matriz. Nuevos elementos se agregan o crean automáticamente cuando la matriz `items` se manipula usando los métodos `push`, `slice`, o `splice`. Por ejemplo.


### El contexto

Se crea un nuevo contexto para cada elemento. Este contexto es una [instancia de etiqueta](/api/#tag-instance). Cuando se anidan bucles, todas las etiquetas del bucle anidado heredan las propiedades y métodos del bucle donde anidan, y cuyo contenido (en las etiquetas anidadas) no sea `undefined`. De esta manera, riot evita que la etiqueta principal sobrescriba lo que se desea conservar.

Se puede acceder explícitamente a la etiqueta principal a través de la variable `parent`. Por ejemplo:


```html
<todo>
  <div each={ items }>
    <h3>{ title }</h3>
    <a onclick={ parent.remove }>Remover</a>
  </div>

  this.items = [ { title: 'Primero' }, { title: 'Segundo' } ]

  remove(event) {

  }
</todo>
```

En cada elemento de `items` en el bucle todo, excepto el atributo `each`, pertenece al contexto anidado, por lo que `title` se puede acceder directamente pero `remove` necesita el prefijo `parent.`, ya que el método no es una propiedad del elemento en el bucle.

Los elementos en el bucle son [instancias de etiquetas](/api/#tag-instance). Riot no toca los elementos originales, así que no hay nuevas propiedades se agreguen a ellos.


### Controladores de eventos con elementos en bucle

Los controladores de eventos pueden acceder a los elementos individuales en una colección con `event.item`. Ahora vamos a aplicar la función `remove`:

```html
<todo>
  <div each={ items }>
    <h3>{ title }</h3>
    <a onclick={ parent.remove }>Remover</a>
  </div>

  this.items = [ { title: 'Primero' }, { title: 'Segundo' } ]

  remove(event) {

    // elemento en el bucle
    var item = event.item

    // índice en la colección
    var index = this.items.indexOf(item)

    // remover de la colección
    this.items.splice(index, 1)
  }
</todo>
```

Después de que se ejecuta el controlador de eventos, la instancia de etiqueta actual se actualiza usando `this.update()` (a menos que establezca e.preventUpdate en true en su controlador de eventos), lo que provoca que todos los elementos en el bucle se ejecuten también. La etiqueta principal nota que un elemento ha sido eliminado de la colección y remueve el nodo DOM correspondiente del documento.


### Bucles en etiquetas personalizadas

Las etiquetas personalizadas también pueden contener bucles. Por ejemplo:

```html
<todo-item each="{ items }" data="{ this }"></todo-item>
```

El elemento actual en el bucle se puede referenciar con `this`, que se puede utilizar para pasar el elemento como una opción a la etiqueta en el bucle.


### Matrices que no contienen objetos

Los elementos de la matriz (array) no necesitan ser objetos. Pueden ser cadenas o números también. En este caso es necesario utilizar la construcción `{name, i in items}` de la siguiente manera:


```html
<my-tag>
  <p each="{ name, i in arr }">{ i }: { name }</p>

  this.arr = [ true, 110, Math.random(), 'cuarto']
</my-tag>
```

Donde `name` es el nombre del elemento e `i` es el número del índice o posición dentro de la matriz. Ambos nombres pueden ser sustituidos por lo que sea más adecuado para la situación.


### Bucles con objetos

Los objetos simples también pueden iterar. Por ejemplo:

```html
<my-tag>
  <p each="{ name, value in obj }">{ name } = { value }</p>

  this.obj = {
    key1: 'value1',
    key2: 1110.8900,
    key3: Math.random()
  }
</my-tag>
```

No se recomienda iterar sobre objetos debido a que, internamente, Riot detecta cambios en el objeto con `JSON.stringify`. Se analiza el objeto *completo* y cuando hay un cambio el bucle completo es renderizado de nuevo. Esto puede ser lento. Las matrices normales son mucho más rápidas y sólo los cambios se reflejan en la página.


## Elementos HTML como etiquetas

Se pueden utilizar elementos HTML estándar como etiquetas riot en el cuerpo de la página, con la adición del atributo `riot-tag`.

```html
<ul riot-tag="my-tag"></ul>
```

Esto ofrece a los usuarios una alternativa que puede proporcionar una mayor compatibilidad con los <dfn lang="en">frameworks</dfn> css. Las etiquetas son tratadas como cualquier otra etiqueta personalizada.

```js
riot.mount('my-tag')
```

montará el elemento `ul` como si este fuese `<my-tag></my-tag>`

## Renderizado en el Servidor

Riot soporta el renderizado en el lado servidor con node/io.js. Usted puede cargar las etiquetas con `require` y renderizarlas:

```js
var riot = require('riot')
var timer = require('timer.tag')

var html = riot.render(timer, { start: 42 })

console.log(html) // <timer><p>Segundos transcurridos: 42</p></timer>
```

Los bucles y las condicionales *están* soportadas.
