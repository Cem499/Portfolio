// The website packages: one system for the start page, the configurator, the contact form
// and the JSON-LD. Fixed prices in CHF (one-time), durations in weeks, counted from the day
// all content is complete. Names and descriptions live in src/i18n (shared.packages and
// home.pricing / konfigurator), keyed by the ids here.
//
// pages / sections   what the fixed price includes
// weeks              normal duration as a range
// care               the care plan (src/data/maintenance.js) included for CARE_MONTHS_INCLUDED
// featured           gets the "Meine Empfehlung" badge
// individuell        no price calculation: fixed price after a concept talk (`concept`),
//                    for more than EXTRA_PAGE.max pages or custom functionality

export const CARE_MONTHS_INCLUDED = 3

export const packages = [
  { id: 'landingpage', price: 990, pages: 1, sections: 4, weeks: { min: 1, max: 2 }, care: 'basis' },
  { id: 'onepager', price: 1590, pages: 1, sections: 7, weeks: { min: 2, max: 3 }, care: 'business', featured: true },
  { id: 'firmenwebsite', price: 2990, pages: 5, weeks: { min: 3, max: 5 }, care: 'business' },
  { id: 'individuell', priceFrom: 5900, onRequest: true, concept: { hours: 2, price: 290 } },
]

export const fixedPackages = packages.filter((pkg) => !pkg.onRequest)
export const individualPackage = packages.find((pkg) => pkg.onRequest)

export const packageById = (id) => packages.find((pkg) => pkg.id === id)

// Anchors of the contact form (#contact-<id>): the form reads the hash and prefills subject
// and message, used by "Projekt besprechen" for the individual package.
export const contactAnchor = (id) => `contact-${id}`

// "#contact-individuell" -> the individual package, anything else -> null.
export function packageFromHash(hash) {
  const match = /^#contact-([a-z]+)$/.exec(hash || '')
  return (match && packages.find((pkg) => pkg.id === match[1])) || null
}
