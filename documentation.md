---
title: Documentation
layout: detail
description: Step by step starting guide
---

## Basis

### Installation

You can install Riot via npm:

```sh
npm i riot
```

Or via yarn:

```sh
yarn add riot
```

### Usage

You can bundle your Riot.js application via [webpack](https://github.com/riot/webpack-loader), [Rollup](https://github.com/riot/rollup-plugin-riot), [Parcel](https://github.com/riot/parcel-plugin-riot) or [Browserify](https://github.com/riot/riotify).
Riot tags can also be compiled directly [in your browser]({{ '/compiler/#in-browser-compilation' | prepend:site.baseurl }}) for quick prototypes or tests.

### Start from a template

If you want to start your project using one of our official templates you can use:

```sh
npm init riot
```

This command will let you pick your favourite bundler and will create in the current folder all the files necessary to start coding your first Riot.js application.

### Quick Start

Once you have wired up your application bundler (or used one of our official templates), your code might look like this:

`index.html`
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Riot App</title>
</head>
<body>
  <div id="root"></div>
  <script src="dist/bundle.js"></script>
</body>
</html>
```

`app.riot`
```html
<app>
  <p>{ props.message }</p>
</app>
```

`main.js`

```js
import * as riot from 'riot'
import App from './app.riot'

const mountApp = riot.component(App)

const app = mountApp(
  document.getElementById('root'),
  { message: 'Hello World', items: [] }
)
```

## Todo Example

Riot custom components are the building blocks for user interfaces. They make the "view" part of the application. Let's start with an extended `<todo>` example highlighting various features of Riot:

```html
<todo>
  <h3>{ props.title }</h3>

  <ul>
    <li each={ item in state.items }>
      <label class={ item.done ? 'completed' : null }>
        <input
          type="checkbox"
          checked={ item.done }
          onclick={ () => toggle(item) } />
        { item.title }
      </label>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input onkeyup={ edit } value={ state.text } />
    <button disabled={ !state.text }>
      Add #{ state.items.length + 1 }
    </button>
  </form>

  <script>
    export default {
      onBeforeMount(props, state) {
        // initial state
        this.state = {
          items: props.items,
          text: ''
        }
      },
      edit(e) {
        // update only the text state
        this.update({
          text: e.target.value
        })
      },
      add(e) {
        e.preventDefault()

        if (this.state.text) {
          this.update({
            items: [
              ...this.state.items,
              // add a new item
              {title: this.state.text}
            ],
            text: ''
          })
        }
      },
      toggle(item) {
        item.done = !item.done
        // trigger a component update
        this.update()
      }
    }
  </script>
</todo>
```

Custom components are [compiled]({{ '/compiler/' | prepend:site.baseurl }}) to JavaScript.

See the [live demo](https://riot.js.org/examples/plunker/?app=todo-app), browse the [sources](https://github.com/riot/examples/tree/gh-pages/todo-app), or download the [zip](https://github.com/riot/examples/archive/gh-pages.zip).


## Syntax

A Riot component is a combination of layout (HTML) and logic (JavaScript). Here are the basic rules:

* Each `.riot` file can contain the logic for only a single component
* HTML is defined first and the logic is enclosed inside a `<script>` tag.
* Custom components can be empty, HTML only, or JavaScript only
* All template expressions are "just JavaScript™️": `<pre>{ JSON.stringify(props) }</pre>`
* The `this` keyword is optional: `<p>{ name }</p>` and `<p>{ this.name }</p>` are both valid
* Quotes are optional: `<foo bar={ baz }>` and `<foo bar="{ baz }">` are both valid
* Boolean attributes (checked, selected, etc.) are ignored when the expression value is falsy: `<input checked={ undefined }>` becomes `<input>`.
* Standard HTML tags (`label`, `table`, `a`, etc.) can also be customized, but not necessarily a wise thing to do.
* Tag definition **root** may also have attributes: `<my-component onclick={ click } class={ props.class }>`.

Note : redefining native tags is a bad practice. If you want to stay safe you should use dashed names (see [FAQ](https://riot.js.org/faq/#should-i-use-dash-on-the-tag-name))


## Pre-processor

You can specify a pre-processor with `type` attribute. For example:

```html
<my-component>
  <script type="coffee">
    # your coffeescript logic goes here
  </script>
</my-component>
````

Your component will be compiled with the selected preprocessor only if it was previously [registered before]({{ '/compiler#pre-processors' | prepend:site.baseurl }}).

## Styling

You can put a `style` tag inside. Riot.js automatically takes it out and injects it into `<head>`. This happens once, no matter how many times the component is initialized.

```html
<my-component>

  <!-- layout -->
  <h3>{ props.title }</h3>

  <style>
    /** other component specific styles **/
    h3 { font-size: 120% }
    /** other component specific styles **/
  </style>

</my-component>
```

### Scoped CSS

[Scoped css and :host pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:host()) are also available for all browsers. Riot.js has its own custom implementation in JS which does not rely on or fallback to the browser implementation. The example below is equivalent to the first one. Notice that the example below uses the `:host` `pseudo-class` instead of relying in the component name to scope the styles.

```html
<my-component>

  <!-- layout -->
  <h3>{ props.title }</h3>

  <style>
    :host { display: block }
    h3 { font-size: 120% }
    /** other component specific styles **/
  </style>

</my-component>
```

## Mounting

Once a component is created you can mount it on the page as follows:


```html
<body>

  <!-- place the custom component anywhere inside the body -->
  <my-component></my-component>

  <!-- include riot.js -->
  <script src="riot.min.js"></script>

  <!-- mount the component -->
  <script type="module">
    // import the component JavaScript output generated via @riotjs/compiler
    import MyComponent from './my-component.js'

    // register the riot component
    riot.register('my-component', MyComponent)

    riot.mount('my-component')
  </script>

</body>
```

Custom components inside the `body` of the page needs to be closed normally: `<my-component></my-component>` and self-closing: `<my-component/>` is not supported.


Some example uses of the mount method:

```js
// mount an element with a specific id
riot.mount('#my-element')

// mount selected elements
riot.mount('todo, forum, comments')
```

A document can contain multiple instances of the same component.


### Accessing DOM elements

Riot gives you access to your component DOM elements via `this.$` and `this.$$` helper methods.

```html
<my-component>
  <h1>My todo list</h1>
  <ul>
    <li>Learn Riot.js</li>
    <li>Build something cool</li>
  </ul>

  <script>
    export default {
      onMounted() {
        const title = this.$('h1') // single element
        const items = this.$$('li') // multiple elements
      }
    }
  </script>
</my-component>
```


### How to use jQuery, Zepto, querySelector, etc.

If you need to access the DOM inside Riot, you'll want to take a look at the [riot component lifecycle](#riot-component-lifecycle). Notice that the DOM elements aren't instantiated until the `mount` event first fires, meaning any attempt to select an element before then will fail.

```html
<my-component>
  <p id="findMe">Do I even Exist?</p>

  <script>

    var test1 = document.getElementById('findMe')
    console.log('test1', test1)  // Fails

    export default {
      onMounted() {
        const test2 = document.getElementById('findMe')
        console.log('test2', test2) // Succeeds, fires once (per mount)
      },
      onUpdated() {
        const test3 = document.getElementById('findMe')
        console.log('test3', test3) // Succeeds, fires on every update
      }
    }
  </script>
</my-component>
```

### Contexted DOM query

Now that we know how to get DOM elements in the `onUpdated` or `onMounted` callbacks, we can make this useful by also adding a context to our element queries to the `root element` (the Riot tag we're creating).

```html
<my-component>
  <p id="findMe">Do I even Exist?</p>
  <p>Is this real life?</p>
  <p>Or just fantasy?</p>

  <script>
    export default {
      onMounted() {
        // Contexted jQuery
        $('p', this.root) // similar to this.$

        // Contexted Query Selector
        this.root.querySelectorAll('p') // similar to this.$$
      }
    }
  </script>
</my-component>
```

### Properties

You can pass initial properties for components in the second argument.

```html
<script>
  riot.mount('todo', { title: 'My TODO app', items: [ ... ] })
</script>
```

The passed data can be anything, ranging from a simple object to a full application API. Or it can be a Redux store. Depends on the designed architecture.

Inside the tag the properties can be referenced with the `this.props` attribute as follows:

```html
<my-component>

  <!-- Props in HTML -->
  <h3>{ props.title }</h3>

  <script>
    export default {
      onMounted() {
        // Props in JavaScript
        const title = this.props.title

        // this.props is frozen and it's immutable
        this.props.description = 'my description' // this will not work
      }
    }
  </script>

</my-component>
```

### State

Each Riot component can use the `this.state` object to store or modify its internal state.
While the `this.props` attribute is frozen the `this.state` object is completely mutable, and it can be updated manually or via the `this.update()` method:

```html
<my-component id="{ state.name }-{ state.surname }">

  <p>{ state.name } - { state.surname }</p>

  <script>
    export default {
      onMounted() {
        // this is good but doesn't update the component DOM
        this.state.name = 'Jack'

        // this call updates the state and the component DOM as well
        this.update({
          surname: 'Black'
        })
      }
    }
  </script>
</my-component>
```

### Riot component lifecycle

A component is created in the following sequence:

1. The component object is created
2. The JavaScript logic is executed
3. All HTML expressions are calculated
4. The component DOM is mounted on the page and "onMounted" callback is called

Once mounted the expressions a component can be updated as follows:

1. When `this.update()` is called on the current component instance
2. When `this.update()` is called on a parent component, or any parent upwards. Updates flow uni-directionally from parent to child.

The "onUpdated" callback is called every time the component tag is updated.

### Lifecycle callbacks

You can setup you component lifecycles as follows:


```html
<my-component>
  <script>
    export default {
      onBeforeMount(props, state) {
        // before the component is mounted
      },
      onMounted(props, state) {
        // right after the component is mounted on the page
      },
      onBeforeUpdate(props, state) {
        // allows recalculation of context data before the update
      },
      onUpdated(props, state) {
        // right after the component template is updated after an update call
      },
      onBeforeUnmount(props, state) {
        // before the component is removed
      },
      onUnmounted(props, state) {
        // when the component is removed from the page
      }
    }
  </script>
</my-component>
```

Each callback always receives the current `this.props` and `this.state` as arguments.

## Plugins

Riot provides an easy way to upgrade its components API. When a component is created it can be enhanced by the plugins registered via `riot.install`.

```js
// riot-observable.js
let id = 0

riot.install(function(component) {
  // all components will pass through here
  component.uid = id++
})

```

```html
<!-- my-component.riot -->
<my-component>
  <h1>{ uid }</h1>
</my-component>
```

## Expressions

HTML can be mixed with expressions that are enclosed in curly braces:

```js
{ /* my_expression goes here */ }
```

Expressions can set attributes or nested text nodes:

```html
<h3 id={ /* attribute_expression */ }>
  { /* nested_expression */ }
</h3>
```

Expressions are 100% JavaScript. A few examples:

```js
{ title || 'Untitled' }
{ results ? 'ready' : 'loading' }
{ new Date() }
{ message.length > 140 && 'Message is too long' }
{ Math.round(rating) }
```

The goal is to keep the expressions small so your HTML stays as clean as possible. If your expression grows in complexity consider moving some logic to the "onBeforeUpdate" callback. For example:


```html
<my-component>

  <!-- the `val` is calculated below .. -->
  <p>{ val }</p>

  <script>
    export default {
      onBeforeUpdate() {
        // ..on every update
        this.val = some / complex * expression ^ here
      }
    }
  </script>
</my-component>
```

### Text attributes

Elements attributes can be set using expressions. <br/>
Only `text`, `boolean` and `number` expression values can be rendered:<br/>

`<p class={'green'}>` becomes `<p class='green'>` <br/>
`<li tabindex={-1}>` becomes `<li tabindex='-1'>` <br/>
`<div draggable={true}>` becomes `<div draggable='true'>` <br/>
`<div draggable={false}>` becomes `<div draggable='false'>` <br/>

If the expression value can not be rendered the attribute will be skipped:<br/>

`<p class={null}>` becomes `<p>` <br/>
`<li tabindex={undefined}>` becomes `<li>` <br/>
`<div draggable={new Array()}>` becomes `<div>` <br/>


### Boolean attributes

W3C states that a boolean property is true if the attribute is present — even if the value is empty or false.
Riot.js automatically fixes this behaviour when using expressions.

Boolean attributes (checked, selected, etc.) are ignored when the expression value is falsy:

`<input checked={ null }>` becomes `<input>` <br/>
`<input checked={ '' }>` becomes `<input>` <br/>
`<input checked={ false }>` becomes `<input>` <br/>

In case the expression is truthy they will be correctly rendered according to the specs:

`<input checked={ true }>` becomes `<input checked='checked'>` <br/>
`<input checked={ 1 }>` becomes `<input checked='checked'>` <br/>
`<input checked={ 'is-valid' }>` becomes `<input checked='checked'>` <br/>


The following expression does not work:

```html
<input type="checkbox" { true ? 'checked' : ''}>
```

### Object spread attribute

You can also use an object spread expression to define multiple attributes. For example:

```html
<my-component>
  <p { ...attributes }></p>
  <script>
    export default {
      attributes: {
        id: 'my-id',
        role: 'contentinfo',
        class: 'main-paragraph'
      }
    }
  </script>
</my-component>
```

evaluates to `<p id="my-id" role="contentinfo" class="main-paragraph">`.

### Printing brackets

You can output an expression without evaluation by escaping the opening bracket:

`\{ this is not evaluated }` outputs `{ this is not evaluated }`

Be sure to escape brackets in any situation where they should not be evaluated. For example, the regex pattern below will fail to validate the intended input (any two numeric characters) and instead only accept a single numeric character followed by the number "2":

```html
<my-component>
  <input type="text" pattern="\d{2}">
</my-component>
```

The correct implementation would be:

```html
<my-component>
  <input type="text" pattern="\d\{2}">
</my-component>
```

### Etc

Expressions inside `style` tags are ignored.


### Render unescaped HTML

Riot expressions can only render text values without HTML formatting. However, you can make a custom tag to do the job. For example:

```html
<raw>
  <script>
    export default {
      setInnerHTML() {
        this.root.innerHTML = this.props.html
      },
      onMounted() {
        this.setInnerHTML()
      },
      onUpdated() {
        this.setInnerHTML()
      }
    }
  </script>
</raw>
```

After the tag is defined you can use it inside other tags. For example:

```html
<my-component>
  <p>Here is some raw content: <raw html={ content }/> </p>

  <script>
    export default {
      onBeforeMount() {
        this.content = 'Hello, <strong>world!</strong>'
      }
    }
  </script>
</my-component>
```

[demo on jsfiddle](http://jsfiddle.net/23g73yvx/)

<aside class="note note--warning">:warning: This could expose the user to XSS attacks so make sure you never load data from an untrusted source.</aside>

## Nested components

Let's define a parent tag `<account>` and with a nested tag `<subscription>`:


```html
<account>
  <subscription plan={ props.plan } show-details={ true } />
</account>
```

```html
<subscription>
  <h3>{ props.plan.name }</h3>

  <script>
    export default {
      onMounted(props) {
        // Get JS handle to props
        const {plan, showDetails} = props
      }
    }
  </script>
</subscription>
```

<aside class="note note--info">
Note how we named the <code>show-details</code> attribute. It is written in dash case but it will be converted to camel case inside the <code>this.props</code> object.
</aside>

Then we mount the `account` component to the page with a `plan` configuration object:

```html
<body>
  <account></account>
</body>

<script>
  riot.mount('account', { plan: { name: 'small', term: 'monthly' } })
</script>
```

Parent component properties are passed with the `riot.mount` method and child component ones are passed via the tag attribute.

Nested tags should be registered via `riot.register` call or they can be directly imported into the parent component. If you bundle your application your `<account>` template might look like this:

```html
<account>
  <subscription/>

  <script>
    import Subscription from './subscription.riot'

    export default {
      components: {
        Subscription
      }
    }
  </script>
</account>
```

### Slots

Using the `<slot>` tag you can inject custom HTML templates in a child component from its parent.

Child component definition:

```html
<greeting>
  <p>Hello <slot/></p>
</greeting>
```

The child component is placed in a parent component injecting custom HTML into it:

```html
<user>
  <greeting>
    <b>{ text }</b>
  </greeting>

  <script>
    export default {
      text: 'world'
    }
  </script>
</user>
```

Result:

```html
<user>
  <greeting>
    <p>Hello <b>world</b><p>
  </greeting>
</user>
```

See [API docs]({{ '/api/#slots' | prepend:site.baseurl }}) for `slots`.

<aside class="note note--info">
If you are using the `Riot.js` bundle, slots will work only in pre-compiled components.<br/>
All of the inner HTML of the components placed directly in your page DOM will be ignored.<br/><br/>
However with Riot.js >= 7, you might consider using the `riot+compiler.js` bundle to render the slots
placed directly in your raw markup (<a target="_blank" href="https://github.com/riot/riot/discussions/2917">see also runtime slots</a>).
</aside>

<aside class="note note--warning">
:warning: Riot <code>if</code>, <code>each</code> and <code>is</code> directives are not supported on slot tags.
</aside>


## Event handlers

A function that deals with DOM events is called an "event handler". Event handlers are defined as follows:

<aside class="note note--warning">
  Note: The default event handler will be called. Use e.preventDefault() to stop it.
</aside>

```html
<login>
  <form onsubmit={ submit }>

  </form>

  <script>
    export default {
      // this method is called when above form is submitted
      submit(e) {
        e.preventDefault() // Optional
      }
    }
  </script>
</login>
```

Attributes beginning with "on" (`onclick`, `onsubmit`, `oninput`, etc.) accept a function value which is called when the event occurs. This function can also be defined dynamically with an expression. For example:


```html
<form onsubmit={ condition ? method_a : method_b }>
```

All the event handlers are auto-bound and `this` refers to the current component instance.

So you can also call a function dynamically from a property value like this:

```html
<button onclick={ this[props.myfunc] }>Reset</button>
```

Event handlers do not update components so you might combine them with a `this.update()` call:

```html
<login>
  <input value={ state.val }/>
  <button onclick={ resetValue }>Reset</button>

  <script>
    export default {
      state: {
        val: 'initial value'
      },
      resetValue() {
        this.update({
          val: ''
        })
      }
    }
  </script>
</login>
```

### Event handlers options

You can use [native event listener options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) passing an array instead a callback to your event listeners:

```html
<div onscroll={ [updateScroll, { passive: true }] }></div>
```

{% include version_badge.html version=">=4.11.0" %}

## Input Fields

The input field values can be simply updated using the `value={newValue}` expression. Riot.js normalizes this behavior for input, select and textarea elements.

### Note about Textarea tags and value

Textarea tags are a special kind of Input nodes and if you want to update their values you should prefer the use the `value` attribute.
Riot.js in this case will set the native `input.value` attribute for you as expected.

```html
<textarea value={state.value}>{state.text}</textarea>
<button onclick={updateText}>update</button>
<script>
  export default {
    state: {
      value: '',
      text: ''
    },

    updateText (event) {
      this.update({
        text: 'this might not work as expected',
        value: 'this works'
      });
    }
  }
</script>
```

## Conditionals

Conditionals let you mount / unmount DOM and components based on a condition. For example:

```html
<div if={ isPremium }>
  <p>This is for premium users only</p>
</div>
```

Again, the expression can be just a simple property or a full JavaScript expression. The `if` directive is a special attribute:
  - `true (or truthy)`: mount a nested component or add an element to the template
  - `false (or falsy)`: unmount an element or a component

### Fragments conditional

{% include version_badge.html version=">=4.2.0" %}

The `if` directives can be used also without the use of a wrapper tag. Thanks to the `<template>` tag you can render only the content of an if condition:

```html
<template if={isReady}>
  <header></header>
  <main></main>
  <footer></footer>
</template>
```

The `<template>` tag will be just used to wrap a html fragment that depends on a Riot.js directive, this feature is also available for [loops](#fragments-loops)

## Loops

Loops are implemented with the `each` attribute as follows:

```html
<my-component>
  <ul>
    <li each={ item in items } class={ item.done ? 'completed' : null }>
      <input type="checkbox" checked={ item.done }> { item.title }
    </li>
  </ul>

  <script>
    export default {
      items: [
        { title: 'First item', done: true },
        { title: 'Second item' },
        { title: 'Third item' }
      ]
    }
  </script>
</my-component>
```

The element with the `each` attribute will be repeated for all items in the array. New elements are automatically added / created when the items array is manipulated using methods like `push()`, `slice()`, or `splice`.

### Looping custom components

Custom components can also be looped. For example:

```html
<todo-item each="{ item in items }" { ...item }></todo-item>
```

The currently looped item properties can be passed directly to the looped tag.


### Non-object arrays

The `each` directive internally uses `Array.from`. This means that you can loop over strings, Map, and Sets that only contain primitive values:


```html
<my-component>
  <p each={ (name, index) in stuff }>{ index }: { name }</p>

  <p each={ letter in letters }>{ letter }</p>

  <p each={ meal in food }>{ meal }</p>

  <script>
    export default {
      stuff: [ true, 110, Math.random(), 'fourth'],
      food: new Map().set('pasta', 'spaghetti').set('pizza', 'margherita'),
      letters: 'hello'
    }
  </script>
</my-component>
```

The `name` is the name of the element and `index` is the index number. Both of these labels can be anything that's best suited for the situation.


### Object loops

Plain objects can be looped via [`Object.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries). For example:

```html
<my-component>
  <p each={ element in Object.entries(obj) }>
    key = { element[0] }
    value = { element[1] }
  </p>

  <script>
    export default {
      obj: {
        key1: 'value1',
        key2: 1110.8900,
        key3: Math.random()
      }
    }
  </script>

</my-component>
```

You can use [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) and [`Object.values`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) if you only want to loop over fragments of an object:

```html
<my-component>
  <p>
    The Event will start at:
    <time each={ value in Object.values(aDate) }>{ value }</time>
  </p>

  <script>
    export default {
      aDate: {
        hour: '10:00',
        day: '22',
        month: 'December',
        year: '2050'
      }
    }
  </script>

</my-component>
```

### Fragments loops

{% include version_badge.html version=">=4.2.0" %}

In some cases you may need to loop some html without having a particular wrapper tag. In that case you can use the <template> tag that will be removed rendering just the html tags wrapped in it. For example:

```html
<dl>
  <template each={item in items}>
    <dt>{item.key}</dt>
    <dd>{item.value}</dd>
  </template>
</dl>
```

This HTML fragments strategy is not exclusive to looping and can be used in [conjunction with `if`](#fragments-conditional) for any tag.

### Loops advanced tips

#### Key

Adding the `key` attribute to the looped tags you will provide a more precise strategy to track your item's position. This will greatly improve the loop performance in case your collections are immutable.

```html
<loop>
  <ul>
    <li each={ user in users } key={ user.id }>{ user.name }</li>
  </ul>
  <script>
    export default {
      users: [
        { name: 'Gian', id: 0 },
        { name: 'Dan', id: 1 },
        { name: 'Teo', id: 2 }
      ]
    }

  </script>
</loop>
```

The `key` attribute can be also generated in runtime via expressions.

```html
<loop>
  <ul>
    <li each={ user in users } key={ user.id() }>{ user.name }</li>
  </ul>
  <script>
    export default {
      users: [
        { name: 'Gian', id() { return 0 } },
        { name: 'Dan', id() { return 1 } },
        { name: 'Teo', id() { return 2 } }
      ]
    }
  </script>
</loop>
```

## HTML elements as components

Standard HTML elements can be used as Riot components in the page body with the addition of the `is` attribute.

```html
<ul is="my-list"></ul>
```

This provides users with an alternative that can provide greater compatibility with CSS frameworks. The tags are treated like any other custom component.

```js
riot.mount('[is="my-list"]')
```

will mount the `ul` element shown above as if it were `<my-list></my-list>`.

Notice that you can use also an expression in the `is` attribute and Riot will also be able to dynamically render different tags on the same DOM node.

```html
<my-component>
  <!-- dynamic component -->
  <div is={ animal }></div>
  <button onclick={ switchComponent }>
    Switch
  </button>

  <script>
    export default {
      animal: 'dog',
      switchComponent() {
        // riot will render the <cat> component
        // replacing <dog>
        this.animal = 'cat'
        this.update()
      }
    }
  </script>
</my-component>
```

Note that when using the `is` attribute, the tag name should be rendered in all lowercase, regardless of how it's defined.

```html
<MyComponent></MyComponent> <!-- Correct -->
<div is="mycomponent"></div> <!-- Also Correct -->
<div is="MyComponent"></div> <!-- Incorrect -->
<script>
  riot.mount('[is="mycomponent"]');
</script>
```
Note that you can use `is` attribute with any HTML tags, but not with the [`template` tag](#fragments-loops).

## Pure components

If you want to have complete control over the rendering of your components you can use `riot.pure` to bypass the Riot.js internal logic, for example:

```html
<my-pure-component>
  <script>
    import { pure } from 'riot'

    export default pure(() => {
      return {
        mount(el) {
          this.el = el
          this.el.innerHTML = 'Hello There'
        },
        update() {
          this.el.innerHTML = 'I got updated!'
        },
        unmount() {
          this.el.parentNode.removeChild(this.el)
        }
      }
    })
  </script>
</my-pure-component>
```

#### Getting props in pure components
Pure components do not receive an object with props on every update, you should get them yourself.
You can use a [getProps](https://www.npmjs.com/package/riot-pure-props) helper for this.


<aside class="note note--warning">:warning: Pure components cannot contain HTML or CSS. They can only have a pure function call as a default export statement.</aside>


## Server-side rendering

Riot [supports server-side rendering](https://github.com/riot/ssr) with Node.js. You can `require` components and render them:

```js
const { render } = require('@riotjs/ssr')
const Timer = require('timer.riot')

const html = render('timer', Timer, { start: 42 })

console.log(html) // <timer><p>Seconds Elapsed: 42</p></timer>
```

## Riot DOM Caveats

Riot components rely on browsers rendering so you must be aware of certain situations where your components might not render their template properly.

Consider the following tag:

```html

<my-fancy-options>
  <option>foo</option>
  <option>bar</option>
</my-fancy-options>
```

This markup is not valid if not injected in a `<select>` tag:

```html

<!-- not valid, a select tag allows only <option> children -->
<select>
  <my-fancy-options />
</select>

<!-- valid because we will render the <option> tags using <select> as root node -->
<select is="my-fancy-options"></select>

```

Tags like `table, select, svg...` don't allow custom children tags so the use of custom Riot tags is forbidden. Use `is` instead like demonstrated above ([more info](https://github.com/riot/riot/issues/2206)).
