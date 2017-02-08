---
layout: ja
title: コンパイラ
---

{% include ja/guide-tabs.html %}

## インブラウザ・コンパイル

ブラウザから実行可能になる前に、カスタムタグはJavaScriptに変換しておく必要があります。`type="riot/tag"`属性をscriptタグに設定するだけでOKです。例:


``` html
<!-- ここにマウント -->
<my-tag></my-tag>

<!-- インラインのタグ定義 -->
<script type="riot/tag">
  <my-tag>
    <h3>Tag layout</h3>
    <inner-tag />
  </my-tag>
</script>

<!-- <inner-tag/>は外部ファイルに定義されている -->
<script src="path/to/javascript/with-tags.js" type="riot/tag"></script>

<!-- riot.jsとコンパイラを読み込む -->
<script src="https://cdn.jsdelivr.net/riot/2.3/riot+compiler.min.js"></script>


<!-- 通常のマウント -->
<script>
riot.mount('*')
</script>
```

scriptタグや外部ファイルには、複数のタグ定義と、通常のJavaScriptを含めることができます。

Riotは、`riot.mount()`が呼び出される前に、インラインまたは外部のタグを自動的にコンパイルします。

### タグインスタンスにアクセスする

もし`script src`でタグを読み込もうとしていて、マウントされたタグにアクセスする必要があるなら、次のように`riot.compile`で囲む必要があります:

``` html
<script>
riot.compile(function() {
  // here tags are compiled and riot.mount works synchronously
  var tags = riot.mount('*')
})
</script>
```

### コンパイラのパフォーマンス

