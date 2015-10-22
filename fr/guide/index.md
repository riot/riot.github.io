---
layout: fr
title: Tags personnalisés
---

{% include fr/guide-tabs.html %}

## Exemple

Les tags personnalisés de Riot sont les blocs de construction des interfaces utilisateur. Il s'agit de la partie "Vue" de votre application. Commencons par un exemple de todo list mettant en avant les différentes fonctionnalités de Riot:

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
    <button disabled={ !text }>Add #{ items.length + 1 }</button>
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

Les tags personnalisés sont [compilés](/guide/compiler/) en JavaScript.

Regardez la [démo en ligne](http://muut.github.io/riotjs/demo/), consultez les [sources](https://github.com/riot/riot/tree/gh-pages/demo), ou téléchargez le [zip](https://github.com/riot/riot/archive/gh-pages.zip).



## Syntaxe de tag

Un tag Riot est une combinaison d'éléments HTML et de logique JavaScript. Voilà les règles de base:

* Le HTML est défini en premier et la logique est placée à l'intérieur d'une balise `<script>` (optionnelle). *Note: la balise script ne peut pas être utilisée pour les tags personnalisés déclarés dans le corps du document, seulement dans les fichiers .tag externes*
* Si la balise `<script>` est omise, le JavaScript commence là où la dernière balise HTML se termine.
* Les tags personnalisés peuvent être vides, ou composés uniquement de HTML, ou composés uniquement de JavaScript
* Les guillemets sont optionnels: `<foo bar={ baz }>` devient `<foo bar="{ baz }">`.
* La syntaxe de méthodes ES6 est supportée: `methodName()` devient `this.methodName = function()` et la variable `this` pointe toujours sur l'instance actuelle de tag.
* Une syntaxe raccourcie pour les noms de classes est disponible: `class={ completed: done }` devient `class="completed"` quand la valeur `done` équivaut à `true`.
* Les attributs booléens (checked, selected etc..) sont ignorés quand la valeur de l'expression équivaut à `false` : `<input checked={ undefined }>` devient `<input>`.
* Les noms des attributs *doivent être en minuscules*. Cela est dû aux spécifications navigateur.
* Les balises auto-fermantes sont supportées: `<div/>` est transformé en `<div></div>`. Les balises ouvertes connues telles que `<br>`, `<hr>`, `<img>` ou `<input>` ne sont jamais fermées après compilation.
* Les tags personnalisés doivent être fermés (normalement ou auto-fermés).
* Les balises standard HTML (`label`, `table`, `a` etc..) peuvent également être personnalisées, mais ce n'est pas forcément un choix très sage.


La définition de tag dans les fichiers tag commence toujours en début de ligne:

```html
<!-- fonctionne -->
<my-tag>

</my-tag>

<!-- fonctionne aussi -->
<my-tag></my-tag>

  <!-- ne fonctionne pas, à cause de l'indentation -->
  <my-tag>

  </my-tag>
```

Les définitions de tag inline (directement dans le corps du document) doivent être indentées proprement, avec tous les tags personnalisés indentés au plus petit niveau d'indentation. Mélanger tabulations et espaces est déconseillé.

### Pas de balise script

Vous pouvez omettre la balise `<script>` dans une définition de tag:

```html
<todo>

  <!-- balisage -->
  <h3>{ opts.title }</h3>

  // logique
  this.items = [1, 2, 3]

</todo>
```

Dans ce cas, la logique commence après la fermeture de la dernière balise HTML. Cette syntaxe "ouverte" est couramment utilisée dans les exemples de ce site.


## Préprocesseur

Vous pouvez spécifier un préprocesseur avec l'attribut `type`. Par exemple:

```html
<my-tag>
  <script type="coffee">
    # la logique coffeescript vient ici
  </script>
</my-tag>
````

Les options actuellement disponibles sont "coffee", "typescript", "es6" et "none". Vous pouvez également préfixer le langage avec "text/", par exemple "text/coffee".

Voir la section [Préprocesseurs](/guide/compiler/#pre-processors) pour plus de détails.


## Style du tag

Vous pouvez utiliser une balise `style` à l'intérieur d'une définition de tag. Riot la récupère automatiquement pour l'injecter dans `<head>`. Cela ne survient qu'une seule fois, peu importe le nombre de fois où le tag est initialisé.

```html
<todo>

  <!-- balisage -->
  <h3>{ opts.title }</h3>

  <style>
    todo { display: block }
    todo h3 { font-size: 120% }
    /** autres stymes spécifiques au tag **/
  </style>

</todo>
```

### CSS à portée définie (:scope)

Les [styles CSS à portée définie](https://developer.mozilla.org/en-US/docs/Web/CSS/:scope) sont également disponibles. Cet exemple équivaut au premier:

```html
<todo>

  <!-- layout -->
  <h3>{ opts.title }</h3>

  <style scoped>
    :scope { display: block }
    h3 { font-size: 120% }
    /** autres styles spécifiques au tag **/
  </style>

</todo>
```

Pour rendre plus facile la surcharge du CSS, vous pouvez indiquer à quel endroit dans le `<head>` Riot doit injecter les styles avec cette balise:

```html
<style type="riot"></style>
```

Un cas d'usage serait par exemple d'insérer les styles de tag d'une bibliothèque de composants après normalize.css mais avant le thème de votre site web, ce qui vous permet de surcharger le style par défaut des tags.

## Montage

Une fois votre tag créé, vous devez le monter sur la page comme ceci:


```html
<body>

  <!-- placer le tag personnalisé n'importe où dans le body -->
  <todo></todo>

  <!-- inclure riot.js -->
  <script src="riot.min.js"></script>

  <!-- inclure le tag -->
  <script src="todo.js" type="riot/tag"></script>

  <!-- monter le tag -->
  <script>riot.mount('todo')</script>

</body>
```

Les tags personnalisés définis à l'intérieur du `body` de la page doivent être fermés normalement: `<todo></todo>` ; l'auto-fermeture `<todo/>` n'est pas supportée dans ce cas.


Voici quelques exemples d'utilisation de la méthode `mount`:

```js
// monte tous les tags personnalisés de la page
riot.mount('*')

// monte un élément avec un id spécifique
riot.mount('#my-element')

// monte les éléments sélectionnés
riot.mount('todo, forum, comments')
```

Un document peut contenir plusieurs instances du même tag.


### Accéder aux éléments du DOM

Riot vous donne accès aux éléments qui ont un attribut `name` directement via le mot-clé `this` dans le tag, ainsi que de nombreux raccourcis tels que l'attribut `if="{...}"`. Mais occasionnellement, vous avez besoin de récupérer et de toucher à des bouts de HTML qui ne rentrent pas dans les cas d'usage de ces fonctions préconçues.


### Comment utiliser jQuery, Zepto, querySelector, etc...

Si vous avez besoin d'accéder au DOM à l'intérieur de Riot, jetez un oeil au [Cycle de Vie du Tag](#tag-lifecycle) et notez que les éléments du DOM ne sont pas instanciés avant que l'événement `update()` ne survienne la première fois, ce qui signifie que toute tentative pour sélectionner un élément du DOM avant cet événement échouera.

```html
<example-tag>
  <p id="findMe">Est-ce que j'existe ?</p>

  <script>
  var test1 = document.getElementById('findMe')
  console.log('test1', test1)  // Echec

  this.on('update', function(){
    var test2 = document.getElementById('findMe')
    console.log('test2', test2) // Succès
  })
  </script>
</example-tag>
```

Vous ne voulez sans doute pas répéter cette sélection des éléments à chaque événement `update`. Au lieu de ça, vous pouvez écouter l'événement `mount`.

```html
<example-tag>
  <p id="findMe">Est-ce que j'existe ?</p>

  <script>
  var test1 = document.getElementById('findMe')
  console.log('test1', test1)  // Echec

  this.on('update', function(){
    var test2 = document.getElementById('findMe')
    console.log('test2', test2) // Succès, déclenché à chaque update
  })

  this.on('mount', function(){
    var test3 = document.getElementById('findMe')
    console.log('test3', test3) // Succès, déclenché qu'une seule fois par montage
  })
  </script>
</example-tag>
```

### Requête DOM contextualisée

Maintenant que nous savons comment récupérer des références aux éléments du DOM en attendant les événements `update` ou `mount`, nous pouvons également ajouter un contexte à nos requêtes DOM sur l'`élément racine (l'élement correspondant au tag que nous sommes en train de créer). De cette manière, nous avons l'assurance de sélectioner uniquement les éléments à l'intérieur du tag.

```html
<example-tag>
  <p id="findMe">Est-ce que j'existe ?</p>
  <p>Est-ce cela la vraie vie ?</p>
  <p>Ou est-ce seulement un rêve ?</p>

  <script>
  this.on('mount', function(){
    // Appel jQuery contextualisé
    $('p', this.root)

    // Appel à querySelector contextualisé
    this.root.querySelectorAll('p')
  })
  </script>
</example-tag>
```

### Options

Vous pouvez passer des options aux tags dans le second argument

```html
<script>
riot.mount('todo', { title: 'Ma Todo-List', items: [ ... ] })
</script>
```

Les données passées peuvent être n'importe quoi, d'un simple objet à l'API entière d'une application. Ou bien un store Flux. Tout dépend de l'architecture choisie.

A l'intérieur du tag, les options sont référencées avec la variable `opts` comme ceci:

```html
<my-tag>

  <!-- Options dans le HTML -->
  <h3>{ opts.title }</h3>

  // Options dans le JavaScript
  var title = opts.title

</my-tag>
```


### Mixins

Les Mixins sont un moyen simple de partager des fonctionnalités entre tags. Une fois le tag compilé par Riot, tous les mixins définis sont ajoutés et disponibles à l'utilisation dans le tag.

```js
var OptsMixin = {
  init: function() {
    this.on('updated', function() { console.log('Updated!') })
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

Dans cet exemple, vous donnez à chaque instance de `my-tag` les fonctionnalités de `OptsMixin` qui fournit les méthodes `getOpts` et `setOpts`. La méthode `init` est une méthode spéciale servant à initialiser le mixin une fois chargé dans le tag. (cette méthode `init` n'est pas accessible en dehors du tag dans laquelle elle est définie)

```js
var my_tag_instance = riot.mount('my-tag')[0]

console.log(my_tag_instance.getOpts()) // affichera toutes les options du tag
```

Les tags acceptent en mixin n'importe quel objet de la forme -- `{'key': 'val'}` `var mix = new function(...)` -- et renverront une erreur si un autre type de données est passé en mixin.

La définition de `my-tag` comporte maintenant une méthode `getId` ajoutée aux côtés de celles définies par le mixin `OptsMixin`, à l'exception de la fonction `init`.

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

En étant définis au niveau du tag, les mixins n'étendent pas seulement les fonctionnalités de votre tag, mais permettent également d'obtenir une interface réutilisable. Chaque fois qu'un tag est monté, même un sous-tag, l'instance disposera du code du mixin.

### Partager un mixin

Pour partager les mixins entre des fichiers ou des projets, l'API `riot.mixin` est fournie. Vous pouvez inscrire votre mixin globalement comme ceci:

```js
riot.mixin('nomDuMixin', objetMixin)
```

Pour ensuite charger ce mixin dans le tag, utilisez la méthode `mixin()` avec le nom donné au mixin.

```html
<my-tag>
  <h1>{ opts.title }</h1>

  this.mixin('nomDuMixin')
</my-tag>
```


### Cycle de Vie du Tag

Un tag est créé en suivant la séquence suivante:

1. Le Tag est construit
2. La logique JavaScript du Tag est exécutée
3. Les expressions HTML sont calculées et l'événement "update" est déclenché
4. Le Tag est monté sur la page et l'événement "mount" est déclenché

Une fois le tag monté, les expressions sont mises à jour comme ceci:

1. Automatiquement après qu'un callback d'événement soit appelé. (à moins que vous ayez appliqué `event.preventUpdate = true` dans le callback de cet événement). Prenez par exemple la méthode `toggle` ci-dessous.
2. Lorsque `this.update()` est appelé sur l'instance courante du tag
3. Lorsque `this.update()` est appelé sur le tag parent, ou un parent du parent. Les mises à jour se propagent unilatéralement du parent au tag enfant.
4. Lorsque `riot.update()` est appelé, ce qui met à jour toutes les expressions sur la page.

L'événement `update` est déclenché à chaque fois que le tag est mis à jour.

Puisque les valeurs sont calculées avant montage, il n'y a pas de problèmes inattendus au montage tels que des appels en échec avec `<img src={ src }>`.


### Ecouter les événements du cycle de vie

Vous pouvez écouter et réagir aux divers événements du cycle de vie du tag comme ceci:


```js
<todo>

  this.on('mount', function() {
    // déclenché une fois le tag monté sur la page
  })

  this.on('update', function() {
    // permet le nouveau calcul des données de contexte après mise à jour
  })

  this.on('unmount', function() {
    // déclenché lorsque le tag est retiré de la page
  })

  // curieux sur tous les événements ?
  this.on('mount update unmount', function(eventName) {
    console.info(eventName)
  })

</todo>
```

Vous pouvez avoir de multiples gestionnaires pour le même événement. Consultez l'API [Observable](/api/observable/) pour plus de détails sur les événements.


## Expressions

Le HTML peut être mélangé avec des expressions à l'intérieur d'accolades:

```js
{ /* mon expression va ici */ }
```

Les expressions peuvent assigner des attributs ou modifier les noeuds textes imbriqués:

```html
<h3 id={ /* attribute_expression */ }>
  { /* nested_expression */ }
</h3>
```

Les expressions sont du JavaScript à 100%. Quelques exemples:

```js
{ title || 'Untitled' }
{ results ? 'ready' : 'loading' }
{ new Date() }
{ message.length > 140 && 'Message is too long' }
{ Math.round(rating) }
```

Le but est de garder vos expressions courtes et simples afin que le HTML reste aussi propre que possible. Si votre expression devient trop complexe, vous devriez considérer le fait de déplacer la logique dans l'événement `update`. Par exemple:


```html
<my-tag>

  <!-- la valeur `val` est calculée plus bas .. -->
  <p>{ val }</p>

  // ..à chaque mise à jour
  this.on('update', function() {
    this.val = some / complex * expression ^ here
  })
</my-tag>
```


### Attributs booléens

Les attributs booléens (checked, selected etc..) sont ignorés quand l'expression équivaut à `false`:

`<input checked={ null }>` devient `<input>`.

Le W3C établit qu'une propriété booléenne est vraie si l'attribut est présent — même s'il n'y a pas de valeur ou si elle est égale à `false`.

L'expression suivante ne fonctionne pas:

```html
<input type="checkbox" { true ? 'checked' : ''}>
```

puisque seuls les expressions à l'intérieur d'attributs ou de noeuds textes sont valides. Riot détecte 44 attributs booléens différents.


### Notation raccourcie pour les classes

Riot a une syntaxe spéciale pour les noms de classes CSS. Par exemple:

```html
<p class={ foo: true, bar: 0, baz: new Date(), zorro: 'a value' }></p>
```

sera évalué comme "foo baz zorro". Les noms de propriétés dont la valeur équivaut à `true` seront ajoutés à la liste des noms de classes. Bien sûr, vous pouvez utiliser cette notation à d'autres endroits que les noms de classe si vous trouvez un cas d'utilisation adéquat.


### Afficher des accolades

Vous pouvez afficher une expression sans qu'elle soit évaluée en échappant l'accolade ouvrante:

`\\{ ceci n'est pas évalué \\}` affichera `{ ceci n'est pas évalué }`


### Personnaliser les accolades

Vous êtes libre de personnaliser la notation des expressions comme bon vous semble. Par exemple:

```js
riot.settings.brackets = '${ }'
riot.settings.brackets = '\{\{ }}'
```

Les notations de début et de fin d'expression sont séparées par un caractère espace.

Si vous utilisez le [précompilateur](/guide/compiler/#pre-compilation), vous devrez également configurer l'option `brackets`.



### Note

Les expressions à l'intérieur des balises `style` sont ignorées.


### Afficher du HTML non échappé

Les expressions Riot peuvent uniquement afficher du texte sans formattage HTML. Cependant, vous pouvez déclarer votre propre tag personnalisé à cet effet. Par exemple:

```html
<raw>
  <span></span>

  this.root.innerHTML = opts.content
</raw>
```

Une fois le tag défini, vous pouvez l'utiliser à l'intérieur d'autres tags. Par exemple:

```html
<my-tag>
  <p>Voici du contenu HTML à l'état brut: <raw content="{ html }"/> </p>

  this.html = 'Hello, <strong>world!</strong>'
</my-tag>
```

[Démo sur jsfiddle](http://jsfiddle.net/23g73yvx/)

<span class="tag red">attention</span> Ne pas échapper le HTML sortant peut exposer l'utilisateur à des attaques de type XSS donc assurez-vous de ne jamais utiliser de données ne provenant pas d'une source de confiance.



## Tags imbriqués

Définissons un tag parent `<account>` contenant un tag imbriqué `<subscription>`:


```html
<account>
  <subscription plan={ opts.plan } show_details="true" />
</account>


<subscription>
  <h3>{ opts.plan.name }</h3>

  // Gérer les options en JS
  var plan = opts.plan,
      show_details = opts.show_details

  // accéder au tag parent
  var parent = this.parent

</subscription>
```

<span class="tag red">important</span> Notez comment nous avons nommé l'attribut `show_details` en utilisant un underscore au lieu de la notation camelCase, qui aurait été convertie automatiquement en minuscules à cause de la spécification navigateur.

Ensuite nous montons le tag `account` sur la page avec une option de configuration `plan`:

```html
<body>
  <account></account>
</body>

<script>
riot.mount('account', { plan: { name: 'small', term: 'monthly' } })
</script>
```

Les options du tag parent sont passées avec la méthode `riot.mount` et les options du tag enfant sont passées par l'attribut du tag.

<span class="tag red">important</span> les tags imbriqués sont toujours déclarés à l'intérieur d'un tag parent. Ils ne sont pas initialisés s'ils sont définis sur la page.

### HTML imbriqué

La "transclusion HTML" est un moyen de traiter le HTML interne d'une page. Ceci est accompli grâce au tag `<yield>` inclus dans Riot. Exemple:


### Définition du tag

```html
<my-tag>
  <p>Hello <yield/></p>
  this.text = 'world'
</my-tag>
```

### Utilisation

Le tag personnalisé dans la page avec du HTML imbriqué à l'intérieur

```html
<my-tag>
  <b>{ text }</b>
</my-tag>
```

### Résultat

```html
<my-tag>
  <p>Hello <b>world</b><p>
</my-tag>
```

Voir la [documentation API](/api/#yield) pour en savoir plus sur `yield`.

## Elements nommés

Les éléments avec des attributs `name` ou `id` sont automatiquement attachés au contexte afin que vous puissiez y accéder facilement en JavaScript:

```html
<login>
  <form id="login" onsubmit={ submit }>
    <input name="username">
    <input name="password">
    <button name="submit">
  </form>

  // récupérer les éléments HTML ci-dessus
  var form = this.login,
    username = this.username.value,
    password = this.password.value,
    button = this.submit

</login>
```

Bien sûr, ces éléments nommés peuvent également être utilisés dans les expression dans le HTML: `<div>{ username.value }</div>`


## Gestionnaires d'événements

Une fonction traitant avec des événements du DOM est appelée "gestionnaire d'événement". Les gestionnaires d'événements sont définis comme ceci:

```html
<login>
  <form onsubmit={ submit }>

  </form>

  // cette méthode est appelée quand le formulaire ci-dessus est soumis
  submit(e) {

  }
</login>
```

Les attributs commençant par "on" (`onclick`, `onsubmit`, `oninput` etc...) acceptent comme valeur une fonction qui sera appelée quand l'événement correspondant surviendra. Cette fonction peut également être définie dynamiquement suivant une expression. Par exemple:


```html
<form onsubmit={ condition ? methode_a : methode_b }>
```

Dans la fonction, `this` se réfère à l'instance courante de tag. Chaque fois que le gestionnaire est appelé, `this.update()` est automatiquement appelé ensuite pour réagir à tous les éventuels changements dans l'interface utilisateur.

Le comportement par défaut des gestionnaires d'événeents est d'*automatiquement annuler l'événement* à moins que l'élément soit une case à cocher ou un bouton radio. Cela signifie que `e.preventDefault()` est déjà appelé pour vous, parce qu'il s'agit généralement du comportement désiré (ou celui que vous avez oublié de définir). Vous pouvez laisser le navigateur effectuer l'action par défaut en retournant simplement `true`  dans le gestionnaire.

Par exemple, ce gestionnaire de soumission déclenchera effectivement la soumission du formulaire au serveur:

```js
submit() {
  return true
}
```



### Object événement

Le gestionnaire d'événement reçoit l'objet standard événement en tant que premier argument. Les propriétés suivantes sont normalisées pour fonctionner à travers tous les navigateurs:

- `e.currentTarget` pointe vers l'élément sur lequel le gestionnaire d'événement est spécifié.
- `e.target` est l'élément d'origine de l'événement. Il ne s'agit pas nécessairement du même que `currentTarget`.
- `e.which` est le code de touche dans le cas d'un événement clavier (`keypress`, `keyup`, etc...).
- `e.item` est l'élément courant dans une boucle. Voir les [boucles](#loops) pour plus de détails.


## Conditions

Les conditions vous permettent d'afficher/cacher des éléments selon une condition. Par exemple:

```html
<div if={ is_premium }>
  <p>Ce contenu est réservé aux utilisateurs premium</p>
</div>
```

Une fois encore, cette expression peut être une simple propriété ou une expression JavaScript complète. Les attributs spéciaux suivants sont disponibles:

- `show` – affiche l'élément en utilisant `style="display: ''"` quand la valeur est vraie
- `hide` – cache l'élément en utilisant `style="display: none"` quand la valeur est vraie
- `if` – ajoute (vrai) ou retire (faux) l'élément du DOM selon la valeur

L'opérateur d'égalité est `==` et non `===`. Par exemple: `'a string' == true`.


## Loops

Les boucles sont implémentées avec l'attribut `each` comme ceci:

```html
<todo>
  <ul>
    <li each={ items } class={ completed: done }>
      <input type="checkbox" checked={ done }> { title }
    </li>
  </ul>

  this.items = [
    { title: 'Premier item', done: true },
    { title: 'Second item' },
    { title: 'Troisième item' }
  ]
</todo>
```

L'élément avec l'attribut `each` sera répété pour chacun des éléments de la liste. Les nouveaux éléments sont automatiquement ajoutés/créés lorsque la liste des éléments est manipulée en utilisant les méthodes `push()`, `slice()` ou `splice` par exemple.


### Contexte

Un nouveau contexte est créé pour chaque élément de la boucle. Ce sont des [instances de tag](/api/#tag-instance). Quand des boucles sont imbriquées, les tags enfants dans la boucle héritent de toutes les propriétés et méthodes de la boucle parenet, si elles ne sont pas déjà définies. En ce sens, Riot évite de surcharger ce qui ne doit pas l'être par le tag parent.

On peut accéder au parent explicitement via la variable`parent`. Par exemple:


```html
<todo>
  <div each={ items }>
    <h3>{ title }</h3>
    <a onclick={ parent.remove }>Supprimer</a>
  </div>

  this.items = [ { title: 'Premier' }, { title: 'Second' } ]

  remove(event) {

  }
</todo>
```

Dans l'élément bouclé, tout appartient au contexte enfant sauf l'attribut `each`, donc on peut accéder directement à `title` et `remove` doit être préfixé avec `parent.` puisque la méthode n'est pas une propriété de l'élément bouclé.

Les éléments bouclés sont des [instances de tag](/api/#tag-instance). Riot ne touche pas aux éléments originaux donc aucune nouvelle propriété ne leur est ajoutée.


### Gestionnaire d'événements sur les éléments d'une boucle

Les gestionnaires d'événements peuvent accéder aux éléments individuels d'une collection avec `event.item`. Maintenant, implémentons la fonction `remove`:

```html
<todo>
  <div each={ items }>
    <h3>{ title }</h3>
    <a onclick={ parent.remove }>Supprimer</a>
  </div>

  this.items = [ { title: 'Premier' }, { title: 'Second' } ]

  remove(event) {

    // élément bouclé
    var item = event.item

    // index dans la collection
    var index = this.items.indexOf(item)

    // supprimer de la collection
    this.items.splice(index, 1)
  }
</todo>
```

Une fois le gestionnaire d'événement exécuté, l'instance courante du tag est actualisée avec `this.update()` (à moins que vous ayez assigné `e.preventUpdate` à `true` dans votre gestionnaire d'événement), ce qui actualise également tous les éléments bouclés. Le parent remarque qu'un élément a été retiré de la collection et supprime le noeud du DOM correspondant.


### Boucler sur des tags personnalisés

Vous pouvez également boucler sur des tags personnalisés. Par exemple:

```html
<todo-item each="{ items }" data="{ this }"></todo-item>
```

L'élément en cours dans l'itération est référencé par `this` , que vous pouvez passer en option au tag personnalisé répété.


### Elements de listes non-objets

Les éléments de la liste sur laquelle boucler ne doivent pas nécessairement être des objets. Il peut aussi bien s'agir de nombres ou de chaînes de caractères. Dans ce cas, vous devez utiliser la notation `{ value, i in items }` comme ceci:


```html
<my-tag>
  <p each="{ value, i in arr }">{ i }: { value }</p>

  this.arr = [ true, 110, Math.random(), 'quatre']
</my-tag>
```

La variable `value` est la valeur de l'élément et `i` est le nombre index dans la liste. Ces deux variables peuvent être renommées pour décrire au mieux la situation.


### Boucles d'objets

Il est également possible de boucler sur les propriétés d'objets classiques. Par exemple:

```html
<my-tag>
  <p each="{ key, value in obj }">{ key } = { value }</p>

  this.obj = {
    key1: 'value1',
    key2: 1110.8900,
    key3: Math.random()
  }
</my-tag>
```

Boucler sur des objets n'est pas recommandé car Riot utilis en interne `JSON.stringify` pour comparer les objets. L'objet *entier* est étudié et dès qu'un changement est repéré, toute la boucle est réinterprétée. Cela peut être lent. Les listes classiques sont bien plus rapides et seuls les éléments changeants sont redessinés sur la page.


## Elements HTML en guise de tags Riot

Les éléments standard HTML peuvent être utilisés comme des tags Riot dans le corps de la page en ajoutant l'attribut `riot-tag`.

```html
<ul riot-tag="my-tag"></ul>
```

Cela fournit aux utilisateurs une alternative pour une plus grande compatibilité avec les frameworks CSS. Ces tags sont traités comme les autres.

```js
riot.mount('my-tag')
```

On monte l'élément `ul` ci-dessus comme s'il s'agissait de `<my-tag></my-tag>`

## Rendu côté serveur

Riot supporte le rendu côté serveur avec Node/io.js. Vous pouvez utiliser `require` pour charger les tags et leur passer des données:

```js
var riot = require('riot')
var timer = require('timer.tag')

var html = riot.render(timer, { start: 42 })

console.log(html) // <timer><p>Secondes écoulées: 42</p></timer>
```

Les boucles et conditions *sont* supportées.
