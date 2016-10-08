---
layout: fr
title: Téléchargez Riot!
base: https://raw.githubusercontent.com/riot/riot/master
cdnjs: https://cdnjs.cloudflare.com/ajax/libs/riot
class: download
---

# Riot v**{{ site.version }}**

Voir notre [historique des versions](/fr/release-notes). Tous les fichiers sont Open Source en [licence MIT](/license/).

## Téléchargements directs

[riot.min.js]({{ page.base }}/riot.min.js)

[riot.js]({{ page.base }}/riot.js)

[riot+compiler.min.js]({{ page.base }}/riot+compiler.min.js)

[riot+compiler.js]({{ page.base }}/riot+compiler.js)


## Réseaux de distribution (CDN)


#### [jsdelivr](http://www.jsdelivr.com/#!riot)


`https://cdn.jsdelivr.net/riot/{{ site.minor_version }}/riot+compiler.min.js` <small>(dernière version {{ site.minor_version }}.X)</small>

`https://cdn.jsdelivr.net/riot/{{ site.minor_version }}/riot.min.js` <small>(dernière version {{ site.minor_version }}.X)</small>

`https://cdn.jsdelivr.net/riot/{{ site.version }}/riot+compiler.min.js`

`https://cdn.jsdelivr.net/riot/{{ site.version }}/riot.min.js`


#### [cdnjs](https://cdnjs.com/libraries/riot)

`{{ page.cdnjs }}/{{ site.version }}/riot+compiler.min.js`

`{{ page.cdnjs }}/{{ site.version }}/riot.min.js`


### Gestionnaires de paquets

#### [Bower](http://bower.io/search/?q=riot.js)

`bower install riot`

#### [Component](http://component.github.io/?q=riot)

`component install riot/riot`

#### [NPM](https://www.npmjs.com/package/riot)

`npm install riot`

### Applications Chrome

Si vous voulez utilisez riot dans vos applications Chrome, vous devez inclure une version spécifique de riot à cause de la politique de sécurité [Chrome Content Security Policy](https://github.com/riot/riot/issues/1076)

[riot.csp.js]({{ page.base }}/riot.csp.js)

[riot.csp.min.js]({{ page.base }}/riot.csp.min.js)

Dans vos applications Chrome, vous devez [précompiler vos tags](/guide/compiler/#pre-compilation) car ils ne peuvent pas être compilés à l'exécution.

### GitHub

#### [riot/riot](https://github.com/riot/riot)

`git clone git@github.com:riot/riot.git`

## Logo

![](/img/logo/riot480x.png)

[60x30](/img/logo/riot60x.png) &middot;
[120x60](/img/logo/riot120x.png) &middot;
[240x120](/img/logo/riot240x.png) &middot;
[480x240](/img/logo/riot480x.png) &middot;
[512x512](/img/logo/square.png) &middot;
[960x480](/img/logo/riot960x.png)
