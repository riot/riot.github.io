---
layout: default
title: FAQ de Riot
description: Preguntas y respuestas acerca de Riot, la micro-biblioteca de Interfaz de Usuario (IU)
---

# Preguntas contestadas frecuentemente

## ¿Porqué este proyecto fue llamado Riot?
Riot está en contra de la tendencia actual de código repetitivo y complejidad innecesaria. Pensamos que una pequeña, pero potente API y una sintaxis concisa son cosas muy importantes en una biblioteca de lado cliente.

* _n.t._ un de los significados de "riot" en inglés es "motín".

## ¿Es Riot gratuito?
Riot es gratuito, de código abierto y licenciado bajo la licencia MIT. No hay [subvenciones adicionales por derechos de patente](https://github.com/facebook/react/blob/master/PATENTS).


## ¿Puedo usar Riot en producción?
Absolutamente. Este es un marco de programación maduro [adoptado a diario](https://twitter.com/search?q=riotjs).

## ¿Porqué no está soportado IE8?
Debido a que es una locura gastar tiempo de desarrollo en un navegador moribundo. De acuerdo a [W3 counter](http://www.w3counter.com/trends), solo el 1.5% está con IE8:

![](/img/ie8-trend.png)

Statcounter [dice 2.5%](http://gs.statcounter.com/#browser_version_partially_combined-ww-monthly-201408-201507).

Este navegador de baja calidad se puede ignorar con seguridad. Riot 2.0 fue lanzado con apoyo a IE8, pero desde entonces su uso ha bajado más de un 50%.


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
