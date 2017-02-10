---
layout: default
title: Riot FAQ
description: Fragen und Antwort über Riot, User Interface (UI) Micro-Libary
---

# Fragen und Antworten

## Wieso trägt dieses Projekt den Titel "Riot"?
"Riot" bedeutet Aufstand, und wir sind gegen den heutigen Trend von unnötiger Komplexität und Boilerplates. Wir denken, dass eine kleine aber mächtige API mit eindeutigem Syntax fundamentale Aspekte einer client-side Bibliothek sind.


## Ist Riot frei erhältlich?
Riot ist frei erhältlich, Open Source und unter der MIT Lizenz herausgegeben. Es gibt also keine [weiteren Patent-Rechte](https://github.com/facebook/react/blob/master/PATENTS).


## Kann Riot in Produktionsumgebungen verwendet werden?
Absolut. Riot ist ein fortgeschrittenes Framework welches [täglich](https://twitter.com/search?q=riotjs) Verwendung findet.

## Wieso wird IE8 nicht unterstützt?
Der Gedanke, einem sterbenden Browser Zeit zu widmen ist mehr als absurd. Wir erachten es als verrückt wichtige Entwicklerzeit in IE8 zu verschwenden. Gemeäß den Statistiken von [W3 counter](http://www.w3counter.com/trends), gibt es weltweit nur noch 1.5% IE8 Nutzer:

![](/img/ie8-trend.png)

Statcounter [says 2.5%](http://gs.statcounter.com/#browser_version_partially_combined-ww-monthly-201408-201507).

Dieser Browser kann also mit Sicherheit ignoriert werden. Riot 2.0 wurde noch mit IE8 Support veröffentlicht, aber seit der raschen Weiterentwicklung haben wir mehr als 50% IE8 Support verworfen.


## Sollte ich einen Bindestrich im eigenem Tag verwenden?
Die W3C Spezifikation verlangt, dass eigene Tags mit einem Bindestrich versehen werden sollten. Also anstatt `<person>` sollte man `<my-person>` schreiben. Folge dieser Regel wenn du dich um die W3C Empfehlungen kümmerst. Beide Möglichkeiten funktionieren problemlos.


## Wieso gibt es keine Strichpunkte im Source Code?
Wir haben uns entschlossen Semicolons aus dem Code zu verbannen damit dieser leichter leserlich wird. Diese Konvention stimmt mit unserem minimalistischem Grundsatz über ein. Wir benutzen einfache Anführungszeichen aus dem selben Grund. Wenn du zu Riot beitragen möchtest, bitten wir dich Strichpunkte und doppelte Anführungszeichen zu unterlassen.

## Wieso verwendet ihr den bösen `==` Vergleichsoperator?
Der simple Vergleichsoperator ist gut wenn man weiß wie er funktioniert. Als beispiel machen wir uns das so zu nutze:

`node.nodeValue = value == null ? '' : value`

Das verursacht, dass `0` und `false` als `null` dargestellt wird, und `undefined` als leerer string. Genau das was wir wollen!


## Kann ich `style` Elemente in einem eigenem Tag verwenden?
Ja, CSS kann wie gewohnt verwendet werden. Der Web component Standard beinhaltet auch einen Mechanismus um CSS modular einzubinden. Allerdings ist es unwahrscheinlich, dass das die Verwaltbarkeit von CSS erleichtert.


## Welche Rolle spielt jQuery?
Wir reduzieren den Gebrauch von jQuery auf ein Miminum. Du benötigst keine Selektoren, Events oder andere Manipulationsfeatures mehr, da diese von Riot verwaltet werden. Einige jQuery Funktionen sind dennoch nützlich, wie etwa delegierte Events. Jquery Plugins können problemlos mit Riot verwendet werden.


## Ist `onclick` nicht böse?
Onclick ist nicht böse sondern sieht einfach nur alt aus. Javascript und HTML im selben Modul unter einem Dach zu haben ist weit aus wichtiger als Ästhetik. Unser minimaler Lösungsansatz stellt herkömmliche eventhandler in den Schatten.

## Pläne für die Zukunft?

Auf jeden Fall! Wir konzentrieren uns zur zeit größtenteils auf [Stabilität und Performance](https://github.com/riot/riot/issues) und versuchen mehr [Beispiele](https://github.com/riot/examples) als bisher anzubieten.

