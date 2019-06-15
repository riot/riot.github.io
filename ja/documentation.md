---
title: Documentation
layout: detail
description: Step by step starting guide
---

## 基本

### インストール

npm を介して riot をインストールすることができます:

```sh
npm i -S riot
```

または yarn を介して

```sh
yarn add riot
```

### 使い方

[webpack](https://github.com/riot/webpack-loader)、[rollup](https://github.com/riot/rollup-plugin-riot)、[parcel](https://github.com/riot/parcel-plugin-riot) または [browserify](https://github.com/riot/riotify) を用いて Riot.js のアプリケーションをバンドルできます。
またRiot タグは、[ブラウザ上で]({{ '/compiler/#in-browser-compilation' | prepend:site.baseurl }})直接的にコンパイルすることもでき、プロトタイプやテストを素早く行うことができます。

### クイックスタート

すべてのアプリケーション・バンドラーをワイヤリングすると、おそらくコードは次のようになります:

`index.html`
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Riot App</title>
</head>
<body>
  <app></app>
  <script src="main.js"></script>
</body>
</html>
```

`app.riot`
```html
<app>
  <p>{ props.message }</p>
</app>
```

`main.js`

```js
import * as riot from 'riot'
import App from './app.riot'

const mountApp = riot.component(App)

const app = mountApp(
  document.getElementById('root'),
  { message: 'Hello World' }
)
```

## Todo の例

Riot のカスタムコンポーネントはユーザーインターフェースの構成要素です。アプリケーションの "ビュー" 部分を作成します。では、Riot のさまざまな機能を強調し拡張された `<todo>` の例から始めましょう。

```html
<todo>
  <h3>{ props.title }</h3>

  <ul>
    <li each={ item in state.items }>
      <label class={ item.done ? 'completed' : null }>
        <input
          type="checkbox"
          checked={ item.done }
          onclick={ () => toggle(item) } />
        { item.title }
      </label>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input onkeyup={ edit } />
    <button disabled={ !state.text }>
      Add #{ state.items.length + 1 }
    </button>
  </form>

  <script>
    export default {
      onBeforeMount(props, state) {
        // state の初期化
        this.state = {
          items: props.items,
          text: ''
        }
      },
      edit(e) {
        // text の状態のみ更新
        this.update({
          text: e.target.value
        })
      },
      add(e) {
        e.preventDefault()

        if (this.state.text) {
          this.update({
            items: [
              ...this.state.items,
              // 新しい item を追加
              {title: this.state.text}
            ],
            text: ''
          })
        }
      },
      toggle(item) {
        item.done = !item.done
        // コンポーネントの update を発火
        this.update()
      }
    }
  </script>
</todo>
```

カスタムコンポーネントは javascript に[コンパイル]({{ '/compiler/' | prepend:site.baseurl }})されます。

[ライブデモ](https://riot.js.org/examples/plunker/?app=todo-app)をご覧になるか、ブラウザで[ソース](https://github.com/riot/examples/tree/gh-pages/todo-app)を閲覧するか、[zip](https://github.com/riot/examples/archive/gh-pages.zip) ファイルをダウンロードしてください。


## 構文

Riot コンポーネントはレイアウト（HTML）とロジック（javascript）のコンビネーションです。基本的なルールは次のとおりです:

* 各 `.riot` ファイル含めることができるのは、一つのコンポーネントのロジックのみ
* HTML は初めに定義され、ロジックは `<script>` タグで囲われる
* カスタムコンポーネントは空にもでき、HTML のみ、または javascript のみにもできる
* すべてのテンプレートの式は "javascript™️" `: <pre>{ JSON.stringify(props) }</pre>`
* `this` というキーワードはオプショナル: `<p>{ name }</p>` は `<p>{ this.name }</p>` として有効
* 引用符はオプショナル: `<foo bar={ baz }>` は `<foo bar="{ baz }">` として有効
* 式の値が falsy の場合、Boolean の属性（checked, selected など）は無視される: `<input checked={ undefined }>` は `<input>` となる
* すべての属性名は *小文字でなければならない*。これはブラウザの仕様によるものである
* 標準の HTML タグ（`label`、`table`、`a` など）はカスタマイズすることもできるが、必ずしもそうすることが賢明というわけではない
* **ルート** のタグ定義も属性を保つ場合がある: `<my-component onclick={ click } class={ props.class }>`


## プリプロセッサ

`type` 属性でプリプロセッサを指定できます。例:

```html
<my-component>
  <script type="coffee">
    # coffeescript ロジックをここに書く
  </script>
</my-component>
````

コンポーネントは選択したプリプロセッサによりコンパイルされます。ただし、プリプロセッサが[事前に登録]({{ '/ja/compiler#プリプロセッサ' | prepend:site.baseurl }})されている場合に限ります。

## スタイリング

`style` タグを中に置くことができます。Riot.js はスタイルを自動的に外に切り出し、`<head>` 内に注入します。これはコンポーネントが初期化される回数に関係なく、一回だけ発生します。

```html
<my-component>

  <!-- layout -->
  <h3>{ props.title }</h3>

  <style>
    /** 他のコンポーネント固有のスタイル **/
    h3 { font-size: 120% }
    /** 他のコンポーネント固有のスタイル **/
  </style>

</my-component>
```

### スコープ付き CSS

[スコープ付き css と :host 擬似クラス](https://developer.mozilla.org/en-US/docs/Web/CSS/:host()) はすべてのブラウザで使用できます。Riot.js は JS に独自のカスタム実装を持っており、ブラウザの実装に依存したり、フォールバックしたりすることはありません。次の例は、最初の例と同じです。注意 次の例では、コンポーネント名を使用してスタイルのスコープを設定する代わりに `:host` `擬似クラス` を使用しています。

```html
<my-component>

  <!-- レイアウト -->
  <h3>{ props.title }</h3>

  <style>
    :host { display: block }
    h3 { font-size: 120% }
    /** 他のコンポーネント固有のスタイル **/
  </style>

</my-component>
```

## マウント

コンポーネントを作成したら、次の手順でページにマウントできます:


```html
<body>

  <!-- body 内の任意の位置にカスタムコンポーネントを配置 -->
  <my-component></my-component>

  <!-- is 属性もサポートされている -->
  <div is="my-component"></div>

  <!-- riot.js を導入 -->
  <script src="riot.min.js"></script>

  <!-- コンポーネントをマウント -->
  <script type="module">
    // @riotjs/compiler で生成されたコンポーネントの javascript の出力をインポートする
    import MyComponent from './my-component.js'

    // the riot コンポーネントを登録
    riot.register('my-component', MyComponent)

    riot.mount('my-component')
  </script>

</body>
```

ページの `body` 内のカスタムコンポーネントは通常どおりに閉じる必要があります: `<my-component></my-component>` かつ、自己終了: `<my-component/>` はサポートされていません。


mount メソッドを使用したいくつかの例:

```js
// 指定した id の要素をマウント
riot.mount('#my-element')

// 選択した要素をマウント
riot.mount('todo, forum, comments')
```

ドキュメントには、同じコンポーネントのインスタンスを複数含めることができます。


### DOM 要素へのアクセス

Riot は `this.$` と `this.$$` ヘルパーメソッドを介してコンポーネントの DOM 要素へのアクセスを提供します。

```html
<my-component>
  <h1>My todo list</h1>
  <ul>
    <li>Learn Riot.js</li>
    <li>Build something cool</li>
  </ul>

  <script>
    export default {
      onMounted() {
        const title = this.$('h1') // 単体の要素
        const items = this.$$('li') // 複数の要素
      }
    }
  </script>
</my-component>
```


### jQuery、Zepto、querySelector などの使い方

Riot 内の DOM にアクセスする必要がある場合、[riot コンポーネントのライフサイクル](#riot-コンポーネントのライフサイクル) を見たいと思うでしょう。DOM 要素は、最初に `mount` イベントが発生するまでインスタンス化されないことに注意してください。つまり、先に要素を選択しようとすると失敗することを意味しています。

```html
<my-component>
  <p id="findMe">Do I even Exist?</p>

  <script>

    var test1 = document.getElementById('findMe')
    console.log('test1', test1)  // 失敗

    export default {
      onMounted() {
        const test2 = document.getElementById('findMe')
        console.log('test3', test3) // 成功、一度発火（マウントごとに）
      },
      onUpdated() {
        const test3 = document.getElementById('findMe')
        console.log('test2', test2) // 成功、更新ごとに発火
      }
    }
  </script>
</my-component>
```

### コンテキスト DOM クエリ

`onUpdated` コールバックまたは `onMounted` コールバックで DOM 要素を取得する方法がわかりましたが、要素のクエリにコンテキストを `root element`（作成した riot タグ）に追加することによっても、これを便利なものにすることができます。

```html
<my-component>
  <p id="findMe">Do I even Exist?</p>
  <p>Is this real life?</p>
  <p>Or just fantasy?</p>

  <script>
    export default {
      onMounted() {
        // jQuery コンテキスト
        $('p', this.root) // this.$ に似ている

        // クエリセレクタコンテキスト
        this.root.querySelectorAll('p') // this.$$ に似ている
      }
    }
  </script>
</my-component>
```

### プロパティ

コンポーネントの初期プロパティを2番目の引数に渡すことができます。

```html
<script>
  riot.mount('todo', { title: 'My TODO app', items: [ ... ] })
</script>
```

渡されるデータは、単純なオブジェクトから完全なアプリケーションAPIまで、あらゆるものが可能です。または、Redux ストアも許されます。設計されたアーキテクチャに依存します。

タグ内では、プロパティは次のように `this.props` 属性でプロパティを参照できます:

```html
<my-component>

  <!-- HTML 内の props -->
  <h3>{ props.title }</h3>

  <script>
    export default {
      onMounted() {
        // JavaScript 内の props
        const title = this.props.title

        // this.props は固定かつ不変
        this.props.description = 'my description' // これは動作しない
      }
    }
  </script>

</my-component>
```

### 状態

各 riot コンポーネントは `this.state` オブジェクトを使用して、内部の状態を格納または変更できます。
`this.props` 属性がフリーズされている間は、`this.state` オブジェクトは完全に変更可能であり、手動または `this.update()` メソッドを使用して更新することができます:

```html
<my-component id="{ state.name }-{ state.surname }">

  <p>{ state.name } - { state.surname }</p>

  <script>
    export default {
      onMounted() {
        // これは良いがコンポーネント DOM は更新しない
        this.state.name = 'Jack'

        // このコールは状態とコンポーネント DOM も更新する
        this.update({
          surname: 'Black'
        })
      }
    }
  </script>
</my-component>
```

### Riot コンポーネントのライフサイクル

コンポーネントは以下の一連の流れで生成されます:

1. コンポーネントのオブジェクトが生成される
2. javascript ロジックが評価、実行される
3. すべての HTML の式が計算される
4. コンポーネント DOM がページにマウントされ、"onMounted" コールバックが呼び出される

コンポーネントがマウントされた後、テンプレート変数の式は次のように更新されます:

1. 現在のコンポーネントインスタンスで `this.update()` が呼び出されたとき
2. 親コンポーネントまたは、任意の親方向（上位）のコンポーネントで `this.update()` が呼び出されたとき。　親から子への単方向のフローで更新する。

"onUpdated" コールバックはコンポーネントタグが更新される度に呼び出されます。

マウントされる前に値が計算されるため、失敗した `<img src={ src }>` をコールするなどの驚くべき問題はありません。


### ライフサイクルコールバック

コンポーネントのライフサイクルを以下のように設定することができます:


```html
<my-component>
  <script>
    export default {
      onBeforeMount(props, state) {
        // コンポーネントのマウント前
      },
      onMounted(props, state) {
        // コンポーネントがページにマウントされた直後
      },
      onBeforeUpdate(props, state) {
        // 更新前にコンテキストデータの再計算が許可されている
      },
      onUpdated(props, state) {
        // update が呼び出され、コンポーネントのテンプレートが更新された直後
      },
      onBeforeUnmount(props, state) {
        // コンポーネントが削除される前
      },
      onUnmounted(props, state) {
        // ページからコンポーネントが削除されたとき
      }
    }
  </script>
</my-component>
```

すべてのコールバックは常に現在の `this.props` と `this.state` という引数を受け取ります。

## プラグイン

Riot は自身のコンポーネントをアップグレードする簡単な方法を提供します。コンポーネントが生成されたとき、`riot.install` を介して登録されたプラグインにより拡張されます。

```js
// riot-observable.js
let id = 0

riot.install(function(component) {
  // すべてのコンポーネントはここを通過する
  component.uid = id++
})

```

```html
<!-- my-component.riot -->
<my-component>
  <h1>{ uid }</h1>
</my-component>
```

## 式（テンプレート変数）

HTMLは、中カッコで囲まれた式と混在させることができます:

```js
{ /* 自分の式をここに書く */ }
```


式には、属性やネストしたテキストノードを設定することができます:

```html
<h3 id={ /* 属性式 */ }>
  { /* ネストされた式 */ }
</h3>
```

式は 100% javascript です。いくつかの例:

```js
{ title || 'Untitled' }
{ results ? 'ready' : 'loading' }
{ new Date() }
{ message.length > 140 && 'Message is too long' }
{ Math.round(rating) }
```

目標は、式を小さくして、HTML をできるだけクリーンな状態に保つことです。もし式が複雑になってきたら、ロジックの一部を "onBeforeUpdate" コールバックに移すことを検討してください。例:


```html
<my-component>

  <!-- `val` は以下で計算された値〜 -->
  <p>{ val }</p>

  <script>
    export default {
      onBeforeUpdate() {
        // 〜更新ごとに
        this.val = some / complex * expression ^ here
      }
    }
  </script>
</my-component>
```

### Boolean 属性

式の値が falsy の場合、Boolean 属性（checked、selected …など）は無視されます:

`<input checked={ null }>` は `<input>` となります。

W3C states that a boolean property is true if the attribute is present at all — even if the value is empty of `false`.
W3C では、属性が存在していれば（その値が `false`、空であっても）boolean 型のプロパティは true であると記述しています。

以下の式は動作しません:

```html
<input type="checkbox" { true ? 'checked' : ''}>
```

属性式とネストされたテキスト式のみが有効です。Riot は有効な html の boolean 属性をすべて自動的に検出します。


### スプレッド属性のオブジェクト

 複数の属性を定義するために、スプレッド式のオブジェクトを使うこともできます。例:

```html
<my-component>
  <p { ...attributes }></p>
  <script>
    export default {
      attributes: {
        id: 'my-id',
        role: 'contentinfo',
        class: 'main-paragraph'
      }
    }
  </script>
</my-component>
```

`<p id="my-id" role="contentinfo" class="main-paragraph">` と評価されます。

### 括弧の出力

括弧の開始をエスケープすることで、式を評価することなしに出力できます:

`\{ this is not evaluated }` は `{ this is not evaluated }` と出力されます。

括弧を評価すべきでない場合は、必ず括弧をエスケープしてください。例えば、以下の Regex パターンは意図した入力（任意の2つの数字）を検証することに失敗し、代わりに単一の数字（以下では数字の "2"）のみを受け付けます。

```html
<my-component>
  <input type='text' pattern="\d{2}">
</my-component>
```

正しい実装は次のとおりです:

```html
<my-component>
  <input type='text' pattern="\d\{2}">
</my-component>
```

### Etc

Expressions inside `style` tags are ignored.


### Render unescaped HTML

Riot expressions can only render text values without HTML formatting. However you can make a custom tag to do the job. For example:

```html
<raw>
  <script>
    export default {
      setInnerHTML() {
        this.root.innerHTML = props.html
      }
      onMounted() {
        this.setInnerHTML()
      },
      onUpdated() {
        this.setInnerHTML()
      }
    }
  </script>
</raw>
```

After the tag is defined you can use it inside other tags. For example

```html
<my-component>
  <p>Here is some raw content: <raw html={ content }/> </p>

  <script>
    export default {
      onBeforeMount() {
        this.content = 'Hello, <strong>world!</strong>'
      }
    }
  </script>
</my-component>
```

[demo on jsfiddle](http://jsfiddle.net/23g73yvx/)

<aside class="note note--warning">:warning: this could expose the user to XSS attacks so make sure you never load data from an untrusted source.</aside>

## Nested components

Let's define a parent tag `<account>` and with a nested tag `<subscription>`:


```html
<account>
  <subscription plan={ props.plan } show-details={ true } />
</account>
```

```html
<subscription>
  <h3>{ props.plan.name }</h3>

  <script>
    export default {
      onMounted(props) {
        // Get JS handle to props
        const {plan, showDetails} = props
      }
    }
  </script>
</subscription>
```

<aside class="note note--info">
Note how we named the <code>show-details</code> attribute, it is written in dash case but it will be converted to camel case inside the <code>this.props</code> object.
</aside>

Then we mount the `account` component to the page with a `plan` configuration object:

```html
<body>
  <account></account>
</body>

<script>
  riot.mount('account', { plan: { name: 'small', term: 'monthly' } })
</script>
```

Parent component properties are passed with the `riot.mount` method and child component ones are passed via the tag attribute.

Nested tags should be registered via `riot.register` call or they can be directly imported into the parent component. If you bundle your application your `<account>` template might look like this:

```html
<account>
  <subscription/>

  <script>
    import Subscription from './subscription.riot'

    export default {
      components: {
        Subscription
      }
    }
  </script>
</account>
```

### Slots

Using the `<slot>` tag you can inject custom HTML templates in a child component from its parent

Child component definition

```html
<greeting>
  <p>Hello <slot/></p>
</greeting>
```

The child component is placed in a parent component injecting custom HTML into it

```html
<user>
  <greeting>
    <b>{ text }</b>
  </greeting>

  <script>
    export default {
      text: 'world'
    }
  </script>
</user>
```

Result

```html
<user>
  <greeting>
    <p>Hello <b>world</b><p>
  </greeting>
</user>
```

See [API docs]({{ '/api/#slots' | prepend:site.baseurl }}) for `slots`.

<aside class="note note--info">
Slots work only in compiled components, all the inner HTML of the components placed directly in your page DOM will be ignored.
</aside>

<aside class="note note--warning">
:warning: Riot <code>if</code>, <code>each</code> and <code>is</code> directives are not supported on slot tags
</aside>


## Event handlers

A function that deals with DOM events is called an "event handler". Event handlers are defined as follows:

```html
<login>
  <form onsubmit={ submit }>

  </form>

  <script>
    export default {
      // this method is called when above form is submitted
      submit(e) {

      }
    }
  </script>
</login>
```

Attributes beginning with "on" (`onclick`, `onsubmit`, `oninput` etc...) accept a function value which is called when the event occurs. This function can also be defined dynamically with an expression. For example:


```html
<form onsubmit={ condition ? method_a : method_b }>
```

All the event handlers are auto-bound and `this` refers to the current component instance.

Event handlers do not update components so you might combine them with a `this.update()` call:

```html
<login>
  <input value={ state.val }/>
  <button onclick={ resetValue }>Reset</button>

  <script>
    export default {
      state: {
        val: 'initial value'
      },
      resetValue() {
        this.update({
          val: ''
        })
      }
    }
  </script>
</login>
```

## Conditionals

Conditionals let you mount / unmount dom and components based on a condition. For example:

```html
<div if={ isPremium }>
  <p>This is for premium users only</p>
</div>
```

Again, the expression can be just a simple property or a full javascript expression. The `if` directive is a special attribute:
  - `true or (truthy)`: mount a nested component or add an element to the template
  - `false or (falsy)`: unmount an element or a component

## Loops

Loops are implemented with `each` attribute as follows:

```html
<my-component>
  <ul>
    <li each={ item in items } class={ item.completed ? 'done' : null }>
      <input type="checkbox" checked={ item.done }> { item.title }
    </li>
  </ul>

  <script>
    export default {
      items: [
        { title: 'First item', done: true },
        { title: 'Second item' },
        { title: 'Third item' }
      ]
    }
  </script>
</my-component>
```

The element with the `each` attribute will be repeated for all items in the array. New elements are automatically added / created when the items array is manipulated using `push()`, `slice()` or `splice` methods for example.

### Looping custom components

Custom components can also be looped. For example:

```html
<todo-item each="{ item in items }" { ...item }></todo-item>
```

The currently looped item properties can directly be passed to the looped tag.


### Non-object arrays

The each directive uses internally `Array.from`. This means that you can loop strings, Map, Sets containing also only primitive values:


```html
<my-component>
  <p each={ (name, index) in stuff }">{ index }: { name }</p>

  <p each={ letter in letters }>{ letter }</p>

  <p each={ meal in food }>{ meal }</p>

  <script>
    export default {
      stuff: [ true, 110, Math.random(), 'fourth'],
      food: new Map().set('pasta', 'spaghetti').set('pizza', 'margherita'),
      letters: 'hello'
    }
  </script>
</my-component>
```

The `name` is the name of the element and `index` is the index number. Both of these labels can be anything that's best suited for the situation.


### Object loops

Plain objects can be looped via [`Object.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries). For example:

```html
<my-component>
  <p each={ element in Object.entries(obj) }>
    key = { element[0] }
    value = { element[1] }
  </p>

  <script>
    export default {
      obj: {
        key1: 'value1',
        key2: 1110.8900,
        key3: Math.random()
      }
    }
  </script>

</my-component>
```

You can use [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) and [`Object.values`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) if you just want to loop only fragments your object.

```html
<my-component>
  <p>
    The Event will start at:
    <time each={ value in Object.values(aDate) }>{ value }</time>
  </p>

  <script>
    export default {
      aDate: {
        hour: '10:00',
        day: '22',
        month: 'December',
        year: '2050'
      }
    }
  </script>

</my-component>
```

### Loops advanced tips

#### Key

Adding the `key` attribute to the looped tags you will provide a more precise strategy to track your items position. This will highly improve the loop performance in case your collections are immutable.

```html
<loop>
  <ul>
    <li each={ user in users } key={ user.id }>{ user.name }</li>
  </ul>
  <script>
    export default {
      users: [
        { name: 'Gian', id: 0 },
        { name: 'Dan', id: 1 },
        { name: 'Teo', id: 2 }
      ]
    }

  </script>
</loop>
```

The `key` attribute can be also generated in runtime via expressions

```html
<loop>
  <ul>
    <li each={ user in users } key={ user.id() }>{ user.name }</li>
  </ul>
  <script>
    export default {
      users: [
        { name: 'Gian', id() { return 0 } },
        { name: 'Dan', id() { return 1 } },
        { name: 'Teo', id() { return 2 } }
      ]
    }
  </script>
</loop>
```

## HTML elements as components

Standard HTML elements can be used as riot components in the page body with the addition of the `is` attribute.

```html
<ul is="my-list"></ul>
```

This provides users with an alternative that can provide greater compatibility with css frameworks. The tags are treated like any other custom component.

```js
riot.mount('my-list')
```

will mount the `ul` element shown above as if it were `<my-list></my-list>`

Note that you can use also an expression in the `is` attribute and riot will be able to
render dynamically also different tags on the same DOM node

```html
<my-component>
  <!-- dynamic component -->
  <div is={ animal }></div>
  <button onclick={ switchComponent }>
    Switch
  </button>

  <script>
    export default {
      animal: 'dog',
      switchComponent() {
        // riot will render the <dog> component
        // replacing <cat>
        this.animal = 'cat'
        this.update()
      }
    }
  </script>
</my-component>
```

Note that when using the `is` attribute, the tag name should be rendered in all lowercase, regardless of how it's defined.

```html
  <MyComponent></MyComponent> <!-- Correct -->
  <div is="mycomponent"></div> <!-- Also Correct -->
  <div is="MyComponent"></div> <!-- Incorrect -->
  <script>
    riot.mount('MyComponent');
  </script>
```


## Server-side rendering

Riot [supports server-side rendering](https://github.com/riot/ssr) with Node.js. You can `require` components and render them:

```js
const render = require('@riotjs/ssr')
const Timer = require('timer.riot')

const html = render('timer', Timer, { start: 42 })

console.log(html) // <timer><p>Seconds Elapsed: 42</p></timer>
```

## Riot DOM Caveats

Riot components rely on browsers rendering so you must be aware of certain situations where your components might not render properly their template.

Consider the following tag:

``` html

<my-fancy-options>
  <option>foo</option>
  <option>bar</option>
</my-fancy-options>
```

This markup is not valid if not injected in a `<select>` tag:

``` html

<!-- not valid, a select tag allows only <option> children -->
<select>
  <my-fancy-options />
</select>

<!-- valid because we will render the <option> tags using <select> as root node -->
<select is='my-fancy-options'></select>

```

Tags like `table, select, svg...` don't allow custom children tags so the use of custom riot tags is forbidden. Use `is` instead like demonstrated above. [more info](https://github.com/riot/riot/issues/2206)
