// Public price list of the project configurator (/konfigurator/). Ranges in CHF, durations
// in weeks. Labels and descriptions live in src/i18n (konfigurator.*), keyed by the ids here.
// Edit the numbers below; estimate() does the maths.
//
// The desired start (step 4) is asked for but has no effect on the price: short-notice starts
// are settled in the offer, so there is no surcharge here. `date` reveals a date field.

export const siteTypes = [
  { id: 'landingpage', price: { min: 990, max: 1490 }, includedPages: 1, weeks: { min: 1, max: 2 } },
  { id: 'onepager', price: { min: 1290, max: 1990 }, includedPages: 1, weeks: { min: 2, max: 3 } },
  { id: 'business', price: { min: 2490, max: 3790 }, includedPages: 5, weeks: { min: 3, max: 5 } },
  // Shown as "ab CHF 5'900, Preis nach Gespräch", no range maths.
  { id: 'custom', priceFrom: 5900, onRequest: true },
]

// Scope step. Single-page types only offer `single`; `business` and `custom` offer the tiers.
export const pageTiers = [
  { id: 'single', pages: '1', price: { min: 0, max: 0 }, weeks: 0 },
  { id: 'upTo5', pages: '2–5', price: { min: 0, max: 0 }, weeks: 0 },
  { id: 'upTo10', pages: '6–10', price: { min: 690, max: 1290 }, weeks: 1 },
  { id: 'upTo20', pages: '11–20', price: { min: 1290, max: 2490 }, weeks: 2 },
  { id: 'over20', pages: '20+', onRequest: true },
]

// `perLanguage`: price and weeks count once per additional language (state.languages).
export const features = [
  { id: 'multilingual', price: { min: 590, max: 1290 }, weeks: { min: 1, max: 1 }, perLanguage: true },
  { id: 'shop', price: { min: 1990, max: 4490 }, weeks: { min: 2, max: 3 } },
  { id: 'booking', price: { min: 390, max: 1290 }, weeks: { min: 1, max: 1 } },
  { id: 'cms', price: { min: 690, max: 1690 }, weeks: { min: 1, max: 1 } },
  { id: 'seo', price: { min: 390, max: 790 }, weeks: { min: 0, max: 0 } },
  { id: 'branding', price: { min: 490, max: 1290 }, weeks: { min: 1, max: 1 } },
]

// Choices for the number of additional languages (only shown with "multilingual").
export const LANGUAGE_COUNTS = ['1', '2', '3', '4']

// Desired start, labels in i18n (konfigurator.timings). No price effect, see above.
export const timings = [{ id: 'asap' }, { id: 'soon' }, { id: 'flexible' }, { id: 'date' }]

// `languages` and `start` are strings because they come from form fields (valuesFromDom).
export const DEFAULTS = { siteType: 'business', pages: 'upTo5', features: [], languages: '1', timing: 'soon', start: '' }

export function tiersFor(siteTypeId) {
  const type = siteTypes.find((t) => t.id === siteTypeId)
  if (!type || type.includedPages === 1) return pageTiers.filter((t) => t.id === 'single')
  return pageTiers.filter((t) => t.id !== 'single')
}

function languageCount(value) {
  const n = Number.parseInt(value, 10)
  return Number.isFinite(n) && n > 0 ? Math.min(n, Number(LANGUAGE_COUNTS.at(-1))) : 1
}

// { onRequest, priceFrom?, price: {min,max}?, weeks: {min,max}? }
export function estimate({ siteType, pages, features: chosen = [], languages = '1' } = DEFAULTS) {
  const type = siteTypes.find((t) => t.id === siteType)
  const tier = pageTiers.find((t) => t.id === pages)

  if (!type) return { onRequest: true, priceFrom: siteTypes[0].price.min }
  if (type.onRequest) return { onRequest: true, priceFrom: type.priceFrom }

  // "20+ pages" has no range; it starts where the largest priced tier starts.
  const pricedTier = tier?.onRequest ? pageTiers.filter((t) => !t.onRequest).at(-1) : tier
  if (!pricedTier) return { onRequest: true, priceFrom: type.price.min }

  let min = type.price.min + pricedTier.price.min
  let max = type.price.max + pricedTier.price.max
  let weeksMin = type.weeks.min + pricedTier.weeks
  let weeksMax = type.weeks.max + pricedTier.weeks

  for (const id of chosen) {
    const feature = features.find((f) => f.id === id)
    if (!feature) continue
    const times = feature.perLanguage ? languageCount(languages) : 1
    min += feature.price.min * times
    max += feature.price.max * times
    weeksMin += feature.weeks.min * times
    weeksMax += feature.weeks.max * times
  }

  if (tier.onRequest) return { onRequest: true, priceFrom: min }
  return { onRequest: false, price: { min, max }, weeks: { min: weeksMin, max: weeksMax } }
}

// Swiss number format: 4500 -> "4'500"
export function chf(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}
