---
title: ルータ
layout: ja
class: apidoc
---

{% include ja/api-tabs.html %}

# はじめに

デフォルトの状態でRiot.jsにルータはバンドルされていません。これはニーズに合わせて好きなルータライブラリを選べるようにするためです。

私たちが開発した`riot-route`についても、今後引き続きメンテナンスを続けていきます。この小さなルータライブラリは、独立のモジュールとして使うことができ、またRiotのミニマルな哲学に非常にフィットしています。

`riot-route`を使うには、あなたのプロジェクト内で`<script>`タグを使って組み込むか、

```html
<script src="path/to/dist/route.js"></script>
```

あるいは、ES6の文法を使っているなら次のようにするだけです。

```js
import route from 'riot-route' // var route = require('riot-route') is also ok
```

# API

Riotルータは最もミニマルなルータの実装であり、​​以下の機能を含みます。

- ブラウザ・ヒストリAPI と pushState
- 複数のルーティンググループ
- 交換可能パーサ
- IE9以降との互換性

## ルーティングの設定

### route(callback)

URLが変更されると、与えられた`callback`を実行します。こんな感じです。

```javascript
route(function(collection, id, action) {

})
```

もし、例えばURLが`customers/987987/edit`に変わったとすると、上の例の引数は次のようになるでしょう。


```javascript
collection = 'customers'
id = '987987'
action = 'edit'
```

URLは次のような方法で変更することが可能です。

1.新しいURLが、ロケーションバーに入力された
2.戻る/進むボタンが押されたとき
3.`route(to)`が呼び出されたとき
4.アンカータグ`<a>`がクリックされたとき

### route(filter, callback)

<span class="tag red">&gt;= v2.3</span>

URLが変更された際、`filter`に一致すれば、与えられた`callback`を実行する。

```javascript
// `/fruit`のみに一致
route('/fruit', function(name) {
  console.log('The list of fruits')
})
```

ワイルドカード(`*`)を`filter`内に使用し、パラメータとして渡すことができます:

```javascript
// URLが`/fruit/apple`に変更した場合
// 'apple'を`name`として渡す
route('/fruit/*', function(name) {
  console.log('The detail of ' + name)
})

// URLが`/blog/2015-09/01`に変更した場合
// '2015', '09' と '01' を渡す
route('/blog/*-*/*', function(year, month, date) {
  console.log('The page of ' + year + '-' + month + '-' date)
})
```

`/old`と`/old/and/anything`の両方に一致させたいときは`..`と書きます:

```javascript
route('/old..', function() {
  console.log('The pages under /old was moved.')
})
```

URLが検索キーワードを含む場合に便利です。

```javascript
// URLが`/search?keyword=Apple`に変更したとき一致する
route('/search..', function() {
  var q = route.query()
  console.log('Search keyword: ' + q.keyword)
})

// 以下のように書くこともできますが、
// `*`は英数字とアンダースコアのみに一致することに注意
route('/search?keyword=*', function(keyword) {
  console.log('Search keyword: ' + keyword)
})
```

<span class="tag red">メモ:</span> ワイルドカードは以下の正規表現に置き換えられます:

- `*`: `([^/?#]+?)`
- `..`: `.*`

### route.create()

<span class="tag red">&gt;= v2.3</span>

新しいサブ・ルータを返します。

```javascript
var subRoute = route.create()
subRoute('/fruit/apple', function() { /* */ })
```

