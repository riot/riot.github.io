---
layout: ja
title: カスタムタグ
---

{% include ja/guide-tabs.html %}

## カスタムタグの例

Riotのカスタムタグは、ユーザインターフェースの構成要素です。 アプリケーションの「ビュー」部分を担います。Riotのいろいろな特徴をハイライトした、TODOの例の拡張から始めましょう。

```html
<todo>

  <h3>{ opts.title }</h3>

  <ul>
    <li each={ items }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggle }> { title }
      </label>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input ref="input" onkeyup={ edit }>
    <button disabled={ !text }>Add #{ items.length + 1 }</button>
  </form>

  <script>
    this.items = opts.items

    edit(e) {
      this.text = e.target.value
    }

    add(e) {
      e.preventDefault()
      if (this.text) {
        this.items.push({ title: this.text })
        this.text = this.refs.input.value = ''
      }
    }

    toggle(e) {
      var item = e.item
      item.done = !item.done
    }
  </script>

</todo>
```

カスタムタグはJavaScriptに[コンパイルされます](/ja/guide/compiler/)。

[ライブデモ](https://riot.js.org/examples/plunker/?app=todo-app)を見て、その[ソース](https://github.com/riot/examples/tree/gh-pages/todo-app)を開くか、[ZIP](https://github.com/riot/examples/archive/gh-pages.zip)ファイルをダウンロードします。



## タグの構文

Riotのタグは、レイアウト(HTML)とロジック(JavaScript)の組み合わせです。 基本的なルールは次のとおりです。

* HTMLが先に定義され、ロジックは`<script>`タグに書かれます。`<script>`タグは省略することも可能です。*メモ: ドキュメントのbodyに定義を含める場合、scriptタグを必ず省略しなければなりません。scriptタグが使えるのは外部ファイルのみです。*
* `<script>`タグがない場合、JavaScriptは最後のHTMLタグの直後から始まると見なされます。
* カスタムタグは、空、HTMLだけ、JavaScriptだけでも可。
* コーテーションはオプションです: `<foo bar={ baz }>` は `<foo bar="{ baz }">` に変換されます。
* ES6のメソッド構文を使えます: `methodName()` は `this.methodName = function()`に変換され `this` 変数は常に現在のタグのインスタンスを指します。
* クラス名のショートカット構文が使えます: `class={ completed: done }`は`done`が真のとき、`class="completed"` としてレンダリングされます。
* 真偽値属性(checked, selected など)はfalsyな値の場合、無視されます: `<input checked={ undefined }>`は`<input>`.
* すべての属性名は *小文字* でなければなりません。
* 自己終了タグがサポートされています: `<div/>` は `<div></div>` と等しくなります。 いわゆる「オープンタグ」 `<br>`や`<hr>`、`<img>`、`<input>`はコンパイルの後に閉じられることはありません。
* カスタムタグは常に閉じられている必要があります。(通常通り、あるいは自己終了タグとして)
* 標準のHTMLタグ(`label`、`table`、`a`など)もカスタムタグ化することができますが、あまり良い手ではありません。
* タグ定義のルートにも属性を持たせることができます: `<foo onclick={ click } class={ active: active }>`.

インラインのタグ定義(ドキュメントのbody内)は正しくインデントされているべきです。すべてのカスタムタグは一番インデントの小さい行に揃える必要があります。タブとスペースも混ぜるべきではありません。

### scriptタグの省略

`<script>`タグは省略することができます:

```html
<todo>

  <!-- layout -->
  <h3>{ opts.title }</h3>

  // logic comes here
  this.items = [1, 2, 3]

</todo>
```

その場合、ロジックは最後のHTMLタグの後に開始されます。 この「オープン構文」は、Webサイト上での例示でよく使われます。


## プリプロセッサ

`type`属性で、プリプロセッサを指定できます。例えば次のようになります。

```html
<my-tag>
  <script type="coffee">
    # your coffeescript logic goes here
  </script>
</my-tag>
````

現在のところ、"coffee"と"typescript"、"es6"、"none"を使うことができます。言語指定に"text/"を接頭辞としてつけ、"text/coffee"のようにしても構いません。

詳細については [プリプロセッサ](/ja/guide/compiler/#プリプロセッサ)を参照してください。


## タグのスタイリング

`style`タグを含めることができます。Riot.jsは自動的にその内容を`<head>`の最後に挿入します。これは、タグが何回使用されても、挿入は1度だけ行われます。

```html
<todo>

  <!-- layout -->
  <h3>{ opts.title }</h3>

  <style>
    h3 { font-size: 120% }
    /** 他のタグ固有のスタイル **/
  </style>

</todo>
```

### Scoped CSS

[Scoped css と :scope 擬似クラス](https://developer.mozilla.org/en-US/docs/Web/CSS/:scope) もすべてのブラウザで利用可能です。Riot.jsにはJSによる独自のカスタム実装があり、ブラウザの実装には依存せず、フォールバックもしません。次の例は最初のものと等価です。以下の例では、スタイルをスコープ化するためにタグの名前を使うのではなく、 `：scope` 擬似クラスを使用しています。

```html
<todo>

  <!-- layout -->
  <h3>{ opts.title }</h3>

  <style>
    :scope { display: block }
    h3 { font-size: 120% }
    /** 他のタグ固有のスタイル **/
  </style>

</todo>
```

Riotが挿入したCSSを上書きしたい場合、`<head>`の中でCSSの挿入位置を指定することが可能です。

```html
<style type="riot"></style>
```

例えば、(1)normalize.cssの後に、(2)コンポーネントライブラリのタグ内のスタイルが挿入され、(3)WebサイトのテーマCSSがデフォルトスタイルを上書きするような、ユースケースが考えられます。

## タグのマウント

タグを作成したら、次のように、ページ上でそれをマウントすることができます:


```html
<body>

  <!-- カスタムタグをbodyの任意の場所に配置 -->
  <todo></todo>

  <!-- riot.jsのインクルード -->
  <script src="riot.min.js"></script>

  <!-- タグtaguのインクルード -->
  <script src="todo.js"></script>

  <!-- タグのマウント -->
  <script>riot.mount('todo')</script>

</body>
```

ページの`body`内のカスタムタグは`<todo></todo>`のように閉じられる必要があります。自己終了タグ`<todo/>`はサポートしません。


マウントメソッドの使用例をいくつか示します。

```js
// ページ上の全てのカスタムタグのマウント
riot.mount('*')

// 特定のid付きの、ある要素をマウント
riot.mount('#my-element')

// 選択した要素をマウント
riot.mount('todo, forum, comments')
```

文書には、同じタグの複数のインスタンスを含めることができます。


### DOM要素へのアクセス

Riotは、`this.refs`オブジェクトに続く`ref`属性を持つ要素へのアクセスと、豊富なショートハンドとして`if="{...}"`属性のようなプロパティメソッドを提供します。
しかし、時によっては、あなたはこれらの組み込みの機能とは相性の良くないHTMLの要素を参照したり、操作したりする必要に迫られるでしょう。

### jQueryやZepto、querySelectorなどをどのように使うべきか

もし、Riotの中でDOMにアクセスする必要が生じたならば、 あなたは[タグのライフサイクル](#タグのライフサイクル) を見てみたいと思うでしょう。そして、 `mount`イベントが最初に発火するまで、DOM要素が生成されないことに気づくかもしれません。これはつまり、それより前の、要素を選択しようとするあらゆる試みが失敗することを意味します。

```html
<example-tag>
  <p id="findMe">Do I even Exist?</p>

  <script>
  var test1 = document.getElementById('findMe')
  console.log('test1', test1)  // 失敗

  this.on('update', function(){
    var test2 = document.getElementById('findMe')
    console.log('test2', test2) // 成功すると、更新毎に発火
  })

  this.on('mount', function(){
    var test3 = document.getElementById('findMe')
    console.log('test3', test3) // 成功すると、一度発火（マウント毎に）
  })
  </script>
</example-tag>
```

### コンテキスト依存のDOMクエリ

さて、私たちは今、`update`または`mount`イベントを待つことによって、DOM要素を得る方法を知っています。さらに、要素のコンテキストを`root element`（私たちが作成しているRiotタグ）へのクエリに追加することによって、このやり方をさらに便利にすることができます。

```html
<example-tag>
  <p id="findMe">Do I even Exist?</p>
  <p>Is this real life?</p>
  <p>Or just fantasy?</p>

  <script>
  this.on('mount', function(){
    // コンテキストはjQuery
    $('p', this.root)

    // コンテキストはクエリセレクタ
    this.root.querySelectorAll('p')
  })
  </script>
</example-tag>
```

### オプション

第二引数にタグのオプションを渡すことができます。

```html
<script>
riot.mount('todo', { title: 'My TODO app', items: [ ... ] })
</script>
```

渡すデータはなんでも構いません。シンプルなオブジェクトから、フルアプリケーションのAPIまで。あるいは、Fluxのストアを渡すのも手です。アーキテクチャのデザイン次第です。

次のようにタグ内のオプションは、`opts`変数で参照することができます。

```html
<my-tag>

  <!-- Options in HTML -->
  <h3>{ opts.title }</h3>

  // JavaScriptのオプション
  var title = opts.title

</my-tag>
```

### タグのライフサイクル

タグは次の一連の流れで作成されます。

1. タグが構成される
2. タグのJavaScriptロジックが実行される
3. テンプレート変数が計算される
4. ページ上でタグがマウントされ、"mount"イベントが発火

タグがマウントされた後、テンプレート変数は次のように更新されます。

1. イベントハンドラが呼び出された際に自動的に(イベントハンドラ内で、`e.preventUpdate`を`true`にセットしない場合)。例えば、最初の例の`toggle`メソッド。
2. `this.update()`が現在のタグインスタンス上で呼ばれたとき
3. `this.update()`が親タグあるいは、さらに上流のタグで呼ばれたとき。更新は親から子への一方通行で流れる。
4. `riot.update()`が呼ばれたとき。ページ上のすべてのテンプレート変数を更新。

タグが更新されるたびに、"update"イベントが発火します。

値はマウント以前に計算されるため、`<img src={ src }>`という呼び出しが失敗するような心配はありません。


### ライフサイクルイベント

次のような手順で、様々なライフサイクルイベントについてタグの中からリスナー登録することができます。


```js
<todo>

  this.on('before-mount', function() {
    // タグがマウントされる前
  })

  this.on('mount', function() {
    // タグがページにマウントされた直後
  })

  this.on('update', function() {
    // 更新前のコンテキストデータの再計算が可能
  })

  this.on('updated', function() {
    // updateの呼び出し後にタグテンプレートが更新された直後
  })

  this.on('before-unmount', function() {
    // タグが解除される前
  })

  this.on('unmount', function() {
    // タグがページから解除される前
  })

  // 全てのイベントについて注目する？
  this.on('*', function(eventName) {
    console.info(eventName)
  })

</todo>
```

ひとつのイベントに複数のリスナーを登録することも可能です。イベントの詳細については、[observable](/ja/api/observable/)を参照してください。

### ミックスイン

ミックスインは、タグを超えての機能を共有するための簡単な方法を提供します。 タグはRiotによって初期化されると、ミックスインが追加され、タグの中から使用できるようになります。

```js
var OptsMixin = {
  // 引数`opts`はタグによって受け取られるオプションのオブジェクト
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

この例では、どの`my-tag`タグのインスタンスに対しても、`getOpts`と`setOpts`を提供する`OptsMixin`ミックスインを与えています。`init`は特別なメソッドで、タグに読み込まれる際にミックスインを初期化できます。(`init`は、ほかのメソッドからはアクセスできません)

```js
var my_tag_instance = riot.mount('my-tag')[0]

console.log(my_tag_instance.getOpts()) // タグが持つ全てのoptsをログアウトする
```

タグは(ミックスインとして)どんなオブジェクトも受け入れます。`{'key': 'val'}`、`var mix = new function(...)`など。一方、それ以外の型が与えられた場合はエラーとなります。

これで、`my-tag`タグの定義には、`OptsMixin`に定義されたほかのものと一緒に、`getId`メソッドが含まれるようになりました。

```js
function IdMixin() {
  this.getId = function() {
    return this._id
  }
}

var id_mixin_instance = new IdMixin()

<my-tag>
  <h1>{ opts.title }</h1>

  this.mixin(OptsMixin, id_mixin_instance)
</my-tag>
```

このようにタグ内で指定されることで、ミックスインは、単にタグの機能を拡張するだけでなく、繰り返し利用可能なインターフェイスを提供します。 タグがマウントされるたびに、内部のタグも、インスタンスはそれぞれのミックスインのコードを持つことになります。

### ミックスインの共有

ミックスインを共有するために、`riot.mixin` APIが用意されています。あなたのミックスインをグローバルに登録するには次のようにします。

```javascript
riot.mixin('mixinName', mixinObject)
```

このミックスインをタグにロードするには、キーを指定して`mixin()`メソッドを使います。

```html
<my-tag>
  <h3>{ opts.title }</h3>

  this.mixin('mixinName')
</my-tag>
```

### グローバルなミックスイン

もし*すべて*のタグに機能を追加する必要がある場合は、次のようにグローバルなミックスインを登録することができます

```js
// タグをマウントする前に登録する必要がある
riot.mixin(mixinObject)
```

共有されたミックスインとは異なり、グローバルのミックスインは自動的にすべてのマウントされたタグから呼び出されます。注意して使ってください！

```js
riot.mixin('globalMixinOne', mixinObjectOne, true)
console.log(riot.mixin('globalMixinOne') === mixinObjectOne) // true
```

ミックスインのオブジェクトを取得する必要が出てきた場合、代わりにグローバルなミックスインオブジェクトを名前で設定することもできます。その場合、3番目の_boolean_パラメータは、このミックスインが共有されたものではなく、グローバルなミックスインであることを示します。

## テンプレート変数 (expressions)

HTMLには、括弧で囲まれたテンプレート変数を挿入することができます。

```javascript
{ /* ここにmy_expressionが表示される */ }
```

テンプレート変数は属性かネストされたテキストに使えます。

```html
<h3 id={ /* attribute_expression */ }>
  { /* nested_expression */ }
</h3>
```

テンプレート変数は 100% JavaScript です。 いくつか例を示します:

```js
{ title || '名称未設定' }
{ results ? '準備OK!' : '読み込み中...' }
{ new Date() }
{ message.length > 140 && 'メッセージが長すぎます' }
{ Math.round(rating) }
```

ゴールはテンプレート変数を小さく保ってHTMLを可能な限りクリーンに保つことです。もし、テンプレート変数が複雑になるようであれば、ロジックを"update"イベントに移すことを検討しましょう。例:


```html
<my-tag>

  <!-- `val`は以下のように計算される -->
  <p>{ val }</p>

  // ..on every update
  this.on('update', function() {
    this.val = some / complex * expression ^ here
  })
</my-tag>
```


### 真偽値属性

真偽値属性 (checked, selected など) はテンプレート変数がfalse的であれば無視されます。

`<input checked={ null }>` は `<input>` になります。

W3Cは真偽値属性が存在する場合は、例えその値が`false`だとしても`true`とするとしています。

次の書き方では、うまく動きません:

```html
<input type="checkbox" { true ? 'checked' : ''}>
```

属性と値のみがテンプレート変数として許されるためです。Riotは44の異なる真偽値属性を判別します。(checked, disabled など)


### クラス省略記法

RiotはCSSクラス名について特別な文法をもっています。例えば、

```html
<p class={ foo: true, bar: 0, baz: new Date(), zorro: 'a value' }></p>
```

は、"foo baz zorro"として評価されます。その値が真になるプロパティ名は、クラス名のリストに追加されます。もちろん、この表記法はクラス名以外の場所で使うこともできます。もしふさわしい使い場所があれば。


### クラスのオブジェクト記法

<span class="tag red">&gt;=3.4.0</span>

DOMエレメントのCSSクラス名指定に、オブジェクトを使うこともできます。例えば:

```html
<my-tag>
  <p class={ classes }></p>
  <script>
    hasAnimation() {
      return true
    }

    this.randomNumber = 5

    this.classes = {
      foo: true,
      bar: false,
      number: '3 > randomNumber',
      animated: 'hasAnimation()', // 注意！メソッドは文字列で指定すること
      baz: new Date(),
      zorro: 'a value'
    }
  </script>
</my-tag>
```

とすれば、`foo number animated baz zorro`と評価されます。Riotは与えられたオブジェクトのうち、値がtruthfulな（真として評価される）キー名を、すべて（CSSクラス名の）文字列として出力します。

### インラインスタイルのオブジェクト記法

<span class="tag red">&gt;=3.4.0</span>

インラインの `style` 属性をオブジェクトの形で与えることができ、Riotはそれを自動的に（インラインスタイル指定の）文字列に変換します。例えば:

```html
<my-tag>
  <p style={ styles }></p>
  <script>
    this.styles = {
      color: 'red',
      height: '10rem'
    }
  </script>
</my-tag>
```

とすれば、`<p style="color: red; height: 10rem"></p>`と評価されます。


### 括弧の表示

開始括弧をエスケープすれば、評価せずにテンプレート変数をすのまま表示することができます:

`\\{ this is not evaluated \\}`は`{ this is not evaluated }`と出力されます

評価されるべきではない場合、常にカッコはエスケープしてください。例えば、以下のような正規表現パターンは意図した入力（任意の2つの数字）を検証するのに失敗し、代わりにそれに続くただ1つの数字「2」のみ受け入れます。

```html
<my-tag>
  <input type='text' pattern="\d{2}">
</my-tag>
```

正しい実装はこのようになるでしょう:

```html
<my-tag>
  <input type='text' pattern="\d\{2}">
</my-tag>
```

### 括弧のカスタマイズ

括弧を好きなものにカスタマイズするのは自由です。たとえば、このようにできます。

```js
riot.settings.brackets = '${ }'
riot.settings.brackets = '\{\{ }}'
```

開始と終了はスペースで区切られています。

[プリコンパイラ](/ja/guide/compiler/#pre-compilation)を使う際は、同じく括弧オプションを設定する必要があります。



### その他

`style`タグの中の波括弧は、テンプレート変数として評価されません。


### エスケープしないでHTMLを表示する

Riotのテンプレート変数は、HTML形式を含まないテキストのみ表示可能です。しかし、そのためのカスタムタグを作成することはできます。例:

```html
<raw>
  <span></span>

  this.root.innerHTML = opts.content
</raw>
```

このようなタグを定義しておけば、他のタグの中から利用することができます。例:

```html
<my-tag>
  <p>Here is some raw content: <raw content="{ html }"/> </p>

  this.html = 'Hello, <strong>world!</strong>'
</my-tag>
```

[jsfiddle上のデモ](http://jsfiddle.net/23g73yvx/)

<span class="tag red">警告</span> これはユーザをXSS攻撃の危険にさらす場合があります。信用できないソースからのデータを、絶対にロードしないようにしなくてはなりません。

メモ: テンプレート(`<span></span>`)では更新に対応できないのでより実践的な状況では、`update`イベントを指定する必要があります。
テンプレート（`<span></span`）内で更新する式が存在しないためです。

```html
<raw>
  <span></span>

  this.innerHTML.root = opts.content
  this.on('update', function(){ this.root.innerHTML = opts.content });
</raw>
```

[jsfiddle上のデモ](http://jsfiddle.net/7m3bvy1d/)

## 入れ子のタグ

親タグ`<account>`と入れ子になったタグ`<subscription>`を定義しましょう:


```html
<account>
  <subscription  plan={ opts.plan } show_details="true" />
</account>


<subscription>
  <h3>{ opts.plan.name }</h3>

  // JSの処理をオプションにする
  var plan = opts.plan,
      show_details = opts.show_details

  // 親タグにアクセスする
  var parent = this.parent

</subscription>
```

<span class="tag red">重要</span> キャメルケースの代わりにアンダースコアを使用して`show_details`という属性の名前をつける場合は注意してください。ブラウザの仕様ににより、自動的に小文字に変換されます。

それでは、`account`タグを `plan`設定オプションとともに、ページにマウントします:

```html
<body>
  <account></account>
</body>

<script>
riot.mount('account', { plan: { name: 'small', term: 'monthly' } })
</script>
```

親タグのオプションは`riot.mount`メソッドともに渡され、子タグのオプションはタグ属性として渡されます。

<span class="tag red">重要</span> 入れ子タグは必ず親タグの中で宣言されます。ページに定義されていても初期化されません。(訳注: `riot.mount`で呼んでいるのは、親タグだけだから)

### 入れ子のHTML

「HTMLトランスクルージョン」は、カスタムタグ内のHTMLを処理する方法のひとつです。これは、ビルトインの`<yield>`タグによって実現します。次はその例です。


### タグの定義

```html
<my-tag>
  <p>Hello <yield/></p>
  this.text = 'world'
</my-tag>
```

### 使い方

カスタムタグはページ内に入れ子にされたHTMLとともに配置されます。

```html
<my-tag>
  <b>{ text }</b>
</my-tag>
```

### 表示結果

```html
<my-tag>
  <p>Hello <b>world</b><p>
</my-tag>
```

`yield`の詳細については、[APIドキュメント](/ja/api/#yield)を参照してください。

## 名前付き要素

`ref`属性を持つ要素は `this.refs` の配下のコンテキストに自動的にリンクされるので、JavaScriptで簡単にアクセスできます

```html
<login>
  <form ref="login" onsubmit={ submit }>
    <input ref="username">
    <input ref="password">
    <button ref="submit">
  </form>

  // 上のHTML要素をつかむ
  submit(e) {
    var form = this.refs.login,
        username = this.refs.username.value,
        password = this.refs.password.value,
        button = this.refs.submit
  }

</login>
```

マウントイベントが発火するとrefs属性が設定され、'mount'（`this.on('mount', function(){...})`）または他のイベントハンドラ内の `this.refs` コレクションにアクセスできます。

<span class="tag red">&gt;=3.0</span>

もし `ref` 属性がRiotタグに適用されているならば、上記の場合と同様に、DOM要素ではなく[タグのインスタンス](/ja/api/#タグのインスタンス)が参照されます。例:


```html
<my-tag>
  <my-nested-tag data-ref="one"></my-nested-tag>
  <div data-ref="two"></div>  

  this.on('mount', function() {
    console.log(this.refs.one); // Riotタグオブジェクト
    console.log(this.refs.two); // HTMLのDOM要素
  });
</my-tag>
```

同じ `ref` の値が複数の要素に使われているような場合、refs プロパティはそれぞれの要素 / タグの配列を返します。例:

```html
<my-tag>
  <div data-ref="items" id="alpha"></div>
  <div data-ref="items" id="beta"></div>

  this.on('mount', function() {
    console.log(this.refs.items); // [div#alpha, div#beta]
  });
</my-tag>
```


## イベントハンドラ

DOMイベントを扱う関数は「イベントハンドラ」と呼ばれます。イベントハンドラは次のように定義されます。

```html
<login>
  <form onsubmit={ submit }>

  </form>

  // このメソッドは上記のフォームがサブミットされたときに呼ばれる
  submit(e) {

  }
</login>
```

「on」で始まる属性(`onclick`、`onsubmit`、`oninput`など)には、イベントが起きた際に呼ばれる関数を設定できます。この関数はテンプレート変数によって動的に定義されることも可能です。例:


```html
<form onsubmit={ condition ? method_a : method_b }>
```

関数 `this`は、現在のタグインスタンスを参照します。ハンドラが呼び出された後、`this.update()`が自動的に呼び出され、加えられたすべての変更がUIに反映されます。

### イベントオブジェクト

イベントハンドラは通常のイベントオブジェクトを第一引数に受け取ります。次のプロパティについては、ブラウザが異なっても動作するよう標準化されています。

- `e.currentTarget`は、イベントハンドラが指定された要素を指します
- `e.target`はイベントの送信元エレメントです。これは必ずしも`currentTarget`と同じにはなりません。
- `e.which`はキーボードイベント(`keypress`、`keyup`など)のキーコートです。
- `e.item`はループの中でのみ有効で、現在の要素を指します。詳しくは[ループ](#loops)を参照してください。


## 条件属性

条件属性を使うと、条件によって要素を表示/非表示できます。例:

```html
<div if={ is_premium }>
  <p>This is for premium users only</p>
</div>
```

繰り返しになりますが、テンプレート変数はシンプルなプロパティでも、フルなJavaScriptでも構いません。次の特別な属性が利用できます。

- `show` – 真のときに、`style="display: ''"`として要素を表示します。
- `hide` – 真のときに、`style="display: none"`として要素を非表示にします。
- `if` – ドキュメントの要素を、追加(真のとき)あるいは削除(偽のとき)します

等号には`==`を使い、`===`は使いません。たとえば、`'a string' == true`のような書き方はOKです。

## ループ

次のようにループは`each`属性として実装されています:

```html
<todo>
  <ul>
    <li each={ items } class={ completed: done }>
      <input type="checkbox" checked={ done }> { title }
    </li>
  </ul>

  this.items = [
    { title: 'First item', done: true },
    { title: 'Second item' },
    { title: 'Third item' }
  ]
</todo>
```

`each`属性を持った要素は配列の要素の数だけ繰り返されます。例えば、配列が`push()`、`slice()`あるいは`splice`メソッドで操作された場合、自動的に新しい要素が追加/生成されます。

### コンテキスト

各項目に対して新しいコンテキストが作成されます。これらは[タグのインスタンス](/ja/api/#タグのインスタンス)です。ループがネスとされると、ループ内の全ての子タグは、親のループのプロパティとメソッドのいずれかを継承しますが、彼ら自身は`未定義(undefined)`です。このように、Riotは親タグによって上書きされるべきではないものを上書きするのを避けます。

親は`parent`変数を通じて明示的にアクセスできます。例:


```html
<todo>
  <div each={ items }>
    <h3>{ title }</h3>
    <a onclick={ parent.remove }>Remove</a>
  </div>

  this.items = [ { title: 'First' }, { title: 'Second' } ]

  remove(event) {

  }
</todo>
```

ループ要素では、`each`属性以外のすべては子コンテキストに紐付きます。そのため、上の例では`title`には直接アクセスできるのに対して、`remove`はループ要素のプロパティではないため、`parent.`がないとアクセスできません。

ループ要素は[タグのインスタンス](/ja/api/#タグのインスタンス)です。Riotはもとの要素にタッチしないので、新しいプロパティが付け加えられることもありません。


### ループとイベントハンドラ

イベントハンドラは配列の中の個別の要素に、`event.item`でアクセスできます。では、`remove`関数を実装することを考えてみます:

```html
<todo>
  <div each={ items }>
    <h3>{ title }</h3>
    <a onclick={ parent.remove }>Remove</a>
  </div>

  this.items = [ { title: 'First' }, { title: 'Second' } ]

  remove(event) {

    // ループ要素
    var item = event.item

    // 配列の中のインデックス
    var index = this.items.indexOf(item)

    // 配列から削除
    this.items.splice(index, 1)
  }
</todo>
```

イベントハンドラが実行された後、対象のタグインスタンスは`this.update()`を使って更新されます。(イベントハンドラの中で、`e.preventUpdate`を`true`にセットしない限り)親要素は、配列から要素が削除されたことを検知して、該当するDOM要素をドキュメントから削除します。


### カスタムタグのループ

カスタムタグもループさせることができます。例:

```html
<todo-item each="{ items }" data="{ this }"></todo-item>
```

現在のループ要素は`this`で参照して、ループされたタグにオプションとして渡すことができます。


### 非オブジェクト配列

配列の要素がオブジェクトである必要はありません。文字列や数でも構いません。そのケースでは、次のように`{ name, i in items }`を使ってループにします:


```html
<my-tag>
  <p each="{ name, i in arr }">{ i }: { name }</p>

  this.arr = [ true, 110, Math.random(), 'fourth']
</my-tag>
```

`name`は要素そのもので`i`がインデックス番号です。どちらも、状況に合わせてどんなラベルでも構いません。


### オブジェクトのループ

オブジェクトもループにすることができます。例:

```html
<my-tag>
  <p each="{ value, name in obj }">{ name } = { value }</p>

  this.obj = {
    key1: 'value1',
    key2: 1110.8900,
    key3: Math.random()
  }
</my-tag>
```

内部的にRiotは`JSON.stringify`で変更検知をしているため、オブジェクトループは推奨されていません。オブジェクト*全体*として調べられ、変更が見つかると全体を再描画してしまいます。これは、動作が遅くなる原因になりえます。通常の配列は、変更箇所だけが再描画されるためもっと速いです。


### ループ使用のさらなるヒント

#### パフォーマンス

デフォルトの`each`ディレクティブのアルゴリズムは、`indexOf`の結合を通して、ループされたDOMノードの位置をコレクション内の要素と同期させます。この戦略は、大量のデータを扱う場合には効率的ではなないかもしれません。その場合、ループしたタグの順序を変える必要はなく、`no-reorder`オプションを追加できるので、テンプレートを更新するだけで良いです。

```html
<loop>
  <!-- `items` here might be a huge collection of data... -->
  <table>
    <tr each="{ item in items }" no-reorder>
      <td>
        { item.name }
      </td>
      <td>
        { item.surname }
      </td>
    </tr>
  </table>
</loop>
```

上記例のtableの行は、最初にバインドされたitemの位置に続いて並べ替えることなく追加/削除/更新されます。

#### キー（Key）

<span class="tag red">&gt;= v3.7</span>

ループされたタグに`key`属性を追加すると、項目の位置を追跡することより、もっと正確な戦略が提供されます。これにより、コレクションが不変の場合、ループのパフォーマンスが大幅に向上します。

```html
<loop>
  <ul>
    <li each={ user in users } key="id">{ user.name }</li>
  </ul>
  <script>
    this.users = [
      { name: 'Gian', id: 0 },
      { name: 'Dan', id: 1 },
      { name: 'Teo', id: 2 }
    ]
  </script>
</loop>
```

`key`属性はテンプレート変数でも生成できます

```html
<loop>
  <ul>
    <li each={ user in users } key={ user.id() }>{ user.name }</li>
  </ul>
  <script>
    this.users = [
      { name: 'Gian', id() { return 0 } },
      { name: 'Dan', id() { return 1 } },
      { name: 'Teo', id() { return 2 } }
    ]
  </script>
</loop>
```

#### `virtual`タグ

特定のタグに囲まれないループをしたい場合は`<virtual>`タグが使えます。ループ後に消滅し、内部のHTMLのみがレンダリングされます。例:

```html
<dl>
  <virtual each={item in items}>
    <dt>{item.key}</dt>
    <dd>{item.value}</dd>
  </virtual>
</dl>
```

しかし、 `virtual`はループに対して排他的ではなく、任意のタグに対して`if`と組み合わせて使うことができます

```html
<virtual data-is="my-tag" if={condition}>
  <p>Show me with no wrapper on condition</p>
</virtual>
```

## 標準のHTML要素にレンダリング

標準HTMLも、`data-is`属性を付けることでページ内のカスタムタグとして利用できます。

```html
<ul data-is="my-list"></ul>
```

このことは、CSSフレームワークとの互換性を持つ代替手段をユーザに提供しています。タグはほかのカスタムタグと同様に扱われます。

```js
riot.mount('my-list')
```

これは、上に示した`ul`要素を、あたかも`<my-list></my-list>`かのようにマウントします。

メモ: `data-is`属性の式も使うことができ、riotは同じDOMノード上の異なるタグを動的にレンダリングできることに注意してください

```html
<my-tag>
  <!-- dynamic component -->
  <div data-is={ component }></div>
  <button onclick={ switchComponent }>
    Switch
  </button>

  <script>
    this.component = 'foo'

    switchComponent() {
      // riot will render the <bar> component
      // replacing <foo>
      this.component = 'bar'
    }
  </script>
</my-tag>
```

メモ: `data-is` 属性を使うならば、タグがどのように定義されていかにかかわらず、タグ名は全て小文字にすべきです。

```html
<MyTag></MyTag> <!-- 正しい -->
<div data-is="mytag"></div> <!-- これも正しい -->
<div data-is="MyTag"></div> <!-- 正しくない -->
<script type="text/javascript">
  riot.mount('MyTag');
</script>
```


## サーバサイドレンダリング

Riotはサーバサイドレンダリングをサポートします。Node/io.js上で、タグを`require`してHTMLにレンダリングすることができます:

```javascript
var riot = require('riot')
var timer = require('timer.tag')

var html = riot.render(timer, { start: 42 })

console.log(html) // <timer><p>Seconds Elapsed: 42</p></timer>
```

## RiotのDOMの取り扱いにおける注意事項

Riotタグはブラウザのレンダリング処理に依存しているため、特定の状況では、作成したコンポーネント（訳注: Riotタグのこと）のテンプレート記述が正しくレンダリングされないことに注意しましょう。

次のRiotタグを考えてみましょう:

``` html

<my-fancy-options>
  <option>foo</option>
  <option>bar</option>
</my-fancy-options>
```

このマークアップは、`<select>`タグに差し込まれなければ正しいHTMLにはなりませんが、その際に気を付けなければならないことがあります:

``` html

<!-- こちらは間違った記述。selectタグの子要素には<option>しか認められていないためです。 -->
<select>
  <my-fancy-options />
</select>

<!-- こちらが正しい記述。こうすることでRiotは、<select>を<my-fancy-options>の「ルート」ノード とみなし、<option>タグを出力します -->
<select data-is='my-fancy-options'></select>

```

`table, select, svg...`といったタグは、カスタムタグを子要素にすることを認めていません。そのため、Riotのカスタムタグ（`<virtual>`であっても）の使用も禁止です。代わりに、上の例のように`data-is`を使いましょう。[この件の詳細は、こちらのイシューをご確認ください（英語）](https://github.com/riot/riot/issues/2206)。
