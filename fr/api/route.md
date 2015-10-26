---
title: Routeur
layout: fr
class: apidoc
---

{% include fr/api-tabs.html %}

Le Routeur Riot est l'implémentation la plus minimale de routeur que vous pouvez trouver et il fonctionne de manière homogène sur tous les navigateurs y-compris IE9. Le routeur réagit uniquement aux changements du hash dans l'URL (la partie après le caractère `#`). La plupart des applications mono-page fonctionnent uniquement avec le hash mais si vous souhaitez vraiment gérer les changements complets d'URL, vous devriez utiliser une autre implémentation de routeur.

Le Routeur Riot fonctionne de manière optimale lorsque la hiérarchie de la route est décrite après le "#", avec les composantes de la route séparées par le caractère  "/". Dans ce cas, Riot vous donne directement accès à ces composantes.


### riot.route(callback)

Exécute la fonction `callback` quand le hash de l'URL change. Par exemple:

```javascript
riot.route(function(collection, id, action) {

})
```

Si le hash change en `#customers/987987/edit` alors dans l'exemple ci-dessus les arguments de la fonction seront:


```javascript
collection = 'customers'
id = '987987'
action = 'edit'
```

Le hash peut changer de plusieurs façons:

1. Quand le hash est directement tapé ou modifié par l'utilisateur dans la barre d'URL
2. Quand les actions précédent/suivant du navigateur sont utilisées
3. Quand `riot.route(destination)` est appelé

### riot.route.start()

Commence à réagir aux changements de hash de l'URL. Automatiquement appelé quand Riot est chargé. Généralement, vous utiliserez cette méthode conjointement avec [riot.route.stop](#route-stop). Exemple:

```javascript
riot.route.stop() // retire tous les callbacks du vieux routeur
riot.route.start() // relance le routeur
```

### riot.route.stop()

Supprime les écouteurs de changements de hash et retire également les callbacks [riot.route](#route).

```javascript
riot.route.stop()
```

Stoppe le routeur par défaut et vous permet d'utiliser un routeur différent pour votre application.

### riot.route(to)

Change l'URL du navigateur et appelle tous les callbacks déclarés avec `riot.route(callback)`. Par exemple:

```javascript
riot.route('customers/267393/edit')
```

### riot.route.exec(callback)

Appelle la fonction `callback` avec le hash actuel de l'URL, sans attendre que celui-ci change. Par exemple:

```javascript
riot.route.exec(function(collection, id, action) {

})
```

### riot.route.parser(parser)

Change le parseur par défaut pour en utiliser un personnalisé. Voilà comment parser des chemins comme ceux là:

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

Avec ce parseur, vous pourrez récupérer les paramètres attendus quand l'URL change:

```javascript
riot.route(function(target, action, params) {

  /*
    target = 'user'
    action = 'activation'
    params = { token: 'xyz' }
  */

})
```
