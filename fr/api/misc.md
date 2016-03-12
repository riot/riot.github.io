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

### <a name="tmpl-errors"></a> riot.util.tmpl.errorHandler

Un hook utilitaire vous permettant d'intercepter toutes les erreurs retournées par le moteur de templating de Riot

```js
riot.util.tmpl.errorHandler = function (err) {
  console.error(err.message + ' dans ' + err.riotData.tagName) // votre logique de gestion d'erreur ici
}
```
