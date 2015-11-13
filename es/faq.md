---
layout: es
title: FAQ de Riot
description: Preguntas y respuestas acerca de Riot, la micro-biblioteca de Interfaz de Usuario (IU)
---

# Preguntas contestadas frecuentemente

## ¿Porqué este proyecto fue llamado Riot?
Riot está en contra de la tendencia actual de código repetitivo y complejidad innecesaria. Pensamos que una pequeña, pero potente API y una sintaxis concisa son cosas muy importantes en una biblioteca de lado cliente.

* _n.t._ un de los significados de "riot" en inglés es "motín".

## ¿Es Riot gratuito?
Riot es gratuito, de código abierto y distribuido bajo la licencia MIT. No hay [subvenciones adicionales por derechos de patente](https://github.com/facebook/react/blob/master/PATENTS).


## ¿Puedo usar Riot en producción?
Absolutamente. Este es un marco de programación maduro [adoptado a diario](https://twitter.com/search?q=riotjs).

## ¿Porqué no está soportado IE8?
Debido a que es una locura gastar tiempo de desarrollo en un navegador moribundo. De acuerdo a [W3 counter](http://www.w3counter.com/trends), solo el 1.5% está con IE8:

![](/img/ie8-trend.png)

Statcounter [dice 2.5%](http://gs.statcounter.com/#browser_version_partially_combined-ww-monthly-201408-201507).

Este navegador de baja calidad se puede ignorar con seguridad. Riot 2.0 fue lanzado con soporte para IE8, pero desde entonces su uso ha disminuido en más de un 50%.


## ¿Debo usar un guión en el nombre de la etiqueta?
La especificación W3C demanda que usted use un guión en el nombre de la etiqueta. En lugar de `<person>` debe escribir `<my-person>`. Siga esta regla si le preocupa el W3C. Ambos modos funcionan bien.


## ¿Porqué no hay puntos y comas en el código fuente?
Omitir el punto y coma hace que el código se vea más claro. Esto va de acuerdo con nuestro enfoque minimalista en general. Utilizamos comillas simples por el mismo motivo. Si usted contribuye a Riot, por favor omita puntos y comas y comillas dobles.

## ¿Porqué usar el nefasto operador `==`?
El operador de igualdad es bueno cuando usted sabe cómo funciona. Por ejemplo, podemos hacer esto:

`node.nodeValue = value == null ? '' : value`

Lo que provoca que `0` y `false` sean impresos tal cual, pero `null` y `undefined` sean impresos como una cadena en blanco. ¡Exactamente lo que queremos!


## ¿Puedo usar etiquetas `style` en un archivo .tag?
Sí. Puede usar CSS normalmente dentro de una etiqueta. El estándar de componentes web también cuenta con un mecanismo de encapsulación de CSS. Sin embargo, es poco probable que esto mejore la capacidad de administración general de su CSS.


## ¿Cuál es el papel de jQuery?
Riot reduce la necesidad de jQuery. Ya no necesita selectores, desplazamiento, eventos y características de manipulación. Algunas características como eventos delegados pueden ser útiles. Se pueden utilizar los plugins de jQuery junto con Riot.


## ¿No es `onclick` funesto?
No lo es, solamente se ve "viejo". El tener JS y HTML bajo el mismo módulo es más importante que lo estético. La sintaxis minimalista de Riot hace que los controladores de eventos se vean decentes.

## ¿Hay planes futuros?

Por supuesto. Nos estamos centrando, sobre todo, en [la estabilidad y el desempeño](https://github.com/riot/riot/issues) e intentamos proporcionar más [ejemplos](https://github.com/riot/examples).
