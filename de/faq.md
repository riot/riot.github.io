---
layout: default
title: Riot FAQ
description: Fragen und Antwort über Riot, User Interface (UI) Micro-Libary
---

# Frequently asked questions

## Wieso trägt dieses Projekt den Titel Riot?
Riot bedeutet Aufstand, und wir sind gegen den heutigen Trend von unnötiger Komplexität und Boilerplates. Wir denken, dass eine kleine aber mächtige API mit eindeutigem Syntax fundamentale Aspekte einer client-side Bibliothek sind.


## Is Riot free?
Riot ist gratis erhältlich, Open Source und unter der MIT Lizenz herausgegeben. Es gibt also keine [weiteren Patent-Rechte](https://github.com/facebook/react/blob/master/PATENTS).


## Can I use Riot in production?
Absolut. Riot ist ein fortgeschrittenes Framework welches [täglich](https://twitter.com/search?q=riotjs) Verwendung findet.

## Why IE8 is not supported?
Der Gedanke, einem sterbenden Browser Zeit zu widmen ist mehr als absurd. Wir erachten es als verrückt wichtige Entwicklerzeit in IE8 zu verschwenden. Gemeäß den Statistiken von [W3 counter](http://www.w3counter.com/trends), gibt es weltweit nur noch 1.5% IE8 Nutzer:

![](/img/ie8-trend.png)

Statcounter [says 2.5%](http://gs.statcounter.com/#browser_version_partially_combined-ww-monthly-201408-201507).

Dieser Browser kann also mit Sicherheit ignoriert werden. Riot 2.0 wurde noch mit IE8 Support veröffentlicht, aber seit der raschen Weiterentwicklung haben wir mehr als 50% IE8 Support verworfen.


## Should I use dash on the tag name?
Die W3C Spezifikation verlangt, dass eigene Tags mit einem Bindestrich versehen werden sollten. Also anstatt `<person>` sollte man `<my-person>` schreiben. Folge dieser Regel wenn du dich um die W3C Empfehlungen kümmerst. Beide Möglichkeiten funktionieren problemlos.


## Why are there no semicolons in the source code?
Wir haben uns entschlossen Semicolons aus dem Code zu verbannen damit dieser leichter leserlich wird. Diese Konvention stimmt mit unserem minimalistischem Grundsatz über ein. Wir benutzen einfache Anführungszeichen aus dem selben Grund. Wenn du zu Riot beitragen möchtest, bitten wir dich Strichpunkte und doppelte Anführungszeichen zu unterlassen.

## Why the use of evil `==` operator?
Der simple Vergleichsoperator ist gut wenn man weiß wie er funktioniert. Als beispiel machen wir uns das so zu nutze:

`node.nodeValue = value == null ? '' : value`

This causes `0` and `false` to be printed but `null` and `undefined` are printed as an empty string. Exactly what we want!


## Can I use `style` tags in a .tag file?
Yes. You can use CSS normally inside a tag. The web component standard also has a mechanism of encapsulating of CSS. However, it's unlikely that this improves the overall manageability of your CSS.


## Welche Rolle spielt jQuery?
Riot reduces the need for jQuery. You no longer need selectors, traversing, events and manipulation features. Some features like delegated events can be useful. jQuery plugins can be used together with Riot.


## Isn't `onclick` evil?
It's not evil, it just looks "old". To have JS and HTML under the same module is more important than aesthetics. The minimal Riot syntax makes event handlers look decent.

## Any future plans?

Sure. We mostly focus on [stability and performance](https://github.com/riot/riot/issues) and try to provide more [examples](https://github.com/riot/examples).

