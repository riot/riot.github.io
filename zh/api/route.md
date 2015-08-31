---
title: 路由器
layout: zh
class: apidoc
---

{% include zh/api-tabs.html %}

Riot 路由器是你能够找到的最小化的路由器实现，在包括IE8在内的众多浏览器上都能工作。它只监视URL hash的变化 (`#` 之后的那一部分). 大多数单页应用都只处理hash，如果你真的需要关心整个URL的变化你最好使用其它的路由器实现。

Riot 路由器在 "#" 之后的部分由 "/" 字符分隔时工作得最好. 这种情况下Riot直接把各个部分取出来供你使用。


### riot.route(callback) 

当URL hash变化时执行 `callback` 例如

``` js
riot.route(function(collection, id, action) {

})
```

举个例子，如果 hash 变成 `#customers/987987/edit` 则上例中的参数是:


``` js
collection = 'customers'
id = '987987'
action = 'edit'
```

hash 发生变化可能是以下几种情况:

1. 地址栏中输入的新的 hash 值
2. 当浏览器的 后退/前进按钮被点击
3. 当代码中调用了 `riot.route(to)` 

### riot.route.start() 

开始监听window hash. 这个方法在riot加载时会自动调用. 如果你要调用它，通常是与 [route.stop](#route-stop) 一起使用. 例如:

``` js
riot.route.stop() // 清除所有旧的 riot.route 回调
riot.route.start() // 重新启动
```

### riot.route.stop() 

清除所有 hashchange 监听器以及 [route.route](#route) 回调.

``` js
riot.route.stop()
```

停止默认路由器后可以在应用中使用其它的路由器。

### riot.route(to) 

修改浏览器URL并通知所有通过 `riot.route(callback)` 指定的监听器，例如:

``` javascript
riot.route('customers/267393/edit')
```

### riot.route.exec(callback) 

对当前的 hash 值调用 `callback` 而不等待其发生变化。例如

``` js
riot.route.exec(function(collection, id, action) {

})
```

### riot.route.parser(parser) 

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
