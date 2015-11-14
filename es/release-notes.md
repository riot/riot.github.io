---
layout: es
title: Notas de la versión
id: release-notes
---

# {{ page.title }}

## 2.2.4 *Agosto 12, 2015*

- Corrige los errores en el núcleo que quedan antes de la liberación la versión mayor 2.3.0 [detalles](https://github.com/riot/riot/issues?q=is%3Aissue+milestone%3A2.2.4)
- Agrega soporte para múltiples bloques de estilo en el mismo componente
- Corrige errores relacionados a la pérdida del contexto en bloques anidados
- Se agregaron más pruebas al código base
- *NOTA*: Esta es la última versión estable con soporte para IE8
- [Ruta a corto plazo](https://github.com/riot/riot/issues/1063)

## 2.2.3 *Agosto 4, 2015*

- Corrige muchos errores [más detalles](https://github.com/riot/riot/issues/1063)

## 2.2.2 *Julio 5, 2015*

- Los nuevos componentes hijos heredarán las propiedades del padre también en un bucle
- El nuevo riot es capaz de compilar atributos también en la etiqueta de nivel superior [más detalles](https://github.com/riot/riot/issues/948)
- Mejoras en el desempeño de los bucles y corrige muchos errores
- Mejoras en la compatibilidad AMD/CommonJS
- Corrige el error generado en el compilador debido a etiquetas que usan el atributo type=text/javascript
- Corrige las variables del padre no se exponen a los hijos en un bucle, ahora __todos los hijos en un bucle heredarán las propiedades y métodos del padre__ [más detalles](https://github.com/riot/riot/issues/896)
- Corrige el error generado al tratar de sobrescribir propiedades de sólo-lectura de los eventos
- Corrige la combinación del cli de riot con el indicador --modular cuando no se especifica ningún archivo de salida

## 2.2.1 *Junio 28, 2015*

- Corrige las opciones no se transmiten correctamente a los hijos en un bucle [más detalles aquí](https://github.com/riot/riot/issues/884)

## 2.2.0 *Junio 27, 2015*

- Nueva lógica súper rápida para bucles ( los nodos DOM ya no serán reordenados [más detalles aquí](https://github.com/riot/riot/issues/484) )
- Rehabilita el modo `use strict`
- Rehabilita el modo `coffescript` para los nostálgicos
- Corrige inconsistencias al usar bucles con matrices nulas o vacías
- Corrige el error `mount` en el bucle hijo
- Incrementa la cobertura del código
- Añade la posibilidad de especificar dónde riot inyectará las etiquetas personalizadas [CSS en el DOM](/es/guide/#scoped-css)

La lista de los errores corregidos y los detalles se pueden encontrar [aquí](https://github.com/riot/riot/issues/773)

## 2.1.0 *Mayo 20, 2015*

- [Mixins](/es/guide/#mixins)
- Capacidad para definir atributos para el elemento raíz en la definición de la etiqueta
- Se separa el compilador para node del compilador para el navegador
- Se simplifica el guión de construcción usando [smash](https://github.com/mbostock/smash)
- Se agregan hooks de pruebas Saucelabs para comprobación en múltiples navegadores
- Se agregan hooks de Coveralls para comprobar la cobertura del código en cualquier "pull request"

La lista de los errores corregidos y los detalles se pueden encontrar [aquí](https://github.com/riot/riot/issues/648)

## 2.0.15 *Abril 23, 2015*

- Una nueva etiqueta `<yield>` del núcleo que permite [transclusión html](/es/guide/#html-anidado)
- Un nuevo atributo [riot-tag](/es/guide/#elementos-html-como-etiquetas) para usar elementos estándar de HTML como nodos de montaje
- `tag.unmount(flag)` para decidir si el padre debe ser removido del DOM
- Métodos `riot.route.start()` y `riot.route.stop()` para iniciar y detener el rúter Riot. Estos métodos permiten el uso de un rúter diferente en su aplicación.
- El compilador de lado servidor ahora es compatible con los módulos de AMD y CommonJS con la opción de línea de comandos `--modular` o `-m`.
- Numerosas [correcciones de errores](https://github.com/riot/riot/issues/584)
- Un agradecimiento especial a *[@GianlucaGuarini](https://github.com/GianlucaGuarini)* por esta versión


## 2.0.14 *Abril 8, 2015*

- [Renderizado en el servidor](/es/guide/#renderizado-en-el-servidor)
- [Correciones de errores](https://github.com/riot/riot/compare/v2.0.13...v2.0.14)

## 2.0.13 *Marzo 11, 2015*

- Una versión con amplia corrección de errores consistente únicamente de [pull requests](https://github.com/riot/riot/compare/v2.0.12...v2.0.13) de la comunidad. ¡Gracias!
- Amplio [conjunto de pruebas](https://github.com/riot/riot/tree/master/test)

## 2.0.12 *Marzo 2, 2015*

- Soporte para [Scoped CSS](/es/guide/#scoped-css)
- Accesso directo a [etiquetas anidadas](/es/api/#etiquetas-anidadas) y su API por medio de la variable `tags`. Por ejemplo: `tags.my_timer.clear()`
- Las etiquetas personalizadas ahora se construyen cuando se analizan y se inicializan durante el montaje. Este es un trabajo preliminar para el próximo [sistema de plugins](https://github.com/riot/riot/issues/416) y permitirá a los plugins hacer su labor antes de la inicialización también.
- La opción `--whitespace` del compilador para preservar finales de línea y espacios en blanco en la salida generada, algo bueno para elementos `pre` y `textarea` anidados.
- Uso de [Karma](http://karma-runner.github.io/0.12/index.html) para pruebas en múltiples navegadores
- *CUIDADO* se removerá la obsoleta `riot.mountTo` en la próxima versión


## 2.0.11 *Febrero 23, 2015*

- `riot.mount` ahora acepta los mismos parámetros que `riot.mountTo`, que ahora está *obsoleta*
- La nueva función `riot.mount(selector, tagName, opts)` permite montar determinadas etiquetas a cualquier selección de elementos HTML
- `riot.unmount` seguido por `riot.mount` ahora reemplaza correctamente la etiqueta anterior
- Suite de pruebas v1. Esperamos que esto crezca en tamaño y funcionalidad. Gracias a [@GianlucaGuarini](https://github.com/GianlucaGuarini)


## 2.0.10 *Febrero 19, 2015*

- [Ejemplo Todo MVC](https://github.com/txchen/feplay/tree/gh-pages/riot_todo)
- Los elementos de una matriz se pueden reordenar y la vista se actualiza en consecuencia. Gracias a [@pakastin](https://github.com/pakastin)!
- Las etiquetas `style` anidadas se inyectan automáticamente en `<head>` para evitar definiciones duplicadas
- Capacidad para definir etiquetas en la misma línea: `<tag></tag>`
- Métodos de estilo ES6 en una línea única: `foo() { this.bar = 'baz' }`
- Se evitan solicitudes ilegales de imágenes al servidor: `<img src={ src }>`
- Corrección al compilador para que soporte corchetes personalizados
- `this.update()` ya no se necesita al definir etiquetas manualmente por medio de `riot.tag`. Este método se llama ahora automáticamente después de que se ejecute un controlador de eventos
- [Directrices para contribuir](https://github.com/riot/riot/blob/master/CONTRIBUTING.md)


## 2.0.9 *Febrero 13, 2015*

- Soporte para LiveScript
- Capacidad para establecer los atributos `if`, `show` y `hide` para etiquetas personalizadas
- Atajos para clases múltiples: `{ 'foo bar': baz }`
- Desaparece la propiedad `children`, diseñada principalmente por una necesidad teórica
- Una corrección a fuga de memoria en `riot.observable`. Gracias a [@GianlucaGuarini](https://github.com/GianlucaGuarini) por el duro trabajo de depuración y todo lo demás en este [pull request](https://github.com/riot/riot/issues/248)


## 2.0.8 *Febrero 9, 2015*

- Nuevo método `unmount()` y propiedad `children[]` para [instancias de etiquetas](/es/api/#tag-instance)
- Flujo de datos de una vía: las actualizaciones y desmontajes siempre se propagan hacia abajo, de padres a hijos
- El atributo `if` ahora funciona como se espera, añadiendo o eliminando el nodo raíz del DOM
- La [API del compilador](/es/api/compiler/) se expone al público
- Se soportan variables globales en las expresiones, ej. `{ location }`
- Extensión `.tag` personalizable, ej. `riot --ext html`
- [Corchetes personalizables](/es/api/misc/#brackets), ej. `riot.settings.brackets = '${ }'`
- Capacidad para imprimir el número de la versión actual: `riot --version`
- El semioculto `riot._tmpl()` ahora está completamente oculto y no es parte del objeto global `riot`
- Reorganización del código fuente. El antiguo y grande `view.js` ahora está dividido en [múltiples archivos](https://github.com/riot/riot/tree/master/lib/browser/tag)


## 2.0.7 *Enero 29, 2015*

- Súper rápida [compilación en el navegador](/es/guide/compile/) para: `<script type="riot/tag">`
- Soporte incorporado para [Typescript](/es/guide/compiler/#typescript)
- Capacidad para conectar un preprocesador HTML (junto con un preprocesador JS)
- Soporte incorporado para [Jade](/es/guide/compiler/#jade)
- Capacidad para definir [analizadores personalizados](/es/api/#route-parser) para el rúter.
- El marcaje puede escribirse con XML válido y las etiquetas HTML5 vacías no se cierran
- Permite la definición de etiquetas personalizadas vacías. Algo bueno en la fase de desarrollo.
- `riot.observable()` ahora devuelve un nuevo observable cuando se le llama sin argumentos
- Ahora las llamadas al compilador son como esta:


```
var riot = require('riot')
var js_string = riot.compile(tag_source_string)
```


## 2.0.5 *Enero 27, 2015*

- Capacidad de conectar un preprocesador JavaScript
- Soporte incorporado para CoffeeScript
- Soporte incorporado para EcmaScript 6


## 2.0.2 *Enero 26, 2015*

- Soporte CommonJS y AMD
- Soporte a Component
- Soporte a Bower
- `npm install` ahora trabaja bajo io.js y node 0.11
- `require('riot')` ahora devuelve riot.js (se integra muy bien con Browserify etc.)
- `require('riot/compiler')` devuelve el compilador
- `riot.js` y `riot.min.js` se encuentran ahora en la raíz del repositorio
- Hospedaje en [cdnjs](https://cdnjs.com/libraries/riot) y [jsdelivr](http://www.jsdelivr.com/#!riot)


## 2.0 *Enero 22, 2015*

[A React- like, 2.5KB user interface library](https://muut.com/blog/technology/riot-2.0/)

Una actualización significativa, no compatible hacia atrás.

![](https://muut.com/blog/technology/riot-2.0/riot1to2.png)


## 1.0 *April 15, 2014*

Se remueve la dependencia de jQuery.


## 0.9 *Noviembre 01, 2013*

[The 1kb client-side MVP library](https://muut.com/blog/technology/riotjs-the-1kb-mvp-framework.html)

La versión inicial.
