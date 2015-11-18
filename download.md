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

[compiler.min.js]({{ page.base }}/compiler.min.js)

[compiler.js]({{ page.base }}/compiler.js)

[riot+compiler.min.js]({{ page.base }}/riot+compiler.min.js)

[riot+compiler.js]({{ page.base }}/riot+compiler.js)


## Content delivery networks


#### [jsdelivr](http://www.jsdelivr.com/#!riot)

**NOTE** temporally `riot+compiler.min.js` on jsdelivr is broken. It will be fixed in the next release. Until then, use cdnjs instead.

`https://cdn.jsdelivr.net/riot/{{ site.minor_version }}/riot+compiler.min.js` <small>(latest {{ site.minor_version }}.X)</small>

`https://cdn.jsdelivr.net/riot/{{ site.minor_version }}/riot.min.js` <small>(latest {{ site.minor_version }}.X)</small>

`https://cdn.jsdelivr.net/riot/{{ site.version }}/riot+compiler.min.js`

`https://cdn.jsdelivr.net/riot/{{ site.version }}/riot.min.js`


#### [cdnjs](https://cdnjs.com/libraries/riot)

**NOTE** v{{ site.version }} was released on **{{ site.release_date }}** and CDNJS takes around 30 hours to update.


`{{ page.cdnjs }}/{{ site.version }}/riot+compiler.min.js`

`{{ page.cdnjs }}/{{ site.version }}/riot.min.js`


### Package managers

#### [Bower](http://bower.io/search/?q=riot.js)

`bower install riot`

#### [Component](http://component.github.io/?q=riot)

`component install riot/riot`

#### [NPM](https://www.npmjs.com/package/riot)

`npm install riot`


### GitHub

#### [riot/riot](https://github.com/riot/riot)

`git clone git@github.com:riot/riot.git`


## Known issues

- Looping table rows or cells with `each` attribute is not working on IE8 and IE9.


## Logo

![](/img/logo/riot480x.png)

[60x30](/img/logo/riot60x.png) &middot;
[120x60](/img/logo/riot120x.png) &middot;
[240x120](/img/logo/riot240x.png) &middot;
[480x240](/img/logo/riot480x.png) &middot;
[512x512](/img/logo/square.png) &middot;
[960x480](/img/logo/riot960x.png)
