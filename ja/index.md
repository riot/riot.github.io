---
layout: ja/home
title: Riot.js — シンプルでエレガントなコンポーネントベースの UI ライブラリ
description: Riot.jsでは、簡単で楽しい構文を使ってカスタムタグを使ったユーザーインターフェイスを構築できます。
---

## なぜ新しいUIライブラリが必要なのか？

フロントエンドの世界にはライブラリが溢れてはいるものの、正直なところソリューションはまだ「他にある」と感じています。私たちは、この大きなパズルを解くために、Riot.js が最良のバランスを提供すると信じています。


よって —— 私たちには新しいライブラリが必要なのです:

### 1. カスタム要素

Riot.js はポリフィルを使用せずにすべての最新ブラウザにカスタム要素をもたらします！

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

カスタム要素は関連する HTML と JavaScript を結合し再利用可能なコンポーネントを形成します。Web コンポーネント API がネイティブであることを望むすべてのものを提供するように設計されています。

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

HTML の構文は web の *事実上の* 言語であり、ユーザーインターフェイスを構築するために設計されています。その文法は明示的、ネストは言語固有のもの、そして属性はカスタムタグにオプションを与える明確な方法を提供します。

Riot.js のタグはブラウザで実行される前に素の JavaScript に [コンパイル]({{ '/ja/compiler/' | prepend:site.baseurl }}) されます。


#### パフォーマンスと予測性
- DOM 更新とリフローの量をできるだけ最小限に
- 仮想 DOM メモリのパフォーマンスの問題と欠点のかわりに、高速に式をバインディング
- 単方向のデータフロー: 更新やアンマウントは親から子へと下に伝搬される
- 高速化のため、テンプレート構文はプリコンパイルされキャッシュされる
- より細かく制御するためのライフサイクルイベント
- ユニバーサル（アイソモーフィック）なアプリケーションのためのカスタムタグのサーバーサイドレンダリング


#### 標準に近い
- JavaScript モジュールの構文のおかげで、未来でも使用可能
- レンダリングされた DOM は他のツールと一緒に自由に操作可能
- Web コンポーネントライクな API
- 外部ポリフィルや追加ライブラリが不要
- 独自のイベントシステムなし
- 余分な HTML のルート要素、data- 属性、または高価なカスタム属性は不要



