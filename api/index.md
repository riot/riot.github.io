---
title: Custom tags
layout: default
class: apidoc
---

{% include api-tabs.html %}


## Mounting

### <a name="mount"></a> riot.mount(customTagSelector, [opts])

`customTagSelector` selects elements from the page and mounts them with a custom tag. The selected elements' name must match the custom tag name.

`opts` optional object is passed for the tags to consume. This can be anything, ranging from a simple object to a full application API. Or it can be a Flux- store. Really depends on how you want to structure your client-side applications. Read more about [modular Riot applications](/guide/application-design/#modularity).


``` js
// selects and mounts all <pricing> tags on the page
var tags = riot.mount('pricing')

// mount all custom tags with a class name .customer
var tags = riot.mount('.customer')

// mount <account> tag and pass an API object as options
var tags = riot.mount('account', api)
```

@returns: an array of the mounted [tag instances](#tag-instance)

Note: users of [In-browser compilation](/guide/compiler/#in-browser-compilation) will need to wrap calls to `riot.mount` in `riot.compile` in order to get returned [tag instances](#tag-instance). Without this, calls to `riot.mount` will return `undefined`.

```javascript
<script>
riot.compile(function() {
  // here tags are compiled and riot.mount works synchronously
  var tags = riot.mount('*')
})
</script>
```

### <a name="mount-star"></a> riot.mount('*', [opts])

A special Riot specific selector "*" can be used to mount all custom tags on the page:

``` js
riot.mount('*')
```

@returns: an array of the mounted [tag instances](#tag-instance)

### <a name="mount-tag"></a> riot.mount(selector, tagName, [opts])

Where

- `selector` selects any DOM nodes from the page to be mounted
- `tagName` specifies the custom tag name to be used
- `opts` optional object is passed for the tags to consume


``` js
// mounts custom tag "my-tag" to div#main and pass api as options
var tags = riot.mount('div#main', 'my-tag', api)
```

@returns: an array of the mounted [tag instances](#tag-instance)

### <a name="mount-dom"></a> riot.mount(domNode, tagName, [opts])

Mount a custom tag named tagName on a given domNode passing optional data with opts. For example:

```
// mounts "users" tag to #slide node and pass api as options
riot.mount(document.getElementById('slide'), 'users', api)
```

@returns: an array of the mounted [tag instances](#tag-instance)

## Rendering

### <a name="render"></a> riot.render(tagName, [opts])

Rendering a tag to html. This method is only available on *server-side* (Node/io.js). For example:

```
// render "my-tag" to html
var mytag = require('my-tag')
riot.render(mytag, { foo: 'bar' })
```

@returns: tags render as html


## Tag instance

Following properties are set for each tag instance:

- `opts` - the options object
- `parent` - the parent tag if any
- `root` - root DOM node
- `tags` - nested custom tags


You can use these references in both the HTML and JavaScript code. For example:


``` html
<my-tag>
  <h3>{ opts.title }</h3>

  var title = opts.title
</my-tag>
```

You can freely set any data to the instance (aka "context") and they are available in the HTML expressions. For example:

``` html
<my-tag>
  <h3>{ title }</h3>

  this.title = opts.title
</my-tag>
```

Note: if you have some globals, you can also use these references in both the HTML and JavaScript code:

```js
window.someGlobalVariable = 'Hello!'
```

``` html
<my-tag>
  <h3>{ someGlobalVariable }</h3>

  var message = someGlobalVariable
</my-tag>
```


## Updating

### <a name="tag-update"></a> this.update()

Updates all the expressions on the current tag instance as well as on all the children. This method is automatically called every time an event handler is called when user interacts with the application.

Other than that riot does not update the UI automatically so you need to call this method manually. This typically happens after some non-UI related event: after `setTimeout`, AJAX call or on some server event. For example:

``` html
<my-tag>

  <input name="username" onblur={ validate }>
  <span class="tooltip" show={ error }>{ error }</span>

  var self = this

  validate() {
    $.get('/validate/username/' + this.username.value)
      .fail(function(error_message) {
        self.error = error_message
        self.update()
      })
  }
</my-tag>
```

On above example the error message is displayed on the UI after the `update()` method has been called. We assign `this` variable to `self` since inside the AJAX callback `this` variable points to the response object and not to the tag instance.

### <a name="tag-update-data"></a> this.update(data)

Set values of the current instance and update the expressions. This is same as `this.update()` but allows you to set context data at the same time. So instead of this:

``` js
self.error = error_message
self.update()
```

you can do this:

``` js
self.update({ error: error_message })
```

which is shorter and cleaner.

### <a name="update"></a> riot.update()

Updates all the mounted tags and their expressions on the page.

@returns: an array of [tag instances](#tag-instance) that are mounted on the page.



## Unmounting

### <a name="tag-unmount"></a> this.unmount(keepTheParent)

Detaches the tag and its children from the page. An "unmount" event is fired.
If you want to unmount a tag without removing the parent tag you need to pass `true` to the unmount method

Remove the tag from the DOM:

``` js
mytag.unmount()
```

Remove the tag children and keep only the parent tag:

``` js
mytag.unmount(true)
```

## Nested tags

You have access to nested tag instances via `tags` variable:

``` html
<my-tag>

  <child></child>

  // access to child tag
  var child = this.tags.child

</my-tag>
```

If more than one of the same child tag is used, it is accessed as an array `this.tags.child[n]`

You can also use the `name` attribute to give another name for the nested tag.

``` html
<my-tag>

  <child name="my_nested_tag"></child>

  // access to child tag
  var child = this.tags.my_nested_tag

</my-tag>
```

The child tags are initialized after the parent tag so the methods and properties are available on the "mount" event.

``` html
<my-tag>

  <child name="my_nested_tag"></child>

  // access to child tag methods
  this.on('mount', function() {
    this.tags.my_nested_tag.someMethod()
  })

</my-tag>
```

## <a name="yield"></a> Yielding nested HTML

The `<yield>` tag is a special riot core feature that allows you to inject and compile the content of any custom tag inside its template in runtime
This technique allows you to extend your tags templates with html contents rendered eventually from the server

For example using the following riot tag `my-post`

``` html
<my-post>
  <h1>{ opts.title }</h1>
  <yield/>
  this.id = 666
</my-post>
```

anytime you will include the `<my-post>` tag in your app

``` html
<my-post title="What a great title">
  <p id="my-content-{ id }">My beautiful post is just awesome</p>
</my-post>
```

once mounted `riot.mount('my-post')` it will be rendered in this way:

``` html
<my-post>
  <h1>What a great title</h1>
  <p id="my-content-666">My beautiful post is just awesome</p>
</my-post>
```

#### Multi-Transclusion

<span class="tag red">&gt;=2.3.12</span>

The `<yield>` tag also provides a slot mechanism that allows you to inject html contents on specific slots in the template

For example using the following riot tag `my-other-post`

``` html
<my-other-post>
  <article>
    <h1>{ opts.title }</h1>
    <h2><yield from="summary"/></h2>
    <div>
      <yield from="content"/>
    </div>
  </article>
</my-other-post>
```

anytime you will include the `<my-other-post>` tag in your app

``` html
<my-other-post title="What a great title">
  <yield to="summary">
    My beautiful post is just awesome
  </yield>
  <yield to="content">
    <p>And the next paragraph describes just how awesome it is</p>
    <p>Very</p>
  </yield>
</my-other-post>
```

once mounted `riot.mount('my-other-post')` it will be rendered in this way:

``` html
<my-other-post>
  <article>
    <h1>What a great title</h1>
    <h2>My beautiful post is just awesome</h2>
    <div>
      <p>And the next paragraph describes just how awesome it is</p>
      <p>Very</p>
    </div>
  </article>
</my-other-post>
```


#### Yield and loops

The `<yield>` tag could be used also in a loop or in a child tag but you should be aware that __it will be always parsed and compiled using the child data__

The following `blog.tag` riot component

``` html
<blog>
  <h1>{ title }</h1>
  <my-post each={ posts }>
    <a href={ this.parent.backToHome }>Back to home</a>
    <div onclick={ this.parent.deleteAllPosts }>Delete all the posts</div>
  </my-post>

  this.backToHome = '/homepage'
  this.title = 'my blog title'

  this.posts = [
    { title: "post 1", description: 'my post description' },
    { title: "post 2", description: 'my post description' }
  ]

  // the bind is needed in this case to keep the parent context
  // also in the child tags
  deleteAllPosts() {
    this.posts = []

    // we need to trigger manually the update function
    // because this function gets triggered from a child tag
    // and it does not bubble up automatically
    this.update()
  }.bind(this)

</blog>

<my-post>
  <h2>{ title }</h2>
  <p>{ description }</p>
  <yield/>
</my-post>
```

will be compiled in this way:

``` html
<blog>
  <h1>my blog title</h1>
  <my-post>
    <h2>post 1</h2>
    <p>my post description</p>
    <a href="/homepage">Back to home</a>
    <div>Delete all the posts</div>
  </my-post>
  <my-post>
    <h2>post 2</h2>
    <p>my post description</p>
    <a href="/homepage">Back to home</a>
    <div>Delete all the posts</div>
  </my-post>
</blog>
```

## Mixins

### <a name="mixin"></a> this.mixin(mixinObject)

Extends the current tag with the features available on mixinObject. For example:

```js
var OptsMixin = {
  // init method is a special one which can initialize
  // the mixin when it's loaded to the tag and is not
  // accessible from the tag its mixed in
  init: function() {
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

### <a name="mixin-shared"></a> riot.mixin(mixinName, mixinObject)

Register a shared mixin, globally available to be used in any tag: `this.mixin(mixinName)`.

### <a name="mixin-global"></a> riot.mixin(mixinObject)

Register a global mixin, and automatically adds it to all tag instances.

## Events

Each tag instance is an [observable](./observable) so you can use `on` and `one` methods to listen to the events that happen on the tag instance. Here's the list of supported events:


- "update" – right before the tag is updated. allows recalculation of context data before the UI expressions are updated.
- "updated" – right after the tag is updated. allows do some work with updated DOM
- "before-mount" – right before tag is mounted on the page
- "mount" – right after tag is mounted on the page
- "before-unmount" – before the tag is removed from the page
- "unmount" – after the tag is removed from the page

For example:

``` js
// cleanup resources after tag is no longer part of DOM
this.on('unmount', function() {
  clearTimeout(timer)
})
```

## Reserved words

The above method and property names are reserved words for Riot tags. Don't use any of following as your instance variable or method name: `opts`, `parent`, `root`, `update`, `unmount`, `on`, `off`, `one` and `trigger`. Variables beginning with an underscore (e.g.: ```this._item```) are reserved for internal use too. Local variables can be freely named. For example:

``` javascript
<my-tag>

  // allowed
  function update() { }

  // not allowed
  this.update = function() { }

  // not allowed
  update() {

  }

</my-tag>
```

## Manual construction

### <a name="tag"></a> riot.tag(tagName, html, [css], [attrs], [constructor])

Creates a new custom tag "manually" without the compiler.

- `tagName` the tag name
- `html` is the layout with [expressions](/guide/#expressions)
- `css` is the style for the tag (optional)
- `attrs` string of attributes for the tag (optional).
- `constructor` is the initialization function being called before the tag expressions are calculated and before the tag is mounted

#### Example

``` javascript
riot.tag('timer',
  '<p>Seconds Elapsed: { time }</p>',
  'timer { display: block; border: 2px }',
  'class="tic-toc"',
  function (opts) {
    var self = this
    this.time = opts.start || 0

    this.tick = function () {
      self.update({ time: ++self.time })
    }

    var timer = setInterval(this.tick, 1000)

    this.on('unmount', function () {
      clearInterval(timer)
    })

  })
```

See [timer demo](http://jsfiddle.net/gnumanth/h9kuozp5/) and [riot.tag](/api/#tag-instance) API docs for more details and *limitations*.


<span class="tag red">Warning</span> by using `riot.tag` you cannot enjoy the advantages of the compiler and the following features are not supported:

1. Self-closing tags
2. Unquoted expressions. Write `value="{ val }"` instead of `value={ val }`
3. Boolean attributes. Write `__checked="{ flag }"` instead of `checked={ flag }`
4. Shorthand ES6 method signatures
5. `<img src={ src }>` must be written as `<img riot-src={ src }>` in order to avoid illegal server requests
6. `style="color: { color }"` must be written as `riot-style="color: { color }"` so that style attribute expressions work in IE
7. Scoped CSS precompilation.


You can take advantage of `<template>` or `<script>` tags as follows:

``` html
<script type="tmpl" id="my_tmpl">
  <h3>{ opts.hello }</h3>
  <p>And a paragraph</p>
</script>

<script>
riot.tag('tag-name', my_tmpl.innerHTML, function(opts) {

})
</script>
```

### riot.Tag(impl, conf, innerHTML)

<span class="tag red">experimental</span>

In riot 2.3 we have give you the access to the internal Tag instance in order to let you create your custom tags in more creative ways.

- `impl`
  - `tmpl` tag template
  - `fn(opts)` the callback function called on the mount event
  - `attrs` root tag html attributes as object (key => value)
- `conf`
  - `root` DOM node where you will mount the tag template
  - `opts` tag options
  - `isLoop` is it used in as loop tag?
  - `hasImpl` was already registered using riot.tag?
  - `item` loop item in the loop assigned to this instance
- `innerHTML` html that can be used replacing a nested `yield` tag in its template


For example using ES2015:

```js

class MyTag extends riot.Tag {
  constructor(el) {
    super({ tmpl: MyTag.template() }, { root: el })
    this.msg = 'hello'
  }
  bye() {
    this.msg = 'goodbye'
  }
  static template() {
    return `<p onclick="{ bye }">{ msg }</p>`
  }
}

new MyTag(document.getElementById('my-div')).mount()
```

The `riot.Tag` method is not recommended. You should use it only if you need to achieve special features not available with the previous riot methods
