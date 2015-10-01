---
layout: default
title: Application design
---

{% include guide-tabs.html %}

## nicht Regeln sondern Tools

Riot wird zussammen mit eigenen Tags, Event Emitter (observable) und Router ausgegeben. Wir glauben, dass diese die essentiellsten Bausteine für Clientseitige Applikationen bildet:

1. Eigene tags für das User Interface,
2. Events für Modularität, und
3. Router um die URL zu überwachen und für den zurück-Button.

Riot versucht nicht strenge Regeln durchzusetzen, sondern simple frei verwendbare Tools anzubieten die kreativ miteinander kombiniert werden können. Diese Flexibilität ermöglicht es auch größere Software-Architektur zu designen und überlässt dem Designer die größeren organisatorischen Aufgaben..

Wir denken auch, dass diese Baubläcke nur ein Minimum der Dateigröße und API einnehmen sollte. Fundamentale Dinge sollten so simpel wie möglich gestaltet sein, um weniger Gedanken an kompelxe API Aufrufe zu verschwenden.


## Überwachungsmodul (Observable)

Das Überwachungsmodul bietet ein sehr generisches Werkzeug um Events innerhalb zu senden und darauf zu reagieren. Observable wurde geschaffen um Module isolierbar zu machen, ohne Abhängigkeiten zu bilden oder sogenanntes "coupling" entstehen zu lassen. Events werden genutzt um sogar die größten Programme in kleinere Teile aufzubrechen. Module können hinzugefügt, entfernt oder modifiziert werden ohne andere Teile der Software zu beeinträchtigen.


Üblicherweise wird eine große Applikation in eine einzige core mit mehreren Erweiterungen gesplittet. Der Hauptteil sendet dann Events zu den kleineren Erweiterungen und kann darauf reagiert werden:
Ein neues Object wird hinzugefügt, ein existierendes gelöscht, oder Daten werden von einem Server geladen.


By using the observable the extensions can listen to these events and react to them. They extend the core so that the core is not aware of these modules. This is called "loose coupling".

These extensions can be custom tags (UI components) or non-UI modules.

Once the core and events are carefully designed the team members are enabled to develop the system on their own without disturbing others.

[Observable API](/api/observable/)


## Routing

Router is a generic tool to take care of the URL and the back button. It's the smallest implementation you can find. It can do the following:

1. Change the hash part of the URL
2. Notify when the hash changes
3. Study the current hash

You can place routing logic everywhere; in custom tags or non-UI modules. Some application frameworks make the router a central element that dispatches work to the other pieces of the application. Some take a milder approach where URL events are like keyboard events, not affecting the overall architecture.

Every browser application needs routing since there is always an URL in the location bar.

[Router API](/api/route/)


## Modularity

Custom tags make the view part of your application. In modular application these tags should not be aware of each other and they should be isolated. Ideally you can use the same tag across projects regardless of the outer HTML layout.

If two tags know about each other they become depdendent and a "tight coupling" is introduced. These tags cannot be freely moved around without breaking the system.

To reduce coupling, have the tags listen for events rather than call each other directly. What you need is a publish/subscribe system built with `riot.observable` or similar.

This event emitting system can range from a simple API to a larger architectural choice like Facebook Flux.

### Example Riot application design

Here is a very bare bones Riot application structure for user login:

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
<!-- login view -->
<login>
  <form onsubmit="{ login }">
    <input name="username" type="text" placeholder="username">
    <input name="password" type="password" placeholder="password">
  </form>

  login() {
    opts.login({
      username: this.username.value,
      password: this.password.value
    })
  }

  // any tag on the system can listen to login event
  opts.on('login', function() {
    $(body).addClass('logged')
  })
</login>
```

And here we mount the application

```html
<body>
  <login></login>
  <script>riot.mount('login', auth)</script>
</body>
```

On the above setup the other tags on the system do not need to know about each other since they can simply listen to the "login" event and do what they please.

Observable is a classic building block for a decoupled (modular) application.
