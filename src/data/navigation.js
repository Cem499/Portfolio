// Main navigation in display order. `anchor` points to a section of the start page,
// `path` to a page of its own (one URL per language). Labels come from i18n `shared.nav`.
export const mainNav = [
  { id: 'team', anchor: 'team' },
  { id: 'services', anchor: 'projects' },
  { id: 'faq', anchor: 'faq' },
  { id: 'contact', anchor: 'contact', cta: true },
]

export function homePath(lang) {
  return lang === 'en' ? '/en/' : '/'
}

// On the start page anchors stay plain ("#faq") so the smooth-scroll handler picks them up;
// every other page links back to the start page ("/#faq", "/en/#faq").
export function navHref(item, lang, isHome) {
  if (item.path) return item.path[lang]
  return isHome ? `#${item.anchor}` : `${homePath(lang)}#${item.anchor}`
}
