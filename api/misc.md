---
title: Miscellaneous
layout: default
class: apidoc
---

{% include api-tabs.html %}


### <a name="version"></a> riot.version

The current version number as String: `'{{ site.version }}'`

### <a name="keepvalueattributes"></a> riot.settings.keepValueAttributes (default `false`)

<span class="tag red">&gt;= v3.13</span>

Riot removes by default all the falsy attribute expressions. However in some cases like for the `<input>` elements the `value` attribute should be always preserved [see also issue/2629](https://github.com/riot/riot/issues/2629). By setting `keepValueAttributes=true` riot will no longer remove the the `value` attributes even if its value is falsy.


``` js
riot.settings.keepValueAttributes = true
```

### <a name="skipanonymoustags"></a> riot.settings.skipAnonymousTags (default `true`)

<span class="tag red">&gt;= v3.2</span>

In riot any new tag in a loop will create new riot tag instance. This will happen for custom tags and also for `anonymous` tags like `<li each={ item in items }>{ item }</li>`. In the last case riot will create lighter tag instances because they should not be observable and don't need to be passed to the riot mixins. This will massively speed up the rendering process.
However riot versions lower than 3.2 used to instanciate all the `anonymous` tags as full custom tags instances. With the `skipAnonymousTags = false` the `anonymous` tags will be no longer created as light tag instances and your app might become ~30% slower.

``` js
riot.settings.skipAnonymousTags = false
```

### <a name="autoupdate"></a> riot.settings.autoUpdate (default `true`)

<span class="tag red">&gt;= v3.6</span>

The update events will be automatically triggered in riot tags containing DOM handlers (like `onclick`) when an user will dispatch any of them. Setting the `autoUpdate` option to false you will disable this behavior and will need to manually trigger your tags updates.

``` js
riot.settings.autoUpdate = false
```

### <a name="brackets"></a> riot.settings.brackets (default `{ }`)

A global Riot setting to customize the start and end tokens of the expressions. For example


``` js
riot.settings.brackets = '[% %]'
```

let's you write expressions `<p>[% like_this %]</p>`. The start and end is separated with a space character.


### <a name="asyncrendertimeout"></a> riot.settings.asyncRenderTimeout

It allows you to change the `riot.renderAsync` timeout (default `1000`)

```js
riot.settings.asyncRenderTimeout = 2000 // ms
```

### <a name="util"></a> riot.util.tmpl

Point to the internal riot template engine

### <a name="tmpl-errors"></a> riot.util.tmpl.errorHandler

Utility hook function to catch all the errors swallowed by the riot template engine

```js
riot.util.tmpl.errorHandler = function (err) {
  console.error(err.message + ' in ' + err.riotData.tagName) // your error logic here
}
```

### <a name="util"></a> riot.util.styleManager

It's the object that we use to append and create the custom tags css

### <a name="util"></a> riot.util.vdom

Expose the internal riot tags cache in order to query, debug, filter.. all the tags instances created

```js
riot.tag('foo', '<p>{ msg }</p>', function() {
  this.msg = 'hi'
})
riot.mount('foo')
console.log(riot.vdom[0].msg) // 'hi'
```

### <a name="util"></a> riot.util.dom

Series of utility functions to update DOM nodes like `$` to query nodes or `addAttr` to add attributes to a node

[source code](https://github.com/riot/riot/blob/master/lib/browser/common/util/dom.js)

### <a name="util"></a> riot.util.check

Series of helper functions needed for type checking

[source code](https://github.com/riot/riot/blob/master/lib/browser/common/util/check.js)

### <a name="util"></a> riot.util.misc

Helper functions like `extend` to extend objects or `each` to loop arrays

[source code](https://github.com/riot/riot/blob/master/lib/browser/common/util/misc.js)

### <a name="util"></a> riot.util.tags

Methods needed to manage internally all the riot tags instances

[source code](https://github.com/riot/riot/blob/master/lib/browser/common/util/tags.js)
