---
layout: es
title: Comparando Riot con React y Polymer
---

# **Riot** vs **React** y **Polymer**

Y cómo se diferencia Riot de sus primos más cercanos.

## React

Riot se inspiró en React y en la idea de la "cohesión". De acuerdo a los desarrolladores de Facebook:

> "Las plantillas alejan tecnologías, no preocupaciones."

Honramos esta idea. El objetivo es construir componentes reutilizables en lugar de plantillas. Al separar la lógica de las plantillas (utilizando selectores de jQuery, por ejemplo) en realidad estamos dejando fuera cosas que deberían estar juntas.

Al combinar tecnologías relacionadas, juntas bajo el mismo componente, el sistema se vuelve más limpio. Nuestros respetos a React por esta importante idea.

React funcionó bien para nosotros, y aun lo usamos en nuestro [Disqus Importer](https://importer.disqus.com/), pero nos molestaba el tamaño y la sintaxis de React (*especialmente* la sintaxis). Empezamos a pensar que podría ser más simple; tanto internamente como para el usuario.


### Sintaxis de React

El siguiente ejemplo fue tomado directamente de la página principal de React:


```javascript
var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});

React.render(<TodoApp />, mountNode);
```

JSX es una mezcla de HTML y JavaScript. Puede incluir HTML en cualquier parte del componente; dentro de los métodos y las asignaciones de propiedades.

### Sintaxis de Riot

Aquí está lo anterior con Riot:

```html
<todo>
  <h3>TODO</h3>

  <ul>
    <li each={ item, i in items }>{ item }</li>
  </ul>

  <form onsubmit={ handleSubmit }>
    <input>
    <button>Add #{ items.length + 1 }</button>
  </form>

  this.items = []

  handleSubmit(e) {
    var input = e.target[0]
    this.items.push(input.value)
    input.value = ''
  }
</todo>
```

Y así es como se monta la etiqueta anterior en una página:

```html
<todo></todo>

<script>riot.mount('todo')</script>
```

### Lo mismo, lo mismo — pero diferente

En Riot, tanto HTML como JavaScript parecen mucho más familiares. Ambos permanecen bajo el mismo componente, pero claramente separados unos de otros. El HTML se puede mezclar con expresiones de JavaScript.

Sin nada propietario, excepto la notación para encerrar expresiones dentro de llaves.

Usted ve menos código repetitivo. Menos paréntesis, llaves, comas, propiedades del sistema y nombres de métodos. Las cadenas pueden ser interpoladas: `"Hola {mundo}"` en lugar de `"Hola "+ this.state.world` y los métodos se pueden definir con la sintaxis compacta ES6. Sólo menos de todo.

Pensamos que la sintaxis de Riot es una forma más limpia de separar el diseño y la lógica, mientras se disfrutan los beneficios de componentes reutilizables aislados.


### Basado en cadenas y basado en DOM

Cuando un componente se inicializa React analiza una cadena y Riot atraviesa un árbol DOM.

Riot toma las expresiones del árbol y las almacena en una matriz. Cada expresión tiene un puntero a un nodo DOM. En cada ejecución estas expresiones se evalúan y comparan con los valores en el DOM. Cuando un valor cambia el nodo DOM correspondiente se actualiza. Así pues, Riot también tiene un DOM virtual, sólo que uno mucho más simple.

Dado que estas expresiones pueden almacenar en caché, un ciclo de actualización es muy rápido. Entre 100 y 1000 expresiones generalmente toma 1 milisegundo o menos.

El algoritmo de sincronización de React es mucho más complejo ya que el diseño HTML puede cambiar al azar después de cada actualización. Dado lo enorme del desafío, los desarrolladores de Facebook han hecho un trabajo impresionante con ello.

Nosotros vimos que el complejo algoritmo de comparación se puede evitar.

En Riot la estructura HTML es fija. Sólo los bucles y las condicionales pueden agregar y remover elementos. Esto significa, por ejemplo, que un `div` no se puede convertir en un `label`. Riot sólo actualiza las expresiones sin reemplazos complejos en el subárbol.


### Flux y el enrutamiento

React trata sólo con la interfaz de usuario, que es algo buena. Todos los grandes proyectos de software tienen un enfoque nítido.

Facebook recomienda usar [Flux](http://facebook.github.io/flux/docs/overview.html) para estructurar el código de lado cliente. Éste es más bien un patrón de diseño que un marco de programación (<dfn lang="en">framework</dfn>) y está repleto de grandes ideas.

Riot viene con etiquetas personalizadas, un emisor de eventos (<dfn lang="en">Observable</dfn>) y un rúter (<dfn lang="en">Router</dfn>). Creemos que estos son los pilares fundamentales para la construcción de aplicaciones del lado cliente. Los eventos brindan modularidad, un rúter se encarga de la dirección URL y el botón de retroceso, y las etiquetas personalizadas se encargan de la interfaz de usuario.

Al igual Flux, Riot es flexible y deja las decisiones arquitectónicas mayores al desarrollador. Riot es sólo una biblioteca para ayudarle a alcanzar la meta.

Usted puede construir un sistema similar a Flux utilizando los objetos Observable y Router de Riot. De hecho, algo así [ya existe](https://github.com/jimsparkman/RiotControl).


### De 10x a 128x mayor

React es 10x más grande que Riot.

<small><em>react.min.js</em> – 119KB</small>
<span class="bar red"></span>

<small><em>riot.min.js</em> – <span class="riot-size">{{ site.size_min }}KB</span></small>
<span class="bar blue" style="width: {{ site.size_min / 119 * 100 }}%"></span>

<br>

El rúter de React recomendado es 128x mayor que el rúter de Riot.

<small><em>react-router.min.js</em> – 54.9KB</small>
<span class="bar red"></span>

<small><em>react-mini-router.min.js</em> – 8.6KB</small>
<span class="bar red" style="width: 15.6%"></span>

<small><em>riot.router.min.js</em> – 0.43KB</small>
<span class="bar blue" style="width: 0.7%"></span>

Es cierto que esta comparación del rúter es un poco injusta porque [react-router](https://github.com/rackt/react-router) tiene muchas más características. Pero el cuadro anterior pone claramente de manifiesto el objetivo de Riot: proporcionar la mínima API posible para el trabajo.

El ecosistema React está más enfocado a frameworks y favorece APIs más amplias. La alternativa mayor es más popular que [react-mini-router](https://github.com/larrymyers/react-mini-router) en la comunidad React.


# Polymer

Polymer toma el estándar <dfn lang="en">Web Components</dfn> y lo pone a disposición de los navegadores más recientes. Esto le permite escribir etiquetas personalizadas de manera estándar.

Conceptualmente, Riot es lo mismo, pero hay diferencias:

1. Riot actualiza sólo los elementos que han cambiado, lo que resulta en menos operaciones DOM

2. La sintaxis de Polymer es más compleja y requiere que uno estudie más libros

3. Los componentes individuales se importan con `link rel="import"`. Los polyfills deben recurrir a una cola de llamadas XHR, que lo hace penosamente lento a menos que se utilice la herramienta dedicada [vulcanize](https://github.com/polymer/vulcanize). Las etiquetas de Riot se importan con `script src` y se pueden combinar varias etiquetas con las herramientas regulares que usa a diario.

4. Polymer no posee la habilidad de renderizar en el lado servidor.


### 11x mayor

Polymer(v1.0.6) + WebComponents(v0.7.7) es 11x mayor que Riot

<small><em>polymer.min.js</em> – 138KB</small>
<span class="bar red"></span>

<small><em>riot.min.js</em> – <span class="riot-size">{{ site.size_min }}KB</span></small>
<span class="bar blue" style="width: {{ site.size_min / 138 * 100 }}%"></span>

Se dice que, en referencia a los <dfn lang="en">polyfills</dfn>, los componentes Web son los [reyes de todos los desafíos](http://developer.telerik.com/featured/web-components-arent-ready-production-yet/) y esto es por lo que Polymer requiere de una cantidad tan grande de código.


### Experimental

Polymer se basa en una tecnología experimental. El soporte para Web Component nativo no está presente en Safari o IE. El estado de IE es "en consideración" y los planes de Safari son inciertos. Actualizaciones al [código de WebKit](https://lists.webkit.org/pipermail/webkit-dev/2013-May/024894.html) nos hacen pensar que no planean apoyarlos en lo absoluto. Y Polymer sólo es capaz de emularlos en _las versiones más recientes_ de los navegadores de última generación (<dfn lang="en">evergreen browsers</dfn>), como IE 10+.

El proyecto Polymer tiene alrededor de [2 años de antiguedad](https://github.com/Polymer/polymer/commit/0452ada044a6fc5818902e685fb07bb4678b2bc2) y no ha ganado una adopción significativa. Es incierto cuándo los componentes Web serán apoyados de forma nativa.
