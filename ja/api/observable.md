---
title: オブザーバブル
layout: ja
class: apidoc
---

{% include ja/api-tabs.html %}


### <a name="constructor"></a> riot.observable(el)

与えられたオブジェクト`el`に[Observer](https://ja.wikipedia.org/wiki/Observer_パターン)機能を付加するか、引数をとらない場合は新しいオブジェクトを生成して返します。この後、オブジェクトはイベントのトリガーおよび監視ができるようになります。例:

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

@returns 与えられた`el`オブジェクト、または新しいobservableインスタンス


### <a name="on"></a> el.on(events, callback)

与えられたイベントを監視して、イベントがトリガーされるごとに`callback`を実行します。`events`はスペースで区切って複数指定可能。

``` js
// ひとつのイベントを監視
el.on('start', function() {

})

// 複数のイベントを監視。type引数にはどのイベントが発火したかが渡される
el.on('start stop', function(type) {

  // typeは'start'か'stop'のどちらか

})
```

@returns `el`

### <a name="one"></a> el.one(event, callback)

一度だけ、与えられた`event`を監視し、`callback`を実行します。

``` js
// run the function once, even if 'start' is triggered multiple times
el.one('start', function() {

})
```

@returns `el`

### <a name="off"></a> el.off(events)

指定されたイベントのリスナ(コールバック)を削除します。`events`はスペースで区切って複数指定可能。

``` js
el.off('start stop')
```

@returns `el`

### <a name="off-fn"></a> el.off(events, fn)

指定されたイベントについて、特定のリスナ`fn`を削除します。

``` js
function doIt() {
  console.log('starting or ending')
}

el.on('start middle end', doIt)

// startとendイベントから特定のリスナだけを削除
el.off('start end', doIt)
```

@returns `el`

### <a name="off-all"></a> el.off('*')

すべてのイベントのすべてのリスナを削除します。

@returns `el`


### <a name="trigger"></a> el.trigger(event)

`event`を監視しているすべてのコールバック関数を実行します。

``` js
el.trigger('start')
```

@returns `el`

### <a name="trigger-args"></a> el.trigger(event, arg1 ... argN)

`event`を監視しているすべてのコールバック関数を実行します。任意の数の引数をリスナに渡すことができます。

``` js
// startイベントを監視して、引数を待ち受け
el.on('start', function(engine_details, is_rainy_day) {

})

// 引数とともに、startイベントをトリガー
el.trigger('start', { fuel: 89 }, true)

```

@returns `el`
