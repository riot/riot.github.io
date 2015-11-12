---
title: 路由器
layout: zh
class: apidoc
---

{% include zh/api-tabs.html %}

Riot 路由器是一个最小化的路由器实现，实现了以下技术：

- pushState 和 history api
- 多个路由组
- 可替换的解析器
- 兼容IE9+

## 配置路由


### riot.route(callback)

当URL变化时执行 `callback` 例如

``` js
riot.route(function(collection, id, action) {

})
```

举个例子，如果 url 变成 `customers/987987/edit` 则上例中的参数是:


``` js
collection = 'customers'
id = '987987'
action = 'edit'
```

url 发生变化可能是以下几种情况:

1. 地址栏中输入的新的 hash 值
2. 当浏览器的 后退/前进按钮被点击
3. 当代码中调用了 `riot.route(to)`
4. 用户点击了锚点标签 (a 标签)

### riot.route(filter, callback)

<span class="tag red">&gt;= v2.3</span>

当 url 发生变化且新的 url 匹配 `filter` 时执行 `callback`. 例如：

```javascript
// 精确匹配 `/fruit`
riot.route('/fruit', function(name) {
  console.log('The list of fruits')
})
```

`filter` 支持 `*` 通配符，并且可以将其捕捉成参数：

```javascript
// 如果 url 变成 `/fruit/apple`,
// 'apple' 将被捕捉成 `name` 参数
riot.route('/fruit/*', function(name) {
  console.log('The detail of ' + name)
})

// 如果 url 变成 `/blog/2015-09/01`,
// 回调的参数将被捕捉成 '2015', '09' 和 '01'
riot.route('/blog/*-*/*', function(year, month, date) {
  console.log('The page of ' + year + '-' + month + '-' date)
})
```

如果希望匹配url `/old` 和 `/old/and/anything`, 可以写成 `..`:

```javascript
riot.route('/old..', function() {
  console.log('The pages under /old was moved.')
})
```

这种写法在 url 中包含搜索参数时很有用。

```javascript
// 如果 url 变成 `/search?keyword=Apple` 将会匹配
riot.route('/search..', function() {
  var q = riot.route.query()
  console.log('Search keyword: ' + q.keyword)
})

// 可以象下面这么写，
// 但要注意 `*` 只能匹配字母，数字和下划线
riot.route('/search?keyword=*', function(keyword) {
  console.log('Search keyword: ' + keyword)
})
```

<span class="tag red">注意:</span> 在内部实现中，通配符被转换成下面这样的正则:

- `*`: `([^/?#]+?)`
- `..`: `.*`

### riot.route.create()

<span class="tag red">&gt;= v2.3</span>

返回一个新的路由上下文。例如：

```javascript
var subRoute = riot.route.create()
subRoute('/fruit/apple', function() { /* */ })
```

