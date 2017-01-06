---
layout: ja
title: Riot.js — Simple and elegant component-based UI library
description: Riot lets you build user interfaces with custom tags using simple and enjoyable syntax. It uses a virtual DOM similar to React but faster. Riot is very tiny compared to industry standards. We think there is a clear need for another UI library.
---

<div id="hero">
  <img src="/img/logo/riot240x.png">
  <h1>Simple and elegant component-based UI library</h1>
  <h4>Custom tags • Enjoyable syntax • Elegant API • Tiny size</h4>
  <h4>カスタムタグ • 楽しい文法 • 明解なAPI • コンパクトな実装</h4>

  <div id="version-slurp">
    <a href="/v2/download/" class="tag blue">v{{ site.v2_version }}</a> &mdash;
    <a href="/v2/release-notes/">{{ site.v2_version_slurp }}&hellip;</a>
  </div>

</div>


# なぜ新しいUIライブラリが必要なのか

フロントエンドの世界には、ライブラリが溢れてはいるものの、正直なところソリューションはまだ「そこにない」と感じています。私たちは、この大きなパズルを解くために、Riotという最良のバランスを見つけました。Reactが果たしかけたかに見えたものの、重大な弱点を残している点、それをRiotは解決します。

だから——私たちには新しいライブラリが必要なのです。

## 1. カスタムタグ

Riotは全てのブラウザで、カスタムタグを実現します。

``` html
<todo>

  <!-- layout -->
  <h3>{ opts.title }</h3>

  <ul>
    <li each={ item, i in items }>{ item }</li>
  </ul>

  <form onsubmit={ add }>
    <input ref="input">
    <button>Add #{ items.length + 1 }</button>
  </form>

  <!-- style -->
  <style>
    h3 {
      font-size: 14px;
    }
  </style>

  <!-- logic -->
  <script>
    this.items = []

    add(e) {
      e.preventDefault()
      var input = this.refs.input
      this.items.push(input.value)
      input.value = ''
    }
  </script>

</todo>
```

カスタムタグは、関連するHTMLとJavaScriptをくっつけて再利用可能なコンポーネントとしてまとめます。React + Polymerに、"楽しい"文法と小さな学習曲線が一緒になった、とイメージしてください。


### ヒューマンリーダブル

カスタムタグはHTMLで複雑なビューの構築を可能にします。あなたのアプリケーションはこんな感じになるでしょう:

``` html
<body>

  <h1>Acme community</h1>

  <forum-header/>

  <div class="content">
    <forum-threads/>
    <forum-sidebar/>
  </div>

  <forum-footer/>

  <script>riot.mount('*', { api: forum_api })</script>
</body>
```

HTMLの文法はWebの *デファクト* 言語であり、ユーザインターフェースを構築するためにデザインされています。文法はシンプルで明確、入れ子構造が備わっていて、属性はカスタムタグにオプションを提供するための簡潔な方法です。

<span class="tag">メモ</span> Riotタグは、ブラウザで実行する前に、純粋なJavaScriptに [変換されます](/ja/guide/compiler/)。


### テンプレート変数バインディング (DOM Expressions biding)
- 最小のDOMの更新とリフロー
- データは一方通行: 更新とアンマウントは親から子へ伝播します
- テンプレートは高いパフォーマンスを得るため、プリコンパイルされキャッシュされます
- 細かい制御のためのライフサイクルイベント
- ユニバーサル(アイソモーフィック)アプリケーションを実現する、カスタムタグのサーバサイドレンダリング


### 標準に近い
- 独自形式のイベントシステムはなし
- 外部ポリフィルや追加ライブラリ不要
- レンダリングされたDOMは、自由に他のツールから操作可能
- 余計なHTMLのルート要素や`data-`属性を使う必要なし
- jQueryとの親和性が高い


