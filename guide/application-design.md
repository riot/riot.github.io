---
layout: default
title: Application design
---

{% include guide-tabs.html %}

## Tools, not policy

Riot comes bundled with custom tags, an event emitter (observable) and router. We believe that these are the fundamental building blocks for client-side applications:

1. Custom tags for the user interface,
2. Events for modularity, and
3. Router for URL and the back button.

Riot tries not to enforce strict rules, but rather provide basic tools for you to use creatively. This flexible approach leaves the bigger architectural decisions up to the developer.

We also think that these building blocks should be minimal in terms of file size and API size. Elementary stuff should be simple so there's minimal cognitive load.


## Observable

Observable is a generic tool to send and receive events. It's a common pattern to isolate modules without forming a dependency or "coupling". By using events a large program can be broken into smaller and simpler units. Modules can be added, removed, or modified without affecting the other parts of the application.

A common practice is to split the application into a single core and multiple extensions. The core sends events any time something remarkable happens: a new item is being added, an existing item is being removed, or something is loaded from the server.

By using the observable the extensions can listen to these events and react to them. They extend the core so that the core is not aware of these modules. This is called "loose coupling".

These extensions can be custom tags (UI components) or non-UI modules.

Once the core and events are carefully designed the team members are enabled to develop the system on their own without disturbing others.

[Observable API](/api/observable/)


## Routing

Router is a generic tool to take care of the URL and the back button. It's the smallest implementation you can find. It can do the following:

1. Change the hash part of the URL
2. Notify when the hash changes
3. Study the current hash

You can place routing logic everywhere; in custom tags or non-UI modules. Some application frameworks make the router a central element that dispatches work to the other pieces of the application. Some take a milder approach where URL events are like keyboard events, not affecting the overall architecture.

Every browser application needs routing since there is always an URL in the location bar.

[Router API](/api/route/)


## Modularity

Custom tags make the view part of your application. In modular application these tags should not be aware of each other and they should be isolated. Ideally you can use the same tag across projects regardless of the outer HTML layout.

If two tags know about each other they become dependent and a "tight coupling" is introduced. These tags cannot be freely moved around without breaking the system.

To reduce coupling, have the tags listen for events rather than call each other directly. What you need is a publish/subscribe system built with `riot.observable` or similar.

This event emitting system can range from a simple API to a larger architectural choice like Facebook Flux.

### Example Riot application design

Here is a very bare bones Riot application structure for user login:

```js
// Login API
var auth = riot.observable()

auth.login = function(params) {
  $.get('/api', params, function(json) {
    auth.trigger('login', json)
  })
}
```
```html
<!-- login view -->
<login>
  <form onsubmit="{ login }">
    <input name="username" type="text" placeholder="username">
    <input name="password" type="password" placeholder="password">
  </form>

  login() {
    opts.login({
      username: this.username.value,
      password: this.password.value
    })
  }

  // any tag on the system can listen to login event
  opts.on('login', function() {
    $(body).addClass('logged')
  })
</login>
```

And here we mount the application

```html
<body>
  <login></login>
  <script>riot.mount('login', auth)</script>
</body>
```

On the above setup the other tags on the system do not need to know about each other since they can simply listen to the "login" event and do what they please.

Observable is a classic building block for a decoupled (modular) application.
