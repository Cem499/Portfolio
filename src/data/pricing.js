// Public price list of the project configurator (/konfigurator/). Ranges in CHF, durations
// in weeks. Labels and descriptions live in src/i18n (konfigurator.*), keyed by the ids here.
// Edit the numbers below; estimate() does the maths.

export const siteTypes = [
  { id: 'landingpage', price: { min: 900, max: 1500 }, includedPages: 1, weeks: { min: 1, max: 2 } },
  { id: 'onepager', price: { min: 1200, max: 2200 }, includedPages: 1, weeks: { min: 2, max: 3 } },
  { id: 'business', price: { min: 2500, max: 4500 }, includedPages: 5, weeks: { min: 3, max: 5 } },
  // Shown as "ab CHF 6'000, Preis nach Gespräch", no range maths.
  { id: 'custom', priceFrom: 6000, onRequest: true },
]

// Scope step. Single-page types only offer `single`; `business` and `custom` offer the tiers.
export const pageTiers = [
  { id: 'single', pages: '1', price: { min: 0, max: 0 }, weeks: 0 },
  { id: 'upTo5', pages: '2–5', price: { min: 0, max: 0 }, weeks: 0 },
  { id: 'upTo10', pages: '6–10', price: { min: 800, max: 1500 }, weeks: 1 },
  { id: 'upTo20', pages: '11–20', price: { min: 1500, max: 3000 }, weeks: 2 },
  { id: 'over20', pages: '20+', onRequest: true },
]

export const features = [
  { id: 'multilingual', price: { min: 600, max: 1500 }, weeks: { min: 1, max: 1 } },
  { id: 'shop', price: { min: 2000, max: 5000 }, weeks: { min: 2, max: 3 } },
  { id: 'booking', price: { min: 500, max: 1500 }, weeks: { min: 1, max: 1 } },
  { id: 'cms', price: { min: 800, max: 2000 }, weeks: { min: 1, max: 1 } },
  { id: 'seo', price: { min: 400, max: 900 }, weeks: { min: 0, max: 0 } },
  { id: 'branding', price: { min: 500, max: 1500 }, weeks: { min: 1, max: 1 } },
]

// Desired start. `express` means a start in less than 3 weeks and adds the surcharge.
export const timings = [
  { id: 'express', surcharge: 0.2 },
  { id: 'soon', surcharge: 0 },
  { id: 'flexible', surcharge: 0 },
]

export const DEFAULTS = { siteType: 'business', pages: 'upTo5', features: [], timing: 'soon' }

export function tiersFor(siteTypeId) {
  const type = siteTypes.find((t) => t.id === siteTypeId)
  if (!type || type.includedPages === 1) return pageTiers.filter((t) => t.id === 'single')
  return pageTiers.filter((t) => t.id !== 'single')
}

const roundTo10 = (n) => Math.round(n / 10) * 10

// { onRequest, priceFrom?, price: {min,max}?, weeks: {min,max}?, express }
export function estimate({ siteType, pages, features: chosen = [], timing } = DEFAULTS) {
  const type = siteTypes.find((t) => t.id === siteType)
  const tier = pageTiers.find((t) => t.id === pages)
  const express = timing === 'express'
  const surcharge = timings.find((t) => t.id === timing)?.surcharge || 0

  if (!type) return { onRequest: true, priceFrom: siteTypes[0].price.min, express }
  if (type.onRequest) return { onRequest: true, priceFrom: type.priceFrom, express }

  // "20+ pages" has no range; it starts where the largest priced tier starts.
  const pricedTier = tier?.onRequest ? pageTiers.filter((t) => !t.onRequest).at(-1) : tier
  if (!pricedTier) return { onRequest: true, priceFrom: type.price.min, express }

  let min = type.price.min + pricedTier.price.min
  let max = type.price.max + pricedTier.price.max
  let weeksMin = type.weeks.min + pricedTier.weeks
  let weeksMax = type.weeks.max + pricedTier.weeks

  for (const id of chosen) {
    const feature = features.find((f) => f.id === id)
    if (!feature) continue
    min += feature.price.min
    max += feature.price.max
    weeksMin += feature.weeks.min
    weeksMax += feature.weeks.max
  }

  if (tier.onRequest) return { onRequest: true, priceFrom: surcharge ? roundTo10(min * (1 + surcharge)) : min, express }

  if (surcharge) {
    min = roundTo10(min * (1 + surcharge))
    max = roundTo10(max * (1 + surcharge))
  }

  return { onRequest: false, price: { min, max }, weeks: { min: weeksMin, max: weeksMax }, express }
}

// Swiss number format: 4500 -> "4'500"
export function chf(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}
