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

  // 'start'イベントの監視を始める
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

与えられたイベントを監視して、イベントがトリガーされるごとに`callback`を実行します。

``` js
// ひとつのイベントを監視
el.on('start', function(args) {

})

// すべてのイベントを監視
el.on('all', function(event, param1, param2) {
  // eventはイベントの名前
  // パラメータによってここで何かをする
})

```

@returns `el`

### <a name="one"></a> el.one(events, callback)

一度だけ、与えられた`events`を監視し、`callback`を実行します。

``` js
// 'start'が何回発火されても、一度だけ実行する
el.one('start', function() {

})
```

@returns `el`

### <a name="off"></a> el.off(events)

指定されたイベントのリスナ(コールバック)を削除します。

``` js
el.off('start')
```

@returns `el`

### <a name="off-fn"></a> el.off(events, fn)

指定されたイベントについて、特定のリスナ`fn`を削除します。

``` js
function doIt() {
  console.log('starting or ending')
}

el.on('start', doIt)

// 特定のリスナを削除
el.off('start', doIt)
```

@returns `el`

### <a name="off-all"></a> el.off('*')

すべてのイベントのすべてのリスナを削除します。

@returns `el`

### <a name="off-all-fn"></a> el.off('*', fn)

すべてのイベントの特定のコールバック関数を削除します。

@returns `el`

### <a name="trigger"></a> el.trigger(events)

`events`を監視しているすべてのコールバック関数を実行します。

``` js
el.trigger('start')
el.trigger('render')
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
