
// navi selection
if (document.querySelector) {
  var els = document.querySelectorAll('nav a')

  for (var i = 0, el; i < els.length; i++) {
    el = els[i]
    if (el.getAttribute('href') == location.pathname) {
      el.setAttribute('class', 'current')
    }
  }
}