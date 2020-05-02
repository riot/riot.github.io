---
title: API
layout: detail
description: Framework API, methods and properties
---


## Core API

### riot.mount

`riot.mount(selector: string, props?: object, componentName?: string): [RiotComponent]`

1. `selector` selects elements from the page and mounts them with a custom component. The selected elements' name must match the custom tag name. DOM nodes having the `is` attribute can also be automounted.

2. `props` optional object passed for the component to consume. This can be anything, ranging from a simple object to a full application API. Or it can be a Flux- store. Really depends on how you want to structure your client-side applications. Also note that attributes you set on your tags will take precedence over ones specified with same names via a `props` argument.

3. `componentName` optional component name in case the node to mount can't be automounted by Riot.

<strong>@returns: </strong>an array of the mounted [component objects](#component-object)


Examples:

``` js
// selects and mounts all <pricing> tags on the page
const components = riot.mount('pricing')

// mount all tags with a class name .customer
const components = riot.mount('.customer')

// mount <account> tag and pass an API object as options
const components = riot.mount('account', api)

// mount <div id="root"> tag passing the API object using the previously registered `app` component
const components = riot.mount('#root', api, 'app')
```

Note: users of [in-browser compilation]({{ '/compiler/#in-browser-compilation' | prepend:site.baseurl }}) will need to wait for the compilation of components before calling the `riot.mount` method.

```javascript
(async function main() {
  await riot.compile()

  const components = riot.mount('user')
}())
```

The `props` argument can be also a function in order to avoid sharing the same object across several tag instances ([see riot/2613](https://github.com/riot/riot/issues/2613)).

``` js
riot.mount('my-component', () => ({
  custom: 'option'
}))
```

`riot.mount` won't clean existent children nodes under the target component. After SSR, if you want to mount the component on the client side for user interaction, there is a different way to solve that. Please check [@riotjs/hydrate](https://github.com/riot/hydrate#usage).


### riot.unmount

`riot.unmount(selector: string, keepRootElement?: boolean): [HTMLElement]`

1. `selector` selects elements from the page and unmounts them if they were mounted before.
2. `keepRootElement` boolean optional parameter that can be used to avoid removing the root nodes from the DOM {% include version_badge.html version=">=4.3.0" %}

```js
// Select all the <user> tags and unmount them
riot.unmount('user')
```

If the `keepRootElement` parameter will be true the root nodes will be left into the DOM.

```js
// Select all the <user> tags, unmount them but leave their root nodes into the DOM
riot.unmount('user', true)
```

<strong>@returns: </strong>list of unmounted nodes

### riot.component

`riot.component(component: RiotComponentShell): function`

1. `component` - [a component shell object](#component-shell-interface)

<strong>@returns: </strong>a function to create [component objects](#component-object)

The `riot.component` method can be used to create and mount components without registering them globally:

```js
import * as riot from 'riot'
import App from './app.riot'

const createApp = riot.component(App)

const app = createApp(document.getElementById('root'), {
  name: 'This is a custom property'
})
```

{% include version_badge.html version=">=4.7.0" %}

The factory function created by `riot.component` also accepts a third optional argument that can contain [valid `slots` and `attributes` objects](https://github.com/riot/dom-bindings).

```js
import { expressionTypes } from '@riotjs/dom-bindings'
import * as riot from 'riot'
import App from './app.riot'

const createApp = riot.component(App)

const app = createApp(document.getElementById('root'), {
  name: 'This is a custom property',
  class: 'custom-class'
}, {
  slots: [{
    id: 'default',
    html: 'Hello there',
    bindings: []
  }],
  attributes: [{
    type: expressionTypes.ATTRIBUTE,
    name: 'class',
    evaluate: scope => scope.props.class
  }]
})
```

### riot.install

`riot.install(plugin: function): Set`

1. `plugin` - function receiving [a component object](#component-object) for any component created

<strong>@returns: </strong> a JavaScript `Set` containing all of the plugin functions installed

Once installed, a plugin function will be called for any Riot.js component created:

```js
import { install } from 'riot'

let id = 0

// this plugin adds the uid attribute on any riot component created
install(function(component) {
  component.uid = id++

  return component
})
```

### riot.uninstall

`riot.uninstall(plugin: function): Set`

1. `plugin` - function plugin that was already installed before

<strong>@returns: </strong> a JavaScript `Set` containing all of the remaining plugin functions that are installed

A plugin can be installed and uninstalled:

```js
import { install, uninstall } from 'riot'
import uid from './riot-uid.js'

install(uid)

// uninstall the plugin if it's not needed anymore
uninstall(uid)
```

### riot.register

`riot.register(name: string, component: RiotComponentShell): Map`

1. `name` - the component name
2. `component` - [a component shell object](#component-shell-interface)

<strong>@returns: </strong> a JavaScript `Map` containing all registered components factory functions

```js
import { register, mount } from 'riot'
import MyComponent from './my-component.riot'

// register the my-component as global component
register('my-component', MyComponent)

// find all the DOM nodes called `<my-component>` and
// mount them with the component previously registered
mount('my-component')
```

### riot.unregister

`riot.unregister(name: string): Map`

1. `name` - the component name

<strong>@returns: </strong> a JavaScript `Map` containing the remaining registered components factory functions

Unregister a tag previously created via compiler or via `riot.register()`.
This method could be handy in case you need to test your app and you want to create multiple tags using the same name. For example.

```js
import { register, unregister } from 'riot'
import TestComponent from './test-component.riot'
import TestComponent2 from './test-component2.riot'

// create a test component
register('test-component', TestComponent)

// mount it
const [component] = mount(document.createElement('div'), 'test-component')
expect(component.root.querySelector('p')).to.be.ok

// unregister the tag
unregister('test-component')

// recreate the same component using a different template
register('test-component', TestComponent2)
```

### riot.pure

`riot.pure(PureComponentFactoryFunction): PureComponentFactoryFunction`

`PureComponentFactoryFunction` is a function that accepts an object with the following fields:

1. `slots` - the slot list found in your component
2. `attributes` - the component attribute expressions that can be evaluated to infer the component properties from the context
3. `props` - the initial component user properties that can be only set via `riot.component` calls

<strong>@returns: </strong> the user defined factory function that will be used internally by Riot.js to create pure components

This function is a Riot.js primitive that is meant to be used only for particular cases where the default rendering engine might be not provide all the features you are looking for (lazy loading or custom directives...).

The `PureComponentFactoryFunction` should always return an object containing the `mount`, `update`, and `unmount` methods in order to let Riot.js properly render the pure components. For example:

```html
<lit-element>
  <script>
    import { pure } from 'riot'
    import { html, render } from 'lit-html'

    export default pure(({ attributes, slots, props }) => ({
      mount(el, context) {
        this.el = el
        this.render(context)
      },
      // context here is either the parent component or undefined
      render(context) {
        render(html`<p>${ context ? context.message : 'no message defined' }</p>`, this.el)
      },
      unmount() {
        this.el.parentNode.removeChild(this.el)
      }
    }))
  </script>
</lit-element>
```

### riot.version

`riot.version(): string`

<strong>@returns: </strong> the current Riot version in use as a string

## Component object

Each Riot.js component is created as a lightweight object. The object that you export via `export default` will have the following properties:

- Attributes
  - `props` - the props received as object
  - `state` - the current component state object
  - `root` - root DOM node
- [Create/Destroy](#createdestroy)
  - `mount` - initialize the component
  - `unmount` - destroy the component and remove it from the DOM
- [State handling](#state-handling) methods
  - `update` - method to update the component state
  - `shouldUpdate` - method to pause the component rendering
- [Lifecycle callbacks](#lifecycle)
  - `onBeforeMount` - called before the component will be mounted
  - `onMounted` - called after the component has rendered
  - `onBeforeUpdate` - called before the component will be updated
  - `onUpdated` - called after the component has been updated
  - `onBeforeUnmount` - called before the component will be removed
  - `onUnmounted` - called once the component has been removed
- [Helpers](#helpers)
  - `$` - method similar to `document.querySelector`
  - `$$` - method similar to `document.querySelectorAll`


### Component Interface

If you're familiar with [Typescript](https://www.typescriptlang.org/), here is what a Riot.js component interface looks like:

```ts
// This interface is only exposed and any Riot component will receive the following properties
interface RiotCoreComponent<P = object, S = object> {
  // automatically generated on any component instance
  readonly props: P
  readonly root: HTMLElement
  readonly name?: string
  // TODO: add the @riotjs/dom-bindings types
  readonly slots: any[]
  mount(
    element: HTMLElement,
    initialState?: S,
    parentScope?: object
  ): RiotComponent<P, S>
  update(
    newState?: Partial<S>,
    parentScope?: object
  ): RiotComponent<P, S>
  unmount(keepRootElement: boolean): RiotComponent<P, S>

  // Helpers
  $(selector: string): HTMLElement
  $$(selector: string): [HTMLElement]
}

// All the RiotComponent Public interface properties are optional
interface RiotComponent extends RiotCoreComponent<P = object, S = object> {
  // optional on the component object
  state?: S

  // optional alias to map the children component names
  components?: {
    [key: string]: RiotComponentShell<P, S>
  }

  // state handling methods
  shouldUpdate?(newProps: P, currentProps: P): boolean

  // lifecycle methods
  onBeforeMount?(currentProps: P, currentState: S): void
  onMounted?(currentProps: P, currentState: S): void
  onBeforeUpdate?(currentProps: P, currentState: S): void
  onUpdated?(currentProps: P, currentState: S): void
  onBeforeUnmount?(currentProps: P, currentState: S): void
  onUnmounted?(currentProps: P, currentState: S): void
  [key: string]: any
}
```

You can use any of the component properties in both the HTML and JavaScript code. For example:


``` html
<my-component>
  <h3>{ props.title }</h3>

  <script>
    export default {
      onBeforeMount() {
        const {title} = this.props
      }
    }
  </script>
</my-component>
```

You can freely set any property to the component scope and it will be available in the HTML expressions. For example:

``` html
<my-component>
  <h3>{ title }</h3>

  <script>
    export default {
      onBeforeMount() {
        this.title = this.props.title
      }
    }
  </script>
</my-component>
```

Note: if you have some globals, you can also use these references in both the HTML and JavaScript code:

```js
window.someGlobalVariable = 'Hello!'
```

``` html
<my-component>
  <h3>{ window.someGlobalVariable }</h3>

  <script>
    export default {
      message: window.someGlobalVariable
    }
  </script>
</my-component>
```

<aside class="note note--warning">:warning: Beware that the use of global variables in your components might compromise their server-side rendering and it's highly not recommended.</aside>


### Create/Destroy

#### component.mount

`component.mount(element: HTMLElement, initialState?: object, parentScope?: object): RiotComponent;`

Any component object will be mounted on a DOM node in order to render its template and become interactive.

You will likely never call the `component.mount` method by yourself, you will use [riot.mount](#riotmount) or [riot.component](#riotcomponent) instead.

#### component.unmount

`component.mount(keepRoot?: boolean): RiotComponent`

Detaches the custom component and its children from the page.
If you want to unmount a tag without removing the root node you need to pass `true` to the unmount method.

Unmount the tag and remove its template from the DOM:

``` js
myComponent.unmount()
```

Unmount the component and keep the root node in the DOM:

``` js
myComponent.unmount(true)
```


### State handling

#### component.state

Any Riot.js component created has a `state` object property. The `state` object is meant to store all of the mutable component properties. For example:

```html
<my-component>
  <button>{ state.message }</button>

  <script>
    export default {
      // initial component state
      state: {
        message: 'hi'
      }
    }
  </script>
</my-component>
```

In this case the component is created with an initial state that can be modified internally via `component.update`.

You should avoid storing nested javascript objects in the state property because their references will be shared across multiple components and might generate side effects. To avoid undesired surprises you can also create your components using a factory function:

```html
<my-component>
  <button>{ state.message }</button>

  <script>
    export default function MyComponent() {
      // remember to return an object
      return {
        // the initial state will be always fresh created avoiding surprises
        state: {
          nested: {
            properties: 'are ok now'
          },
          message: 'hi'
        }
      }
    }
  </script>
</my-component>
```

Riot.js will automatically call the function any time a new component will be mounted.

#### component.components

If you want to avoid registering global Riot.js components you can map your children components directly on your component object. For example:

```html
<my-component>
  <!-- this component is only available in `<my-component>` -->
  <my-child/>

  <!-- this component is named differently and was aliased -->
  <aliased-name/>

  <!-- this component was already registered via riot.register -->
  <global-component/>

  <script>
    import MyChild from './my-child.riot'
    import User from './user.riot'

    export default {
      components: {
        MyChild,
        'aliased-name': User
      }
    }
  </script>
</my-component>
```

The `components` property should be a static attribute of your component export. If you export functions your components should be declared as follows:

```html
<my-component>
  <button>{ state.message }</button>

  <script>
    import MyChild from './my-child.riot'
    import User from './user.riot'

    // static property
    MyComponent.components = {
      MyChild,
      'aliased-name': User
    }

    export default function MyComponent() {
      // remember to return an object
      return {
        // the initial state will be always fresh created avoiding surprises
        state: {
          nested: {
            properties: 'are ok now'
          },
          message: 'hi'
        }
      }
    }
  </script>
</my-component>
```

<div class="note note--info">
  For this example we assume that you are bundling your application via webpack, Rollup, Parcel or Browserify.
</div>

#### component.update

`component.update(newState?: object, parentScope?: object): RiotComponent;`

Updates the component `state` object and re-render all of its expressions. This method can usually be called every time an event handler is dispatched when the user interacts with the application.

``` html
<my-component>
  <button onclick={ onClick }>{ state.message }</button>

  <script>
    export default {
      state: {
        message: 'hi'
      },
      onClick(e) {
        this.update({
          message: 'goodbye'
        })
      }
    }
  </script>
</my-component>
```

You can also call this method manually whenever you need to update your component's UI. This typically happens after some non-UI related event: after `setTimeout`, AJAX call, or on some server event. For example:

``` html
<my-component>

  <input name="username" onblur={ validate }>
  <span class="tooltip" if={ state.error }>{ state.error }</span>

  <script>
    export default {
      async validate() {
        try {
          const {username} = this.props
          const response = await fetch(`/validate/username/${username}`)
          const json = response.json()
          // do something with the response
        } catch (error) {
          this.update({
            error: error.message
          })
        }
      }
    }
  </script>
</my-component>
```

On above example the error message is displayed on the UI after the `update()` method has been called.

If you want to have more control over your tag's DOM updates you can rely on the return value of the `shouldUpdate` function.
Riot.js will update your component only if that function returns `true`.

``` html
<my-component>
  <button onclick={ onClick }>{ state.message }</button>

  <script>
    export default {
      state: {
        message: 'hi'
      },
      onClick(e) {
        this.update({
          message: 'goodbye'
        })
      },
      shouldUpdate(newProps, currentProps) {
        // do not update
        if (this.state.message === 'goodbye') return false
        // if this.state.message is different from 'goodbye' we could update the component
        return true
      }
    }


  </script>
</my-component>
```

The `shouldUpdate` method will always receive 2 arguments: the first one contains the new component properties and the second argument contains the current ones.

``` html
<my-component>
  <child-tag message={ state.message }></child-tag>
  <button onclick={ onClick }>Say goodbye</button>

  <script>
    export default {
      state: {
        message = 'hi'
      },
      onClick(e) {
        this.update({
          message: 'goodbye'
        })
      }
    }
  </script>
</my-component>

<child-tag>
  <p>{ props.message }</p>

  <script>
    export default {
      shouldUpdate(newProps, currentProps) {
        // update the DOM depending on the new properties received
        return newProps.message !== 'goodbye'
      }
    }
  </script>
</child-tag>
```



###  Slots

The `<slot>` tag is a special Riot.js core feature that allows you to inject and compile the content of any custom component inside its template in runtime.
For example, using the following riot tag `my-post`:

``` html
<my-post>
  <h1>{ props.title }</h1>
  <p><slot/></p>
</my-post>
```

any time you include the `<my-post>` tag in your app

``` html
<my-post title="What a great title">
  My beautiful post is <b>just awesome</b>
</my-post>
```

once it's mounted, it will be rendered in this way:

``` html
<my-post>
  <h1>What a great title</h1>
  <p>My beautiful post is <b>just awesome</b></p>
</my-post>
```

The expressions in slot tags by default will not have access to the properties of the components in which they are injected unless you are passing them via slot attribute, as we will learn in the [Higher Order Components section]({{ '/api/#higher-order-components' | prepend:site.baseurl }}).

``` html
<!-- This tag just inherits the yielded DOM -->
<child-tag>
  <slot/>

  <script>
    export default {
      internalProp: 'secret message'
    }
  </script>
</child-tag>

<my-component>
  <child-tag>
    <!-- this attribute will be properly rendered -->
    <p>{ message }</p>

    <!-- this expression will fail because "internalProp" is not available here -->
    <p>{ internalProp }</p>
  </child-tag>
  <script>
    export default {
      message: 'hi'
    }
  </script>
</my-component>
```

#### Named Slots

The `<slot>` tag provides also a mechanism to inject HTML in specific sections of a component template.

For example, using the following Riot tag `my-other-post`:

``` html
<my-other-post>
  <article>
    <h1>{ props.title }</h1>
    <h2><slot name="summary"/></h2>
    <article>
      <slot name="content"/>
    </article>
  </article>
</my-other-post>
```

any time you include the `<my-other-post>` tag in your app

``` html
<my-other-post title="What a great title">
  <span slot="summary">
    My beautiful post is just awesome
  </span>
  <p slot="content">
    And the next paragraph describes just how awesome it is
  </p>
</my-other-post>
```

once it's mounted, it will be rendered in this way:

``` html
<my-other-post>
  <article>
    <h1>What a great title</h1>
    <h2><span>My beautiful post is just awesome</span></h2>
    <article>
      <p>
        And the next paragraph describes just how awesome it is
      </p>
    </article>
  </article>
</my-other-post>
```

#### Higher Order Components

{% include version_badge.html version=">=4.6.0" %}

You can use `<slot>` tags to create Higher Order Components. All of the attributes set on the slot tags will be available in their injected HTML templates.
Let's imagine for example that you want to have a themable application and you want to use a `<theme-provider>` component for it:

```html
<theme-provider>
  <slot theme={theme}/>

  <script>
    export default {
      theme: 'dark'
    }
  </script>
</theme-provider>
```

Now you can wrap your components in a `<theme-provider>` tag to always read the current application theme in a flexible and composable way:

```html
<app>
  <theme-provider>
    <!-- notice how the "theme" variable will be available here -->
    <sidebar class="sidebar sidebar__{theme}"/>
  </theme-provider>
</app>
```

The use of Higher Order Components can simplify a lot of the communication between child and parent components, giving you enough flexibility to handle the data flow across your whole application.

### Lifecycle

Each component object can rely on the following callbacks to handle its internal state:

  - `onBeforeMount` - called before the component will be mounted
  - `onMounted` - called after the component has rendered
  - `onBeforeUpdate` - called before the component will be updated
  - `onUpdated` - called after the component has been updated
  - `onBeforeUnmount` - called before the component will be removed
  - `onUnmounted` - called once the component has been removed

For example:

```html
<my-component>
  <p>{ state.message }</p>

  <script>
    export default {
      onBeforeMount() {
        this.state = {
          message: 'Hello there'
        }
      }
    }
  </script>
</my-component>
```

All of the lifecycle methods will receive 2 arguments `props` and `state`, which are aliases of the `this.props` and `this.state` component attributes, respectively.

```html
<my-component>
  <p>{ state.message }</p>

  <script>
    export default {
      state: {
        message: 'Hello there'
      },
      onBeforeMount(props, state) {
        console.assert(this.state === state) // ok!
        console.log(state.message) // Hello there
      }
    }
  </script>
</my-component>
```

### Helpers

Any Riot.js component provides two helpers to query DOM nodes contained in its rendered template.

 - `component.$(selector: string): HTMLElement` - returns a single node located in the component markup
 - `component.$$(selector: string): [HTMLElemet]` - returns all of the DOM nodes matched by the selector containing the component markup

You can use the component helpers for doing simple DOM queries:

```html
<my-component>
  <ul>
    <li each={ item in items }>
      { item }
    </li>
  </ul>

  <script>
    export default {
      onMounted() {
        // queries
        const ul = this.$('ul')
        const lis = this.$$('li')

        // do something with the DOM nodes
        const lisWidths = lis.map(li => li.offsetWidth)
        const {top, left} = ul.getBoundingClientRect()
      }
    }
  </script>
</my-component>
```

<aside class="note note--warning">:warning:
Beware that the <code>$</code> and <code>$$</code> helpers will also perform a DOM query through the DOM nodes generated by the children Riot.js components contained into your template.
</aside>

### Manual construction

Riot.js components are meant to be compiled to JavaScript via [@riotjs/compiler]({{ '/compiler' | prepend:site.baseurl }}). However you can build them manually with any rendering engine you like.

#### Component shell interface


The Riot.js compiler just creates a shell object that will be transformed internally by Riot to create the [component object](#component-interface). If you want to build this shell object manually it's worth understanding its interface first:
```ts
interface RiotComponentShell<P = object, S = object> {
  readonly css?: string
  readonly exports?: () => RiotComponentExport<P, S>|object
  readonly name?: string
  template(): any
}
```

The `RiotComponentShell` object consists of 4 properties:

- `css` - the component CSS as string
- `exports` - the component `export default` public API
- `name` - the component name
- `template` - the factory function to manage the component template

#### Template interface

The template function should return an interface that's compatible with the following:

```ts
interface RiotComponentTemplate {
  update(scope: object): RiotComponentTemplate;
  mount(element: HTMLElement, scope: object): RiotComponentTemplate;
  createDOM(element: HTMLElement): RiotComponentTemplate;
  unmount(scope: object): RiotComponentTemplate;
  clone(): RiotComponentTemplate;
}
```

The `RiotComponentTemplate` is an object and it's responsible for handling the component rendering:

- `update` - method that will receive the component data and must be used to update the template
- `mount` - method that must be used to connect the component template to a DOM node
- `createDOM` - factory function might be needed to create the template DOM structure only once
- `unmount` - method to clean up the component DOM
- `clone` - method might be needed to clone the original template object in order to work with multiple instances

#### Examples

This example uses the [@riotjs/dom-bindings (Riot core template engine)](https://github.com/riot/dom-bindings):

```js
import { template, expressionTypes } from '@riotjs/dom-bindings'

riot.register('my-component', {
  css: ':host { color: red; }',
  name: 'my-component',
  exports: {
    onMounted() {
      console.log('I am mounted')
    }
  },
  template() {
    return template('<p><!----></p>', [{
      selector: 'p',
      expressions: [
        {
          type: expressionTypes.TEXT,
          childNodeIndex: 0,
          evaluate: scope => `Hello ${scope.greeting}`
        }
      ]
    }])
  }
})
```

Read about the [template engine API](https://github.com/riot/dom-bindings).

You can also use any other kind of template engine if you like.
This example uses [lit-html](https://lit-html.polymer-project.org/) as the template engine:

```js
import {html, render} from 'lit-html'

riot.register('my-component', {
  css: ':host { color: red; }',
  name: 'my-component',
  exports: {
    onMounted() {
      console.log('I am mounted')
    }
  },
  template() {
    const template = ({name}) => html`<p>Hello ${name}!</p>`

    return {
      mount(element, scope) {
        this.el = element

        this.update(scope)
      },
      update(scope) {
        render(template(scope), this.el)
      },
      unmount() {
        this.el.parentNode.removeChild(this.el)
      },
      // the following methods are not necessary for lit-html
      createDOM(element) {},
      clone() {}
    }
  }
})
```

#### Tags without template

You can also create "wrapper tags" without any template as follows:

``` js
riot.register('my-component', {
  name: 'my-component',
  exports: {
    onMounted() {
      console.log('I am mounted')
    }
  }
})

```

In this case, any time you will mount a tag named `my-component` Riot will leave the component markup as it is without parsing it:

```html
<html>
<body>
  <my-component>
    <p>I want to say Hello</p>
  </my-component>
</body>
</html>
```

This technique might be used to enhance server-side rendered templates.
