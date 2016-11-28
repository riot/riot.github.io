---
layout: ja
title: Riot.js — A React-like user interface micro-library
description: Riot lets you build user interfaces with custom tags using simple and enjoyable syntax. It uses a virtual DOM similar to React but faster. Riot is very tiny compared to industry standards. We think there is a clear need for another UI library.
redirect_from: "/ja"
---

<div id="hero">
  <img src="/img/logo/riot240x.png">
  <h1>A React-like user interface micro-library</h1>
  <h4>カスタムタグ • 楽しい文法 • 仮想DOM • コンパクトな実装</h4>

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
    <input>
    <button>Add #{ items.length + 1 }</button>
  </form>

  <!-- logic -->
  <script>
    this.items = []

    add(e) {
      var input = e.target[0]
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

  <forum-content>
    <forum-threads/>
    <forum-sidebar/>
  </forum-content>

  <forum-footer/>

  <script>riot.mount('*', { api: forum_api })</script>
</body>
```

HTMLの文法はWebの *デファクト* 言語であり、ユーザインターフェースを構築するためにデザインされています。文法はシンプルで明確、入れ子構造が備わっていて、属性はカスタムタグにオプションを提供するための簡潔な方法です。

<span class="tag">メモ</span> Riotタグは、ブラウザで実行する前に、純粋なJavaScriptに [変換されます](/ja/guide/compiler/)。


### 仮想DOM
- 最小のDOMの更新とリフロー
- データは一方通行: 更新とアンマウントは親から子へ伝播します
- テンプレートは高いパフォーマンスを得るため、プリコンパイルされキャッシュされます
- 細かい制御のためのライフサイクルイベント
- ユニバーサル(アイソモーフィック)アプリケーションを実現する、カスタムタグのサーバサイドレンダリング


### 標準に近い
- 独自形式のイベントシステムはなし
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
- 余計なことを考えなくてOK: `render`とか`state`、`constructor`、`shouldComponentUpdate`などなど
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
- URLと「戻る」ボタンを処理するルータ

Riotは「オープンスタック」です。つまり、フレームワーク特有のイディオムを避けたい開発者向けです。一般的であることで、好きなデザインパターンを適用したり、混ぜたりすることができます。Facebook Fluxのようなシステムを[つくることも可能です](https://github.com/jimsparkman/RiotControl)。


> I looked at the riot.js example, and it feels so clean, it's scary. [@paulbjensen](https://twitter.com/paulbjensen/status/558378720403419137)

> Just messed around with #RiotJS for an hour. Got it setup with Gulp, Browsesify, and Babel in no time. I like it a lot so far! [@AndrewDelPrete](https://twitter.com/AndrewDelPrete/status/630976295011127296)

> Today I have used #riotjs 2.0 for the first time and I could admit that It will be a long term relationship #js highly recommended. [@gianlucaguarini](https://twitter.com/gianlucaguarini/status/559756081862574080)

> I liked the idea of #reactjs with #flux but I like #riotjs with #riotcontrol even better!
[@tscok](https://twitter.com/tscok/status/580509124598829056)

> looking at RiotJS https://muut.com/riotjs/ — blown away by its simplicity. [@defeated](https://twitter.com/defeated/status/559215403541757952)

> Played with riot.js and like it so much more than React. Minimalistic, fast and a comprehensible API. [@juriansluiman](https://twitter.com/juriansluiman/status/560399379035865088)


## まとめ

Riotは誰でも使えるWeb Componentsです。React + Polymerから無駄を省いたものを想像してください。ごく自然に使用でき、すごく軽い。それを今日から使えます。車輪の再発明をするのではなく、これらのツールの良いとこ取りで、可能な限りシンプルにしました。

私たちは、テンプレートではなく、再利用可能なコンポーネントにフォーカスするべきです。Reactの開発者曰く:

> 「テンプレートは、問題ではなく、技術を分けるだけだ」

同じコンポーネントの中で、レイアウトとロジックを一緒に持てば、全体のシステムはより簡潔になります。この重要な洞察について、Reactに敬意を示したいと思います。


## 最初のブログエントリー

[From React to Riot 2.0](https://muut.com/blog/technology/riot-2.0/)
