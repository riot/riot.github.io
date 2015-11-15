---
title: Маршрутизатор
layout: ru
class: apidoc
---

{% include ru/api-tabs.html %}

Маршрутизатор Riot - одна из самых минималистичных реализаций маршрутизатора из всех, что вы можете найти. Он работает во  всех браузерах, включая IE9. В версии <2.3 маршрутизатор отслеживает только хэш-часть URL (часть после символа `#`). Большинство одностраничных приложений работают только с хэш-частью, но, если вам нужно обрабатывать URL целиком, вам следует использовать другую реализацию маршрутизатора.

Маршрутизатор Riot без дополнительных настроек работает с иерархическими схемами, в которых части маршрута, разделены "/". В этом случае Riot предоставляет прямой доступ к этим частям.

Маршрутизатор Riot - это минималистичный иструмент со следующийм функционалом:

- pushState и history API
- группы маршрутизации
- заменяемый парсер
- совместимость с IE9 и выше

### riot.route(callback)

Функция `callback` выполняется каждый раз когда меняется хэш. Например:

```javascript
riot.route(function(collection, id, action) {

})
```

Если, например, когда отностиельный URL изменится на `customers/987987/edit` тогда в примере выше, аргументы будут равны:

```javascript
collection = 'customers'
id = '987987'
action = 'edit'
```

URL может быть изменён следующими способами:

1. Ввод нового хэш через адресную строку
2. Нажатие в браузере кнопки "вперёд" или "назад"
3. Вызов `riot.route(to)`
4. Переход по ссылке

### riot.route(filter, callback)

<span class="tag red">&gt;= v2.3</span>

Выполняет `callback` когда URL меняется и соответствует `filter`. Например:

```javascript
// соответствует `/fruit`
riot.route('/fruit', function(name) {
  console.log('The list of fruits')
})
```

Допускается использование `*` в `filter`:

```javascript
// если URL изменится на `/fruit/apple`,
// это будет удовлетворять условие, и 'apple' будет содержаться в `name`
riot.route('/fruit/*', function(name) {
  console.log('The detail of ' + name)
})

// если URL изменится на `/blog/2015-09/01`,
// то '2015', '09' и '01' заполнятся следующим образом:
riot.route('/blog/*-*/*', function(year, month, date) {
  console.log('The page of ' + year + '-' + month + '-' date)
})
```

Если вы хотите отловить URL `/old` и `/old/and/anything`, фильтр может быть записан как  `..`:

```javascript
riot.route('/old..', function() {
  console.log('The pages under /old was moved.')
})
```

Это может быть полезным, когда в URL используются GET-параметры

```javascript
// если URL изменится на `/search?keyword=Apple`, то это будет удовлетворять фильтр
riot.route('/search..', function() {
  var q = riot.route.query()
  console.log('Search keyword: ' + q.keyword)
})

// это может быть записано так
// но учтите, что `*` может соответствовать только цифре, букве или нижнему подчёркиванию
riot.route('/search?keyword=*', function(keyword) {
  console.log('Search keyword: ' + keyword)
})
```

<span class="tag red">Внимание:</span> Riot использует следующие регулярные выражения:

- `*`: `([^/?#]+?)`
- `..`: `.*`

### riot.route.create()

<span class="tag red">&gt;= v2.3</span>

Возвращает новый контекст маршрутизатора. Например:

```javascript
var subRoute = riot.route.create()
subRoute('/fruit/apple', function() { /* */ })
```

