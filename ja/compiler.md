---
layout: detail
title: Compiler
---

## 概要

カスタムタグはブラウザで実行される前にJavaScriptに変換される必要があります。
RiotのコンパイラはriotタグをJavaScriptモジュールにトランスパイルするよう設計されています。
コンパイルされたRiotタグは次のようになります：

```js
export default {
  css: `my-tag { color: red; }`, // コンポーネントのcss文字列
  template: function() {}, // 内部Riotテンプレートファクトリ関数
  exports: {}, // コンポーネントイベントとライフサイクルメソッド
  name: 'my-tag' // コンポーネントID
}
```

**ひとつのタグファイルに含まれるタグ定義は、ひとつだけです。**

## インブラウザ・コンパイル

`riot+compiler.js`によるバンドルは、素早くひな型を作ってテストできるよう、ブラウザでタグを直接コンパイルし、実行する機能を提供しています。
以下のように、`<script>`タグの属性に`type="riot"`を指定することで、Riotタグをブラウザにロードすることが可能です：

``` html
<!-- マウント位置 -->
<my-tag></my-tag>

<!-- <my-tag/> は外部ファイルで指定されています -->
<script src="path/to/javascript/my-tag.riot" type="riot"></script>

<!-- riot.jsとコンパイラを含める -->
<script src="https://unpkg.com/riot@{{ site.data.globals.version }}/riot+compiler.min.js"></script>

<!-- コンパイルとマウント -->
<script>
(async function main() {
  await riot.compile()

  riot.mount('my-tag')
}())
</script>
```

この場合、Riotは全ての`export default`式を内部的に、ブラウザ表示に適した形に変換しますが、まだJavaScriptモジュールをサポートしていないことに注意してください。

Riotは、`<script>`を通じてDOMにインクルードされた全ての外部タグを非同期にコンパイルし、`riot.mount`でそれらを描画することが可能です。

ブラウザによるRiotスクリプトタグのプリフェッチ機能を抑止し、同じリソースを複数回ロードすることを防ぐため、`<script>`タグの`src`属性の代わりに`data-src`属性を使いたい場合があるかも知れません。Riotは自動的に、ajaxによってタグをフェッチしてコンパイルします。

## プリコンパイル

上記のコンパイル処理は非同期に行われ、アプリケーションの描画処理をブロックしません。しかし、インブラウザ・コンパイルはひな型作成や簡単な確認のためだけに使うべきです。

プリコンパイルを行うと、次のような恩恵を受けられます：

