// Launch discount, limited in time and in number. `remainingSlots` is adjusted by hand after
// every project that uses it. Everything about the discount is shown only while
// isLaunchDiscountActive() is true: active, slots left and today not after endDate. After
// that it disappears on its own; the prerendered pages pick it up with the next deployment.
//
// Never tie this discount to reviews; the only condition is the reference right (name, logo,
// screenshots), see the configurator checkbox and the terms.

export const launchDiscount = {
  active: true,
  percent: 20,
  appliesTo: ['landingpage', 'onepager', 'firmenwebsite'],
  totalSlots: 5,
  remainingSlots: 5,
  endDate: '2027-03-31',
}

const round10 = (n) => Math.round(n / 10) * 10

export function isLaunchDiscountActive(today = new Date(), discount = launchDiscount) {
  if (!discount.active || discount.remainingSlots <= 0) return false
  const [y, m, d] = discount.endDate.split('-').map(Number)
  const end = new Date(y, m - 1, d, 23, 59, 59, 999) // local end of the last day
  return today.getTime() <= end.getTime()
}

export const launchAppliesTo = (packageId, discount = launchDiscount) => discount.appliesTo.includes(packageId)

// 20 % of the package price, rounded to CHF 10: 990 -> 200, 1'590 -> 320, 2'990 -> 600.
export const launchAmount = (price, discount = launchDiscount) => round10((price * discount.percent) / 100)

// The launch price of a package: 790, 1'270, 2'390.
export const launchPrice = (price, discount = launchDiscount) => price - launchAmount(price, discount)