Смотрите так же [маршрутные группы](#routing-group) и [приоритет маршрутизации](#routing-priority).

## Использование роутера

### riot.route(to[, title])

Меняет URL в браузере и уведомляет об этом всех обработчиков, которые были созданы через `riot.route(callback)`. Например:

```javascript
riot.route('customers/267393/edit')
```
Начиная с v2.3, вы можете так же указать заголовок страницы:

```javascript
riot.route('customers/267393/edit', 'Editing customer page')
```

### riot.route.start(autoExec)

Начинает прослушивать события и выполняет маршрутизацию, соответствующую текущему URL.

```js
riot.route.start(true)
```

Это сокращение для:

```js
riot.route.start()
riot.route.exec()
```

### riot.route.stop()

Остановка всех маршрутизаторов. Этот метод удаляет все обработчики.

```javascript
riot.route.stop()
```

Обычно, этот метод используется вместе с [riot.route.start](#riot-route-start). Например:

```javascript
riot.route.stop() // удаляет все старые обработчики
riot.route.start() // старует новую маршрутизацию
```

### subRoute.stop()

<span class="tag red">&gt;= v2.3</span>

Аналогично `riot.route.stop()`, но только для отдельного маршрута.

```javascript
var subRoute = riot.route.create()
subRoute('/fruit/apple', function() { /* */ })
subRoute.stop()
```

### riot.route.exec()


Выполнение маршрутизации по тому URL, который сейчас в адресной строке, не дожидаясь изменений. Например:

```javascript
riot.route(function() { /* логика маршрутизатора */ })
riot.route.exec()
```

<span class="tag red">Warning:</span> `riot.route.exec(callback)` не рекомендуется, начиная с `v2.3`.

### riot.route.query()

<span class="tag red">&gt;= v2.3</span>

Вспомогательная функция для извлечения GET-параметров из URL.

```javascript
// if the url change to `/search?keyword=Apple&limit=30` this will match
riot.route('/search..', function() {
  var q = riot.route.query()
  console.log('Search keyword: ' + q.keyword)
  console.log('Search limit: ' + q.limit)
})
```

## Настройка

### riot.route.base(base)

Изменение базовой части URL. Если у вас URL выглядти так:

`http://riotexample.com/app/fruit/apple`

Вы можете задать сделать `/app` базовым, тогда вы будете иметь дело только с `/fruit/apple`.

```javascript
riot.route.base('/app')
```

По умолчанию, базовым значением является "#". Вы можете изменить это значение на `#!`:

```javascript
riot.route.base('#!')
```

### riot.route.parser(parser[, secondParser])

Замена стандартного парсера на свой. Вот пример такого парсера:

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

Вот какие параметры распознает этот парсер:

```javascript
riot.route(function(target, action, params) {

  /*
    target = 'user'
    action = 'activation'
    params = { token: 'xyz' }
  */

})
```

#### Второй парсер

<span class="tag red">&gt;= v2.3</span>

Вы также можете использовать `secondParser` для того, чтобы переопределить фильтр:

```javascript
// Так выглядит стандартный второй парсер
function second(path, filter) {
  var re = new RegExp('^' + filter.replace(/\*/g, '([^/?#]+?)').replace(/\.\./, '.*') + '$')
  if (args = path.match(re)) return args.slice(1)
}

riot.route.parser(first, second)
```

Если парсер ничего не вернёт, будет использован следующий фильтр.

## <a name="routing-group"></a> Маршрутные группы

Традиционный маршрутизатор на стороне сервера является высоко централизованным, но в последнее время мы часто используем маршрутизаторы на странице. Взляните на этот случай:

```html
<first-tag>
  <p>First tag</p>
  <script>
    riot.route('/fruit/*', function(name) {
      /* do something common */
    })
  </script>
</first-tag>

<second-tag>
  <p>Second tag</p>
  <script>
    riot.route('/fruit/apple', function(name) {
      /* do something SPECIAL */
    })
  </script>
</second-tag>
```

Два тега имеют маршруты, и, вроде бы, выглядит нормально? Нет, это не будет работать. Потому что только один из маршрутизаторов должен сработать, но невозможно опрделить, какой из двух. Для этого, мы должны сделать группы маршрутизации для каждого тега. Например:

```html
<first-tag>
  <p>First tag</p>
  <script>
    var subRoute = riot.route.create() // создаётся другой контекст
    subRoute('/fruit/*', function(name) {
      /* делается что-то для ОБЩЕГО случая */
    })
  </script>
</first-tag>

<second-tag>
  <p>Second tag</p>
  <script>
    var subRoute = riot.route.create() // создаётся ещё один контекст
    subRoute('/fruit/apple', function(name) {
      /* делается что-то для КОНКРЕТНОГО случая */
    })
  </script>
</second-tag>
```

## <a name="routing-priority"></a> Прироритет маршрутизации

Маршрутизатор выполняет обработчики по мере из определения. В случае ниже выполнится только первый и оставшиеся два никогда не сработают.

```javascript
riot.route('/fruit/*', function(name) { /* */ }) // (1)
riot.route('/fruit/apple', function() { /* */ }) // (2)
riot.route('/fruit/orange', function() { /* */ }) // (3)
```

Это будет работать:

```javascript
riot.route('/fruit/apple', function() { /* */ }) // (1)
riot.route('/fruit/orange', function() { /* */ }) // (2)
riot.route('/fruit/*', function(name) { /* */ }) // (3)
```

Маршруты *с фильтрами* имеют более высокий приоритет, чем маршруты без фильтра. Ниже маршруты пронумерованы в порядке очерёдности исполнения:

```javascript
riot.route(function() { /* */ }) // (3)
riot.route('/fruit/*', function() { /* */ }) // (1)
riot.route('/sweet/*', function() { /* */ }) // (2)
```
