---
layout: zh
title: 下载 Riot!
base: https://raw.githubusercontent.com/riot/riot/master
cdnjs: https://cdnjs.cloudflare.com/ajax/libs/riot
class: download
---

# Riot v**{{ site.version }}**

查看 [版本历史](/release-notes). 所有的文件以 [MIT License](/license/) 开源.

## 直接下载

[riot.min.js]({{ page.base }}/riot.min.js)

[riot.js]({{ page.base }}/riot.js)

[compiler.min.js]({{ page.base }}/compiler.min.js)

[compiler.js]({{ page.base }}/compiler.js)

[riot+compiler.min.js]({{ page.base }}/riot+compiler.min.js)

[riot+compiler.js]({{ page.base }}/riot+compiler.js)


## CDN


#### [jsdelivr](http://www.jsdelivr.com/#!riot)

`https://cdn.jsdelivr.net/g/riot@{{ site.minor_version }}(riot.min.js+compiler.min.js)` <small>(最新版 {{ site.minor_version }}.X)</small>

`https://cdn.jsdelivr.net/riot/{{ site.minor_version }}/riot.min.js` <small>(最新版 {{ site.minor_version }}.X)</small>

`https://cdn.jsdelivr.net/g/riot@{{ site.version }}(riot.min.js+compiler.min.js)`

`https://cdn.jsdelivr.net/riot/{{ site.version }}/riot.min.js`


#### [cdnjs](https://cdnjs.com/libraries/riot)

**NOTE** v{{ site.version }} 发布于 **{{ site.release_date }}** CDNJS 可能有约 30 小时的更新延迟.


`{{ page.cdnjs }}/{{ site.version }}/riot+compiler.min.js`

`{{ page.cdnjs }}/{{ site.version }}/riot.min.js`


### 包管理工具

#### [Bower](http://bower.io/search/?q=riot.js)

`bower install riot`

#### [Component](http://component.github.io/?q=riot)

`component install riot/riot`

#### [NPM](https://www.npmjs.com/package/riot)

`npm install riot`


### GitHub

#### [riot/riot](https://github.com/riot/riot)

`git clone git@github.com:riot/riot.git`


## 已知的问题

- Looping table rows or cells with 使用 `each` 属性对表格（table）的行或列进行循环在 IE8 和 IE9 上不能正常工作。


## Logo

![](/img/logo/riot480x.png)

[60x30](/img/logo/riot60x.png) &middot;
[120x60](/img/logo/riot120x.png) &middot;
[240x120](/img/logo/riot240x.png) &middot;
[480x240](/img/logo/riot480x.png) &middot;
[512x512](/img/logo/square.png) &middot;
[960x480](/img/logo/riot960x.png)
