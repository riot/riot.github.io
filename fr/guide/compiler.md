---
layout: default
title: Compilateur
---

{% include guide-tabs.html %}

## Compilation dans le navigateur

Les tags personnalisés doivent être transformés en JavaScript avant que le navigateur puisse les exécuter. Vous pouvez faire cela en mettant un attribut `type="riot/tag"` dans les scripts de vos tags personnalisés. Par exemple:


``` html
<!-- point de montage -->
<my-tag></my-tag>

<!-- définition inline du tag -->
<script type="riot/tag">
  <my-tag>
    <h3>Tag layout</h3>
    <inner-tag />
  </my-tag>
</script>

<!-- <inner-tag/> est spécifié dans un fichier externe -->
<script src="chemin/vers/javascript/avec-tags.js" type="riot/tag"></script>

<!-- inclusion de riot.js et du compilateur -->
<script src="//cdn.jsdelivr.net/g/riot@2.2(riot.min.js+compiler.min.js)"></script>


<!-- montage normal -->
<script>
riot.mount('*')
</script>
```

La balise script et le fichier externe peuvent contenir de multiples définitions de tags combinés avec du JavaScript classique.

Riot prend automatiquement les tags internes et externes et les compile avant que ces tags soient interprétés avec l'appel à `riot.mount()`.

### Acceder aux instances de tags
Avec la compilation dans le navigateur, `riot.mount` fonctionne de manière asynchrone. Si vous chargez vos tags avec `script src` et souhaitez avoir une référence aux tags montés, vous devez envelopper l'appel avec `riot.compile` comme ci-dessous:

``` html
<script>
riot.compile(function() {
  // ici les tags sont compilés et riot.mount fonctionne de manière synchrone
  var tags = riot.mount('*')
})
</script>
```

### Performance du compilateur

