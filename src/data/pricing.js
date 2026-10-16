// Add-ons, express, discounts and the price calculation of the configurator (/konfigurator/).
// The packages themselves live in src/data/packages.js, the launch discount in
// src/data/launchDiscount.js. Every price, duration and percentage of the configurator is in
// these three files; the components only render what estimate() returns. Labels, descriptions
// and hints live in src/i18n (konfigurator.*), keyed by the ids here.
//
// Calculation (see estimate):
//   1. base      = package price + extra pages (firmenwebsite only, EXTRA_PAGE.price each)
//   2. languages = per additional language LANGUAGES.percent of the base, each rounded to CHF 10
//   3. subtotal  = base + languages + all other add-ons
//   4. express   = EXPRESS.percent of the subtotal, rounded to CHF 10
//   5. discounts: launch = launch percent of the package price, club = CLUB.percent of
//      (subtotal + express), both rounded to CHF 10; only the higher chosen one is deducted
//   Never on care or on the concept talk (they are not part of the configurator price).

import { isLaunchDiscountActive, launchAmount, launchAppliesTo } from './launchDiscount.js'
import { individualPackage, packageById } from './packages.js'

export const DEFAULT_PACKAGE_ID = 'firmenwebsite'

// Extra pages: only for the package with `pages: 5`; the total is entered (5 to 15).
export const EXTRA_PAGE = { price: 250, max: 15, only: ['firmenwebsite'] }

// Weeks added for the page total: 6 to 10 pages +1, 11 to 15 pages +2.
export const extraPageWeeks = (pages) => (pages > 10 ? 2 : pages > 5 ? 1 : 0)

// Additional languages (the client provides the translation).
export const LANGUAGES = { percent: 30, max: 3, weeksEach: 1 }

// Fixed add-ons. `only`: packages that offer it; `notWith`: add-ons it excludes;
// `priceByPackage` + `perExtraPage`: price depends on the package and the extra pages.
export const addons = [
  { id: 'shop', price: 2790, weeks: { min: 2, max: 3 }, only: ['firmenwebsite'], maxProducts: 30 },
  { id: 'booking', price: 490, weeks: { min: 0, max: 0 } },
  { id: 'cms', price: 1290, weeks: { min: 1, max: 1 }, trainingMinutes: 30 },
  { id: 'seo', price: 690, weeks: { min: 0, max: 0 }, keywords: 5 },
  { id: 'logo', price: 690, weeks: { min: 1, max: 1 }, notWith: ['branding'], drafts: 2, revisions: 1 },
  { id: 'branding', price: 1290, weeks: { min: 1, max: 1 }, notWith: ['logo'] },
  { id: 'texts', priceByPackage: { landingpage: 290, onepager: 590, firmenwebsite: 990 }, perExtraPage: 150, weeks: { min: 1, max: 1 } },
  { id: 'domain', price: 190, weeks: { min: 0, max: 0 }, mailboxes: 5 },
]

// Express: only from the one-pager up, not together with the texts add-on. The duration
// becomes working days: both ends of the normal range × 5 × timeFactor, rounded up.
export const EXPRESS = { percent: 30, timeFactor: 0.6, only: ['onepager', 'firmenwebsite'], notWith: ['texts'] }

// Discount for non-profit associations (proof in the conversation).
export const CLUB = { percent: 10 }

export const LANGUAGE_COUNTS = ['0', '1', '2', '3']

export const round10 = (n) => Math.round(n / 10) * 10

// Desired start, labels in i18n (konfigurator.timings). No price effect; `date` reveals a date field.
export const timings = [{ id: 'asap' }, { id: 'soon' }, { id: 'flexible' }, { id: 'date' }]

// `pages`, `languages` and `start` are strings because they come from form fields (valuesFromDom).
export const DEFAULTS = {
  pkg: DEFAULT_PACKAGE_ID,
  pages: '5',
  languages: '0',
  addons: [],
  express: false,
  club: false,
  launch: false,
  timing: 'soon',
  start: '',
}

export const addonById = (id) => addons.find((addon) => addon.id === id)

export function pageCount(pkg, value) {
  if (!pkg || !pkg.pages) return 0
  if (!EXTRA_PAGE.only.includes(pkg.id)) return pkg.pages
  const n = Number.parseInt(value, 10)
  return Number.isFinite(n) ? Math.max(pkg.pages, n) : pkg.pages
}

export function languageCount(value) {
  const n = Number.parseInt(value, 10)
  return Number.isFinite(n) && n > 0 ? Math.min(n, LANGUAGES.max) : 0
}

export function addonPrice(addon, pkg, extraPages = 0) {
  if (addon.priceByPackage) return (addon.priceByPackage[pkg.id] ?? 0) + addon.perExtraPage * extraPages
  return addon.price
}

// Whether an add-on can be chosen with this package and the add-ons already chosen.
// { allowed, reason }: reason is an i18n key (konfigurator.reasons.*).
export function addonState(addon, pkg, chosen = []) {
  if (addon.only && !addon.only.includes(pkg.id)) return { allowed: false, reason: 'onlyFirmenwebsite' }
  const blocker = (addon.notWith || []).find((id) => chosen.includes(id))
  if (blocker) return { allowed: false, reason: 'notWith', blocker }
  return { allowed: true }
}

export function expressState(pkg, chosen = []) {
  if (!EXPRESS.only.includes(pkg.id)) return { allowed: false, reason: 'expressFromOnepager' }
  const blocker = EXPRESS.notWith.find((id) => chosen.includes(id))
  if (blocker) return { allowed: false, reason: 'expressNotWithTexts', blocker }
  return { allowed: true }
}

