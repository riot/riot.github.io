---
layout: ru
title: Компилятор
---

{% include ru/guide-tabs.html %}

## Компиляция в браузере

Пользовательские теги должны быть преобразованы в JavaScript, прежде чем браузер может выполнять их. Вы можете сделать это, установив атрибут `type="riot/tag"` для подключаемых на странице скриптов. Например:

``` html
<!-- точка монтирования -->
<my-tag></my-tag>

<!-- подключение тега -->
<script type="riot/tag">
  <my-tag>
    <h3>Шаблон тега</h3>
    <inner-tag />
  </my-tag>
</script>

<!-- <inner-tag/> определённый пользовательский тег -->
<script src="path/to/javascript/with-tags.js" type="riot/tag"></script>

<!-- подключение riot.js с компилятором  -->
<script src="//cdn.rawgit.com/riot/riot/master/riot+compiler.min.js"></script>


<!-- монтирование -->
<script>
riot.mount('*')
</script>
```

Тег script и подключаемые файлы могут содержать множество пользовательских тегов, которые могут сочетаться с обычным JavaScript.

Riot автоматически компилирует пользовательские теги, прежде чем они будут использованы при вызове `riot.mount ()`.

### Доступ к объектам тегов
Если вы загружаете теги через `script src` и хотите получить доступ к подключаемому тегу, вам нужно обернуть вызов `riot.compile` следующим образом:

``` html
<script>
riot.compile(function() {
  // здесь теги компилируются и riot.mount сработает в синхронной манере
  var tags = riot.mount('*')
})
</script>
```

### Производительность компилятора