La phase de compilation est quasiment négligeable et ne prend presque pas de temps. Compiler un [tag timer](https://github.com/riot/riot/blob/master/test/tag/timer.tag) 30 fois prend 2 millisecondes sur un ordinateur portable basique. Si vous avez une page complètement folle avec 1000 tags différents de timer, la compilation prend autour de 35ms.

Le compilateur pèse seulement 3.2KB (1.7K gzippé) donc vous pouvez sans soucis effectuer la compilation côté client même en production sans impact sur les performances ou le temps de chargement.

Lisez l'[API du compilateur](/api/compiler/) pour plus de details.


### Demos

- [Compilé dans le navigateur](http://muut.github.io/riotjs/demo/)
- [Précompilé](http://muut.github.io/riotjs/demo/)
- [Code source](https://github.com/riot/riot/tree/gh-pages/demo)
- Téléchargez la démo en [fichier zip](https://github.com/riot/riot/archive/gh-pages.zip)



## Précompilation

La précompilation sur le serveur vous donne les avantages suivants:

- Possibilité de compiler vos tags avec votre [préprocesseur favori](#pre-processors).
- Petit gain de performances. Pas besoin de charger et d'exécuter le compilateur sur le navigateur.
- Applications universelles (isomorphiques) avec la possibilité de précompiler les tags côté serveur (bientôt disponible).


La précompilation se fait avec l'éxécutable `riot`, que vous pouvez installer avec NPM comme ceci:

``` sh
npm install riot -g
```

Tapez `riot --help` et assurez-vous que cela fonctionne. [node.js](http://nodejs.org/) est requis sur votre machine.

Avec la précompilation, votre HTML est quelque-chose comme ça:

``` html
<!-- point de montage -->
<my-tag></my-tag>

<!-- inclusion de riot.js uniquement -->
<script src="//cdn.jsdelivr.net/riot/2.2/riot.min.js"></script>

<!-- inclusion des tags précompilés (JavaScript normal) -->
<script src="chemin/vers/javascript/avec-tags.js"></script>

<!-- montage de la même façon -->
<script>
riot.mount('*')
</script>
```

### Usage

Voilà comment la commande `riot` fonctionne:

``` sh
# compile un fichier dans le dossier courant
riot some.tag

# compile un fichier dans un dossier cible
riot some.tag some_folder

# compile un fichier dans un chemin cible
riot some.tag some_folder/some.js

# compile tous les fichiers d'un dossier source dans le dossier de destination
riot some/folder path/to/dist

# compile tous les fichiers d'un dossier source vers un unique fichier concaténé
riot some/folder all-my-tags.js

```

Le fichier source peut contenir un ou plusieurs tags personnalisés et il peut y avoir du JavaScript classique mélangé avec les tags personnalisés. Le compilateur transformera uniquement les tags personnalisés et ne touchera pas aux autres parties du fichier source.

Pour plus d'informations, tapez: `riot --help`


### Mode observation

Vous pouvez observer des dossiers et automatiquement transformer les fichiers source lorsqu'ils sont modifiés.

``` sh
# watch for
riot -w src dist
```


### Extension personnalisée

Vous être libres d'utiliser n'importe qu'elle extension de fichier pour vos tags (au lieu de l'extension par défaut `.tag`):

``` sh
riot --ext html
```


### Module node

``` javascript
var riot = require('riot')

var js = riot.compile(source_string)
```

La fonction de compilation prend une String en argument et retourne une String.

### Insérer dans votre processus de build

- [Gulp](https://github.com/e-jigsaw/gulp-riot)
- [Grunt](https://github.com/ariesjia/grunt-riot)
- [Browserify](https://github.com/jhthorsen/riotify)


## Préprocesseurs

C'est le meilleur côté de la précompilation. Vous pouvez utiliser votre préprocesseur favori pour créer des tags personnalisés. Vous pouvez personnaliser à la fois les processeurs de HTML et de JavaScript.

Le langage source est spécifié avec l'argument `--type` ou `-t` en ligne de commande ou alors vous pouvez définir le langage dans la balise script comme suit:

``` html
<my-tag>
  <h3>Ma vue</h3>

  <script type="coffee">
    @hello = 'world'
  </script>
</my-tag>
```


### CoffeeScript

``` sh
# utilise coffeescript comme préprocesseur
riot --type coffee --expr source.tag
```

L'argument `--expr` indique que toutes les expressions sont également traitées. Vous pouvez également utiliser "cs" comme alias de "coffee". Voici un exemple de tag écrit en CoffeeScript:

``` javascript
<kids>

  <h3 each={ kids[1 .. 2] }>{ name }</h3>

  # Voilà les enfants
  this.kids = [
    { name: "Max" }
    { name: "Ida" }
    { name: "Joe" }
  ]

</kids>
```

Notez que l'attribut `each` est aussi écrit en CoffeeScript. CoffeeScript doit être présent sur votre machine:

``` sh
npm install coffee-script -g
```


### EcmaScript 6

ECMAScript 6 est activé avec le type "es6":

``` sh
# utilise un préprocesseur ES6
riot --type es6 source.tag
```

Un exemple de tag écrit en ES6:

``` html
<test>

  <h3>{ test }</h3>

  var type = 'JavaScript'
  this.test = `Ceci est du ${type}`

</test>
```

Toutes les [fonctionnalités ECMAScript 6](https://github.com/lukehoban/es6features) peuvent être utilisées. [Babel](https://babeljs.io/) est utilisé pour la transpilation:

``` sh
npm install babel
```

Voici un [exemple plus complet](https://github.com/txchen/feplay/tree/gh-pages/riot_babel) utilisant Babel avec Riot.

### TypeScript

TypeScript ajoute un typage statique optionnel à JavaScript. Utilisez `--type typescript` pour l'activer:

``` sh
# utilise TypeScript comme préprocesseur
riot --type typescript source.tag
```

Un exemple de tag écrit en TypeScript:

``` html
<test>

  <h3>{ test }</h3>

  var test: string = 'JavaScript';
  this.test = test;

</test>
```

[typescript-simple](https://github.com/teppeis/typescript-simple) est utilisé pour la transpilation:

``` sh
npm install typescript-simple
```
### LiveScript

Consultez le site de [LiveScript](http://livescript.net) pour la documentation et la liste des fonctionnalités de ce langage.

Le langage source est spécifié avec l'argument `-type` ou `-t`:

``` sh
# utilise livescript comme préprocesseur
riot --type livescript --expr source.tag
```

L'argument `--expr` indique que les expressions sont également traitées. Vous pouvez aussi utiliser "ls" comme alias à "livescript". Voilà un exemple de tag écrit en LiveScript:

``` html
<kids>

<h3 each={ kids[1 .. 2] }>{ name }</h3>

# Voilà les enfants
this.kids =
* name: \Max
* name: \Ida
* name: \Joe

</kids>
```

Notez que l'attribut `each` est également en LiveScript. LiveScript doit être présent sur votre machine:

``` sh
npm install LiveScript -g
```

### Jade

L'arbre HTML peut être traité avec l'option de configuration `template`. Voilà un exemple avec Jade – une syntaxe "propre et sensible aux espaces pour écrire du HTML"


``` sh
# utilise Jade comme préprocesseur HTML
riot --template jade source.tag
```

Un exemple Jade:

``` jade
sample
  p test { value }
  script(type='text/coffee').
    @value = 'sample'
```

Comme vous le remarquez, vous pouvez définir le type de script sur le template également. Ici nous avons utilisé CoffeeScript. [jade](https://github.com/jadejs/jade) est utilisé pour la transpilation:

``` sh
npm install jade
```



### N'importe quel langage

Vous pouvez configurer votre langage favori en faisant votre propre parser (fonction d'analyse). Par exemple:

``` js
function myParser(js, options) {
  return doYourThing(js, options)
}
```

Ce parser est ensuite passé au compilateur avec l'option `parser`:

``` js
var riot = require('riot')

var js = riot.compile(source_string, { parser: myParser, expr: true })
```

Mettez `expr: true` si vous voulez que les expressions soient également traitées.

#### riot.parsers sur le navigateur et le serveur

Vous pouvez aussi créer vos parsers riot personnalisés en les ajoutant à la propriété `riot.parsers` partagée côté serveur et côté navigateur. Par exemple:

```js
riot.parsers.js.myJsParser = function(js, options) {
  return doYourThing(js, options)
}

riot.parsers.css.myCssParser = function(tagName, css) {
  return doYourThing(tagName, css)
}
```

Une fois que vous avez créé votre propre `riot.parsers`, vous serez capable de compiler vos tags en utilisant ces parsers de la manière suivante:

```html
<custom-parsers>
  <p>hi</p>
  <style type="text/myCssParser">
    @tag {color: red;}
  </style>
  <script type="text/myJsParser">
    this.version = "@version"
  </script>
</custom-parsers>
```




### Pas de transpilation

Par défaut, Riot utilise un transpilateur intégré qui permet simplement la notation simplifiée ES6 pour les signatures de méthodes. Vous pouvez désactiver totalement la transpilation avec `--type none`:

``` sh
# aucun préprocesseur
riot --type none --expr source.tag
```

### AMD et CommonJS

Les tags Riot pvuent être compilés en supportant `AMD` (Asynchronous Module Definition) et `CommonJS`. Cette option de configuration est nécessaire si Riot est utilisé avec un chargeur AMD tel que [RequireJS](http://requirejs.org/) ou un chargeur CommonJS tel que [Browserify](http://browserify.org/).

La bibliothèque Riot doit être définie/requise en tant que `riot` dans les deux cas.

``` sh
# active AMD et CommonJS
riot --m
```

Exemple AMD:

``` js

define(['riot', 'tags'], function (riot) {
  riot.mount('*')
})
```

Exemple CommonJS:

``` js
var riot = require('riot')
var tags = require('tags')

riot.mount('*')
```


Si vous faites quelque-chose de super avec ça, merci de [le partager](https://github.com/riot/riot/issues/58) !
