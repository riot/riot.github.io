---
layout: default
title: Riot.js — Una micro biblioteca para interfaz de usuario similar a React
description: Riot le permite construir interfaces de usuario con _etiquetas_ personalizadas, usando una sintaxis simple y agradable, y un DOM virtual similar a React, pero más veloz. Riot es muy pequeño comparado a los estándares de la industria. Riot existe porque creemos que hay una clara necesidad de otra biblioteca UI.
---

<div id="hero">
  <img src="/img/logo/riot240x.png">
  <h1>Una micro biblioteca para interfaz de usuario similar a React</h1>
  <h4>Etiquetas personalizadas • Sintaxis agradable • DOM virtual • Tamaño minúsculo</h4>

  <div id="version-slurp">
    <a href="/download/" class="tag blue">v{{ site.version }}</a> &mdash;
    <a href="/release-notes/">{{ site.version_slurp }}&hellip;</a>
  </div>

</div>


# ¿Porqué necesitamos una nueva biblioteca para <abbr title="Interfaz de usuario, por sus siglas en Inglés">UI</abbr>?

El espacio de los frentes para aplicaciones está repleto, pero honestamente, sentimos que la solución aun está "allá afuera". Creemos que Riot ofrece el balance correcto para resolver el gran rompecabezas. Mientras React parece hacerlo, tiene serios puntos débiles que Riot resuelve.

He aquí porqué necesitamos esta nueva biblioteca:


## 1. Etiquetas (<dfn lang="en">tags</dfn>) personalizadas

Riot brinda etiquetas personalizadas para todos los navegadores.

```html
<todo>

  <!-- diseño -->
  <h3>{ opts.title }</h3>

  <ul>
    <li each={ item, i in items }>{ item }</li>
  </ul>

  <form onsubmit={ add }>
    <input>
    <button>Agregar #{ items.length + 1 }</button>
  </form>

  <!-- estilos -->
  <style scoped>
    h3 {
      font-size: 14px;
    }
  </style>

  <!-- lógica -->
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

Una etiqueta personalizada fusiona texto HTML y código JavaScript en un componente reutilizable. Piense en React + Polymer, pero con una sintaxis agradable y una mínima curva de aprendizaje.


### Lejible a humanos

Las etiquetas personalizadas le permiten construir vistas complejas con HTML. Su aplicación podría verse como algo así:

```html
<body>

  <h1>Comunidad Acme</h1>

  <forum-header/>

  <forum-content>
    <forum-threads/>
    <forum-sidebar/>
  </forum-content>

  <forum-footer/>

  <script>riot.mount('*', { api: forum_api })</script>
</body>
```

La sintaxis HTML es el idioma *de facto* de la web y está diseñado para construir interfaces de usuario. La sintaxis es explícita, la anidación es inherente al lenguaje, y los atributos ofrecen una manera limpia de proporcionar opciones a las etiquetas personalizadas.

Las etiquetas Riot son [convertidas](/guide/compiler/) a JavaScript "puro" antes que los navegadores las ejecuten.


### DOM virtual

- La mínima cantidad de actualizaciones y reflujos al DOM
- Flujo de datos de una vía: las actualizaciones y demontajes son propagados hacia abajo, del padre a los hijos
- Las expresiones son precompiladas y guardadas en caché para un alto desempeño
- Ciclo de vida de los eventos, para un mayor control
- Renderizado de las etiquetas en el lado servidor para aplicaciones universales (isomórficas)


### Cercano a los estándares
- Sin sistema de eventos propietario
- El DOM resultante puede ser libremente manipulado con otras herramientas
- Sin elementos HTML raíz adicionales o atributos `data-`
- Interactúa bien con jQuery


### Amigable a las herramientas

- Cree etiquetas con ES6, Typescript, CoffeeScript, Jade, LiveScript o [cualquier pre-procesador](/guide/compiler/#pre-processors) que desee
- Intégrelo con NPM, CommonJS, AMD, Bower o Component
- Utilícelo con conectores para [Gulp](https://github.com/e-jigsaw/gulp-riot), [Grunt](https://github.com/ariesjia/grunt-riot) o [Browserify](https://github.com/jhthorsen/riotify)



## 2. Simple y minimalista

Su minimalismo lo coloca aparte de los otros:


### 1. Sintaxis agradable

Uno de los objetivos en el diseño de Riot fue introducir una sintaxis de etiquetas poderosa, con el menor código repetitivo posible:

- Poderosos atajos: `class={ enabled: is_enabled, hidden: hasErrors() }`
- Sin carga extra al cerebro como `render`, `state`, `constructor` o `shouldComponentUpdate`
- Interpolación: `Agregar #{ items.length + 1 }` o `class="item { selected: flag }"`
- La etiqueta `<script>` para encerrar la lógica es opcional
- Sintaxis compacta ES6 para métodos


