---
title: Observable
layout: zh
class: apidoc
---

{% include zh/api-tabs.html %}


### <a name="constructor"></a> riot.observable(el)

为 `el` 对象添加 [Observer](http://en.wikipedia.org/wiki/Observer_pattern) 支持，如果参数为空，则返回一个新创建的observable实例。之后该对象就可以触发和监听事件了。例如:

``` js
function Car() {

  // 使 Car 实例成为 observable
  riot.observable(this)

  // 监听 'start' 事件
  this.on('start', function() {
    // 发动引擎
  })

}

// 创建一个新的 Car 实例
var car = new Car()

// 触发 'start' 事件
car.trigger('start')
```

@返回值 参数 `el` 或新的observable 实例


### <a name="on"></a> el.on(events, callback)

监听用空格分隔的 `event` 列表，每次事件被触发时调用 `callback`

``` js
// 监听单个事件
el.on('start', function() {

})

// 监听多个事件，事件类型将作为回调函数的参数传递
el.on('start stop', function(type) {

  // type 是 'start' 或 'stop'

})

// 监听此 observable 上的所有事件
el.on('all', function(event, param1, param2) {
  // event will be the name of any event triggered
  // do something with the parameters
})

```

如果你的 `callback` 中出现了错误，observable 实例将触发 `error` 事件：

```js

el.on('error', function(e) {
  // the errors can be caught here
})

el.on('event', function() {
  throw 'oops'
})

el.trigger('event')

```
@返回值 `el`

### <a name="one"></a> el.one(events, callback)

监听的由空格分隔的 `events` 但只执行 `callback` 最多一次.

``` js
// 即使 'start' 被触发多次，也只执行回调函数一次
el.one('start', function() {

})
```

@返回值 `el`

### <a name="off"></a> el.off(events)

删除参数中指定的以空格分隔的 `events` 的监听器

``` js
el.off('start stop')
```

@返回值 `el`

### <a name="off-fn"></a> el.off(events, fn)

从给定的事件列表的监听器中删除指定的那个

``` js
function doIt() {
  console.log('starting or ending')
}

el.on('start middle end', doIt)

// 从 start 和 end 事件的监听器中删除指定的那个
el.off('start end', doIt)
```

@返回值 `el`

### <a name="off-all"></a> el.off('*')

删除所有事件的所有监听器

@返回值 `el`


### <a name="trigger"></a> el.trigger(events)

触发事件。执行所有监听由空格分隔的 `events` 的回调函数

``` js
el.trigger('start')
el.trigger('render update')
```

@返回值 `el`

### <a name="trigger-args"></a> el.trigger(event, arg1 ... argN)

执行所有监听 `event` 的回调函数，可以传递任意数量的附加参数给监听器。

``` js
// 监听 'start' 事件，并期待附加参数
el.on('start', function(engine_details, is_rainy_day) {

})

// 触发 start 事件，并传递附加参数
el.trigger('start', { fuel: 89 }, true)

```

@返回值 `el`
