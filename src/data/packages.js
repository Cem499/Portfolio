// Packages of the "Leistungen" section on the start page that are requested through the contact
// form. The website types next to them come from pricing.js (siteTypes, same entry prices as the
// configurator, their buttons open the configurator). `partner` is the care package and shows
// the cheapest plan from maintenance.js.
// Each id doubles as an anchor of the contact form (#contact-<id>): the form reads the hash and
// prefills subject and message for that package.

import { plans } from './maintenance.js'

export const packages = [{ id: 'partner', name: 'Partner', monthly: plans[0].monthly }]

export const partnerPackage = packages.find((pkg) => pkg.id === 'partner')

export const contactAnchor = (id) => `contact-${id}`

// "#contact-partner" -> the partner package, anything else -> null.
export function packageFromHash(hash) {
  const match = /^#contact-([a-z]+)$/.exec(hash || '')
  return (match && packages.find((pkg) => pkg.id === match[1])) || null
}
