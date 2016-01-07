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

僕たちは、この直感に敬意を表します。ゴールは、再利用可能なテンプレートを作ることではなく、コンポーネントを作ることです。ロジックをテンプレートから分離することは(例えば、jQueryセレクタを使って)、本来一緒にしておくべきものを追い出してしまっているのです。

関連するこれらの技術をコンポーネント内にまとめることで、システムはよりクリーンになります。この重要な直感において、Reactは偉大でした。

Reactはよく機能し、まだ使っているプロジェクトもありますが、Reactのサイズと文法 (**特に** 文法!) には不満もありました。僕たちは、ユーザにとっても、実装としても、もっと単純にできないものか考え始めたのです。


### Reactの文法

次の例は、Reactのホームページから直接持ってきたものです。


``` javascript
import React from 'react';
import ReactDOM from 'react-dom';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: [], text: ''};
    }

    render() {
        const {items, text} = this.state;
        return (
            <div>
                <h3>TODO</h3>
                <ul>
                    <li>{items.map((item, i)=> <li key={i}>{item}</li>)}</li>
                </ul>
                <form onSubmit={this._onSubmit}>
                    <input onChange={this._onChange} value={text}/>
                    <button>Add #{items.length + 1}</button>
                </form>
            </div>
        );
    }

    _onChange(e) {
        this.setState({text: e.target.value});
    }

    _onSubmit(e) {
        e.preventDefault();
        const {items, text} = this.state;
        this.setState({
            items: items.concat(text),
            text: ''
        });
    }
}

ReactDOM.render(<Todo/>, mountNode);
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
    <input>
    <button>Add #{ items.length + 1 }</button>
  </form>

  this.items = []

  handleSubmit(e) {
    var input = e.target[0]
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

再利用可能なコンポーネントとして分離しつつも、レイアウトとロジックを分けるのに、Riotの文法は一番すっきりした方法だと、僕たちは考えています。


### 文字列ベースかDOMベースか

コンポーネントが初期化される際、Reactは文字列をパースし、RiotはDOMツリーをトラバースします。

Riotはテンプレート変数をそのツリーから取得し、配列に保持します。それぞれのテンプレート変数は、DOMノードへのポインターを持っています。それぞれでテンプレート変数は評価され、DOMの値と比較されます。もし、値が変更されていれば、該当するDOMノードが更新されます。その過程で、Riotは仮想DOM(と言ってもよりシンプルなものですが)を持ちます。

これらのテンプレート変数はキャッシュされ、更新は非常に高速です。100か1000のテンプレート変数があっても通常1ミリ秒かそれ以下です。

Reactの場合、更新後にHTMLレイアウトがランダムに変更されうるため、同期アルゴリズムはもっと複雑怪奇です。この計り知れない挑戦に、Facebookの開発者たちは素晴らしい仕事をしました。

でも、この複雑な変更検知(diffing)を避けられることを、僕たちはすでに見てきました。

RiotではHTMLの構造は固定です。ループと条件文だけが、要素の追加と削除を行います。ですが、例えば`div`が`label`に変換されるようなことは起きえません。Riotは複雑な部分木(DOMツリー)の置き換えなしに、テンプレート変数だけを更新します。


### Fluxとルーティング

ReactはUIのみを扱います。それ自体は良いことです。偉大なソフトウェアプロジェクトは必ず鋭いフォーカスを持っています。

Facebookは、クライアントサイドのコードを構造化するのに、[Flux](http://facebook.github.io/flux/docs/overview.html)の利用を推奨しています。これはフレームワークというよりも素晴らしいアイデアを詰め込んだ、ひとつのパターンです。

Riotはカスタムタグとともに、イベントエミッタ(オブザーバブル)とルータがついて来ます。これらがクライアントサイドアプリケーション構築の基礎的なブロックだと信じているからです。イベントはモジュール性をもたらし、ルータはURLと「戻る」ボタンをハンドリングし、カスタムタグがユーザインターフエースを担います。

ちょうどFluxのように、Riotは柔軟で、開発者に設計上の大きな決定権を残しています。これは、ゴールに到達するのを助けるライブラリにすぎません。

RiotのオブザーバブルとルータでFluxライクなシステムを構築することも可能です。実際、そういった試みも[すでにあります](https://github.com/jimsparkman/RiotControl)。


### 10〜128倍大きい

Reactは、Riotの10倍のサイズです。

<small><em>react.min.js</em> – 119KB</small>
<span class="bar red"></span>

<small><em>riot.min.js</em> – <span class="riot-size">{{ site.size_min }}KB</span></small>
<span class="bar blue" style="width: {{ site.size_min / 119 * 100 }}%"></span>

<br>

Reactの推奨ルータは、Riotのルータの128倍巨大です。

<small><em>react-router.min.js</em> – 54.9KB</small>
<span class="bar red"></span>

<small><em>react-mini-router.min.js</em> – 8.6KB</small>
<span class="bar red" style="width: 15.6%"></span>

<small><em>riot.router.min.js</em> – 0.43KB</small>
<span class="bar blue" style="width: 0.7%"></span>


確かに、このルータ比較はちょっと不公平です。[react-router](https://github.com/rackt/react-router)はより多くの機能を持っています。ですが、この図はRiotのゴール、つまり「最もミニマリスティックなAPIを提供すること」を明確に示すものです。

Reactのエコシステムは、よりフレームワーク的で、APIの肥大化の気配がします。実際、小さな実装の[react-mini-router](https://github.com/larrymyers/react-mini-router)よりも、この大きな選択肢がReactコミュニティでは人気です。


# Polymer

PolymerはWeb Component標準に則り、最新ブラウザで利用可能にします。これは、カスタムタグを標準的な方法で書けるということです。

コンセプトとしてはRiotも同じなのですが、いくつかの違いがあります:

1. Riotは変更のあった要素だけを更新するため、少ないDOM操作で済みます。

2. Polymerの文法はもっと複雑で、本を何冊か読まなくてはいけません。

3. それぞれのコンポーネントはHTMLの`link rel="import"`で読み込まれます。PolyfillsはXHRsに頼る必要があり、専用の[vulcanize](https://github.com/polymer/vulcanize)ツールを使わない限り、耐えられない遅さです。Riotのタグは`script src`で読み込まれ、一般的なツールで複数のタグを結合することができます。

4. サーバサイドレンダリングができません。


### 11倍大きい

Polymer(v1.0.6) + WebComponents(v0.7.7)はRiotの11倍のサイズです。

<small><em>polymer.min.js</em> – 138KB</small>
<span class="bar red"></span>

<small><em>riot.min.js</em> – <span class="riot-size">{{ site.size_min }}KB</span></small>
<span class="bar blue" style="width: {{ site.size_min / 138 * 100 }}%"></span>

Web Componentsは[Polyfill挑戦の王様](http://developer.telerik.com/featured/web-components-arent-ready-production-yet/)と呼ばれ、Polymerがこんなにも巨大なコードを必要とする所以です。


### 実験的

Polymerは実験的な技術の上に成り立っています。ネイティブのWeb Componentsサポートは、まだSafariやIEにありません。いまだ、IEのステータスは「検討中」中であり、Safariのプランは不透明です。いくつかのWebKitへの[コミット](https://lists.webkit.org/pipermail/webkit-dev/2013-May/024894.html)からは彼らにその気がまったくないことが伺えます。そして、Polymerが唯一、「新鮮な」最新版ブラウザたち(IE 10+)に対応するPolyfillです。

Polymerは[2年以上経過した](https://github.com/Polymer/polymer/commit/0452ada044a6fc5818902e685fb07bb4678b2bc2)プロジェクトですが、いまだ目立った普及を見せていません。今後、Web Componentsがネイティブサポートされるかどうかは、不透明です。