// Add-ons that count, in the order they were chosen: an add-on excluded by one kept before
// it is dropped (logo and branding never both).
export function allowedAddons(pkg, chosen = []) {
  const kept = []
  for (const id of chosen) {
    const addon = addonById(id)
    if (!addon) continue
    if (addonState(addon, pkg, kept).allowed) kept.push(id)
  }
  return kept
}

// Toggle an add-on; choosing one of an exclusive pair drops the other.
export function toggleAddon(chosen, id) {
  if (chosen.includes(id)) return chosen.filter((a) => a !== id)
  const addon = addonById(id)
  const without = chosen.filter((a) => !(addon?.notWith || []).includes(a))
  return [...without, id]
}

// Switch the package and drop what the new one does not offer. Returns the new state and the
// ids of what was dropped ('pages', 'shop', 'express'), for a short hint in the UI.
export function switchPackage(state, id) {
  const pkg = packageById(id)
  const next = { ...state, pkg: id }
  const dropped = []
  if (!pkg || pkg.onRequest) return { state: next, dropped }
  if (!EXTRA_PAGE.only.includes(id)) {
    const previous = packageById(state.pkg)
    if (previous && pageCount(previous, state.pages) > previous.pages) dropped.push('pages')
    next.pages = String(pkg.pages)
  }
  for (const addon of addons) {
    if (addon.only && !addon.only.includes(id) && state.addons.includes(addon.id)) {
      next.addons = next.addons.filter((a) => a !== addon.id)
      dropped.push(addon.id)
    }
  }
  if (state.express && !EXPRESS.only.includes(id)) {
    next.express = false
    dropped.push('express')
  }
  return { state: next, dropped }
}

// Is the launch discount selectable for this package today?
export function launchAvailable(pkgId, today = new Date()) {
  return isLaunchDiscountActive(today) && launchAppliesTo(pkgId)
}

// The desired start is too early when it lies before today + the upper end of the normal
// duration (weeks, before express). `start` is "YYYY-MM-DD" from the date field.
export function startTooEarly(start, weeksMax, today = new Date()) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(start || '')
  if (!match) return false
  const wanted = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  const earliest = new Date(today.getFullYear(), today.getMonth(), today.getDate() + weeksMax * 7)
  return wanted.getTime() < earliest.getTime()
}

// The full calculation. Returns either { onRequest: true, ... } for the individual package
// (or more pages than EXTRA_PAGE.max) or the lines of the fixed price:
// { pkg, pages, extraPages, base, languages, perLanguage, languagesTotal, addons: [{id, price}],
//   addonsTotal, subtotal, expressOn, express, launchOn, launch, club, discount, discountType,
//   bothDiscounts, total, weeks: {min,max}, duration: {unit:'weeks'|'days', min, max} }
export function estimate(input = DEFAULTS, { today = new Date() } = {}) {
  const state = { ...DEFAULTS, ...input }
  const pkg = packageById(state.pkg) || packageById(DEFAULTS.pkg)
  if (pkg.onRequest) return { onRequest: true, reason: 'individuell', pkg: pkg.id, priceFrom: pkg.priceFrom }

  const pages = pageCount(pkg, state.pages)
  if (pages > EXTRA_PAGE.max) return { onRequest: true, reason: 'pages', pkg: pkg.id, pages, priceFrom: individualPackage.priceFrom }
  const extraPages = Math.max(0, pages - pkg.pages)
  const base = pkg.price + extraPages * EXTRA_PAGE.price

  const languages = languageCount(state.languages)
  const perLanguage = round10((base * LANGUAGES.percent) / 100)
  const languagesTotal = perLanguage * languages

  const chosen = allowedAddons(pkg, state.addons)
  const addonLines = chosen.map((id) => ({ id, price: addonPrice(addonById(id), pkg, extraPages) }))
  const addonsTotal = addonLines.reduce((sum, line) => sum + line.price, 0)

  const subtotal = base + languagesTotal + addonsTotal

  const expressOn = Boolean(state.express) && expressState(pkg, chosen).allowed
  const express = expressOn ? round10((subtotal * EXPRESS.percent) / 100) : 0

  const launchOn = Boolean(state.launch) && launchAvailable(pkg.id, today)
  const launch = launchOn ? launchAmount(pkg.price) : 0
  const clubOn = Boolean(state.club)
  const club = clubOn ? round10(((subtotal + express) * CLUB.percent) / 100) : 0
  const discount = Math.max(launch, club)
  const discountType = discount === 0 ? null : launch >= club ? 'launch' : 'club'
  const total = subtotal + express - discount

  let weeksMin = pkg.weeks.min + extraPageWeeks(pages) + languages * LANGUAGES.weeksEach
  let weeksMax = pkg.weeks.max + extraPageWeeks(pages) + languages * LANGUAGES.weeksEach
  for (const id of chosen) {
    const addon = addonById(id)
    weeksMin += addon.weeks.min
    weeksMax += addon.weeks.max
  }
  const weeks = { min: weeksMin, max: weeksMax }
  const duration = expressOn
    ? { unit: 'days', min: Math.ceil(weeksMin * 5 * EXPRESS.timeFactor), max: Math.ceil(weeksMax * 5 * EXPRESS.timeFactor) }
    : { unit: 'weeks', min: weeksMin, max: weeksMax }

  return {
    onRequest: false,
    pkg: pkg.id,
    pages,
    extraPages,
    base,
    languages,
    perLanguage,
    languagesTotal,
    addons: addonLines,
    addonsTotal,
    subtotal,
    expressOn,
    express,
    launchOn,
    launch,
    clubOn,
    club,
    discount,
    discountType,
    bothDiscounts: launchOn && clubOn,
    total,
    weeks,
    duration,
  }
}

// Swiss number format: 4500 -> "4'500"
export function chf(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}
