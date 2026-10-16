// Placeholder values for the texts in src/i18n: every price, duration and percentage comes
// from src/data, the texts only carry {placeholders}. fill() replaces them.
//
//   fill(t.hero.text, siteValues('de'))
//   fill(t.packages.onepager.meta, { ...siteValues('de'), ...packageValues(pkg, 'de', t) })
import { isLaunchDiscountActive, launchDiscount, launchPrice } from './launchDiscount.js'
import { HOURLY_RATE, cheapestPlan, terms, yearlyPaidMonths } from './maintenance.js'
import { CARE_MONTHS_INCLUDED, fixedPackages, individualPackage, packages } from './packages.js'
import { CLUB, EXPRESS, EXTRA_PAGE, LANGUAGES, addonById, chf } from './pricing.js'
import { projectTerms } from './projectTerms.js'

export const fill = (text, values) => String(text).replace(/\{(\w+)\}/g, (_, key) => (values[key] === undefined ? `{${key}}` : String(values[key])))

export const weeksRange = (weeks, lang) => `${weeks.min} ${lang === 'en' ? 'to' : 'bis'} ${weeks.max}`

// "31. März 2027" / "31 March 2027" from "2027-03-31" (parsed as a local date).
export function formatDate(iso, lang) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'de-CH', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(y, m - 1, d))
}

export function siteValues(lang = 'de') {
  const values = {
    from: chf(fixedPackages[0].price),
    care: cheapestPlan.monthly,
    months: CARE_MONTHS_INCLUDED,
    individuell: chf(individualPackage.priceFrom),
    conceptHours: individualPackage.concept.hours,
    conceptPrice: chf(individualPackage.concept.price),
    maxPages: EXTRA_PAGE.max,
    extraPage: chf(EXTRA_PAGE.price),
    languagePercent: LANGUAGES.percent,
    languageWeeks: LANGUAGES.weeksEach,
    maxLanguages: LANGUAGES.max,
    expressPercent: EXPRESS.percent,
    expressTime: Math.round(EXPRESS.timeFactor * 100),
    clubPercent: CLUB.percent,
    hourly: chf(HOURLY_RATE),
    rounds: projectTerms.correctionRounds,
    bugfixDays: projectTerms.bugfixDays,
    contentGraceDays: projectTerms.contentGraceDays,
    deposit: projectTerms.payment.standard[0],
    balance: projectTerms.payment.standard[1],
    individualPayment: projectTerms.payment.individual.join(' / '),
    minMonths: terms.minMonths,
    noticeDays: terms.noticeDays,
    renewal: terms.renewalMonths,
    reminderDays: terms.reminderDays,
    priceFixedMonths: terms.priceFixedMonths,
    priceChangeNoticeMonths: terms.priceChangeNoticeMonths,
    graceDays: terms.graceDaysAfterIncluded,
    paidMonths: yearlyPaidMonths,
    freeMonths: 12 - yearlyPaidMonths,
    launchPercent: launchDiscount.percent,
    totalSlots: launchDiscount.totalSlots,
    remainingSlots: launchDiscount.remainingSlots,
    endDate: formatDate(launchDiscount.endDate, lang),
    launchActive: isLaunchDiscountActive(),
    shopProducts: addonById('shop').maxProducts,
    cmsMinutes: addonById('cms').trainingMinutes,
    seoKeywords: addonById('seo').keywords,
    logoDrafts: addonById('logo').drafts,
    logoRevisions: addonById('logo').revisions,
    textsPerPage: chf(addonById('texts').perExtraPage),
    mailboxes: addonById('domain').mailboxes,
  }
  for (const pkg of packages) {
    if (pkg.onRequest) continue
    values[pkg.id] = chf(pkg.price)
    values[`${pkg.id}Weeks`] = weeksRange(pkg.weeks, lang)
    values[`${pkg.id}Launch`] = chf(launchPrice(pkg.price))
    values[`${pkg.id}Pages`] = pkg.pages
    if (pkg.sections) values[`${pkg.id}Sections`] = pkg.sections
  }
  return values
}

// Values of one package: its price, pages, sections, duration, launch price, care plan name.
export function packageValues(pkg, lang, careNames = {}) {
  if (pkg.onRequest) return { price: chf(pkg.priceFrom) }
  return {
    price: chf(pkg.price),
    pages: pkg.pages,
    sections: pkg.sections,
    weeks: weeksRange(pkg.weeks, lang),
    launchPrice: chf(launchPrice(pkg.price)),
    carePlan: careNames[pkg.care]?.name ?? pkg.care,
  }
}
