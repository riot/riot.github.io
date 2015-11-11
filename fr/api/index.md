---
title: Tags personnalisés
layout: fr
class: apidoc
---

{% include fr/api-tabs.html %}


## Montage

### <a name="mount"></a> riot.mount(customTagSelector, [opts])

Le sélecteur `customTagSelector` sélectionne les éléments correspondants dans la page et vient les monter avec un tag personnalisé. Le nom des éléments sélectionnés doit correspondre au nom du tag personnalisé.

L'objet optionnel `opts` est passé en paramètre aux tags. Il peut s'agir de n'importe quoi, d'un simple objet à l'API de toute une application. Ou encore d'un store Flux. Cela dépend vraiment de la manière dont vous voulez structurer votre application côté client. Plus d'infos sur les [applications Rito modulaires ici](/guide/application-design/#modularity).

``` js
// selectionne et monte tous les tags <pricing> sur la page
var tags = riot.mount('pricing')

// monte tous les tags personnalisés avec une classe .customer
var tags = riot.mount('.customer')

// monte tous les tags <account> et passe un objet API en option
var tags = riot.mount('account', api)
```

@returns - retourne la liste des [instances de tags](#tag-instance) montées

### <a name="mount-star"></a> riot.mount('*', [opts])

Un sélecteur spécifique à Riot pouvant être utilisé pour monter tous les tags personnalisés de la page:

``` js
riot.mount('*')
```

@returns - retourne la liste des [instances de tags](#tag-instance) montées

### <a name="mount-tag"></a> riot.mount(selector, tagName, [opts])

Paramètres:

- `selector` sélectionne les noeuds DOM des tags à monter dans la page
- `tagName` spécifie le nom du tag personnalisé à utiliser
- `opts` est un objet optionnel passé en paramètre au tag personnalisé


``` js
// monte le tag personnalisé "my-tag" sur div#main et passe l'objet api en option
var tags = riot.mount('div#main', 'my-tag', api)
```

@returns - retourne la liste des [instances de tags](#tag-instance) montées

### <a name="mount-dom"></a> riot.mount(domNode, tagName, [opts])

Monte un tag personnalisé nommé `tagName` sur le noeud `domNode` en passant des données optionnelles avec `opts`. Par exemple:

```
// monte le tag personnalisé "users" sur le noeud #slide avec l'objet api en options
riot.mount(document.getElementById('slide'), 'users', api)
```

@returns - retourne la liste des [instances de tags](#tag-instance) montées

## Interprétation du tag

### <a name="render"></a> riot.render(tagName, [opts])

Interprète un tag en HTML. Cette méthode est disponible uniquement *côté serveur* (Node/io.js). Par exemple:

```
// interprète le tag  "my-tag" en html
var mytag = require('my-tag')
riot.render(mytag, { foo: 'bar' })
```

@returns - retourne le résultat HTML du tag interprété


## Instance de tag

Les propriétés suivantes sont attribuées à chaque instance de tag:

- `opts` - l'objet options
- `parent` - le tag parent si présent
- `root` - le noeud DOM racine
- `tags` - les tags personnalisés imbriqués


Vous pouvez utiliser ces références à la fois dans le code HTML et JavaScript. Par exemple:


``` html
<my-tag>
  <h3>{ opts.title }</h3>

  var title = opts.title
</my-tag>
```

Vous pouvez librement assigner n'importe quelles données à l'instance (aussi appelé "contexte") et ces données seront disponibles dans les expressions HTML. Par exemple:

``` html
<my-tag>
  <h3>{ title }</h3>

  this.title = opts.title
</my-tag>
```


## Mise à jour

### <a name="tag-update"></a> this.update()

Met à jour toutes les expressions de l'instance courante de tag ainsi que de celles des tags enfants. Cette méthode est automatiquement appelée à chaque fois qu'un gestionnaire d'événements est appelé quand l'utilisateur interagit avec l'application.

Autrement, Riot ne met pas à jour l'UI automatiquement donc vous avez besoin d'appeler cette méthode manuellement. Cela arrive typiquement avec certains événements non reliés à l'interface utilisateur: timeouts, appels AJAX ou événements serveur. Par exemple:

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

Dans l'exemple ci-dessus, le message d'erreur est affiché à l'utilisateur une fois la méthode `update()` appelé. Nous assignons `this` à `self` puisqu'à l'intérieur du callback AJAX la variable `this` pointe sur l'objet réponse et non sur l'instance de tag.

### <a name="tag-update-data"></a> this.update(data)

Affecte les données passées à l'instance courante de tag et met à jour les expressions. C'est la même chose que `this.update()` mais cela vous permet de passer des données de contexte au passage. Donc au lieu d'écrire ceci:

``` js
self.error = error_message
self.update()
```

vous pouvez faire:

``` js
self.update({ error: error_message })
```

ce qui est plus concis et plus propre.

### <a name="update"></a> riot.update()

Met à jour tous les tags montés et leurs expressions sur la page.

@returns - retourne la liste des [instances de tags](#tag-instance) montées sur la page



## Démontage

### <a name="tag-unmount"></a> this.unmount(keepTheParent)

Détache le tag et ses enfants de la page. Un événement `unmount` est déclenché.
Si vous voulez démonter un tag sans supprimer le tag parent, vous devez passer le booléen `true` à la méthode `unmount`

Supprime le tag du DOM:

``` js
mytag.unmount()
```

Supprime les noeuds enfant du tag et conserve uniquement le tag parent:

``` js
mytag.unmount(true)
```

## Tags imbriqués

Vous avez accès aux instances de tags imbriqués via la variable `tags`:

``` html
<my-tag>

  <child></child>

  // accès au tag enfant child
  var child = this.tags.child

</my-tag>
```

S'il y a plus d'un tag enfant child, on y accède à travers une liste `this.tags.child[n]`

Vous pouvez également utiliser l'attribut `name` pour donner un autre nom au tag imbriqué.

``` html
<my-tag>

  <child name="mon_tag_imbrique"></child>

  // accèès au tag enfant
  var child = this.tags.mon_tag_imbrique

</my-tag>
```

Les tags enfant initialisés après que le tag parent afin que les méthodes et propriétés soient disponible lors de l'événement "mount".

``` html
<my-tag>

  <child name="mon_tag_imbrique"></child>

  // accès aux méthodes du tag enfant
  this.on('mount', function() {
    this.tags.mon_tag_imbrique.uneMethode()
  })

</my-tag>
```

## <a name="yield"></a> Injection de HTML imbriqué

Le tag `<yield>` est une fonctionné spéciale au coeur de Riot vous permettant d'injecter et de compiler le contenu de n'importe quel tag personnalisé à l'intérieur de son template au moment de l'exécution. Cette technique vous permet d'étendre les templates de vos tags avec du contenu HTML éventuellement produit par le serveur.

Par exemple, en utilisant le tag suivant `my-post`

``` html
<my-post>
  <h1>{ opts.title }</h1>
  <yield/>
  this.id = 666
</my-post>
```

chaque fois que vous voulez inclure le tag `<my-post>` dand votre application

``` html
<my-post title="Quel superbe titre">
  <p id="my-content-{ id }">Mon magnifique post est juste formidable</p>
</my-post>
```

une fois monté avec `riot.mount('my-post')` , il sera interprété comme ceci:

``` html
<my-post>
  <h1>Quel superbe titre</h1>
  <p id="my-content-666">Mon magnifique post est juste formidable</p>
</my-post>
```

#### Injection et boucles

Le tag `<yield>` peut également être utilisé au sein d'une boucle ou d'un tag enfant mais vous devez être conscient qu'__il sera toujours interprété et compilé avec les données du contexte de l'enfant__

Le composant riot suivant `blog.tag`


``` html
<blog>
  <h1>{ title }</h1>
  <my-post each={ posts }>
    <a href={ this.parent.backToHome }>Retour à l'accueil</a>
    <div onclick={ this.parent.deleteAllPosts }>Supprimer tous les posts</div>
  </my-post>

  this.backToHome = '/homepage'
  this.title = 'Mon titre de blog'

  this.posts = [
    { title: "post 1", description: 'ma description de post' },
    { title: "post 2", description: 'ma description de post' }
  ]

  // l'instruction bind est nécessaire ici pour préserver le contexte parent
  // dans les tags enfant
  deleteAllPosts() {
    this.posts = []

    // nous devons déclencher manuellement la fonction update
    // car la fonction est déclenchée depuis un tag enfant
    // et ne remonte pas automatiquement la chaîne
    this.update()
  }.bind(this)

</blog>

<my-post>
  <h2>{ title }</h2>
  <p>{ description }</p>
  <yield/>
</my-post>

```

sera compilé comme ceci:

``` html
<blog>
  <h1>Mon titre de blog</h1>
  <my-post>
    <h2>post 1</h2>
    <p>ma description de post</p>
    <a href="/homepage">Retour à l'accueil</a>
    <div>Supprimer tous les posts</div>
  </my-post>
  <my-post>
    <h2>post 2</h2>
    <p>ma description de post</p>
    <a href="/homepage">Retour à l'accueil</a>
    <div>Supprimer tous les posts</div>
  </my-post>
</blog>
```


## Evénements

Chaque instance de tag est [observable](./observable) donc vous pouvez utiliser les méthodes `on` et `one` pour réagir aux événements survenant sur l'instance de tag. Voici une liste des événements supportés:


- "update" – déclenché juste avant que le tag soit mis à jour. permet de recalculer les données de contexte avant que les expressions soient mises à jour.
- "updated" – déclenché juste après que le tag soit mis à jour. permet de travailler sur le noeud DOM mis à jour
- "mount" – déclenché juste après que le tag soit monté sur la page
- "unmount" – déclenché après que le taf soit supprimé de la page

Par exemple:

``` js
// nettoie les ressources une fois que le tag ne fait plus partie du DOM
this.on('unmount', function() {
  clearTimeout(timer)
})
```

## Mots réservés

La liste suivante de noms de méthodes et de propriétés sont réservés par les tags Riot. Ne les utilisez pas comme variables ou noms de méthodes: `opts`, `parent`, `root`, `update`, `unmount`, `on`, `off`, `one` et `trigger`. Les variables commençant par un underscore (comme ```this._item```) sont également réservés pour l'usage interne. Les variables locales peuvent être librement nommées. Par exemple:

``` javascript
<my-tag>

  // autorisé
  function update() { } 

  // non autorisé
  this.update = function() { }

  // non autorisé
  update() {

  }

</my-tag>
```

## Construction manuelle

### <a name="tag"></a> riot.tag(tagName, html, [css], [attrs], [constructor])

Crée un nouveau tag personnalisé "manuellement" sans le compilateur.

- `tagName` est le nom du tag
- `html` est le code HTML avec les [expressions](/guide/#expressions)
- `css` est le style du tag (facultatif)
- `attrs` est une String listant les attributs du tag (facultatif)
- `constructor` est la fonction d'initialisation appelée avant que les expressions du tag soient calculées et que le tag soit monté

#### Exemple

``` javascript
riot.tag('timer',
  '<p>Secondes écoulées: { time }</p>',
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

Voir la [démo timer](http://jsfiddle.net/gnumanth/h9kuozp5/) et la doc API de [riot.tag](/api/#tag-instance) pour plus de détails sur les *limitations*.


<span class="tag red">Attention</span> en utilisant `riot.tag` vous ne profiterez pas des avantages du compilateur et les fonctionnalités suivantes ne seront pas supportées:

1. Balises auto-fermantes
2. Expressions sans guillemets. Ecrivez `value="{ val }"` au lieu de `value={ val }`
3. Attributs booléens. Ecrivez `__checked="{ flag }"` au lieu de `checked={ flag }`
4. Ecriture ES6 raccourcie pour les méthodes
5. `<img src={ src }>` doit être écrit `<img riot-src={ src }>` pour éviter des requêtes serveur incorrectes
6. `style="color: { color }"` doit être écrit `riot-style="color: { color }"` afin que les expressions en attributs de style fonctionnent sur Internet Explorer
7. Précompilation des CSS scopés


Vous pouvez utiliser les tags `<template>` ou `<script>` tags comme ceci:

``` html
<script type="tmpl" id="my_tmpl">
  <h3>{ opts.hello }</h3>
  <p>et un paragraphe</p>
</script>

<script>
riot.tag('tag-name', my_tmpl.innerHTML, function(opts) {

})
</script>
```

### riot.Tag(impl, conf, innerHTML)

<span class="tag red">expérimental</span>

Dans riot v2.3, nous avons donné accès au constructeur interne Tag afin de vous permettre de créer des tags personnalisés par des moyens plus créatifs.

- `impl`
  - `tmpl` template du tag
  - `fn(opts)` fonction callback appelée lors de l'événement mount
  - `attrs` attributs HTML du tag racine sous forme d'objet (clé => valeur)
- `conf`
  - `root` noeud du DOM où sera monté le tag
  - `opts` options du tag
  - `isLoop` booléen, true si utilisé en tant que boucle
  - `hasImpl` booléen, true si déjà inscrit via riot.tag
  - `item` itération dans la boucle assignée à cette instance
- `innerHTML` html pouvant être inséré en remplacement d'un tag `yield` dans le template


Par exemple, en utilisant ES2015:

```js

class MyTag extends riot.Tag {
  constructor(el) {
    super({ tmpl: MyTag.template() }, { root: el })
    this.msg = 'hello'
  }
  bye() {
    this.msg = 'goodbye'
  }
  static template() {
    return `<p onclick="{ bye }">{ msg }</p>`
  }
}

new MyTag(document.getElementById('my-div')).mount()
```

Il n'est pas recommandé d'utiliser la méthode `riot.Tag`. Vous devriez l'utiliser seulement si vous avez besoin de certaines fonctionnalités non disponibles via les méthodes précédentes.



