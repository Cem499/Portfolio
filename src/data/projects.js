// Case studies (/projekte/<slug>/), in display order. Texts live in src/i18n (projekte.items),
// keyed by slug. Only facts and measured values here, never project budgets.
//
// measured   Lighthouse (mobile) and LCP of the live site, taken with tools/measure-projects.mjs;
//            `null` until measured. Scores 0–100, lcpMs in milliseconds.
// images     before: the previous site (omitted when there was none), after: the live site.
//            Files under public/assets/projects/, 1440 × 900 and 720 × 450 variants.
// facts      extra figures shown next to the Lighthouse rings (label ids in i18n projekte.metrics).

import { measured } from './measured.js'

const list = [
  {
    slug: 'street-food-compassion',
    url: 'https://streetfood-compassion.ch/',
    year: 2026,
    logo: '/assets/LogoStreetFoodCompassion.webp',
    logoBg: 'dark',
    credit: 'Yang',
    tech: ['React', 'Vite', 'Spring Boot', 'Netlify'],
    beforeUrl: 'https://verein-sympathy-compassion.ch/',
    facts: [{ id: 'tests', value: '170+' }],
    images: { before: 'street-food-compassion-before', after: 'street-food-compassion' },
  },
  {
    slug: 'rh-haustechnik',
    url: 'https://rh-haustechnik.ch/',
    year: null,
    logo: '/assets/logo_rh-Haustechnik.webp',
    logoBg: 'white',
    tech: ['HTML', 'CSS', 'JavaScript', 'EmailJS', 'Cloudflare Turnstile', 'Hostpoint'],
    facts: [],
    // Wayback snapshot of the old site (7 March 2025). The archive was unreachable when measured;
    // once `npm run measure:projects -- --only rh` has saved the shot, add before: 'rh-haustechnik-before'.
    beforeUrl: 'https://web.archive.org/web/20250307101020/https://rh-haustechnik.ch/',
    images: { after: 'rh-haustechnik' },
  },
  {
    slug: 'coiffeur-zuerich',
    url: 'https://coiffeurzurich.com/',
    year: 2025,
    logo: '/assets/LogoCoiffeurZurich.webp',
    logoBg: 'dark',
    firstSite: true,
    tech: ['HTML', 'CSS', 'JavaScript', 'Cloudflare Turnstile', 'Netlify'],
    hide: ['#cookieBanner'],
    facts: [{ id: 'languages', value: 'DE / EN' }],
    images: { after: 'coiffeur-zuerich' },
  },
]

export const projects = list.map((project) => ({ ...project, measured: measured[project.slug] ?? null }))

export const projectPaths = {
  de: (slug) => `/projekte/${slug}/`,
  en: (slug) => `/en/projects/${slug}/`,
}

export const listPaths = { de: '/projekte/', en: '/en/projects/' }

export function projectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}

// Responsive sources for a screenshot in public/assets/projects/ (1440 × 900 and 720 × 450).
export function projectImage(name) {
  const base = `/assets/projects/${name}`
  return { src: `${base}-1440.webp`, srcSet: `${base}-720.webp 720w, ${base}-1440.webp 1440w` }
}
