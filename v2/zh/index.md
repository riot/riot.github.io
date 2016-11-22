---
layout: zh
title: Riot.js — 类似 React 的微型展示层库
description: Riot lets you build user interfaces with custom tags using simple and enjoyable syntax. It uses a virtual DOM similar to React but faster. Riot is very tiny compared to industry standards. We think there is a clear need for another UI library.
---

<div id="hero">
  <img src="/img/logo/riot240x.png">
  <h1>类似 React 的微型 UI 库</h1>
  <h4>自定义标签 • 快速上手的语法 • 虚拟 DOM • 体积超小</h4>

  <div id="version-slurp">
    <a href="/v2/download/" class="tag blue">v{{ site.v2_version }}</a> &mdash;
    <a href="/v2/release-notes/">{{ site.v2_version_slurp }}&hellip;</a>
  </div>

</div>


# 为什么需要一个新的 UI 库?

前端世界的库已经太多了，但坦白说我们认为终极解决方案仍有待探索。我们相信 Riot 为解决前端开发的难题提供了正确的方向。React 似乎能够解决问题，但其自身仍有重大弱点，这些弱点正是 Riot 要克服的。

理由如下:

## 1. 自定义标签

Riot 在所有浏览器上支持自定义标签。

``` html
<todo>

  <!-- 布局 -->
  <h3>{ opts.title }</h3>

  <ul>
    <li each={ item, i in items }>{ item }</li>
  </ul>

  <form onsubmit={ add }>
    <input>
    <button>Add #{ items.length + 1 }</button>
  </form>

  <!-- css -->
  <style scoped>
    h3 {
      font-size: 14px;
    }
  </style>

  <!-- 业务逻辑 -->
  <script>
    this.items = []

    add(e) {
      var input = e.target[0]
      this.items.push(input.value)
      input.value = ''
    }
  </script>

</todo>
```

自定义标签将相关的 HTML 和 JavaScript 粘合在一起，成为一个可重用的组件。可以认为它同时具有 React 和 Polymer 的优点，但是语法更友好，学习成本更小。

### 对阅读友好

自定义标签允许你用HTML来编写复杂的用户界面。你的应用会长成这个样子:

``` html
<body>

  <h1>Acme community</h1>

  <forum-header/>

  <forum-content>
    <forum-threads/>
    <forum-sidebar/>
  </forum-content>

  <forum-footer/>

  <script>riot.mount('*', { api: forum_api })</script>
</body>
```

HTML 是web世界的 *标准* 语言，它就是被设计用来描述用户界面的。语法明确，语言天生支持嵌套，而属性可以作为向自定义标签提供选项的简洁手段。

Riot 标签首先被 [编译](/zh/guide/compiler/) 成标准 JavaScript，然后在浏览器中运行。


### 虚拟 DOM
- 保证最少量的DOM 更新和数据流动
- 单向数据流: 更新和删除操作由父组件向子组件传播
- 表达式会进行预编译和缓存以保证性能
- 为更精细的控制提供生命周期事件
- 支持自定义标签的服务端渲染，支持单语言应用


### 与标准保持一致
- 没有专有的事件系统
- 渲染出的 DOM 节点可以放心地用其它工具（库）进行操作
- 不要求额外的 HTML 根元素或 `data-` 属性
- 与 jQuery 友好共存


