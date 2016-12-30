---
layout: ja
title: RiotをReact・Polymerと比較する
---

# **Riot** vs **React** & **Polymer**

Riotは何が違うの?

## React

Riotは、Reactとその「まとめ方(cohesion)」のアイデアからインスパイアされました。Facebookの開発者いわく:

> 「テンプレートは、問題ではなく、技術を分けるだけだ」
> "Templates separate technologies, not concerns."

私たちは、この直感に敬意を表します。ゴールは、再利用可能なテンプレートを作ることではなく、コンポーネントを作ることです。ロジックをテンプレートから分離することは(例えば、jQueryセレクタを使って)、本来一緒にしておくべきものを追い出してしまっているのです。

関連するこれらの技術をコンポーネント内にまとめることで、システムはよりクリーンになります。この重要な直感において、Reactは偉大でした。

### Reactの文法

次の例は、Reactのホームページから直接持ってきたものです。

``` javascript
import React from 'react';
import ReactDOM from 'react-dom';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {items: [], text: ''};
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

ReactDOM.render(<TodoApp />, mountNode);
```

JSXはHTMLとJavaScriptのミックスです。HTMLをコンポーネントの好きなところに含めることができます。メソッドの中でも、プロパティの値としても。


### Riotの文法

そして、こちらは上と同じ内容をRiotで書いた場合です。

``` html
<todo>
  <h3>TODO</h3>

  <ul>
    <li each={ item, i in items }>{ item }</li>
  </ul>

  <form onsubmit={ handleSubmit }>
    <input ref="input">
    <button>Add #{ items.length + 1 }</button>
  </form>

  this.items = []

  handleSubmit(e) {
    e.preventDefault()
    var input = this.refs.input
    this.items.push(input.value)
    input.value = ''
  }
</todo>
```

このタグはこのページに次のようにマウントされます。

``` html
<todo></todo>

<script>riot.mount('todo')</script>
```

### 同じ、だけど全然違う

Riotでは、HTMLとJavaScriptはより見慣れた形であらわれます。どちらも、同じコンポーネントのもとにありますが、きちんとそれぞれが分けられています。HTMLはJavaScriptのテンプレート変数(expressions)と混ぜることができます。

テンプレート変数を波括弧で囲むこと以外、独自路線は一切なしです。

少ないボイラープレート、少ない括弧にカンマ、システムプロパティやメソッド名に気がつくでしょう。文字列には、変数を挿入することができます: `"Hello " + this.state.world`の代わりに、`"Hello {world}"`でOK。そして、メソッドはES6のコンパクトな文法で定義できます。

再利用可能なコンポーネントとして分離しつつも、レイアウトとロジックを分けるのに、Riotの文法は一番すっきりした方法だと、私たちは考えています。


### 仮想DOM vs テンプレート変数バインディング (expressions binding)

コンポーネントが初期化される際、Reactは仮想DOMを作り、一方でRiotはDOMツリーをトラバースするのみです。

Riotはテンプレート変数をそのツリーから取得し、配列に保持します。それぞれのテンプレート変数は、DOMノードへのポインターを持っています。それぞれでテンプレート変数は評価され、DOMの値と比較されます。もし、値が変更されていれば、該当するDOMノードが更新されます。

これらのテンプレート変数はキャッシュされ、更新は非常に高速です。100か1000のテンプレート変数があっても通常1ミリ秒かそれ以下です。

Reactの場合、更新後にHTMLレイアウトがランダムに変更されうるため、同期アルゴリズムはもっと複雑怪奇です。この計り知れない挑戦に、Facebookの開発者たちは素晴らしい仕事をしました。

でも、この複雑な変更検知(diffing)を避けられることを、私たちはすでに見てきました。

RiotではHTMLの構造は固定です。ループと条件文だけが、要素の追加と削除を行います。ですが、例えば`div`が`label`に変換されるようなことは起きえません。Riotは複雑な部分木(DOMツリー)の置き換えなしに、テンプレート変数だけを更新します。


### Fluxとルーティング

ReactはUIのみを扱います。それ自体は良いことです。偉大なソフトウェアプロジェクトは必ず鋭いフォーカスを持っています。

