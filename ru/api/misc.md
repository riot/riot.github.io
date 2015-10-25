---
title: Разное
layout: ru
class: apidoc
---

{% include api-tabs.html %}


### <a name="version"></a> riot.version

Текущая версия: `'{{ site.version }}'`


### <a name="brackets"></a> riot.settings.brackets

Глобальные настройки Riot, которые задают вид открывающих и закрывающих символов для выражений в шаблонах. Открывающие и закрывающие символы должны быть разделены пробелом Например:

``` js
riot.settings.brackets = '[% %]'
```

Это позволит вам использовать выражение вроде `<p>[% like_this %]</p>`.
