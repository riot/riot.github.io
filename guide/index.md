---
layout: default
title: Custom tags
---

{% include guide-tabs.html %}

## Example

Riot custom tags are the building blocks for user interfaces. They make the "view" part of the application. Let's start with an extended TODO example highlighting various features of Riot:

```html
<todo>

  <h3>{ opts.title }</h3>

  <ul>
    <li each={ items }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggle }> { title }
      </label>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input ref="input" onkeyup={ edit }>
    <button disabled={ !text }>Add #{ items.length + 1 }</button>
  </form>

  <script>
    this.items = opts.items

    edit(e) {
      this.text = e.target.value
    }

    add(e) {
      e.preventDefault()
      if (this.text) {
        this.items.push({ title: this.text })
        this.text = this.refs.input.value = ''
      }
    }

    toggle(e) {
      var item = e.item
      item.done = !item.done
    }
  </script>

</todo>
```

Custom tags are [compiled](/guide/compiler/) to JavaScript.

See the [live demo](http://riotjs.com/examples/plunker/?app=todo-app), browse the [sources](https://github.com/riot/examples/tree/gh-pages/todo-app), or download the [zip](https://github.com/riot/examples/archive/gh-pages.zip).



## Tag syntax

A Riot tag is a combination of layout (HTML) and logic (JavaScript). Here are the basic rules:

* HTML is defined first and the logic is enclosed inside an optional `<script>` tag. *note: the script tag can not be used when including tag definitions in the document body, only in external tag files*
* Without the `<script>` tag the JavaScript starts where the last HTML tag ends.
* Custom tags can be empty, HTML only or JavaScript only
* Quotes are optional: `<foo bar={ baz }>` becomes `<foo bar="{ baz }">`.
* Smart ES6 like method syntax is supported: `methodName() { }` becomes `this.methodName = function() {}.bind(this)` where `this` always points to the current tag instance.
* A shorthand syntax for class names is available: `class={ completed: done }` renders to `class="completed"`when the value of `done` is a true value.
* Boolean attributes (checked, selected etc..) are ignored when the expression value is falsy: `<input checked={ undefined }>` becomes `<input>`.
* All attribute names *must be lowercase*. This is due to browser specification.
* Self-closing tags are supported: `<div/>` equals `<div></div>`. Well known "open tags" such as `<br>`, `<hr>`, `<img>` or `<input>` are never closed after the compilation.
* Custom tags always need to be closed (normally or self-closed).
* Standard HTML tags (`label`, `table`, `a` etc..) can also be customized, but not necessarily a wise thing to do.
* Tag definition **root** may also have attributes: `<foo onclick={ click } class={ active: active }>`.

Inline tag definitions (in document body) should be properly indented, with all custom tags equally indented at the lowest indent level, mixing of tabs and spaces is discouraged.

### No script tag

You can leave out the `<script>` tag:

```html
<todo>

  <!-- layout -->
  <h3>{ opts.title }</h3>

  // logic comes here
  this.items = [1, 2, 3]

</todo>
```

In which case the logic starts after the last HTML tag. This "open syntax" is more commonly used on the examples on this website.


## Pre-processor

You can specify a pre-processor with `type` attribute. For example:

```html
<my-tag>
  <script type="coffee">
    # your coffeescript logic goes here
  </script>
</my-tag>
````

Currently available options are "coffee", "typescript", "es6" and "none". You can also prefix the language with "text/", such as "text/coffee".

See [pre processors](/guide/compiler/#pre-processors) for more details.


## Tag styling

You can put a `style` tag inside. Riot.js automatically takes it out and injects it into `<head>`. This happens once, no matter how many times the tag is initialized.

```html
<todo>

  <!-- layout -->
  <h3>{ opts.title }</h3>

  <style>
   /** other tag specific styles **/
    h3 { font-size: 120% }
    /** other tag specific styles **/
  </style>

</todo>
```

### Scoped CSS

[Scoped css and :scope pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:scope) is also available for all browsers. Riot.js has its own custom implementation in JS which does not rely on or fallback to the browser implementation. The example below is equivalent to the first one. Notice that the example below uses the `:scope` `pseudo-class` instead of relying in the tag name to scope the styles.

```html
<todo>

  <!-- layout -->
  <h3>{ opts.title }</h3>

  <style>
    :scope { display: block }
    h3 { font-size: 120% }
    /** other tag specific styles **/
  </style>

</todo>
```

To make it easier to override the CSS you can specify where in the `<head>` Riot should inject tag styles:

```html
<style type="riot"></style>
```

Example use case would be to insert tag styles from a component library after normalize.css but before your website's theme CSS allowing you to override the library's default styling.

## Mounting

Once a tag is created you can mount it on the page as follows:


```html
<body>

  <!-- place the custom tag anywhere inside the body -->
  <todo></todo>

  <!-- include riot.js -->
  <script src="riot.min.js"></script>

  <!-- include the tag -->
  <script src="todo.js"></script>

  <!-- mount the tag -->
  <script>riot.mount('todo')</script>

</body>
```

Custom tags inside the `body` of the page needs to be closed normally: `<todo></todo>` and self-closing: `<todo/>` is not supported.


Some example uses of the mount method:

```js
// mount all custom tags on the page
riot.mount('*')

// mount an element with a specific id
riot.mount('#my-element')

// mount selected elements
riot.mount('todo, forum, comments')
```

A document can contain multiple instances of the same tag.


### Accessing DOM elements

Riot gives you access to elements that have `ref` attributes under the `this.refs` object, and plenty of shorthand property-methods like the `if="{...}"` attribute, but occasionally you need to reference and touch pieces of HTML which don't really fit inside those prebaked functions.


### How to use jQuery, Zepto, querySelector, etc...

If you need to access the DOM inside Riot, you'll want to take a look at the [Tag Lifecycle](#tag-lifecycle). Notice that the DOM elements aren't instantiated until the `mount` event first fires, meaning any attempt to select an element before then will fail.

```html
<example-tag>
  <p id="findMe">Do I even Exist?</p>

  <script>
  var test1 = document.getElementById('findMe')
  console.log('test1', test1)  // Fails

  this.on('update', function(){
    var test2 = document.getElementById('findMe')
    console.log('test2', test2) // Succeeds, fires on every update
  })

  this.on('mount', function(){
    var test3 = document.getElementById('findMe')
    console.log('test3', test3) // Succeeds, fires once (per mount)
  })
  </script>
</example-tag>
```

### Contexted DOM query

Now that we know how to get DOM elements by waiting for the `update` or `mount` events, we can make this useful by also adding a context to our element queries to the `root element` (the riot tag we're creating).

```html
<example-tag>
  <p id="findMe">Do I even Exist?</p>
  <p>Is this real life?</p>
  <p>Or just fantasy?</p>

  <script>
  this.on('mount', function(){
    // Contexted jQuery
    $('p', this.root)

    // Contexted Query Selector
    this.root.querySelectorAll('p')
  })
  </script>
</example-tag>
```

### Options

You can pass options for tags in the second argument

```html
<script>
riot.mount('todo', { title: 'My TODO app', items: [ ... ] })
</script>
```

The passed data can be anything, ranging from a simple object to a full application API. Or it can be a Flux store. Depends on the designed architecture.

Inside the tag the options can be referenced with the `opts` variable as follows:

```html
<my-tag>

  <!-- Options in HTML -->
  <h3>{ opts.title }</h3>

  // Options in JavaScript
  var title = opts.title

</my-tag>
```

### Tag lifecycle

A tag is created in following sequence:

1. Tag is constructed
2. Tag's JavaScript logic is executed
3. HTML expressions are calculated
4. Tag is mounted on the page and "mount" event is fired

After the tag is mounted the expressions are updated as follows:

1. Automatically after an event handler is called. (unless you set e.preventUpdate to true in your event handler) For example the `toggle` method in the above example.
2. When `this.update()` is called on the current tag instance
3. When `this.update()` is called on a parent tag, or any parent upwards. Updates flow uni-directionally from parent to child.
4. When `riot.update()` is called, which globally updates all expressions on the page.

The "update" event is fired every time the tag is updated.

Since the values are calculated before mounting there are no surprise issues such as failed `<img src={ src }>` calls.


### Listening to lifecycle events

You can listen to various lifecyle events inside the tag as follows:


```js
<todo>

  this.on('before-mount', function() {
    // before the tag is mounted
  })

  this.on('mount', function() {
    // right after the tag is mounted on the page
  })

  this.on('update', function() {
    // allows recalculation of context data before the update
  })

  this.on('updated', function() {
    // right after the tag template is updated after an update call
  })

  this.on('before-unmount', function() {
    // before the tag is removed
  })

  this.on('unmount', function() {
    // when the tag is removed from the page
  })

  // curious about all events ?
  this.on('*', function(eventName) {
    console.info(eventName)
  })

</todo>
```

You can have multiple event listeners for the same event. See [observable](/api/observable/) for more details about events.

## Mixins

Mixins provide an easy way to share functionality across tags. When a tag is compiled by riot, any defined mixins are added and available to use in the tag.

```js
var OptsMixin = {
  // the `opts` argument is the option object received by the tag as well
  init: function(opts) {
    this.on('updated', function() { console.log('Updated!') })
  },

  getOpts: function() {
    return this.opts
  },

  setOpts: function(opts, update) {
    this.opts = opts
    if (!update) this.update()
    return this
  }
}

<my-tag>
  <h1>{ opts.title }</h1>

  this.mixin(OptsMixin)
</my-tag>
```

In this example you are giving any instance of the `my-tag` Tag the `OptsMixin` which provides `getOpts` and `setOpts` methods. `init` method is a special one which can initialize the mixin when it's loaded to the tag. (`init` method is not accessible from the tag its mixed in)

```js
var my_tag_instance = riot.mount('my-tag')[0]

console.log(my_tag_instance.getOpts()) // will log out any opts that the tag has
```

Tags will accept any object -- `{'key': 'val'}` `var mix = new function(...)` -- and will error out when any other type is passed to it.

The `my-tag` definition now has a `getId` method added to it along with anything defined in the `OptsMixin` except for the `init` function.

```js
function IdMixin() {
  this.getId = function() {
    return this._id
  }
}

var id_mixin_instance = new IdMixin()

<my-tag>
  <h1>{ opts.title }</h1>

  this.mixin(OptsMixin, id_mixin_instance)
</my-tag>
```

By being defined on the tag level, mixins not only extend the functionality of your tag, but also allows for a repeatable interface. Every time a tag is mounted, even sub-tags, the instance will have the mixed-in code.

### Shared mixins

To share the mixins over files or projects, `riot.mixin` API is provided. You can register your shared mixin like this:

```js
riot.mixin('mixinName', mixinObject)
```

To load the mixin to the tag, use `mixin()` method with the key.

```html
<my-tag>
  <h1>{ opts.title }</h1>

  this.mixin('mixinName')
</my-tag>
```

### Global mixins

If you need to add any functionality to *all* your tags, you can register a global mixin like this:

```js
// Must be registered before mounting tags
riot.mixin(mixinObject)
```

Unlike the shared mixins, the global ones are loaded automatically to all the mounted tags. So, use it carefully!

```js
riot.mixin('globalMixinOne', mixinObjectOne, true)
console.log(riot.mixin('globalMixinOne') === mixinObjectOne) // true
```

Sometimes you may need to retrieve the mixin object so alternatively you may set your global mixin object by name. In this case the third _boolean_ parameter indicates this mixin is not a shared but a global mixin.

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

The goal is to keep the expressions small so your HTML stays as clean as possible. If your expression grows in complexity consider moving some of logic to the "update" event. For example:


```html
<my-tag>

  <!-- the `val` is calculated below .. -->
  <p>{ val }</p>

  // ..on every update
  this.on('update', function() {
    this.val = some / complex * expression ^ here
  })
</my-tag>
```


### Boolean attributes

Boolean attributes (checked, selected etc..) are ignored when the expression value is falsy:

`<input checked={ null }>` becomes `<input>`.

W3C states that a boolean property is true if the attribute is present at all — even if the value is empty of `false`.

The following expression does not work:

```html
<input type="checkbox" { true ? 'checked' : ''}>
```

since only attribute and nested text expressions are valid. Riot detects 44 different boolean attributes.


### Class shorthand

Riot has a special syntax for CSS class names. For example:

```html
<p class={ foo: true, bar: 0, baz: new Date(), zorro: 'a value' }></p>
```

evaluates to `foo baz zorro`. Property names whose value is truthful are appended to the list of class names. Of course you can use this notation in other places than class names if you find a suitable use case.


### Class object expressions

<span class="tag red">&gt;=3.4.0</span>

You can also use an object to define your elements classes. For example:

```html
<my-tag>
  <p class={ classes }></p>
  <script>
    hasAnimation() {
      return true
    }

    this.randomNumber = 5

    this.classes = {
      foo: true,
      bar: false,
      number: '3 > randomNumber',
      animated: 'hasAnimation()', // watch out, methods should be set as strings
      baz: new Date(),
      zorro: 'a value'
    }
  </script>
</my-tag>
```

evaluates to `foo number animated baz zorro`. Riot will stringify the object and render all the keys having truthful values

### Style object expressions

<span class="tag red">&gt;=3.4.0</span>

Inline `style` attributes can be provided as object and riot will automatically convert them to strings. For example:

```html
<my-tag>
  <p style={ styles }></p>
  <script>
    this.styles = {
      color: 'red',
      height: '10rem'
    }
  </script>
</my-tag>
```

evaluates to `<p style="color: red; height: 10rem"></p>`

### Printing brackets

You can output an expression without evaluation by escaping the opening brace:

`\\{ this is not evaluated \\}` outputs `{ this is not evaluated }`


### Customizing curly braces

You are free to customize the braces to your liking. For example:

```js
riot.settings.brackets = '${ }'
riot.settings.brackets = '\{\{ }}'
```

The start and end is separated with a space character.

When using [pre-compiler](/guide/compiler/#pre-compilation) you'll have to set `brackets` option there as well.



### Etc

Expressions inside `style` tags are ignored.


### Render unescaped HTML

Riot expressions can only render text values without HTML formatting. However you can make a custom tag to do the job. For example:

```html
<raw>
  <span></span>

  this.root.innerHTML = opts.content
</raw>
```

After the tag is defined you can use it inside other tags. For example

```html
<my-tag>
  <p>Here is some raw content: <raw content="{ html }"/> </p>

  this.html = 'Hello, <strong>world!</strong>'
</my-tag>
```

[demo on jsfiddle](http://jsfiddle.net/23g73yvx/)

<span class="tag red">warning</span> this could expose the user to XSS attacks so make sure you never load data from an untrusted source.

Note that in more practical situation, you will need to specify `update` event manually as follows
since there is no expression to update in the template (`<span></span>`).

```html
<raw>
  <span></span>

  this.innerHTML.root = opts.content
  this.on('update', function(){ this.root.innerHTML = opts.content });
</raw>
```

[demo on jsfiddle](http://jsfiddle.net/7m3bvy1d/)

## Nested tags

Let's define a parent tag `<account>` and with a nested tag `<subscription>`:


```html
<account>
  <subscription  plan={ opts.plan } show_details="true" />
</account>


<subscription>
  <h3>{ opts.plan.name }</h3>

  // Get JS handle to options
  var plan = opts.plan,
      show_details = opts.show_details

  // access to the parent tag
  var parent = this.parent

</subscription>
```

<span class="tag red">important</span> Note how we named the `show_details` attribute using an underscore instead of camel case, which due to browser specification would have been automatically converted to lowercase.

Then we mount the `account` tag to the page with a `plan` configuration option:

```html
<body>
  <account></account>
</body>

<script>
riot.mount('account', { plan: { name: 'small', term: 'monthly' } })
</script>
```

Parent tag options are passed with the `riot.mount` method and child tag options are passed on the tag attribute.

<span class="tag red">important</span> Nested tags are always declared inside a parent custom tag. They are not initialized if they are defined on the page.

### Nested HTML

"HTML transclusion" is a way to process the inner HTML on the page. This is achieved with a build-in `<yield>` tag. Example:


### Tag definition

```html
<my-tag>
  <p>Hello <yield/></p>
  this.text = 'world'
</my-tag>
```

### Usage

Custom tag is placed on a page with nested HTML

```html
<my-tag>
  <b>{ text }</b>
</my-tag>
```

### Result

```html
<my-tag>
  <p>Hello <b>world</b><p>
</my-tag>
```

See [API docs](/api/#yield) for `yield`.

## Named elements

Elements with `ref` attribute are automatically linked to the context under `this.refs` so you'll have an easy access to them with JavaScript:

```html
<login>
  <form ref="login" onsubmit={ submit }>
    <input ref="username">
    <input ref="password">
    <button ref="submit">
  </form>

  // grab above HTML elements
  submit(e) {
    var form = this.refs.login,
        username = this.refs.username.value,
        password = this.refs.password.value,
        button = this.refs.submit
  }

</login>
```

The refs attribute will be set when the mount event gets fired, so you can access to the `this.refs` collection into 'mount' (`this.on('mount', function() {...}) `) or other event handlers.

## Event handlers

A function that deals with DOM events is called an "event handler". Event handlers are defined as follows:

```html
<login>
  <form onsubmit={ submit }>

  </form>

  // this method is called when above form is submitted
  submit(e) {

  }
</login>
```

Attributes beginning with "on" (`onclick`, `onsubmit`, `oninput` etc...) accept a function value which is called when the event occurs. This function can also be defined dynamically with an expression. For example:


```html
<form onsubmit={ condition ? method_a : method_b }>
```

In the function `this` refers to the current tag instance. After the handler is called `this.update()` is automatically called reflecting all the possible changes to the UI (unless you set `event.preventUpdate` in the handler).

### Event object

The event handler receives the standard event object as the first argument. The following properties are normalized to work across browsers:

- `e.currentTarget` points to the element where the event handler is specified.
- `e.target` is the originating element. This is not necessarily the same as `currentTarget`.
- `e.which` is the key code in a keyboard event (`keypress`, `keyup`, etc...).
- `e.item` is the current element in a loop. See [loops](#loops) for more details.


## Conditionals

Conditionals let you show / hide elements based on a condition. For example:

```html
<div if={ is_premium }>
  <p>This is for premium users only</p>
</div>
```

Again, the expression can be just a simple property or a full JavaScript expression. The following special attributes are available:

- `show` – show the element using `style="display: ''"` when the value is true
- `hide` – hide the element using `style="display: none"` when the value is true
- `if` – add (true value) or remove (false value) the element from the document

The equality operator is `==` and not `===`. For example: `'a string' == true`.

## Loops

Loops are implemented with `each` attribute as follows:

```html
<todo>
  <ul>
    <li each={ items } class={ completed: done }>
      <input type="checkbox" checked={ done }> { title }
    </li>
  </ul>

  this.items = [
    { title: 'First item', done: true },
    { title: 'Second item' },
    { title: 'Third item' }
  ]
</todo>
```

The element with the `each` attribute will be repeated for all items in the array. New elements are automatically added / created when the items array is manipulated using `push()`, `slice()` or `splice` methods for example.

### Context

A new context is created for each item. These are [tag instances](/api/#tag-instance). When loops are nested, all the children tags in the loop inherit any of their parent loop's properties and methods they themselves have `undefined`. In this way, Riot avoids overriding things that should not be overridden by the parent tag.

The parent can be explicitly accessed through the `parent` variable. For example:


```html
<todo>
  <div each={ items }>
    <h3>{ title }</h3>
    <a onclick={ parent.remove }>Remove</a>
  </div>

  this.items = [ { title: 'First' }, { title: 'Second' } ]

  remove(event) {

  }
</todo>
```

In the looped element everything but the `each` attribute belongs to the child context, so the `title` can be accessed directly and `remove` needs to be prefixed with `parent.` since the method is not a property of the looped item.

The looped items are [tag instances](/api/#tag-instance). Riot does not touch the original items so no new properties are added to them.


### Event handlers with looped items

Event handlers can access individual items in a collection with `event.item`. Now let's implement the `remove` function:

```html
<todo>
  <div each={ items }>
    <h3>{ title }</h3>
    <a onclick={ parent.remove }>Remove</a>
  </div>

  this.items = [ { title: 'First' }, { title: 'Second' } ]

  remove(event) {

    // looped item
    var item = event.item

    // index on the collection
    var index = this.items.indexOf(item)

    // remove from collection
    this.items.splice(index, 1)
  }
</todo>
```

After the event handler is executed the current tag instance is updated using `this.update()` (unless you set e.preventUpdate to true in your event handler) which causes all the looped items to execute as well. The parent notices that an item has been removed from the collection and removes the corresponding DOM node from the document.


### Looping custom tags

Custom tags can also be looped. For example:

```html
<todo-item each="{ items }" data="{ this }"></todo-item>
```

The currently looped item can be referenced with `this` which you can use to pass the item as an option to the looped tag.


### Non-object arrays

The array elements need not be objects. They can be strings or numbers as well. In this case you need to use the `{ name, i in items }` construct as follows:


```html
<my-tag>
  <p each="{ name, i in arr }">{ i }: { name }</p>

  this.arr = [ true, 110, Math.random(), 'fourth']
</my-tag>
```

The `name` is the name of the element and `i` is the index number. Both of these labels can be anything that's best suited for the situation.


### Object loops

Plain objects can also be looped. For example:

```html
<my-tag>
  <p each="{ value, name  in obj }">{ name } = { value }</p>

  this.obj = {
    key1: 'value1',
    key2: 1110.8900,
    key3: Math.random()
  }
</my-tag>
```

Object loops are not recommended since internally Riot detects changes on the object with `JSON.stringify`. The *whole* object is studied and when there is a change the whole loop is re-rendered. This can be slow. Normal arrays are much faster and only the changes are drawn on the page.


### Loops advanced tips

#### Performances

The default `each` directive algorithm will sync the position of the looped DOM nodes together with the items in your collection via `indexOf` lookup. This strategy might be not efficient in case you are dealing with big collections of data. In that case if your looped tags don't need to be reordered but just update their templates you can add the `no-reorder` options to them.

```html
<loop>
  <!-- `items` here might be a huge collection of data... -->
  <table>
    <tr each="{ item in items }" no-reorder>
      <td>
        { item.name }
      </td>
      <td>
        { item.surname }
      </td>
    </tr>
  </table>
</loop>
```

The table rows in the above example will be added/removed/updated without being reordered following the item position initially bound to them.

#### Key

<span class="tag red">&gt;= v3.7</span>

Adding the `key` attribute to the looped tags you will provide a more precise strategy to track your items position. This will improve massively the loop performance in case your collections are immutable.

```html
<loop>
  <ul>
    <li each={ user in users } key="id">{ user.name }</li>
  </ul>
  <script>
    this.users = [
      { name: 'Gian', id: 0 },
      { name: 'Dan', id: 1 },
      { name: 'Teo', id: 2 }
    ]
  </script>
</loop>
```

The `key` attribute can be generated also via expressions

```html
<loop>
  <ul>
    <li each={ user in users } key={ user.id() }>{ user.name }</li>
  </ul>
  <script>
    this.users = [
      { name: 'Gian', id() { return 0 } },
      { name: 'Dan', id() { return 1 } },
      { name: 'Teo', id() { return 2 } }
    ]
  </script>
</loop>
```

#### The `virtual` tag

In some cases you may need to loop some html without having a particular wrapper tag. In that case you can use the `<virtual>` tag that will be removed rendering just the html tags wrapped in it. For example:

```html
<dl>
  <virtual each={item in items}>
    <dt>{item.key}</dt>
    <dd>{item.value}</dd>
  </virtual>
</dl>
```

`virtual` however is not exclusive to looping and can be used in conjuction with `if` for any tag

```html
<virtual data-is="my-tag" if={condition}>
  <p>Show me with no wrapper on condition</p>
</virtual>
```

## HTML elements as tags

Standard HTML elements can be used as riot tags in the page body with the addition of the `data-is` attribute.

```html
<ul data-is="my-list"></ul>
```

This provides users with an alternative that can provide greater compatibility with css frameworks.  The tags are treated like any other custom tag.

```js
riot.mount('my-list')
```

will mount the `ul` element shown above as if it were `<my-list></my-list>`

Note that you can use also an expression in the `data-is` attribute and riot will be able to
render dynamically also different tags on the same DOM node

```html
<my-tag>
  <!-- dynamic component -->
  <div data-is={ component }></div>
  <button onclick={ switchComponent }>
    Switch
  </button>

  <script>
    this.component = 'foo'

    switchComponent() {
      // riot will render the <bar> component
      // replacing <foo>
      this.component = 'bar'
    }
  </script>
</my-tag>
```

## Server-side rendering

Riot supports server-side rendering with Node/io.js. You can `require` tags and render them:

```js
var riot = require('riot')
var timer = require('timer.tag')

var html = riot.render(timer, { start: 42 })

console.log(html) // <timer><p>Seconds Elapsed: 42</p></timer>
```

## Riot DOM Caveats

Riot tags rely on browsers rendering so you must be aware of certain situations where your components might not render properly their template.

Consider the following tag:

``` html

<my-fancy-options>
  <option>foo</option>
  <option>bar</option>
</my-fancy-options>
```

This markup is not valid if not injected in a `<select>` tag:

``` html

<!-- not valid, a select tag allows only <option> children -->
<select>
  <my-fancy-options />
</select>

<!-- valid because we will render the <option> tags using <select> as root node -->
<select data-is='my-fancy-options'></select>

```

Tags like `table, select, svg...` don't allow custom children tags so the use of custom riot tags (`<virtual>` included) is forbidden. Use `data-is` instead like demonstrated above. [more info](https://github.com/riot/riot/issues/2206)
