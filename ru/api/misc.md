---
title: Miscellaneous
layout: ru
class: apidoc
---

{% include api-tabs.html %}


### <a name="version"></a> riot.version

The current version number as String: `'{{ site.version }}'`


### <a name="brackets"></a> riot.settings.brackets

A global Riot setting to customize the start and end tokens of the expressions. For example


``` js
riot.settings.brackets = '[% %]'
```

let's you write expressions `<p>[% like_this %]</p>`. The start and end is separated with a space character.
