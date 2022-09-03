---
layout: ja/detail
title: コンパイラ
---

## 概要

カスタムタグをブラウザで実行可能するには、JavaScript に変換する必要があります。
Riot のコンパイラは Riot タグを JavaScript モジュールに変換するよう設計されています。
コンパイルされた Riot タグは次のようになります:

```js
export default {
  css: `my-tag { color: red; }`, // コンポーネントのcss文字列
  template: function() {}, // 内部 riot テンプレートファクトリ関数
  exports: {}, // コンポーネントイベントとライフサイクルメソッド
  name: 'my-tag' // コンポーネント id
}
```

**ひとつのタグファイルに含まれるタグ定義は、ひとつだけです。**

## インブラウザ・コンパイル

`riot+compiler.js` (~90kb Gzip) によるバンドルは、ブラウザで Riot タグを直接コンパイルし、実行する機能を提供しています。
`<script>` タグの属性に `type="riot"` を指定することで、 Riot タグをブラウザにロードすることが可能です。
例:

```html
<!-- マウント位置 -->
<my-tag></my-tag>

<!-- <my-tag/> は外部ファイルで指定 -->
<script src="path/to/javascript/my-tag.riot" type="riot"></script>

<!-- riot.js とコンパイラを含める -->
<script src="https://unpkg.com/riot@{{ site.data.globals.version }}/riot+compiler.min.js"></script>

<!-- コンパイルとマウント -->
<script>
(async function main() {
  await riot.compile()

  riot.mount('my-tag')
}())
</script>
```

この場合、 Riot はすべての `export default` 式を内部的に変換し、まだ JavaScript モジュールをサポートしていないブラウザへのサポートをすることに注意してください。

Riot は、 `<script>` を通じてDOMにインクルードされたすべての外部タグを非同期にコンパイルし、 `riot.mount` でそれらを描画することが可能です。

ブラウザによる Riot スクリプトタグのプリフェッチ機能を抑止し、同じリソースを複数回ロードすることを防ぐため、 `<script>` タグの `src` 属性の代わりに `data-src` 属性を使いたい場合があるかも知れません。 Riot は自動的に、 ajax によってタグをフェッチしてコンパイルします。

### インラインテンプレートを含むインブラウザ・コンパイル

Riot.js のコンポーネントは、 `<template>` タグを用いて直接ページに追加することも可能です。例:

```html
<!-- ページのいずれかの箇所 -->
<template id="my-tag">
  <my-tag>
    <p>{ props.message }</p>
  </my-tag>
</template>
```

`riot+compiler.js` バンドルは `compileFromString` と `inject` メソッドを公開しており、これらを組み合わせることで、上記のコンポーネントをコンパイルするのに役立ちます:

```js
const tagString = document.getElementById('my-tag').innerHTML

// コンパイルされたコードを得る
const {code} = riot.compileFromString(tagString)

// riot コンポーネントをランタイム生成
riot.inject(code, 'my-tag', './my-tag.html')

riot.mount('my-tag')
```

## プリコンパイル

上記のコンパイル段階は非同期に行われ、アプリケーションの描画処理をブロックしません。しかしインブラウザ・コンパイルは、ひな型の作成やちょっとした実験のためだけに使うべきです。

プリコンパイルを行うと、次のような利点があります:

