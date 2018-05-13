---
layout: default
title: Live demo
description: This is a series of examples designed to showcase the benefits of adopting Riot.
---

{% include example-tabs.html %}

Change the code of tag definition (left side) freely, then you'll see the result.

<iframe src="https://riot.js.org/examples/live-editor/"></iframe>

## How to use this tag?

You can mount this tag on HTML easily. Save the source above as `sample.tag`, and also create `index.html`:

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

That's it!

## Further reading

- [Riot Guide](/guide/)
- [API - Custom tags](/api/)
