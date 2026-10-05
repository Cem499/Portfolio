// Care plans: single source for /wartung/ and the "Partner" package on the start page.
// Prices in CHF per month. Names, summaries and row labels live in src/i18n (wartung.*).
//
// yearlyPaidMonths  how many months a client pays for a year when billed yearly (e.g. 10 =
//                   "2 Monate geschenkt"). null hides the monthly/yearly toggle entirely.

export const yearlyPaidMonths = null

export const plans = [
  {
    id: 'basis',
    monthly: 49,
    hosting: true,
    updates: 'security',
    backups: 'weekly',
    monitoring: 'none',
    changeMinutes: 15,
    response: 'twoDays',
  },
  {
    id: 'business',
    monthly: 89,
    featured: true,
    hosting: true,
    updates: 'security',
    backups: 'daily',
    monitoring: 'performance',
    changeMinutes: 30,
    response: 'oneDay',
  },
  {
    id: 'premium',
    monthly: 149,
    hosting: true,
    updates: 'security',
    backups: 'daily',
    monitoring: 'advanced',
    changeMinutes: 60,
    response: 'priority',
  },
]

// Comparison rows in display order; each value is a key into i18n wartung.values.<row>.
export const rows = ['hosting', 'updates', 'backups', 'monitoring', 'changeMinutes', 'response']

export function yearlyPrice(plan) {
  return yearlyPaidMonths ? plan.monthly * yearlyPaidMonths : null
}

export function planById(id) {
  return plans.find((plan) => plan.id === id)
}
