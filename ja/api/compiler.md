---
title: コンパイラ
layout: ja
class: apidoc
---

{% include ja/api-tabs.html %}

## ブラウザ

ここに紹介するメソッドはブラウザのみ対応しています。Nodeかio.jsでコンパイルしたい場合は、[サーバの節](#サーバ)に進んでください。

### <a name="compile"></a> riot.compile(callback)

`<script type="riot/tag">`で定義されたすべてのタグをJavaScriptにコンパイルします。タグはインラインのスクリプト定義、あるいは`src`属性で指定された外部リソース、どちらでも可能です。すべてのスクリプトがコンパイルされると、指定された`callback`メソッドが呼び出されます。例:

``` javascript
riot.compile(function() {
  var tags = riot.mount('*')
})
```

`riot.compile`呼び出しを省略して、ただ次のように書くことも可能です:

``` javascript
var tags = riot.mount('*')
```

ただし、外部リソースのロードとコンパイルが完了するタイミングを知ることはできません。また、外部スクリプトを含む場合は戻り値も空の配列となります。つまり、すべてのスクリプトがページ上で定義されているのであれば、`riot.compile`のステップは省略できます。

詳しくは、[一般的な説明](/ja/guide/compiler/)を参照してください。

### <a name="compile-fn"></a> riot.compile(url, callback)

指定のURLを読み込んで、すべてのタグをコンパイルし、その後`callback`が呼び出されます。例:

``` javascript
riot.compile('my/tags.tag', function() {
  // 読み込まれたタグはこの時点で利用可能
})
```

### <a name="compile-tag"></a> riot.compile(tag)

与えられた`tag`をコンパイルし、実行します。例:

```html
<template id="my_tag">
  <my-tag>
    <p>Hello, World!</p>
  </my-tag>
</template>

<script>
riot.compile(my_tag.innerHTML)
</script>
```

呼び出し後、`my-tag`を普通に使うことができます。

タグ定義の最初の非空白文字が`<`だと仮定しています。そうでなければ、引数はURLとして解釈されます。

@returns コンパイルされたJavaScript文字列

### <a name="compile-to-str"></a> riot.compile(tag, true)

`tag`をコンパイルし、文字列として返します。タグからJavaScriptへの変換のみで、ブラウザ上でその変換結果が実行されることはありません。このメソッドは、例えば、コンパイラのパフォーマンスについてのベンチマークなどの目的で使えます。

``` js
var js = riot.compile(my_tag.innerHTML, true)
```

## サーバ

`npm install riot`でインストール後、次のことができます:

```js
var riot = require('riot')

var js = riot.compile(tag)
```

コンパイル関数は、タグ定義(文字列)をとって、JavaScript(文字列)を返します。

### <a name="css-parser"></a> riot.parsers.css [tagName, css]

タグ内のCSSをコンパイルするのに使われる、独自パーサ。例:

```js
riot.parsers.css.myparser = function(tag, css) {
  return css.replace(/@tag/, tag)
}
```

```html
<custom-parsers>
  <p>hi</p>
  <style type="text/myparser">
    @tag {color: red;}
  </style>
</custom-parsers>
```

これは、次のように変換されます:

```html
<custom-parsers>
  <p>hi</p>
  <style type="text/myparser">
    custom-parsers {color: red;}
  </style>
</custom-parsers>
```

### <a name="js-parser"></a> riot.parsers.js [js, options]

タグ内のJavaScriptをコンパイルするのに使われる、独自パーサ。例:

```js
riot.parsers.js.myparser = function(js) {
  return js.replace(/@version/, '1.0.0')
}
```

```html
<custom-parsers>
  <p>hi</p>
  <script type="text/myparser">
    this.version = "@version"
  </script>
</custom-parsers>
```

これは、次のようにコンパイルされます:

```html
<custom-parsers>
  <p>hi</p>
  <script type="text/myparser">
    this.version = "1.0.0"
  </script>
</custom-parsers>
```

### <a name="html-parser"></a> riot.parsers.html [html]

タグ内のHTMLをコンパイルするのに使われる、独自パーサ。

あらかじめ定義されたパーサは以下です。
#### html
- `jade`

#### css
- `less`
- `sass`
- `scss`
- `stylus`

#### js
- `none` または `javascript`
- `livescript`
- `typescript`
- `es6` - (`babel-core` v6.x と`es2015`プリセットを使用)
- `buble`
- `coffee` または `coffeescript`

## v2.3.0における変更

以前のバージョンでは、エスケープされた波括弧(curly braces)が保存されていたため、不正なHTMLまたは無効なJavaScriptコードを生成することがありました。このバージョンでは、HTMLパーサにタグを通過した後、JavaScriptコードと表現がJSパーサに送られる前に、早い段階でそれらを削除します。
