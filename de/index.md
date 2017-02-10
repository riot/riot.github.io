---
layout: default
title: Riot.js — Eine React-ähnliche user interface micro-library
description: Riot lets you build user interfaces with custom tags using simple and enjoyable syntax. It uses a virtual DOM similar to React but faster. Riot is very tiny compared to industry standards. We think there is a clear need for another UI library.
---

<div id="hero">
  <img src="/img/logo/riot240x.png">
  <h1>Eine React-ähnliche user interface micro-library</h1>
  <h4>Custom tags • Enjoyable syntax • Virtual DOM • Tiny size</h4>

  <div id="version-slurp">
    <a href="/download/" class="tag blue">v{{ site.version }}</a> &mdash;
    <a href="/release-notes/">{{ site.version_slurp }}&hellip;</a>
  </div>

</div>


# Wieso benötigen wir noch eine weitere UI Bibliothek?

Der Frontendbereich ist mehr als überfüllt mit existierenden Lösungen, aber wir denken, dass noch immer nicht DIE Lösung existiert. Wir glauben, dass Riot der Mittelweg der Lösungsansätze ist. Während React die üblichen Anforderungen erfüllt, gibt es dennoch Problempunkte die wir mit Riot lösen wollen.

Nochmal im Detail:


## 1. Custom tags

Mit Riot kann man Browser-unabhängig custom Tags verwenden.

``` html
<todo>

  <!-- Layout -->
  <h3>{ opts.title }</h3>

  <ul>
    <li each={ item, i in items }>{ item }</li>
  </ul>

  <form onsubmit={ add }>
    <input>
    <button>#{ items.length + 1 } Hinzufügen</button>
  </form>

  <!-- Style -->
  <style scoped>
    h3 {
      font-size: 14px;
    }
  </style>

  <!-- Logik -->
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

Ein custom tag verbindet HTML mit der Logik von JavaScript um wiederverwendbare Module zu erstellen. Vergleichbar mit React + Polymer aber mit angenehmem Syntax und deutlich einfacherer Lernbarkeit.


### Human-readable

Mit Custom tags können komplexe Views erstellt werden. Deine Anwendung könnte in etwa so aussehen:

``` html
<body>

  <h1>Acme Community</h1>

  <forum-header/>

  <forum-content>
    <forum-threads/>
    <forum-sidebar/>
  </forum-content>

  <forum-footer/>

  <script>riot.mount('*', { api: forum_api })</script>
</body>
```

HTML ist die meistverwendete Sprache im Web, und sie ist dafür gemacht um Inhalte und Layouts zu erschaffen. Mit eindeutiger Syntax und der Möglichkeit Elemente in einer Strukturhirarchie anzuordnen, bietet HTML mit Attributen um Custom Tags mit Optionen auszustatten, die beste Möglichkeit um User Interfaces zu entwickeln.

Riot tags werden zu purem JavaScript [konvertiert](/guide/compiler/), bevor Browser diese ausführen können.


### Virtuelles DOM
- Minimalst möglichste DOM Updates und Reflows
- Logischer Datenfluss: Updates und Unmount werden von Elterntags hinab zu Kindertags der Reihe nach ausgeführt
- Expressions werden vorkompiliert und gecached um beste Performance zu erzielen
- Lifecycle events für mehr Kontrolle über die Applikation
- Eigene Tags könen serverseitig gerendet werden um diese universell zu verwenden


### Nahe dem Standard
- Kein proprietäres Event-System
- Das gerenderte DOM kann mit anderen Tools frei manipuliert werden
- Keine zusätzlichen HTML root Elemente oder `data-` Attribute
- Funktioniert problemlos zussammen mit jQuery


### Nutze deine lieblingstools
- Erstelle Tags mit ES6, Typescript, CoffeeScript, Jade, LiveScript oder jedem anderen [beliebigen pre-processor](/guide/compiler/#pre-processors)
- Integriere Riot mit NPM, CommonJS, AMD, Bower oder Component
- Entwickle mit [Gulp](https://github.com/e-jigsaw/gulp-riot), [Grunt](https://github.com/ariesjia/grunt-riot) oder [Browserify](https://github.com/jhthorsen/riotify) plugins



## 2. Simpel und minimalistisch

Riot zeichnet sich gegenüber anderen Lösungen durch Minimalismus aus:


### 1. gemütlicher Syntax

Eines unserer Ziele, war es einen mächtigen Syntax anzubieten, während aber HTML so gering wie möglich gehalten wird: 

- Power shortcuts: `class={ enabled: is_enabled, hidden: hasErrors() }`
- Gedankenentlastung durch Vermeidung redundanter Befehle wie `render`, `state`, `constructor` oder `shouldComponentUpdate`
- Interpolation: `Füge #{ items.length + 1 } hinzu` oder `class="item { selected: flag }"`
- `<script>` um Logik zu deklarieren kann ausgelassen werden
- Kompakter ES6 Funktions-syntax


