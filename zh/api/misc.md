---
title: 其它
layout: zh
class: apidoc
---

{% include zh/api-tabs.html %}


### <a name="version"></a> riot.version

返回当前版本字符串: `'{{ site.version }}'`


### <a name="brackets"></a> riot.settings.brackets

A global Riot全局设置项，用来自定义表达式的开始和结束记号。 例如


``` js
riot.settings.brackets = '[% %]'
```

之后的表达式可写成 `<p>[% like_this %]</p>`. 其中起始记号和结束记号之间用空格隔开。
