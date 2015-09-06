---
layout: ru
title: Riot FAQ
description: Questions and Answers about Riot, User Interface (UI) Micro-Libary
---

# Frequently asked questions

## Why is this project called Riot?
Riot is against the current trend of boilerplate and unneeded complexity. We think that a small, powerful API and concise syntax are extremely important things on a client-side library.


## Is Riot free?
Riot is free, open source and licensed under the MIT License. There are no [Additional Grant of Patent Rights](https://github.com/facebook/react/blob/master/PATENTS).


## Can I use Riot in production?
Absolutely. It's a mature framework [embraced daily](https://twitter.com/search?q=riotjs).

## Why IE8 is not supported?
Because it's crazy to waste developer time for a dying browser. According to [W3 counter](http://www.w3counter.com/trends), only 1.5% are on IE8:

![](/img/ie8-trend.png)

Statcounter [says 2.5%](http://gs.statcounter.com/#browser_version_partially_combined-ww-monthly-201408-201507).

This low-quality browser can safely be ignored. Riot 2.0 was launched with IE8 support but since then the use has dropped more than 50%.


## Should I use dash on the tag name?
W3C specification demands you use a dash in the tag name. Instead of `<person>` you must write `<my-person>`. Obey this rule if you care about W3C. Both work fine.


## Why are there no semicolons in the source code?
Leaving out semicolons makes the code less crowded. This is aligned with our general minimalistic approach. We use single quotes for the same reason. If you contribute to Riot, please leave out semicolons and double quotes.

## Why the use of evil `==` operator?
The equality operator is good when you know how it works. We do this for example:

`node.nodeValue = value == null ? '' : value`

This causes `0` and `false` to be printed but `null` and `undefined` are printed as an empty string. Exactly what we want!


## Can I use `style` tags in a .tag file?
Yes. You can use CSS normally inside a tag. The web component standard also has a mechanism of encapsulating of CSS. However, it's unlikely that this improves the overall manageability of your CSS.


## What's the role of jQuery?
Riot reduces the need for jQuery. You no longer need selectors, traversing, events and manipulation features. Some features like delegated events can be useful. jQuery plugins can be used together with Riot.


## Isn't `onclick` evil?
It's not evil, it just looks "old". To have JS and HTML under the same module is more important than aesthetics. The minimal Riot syntax makes event handlers look decent.

## Any future plans?

Sure. We mostly focus on [stability and performance](https://github.com/riot/riot/issues) and try to provide more [examples](https://github.com/riot/examples).

