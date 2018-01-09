---
title: カスタムタグ
layout: ja
class: apidoc
---

{% include ja/api-tabs.html %}


## マウント

### <a name="mount"></a> riot.mount(customTagSelector, [opts])

`customTagSelector` ページから要素を選択し、カスタムタグをそこにマウントします。選択された要素の名前は、カスタムタグの名前と一致していなければなりません。

`opts` タグに渡すオブジェクトを指定できます (省略可)。ただのシンプルなオブシェクトから、アプリケーションAPIまで、なんでもOKです。あるいは、Fluxストアというのもありです。これは、あなたのクライアントサイドアプリケーションをどのように構築したいかにかかっています。さらに詳しくは、[Riot アプリケーションのモジュール性](/ja/guide/application-design/#モジュール性)を参照してください。 *追加メモ* `opts`引数を介して同じ名前で指定されたものよりも、オプションとしてタグに設定された属性が優先されます。


``` js
// <pricing>要素に、カスタムタグをマウントする
var tags = riot.mount('pricing')

// .customerクラスが指定された要素にカスタムタグをマウントする
var tags = riot.mount('.customer')

// <account>をマウントし、APIオブジェクトをオプションとして渡す
var tags = riot.mount('account', api)
```

@returns: マウントされた[タグのインスタンス](#タグのインスタンス)の配列

メモ: [ブラウザ内のコンパイル](/ja/guide/compiler/#ブラウザ)を使用している場合は、返された[タグのインスタンス](#タグのインスタンス)を取得するために、`riot.mount`を`riot.compile`で囲む必要があります。そうしないと、`riot.mount`は`undefined`を返します。

```javascript
riot.compile(function() {
  // タグがコンパイルされ、同期的にriot.mountが動作
  var tags = riot.mount('*')
})
```

### <a name="mount-star"></a> riot.mount('*', [opts])

ページ上のすべてのカスタムタグをマウントするのに、Riot特有のセレクタとして"*"が使えます。

``` js
riot.mount('*')
```

@returns: マウントされた[タグのインスタンス](#タグのインスタンス)の配列

### <a name="mount-tag"></a> riot.mount(selector, tagName, [opts])

上記、それぞれは...

- `selector` マウントするDOMノードを選択します
- `tagName` 使用するカスタムタグの名前を指定します
- `opts` タグに渡すオブジェクトを指定できます (省略可)


``` js
// カスタムタグ"my-tag"をdiv#mainにマウントして、オプションとしてapiを渡す
var tags = riot.mount('div#main', 'my-tag', api)
```

@returns: マウントされた[タグのインスタンス](#タグのインスタンス)の配列

### <a name="mount-dom"></a> riot.mount(domNode, tagName, [opts])

tagNamedで指定する名称のカスタムタグを、与えられたdomNodeに対して、任意のデータをoptsで渡しつつマウントします。例:

```
// #slideノードに"users"タグをマウントし、オプションとしてapiを渡す
riot.mount(document.getElementById('slide'), 'users', api)
```

@returns: マウントされた[タグのインスタンス](#タグのインスタンス)の配列

### <a name="unregister"></a> riot.unregister(tagName)

事前にコンパイラーあるいは`riot.tag()`から作成されたタグを登録解除します。
このメソッドはアプリケーションをテストする際、同じ名称を使って複数回タグを作る必要があるときに、便利です。例:

```js
// テストタグを作る
riot.tag('test-tag', '<p>{ message }</p>')

// マウントする
var tag = riot.mount(document.createElement('div'), 'test-tag')[0]
expect(tag.root.querySelector('p')).to.be.ok

// マウントを解除する
riot.unregister('test-tag')

// 異なるテンプレートで同じタグを再作成
riot.tag('test-tag', '<div>{ message }</div>')
```

## レンダリング

### <a name="render"></a> riot.render(tagName, [opts])

タグをHTMLとしてレンダリング。
__このメソッドは *サーバサイド* でのみ利用可。__ 例:

```
// "my-tag"をHTMLにレンダリング
var mytag = require('my-tag')
riot.render(mytag, { foo: 'bar' })
```

@returns: HTMLとしてレンダリングされたタグ


### <a name="mount-dom"></a> riot.require(tagPath, [opts])
実行時にRiotタグを読み込んでコンパイルします。
__このメソッドは *サーバサイド* でのみ利用可。__
基本的には`require('./my-tag.tag')`のような形になりますが、[riot-compilerのオプション](/api/compiler/#on-server)を指定してコンパイルすることもできます。例えば、同時にプリプロセッサを使って読み込むことができます。

```js
var tag = riot.require('./my-tag.jade', { template: 'jade' })
```

@returns: タグの名前

### <a name="renderasync"></a> riot.renderAsync(tagName, [opts])

タグを非同期にHTMLにレンダリング。
__このメソッドは *サーバサイド* でのみ利用可。__
このメソッドはプロミスを返します。マウントするプロセスの中で、"ready"イベントがトリガーされた時だけ解決されます。例:

#### サーバ上で:
```js
riot.renderAsync(tagName, opts)
  .then(function(html) {
    // HTMLを使って何かする
  })
  .catch(function(e) {
    // 時間がかかりすぎ!
  })
```

#### タグの中で:
```html
<async-rendering>
  <p>{ message }</p>

  <script>
    this.message = 'hi'

    setTimeout(function() {
      // "ready"イベントをトリガーし、プロミスを解決させる
      this.trigger('ready')
    }.bind(this), 500)
  </script>
</async-rendering>
```

気を付けるべき重要な点として、"ready"イベントがトリガーされなかった場合、プロミスは1秒後にリジェクトされます。
タイムアウト時間はについては、`riot.settings.asyncRenderTimeout`から設定できます。(デフォルトは1000ms)

@returns: プロミス


## タグのインスタンス

次のプロパティが、それぞれのタグのインスタンスにセットされます:

- `opts` - タグに渡されたオプションオブジェクト
- `refs` - 名前のつけられたDOMノード(のキャッシュ)
- `parent` - 親タグ(もしあれば)
- `root` - ルートになるDOMノード
- `tags` - 入れ子になっているカスタムタグ


これらの参照はHTMLとJavaScriptのコードの双方から利用できます。例:


``` html
<my-tag>
  <h3>{ opts.title }</h3>

  var title = opts.title
</my-tag>
```

自由に、好きなデータをインスタンスに対してセットできます (インスタンスを「コンテキスト」と言い換えても構いません)。それらは、HTML内のテンプレート変数からも利用可能です。例:

``` html
<my-tag>
  <h3>{ title }</h3>

  this.title = opts.title
</my-tag>
```

メモ: もしグローバル変数があれば、HTMLとJavaScriptのコードの両方でこれらの参照を使用することもできます:

```js
window.someGlobalVariable = 'Hello!'
```

``` html
<my-tag>
  <h3>{ someGlobalVariable }</h3>

  var message = someGlobalVariable
</my-tag>
```


## 更新

### <a name="tag-update"></a> this.update()

現在のタグインスタンス上のすべてのテンプレート変数と、子要素もすべて同様に更新します。ユーザがアプリケーションとインタラクションした際にイベントハンドラが呼ばれると、毎回このメソッドが呼ばれます。

イベントオブジェクトに`preventUpdate = true`をセットすると、Riotによる自動更新を省略することができます。例:

``` html
<my-tag>
  <button onclick={ click }>{ message }</button>

  <script>
    this.message = 'hi'

    click(e) {
      e.preventUpdate = true // タグは自動では更新されない
      this.message = 'goodbye'
    }
  </script>
</my-tag>
```

それ以外の場合には、RiotはUIを自動的に更新しないため、このメソッドを手動で呼ぶ必要があります。典型的には、UIに関係のないイベント、つまり`setTimeout`やAJAX呼び出し、あるいはサーバのイベントの後、などが該当します。例:

``` html
<my-tag>

  <input name="username" onblur={ validate }>
  <span class="tooltip" show={ error }>{ error }</span>

  <script>
    validate() {
      $.get('/validate/username/' + this.username.value)
        .fail(function(error_message) {
          this.error = error_message
          this.update()
        }.bind(this))
    }
  </script>
</my-tag>
```

上の例では、`update()`が呼ばれた後、エラーメッセージがUIに表示されます。（私たちのネットワークコールの`fail`ハンドラで`.bind(this)`が使われているため、タグインスタンスを参照して`this`を使い続けることができます。）

より細かくタグのDOMの更新をコントロールしたい場合は、カスタムの`shouldUpdate`関数を用意することができます。この関数が`true`を返した場合のみ、タグが更新されます。

``` html
<my-tag>
  <button onclick={ click }>{ message }</button>

  <script>
    this.message = 'hi'

    click(e) {
      this.message = 'goodbye'
    }
    // ここのデータはupdateメソッドに渡したもの
    // この場合、this.updateはundefined
    shouldUpdate(data, nextOpts) {
      // 更新しない
      if (this.message === 'goodbye') return false
      // this.messageが'goodbye'ならば、タグを更新可能
      return true
    }
  </script>
</my-tag>
```

`shouldUpdate`メソッドは常に2つの引数を受け取ります: 1つ目は`tag.update`メソッドで更新したい値を含み、2つ目の引数はタグ属性を通して受け取った新しいオプションです。通常は`opts`オブジェクトに格納されます。

``` html
<my-tag>
  <child-tag message={ message }></child-tag>
  <button onclick={ click }>Say goodbye</button>

  <script>
    this.message = 'hi'

    click(e) {
      this.message = 'goodbye'
    }
  </script>
</my-tag>

<child-tag>
  <p>{ opts.message }</p>

  <script>
    shouldUpdate(data, nextOpts) {
      // 受け取った新しいオプションに応じてDOMを更新
      return nextOpts.message !== 'goodbye'
    }
  </script>
</child-tag>
```


### <a name="tag-update-data"></a> this.update(data)

現在のインスタンスに値をセットして、テンプレート変数を更新します。これは`this.update()`と同様ですが、呼び出しと同時にコンテキストデータをセットすることを可能にします。つまり、このように書く代わりに:

``` js
self.error = error_message
self.update()
```

次のように書くことができます:

``` js
self.update({ error: error_message })
```

この方が短くてすっきりしてますね。

### <a name="update"></a> riot.update()

ページ上のすべてのタグとそのテンプレート変数を更新します。

@returns: ページにマウントされた[タグのインスタンス](#タグのインスタンス)の配列。



## マウントの解除

### <a name="tag-unmount"></a> this.unmount(keepTheParent)

タグとその子孫をページから取り除きます。"unmount"イベントが発火します。
もし、親タグを削除せずにマウント解除したい場合は、`unmount`メソッドに`true`を渡す必要があります。

DOMからタグを取り除きます:

``` js
mytag.unmount()
```

タグの子孫を取り除き、親タグだけ残します:

``` js
mytag.unmount(true)
```

## 入れ子のタグ

入れ子になった(ネストされた)タグのインスタンスには、`tags`変数からアクセスできます:

``` html
<my-tag>

  <child></child>
  <script>
    this.on('mount', function() {
      // 子タグにアクセス
      var child = this.tags.child
    })
  </script>
</my-tag>
```

もし、ひとつ以上の同じ子タグが使われた場合は、配列`this.tags.child[n]`としてアクセスされます。

入れ子のタグに`ref`属性で別名を与えてアクセスすることもできます。

``` html
<my-tag>

  <child ref="my_nested_tag"></child>

  <script>
    this.on('mount', function() {
      // 子タグにアクセス
      var child = this.refs.my_nested_tag
    })
  </script>
</my-tag>
```

子タグは親タグの後に初期化されるので、メソッドとプロパティは"mount"イベントで利用できます。

``` html
<my-tag>

  <child ref="my_nested_tag"></child>

  <script>
    // 子タグのメソッドにアクセス
    this.on('mount', function() {
      this.refs.my_nested_tag.someMethod()
      // this.tags.child.someMethod() も有効
    })
  </script>
</my-tag>
```

## <a name="yield"></a> YieldによるHTMLの入れ子

`<yield>`タグは、実行時にそのテンプレートの中にカスタムタグの内容を注入し、コンパイルすることを可能にする、特別なRiotのコア機能です。
例として、以下のRiotタグ`my-post`を使います

``` html
<my-post>
  <h1>{ opts.title }</h1>
  <yield/>

  <script>
    this.id = 666
  </script>
</my-post>
```

`<my-post>`はアプリケーションの好きな場所に含めることができます

``` html
<my-post title="What a great title">
  <p id="my-content-{ id }">My beautiful post is just awesome</p>
</my-post>
```

一度`riot.mount('my-post')`でマウントされると、次のようにレンダリングされます:

``` html
<my-post>
  <h1>What a great title</h1>
  <p id="my-content-666">My beautiful post is just awesome</p>
</my-post>
```

<span class="tag red">注意</span> 生成された式は**それらが含まれるコンテキストから常に評価されます**。例えば

``` html
<!-- このタグは生成されたDOMを継承します -->
<child-tag><yield/></child-tag>

<my-tag>
  <child-tag>
    <p>{ parent.message }</p>
  </child-tag>
  <script>
    // 生成されたマークアップがparent.messageを指すことに注意してください
    // { message }は<child-tag>コンテキストの下で評価されるため、ここでは間違いです
    this.message = 'hi'
  </script>
</my-tag>
```

#### 複数のyield

`<yield>`タグは、テンプレートの特定のスロットにhtmlコンテンツを挿入するためのスロット機構も提供します。

例えば、次のRiotタグ`my-other-post`を使うとすると、

``` html
<my-other-post>
  <article>
    <h1>{ opts.title }</h1>
    <h2><yield from="summary"/></h2>
    <div>
      <yield from="content"/>
    </div>
  </article>
</my-other-post>
```

`<my-other-post>`タグはアプリケーションの好きな場所に含めることができます

``` html
<my-other-post title="What a great title">
  <yield to="summary">
    My beautiful post is just awesome
  </yield>
  <yield to="content">
    <p>And the next paragraph describes just how awesome it is</p>
    <p>Very</p>
  </yield>
</my-other-post>
```

一度`riot.mount('my-other-post')`でマウントすると、以下のようにレンダリングされます:

``` html
<my-other-post>
  <article>
    <h1>What a great title</h1>
    <h2>My beautiful post is just awesome</h2>
    <div>
      <p>And the next paragraph describes just how awesome it is</p>
      <p>Very</p>
    </div>
  </article>
</my-other-post>
```


#### Yieldとループ

`<yield />`タグはループや子タグの中で使うことができますが、 __常に子タグのコンテキストでパースされ、コンパイルされる__ ことに注意してください。

以下のRiotコンポーネント`blog.tag`は、

``` html
<blog>
  <h1>{ title }</h1>
  <my-post each={ posts }>
    <a href={ this.parent.backToHome }>Back to home</a>
    <div onclick={ this.parent.deleteAllPosts }>Delete all the posts</div>
  </my-post>

  <script>
    this.backToHome = '/homepage'
    this.title = 'my blog title'

    this.posts = [
      { title: "post 1", description: 'my post description' },
      { title: "post 2", description: 'my post description' }
    ]

    // この場合、バインドは親コンテキストを
    // 子タグ内にも保持するために必要です
    deleteAllPosts() {
      this.posts = []

      // update関数を手動でトリガーする必要があります
      // なぜなら、この関数は子タグからトリガーされ、
      // 自動でバブルアップしないからです
      this.update()
    }
  </script>
</blog>

<my-post>
  <h2>{ title }</h2>
  <p>{ description }</p>
  <yield/>
</my-post>
```

次のようにコンパイルされます:

``` html
<blog>
  <h1>my blog title</h1>
  <my-post>
    <h2>post 1</h2>
    <p>my post description</p>
    <a href="/homepage">Back to home</a>
    <div>Delete all the posts</div>
  </my-post>
  <my-post>
    <h2>post 2</h2>
    <p>my post description</p>
    <a href="/homepage">Back to home</a>
    <div>Delete all the posts</div>
  </my-post>
</blog>
```

## ミックスイン

### <a name="mixin"></a> this.mixin(mixinObject)

現在のタグをmixinObjectで利用可能な機能で拡張します。例:

```js
var OptsMixin = {
  // initメソッドは、タグにロードされ、かつミックスインしたタグから
  // アクセスできないときにミックスインを初期化できる特別なものです
  // ここでは、`opts`はタグで受け取ったオプションオブジェクトです
  init: function(opts) {
    this.on('updated', function() { console.log('Updated!') })
  },

  getOpts: function() {
    return this.opts
  },

  setOpts: function(opts, update) {
    this.opts = opts
    if (!update) this.update()
    return this
  }
}

<my-tag>
  <h1>{ opts.title }</h1>

  this.mixin(OptsMixin)
</my-tag>
```

### <a name="mixin-shared"></a> riot.mixin(mixinName, mixinObject)

共有ミックスインを登録します。どのタグからもグローバルに利用可能になります: `this.mixin(mixinName)`。

### <a name="mixin-global"></a> riot.mixin(mixinObject)

グローバルミックスインを登録します。すべてのタグインスタンスに自動的に追加されます。

## イベント

それぞれのタグインスタンスは[オブザーバブル](#observable)なので、`on`と`one`メソッドをタグで起きるイベント監視のために使えます。サポートされているイベントは次のとおり:


- "update" – タグの更新直前。UIが更新される前にコンテキストデータを再計算できる
- "updated" – タグの更新完了の直後。更新されたDOMに対して処理ができる
- "before-mount" – ページにタグがマウントされる直前
- "mount" – ページにタグがマウントされた直後
- "before-unmount" – ページからタグのマウントが解除される前
- "unmount" – ページからタグのマウントが解除された後

例:

``` js
// タグ以降のクリーンアップされたりそーすはもはやDOMの一部ではありません
this.on('unmount', function() {
  clearTimeout(timer)
})
```

## 予約語

上記のメソッド名とプロパティ名は、Riotタグの予約語です。次のいずれもインスタンス変数やメソッド名として使ってはいけません: `opts`, `parent`, `tags`, `root`, `refs`, `update`, `unmount`, `on`, `off`, `one`, `trigger`。またアンダースコアから始まる変数名(```this._item```など)も予約されています。ローカル変数については、自由に名前付けできます。例:

``` javascript
<my-tag>

  // OK
  function update() { }

  // ダメ
  this.update = function() { }

  // ダメ
  update() {

  }

</my-tag>
```

## 手動でのタグ構築

### <a name="tag"></a> riot.tag(tagName, html, [css], [attrs], [constructor])

新しいカスタムタグを「手動」でコンパイラを使わずに作成します。

- `tagName` タグの名前
- `html` [テンプレート変数](/ja/guide/#テンプレート変数)を含むレイアウト
- `css` タグのスタイル (省略可)
- `attrs` タグの属性値 (省略可)
- `constructor` タグの式が計算される前、およびタグがマウントされる前に呼ばれる初期化関数

#### 例

``` javascript
riot.tag('timer',
  '<p>Seconds Elapsed: { time }</p>',
  'timer { display: block; border: 2px }',
  'class="tic-toc"',
  function (opts) {
    var self = this
    this.time = opts.start || 0

    this.tick = function () {
      self.update({ time: ++self.time })
    }

    var timer = setInterval(this.tick, 1000)

    this.on('unmount', function () {
      clearInterval(timer)
    })

  })
```

詳細と *制約* については、[タイマーのデモ](http://jsfiddle.net/gnumanth/h9kuozp5/)と[riot.tag](#タグのインスタンス)のAPIドキュメントを参照してください。


<span class="tag red">警告</span> `riot.tag`を使うことで、コンパイラの長所や以下のような機能が使えなくなります:

1. 自己閉じタグ
2. コーテーションなしのテンプレート変数。`attr={ val }`の代わりに、`attr="{ val }"`と書くこと
3. ES6のメソッドの省略記法
4. 不正なサーバリクエストを防止するために、`<img src={ src }>`は`<img riot-src={ src }>`と書かなくてはならない
5. IEの予期しない問題を避けるために、`<input value={ val }>`は`<img riot-value={ val }>`と書かなくてはならない
6. スタイル属性式がIEでも動作するように、`style="color: { color }"`は`riot-style="color: { color }"`のように書かなくてはならない
7. Scoped CSSのプリコンパイル

次のように書くことで`<template>`や`<script>`タグの利点を生かすことはできます:

``` html
<script type="tmpl" id="my_tmpl">
  <h3>{ opts.hello }</h3>
  <p>And a paragraph</p>
</script>

<script>
riot.tag('tag-name', my_tmpl.innerHTML, function(opts) {

})
</script>
```


#### Tags without template

<span class="tag red">&gt;=3.5.0</span>

Riot 3.5からは、次のようなテンプレートを使用せずに"ラッパータグ"を作成することができます:

``` js
riot.tag('tag-name', false, function(opts) {
  this.message = 'hi'
})

```

この場合、いつでも`tag-name`という名前のタグをマウントします。Riotは手付かずのタグマークアップを解析し、そのタグに含まれている式だけをレンダリングします。

```html
<html>
<body>
  <tag-name>
    <p>I want to say { message }</p>
  </tag-name>
</body>
</html>
```

このテクニックは、サーバーサイドレンダリングされたテンプレートを強化するために使用されるでしょう。
また、アプリケーションロジックを処理できるラッパータグと通信する、ロジックに依存しない子コンポーネントをラップするような新しいタグの構成パターンを作成することも可能になります。

```html
<form-validator>
  <date-picker onchange={ updateDate } />
  <color-picker onchange={ pickAColor } />
  <errors-reporter if={ errors.length } errors={ errors }/>
</form-validator>
```

### riot.Tag(el, [opts])

riot.Tagコンストラクタを使うと、`es6`クラス記法でタグを作成・拡張することが可能になります。
Riotタグを作るには、`riot.Tag`コンストラクタを拡張する必要があります:

```js
class MyTag extends riot.Tag {
  // mandatory in order to use and identify this component
  get name() {
    return 'my-tag'
  }
  get tmpl() {
    return `<p onclick="{ click }">{ message }, Dear user</p>`
  }
  get attrs() {
    return 'class="{ className }"'
  }
  get css() {
    return 'my-tag p{ color: blue; }'
  }
  onCreate(opts) {
    this.message = opts.message
  }
  click() {
    this.message = 'goodbye'
  }
}

new MyTag(
  document.getElementById('my-div'),
  { message: 'hi' }
).mount()
```

共通の祖先(クラス)からスタートして拡張することで、Riotタグを組み合わせることも可能です。

```js
class Logger extends riot.Tag {
  get name() {
    return 'logger'
  }
  get tmpl() {
    return `<div>{ opts.log }</div>`
  }
}

class ErrorLogger extends Logger {
  get name() {
    return 'error-logger'
  }
  get css() {
    return 'error-logger div { color: red; }'
  }
}

class SuccessLogger extends Logger {
  get name() {
    return 'success-logger'
  }
  get css() {
    return 'success-logger div { color: green; }'
  }
}

new ErrorLogger(
  document.querySelector('.error'),
  { log: 'oups!!!' }
).mount()

new SuccessLogger(
  document.querySelector('.success'),
  { log: 'well done!!!' }
).mount()
```
