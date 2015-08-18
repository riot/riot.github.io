---
title: Router
layout: default
class: apidoc
---

{% include api-tabs.html %}

The Riot Router is the most minimal riot.router implementation you can find and it works consistently on all browsers including IE9. It only listens to changes on the URL hash (the part after the `#` character). Most single page applications deal with the hash only but if you really care about full URL changes you should use a different riot.router implementation.

The Riot riot.router is best in routing schemes in which the route's hierarchical parts, after the "#", are separated with the "/" character. In that case Riot gives you direct access to these parts.


### riot.router(callback) | #riot.router

Execute the given `callback` when the URL hash changes. For example

```javascript
riot.router(function(collection, id, action) {

})
```

If for example the hash changes to `#customers/987987/edit` then in the above example the arguments would be:


```javascript
collection = 'customers'
id = '987987'
action = 'edit'
```

The hash can change in the following ways:

1. A new hash is typed into the location bar
2. When the back/forward buttons are pressed
3. When `riot.router(to)` is called

### riot.router.start() | #riot.router-start

Start listening the window hash changes and it's automatically called when riot gets loaded. You typically use this method together with [route.stop](#route-stop). Example:

```javascript
riot.router.stop() // clear all the old riot.router callbacks
riot.router.start() // start again
```

### riot.router.stop() | #riot.router-stop

Remove the hashchange listeners clearing also the [route.route](#route) callbacks.

```javascript
riot.router.stop()
```

Stopping the default riot.router allow the use of a different riot.router on your appliaction.

### riot.router(to) | #route-to

Changes the browser URL and notifies all the listeners assigned with `riot.router(callback)`. For example:

```javascript
riot.router('customers/267393/edit')
```

### riot.router.exec(callback) | #route-exec

Study the current hash "in place" using given `callback` without waiting for it to change. For example

```javascript
riot.router.exec(function(collection, id, action) {

})
```

### riot.router.parser(parser) | #route-parser

Changes the default parser to a custom one. Here's one that parses paths like this:

`!/user/activation?token=xyz`

```javascript
riot.router.parser(function(path) {
  var raw = path.slice(2).split('?'),
      uri = raw[0].split('/'),
      qs = raw[1],
      params = {}

  if (qs) {
    qs.split('&').forEach(function(v) {
      var c = v.split('=')
      params[c[0]] = c[1]
    })
  }

  uri.push(params)
  return uri
})
```

And here you'll receive the params when the URL changes:

```javascript
riot.router(function(target, action, params) {

  /*
    target = 'user'
    action = 'activation'
    params = { token: 'xyz' }
  */

})
```
