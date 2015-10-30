---
layout: zh
title: Riot FAQ
description: Questions and Answers about Riot, User Interface (UI) Micro-Libary
---

# 常见问题

### 为什么叫 Riot?
Riot 是对当前写大量脚手架（boilerplate）代码和不必要的复杂性的反动。我们认为对前端库来说，少量而强大的API加上简洁的语法是至关重要的。


### Riot 免费吗?
Riot 免费，开源，使用 MIT License. 没有 [专利](https://github.com/facebook/react/blob/master/PATENTS) 风险.


### Riot 可以用于生产吗?
绝对可以. 它是一个很成熟的[被日常使用的](https://twitter.com/search?q=riotjs)框架.

## 为什么不支持 IE8?
因为浪费开发者时间去支持一个将死的浏览器简直是疯了。 根据 [W3 counter统计](http://www.w3counter.com/trends), IE8 市场份额只有 1.5% :

![](/img/ie8-trend.png)

Statcounter的数据是 [2.5%](http://gs.statcounter.com/#browser_version_partially_combined-ww-monthly-201408-201507).

这款低质量的浏览器已经可以安全地被忽略了（译注：中国大陆开发者对此表示遗憾）。Riot 2.0 起步时支持 IE8 但至今 IE8 的用户已经减少了 50%

### 标签名中必须使用横线 (译者注：-) 吗?
W3C 规范要求在标签名中使用横线。所以 `<person>` 需要写成 `<my-person>`. 如果你关心 W3C 的话就遵循这个规则. 其实两者都能跑.


### 为什么源码中没有分号?
不写分号使代码更整洁。这与我们的整体的最小化哲学是一致的。同样的原因，我们使用单引号，如果你想为Riot贡献代码，请不要使用分号和双引号。

### 为什么使用邪恶的 `==` 运算符?
这个运算符，如果你知道它的工作原理，就没那么邪恶了，例如:

`node.nodeValue = value == null ? '' : value`

这将导致 `0` 和 `false` 被显示而 `null` 和 `undefined` 显示为空字符串。这正是我们想要的！


### 可以在 .tag 文件中使用 `style` 标签吗?
可以。可以在标签定义中使用CSS。web component标准也有一套CSS封装的机制。但是其实这不会改进对你的CSS的管理。


### jQuery是个什么角色?
Riot 减少了对jQuery的需求。你不再需要选择器，遍历，事件和dom操作功能。有些功能如delegate事件会有用. jQuery插件可以和 Riot 一起使用.


### `onclick` 不是邪恶的吗?
不是邪恶， 只是看起来“过时”。将JS和HTML放在同一个模块里比美学重要。Riot的最小化语法使事件处理器看起来很象样儿。

### 将来的计划?

当然。我们主要关注 [稳定性和性能](https://github.com/riot/riot/issues) ，并希望能够提供更多的 [示例](https://github.com/riot/examples)。
