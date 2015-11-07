---
title: 自定义标签
layout: zh
class: apidoc
---

{% include zh/api-tabs.html %}


## 加载

### <a name="mount"></a> riot.mount(customTagSelector, [opts])

其中

- `customTagSelector` 选择器，从页面上选择元素，将自定义标签加载上去。选中的元素的标签名必须与自定义标签名相同;
- `opts` 可选。构造自定义标签实例的参数。可以任何数据，从简单的对象到完整的应用API。或者是一个Flux数据仓库。完全取决于你想要如何构造你的客户端应用。参阅[模块化Rio应用](../guide/application-design/#模块化).


``` js
// 选中并加载页面上所有的<pricing> 标签
var tags = riot.mount('pricing')

// 加载所有class名称是 .customer 的自定义标签
var tags = riot.mount('.customer')

// 加载 <account> 标签并传递一个 API 对象作为参数
var tags = riot.mount('account', api)
```

@返回值: 加载成功的[标签实例](#标签实例)的数组

### <a name="mount-star"></a> riot.mount('*', [opts])

Riot使用特殊选择器 "*" 来加载页面上所有自定义标签:

``` js
riot.mount('*')
```

@返回值: 加载成功的[标签实例](#标签实例)的数组


### <a name="mount-tag"></a> riot.mount(selector, tagName, [opts])

其中

- `selector` 选择器，选中的页面元素是加载目标
- `tagName` 待加载的自定义标签名
- `opts` 可选的标签参数


``` js
// 加载自定义标签 "my-tag" 到 div#main ，将 api 作为参数
var tags = riot.mount('div#main', 'my-tag', api)
```

@返回值: 加载成功的 [标签实例](#标签实例)数组


### <a name="mount-dom"></a> riot.mount(domNode, tagName, [opts])

将名为 tagName 的自定义标签加载到指定的 domNode 上，将可选的 opts 作为参数. 示例:

```js
// 加载 "users" 标签到 #slide 结点，api参数放在opts里
riot.mount(document.getElementById('slide'), 'users', api)
```

@返回值: 加载成功的 [标签实例](#标签实例) 数组

## 渲染

### <a name="render"></a> riot.render(tagName, [opts])

将标签渲染成 html. 只在 *服务端渲染* (Node/io.js) 时可用. 例如:

```js
// 将 "my-tag" 渲染成 html
var mytag = require('my-tag')
riot.render(mytag, { foo: 'bar' })
```

@返回值: html


## 标签实例

每一个标签实例有如下属性:

- `opts` - 参数对象
- `parent` - 父标签，可能为空
- `root` - 根 DOM 结点
- `tags` - 嵌套的自定义标签实例


你可以在HTML和JavaScript中使用这些变量，例如：


``` html
<my-tag>
  <h3>{ opts.title }</h3>

  var title = opts.title
</my-tag>
```

你可以随意添加数据到一个实例（也称作 “上下文”）中，添加后在HTML表达式中可用。：

``` html
<my-tag>
  <h3>{ title }</h3>

  this.title = opts.title
</my-tag>
```

## 更新

### <a name="tag-update"></a> this.update()

更新当前标签实例及所有子标签实例的所有表达式。此方法在每次用户与应用交互导致事件处理器被调用时会自动调用。

除此之外，riot不会自动更新视力，所以你需要手动调用此方法。通常这发生在某些非UI的事件中： `setTimeout`, AJAX 调用或服务端消息到达后，例如：

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

上例中错误信息在调用 `update()` 方法后才显示. 我们将 `this` 赋值给 `self` 是因为在 AJAX 回调函数内部 `this` 将指向 response 对象，而不是标签实例。


### <a name="tag-update-data"></a> this.update(data)

设置当前实例的值，并更新表达式。 效果与 `this.update()` 等价，但可以同时指定要更新的数据。所以，与其写:

``` js
self.error = error_message
self.update()
```

写成:

``` js
self.update({ error: error_message })
```

更简短干净。

### <a name="update"></a> riot.update() | #update

更新页面上所有加载的标签实例和它们的表达式。

@返回值: 加载成功的 [标签实例](#标签实例) 数组.


## 卸载

### <a name="tag-unmount"></a> this.unmount(keepTheParent)

将当前标签实例及其子孙从页面上移除。会触发 "unmount" 事件.
如果希望移除标签但保留最顶级的实例，需要给unmount方法一个 `true` 参数

从 DOM 中移除标签:

``` js
mytag.unmount()
```

保留顶级实例，移除所有的子标签:

``` js
mytag.unmount(true)
```

## 嵌套标签

用 `tags` 变量来访问嵌套的标签实例:

``` html
<my-tag>

  <child></child>

  // 访问子标签
  var child = this.tags.child

</my-tag>
```
如果使用了同一个子标签的多个实例，则它们是作为一个数组来访问的 `this.tags.child[n]`
也可以用 `name` 属性为嵌套标签实例取一个其它的名称。

``` html
<my-tag>

  <child name="my_nested_tag"></child>

  // 访问子标签
  var child = this.tags.my_nested_tag

</my-tag>
```

子标签实例的初始化发生在父标签实例初始化之后，所以在 “mount" 事件中子标签实例的方法和属性才可用。

``` html
<my-tag>

  <child name="my_nested_tag"></child>

  // 访问子标签方法
  this.on('mount', function() {
    this.tags.my_nested_tag.someMethod()
  })

</my-tag>
```

### <a name="yield"></a> 使用 `<yield>` 标签来包含内部HTML

`<yield>` 标签是riot的特殊核心功能，可以在运行时将自定义标签的内部模板进行编译和插入，这个技术使你可以用从服务端渲染生成的html内容来扩展你的标签模板

例如使用下面的 riot 标签 `my-post`

``` html
<my-post>
  <h1>{ opts.title }</h1>
  <yield/>
  this.id = 666
</my-post>
```

你可以在应用中随时包含 `<my-post>` 标签

``` html
<my-post title="What a great title">
  <p id="my-content-{ id }">My beautiful post is just awesome</p>
</my-post>
```

`riot.mount('my-post')` 加载后渲染成:

``` html
<my-post>
  <h1>What a great title</h1>
  <p id="my-content-666">My beautiful post is just awesome</p>
</my-post>
```

#### yield 与 循环

`<yield>` 标签可以用在循环中或子标签中，但你必须知道 __它总是使用子标签的数据进行解析和编译__

看下面的 `blog.tag` riot 组件

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

  // 本例中需要这个bind来在子标签里也保留父上下文
  deleteAllPosts() {
    this.posts = []

    // 我们需要手动调用 update 函数，因为当前函数由子标签触发，不会自动冒泡到父一级
    this.update()
  }.bind(this)

</blog>

<my-post>
  <h2>{ title }</h2>
  <p>{ description }</p>
  <yield/>
</my-post>

```

将编译成:

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


## 事件

每个标签实例都是一个 [observable](./observable) 所以你可以使用 `on` 和 `one` 方法来监听发生在标签实例上的事件. 以下是内置支持的事件:


- "update" – 标签实例被更新之前触发. 使得在UI表达式被更新之前重新计算上下文数据。
- "updated" - 标签实例被更新之后触发. 你可以在这里做一些dom更新的操作。
- "mount" – 在标签被加载到页面上后触发
- "unmount" – 在标签被从页面上移除后触发

例如:

``` js
// 当标签实例不再在DOM树中后，释放资源
this.on('unmount', function() {
  clearTimeout(timer)
})
```

## 保留字

上面提到的方法和属性名都是Riot标签的保留字. 不要使用这些作为你的实例变量或方法的名字: `opts`, `parent`, `root`, `update`, `unmount`, `on`, `off`, `one` 和 `trigger`. 局部变量可以随意命名，例如:

``` html
<my-tag>

  // 允许
  function update() { } 

  // 不允许
  this.update = function() { }

  // 不允许
  update() {

  }

</my-tag>
```

## 手动创建标签实例

### <a name="tag"></a> riot.tag(tagName, html, [css], [attrs], [constructor])

不使用编译器“手动”定义一个新的自定义标签.

- `tagName` 标签名
- `html` 带 [表达式](/riotjs/guide/#expressions) 的页面布局
- `css` 标签css (可选)
- `attrs` 标签属性字符串（可选）
- `constructor` 在标签表达式被计算前，标签被加载前调用的初始化函数


#### 示例

``` js
riot.tag('timer',
  '<p>Seconds Elapsed: { time }</p>',
  'timer { display: block; border: 2px }',
  'class="tic-toc"',
  function (opts) {
    var self = this
    this.time = opts.start || 0

    this.tick = function () {
      self.update({ time: ++self.time })
    }

    var timer = setInterval(self.tick, 1000)

    this.on('unmount', function () {
      clearInterval(timer)
    })

  })
```

参阅 [timer demo](http://jsfiddle.net/gnumanth/h9kuozp5/) 和 [riot.tag](/riotjs/api/#tag) API 文档了解更多细节和 *限制*.


**警告** 使用 `riot.tag` 就无法利用编译器带来的好处，以下功能不支持:

1. 自关闭标签
2. 不带引号的表达式. 只能写 `value="{ val }"` 不能写 `value={ val }`
3. 布尔属性. 只能写 `__checked="{ flag }"` 不能写 `checked={ flag }`
4. ES6 方法简写形式
5. `<img src={ src }>` 必须写成 `<img riot-src={ src }>` 以避免非法的服务器请求
6. `style="color: { color }"` 必须写成 `riot-style="color: { color }"` 才能支持IE


可以象下面这样利用 `<template>` 或 `<script>` :

```html
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

<span class="tag red">试验性api</span>

在 riot 2.3 中我们允许开发者访内部的 Tag 实例，以便使开发者能够以更加创新的方式来创建自定义标签。

- `impl`
  - `tmpl` 标签模板
  - `fn(opts)` 在 mount 事件发生时调用回调函数
  - `attrs` 一个对象(键值对容器)，包含根标签的html属性
- `conf`
  - `root` 要将标签模板加载到的ＤＯＭ结点
  - `opts` 标签参数
  - `isLoop` 是否用在循环标签里？
  - `hasImpl` 已经被用riot.tag注册过？
  - `item` 循环中绑定到此实例上的循环项
- `innerHTML` 用来替换模板中嵌入的`yield`标签的html内容

例如，用ES2015的写法：

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

一般情况下，不建议使用 `riot.Tag` 方法。只有在使用前面的riot方法无法满足你的特殊需求的时候才考虑用它。