- [お好みのプリプロセッサ](#プリプロセッサ)でタグをコンパイル。
- 高いパフォーマンスを得られる。ロードやブラウザによるコンパイラ実行が不要。
- ソースマップ出力でデバッグをサポート。

### Riot ローダー

[`webpack`](https://webpack.js.org/) や [`rollup`](https://rollupjs.org/) といったツールは、 Riot アプリケーションのタグをバンドルするのに最適です。
そのようなツールに向けて、 Riot コンポーネントをあなたのソースコードにそのままインポートするための、 Riot 公式ローダーを提供しています:
  - [webpack](https://github.com/riot/webpack-loader)
  - [Rollup](https://github.com/riot/rollup-plugin-riot)
  - [Parcel](https://github.com/riot/parcel-plugin-riot)
  - [Riotify](https://github.com/riot/riotify)

Riot ローダーを使ったアプリケーションのエントリースクリプトは、おそらくこのようになるでしょう:

```js
import { component } from 'riot'
import MyTag from './path/to/tags/my-tag.riot'

component(MyTag)(document.getElementById('root'))
```

### TypeScript サポート

Riot.js コンパイラは typescript の構文をサポートします。
コンポーネントの API や式の型チェックを有効にしたい場合は、以下のように `RiotComponent` インターフェイスをエクスポートします:

```html
<my-component>
  <!-- lang="ts" はオプションで、最終的には IDE のコードハイライトのためだけに必要であることに注意してください -->
  <script lang="ts">
    import { RiotComponent } from 'riot'

    export interface MyComonent extends RiotComponent<MyComponentProps, MyComponentState> {
      /* コンポーネントのカスタムメソッドやプロパティを追加 */
    }
  </script>
</my-component>
```

コンポーネントの型を強化したい場合は [`riot.withTypes`](/api/#riotwithtypes) メソッドもチェックすると良いでしょう。

プロジェクトの config ファイルをセットアップする際には、Riot.js の [typescript の例](https://github.com/riot/examples/tree/gh-pages/typescript) を参考にすると良いでしょう。

### Node によるコンパイル

```javascript
import {compile} from '@riotjs/compiler'

const { code, map } = compile('<p>{hello}</p>', {
  // 以下、オプション定義
  file: 'my/path/to/my-component.riot',
  // cssの `:host` を変換するか
  scopedCss: true,
  // （テンプレート構文の）式のデリミタ
  brackets: ['{', '}'],
  // HTML のコメントを残すか
  comments: false
})
```

`compile()` 関数は、引数として文字列を取り、 `code` と `map` をキーに持つオブジェクトを返します。
生成されたコードは、ご自身で好きなように扱うこともできますし、お使いのビルドシステムで使用することもできます。

Riot コンパイラは、JavaScript モジュールを出力することにご留意ください。バンドルには、これら（訳注: 出力されたモジュール）をトランスパイルしたほうがいいでしょう。


### Riot.js コマンドラインによるコンパイル

Riot.js ファイルを、 [`riot`](https://github.com/riot/cli) 実行コマンドを使ってプリコンパイルすることもできます。こちらは以下のように、NPM でインストールできます:

```sh
npm install @riotjs/cli -g
```

#### 使い方

`riot` コマンドの動作例をご紹介します:

```sh
# カレントフォルダに、単体のファイルをコンパイル
riot some.riot

# ファイルをコンパイルして、指定したフォルダに出力
riot some.riot --output some-folder

# ファイルをコンパイルして、指定したパスに出力
riot some.riot --output some-folder/some.js

# ソースフォルダにある全てのファイルをコンパイルして、指定したフォルダに出力
riot some/folder --output path/to/dist

```

より詳しい情報を見るには、右のようにタイプしてください: `riot --help`

#### ファイル変更の監視

ディレクトリを監視し、ファイルが変更されたら自動的に変換できます。

```sh
# 特定のディレクトリ（訳注: ここでは `src` ディレクトリ）を監視
riot -w src -o dist
```


#### ファイルの拡張子を変更

Riotタグファイルの拡張子は、お好きなものをお使いください（デフォルトでは `.riot` です）:

```sh
riot --extension html
```

#### ES6形式の設定ファイル

設定ファイルを使えば、`@riotjs/cli` のすべてのオプションの設定を保存して楽に設定できるようにしたり、新しいカスタムパーサを作成したりできます

```sh
riot --config riot.config src
```

`riot.config.js` ファイルは、このような形式になります:

```js
export default {
  output: 'tags/dist',
  // ソースマップ形式
  sourcemap: 'inline',
  // ファイル拡張子
  extension: 'foo'
}
```

作成するプロジェクトでカスタムプリプロセッサを使いたい場合、package.json の `devDependency` から `@riotjs/cli` をインストールし、npm スクリプトから以下のように起動します:


```json

{
  "scripts": {
    "build": "npx riot -c riot.config src"
  },
  "devDependencies": {
    "@riotjs/cli": "^4.0.0",
    "@riotjs/compiler": "^4.0.0",
    "pug": "^2.0.3"
  }
}
```

以下はコンポーネント（訳注: タグファイル）のテンプレートエンジンとして `pug` を使いたい場合の、`riot.config.js` の典型例です。

```js
import { registerPreprocessor } from '@riotjs/compiler'
import { render } from 'pug'

// pug のプリプロセッサを登録
registerPreprocessor('template', 'pug', (code, options) => {
  const { file } = options

  return {
    code: render(code, {
      filename: file,
      pretty: true,
      doctype: 'html'
    })
  }
})

export default {
  extension: 'pug',

  // pug のプリプロセッサを riot コンパイラオプションに割り当てる
  riot: {
    template: 'pug'
  }
}
```

#### アプリケーション全体のビルド

CLI ツールを使って、アプリケーション全体をバンドルすることもできます。

`app.js` ファイル:

```js
import {component} from 'riot'
import App from './app.riot'

component(App)(document.getElementById('root'))
```

```sh
riot app.js -o dist/app.js
```

上記の場合、作成したアプリケーションにインポートされたすべての Riot.js コンポーネントは `dist/app.js` ファイルに含まれ、コードが実行されるようになります。

## プリプロセッサ

お好きなプログラム言語を用いて、コンポーネントの内容をプリプロセスできます。

`@riotjs/compiler` は、任意のプリプロセッサを登録する機能を提供しています:

```js
import { registerPreprocessor } from '@riotjs/compiler'
import pug from 'pug'
import sass from 'node-sass'
import babel from '@babel/core'

registerPreprocessor('template', 'pug', function(code, { options }) {
  const { file } = options
  console.log('テンプレートのプリプロセス', file)

  return {
    code: pug.render(code),
    // ソースマップ出力をしない
    map: null
  }
})

registerPreprocessor('css', 'sass', function(code, { options }) {
  const { file } = options

  console.log('sass のコードをコンパイル中', file)

  const {css} = sass.renderSync({
    data: code
  })

  return {
    code: css.toString(),
    map: null
  }
})


registerPreprocessor('javascript', 'babel', function(code, { options }) {
  const { file } = options

  return babel.transform(code, {
    sourceFileName: file
  })
})
```

Riot.js のプリプロセッサは、`template`, `css`, `javascript` の3種類の、いずれかでなければなりません（`registerPreprocessor` 関数の最初の引数です）。
別のテンプレートエンジンでコンポーネントをコンパイルするには、コンパイラを介して `template` オプションを指定する必要があります:

```js
import { compile } from '@riotjs/compiler'

compile(source, {
  template: 'pug'
})
```

`css` と `javascript` のプリプロセッサは、コンポーネント内で直接 `type="{preprocessor}"` を指定するだけで有効にできます

```html
<my-component>
  <p>{getMessage}</p>

  <style type="scss">
    import 'color/vars'

    p {
      color: $primary;
    }
  </style>

  <script type="ts">
    export default {
      getMessage():string {
        return 'hello world'
      }
    }
  </script>
</my-component>
```

### プリプロセッサの注意事項

Riot.js のコンパイラは、プリプロセッサによって提供されたコードからソースマップを生成します。もしご利用のプリプロセッサが `map` を返さない場合、コンパイラは適切なソースマップを出力しません。

```js

import { registerPreprocessor } from '@riotjs/compiler'
import babel from '@babel/core'

registerPreprocessor('javascript', 'babel', function(code, { options }) {
  // babel.transform はキーに {map, code} を含んだ、有効なオブジェクトを返す
  return babel.transform(code, {
    sourceMaps: true,
    // 空行を保つ必要があることに注意
    retainLines: true,
    sourceFileName: options.file,
    presets: [[
      '@babel/env',
      {
        targets: {
          edge: true
        },
        loose: true,
        modules: false,
        useBuiltIns: 'usage'
      }
    ]]
  })
})


registerPreprocessor('javascript', 'my-js-preprocessor', function(code, { options }) {
  // Riot.js コンパイラはソースマップを生成できない（訳注: {map} に値が含まれていないため）
  return {
    code: myPreprocessor(code),
    map: null
  }
})

```

利用する JavaScript プリプロセッサは、元コードの空行を保つようにしてください。さもなければ、オフセットの壊れたソースマップを結果として受け取ってしまいます。

## ポストプロセッサ

プリプロセッサ同様、コンパイラは `registerPostprocessor` を使って、出力結果を整形できます。

```js
import { registerPostprocessor } from '@riotjs/compiler'
import buble from 'buble'

// コンパイラによる出力は、ここから渡される
registerPostprocessor(function(code, { options }) {
  const { file } = options
  console.log('ファイルパス:', file)

  // buble.transform は戻り値として {code, map} を返すことに注意
  return buble.transform(code)
})
```

この場合、最終的に出力されるコードは `buble` によって es2015 に変換されることができます。

### Riot.js を介したオンラインコンパイラによるコンパイル

最後に、オンラインでタグをコンパイルすることもできます

[Riot.js Online Compiler](https://riot.js.org/online-compiler)
