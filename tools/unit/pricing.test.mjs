// Unit tests of the configurator calculation (src/data/pricing.js, packages.js,
// launchDiscount.js). Run with `npm run test:unit` (node --test). The date is fixed so the
// launch discount behaves the same on every run.
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { isLaunchDiscountActive, launchAmount, launchDiscount, launchPrice } from '../../src/data/launchDiscount.js'
import { packageById, packages } from '../../src/data/packages.js'
import { DEFAULTS, allowedAddons, estimate, expressState, startTooEarly, switchPackage, toggleAddon } from '../../src/data/pricing.js'

const TODAY = new Date(2026, 9, 8) // 8 October 2026, inside the launch period
const est = (input) => estimate({ ...DEFAULTS, ...input }, { today: TODAY })

test('jedes Paket ohne Zusätze: Fixpreis und Dauer aus packages.js', () => {
  for (const pkg of packages.filter((p) => !p.onRequest)) {
    const r = est({ pkg: pkg.id, pages: String(pkg.pages) })
    assert.equal(r.onRequest, false)
    assert.equal(r.total, pkg.price, pkg.id)
    assert.deepEqual(r.weeks, pkg.weeks, pkg.id)
    assert.deepEqual(r.duration, { unit: 'weeks', ...pkg.weeks }, pkg.id)
    assert.equal(r.discount, 0)
  }
  assert.equal(est({ pkg: 'landingpage' }).total, 990)
  assert.equal(est({ pkg: 'onepager' }).total, 1590)
  assert.equal(est({ pkg: 'firmenwebsite' }).total, 2990)
  const individual = est({ pkg: 'individuell' })
  assert.equal(individual.onRequest, true)
  assert.equal(individual.priceFrom, 5900)
})

test('Sprachen: 30 % von Paketpreis plus Zusatzseiten, je Sprache auf CHF 10 gerundet, +1 Woche', () => {
  const r = est({ pkg: 'firmenwebsite', pages: '8', languages: '2' })
  assert.equal(r.extraPages, 3)
  assert.equal(r.base, 2990 + 3 * 250) // 3'740
  assert.equal(r.perLanguage, 1120) // 1'122 -> 1'120
  assert.equal(r.languagesTotal, 2240)
  assert.equal(r.total, 3740 + 2240)
  assert.deepEqual(r.weeks, { min: 3 + 1 + 2, max: 5 + 1 + 2 })
  assert.equal(est({ pkg: 'landingpage', languages: '9' }).languages, 3, 'höchstens 3 Sprachen')
})

test('Express: 30 % der Zwischensumme auf CHF 10 gerundet, Dauer in Arbeitstagen (×5 ×0,6, aufgerundet)', () => {
  const r = est({ pkg: 'onepager', addons: ['cms'], express: true })
  assert.equal(r.subtotal, 1590 + 1290)
  assert.equal(r.express, 860) // 864 -> 860
  assert.equal(r.total, 2880 + 860)
  assert.deepEqual(r.weeks, { min: 3, max: 4 })
  assert.deepEqual(r.duration, { unit: 'days', min: 9, max: 12 })
  const firm = est({ pkg: 'firmenwebsite', express: true })
  assert.equal(firm.express, 900) // 897 -> 900
  assert.deepEqual(firm.duration, { unit: 'days', min: 9, max: 15 })
})

test('Express gesperrt bei Landingpage und zusammen mit Texte schreiben', () => {
  const landing = est({ pkg: 'landingpage', express: true })
  assert.equal(landing.expressOn, false)
  assert.equal(landing.express, 0)
  assert.equal(landing.duration.unit, 'weeks')
  assert.equal(expressState(packageById('landingpage')).reason, 'expressFromOnepager')
  const texts = est({ pkg: 'onepager', addons: ['texts'], express: true })
  assert.equal(texts.expressOn, false)
  assert.equal(texts.total, 1590 + 590)
  assert.equal(expressState(packageById('onepager'), ['texts']).reason, 'expressNotWithTexts')
})

test('Startrabatt: 20 % des Paketpreises auf CHF 10 gerundet, nie auf Zusätze', () => {
  assert.equal(launchAmount(990), 200)
  assert.equal(launchAmount(1590), 320)
  assert.equal(launchAmount(2990), 600)
  assert.equal(launchPrice(990), 790)
  assert.equal(launchPrice(1590), 1270)
  assert.equal(launchPrice(2990), 2390)
  for (const [id, total] of [['landingpage', 790], ['onepager', 1270], ['firmenwebsite', 2390]]) {
    const r = est({ pkg: id, launch: true })
    assert.equal(r.launchOn, true, id)
    assert.equal(r.discountType, 'launch', id)
    assert.equal(r.total, total, id)
  }
  const withAddon = est({ pkg: 'landingpage', addons: ['seo'], launch: true })
  assert.equal(withAddon.launch, 200, 'Rabatt bleibt 20 % vom Paketpreis')
  assert.equal(withAddon.total, 990 + 690 - 200)
})

