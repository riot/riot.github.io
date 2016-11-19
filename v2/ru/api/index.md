---
title: Пользовательские теги
layout: ru
class: apidoc
---

{% include ru/api-tabs.html %}


## Монтирование

### <a name="mount"></a> riot.mount(customTagSelector, [opts])

`customTagSelector` выбирает элементы со страницы и монтирует их как пользовательские теги. Имя выбранного элемента должно совпадать с именем пользовательского тега.

`opts` - необязательный объект параметров, который передаётся в теги. Это может быть что угодно, начиная от простого объекта до большого API приложения. Или это может быть Flux-хранилище. Это зависит от того, как вы структурируете ваше приложение. Вы можете узнать больше о модульности [здесь](/ru/guide/application-design/#modularity). *Обратите внимание,* что атрибуты монтируемого тега имеют более высокий приоритет над одноименными опциями из `opts`.


``` js
// выбрать и смонтировать все <pricing> теги на странице
var tags = riot.mount('pricing')

// смонтировать все пользовательские теги с классом .customer
var tags = riot.mount('.customer')

// смонтировать тег <account> и передать ему объект api
var tags = riot.mount('account', api)
```

@returns: массив смонтированных [тегов](#tag-instance)

### <a name="mount-star"></a> riot.mount('*', [opts])

Специальный селектор "*" используется для монтирования всех пользовательских тегов на странице:

``` js
riot.mount('*')
```

@returns: массив смонтированных [тегов](#tag-instance)

### <a name="mount-tag"></a> riot.mount(selector, tagName, [opts])

Здесь
- `selector` выбирает любой элемент DOM, к которому будет примонтирован тег
- `tagName` определяет, какой тег будет использоваться
- `opts` необязательный объект, содержащий параметры


``` js
// монтирует тег "my-tag" в div#main и передаёт в него параметры из объекта api
var tags = riot.mount('div#main', 'my-tag', api)
```

@returns: массив смонтированных [тегов](#tag-instance)

### <a name="mount-dom"></a> riot.mount(domNode, tagName, [opts])

Монтирует пользовательский тег tagName в конкретный элемент DOM domNode. Например:

```
// монтируем "users" в определённый DOM элемент и отправляем в него объект api.
riot.mount(document.getElementById('slide'), 'users', api)
```

@returns: массив смонтированных [тегов](#tag-instance)

## Рендеринг

### <a name="render"></a> riot.render(tagName, [opts])

Рендерит пользовательский тег как html. Этот метод доступен только *на серверной стороне* (Node/io.js). Например:

```
// рендерим "my-tag" в html
var mytag = require('my-tag')
riot.render(mytag, { foo: 'bar' })
```

@returns: строка html


## <a name="tag-instance"></a> Экземпляр пользовательского тега

Это свойства есть у каждого сущности тега;

- `opts` - объект, который передаётся в тег в качестве параметров
- `parent` - родительский тег
- `root` - DOM элемент, к которому примонтирован тег
- `tags` - внутренние пользовательские теги

Вы можете использовать эти свойства как в HTML, так и в JavaScript. Например:


``` html
<my-tag>
  <h3>{ opts.title }</h3>

  var title = opts.title
</my-tag>
```

Вы можете свободно задавать значения этих свойств и читать их HTML из выражений. Например:

``2` html
<my-tag>
  <h3>{ title }</h3>

  this.title = opts.title
</my-tag>
```


## Обновление

### <a name="tag-update"></a> this.update()

Обновление всех выражений в экземпляре тега, а также во всех всех вложенных тегах. Этот метод вызывается автоматически каждый раз, когда пользователь взаимодействует с приложением.

Riot не обновляет пользовательский интерфейс автоматически, поэтому вы должны вызвать этот метод вручную. Это обычно происходит после каких-либо событий, на связанный с UI: после `setTimeout`, AJAX вызова или из-за какого-либо события на сервере. Например:

``` html
<my-tag>

  <input name="username" onblur={ validate }>
  <span class="tooltip" show={ error }>{ error }</span>

  var self = this

  validate() {
    $.get('/validate/username/' + this.username.value)
      .fail(function(error_message) {
        self.error = error_message
        self.update()
      })
  }
</my-tag>
```
На примере выше сообщение об ошибке отображается в UI после того, как вызывается метод `update()`. Мы передали в `self` значение из `this` так как внутри AJAX обратного вызова `this` имеет другой контекст.

### <a name="tag-update-data"></a> this.update(data)

Устанавливает значения свойств текущего элемента и обновляет выражения. Например, вместо этого:

``` js
self.error = error_message
self.update()
```

Вы можете делать так:

``` js
self.update({ error: error_message })
```

Что выглядит короче и чище.

### <a name="update"></a> riot.update()

Обновляет все примонтированные пользовательские теги.

@returns: массив [тегов](#tag-instance) которые примонтированы на странице.

## Отмонтирование

### <a name="tag-unmount"></a> this.unmount(keepTheParent)

Открепляет тег и его дочерние элементы и вызывает событие тега "unmount".
Если вы хотите открепить тег, но оставить его тег-контейнер, вызывайте метод "unmount" с параметром `true`.

Удаление тега из DOM:

``` js
mytag.unmount()
```

Удаление пользовательского тега, за исключением тега, в который он был смонтирован:

``` js
mytag.unmount(true)
```

## Вложенные теги

У вас есть доступ к вложенным тегам благодаря атрибуту `tags`:

``` html
<my-tag>
  <child></child>
  var child = this.tags.child
</my-tag>
```
Если вложенных тегов больше одного, они помещаются в массив `this.tags.child[n]`

Вы можете давать тегам названия через атрибут `name`.

``` html
<my-tag>

  <child name="my_nested_tag"></child>

  // обращение к вложенному тегу
  var child = this.tags.my_nested_tag

</my-tag>
```

Вложенные теги инициализируются сразу после того, как монтируется родительский тег, так что вложенные теги и все их методы доступны в событии "mount".

``` html
<my-tag>

  <child name="my_nested_tag"></child>

  this.on('mount', function() {
    this.tags.my_nested_tag.someMethod()
  })

</my-tag>
```

## <a name="yield"></a> Встраивание HTML в содержимое тега (yield)

Специальный тег `<yield>` позволяет расширять шаблон пользовательского тега уже после компиляции.

Например, у нас есть тег `my-post`

``` html
<my-post>
  <h1>{ opts.title }</h1>
  <yield/>
  this.id = 666
</my-post>
```

в любой момент мы подключаем тег `<my-post>` в нашем приложении

``` html
<my-post title="What a great title">
  <p id="my-content-{ id }">My beautiful post is just awesome</p>
</my-post>
```

при монтировании `riot.mount('my-post')` тег будет выглядеть так:

``` html
<my-post>
  <h1>What a great title</h1>
  <p id="my-content-666">My beautiful post is just awesome</p>
</my-post>
```

#### Yield и циклы

Тег `<yield>` может быть использован в циклах или в дочерних тегах. Но вы должны быть внимательны, так как в этом случае __всегда используются данные из дочерних тегов__.

Имеем компонент `blog.tag`


``` html
<blog>
  <h1>{ title }</h1>
  <my-post each={ posts }>
    <a href={ this.parent.backToHome }>Back to home</a>
    <div onclick={ this.parent.deleteAllPosts }>Delete all the posts</div>
  </my-post>

  this.backToHome = '/homepage'
  this.title = 'my blog title'

  this.posts = [
    { title: "post 1", description: 'my post description' },
    { title: "post 2", description: 'my post description' }
  ]

  // bind нужен для сохранения контекста переменной this
  deleteAllPosts() {
    this.posts = []
    this.update()
  }.bind(this)

</blog>

<my-post>
  <h2>{ title }</h2>
  <p>{ description }</p>
  <yield/>
</my-post>

```

После компиляции будет выглядеть так:

``` html
<blog>
  <h1>my blog title</h1>
  <my-post>
    <h2>post 1</h2>
    <p>my post description</p>
    <a href="/homepage">Back to home</a>
    <div>Delete all the posts</div>
  </my-post>
  <my-post>
    <h2>post 2</h2>
    <p>my post description</p>
    <a href="/homepage">Back to home</a>
    <div>Delete all the posts</div>
  </my-post>
</blog>
```


## События

Каждый экземпляр пользовательского тега - это [наблюдатель](/ru/api/observable/) поэтому, вы можете использовать методы `on` и `one` для того, чтобы наблюдать за событиями тега. Вот список поддерживаемых в Riot событий:

- "update" – вызывается непосредственно перед обновлением тега. Позволяет изменить данные тега перед тем, как выражения в шаблоне будут пересчитаны.
- "updated" – вызывается сразу после обновления тега. Позволяет манипулировать с обновлённым DOM-деревом
- "mount" – сразу после того, как тег примонтируется в приложении
- "unmount" – сразу после того, как приложение будет отмонтированно

Пример:

``` js
// освобождаем ресурсы когда тег уже не является частью DOM
this.on('unmount', function() {
  clearTimeout(timer)
})
```

## Зарезервированные слова

Вышеперечисленные имена методов и переменные - зарезервированные слова в Riot. Не используйте эти названия для атрибутов тегов или их методов: `opts`, `parent`, `root`, `update`, `unmount`, `on`, `off`, `one` and `trigger`. Переменные, начинающиеся с подчеркивания (например: `this._item`) тоже зарезервированы для внутреннего использования. Локальные переменные можно называть как угодно. Например:

``` javascript
<my-tag>

  // можно
  function update() { } 

  // нельзя
  this.update = function() { }

  // нельзя
  update() {

  }

</my-tag>
```

## Создание тега вручную

### <a name="tag"></a> riot.tag(tagName, html, [css], [attrs], [constructor])

Метод создаёт новую сущность тега "вручную", без компилятора.

- `tagName` имя тега
- `html` шаблон с [выражениями](/ru/guide/#expressions)
- `css` стили (необязательно)
- `attrs` атрибуты (необязательно)
- `constructor` функция, которая будет вызвана перед вычислением выражений и перед тем, как тег будет смонтирован


#### Пример

``` javascript
riot.tag('timer',
  '<p>Времени прошло: { time }</p>',
  'timer { display: block; border: 2px }',
  'class="tic-toc"',
  function (opts) {
    var self = this
    this.time = opts.start || 0

    this.tick = function () {
      self.update({ time: ++self.time })
    }

    var timer = setInterval(this.tick, 1000)

    this.on('unmount', function () {
      clearInterval(timer)
    })

  })
```

Смотри документацию к [timer demo](http://jsfiddle.net/gnumanth/h9kuozp5/) и [riot.tag](#tag-instance) API для подробной информации.


<span class="tag red">Внимание</span>, при использовании `riot.tag` вы не сможете насладиться преимуществами компилятора и список нижеперечисленных функций не поддерживается:

1. Самозакрывающиеся теги
2. Незаковыченные выражения. Пишите `value="{ val }"` вместо `value={ val }`
3. Boolean attributes. Write `__checked="{ flag }"` instead of `checked={ flag }`
4. Короткий синтаксис из ES6
5. `<img src={ src }>` должно быть написано как `<img riot-src={ src }>` для избегания некорректных запросов к серверу
6. `style="color: { color }"` должно быть написано как `riot-style="color: { color }"` чтобы это работало в IE
7. Локальные CSS стили


Вы можете получить преимущества `<template>` или `<script>` следующим образом:

``` html
<script type="tmpl" id="my_tmpl">
  <h3>{ opts.hello }</h3>
  <p>And a paragraph</p>
</script>

<script>
riot.tag('tag-name', my_tmpl.innerHTML, function(opts) {

})
</script>
```

### riot.Tag(impl, conf, innerHTML)

<span class="tag red">экспериментальный</span>

В 2.3 мы предоставили доступ к методу Tag, ранее использовавшемуся лишь внутренне. Блягодаря этому, вы можете применять более гибкий подход к созданию тегов.

- `impl`
  - `tmpl` шаблон тега
  - `fn(opts)` функция обратного вызова. Автоматически вызывается при монтировании
  - `attrs` аттрибуты тега
- `conf`
  - `root` узел DOM, в который будет примонтирован тег
  - `opts` опции тега
  - `isLoop` флаг, указывающий на то, данный тег используется для цикла?
  - `hasImpl` был ли этот тег уже зарегистрирован через riot.tag?
  - `item` элемент цикла (если используется для цикла)
- `innerHTML` html который будет использоваться для `yield` в шаблоне.


Пример с ES2015:

```js

class MyTag extends riot.Tag {
  constructor(el) {
    super({ tmpl: MyTag.template() }, { root: el })
    this.msg = 'hello'
  }
  bye() {
    this.msg = 'goodbye'
  }
  static template() {
    return `<p onclick="{ bye }">{ msg }</p>`
  }
}

new MyTag(document.getElementById('my-div')).mount()
```

Метод `riot.Tag` не рекомендуется использовать. Его следует использовать только в том случае, если вам не хватает вышеописанных методов.


