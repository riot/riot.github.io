---
layout: default
title: Riot.js — A React-like user interface micro-library
description: Riot lets you build user interfaces with custom tags using simple and enjoyable syntax. It uses a virtual DOM similar to React but faster. Riot is very tiny compared to industry standards. We think there is a clear need for another UI library.
---

<div id="hero">
  <img src="/img/logo/riot240x.png">
  <h1>A React-like user interface micro-library</h1>
  <h4>Custom tags • Enjoyable syntax • Virtual DOM • Tiny size</h4>

  <div id="version-slurp">
    <a href="/download/" class="tag blue">v{{ site.version }}</a> &mdash;
    <a href="/release-notes/">{{ site.version_slurp }}&hellip;</a>
  </div>

</div>


# Why do we need a new UI library?

The frontend space is indeed crowded, but we honestly feel the solution is still "out there". We believe Riot offers the right balance for solving the great puzzle. While React seems to do it, they have serious weak points that Riot will solve.

So — here's why we need one:


## 1. Custom tags

Riot brings custom tags to all browsers.

``` html
<todo>

  <!-- layout -->
  <h3>{ opts.title }</h3>

  <ul>
    <li each={ item, i in items }>{ item }</li>
  </ul>

  <form onsubmit={ add }>
    <input>
    <button>Add #{ items.length + 1 }</button>
  </form>

  <!-- style -->
  <style scoped>
    h3 {
      font-size: 14px;
    }
  </style>

  <!-- logic -->
  <script>
    this.items = []

    add(e) {
      var input = e.target[0]
      this.items.push(input.value)
      input.value = ''
    }
  </script>

</todo>
```

A custom tag glues relevant HTML and JavaScript together forming a reusable component. Think React + Polymer but with enjoyable syntax and a small learning curve.


### Human-readable

Custom tags let you build complex views with HTML. Your application might look something like this:

``` html
<body>

  <h1>Acme community</h1>

  <forum-header/>

  <forum-content>
    <forum-threads/>
    <forum-sidebar/>
  </forum-content>

  <forum-footer/>

  <script>riot.mount('*', { api: forum_api })</script>
</body>
```

HTML syntax is the *de facto* language of the web and it's designed for building user interfaces. The syntax is explicit, nesting is inherent to the language, and attributes offer a clean way to provide options for custom tags.

Riot tags are [converted](/guide/compiler/) to pure JavaScript before browsers can execute them.


### Virtual DOM
- Absolutely the smallest possible amount of DOM updates and reflows
- One way data flow: updates and unmounts are propagated downwards from parent to children
- Expressions are pre-compiled and cached for high performance
- Lifecycle events for more control
- Server-side rendering of custom tags for universal (isomorphic) applications


### Close to standards
- No proprietary event system
- The rendered DOM can be freely manipulated with other tools
- No extra HTML root elements or `data-` attributes
- Plays well with jQuery


### Tooling friendly
- Create tags with ES6, Typescript, CoffeeScript, Jade, LiveScript or [any pre-processor](/guide/compiler/#pre-processors) you want
- Integrate with NPM, CommonJS, AMD, Bower or Component
- Develop with [Gulp](https://github.com/e-jigsaw/gulp-riot), [Grunt](https://github.com/ariesjia/grunt-riot) or [Browserify](https://github.com/jhthorsen/riotify) plugins



## 2. Simple and minimalistic

Minimalism sets Riot apart from others:


### 1. Enjoyable syntax

One of the design goals was to introduce a powerful tag syntax with as little boilerplate as possible:

- Power shortcuts: `class={ enabled: is_enabled, hidden: hasErrors() }`
- No extra brain load such as `render`, `state`, `constructor` or `shouldComponentUpdate`
- Interpolation: `Add #{ items.length + 1 }` or `class="item { selected: flag }"`
- The `<script>` tag to enclose the logic is optional
- Compact ES6 method syntax


### 2. Small learning curve

Riot has between 10 and 100 times fewer API methods than other UI libraries.

- Less to learn. Fewer books and tutorials to view
- Less proprietary stuff and more standard stuff


### 3. Tiny size


<small><em>react.min.js</em> – {{ site.react.size }}KB (gzip)</small>
<span class="bar red"></span>

<small><em>polymer.html</em> – {{ site.polymer.size }}KB (gzip)</small>
<span class="bar red" style="width: {{ site.polymer.size | divided_by: site.react.size | times: 100 }}%"></span>

<small><em>riot.min.js</em> – {{ site.size_min }}KB (gzip)</small>
<span class="bar blue" style="width: {{ site.size_min | divided_by: site.react.size | times: 100 }}%"></span>

- Fewer bugs
- Faster to parse and cheaper to download
- Embeddable. The library ought to be smaller than the application
- Less to maintain. We don't need a big team to maintain Riot



### 4. Small, but complete

Riot has all the essential building blocks for modern client-side applications:

- "Reactive" views for building user interfaces
- Event library for building APIs with isolated modules
- Router for taking care of URL and the back button

Riot is an "open stack". It's meant for developers who want to avoid framework specific idioms. The generic tools let you mix and match design patterns. Systems like Facebook Flux can be [self-made](https://github.com/jimsparkman/RiotControl).


> I looked at the riot.js example, and it feels so clean, it's scary. [@paulbjensen](https://twitter.com/paulbjensen/status/558378720403419137)

> Just messed around with #RiotJS for an hour. Got it setup with Gulp, Browsesify, and Babel in no time. I like it a lot so far! [@AndrewDelPrete](https://twitter.com/AndrewDelPrete/status/630976295011127296)

> Today I have used #riotjs 2.0 for the first time and I could admit that It will be a long term relationship #js highly recommended. [@gianlucaguarini](https://twitter.com/gianlucaguarini/status/559756081862574080)

> I liked the idea of #reactjs with #flux but I like #riotjs with #riotcontrol even better!
[@tscok](https://twitter.com/tscok/status/580509124598829056)

> looking at RiotJS https://muut.com/riotjs/ — blown away by its simplicity. [@defeated](https://twitter.com/defeated/status/559215403541757952)

> Played with riot.js and like it so much more than React. Minimalistic, fast and a comprehensible API. [@juriansluiman](https://twitter.com/juriansluiman/status/560399379035865088)


## Conclusion

Riot is Web Components for everyone. Think React + Polymer but without the bloat. It's intuitive to use and it weighs almost nothing. And it works today. No reinventing the wheel, but rather taking the good parts of what's there and making the simplest tool possible.

We should focus on reusable components instead of templates. According to the developers of React:

> "Templates separate technologies, not concerns."

By having related layout and logic together under the same component the overall system becomes cleaner. We respect React for this important insight.


## The initial blog entry

[From React to Riot 2.0](https://muut.com/blog/technology/riot-2.0/)


