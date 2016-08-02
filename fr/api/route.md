---
title: Routeur
layout: fr
class: apidoc
---

{% include fr/api-tabs.html %}

Le Routeur Riot est l'implémentation la plus minimale de routeur avec ces fonctionnalités:

- pushState et API History
- multiple groupes de routage
- parseur d'URL remplaçable
- isomorphique
- utilisation d'un [polyfill](https://github.com/devote/HTML5-History-API) pour le support IE9 et antérieur. Parce que IE.

## Mise en place du routage

### riot.route(callback)

Exécute la fonction `callback` quand l'URL change. Par exemple:

```javascript
riot.route(function(collection, id, action) {

})
```

Si par exemple l'URL change en `#customers/987987/edit` alors dans l'exemple ci-dessus les arguments de la fonction seront:


```javascript
collection = 'customers'
id = '987987'
action = 'edit'
```

L'URL peut changer de plusieurs façons:

1. Quand le hash est directement tapé ou modifié par l'utilisateur dans la barre d'URL
2. Quand les actions précédent/suivant du navigateur sont utilisées
3. Quand `riot.route(destination)` est appelé
4. Quand un lien est cliqué

### riot.route(filter, callback)

<span class="tag red">&gt;= v2.3</span>

Exécute la fonction `callback` donnée quand l'URL change et correspond au filtre `filter`. Par exemple:

```javascript
// correspond uniquement à `/fruit`
riot.route('/fruit', function(name) {
  console.log('La liste des fruits')
})
```

Les jokers wildcards(`*`) sont autorisés dans le filtre `filter` et leurs valeurs sont passées en arguments:

```javascript
// si l'URL change en `/fruit/apple`,
// cette route correspondra et capturera 'apple' en tant que `name`
riot.route('/fruit/*', function(name) {
  console.log('Le détail de ' + name)
})

// si l'URL change en `/blog/2015-09/01`,
// cette route correspondra et capturera '2015', '09' et '01'
riot.route('/blog/*-*/*', function(year, month, date) {
  console.log('La page du ' + date + '-' + month + '-' year)
})
```

Si vous voulez faire correspondre l'URL `/old` et `/old/and/anything`, cela peut se faire avec `..` dans le filtre:

```javascript
riot.route('/old..', function() {
  console.log('Les pages sous /old ont été déplacées.')
})
```

Cela peut aussi être utile quand l'URL inclut des paramètres de requête.

```javascript
// si l'URL change en `/search?keyword=Apple`, cette route correspondra
riot.route('/search..', function() {
  var q = riot.route.query()
  console.log('Mot recherché: ' + q.keyword)
})

// cela peut aussi être écrit comme ceci,
// mais sachez que `*` ne fait correspondre que les caractères alphanumériques et underscore
riot.route('/search?keyword=*', function(keyword) {
  console.log('Mot recherché: ' + keyword)
})
```

<span class="tag red">Note:</span> En interne, les jokers sont convertis en expressions régulières:

- `*`: `([^/?#]+?)`
- `..`: `.*`

### riot.route.create()

<span class="tag red">&gt;= v2.3</span>

Retourne un nouveau contexte de routage. Par exemple:

```javascript
var subRoute = riot.route.create()
subRoute('/fruit/apple', function() { /* */ })
```

