---
title: Observable
layout: fr
class: apidoc
---

{% include fr/api-tabs.html %}


### <a name="constructor"></a> riot.observable(el)

Donne la fonctionnalité d'[Observateur](http://en.wikipedia.org/wiki/Observer_pattern) à l'objet donné `el` ou si l'argument est vide, retourne une nouvelle instance observable. Une fois cela fait, l'objet est capable de déclencher ou de réagir à des événements. Par exemple:

``` js
function Car() {

  // Rend l'instance Car observable
  riot.observable(this)

  // réagit à l'événement 'start'
  this.on('start', function() {
    // moteur démarré
  })

}

// crée une nouvelle instance Car
var car = new Car()

// déclenche l'événement 'start'
car.trigger('start')
```

@returns - retourne l'objet `el` ou une nouvelle instance observable


### <a name="on"></a> el.on(events, callback)

Ecoute une liste d'événements `events` (séparés par des espaces) et appelle la fonction `callback` chaque fois qu'un de ces événements est déclenché.

``` js
// écoute un unique événement
el.on('start', function() {

})

// écoute plusieurs événements, le type d'événement observé est passé en argument de la fonction callback
el.on('start stop', function(type) {

  // type is either 'start' or 'stop'

})
```

@returns - retourne `el`

### <a name="one"></a> el.one(event, callback)

Ecoute l'événement `event` et appelle la fonction `callback` la première fois, après quoi les événements suivants sont ignorés.

``` js
// appelle la fonction une seule fois, même si 'start' est déclenché plusieurs fois
el.one('start', function() {

})
```

@returns - retourne `el`

### <a name="off"></a> el.off(events)

Arrête d'écouter la liste d'événements `events` (séparés par des espaces)

``` js
el.off('start stop')
```

@returns - retourne `el`

### <a name="off-fn"></a> el.off(events, fn)

Arrête d'appeler la fonction `fn` lorsqu'un des événements de la liste `events` (séparés par des espaces) est déclenché

``` js
function doIt() {
  console.log('starting or ending')
}

el.on('start middle end', doIt)

// supprime l'écouteur d'événements correspondant aux événements start et end et à la fonction doIt
el.off('start end', doIt)
```

@returns - retourne `el`

### <a name="off-all"></a> el.off('*')

Supprime tous les écouteurs de tous les événements sur cet élément.

@returns - retourne `el`


### <a name="trigger"></a> el.trigger(event)

Déclenche l'événement `event` sur l'élément `el` et appelle toutes les fonctions de callback associées

``` js
el.trigger('start')
```

@returns - retourne `el`

### <a name="trigger-args"></a> el.trigger(event, arg1 ... argN)

Déclenche l'événement `event` sur l'élément `el` et appelle toutes les fonctions associées avec certains paramètres. N'importe quel nombre de paramètres supplémentaires peuvent être fournis aux fonctions de callback.

``` js
// écoute l'événement 'start' et attend des arguments supplémentaires
el.on('start', function(engine_details, is_rainy_day) {

})

// déclenche l'événement start avec des paramètres supplémentaires
el.trigger('start', { fuel: 89 }, true)

```

@returns - retourne `el`
