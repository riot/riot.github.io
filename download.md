---
layout: default
title: Get Riot!
base: https://raw.githubusercontent.com/riot/riot/master
cdnjs: https://cdnjs.cloudflare.com/ajax/libs/riot
class: download
---

# Riot v**{{ site.version }}**

View our [version history](/release-notes). All Files are Open Source with [MIT License](/license/).

## Direct downloads

[riot.min.js]({{ page.base }}/riot.min.js)

[riot.js]({{ page.base }}/riot.js)

[riot+compiler.min.js]({{ page.base }}/riot+compiler.min.js)

[riot+compiler.js]({{ page.base }}/riot+compiler.js)


## Content delivery networks


#### [jsdelivr](http://www.jsdelivr.com/#!riot)


`https://cdn.jsdelivr.net/riot/{{ site.minor_version }}/riot+compiler.min.js` <small>(latest {{ site.minor_version }}.X)</small>

`https://cdn.jsdelivr.net/riot/{{ site.minor_version }}/riot.min.js` <small>(latest {{ site.minor_version }}.X)</small>

`https://cdn.jsdelivr.net/riot/{{ site.version }}/riot+compiler.min.js`

`https://cdn.jsdelivr.net/riot/{{ site.version }}/riot.min.js`


#### [cdnjs](https://cdnjs.com/libraries/riot)

`{{ page.cdnjs }}/{{ site.version }}/riot+compiler.min.js`

`{{ page.cdnjs }}/{{ site.version }}/riot.min.js`


### Package managers

#### [Bower](http://bower.io/search/?q=riot.js)

`bower install riot`

#### [Component](http://component.github.io/?q=riot)

`component install riot/riot`

#### [NPM](https://www.npmjs.com/package/riot)

`npm install riot`

### Chrome apps

If you want to use riot in your Chrome apps you must include a special riot version due to [Chrome due to Content Security Policy](https://github.com/riot/riot/issues/1076)

[riot.csp.js]({{ page.base }}/riot.csp.js)

[riot.csp.min.js]({{ page.base }}/riot.csp.min.js)

In your Chrome apps you must [precompile your tags](/guide/compiler/#pre-compilation) because they can not compiled in runtime

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