Consultez les sections [Groupe de routage](#routing-groups) et [Priorité de routage](#routing-priority) pour plus de détails.

## Utilisation du routeur

### riot.route(to[, title, shouldReplace])

Change l'URL du navigateur et appelle tous les callbacks déclarés avec `riot.route(callback)`. Par exemple:

```javascript
riot.route('customers/267393/edit')
```
A partir de la v2.3, vous pouvez aussi changer le titre de la page:

```javascript
riot.route('customers/267393/edit', 'Modifier la page du client')
```

En passant le troisième argument à `true`, vous pouvez remplacer l'entrée actuelle dans l'historique du navigateur. C'est utile quand l'application doit effectuer une redirection vers une autre page.

```javascript
riot.route('not-found', 'Not found', true)
```

En interne...

- sans `shouldReplace`, `history.pushState()` sera utilisé.
- avec `shouldReplace`, `history.replaceState()` sera utilisé.

### riot.route.start()

Commence à réagir aux changements de l'URL. 

```javascript
riot.route.start()
```

<span class="tag red">&gt;= v2.3</span>

Riot ne démarre plus le routeur automatiquement. N'OUBLIEZ PAS DE LE DEMARRER PAR VOUS-MÊME. Cela signifie également que vous pouvez le substituer par votre routeur favori.
(Note: avant la v2.3, Riot démarrait le routeur automatiquement. Ce comportement a changé)

### riot.route.start(autoExec)

Commence à réagir aux changements de l'URL et exécute la route correspondante à l'URL actuelle.

```js
riot.route.start(true)
```

C'est un raccourci pour:

```js
riot.route.start()
riot.route.exec()
```

<span class="tag red">&gt;= v2.3</span>

Riot ne démarre plus automatiquement son routeur. N'OUBLIEZ PAS DE LE DEMARRER MANUELLEMENT. Cela signifie également que vous pouvez choisir votre routeur favori.
(Note: avant la v2.3, Riot démarrait le routeur automatiquement. Ce comportement a été changé)

### riot.route.stop()

Stoppe tous les routeurs. Cela supprimera également tous les écouteurs de changements de l'URL et retirera les callbacks [riot.route](#route).

```javascript
riot.route.stop()
```

Typiquement, vous utiliserez cette fonction conjointement avec [riot.route.start](#route-start). Exemple:

```javascript
riot.route.stop() // clear all the old router callbacks
riot.route.start() // start again
```

### subRoute.stop()

<span class="tag red">&gt;= v2.3</span>

Stoppe uniquement le routage d'une sous-route.  Cela supprimera également les écouteurs de changements de l'URL et retirera les callbacks.

```javascript
var subRoute = riot.route.create()
subRoute('/fruit/apple', function() { /* */ })
subRoute.stop()
```

### riot.route.exec()

Etudie l'URL actuelle du navigateur et déclenche les appels associés à cette route sans attendre que l'URL change.

```javascript
riot.route(function() { /* definit une route */ })
riot.route.exec()
```

<span class="tag red">Avertissement:</span> `riot.route.exec(callback)` a été déprécié depuis la `v2.3`.

### riot.route.query()

<span class="tag red">&gt;= v2.3</span>

Il s'agit d'une fonction utilitaire pour extraire les paramètres de l'URL. Par exemple:

```javascript
// si l'URL change en `/search?keyword=Apple&limit=30` , cette route correspondra
riot.route('/search..', function() {
  var q = riot.route.query()
  console.log('Paramètre keyword: ' + q.keyword)
  console.log('Paramètre limit: ' + q.limit)
})
```

## Personnaliser le routeur

### riot.route.base(base)

Change le chemin de base. Si vous avez une URL comme ceci:

`http://riotexample.com/app/fruit/apple`

Vous pouvez choisir comme chemin de base `/app`, puis vous n'aurez plus qu'à vous occuper de `/fruit/apple` dans les routes.

```javascript
riot.route.base('/app')
```

Le chemin de base par défaut est "#". Si vous voulez utiliser un hashbang, changez-le en `#!`.

```javascript
riot.route.base('#!')
```

<span class="tag red">Avertissement</span>

Si vous supprimez le `#` du chemin de base, votre serveur web doit être capable de desservir l'application peu importe l'URL relative qui lui parvient, car le navigateur manipulera l'URL complète et non plus le hash uniquement. Par défaut, les serveurs web ne savent pas comment gérer ces URL.



### riot.route.parser(parser[, secondParser])

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

#### Second parseur

<span class="tag red">&gt;= v2.3</span>

Si vous spécifiez un argument `secondParser`, vous pouvez également changer le second parseur. Ce second parseur est utilisé avec le filtre d'URL:

```javascript
// Ceci est le parseur par défaut
function second(path, filter) {
  var re = new RegExp('^' + filter.replace(/\*/g, '([^/?#]+?)').replace(/\.\./, '.*') + '$')
  if (args = path.match(re)) return args.slice(1)
}

riot.route.parser(first, second)
```

Si le parseur ne retourne rien, la prochaine route correspondante sera essayée.

## Groupes de routage

Traditionnellement, les routeurs côté serveur sont très centralisés, mais récemment nous utilisons des routeurs partout dans la page. Pensez à ce cas:

```html
<first-tag>
  <p>First tag</p>
  <script>
    riot.route('/fruit/*', function(name) {
      /* faire quelque-chose d'ordinaire */
    })
  </script>
</first-tag>

<second-tag>
  <p>Second tag</p>
  <script>
    riot.route('/fruit/apple', function(name) {
      /* faire quelque-chose de SPECIAL */
    })
  </script>
</second-tag>
```

Deux tags ont un routage, tout va bien ? Non, cela ne fonctionnera pas. Parce qu'une seule route sera choisie et que l'on ne peut pas savoir laquelle. Ainsi, nous devons faire des groupes de routage séparés pour chaque définition de tag. Par exemple:

```html
<first-tag>
  <p>First tag</p>
  <script>
    var subRoute = riot.route.create() // crée un autre contexte de routage
    subRoute('/fruit/*', function(name) {
      /* faire quelque-chose d'ordinaire */
    })
  </script>
</first-tag>

<second-tag>
  <p>Second tag</p>
  <script>
    var subRoute = riot.route.create() // create another routing context
    subRoute('/fruit/apple', function(name) {
      /* faire quelque-chose de SPECIAL */
    })
  </script>
</second-tag>
```

## Priorité de routage

Le routeur essaiera de faire correspondre l'URL à une route l'une après l'autre dans l'ordre de leurs déclarations. Donc dans l'exemple suivant, les routes B et C ne seront jamais choisies.

```javascript
riot.route('/fruit/*', function(name) { /* */ }) // route A (1)
riot.route('/fruit/apple', function() { /* */ }) // route B (2)
riot.route('/fruit/orange', function() { /* */ }) // route C (3)
```

Ceci peut mieux fonctionner:

```javascript
riot.route('/fruit/apple', function() { /* */ }) // routing-B (1)
riot.route('/fruit/orange', function() { /* */ }) // routing-C (2)
riot.route('/fruit/*', function(name) { /* */ }) // routing-A (3)
```

Les routes *avec filtre* ont une priorité plus élevée que les routes *sans filtre*. Cela signifie que la route X est déclarée en premier mais sera testée en dernier dans l'exemple ci-dessous:

```javascript
riot.route(function() { /* */ }) // route X (3)
riot.route('/fruit/*', function() { /* */ }) // route Y (1)
riot.route('/sweet/*', function() { /* */ }) // route Z (2)
```
