---
title: その他
layout: ja
class: apidoc
---

{% include ja/api-tabs.html %}


### <a name="version"></a> riot.version

現在のバージョン番号を文字列として: `'{{ site.v2_version }}'`

### <a name="brackets"></a> riot.settings.brackets

テンプレート変数の開始/終了トークンをカスタマイズするための、Riotのグローバル設定。例:


``` js
riot.settings.brackets = '[% %]'
```

`<p>[% like_this %]</p>`のように書けます。開始と終了はスペースで区切られています。

### <a name="asyncrendertimeout"></a> riot.settings.asyncRenderTimeout

`riot.renderAsync` のタイムアウト時間を変更することができます(デフォルト値は 1000ミリ秒となります)。

```js
riot.settings.asyncRenderTimeout = 2000 // ms
```

### <a name="util"></a> riot.util.tmpl

Riotの内部で使われているテンプレートエンジンを参照します。

### <a name="tmpl-errors"></a> riot.util.tmpl.errorHandler

Riotのテンプレートエンジンによって隠蔽されたすべてのエラーを補足するためのユーティリティフックです。

```js
riot.util.tmpl.errorHandler = function (err) {
  console.error(err.message + ' in ' + err.riotData.tagName) // あなたのエラーロジックはここに格納されています。
}
```

### <a name="util"></a> riot.util.styleManager

カスタムタグのCSSを生成し、挿入するために使用されるオブジェクトです。

### <a name="util"></a> riot.util.vdom

Riotによって作成された全てのタグのインスタンスに対して、参照やデバッグ、フィルタリングなどを行うために、Riotが持つ全てのタグを公開します。

```js
riot.tag('foo', '<p>{ msg }</p>', function() {
  this.msg = 'hi'
})
riot.mount('foo')
console.log(riot.vdom[0].msg) // 'hi'
```

### <a name="util"></a> riot.util.dom

クエリを発行する `$` や、属性を追加する `addAttr` のようなDOM要素を更新するようなユーティリティ関数の集まりです。

[source code](https://github.com/riot/riot/blob/next/lib/browser/common/util/dom.js)

### <a name="util"></a> riot.util.check

型をチェックするための必要とされるヘルパ関数の集まりです。

[source code](https://github.com/riot/riot/blob/next/lib/browser/common/util/check.js)

### <a name="util"></a> riot.util.misc

`extend` によるオブジェクトの拡張や、 `each` によるループ配列などのヘルパ関数の集まりです。

[source code](https://github.com/riot/riot/blob/next/lib/browser/common/util/misc.js)

### <a name="util"></a> riot.util.tags

全てのRiotのタグインスタンスを内部的に管理するために必要な関数の集まりです。

[source code](https://github.com/riot/riot/blob/next/lib/browser/common/util/tags.js)
