---
layout: es
title: Diseño de aplicaciones
---

{% include es/guide-tabs.html %}

## Herramientas, no política

Riot viene con etiquetas personalizadas, un emisor de eventos (<dfn lang="en">Observable</dfn>) y un rúter (<dfn lang="en">Router</dfn>). Creemos que éstos son los bloques de construcción fundamentales para aplicaciones de lado cliente:

1. Etiquetas personalizadas para la interfaz de usuario,
2. Eventos para modularidad, y
3. Rúter para el URL y el botón de retroceso.

Riot trata de no imponer reglas estrictas, sino más bien proveer herramientas básicas para que usted las use de forma creativa. Este enfoque flexible deja las mayores decisiones arquitectónicas al desarrollador.

También pensamos que estos bloques de construcción deben ser mínimos en términos de tamaño de archivo y de funciones la API. Las cosas elementales deben ser simples, así la carga cognitiva es mínima.


## Observable

Observable es una herramienta genérica para emitir y recibir eventos. Es un patrón común aislar los módulos sin formar una dependencia o "acoplamiento" entre ellos. Al usar eventos, un programa grande puede ser dividido en unidades más pequeñas y simples. Los módulos se pueden agregar, remover, o modificar, sin afectar a las otras partes de la aplicación.

Una práctica común es la de dividir la aplicación en un solo núcleo y varias extensiones. El núcleo envía eventos en el momento que algo importante sucede: se añade un nuevo elemento, se quita un elemento existente, o algo se carga desde el servidor.

Mediante el uso de Observable las extensiones pueden escuchar estos eventos y reaccionar ante ellos. Observable extiende el núcleo de manera que éste no es consciente de los módulos. Esto se llama "acoplamiento débil" (<dfn lang="en">_loose coupling_</dfn>).

Las extensiones pueden ser etiquetas personalizadas (componentes de <abbr title="Interfaz de usuario, o UI (User Interface) por sus siglas en inglés">IU</abbr>) o módulos no-IU.

Cuando el núcleo y los eventos se diseñan cuidadosamente, cada miembro del equipo puede desarrollar el sistema por su cuenta sin perturbar a los otros.

[API de Observable](/es/api/observable/)


## Enrutamiento

El rúter (<dfn lang="en">Router</dfn>) es una herramienta genérica que toma cuidado del URL y el botón de retroceso del navegador. Es la implementación más pequeña que podrá encontrar. Hace lo siguiente:

1. Cambia el hash de la URL
2. Notifica cuando el hash cambia
3. Estudia el hash actual

Puede colocar lógica de enrutamiento en cualquier parte; en etiquetas personalizadas o módulos no-IU. Algunos marcos de aplicaciones (<dfn lang="en">frameworks</dfn>) hacen del rúter un elemento central que distribuye el trabajo a las otras partes de la aplicación. Algunos toman un enfoque medio donde los eventos de URL son como eventos de teclado, que no afectan a la arquitectura general.

Cada aplicación del navegador necesita enrutamiento, ya que siempre hay una URL en la barra de direcciones.

[API del rúter](/es/api/route/)


## Modularidad

Las etiquetas personalizadas forman la parte visual de su aplicación. En una aplicación modular, estas etiquetas no deben ser conscientes la una de la otra y deben estar aisladas. Lo ideal es que se pueda utilizar la misma etiqueta en todos los proyectos, independientemente del diseño HTML externo.

Si dos etiquetas saben la una de la otra, se vuelven dependientes y se introduce una "conexión estrecha" (_tight coupling_). Estas etiquetas no se pueden mover libremente sin "romper" el sistema.

Para reducir el acoplamiento, las etiquetas deben escuchar a eventos en lugar de llamarse directamente entre sí. Lo que se necesita es un sistema de publicación/suscripción construido con `riot.observable` o algo similar.

Este sistema emisor de eventos puede ir desde una API simple hasta una elección arquitectónica mayor, como [Facebook Flux](https://facebook.github.io/flux/).

### Diseño de ejemplo de una aplicación Riot

He aquí una estructura muy básica de una aplicación Riot para inicio de sesión de usuarios:

```js
// API de inicio de sesión
var auth = riot.observable()

auth.login = function(params) {
  $.get('/api', params, function(json) {
    auth.trigger('login', json)
  })
}
```

```html
<!-- login view -->
<login>
  <form onsubmit="{ login }">
    <input name="username" type="text" placeholder="nombre de usuario">
    <input name="password" type="password" placeholder="contraseña">
  </form>

  login() {
    opts.login({
      username: this.username.value,
      password: this.password.value
    })
  }

  // cualquier etiqueta del sistema puede escuchar al evento "login"
  opts.on('login', function() {
    $(body).addClass('logged')
  })
</login>
```

Y aquí montamos la aplicación:

```html
<body>
  <login></login>
  <script>riot.mount('login', auth)</script>
</body>
```

En la configuración anterior las otras etiquetas en el sistema no necesitan saber la una de la otra, ya que simplemente pueden escuchar el evento "login" y hacer lo que les parezca.

Observable es un clásico bloque de construcción para una aplicación desacoplada (modular).
