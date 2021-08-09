---
layout: home
title: Riot.js — Simple and elegant component-based UI library
description: Riot.js lets you build user interfaces with custom tags using simple and enjoyable syntax.
---

## Why do we need a new UI library?

The frontend space is indeed crowded, but we honestly feel the solution is still "out there". We believe Riot.js offers the right balance for solving the great puzzle.

So — here's why we need one:


### 1. Custom elements

Riot.js brings custom elements to all modern browsers without the use of any polyfill!

``` html
<todo>
  <!-- layout -->
  <h1>{ props.title }</h1>

  <ul>
    <li each={ item in state.items }>{ item }</li>
  </ul>

  <form onsubmit={ add }>
    <input name="todo">
    <button>Add #{ state.items.length + 1 }</button>
  </form>

  <!-- style -->
  <style>
    :host {
      padding: 16px;
    }
  </style>

  <!-- logic -->
  <script>
    export default {
      state: {
        items: []
      },
      add(e) {
        e.preventDefault()
        const input = e.target.todo

        this.state.items.push(input.value)
        this.update()

        input.value = ''
      }
    }
  </script>
</todo>
```

A custom element glues relevant HTML and JavaScript together forming a reusable component. It is designed to offer you everything you wished native the web components API looked like.

#### Human-readable

Custom tags let you build complex views with HTML. Your application might look something like this:

``` html
<body>
  <h1>Riot.js application</h1>

  <my-header class="js-component"/>

  <main>
    <my-articles class="js-component"/>
    <my-sidebar class="js-component"/>
  </main>

  <my-footer class="js-component"/>

  <script>
    riot.mount('.js-component', { store: createApplicationStore() })
  </script>
</body>
```

HTML syntax is the *de facto* language of the web and it's designed for building user interfaces. The syntax is explicit, nesting is inherent to the language, and attributes offer a clean way to provide options for custom tags.

Riot.js tags are [compiled]({{ '/compiler/' | prepend:site.baseurl }}) to pure JavaScript before browsers can execute them.


#### Performant and predictable
- Absolutely the smallest possible amount of DOM updates and reflows.
- Fast expressions bindings instead of virtual DOM memory performance issues and drawbacks.
- One way data flow: updates and unmounts are propagated downwards from parent to children
- Expressions are pre-compiled and cached for high performance
- Lifecycle events for more control
- Server-side rendering of custom tags for universal (isomorphic) applications


#### Close to standards
- Future proof thanks to the JavaScript module syntax.
- The rendered DOM can be freely manipulated with other tools
- Web Components like API
- No need for external polyfills or additional libraries
- No proprietary event system
- No extra HTML root elements, data-attributes or fancy custom attributes.



#### Tooling friendly
- Create components with TypeScript, Rust, JavaScript Next or [any pre-processor](https://riot.js.org/compiler/#pre-processors) you want.
- Build with [@riotjs/cli](https://github.com/riot/cli), [webpack](https://github.com/riot/webpack-loader), [Rollup](https://github.com/riot/rollup-plugin-riot), [Parcel](https://github.com/riot/parcel-plugin-riot), [Browserify](https://github.com/riot/riotify).
- Test with whatever you like, you can [load your Riot tags directly in node](https://github.com/riot/ssr#render---to-render-only-markup)


## 2. Simple and minimalistic

Minimalism sets Riot.js apart from others:

### 1. Enjoyable syntax

One of the design goals was to introduce a powerful tag syntax with as little boilerplate as possible:

- No extra brain load for attributes like `className`, `htmlFor`...
- Shortcut spread operator for multiple attributes: `<p { ...attributes }></p>`
- Expressions Interpolation: `Add #{ items.length + 1 }` or `class="item { activeClass }"`
- `export default` statement to define the tag's public interfaces
- No side effects due to asynchronous rendering or `Proxy` objects
- Functional API over OOP class-based syntax
- Automatic CSS styling via `<style>` tag without shadow DOM hassle


### 2. Small learning curve

Riot.js has between 10 and 100 times fewer API methods than other UI libraries.

- Less to learn. Fewer books and tutorials to view
- Only 3 template directives to learn `if`, `each` and `is`
- Less proprietary stuff
- No new syntax to learn
- No "magic" or "smart" reactive properties or hooks
- Explicit behaviors over implicit assumptions


### 3. Tiny size

{% include libraries_comparison.html %}

- Only {{ site.data.libraries.riot.size }}kb!
- Fewer bugs
- Faster to parse and cheaper to download
- Embeddable. The library ought to be smaller than the application
- Less to maintain. We don't need a big team to maintain Riot


### 4. Small, but complete

Riot.js has all the essential building blocks for modern client-side applications:

- Modular views for building user interfaces
- High performance with many DOM nodes
- Highly extensible and not opinionated

Riot.js is an "open stack". It's meant for developers who want to avoid framework-specific idioms. The generic tools let you mix and match design patterns you prefer most.

#### Powerful and modular ecosystem

The Riot.js ecosystem is completely modular. It's designed to let you pick only the stuff you really need:

  - [@riotjs/cli](https://github.com/riot/cli) - CLI to compile locally your tags to JavaScript
  - [@riotjs/ssr](https://github.com/riot/ssr) - Super simple server side rendering
  - [@riotjs/hydrate](https://github.com/riot/hydrate) - Hydration strategy for your SPA
  - [@riotjs/route](https://github.com/riot/route) - Isomorphic router
  - [@riotjs/lazy](https://github.com/riot/lazy) - Lazy components loader
  - [@riotjs/hot-reload](https://github.com/riot/hot-reload) - Live reload plugin
  - [@riotjs/compiler](https://github.com/riot/compiler) - Advanced tags compiler
  - [@riotjs/parser](https://github.com/riot/parser) - HTML parser
  - [@riotjs/dom-bindings](https://github.com/riot/dom-bindings) - Expressions based template engine
  - [@riotjs/custom-elements](https://github.com/riot/custom-elements) - native custom elements implementation

## Conclusion

Riot.js is Web Components for everyone. Its API is heavily inspired by Vue.js but it contains just the bare minimum to build a modern frontend project. It's intuitive to use and it weighs almost nothing. It works today. No reinventing the wheel, but rather taking the good parts of what's there and making the simplest tool possible.

The Riot.js design was driven by [*The Zen of Python, by Tim Peters*](https://en.wikipedia.org/wiki/Zen_of_Python) philosophy, that's our mantra:

> Beautiful is better than ugly.<br/>
> Explicit is better than implicit.<br/>
> Simple is better than complex.<br/>
> Complex is better than complicated.<br/>
> Flat is better than nested.<br/>
> Sparse is better than dense.<br/>
> Readability counts.<br/>
> Special cases aren't special enough to break the rules.<br/>
> Although practicality beats purity.<br/>
> Errors should never pass silently.<br/>
> Unless explicitly silenced.<br/>
> In the face of ambiguity, refuse the temptation to guess.<br/>
> There should be one-- and preferably only one --obvious way to do it.<br/>
> Although that way may not be obvious at first unless you're Dutch.<br/>
> Now is better than never.<br/>
> Although never is often better than *right* now.<br/>
> If the implementation is hard to explain, it's a bad idea.<br/>
> If the implementation is easy to explain, it may be a good idea.<br/>
> Namespaces are one honking great idea -- let's do more of those!
