// Care plans (Wartung): single source for /wartung/, the start page, the configurator notes,
// the terms and the JSON-LD. Prices in CHF per month; the yearly price is `yearlyPaidMonths`
// monthly fees (10 = "2 Monate geschenkt"). Names, taglines and row labels live in src/i18n
// (shared.care and wartung.*).
//
// badge          'recommended' | 'limited' | null
// monitoring     'uptime' (reachability) | 'performance' (reachability and loading time)
// changeMinutes  included changes per month; 0 means none, billed at HOURLY_RATE
// report         'none' | 'quarterly' | 'monthly'

export const yearlyPaidMonths = 10

// CHF per hour for changes beyond the included minutes (and for extra work in projects).
export const HOURLY_RATE = 120

export const plans = [
  {
    id: 'basis',
    monthly: 39,
    badge: null,
    hosting: true,
    updates: 'security',
    monitoring: 'uptime',
    backups: 'weekly',
    changeMinutes: 0,
    response: 'threeDays',
    report: 'none',
  },
  {
    id: 'business',
    monthly: 89,
    featured: true,
    badge: 'recommended',
    hosting: true,
    updates: 'security',
    monitoring: 'uptime',
    backups: 'daily',
    changeMinutes: 30,
    response: 'twoDays',
    report: 'quarterly',
  },
  {
    id: 'premium',
    monthly: 149,
    badge: 'limited',
    hosting: true,
    updates: 'security',
    monitoring: 'performance',
    backups: 'daily',
    changeMinutes: 60,
    response: 'oneDay',
    report: 'monthly',
  },
]

// Contract terms, in one place for the care page, the terms page and the FAQ texts.
export const terms = {
  includedMonths: 3, // first months of care included in every website package
  minMonths: 6, // minimum term, including the included months
  noticeDays: 30, // notice period to the end of a month
  renewalMonths: 12, // a yearly subscription renews by this many months
  reminderDays: 30, // reminder before a yearly renewal
  priceFixedMonths: 12, // care prices stay fixed this long
  priceChangeNoticeMonths: 3, // price changes are announced this far ahead
  graceDaysAfterIncluded: 30, // site stays online this long if no plan is chosen after the included months
}

// Comparison rows in display order; each value is a key into i18n wartung.values.<row>.
export const rows = ['hosting', 'updates', 'monitoring', 'backups', 'changeMinutes', 'response', 'report']

export function yearlyPrice(plan) {
  return yearlyPaidMonths ? plan.monthly * yearlyPaidMonths : null
}

export function planById(id) {
  return plans.find((plan) => plan.id === id)
}

export const cheapestPlan = plans[0]
