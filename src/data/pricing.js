// Public price list of the project configurator (/konfigurator/). All prices are starting
// points in CHF ("ab ca."), never ranges, durations in weeks. Labels and descriptions live in
// src/i18n (konfigurator.*), keyed by the ids here.
//
// Anything large or hard to estimate is `onRequest`: it shows no amount, and as soon as it is
// part of a configuration, the whole estimate becomes an individual offer.

export const siteTypes = [
  { id: 'landingpage', priceFrom: 790, includedPages: 1, weeks: { min: 1, max: 2 } },
  { id: 'onepager', priceFrom: 1190, includedPages: 1, weeks: { min: 2, max: 3 } },
  // The business website includes the CMS and is the one marked as the most popular choice.
  { id: 'business', priceFrom: 2490, includedPages: 5, weeks: { min: 3, max: 5 }, includes: ['cms'], badge: 'popular' },
  { id: 'custom', onRequest: true },
]

// Scope step. Single-page types only offer `single`; `business` and `custom` offer the tiers.
export const pageTiers = [
  { id: 'single', pages: '1', priceFrom: 0, weeks: 0 },
  { id: 'upTo5', pages: '2–5', priceFrom: 0, weeks: 0 },
  { id: 'upTo10', pages: '6–10', priceFrom: 790, weeks: 1 },
  { id: 'upTo20', pages: '11–20', onRequest: true },
  { id: 'over20', pages: '20+', onRequest: true },
]

export const features = [
  { id: 'multilingual', priceFrom: 590, perLanguage: true, weeks: { min: 1, max: 1 } },
  { id: 'shop', onRequest: true },
  { id: 'booking', priceFrom: 490, weeks: { min: 1, max: 1 } },
  { id: 'cms', priceFrom: 490, weeks: { min: 1, max: 1 } },
  { id: 'seo', priceFrom: 390, oneOff: true, weeks: { min: 0, max: 0 } },
  { id: 'branding', priceFrom: 490, weeks: { min: 1, max: 1 } },
]

// Desired start. `express` means a start in less than 3 weeks and adds the surcharge.
export const timings = [
  { id: 'express', surcharge: 0.2 },
  { id: 'soon', surcharge: 0, badge: 'recommended' },
  { id: 'flexible', surcharge: 0 },
]

export const DEFAULTS = { siteType: 'business', pages: 'upTo5', features: [], timing: 'soon' }

export function tiersFor(siteTypeId) {
  const type = siteTypes.find((t) => t.id === siteTypeId)
  if (!type || type.includedPages === 1) return pageTiers.filter((t) => t.id === 'single')
  return pageTiers.filter((t) => t.id !== 'single')
}

// Whether a feature comes with the chosen site type at no extra cost.
export function isIncluded(siteTypeId, featureId) {
  return Boolean(siteTypes.find((t) => t.id === siteTypeId)?.includes?.includes(featureId))
}

// The features that are part of a configuration: the chosen ones plus those the site type
// includes, in the order of the feature list.
export function effectiveFeatures({ siteType, features: chosen = [] }) {
  return features.filter((f) => chosen.includes(f.id) || isIncluded(siteType, f.id)).map((f) => f.id)
}

const roundTo10 = (n) => Math.round(n / 10) * 10

// { onRequest, priceFrom?, weeks?: {min,max}, express }
// `priceFrom` is the starting price of the whole configuration. As soon as one part is on
// request, there is no amount and no time frame: the configuration needs an individual offer.
export function estimate(state = DEFAULTS) {
  const { siteType, pages, timing } = state
  const type = siteTypes.find((t) => t.id === siteType)
  const tier = pageTiers.find((t) => t.id === pages)
  const express = timing === 'express'
  const surcharge = timings.find((t) => t.id === timing)?.surcharge || 0
  const chosen = effectiveFeatures(state)
    .filter((id) => !isIncluded(siteType, id))
    .map((id) => features.find((f) => f.id === id))

  if (!type || !tier || type.onRequest || tier.onRequest || chosen.some((f) => f.onRequest)) {
    return { onRequest: true, express }
  }

  let price = type.priceFrom + tier.priceFrom
  let weeksMin = type.weeks.min + tier.weeks
  let weeksMax = type.weeks.max + tier.weeks
  for (const feature of chosen) {
    price += feature.priceFrom
    weeksMin += feature.weeks.min
    weeksMax += feature.weeks.max
  }
  if (surcharge) price = roundTo10(price * (1 + surcharge))

  return { onRequest: false, priceFrom: price, weeks: { min: weeksMin, max: weeksMax }, express }
}

// Swiss number format: 4500 -> "4'500"
export function chf(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}
