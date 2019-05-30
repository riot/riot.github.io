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
  const [lastActiveLink] = activeLinks

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