---
title: Miscellaneous
layout: default
class: apidoc
---

{% include api-tabs.html %}


### <a name="version"></a> `riot.version`

the current Riot version number as string: '{{ riot_version }}'


### <a name="brackets"></a> `riot.settings.brackets`

A global Riot setting to customize the start and end tokens of the expressions. For example


``` js
riot.settings.brackets = '[% %]'
```

let's you write expressions `<p>[% like_this %]</p>`. The start and end is separated with a space character.
