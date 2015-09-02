---
layout: default
title: Notes de versions
id: release-notes
---

# {{ page.title }}

## 2.2.4 *12 août 2015*

- Correction des bugs restants du noyau avant la plus grosse livraison 2.3.0 ; [plus de détails](https://github.com/riot/riot/issues?q=is%3Aissue+milestone%3A2.2.4)
- Support de multiples blocs de styles au sein du même composant
- Correction de bugs liés à la perte du contexte dans les boucles imbriquées
- Ajout de plus de tests dans la base de code
- *NOTE*: ceci est la dernière version stable avant l'abandon du support IE8
- [Roadmap à court terme](https://github.com/riot/riot/issues/1063)

## 2.2.3 *4 août 2015*

- Correction de nombreux bugs ; [plus de détails](https://github.com/riot/riot/issues/1063)

## 2.2.2 *5 juillet 2015*

- Nouveau: les composants enfants héritent des propriétés de leur parent, y-compris dans une boucle
- Nouveau: riot est capable de compiler les attributs sur la balise de plus haut niveau ; [plus de détails](https://github.com/riot/riot/issues/948)
- Amélioration de la performance des boucles et nombreux correctifs de bugs
- Amélioration de la compatibilité AMD/CommonJS
- Correction de l'erreur renvoyée dans le compilateur pour les balises utilisant l'attribut `type=text/javascript`
- Correction des variables du parent qui n'était pas exposées aux enfants dans une boucle, maintenant __tous les enfants dans une boucle héritent des propriétés et méthodes de leur parent__ ; [plus de détails](https://github.com/riot/riot/issues/896)
- Correction de l'erreur renvoyée lorsque l'on essayait de surcharger des propriétés d'évènements en lecture seule
- Correction de riot cli combiné au flag --modular quand il n'y a pas de fichier de destination spécifié

## 2.2.1 *28 juin 2015*

- Correction des options qui étaient mal passées aux enfants dans une boucle ; [plus de détails ici](https://github.com/riot/riot/issues/884)

## 2.2.0 *27 juin 2015*

- Nouvelle logique super rapide pour les boucles (les noeuds DOM ne seront plus réordonnés, [plus de détails ici](https://github.com/riot/riot/issues/484))
- Autorise à nouveau le mode `use strict`
- Autorise à nouveau le mode `coffescript` pour les nostalgiques
- Inconsistances réglées lorsque l'on utilisait des boucles avec des listes vides ou nulles
- Correction de `mount` dans les éléments enfants des boucles
- Couverture de code augmentée
- Ajout de la possibilité de spécifier où riot doit injecter le [CSS des balises personnalisées](/guide/#scoped-css) dans le DOM

La liste des correctifs de bugs et les détails peuvent être trouvés [ici](https://github.com/riot/riot/issues/773)

## 2.1.0 *20 mai 2015*

- [Mixins](/guide/#mixins)
- Possibilité de définir des attributs sur l'élément racine de la définition de la balise
- Séparation du compilateur node et du compilateur sur navigateur
- Script de build simplifié avec [smash](https://github.com/mbostock/smash)
- Ajout des branchements Saucelabs pour les tests multi-navigateurs
- Ajout des branchements Coveralls pour vérifier la couverture de code à chaque pull request

La liste des correctifs de bugs et les détails peuvent être trouvés [ici](https://github.com/riot/riot/issues/648)

## 2.0.15 *23 avril 2015*

- La nouvelle balise centrale `<yield>` permet la [transclusion HTML](/guide/#nested-html)
- Un nouvel attribut [riot-tag](/guide/#html-elements-as-tags) pour utiliser des éléments HTML standards comme points de montage
- Ajout de `tag.unmount(flag)` pour décider si le parent doit être supprimé ou non du DOM
- Ajout des méthodes `riot.route.start()` et `riot.route.stop()` pour démarrer et arrêter le routeur Riot. Ces méthodes vous permettent d'utiliser un routeur différent pour votre application.
- Le compilateur côté serveur supporte maintenant les modules AMD et CommonJS avec l'option de ligne de commande `--modular` ou `-m`
- Nombreux [correctifs de bugs](https://github.com/riot/riot/issues/584)
- Remerciements particuliers à *[@GianlucaGuarini](https://github.com/GianlucaGuarini)* pour cette livraison


## 2.0.14 *8 avril 2015*

- [Rendu côté serveur](/guide/#server-side-rendering)
- [Corrections de bugs](https://github.com/riot/riot/compare/v2.0.13...v2.0.14)

## 2.0.13 *11 mars 2015*

- Une grosse livraison de correctifs de bugs consistuée uniquement de [pull requests](https://github.com/riot/riot/compare/v2.0.12...v2.0.13) de la part de la communauté. Merci à vous !
- [Suite de tests](https://github.com/riot/riot/tree/master/test) plus importante

## 2.0.12 *2 mars 2015*

- Support des [Scopes CSS](/guide/#scoped-css)
- Accès direct aux [balises imbriquées](/api/#nested-tags) et à leur API via la variable `tags`. Par exemple: `tags.my_timer.clear()`
- Les balises personnalisées sont maintenant construites pendant la phase de lecture et initialisées pendant la phase de montage. Ceci est un travail préliminaire pour le prochain [système de plugins](https://github.com/riot/riot/issues/416) et permet aux plugins de faire leur boulot avant l'initialisation.
- L'option `--whitespace` du compilateur préserve les nouvelles lignes et espaces blancs dans le code généré. Bien pour les éléments imbriqués `pre` et `textarea`.
- Utilisation de [Karma](http://karma-runner.github.io/0.12/index.html) pour le test multi-navigateurs.
- *ATTENTION* le déprécié `riot.mountTo` sera supprimé à la prochaine livraison


## 2.0.11 *23 février 2015*

- `riot.mount` accepte maintenant les mêmes paramètres que `riot.mountTo`, qui est maintenant *deprécié*
- Le nouveau `riot.mount(selector, tagName, opts)` vous permet de monter une certaine balise sur n'importe quelle sélection d'éléments HTML
- `riot.unmount` suivi par `riot.mount` remplace maintenant correctement la balise précédente
- Suite de tests v1. Attendez-vous à la voir grandir en taille et en fonctionnalités. Merci à [@GianlucaGuarini](https://github.com/GianlucaGuarini)


## 2.0.10 *19 février 2015*

- [Exemple Todo MVC](https://github.com/txchen/feplay/tree/gh-pages/riot_todo)
- Les éléments de liste peuvent être triés et arrangés et la vue se mettra à jour en fonction. Merci à [@pakastin](https://github.com/pakastin)!
- Les balises `style` imbriquées sont automatiquement injectées dans `<head>` pour éviter un duplicat des definitions
- Possibilité de définir des balises sur la même ligne: `<tag></tag>`
- Support de la notation en une ligne pour les méthodes ES6: `foo() { this.bar = 'baz' }`
- Pas de requêtes serveur illégales avec les images: `<img src={ src }>`
- Correction du compilateur pour supporter les notations crochets personnalisées
- `this.update()` n'est plus nécessaire pour définir des balises manuellement avec `riot.tag`. Cette méthode est maintenant automatiquement appelée après qu'un gestionnaire d'évènements est exécuté
- [Guidelines pour les contributeurs](https://github.com/riot/riot/blob/master/CONTRIBUTING.md)


## 2.0.9 *13 février 2015*

- Support de LiveScript
- Possibilité de définir les attributs `if`, `show` et `hide` pour une balise personnalisée
- Raccourci pour les classes multiples: `{ 'foo bar': baz }`
- Propriété `children` retirée, son besoin était surtout théorique.
- Fuite mémoire corrigée sur `riot.observable`. Merci à [@GianlucaGuarini](https://github.com/GianlucaGuarini) pour le gros travail de débogage et à tous les autres sur cette [pull request](https://github.com/riot/riot/issues/248)


## 2.0.8 *9 février 2015*

- Nouvelle méthode `unmount()` et nouvelle propriété `children[]` pour les [instances de balises](/api/#tag-instance)
- Flux de données mono-directionnel: les mises à jour et démontages se propagent toujours vers le bas du parent aux enfants
- L'attribut `if` fonctionne maintenant comme prévu en ajoutant ou supprimant le noeud racine du DOM
- [L'API du compilateur](/api/compiler/) est désormais exposée au public
- Les variables globales sont supportées dans les expressions, i.e. `{ location }`
- Extension `.tag` personnalisable, i.e. `riot --ext html`
- [Notation crochets](/api/misc/#brackets) personnalisable, i.e. `riot.settings.brackets = '${ }'`
- Possibilité d'afficher la version actuelle avec: `riot --version`
- La fonction à moitié cachée `riot._tmpl()` est désormais complètement cachée et ne fait plus partie de l'objet global `riot`
- Code source réorganisé. L'ancien gros `view.js` est désormais divisé en [multiples fichiers](https://github.com/riot/riot/tree/master/lib/browser/tag)


## 2.0.7 *29 janvier 2015*

- [Compilation dans le navigateur](/guide/compile/) super rapide pour: `<script type="riot/tag">`
- [Support natif de Typescript](/guide/compiler/#typescript)
- Possibilité de brancher un préprocesseur HTML (aux côtés d'un préprocesseur JS)
- Support natif de [Jade](/guide/compiler/#jade)
- Possibilité de définir des [interpréteurs personnalisés](/api/#route-parser) pour le routeur
- Les balises peuvent être du XML valide et les balises vides HTML5 ne sont pas auto-fermantes
- Autorise la définition de balises vides pour réserver un espace. Bien pour la phase de développement.
- `riot.observable()` retourne maintenant un nouvel observable quand il est appelé sans argument
- Le compilateur s'appelle désormais comme ceci:


```
var riot = require('riot')
var js_string = riot.compile(tag_source_string)
```


## 2.0.5 *27 janvier 2015*

- Possibilité de brancher un préprocesseur JavaScript
- Support natif de CoffeeScript
- Support natif de EcmaScript 6


## 2.0.2 *26 janvier 2015*

- Support de CommonJS et AMD
- Support de Component
- Support de Bower
- `npm install` fonctionne maintenant avec io.js et node 0.11
- `require('riot')` retourne maintenant riot.js (pour bien s'accorder avec Browserify etc.)
- `require('riot/compiler')` retourne le compilateur
- `riot.js` et `riot.min.js` se trouvent maintenant à la racine du répertoire
- hébergé sur [cdnjs](https://cdnjs.com/libraries/riot) et [jsdelivr](http://www.jsdelivr.com/#!riot)


## 2.0 *22 janvier 2015*

[A React- like, 2.5KB user interface library](https://muut.com/blog/technology/riot-2.0/)

Une mise à jour significative et non rétrocompatible.

![](https://muut.com/blog/technology/riot-2.0/riot1to2.png)


## 1.0 *15 avril 2014*

Suppression de jQuery en dépendance.


## 0.9 *1er Novembre 2013*

[The 1kb client-side MVP library](https://muut.com/blog/technology/riotjs-the-1kb-mvp-framework.html)

Version initiale.
