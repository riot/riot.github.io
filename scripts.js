/* globals bianco docsearch */
const { $, addEvent, getAttr } = bianco
const ACTIVE_LINK_CLASS = 'active'

// DOM nodes
const [sidebar] = $('.sidebar')
const [docSearch] = $('.doc-search')
const [themeToggle] = $('#theme-toggle')

function initSearch() {
  docsearch({
    apiKey: '7bd0a67ac7a1cccd05d0722dba941498',
    indexName: 'riotjs',
    inputSelector: '.doc-search',
    debug: false // Set debug to true if you want to inspect the dropdown
  })
}

const storedThemePreference = localStorage.getItem('dark')
const isDark = storedThemePreference === 'dark' || !storedThemePreference && window.matchMedia('(prefers-color-scheme: dark)').matches

function updateSidebarLinks(links) {
  const activeLinks = links.filter(link => getAttr(link, 'href') === window.location.hash)
  const oldActiveLinks = links.filter(link => link.classList.contains(ACTIVE_LINK_CLASS))

  activeLinks.forEach(link => link.classList.add(ACTIVE_LINK_CLASS))
  oldActiveLinks.forEach(link => link.classList.remove(ACTIVE_LINK_CLASS))
}

function syncSidebar(sidebar) {
  const links = $('a[href^="#"]', sidebar)

  addEvent(window, 'hashchange', () => updateSidebarLinks(links))
  updateSidebarLinks(links)
}

function handleThemeSwitcher(isChecked) {
  themeToggle.checked = isChecked
  themeToggle.onchange = (event) => {
    localStorage.setItem('dark', themeToggle.checked ? 'dark' : 'light')
    updateTheme(themeToggle.checked)
  }
}

function updateTheme(isDark) {
  document.body.classList[isDark ? 'add' : 'remove']('dark')
}

if (sidebar) syncSidebar(sidebar)
if (docSearch) initSearch()
if (themeToggle) handleThemeSwitcher(Boolean(isDark))
if (isDark) updateTheme(isDark)

const isCute = () => {
  if(!location.search) return null
  const params = location.search.match(/^\?(.*)$/)[1].split('&')
  let object = {}
  params.forEach(param => {
    const paramArray = param.split('=')
    if(paramArray.length > 1) object[paramArray[0]] = paramArray[1]
  })
  return object.cute === 'true'
}

if(isCute()){
  document.querySelector('[src="/img/logo/square.svg"]')?.setAttribute('src', '/img/logo/riot-kawaii-logo.svg')
  document.querySelector('[src="/img/logo/riot-kawaii-logo.svg"]')?.setAttribute('style', `width: 100%`)
  document.querySelectorAll('[src="/img/logo/riot-logo.svg"]')?.forEach(element => element.setAttribute('src', '/img/logo/riot-kawaii-logo.svg'))
}
