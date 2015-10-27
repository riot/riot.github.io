---
layout: ru
title: Пользовательские теги
---

{% include guide-tabs.html %}

## Пример

Пользовательские теги в Riot - основные строительные блоки для интерфейсов. Они берут на себя часть "представление" в приложении. Давайте начнём с TODO-приложения, чтобы осветить различный функционал Riot:

```html
<todo>

  <h3>{ opts.title }</h3>

  <ul>
    <li each={ items }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggle }> { title }
      </label>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input name="input" onkeyup={ edit }>
    <button disabled={ !text }>Add #{ items.length + 1 }</button>
  </form>

  <script>
    this.disabled = true

    this.items = opts.items

    edit(e) {
      this.text = e.target.value
    }

    add(e) {
      if (this.text) {
        this.items.push({ title: this.text })
        this.text = this.input.value = ''
      }
    }

    toggle(e) {
      var item = e.item
      item.done = !item.done
      return true
    }
  </script>

</todo>
```

Пользовательские теги [компилируются](/guide/compiler/) в JavaScript.

Смотри [пример](http://muut.github.io/riotjs/demo/), изучай [исходный код](https://github.com/riot/riot/tree/gh-pages/demo), или скачай [zip-архив](https://github.com/riot/riot/archive/gh-pages.zip).



## Синтаксис пользовательских тегов

Теги Riot - это сочетание шаблона (HTML) и логики (JavaScript). Вот основные правила:

* Сначала описывается HTML, затем следует логика, которая опционально заключается в тег `<script>`.
* Если не использовать опциональный тег `<script>`, то JavaScript начинается там, где заканчивается последний HTML-тег внутри пользовательского тега.
* Пользовательские теги могут быть пустыми, содержащими только HTML или только JavaScript
* Кавычки писать не обязательно: `<foo bar={ baz }>` всё равно, что `<foo bar="{ baz }">`.
* Поддерживается написание методов в ES6-манере: `methodName()` всё равно, что `this.methodName = function()` и `this` всегда ссылается на тег
* Доступен короткий синтаксис в выражениях: `class={ completed: done }` рендерится как `class="completed"` если `done` равен true.
* Булевые аттрибуты (checked, selected и т.д.) игнорируются, если выражение отрицательно: `<input checked={ undefined }>` становится `<input>`.
* Все имена оттрибутов *должны быть в нижнем регистре*. В соответствии со спецификациями браузеров.
* Поддерживаются самозакрывающиеся теги: `<div/>` всё равно, что `<div></div>`. Но такие теги, как `<br>`, `<hr>`, `<img>` или `<input>` никогда не закрываются после компиляции
* Пользовательские теги всегда *должны быть закрыты* (или должны закрывать сами себя).
* Стандартные HTML-теги (`label`, `table`, `a` и т.д) можно использовать, но этого делать не стоит.


Определение тега всегда должно быть в начале файла.

```html
<!-- правильно -->
<my-tag>

</my-tag>

<!-- правильно -->
<my-tag></my-tag>

  <!-- вызовет ошибку из-за отступа -->
  <my-tag>

  </my-tag>
```

### Без тега <script>

Не обязательно всегда писать тег `<script>`:

```html
<todo>

  <!-- шаблон -->
  <h3>{ opts.title }</h3>

  // логика
  this.items = [1, 2, 3]

</todo>
```
В этом случае логика начинается после последнего HTML тега. Этот «открытый синтаксис", он часто используется в примерах на этом сайте.

## Пре-процессинг

Вы можете затать тип пре-процессора через аттрибут `type`. Например:

```html
<my-tag>
  <script type="coffee">
    # тут ваш coffeescript
  </script>
</my-tag>
````

Сейчас доступны "coffee", "typescript", "es6" и "none".

Подробности можно посмтотреть [здесь](/guide/compiler/#pre-processors).


## Стили тегов

Вы можете положить `style` внутрь пользовательго тега. Riot.js автоматически вынесет содержимое в `<head>`.

```html
<todo>

  <!-- шаблон -->
  <h3>{ opts.title }</h3>

  <style>
    todo { display: block }
    todo h3 { font-size: 120% }
    /** стили **/
  </style>

</todo>
```

### Локальные CSS

Так же доступны [локальный CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/:scope). Пример ниже равносилен первому.

```html
<todo>

  <!-- шаблон -->
  <h3>{ opts.title }</h3>

  <style scoped>
    :scope { display: block }
    h3 { font-size: 120% }
    /** стили **/
  </style>

</todo>
```

Стили обрабатываются только один раз, вне зависимости от того, сколько раз был инициирован пользовательский тег.

Для того, чтобы проще было переопределять стили, и использовать темы, вы можете указать где в `<head>` Riot должен поместить стили из пользовательских тегов:

```html
<style type="riot"></style>
```

Стили вставятся после normalize.css, но перед стилями сайта и тем, что позволит вам переопределить дефолтные CSS на те, которые будут в теме.

## Монтирование

Теперь, когда у вас есть тег, вы можете примонтировать его на странице таким образом:


```html
<body>

  <!-- вы можете разместить тег в любой части страницы -->
  <todo></todo>

  <!-- подключаем riot.js -->
  <script src="riot.min.js"></script>

  <!-- подключаем тег -->
  <script src="todo.js" type="riot/tag"></script>

  <!-- монтируем тег -->
  <script>riot.mount('todo')</script>

</body>
```

Пользовательские теги внутри `body` должны закрываться, используя такой синтаксис: `<todo></todo>` самозакрытие (`<todo/>`) не поддерживается.

Немного наглядных примеров:

```js
// монтируем все пользовательские теги на странице
riot.mount('*')

// монтируем элемент с определённым id
riot.mount('#my-element')

// монтируем выбранные элементы
riot.mount('todo, forum, comments')
```

Один и тот же тег можно монтировать на странице множество раз.


### Доступ к элементам DOM

Riot дает вам доступ к элементам, имеющим атрибут `name` непосредственно из переменной `this`.

### Как использовать jQuery, Zepto, querySelector, и т.д.
Если вам нужно получить доступ к DOM внутри Riot, взгляните на [жизненный цикл тегов](#tag-lifecycle) и обратите внимание, что элементы DOM не будут созданы до вызоыва метода `update()`. Учтите это при обращении к DOM-элементам из сторонних библиоте, так как это может быть причиной ошибок.

```html
<example-tag>
  <p id="findMe">Я существую?</p>

  <script>
  var test1 = document.getElementById('findMe')
  console.log('test1', test1)  // ошибка

  this.on('update', function(){
    var test2 = document.getElementById('findMe')
    console.log('test2', test2) // всё верно!
  })
  </script>
</example-tag>
```

Скорее всего, вам не потребуется, чтобы ваш код запускался каждый раз, когда тег обновляется. В большинстве случаев, вам будет достаточно события `mount`.

```html
<example-tag>
  <p id="findMe">Я существую?</p>

  <script>
  var test1 = document.getElementById('findMe')
  console.log('test1', test1)  // ошибка

  this.on('update', function(){
    var test2 = document.getElementById('findMe')
    console.log('test2', test2) // сработает. Будет вызываться при каждом обновлении
  })

  this.on('mount', function(){
    var test3 = document.getElementById('findMe')
    console.log('test3', test3) // сработает. Сработает лишь однажды (при монтировании)
  })
  </script>
</example-tag>
```

### Контекстные запросы к DOM

Теперь, когда мы знаем, как получить элементы DOM, мы можем сделать это более удобным, добавив контекст для наших запросов в корневой `root` элемент.

```html
<example-tag>
  <p id="findMe">Я существую?</p>
  <p>Это - что, жизнь?</p>
  <p>Или сон?</p>

  <script>
  this.on('mount', function(){
    // контекстный jQuery
    $('p', this.root)

    // контекстный Query Selector
    this.root.querySelectorAll('p')
  })
  </script>
</example-tag>
```

### Параметры

Вы можете передать параметры для тегов во втором аргументе

```html
<script>
riot.mount('todo', { title: 'My TODO app', items: [ ... ] })
</script>
```

Передаваемые данные могут быть чем угодно, начиная от простого объекта до полномасштабного API приложения. Или это может быть хранилище Flus. Это зависит от архитектуры приложения.

Внутри тега можно получить параметры через `opts`:

```html
<my-tag>

  <!-- параметры в HTML -->
  <h3>{ opts.title }</h3>

  // параметры в JavaScript
  var title = opts.title

</my-tag>
```


### Примеси (Mixins)

Примеси обеспечивают легкий способ делиться функционалом между тегами. Когда тег компилируется, Riot может расширить его заранее определёнными примесями.

```js
var OptsMixin = {
  init: function() {
    this.on('updated', function() { console.log('Updated!') })
  },

  getOpts: function() {
    return this.opts
  },

  setOpts: function(opts, update) {
    this.opts = opts
    if (!update) this.update()
    return this
  }
}

<my-tag>
  <h1>{ opts.title }</h1>

  this.mixin(OptsMixin)
</my-tag>
```

В этом примере любой экземпляр тега `my-tag` получает примесь `OptsMixin` которая позволяет использовать методы `getOpts` и `setOpts`. Специальный метод `init` вызывается, когда примесь загружается в тег (`init` не доступен из тега).

```js
var my_tag_instance = riot.mount('my-tag')[0]

console.log(my_tag_instance.getOpts()) // выведет список всех параметров, которые доступны в теге
```

Теги могут принимать любой объект -- `{'key': 'val'}` `var mix = new function(...)` -- и выдают ошибку, когда получают любой другой тип.

Тег `my-tag` теперь иммет метод `getId`.

```js
function IdMixin() {
  this.getId = function() {
    return this._id
  }
}

var id_mixin_instance = new IdMixin()

<my-tag>
  <h1>{ opts.title }</h1>

  this.mixin(OptsMixin, id_mixin_instance)
</my-tag>
```

Будучи определена на уровне тегов, примесь может не только расширить функциональность вашего тега, но также позволяет создавать повторяемые интерфейсы. Каждый раз, когда тег монтируется, экземпляр тега будет иметь код из примеси.

### Разделяемые примеси

Для того, чтобы делить примеси между тегами или проектами, существует `riot.mixin`. Вы можете зарегистрировать вашу примесь глобально:

```js
riot.mixin('mixinName', mixinObject)
```

Для того, чтобы загрузить вашу примесь в тег, используйти метод `mixin()` с указанимем имени примеси:

```html
<my-tag>
  <h1>{ opts.title }</h1>

  this.mixin('mixinName')
</my-tag>
```


### Жизненный цикл тегов


Тег создаётся в такой последовательности:

1. Тег инициилизируется
2. Выполняется JavaScript-логика тега
3. Вычисляются HTML выражения и выщывается метод "update"
4. Тег монтируется в приложение и вызывается метод "mount"

После того, как тег было примонтирован, выражения вычисляются следующим образом:

1. Автоматически в момент, когда вызывается trigger(). (если вы не установите e.preventUpdate в значение true в обработчике событий) Например, вызов метода `toggle` в примере выше.
2. Когда вызывается `this.update()` в текущей сущности тега
3. Когда вызывается `this.update()` в каком-нибудь из родительских тегов. Обновления происходят сверху вниз, от родительских к дочерним тегам.
4. Когда вызывается `riot.update()`, который глобально обновляет все выражения на странице.

Метод "update" вызывается каждый раз, когда тег обновляется.

Так как значения рассчитываются перед монтированием нет проблемных сюрпризов, связанных с некоректными запросами в случаях, вроде этого: `<img src={ src }>`.

### Listening to lifecycle events

You can listen to various lifecyle events inside the tag as follows:


```js
<todo>

  this.on('mount', function() {
    // right after tag is mounted on the page
  })

  this.on('update', function() {
    // allows recalculation of context data before the update
  })

  this.on('unmount', function() {
    // when the tag is removed from the page
  })

  // curious about all events ?
  this.on('mount update unmount', function(eventName) {
    console.info(eventName)
  })

</todo>
```

You can have multiple event listeners for the same event. See [observable](/api/observable/) for more details about events.


## Expressions

HTML can be mixed with expressions that are enclosed in curly braces:

```js
{ /* my_expression goes here */ }
```

Expressions can set attributes or nested text nodes:

```html
<h3 id={ /* attribute_expression */ }>
  { /* nested_expression */ }
</h3>
```

Expressions are 100% JavaScript. A few examples:

```js
{ title || 'Untitled' }
{ results ? 'ready' : 'loading' }
{ new Date() }
{ message.length > 140 && 'Message is too long' }
{ Math.round(rating) }
```

The goal is to keep the expressions small so your HTML stays as clean as possible. If your expression grows in complexity consider moving some of logic to the "update" event. For example:


```html
<my-tag>

  <!-- the `val` is calculated below .. -->
  <p>{ val }</p>

  // ..on every update
  this.on('update', function() {
    this.val = some / complex * expression ^ here
  })
</my-tag>
```


### Boolean attributes

Boolean attributes (checked, selected etc..) are ignored when the expression value is falsy:

`<input checked={ null }>` becomes `<input>`.

W3C states that a boolean property is true if the attribute is present at all — even if the value is empty of `false`.

The following expression does not work:

```html
<input type="checkbox" { true ? 'checked' : ''}>
```

since only attribute and nested text expressions are valid. Riot detects 44 different boolean attributes.


### Class shorthand

Riot has a special syntax for CSS class names. For example:

```html
<p class={ foo: true, bar: 0, baz: new Date(), zorro: 'a value' }></p>
```

evaluates to "foo baz zorro". Property names whose value is truthful are appended to the list of class names. Of course you can use this notation in other places than class names if you find a suitable use case.


### Printing brackets

You can output an expression without evaluation by escaping the opening brace:

`\\{ this is not evaluated \\}` outputs `{ this is not evaluated }`


### Customizing curly braces

You are free to customize the braces to your liking. For example:

```js
riot.settings.brackets = '${ }'
riot.settings.brackets = '\{\{ }}'
```

The start and end is separated with a space character.

When using [pre-compiler](/guide/compiler/#pre-compilation) you'll have to set `brackets` option there as well.



### Etc

Expressions inside `style` tags are ignored.


### Render unescaped HTML

Riot expressions can only render text values without HTML formatting. However you can make a custom tag to do the job. For example:

```html
<raw>
  <span></span>

  this.root.innerHTML = opts.content
</raw>
```

After the tag is defined you can use it inside other tags. For example

```html
<my-tag>
  <p>Here is some raw content: <raw content="{ html }"/> </p>

  this.html = 'Hello, <strong>world!</strong>'
</my-tag>
```

[demo on jsfiddle](http://jsfiddle.net/23g73yvx/)

<span class="tag red">warning</span> this could expose the user to XSS attacks so make sure you never load data from an untrusted source.



## Nested tags

Let's define a parent tag `<account>` and with a nested tag `<subscription>`:


```html
<account>
  <subscription  plan={ opts.plan } show_details="true" />
</account>


<subscription>
  <h3>{ opts.plan.name }</h3>

  // Get JS handle to options
  var plan = opts.plan,
      show_details = opts.show_details

  // access to the parent tag
  var parent = this.parent

</subscription>
```

<span class="tag red">important</span> Note how we named the `show_details` attribute using an underscore instead of camel case, which due to browser specification would have been automatically converted to lowercase.

Then we mount the `account` tag to the page with a `plan` configuration option:

```html
<body>
  <account></account>
</body>

<script>
riot.mount('account', { plan: { name: 'small', term: 'monthly' } })
</script>
```

Parent tag options are passed with the `riot.mount` method and child tag options are passed on the tag attribute.

<span class="tag red">important</span> Nested tags are always declared inside a parent custom tag. They are not initialized if they are defined on the page.

### Nested HTML

"HTML transclusion" is a way to process the inner HTML on the page. This is achieved with a build-in `<yield>` tag. Example:


### Tag definition

```html
<my-tag>
  <p>Hello <yield/></p>
  this.text = 'world'
</my-tag>
```

### Usage

Custom tag is placed on a page with nested HTML

```html
<my-tag>
  <b>{ text }</b>
</my-tag>
```

### Result

```html
<my-tag>
  <p>Hello <b>world</b><p>
</my-tag>
```

See [API docs](/api/#yield) for `yield`.

## Named elements

Elements with `name` or `id` attribute are automatically bound to the context so you'll have an easy access to them with JavaScript:

```html
<login>
  <form id="login" onsubmit={ submit }>
    <input name="username">
    <input name="password">
    <button name="submit">
  </form>

  // grab above HTML elements
  var form = this.login,
    username = this.username.value,
    password = this.password.value,
    button = this.submit

</login>
```

Of course these named elements can be referred to in HTML as well: `<div>{ username.value }</div>`


## Event handlers

A function that deals with DOM events is called an "event handler". Event handlers are defined as follows:

```html
<login>
  <form onsubmit={ submit }>

  </form>

  // this method is called when above form is submitted
  submit(e) {

  }
</login>
```

Attributes beginning with "on" (`onclick`, `onsubmit`, `oninput` etc...) accept a function value which is called when the event occurs. This function can also be defined dynamically with an expression. For example:


```html
<form onsubmit={ condition ? method_a : method_b }>
```

In the function `this` refers to the current tag instance. After the handler is called `this.update()` is automatically called reflecting all the possible changes to the UI.

The default event handler behavior is *automatically cancelled* unless the element is a checkbox or radio button. This means that `e.preventDefault()` is already called for you, because this is what you usually want (or forget to do). You can let the browser do the default thing by returning `true` on the handler.

For example, this submit handler will actually submit the form to the server:

```js
submit() {
  return true
}
```



### Event object

The event handler receives the standard event object as the first argument. The following properties are normalized to work across browsers:

- `e.currentTarget` points to the element where the event handler is specified.
- `e.target` is the originating element. This is not necessarily the same as `currentTarget`.
- `e.which` is the key code in a keyboard event (`keypress`, `keyup`, etc...).
- `e.item` is the current element in a loop. See [loops](#loops) for more details.


## Conditionals

Conditionals let you show / hide elements based on a condition. For example:

```html
<div if={ is_premium }>
  <p>This is for premium users only</p>
</div>
```

Again, the expression can be just a simple property or a full JavaScript expression. The following special attributes are available:

- `show` – show the element using `style="display: ''"` when the value is true
- `hide` – hide the element using `style="display: none"` when the value is true
- `if` – add (true value) or remove (false value) the element from the document

The equality operator is `==` and not `===`. For example: `'a string' == true`.


## Loops

Loops are implemented with `each` attribute as follows:

```html
<todo>
  <ul>
    <li each={ items } class={ completed: done }>
      <input type="checkbox" checked={ done }> { title }
    </li>
  </ul>

  this.items = [
    { title: 'First item', done: true },
    { title: 'Second item' },
    { title: 'Third item' }
  ]
</todo>
```

The element with the `each` attribute will be repeated for all items in the array. New elements are automatically added / created when the items array is manipulated using `push()`, `slice()` or `splice` methods for example.


### Context

A new context is created for each item. These are [tag instances](/api/#tag-instance). When loops are nested, all the children tags in the loop inherit any of their parent loop's properties and methods they themselves have `undefined`. In this way, Riot avoids overriding things that should not be overridden by the parent tag.

The parent can be explicitly accessed through the `parent` variable. For example:


```html
<todo>
  <div each={ items }>
    <h3>{ title }</h3>
    <a onclick={ parent.remove }>Remove</a>
  </div>

  this.items = [ { title: 'First' }, { title: 'Second' } ]

  remove(event) {

  }
</todo>
```

In the looped element everything but the `each` attribute belongs to the child context, so the `title` can be accessed directly and `remove` needs to be prefixed with `parent.` since the method is not a property of the looped item.

The looped items are [tag instances](/api/#tag-instance). Riot does not touch the original items so no new properties are added to them.


### Event handlers with looped items

Event handlers can access individual items in a collection with `event.item`. Now let's implement the `remove` function:

```html
<todo>
  <div each={ items }>
    <h3>{ title }</h3>
    <a onclick={ parent.remove }>Remove</a>
  </div>

  this.items = [ { title: 'First' }, { title: 'Second' } ]

  remove(event) {

    // looped item
    var item = event.item

    // index on the collection
    var index = this.items.indexOf(item)

    // remove from collection
    this.items.splice(index, 1)
  }
</todo>
```

After the event handler is executed the current tag instance is updated using `this.update()` (unless you set e.preventUpdate to true in your event handler) which causes all the looped items to execute as well. The parent notices that an item has been removed from the collection and removes the corresponding DOM node from the document.


### Looping custom tags

Custom tags can also be looped. For example:

```html
<todo-item each="{ items }" data="{ this }"></todo-item>
```

The currently looped item can be referenced with `this` which you can use to pass the item as an option to the looped tag.


### Non-object arrays

The array elements need not be objects. They can be strings or numbers as well. In this case you need to use the `{ name, i in items }` construct as follows:


```html
<my-tag>
  <p each="{ name, i in arr }">{ i }: { name }</p>

  this.arr = [ true, 110, Math.random(), 'fourth']
</my-tag>
```

The `name` is the name of the element and `i` is the index number. Both of these labels can be anything that's best suited for the situation.


### Object loops

Plain objects can also be looped. For example:

```html
<my-tag>
  <p each="{ name, value in obj }">{ name } = { value }</p>

  this.obj = {
    key1: 'value1',
    key2: 1110.8900,
    key3: Math.random()
  }
</my-tag>
```

Object loops are not recommended since internally Riot detects changes on the object with `JSON.stringify`. The *whole* object is studied and when there is a change the whole loop is re-rendered. This can be slow. Normal arrays are much faster and only the changes are drawn on the page.


## HTML elements as tags

Standard HTML elements can be used as riot tags in the page body with the addition of the `riot-tag` attribute.

```html
<ul riot-tag="my-tag"></ul>
```

This provides users with an alternative that can provide greater compatibility with css frameworks.  The tags are treated like any other custom tag.

```js
riot.mount('my-tag')
```

will mount the `ul` element shown above as if it were `<my-tag></my-tag>`

## Server-side rendering

Riot supports server-side rendering with Node/io.js. You can `require` tags and render them:

```js
var riot = require('riot')
var timer = require('timer.tag')

var html = riot.render(timer, { start: 42 })

console.log(html) // <timer><p>Seconds Elapsed: 42</p></timer>
```

Loops and conditionals *are* supported.
