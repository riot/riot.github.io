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

  // Carインスタンスを監視できるようにする
  riot.observable(this)

  // 'start'イベントを監視始める
  this.on('start', function() {
    // エンジン、スタート
  })

}

// 新しいCarインスタンスを作る
var car = new Car()

// 'start'イベントを発火
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

// すべてのイベントを監視
el.on('all', function(event, param1, param2) {
  // eventは発火されたイベントの名前
  // パラメータによってここで何かをする
})
```

`callbacks`内でエラーがあった場合、observableインスタンスは`error`イベントを呼びます:

``` js

el.on('error', function(e) {
  // ここでエラー対処ができます
})

el.on('event', function() {
  throw 'oops'
})

el.trigger('event')

```

@returns `el`

### <a name="one"></a> el.one(events, callback)

一度だけ、与えられた`events`を監視し、`callback`を実行します。`events`はスペースで区切って複数指定可能。

``` js
// 'start'が何回発火されても、一度だけ実行する
el.one('start', function() {

})
```

@returns `el`

### <a name="off"></a> el.off(events)

指定されたイベントのリスナ(コールバック)を削除します。

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


### <a name="trigger"></a> el.trigger(events)

`events`を監視しているすべてのコールバック関数を実行します。

``` js
el.trigger('start')
el.trigger('render update')
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
