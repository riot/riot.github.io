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


Die Module erweitern den Hauptteil, sodass dieser nicht über die Erweiterungen Bescheid weiß. So bleiben die Erweiterungen lose and den Hauptteil gekoppelt.

Diese Erweiterungen können eigene Tags sein (UI Komponenten oder nur Logik enthalten.

Sobald die Hauptapplikationen und Events sorgfältig designed wurden, kann jeder andere Entwickler das System erweitern ohne dabei andere zu stören.

[Observable API](/api/observable/)


## Routing

Der Router bildet ein Tool um Macht über die URL und den Zurück-Button zu erlangen. Es ist eine der kleinsten Implementationen die man finden kann.
Der Router is darauf ausgelegt folgendes zu tun:

1. Den Teil der Url nach dem Hash ändern
2. Benachrichtigen wenn der Teil sich ändert
3. Den momentanen Hash unter die Lupe nehmen

Routing Logik kann überall hinverfrachtet werden. In eigene Tags, oder Modulen nur mit Logik. Einige Applikationen machen den Router zu einem zentralen Element ihrer Architektur, welcher die Aufgabe hat, Arbeit an andere Teile der Applikation zu senden. 
Andere wiederum machen sich den Router zunutze, um die URL events wie Tastatur events zu verwenden, ohne die Architektur zu beeinträchtigen.

Jede Browser-Applikation benötigt Routing, da immer eine URL in der Adressleiste vorhanden ist.

[Router API](/api/route/)


## Modularität

Eigene Tags machen den View Teil deiner Applikation aus. In modularen Applikationen sollten diese Tags nicht voneinander wissen müssen um funktionieren zu können.
Idealerweiße kannst du dann diese Tags als Teil jedes Projektes verwenden, ganz unabhängig vom restlichen HTML Layout. Was bedeutet, dass du die Möglichkeit hast, schnell eigene Werkzeuge und UI Komponenten zu basteln.

Wenn zwei Tags von einander wissen und voneinander abhängig werden sind sie eng aneinander gebunden. Diese Tags können nicht frei bewegt werden ohne Fehler zu verursachen.

Um dieses enge Koppeln zu verhindern, können Tags auf Events anderer Tags hören und darauf reagieren. Sprich eine Art Publish/Subscribe System entwickelt mit `riot.observable`.

Dieses Event-Sende und Empfang System kann von einer simplen API bis zu einer großen Architektur reichen wie es Facebook mit Flux getan hat.

### Beispiel des Riot Application Designs

Hier siehst du ein Grundgerüst für einen Loginbereich.

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
<!-- Login View -->
<login>
  <form onsubmit="{ login }">
    <input name="username" type="text" placeholder="Benutzername">
    <input name="password" type="password" placeholder="Passwort">
  </form>

  login() {
    opts.login({
      username: this.username.value,
      password: this.password.value
    })
  }

  // Jeder Tag im System kann das 'login' Event empfangen
  opts.on('login', function() {
    $(body).addClass('logged')
  })
</login>
```

Hier wird die Applikation schließlich gemounted.

```html
<body>
  <login></login>
  <script>riot.mount('login', auth)</script>
</body>
```

Im oberen Setup müssen die Tags nicht voneinander wissen, da sie ganz simpel nach dem "login" Event Ausschau halten können und darauf entsprechend reagieren.

Observable bietet eine klassische Möglichkeit um modulare Applikationen zu gestalten.