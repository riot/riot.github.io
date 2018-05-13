---
layout: ja
title: ライブデモ
description: これはRiotを採用するためのメリットを示すための一例です。
---

{% include ja/example-tabs.html %}

タグ定義（左側）のコードを自由に変更すると、その結果が反映されます。

<iframe src="https://riot.js.org/examples/live-editor/"></iframe>

## どのように使うの?

簡単にHTMLにこのタグをマウントすることができます。以下のソースを`sample.tag`として保存し、`index.html`を作成してください:

```html
<html>
  <head>
    <title>Hello Riot.</title>
  </head>
  <body>
    <!-- place the custom tag anywhere inside the body -->
    <sample></sample>
    <!-- include the tag -->
    <script type="riot/tag" src="sample.tag"></script>
    <!-- include riot.js -->
    <script src="https://cdn.jsdelivr.net/npm/riot@{{ site.minor_version }}/riot+compiler.min.js"></script>
    <!-- mount the tag -->
    <script>riot.mount('sample')</script>
  </body>
</html>
```

ね、簡単でしょ？

## 参考文献

- [Riotガイド](/ja/guide/)
- [API - カスタムタグ](/ja/api/)
