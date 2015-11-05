---
title: Observable
layout: default
class: apidoc
---

{% include api-tabs.html %}


### <a name="constructor"></a> riot.observable(el)

Agrega soporte [Observer](http://en.wikipedia.org/wiki/Observer_pattern) al objeto `el` dado o, si el argumento está en blanco, crea y devuelve una nueva instancia de <dfn lang="en">Observable</dfn>. Después de esto el objeto es capaz de emitir y escuchar eventos. Por ejemplo:

``` js
function Car() {

  // Hace observable las instancias de Car
  riot.observable(this)

  // escucha al evento 'start'
  this.on('start', function() {
    // motor iniciado
  })

}

// crea una nueva instancia de Car
var car = new Car()

// genera el evento 'start'
car.trigger('start')
```

Devuelve el objeto `el` dado o una nueva instancia de Observable


### <a name="on"></a> el.on(events, callback)

Escucha los eventos dados por `events` (una lista separada por espacios) y ejecuta la función `callback` cada vez que un evento es generado.

``` js
// escucha un solo evento
el.on('start', function() {

})

// escucha múltiples eventos, el tipo del evento es pasado como parámetro al callback
el.on('start stop', function(type) {

  // type es 'start' o 'stop'

})
```

Devuelve: `el`

### <a name="one"></a> el.one(event, callback)

Escucha al evento `event` dado y ejecuta la función `callback` una sola vez.

``` js
// ejecuta la función una vez, aun si 'start' es emitido múltiples veces
el.one('start', function() {

})
```

Devuelve: `el`

### <a name="off"></a> el.off(events)

Remueve los eventos dados por la lista separada por espacios.

``` js
el.off('start stop')
```

Devuelve: `el`

### <a name="off-fn"></a> el.off(events, fn)

Remueve la función de retorno dada de la lista de eventos.

``` js
function doIt() {
  console.log('starting or ending')
}

el.on('start middle end', doIt)

// remueve un escucha específico de los eventos "start" y "end"
el.off('start end', doIt)
```

Devuelve: `el`

### <a name="off-all"></a> el.off('\*')

Remueve todas las escuchas de todos los tipos de eventos.

Devuelve: `el`


### <a name="trigger"></a> el.trigger(event)

Ejecuta todas las funciones de retorno que escuchan al evento `event` dado.

``` js
el.trigger('start')
```

Devuelve: `el`

### <a name="trigger-args"></a> el.trigger(event, arg1 ... argN)

Ejecuta todas las funciones de retorno que escuchan al evento `event` dado. Se puede proveer cualquier número de parámetros adicionales a los escucha.

``` js
// escucha al evento 'start' y espera parámetros adicionales
el.on('start', function(engine_details, is_rainy_day) {

})

// genera un evento "start" con parámetros adicionales
el.trigger('start', { fuel: 89 }, true)

```

Devuelve: `el`
