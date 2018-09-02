---
title: Custom tags
layout: default
class: apidoc
---

{% include api-tabs.html %}


## Mounting

### <a name="mount"></a> riot.mount(customTagSelector, [opts])

`customTagSelector` selects elements from the page and mounts them with a custom tag. The selected elements' name must match the custom tag name.

`opts` optional object is passed for the tags to consume. This can be anything, ranging from a simple object to a full application API. Or it can be a Flux- store. Really depends on how you want to structure your client-side applications. Read more about [modular Riot applications](/guide/application-design/#modularity). *Also note* that attributes you set on your tags as options will take precedence over ones specified with same names via `opts` argument.


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
riot.compile(function() {
  // here tags are compiled and riot.mount works synchronously
  var tags = riot.mount('*')
})
```

### <a name="mount-star"></a> riot.mount('*', [opts])

A special Riot specific selector "*" can be used to mount all custom tags on the page:

``` js
riot.mount('*')
```

@returns: an array of the mounted [tag instances](#tag-instance)

<span class="tag red">&gt;=3.12.0</span>

The `opts` argument can be also a function in order to avoid sharing the same object across several tag instances [riot/2613](https://github.com/riot/riot/issues/2613)

``` js
riot.mount('my-tag', function() {
  return {
    custom: 'option'
  }
})
```

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

### <a name="unregister"></a> riot.unregister(tagName)

Unregistering a tag previously created via compiler or via `riot.tag()`
This method could be handy in case you need to test your app and you want to create multiple
tags using the same name for example

```js
// create a test tag
riot.tag('test-tag', '<p>{ message }</p>')

// mount it
var tag = riot.mount(document.createElement('div'), 'test-tag')[0]
expect(tag.root.querySelector('p')).to.be.ok

// unregister the tag
riot.unregister('test-tag')

// recreate the same tag using a different template
riot.tag('test-tag', '<div>{ message }</div>')
```

## Rendering

### <a name="render"></a> riot.render(tagName, [opts])

Rendering a tag to html.<br/>
__Only available on *server-side*__. For example:

```
// render "my-tag" to html
var mytag = require('my-tag')
riot.render(mytag, { foo: 'bar' })
```

@returns: tags render as html


### <a name="mount-dom"></a> riot.require(tagPath, [opts])
Requiring and compiling riot tags in runtime<br/>
__Only available on *server-side*__.<br/>
It works like `require('./my-tag.tag')` but it gives you the possibility to compile your tags using any of the given [riot-compiler options](/api/compiler/#on-server). For example you can require and use a preprocessor at same time.

```js
var tag = riot.require('./my-tag.jade', { template: 'jade' })
```

@returns: the tag name

### <a name="renderasync"></a> riot.renderAsync(tagName, [opts])

Rendering asynchronously a tag to html.<br/>
__Only available on *server-side*__.<br/>
This method returns a promise that will be resolved only when a "ready" event will be triggered by your tags during the mounting process. For example:

#### On the server:
```js
riot.renderAsync(tagName, opts)
  .then(function(html) {
    // do something with your html
  })
  .catch(function(e) {
    // it took too much time!
  })
```

#### In your tag:
```html
<async-rendering>
  <p>{ message }</p>

  <script>
    this.message = 'hi'

    setTimeout(function() {
      // triggering the "ready" event will resolve the promise
      this.trigger('ready')
    }.bind(this), 500)
  </script>
</async-rendering>
```

It's important to notice that if the "ready" event will not be triggered, the promise will be rejected after 1 second.
You can configure the internal riot promises timeout via `riot.settings.asyncRenderTimeout` (default 1000ms)

@returns: Promise


## Tag instance

Following properties are set for each tag instance:

- `opts` - the options object
- `refs` - named DOM nodes to cache
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

You can skip the riot automatic updates by setting the `preventUpdate = true` property to your event object for example:

``` html
<my-tag>
  <button onclick={ click }>{ message }</button>

  <script>
    this.message = 'hi'

    click(e) {
      e.preventUpdate = true // your tag will not update automatically
      this.message = 'goodbye'
    }
  </script>
</my-tag>
```

Other than that riot does not update the UI automatically so you need to call this method manually. This typically happens after some non-UI related event: after `setTimeout`, AJAX call or on some server event. For example:

``` html
<my-tag>

  <input name="username" onblur={ validate }>
  <span class="tooltip" show={ error }>{ error }</span>

  <script>
    validate() {
      $.get('/validate/username/' + this.username.value)
        .fail(function(error_message) {
          this.error = error_message
          this.update()
        }.bind(this))
    }
  </script>
</my-tag>
```

On above example the error message is displayed on the UI after the `update()` method has been called. (We are able to keep using `this` in reference to our tag instance because we `.bind(this)` in our network call's `fail` handler.)

If you want to have more control over your tags DOM updates you can set a custom `shouldUpdate` function, and your tag will update only if that function will return `true`

``` html
<my-tag>
  <button onclick={ click }>{ message }</button>

  <script>
    this.message = 'hi'

    click(e) {
      this.message = 'goodbye'
    }
    // data here is what you have passed to your update method
    // in case of this.update() it will be undefined
    shouldUpdate(data, nextOpts) {
      // do not update
      if (this.message === 'goodbye') return false
      // if this.message is different from 'goodbye' we could update the tag
      return true
    }
  </script>
</my-tag>
```

The `shouldUpdate` method will always receive 2 arguments: the first one contains the values you want to update via the `tag.update` method and the second argument will be the new options received via tag attributes and normally stored in the `opts` object.

``` html
<my-tag>
  <child-tag message={ message }></child-tag>
  <button onclick={ click }>Say goodbye</button>

  <script>
    this.message = 'hi'

    click(e) {
      this.message = 'goodbye'
    }
  </script>
</my-tag>

<child-tag>
  <p>{ opts.message }</p>

  <script>
    shouldUpdate(data, nextOpts) {
      // update the DOM depending on the new options received
      return nextOpts.message !== 'goodbye'
    }
  </script>
</child-tag>
```


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
  <script>
    this.on('mount', function() {
      // access to child tag
      var child = this.tags.child
    })
  </script>
</my-tag>
```

If more than one of the same child tag is used, it is accessed as an array `this.tags.child[n]`

You can also use the `ref` attribute to give another name for the nested tag.

``` html
<my-tag>

  <child ref="my_nested_tag"></child>

  <script>
    this.on('mount', function() {
      // access to child tag
      var child = this.refs.my_nested_tag
    })
  </script>
</my-tag>
```

The child tags are initialized after the parent tag so the methods and properties are available on the "mount" event.

``` html
<my-tag>

  <child ref="my_nested_tag"></child>

  <script>
    // access to child tag methods
    this.on('mount', function() {
      this.refs.my_nested_tag.someMethod()
      // this.tags.child.someMethod() is also valid
    })
  </script>
</my-tag>
```

## <a name="yield"></a> Yielding nested HTML

The `<yield>` tag is a special riot core feature that allows you to inject and compile the content of any custom tag inside its template in runtime.
For example using the following riot tag `my-post`

``` html
<my-post>
  <h1>{ opts.title }</h1>
  <yield/>

  <script>
    this.id = 666
  </script>
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

<span class="tag red">Warning</span> The yielded expressions **will be always evaluated from the context where they will be included** for example

``` html
<!-- This tag just inherits the yielded DOM -->
<child-tag><yield/></child-tag>

<my-tag>
  <child-tag>
    <p>{ parent.message }</p>
  </child-tag>
  <script>
    // notice that the yielded markup points to the parent.message
    // { message } is wrong here because it's evaluated under the <child-tag> context
    this.message = 'hi'
  </script>
</my-tag>
```

#### Multi-Transclusion

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

  <script>
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
    }
  </script>
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

Extends the current tag with functionality available on mixinObject. For example:

```js
var OptsMixin = {
  // init method is a special one which can initialize
  // the mixin when it's loaded to the tag and is not
  // accessible from the tag its mixed in
  // `opts` here is the option object received by the tag as well
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

The above method and property names are reserved words for Riot tags. Don't use any of following as your instance variable or method name: `opts`, `parent`, `tags`, `root`, `refs`, `update`, `unmount`, `on`, `off`, `one` and `trigger`. Variables beginning with an underscore (e.g.: ```this._item```) are reserved for internal use too. Local variables can be freely named. For example:

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
2. Unquoted expressions. Write `attr="{ val }"` instead of `attr={ val }`
3. Shorthand ES6 method signatures
4. `<img src={ src }>` must be written as `<img riot-src={ src }>` in order to avoid illegal server requests
5. `<input value={ val }>` must be written as `<img riot-value={ val }>` in order to avoid unexpected IE issues
5. `style="color: { color }"` must be written as `riot-style="color: { color }"` so that style attribute expressions work in IE
6. Scoped CSS precompilation.


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


#### Tags without template

<span class="tag red">&gt;=3.5.0</span>

Starting from riot 3.5 you can also create "wrapper tags" without any template as follows:

``` js
riot.tag('tag-name', false, function(opts) {
  this.message = 'hi'
})

```

In this case anytime you will mount a tag named `tag-name` riot will leave the tag markup untouched parsing and rendering only the expressions contained in it:

```html
<html>
<body>
  <tag-name>
    <p>I want to say { message }</p>
  </tag-name>
</body>
</html>
```

This technique might be used to enhance serverside rendered templates.
It will allow you also creating new tags composition patterns wrapping logic agnostic children components communicating with wrapper tags where you can handle your application logic:


```html
<form-validator>
  <date-picker onchange={ updateDate } />
  <color-picker onchange={ pickAColor } />
  <errors-reporter if={ errors.length } errors={ errors }/>
</form-validator>
```

### riot.Tag(el, [opts])

The riot.Tag constructor will allow you to create and extend your tags using `es6` classes.
If you want to create your riot tag you need to extend the `riot.Tag` constructor:

```js
class MyTag extends riot.Tag {
  // mandatory in order to use and identify this component
  get name() {
    return 'my-tag'
  }
  get tmpl() {
    return `<p onclick="{ click }">{ message }, Dear user</p>`
  }
  get attrs() {
    return 'class="{ className }"'
  }
  get css() {
    return 'my-tag p{ color: blue; }'
  }
  onCreate(opts) {
    this.message = opts.message
  }
  click() {
    this.message = 'goodbye'
  }
}

new MyTag(
  document.getElementById('my-div'),
  { message: 'hi' }
).mount()
```

You can also combine your riot tags extending them starting from a common ancestor

```js
class Logger extends riot.Tag {
  get name() {
    return 'logger'
  }
  get tmpl() {
    return `<div>{ opts.log }</div>`
  }
}

class ErrorLogger extends Logger {
  get name() {
    return 'error-logger'
  }
  get css() {
    return 'error-logger div { color: red; }'
  }
}

class SuccessLogger extends Logger {
  get name() {
    return 'success-logger'
  }
  get css() {
    return 'success-logger div { color: green; }'
  }
}

new ErrorLogger(
  document.querySelector('.error'),
  { log: 'oups!!!' }
).mount()

new SuccessLogger(
  document.querySelector('.success'),
  { log: 'well done!!!' }
).mount()
```
