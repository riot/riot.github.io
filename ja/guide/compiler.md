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
<script src="https://cdn.jsdelivr.net/npm/riot@{{ site.minor_version }}/riot+compiler.min.js"></script>


<!-- 通常のマウント -->
<script>
riot.mount('*')
</script>
```

scriptタグや外部ファイルには、通常のJavaScriptを結びつけた複数のタグ定義を含めることができます。

Riotは、`riot.mount()`が呼び出される前に、インラインまたは外部のタグを自動的にコンパイルします。

自分の`<script>`タグで`src`の代わりに`data-src`を使うことを好むかもしれませんが、同じリソースを2回読み込むことを避けるために、ブラウザは自動的にすべてのriotタグを事前に取得(prefetch)することを止めます。Riotは自動的にajax経由でタグを取得し、コンパイルします。

### タグインスタンスにアクセスする
もし`script src`でタグを読み込もうとしていて、マウントされたタグにアクセスする必要があるなら、次のように`riot.compile`で囲む必要があります:

``` html
<script>
riot.compile(function() {
  // ここでタグはコンパイルされ、riot.mountは非同期に動作する
  var tags = riot.mount('*')
})
</script>
```

### コンパイラのパフォーマンス

コンパイルは基本的にはまったく時間がかかりません。[タイマータグ](https://github.com/riot/riot/blob/master/test/tag/timer.tag)を30回コンパイルするのにかかる時間は、普通のラップトップで2ミリ秒です。もし、同じくらいのサイズの1000個の異なるタグからなるクレイジーなページを作ったとしても、35msしかかからないという計算になります。

コンパイラのサイズはたかだか3.2KB(gzip圧縮で1.7KB)なので、本番環境でのクライアントサイド・コンパイルも、ダウンロード量やパフォーマンスの点で心配なく使えます。

詳しくは[コンパイラAPI](/ja/api/compiler/)を見てください.


### デモ

- [インブラウザ・コンパイル版](https://riot.js.org/examples/todo-app/)
- [プリコンパイル版](https://riot.js.org/examples/todo-app-precompiled/)
- [ソースコード](https://github.com/riot/examples/tree/gh-pages/todo-app)
- このデモを[zipファイル](https://github.com/riot/examples/archive/gh-pages.zip)としてダウンロード



## プリコンパイル

プリ(事前の)コンパイルには次のようなメリットがあります:

- あなたの好きな[プリプロセッサ](#プリプロセッサ)と合わせてコンパイル可能。
- 若干のパフォーマンス向上。コンパイラを読み込む/実行する必要がありません。
- ユニバーサル(アイソモーフィック)アプリケーション。サーバで事前にタグを描画しておくことが可能。


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
<script src="https://cdn.jsdelivr.net/npm/riot@{{ site.minor_version }}/riot.min.js"></script>

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

``` sh
riot --ext html
```

### ES6設定ファイル

設定ファイルを使用して、すべてのriot-cliオプションを簡単に保存および設定することができ、カスタムパーサーを作成することもできます。

``` sh
riot --config riot.config
```

riotの`riot.config.js`ファイル:

```js
export default {
  from: 'tags/src',
  to: 'tags/dist',
  // ファイル拡張子
  ext: 'foo',
  // htmlパーサ
  template: 'foo',
  // jsパーサ
  type: 'baz',
  // cssパーサ
  style: 'bar',
  parsers: {
    html: {
      foo: (html, opts, url) => require('foo').compile(html),
    },
    css: {
      bar: (tagName, css, opts, url) => require('bar').compile(css),
    },
    js: {
      baz: (js, opts, url) => require('baz').compile(js),
    },
  },
  // デフォルトのriot parsersオプションを拡張するために
  // 使用できる特別なオプション
  parserOptions: {
    js: {},
    template: {},
    style: {}
  }
};
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

`--expr`引数は、テンプレート変数(expression)の中でもプリプロセッサを使うことを指定します。"coffee"のエイリアスとして、"cs"を使うこともできます。これはCoffeeScriptで書かれたタグの例です:

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

`each`属性もCoffeeScriptになっていますね。なお、CoffeeScriptがあなたのマシンにインストールされている必要があります:

``` sh
npm install coffee-script -g
```


### EcmaScript 6

ECMAScript 6(babeljs)は、"es6"を指定することで有効になります:

ES6で書かれたタグの例:

``` html
<test>

  <h3>{ test }</h3>

  const type = 'JavaScript'
  this.test = `This is ${type}`

</test>
```

es6コンパイラを使用する前に、以下の手順に従ってプロジェクトを適切に構成する必要があります:

 1. [babel-preset-es2015-riot](https://github.com/riot/babel-preset-es2015-riot)をインストール<br /> `npm install babel-preset-es2015-riot --save-dev`
 2. `babel-core`もインストール<br /> `npm install babel-core -g`
 3. プリセットというidを含む`.babelrc`ファイルの作成<br /> `{ "presets": ["es2015-riot"] }`

環境を設定したらタグをコンパイルすることができます:

``` sh
# ES6プリプロセッサを使う
riot --type es6 source.tag
```

<span class="tag red">note</span> Babelは出力にたくさんの余分なコードを生成するので、例えば`babel-plugin-external-helpers-2`を使って2つの別々なステップでタグをコンパイルすることも考えられます:

``` sh
# 純粋なes6のコードを使ってタグをコンパイル
riot tags/folder dist/es6.tags.js
# es6のコードを有効なes5のコードに変換
babel es6.tags.js --out-file tags.js
```

ここに、BabelをRiotと使った[簡単なサンプル](https://github.com/GianlucaGuarini/riot-preset-babel-test)があります。

### TypeScript

TypeScriptは静的型付けをJavaScriptに追加します。`--type typescript`を使って有効にします:

``` sh
# TypeScriptプリプロセッサを使う
riot --type typescript source.tag
```

TypeScriptで書かれたタグの例:

``` html
<test>

  <h3>{ test }</h3>

  const test: string = 'JavaScript';
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

### Pug (Jade)

HTMLレイアウトは`template`設定オプションで、処理することができます。これは、「クリーンでホワイトスペース・センシティブなHTMLを書くための文法」pugを使った例です。


``` sh
# Pug HTMLプリプロセッサを使う
riot --template pug source.tag
```

Pugの例:

``` js
todo
  h3 Todo
  ul
    li(each="{ items }")
      label(class="{ completed:done }")
        input(type="checkbox", checked="{ done }", onclick="{ parent.toggle }")
        = "{ title }"

  form(onsubmit="{add}")
    input(name="input", onkeyup="{edit}")
    button(disabled="{!text}")= "Add { items.length + 1 }"

  script.
    var self = this
    self.items = []
    self.disabled = true

    edit(e) {
      self.text = e.target.value
    }

    add(e) {
      if (this.text) {
        self.items.push({ title: this.text })
        this.text = this.input.value = ''
      }
    }

    toggle(e) {
      var item = e.item
      item.done = !item.done
      return true
    }
```

周知の通り、テンプレートにもスクリプトの種類を定義することができます。 [pug](https://github.com/pugjs/pug)が変換に使われます:

``` sh
npm install pug -g
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


もし、何かすごいものを作ったら、ぜひ[こちらでシェア](https://github.com/riot/made-with-riot)してくださいね!
