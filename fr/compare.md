---
layout: fr
title: Comparaison entre Riot, React et Polymer
---

# **Riot** vs **React** & **Polymer**

Et comment React se distingue de ses plus proches cousins.

## React

Riot est inspiré par React et son idée de "cohésion". D'après les développeurs à Facebook:

> "Les templates séparent les technologies, pas les problèmes."

Nous respectons cette perspicacité. Le but est de concevoir des composants réutilisables au lieu de templates. En séparant la logique des templates (en utilisant des sélecteurs jQuery par exemple), nous sommes en fait en train de séparer des choses qui devraient être ensemble.

En combinant ces technologies ensemble sous le même composant, le système devient plus clair. Nous respectons React à cause de cette importante perspicacité.

React a bien fonctionné pour nous, et nous continuons à l'utiliser pour notre [importateur Disqus](/importer/) mais nous étions ennuyés par la taille et la syntaxe de React (*surtout* la syntaxe). Nous avons commencé à penser que cela pourrait être plus simple; à la fois en interne et pour l'utilisateur.


### Syntaxe React

L'exemple suivant a été directement tiré de la page principale de React:


``` javascript
var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});

React.render(<TodoApp />, mountNode);
```

JSX est une mixture de HTML et de JavaScript. Vous pouvez inclure du HTML n'importe où dans le composant; à l'intérieur des méthodes et dans des assignations de propriétés.


### Syntaxe Riot

Voici la même chose avec Riot:

``` html
<todo>
  <h3>TODO</h3>

  <ul>
    <li each={ item, i in items }>{ item }</li>
  </ul>

  <form onsubmit={ handleSubmit }>
    <input>
    <button>Add #{ items.length + 1 }</button>
  </form>

  this.items = []

  handleSubmit(e) {
    var input = e.target[0]
    this.items.push(input.value)
    input.value = ''
  }
</todo>
```

Et voilà comment le tag précédent est monté sur une page:

``` html
<todo></todo>

<script>riot.mount('todo')</script>
```

### Pareil, pareil — mais différent

Avec Riot, le HTML et le JavaScript apparaissent beaucoup plus familier. Les deux se trouvent sous le même composant, mais sont soigneusement séparés l'un de l'autre. Le HTML peut être mélangé avec des expressions JavaScript.

Pas de trucs propriétaires, excepté la notation pour les expressions incluses à l'intérieur d'accolades.

Vous voyez moins de code de préparation. Moins de crochets, de virgules, de propriétés système et de noms de méthode. Les chaînes de caractères peuvent être interpolées: `"Hello {world}"` au lieu de `"Hello " + this.state.world` et les méthodes peuvent être définies via la syntaxe compacte ES6. Bref, moins de tout.

Nous pensons que la syntaxe de Riot est le moyen le plus propre de séparer la mise en page et la logique tout en profitant des avantages des composants réutilisables isolés.


### String based vs DOM based

Quand un composant est initialisé, React interprète une chaîne de caractères tandis que Riot traverse un arbre DOM.

Riot récupères les expressions depuis l'arbre et les stockes dans une liste. Chaque expression a un pointeur sur son noeud DOM. A chaque exécution, ces expressions sont évaluées et comparées avec leurs valeurs dans le DOM. Si une valeur a changé, le noeud correspondant est mis à jour dans le DOM. Dans un sens, Riot a aussi un DOM virtuel, juste beaucoup plus simple.

Comme les expressions peuvent être mises en cache et que le cycle de mise à jour est très rapide, passer à travers 100 ou 1000 expressions prend généralement 1 milliseconde ou moins.

L'algorithme de synchronisation de React est beaucoup plus complexe puisque le code HTML peut changer de manière aléatoire après chaque mise à jour. Compte-tenu du défi énorme que cela représente, les développeurs à Facebook ont fait un travail impressionnant là-dessus.

Nous avons vu que ce calcul différentiel complexe pouvait être évité.

Avec Riot, la structure HTML est fixe. Seules les boucles et les conditions peuvent ajouter ou supprimer des éléments. Mais une `div` ne peut pas être convertie en `label` par exemple. Riot met uniquement à jour les expressions sans faire de remplacements complexes dans des sous-arbres.


### Flux et routage

React s'occupe uniquement de l'interface utilisateur, ce qui est une bonne chose. Tous les bons projets logiciels ont une ligne directrice très nette.

