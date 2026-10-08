// The four packages of the "Leistungen" section on the start page. Names and prices are
// language independent (texts in i18n home.projects.packages). The website packages have a
// one-time price, `partner` is the care package and shows the cheapest plan from maintenance.js.
// Each id doubles as an anchor of the contact form (#contact-<id>): the form reads the hash and
// prefills subject and message for that package.

import { plans } from './maintenance.js'

export const packages = [
  { id: 'basic', name: 'Basic', price: 990 },
  { id: 'growth', name: 'Growth', price: 1690, featured: true },
  { id: 'pro', name: 'Pro', price: 2490 },
  { id: 'partner', name: 'Partner', monthly: plans[0].monthly },
]

export const websitePackages = packages.filter((pkg) => pkg.price)
export const partnerPackage = packages.find((pkg) => pkg.id === 'partner')

export const contactAnchor = (id) => `contact-${id}`

// "#contact-growth" -> the growth package, anything else -> null.
export function packageFromHash(hash) {
  const match = /^#contact-([a-z]+)$/.exec(hash || '')
  return (match && packages.find((pkg) => pkg.id === match[1])) || null
}
