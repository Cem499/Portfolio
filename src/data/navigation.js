// Main navigation in display order. `anchor` points to a section of the start page,
// `path` to a page of its own (one URL per language). Labels come from i18n `shared.nav`.
export const mainNav = [
  { id: 'projects', path: { de: '/projekte/', en: '/en/projects/' } },
  { id: 'services', anchor: 'projects' },
  { id: 'configurator', path: { de: '/konfigurator/', en: '/en/configurator/' } },
  { id: 'contact', anchor: 'contact', cta: true },
]

export const configuratorPath = (lang) => mainNav.find((item) => item.id === 'configurator').path[lang]

export function homePath(lang) {
  return lang === 'en' ? '/en/' : '/'
}

// On the start page anchors stay plain ("#faq") so the smooth-scroll handler picks them up;
// every other page links back to the start page ("/#faq", "/en/#faq").
export function navHref(item, lang, isHome) {
  if (item.path) return item.path[lang]
  return isHome ? `#${item.anchor}` : `${homePath(lang)}#${item.anchor}`
}