#### 他ツールとの相性が良い
- TypeScript、Rust、JavaScript Next、または[任意のプリプロセッサ](https://riot.js.org/next/#プリプロセッサ)を使ってコンポーネントを作成
- [@riotjs/cli](https://github.com/riot/cli) 、[webpack](https://github.com/riot/webpack-loader)、[Rollup](https://github.com/riot/rollup-plugin-riot)、[Parcel](https://github.com/riot/parcel-plugin-riot)、[Browserify](https://github.com/riot/riotify) を使用してビルド
- 任意の方法でテストし、[直接ノードに riot タグをロード](https://github.com/riot/ssr#render---to-render-only-markup)可能


## 2. シンプルかつミニマリスト

Riot.js はミニマリズムであるということが他のライブラリと一線を画しています:

### 1. 楽しい文法

デザインのゴールの１つは、できる限り最小限の ”boilerplate” で使える強力なタグ構文を導入することでした:

- 脳に `className`, `htmlFor`...のような属性のための余分な負荷をかけない
- 複数の属性に対するスプレッド演算子を用いたショートカット: `<p { ...attributes }></p>`
- 式の補間: `Add #{ items.length + 1 }` や `class="item { activeClass }"`
- タグを定義するための `export default` というパブリックインターフェイスの記述
- 非同期レンダリングや `Proxy` オブジェクトによる副作用はない
- OOP クラスベースの構文に則った実用的な API
- `<style>` タグにより shadow DOM と混乱することなく自動で CSS スタイリング可能


### 2. 小さな学習曲線

Riot.jsは他の UI ライブラリと比較して API メソッドの数が 10分の1 から 100分の1ほどです。

- 学ぶことが少ない。閲覧する書籍やチュートリアルが少なくなる
- 学ぶべきテンプレートディレクティブはたったの3つだけ `if`, `each` そして `is`
- 独自性の物が少ない
- 新しく学ぶ構文はない
- "magic" や "smart" リアクティブプロパティまたはフックはない
- 暗黙の仮定に覆われた明示的な振る舞い


### 3. サイズが小さい

{% include libraries_comparison.html %}

- たったの {{ site.data.libraries.riot.size }}kb！
- 少ないバグ
- パースが早く、ダウンロードも容易
- 組み込みやすい。ライブラリはアプリケーションよりも小さくなるべきである
- メンテナンスコストが小さい。我々は Riot を維持するための大きなチームを必要としない


### 4. 小さいが必要十分

Riotはモダンなクライアントサイドのアプリケーションを作るための、基本的な構成単位をすべて備えています:

- ユーザーインターフェイスを構築するためのモダンなビュー
- 多くの DOM ノードの場合でもハイパフォーマンス
- 拡張性が高く、かつ独自性は低い

Riot.js は１つの"オープンスタック"です。つまり、フレームワーク固有のイディオムを避けたい開発者のためのもの、を意味します。一般的なツールを使用して、あなたの最も好みのデザインパターンを組み合わせることができます。

#### パワフルかつモジュラーなエコシステム

Riot.js のエコシステムは完全にモジュール化しており、必要なものを個別に選択できるよう設計されています:

  - [@riotjs/cli](https://github.com/riot/cli) - ローカル上で tags を JavaScript にコンパイルするための CLI
  - [@riotjs/ssr](https://github.com/riot/ssr) - 非常にシンプルなサーバーサイドレンダリング
  - [@riotjs/hydrate](https://github.com/riot/hydrate) - SPA のためのハイドレーション戦略
  - [@riotjs/route](https://github.com/riot/route) - 同形のルーター
  - [@riotjs/lazy](https://github.com/riot/lazy) - レイジーコンポーネントローダー
  - [@riotjs/hot-reload](https://github.com/riot/hot-reload) - ライブリロード用のプラグイン
  - [@riotjs/compiler](https://github.com/riot/compiler) - 拡張タグコンパイラ
  - [@riotjs/parser](https://github.com/riot/parser) - HTML パーサ
  - [@riotjs/dom-bindings](https://github.com/riot/dom-bindings) - 式ベースのテンプレートエンジン
  - [@riotjs/custom-elements](https://github.com/riot/custom-elements) - ネイティブカスタム要素の実装

## まとめ

Riot.js は誰でも使えるWeb Components です。React + Polymer から無駄を省いたものを想像してください。Vue.js にインスピレーションを受けたその API は豊富で、それでいて現代のフロントエンドプロジェクトを構築するために、最低限必要なもののみを含んでいます。ごく自然に使用でき、とても軽い。そして、今日から使えます。車輪の再発明をするのではなく、むしろそこにあるものの良いとこ取りをし、可能な限り最もシンプルなツールにしました。

Riot.js は [*Tim Peters 氏の The Zen of Python*](https://en.wikipedia.org/wiki/Zen_of_Python) という思想（哲学）から駆動し、設計されました。それが我々のマントラです:

> 醜いものより美しいものが良い。<br/>
> 暗黙的なものより明示的なものが良い。<br/>
> 複雑なものよりシンプルなものが良い。<br/>
> でも、わかりにくいくらいなら複雑なほうが良い。<br/>
> ネストするよりフラットなほうが良い。<br/>
> 密集しているより隙間があるほうが良い。<br/>
> 読みやすさこそが重要。<br/>
> 特別だからといってルールを破ってはいけない。<br/>
> ただし、実用性は純正に勝る。<br/>
> エラーは見逃されるべきではない。<br/>
> 明示的にそうしないかぎり。<br/>
> あいまいさに直面しても、推測したくなる誘惑に負けてはいけない。<br/>
> 明白なただ1つの方法（なるべく1つの方法）があるはず。<br/>
> でもそれはあなたがオランダ人でないとしたら、最初はそれほど明白ではないかもしれない。<br/>
> やらないより、今やるべき。<br/>
> でも*すぐに*やるより、やらないほうがいいこともある。<br/>
> 実現方法の説明が難しければ、それは悪いアイディア。<br/>
> 実現方法の説明が容易であれば、それはおそらく良いアイディア。<br/>
> 名前空間は素晴らしいアイディアの1つ。もっとそれらを使っていこう！
