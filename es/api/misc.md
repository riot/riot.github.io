---
title: Miscelánea
layout: es
class: apidoc
---

{% include es/api-tabs.html %}


### <a name="version"></a> riot.version

El número de versión actual como cadena de caracteres: `'{{ site.version }}'`


### <a name="brackets"></a> riot.settings.brackets

Una configuración global de Riot para personalizar los caracteres que indican el inicio y final de una expresión. Por ejemplo:

``` js
riot.settings.brackets = '[% %]'
```

le permite escribir expresiones `<p>[% como_esta %]</p>`.

Ambas secuencias, inicial y final, pueden consistir de uno o más caracteres, separadas por un espacio. Evite los corchetes angulados (`<` y `>`) pues causan conflictos con algunos navegadores.