### 2. Mínima curva de aprendizaje

Riot tiene entre 10 y 100 veces menos API que otras bibliotecas UI.

- Menos que aprender. Pocos libros o tutoriales que ver
- Menos elementos propietarios y más elementos estándares


### 3. Tamaño minúsculo

<small><em>polymer.min.js</em> – 138KB</small>
<span class="bar red"></span>

<small><em>react.min.js</em> – 119KB</small>
<span class="bar red" style="width: {{ 138 / 119 * 100 }}"></span>

<small><em>riot.min.js</em> – {{ site.size_min }}KB</small>
<span class="bar blue" style="width: {{ site.size_min / 121 * 100 }}%"></span>

- Menos errores
- Más fácil de analizar y rápido para descargar
- Incorporable. La biblioteca debería ser menor que la aplicación
- Menos que mantener. No necesitamos un equipo grande para mantener Riot



### 4. Pequeño, pero completo

Riot tiene todos los bloques necesarios para construir aplicaciones modernas de lado cliente:

- Vistas "reactivas" para construir interfaces de usuario
- Biblioteca de eventos para construir APIs con módulos aislados
- _Router_ que administra el URL y el botón de retroceso

Riot es una "pila abierta". Esto es importante para los desarrolladores que quieren evitar lenguajes específicos a un _framework_. Las herramientas genéricas le permiten mezclar y seguir patrones de diseño. Sistemas como <dfn>Flux</dfn> de Facebook pueden ser [hechos por usted](https://github.com/jimsparkman/RiotControl).


> Vi el ejemplo de riot.js, y se siente tan limpio que da miedo. [@paulbjensen](https://twitter.com/paulbjensen/status/558378720403419137)

> Sólo me lié con #RiotJS durante una hora. Lo tuve configurado con Gulp, Browserify y Babel al instante. Me gusta mucho lo que va! [@AndrewDelPrete](https://twitter.com/AndrewDelPrete/status/630976295011127296)

> Hoy usé #riotjs 2.0 por primera vez y puedo admitir que será una relación a largo plazo #js altamente recomendado. [@gianlucaguarini](https://twitter.com/gianlucaguarini/status/559756081862574080)

> Me gustó la idea de #reactjs con #flux pero me gusta #riotjs con #riotcontrol aun más! [@tscok](https://twitter.com/tscok/status/580509124598829056)

> Viendo RiotJS https://muut.com/riotjs/ — impresionado por su simplicidad. [@defeated](https://twitter.com/defeated/status/559215403541757952)

> Jugué con riot.js y me gustó mucho más que React. Minimalista, rápido y con una API comprensible. [@juriansluiman](https://twitter.com/juriansluiman/status/560399379035865088)


## Conclusión

Riot es componentes Web para todos. Piense en React + Polymer, pero sin la sobrecarga. Su uso es intuitivo y pesa casi nada. Y trabaja _hoy_. No reinventa la rueda, sino más bien toma las partes buenas de lo que hay y crea la herramienta más simple posible.

Deberíamos enfocarnos en componentes reutilizables en lugar de plantillas.
Según los desarrolladores de React:

> "Las plantillas separan tecnologías, no quitan preocupaciones."

Al tener el diseño y la lógica relacionada juntos en el mismo componente el sistema en general se vuelve más limpio. Respetamos a React por esta importante idea.


## La entrada inicial del blog

[De React a Riot 2.0](https://muut.com/blog/technology/riot-2.0/)
