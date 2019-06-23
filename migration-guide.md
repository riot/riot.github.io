---
title: Migration Guide
layout: detail
description: Migration guide from Riot.js 2 and 3
---

## Introduction

Riot.js 4 is a complete rewrite, [read more about it](https://medium.com/@gianluca.guarini/every-revolution-begins-with-a-riot-js-first-6c6a4b090ee){:target="_blank"}.

Migrating older applications written in Riot.js 3 is not recommended because older Riot.js versions will still get security patches and they are stable enough.

You can use this guide to learn how to write components for Riot.js 4 coming from Riot.js 3 and 2.

## Component Syntax and API

The components syntax was updated to match the modern javascript standards avoiding any possible ambiguity.
Less magic means more clarity and interoperability, Riot.js 4 components are designed to be completely future proof!

### The script tag

In the previous Riot.js versions you could just extend to your component instance via `this` keyword in your `<script>` tags. This syntax sugar was removed in favor of a cleaner API relying on the standard javascript ES2018 syntax:

**old**

```html
<my-component>
  <p onclick={onClick}>{message}</p>

  <!-- optional <script> tag -->

  onClick() {
    this.message = 'hello'
  }
</my-component>
```

**new**

```html
<my-component>
  <p onclick={onClick}>{message}</p>

  <!-- mandatory <script> tag -->

  <script>
    export default {
      onClick() {
        this.message = 'hello'
        this.update()
      }
    }
  </script>
</my-component>
```

In this way your editor, and other compilers like `typescript` will not get confused by your components javascript logic and can be used along the way without any special concerns.

It's worth to mention that this change was driven by the new [Riot.js philosophy]({{ '/'|prepend:site.baseurl }}#conclusion):

> ...In the face of ambiguity, refuse the temptation to guess.<br/>
There should be one– and preferably only one –obvious way to do it.<br/>
Although that way may not be obvious at first unless you’re Dutch...

<aside class="note note--info">
Notice how the use of the <code>&#x3C;script&#x3E;</code> tag becomes mandatory to split your components templates from their javascript logic.
</aside>


### Template shortcuts

The template shortcuts were completely removed in favor of pure and more explicit javascript expressions. Let's see how it's simple to achieve the same results in a cleaner way in Riot.js 4.

**old**

```html
<my-component>
  <p class={ active: isActive, disabled: isDisabled }>hello</p>
</my-component>
```

**new**

```js
// riot-class-names-plugin.js
/**
 * Convert object class constructs into strings
 * @param   {Object} classes - class list as object
 * @returns {string} return only the classes having a truthy value
 */
function classNames(classes) {
  return Object.entries(classes).reduce((acc, item) => {
    const [key, value] = item

    if (value) return [...acc, key]

    return acc
  }, []).join(' ')
}

// install the classNames plugin
riot.install(function(component) {
  // add the classNames helper to all the riot components
  component.classNames = classNames

  return component
})
```

```html
<my-component>
  <p class={
    classNames({
      active: isActive,
      disabled: isDisabled
    })
  }>hello</p>
</my-component>
```

Even better, you can use the `classNames` directly in your components logic keeping your templates clean avoiding the use of `riot.install` for example:

```html
<my-component>
  <p class={getParagraphClasses()}>hello</p>

  <script>
    import classNames from 'classnames'

    export default {
      getParagraphClasses() {
        return classNames({
          active: this.isActive,
          disabled: this.isDisabled
        })
      }
    }
  </script>
</my-component>
```

The same short cut was available for the `style` attribute but now in Riot.js 4 you will need to handle the `style` attributes by yourselves:

**old**

{% raw %}
```html

<my-component>
  <p style={{ color: 'red', 'font-size': `${fontSize}px` }}>hello</p>
</my-component>
```
{% endraw %}

**new**
```js
// riot-style-attributes-plugin.js
/**
 * Convert object attributes constructs into strings
 * @param   {Object} attributes - style attributes as object
 * @returns {string} a string with all the attributes and their values
 */
function styleAttribute(attributes) {
  return Object.entries(attributes).reduce((acc, item) => {
    const [key, value] = item

    return [...acc, `${key}: ${value}`]
  }, []).join(';')
}

// install the styleAttribute plugin
riot.install(function(component) {
  // add the styleAttribute helper to all the riot components
  component.styleAttribute = styleAttribute

  return component
})
```

```html
<my-component>
  <p style={
    styleAttribute({
      color: 'red',
      'font-size': `${fontSize}px`
    })
  }>hello</p>
</my-component>
```

Now your code and your helpers will be completely customizable without relying on the framework built in.
This means that you will have more freedom and less bugs coming from your third party code...and don't forget to remember that:

> ...Explicit is better than implicit...


### Observable

The Observable pattern was completely integrated into the previous Riot.js versions. This was an opinionated decision that might not work for all users. Riot.js 3 leaves you the decision regarding which programming pattern to use in your application and for this reason the observable helpers were completely removed from the source code in favor of a more generic approach.

**old**

```html
<my-component>
  <p>{message}</p>

  this.on('mount', function() {
    this.message = 'hello'
    this.update()
  })
</my-component>
```

**new**

```html
<my-component>
  <p>{message}</p>

  <script>
    export default {
      onMounted() {
        this.message = 'hello'
        this.update()
      }
    }
  </script>
</my-component>
```

Please check also the new components [lifecycle events]({{ '/documentation/'|prepend:site.baseurl }}#lifecycle-callbacks).

This change opens many new possibilities to manage your application state keeping the doors open to the nostalgic users that still prefer the observable lifecycle pattern.

```js
// riot-observable-plugin.js

import observable from 'riot-observable'

/**
 * Trigger the old observable and the new event
 * @param   {RiotComponent} component - riot component
 * @param   {Function} callback - lifecycle callback
 * @param   {string} eventName - observable event name
 * @param   {...[*]} args - event arguments
 * @returns {RiotComponent|undefined}
 */
function triggerEvent(component, callback, eventName, ...args) {
  component.trigger(eventName, ...args)
  return callback.apply(component, [...args])
}

riot.install(function(componentAPI) {
  const {
      onBeforeMount,
      onMounted,
      onBeforeUpdate,
      onUpdated,
      onBeforeUnmount,
      onUnmounted
  } = componentAPI

  // make the riot component observable
  const component = observable(componentAPI)
  // remap the new event to the old ones
  const eventsMap = {
    onBeforeMount: ['before-mount', onBeforeMount],
    onMounted: ['mount', onMounted],
    onBeforeUpdate: ['before-update', onBeforeUpdate],
    onUpdated: ['updated', onUpdated],
    onBeforeUnmount: ['before-unmount', onBeforeUnmount],
    onUnmounted: ['unmount', onUnmounted]
  }

  Object.entries(eventsMap).forEach(([eventName, value]) => {
    const [oldObservableEvent, newCallback] = value
    component[eventName] = (...args) => triggerEvent(
      component, newCallback, oldObservableEvent, ...args
    )
  })

  return component
})
```

```html
<my-component>
  <p>{message}</p>

  <script>
    export default {
      onMounted() {
        this.on('update', () => {
          console.log('I got updated!')
        })
      }
    }
  </script>
</my-component>
```

### Opts vs props and state

The previous Riot.js versions provided the `opts` key to each component. This key was renamed `props` and it becomes immutable: it's a read only property frozen via `Object.freeze`.
The `props` object can be only updated outside of the component that reads from it, while the new `state` object is updated via [`update` calls]({{ '/api/'|prepend:site.baseurl }}#state-handling).

**old**

```html
<my-component>
  <p>{opts.message}</p>
</my-component>
```

**new**
```html
<my-component>
  <p>{props.message}</p>
</my-component>
```

### Refs attributes

The `ref` attributes were replaced by the `$` and `$$` [component helpers]({{ '/api/'|prepend:site.baseurl }}#helpers) preferring a functional approach over mutable properties.

**old**

```html
<my-component>
  <p ref='paragraph'>{message}</p>

  this.on('mount', function() {
    this.refs.paragraph.innerHTML = '<b>hello</b>'
  })
</my-component>
```

**new**
```html
<my-component>
  <p>{message}</p>

  <script>
    export default {
      onMounted() {
        const paragraph = $('p')

        paragraph.innerHTML = '<b>hello</b>'
      }
    }
  </script>
</my-component>
```

<aside class="note note--warning">:warning:
The new helpers will never return the children component instances but only DOM nodes
</aside>

### Parent and children

The `parent` and `tags` keys were heavily abused by Riot.js users. They were the source of many side effects and clear bad practice. For this reason the children/parent components created via Riot.js 4 never expose their internal API, **components communicate only via props** and don't interact directly with the external world.

**old**
```html
<my-component>
  <my-child ref='child'/>

  this.on('mount', function() {
    this.refs.child.update({ message: 'hello' })
  })
</my-component>
```

**new**
```html
<my-component>
  <my-child message={childMessage}/>

  <script>
    export default {
      onMounted() {
        this.childMessage = 'hello'
        this.update()
      }
    }
  </script>
</my-component>
```

You can of course write your own riot plugin to add the `ref` behaviour but it's highly not recommended:

```js
// riot-ref-plugin.js
riot.install(function(component) {
  const { onBeforeMount } = component

  component.onBeforeMount = (props, state) => {
    if (props.ref) {
      props.ref(component)
    }

    onBeforeMount.apply(component, [props, state])
  }

  return component
})
```

```html
<my-component>
  <my-child ref={onChildRef}/>

  <script>
    export default {
      onChildRef(child) {
        this.child = child
      },
      onMounted() {
        this.child.update()
      }
    }
  </script>
</my-component>
```

#### Custom events dispatching

Listening custom events dispatched in child components can be done simply via properties:

```html
<my-component>
  <child on-loaded={onChildLoaded}></child>

  <script>
    export default {
      onChildLoaded() {
        console.log('the child component dispatched the on loaded event!')
      }
    }
  </script>
</my-component>
```

```html
<my-child>
  <figure>
    <img src="path/to/the/image.jpg" onloaded={props.onLoaded}/>
  </figure>
</my-child>
```

### Virtual tags

The `<virtual>` tag was removed and it can't be used anymore. Please use the `<template>` tag instead [more info]({{ '/documentation/'|prepend:site.baseurl }}#fragments-conditional)


### Yield tags

The `<yield>` tags were replaced by the `<slot>`s having a more predictable behavior. Please check the [slots api]({{ '/api/'|prepend:site.baseurl }}#slots) to understand how they work.


<aside class="note note--warning">:warning:
The <code>yield</code> tags expressions were previously evaluated in the context where they were injected. The <code>slot</code>s expressions instead will be evaluated using the current context in which they will be used.
</aside>

## CLI

The new CLI is much more powerful than the older one since it can compile single tags but it can also bundle your [entire Riot.js application]({{ '/compiler/'|prepend:site.baseurl }}#build-your-whole-application).

It's designed to simplify the components bundling for quick prototypes and demos however for bigger application it's recommended the use of highly customizable javascript bundlers together with [riot loaders]({{ '/compiler/'|prepend:site.baseurl }}#riot-loaders)

### Installation

In Riot.js v3 it was possible to install the CLI via `npm i -g riot`. In Riot.js 4 it was removed from the `riot` npm package and you will need to install it separately via `npm i -g @riotjs/cli`.

### Components registration

You need to be aware that it previously was automatically registering your Riot.js components but now it will just output them as javascript modules. You will need to register your javascript output by yourself:

```js
// compiled Riot.js component
import MyComponent from './my-component.js'
import {register} from 'riot'

register('my-component', MyComponent)
```
