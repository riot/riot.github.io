---
title: Маршрутизатор
layout: ru
class: apidoc
---

{% include ru/api-tabs.html %}

Маршрутизатор Riot - одна из самых минималистичных реализаций маршрутизатора из всех, что вы можете найти. Он работает во  всех браузерах, включая IE9. В версии <2.3 маршрутизатор отслеживает только хэш-часть URL (часть после символа `#`). Большинство одностраничных приложений работают только с хэш-частью, но, если вам нужно обрабатывать URL целиком, вам следует использовать другую реализацию маршрутизатора.

Маршрутизатор Riot без дополнительных настроек работает с иерархическими схемами, в которых части маршрута, разделены "/". В этом случае Riot предоставляет прямой доступ к этим частям.

### riot.route(callback)

Функция `callback` выполняется каждый раз когда меняется хэш. Например:

```javascript
riot.route(function(collection, id, action) {

})
```

Если, например, хэш изменится на `#customers/987987/edit` тогда в примере выше, аргументы будут равны:

```javascript
collection = 'customers'
id = '987987'
action = 'edit'
```

Хэш может быть изменён следующими способами:

1. Ввод нового хэш через адресную строку
2. Нажатие в браузере кнопки "вперёд" или "назад"
3. Вызов `riot.route(to)`

### riot.route.start()

Вызов этой функции начинает отслеживание изменений в хэше URL. Эта функция вызывается автоматически, когда маршрутизатор загружается. Обычно, этот метод используется совместно с [riot.route.stop](#route-stop). Например:

```javascript
riot.route.stop() // очистить все старые колбеки
riot.route.start() // начать маршрутизацию снова
```

### <a name="route-stop"></a> riot.route.stop()

Перестаёт отслеживать изменения в хэше, а так же, выставление в дефолтное [riot.route.route](#route).

```javascript
riot.route.stop()
```

Этот метод позволяет вам использовать несколько роутеров в рамках одного приложения.

### <a name="route"></a> riot.route(to)

Изменение URL в адресной строке и извещение всех слушателей, которые подписаны на событие через `riot.route(callback)`. Пример:

```javascript
riot.route('customers/267393/edit')
```

### riot.route.exec(callback)

Выполнение маршрутизации по тому URL, который сейчас в адресной строке, не дожидаясь изменений в хэше. Например:

```javascript
riot.route.exec(function(collection, id, action) {

})
```

### riot.route.parser(parser)

Замена дефолтного парсера на свой. Пример такого парсера:

`!/user/activation?token=xyz`

```javascript
riot.route.parser(function(path) {
  var raw = path.slice(2).split('?'),
      uri = raw[0].split('/'),
      qs = raw[1],
      params = {}

  if (qs) {
    qs.split('&').forEach(function(v) {
      var c = v.split('=')
      params[c[0]] = c[1]
    })
  }

  uri.push(params)
  return uri
})
```

В результате парсинга, функция получит такие параметры:

```javascript
riot.route(function(target, action, params) {

  /*
    target = 'user'
    action = 'activation'
    params = { token: 'xyz' }
  */

})
```
