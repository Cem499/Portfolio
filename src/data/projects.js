// Case studies (/projekte/<slug>/), in display order. Texts live in src/i18n (projekte.items),
// keyed by slug. Only facts here, never project budgets and no Lighthouse numbers: results
// are described in words (tools/measure-projects.mjs still records them in measured.js).
//
// images     after: the live site (cover, list, social image), before: the previous site
//            (omitted when there was none). Files under public/assets/projects/, named
//            <name>-<width>.webp, by default in 720 and 1440 px at 16:10.
//            compare: optional slider in another ratio, when the before image is a fixed
//            cut-out; its after image is shot in the same viewport (tools/measure-projects.mjs).
// facts      extra figures shown in the "at a glance" box (label ids in i18n projekte.metrics).
// sections   "section by section" tour of the case study, in display order. Each entry is one
//            1440 × 900 shot of the live site (url, optional scrollTo: selector the shot scrolls
//            to). With beforeUrl the same part of the previous site is shot too and the entry
//            becomes a before/after slider; without it the entry is listed as newly added.
//            Titles and notes in i18n (projekte.items[slug].sections[id]); files are named
//            <slug>-s-<id>(-before)-<width>.webp and written by tools/measure-projects.mjs.

const list = [
  {
    slug: 'street-food-compassion',
    url: 'https://streetfood-compassion.ch/',
    year: 2026,
    logo: '/assets/LogoStreetFoodCompassion.webp',
    logoBg: 'dark',
    credit: 'Yangzom',
    tech: ['React', 'Vite', 'Spring Boot', 'Netlify'],
    beforeUrl: 'https://verein-sympathy-compassion.ch/',
    facts: [{ id: 'tests', value: '170+' }],
    images: { before: 'street-food-compassion-before', after: 'street-food-compassion' },
    sections: [
      { id: 'festivals', url: 'https://streetfood-compassion.ch/street-food-festivals', beforeUrl: 'https://verein-sympathy-compassion.ch/street-food-festivals/' },
      { id: 'verein', url: 'https://streetfood-compassion.ch/verein', beforeUrl: 'https://verein-sympathy-compassion.ch/der-verein/' },
      { id: 'kontakt', url: 'https://streetfood-compassion.ch/verein', scrollTo: '#kontakt h2', beforeUrl: 'https://verein-sympathy-compassion.ch/kontakt/' },
      { id: 'weihnachtszauber', url: 'https://streetfood-compassion.ch/weihnachtszauber' },
      { id: 'bewerbung', url: 'https://streetfood-compassion.ch/weihnachtszauber/bewerbung' },
      { id: 'chalet', url: 'https://streetfood-compassion.ch/weihnachtszauber/fondue-chalet' },
    ],
  },
  {
    slug: 'rh-haustechnik',
    url: 'https://rh-haustechnik.ch/',
    year: 2026,
    logo: '/assets/logo_rh-Haustechnik.webp',
    logoBg: 'white',
    tech: ['HTML', 'CSS', 'JavaScript', 'EmailJS', 'Cloudflare Turnstile', 'Hostpoint'],
    facts: [],
    images: {
      after: 'rh-haustechnik',
      // Before: Wayback snapshot of 7 March 2025 (web.archive.org/web/20250307101020/https://rh-haustechnik.ch/),
      // header to intro text, cut by hand to 745 × 763 with the archive bar removed (-745; -640 is
      // a downscale of it for phones). The after image shows the same part of the live site in a
      // 745 × 763 viewport.
      compare: { width: 745, height: 763, before: { name: 'rh-haustechnik-before', widths: [640, 745] }, after: { name: 'rh-haustechnik-compare', widths: [640, 745, 1490] } },
    },
    sections: [
      { id: 'leistungen', url: 'https://rh-haustechnik.ch/leistungen.html' },
      { id: 'referenzen', url: 'https://rh-haustechnik.ch/referenzen.html' },
      { id: 'notfall', url: 'https://rh-haustechnik.ch/notfall.html' },
      { id: 'anfrage', url: 'https://rh-haustechnik.ch/kontakt.html' },
    ],
  },
  {
    slug: 'coiffeur-zuerich',
    url: 'https://coiffeurzurich.com/',
    year: 2025,
    logo: '/assets/LogoCoiffeurZurich.webp',
    logoBg: 'dark',
    firstSite: true,
    tech: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Cloudflare Turnstile', 'Google Sheets', 'Netlify'],
    hide: ['#cookieBanner'],
    facts: [{ id: 'languages', value: 'DE / EN' }],
    images: { after: 'coiffeur-zuerich' },
    sections: [
      { id: 'galerie', url: 'https://coiffeurzurich.com/', scrollTo: '#galerie h2' },
      { id: 'preise', url: 'https://coiffeurzurich.com/', scrollTo: '#preise h2' },
      { id: 'termin', url: 'https://coiffeurzurich.com/', scrollTo: '#termin h2' },
    ],
  },
]

export const projects = list

export const projectPaths = {
  de: (slug) => `/projekte/${slug}/`,
  en: (slug) => `/en/projects/${slug}/`,
}

export const listPaths = { de: '/projekte/', en: '/en/projects/' }

export function projectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}

// Responsive sources for a screenshot in public/assets/projects/ (<name>-<width>.webp).
export function projectImage(name, widths = [720, 1440]) {
  const base = `/assets/projects/${name}`
  return { src: `${base}-${Math.max(...widths)}.webp`, srcSet: widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ') }
}

// The before/after pair of the slider with its intrinsic size, or null without a before image.
export function comparePair(project) {
  const { images } = project
  if (images.compare) {
    const { width, height, before, after } = images.compare
    return { width, height, before: projectImage(before.name, before.widths), after: projectImage(after.name, after.widths) }
  }
  if (!images.before) return null
  return { width: 1440, height: 900, before: projectImage(images.before), after: projectImage(images.after) }
}

// The "section by section" tour: entries with a previous version (slider pairs) and entries
// that are new on the site, each with its responsive image sources.
export function projectSections(project) {
  const entries = (project.sections || []).map((section) => {
    const name = `${project.slug}-s-${section.id}`
    return { id: section.id, after: projectImage(name), before: section.beforeUrl ? projectImage(`${name}-before`) : null }
  })
  return { compared: entries.filter((entry) => entry.before), added: entries.filter((entry) => !entry.before) }
}
