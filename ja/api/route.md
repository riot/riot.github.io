---
title: ルータ
layout: ja
class: apidoc
---

{% include ja/api-tabs.html %}

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

- pushStateとヒストリAPI
- 複数のルーティンググループ
- 交換可能パーサ
- isomorphic
- IE9以降をサポートする場合は[polyfill](https://github.com/devote/HTML5-History-API) を使用してください。なぜならIEだからです。

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

URLは以下のような方法で変更することが可能です。

1. 新しいハッシュがロケーションバーに入力されたとき
2. 戻る/進むボタンが押されたとき
3. `route(to)`が呼び出されたとき
4. アンカータグがクリックされたとき

### route(filter, callback)

<span class="tag red">&gt;= v2.3</span>

URLが変更された際、`filter`に一致すれば、与えられた`callback`を実行されます。

```javascript
// `/fruit`のみに一致
route('/fruit', function(name) {
  console.log('The list of fruits')
})
```

ワイルドカード(`*`)を`filter`内に使用すると、それらを引数として渡すことができます:

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

`/old`と`/old/and/anything`の両方に一致させたいときは、`..`と書きます:

```javascript
route('/old..', function() {
  console.log('The pages under /old was moved.')
})
```

これはURLが検索キーワードを含む場合に便利です。

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

新しいサブ・ルータを返します。例:

```javascript
var subRoute = route.create()
subRoute('/fruit/apple', function() { /* */ })
```

詳しくは[ルーティング・グループ](#ルーティング・グループ)と[ルーティングの優先度](#ルーティングの優先度)を参照してください。

## ルータの使用

### route(to[, title, shouldReplace])

ブラウザのURLを変更して、`route(callback)`で登録されたすべてのリスナに通知します。例:

```javascript
route('customers/267393/edit')
```
バージョン`2.3`から、タイトルも指定できます。

```javascript
route('customers/267393/edit', 'Editing customer page')
```

内部では...

- `shouldReplace`がなければ、`history.pushState()`が使われます。
- `shouldReplace`があれば、`history.replaceState()`が使われます。

### route.start()

URL変更の検知を開始します。

```javascript
route.start()
```

<span class="tag red">&gt;= v2.3</span>

Riotはルータを自動的に起動しません。**あなた自身で始めることを忘れないでください。**これはまた、お気に入りのルータを選択できることを意味します。
（メモ: v2.3より前はRiotが自動的にルータを起動しました。動作が変更されました）

### route.start(autoExec)

urlの変更を検知し、現在のurlでルーティングを実行します。

```js
route.start(true)
```

これは以下を省略したものです。

```js
route.start()
route.exec()
```

<span class="tag red">&gt;= v2.3</span>

Riotはルータを自動的に起動しません。**あなた自身で始めることを忘れないでください。**これはまた、お気に入りのルータを選択できることを意味します。
（メモ: v2.3より前はRiotが自動的にルータを起動しました。動作が変更されました）

### route.stop()

全てのローティングを停止します。リスナーを削除し、全てのコールバックをクリアします。

```javascript
route.stop()
```

この方法は[route.start](#route-start)と一緒に使用します。例:

```javascript
route.stop() // 古いコールバックを解除
route.start() // 再起動
```

### subRoute.stop()

<span class="tag red">&gt;= v2.3</span>

サブルータのルーティングのみ停止します。リスナーを削除し、全てのコールバックをクリアします。

```javascript
var subRoute = route.create()
subRoute('/fruit/apple', function() { /* */ })
subRoute.stop()
```

### route.exec()

現在のブラウザのパスを"定位置で"記憶し、変更を待つことなくルーティングを実行します。

```javascript
route.exec(function(collection, id, action) {

})
```

<span class="tag red">注意:</span> `route.exec(callback)` はバージョン`2.3`から非推奨となりました。

### route.query()

<span class="tag red">&gt;= v2.3</span>

URLからクエリを抽出するときに有効な関数です。

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

ベースパスを`/app`に変更すると、`/fruit/apple`部分のみを気にすれば良くなります。

```javascript
route.base('/app')
```

デフォルトの`base`の値は"#"です。ハッシュバンを使いたい場合は、`#!`に変更してください。

```javascript
route.base('#!')
```

<span class="tag red">Warning</span>

ベースから`#`を削除したとしても、webサーバーはURLが何であってもアプリケーションを実行する必要があります。なぜなら、ブラウザ上のアプリケーションがURLを操作しているからとなります。WebサーバーはURLの処理方法を知りません。


### route.parser(parser[, secondParser])

デフォルトパーサーを独自のものに変更します。これはパスを解析する例です。

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

`secondParser`を指定すれば、二つめのパーサも変更できます。この二つめのパーサはURLフィルターで使われています:

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

サーバサイドの従来のルータは高度に一元管理されていますが、最近は画面のいたるところにルータが使われるようになってきています。以下の例をとってみましょう。

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

二つのタグにルーティングが指定されていますが、良さそうに見えますか？いいえ、これは動作しません。片方のルータのみが起動するため、次はどちらにルーティングするか判断がつきません。そこで、それぞれのタグ定義ごとに分離したルーティング・グループを作成する必要となります。例:

```html
<first-tag>
  <p>First tag</p>
  <script>
    var subRoute = route.create() // create another routing context
    subRoute('/fruit/*', function(name) {
      /* do something common */
    })
  </script>
</first-tag>

<second-tag>
  <p>Second tag</p>
  <script>
    var subRoute = route.create() // create another routing context
    subRoute('/fruit/apple', function(name) {
      /* do something SPECIAL */
    })
  </script>
</second-tag>
```

## ルーティングの優先度

ルータは最初に一致するルーティングを実行しようとします。したがって次の例では、routing-Bと-Cは呼ばれることがありません。

```javascript
route('/fruit/*', function(name) { /* */ }) // routing-A (1)
route('/fruit/apple', function() { /* */ }) // routing-B (2)
route('/fruit/orange', function() { /* */ }) // routing-C (3)
```

これは正常に動作します。

```javascript
route('/fruit/apple', function() { /* */ }) // routing-B (1)
route('/fruit/orange', function() { /* */ }) // routing-C (2)
route('/fruit/*', function(name) { /* */ }) // routing-A (3)
```

そして*フィルターを指定した*ルーティングは、*フィルターなしの*ルーティングよりも優先されます。次の例では、routing-Xは最初に定義されていますが、最後に呼ばれます。

```javascript
route(function() { /* */ }) // routing-X (3)
route('/fruit/*', function() { /* */ }) // routing-Y (1)
route('/sweet/*', function() { /* */ }) // routing-Z (2)
```

## タグベースルーティング

<span class="tag red">&gt;= v3.1</span>

この機能は__ルートを宣言タグとして記述__することを可能にします。

```html
<app>
  <router>
    <route path="apple"><p>Apple</p></route>
    <route path="banana"><p>Banana</p></route>
    <route path="coffee"><p>Coffee</p></route>
  </router>
</app>
```

この機能を使用するには、 `route.js`の代わりに` route+tag.js`を読み込む必要があります。

```html
<script src="path/to/dist/route+tag.js"></script>
```

ES6の場合

```javascript
import route from 'riot-route/lib/tag' // パスはcjsとは少し異なることに注意してください
```

CommonJSの場合

```javascript
const route = require('riot-route/tag')
```

### 利用可能なタグ

- `<router>`
    - 複数のルートを含むことができます
    - `const r = route.create()`と等価ですので、サブルータを作成します
- `<route>`
    - `path`属性を持っています
    - `<route path="fruit/apple">`は`r('fruit/apple', () => { ... })`と等価です
    - ルートが選択されると、**route**イベントがその子ノードでトリガーされ、引数が渡されます（詳細は下記参照）

### ワイルドカード引数のキャプチャ

ルーティングでワイルドカード `*`を使うことができることを忘れないでください。もちろん、*tag-based routing*でも同様のことができます。

```html
<app>
  <router>
    <route path="fruit/apple"><p>Apple</p></route>
    <route path="fruit/*"><inner-tag /></route>
  </router>
</app>

<inner-tag>
  <p>{ name } is not found</p>
  <script>
    this.on('route', name => this.name = name)
  </script>
</inner-tag>
```

上記の例を見てください。 `fruit/pineapple`を取得したとき、`route`イベントが`<inner-tag>`で発火し、 `'pineapple'`という引数が一つ渡されます。

### 実際の例

通常は、ルーティング処理中に外部APIを呼び出してデータを取得します。このような目的のために `route`イベントをフックするのは上手いやり方です。 例えば：

```html
<app>
  <router>
    <route path="user/*"><app-user /></route>
  </router>
</app>

<app-user>
  <p>{ message }!</p>
  <script>
    this.on('route', id => {
      this.message = 'now loading...'
      getUserById(id).then(user => {
        this.update({
          message: `Hello ${ user.name }!`
        })
      })
    })
  </script>
</app-user>
```

### いくつかの注意点

- ルータは最初の `<router>`タグがマウントされた後で自動的に起動します。自分で`router.start(true`を呼び出す必要はありません。
- ルーティングの`base`を変更するには、`route.base('/path/to/base/')`を使用してください。