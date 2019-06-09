---
title: Migration Guide
layout: detail
description: Migration guide from Riot.js 2 and 3
---

## 導入

Riot.js 4 完全に書き直されています。（[詳しくはこちらを御覧ください](https://medium.com/@gianluca.guarini/every-revolution-begins-with-a-riot-js-first-6c6a4b090ee){:target="_blank"}）

Riot.js 3 で書かれた古いアプリケーションを移行することは推奨されていません。なぜなら、Riot.jsの古いバージョンにもセキュリティパッチが適用され、十分に安定しているからです。

このガイドを使用して、Riot.js 3 および 2 から Riot.js 4 のコンポーネントを作成する方法を学ぶことができます。

## コンポーネントの構文と API

コンポーネント構文は、可能な限りあいまいさを避けるために、最新の javascript 標準に合わせて更新されました。
魔法が少ないということは、より明確で相互運用性があることを意味します。Riot.js 4 コンポーネントは完全に将来のために設計されています!

### script タグ

以前の Riot.js のバージョンでは、`<script>` タグ内の `this` というキーワードを介してコンポーネントのインスタンスをただ継承するのみでした。この糖衣構文は、ES2018 という標準の javascript の構文に依存したよりクリーンな API のために削除されました。

**旧**

```html
<my-component>
  <p onclick={onClick}>{message}</p>

  <!-- <script> タグは任意 -->

  onClick() {
    this.message = 'hello'
  }
</my-component>
```

**新**

```html
<my-component>
  <p onclick={onClick}>{message}</p>

  <!-- <script> タグは省略不可能 -->

  <script>
    export default {
      onClick() {
        this.message = 'hello'
        this.update()
      }
    }
  </script>
</my-component>
```

このようにして、エディタや `typescript` のような他のコンパイラは、コンポーネントのi javascript ロジックに惑わされることなく、特別な心配をせずに使用することができます。

この変更は [Riot.js の新しい哲学]({{ '/ja'|prepend:site.baseurl }}#)によって推進されたことに言及する価値があります:

> ...あいまいさに直面したときには、推測の誘惑を断ろう。<br/>
それをするための一つの、そしてできればただ一つだけの明確な方法があるべきだ。<br/>
しかしオランダ人でない限り、その方法は最初は明白ではないかもしれないが...

<aside class="note note--info">
メモ javascript のロジックからコンポーネントテンプレートを分割するには、<code>&#x3C;script&#x3E;</code> タグの使用が必須になります。
</aside>


### テンプレートのショートカット

テンプレートショートカットは完全に削除され、純粋でより明示的な javascript の式が採用されました。Riot.js 4 で、同じ結果をどれほどよりクリーンな方法で簡単に得ることができるか見てみてください。

**旧**

```html
<my-component>
  <p class={ active: isActive, disabled: isDisabled }>hello</p>
</my-component>
```

**新**

```js
// riot-class-names-plugin.js
/**
 * Convert object class constructs into strings
 * @param   {Object} classes - class list as object
 * @returns {string} return only the classes having a truthy value
 */
function classNames(classes) {
  return Object.entries(classes).reduce((acc, item) => {
    const [key, value] = item

    if (value) return [...acc, key]

    return acc
  }, []).join(' ')
}

// classNames プラグインをインストール
riot.install(function(component) {
  // すべての riot コンポーネントに classNames ヘルパーを追加
  component.classNames = classNames

  return component
})
```

```html
<my-component>
  <p class={
    classNames({
      active: isActive,
      disabled: isDisabled
    })
  }>hello</p>
</my-component>
```

さらに良いことに、`classNames` をコンポーネントロジックで直接使用することで `riot.install` の使用を避け、テンプレートをクリーンな状態に保つことができます。例:

```html
<my-component>
  <p class={getParagraphClasses()}>hello</p>

  <script>
    import classNames from 'classnames'

    export default {
      getParagraphClasses() {
        return classNames({
          active: this.isActive,
          disabled: this.isDisabled
        })
      }
    }
  </script>
</my-component>
```

同じショートカットが `style` 属性にも使用できましたが、今の Riot.js 4 では `style` 属性を自分で処理する必要があります:

**旧**

{% raw %}
```html

<my-component>
  <p style={{ color: 'red', 'font-size': `${fontSize}px` }}>hello</p>
</my-component>
```
{% endraw %}

**新**
```js
// riot-style-attributes-plugin.js
/**
 * Convert object attributes constructs into strings
 * @param   {Object} attributes - style attributes as object
 * @returns {string} a string with all the attributes and their values
 */
function styleAttribute(attributes) {
  return Object.entries(attributes).reduce((acc, item) => {
    const [key, value] = item

    return [...acc, `${key}: ${value}`]
  }, []).join(';')
}

// styleAttribute プラグインをインストール
riot.install(function(component) {
  // すべての riot コンポーネントに styleAttribute ヘルパーを追加
  component.styleAttribute = styleAttribute

  return component
})
```

```html
<my-component>
  <p style={
    styleAttribute({
      color: 'red',
      'font-size': `${fontSize}px`
    })
  }>hello</p>
</my-component>
```

これでコードとヘルパーは、組み込まれたフレームワークに依存せずに完全にカスタマイズ可能になります。
これは、サードパーティのコードから来るバグが少なく、より自由になることを意味します...次のことを忘れないでください:

> ...明示は暗黙よりも優れています...


### オブザーバブル

オブザーバブルパターンは以前の Riot.js のバージョンに完全に統合されました。これは独断的な決定であり、すべてのユーザーに有効なわけではありません。Riot.js 3 では、アプリケーションでどのプログラミングパターンを使用するかを決めることができます。このため、観察可能なヘルパーはソースコードから完全に削除され、より一般的なアプローチが採用されています。


**旧**

```html
<my-component>
  <p>{message}</p>

  this.on('mount', function() {
    this.message = 'hello'
    this.update()
  })
</my-component>
```

**新**

```html
<my-component>
  <p>{message}</p>

  <script>
    export default {
      onMounted() {
        this.message = 'hello'
        this.update()
      }
    }
  </script>
</my-component>
```

新しいコンポーネントの[ライフサイクルイベント]({{ '/ja/documentation/'|prepend:site.baseurl }}#ライフサイクルコールバック)も確認してください。

この変更は、観察可能なライフサイクルパターンを好むノスタルジックなユーザーに門戸を開いたまま、アプリケーションの状態を管理する多くの新しい可能性を開きます。

```js
// riot-observable-plugin.js

import observable from 'riot-observable'

/**
 * Trigger the old observable and the new event
 * @param   {RiotComponent} component - riot component
 * @param   {Function} callback - lifecycle callback
 * @param   {string} eventName - observable event name
 * @param   {...[*]} args - event arguments
 * @returns {RiotComponent|undefined}
 */
function triggerEvent(component, callback, eventName, ...args) {
  component.trigger(eventName, ...args)
  return callback.apply(component, [...args])
}

riot.install(function(componentAPI) {
  const {
      onBeforeMount,
      onMounted,
      onBeforeUpdate,
      onUpdated,
      onBeforeUnmount,
      onUnmounted
  } = componentAPI

  // riot コンポーネントを観測可能にする
  const component = observable(componentAPI)
  // 新しいイベントを古いイベントに再マップする
  const eventsMap = {
    onBeforeMount: ['before-mount', onBeforeMount],
    onMounted: ['mount', onMounted],
    onBeforeUpdate: ['before-update', onBeforeUpdate],
    onUpdated: ['updated', onUpdated],
    onBeforeUnmount: ['before-unmount', onBeforeUnmount],
    onUnmounted: ['unmount', onUnmounted]
  }

  Object.entries(eventsMap).forEach(([eventName, value]) => {
    const [oldObservableEvent, newCallback] = value
    component[eventName] = (...args) => triggerEvent(
      component, newCallback, oldObservableEvent, ...args
    )
  })

  return component
})
```

```html
<my-component>
  <p>{message}</p>

  <script>
    export default {
      onMounted() {
        this.on('update', () => {
          console.log('I got updated!')
        })
      }
    }
  </script>
</my-component>
```

### Opts vs props と state

The previous Riot.js versions provided the `opts` key to each component. This key was renamed `props` and it becomes immutable: it's a read only property frozen via `Object.freeze`.
The `props` object can be only updated outside of the component that reads from it, while the new `state` object is updated via [`update` calls]({{ '/ja/api/'|prepend:site.baseurl }}#ステートハンドリング).

**旧**

```html
<my-component>
  <p>{opts.message}</p>
</my-component>
```

**新**
```html
<my-component>
  <p>{props.message}</p>
</my-component>
```

### Refs attributes

The `ref` attributes were replaced by the `$` and `$$` [component helpers]({{ '/ja/api/'|prepend:site.baseurl }}#helpers) preferring a functional approach over mutable properties.

**旧**

```html
<my-component>
  <p ref='paragraph'>{message}</p>

  this.on('mount', function() {
    this.refs.paragraph.innerHTML = '<b>hello</b>'
  })
</my-component>
```

**新**
```html
<my-component>
  <p>{message}</p>

  <script>
    export default {
      onMounted() {
        const paragraph = $('p')

        paragraph.innerHTML = '<b>hello</b>'
      }
    }
  </script>
</my-component>
```

<aside class="note note--warning">:warning:
The new helpers will never return the children component instances but only DOM nodes
</aside>

### Parent and children

The `parent` and `tags` keys were heavily abused by Riot.js users. They were the source of many side effects and clear bad practice. For this reason the children/parent components created via Riot.js 4 never expose their internal API, **components communicate only via props** and don't interact directly with the external world.

**旧**
```html
<my-component>
  <my-child ref='child'/>

  this.on('mount', function() {
    this.refs.child.update({ message: 'hello' })
  })
</my-component>
```

**新**
```html
<my-component>
  <my-child message={childMessage}/>

  <script>
    export default {
      onMounted() {
        this.childMessage = 'hello'
        this.update()
      }
    }
  </script>
</my-component>
```

You can of course write your own riot plugin to add the `ref` behaviour but it's highly not recommended:

```js
// riot-ref-plugin.js
riot.install(function(component) {
  const { onBeforeMount } = component

  component.onBeforeMount = (props, state) => {
    if (props.ref) {
      props.ref(component)
    }

    onBeforeMount.apply(component, [props, state])
  }

  return component
})
```

```html
<my-component>
  <my-child ref={onChildRef}/>

  <script>
    export default {
      onChildRef(child) {
        this.child = child
      },
      onMounted() {
        this.child.update()
      }
    }
  </script>
</my-component>
```

#### Custom events dispatching

Listening custom events dispatched in child components can be done simply via properties:

```html
<my-component>
  <child on-loaded={onChildLoaded}></child>

  <script>
    export default {
      onChildLoaded() {
        console.log('the child component dispatched the on loaded event!')
      }
    }
  </script>
</my-component>
```

```html
<my-child>
  <figure>
    <img src="path/to/the/image.jpg" onloaded={props.onLoaded}/>
  </figure>
</my-child>
```

### Virtual tags

The `<virtual>` tag was removed and it can't be used anymore. I am planning to use the `<template>` tag instead for the `each` and `if` directives but at moment it's not yet part of the Riot.js 4 API.


### Yield tags

The `<yield>` tags were replaced by the `<slot>`s having a more predictable behavior. Plese check the [slots api]({{ '/ja/api/'|prepend:site.baseurl }}#スロット) to understand how they work.


<aside class="note note--warning">:warning:
The <code>yield</code> tags expressions were previously evaluated in the context where they were injected. The <code>slot</code>s expressions instead will be evaluated using the current context in wich they will be used.
</aside>

## CLI

The new CLI is much more powerful than the older one since it can compile single tags but it can also bundle your [entire Riot.js application]({{ '/ja/compiler/'|prepend:site.baseurl }}#アプリケーション全体のビルド).

It's designed to simplify the components bundling for quick prototypes and demos however for bigger application it's recommended the use of highly customizable javascript bundlers together with [riot loaders]({{ '/ja/compiler/'|prepend:site.baseurl }}#riot-loaders)

### Installation

In Riot.js v3 it was possible to install the CLI via `npm i -g riot`. In Riot.js 4 it was removed from the `riot` npm package and you will need to install it separately via `npm i -g @riotjs/cli`.

### Components registration

You need to be aware that it previously was automatically registering your Riot.js components but now it will just output them as javascript modules. You will need to register your javascript output by yourself:

```js
// compiled Riot.js component
import MyComponent from './my-component.js'
import {register} from 'riot'

register('my-component', MyComponent)
```