- [お好みのプリプロセッサ](#pre-processors)でタグをコンパイル。
- 高いパフォーマンスを得られる。ロードやブラウザによるコンパイラ実行が不要。
- ソースマップ出力でデバッグをサポート。

### Riotローダー

[`webpack`](https://webpack.js.org/)や[`rollup`](https://rollupjs.org/)といったツールは、Riotアプリケーションのタグをバンドルするのに最適です。
そのようなツールに向けて、Riotコンポーネントをあなたのソースコードにそのままインポートするための、Riot公式ローダーを提供しています：
  - [webpack](https://github.com/riot/webpack-loader)
  - [rollup](https://github.com/riot/rollup-plugin-riot)
  - [parcel](https://github.com/riot/parcel-plugin-riot)
  - [riotify](https://github.com/riot/riotify)

Riotローダーを使ったアプリケーションのエントリースクリプトは、おそらくこのようになるでしょう：

```js
import { component } from 'riot'
import MyTag from './path/to/tags/my-tag.riot'

component(MyTag)(document.getElementById('root'))
```

### Nodeによるコンパイル

``` javascript
import {compile} from '@riotjs/compiler'

const { code, map } = compile('<p>{hello}</p>', {
  // 以下、オプション定義
  file: 'my/path/to/my-component.riot',
  // cssの `:host` を変換するか
  scopedCss: true,
  // （テンプレート構文の）式のデリミタ
  brackets: ['{', '}'],
  // HTMLのコメントを残すか
  comments: false
})
```

`compile()`関数は、引数として文字列を取り、`code`と`map`をキーに持つオブジェクトを返します。
生成されたコードは、ご自身で好きなように扱うこともできますし、お使いのビルドシステムで使用することもできます。

Riotコンパイラは、JavaScriptモジュールを出力することにご留意ください。バンドルには、これら（訳注：出力されたモジュール）をトランスパイルしたほうがいいでしょう。

### Riot.js CLIツールによるコンパイル

Riot.jsファイルを、[`riot`](https://github.com/riot/cli)実行コマンドを使ってプリコンパイルすることもできます。こちらは以下のように、NPMでインストールできます：

```sh
npm install @riotjs/cli -g
```

#### 使い方

`riot`コマンドの動作例をご紹介します：

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

より詳しい情報を見るには、`riot --help`をタイプしてください。

#### Watch mode

You can watch directories and automatically transform files when they are changed.

```sh
# watch for
riot -w src -o dist
```


#### Custom extension

You're free to use any file extension for your tags (instead of default `.riot`):

```sh
riot --extension html
```

#### ES6 Config file

You can use a config file to store and configure easily all your `@riotjs/cli` options and create your custom parsers

```sh
riot --config riot.config src
```

The riot `riot.config.js` file:

```js
export default {
  output: 'tags/dist',
  // sourcemap type
  sourcemap: 'inline',
  // files extension
  extension: 'foo'
}
```

If you want to use custom preprocessors in your project you should install `@riotjs/cli` as `devDependency` running it via npm scripts as follows:


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

That's how your `riot.config.js` file might look like in case you want to use `pug` as components template engine

```js
import { registerPreprocessor } from '@riotjs/compiler'
import { render } from 'pug'

// register the pug preprocessor
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

  // assign the pug preprocessor to the riot compiler options
  riot: {
    template: 'pug'
  }
}
```

#### Build your whole application

You can also use the CLI to bundle your entire application.

The `app.js` file:

```js
import {component} from 'riot'
import App from './app.riot'

component(App)(document.getElementById('root'))
```

```sh
riot app.js -o dist/app.js
```

Your `dist/app.js` file will contain all the Riot.js components imported in your application and the code to run it.

## Pre-processors

You can pre-process your components contents using your favorite programming language.

The `@riotjs/compiler` gives you the possibility to register your preprocessors:

```js
import { registerPreprocessor } from '@riotjs/compiler'
import pug from 'pug'
import sass from 'node-sass'
import ts from 'ts'

registerPreprocessor('template', 'pug', function(code, { options }) {
  const { file } = options
  console.log('Preprocess the template', file)

  return {
    code: pug.render(code),
    // no sourcemap here
    map: null
  }
})

registerPreprocessor('css', 'sass', function(code, { options }) {
  const { file } = options

  console.log('Compile the sass code in', file)

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

The Riot.js preprocessors can be only of three types `template`, `css`, `javascript` (the first argument of the `registerPreprocessor` function).
To compile your components with a different template engine you will need to specify the `template` option via compiler:

```js
import { compile } from '@riotjs/compiler'

compile(source, {
  template: 'pug'
})
```

For the `css` and `javascript` preprocessors you can simply enable them directly in your components via `type="{preprocessor}"` attribute

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

### Pre-processors Caveats

The Riot.js compiler generates sourcempas out of the code provided by the pre-processors. If your preprocessor will not provide any `map` output the compiler will not output proper sourcemaps.

```js

import { registerPreprocessor } from '@riotjs/compiler'
import babel from '@babel/core'

registerPreprocessor('javascript', 'babel', function(code, { options }) {
  // the babel.transform returns properly an object containing the keys {map, code}
  return babel.transform(code, {
    sourceMaps: true,
    // notice that whitelines should be preserved
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
  // the Riot.js compiler will not be able to generate sourcemaps
  return {
    code: myPreprocessor(code),
    map: null
  }
})

```

The javascript preprocessors should preserve the code whitelines of the original source code otherwise the resulting sourcemap will have a broken offset.

## Post-processors

Similar to the preprocessor the compiler output can be modified via `registerPostprocessor`

```js
import { registerPostprocessor } from '@riotjs/compiler'
import buble from 'buble'

// your compiler output will pass from here
registerPostprocessor(function(code, { options }) {
  const { file } = options
  console.log('your file path is:', file)

  // notice that buble.transform returns {code, map}
  return buble.transform(code)
})
```

In this case we make sure that the output code will be converted to es2015 via `buble`.
