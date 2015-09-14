---
layout: default
title: Design d'application
---

{% include guide-tabs.html %}

## Les outils avant tout

Riot est fourni avec des balises personnalisées, un émetteur d'événements (observable) et un routeur. Nous croyons qu'il s'agit là des blocs fondamentaux pour construire des applications côté client:

1. Balises personnalisées pour l'interface utilisateur
2. Evénements pour la modularité, et
3. Routeur pour l'URL et la navigation

Riot essaie de ne pas imposer de règles strictes, mais plutôt de vous fournir des outils de base à utiliser de manière créative. Cette approche plus flexible laisse les grandes décisions architecturales au développeur.

Nous pensons aussi que ces outils doivent être le plus petit possible en taille de fichier et d'API. Ces choses élémentaires doivent être suffisamment simples pour minimiser la charge cognitive du développeur.


## Observable

L'objet observable est un outil générique pour envoyer et recevoir des événements. C'est un schéma commun d'isoler les modules sans former de dépendances ou de "couplage". En utilisant les événements, un gros programme peut être décomposé en des unités plus petites et plus simples. Des modules peuvent être ajoutés, retirés ou modifiés sans affecter les autres parties de l'application.

Une pratique commune est de diviser l'application en un noyau et de multiples extensions. Le noyau envoie les événements chaque fois que quelque-chose de remarquable survient: un nouvel élément est ajouté, un élément existant est supprimé, ou quelque-chose a été chargé depuis le serveur etc...

En utilisant un observable, les extensions peuvent écouter ces événements et réagir. Ils viennent étendre le noyau de telle sorte que le noyau n'a pas conscience de leur présence. On appelle ce principe le "couplage faible".

Ces extensions peuvent être des balises personnalisées (modules UI) ou des modules non liés à l'interface utilisateur.

Une fois que le noyau et les événements ont été soigneusement conçus, les membres de l'équipe peuvent développer leur système sans se déranger l'un l'autre.

[API Observable](/api/observable/)


## Routage

Le routeur est un outil générique pour s'occuper de l'URL et de la navigation (bouton précédent). Il s'agit de la plus petite implémentation que vous pouvez trouver. Il peut faire les choses suivantes:

1. Changer le hash (la partie après le dièse) de l'URL
2. Signaler quand le hash change
3. Etudier le hash actuel

Vous pouvez placer la logique de routage n'importe où; dans les balises personnalisées ou dans d'autres modules non-UI. Certains frameworks applicatifs font du routeur un élément central qui répartit le travail aux autres parties de l'application. D'autres choisissent une approche plus légère où les événements de l'URL sont comme des événements clavier, et n'affectent pas l'architecture globale.

Chaque application sur navigateur a besoin d'un routage puisqu'il y a toujours une URL à gérer dans la barre d'adresse.

[API du Routeur](/api/route/)


## Modularité

Les balises personnalisées constituent la partie Vue de votre application. Au sein d'une application modulaire, ces balises ne doivent pas avoir connaissance les unes des autres et doivent être isolées. Idéalement, vous devriez pouvoir utiliser la même balise personnalisée entre plusieur projets sans tenir compte du balisage HTML extérieur.

Si deux balises ont connaissance l'une de l'autre, elles deviennent dépendantes et un "couplage fort" est introduit. Ces balises ne peuvent alors plus être déplacées librement sans casser le système.

Pour réduire le couplage, faites en sorte que vos balises écoutent des événements plutôt que de s'appeler directement par référence. Ce dont vous avez besoin est un système publication/souscription tel que `riot.observable`.

Ce système d'émission d'événements peut aller d'une simple API à un choix architectural plus large comme Flux par Facebook.

### Exemple de design d'une application Riot

Voici une structure d'application Riot réduite à l'essentiel pour gérer une identification utilisateur:

```js
// Login API
var auth = riot.observable()

auth.login = function(params) {
  $.get('/api', params, function(json) {
    auth.trigger('login', json)
  })
}
```
```html
<!-- vue login -->
<login>
  <form onsubmit="{ login }">
    <input name="username" type="text" placeholder="Nom d'utilisateur">
    <input name="password" type="password" placeholder="Mot de passe">
  </form>

  login() {
    opts.login({
      username: this.username.value,
      password: this.password.value
    })
  }

  // n'importe quelle balise personnalisée peut écouter cet événement login
  opts.on('login', function() {
    $(body).addClass('logged')
  })
</login>
```

Et voilà comment l'application est montée:

```html
<body>
  <login></login>
  <script>riot.mount('login', auth)</script>
</body>
```

Dans l'installation ci-dessus, les autres balises du système n'ont pas à connaître la vue "login" puisqu'elles peuvent simplement écouter l'événement "login" et faire ce qu'elles souhaitent ensuite.

L'objet observable est un élément de conception classique pour les applications découplées (modulaires).
