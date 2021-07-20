---
title: Riot FAQ
layout: detail
description: Questions and Answers about Riot, User Interface (UI) Micro-Libary
---

## Frequently asked questions

### Why is this project called Riot?
Riot is against the current trend of boilerplate and unneeded complexity. We think that a small, powerful API and concise syntax are extremely important things on a client-side library. Riot also provides an unopinionated stack that gives developers the freedom to work with the best technology they like.

### Is Riot free?
Riot is free, open source and licensed under the MIT License.

### Can I use Riot in production?
Absolutely. The project is mature enough.

### Which browsers are supported?

<a target="_blank" rel="nofollow" href="https://saucelabs.com/u/testsriotjs">
<img src="https://saucelabs.com/browser-matrix/testsriotjs.svg" alt="Browser Support Matrix"/>
</a>

Riot.js supports all the major modern browsers
Browsers like IE11 are not supported: if you need to support older browsers you might consider using an [older Riot version]({{ site.data.globals.legacy }})

### Should I use a dash (-) in the tag name?
W3C specification demands you use a dash in the tag name. Instead of `<person>` you must write `<my-person>`. Obey this rule if you care about W3C. Both work fine. [More info](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)

### Why are there no semicolons in the source code?
Leaving out semicolons makes the code less crowded. This is aligned with our general minimalistic approach. We use single quotes for the same reason. If you contribute to Riot, please leave out semicolons and double quotes.

### Can I use `style` tags in a .riot file?
Yes. You can use CSS normally inside a Riot tag file. The web component standard also has a mechanism for CSS encapsulation. However, it's unlikely that this improves the overall manageability of your CSS.

### Isn't `onclick` evil?
It's not evil, it just looks "old". To have JS and HTML under the same module is more important than aesthetics. The minimal Riot syntax makes event handlers look decent.

### Any future plans?

Sure. Please make sure to check our [GitHub Discussions Page](https://github.com/riot/riot/discussions)

