---
layout: ja
title: Riotを手に入れよう!
base: https://raw.githubusercontent.com/riot/riot/master
cdnjs: https://cdnjs.cloudflare.com/ajax/libs/riot
class: download
---

# Riot v**{{ site.version }}**

詳しくは[バージョン履歴](/release-notes)をどうぞ。すべてのファイルは、[MIT License](/license/)のもとオープンソースとして公開されています。

## ダウンロード

[riot.min.js]({{ page.base }}/riot.min.js)

[riot.js]({{ page.base }}/riot.js)

[compiler.min.js]({{ page.base }}/compiler.min.js)

[compiler.js]({{ page.base }}/compiler.js)

[riot+compiler.min.js]({{ page.base }}/riot+compiler.min.js)

[riot+compiler.js]({{ page.base }}/riot+compiler.js)


## CDNから


#### [jsdelivr](http://www.jsdelivr.com/#!riot)

`https://cdn.jsdelivr.net/g/riot@{{ site.minor_version }}(riot.min.js+compiler.min.js)` <small>(latest {{ site.minor_version }}.X)</small>

`https://cdn.jsdelivr.net/riot/{{ site.minor_version }}/riot.min.js` <small>(latest {{ site.minor_version }}.X)</small>

`https://cdn.jsdelivr.net/g/riot@{{ site.version }}(riot.min.js+compiler.min.js)`

`https://cdn.jsdelivr.net/riot/{{ site.version }}/riot.min.js`


#### [cdnjs](https://cdnjs.com/libraries/riot)

**NOTE** v{{ site.version }}は **{{ site.release_date }}** に公開されました。CDNJSが更新されるまで、30時間程度かかる場合があります。


`{{ page.cdnjs }}/{{ site.version }}/riot+compiler.min.js`

`{{ page.cdnjs }}/{{ site.version }}/riot.min.js`


## パッケージマネージャ

#### [Bower](http://bower.io/search/?q=riot.js)

`bower install riot`

#### [Component](http://component.github.io/?q=riot)

`component install riot/riot`

#### [NPM](https://www.npmjs.com/package/riot)

`npm install riot`


### GitHub

#### [riot/riot](https://github.com/riot/riot)

`git clone git@github.com:riot/riot.git`


## 既知の問題

- IE9において、テーブルの行(`tr`)または、セル(`td`, `th`)を、`each`属性でループさせることができない。


## ロゴ

![](/img/logo/riot480x.png)

[60x30](/img/logo/riot60x.png) &middot;
[120x60](/img/logo/riot120x.png) &middot;
[240x120](/img/logo/riot240x.png) &middot;
[480x240](/img/logo/riot480x.png) &middot;
[512x512](/img/logo/square.png) &middot;
[960x480](/img/logo/riot960x.png)
