---
layout: v2
title: Comparing Riot with React and Polymer
---

# **Riot** vs **React** & **Polymer**

And how Riot differs from its closest cousins.

## React

Riot is inspired by React and from the idea of "cohesion". According to Facebook developers:

> "Templates separate technologies, not concerns."

We respect this insight. The goal is to build reusable components instead of templates. By separating logic from the templates (by using jQuery selectors for example) we are actually keeping out things that should be together.

By combining these related technologies together under the same component the system becomes cleaner. We respect React because of this important insight.

React worked well for us, and we still use it in our [Disqus Importer](/importer/) but we were bothered by the size and syntax of React (*especially* the syntax). We started thinking it could be simpler; both internally and for the user.


### React syntax

The following example was taken directly from React's home page:


``` javascript
import React from 'react';
import ReactDOM from 'react-dom';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: [], text: ''};
  }

  render() {
    const {items, text} = this.state;
    return (
      <div>
        <h3>TODO</h3>
        <ul>
          <li>{items.map((item, i)=> <li key={i}>{item}</li>)}</li>
        </ul>
        <form onSubmit={this._onSubmit}>
          <input onChange={this._onChange} value={text}/>
          <button>Add #{items.length + 1}</button>
        </form>
      </div>
    );
  }

  _onChange(e) {
    this.setState({text: e.target.value});
  }

  _onSubmit(e) {
    e.preventDefault();
    const {items, text} = this.state;
    this.setState({
      items: items.concat(text),
      text: ''
    });
  }
}

ReactDOM.render(<Todo/>, mountNode);
```

JSX is mixture of HTML and JavaScript. You can include HTML anywhere on the component; inside methods and in property assignments.


### Riot syntax

The above React example written in Riot:

``` html
<todo>
  <h3>TODO</h3>

  <ul>
    <li each={ item, i in items }>{ item }</li>
  </ul>

  <form onsubmit={ handleSubmit }>
    <input>
    <button>Add #{ items.length + 1 }</button>
  </form>

  this.items = []

  handleSubmit(e) {
    var input = e.target[0]
    this.items.push(input.value)
    input.value = ''
  }
</todo>
```

And this is how the component is mounted on a page:

``` html
<todo></todo>

<script>riot.mount('todo')</script>
```

### Same, same — but different

In Riot, HTML and JavaScript are recognizable when compared to JSX, but with Riot they are distinct areas within the component rather than blended together and therefore challenging to read, however Riot does allow that HTML and JavaScript can be mixed within expressions.

No proprietary code, except the notation of enclosing expressions inside curly braces.

You see less boilerplate. Less brackets, commas, system properties and method names. Strings can be interpolated: `"Hello {world}"` instead of `"Hello " + this.state.world` and methods can be defined with compact ES6 syntax. Just less of everything with Riot

We believe Riot syntax is the cleanest way to separate layout and logic while enjoying the benefits of isolated reusable components.


### String based vs DOM based

When a component is initialized React parses a string and Riot traverses a DOM tree.

Riot takes the expressions from the tree and stores them in an array. Each expression has a pointer to a DOM node. On each run these expressions are evaluated and compared to the values in the DOM. When a value has changed the corresponding DOM node is updated. In a way Riot also has a virtual DOM, just a much simpler one.

Since these expressions can be cached an update cycle is very fast. Going through 100 or 1000 expressions usually takes 1ms or less.

The React sync algorithm is more complex because the HTML can change randomly after each update. Given the enormous challenge, Facebook developers did an impressive job with it.

We saw that the complex diff'ing can be avoided.

In Riot the HTML structure is fixed; a `div` cannot be converted to a `label` for example. Only loops and conditionals can add and remove elements. Riot only updates the expressions without complex subtree replacements.


### Flux and routing