コンパイルは基本的にはまったく時間がかかりません。[タイマータグ](https://github.com/riot/riot/blob/master/test/tag/timer.tag)を30回コンパイルするのにかかる時間は、普通のラップトップで2ミリ秒です。もし、同じくらいのサイズの1000個の異なるタグからなるクレイジーなページを作ったとしても、35msしかかからないという計算になります。

コンパイラのサイズはたかだか3.2KB(gzip圧縮で1.7KB)なので、本番環境でのクライアントサイド・コンパイルも、ダウンロード量やパフォーマンスの点で心配なく使えます。

詳しくは[コンパイラAPI](/ja/api/compiler/)を見てください.


### デモ

- [インブラウザ・コンパイル版](http://riotjs.com/examples/todo-app/) ([ソース](https://github.com/riot/examples/tree/gh-pages/todo-app))
- [プリコンパイル版](http://riotjs.com/examples/todo-app-precompiled/) ([ソース](https://github.com/riot/examples/tree/gh-pages/todo-app-precompiled))



## プリコンパイル

プリ(事前の)コンパイルには次のようなメリットがあります:

- あなたの好きな[プリプロセッサ](#プリプロセッサ)と合わせてコンパイル可能。
- 若干のパフォーマンス向上。コンパイラを読み込む/実行する必要がありません。
- ユニバーサル(アイソモーフィック)アプリケーション。サーバで事前にタグを描画しておくことが可能。(近日公開)


プリコンパイルは`riot`コマンドで実行します。NPMから次のようにインストールできます:

``` sh
npm install riot -g
```

`riot --help`を実行して、正しく動作することを確認します。[node.js](http://nodejs.org/)がインストールされている必要があります。

プリコンパイル版のHTMLは次のようになるでしょう:

``` html
<!-- タグをマウントする場所 -->
<my-tag></my-tag>

<!-- riot.jsのみ読み込み -->
<script src="https://cdn.jsdelivr.net/riot/2.3/riot.min.js"></script>

<!-- プリコンパイルされたタグを読み込み (通常のJavaScriptです) -->
<script src="path/to/javascript/with-tags.js"></script>

<!-- 同じようにマウント -->
<script>
riot.mount('*')
</script>
```

### 使い方

`riot`コマンドがどのように動くか説明します:

``` sh
# ファイルを現在のフォルダにコンパイル
riot some.tag

# 指定フォルダにファイルをコンパイル
riot some.tag some_folder

# 指定パスにファイルをコンパイル
riot some.tag some_folder/some.js

# 元フォルダのすべてのファイルを、指定フォルダにコンパイル
riot some/folder path/to/dist

# 元フォルダのすべてのファイルを、結合ずみの単一ファイルとしてコンパイル
riot some/folder all-my-tags.js

```

ソースファイルは、ひとつあるいは複数のタグを含むことができ、通常のJavaScriptを一緒に混ぜても構いません。コンパイラはカスタムタグの部分だけを変換し、ソースファイルのほかの部分はそのままにします。

詳しい情報は、`riot --help`を参照してください。


### 監視モード

ディレクトリを監視して、ファイルが変更されたときに自動的にファイルを変換することが可能です。

``` sh
# srcフォルダを監視(watch)
riot -w src dist
```


### カスタム拡張子

タグファイルを好きな拡張子にすることができます(デフォルトの`.tag`の代わりに):
You're free to use any file extension for your tags (instead of default `.tag`):

``` sh
riot --ext html
```


### Nodeモジュールとして

``` javascript
var riot = require('riot')

var js = riot.compile(source_string)
```

compile関数は文字列を受け取って、文字列を返します。

### ワークフローへの組み込み

- [Gulp](https://github.com/e-jigsaw/gulp-riot)
- [Grunt](https://github.com/ariesjia/grunt-riot)
- [Browserify](https://github.com/jhthorsen/riotify)


## プリプロセッサ

プリコンパイルの一番美味しい部分です。カスタムタグを作るのに、好きなプリプロセッサを使うことができます。HTMLとJavaScript(訳注・CSSも)、どちらのプリプロセッサもカスタマイズが可能です。

ソースの言語は、コマンドラインの`--type`か`-t`引数で指定するか、あるいは後述のようにスクリプトタグの言語を自分で定義することもできます。

``` html
<my-tag>
  <h3>My layout</h3>

  <script type="coffee">
    @hello = 'world'
  </script>
</my-tag>
```


### CoffeeScript

``` sh
# CoffeeScript プリプロセッサを使う
riot --type coffee --expr source.tag
```

`--expr`引数は、テンプレート変数(expression)の中でもプリプロセッサを使うことを指定します。"coffee"のエイリアスとして、"cs"を使うこともできます。CoffeeScriptで書かれたタグの例です:

``` javascript
<kids>

  <h3 each={ kids[1 .. 2] }>{ name }</h3>

  # Here are the kids
  this.kids = [
    { name: "Max" }
    { name: "Ida" }
    { name: "Joe" }
  ]

</kids>
```

`each`属性もCoffeeScriptになっていますね。なお、CoffeeScriptがあなたのマシンにインストールされていることが必要です:

``` sh
npm install coffee-script -g
```


### EcmaScript 6

ECMAScript 6は、"es6"を指定することで有効になります:

``` sh
# ES6プリプロセッサを使う
riot --type es6 source.tag
```

ES6で書かれたタグの例:

``` html
<test>

  <h3>{ test }</h3>

  var type = 'JavaScript'
  this.test = `This is ${type}`

</test>
```

すべてのECMAScript 6の[機能](https://github.com/lukehoban/es6features)を使うことができます。変換には[Babel](https://babeljs.io/)が使われています:

``` sh
npm install babel
```

ここに、BabelをRiotと使ったより[大きなサンプル](https://github.com/txchen/feplay/tree/gh-pages/riot_babel)があります。

### TypeScript

TypeScriptは静的型付けをJavaScriptに追加します。`--type typescript`を使って有効にします:

``` sh
# TypeScriptプリプロセッサを使う
riot --type typescript source.tag
```

TypeScriptで書かれたタグのサンプルです:

``` html
<test>

  <h3>{ test }</h3>

  var test: string = 'JavaScript';
  this.test = test;

</test>
```

[typescript-simple](https://github.com/teppeis/typescript-simple)が変換に使われます:

``` sh
npm install typescript-simple
```

### LiveScript

言語の特徴やドキュメントについては、[LiveScript](http://livescript.net)を確認してください。

ソース言語は、`--type`か`-t`引数で指定します:

``` sh
# LiveScriptプリプロセッサを使う
riot --type livescript --expr source.tag
```

`--expr`引数はテンプレート変数についても変換することを指定します。"livescript"のエイリアスとして"ls"も使えます。LiveScriptで書かれたタグの例はこちら:

``` html
<kids>

<h3 each={ kids[1 .. 2] }>{ name }</h3>

# Here are the kids
this.kids =
* name: \Max
* name: \Ida
* name: \Joe

</kids>
```

`each`属性もLiveScriptになっています。LiveScriptがインストールされている必要があります:

``` sh
npm install LiveScript -g
```

### Jade

HTMLレイアウトは`template`設定オプションで、処理することができます。これは、「クリーンでホワイトスペース・センシティブなHTMLを書くための文法」Jadeを使った例です。


``` sh
# Jade HTMLプリプロセッサを使う
riot --template jade source.tag
```

Jadeの例:

``` jade
sample
  p test { value }
  script(type='text/coffee').
    @value = 'sample'
```

As you notice, you can define the script type on the template as well. Above we use coffee. [jade](https://github.com/jadejs/jade) is used for the transformation:

``` sh
npm install jade
```



### どんな言語でも

カスタムパーサーを用意することで、お好みのどんな言語でも設定できます (訳注:上記の定義済みのものの他に)。例:

``` js
function myParser(js, options) {
  return doYourThing(js, options)
}
```

このパーサーはコンパイラの`parser`オプションで渡されます。

``` js
var riot = require('riot')

var js = riot.compile(source_string, { parser: myParser, expr: true })
```

テンプレート変数も同様に処理したければ、`expr: true`をセットします。

#### riot.parsers をブラウザとサーバで使う

Riotのカスタムパーサを`riot.parsers`プロパティで指定して、ブラウザとサーバで共通して使うこともできます。例:

```js
riot.parsers.js.myJsParser = function(js, options) {
  return doYourThing(js, options)
}

riot.parsers.css.myCssParser = function(tagName, css) {
  return doYourThing(tagName, css)
}
```

一度、自分の`riot.parsers`を作ってしまえば、次の方法でタグをコンパイルすることができます。

```html
<custom-parsers>
  <p>hi</p>
  <style type="text/myCssParser">
    @tag {color: red;}
  </style>
  <script type="text/myJsParser">
    this.version = "@version"
  </script>
</custom-parsers>
```




### 変換なし

デフォルトで、Riotは組込みのトランスパイラを使います。それによって、ES6的な短いメソッドの書き方を有効になります。この変換をすべて無効にしたい場合は、`--type none`オプションをつけます:

``` sh
# プリプロセッサなし
riot --type none --expr source.tag
```

### AMDとCommonJS

Riotのタグは、`AMD`(Asynchronous Module Definition)や`CommonJS`としてコンパイルすることができます。このオプションは、Riotを[RequireJS](http://requirejs.org/)のようなAMDローダ、あるいは[Browserify](http://browserify.org/)のような`CommonJS`ローダと利用する場合に必要です。

いずれのケースでも、Riotライブラリ自体も`riot`として、define/requireされていなければなりません。

``` sh
# AMD と CommonJS を有効に
riot -m
```

AMDの例:

``` js

define(['riot', 'tags'], function (riot) {
  riot.mount('*')
})
```

CommonJSの例:

``` js
var riot = require('riot')
var tags = require('tags')

riot.mount('*')
```

もし、何かすごいものを作ったら、ぜひ[こちらでシェア](https://github.com/riot/riot/issues/58)してくださいね!
