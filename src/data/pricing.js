// Entry prices of the project configurator (/konfigurator/): one "ab CHF" price per site type,
// durations in weeks. Scope, features and desired start carry no prices: the fixed price
// comes with the offer. Labels and descriptions live in src/i18n (konfigurator.*), keyed by
// the ids here. estimate() adds up the weeks.
//
// The desired start (step 4) has no effect on the duration either: short-notice starts are
// settled in the offer. `date` reveals a date field.

export const siteTypes = [
  { id: 'landingpage', priceFrom: 990, includedPages: 1, weeks: { min: 1, max: 2 } },
  { id: 'onepager', priceFrom: 1290, includedPages: 1, weeks: { min: 2, max: 3 } },
  { id: 'business', priceFrom: 2490, includedPages: 5, weeks: { min: 3, max: 5 } },
  // No time frame: settled in the conversation.
  { id: 'custom', priceFrom: 5900 },
]

// Scope step. Single-page types only offer `single`; `business` and `custom` offer the tiers.
// `weeks`: added to the duration; `onRequest`: time frame settled in the conversation.
export const pageTiers = [
  { id: 'single', pages: '1', weeks: 0 },
  { id: 'upTo5', pages: '2–5', weeks: 0 },
  { id: 'upTo10', pages: '6–10', weeks: 1 },
  { id: 'upTo20', pages: '11–20', weeks: 2 },
  { id: 'over20', pages: '20+', onRequest: true },
]

// `perLanguage`: weeks count once per additional language (state.languages).
export const features = [
  { id: 'multilingual', weeks: { min: 1, max: 1 }, perLanguage: true },
  { id: 'shop', weeks: { min: 2, max: 3 } },
  { id: 'booking', weeks: { min: 1, max: 1 } },
  { id: 'cms', weeks: { min: 1, max: 1 } },
  { id: 'seo', weeks: { min: 0, max: 0 } },
  { id: 'branding', weeks: { min: 1, max: 1 } },
]

// Choices for the number of additional languages (only shown with "multilingual").
export const LANGUAGE_COUNTS = ['1', '2', '3', '4']

// Desired start, labels in i18n (konfigurator.timings). No effect, see above.
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

// { priceFrom, weeks: {min,max} | null }. priceFrom is the entry price of the site type; the
// other choices only change the weeks. weeks null: time frame after the conversation.
export function estimate({ siteType, pages, features: chosen = [], languages = '1' } = DEFAULTS) {
  const type = siteTypes.find((t) => t.id === siteType) || siteTypes[0]
  const tier = pageTiers.find((t) => t.id === pages)
  if (!type.weeks || !tier || tier.onRequest) return { priceFrom: type.priceFrom, weeks: null }

  let min = type.weeks.min + tier.weeks
  let max = type.weeks.max + tier.weeks
  for (const id of chosen) {
    const feature = features.find((f) => f.id === id)
    if (!feature) continue
    const times = feature.perLanguage ? languageCount(languages) : 1
    min += feature.weeks.min * times
    max += feature.weeks.max * times
  }
  return { priceFrom: type.priceFrom, weeks: { min, max } }
}

// Swiss number format: 4500 -> "4'500"
export function chf(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}
