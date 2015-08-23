---
title: カスタムタグ
layout: ja
class: apidoc
---

{% include ja/api-tabs.html %}


## マウント

### <a name="mount"></a> riot.mount(customTagSelector, [opts])

`customTagSelector` ページから要素を選択し、カスタムタグをそこにマウントします。選択された要素の名前は、カスタムタグの名前と一致していなければなりません。

`opts` タグに渡すオブジェクトを指定できます (省略可)。ただのシンプルなオブシェクトから、アプリケーションAPIまで、なんでもOKです。あるいは、Fluxストアというのもありです。これは、あなたのクライアントサイドアプリケーションをどのように構築したいかにかかっています。さらに詳しくは、[Riot アプリケーションのモジュール性](/ja/guide/application-design/#モジュール性)を参照してください。


``` js
// <pricing>要素に、カスタムタグをマウントする
var tags = riot.mount('pricing')

// .customerクラスが指定された要素にカスタムタグをマウントする
var tags = riot.mount('.customer')

// <account>をマウントし、APIオブジェクトをオプションとして渡す
var tags = riot.mount('account', api)
```

@returns: マウントされた[タグのインスタンス](#タグのインスタンス)の配列を返します。

### <a name="mount-star"></a> riot.mount('*', [opts])

ページ上のすべてのカスタムタグをマウントするのに、Riot特有のセレクタとして"*"が使えます。

``` js
riot.mount('*')
```

@returns: マウントされた[タグのインスタンス](#タグのインスタンス)の配列を返します。

### <a name="mount-tag"></a> riot.mount(selector, tagName, [opts])

- `selector` マウントするDOMノードを選択します
- `tagName` 使用するカスタムタグの名前を指定します
- `opts` タグに渡すオブジェクトを指定できます (省略可)


``` js
// カスタムタグ"my-tag"をdiv#mainにマウントして、オプションとしてapiを渡す
var tags = riot.mount('div#main', 'my-tag', api)
```

@returns: マウントされた[タグのインスタンス](#タグのインスタンス)の配列を返します。

### <a name="mount-dom"></a> riot.mount(domNode, tagName, [opts])

与えられた`domNode`に、`opts`(省略可)で渡されたデータとともに、`tagName`で指定されたカスタムタグをマウントします。例:

```
// "my-tag"を、与えられたDOMノードにマウント
riot.mount(document.getElementById('slide'), 'my-tag', api)
```

@returns: マウントされた[タグのインスタンス](#タグのインスタンス)の配列を返します。

### <a name="mount-to"></a> riot.mountTo(domNode, tagName, [opts])

このメソッドは *v2.0.11* から非推奨になりました。`riot.mount(domNode, tagName, [opts])`と同じ動作をします。




## レンダリング

### <a name="render"></a> riot.render(tagName, [opts])

タグをHTMLとしてレンダリング。このメソッドは *サーバサイド* (Node/io.js) でのみ利用できます。例:
Rendering a tag to html. This method is only available on *server-side* (Node/io.js). For example:

```
// "my-tag"をHTMLにレンダリング
var mytag = require('my-tag')
riot.render(mytag, { foo: 'bar' })
```

@returns: HTMLとしてレンダリングされたタグ


## タグのインスタンス

次のプロパティが、それぞれのタグのインスタンスにはセットされます:

- `opts` - タグに渡されたオプション
- `parent` - 親タグ (もしあれば)
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


## 更新

### <a name="tag-update"></a> this.update()

現在のタグインスタンス内と、子タグについても同様に、すべてのテンプレート変数を更新します。ユーザのインタラクションによってイベントハンドラが呼ばれた場合、このメソッドも毎回自動的に呼ばれます。

それ以外のケースでは、RiotはUIを自動更新しないので、このメソッドを手動で呼ぶ必要があります。典型的には次のような非UIイベントの後がありえます: `setTimeout`の後、AJAX呼び出しや、何かのサーバイベントなど。例:

``` html
<my-tag>

  <input name="username" onblur={ validate }>
  <span class="tooltip" show={ error }>{ error }</span>

  var self = this

  validate() {
    $.get('/validate/username/' + this.username.value)
      .fail(function(error_message) {
        self.error = error_message
        self.update()
      })
  }
</my-tag>
```

上の例では、`update()`が呼ばれた後、エラーメッセージがUIに表示されます。`this`変数を`self`にアサインしているのは、AJAX呼び出しの中では`this`変数が、タグインスタンスではなくレスポンスオブジェクトを参照しているためです。

### <a name="tag-update-data"></a> this.update(data)

現在のインスタンスに値をセットして、テンプレート変数を更新します。これは、`this.update()`と同様ですが、呼び出しと同時にコンテキストデータをセットできます。つまり、このように書く代わりに:
Set values of the current instance and update the expressions. This is same as `this.update()` but allows you to set context data at the same time. So instead of this:

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

@returns: マウントされた[タグのインスタンス](#タグのインスタンス)の配列を返します。



## マウントの解除

### <a name="tag-unmount"></a> this.unmount(keepTheParent)

タグとその子孫をページから取り除きます。"unmount"イベントが発火します。
もし、親タグを削除せずにマウント解除したい場合は、`unmount`メソッドに`true`を渡す必要があります。

DOMからタグを取り除く:

``` js
mytag.unmount()
```

タグの子孫を取り除き、親タグだけ残す:

``` js
mytag.unmount(true)
```

## 入れ子のタグ

入れ子になった(ネストされた)タグのインスタンスは、`tags`変数からアクセスできます:

``` html
<my-tag>

  <child></child>

  // 子タグにアクセス
  var child = this.tags.child

</my-tag>
```

もし、ひとつ以上の同じ子タグが使われた場合は、配列`this.tags.child[n]`としてアクセスされます。

入れ子のタグに、`name`属性で別名を与えてアクセスすることもできます。

``` html
<my-tag>

  <child name="my_nested_tag"></child>

  // 子タグにアクセス
  var child = this.tags.my_nested_tag

</my-tag>
```

子タグは、親タグの後に初期化されます。つまり、(子タグの)メソッドやプロパティには`mount`イベントでアクセスする必要があります。(訳注: コンストラクタではなく)

``` html
<my-tag>

  <child name="my_nested_tag"></child>

  // 子タグのメソッドにアクセス
  this.on('mount', function() {
    this.tags.my_nested_tag.someMethod()
  })

</my-tag>
```

## <a name="yield"></a> YieldによるHTMLの入れ子

`<yield />`タグは、Riotの特別なコア機能で、実行時に、カスタムタグで囲まれた部分をテンプレート内に挿入してコンパイルすることを可能にします。
この技術によって、独自タグに、サーバでレンダリングされたHTMLコンテンツを入れて表示するといったことができます。

例として、次のRiotタグ`my-post`を使います。

``` html
<my-post>
  <h1>{ opts.title }</h1>
  <yield/>
  this.id = 666
</my-post>
```

`<my-post>`はアプリケーションの好きな場所に含めることができます。

``` html
<my-post title="What a great title">
  <p id="my-content-{ id }">My beautiful post is just awesome</p>
</my-post>
```

`riot.mount('my-post')`でマウントされると、次のようにレンダリングされます:

``` html
<my-post>
  <h1>What a great title</h1>
  <p id="my-content-666">My beautiful post is just awesome</p>
</my-post>
```

#### Yieldとループ

`<yield />`タグはループや子タグの中で使うことができますが、 __常に子タグのコンテキストでパースされる__ ことに注意してください。

次のRiotコンポーネント、`blog.tag`は、


``` html
<blog>
  <h1>{ title }</h1>
  <my-post each={ posts }>
    <a href={ this.parent.backToHome }>Back to home</a>
    <div onclick={ this.parent.deleteAllPosts }>Delete all the posts</div>
  </my-post>

  this.backToHome = '/homepage'
  this.title = 'my blog title'

  this.posts = [
    { title: "post 1", description: 'my post description' },
    { title: "post 2", description: 'my post description' }
  ]

  // the bind is needed in this case to keep the parent context
  // also in the child tags
  deleteAllPosts() {
    this.posts = []

    // we need to trigger manually the update function
    // because this function gets triggered from a child tag
    // and it does not bubble up automatically
    this.update()
  }.bind(this)

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


## イベント

それぞれのタグインスタンスは[オブザーバブル](#observable)なので、`on`と`one`メソッドをタグで起きるイベント監視のために使えます。サポートされているイベントは次のとおり:


- "update" – タグの更新直前。UIが更新される前にコンテキストデータを再計算できる。
- "updated" – タグの更新完了の直後。更新されたDOMに対して処理ができる。
- "mount" – ページにタグがマウントされた直後。
- "unmount" – ページからタグのマウントが解除された直後。

例:

``` js
// cleanup resources after tag is no longer part of DOM
this.on('unmount', function() {
  clearTimeout(timer)
})
```

## 予約語

上記のメソッドとプロパティの名前は、Riotタグの予約語です。次のいずれもインスタンス変数やメソッドの名前として使ってはいけません:  `opts`, `parent`, `root`, `update`, `unmount`, `on`, `off`, `one`, `trigger`
ローカル変数については、自由に名前付けできます:

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
- `constructor` タグのマウントやテンプレート変数が計算されるより前に呼ばれる、初期化関数


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


<span class="tag red">警告</span> `riot.tag`を使うと、コンパイラの長所や次のような機能が使えなくなります:

1. 自己閉じタグ
2. コーテーションなしのテンプレート変数: `value={ val }`の代わりに、`value="{ val }"`と書くこと
3. 真偽値属性: `checked={ flag }`の代わりに`__checked="{ flag }"`と書くこと
4. ES6のメソッドの省略記法
5. `<img src={ src }>`は`<img riot-src={ src }>`と書かなくてはならない: 不正なサーバリクエストを防止するため
6. `style="color: { color }"`は`riot-style="color: { color }"`のように書かなくてはならない: スタイル属性がIEでも動作するように


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
