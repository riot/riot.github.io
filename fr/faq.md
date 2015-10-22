---
layout: fr
title: Riot FAQ
description: Questions et Réponses à propos de Riot, la micro-bibliothèque d'interface utilisateur (UI)
---

# Questions fréquemment posées

## Pourquoi ce projet s'appelle Riot ?
Riot est contre la mode actuelle du code boilerplate et de la complexité inutile. Nous pensons qu'une API petite et puissante et une syntaxe concise sont des choses extrêmement importantes pour une bibliothèque côté client.


## Est-ce que Riot est gratuit ?
Riot est gratuit, open source et sous licence MIT. Il n'y a pas de [droits de brevet supplémentaires](https://github.com/facebook/react/blob/master/PATENTS).


## Puis-je utiliser Riot en production ?
Absolument. C'est un framework mature [adopté quotidiennement](https://twitter.com/search?q=riotjs).

## Pourquoi IE8 n'est pas supporté ?
Parce qu'il est fou de gâcher le temps du développeur pour un navigateur mourant. D'après [W3 counter](http://www.w3counter.com/trends), seulement 1.5% des utilisateurs sont sur IE8:

![](/img/ie8-trend.png)

Statcounter [dit 2.5%](http://gs.statcounter.com/#browser_version_partially_combined-ww-monthly-201408-201507).

Ce navigateur de mauvaise qualité peut être ignoré en toute prudence. Riot 2.0 a été initialement lancé avec le support IE8 mais depuis, l'utilisation de IE8 a diminué de plus de 50%.


## Dois-je utiliser un tiret dans le nom du tag ?
Les spécifications W3C vous demandent de mettre au moins un tiret dans le nom de vos tags personnalisés. Au lieu de `<person>` vous devez écrire `<my-person>`. Obéissez à cette règle si vous vous souciez du W3C. Les deux fonctionnent bien.


## Pourquoi n'y a-t-il pas de points virgule dans le code source ?
Laisser de côté les points virgule rend le code moins chargé. Cela s'accorde avec notre approche générale minimaliste. Nous utilisons des guillemets simples pour la même raison. Si vous contribuez à Riot, veuillez éviter les points virgule et guillemets doubles.

## Pourquoi utiliser le dangereux opérateur `==` ?
L'opérateur d'égalité est correct quand vous savez comment il fonctionne. Nous faisons par exemple:

`node.nodeValue = value == null ? '' : value`

Cela affiche `0` et `false` mais `null` et `undefined` sont affichées comme une chaine de caractères vide. Exactement ce que l'on veut !


## Puis-je utiliser des balises `style` dans un fichier .tag ?
Oui. Vous pouvez utiliser du CSS normalement à l'intérieur d'une tag personnalisé. Le standard Web Components a aussi un mécanisme pour encapsuler du CSS. Cependant, il est peu probable que cela améliore la gestion globale de votre CSS.


## Quel est le rôle de jQuery?
Riot réduit le besoin de jQuery. Vous n'avez plus besoin de sélecteurs, de parcours du DOM, d'évènements et de fonctions de manipulation. Certaines fonctionnalités comme les évènements délégués peuvent être utiles. Les plugins jQuery peuvent être utilisés avec Riot.


## `onclick` n'est-il pas dangereux ?
Ce n'est pas dangereux, ça a juste l'air "vieux". Avoir du JS et du HTML dans le même module est plus important que les questions esthétiques. La syntaxe minimale de Riot donne aux gestionnaires d'évènements un air décent.

## De futurs projets ?

Bien sûr. Nous nous concentrons surtout sur [la stabilité et la performance](https://github.com/riot/riot/issues) et essayons de fournir [plus d'exemples](https://github.com/riot/examples).

