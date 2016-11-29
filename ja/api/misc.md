---
title: Miscellaneous
layout: default
class: apidoc
---

{% include api-tabs.html %}


### <a name="version"></a> riot.version

The current version number as String: `'{{ site.version }}'`


### <a name="brackets"></a> riot.settings.brackets

A global Riot setting to customize the start and end tokens of the expressions. For example


``` js
riot.settings.brackets = '[% %]'
```

let's you write expressions `<p>[% like_this %]</p>`. The start and end is separated with a space character.

### <a name="asyncrendertimeout"></a> riot.settings.asyncRenderTimeout

It allows you to change the `riot.renderAsync` timeout (default 1000ms)

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

[source code](https://github.com/riot/riot/blob/next/lib/browser/common/util/dom.js)

### <a name="util"></a> riot.util.check

Series of helper functions needed for type checking

[source code](https://github.com/riot/riot/blob/next/lib/browser/common/util/check.js)

### <a name="util"></a> riot.util.misc

Helper functions like `extend` to extend objects or `each` to loop arrays

[source code](https://github.com/riot/riot/blob/next/lib/browser/common/util/misc.js)

### <a name="util"></a> riot.util.tags

Methods needed to manage internally all the riot tags instances

[source code](https://github.com/riot/riot/blob/next/lib/browser/common/util/tags.js)