### 他のツールと相性がいい
- タグファイルは、ES6、Typescript、CoffeeScript、Jade、LiveScriptや、その他の好きな[プリプロセッサ](/ja/guide/compiler/#%E3%83%97%E3%83%AA%E3%83%97%E3%83%AD%E3%82%BB%E3%83%83%E3%82%B5)でOK
- NPMやCommonJS、AMD、Bower、Componentが使えます
- [Gulp](https://github.com/e-jigsaw/gulp-riot)や[Grunt](https://github.com/ariesjia/grunt-riot)、[Browserify](https://github.com/jhthorsen/riotify)のプラグインでコンパイル



## 2. シンプルでミニマリスト

ミニマリズムが、Riotを他のライブラリと一線を画すものにしています。


### 1. 楽しい文法

デザインのゴールの一つは、できる限り最小の"boilerplate"で使える、強力な文法を導入することです。

- 強力なショートカット: `class={ enabled: is_enabled, hidden: hasErrors() }`
- 余計なことを考えなくてOK: `render`とか`state`、`constructor`など
- インターポレーション: `Add #{ items.length + 1 }` あるいは `class="item { selected: flag }"`
- ロジック部分を`<script>`タグで囲むのはオプション
- コンパクトなES6のメソッドの書き方


### 2. 小さな学習曲線

Riotは他のUIライブラリと比較して、APIの数が10分の1か、100分の1。

- 覚えることが少ない / 見なきゃいけない本もチュートリアルも少ない
- 独自形式なものが少なく、標準的なものが多い


### 3. サイズが小さい

<small><em>polymer.min.js</em> – {{ site.polymer.size }}KB</small>
<span class="bar red"></span>

<small><em>react.min.js</em> – {{ site.react.size }}KB</small>
<span class="bar red" style="width: {{ site.react.size | divided_by: site.polymer.size | times: 100 }}%"></span>

<small><em>riot.min.js</em> – {{ site.size_min }}KB</small>
<span class="bar blue" style="width: {{ site.size_min | divided_by: site.polymer.size | times: 100 }}%"></span>


- 少ないバグ
- パースが早く、ダウンロードも容易
- エンベッダブル(組込可能): ライブラリはアプリケーション本体より小さくあるべき
- メンテナンスの手間が少ない: Riotのメンテナンスのために大きなチームを必要としない


### 4. 小さくて、必要十分

Riotはモダンなクライアントサイドのアプリケーションを作るための、基本的な構成単位をすべて備えています。

- ユーザインターフェースを構築するための"Reactive"なビュー
- 分離されたモジュールのAPIを作るためのイベントライブラリ
- URLと「戻る」ボタンを処理するルータ (オプション)

Riotは「オープンスタック」です。つまり、フレームワーク特有のイディオムを避けたい開発者向けです。一般的であることで、好きなデザインパターンを適用したり、混ぜたりすることができます。Facebook Fluxのようなシステムを[つくることも可能です](https://github.com/jimsparkman/RiotControl)。


> [@riotjs_](https://twitter.com/riotjs_) Thanks for creating a library that allows me to make a simple SPA in plain JS without needing to download 13k NPM packages.
[@coussej](https://twitter.com/coussej/status/763659990250946561)

> Switched my site from #BackboneJS to #RiotJS. Other than compile/mount not blocking for DOM render, it's great! #JavaScript [@riotjs_](https://twitter.com/riotjs_)
[@richardtallent](https://twitter.com/richardtallent/status/766696802066194432)

> Like all people fed up with the status quo and the development of the world, I'm voting RiotJS <3 Love you baby [@plumpNation](https://twitter.com/plumpNation/status/760803974660390912)

> I looked at the riot.js example, and it feels so clean, it's scary.
[@paulbjensen](https://twitter.com/paulbjensen/status/558378720403419137)

> I liked the idea of #reactjs with #flux but I like #riotjs with #riotcontrol even better!
[@tscok](https://twitter.com/tscok/status/580509124598829056)


> Played with riot.js and like it so much more than React. Minimalistic, fast and a comprehensible API. [@juriansluiman](https://twitter.com/juriansluiman/status/560399379035865088)


## まとめ

Riotは誰でも使えるWeb Componentsです。React + Polymerから無駄を省いたものを想像してください。ごく自然に使用でき、すごく軽い。それを今日から使えます。車輪の再発明をするのではなく、これらのツールの良いとこ取りで、可能な限りシンプルにしました。

私たちは、テンプレートではなく、再利用可能なコンポーネントにフォーカスするべきです。Reactの開発者曰く:

> 「テンプレートは、問題ではなく、技術を分けるだけだ」

同じコンポーネントの中で、レイアウトとロジックを一緒に持てば、全体のシステムはより簡潔になります。この重要な洞察について、Reactに敬意を示したいと思います。