Фаза компиляции почти нисколько не занимает времени. Компиляция [тега таймера](https://github.com/riot/riot/blob/master/test/tag/timer.tag) 30 раз занимает 2 миллисекунды на обычном ноутбуке. Если у вас есть сумасшедшая страница с 1000 различных таймеров размера тегов, компиляция этого добра составит около 35 мс.

Вес компилятора всего лишь 3.2KB (1.7K сжатый), так что вы можете безопасно выполнять на стороне клиента компиляцию на продакшене без лишних проблем.

Читайте [API компилятора](/api/compiler/) для более подробной информации.

### Демо

- [Компиляция в браузере](http://muut.github.io/riotjs/demo/)
- [Пре-компиляция](http://muut.github.io/riotjs/demo/)
- [Source code](https://github.com/riot/riot/tree/gh-pages/demo)
- Скачайте демо как [zip-файл](https://github.com/riot/riot/archive/gh-pages.zip)



## <a name="pre-compilation"></a> Пре-компиляция

Пре-компиляция на сервере даёт вам следующее:

- Возможность компилировать теги с вашим [любимым препроцессором](#pre-processors).
- Небольшой выигрыш в производительности. Избавляет от необходимости загружать компилятор в браузер и выполнять сборку там.
- Универсальное (изоморфное) приложение и возможность рендерить теги на стороне сервера.

Пре-компиляция производится с помощью исполняемой программы `riot`, которую можно установить через npm следующим образом:

``` sh
npm install riot -g
```

После установки введите `riot --help` чтобы убедиться, что установка прошла успешно. Разумеется, для этого нужен установленный [node.js](http://nodejs.org/).

С пре-компиляцией ваш шаблон будет выглядеть примерно так:

``` html
<!-- mount point -->
<my-tag></my-tag>

<!-- include riot.js only -->
<script src="//cdn.jsdelivr.net/riot/2.3/riot.min.js"></script>

<!-- include pre-compiled tags (normal javascript) -->
<script src="path/to/javascript/with-tags.js"></script>

<!-- mount the same way -->
<script>
riot.mount('*')
</script>
```

### Использование

Команда `riot` работает так:

``` sh
# компилировать файл в текущей директории
riot some.tag

# компилировать файл в определённую директорию
riot some.tag some_folder

# компилировать файл по определённому пути
riot some.tag some_folder/some.js

# компилировать файлы из определённой директории в определённое место
riot some/folder path/to/dist

# компилировать файлы из директории и объединить их в один файл
riot some/folder all-my-tags.js

```

Исходный файл может содержать один или несколько пользовательских тегов и может быть регулярным JavaScript, который можно смешивать с пользовательскими тегами. Компилятор только преобразовать пользовательские теги и не затрагивает других частей исходного файла.

Детальная информация: `riot --help`


### Watch-мод

Вы можете следить за изменениями в файлах и автоматически их компилировать при изменении:

``` sh
# watch for
riot -w src dist
```


### Определённое расширение

Вместо дефолтного расширения `.tag`, вы можете использовать любое своё:

``` sh
riot --ext html
```


### Модуль node

``` javascript
var riot = require('riot')

var js = riot.compile(source_string)
```

Функция compile принимает строку и отдаёт другую строку.

### Плагины для популярных сборщиков

- [Gulp](https://github.com/e-jigsaw/gulp-riot)
- [Grunt](https://github.com/ariesjia/grunt-riot)
- [Browserify](https://github.com/jhthorsen/riotify)


## <a name="pre-processors"></a> Пре-процессоры

Это основной повод использовать пре-компиляцию. Вы можете использовать ваш любимый препроцессор для создания пользовательских тегов.

Исходный язык задается через аргумент `--type` или `-t` в командной строке, или вы можете определить язык в теге script следующим образом:


``` html
<my-tag>
  <h3>My layout</h3>

  <script type="coffee">
    @hello = 'world'
  </script>
</my-tag>
```

### CoffeeScript

``` sh
# использование препроцессора coffeescript
riot --type coffee --expr source.tag
```

Вы также можете использовать "cs" в качестве псевдонима "coffee". Вот пример тэг, записанный в CoffeeScript:

``` javascript
<kids>

  <h3 each={ kids[1 .. 2] }>{ name }</h3>

  # дети
  this.kids = [
    { name: "Max" }
    { name: "Ida" }
    { name: "Joe" }
  ]

</kids>
```

Отметьте, что `each` атрибут работает в CoffeeScript так же как и в нативном JS. Разумеется, что CoffeeScript должен быть установлен на вашей машине:

``` sh
npm install coffee-script -g
```


### EcmaScript 6

Для ECMAScript 6 используется тип тега "es6":

``` sh
# использование препроцессора ES6
riot --type es6 source.tag
```

Пример тега, написанный в ES6:

``` html
<test>

  <h3>{ test }</h3>

  var type = 'JavaScript'
  this.test = `This is ${type}`

</test>
```

Все ECMAScript 6 [фичи](https://github.com/lukehoban/es6features) доступны. В реализации используется [Babel](https://babeljs.io/):

``` sh
npm install babel
```

Вот другой [пример](https://github.com/txchen/feplay/tree/gh-pages/riot_babel) в котором используется Babel с Riot.

### TypeScript

TypeScript добавляет опциональную проверку в JavaScript. Для этого языка используйте `--type typescript`:

``` sh
# Использование препроцессора TypeScript
riot --type typescript source.tag
```

Пример на TypeScript:

``` html
<test>

  <h3>{ test }</h3>

  var test: string = 'JavaScript';
  this.test = test;

</test>
```

Для трансформации используется [typescript-simple](https://github.com/teppeis/typescript-simple):

``` sh
npm install typescript-simple
```
### LiveScript

Список фич языка можно увидеть [тут](http://livescript.net).

The source language is specified with `--type` or `-t` argument:

``` sh
# Использование препроцессора livescript
riot --type livescript --expr source.tag
```

Вы также можете использовать "ls" в качестве псевдонима "livescript". Вот пример тэг, записанный в livescript:

``` html
<kids>

<h3 each={ kids[1 .. 2] }>{ name }</h3>

# Here are the kids
this.kids =
* name: \Max
* name: \Ida
* name: \Joe

</kids>
```

LiveScript должен быть установлен:

``` sh
npm install LiveScript -g
```

### Jade
``` sh
# use Jade HTML pre-processor
riot --template jade source.tag
```

Пример с Jade:

``` jade
sample
  p test { value }
  script(type='text/coffee').
    @value = 'sample'
```

Для трансформации используется [jade](https://github.com/jadejs/jade).

``` sh
npm install jade
```



### Любой другой язык

Вы можете использовать любой язык для компиляции пользовательских тегов. Для этого вам нужно создать специальную функцию:

``` js
function myParser(js, options) {
  return doYourThing(js, options)
}
```

И передать её как параметр `parser` в `riot.compile`

``` js
var riot = require('riot')

var js = riot.compile(source_string, { parser: myParser, expr: true })
```

Установите `expr: true` если хотите, чтобы выражения js так же обрабатывались.

#### riot.parsers в браузере и на сервере

Вы можете создать свой собственный парсер для Riot и добавить его в `riot.parsers`. Например:

```js
riot.parsers.js.myJsParser = function(js, options) {
  return doYourThing(js, options)
}

riot.parsers.css.myCssParser = function(tagName, css) {
  return doYourThing(tagName, css)
}
```
Создав парсер и добавив его в `riot.parsers`, вы можете использовать его таким образом:

```html
<custom-parsers>
  <p>hi</p>
  <style type="text/myCssParser">
    @tag {color: red;}
  </style>
  <script type="text/myJsParser">
    this.version = "@version"
  </script>
</custom-parsers>
```

### Без трансформации

По умолчанию Riot использует встроенный преобразователь, что позволяет использовать некоторые ES6-фичи. Вы можете отключить все преобразования с `--type none`:

``` sh
# без преобразований
riot --type none --expr source.tag
```

### AMD и CommonJS
Теги Riot совместимы с `AMD` и ` CommonJS`. Это необходимо для тех случаев, когда Riot размещается на странице через загрузчики, вроде [RequireJS](http://requirejs.org/) или [Browserify](http://browserify.org/).

Библиотека Riot должен быть подключён как `riot` в обоих случаях.

``` sh
# Включение AMD и CommonJS
riot -m
```

Пример с AMD:

``` js

define(['riot', 'tags'], function (riot) {
  riot.mount('*')
})
```

Пример с CommonJS:

``` js
var riot = require('riot')
var tags = require('tags')

riot.mount('*')
```

Если вы сделали что-то интересное, пожалуйста, [поделитесь](https://github.com/riot/riot/issues/58) этим с сообществом!
