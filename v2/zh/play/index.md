---
layout: zh
title: 在线演示
description: 一系列用来展示采用 Riot 的好处的示例 Riot.
---

{% include zh/example-tabs.html %}

随意修改标签的定义代码（左侧），可实时看到渲染结果。

<iframe src="http://riotjs.com/examples/live-editor"></iframe>

## 如何使用这个标签？

你可以很方便地在 HTML 中加载此标签. 将上面的代码保存为 `sample.tag`, 并创建 `index.html`:

```html
<html>
  <head>
    <title>Hello Riot.</title>
  </head>
  <body>
    <!-- 在body中任何位置放置自定义标签 -->
    <sample></sample>
    <!-- 包含标签定义 -->
    <script type="riot/tag" src="sample.tag"></script>
    <!-- 包含 riot.js -->
    <script src="https://cdn.jsdelivr.net/riot/2.3/riot+compiler.min.js"></script>
    <!-- 加载标签实例 -->
    <script>riot.mount('sample')</script>
  </body>
</html>
```

That's it!

## 参考阅读

- [Riot 指南](/zh/guide/)
- [API - 自定义标签](/zh/api/)
