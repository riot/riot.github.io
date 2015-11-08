---
title: Наблюдатель
layout: ru
class: apidoc
---

{% include ru/api-tabs.html %}


### <a name="constructor"></a> riot.observable(el)

Добавляет функционал [наблюдателя](https://ru.wikipedia.org/wiki/%D0%9D%D0%B0%D0%B1%D0%BB%D1%8E%D0%B4%D0%B0%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)) для данного объекта `el` или, если аргумент пуст, создаёт и возвращает новый экземпляр наблюдателя. После этого объект может вызвать и слушать событий. Например:

``` js
function Car() {

  // создаём объект наблюдателя Car
  riot.observable(this)

  // слушаем событие 'start'
  this.on('start', function() {
    // ...
  })

}

// новый объект Car
var car = new Car()

// вызываем событие 'start'
car.trigger('start')
```

@returns полученный объект `el` или новый объект наблюдателя


### <a name="on"></a> el.on(events, callback)

Подписка на слушание списка событий `events`, которые передаются в виде строки, разделённых запятой. Функция `callback` вызывается каждый раз, когда какое-либо из событий срабатывает.

``` js
// слушание одного события
el.on('start', function() {

})

// прослушивание нескольких событий. тип события передаётся в виде аргумента `type`
el.on('start stop', function(type) {

  // type равен 'start' или 'stop'

})
```

@returns `el`

### <a name="one"></a> el.one(event, callback)

Подписка на `event`. `callback` срабатывает только один раз.

``` js
// функция выполняется только один раз, даже, если событие `start` вызывается множество раз
el.one('start', function() {

})
```

@returns `el`

### <a name="off"></a> el.off(events)

Удаление всех слушателей, которые подписаны на данное событие

``` js
el.off('start stop')
```

@returns `el`

### <a name="off-fn"></a> el.off(events, fn)

Удаляет определённый метод из тех, которые подписаны на данные события.

``` js
function doIt() {
  console.log('starting or ending')
}

el.on('start middle end', doIt)

// удаление определённого метода из событий start и end
el.off('start end', doIt)
```

@returns `el`

### <a name="off-all"></a> el.off('*')

Удаление всех слушателей

@returns `el`


### <a name="trigger"></a> el.trigger(event)
Выполнить все функции callback, которые слушают данный `event`

``` js
el.trigger('start')
```

@returns `el`

### <a name="trigger-args"></a> el.trigger(event, arg1 ... argN)

Выполнить все callback-функции, которые слушают данный `event`. Любое количество дополнительных параметров могут быть предоставлены для слушателей.

``` js
// подписка на событие 'start'. слушатель может принимать дополнительне параметры
el.on('start', function(engine_details, is_rainy_day) {

})

// вызов события start c параметрами
el.trigger('start', { fuel: 89 }, true)

```

@returns `el`