詳しくは[ルーティング・グループ](#ルーティング・グループ)と[ルーティングの優先度](#ルーティングの優先度)を参照。

## ルータの使用

### route(to[, title])

ブラウザのURLを変更して、`route(callback)`で登録されたすべてのリスナに通知します。例:

```javascript
route('customers/267393/edit')
```
バージョン`2.3`から、タイトルも指定できます。

```javascript
route('customers/267393/edit', 'Editing customer page')
```

### route.start()

URL変更の検知を開始します。これは、Riotが読み込まれた際に自動的に呼び出されます。[route.stop](#riot-route-stop)と合わせて使うのが典型的です。次はその例です。

```javascript
route.stop() // 古いコールバックを解除
route.start() // 再起動
```

### route.stop()

URL変更検知を停止。全てのコールバックをクリアします。

```javascript
route.stop()
```

デフォルトルータを停止しておけば、アプリケーションで別のルータを使うことも可能です。

### subRoute.stop()

<span class="tag red">&gt;= v2.3</span>

サブ・ルータを停止して、全てのコールバックをクリア。

```javascript
var subRoute = route.create()
subRoute('/fruit/apple', function() { /* */ })
subRoute.stop()
```

### route.exec(callback)

現在のURLを調べて、与えられた`callback`をURL変更なしに「その場で」実行します。こんな感じです。

```javascript
route.exec(function(collection, id, action) {

})
```

<span class="tag red">注意:</span> `route.exec(callback)` はバージョン`2.3`から非推奨となりました。

### route.query()

<span class="tag red">&gt;= v2.3</span>

URLからパラメータを取り出すときに便利な関数です。

```javascript
// URLが`/search?keyword=Apple&limit=30`に変更されたとき
route('/search..', function() {
  var q = route.query()
  console.log('Search keyword: ' + q.keyword)
  console.log('Search limit: ' + q.limit)
})
```

## ルータをカスタマイズする

### route.base(base)

ベースパスを変更します。以下のようなURLである場合：

`http://riotexample.com/app/fruit/apple`

ベースパスを`/app`に変更すれば、`/fruit/apple`の部分だけをルーティングに指定できます。

```javascript
route.base('/app')
```

デフォルトの`base`は"#"です。ハッシュバングを使いたい場合は`#!`に変更してください。

```javascript
route.base('#!')
```

### route.parser(parser)

デフォルトパーサーを独自のものに変更します。これは、こんなパスを解析するための例です。

`!/user/activation?token=xyz`

```javascript
route.parser(function(path) {
  var raw = path.slice(2).split('?'),
      uri = raw[0].split('/'),
      qs = raw[1],
      params = {}

  if (qs) {
    qs.split('&').forEach(function(v) {
      var c = v.split('=')
      params[c[0]] = c[1]
    })
  }

  uri.push(params)
  return uri
})
```

そして、これがURLが変更された場合に受け取るパラメータです。

```
route(function(target, action, params) {

  /*
    target = 'user'
    action = 'activation'
    params = { token: 'xyz' }
  */

})
```

#### 二つめのパーサ

<span class="tag red">&gt;= v2.3</span>

`secondParser`を指定すれば二つめのパーサも変更できます。このパーサはURLフィルターで使われています:

```javascript
// デフォルトの第二パーサ
function second(path, filter) {
  var re = new RegExp('^' + filter.replace(/\*/g, '([^/?#]+?)').replace(/\.\./, '.*') + '$')
  if (args = path.match(re)) return args.slice(1)
}

route.parser(first, second)
```

パーサが何も返さなかった場合は、次に一致するルートを探します。

## ルーティング・グループ

サーバ上で使われる従来のルータは高度に一元管理されていますが、最近はクライアント側において、いたるところにルータが使われるようになってきています。以下の例をとってみましょう。

```html
<first-tag>
  <p>First tag</p>
  <script>
    route('/fruit/*', function(name) {
      /* 共通するアクション */
    })
  </script>
</first-tag>

<second-tag>
  <p>Second tag</p>
  <script>
    route('/fruit/apple', function(name) {
      /* 特別なアクション */
    })
  </script>
</second-tag>
```

二つのタグが重なったルーティングを指定しています。見かけはいいのですが、一つのルータを共用しているため、どちらか一つのルーティングしか呼ばれません。そこで、それぞれのタグに、別のルーティング・グループを与えることが必要となります。以下のように書くと、両方のルーティングが呼ばれるようになります。

```html
<first-tag>
  <p>First tag</p>
  <script>
    var subRoute = route.create() // 新しいサブ・ルータを作る
    subRoute('/fruit/*', function(name) {
      /* 共通するアクション */
    })
  </script>
</first-tag>

<second-tag>
  <p>Second tag</p>
  <script>
    var subRoute = route.create() // 新しいサブ・ルータを作る
    subRoute('/fruit/apple', function(name) {
      /* 特別なアクション */
    })
  </script>
</second-tag>
```

## ルーティングの優先度

ルータは最初に一致するルーティングを探します。以下の例では、最初のルーティングが常に一致するため、routing-Bと-Cは呼ばれることがありません。

```javascript
route('/fruit/*', function(name) { /* */ }) // routing-A (1)
route('/fruit/apple', function() { /* */ }) // routing-B (2)
route('/fruit/orange', function() { /* */ }) // routing-C (3)
```

次のように置き換えると、上から下まで一致するルーティングを順番に探していきます。

```javascript
route('/fruit/apple', function() { /* */ }) // routing-B (1)
route('/fruit/orange', function() { /* */ }) // routing-C (2)
route('/fruit/*', function(name) { /* */ }) // routing-A (3)
```

フィルターを指定したルーティングは、フィルターなしのルーティングよりも優先されます。次の例では、routing-Xは最初に定義されていますが、最後に呼ばれます。

```javascript
route(function() { /* */ }) // routing-X (3)
route('/fruit/*', function() { /* */ }) // routing-Y (1)
route('/sweet/*', function() { /* */ }) // routing-Z (2)
```
