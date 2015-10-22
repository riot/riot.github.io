---
title: Divers
layout: fr
class: apidoc
---

{% include fr/api-tabs.html %}


### <a name="version"></a> riot.version

Le numéro de version actuel de Riot en String: `'{{ site.version }}'`


### <a name="brackets"></a> riot.settings.brackets

Un paramètre global de Riot pour personnaliser les caractères de début et de fin des expressions Riot. Par exemple:


``` js
riot.settings.brackets = '[% %]'
```

vous permet d'écrire des expressions `<p>[% comme_ca %]</p>`. Les caractères de début et de fin sont séparés par un caractère espace.