### 对工具友好
- 可选择使用 ES6, Typescript, CoffeeScript, Jade, LiveScript 或 [其它预处理器](/zh/guide/compiler/#pre-processors) 创建自定义标签
- 可与 NPM, CommonJS, AMD, Bower 或 Component 集成
- 可以利用 [Gulp](https://github.com/e-jigsaw/gulp-riot), [Grunt](https://github.com/ariesjia/grunt-riot) 或 [Browserify](https://github.com/jhthorsen/riotify) 插件



## 2. 简单，最小化

最小化是 Riot 区别于其它库的重要特点:


### 1. 友好的语法

设计目标之一是尽量少写脚手架（boilerplate）代码就能实现强大的标签语法:

- 强大的简化写法: `class={ enabled: is_enabled, hidden: hasErrors() }`
- 不需要费脑记忆 `render`, `state`, `constructor` 或 `shouldComponentUpdate`
- 直接插值: `Add #{ items.length + 1 }` 或 `class="item { selected: flag }"`
- 用 `<script>` 标签来包含逻辑代码不是必需的
- 紧凑的 ES6 方法定义语法


### 2. 非常低的学习成本

与其它 UI 库比较，Riot 所提供的 API 方法的数量要少 10 至 100倍。这意味着

- 需要学习的内容更少。需要阅读的书籍和指南文档更少。
- 专有的内容更少，而更多符合标准的成分。


### 3. 麻雀极小

<small><em>react.min.js</em> – {{ site.react.size }}KB</small>
<span class="bar red"></span>

<small><em>polymer.min.js</em> – {{ site.polymer.size }}KB</small>
<span class="bar red" style="width: {{ site.polymer.size | divided_by: site.react.size | times: 100 }}%"></span>

<small><em>riot.min.js</em> – {{ site.size_min }}KB</small>
<span class="bar blue" style="width: {{ site.size_min | divided_by: site.react.size | times: 100 }}%"></span>

- 更少的bug
- 解析更快，下载更迅速
- 方便嵌入. 库应该比整个应用小
- 维护工作量更小. 这样不需要一个庞大的团队来维护 Riot



### 4. 五脏俱全

Riot 拥有创建现代客户端应用的所有必需的成分:

- "响应式" 视图层用来创建用户界面
- 用来在各独立模块之间进行通信的事件库
- 用来管理URL和浏览器回退按钮的路由器（Router）

Riot 是一个 "开放栈". 它主要面向不希望被框架所牵制的开发人员。它提供的一般化的工具让开发者可以对设计模式进行混合和匹配。 类似 Facebook Flux 的系统完全可以 [自制](https://github.com/jimsparkman/RiotControl).


> 看了下 riot.js 的例子, 感觉如此干净, 惊呆了. [@paulbjensen](https://twitter.com/paulbjensen/status/558378720403419137)

> 刚刚把玩了 #RiotJS 一个小时. 很快就与 Gulp, Browsesify, 和 Babel 集成好了. 到目前为止非常喜欢! [@AndrewDelPrete](https://twitter.com/AndrewDelPrete/status/630976295011127296)

> 今天我首次试用了 #riotjs 2.0 。必须承认这将会是一段长期的『恋情』#js 强烈推荐. [@gianlucaguarini](https://twitter.com/gianlucaguarini/status/559756081862574080)

> 我喜欢 #reactjs 加 #flux 的思想但 #riotjs 加 #riotcontrol 更好!
[@tscok](https://twitter.com/tscok/status/580509124598829056)

> 看到了 RiotJS https://muut.com/riotjs/ — 完全被它的简单折服了. [@defeated](https://twitter.com/defeated/status/559215403541757952)

> 把玩了 riot.js ，对它的喜爱远胜 React. 最小化, 快速，还有一套全面的 API. [@juriansluiman](https://twitter.com/juriansluiman/status/560399379035865088)


## 结论

Riot 是普通人的 Web Component. 可以理解成不那么臃肿的 React + Polymer。 使用起来非常直观，而且轻若无物。它现在就好用。我们并没有重新发明轮子，而是从已有的工具中提取精华，构建出尽量简单的工具。

我们应该关注组件而不是模板. 引用 React 作者的话:

> "模板分离的是技术，而不是关注点。"

通过把相关的布局和逻辑放在同一个组件中，整个系统变得整洁清晰了。 我们为这个重要的洞见向 React 致敬。


## 最早的博客文章

[从 React 到 Riot 2.0](https://muut.com/blog/technology/riot-2.0/)


