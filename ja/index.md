---
layout: home
title: Riot.js — Simple and elegant component-based UI library
description: Riot.js lets you build user interfaces with custom tags using simple and enjoyable syntax.
---

## なぜ新しいUIライブラリが必要なのか？

フロントエンドの世界にはライブラリが溢れてはいるものの、正直なところソリューションはまだ「他にある」と感じています。私たちは、この大きなパズルを解くために、Riot.jsが最良のバランスを提供すると信じています。


だから——私たちには新しいライブラリが必要なのです:

### 1. カスタム要素

Riot.jsはポリフィルを使用せずにすべての最新ブラウザにカスタム要素をもたらします！

``` html
<todo>
  <!-- layout -->
  <h1>{ props.title }</h1>

  <ul>
    <li each={ item in state.items }>{ item }</li>
  </ul>

  <form onsubmit={ add }>
    <input name="todo">
    <button>Add #{ state.items.length + 1 }</button>
  </form>

  <!-- style -->
  <style>
    :host {
      padding: 16px;
    }
  </style>

  <!-- logic -->
  <script>
    export default {
      state: {
        items: []
      },
      add(e) {
        e.preventDefault()
        const input = e.target.todo

        this.state.items.push(input.value)
        this.update()

        input.value = ''
      }
    }
  </script>
</todo>
```

カスタム要素は関連する HTML と JavaScript を結合し再利用可能なコンポーネントを形成します。React + Polymerも考えられますが、Riot.jsの構文はより楽しく学習曲線も小さいです。

#### ヒューマンリーダブル

カスタムタグは複雑な HTML のビューを構成することを可能にします。あなたのアプリケーションは次のようになるでしょう:

``` html
<body>
  <h1>Riot.js application</h1>

  <my-header class="js-component"/>

  <main>
    <my-articles class="js-component"/>
    <my-sidebar class="js-component"/>
  </main>

  <my-footer class="js-component"/>

  <script>
    riot.mount('.js-component', { store: createApplicationStore() })
  </script>
</body>
```

HTML の構文は web の *事実上の* 言語であり、ユーザーインターフェースを構築するために設計されています。その文法は明示的、ネストは言語固有のもの、そして属性はカスタムタグにオプションを与える明確な方法を提供します。

Riot.js のタグはブラウザに実行される前に素の javascriptに [コンパイル]({{ '/ja/compiler/' | prepend:site.baseurl }}) されます。


#### 式、値の DOM へのバインディング
- DOM 更新の量をできるだけ最小限に
- 単方向のデータフロー: 更新やアンマウントは親から子へと下に伝搬される
- 高速化のため、テンプレート構文はプリコンパイルされキャッシュされる
- より細かく制御するためのライフサイクルイベント
- ユニバーサル（アイソモーフィック）なアプリケーションのためのカスタムタグのサーバーサイドレンダリング


#### 標準に近い
- 独自のイベントシステムはなし
- 外部のポリフィルやライブラリの追加は不要
- レンダリングされたDOMは、自由に他のツールから操作可能
- HTML のルート要素や `data-` 属性は不要
- Web Components に似た API
- モダンな modules 構文


#### 他ツールとの相性が良い
- NPM エコシステムに統合
- Node.js の [require フック](https://github.com/riot/ssr#usage)
- [webpack](https://github.com/riot/webpack-loader), [rollup](https://github.com/riot/rollup-plugin-riot), [parcel](https://github.com/riot/parcel-plugin-riot) や [browserify](https://github.com/riot/riotify) プラグインを利用した開発


## 2. シンプルかつミニマリスト

Riot.js はミニマリズムであるということが他のライブラリと一線を画しています:

### 1. 楽しい文法

デザインのゴールの一つは、できる限り最小限の ”boilerplate” で使える強力なタグ構文を導入することでした:

- `className`, `htmlFor`...のような属性のために脳に余分な負荷をかけない
- 複数の属性に対するスプレッド演算子を用いたショートカット: `<p { ...attributes }></p>`
- 式の補間: `Add #{ items.length + 1 }` や `class="item { activeClass }"`
- タグを定義するための `export default` というパブリックインターフェースの記述
- 非同期レンダリングや `Proxy` オブジェクトによる副作用はない
- OOP クラスベースの構文に則った実用的な API
- `<style>` タグにより shadow DOM と混乱することなく自動で CSS スタイリング可能


### 2. 小さな学習曲線

Riot.jsは他の UI ライブラリと比較して API メソッドの数が 10分の1 から 100分の1ほどです。

- 学ぶことが少ない。閲覧する書籍やチュートリアルが少なくなる
- 学ぶべきテンプレートディレクティブはたったの3つだけ `if`, `each` そして `is`
- 独自性の物が少ない
- フードの下プロキシや魔法のようなことは起きていない
- 暗黙の仮定に覆われた明示的な振る舞い


### 3. サイズが小さい

{% include libraries_comparison.html %}

- たったの 6kb！
- 少ないバグ
- パースが早く、ダウンロードも容易
- 組み込みやすい。ライブラリはアプリケーションよりも小さくなるべきである
- メンテナンスコストが小さい。我々は Riot を維持するための大きなチームを必要としない


### 4. 小さいが必要十分

Riotはモダンなクライアントサイドのアプリケーションを作るための、基本的な構成単位をすべて備えています:

- ユーザーインターフェースを構築するためのモダンなビュー
- 多くの DOM ノードの場合でもハイパフォーマンス
- 拡張性が高く、かつ独自性は低い

Riot.js は一つの"オープンスタック"です。つまり、フレームワーク固有のイディオムを避けたい開発者のためのもの、を意味します。一般的なツールを使用して、あなたの最も好みのデザインパターンを組み合わせることができます。

## まとめ

Riot.js is は誰でも使えるWeb Components です。React + Polymer から無駄を省いたものを想像してください。Vue.js にインスピレーションを受けたその API は豊富で、それでいて現代のフロントエンドプロジェクトを構築するために、最低限必要なもののみを含んでいます。ごく自然に使用でき、とても軽い。そして、今日から使えます。車輪の再発明をするのではなく、むしろそこにあるものの良いとこ取りをし、可能な限り最もシンプルなツールにしました。

Riot.js は [*Tim Peters 氏の The Zen of Python*](https://en.wikipedia.org/wiki/Zen_of_Python) という思想（哲学）から駆動し、設計されました。それが我々のマントラです:

> Beautiful is better than ugly.<br/>
> Explicit is better than implicit.<br/>
> Simple is better than complex.<br/>
> Complex is better than complicated.<br/>
> Flat is better than nested.<br/>
> Sparse is better than dense.<br/>
> Readability counts.<br/>
> Special cases aren't special enough to break the rules.<br/>
> Although practicality beats purity.<br/>
> Errors should never pass silently.<br/>
> Unless explicitly silenced.<br/>
> In the face of ambiguity, refuse the temptation to guess.<br/>
> There should be one-- and preferably only one --obvious way to do it.<br/>
> Although that way may not be obvious at first unless you're Dutch.<br/>
> Now is better than never.<br/>
> Although never is often better than *right* now.<br/>
> If the implementation is hard to explain, it's a bad idea.<br/>
> If the implementation is easy to explain, it may be a good idea.<br/>
> Namespaces are one honking great idea -- let's do more of those!
