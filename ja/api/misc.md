---
title: その他
layout: ja
class: apidoc
---

{% include ja/api-tabs.html %}


### <a name="version"></a> riot.version

現在のバージョン番号を文字列として: `'{{ site.version }}'`

### <a name="skipanonymoustags"></a> riot.settings.skipAnonymousTags (default `true`)

<span class="tag red">&gt;= v3.2</span>

Riotでは、ループ内の全ての新しいタグは新しいrRiotタグインスタンスを生成します。これはカスタムタグや、`<li each={ item in items }>{ item }</li>`のような`anonymous`タグに対しても発生します。ループの終わりでは、`anonymous`タグは目に見えるべきではなく、かつレンダリングプロセスを大幅に高速化するためにriot mixinsに渡されるべきではないため、私たちRiotは新しいタグインスタンスを生成します。

しかし、バージョンが3.2以下のRiotは、メモリが重くなったり、レンダリング性能が低下するカスタムタグと同じ方法で、全ての`anonymous`タグを生成するために使われました。`skipAnonymousTags = false`の場合、`anonymous`タグはもはや軽いタグとして生成されなくなり、あなたのアプリケーションは〜30%遅くなります。

``` js
riot.settings.skipAnonymousTags = false
```

### <a name="autoupdate"></a> riot.settings.autoUpdate (default `true`)

<span class="tag red">&gt;= v3.6</span>

アップデートイベントは、ユーザーがRiotタグのいずれかをディスパッチする際に、DOMハンドラ（`onclick`など）を含むRiotタグ内で自動的にトリガーされます。`autoUpdate`オプションをfalseに設定すると、この動作が無効になり、手動でタグのアップデートをトリガーする必要があります。

``` js
riot.settings.autoUpdate = false
```

### <a name="brackets"></a> riot.settings.brackets (default `{ }`)

テンプレート変数の開始/終了トークンをカスタマイズするための、Riotのグローバル設定。例:

``` js
riot.settings.brackets = '[% %]'
```

`<p>[% like_this %]</p>`のように書けます。開始と終了はスペースで区切られています。


### <a name="asyncrendertimeout"></a> riot.settings.asyncRenderTimeout

`riot.renderAsync` のタイムアウト時間を変更することができます(デフォルト値は 1000ミリ秒)。

```js
riot.settings.asyncRenderTimeout = 2000 // ms
```

### <a name="util"></a> riot.util.tmpl

Riotの内部で使われているテンプレートエンジンを参照します。

### <a name="tmpl-errors"></a> riot.util.tmpl.errorHandler

Riotのテンプレートエンジンによって隠蔽されたすべてのエラーを補足するためのユーティリティフックです。

```js
riot.util.tmpl.errorHandler = function (err) {
  console.error(err.message + ' in ' + err.riotData.tagName) // あなたのエラーロジックはここに格納
}
```

### <a name="util"></a> riot.util.styleManager

カスタムタグのCSSを生成し、挿入するために使用されるオブジェクトです。

### <a name="util"></a> riot.util.vdom

Riotによって作成された全てのタグのインスタンスに対して、参照、デバッグ、フィルタリングなどを行うために、Riotが内部で持つタグのキャッシュを公開します。

```js
riot.tag('foo', '<p>{ msg }</p>', function() {
  this.msg = 'hi'
})
riot.mount('foo')
console.log(riot.vdom[0].msg) // 'hi'
```

### <a name="util"></a> riot.util.dom

クエリを発行する `$` や、ノードに属性を追加する `setAttr` のようなDOM要素を更新するようなユーティリティ関数の集まりです。

[source code](https://github.com/riot/riot/blob/master/lib/browser/common/util/dom.js)

### <a name="util"></a> riot.util.check

型をチェックするために必要とされるヘルパ関数の集まりです。

[source code](https://github.com/riot/riot/blob/master/lib/browser/common/util/check.js)

### <a name="util"></a> riot.util.misc

オブジェクトを拡張する `extend` や、配列をループする `each` などのヘルパ関数の集まりです。

[source code](https://github.com/riot/riot/blob/master/lib/browser/common/util/misc.js)

### <a name="util"></a> riot.util.tags

全てのRiotのタグインスタンスを内部的に管理するために必要な関数の集まりです。

[source code](https://github.com/riot/riot/blob/master/lib/browser/common/util/tags.js)
