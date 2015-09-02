---
layout: default
title: Riot.js — Une micro-bibliothèque d'interface utilisateur ressemblant à React
description: Riot vous permet de concevoir des interfaces utilisateur avec des balises personnalisées en utilisant une syntaxe simple et plaisante. Il utilise un DOM virtuel comme React mais en plus rapide. Riot est très léger comparer aux standards de l'industrie. Nous pensons qu'il y a un réel besoin pour une autre bibliothèque UI.
---

<div id="hero">
  <img src="/img/logo/riot240x.png">
  <h1>Une micro-bibliothèque d'interface utilisateur ressemblant à React</h1>
  <h4>Balises personnalisées • Syntaxe plaisante • DOM virtuel • Très léger</h4>

  <div id="version-slurp">
    <a href="/fr/download/" class="tag blue">v{{ site.version }}</a> &mdash;
    <a href="/fr/release-notes/">{{ site.version_slurp }}&hellip;</a>
  </div>

</div>


# Pourquoi avons-nous besoin d'une autre bibliothèque UI ?

La scène front-end est en effet bondée, mais nous pensons honnêtement que la vraie solution se trouve encore "quelque-part". Nous pensons que Riot offre le bon équilibre pour résoudre ce grand puzzle. React semble y parvenir mais a de sérieux points faibles que Riot viendra corriger.

Donc - voici pourquoi nous en avons besoin:


## 1. Balises personnalisées

Riot amène les balises personnalisées à tous les navigateurs.

``` html
<todo>

  <!-- layout -->
  <h3>{ opts.title }</h3>

  <ul>
    <li each={ item, i in items }>{ item }</li>
  </ul>

  <form onsubmit={ add }>
    <input>
    <button>Ajouter #{ items.length + 1 }</button>
  </form>

  <!-- style -->
  <style scoped>
    h3 {
      font-size: 14px;
    }
  </style>

  <!-- logic -->
  <script>
    this.items = []

    add(e) {
      var input = e.target[0]
      this.items.push(input.value)
      input.value = ''
    }
  </script>

</todo>
```

Une balise personnalisée colle ensemble le HTML correspondant et le JavaScript pour former un composant réutilisable. Considérez ça comme React + Polymer mais avec une syntaxe plaisante et un temps d'apprentissage très faible.


### Lisible par les humains

Les balises personnalisées permettent de concevoir des vues complexes avec HTML. Votre application ressemblera peut-être à quelque-chose comme ça:

``` html
<body>

  <h1>Communauté Acme</h1>

  <forum-header/>

  <forum-content>
    <forum-threads/>
    <forum-sidebar/>
  </forum-content>

  <forum-footer/>

  <script>riot.mount('*', { api: forum_api })</script>
</body>
```

La syntaxe HTML est le langage *de facto* du Web et a été conçu pour faire des interfaces utilisateur. La syntaxe est explicite, and it's designed for building user interfaces. The syntax is explicit, l'imbrication des éléments est inhérente au langage, et les attributs offrent un moyen propre pour fournir des options aux balises personnalisées.

Les balises Riot sont [converties](/guide/compiler/) en JavaScript pur avant que les navigateurs puissent les exécuter..


### DOM virtuel
- Absolument la plus petite quantité possible de mises à jour et réinterprétation du DOM
- Un flux de données mono-directionnel: les mises à jour et démontages sont propagés vers le bas de parent à enfant
- Des expressions pré-compilées et mises en cache pour une haute performance
- Des évènements sur le cycle de vie pour plus de contrôle
- Un rendu côté serveur des balises personnalisées pour des applications universelles (isomorphiques)


### Proche des standards
- Pas de système d'évènements propriétaire
- Le DOM généré peut être manipulé librement par d'autres outils
- Pas d'éléments HTML en racine ou d'attributs `data-` rajoutés
- S'accorde bien avec jQuery


