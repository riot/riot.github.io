---
title: Observable
layout: default
class: apidoc
---

{% include api-tabs.html %}


### <a name="constructor"></a> riot.observable(el)

Adds [Observer](http://en.wikipedia.org/wiki/Observer_pattern) support for the given object `el` or if the argument is empty a new observable instance is created and returned. After this the object is able to trigger and listen to events. For example:

``` js
function Car() {

  // Make Car instances observable
  riot.observable(this)

  // listen to 'start' event
  this.on('start', function() {
    // engine started
  })

}

// make a new Car instance
var car = new Car()

// trigger 'start' event
car.trigger('start')
```

@returns the given object `el` or a new observable instance

### <a name="on"></a> el.on(events, callback)

Listen to the given `event` and execute the `callback` each time an event is triggered.

``` js
// listen to single event
el.on('start', function(args) {

})

// listen all the events of this observable
el.on('*', function(event, param1, param2) {
  // event will be the name of any event triggered
  // do something with the parameters
})

```

@returns `el`

### <a name="one"></a> el.one(event, callback)

Listen to the given `event` and execute the `callback` at most once

``` js
// run the function once, even if 'start' is triggered multiple times
el.one('start', function() {

})
```

@returns `el`

### <a name="off"></a> el.off(events)

Removes the given `event` listeners.

``` js
el.off('start')
```

@returns `el`

### <a name="off-fn"></a> el.off(events, fn)

Removes the given callback listening to the `event`

``` js
function doIt() {
  console.log('starting or ending')
}

el.on('start', doIt)

// remove a specific listener
el.off('start', doIt)
```

@returns `el`

### <a name="off-all"></a> el.off('*')

Removes all listeners from all event types.

@returns `el`

### <a name="off-all-fn"></a> el.off('*', fn)

Removes the specific callback function called on all the events

@returns `el`

### <a name="trigger"></a> el.trigger(events)

Execute all callback functions that listen to the given `event`.

``` js
el.trigger('start')
el.trigger('render')
```

@returns `el`

### <a name="trigger-args"></a> el.trigger(event, arg1 ... argN)

Execute all callback functions that listen to the given `event`. Any number of extra parameters can be provided for the listeners.

``` js
// listen to 'start' event and expect extra arguments
el.on('start', function(engine_details, is_rainy_day) {

})

// trigger start event with extra parameters
el.trigger('start', { fuel: 89 }, true)

```

@returns `el`
