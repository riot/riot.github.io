
(function(doc) {

  var $ = function(q) {
    return doc.querySelectorAll(q)
  }

  function each(els, fn) {
    for (var i = 0, len = (els || []).length, el; i < len; i++) {
      el = els[i]
      if (el != null && fn(el, i) === false) i--
    }
    return els
  }

  function setActive(link, match) {
    if (link.getAttribute('href') == match) {
      link.setAttribute('class', 'current')
    }
  }

  // navi selection
  each($('nav a'), function(link) {
    setActive(link, '/' + location.pathname.split('/')[1] + '/')
  })

  // tab selection
  each($('#tabs a'), function(link) {
    setActive(link, location.pathname)
  })


  // table of contents
  if (toc) {
    each($('#main h2'), function(el) {
      toc.innerHTML += '<p><a href="#' + el.id + '">' + el.innerText + '</a></p>'
    })
  }

})(document)