Facebook recommande d'utiliser [Flux](http://facebook.github.io/flux/docs/overview.html) pour structurer le code côté client. Il s'agit plus d'un modèle de conception qu'un framework et il comporte des idées excellentes.

Riot est fourni avec des tags personnalisés, un émetteur d'évènements (observable) et un routeur. Nous croyons qu'il s'agit là des blocs de construction fondamentaux pour les applications côté client. Les évènements amènent la modularité, le routeur gère l'URL et le bouton précédent et les tags personnalisés s'occupent de l'interface utilisateur.

Tout comme Flux, Riot est flexible et laisse les grosses décisions architecturelles au développeur. C'est juste une bibliothèque pour vous aider à atteindre votre but.

Vous pouvez concevoir un système comme Flux en utilisant les observables et le routeur de Riot. En fait, une telle chose [existe déjà](https://github.com/jimsparkman/RiotControl).


### 10 à 128 fois plus gros

React est dix fois plus gros que Riot.

<small><em>react.min.js</em> – 119KB</small>
<span class="bar red"></span>

<small><em>riot.min.js</em> – <span class="riot-size">{{ site.size_min }}KB</span></small>
<span class="bar blue" style="width: {{ site.size_min / 119 * 100 }}%"></span>

<br>

Le routeur recommandé pour React est 128 fois plus gros que le routeur de Riot.

<small><em>react-router.min.js</em> – 54.9KB</small>
<span class="bar red"></span>

<small><em>react-mini-router.min.js</em> – 8.6KB</small>
<span class="bar red" style="width: 15.6%"></span>

<small><em>riot.router.min.js</em> – 0.43KB</small>
<span class="bar blue" style="width: 0.7%"></span>

Nous admettons que la comparaison de ces routeurs n'est pas très juste car [react-router](https://github.com/rackt/react-router) a bien plus de fonctionnalités. Mais le graphique ci-dessus montre clairement l'objectif de Riot: fournir l'API le plus minimaliste pour faire le boulot.

L'écosystème React ressemble plus à un framework et privilégie les API plus vastes. L'alternative plus grosse est davantage populaire que [react-mini-router](https://github.com/larrymyers/react-mini-router) dans la communauté React.


# Polymer

Polymer prend le standard des Web Components et le rend disponible sur les derniers navigateurs. Cela permet d'écrire des tags personnalisés en suivant le standard.

Conceptuellement, Riot fait la même chose mais il y a des différences:

1. Riot met à jour uniquement les éléments qui ont changé, causant moins d'opérations DOM.

2. La syntaxe Polymer est plus complexe et requiert d'étudier plus de livres.

3. Les composants individuels sont importés via le HTML `link rel="import"`. Des polyfills doivent recourir à des files d'attentes de requêtes XHR, ce qui rend le tout douloureusement lent sauf si un outil dédié comme [vulcanize](https://github.com/polymer/vulcanize) est utilisé. Les tags Riot sont importées via `script src` et de multiples tags peuvent être combinés avec l'outillage usuel.

4. Aucun moyen de réaliser le rendu côté serveur


### 11 fois plus gros

Polymer(v1.0.6) + WebComponents(v0.7.7) est 11 fois plus gros que Riot

<small><em>polymer.min.js</em> – 138KB</small>
<span class="bar red"></span>

<small><em>riot.min.js</em> – <span class="riot-size">{{ site.size_min }}KB</span></small>
<span class="bar blue" style="width: {{ site.size_min / 138 * 100 }}%"></span>

On parle des Web components comme le [roi de tous les défis du polyfilling](http://developer.telerik.com/featured/web-components-arent-ready-production-yet/) et c'est pourquoi Polymer requiert une telle quantité de code.


### Experimental

Polymer est basée sur une technologie expérimentale. Le support natif des Web Components n'est pas présent sur Safari ou IE. Le statut IE est "en considération" et les plans de Safari sont incertains. Certains [commits](https://lists.webkit.org/pipermail/webkit-dev/2013-May/024894.html) sur Webkit semblent indiquer qu'ils ne comptent pas les supporter du tout. Et Polymer est capable d'apporter ses polyfills uniquement sur les _dernières versions_ des navigateurs “evergreen” (IE 10+).

Le projet Polymer est là [depuis 2 ans](https://github.com/Polymer/polymer/commit/0452ada044a6fc5818902e685fb07bb4678b2bc2) et n'a pas été adopté de manière significative. Il n'est pas encore certain que les Web Components soient un jour nativement supportés.