React deals with the UI only, which is why Facebook recommends the use of [Flux](http://facebook.github.io/flux/docs/overview.html) to structure client-side code. It's more of a pattern than a framework and is packed with great ideas.

Riot also comes bundled with custom tags, an event emitter (observable) and router. We believe that these are the fundamental building blocks of client side applications. Events bring modularity, a router takes care of the URL and the back button and custom tags take care of the user interface.

Like Flux+React, Riot is flexible and leaves the bigger architectural decisions for the developer. It's just a library to help you achieve the goal.

You can build a Flux-like system by using Riot's event emitter and router. In fact such thing [already exists](https://github.com/jimsparkman/RiotControl).


### {{ site.compare.react }}x bigger

React (v{{ site.react.version }}) is {{ site.compare.react }}x bigger than Riot.

<small><em>react.min.js</em> – {{ site.react.size }}KB (gzip)</small>
<span class="bar red"></span>

<small><em>riot.min.js</em> – <span class="riot-size">{{ site.size_min }}KB (gzip)</span></small>
<span class="bar blue" style="width: {{ site.size_min | divided_by: site.react.size | times: 100 }}%"></span>

<br>

The recommended React router (v{{ site.react_router.version }}) is {{ site.compare.react_router_vs_riot_router }}x larger than Riot router.

<small><em>react-router.min.js</em> – {{ site.react_router.size }}KB (gzip)</small>
<span class="bar red"></span>

<small><em>react-mini-router.min.js</em> – {{ site.react_mini_router.size }}KB (gzip)</small>
<span class="bar red" style="width: {{ site.react_mini_router.size | divided_by: site.react_router.size | times: 100 }}%"></span>

<small><em>riot.route.min.js</em> – {{ site.riot_route_size_min }}KB (gzip)</small>
<span class="bar blue" style="width:{{ site.riot_route_size_min | divided_by: site.react_router.size | times:100 }}%"></span>

Admittedly this router comparison is a bit unfair because [react-router](https://github.com/rackt/react-router) has a lot more features. But the above chart clearly highlights the goal of Riot: to provide the most minimalistic API for the job.

The React ecosystem is more of a framework and favors larger API surfaces. The bigger alternative is more popular than [react-mini-router](https://github.com/larrymyers/react-mini-router) in the React community.


## Polymer

Polymer takes the Web Component standard and enables it for the latest browsers. This allows you to write custom tags in a standard manner.

Conceptually Riot is the similar, but there are differences:

1. The Web Components syntax is experimental and complex.

2. Riot updates only the elements that have changed resulting to less DOM operations.

3. Individual components are imported with HTML `link rel="import"`. Polyfills must resort to queued up XHRs, which makes it painfully slow unless the dedicated [vulcanize](https://github.com/polymer/vulcanize) tool is used. Riot tags are imported with `script src` and multiple tags can be combined with regular tooling.

4. No ability to perform server side rendering.


### {{ site.compare.polymer_and_webcomponents }}x bigger

Polymer(v{{ site.polymer.version }}) + WebComponents(v{{ site.webcomponents.version }}) is {{ site.compare.polymer_and_webcomponents }}x bigger than Riot

<small><em>polymer.min.js</em> – {{ site.polymer.size }}KB (gzip)</small>
<span class="bar red"></span>

<small><em>riot.min.js</em> – <span class="riot-size">{{ site.size_min }}KB (gzip)</span></small>
<span class="bar blue" style="width: {{ site.size_min | divided_by: site.polymer.size | times: 100 }}%"></span>

Web components are said to be the [king of all polyfilling challenges](http://developer.telerik.com/featured/web-components-arent-ready-production-yet/) and this is why Polymer requires such a large amount of code.


## Web components

While web components is an accepted standard it will take [years](http://caniuse.com/#search=web%20components) before it is  fully adopted, but eventually the web will be built using web components, yet due to their complexity there is a significant chance that web components never be used directly by developers, but through a UI library like Riot. Just like developers continue to use jQuery today.

The goal of Riot is to make UI development as easy as possible, by providing an easy to use, stable API that applications can rely upon to build web components today for tomorrow, while web components continue to evolve. Far into the future, once web component specs have fully evolved and reached market saturation Riot may start to use them *internally* (within the library) if there is any benefit to doing so, such as performance improvements.

We like to think of Riot as the "jQuery for web components" and we hope you will too.




