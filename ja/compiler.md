---
title: Compiler
layout: detail
---

## 概要

カスタムタグはブラウザで実行可能になる前に javascript に変換される必要があります。
Riot のコンパイラは riot タグを javascript モジュールに変換するよう設計されています。
コンパイルされた riot タグは次のようになります:

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

`riot+compiler.js` によるバンドルは、素早くひな型を作ってテストできるよう、ブラウザでタグを直接コンパイルし、実行する機能を提供しています。
以下のように、 `<script>` タグの属性に `type="riot"` を指定することで、 riot タグをブラウザにロードすることが可能です。
例:

``` html
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

この場合、 riot は全ての `export default` 式を内部的に、ブラウザ表示に適した形に変換しますが、まだ javascript モジュールをサポートしていないことに注意してください。

Riot は、 `<script>` を通じてDOMにインクルードされた全ての外部タグを非同期にコンパイルし、 `riot.mount` でそれらを描画することが可能です。

ブラウザによる riot スクリプトタグのプリフェッチ機能を抑止し、同じリソースを複数回ロードすることを防ぐため、 `<script>` タグの `src` 属性の代わりに `data-src` 属性を使いたい場合があるかも知れません。 Riot は自動的に、 ajax によってタグをフェッチしてコンパイルします。

## プリコンパイル

上記のコンパイル段階は非同期に行われ、アプリケーションの描画処理をブロックしません。しかしインブラウザ・コンパイルは、ひな型の作成やちょっとした実験のためだけに使うべきです。

プリコンパイルを行うと、次のような恩恵を受けられます:

- [お好みのプリプロセッサ](#プリプロセッサ)でタグをコンパイル。
- 高いパフォーマンスを得られる。ロードやブラウザによるコンパイラ実行が不要。
- ソースマップ出力でデバッグをサポート。

### Riot ローダー

[`webpack`](https://webpack.js.org/) や [`rollup`](https://rollupjs.org/) といったツールは、 riot アプリケーションのタグをバンドルするのに最適です。
そのようなツールに向けて、 riot コンポーネントをあなたのソースコードにそのままインポートするための、 riot 公式ローダーを提供しています:
  - [webpack](https://github.com/riot/webpack-loader)
  - [rollup](https://github.com/riot/rollup-plugin-riot)
  - [parcel](https://github.com/riot/parcel-plugin-riot)
  - [riotify](https://github.com/riot/riotify)

Riot ローダーを使ったアプリケーションのエントリースクリプトは、おそらくこのようになるでしょう:

```js
import { component } from 'riot'
import MyTag from './path/to/tags/my-tag.riot'

component(MyTag)(document.getElementById('root'))
```

### Node によるコンパイル

``` javascript
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

Riot コンパイラは、 javascript モジュールを出力することにご留意ください。バンドルには、これら（訳注: 出力されたモジュール）をトランスパイルしたほうがいいでしょう。


### Riot.js コマンドラインによるコンパイル

Riot.js ファイルを、 [`riot`](https://github.com/riot/cli) 実行コマンドを使ってプリコンパイルすることもできます。こちらは以下のように、 NPM でインストールできます:

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

ディレクトリを監視し、ファイルが変更されたら自動的に変換することができます。

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

設定ファイルを使えば、 `@riotjs/cli` のすべてのオプションの設定を保存して楽に設定できるようにしたり、新しいカスタムパーサを作成したりできます

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

作成するプロジェクトでカスタムプリプロセッサを使いたい場合、 package.json の `devDependency` から `@riotjs/cli` をインストールし、 npm スクリプトから以下のように起動します:


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

以下はコンポーネント（訳注: タグファイル）のテンプレートエンジンとして `pug` を使いたい場合の、 `riot.config.js` の典型例です

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

上記の場合、作成したアプリケーションにインポートされた全ての Riot.js コンポーネントは `dist/app.js` ファイルに含まれ、コードが実行されるようになります。

## プリプロセッサ

お好きなプログラム言語を用いて、コンポーネントの内容をプリプロセスすることができます。

`@riotjs/compiler` は、任意のプリプロセッサを登録する機能を提供しています:

```js
import { registerPreprocessor } from '@riotjs/compiler'
import pug from 'pug'
import sass from 'node-sass'
import ts from 'ts'

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


registerPreprocessor('javascript', 'ts', function(code, { options }) {
  const { file } = options

  const result = ts.transpileModule(code, {
    fileName: file,
    compilerOptions: {
      module: ts.ModuleKind.ESNext
    }
  })

  return {
    code: result.outputText,
    map: null
  }
})
```

Riot.js のプリプロセッサは、 `template`, `css`, `javascript` の３種類の、いずれかでなければなりません（ `registerPreprocessor` 関数の最初の引数です）。
別のテンプレートエンジンでコンポーネントをコンパイルするには、 `template` オプションを設定し、コンパイラに渡す必要があります:

```js
import { compile } from '@riotjs/compiler'

compile(source, {
  template: 'pug'
})
```

`css` と `javascript` のプリプロセッサは、コンポーネント内で直接 `type="{preprocessor}"` を指定するだけで有効にすることができます

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

Riot.js のコンパイラは、プリプロセッサによって提供されたコードからソースマップを生成します。もしご利用のプリプロセッサが `map` を返さない場合、正常なソースマップは出力されません。

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

利用する javascript プリプロセッサは、元コードの空行を保つようにしてください。さもなければ、オフセットの壊れたソースマップを結果として受け取ってしまいます。

## ポストプロセッサ

プリプロセッサ同様、コンパイラは `registerPostprocessor` を使って、出力結果を整形することができます。

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

この場合、最終的に出力されるコードは `buble` によって es2015 に変換されたものになります。
