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
import React from 'react';
import ReactDOM from 'react-dom';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: [], text: ''};
    }

    render() {
        const {items, text} = this.state;
        return (
            <div>
                <h3>TODO</h3>
                <ul>
                    <li>{items.map((item, i)=> <li key={i}>{item}</li>)}</li>
                </ul>
                <form onSubmit={this._onSubmit}>
                    <input onChange={this._onChange} value={text}/>
                    <button>Add #{items.length + 1}</button>
                </form>
            </div>
        );
    }

    _onChange(e) {
        this.setState({text: e.target.value});
    }

    _onSubmit(e) {
        e.preventDefault();
        const {items, text} = this.state;
        this.setState({
            items: items.concat(text),
            text: ''
        });
    }
}

ReactDOM.render(<Todo/>, mountNode);
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


### {{ site.compare.react }} fois plus gros
    
React (v{{ site.react.version }}) est {{ site.compare.react }} fois plus gros que Riot.
    
<small><em>react.min.js</em> – {{ site.react.size }}Ko</small>
<span class="bar red"></span>
    
<small><em>riot.min.js</em> – <span class="riot-size">{{ site.size_min }}Ko</span></small>
<span class="bar blue" style="width: {{ site.size_min | divided_by: site.react.size | times: 100 }}%"></span>
    
<br>

Le routeur recommandé pour React (v{{ site.react_router.version }}) est {{ site.compare.react_router_vs_riot_router }} fois plus gros que le routeur de Riot.

<small><em>react-router.min.js</em> – {{ site.react_router.size }}Ko</small>
<span class="bar red"></span>

<small><em>react-mini-router.min.js</em> – {{ site.react_mini_router.size }}Ko</small>
<span class="bar red" style="width: {{ site.react_mini_router.size | divided_by: site.react_router.size | times: 100 }}%"></span>

<small><em>riot.route.min.js</em> – {{ site.riot_route_size_min }}Ko</small>
<span class="bar blue" style="width:{{ site.riot_route_size_min | divided_by: site.react_router.size | times:100 }}%"></span>

Nous admettons que la comparaison de ces routeurs n'est pas très juste car [react-router](https://github.com/rackt/react-router) a bien plus de fonctionnalités. Mais le graphique ci-dessus montre clairement l'objectif de Riot: fournir l'API le plus minimaliste pour faire le boulot.

L'écosystème React ressemble plus à un framework et privilégie les API plus vastes. L'alternative plus grosse est davantage populaire que [react-mini-router](https://github.com/larrymyers/react-mini-router) dans la communauté React.


# Polymer

Polymer prend le standard des Web Components et le rend disponible sur les derniers navigateurs. Cela permet d'écrire des tags personnalisés en suivant le standard.

Conceptuellement, Riot fait la même chose mais il y a des différences:

1. La syntaxe des Web Components est expérimentale et complexe

2. Riot met à jour uniquement les éléments qui ont changé, causant moins d'opérations DOM.

3. Les composants individuels sont importés via le HTML `link rel="import"`. Des polyfills doivent recourir à des files d'attentes de requêtes XHR, ce qui rend le tout douloureusement lent sauf si un outil dédié comme [vulcanize](https://github.com/polymer/vulcanize) est utilisé. Les tags Riot sont importées via `script src` et de multiples tags peuvent être combinés avec l'outillage usuel.

4. Aucun moyen de réaliser le rendu côté serveur


### {{ site.compare.polymer_and_webcomponents }} fois plus gros

Polymer(v{{ site.polymer.version }}) + WebComponents(v{{ site.webcomponents.version }}) est {{ site.compare.polymer_and_webcomponents }} fois plus gros que Riot

<small><em>polymer.min.js</em> – {{ site.polymer.size }}Ko</small>
<span class="bar red"></span>

<small><em>riot.min.js</em> – <span class="riot-size">{{ site.size_min }}Ko</span></small>
<span class="bar blue" style="width: {{ site.size_min | divided_by: site.polymer.size | times: 100 }}%"></span>

On parle des Web components comme le [roi de tous les défis du polyfilling](http://developer.telerik.com/featured/web-components-arent-ready-production-yet/) et c'est pourquoi Polymer requiert une telle quantité de code.


## Web components

Parce que les Web Components sont un standard, il s'agit de la direction finale à prendre. Cela prendra des [années](http://caniuse.com/#search=web%20components), mais éventuellement le Web sera un jour rempli de ces composants standards.

A cause de la complexité sous-jacente, il y a de fortes chances pour que ces composants ne soient pas utilisés directement. Il y aura des couches par-dessus les Web Components. Tout comme il y a jQuery aujourd'hui. La plupart des gens n'utilisent pas directement le DOM.

Riot est une de ces abstractions. Il fournir une API facile à utiliser sur laquelle nos applications peuvent se reposer. Une fois que la spécification des Web Components aura évolué, Riot pourra l'utiliser *en interne* s'il y a de vrais bénéfices, tels que des gains de performance.

Le but de Riot est de rendre le développement d'interfaces utilisateur aussi facile que possible. L'API actuelle est conçue pour résister au flux constant des technologies Web. Vous pouvez le comparer à un "jQuery pour les Web Components" - il prend des raccourcis syntaxiques pour parvenir au même but. Il simplifie l'expérience globale de l'écriture de composants réutilisables.


