
var $ = function(q) {
  return document.querySelectorAll(q)
}

function each(els, fn) {
  for (var i = 0, len = (els || []).length, el; i < len; i++) {
    el = els[i]
    if (el != null && fn(el, i) === false) i--
  }
  return els
}

// navi selection
each($('nav a'), function(el) {
  if (el.getAttribute('href') == location.pathname) {
    el.setAttribute('class', 'current')
  }
})


// table of contents
if (toc) {
  each($('#main h2'), function(el) {
    toc.innerHTML += '<a href="#' + el.id + '">' + el.innerText + '</a>'
  })
}