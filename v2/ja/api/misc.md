---
title: その他
layout: ja
class: apidoc
redirect_from: "/ja/api/misc"
---

{% include ja/api-tabs.html %}


### <a name="version"></a> riot.version

現在のバージョン番号を文字列として: `'{{ site.v2_version }}'`


### <a name="brackets"></a> riot.settings.brackets

テンプレート変数の開始/終了トークンをカスタマイズするための、Riotのグローバル設定。例:


``` js
riot.settings.brackets = '[% %]'
```

`<p>[% like_this %]</p>`のように書けます。開始と終了はスペースで区切られています。