Facebookは、クライアントサイドのコードを構造化するのに、[Flux](http://facebook.github.io/flux/docs/overview.html)の利用を推奨しています。これはフレームワークというよりも素晴らしいアイデアを詰め込んだ、ひとつのパターンです。

Riotはカスタムタグとともに、イベントエミッタ(オブザーバブル)とオプショナルなルータがついて来ます。これらがクライアントサイドアプリケーション構築の基礎的なブロックだと信じているからです。イベントはモジュール性をもたらし、ルータはURLと「戻る」ボタンをハンドリングし、カスタムタグがユーザインターフェースを担います。

ちょうどFluxのように、Riotは柔軟で、開発者に設計上の大きな決定権を残しています。これは、ゴールに到達するのを助けるライブラリにすぎません。

RiotのオブザーバブルとルータでFluxライクなシステムを構築することも可能です。実際、そういった試みも[すでにあります](https://github.com/jimsparkman/RiotControl)。


### {{ site.compare.react }}倍大きい

React(v{{ site.react.version }})は、Riotの{{ site.compare.react }}倍のサイズです。

<small><em>react.min.js</em> – {{ site.react.size }}KB</small>
<span class="bar red"></span>

<small><em>riot.min.js</em> – <span class="riot-size">{{ site.size_min }}KB</span></small>
<span class="bar blue" style="width: {{ site.size_min | divided_by: site.react.size | times: 100 }}%"></span>

<br>

Reactの推奨ルータ(v{{ site.react_router.version }})は、Riotのルータの{{ site.compare.react_router_vs_riot_router }}倍。

<small><em>react-router.min.js</em> – {{ site.react_router.size }}KB</small>
<span class="bar red"></span>

<small><em>react-mini-router.min.js</em> – {{ site.react_mini_router.size }}KB</small>
<span class="bar red" style="width: {{ site.react_mini_router.size | divided_by: site.react_router.size | times: 100 }}%"></span>

<small><em>riot.router.min.js</em> – {{ site.riot_route_size_min }}KB</small>
<span class="bar blue" style="width: {{ site.riot_route_size_min | divided_by: site.react_router.size | times:100 }}%"></span>


確かに、このルータ比較はちょっと不公平です。[react-router](https://github.com/rackt/react-router)はより多くの機能を持っています。ですが、この図はRiotのゴール、つまり「最もミニマリスティックなAPIを提供すること」を明確に示すものです。

Reactのエコシステムは、よりフレームワーク的で、APIの肥大化の気配がします。実際、小さな実装の[react-mini-router](https://github.com/larrymyers/react-mini-router)よりも、この大きな選択肢がReactコミュニティでは人気です。


## Polymer

PolymerはWeb Component標準に則り、最新ブラウザで利用可能にします。これは、カスタムタグを標準的な方法で書けるということです。

コンセプトとしてはRiotも同じなのですが、いくつかの違いがあります:

1. Web Componentsの文法は、実験的で複雑です。

2. Riotは変更のあった要素だけを更新するため、少ないDOM操作で済みます。

3. それぞれのコンポーネントはHTMLの`link rel="import"`で読み込まれます。PolyfillsはXHRsに頼る必要があり、専用の[vulcanize](https://github.com/polymer/vulcanize)ツールを使わない限り、耐えられない遅さです。Riotのタグは`script src`で読み込まれ、一般的なツールで複数のタグを結合することができます。

4. サーバサイドレンダリングができません。


### {{ site.compare.polymer_and_webcomponents }}倍大きい

Polymer(v{{ site.polymer.version }}) + WebComponents(v{{ site.webcomponents.version }})はRiotの{{ site.compare.polymer_and_webcomponents }}倍のサイズです。

<small><em>polymer.min.js</em> – {{ site.polymer.size }}KB</small>
<span class="bar red"></span>

<small><em>riot.min.js</em> – <span class="riot-size">{{ site.size_min }}KB</span></small>
<span class="bar blue" style="width: {{ site.size_min | divided_by: site.polymer.size | times: 100 }}%"></span>

Web Componentsは[Polyfill挑戦の王様](http://developer.telerik.com/featured/web-components-arent-ready-production-yet/)と呼ばれ、Polymerがこんなにも巨大なコードを必要とする所以です。


## Web components

最終的には、業界標準としてのWeb Componentsに辿り着くべきです。それは[長い年月](http://caniuse.com/#search=web%20components)を必要としますが、いずれは標準コンポーネントがウェブを満たすことになります。

これらのコンポーネントは複雑であるため、直接に使われない可能性が大きいです。今日多くの人が、直接DOMを操作せずjQueryを使うように、Web Componentsの上にもさらなる層が作られるでしょう。

Riotはそういった抽象化の一層です。それはアプリケーションが頼りにできる簡単なAPIを提供します。Web Componentsの仕様が発達するにつれ、パフォーマンス向上など実際のメリットがあるのであれば、Riotは内部でそれらを導入することができます。

Riotの目的はUI開発を可能な限り簡単にすることです。現在のAPIは、ウェブテクノロジーの日進月歩の流転に耐えうるよう設計されています。Web ComponentsのjQueryと見てもいいでしょう。より簡潔な文法で同じ目的を果たすからです。それは再利用可能なコンポーネントの作成をシンプルな体験にします。