### 2. Geringe Lernkurve

Riot hat zwischen 10 und 100 mal weniger API Methoden als andere UI Bibliotheken.

- Weniger zu lernen. Weniger Tutorials oder Bücher zu durchstöbern
- Weniger proprietärer Zusatz und nahegelegen am Standard


### 3. Geringe Dateigröße

<small><em>polymer.min.js</em> – 138KB</small>
<span class="bar red"></span>

<small><em>react.min.js</em> – 119KB</small>
<span class="bar red" style="width: {{ 138 / 119 * 100 }}"></span>

<small><em>riot.min.js</em> – {{ site.size_min }}KB</small>
<span class="bar blue" style="width: {{ site.size_min / 121 * 100 }}%"></span>

- Weniger Bugs
- Schnelleres Parsen und günstigerer Download
- Embeddable. Riot ist üblicherweiße kleiner als die Applikation
- Weniger zu warten. Wir benötigen kein gigantisches Team um Riot zu warten



### 4. Klein aber komplett

Riot besitzt bereits alle fundamentalen Bau-Blöcke um moderne clientseitige Applikationen zu bauen:

- "Reactive" views um User Interfaces zu bauen
- Event Bibliothek um APIs mit isolierten Modulen zu erstellen
- Ein Router um sich um die URL und den Zurück-Button zu kümmern

Riot wird als "open stack" bezeichnet. Was bedeutet, dass Entwickler, die Framework spezifische Ausdrücke und Ideen vermeiden einen einfachen Einstieg in die Technologie haben. Die generischen Werkzeuge lassen jeden Entwickler eigene Applikationsstrukturen und Designs implementieren. Systeme wie etwa Facebook Flux können problemlos mit Riot [selbst](https://github.com/jimsparkman/RiotControl) gemacht werden.


> I looked at the riot.js example, and it feels so clean, it's scary. [@paulbjensen](https://twitter.com/paulbjensen/status/558378720403419137)

> Just messed around with #RiotJS for an hour. Got it setup with Gulp, Browsesify, and Babel in no time. I like it a lot so far! [@AndrewDelPrete](https://twitter.com/AndrewDelPrete/status/630976295011127296)

> Today I have used #riotjs 2.0 for the first time and I could admit that It will be a long term relationship #js highly recommended. [@gianlucaguarini](https://twitter.com/gianlucaguarini/status/559756081862574080)

> I liked the idea of #reactjs with #flux but I like #riotjs with #riotcontrol even better!
[@tscok](https://twitter.com/tscok/status/580509124598829056)

> looking at RiotJS https://muut.com/riotjs/ — blown away by its simplicity. [@defeated](https://twitter.com/defeated/status/559215403541757952)

> Played with riot.js and like it so much more than React. Minimalistic, fast and a comprehensible API. [@juriansluiman](https://twitter.com/juriansluiman/status/560399379035865088)


## Fazit

Riot bietet Webkomponenten für alle. Denke etwa an React + Polymer aber weniger aufgeblasen. Es bildet eine intuitive Bibliothek und wiegt praktisch fast nichts. Kein Rad muss neu erfunden werden. Aber wir bevorzugen die guten Dinge von dem was bereits existiert um das wohl  einfachste Tool zu schaffen.

Wir sollten uns auf wiederverwendbare Komponenten konzentrieren als auf Templates. So nach den Entwicklern von React:

> "Templates separate technologies, not concerns."

Wenn Layout und relevante Logik beieinander im selben Modul sitzen, wird das Gesamtsystem viel einfacher handzuhaben. Wir achten React für diesen wichtigen Einblick über den Tellerrand hinaus.


## Ursprünglicher Blog Eintrach

[Von React zu Riot 2.0](https://muut.com/blog/technology/riot-2.0/) (Englisch)


