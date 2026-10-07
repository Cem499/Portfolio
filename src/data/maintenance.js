// Care plans: single source for /wartung/ and the "Partner" package on the start page.
// Prices in CHF per month. Names, summaries and row labels live in src/i18n (wartung.*).
//
// yearlyPaidMonths  how many months a client pays for a year when billed yearly (e.g. 10 =
//                   "2 Monate geschenkt"). null hides the monthly/yearly toggle entirely.

export const yearlyPaidMonths = 10

export const plans = [
  {
    id: 'basis',
    monthly: 39,
    hosting: true,
    updates: 'security',
    backups: 'weekly',
    monitoring: 'none',
    changeMinutes: 15,
    response: 'threeDays',
  },
  {
    id: 'business',
    monthly: 79,
    featured: true,
    hosting: true,
    updates: 'security',
    backups: 'daily',
    monitoring: 'performance',
    changeMinutes: 30,
    response: 'twoDays',
  },
  {
    id: 'premium',
    monthly: 129,
    hosting: true,
    updates: 'security',
    backups: 'daily',
    monitoring: 'advanced',
    changeMinutes: 60,
    response: 'oneDay',
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
