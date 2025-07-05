---
title: API
layout: ja/detail
description: フレームワーク API, メソッドとプロパティ
---


## コア API

### riot.mount

`riot.mount(selector: string, props?: object, componentName?: string): RiotComponent[]`

1. `selector` はページから要素を選択し、それらをカスタムコンポーネントとともにマウントします。選択したエレメントの名前は、カスタムタグの名前と一致する必要があります。is 属性を持つ DOM ノードも自動マウントできます。

2. 消費するために `props` というオプショナルなオブジェクトがコンポーネントに渡されます。これには、単純なオブジェクトから完全なアプリケーション API まで、あらゆるものを使用できます。もしくは Flux ストアの場合もあります。実際には、クライアント側のアプリケーションをどのように構成するかによって異なります。_注意_ タグに設定した属性は、`props` 引数で同じ名前を指定した属性よりも優先されます。

3. `componentName` は、マウントするノードが Riot によって自動マウントされない場合のオプショナルなコンポーネントの名前です。

<strong>@returns: </strong>マウントされた [コンポーネントオブジェクト](#コンポーネントオブジェクト) の配列


例:

```js
// 選択し、そしてページ上のすべての <pricing> タグをマウント
const components = riot.mount('pricing')

// クラス名が .customer であるすべてのタグをマウント
const components = riot.mount('.customer')

// <account> タグをマウントし、オプションとして API オブジェクトを渡す
const components = riot.mount('account', api)

// 既に登録された `app` コンポーネントを使用して <div id="root"> タグに API オブジェクトを渡す
const components = riot.mount('#root', api, 'app')
```

メモ: [インブラウザコンパイル](/compiler/#インブラウザコンパイル) を利用しているユーザーは、`riot.mount` メソッドをコールする前にコンポーネントのコンパイルを待つ必要があるでしょう。

```js
(async function main() {
  await riot.compile()

  const components = riot.mount('user')
}())
```

`props` 引数には、複数のタグインスタンス間で同じオブジェクトを共有することを避けるために関数を指定することも可能です。[riot/2613 を参照](https://github.com/riot/riot/issues/2613)

```js
riot.mount('my-component', () => ({
  custom: 'option',
}))
```

`riot.mount` はターゲットコンポーネント下に存在する子ノードを消去しません。SSR 後に、ユーザーと対話的にコンポーネントをクライアント側でマウントする場合は、別の解決方法があります。[@riotjs/hydrate](https://github.com/riot/hydrate#usage) を確認してください。


### riot.unmount

`riot.unmount(selector: string): HTMLElement[]`

1. `selector`: ページから要素を選択肢し、それらが既にマウントされていた場合はアンマウントします。
2. `keepRootElement`: ブーリアンのオプションパラメータ 。DOM からルートノードを削除することを避けるために使用できる {% include version_badge.html version=">=4.3.0" %}

```js
// すべての <user> タグを選択し、それらをアンマウントする
riot.unmount('user')
```

`keepRootElement` パラメータが true だった場合、ルートノードは DOM に残されます。

```js
// すべての <user> タグを選択すると、そのタグをアンマウントするが ルートノードは DOM に残される
riot.unmount('user', true)
```

<strong>@returns: </strong>アンマウントされたノードの配列

### riot.component

`riot.component(component: RiotComponentWrapper): function`

1. `component` - [コンポーネントラッパーオブジェクト](#コンポーネントラッパーインターフェイス)

<strong>@returns: </strong>[コンポーネントオブジェクト](#component-object) 生成のための関数

`riot.component` メソッドを使用すると、コンポーネントをグローバルに登録しないでコンポーネントを生成、およびマウントできます:

```js
import * as riot from 'riot'
import App from './app.riot'

const createApp = riot.component(App)

const app = createApp(document.getElementById('root'), {
  name: 'This is a custom property',
})
```

{% include version_badge.html version=">=4.7.0" %}

`riot.component` によって生成されたファクトリ関数は、[有効な `slots` と `attributes` オブジェクト](https://github.com/riot/dom-bindings) を含められる 3 つ目の任意の引数も受け入れます。

```js
import { expressionTypes } from '@riotjs/dom-bindings'
import * as riot from 'riot'
import App from './app.riot'

const createApp = riot.component(App)

const app = createApp(document.getElementById('root'), {
  name: 'This is a custom property',
  class: 'custom-class'
}, {
  slots: [{
    id: 'default',
    html: 'Hello there',
    bindings: []
  }],
  attributes: [{
    type: expressionTypes.ATTRIBUTE,
    name: 'class',
    evaluate: scope => scope.props.class
  }]
})
```

### riot.install

`riot.install(plugin: function): Set`

1. `plugin` - 生成された任意のコンポーネントの [コンポーネントオブジェクト](#コンポーネントオブジェクト) を受け取る関数

<strong>@returns: </strong> インストールされたすべてのプラグイン関数を含む JavaScript `Set`

一度インストールされると、プラグイン関数は生成された任意の Riot.js コンポーネントに対しコールされます:

```js
import { install } from 'riot'

let id = 0

// このプラグインは生成された任意の riot コンポーネントに uid 属性を追加します
install(function(component) {
  component.uid = id++

  return component
})
```

### riot.uninstall

`riot.uninstall(plugin: function): Set`

1. `plugin` - 既にインストールされた関数プラグイン

<strong>@returns: </strong> インストールされた残りのプラグイン関数を含む JavaScript `Set`

プラグインはインストールおよびアンインストールできます:

```js
import { install, uninstall } from 'riot'
import uid from './riot-uid.js'

install(uid)

// プラグインがもう不要となった場合アンインストールする
uninstall(uid)
```

### riot.register

`riot.register(name: string, component: RiotComponentWrapper): Map`

1. `name` - コンポーネント名
2. `component` - [コンポーネントラッパーオブジェクト](#コンポーネントラッパーインターフェイス)

<strong>@returns: </strong> すべての登録済みコンポーネントのファクトリ関数を含む JavaScript `Map`

```js
import { register, mount } from 'riot'
import MyComponent from './my-component.riot'

// my-component をグローバルコンポーネントとして登録
register('my-component', MyComponent)

// `<my-component>` を呼ばれるすべての DOM ノードを検索し
// 既に登録したコンポーネントと一緒にマウントする
mount('my-component')
```

### riot.unregister

`riot.unregister(name: string): Map`

1. `name` - コンポーネント名

<strong>@returns: </strong> アンマウントされていない残りのコンポーネントから生成された関数を含む JavaScript の `Map`

既にコンパイラか `riot.register()` を介して生成されたタグの登録を解除します。
このメソッドは、例えばアプリケーションをテストする必要があり、かつ同じ名前を使用して複数のタグを生成したい時などに有効かもしれません。

```js
import { register, unregister } from 'riot'
import TestComponent from './test-component.riot'
import TestComponent2 from './test-component2.riot'

// test コンポーネントを生成
register('test-component', TestComponent)

// マウント
const [component] = mount(document.createElement('div'), 'test-component')
expect(component.root.querySelector('p')).to.be.ok

// tag を登録解除
unregister('test-component')

// 異なるテンプレートを利用して同じコンポーネントを再生成
register('test-component', TestComponent2)
```

### riot.pure

`riot.pure(PureComponentFactoryFunction): RiotComponentFactoryFunction`

`PureComponentFactoryFunction` は以下のフィールドを持つオブジェクトを受け取る関数です:

1. `slots` - コンポーネント内で見つかった slot リスト
2. `attributes` - コンテキストからコンポーネントプロパティを推測するために評価可能なコンポーネントの属性式
3. `props` - `riot.component` 呼び出しによってのみ設定できる初期コンポーネントユーザープロパティ

<strong>@returns: </strong> 純粋なコンポーネントを生成するために Riot.js によって内部的に使用されるユーザーが定義したファクトリ関数

この関数は Riot.js の根本であり、デフォルトのレンダリングエンジンでは探しているすべての機能（遅延読み込みやカスタムディレクティブなど…）が提供されないかもしれないような、特定の場合にのみ使用されることを意味します。

`PureComponentFactoryFunction` は、Riot.js が純粋なコンポーネントを適切にレンダリングするために、常に `mount`, `update`, `unmount` メソッドを含んでいるオブジェクトを返すべきです。例:

```html
<lit-element>
  <script>
    import { pure } from 'riot'
    import { html, render } from 'lit-html'

    export default pure(({ attributes, slots, props }) => ({
      mount(el, context) {
        this.el = el
        this.render(context)
      },
      // ここでのコンテキストは親コンポーネントかundefinedのいずれかです
      render(context) {
        render(html`<p>${ context ? context.message : 'no message defined' }</p>`, this.el)
      },
      unmount() {
        this.el.parentNode.removeChild(this.el)
      }
    }))
  </script>
</lit-element>
```

### riot.withTypes

`riot.withTypes(object | function | class): RiotComponent`

このメソッドは IDE でコンポーネントの TypeScript をより良くサポートするために必要です。
これにより、コードの自動補完が可能になり、エクスポートされたAPIのコンポーネントに適切な Riot.js の型が追加されます。 例:

```html
<my-component>
  <h1>
    { props.title }
  </h1>

  <p if={ state.isReady }>
    Hello
  </p>

  <script lang="ts">
    import {RiotComponent, withTypes} from 'riot'

    interface MyComponentProps {
      title: string
    }

    interface MyComponentState {
      isReady: boolean
    }

    // この export は TypeScript がバインディングの 型 をチェックするために必要です
    export interface MyComponent extends RiotComponent<MyComponentProps, MyComponentState> {
      // カスタムメソッド
      sayHello: () => void
    }

    export default withTypes<MyComponent>({
      state: {
        isReady: false
      },
      sayHello: () => console.log('Hello!')
    })
  </script>
</my-component>
```

コンパイルについて知りたい場合は、[Riot.js の TypeScript サポート](/compiler/#typescript-support) をチェックしてみてください。

### riot.version

`riot.version: string`

<strong>@returns: </strong> 現在使用しているの Riot のバージョンを文字列として返す

## コンポーネントオブジェクト

各 Riot.js コンポーネントは軽量なオブジェクトとして生成されます。`export default` を使用してエクスポートするオブジェクトには以下のプロパティがあります:

- Attributes
  - `props` - オブジェクトとして受けとる props
  - `state` - 現在のステートオブジェクト
  - `root` - ルート DOM ノード
- [生成と破壊](#生成と破壊)
  - `mount` - コンポーネントの初期化
  - `unmount` - DOM からコンポーネントを壊し、取り除く
- [ステートハンドリング](#ステートハンドリング) メソッド
  - `update` - コンポーネントのステートを更新するメソッド
  - `shouldUpdate` - コンポーネントレンダリングを一時停止するメソッド
- [ライフサイクルコールバック](#ライフサイクル)
  - `onBeforeMount` - コンポーネントがマウントされる前にコールされる
  - `onMounted` - コンポーネントのレンダリングが完了した後にコールされる
  - `onBeforeUpdate` - コンポーネントの更新前にコールされる
  - `onUpdated` - コンポーネントの更新が完了した後にコールされる
  - `onBeforeUnmount` - コンポーネントが削除される前にコールされる
  - `onUnmounted` - コンポーネントの削除が完了した時にコールされる
- [ヘルパー](#ヘルパー)
  - `$` - `document.querySelector` に似たメソッド
  - `$$` - `document.querySelectorAll` に似たメソッド


### コンポーネントインターフェイス

[TypeScript](https://www.typescriptlang.org/) に詳しい人は、ここに書かれているように Riot.js コンポーネントインタフェースがどのように見えるを読むことができます:

```ts
export interface RiotComponent<Props = any, State = any> {
  // 任意のコンポーネントインスタンスで自動的に生成
  readonly props: Props
  readonly root: HTMLElement
  readonly name?: string
  readonly slots: SlotBindingData[]

  // 変更可能な state プロパティ
  state: State
  // 子コンポーネントの名前をマッピングするオプションのエイリアス
  components?: RiotComponentsMap

  mount(
    element: HTMLElement,
    initialState?: State,
    parentScope?: object
  ): RiotComponent<Props, State>
  update(
    newState?: Partial<State>,
    parentScope?: object
  ): RiotComponent<Props, State>
  unmount(keepRootElement?: boolean): RiotComponent<Props, State>

  // ヘルパー
  $(selector: string): Element | null
  $$(selector: string): Element[]

  // state 管理用メソッド
  shouldUpdate?(newProps: Props, oldProps: Props): boolean

  // ライフサイクルメソッド
  onBeforeMount?(props: Props, state: State): void
  onMounted?(props: Props, state: State): void
  onBeforeUpdate?(props: Props, state: State): void
  onUpdated?(props: Props, state: State): void
  onBeforeUnmount?(props: Props, state: State): void
  onUnmounted?(props: Props, state: State): void
}
```

HTML と JavaScript コードの両方で任意のコンポーネントプロパティを使用できます。例:


```html
<my-component>
  <h3>{ props.title }</h3>

  <script>
    export default {
      onBeforeMount() {
        const { title } = this.props
      }
    }
  </script>
</my-component>
```

コンポーネントスコープには任意のプロパティを自由に設定でき、HTML に式で使用できます。例:

```html
<my-component>
  <h3>{ title }</h3>

  <script>
    export default {
      onBeforeMount() {
        this.title = this.props.title
      }
    }
  </script>
</my-component>
```

メモ: いくつかのグローバル変数がある場合、HTML と JavaScript コードの両方でこれらの参照を使用することもできます:

```js
window.someGlobalVariable = 'Hello!'
```

```html
<my-component>
  <h3>{ window.someGlobalVariable }</h3>

  <script>
    export default {
      message: window.someGlobalVariable
    }
  </script>
</my-component>
```

<aside class="note note--warning">:warning: コンポーネントでグローバル変数を使用すると、おそらくサーバサイドレンダリングが損なわれる可能性があるため注意してください。そして、推奨しません。</aside>


### 生成と破壊

#### component.mount

`component.mount(element: HTMLElement, initialState?: object, parentScope?: object): RiotComponent;`

任意のコンポーネントオブジェクトは、そのテンプレートをレンダリングしインタラクティブ化するために、DOM ノードにマウントされます。

`component.mount` メソッドを自分で呼び出すことはまずありませんが、代わりに [riot.mount](#riotmount) または [riot.component](#riotcomponent) を使用します。

#### component.unmount

`component.mount(keepRoot?: boolean): RiotComponent`

カスタムコンポーネントとその子をページから切り離します。
ルートノードを削除せずにタグをアンマウントしたい場合は、unmount メソッドに `true` を渡す必要があります。

タグをアンマウントし、DOM からテンプレートを削除します:

```js
myComponent.unmount()
```

ルートノードを DOM に保持したままコンポーネントをアンマウントします:

```js
myComponent.unmount(true)
```


### 状態管理

#### component.state

生成された Riot.js コンポーネントには `state` というオブジェクトプロパティがあります。`state` オブジェクトは、すべての可変なコンポーネントプロパティを格納することを目的としています。例:

```html
<my-component>
  <button>{ state.message }</button>

  <script>
    export default {
      // コンポーネントステートの初期化
      state: {
        message: 'hi'
      }
    }
  </script>
</my-component>
```

この場合、初期状態のステートと一緒にコンポーネントが生成され、`component.update` を使用して内部的に修正できます。

ネストされた javascript のオブジェクトをステートプロパティに格納することは避けてください。なぜなら、ネストされた javascript の参照は複数のコンポーネントで共有され、副作用が発生し得るからです。予期しない事態を避けるために、ファクトリ関数を使用してコンポーネントを生成することもできます:

```html
<my-component>
  <button>{ state.message }</button>

  <script>
    export default function MyComponent() {
      // 戻り値は「オブジェクト」であることを忘れずに
      return {
        // 初期状態の `state` は常に新規に作成し、予期せぬ事態を防ぐ
        state: {
          nested: {
            properties: 'are ok now'
          },
          message: 'hi'
        }
      }
    }
  </script>
</my-component>
```

新しいコンポーネントがマウントされると、Riot.js は自動的に関数を呼び出します。

#### component.components

グローバルに Riot.js のコンポーネントを登録したくない場合、子コンポーネントをコンポーネントオブジェクトに直接マッピングできます。例:

```html
<my-component>
  <!-- このコンポーネントは `<my-component>` 内でのみ利用可能 -->
  <my-child />

  <!-- このコンポーネントには別の名前が付けられ、エイリアスが設定される -->
  <aliased-name />

  <!-- このコンポーネントは riot.register を介して既に登録されている -->
  <global-component />

  <script>
    import MyChild from './my-child.riot'
    import User from './user.riot'

    export default {
      components: {
        MyChild,
        'aliased-name': User
      }
    }
  </script>
</my-component>
```

ファクトリ関数でコンポーネントを生成する場合、 `components` プロパティは、そのコンポーネントの静的プロパティにする必要があります（訳注: エクスポートする関数オブジェクトに直接 `components` プロパティを定義する、という意味）。もし関数としてエクスポートする場合、以下のように宣言されなければなりません:

```html
<my-component>
  <button>{ state.message }</button>

  <script>
    import MyChild from './my-child.riot'
    import User from './user.riot'

    // `components` はこのタグのファクトリ関数、すなわち `MyComponent` の静的プロパティにする
    MyComponent.components = {
      MyChild,
      'aliased-name': User
    }

    export default function MyComponent() {
      // 戻り値は「オブジェクト」であることを忘れずに
      return {
        // 初期状態の `state` は常に新規に作成し、予期せぬ事態を防ぐ
        state: {
          nested: {
            properties: 'are ok now'
          },
          message: 'hi'
        }
      }
    }
  </script>
</my-component>
```

<div class="note note--info">
  この例では、webpack, Rollup, Parcel, Browserify を介してアプリケーションをバンドルすることを想定しています
</div>

#### component.update

`component.update(newState?: object, parentScope?: object): RiotComponent;`

コンポーネントの `state` オブジェクトを更新し、すべてのテンプレート変数を再レンダリングします。このメソッドは通常、ユーザーがアプリケーションと対話するときにイベントハンドラがディスパッチされるたびに呼び出せます:

```html
<my-component>
  <button onclick={ onClick }>{ state.message }</button>

  <script>
    export default {
      state: {
        message: 'hi'
      },
      onClick(e) {
        this.update({
          message: 'goodbye'
        })
      }
    }
  </script>
</my-component>
```

このメソッドは、コンポーネントの UI を更新する必要があるときに、手動で呼び出すこともできます。これは通常 UI に関連しないイベント（`setTimeout` の後、AJAX のコール、または何らかのサーバーのイベント）の後に発生します。例:

```html
<my-component>

  <input name="username" onblur={ validate } />
  <span class="tooltip" if={ state.error }>{ state.error }</span>

  <script>
    export default {
      async validate() {
        try {
          const { username } = this.props
          const response = await fetch(`/validate/username/${username}`)
          const json = response.json()
          // レスポンスを用いて何かをする
        } catch (error) {
          this.update({
            error: error.message
          })
        }
      }
    }
  </script>
</my-component>
```

上記の例では、`update()` メソッドがコールされた後に UI 上でエラーメッセージが表示されます。

タグの DOM 更新をより細かくコントロールしたい場合、`shouldUpdate` 関数の戻り値を利用して設定できます。
Riot.js はその関数の戻り値が `true` の場合にのみ、コンポーネントを更新します。

```html
<my-component>
  <button onclick={ onClick }>{ state.message }</button>

  <script>
    export default {
      state: {
        message: 'hi',
      },
      onClick(e) {
        this.update({
          message: 'goodbye',
        })
      },
      shouldUpdate(newProps, currentProps) {
        // 更新しない
        if (this.state.message === 'goodbye') return false
        // this.state.message が 'goodbye' と異なる場合、コンポーネントを更新可能
        return true
      },
    }
  </script>
</my-component>
```

`shouldUpdate` メソッドは常に 2 つの引数を受け取ります: 最初の引数には新しいコンポーネントプロパティが含まれ、2 番目の引数には現在のプロパティが含まれます。

```html
<my-component>
  <child-tag message={ state.message }></child-tag>
  <button onclick={ onClick }>Say goodbye</button>

  <script>
    export default {
      state: {
        message = 'hi'
      },
      onClick(e) {
        this.update({
          message: 'goodbye'
        })
      }
    }
  </script>
</my-component>

<child-tag>
  <p>{ props.message }</p>

  <script>
    export default {
      shouldUpdate(newProps, currentProps) {
        // 受け取った新しいプロパティに応じて DOM を更新
        return newProps.message !== 'goodbye'
      }
    }
  </script>
</child-tag>
```



### スロット

`<slot>` タグは、実行時にテンプレート内の任意のカスタムコンポーネントの内容を注入してコンパイルすることができる、Riot.js の特別なコア機能です。
例えば、以下の riot タグ `my-post` 使ってみましょう

```html
<my-post>
  <h1>{ props.title }</h1>
  <p><slot /></p>
</my-post>
```

いつもアプリケーションに `<my-post>` タグを入れることになるでしょう

```html
<my-post title="What a great title">
  My beautiful post is <b>just awesome</b>
</my-post>
```

一度マウントされると、このようにレンダリングされます:

```html
<my-post>
  <h1>What a great title</h1>
  <p>My beautiful post is <b>just awesome</b></p>
</my-post>
```

デフォルトのスロットタグ内の式は、スロット属性経由で渡さない限り、挿入されるコンポーネントのプロパティにアクセスできません。詳しくは [上位コンポーネント]({{ '/ja/api/#上位コンポーネント' | prepend:site.baseurl }}) の項を参照してください。

```html
<!-- このタグは生成された DOM を継承するだけ -->
<child-tag>
  <slot />

  <script>
    export default {
      internalProp: 'secret message'
    }
  </script>
</child-tag>

<my-component>
  <child-tag>
    <!-- ここでは子タグの内部プロパティは使用不可 -->
    <p>{ message }</p>

    <!-- "internalProp" はここでは許可されていないため、この式は失敗する -->
    <p>{ internalProp }</p>
  </child-tag>
  <script>
    export default {
      message: 'hi'
    }
  </script>
</my-component>
```

#### 名前付きスロット

`<slot>` タグは、コンポーネントテンプレートの特定のセクションに html を挿入するメカニズムも提供します。

例えば、以下の riot タグ `my-other-post` 使ってみましょう:

```html
<my-other-post>
  <article>
    <h1>{ props.title }</h1>
    <h2><slot name="summary" /></h2>
    <article>
      <slot name="content" />
    </article>
  </article>
</my-other-post>
```

いつもアプリケーションに `<my-other-post>` タグを入れることになるでしょう

```html
<my-other-post title="What a great title">
  <span slot="summary">
    My beautiful post is just awesome
  </span>
  <p slot="content">
    And the next paragraph describes just how awesome it is
  </p>
</my-other-post>
```

一度マウントされると、このようにレンダリングされます:

```html
<my-other-post>
  <article>
    <h1>What a great title</h1>
    <h2><span>My beautiful post is just awesome</span></h2>
    <article>
      <p>
        And the next paragraph describes just how awesome it is
      </p>
    </article>
  </article>
</my-other-post>
```

もし、コンポーネントのルート HTML ノードが、スロット部分に追加したくない場合は、`<template>` タグを使用することもできます。この場合、Riot.js はそのコンポーネントの中のコンテンツのみを、スロット位置にレンダリングします。

```html
<my-other-post title="What a great title">
  <template slot="summary">
    My beautiful post is just awesome
  </template>
  <template slot="content">
    <p>And the next paragraph describes just how awesome it is</p>
    <p>Another Paragraph</p>
  </template>
</my-other-post>
```

<aside class="note note--info">
もしデフォルトのスロットとして <code>template</code> タグを使う場合、コンテンツを正しくレンダリングするために <code>name="default"</code> 属性が必要です。
</aside>

#### 上位コンポーネント

{% include version_badge.html version=">=4.6.0" %}

`<slot>` タグを使用して上位コンポーネントを作成できます。スロットタグにセットされたすべての属性は、そのタグに挿入された html テンプレートで使用できます。
たとえば、テーマ設定可能なアプリケーションを作成し、そのアプリケーションに `<theme-provider>` コンポーネントを使用することを想像してください:

```html
<theme-provider>
  <slot theme="{theme}" />

  <script>
    export default {
      theme: 'dark'
    }
  </script>
</theme-provider>
```

今、コンポーネントを `<theme-provider>` タグにラップし、常に現在のアプリケーションテーマを柔軟かつ合成可能な方法で読み取ることが可能になりました:

```html
<app>
  <theme-provider>
    <!-- ここで "theme" 変数が利用可能になることに注意 -->
    <sidebar class="sidebar sidebar__{theme}" />
  </theme-provider>
</app>
```

上位コンポーネントを使用すると、子コンポーネントと親コンポーネントの大量のやり取りが簡略化され、アプリケーション全体のデータフローを扱うための十分な柔軟性が得られます。

### ライフサイクル

各コンポーネントオブジェクトは、次のコールバックに依存して内部状態を処理できます:

- `onBeforeMount` - コンポーネントがマウントされる前にコールされる
- `onMounted` - コンポーネントがレンダリングされた後にコールされる
- `onBeforeUpdate` - コンポーネント更新される前にコールされる
- `onUpdated` - コンポーネントが更新された後にコールされる
- `onBeforeUnmount` - コンポーネントが削除される前にコールされる
- `onUnmounted` - コンポーネントの削除が完了した時にコールされる

例:

```html
<my-component>
  <p>{ state.message }</p>

  <script>
    export default {
      onBeforeMount() {
        this.state = {
          message: 'Hello there'
        }
      }
    }
  </script>
</my-component>
```

すべてのライフサイクルメソッドは `props` と `state` の 2 つの引数を受け取り、それぞれ `this.props` と `this.state` というコンポーネント属性のエイリアスです。

```html
<my-component>
  <p>{ state.message }</p>

  <script>
    export default {
      state: {
        message: 'Hello there'
      },
      onBeforeMount(props, state) {
        console.assert(this.state === state) // ok!
        console.log(state.message) // Hello there
      },
    }
  </script>
</my-component>
```

### ヘルパー

どんな Riotjs コンポーネントにも、レンダリングされたテンプレートに含まれる DOM ノードを照会するための 2 つのヘルパーが用意されています。

- `component.$(selector: string): HTMLElement` - コンポーネントのマークアップにある 1 つのノードを返す
- `component.$$(selector: string): [HTMLElemet]` - コンポーネントのマークアップを含むセレクタに一致するすべての DOM ノードを戻す

コンポーネントヘルパーを使用して簡単な DOM クエリを実行できます:

```html
<my-component>
  <ul>
    <li each={ item in items }>
      { item }
    </li>
  </ul>

  <script>
    export default {
      onMounted() {
        // クエリ
        const ul = this.$('ul')
        const lis = this.$$('li')

        // DOM ノードでなにかする
        const lisWidths = lis.map(li => li.offsetWidth)
        const {top, left} = ul.getBoundingClientRect()
      }
    }
  </script>
</my-component>
```

<aside class="note note--warning">:warning:
ヘルパー <code>$</code> と <code>$$</code> は 、 HTML テンプレートに含まれた子タグが Riot.js が生成するコンポーネントであっても、 DOM クエリの検索対象として動作することに気をつけてください。
</aside>

### 手動でのタグ構築

Riot.js コンポーネントは [@riotjs/compiler](/ja/compiler) を介して JavaScript にコンパイルされます。ただし、あなたの好きな任意のレンダリングエンジンを使用して手動でビルドすることもできます。

#### コンポーネントラッパーインターフェイス

Riot.js コンパイラは、単に [コンポーネントオブジェクト](#コンポーネントインターフェイス) を作成するために、Riot によって内部的に変換されるラッパーオブジェクトを作成する。このラッパーオブジェクトを手動で作成する場合は、まずそのインターフェイスを理解する必要があります:

```ts
interface RiotComponentWrapper<RiotComponent> {
  readonly css?: string
  readonly exports?: () => RiotComponentExport<P, S>|object
  readonly name?: string
  template(): any
}
```

`RiotComponentWrapper` オブジェクトは 4 つのプロパティで構成されています:

- `css` - コンポーネントの CSS の文字列
- `exports` - コンポーネントのパブリック API `export default`
- `name` - コンポーネント名
- `template` - コンポーネントテンプレートを管理するファクトリ機能

#### テンプレートインターフェイス

テンプレート関数は、次のものと互換性のあるインタフェースを返す必要があります:

```ts
interface RiotComponentTemplate {
  update(scope: object): RiotComponentTemplate;
  mount(element: HTMLElement, scope: object): RiotComponentTemplate;
  unmount(scope: object): RiotComponentTemplate;
  clone(): RiotComponentTemplate;
}
```

`RiotComponentTemplate` はオブジェクトであり、レスポンシブルにコンポーネントのレンダリングを処理します:

- `update` - メソッド: コンポーネントデータを受け取り、テンプレートの更新に使用する必要がある
- `mount` - メソッド: コンポーネントテンプレートを DOM ノードと接続するために使用する必要がある
- `unmount` - メソッド: コンポーネント DOM をクリーンアップする
- `clone` - メソッド: 複数のインスタンスを操作するためにオリジナルのテンプレートオブジェクトのクローンを作成する必要がある場合もある

#### 例

この例では [@riotjs/dom-bindings (Riot core template engine)](https://github.com/riot/dom-bindings) を使用しています:

```js
import { template, expressionTypes } from '@riotjs/dom-bindings'

riot.register('my-component', {
  css: ':host { color: red; }',
  name: 'my-component',
  exports: {
    onMounted() {
      console.log('I am mounted')
    }
  },
  template() {
    return template('<p><!----></p>', [{
      selector: 'p',
      expressions: [
        {
          type: expressionTypes.TEXT,
          childNodeIndex: 0,
          evaluate: scope => `Hello ${scope.greeting}`
        }
      ]
    }])
  }
})
```

[テンプレートエンジン API](https://github.com/riot/dom-bindings) についてご参照ください。

必要に応じて、あなたの好きな他の種類のテンプレートエンジンを使用することもできます。
この例ではテンプレートエンジンとして [lit-html](https://lit-html.polymer-project.org/) を使用しています:

```js
import {html, render} from 'lit-html'

riot.register('my-component', {
  css: ':host { color: red; }',
  name: 'my-component',
  exports: {
    onMounted() {
      console.log('I am mounted')
    }
  },
  template() {
    const template = ({name}) => html`<p>Hello ${name}!</p>`

    return {
      mount(element, scope) {
        this.el = element

        this.update(scope)
      },
      update(scope) {
        render(template(scope), this.el)
      },
      unmount() {
        this.el.parentNode.removeChild(this.el)
      },
      // the following methods are not necessary for lit-html
      createDOM(element) {},
      clone() {}
    }
  }
})
```

#### テンプレートなしのタグ

次のように、テンプレートなしで "ラッパータグ" を作成することもできます:

```js
riot.register('my-component', {
  name: 'my-component',
  exports: {
    onMounted() {
      console.log('I am mounted')
    }
  }
})
```

この場合、`my-component` という名前のタグをマウントすると、Riot はコンポーネントのマークアップを解析せずにそのまま置いておくでしょう:

```html
<html>
<body>
  <my-component>
    <p>I want to say Hello</p>
  </my-component>
</body>
</html>
```

このテクニックはおそらくサーバーサイドでレンダリングされたテンプレートを強化するために使用されます。
