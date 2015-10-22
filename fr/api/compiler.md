---
title: Compilateur
layout: default
class: apidoc
---

{% include api-tabs.html %}

## Sur le navigateur

Les méthodes suivantes s'appliquent uniquement aux navigateurs. Allez en [section serveur](#sur-le-serveur) si vous voulez compilez avec node ou io.js.

### <a name="compile"></a> riot.compile(callback)

Compile tous les tags définis avec `<script type="riot/tag">` en JavaScript. Il peut s'agir de définitions de scripts inline ou de ressources externes qui chargent des scripts définis avec l'attribut `src`. Une fois tous les scripts compilés, la fonction `callback` passée est appelée. Par exemple:

``` javascript
riot.compile(function() {
  var tags = riot.mount('*')
})
```

Vous pouvez écartez l'appel à `riot.compile` et juste écrire:

``` javascript
var tags = riot.mount('*')
```

mais vous ignorez quand toutes les ressources externes sont chargées et compilées. La valeur de retour sera une Array vide si vous avez des scripts externes. Si tous les scripts sont définis sur la page, alors l'appel à riot.compile peut être omis.

Pour plus de détails, lisez l'[introduction au compilateur](/guide/compiler/).

### <a name="compile-fn"></a> riot.compile(url, callback)

Charge l'URL donnée et compile tous les tags, après quoi la fonction `callback` est appelée. Par exemple:

``` javascript
riot.compile('my/tags.tag', function() {
  // les tags sont chargés et prêts à être utilisés
})
```

### <a name="compile-tag"></a> riot.compile(tag)

Compile et exécute le `tag` donné. Par exemple:

```
<template id="mon_tag">
  <mon-tag>
    <p>Hello, World!</p>
  </mon-tag>
</template>

<script>
riot.compile(mon_tag.innerHTML)
</script>
```

Après cet appel, vous pouvez utiliser `mon-tag` normalement.

Une définition de tag est repérée si le premier caractère non vide est `<`, autrement l'argument est considéré comme une URL.

### <a name="compile-to-str"></a> riot.compile(tag, true)

Compile le `tag` et le retourne sous forme de chaîne de caractères. Seule la transformation du tag en JavaScript est effectuée, le tag n'est pas exécuté sur le navigateur. Vous pouvez utiliser cette méthode pour par exemple mesurer la performance du compilateur.

``` js
var js = riot.compile(my_tag.innerHTML, true)
```

## Sur le serveur

Après avoir exécuté `npm install riot` , vous pouvez faire les choses suivantes:

```
var riot = require('riot')

var js = riot.compile(tag)
```

La fonction `compile` reçoit en argument une définition de tag (string) et retourne du JavaScript (string).

### <a name="css-parser"></a> riot.parsers.css [tagName, css]

Des parseurs personnalisés pouvant être utilisés pour compiler le CSS de vos tags. Par exemple:

```js
riot.parsers.css.myparser = function(tag, css) {
  return css.replace(/@tag/, tag)
}
```

```html
<custom-parsers>
  <p>hi</p>
  <style type="text/myparser">
    @tag {color: red;}
  </style>
</custom-parsers>
```

sera compilé en:

```html
<custom-parsers>
  <p>hi</p>
  <style type="text/myparser">
    custom-parsers {color: red;}
  </style>
</custom-parsers>
```

### <a name="js-parser"></a> riot.parsers.js [js, options]

Des parseurs personnalisés pouvant être utilisés pour compiler le JavaScript de vos tags. Par exemple:

```js
riot.parsers.js.myparser = function(js) {
  return js.replace(/@version/, '1.0.0')
}
```

```html
<custom-parsers>
  <p>hi</p>
  <script type="text/myparser">
    this.version = "@version"
  </script>
</custom-parsers>
```

sera compilé en:

```html
<custom-parsers>
  <p>hi</p>
  <script type="text/myparser">
    this.version = "1.0.0"
  </script>
</custom-parsers>
```

### <a name="html-parser"></a> riot.parsers.html [html]

Des parseurs personnalisés pouvant être utilisés pour compiler le HTML de vos tags.


