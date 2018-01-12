---
layout: ja
title: Riot 2 からのマイグレーション
---

{% include ja/guide-tabs.html %}

## はじめに

Riot 3は以前のリリースで見つかったイシューについての大きな改善です。詳細については[リリースノート](/ja/release-notes)を確認してください。

いろいろな問題を解決しましたが、以前のコードベースでは修正できなかったため、新しいメジャーバージョンのリリースを必要としました。ですが、Riot 2からのマイグレーションは簡単であるべきです。以下に、知っておくべき主な互換性のない変更(breaking change)を挙げておきます。

## 互換性のない変更

### `riot-tag`の廃止

属性`riot-tag`は廃止されて、`data-is`に変わります。

```html
<!-- not supported -->
<div riot-tag="my-tag"></div>

<!-- good -->
<div data-is="my-tag"></div>
```

なお、`data-is`はネストしたタグでも使え、動的なテンプレート変数(expression)にも対応しました。

```html
<my-tag>
  <div data-is={ subComponent }></div>

  <script>
    this.subComponent = 'child-tag'
  </script>
</my-tag>
```

### `name`と`id`によるDOM参照の廃止

もう、`name`と`id`属性から、自動的にDOMへの参照を作成することはありません。
代わりに`ref`属性を使用してください。

<span class="tag red">Warning:</span> `refs` オブジェクトは `mount` イベント __の発火後でなければ設定されません__ 。

```html
<my-tag>
  <p ref="paragraph">Hello</p>
  <script>
    console.log(this.refs.paragraph) // => p node
  </script>
</my-tag>
```

### オブジェクトループ

オブジェクトのループの文法が変わります。以前は`key, value in object`でしたが、`value, key in object`に変更されます。
[関連イシューはこちら](https://github.com/riot/riot/issues/1420)

### `riot.route`をコアから削除

`riot.route`はRiotのコアから削除されました。今後はニーズに合ったルータを好きに組み合わせて使えます。
[`riot-route`](https://github.com/riot/route)の開発は今後も続きます。スタンドアローンのライブラリとして、Riotとあるいは別のライブラリと合わせて使うことができるでしょう。

### `mount`の前に`update`と`updated`イベントは起きない

以前のRiotでは`update`と`updated`イベントが`mount`イベントの前にトリガーされていました。
今後、タグをマウント前に調整したい場合は、`before-mount`か`mount`イベントが使えます。`update`と`updated`イベントはタグのアップデートを実行した時のみに、発生します。

### 自動`preventDefault`の廃止

Riotはタグで発生するイベントで、自動的に`event.preventDefault()`を実行していましたが、この挙動は適切でないと判断し、廃止することにしました。

```html
<my-tag>
  <form onsubmit={ ajaxSubmit }>
    <input>
  </form>

  <script>
    ajaxSubmit(event) {
      // in riot2 this was not needed
      event.preventDefault()
    }
  </script>
</my-tag>
```

### 子タグで発生したイベントで、親タグをアップデートしない

Riot 2では、イベントがループ内の子カスタムタグで発生すると、親タグでもイベントがトリガーされていました [riot/1319](https://github.com/riot/riot/issues/1319)。Riot 3でイベントがループ内の子カスタムタグから親タグのアップデートをしたい場合は、明示的にする必要があります。

### イベント名の複数指定できない (`riot.observable`)

`riot.observable`を以前のバージョンから6倍高速にしましたが、このパフォーマンス改善のため、スペース区切りでイベント名を複数指定する機能を削除する必要がありました。

```js
var el = riot.observable()

// not supported
el.on('start stop', function() { /* */ })
el.trigger('start stop')

// use this instead
function cb() {}
el
  .on('start', cb)
  .on('stop', cb)

el
  .trigger('start')
  .trigger('stop')
```

### jQueryのDOMイベント

Previously you could trigger riot event handlers via jQuery using `$('.my-element').trigger('click')`. This was possible because riot 2 was using the [old DOM events model ( level 2 )](https://www.w3.org/TR/DOM-Level-2-Events/) fully compatible with the jQuery events API. With riot 3 we have upgraded the riot internal events handlers to the more standard [new DOM events model level 3](https://www.w3.org/TR/DOM-Level-3-Events/) that is not supported by the jQuery DOM events API. This means that you need alternative solutions to the simulate fake events [more info](https://github.com/riot/riot/issues/2150#issuecomment-271334951).

Riot 2では、jQueryから`$('.my-element').trigger('click')`といった方法で、Riotのイベントハンドラをトリガできました。Riot 2は[古い形式のDOMイベントモデル（レベル２）](https://www.w3.org/TR/DOM-Level-2-Events/)を採用しており、これがjQueryのイベントAPIと完全互換だったため、こうしたことが可能だったのです。しかし、Riot 3ではを内部イベントハンドラを今後の標準となる（そしてjQueryのDOMイベントAPIがサポートしていない）[新しい形式のDOMイベントモデル（レベル３）](https://www.w3.org/TR/DOM-Level-3-Events/)へと刷新しました。つまり、ダミーイベントのシミュレートに今までのやり方は使えなくなってしまったというわけです。[この件については、こちらのイシュー（英語）をご確認ください](https://github.com/riot/riot/issues/2150#issuecomment-271334951)。

### Scoped CSSがデフォルトに

Riot 3では、全てのCSSはデフォルトで「scoped」になります。もう、`<style>`要素に`scoped`属性をいちいち追加する必要はありません。

### `babel` 5.8にはもう対応しない

`es6`パーサーは最新版の`babel`を使います ([詳しくはこちら](/guide/compiler/#ecmascript-6))。どうしても古いバージョンの`babel`を使いたい場合、`es6`用のパーサを独自設定することは可能です。

なお、`babel`だけでなく、`bublé`にも対応しました。

### テンプレートエラーの出力

Riot 2では、タグ内のテンプレートのエラーをキャッチするためには自分で関数をセットする必要がありました。Riot 3では、タグ内の全てのテンプレートエラーは`console.error`から出力されます。(`console` APIが利用可能な場合)
