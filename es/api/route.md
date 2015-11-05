---
title: El rúter
layout: default
class: apidoc
---

{% include api-tabs.html %}

El rúter de Riot (<dfn lang="en">Router</dfn>) es la mínima implementación de un rúter que se puede encontrar y funciona consistentemente en todos los navegadores, incluyendo IE. Este rúter solo escucha cambios en el <dfn lang="en">hash</dfn> de la ruta <abbr title="Uniform Resource Locator, por sus siglas en inglés">URL</abbr> (la parte que sigue al caracter `#`). La mayoría de las aplicaciones de una sola página sólo tratan con el hash, si usted necesita controlar el URL completo debe usar una implementación de rúter diferente.

El rúter Riot funciona mejor con esquemas de enrutamiento en los cuales las partes jerárquicas de la ruta, después del "#", se separan con diagonales (caracter "/"). En estos esquemas Riot le da acceso directo a las partes.


### riot.route(callback)

Ejecuta la función de retorno `callback` dada cuando el hash del URL cambia. Por ejemplo:

```javascript
riot.route(function(collection, id, action) {

})
```

Si, por ejemplo, el hash cambia a `#customers/987987/edit`, en el ejemplo anterior los argumentos serán:


```javascript
collection = 'customers'
id = '987987'
action = 'edit'
```

El hash puede cambiar en las siguientes formas:

1. Se escribe un nuevo hash en la barra de direcciones
2. Cuando se presionan los botones Atrás o Adelante
3. Cuando se llama a `riot.route(to)`

### riot.route.start()

Inicia la escucha de los cambios en el hash de la ventana y es llamado automáticamente cuando Riot es cargado. Típicamente, usted usa este método junto con [riot.route.stop](#route-stop). Ejemplo:

```javascript
riot.route.stop()  // elimina todas las funciones de retorno anteriores del rúter
riot.route.start() // lo inicia de nuevo
```

### riot.route.stop()

Remueve las escuchas del cambio de hash, limpiando también las funciones de retorno [riot.route](#route).

```javascript
riot.route.stop()
```

Detener el rúter predeterminado le permite el uso de uno diferente en su aplicación.

### riot.route(to)

Cambia la URL del navegador y notifica a todas las escuchas asignadas con `riot.route(callback)`. Por ejemplo:

```javascript
riot.route('customers/267393/edit')
```

### riot.route.exec(callback)

Estudia el hash actual "en el lugar" usando la función `callback` dada, sin esperar a que el hash cambie. Por ejemplo:

```javascript
riot.route.exec(function(collection, id, action) {

})
```

### riot.route.parser(parser)

Cambia el analizador predeterminado por uno personalizado. He aquí uno que analiza rutas como esta:

`!/user/activation?token=xyz`

```javascript
riot.route.parser(function(path) {
  var raw = path.slice(2).split('?'),
      uri = raw[0].split('/'),
      qs = raw[1],
      params = {}

  if (qs) {
    qs.split('&').forEach(function(v) {
      var c = v.split('=')
      params[c[0]] = c[1]
    })
  }

  uri.push(params)
  return uri
})
```

Y usted recibirá aquí los parámetros cuando el URL cambie:

```javascript
riot.route(function(target, action, params) {

  /*
    target = 'user'
    action = 'activation'
    params = { token: 'xyz' }
  */

})
```