更多细节请参考 [路由分组](#路由分组) 和 [路由优先级](#路由优先级) 部分。

## 使用路由器

### riot.route(to[, title])

修改浏览器 url 并通知所有用 `riot.route(callback)` 注册的监听者。例如：

```javascript
riot.route('customers/267393/edit')
```
从 v2.3 开始, 还可以设置 title:

```javascript
riot.route('customers/267393/edit', 'Editing customer page')
```


### riot.route.start()

开始监听url的变化.

``` js
riot.route.start()
```

<span class="tag red">&gt;= v2.3</span>

Riot不会自动 `start` 路由器。**不要忘记手动启动它**。 这也意味着你可以选择你喜欢的路由器。
(注意：在 v2.3 之前的版本中，Riot会自动启动路由器。这个行为发生了变化)

### riot.route.start(autoExec)

开始监听 url 变化，同时对当前 url 执行路由。

```js
riot.route.start(true)
```

这只是对下面写法的简写形式:

```js
riot.route.start()
riot.route.exec()
```


### riot.route.stop()

停止所有的路由器。清除所有 监听器和回调.

``` js
riot.route.stop()
```

通常这个方法会与 [riot.route.start](#route-start) 联合使用。例如：

```javascript
riot.route.stop() // clear all the old router callbacks
riot.route.start() // start again
```

### subRoute.stop()

<span class="tag red">&gt;= v2.3</span>

仅停止subRoute的路由。将会删除监听器和回调函数。

```javascript
var subRoute = riot.route.create()
subRoute('/fruit/apple', function() { /* */ })
subRoute.stop()
```

### riot.route.exec()

针对当前的url立即执行路由，而不是等url发生变化。例如:

```javascript
riot.route(function() { /* 定义路由 */ })
riot.route.exec()
```

<span class="tag red">警告:</span> `riot.route.exec(callback)` 从 `v2.3` 开始废弃.

### riot.route.query()

<span class="tag red">&gt;= v2.3</span>

这是个辅助函数，用来从url中提取query参数。 例如:

```javascript
// 如果 url 变成 `/search?keyword=Apple&limit=30` 将会匹配
riot.route('/search..', function() {
  var q = riot.route.query()
  console.log('Search keyword: ' + q.keyword)
  console.log('Search limit: ' + q.limit)
})
```

## 自定义路由器

### riot.route.base(base)

修改基础路径(base)。 如果 url 长成这样:

`http://riotexample.com/app/fruit/apple`

可以将基础路径设置为 `/app`, 这样就只需要关注 `/fruit/apple`.

```javascript
riot.route.base('/app')
```

默认的 `base` 值是 "#". 如果喜欢 hashbang, 可以改成 `#!`.

```javascript
riot.route.base('#!')
```

### riot.route.parser(parser[, secondParser])

将默认解析器改成自定义解析器. 下面是自定义路径解析的例子:

`!/user/activation?token=xyz`

``` js
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

当URL变化时，你可以获取这些参数:

```
riot.route(function(target, action, params) {

  /*
    target = 'user'
    action = 'activation'
    params = { token: 'xyz' }
  */

})
```

#### 二级解析器

<span class="tag red">&gt;= v2.3</span>

也可以通过设置 `secondParser` 来修改二级解析器。 二级解析器与 url 过滤器协同工作：

```javascript
// 这是默认解析器
function second(path, filter) {
  var re = new RegExp('^' + filter.replace(/\*/g, '([^/?#]+?)').replace(/\.\./, '.*') + '$')
  if (args = path.match(re)) return args.slice(1)
}

riot.route.parser(first, second)
```

如果解析器没有返回值，会尝试匹配下一个路由规则。

## 路由分组

传统的服务端路由是高度集中的，但近来的趋势是在页面上到处使用路由。考虑下面的情况：

```html
<first-tag>
  <p>First tag</p>
  <script>
    riot.route('/fruit/*', function(name) {
      /* 公用的部分 */
    })
  </script>
</first-tag>

<second-tag>
  <p>Second tag</p>
  <script>
    riot.route('/fruit/apple', function(name) {
      /* 个别的部分 */
    })
  </script>
</second-tag>
```

两个标签有各自的路由，看起来没什么问题，但事实上它无法工作。因为只有一个路由会被触发，我们也不知道是哪一个。所以，我们必须为每个标签定义创建单独的路由分组。例如：

```html
<first-tag>
  <p>First tag</p>
  <script>
    var subRoute = riot.route.create() // 创建新的路由上下文
    subRoute('/fruit/*', function(name) {
      /* 公用的部分 */
    })
  </script>
</first-tag>

<second-tag>
  <p>Second tag</p>
  <script>
    var subRoute = riot.route.create() // 创建新的路由上下文
    subRoute('/fruit/apple', function(name) {
      /* 个别的部分 */
    })
  </script>
</second-tag>
```

## 路由优先级

这个路由器会从第一个路由开始尝试匹配。所以在下面的鸽子中， 路由-B 和 -C 将永远不会被触发.

```javascript
riot.route('/fruit/*', function(name) { /* */ }) // 路由-A (1)
riot.route('/fruit/apple', function() { /* */ }) // 路由-B (2)
riot.route('/fruit/orange', function() { /* */ }) // 路由-C (3)
```

这么写就好使了:

```javascript
riot.route('/fruit/apple', function() { /* */ }) // 路由-B (1)
riot.route('/fruit/orange', function() { /* */ }) // 路由-C (2)
riot.route('/fruit/*', function(name) { /* */ }) // 路由-A (3)
```

所有 *带有过滤器* 的路由优先级高于 *不带过滤器* 的路由. 这意味着下例中路由-X 虽然定义在前，但最后才执行匹配:

```javascript
riot.route(function() { /* */ }) // 路由-X (3)
riot.route('/fruit/*', function() { /* */ }) // 路由-Y (1)
riot.route('/sweet/*', function() { /* */ }) // 路由-Z (2)
```






