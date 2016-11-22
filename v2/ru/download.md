---
layout: ru
title: Загрузить Riot!
base: https://raw.githubusercontent.com/riot/riot/master
cdnjs: https://cdnjs.cloudflare.com/ajax/libs/riot
class: download
---

# Riot v**{{ site.v2_version }}**

Историю изменения можно посмотреть [тут](/v2/release-notes). Все файлы распространяются под лицензией [MIT](/license/).

## Вы можете скачать файлы тут

[riot.min.js]({{ page.base }}/riot.min.js)

[riot.js]({{ page.base }}/riot.js)

[compiler.min.js]({{ page.base }}/compiler.min.js)

[compiler.js]({{ page.base }}/compiler.js)

[riot+compiler.min.js]({{ page.base }}/riot+compiler.min.js)

[riot+compiler.js]({{ page.base }}/riot+compiler.js)


## CDN


#### [jsdelivr](http://www.jsdelivr.com/#!riot)

`https://cdn.jsdelivr.net/g/riot@{{ site.v2_minor_version }}(riot.min.js+compiler.min.js)` <small>(latest {{ site.v2_minor_version }}.X)</small>

`https://cdn.jsdelivr.net/riot/{{ site.v2_minor_version }}/riot.min.js` <small>(latest {{ site.v2_minor_version }}.X)</small>

`https://cdn.jsdelivr.net/g/riot@{{ site.v2_version }}(riot.min.js+compiler.min.js)`

`https://cdn.jsdelivr.net/riot/{{ site.v2_version }}/riot.min.js`


#### [cdnjs](https://cdnjs.com/libraries/riot)

`{{ page.cdnjs }}/{{ site.v2_version }}/riot+compiler.min.js`

`{{ page.cdnjs }}/{{ site.v2_version }}/riot.min.js`


### Пакетные менеджеры

#### [Bower](http://bower.io/search/?q=riot.js)

`bower install riot`

#### [Component](http://component.github.io/?q=riot)

`component install riot/riot`

#### [NPM](https://www.npmjs.com/package/riot)

`npm install riot`


### GitHub

#### [riot/riot](https://github.com/riot/riot)

`git clone git@github.com:riot/riot.git`


## Известные проблемы

- Перебор строк или ячеек таблиц через аттрибут `each` не работает в IE8 и IE9.

## Логотип

![](/img/logo/riot480x.png)

[60x30](/img/logo/riot60x.png) &middot;
[120x60](/img/logo/riot120x.png) &middot;
[240x120](/img/logo/riot240x.png) &middot;
[480x240](/img/logo/riot480x.png) &middot;
[512x512](/img/logo/square.png) &middot;
[960x480](/img/logo/riot960x.png)
