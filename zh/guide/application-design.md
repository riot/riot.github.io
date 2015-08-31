---
layout: zh
title: 应用的整体设计
---

{% include zh/guide-tabs.html %}

## 提供工具，而不是策略

Riot 提供了自定义标签，事件触发器 (observable) 和路由功能. 我们相信这些是前端应用的基本组成单元：

1. 自定义标签用于用户界面,
2. 事件用于模块化
3. 路由用于 URL 管理和回退按钮支持.

Riot 尽量不使用强制的规则，而是提供最基本的工具，希望你能够有创意地使用它们。这种灵活的方式将应用层面的大的架构决策交还给开发者。

我们还认为这些组成单元应该在文件大小和API的数量上最小化。基本的东西应该是简单的，将认知的负担降到最低。


## Observable

Observable 是发送和接收消息的一般化工具。它是区分不同模块，减少依赖或“耦合”的常用模式。使用事件可以将大的程序分解成更小更简单的单元。可以添加、删除、修改各个模块而不影响应用的其它部分。

一种常用实践是将应用划分成单一的核心和多个扩展。这个核心在某些事情发生时（添加了新项，旧项被删除，或从服务端获取了数据）触发事件。

通过使用 observable，扩展部分可以监听这些事件并对其进行响应。核心并不知道这些扩展模块的存在。这称为“松耦合”。

这些扩展可以是自定义标签 (UI 组件) 或 非 UI 模块.

只要慎重设计好核心部分和事件接口，团队成员就可以各自独立开发，而互相不打扰。

[Observable API](/zh/api/observable/)


## Routing

路由器是管理URL和浏览器后退按钮的一般化工具。Riot的路由器是你能找到的最小实现，兼容包括IE8在内的众多浏览器。它做以下这些事情:

1. 修改 URL 的 hash 部分
2. hash 变化时进行通知
3. 查看当前 hash

路由的逻辑可以放在任何地方; 在自定义标签中或 非UI模块中. 有些应用框架将路由器作为一个中央模块，由它将任务派发给应用的其它部分。而有些则采取更温和的方式，将URL事件象键盘事件一样处理，不影响整体的架构。

任何浏览器应用都需要路由akce因为在地址栏里总是有一个URL的。

[路由器 API](/zh/api/route/)


## 模块化

自定义标签构成了应用的视图部分。在模块化的应用中，这些标签不应知晓互相之间的存在，应被隔离。理想情况下，你可以在整个项目中使用同一个标签，而不论外部的HTML布局如何变化。

如果两个标签知晓彼此的存在，则称它们互相依赖，造成了“紧耦合”。这样的标签就无法在系统中四处重用。

为了减少耦合，让标签之间互相监听消息而不是进行直接调用. 你都要好好的是用 `riot.observable` 构建的 发布/订阅系统。

这个事件发布系统可以是一套简单 API，或是象 Facebook Flux 一样的大型架构决策.

### Riot 应用设计实例

以下是一个非常小的实现用户登录的Riot应用骨架结构:

```js
// Login API
var auth = riot.observable()

auth.login = function(params) {
  $.get('/api', params, function(json) {
    auth.trigger('login', json)
  })
}


<!-- login 视图 -->
<login>
  <form onsubmit="{ login }">
    <input name="username" type="text" placeholder="username">
    <input name="password" type="password" placeholder="password">
  </form>

  login() {
    opts.login({
      username: this.username.value,
      password: this.password.value
    })
  }

  // any tag on the system can listen to login event
  opts.on('login', function() {
    $(body).addClass('logged')
  })
</login>
```

加载

```html
<body>
  <login></login>
  <script>riot.mount('login', auth)</script>
</body>
```

这样，系统中其它的标签不需要知道彼此的存在，只需要监听 "login" 事件，在处理器里实现自己需要的逻辑。

Observable 是实现松耦合（模块化）应用的经典模式。