test('Startrabatt und Vereinsrabatt gleichzeitig: nur der höhere gilt', () => {
  const small = est({ pkg: 'firmenwebsite', launch: true, club: true })
  assert.equal(small.launch, 600)
  assert.equal(small.club, 300) // 299 -> 300
  assert.equal(small.discount, 600)
  assert.equal(small.discountType, 'launch')
  assert.equal(small.bothDiscounts, true)
  assert.equal(small.total, 2390)
  const big = est({ pkg: 'firmenwebsite', addons: ['shop'], languages: '2', launch: true, club: true })
  assert.equal(big.subtotal, 2990 + 2790 + 2 * 900)
  assert.equal(big.club, 760) // 758 -> 760
  assert.equal(big.discountType, 'club')
  assert.equal(big.total, 7580 - 760)
  const clubOnly = est({ pkg: 'onepager', express: true, club: true })
  assert.equal(clubOnly.club, 210) // 10 % von (1'590 + 480) = 207 -> 210
  assert.equal(clubOnly.total, 1590 + 480 - 210)
})

test('Startrabatt verschwindet bei 0 Plätzen und nach dem Enddatum', () => {
  assert.equal(isLaunchDiscountActive(new Date(2027, 2, 31, 12)), true, 'am letzten Tag noch aktiv')
  assert.equal(isLaunchDiscountActive(new Date(2027, 3, 1)), false, 'am Tag danach aus')
  assert.equal(isLaunchDiscountActive(TODAY, { ...launchDiscount, remainingSlots: 0 }), false)
  assert.equal(isLaunchDiscountActive(TODAY, { ...launchDiscount, active: false }), false)
  const after = estimate({ ...DEFAULTS, pkg: 'landingpage', launch: true }, { today: new Date(2027, 3, 1) })
  assert.equal(after.launchOn, false)
  assert.equal(after.total, 990)
})

test('Wechsel von Firmenwebsite auf Onepager wählt Zusatzseiten und Shop ab, auf Landingpage auch Express', () => {
  const state = { ...DEFAULTS, pkg: 'firmenwebsite', pages: '8', addons: ['shop', 'cms'], express: true }
  const toOnepager = switchPackage(state, 'onepager')
  assert.deepEqual(toOnepager.dropped, ['pages', 'shop'])
  assert.equal(toOnepager.state.pages, '1')
  assert.deepEqual(toOnepager.state.addons, ['cms'])
  assert.equal(toOnepager.state.express, true)
  const toLanding = switchPackage(state, 'landingpage')
  assert.deepEqual(toLanding.dropped, ['pages', 'shop', 'express'])
  assert.equal(toLanding.state.express, false)
  const back = switchPackage(toOnepager.state, 'firmenwebsite')
  assert.deepEqual(back.dropped, [])
})

test('mehr als 15 Seiten: Preis nach Gespräch, 15 Seiten noch mit Fixpreis', () => {
  const tooMany = est({ pkg: 'firmenwebsite', pages: '16' })
  assert.equal(tooMany.onRequest, true)
  assert.equal(tooMany.reason, 'pages')
  const max = est({ pkg: 'firmenwebsite', pages: '15' })
  assert.equal(max.extraPages, 10)
  assert.equal(max.base, 2990 + 10 * 250)
  assert.deepEqual(max.weeks, { min: 5, max: 7 })
  assert.equal(est({ pkg: 'onepager', pages: '12' }).pages, 1, 'Seitenzahl nur bei der Firmenwebsite')
})

test('Logo und Branding schliessen sich aus', () => {
  assert.deepEqual(allowedAddons(packageById('onepager'), ['logo', 'branding']), ['logo'])
  assert.deepEqual(allowedAddons(packageById('onepager'), ['branding', 'logo']), ['branding'])
  assert.deepEqual(toggleAddon(['logo'], 'branding'), ['branding'])
  assert.deepEqual(toggleAddon(['branding', 'seo'], 'logo'), ['seo', 'logo'])
  const r = est({ pkg: 'onepager', addons: ['logo', 'branding'] })
  assert.deepEqual(
    r.addons.map((a) => a.id),
    ['logo'],
  )
  assert.equal(r.total, 1590 + 690)
})

test('Texte schreiben: Preis nach Paket plus CHF 150 je Zusatzseite', () => {
  assert.equal(est({ pkg: 'landingpage', addons: ['texts'] }).addonsTotal, 290)
  assert.equal(est({ pkg: 'onepager', addons: ['texts'] }).addonsTotal, 590)
  assert.equal(est({ pkg: 'firmenwebsite', pages: '7', addons: ['texts'] }).addonsTotal, 990 + 2 * 150)
  assert.equal(est({ pkg: 'firmenwebsite', addons: ['shop'] }).addonsTotal, 2790)
  assert.deepEqual(est({ pkg: 'onepager', addons: ['shop'] }).addons, [], 'Shop nur bei der Firmenwebsite')
})

test('Wunschtermin vor heute plus oberer Standarddauer gilt als zu früh', () => {
  assert.equal(startTooEarly('2026-10-20', 5, TODAY), true)
  assert.equal(startTooEarly('2026-11-12', 5, TODAY), false)
  assert.equal(startTooEarly('', 5, TODAY), false)
})