### Prêt pour l'outillage
- Créez des balises en ES6, TypeScript, CoffeeScript, Jade, LiveScript ou [n'importe quel préprocesseur](/guide/compiler/#pre-processors) de votre choix
- Integrez avec NPM, CommonJS, AMD, Bower ou Component
- Développez avec des plugins [Gulp](https://github.com/e-jigsaw/gulp-riot), [Grunt](https://github.com/ariesjia/grunt-riot) ou [Browserify](https://github.com/jhthorsen/riotify)



## 2. Simple et minimaliste

Le minimalisme de Riot le distingue des autres:


### 1. Syntaxe plaisante

Un des objectifs de conception était d'introduire une syntaxe de balise puissante avec le minimum possible de code de préparation:

- Raccourcis puissants: `class={ enabled: is_enabled, hidden: hasErrors() }`
- Pas de considérations inutiles comme `render`, `state`, `constructor` or `shouldComponentUpdate`
- Interpolation: `Ajouter #{ items.length + 1 }` ou `class="item { selected: flag }"`
- La balise `<script>` entourant la logique est optionnelle
- Syntaxe ES6 compacte pour les méthodes


### 2. Faible courbe d'apprentissage

Riot a entre 10 et 100 fois moins de méthodes dans son API que les autres bibliothèques UI.

- Moins à apprendre. Moins de livres et tutoriaux à consulter
- Moins de choses propriétaires et plus de standard


### 3. Taille très légère

<small><em>polymer.min.js</em> – 138KB</small>
<span class="bar red"></span>

<small><em>react.min.js</em> – 119KB</small>
<span class="bar red" style="width: {{ 138 / 119 * 100 }}"></span>

<small><em>riot.min.js</em> – {{ site.size_min }}KB</small>
<span class="bar blue" style="width: {{ site.size_min / 121 * 100 }}%"></span>

- Moins de bugs
- Plus rapide à interpréter et moins coûteux à télécharger
- Exportable. La bibliothèque doit être plus petite que l'application.
- Moins à maintenir. Nous n'avons pas besoin d'une grosse équipe pour maintenir Riot



### 4. Petit, mais complet

Riot a tous les blocs de construction essentiels pour des applications modernes côté client:

- Vues "réactives" pour concevoir des interfaces utilisateur
- Bibliothèque d'évènements pour faire des API avec des modules isolés
- Un routeur pour s'occuper de l'URL et du bouton précédent

Riot est une "pile ouverte". Il est conçu pour les développeurs qui veulent éviter les idiomes spécifiques d'un framework. Les outils génériques vous permettent de mélanger et assortir les modèles de conception. Des systèmes comme Facebook Flux peuvent être [faits soi-même](https://github.com/jimsparkman/RiotControl).


> J'ai regardé un exemple riot.js, et ça m'a paru tellement clair que c'en est effrayant. [@paulbjensen](https://twitter.com/paulbjensen/status/558378720403419137)

> J'ai bricolé avec #RiotJS pendant une heure. Je l'ai installé avec Gulp, Browserify et Babel en un rien de temps. Je l'aime beaucoup jusqu'ici! [@AndrewDelPrete](https://twitter.com/AndrewDelPrete/status/630976295011127296)

> Aujourd'hui, j'ai utilisé #riotjs 2.0 pour la première fois et je peux admettre que ce sera une relation à long terme #js hautement recommandé. [@gianlucaguarini](https://twitter.com/gianlucaguarini/status/559756081862574080)

> J'ai aimé l'idée de #reactjs avec #flux mais j'aime #riotjs avec #riotcontrol encore plus!
[@tscok](https://twitter.com/tscok/status/580509124598829056)

> En train de regarder RiotJS https://muut.com/riotjs/ — sidéré par sa simplicité. [@defeated](https://twitter.com/defeated/status/559215403541757952)

> J'ai joué avec riot.js et je l'aime tellement plus que React. Minimaliste, rapide et avec une API compréhensible. [@juriansluiman](https://twitter.com/juriansluiman/status/560399379035865088)


## Conclusion

Riot, c'est les Web Components pour tout le monde. Considérez ça comme React + Polymer mais sans le superflu. C'est intuitif à l'usage et ça ne pèse presque rien. Et ça marche dès aujourd'hui. On ne réinvente pas la roue, mais on récupère plutôt les meilleures parties de ce qui existe autour pour en faire l'outil le plus simple possible.

Nous devrions nous concentrer sur les composants réutilisables plutôt que les templates. D'après les développeurs de React:

> "Les templates séparent les technologies, pas les problèmes."

En ayant la mise en page et la logique liées ensemble sous le même composant, l'ensemble du système devient plus clair. Nous respectons React pour cette importante perspicacité.


## L'article de blog initial

[From React to Riot 2.0](https://muut.com/blog/technology/riot-2.0/) (anglais)


