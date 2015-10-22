---
layout: fr
title: Téléchargez Riot!
base: https://raw.githubusercontent.com/riot/riot/master
cdnjs: https://cdnjs.cloudflare.com/ajax/libs/riot
class: download
---

# Riot v**{{ site.version }}**

Voir notre [historique des versions](/release-notes). Tous les fichiers sont Open Source en [licence MIT](/license/).

## Téléchargements directs

[riot.min.js]({{ page.base }}/riot.min.js)

[riot.js]({{ page.base }}/riot.js)

[compiler.min.js]({{ page.base }}/compiler.min.js)

[compiler.js]({{ page.base }}/compiler.js)

[riot+compiler.min.js]({{ page.base }}/riot+compiler.min.js)

[riot+compiler.js]({{ page.base }}/riot+compiler.js)


## Réseaux de distribution (CDN)


#### [jsdelivr](http://www.jsdelivr.com/#!riot)

`https://cdn.jsdelivr.net/g/riot@{{ site.minor_version }}(riot.min.js+compiler.min.js)` <small>(dernière version {{ site.minor_version }}.X)</small>

`https://cdn.jsdelivr.net/riot/{{ site.minor_version }}/riot.min.js` <small>(dernière version {{ site.minor_version }}.X)</small>

`https://cdn.jsdelivr.net/g/riot@{{ site.version }}(riot.min.js+compiler.min.js)`

`https://cdn.jsdelivr.net/riot/{{ site.version }}/riot.min.js`


#### [cdnjs](https://cdnjs.com/libraries/riot)

**NOTE** La v{{ site.version }} a été livrée le **{{ site.release_date }}** et CDNJS met environ 30 heures pour mettre à jour.


`{{ page.cdnjs }}/{{ site.version }}/riot+compiler.min.js`

`{{ page.cdnjs }}/{{ site.version }}/riot.min.js`


### Gestionnaires de paquets

#### [Bower](http://bower.io/search/?q=riot.js)

`bower install riot`

#### [Component](http://component.github.io/?q=riot)

`component install riot/riot`

#### [NPM](https://www.npmjs.com/package/riot)

`npm install riot`


### GitHub

#### [riot/riot](https://github.com/riot/riot)

`git clone git@github.com:riot/riot.git`


## Problèmes connus

- Itérer sur des cellules ou des lignes de tableaux avec un attribut `each` ne fonctionne pas sur IE8 et IE9 is not working on IE8 and IE9.


## Logo

![](/img/logo/riot480x.png)

[60x30](/img/logo/riot60x.png) &middot;
[120x60](/img/logo/riot120x.png) &middot;
[240x120](/img/logo/riot240x.png) &middot;
[480x240](/img/logo/riot480x.png) &middot;
[512x512](/img/logo/square.png) &middot;
[960x480](/img/logo/riot960x.png)
