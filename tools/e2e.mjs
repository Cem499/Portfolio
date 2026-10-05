// End-to-end checks of the build with Playwright: interactions, keyboard, reduced
// motion, forms before and after hydration, language handling, console errors.
//
//   node tools/e2e.mjs                 all tests, exit 1 if one fails
//   node tools/e2e.mjs --only Formular  tests whose name contains the text
//
// Third-party scripts are stubbed (Turnstile, EmailJS), nothing leaves the machine.
import { chromium } from 'playwright-core'
import { chf, estimate } from '../src/data/pricing.js'
import { chromiumPath, pagesToTest, parseArgs, printTable, serveDist, stubThirdParty } from './lib.mjs'

const { flags } = parseArgs()
const { base, close } = await serveDist()
const browser = await chromium.launch({ executablePath: chromiumPath() })

const tests = []
const test = (name, fn) => tests.push({ name, fn })
const expect = (condition, detail) => {
  if (!condition) throw new Error(detail)
}

const openContexts = new Set()

// A fresh browser context. `holdBundle` keeps the React bundle back until
// `releaseBundle()` is called, to test the page before hydration.
async function open({ viewport = { width: 1440, height: 900 }, reducedMotion = 'no-preference', turnstile = {}, storage, holdBundle = false } = {}) {
  const context = await browser.newContext({ viewport, reducedMotion })
  openContexts.add(context)
  await stubThirdParty(context, turnstile)
  if (storage) await context.addInitScript((lang) => localStorage.setItem('sindigital-lang', lang), storage)
  let releaseBundle = () => {}
  if (holdBundle) {
    const gate = new Promise((resolve) => (releaseBundle = resolve))
    await context.route(/\/static\/app-/, async (route) => {
      await gate
      route.continue()
    })
  }
  const page = await context.newPage()
  const messages = []
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') messages.push(`[${m.type()}] ${m.text()}`)
  })
  page.on('pageerror', (e) => messages.push(`[pageerror] ${e.message}`))
  return {
    page,
    messages,
    releaseBundle,
    close: async () => {
      releaseBundle()
      openContexts.delete(context)
      await context.close()
    },
  }
}

async function goto(page, path, { hydrated = true } = {}) {
  await page.goto(base + path, { waitUntil: 'load' })
  if (hydrated) await page.waitForFunction(() => window.__VITE_REACT_SSG_CONTEXT__, null, { timeout: 15000 })
  await page.waitForTimeout(100)
}

const faqState = (page) =>
  page.evaluate(() => [...document.querySelectorAll('.faq-item')].map((f) => (f.classList.contains('active') ? 'open' : 'closed') + ':' + f.querySelector('.faq-question').getAttribute('aria-expanded')))

// ── FAQ ──────────────────────────────────────────────────────────────────────

test('FAQ: öffnet, nur eins offen, schliesst wieder', async () => {
  const s = await open()
  await goto(s.page, '/')
  await s.page.click('#faq-btn-1')
  let st = await faqState(s.page)
  expect(st[0] === 'open:true' && st.slice(1).every((x) => x === 'closed:false'), st.join(','))
  await s.page.click('#faq-btn-2')
  st = await faqState(s.page)
  expect(st[0] === 'closed:false' && st[1] === 'open:true', st.join(','))
  await s.page.click('#faq-btn-2')
  st = await faqState(s.page)
  expect(st.every((x) => x === 'closed:false'), st.join(','))
  await s.close()
})

test('FAQ: Tastatur (Enter und Leertaste)', async () => {
  const s = await open()
  await goto(s.page, '/')
  await s.page.focus('#faq-btn-1')
  await s.page.keyboard.press('Enter')
  expect((await faqState(s.page))[0] === 'open:true', 'Enter öffnet nicht')
  await s.page.focus('#faq-btn-2')
  await s.page.keyboard.press('Space')
  const st = await faqState(s.page)
  expect(st[0] === 'closed:false' && st[1] === 'open:true', st.join(','))
  await s.close()
})

// ── Navigation ───────────────────────────────────────────────────────────────

test('Smooth Scroll: Ziel minus 70px', async () => {
  const s = await open()
  await goto(s.page, '/')
  await s.page.click('.nav-link[href="#projects"]')
  await s.page.waitForTimeout(1500)
  const r = await s.page.evaluate(() => ({ y: window.scrollY, target: document.querySelector('#projects').getBoundingClientRect().top + window.scrollY - 70 }))
  expect(Math.abs(r.y - r.target) < 2, JSON.stringify(r))
  await s.close()
})

test('Skip-Link: erster Tab fokussiert ihn', async () => {
  const s = await open()
  await goto(s.page, '/')
  await s.page.keyboard.press('Tab')
  const cls = await s.page.evaluate(() => document.activeElement.className)
  expect(cls === 'skip-link', 'Fokus liegt auf: ' + cls)
  await s.close()
})

const menuState = (page) =>
  page.evaluate(() => {
    const h = document.getElementById('hamburger')
    const m = document.getElementById('mobile-menu')
    return { open: m.classList.contains('open'), hOpen: h.classList.contains('open'), expanded: h.getAttribute('aria-expanded'), hidden: m.getAttribute('aria-hidden'), inert: m.hasAttribute('inert'), overflow: document.body.style.overflow }
  })

test('Mobile-Menü: öffnen, Escape, Link schliesst und scrollt', async () => {
  const s = await open({ viewport: { width: 375, height: 800 } })
  await goto(s.page, '/')
  await s.page.click('#hamburger')
  let st = await menuState(s.page)
  expect(st.open && st.hOpen && st.expanded === 'true' && st.hidden === 'false' && !st.inert && st.overflow === 'hidden', JSON.stringify(st))
  await s.page.keyboard.press('Escape')
  st = await menuState(s.page)
  expect(!st.open && !st.hOpen && st.expanded === 'false' && st.hidden === 'true' && st.inert && st.overflow === '', JSON.stringify(st))
  await s.page.click('#hamburger')
  await s.page.click('.mobile-link[href="#contact"]')
  await s.page.waitForTimeout(1500)
  const r = await s.page.evaluate(() => ({ open: document.getElementById('mobile-menu').classList.contains('open'), y: window.scrollY, target: document.querySelector('#contact').getBoundingClientRect().top + window.scrollY - 70 }))
  expect(!r.open && Math.abs(r.y - r.target) < 2, JSON.stringify(r))
  await s.close()
})

test('Mobile-Menü: Tastatur (Enter öffnet, Tab erreicht Links, inert nach Escape)', async () => {
  const s = await open({ viewport: { width: 375, height: 800 } })
  await goto(s.page, '/')
  await s.page.focus('#hamburger')
  await s.page.keyboard.press('Enter')
  expect((await menuState(s.page)).open, 'Enter öffnet nicht')
  await s.page.keyboard.press('Tab')
  const focused = await s.page.evaluate(() => document.activeElement.className)
  expect(focused === 'mobile-link', 'Tab landet auf: ' + focused)
  await s.page.keyboard.press('Escape')
  expect(!(await menuState(s.page)).open, 'Escape schliesst nicht')
  await s.page.focus('#hamburger')
  await s.page.keyboard.press('Tab')
  const inside = await s.page.evaluate(() => !!document.activeElement.closest('#mobile-menu'))
  expect(!inside, 'Tab erreicht das geschlossene Menü')
  await s.close()
})

// ── Reviews carousel ─────────────────────────────────────────────────────────

const carousel = (page) => ({
  tx: () => page.evaluate(() => document.getElementById('reviews-list').style.transform),
  step: () =>
    page.evaluate(() => {
      const list = document.getElementById('reviews-list')
      return list.children[0].getBoundingClientRect().width + parseFloat(getComputedStyle(list).gap)
    }),
  async at(index, step) {
    const value = parseFloat((await this.tx()).replace('translateX(-', ''))
    return Math.abs(value - index * step) < 0.05
  },
})

test('Karussell: Start, Autoplay, Pause, Loop, Sperre, Resize', async () => {
  const s = await open()
  await goto(s.page, '/')
  const c = carousel(s.page)
  const step = await c.step()
  expect((await s.page.evaluate(() => document.querySelectorAll('#reviews-list .review-card').length)) === 12, 'nicht 3N Karten')
  expect(await c.at(4, step), 'Start: ' + (await c.tx()))
  await s.page.waitForTimeout(3800)
  expect(await c.at(5, step), 'Autoplay: ' + (await c.tx()))
  await s.page.hover('#reviews-carousel')
  const before = await c.tx()
  await s.page.waitForTimeout(4000)
  expect((await c.tx()) === before, 'keine Pause bei Hover')
  await s.page.click('.reviews-nav-prev')
  await s.page.waitForTimeout(600)
  await s.page.click('.reviews-nav-prev')
  await s.page.waitForTimeout(600)
  expect(await c.at(7, step), 'Loop rückwärts: ' + (await c.tx()))
  await s.page.click('.reviews-nav-next')
  await s.page.click('.reviews-nav-next')
  await s.page.waitForTimeout(700)
  expect(await c.at(4, step), 'Doppelklick-Sperre: ' + (await c.tx()))
  for (let i = 0; i < 4; i++) {
    await s.page.click('.reviews-nav-next')
    await s.page.waitForTimeout(600)
  }
  expect(await c.at(4, step), 'Loop vorwärts: ' + (await c.tx()))
  await s.page.setViewportSize({ width: 800, height: 900 })
  await s.page.waitForTimeout(400)
  expect(await c.at(4, await c.step()), 'Resize: ' + (await c.tx()))
  await s.close()
})

test('Karussell: Tastatur (Enter auf „Nächste Bewertung“)', async () => {
  const s = await open()
  await goto(s.page, '/')
  const c = carousel(s.page)
  const step = await c.step()
  await s.page.focus('.reviews-nav-next')
  await s.page.keyboard.press('Enter')
  await s.page.waitForTimeout(600)
  expect(await c.at(5, step), await c.tx())
  await s.close()
})

test('Karussell: kein Autoplay bei reduced motion', async () => {
  const s = await open({ reducedMotion: 'reduce' })
  await goto(s.page, '/')
  const c = carousel(s.page)
  const before = await c.tx()
  await s.page.waitForTimeout(4000)
  expect((await c.tx()) === before, 'Autoplay läuft trotz reduced motion')
  await s.close()
})

// ── Contact form ─────────────────────────────────────────────────────────────

const formStatus = (page) =>
  page.evaluate(() => {
    const el = document.getElementById('form-status')
    return { text: el.textContent.trim(), display: el.style.display, color: el.style.color }
  })

async function fillValid(page) {
  await page.fill('#contact-name', 'Max')
  await page.fill('#contact-email', 'max@example.ch')
  await page.fill('#contact-message', 'Eine genügend lange Nachricht')
  await page.check('#privacy-consent')
}

function mockEmailJs(page, { delayMs = 0 } = {}) {
  const sent = { payload: null }
  page.route(/api\.emailjs\.com/, async (route) => {
    sent.payload = route.request().postDataJSON()
    await new Promise((r) => setTimeout(r, delayMs))
    route.fulfill({ status: 200, body: 'OK' })
  })
  return sent
}

test('Formular: Fehlerreihenfolge (Pflichtfelder, Datenschutz, Länge, Bot)', async () => {
  const s = await open()
  await goto(s.page, '/')
  const submit = () => s.page.click('#contactForm button[type="submit"]')
  await submit()
  let st = await formStatus(s.page)
  expect(st.text === 'Bitte fülle alle Pflichtfelder aus (Name, E-Mail, Nachricht).' && st.display === 'block' && st.color === 'rgb(255, 100, 100)', JSON.stringify(st))
  await s.page.fill('#contact-name', 'Max')
  await s.page.fill('#contact-email', 'max@example.ch')
  await s.page.fill('#contact-message', 'kurz')
  await submit()
  st = await formStatus(s.page)
  expect(st.text === 'Bitte stimme der Datenschutzerklärung zu.', st.text)
  await s.page.check('#privacy-consent')
  await submit()
  st = await formStatus(s.page)
  expect(st.text === 'Die Nachricht muss mindestens 10 Zeichen lang sein.', st.text)
  await s.page.fill('#contact-message', 'Eine genügend lange Nachricht')
  await submit()
  st = await formStatus(s.page)
  expect(st.text === 'Bitte bestätige, dass du kein Bot bist.', st.text)
  await s.close()
})

test('Formular: Erfolg, Reset, EmailJS-Payload, Ausblenden nach 8 s', async () => {
  const s = await open({ turnstile: { token: 'tok' } })
  const sent = mockEmailJs(s.page, { delayMs: 400 })
  await goto(s.page, '/')
  await s.page.waitForTimeout(200)
  await fillValid(s.page)
  await s.page.click('#contactForm button[type="submit"]')
  await s.page.waitForTimeout(100)
  const sending = await s.page.evaluate(() => {
    const b = document.querySelector('#contactForm button[type="submit"]')
    return [b.disabled, b.textContent]
  })
  expect(sending[0] && sending[1] === 'Wird gesendet...', JSON.stringify(sending))
  await s.page.waitForTimeout(800)
  const r = await s.page.evaluate(() => {
    const st = document.getElementById('form-status')
    const b = document.querySelector('#contactForm button[type="submit"]')
    return { text: st.textContent, color: st.style.color, name: document.getElementById('contact-name').value, consent: document.getElementById('privacy-consent').checked, btn: [b.disabled, b.textContent], resets: window.__turnstileResets }
  })
  expect(r.text === 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.' && r.color === 'rgb(193, 255, 114)' && r.name === '' && !r.consent && r.resets === 1 && !r.btn[0] && r.btn[1] === 'Nachricht senden', JSON.stringify(r))
  const p = sent.payload
  expect(p && p.service_id === 'service_qlylu4x' && p.template_id === 'template_5mci63d' && p.user_id === '_U_phGxH8KcaJXxfq' && p.template_params.subject === 'Keine Angabe' && p.template_params.from_email === 'max@example.ch' && p.template_params.configuration === '', JSON.stringify(p))
  await s.page.waitForTimeout(8000)
  expect((await formStatus(s.page)).display === 'none', 'Erfolgsmeldung bleibt sichtbar')
  await s.close()
})

test('Formular vor Hydration: Eingaben bleiben erhalten', async () => {
  const s = await open({ holdBundle: true })
  await s.page.goto(base + '/')
  await fillValid(s.page)
  s.releaseBundle()
  await s.page.waitForFunction(() => window.__VITE_REACT_SSG_CONTEXT__)
  await s.page.fill('#contact-subject', 'Betreff')
  const r = await s.page.evaluate(() => [document.getElementById('contact-name').value, document.getElementById('contact-message').value, document.getElementById('privacy-consent').checked])
  expect(r[0] === 'Max' && r[1] === 'Eine genügend lange Nachricht' && r[2] === true, JSON.stringify(r))
  await s.close()
})

async function submitBeforeHydration(s, fill) {
  await s.page.goto(base + '/')
  await fill(s.page)
  await s.page.click('#contactForm button[type="submit"]')
  await s.page.waitForTimeout(150)
  const hint = await s.page.evaluate(() => document.getElementById('pending-submit-hint')?.textContent || null)
  expect(hint === 'Einen Moment bitte, das Formular wird vorbereitet …', 'Hinweis: ' + hint)
  expect(s.page.url() === base + '/', 'URL verändert: ' + s.page.url())
  s.releaseBundle()
  await s.page.waitForFunction(() => window.__VITE_REACT_SSG_CONTEXT__)
}

test('Formular vor Hydration: Absenden mit Fehler zeigt Hinweis, dann Fehlermeldung', async () => {
  const s = await open({ holdBundle: true })
  await submitBeforeHydration(s, async (page) => {
    await page.fill('#contact-name', 'Max')
    await page.fill('#contact-message', 'Lange genug Nachricht')
  })
  await s.page.waitForFunction(() => document.getElementById('form-status').style.display === 'block', null, { timeout: 5000 })
  const r = await s.page.evaluate(() => ({ status: document.getElementById('form-status').textContent, hint: !!document.getElementById('pending-submit-hint'), name: document.getElementById('contact-name').value }))
  expect(r.status === 'Bitte fülle alle Pflichtfelder aus (Name, E-Mail, Nachricht).' && !r.hint && r.name === 'Max', JSON.stringify(r))
  await s.close()
})

test('Formular vor Hydration: gültig, Token kommt, wird gesendet', async () => {
  const s = await open({ holdBundle: true, turnstile: { token: 'tok', delayMs: 1000 } })
  const sent = mockEmailJs(s.page)
  await submitBeforeHydration(s, fillValid)
  await s.page.waitForFunction(() => document.getElementById('form-status').style.display === 'block', null, { timeout: 8000 })
  const r = await s.page.evaluate(() => ({ status: document.getElementById('form-status').textContent, hint: !!document.getElementById('pending-submit-hint'), name: document.getElementById('contact-name').value }))
  expect(r.status === 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.' && !r.hint && r.name === '', JSON.stringify(r))
  expect(sent.payload?.template_params?.message === 'Eine genügend lange Nachricht', JSON.stringify(sent.payload))
  await s.close()
})

test('Formular vor Hydration: gültig ohne Token, nach Wartezeit Bot-Hinweis', async () => {
  const s = await open({ holdBundle: true })
  await submitBeforeHydration(s, fillValid)
  await s.page.waitForFunction(() => document.getElementById('form-status').style.display === 'block', null, { timeout: 12000 })
  const r = await s.page.evaluate(() => ({ status: document.getElementById('form-status').textContent, hint: !!document.getElementById('pending-submit-hint'), name: document.getElementById('contact-name').value }))
  expect(r.status === 'Bitte bestätige, dass du kein Bot bist.' && !r.hint && r.name === 'Max', JSON.stringify(r))
  await s.close()
})

// ── Language ─────────────────────────────────────────────────────────────────

test('Sprache: ?lang=en leitet auf /en/, ?lang=de wird entfernt, EN-Link speichert', async () => {
  const s = await open()
  await s.page.goto(base + '/?lang=en#faq')
  await s.page.waitForTimeout(300)
  expect(new URL(s.page.url()).pathname === '/en/', s.page.url())
  await s.page.goto(base + '/?lang=de&utm=x')
  expect(s.page.url() === base + '/?utm=x', s.page.url())
  await goto(s.page, '/')
  await s.page.click('#btn-en')
  await s.page.waitForLoadState('load')
  const r = await s.page.evaluate(() => [location.pathname, localStorage.getItem('sindigital-lang'), document.documentElement.lang])
  expect(r[0] === '/en/' && r[1] === 'en' && r[2] === 'en', JSON.stringify(r))
  await s.close()
})

test('Legal: EN aus localStorage, Zurück-Link, DE-Umschaltung', async () => {
  const s = await open({ storage: 'en' })
  await goto(s.page, '/agb.html')
  await s.page.waitForTimeout(200)
  let r = await s.page.evaluate(() => ({ lang: document.documentElement.lang, back: document.querySelector('.nav-back').getAttribute('href'), title: document.querySelector('.legal-title').textContent.trim(), en: document.getElementById('btn-en').className }))
  expect(r.lang === 'en' && r.back === '/en/' && r.title === 'General Terms & Conditions' && r.en === 'lang-btn active', JSON.stringify(r))
  await s.page.click('#btn-de')
  await s.page.waitForTimeout(300)
  r = await s.page.evaluate(() => ({ lang: document.documentElement.lang, back: document.querySelector('.nav-back').getAttribute('href'), stored: localStorage.getItem('sindigital-lang') }))
  expect(r.lang === 'de-CH' && r.back === '/' && r.stored === 'de', JSON.stringify(r))
  await s.close()
})

test('Legal: Scroll-nach-oben ab 400px, Reveal', async () => {
  const s = await open()
  await goto(s.page, '/datenschutz.html')
  await s.page.evaluate(() => window.scrollTo(0, 600))
  await s.page.waitForTimeout(200)
  const shown = await s.page.evaluate(() => document.getElementById('scrollTopBtn').className)
  await s.page.evaluate(() => window.scrollTo(0, 100))
  await s.page.waitForTimeout(200)
  const hiddenAgain = await s.page.evaluate(() => document.getElementById('scrollTopBtn').className)
  expect(shown === 'scroll-top-btn visible' && hiddenAgain === 'scroll-top-btn', shown + ' / ' + hiddenAgain)
  await s.page.evaluate(() => window.scrollTo(0, 1500))
  await s.page.waitForTimeout(200)
  await s.page.click('#scrollTopBtn')
  await s.page.waitForTimeout(1200)
  expect((await s.page.evaluate(() => window.scrollY)) === 0, 'scrollt nicht nach oben')
  const revealed = await s.page.evaluate(() => document.querySelector('.legal-grid').classList.contains('visible'))
  expect(revealed, 'erste .legal-grid nicht sichtbar')
  await s.close()
})

// ── Configurator ─────────────────────────────────────────────────────────────

const konfig = (page) => ({
  prices: () => page.evaluate(() => [...document.querySelectorAll('.konfig-summary-main .konfig-sr')].map((el) => el.textContent).join('–')),
  price: () => page.evaluate(() => document.querySelector('.konfig-price').textContent.replace(/\s+/g, ' ').trim()),
  meta: () => page.evaluate(() => document.querySelector('.konfig-meta').textContent.trim()),
  step: () => page.evaluate(() => [...document.querySelectorAll('.konfig-step')].findIndex((f) => !f.hidden) + 1 || (document.querySelector('.konfig-request') ? 5 : 0)),
  tile: (value) => page.click(`label.konfig-tile:has(input[value="${value}"])`),
  next: async () => {
    await page.click('.konfig-next')
    await page.waitForTimeout(120)
  },
})

test('Konfigurator: Schritt 1 und Standardpreis vorgerendert, noch ohne JavaScript', async () => {
  const s = await open({ holdBundle: true })
  await s.page.goto(base + '/konfigurator/')
  const k = konfig(s.page)
  expect((await k.step()) === 1, 'Schritt ' + (await k.step()))
  expect((await k.prices()) === "2'490", await k.prices())
  expect((await k.price()).startsWith('ab ca. CHF'), await k.price())
  expect((await k.meta()).startsWith('ca. 3 bis 5 Wochen'), await k.meta())
  const checked = await s.page.evaluate(() => document.querySelector('input[name=siteType]:checked').value)
  expect(checked === 'business', checked)
  const tile = await s.page.evaluate(() => {
    const business = document.querySelector('label.konfig-tile:has(input[value="business"])')
    const cms = document.querySelector('input[value="cms"]')
    return { badge: business.querySelector('.konfig-badge')?.textContent, price: business.querySelector('.konfig-tile-price').textContent, cms: cms.checked && cms.disabled && !cms.name }
  })
  expect(tile.badge === 'Beliebteste Wahl' && tile.price === "ab ca. CHF 2'490" && tile.cms, JSON.stringify(tile))
  await s.close()
})

test('Konfigurator vor Hydration: Auswahl bleibt, „Weiter“ wird nachgeholt', async () => {
  const s = await open({ holdBundle: true })
  await s.page.goto(base + '/konfigurator/')
  const k = konfig(s.page)
  await k.tile('landingpage')
  await s.page.click('.konfig-next')
  await s.page.waitForTimeout(150)
  expect(await s.page.evaluate(() => !!document.getElementById('pending-submit-hint')), 'kein Hinweis')
  s.releaseBundle()
  await s.page.waitForFunction(() => window.__VITE_REACT_SSG_CONTEXT__)
  await s.page.waitForFunction(() => !document.getElementById('pending-submit-hint'))
  await s.page.waitForTimeout(120)
  expect((await k.step()) === 2, 'Schritt ' + (await k.step()))
  expect((await k.prices()) === '790', await k.prices())
  const tiers = await s.page.evaluate(() => [...document.querySelectorAll('input[name=pages]')].map((i) => i.value).join())
  expect(tiers === 'single', tiers)
  await s.close()
})

test('Konfigurator: Preis und Wochen rechnen live, Zusammenfassung stimmt', async () => {
  const s = await open()
  await goto(s.page, '/konfigurator/')
  const k = konfig(s.page)
  await k.next()
  await k.tile('upTo10')
  await k.next()
  await k.tile('multilingual')
  await k.tile('booking')
  await k.next()
  await k.tile('express')
  await s.page.waitForTimeout(100)
  const expected = estimate({ siteType: 'business', pages: 'upTo10', features: ['multilingual', 'booking'], timing: 'express' })
  expect(!expected.onRequest && (await k.prices()) === chf(expected.priceFrom), (await k.prices()) + ' / ' + JSON.stringify(expected))
  const meta = await k.meta()
  expect(meta.includes(`ca. ${expected.weeks.min} bis ${expected.weeks.max} Wochen`) && meta.includes('Express'), meta)
  await k.next()
  expect((await k.step()) === 5, 'Schritt ' + (await k.step()))
  const config = await s.page.evaluate(() => document.querySelector('.konfig-config').textContent)
  expect(config.includes('Seitentyp: Firmenwebsite') && config.includes('Umfang: 6 bis 10 Seiten') && config.includes('Funktionen: Mehrsprachig, Online-Buchung, CMS (inklusive)') && config.includes(`Richtpreis: ab ca. CHF ${chf(expected.priceFrom)}`), config)
  await s.close()
})

test('Konfigurator: Shop oder grosser Umfang ergibt ein individuelles Angebot', async () => {
  const s = await open()
  await goto(s.page, '/konfigurator/')
  const k = konfig(s.page)
  await k.next()
  await k.next()
  await k.tile('shop')
  await s.page.waitForTimeout(100)
  const shop = { title: await s.page.evaluate(() => document.querySelector('.konfig-summary-title').textContent), price: await k.price(), meta: await k.meta() }
  expect(shop.title === 'Ihr Projekt' && shop.price === 'Individuelles Angebot' && shop.meta.includes('24 Stunden'), JSON.stringify(shop))
  await k.tile('shop')
  await s.page.waitForTimeout(100)
  expect((await k.prices()) === "2'490", await k.prices())
  await s.page.click('.konfig-back')
  await s.page.waitForTimeout(120)
  await k.tile('over20')
  await s.page.waitForTimeout(100)
  expect((await k.price()) === 'Individuelles Angebot', await k.price())
  await s.close()
})

test('Konfigurator: Anfrage schickt die Konfiguration mit', async () => {
  const s = await open({ turnstile: { token: 'tok' } })
  const sent = mockEmailJs(s.page)
  await goto(s.page, '/konfigurator/')
  const k = konfig(s.page)
  for (let i = 0; i < 4; i++) await k.next()
  await s.page.waitForTimeout(300)
  await fillValid(s.page)
  await s.page.click('#contactForm button[type="submit"]')
  await s.page.waitForFunction(() => document.getElementById('form-status').style.display === 'block')
  const status = await s.page.evaluate(() => document.getElementById('form-status').textContent)
  expect(status.startsWith('Vielen Dank'), status)
  const p = sent.payload?.template_params
  expect(p && p.configuration.includes('Seitentyp: Firmenwebsite') && p.configuration.includes("Richtpreis: ab ca. CHF 2'490") && p.message === 'Eine genügend lange Nachricht', JSON.stringify(p))
  await s.close()
})

test('Konfigurator: Tastatur (Pfeiltasten wählen, Enter geht weiter, Leertaste toggelt)', async () => {
  const s = await open()
  await goto(s.page, '/konfigurator/')
  const k = konfig(s.page)
  await s.page.focus('input[name=siteType]:checked')
  await s.page.keyboard.press('ArrowDown')
  const type = await s.page.evaluate(() => document.querySelector('input[name=siteType]:checked').value)
  expect(type === 'custom', type)
  await s.page.keyboard.press('Tab')
  expect((await s.page.evaluate(() => document.activeElement.className)).includes('konfig-next'), 'Tab erreicht „Weiter“ nicht')
  await s.page.keyboard.press('Enter')
  await s.page.waitForTimeout(150)
  expect((await k.step()) === 2, 'Enter geht nicht weiter')
  await s.page.keyboard.press('Tab')
  expect((await s.page.evaluate(() => document.activeElement.name)) === 'pages', 'Fokus nach Schrittwechsel: ' + (await s.page.evaluate(() => document.activeElement.outerHTML.slice(0, 60))))
  await s.page.keyboard.press('ArrowDown')
  await s.page.keyboard.press('Tab')
  await s.page.keyboard.press('Tab')
  await s.page.keyboard.press('Enter')
  await s.page.waitForTimeout(150)
  expect((await k.step()) === 3, 'Schritt ' + (await k.step()))
  await s.page.keyboard.press('Tab')
  await s.page.keyboard.press('Space')
  const features = await s.page.evaluate(() => [...document.querySelectorAll('input[name=features]:checked')].map((i) => i.value).join())
  expect(features === 'multilingual', features)
  expect((await k.price()) === 'Individuelles Angebot', await k.price())
  await s.close()
})

test('Konfigurator: reduced motion ohne Zähler-Animation', async () => {
  const s = await open({ reducedMotion: 'reduce' })
  await goto(s.page, '/konfigurator/')
  const duration = await s.page.evaluate(() => getComputedStyle(document.querySelector('.konfig-digit-strip')).transitionDuration)
  expect(duration === '0s', duration)
  await s.close()
})

test('Konfigurator EN: /en/configurator/ vorgerendert, Hinweis englisch', async () => {
  const s = await open({ holdBundle: true })
  await s.page.goto(base + '/en/configurator/')
  const r = await s.page.evaluate(() => ({ lang: document.documentElement.lang, title: document.title, canonical: document.querySelector('link[rel=canonical]').href, alt: document.querySelector('link[hreflang="de-CH"]').href }))
  expect(r.lang === 'en' && r.title.startsWith('Project Configurator') && r.canonical === 'https://www.sin-digital.com/en/configurator/' && r.alt === 'https://www.sin-digital.com/konfigurator/', JSON.stringify(r))
  await s.page.click('.konfig-next')
  await s.page.waitForTimeout(150)
  const hint = await s.page.evaluate(() => document.getElementById('pending-submit-hint')?.textContent)
  expect(hint === 'One moment please, the form is being prepared …', hint)
  await s.close()
})

// ── Case studies ─────────────────────────────────────────────────────────────

test('Projekte: Liste und Startseiten-Logos ohne JavaScript, Logos verlinken auf Case Studies', async () => {
  const s = await open()
  await goto(s.page, '/projekte/', { hydrated: false })
  const list = await s.page.evaluate(() => ({
    rows: document.querySelectorAll('.proj-row').length,
    first: document.querySelector('.proj-row-link')?.textContent,
    modules: document.querySelectorAll('script[type="module"]').length,
    root: !!document.getElementById('root'),
  }))
  expect(list.rows === 3 && list.first === 'Street Food Compassion' && list.modules === 0 && !list.root, JSON.stringify(list))
  await goto(s.page, '/')
  const links = await s.page.evaluate(() => [...document.querySelectorAll('.client-logo-link')].map((a) => a.getAttribute('href')))
  expect(links.every((href) => href.startsWith('/projekte/')) && links.length === 3, links.join())
  await s.close()
})

test('Projekt: Vorher/Nachher-Slider per Tastatur und Maus (Inline-Script, kein React)', async () => {
  const s = await open()
  await goto(s.page, '/projekte/street-food-compassion/', { hydrated: false })
  const state = () => s.page.evaluate(() => ({ clip: document.querySelector('.ba-after').style.clipPath, left: document.querySelector('.ba-line').style.left, value: document.querySelector('.ba-range').value, modules: document.querySelectorAll('script[type="module"]').length }))
  let r = await state()
  expect(r.clip === 'inset(0px 0px 0px 50%)' && r.left === '50%' && r.modules === 0, JSON.stringify(r))
  await s.page.focus('.ba-range')
  for (let i = 0; i < 10; i++) await s.page.keyboard.press('ArrowRight')
  r = await state()
  expect(r.value === '60' && r.clip === 'inset(0px 0px 0px 60%)' && r.left === '60%', JSON.stringify(r))
  const range = s.page.locator('.ba-range')
  await range.scrollIntoViewIfNeeded()
  const box = await range.boundingBox()
  await range.click({ position: { x: box.width * 0.25, y: box.height / 2 }, force: true })
  r = await state()
  expect(Math.abs(Number(r.value) - 25) <= 2 && r.left === `${r.value}%`, JSON.stringify(r))
  await s.close()
})

test('Projekt: ohne Vorher-Bild Cover und „Erste Website“, Ringe nur mit Messwerten', async () => {
  const s = await open()
  await goto(s.page, '/projekte/coiffeur-zuerich/', { hydrated: false })
  const r = await s.page.evaluate(() => ({ slider: !!document.querySelector('.ba'), cover: !!document.querySelector('.proj-cover img'), label: document.querySelector('.proj-head .label').textContent, rings: document.querySelectorAll('.ring').length, measured: !!document.querySelector('.proj-metrics-note') }))
  expect(!r.slider && r.cover && r.label.includes('Erste Website') && r.rings === 4 && r.measured, JSON.stringify(r))
  await s.close()
})

test('Projekt: Ring-Animation nur ohne reduced motion', async () => {
  const a = await open()
  await goto(a.page, '/projekte/street-food-compassion/', { hydrated: false })
  const animated = await a.page.evaluate(() => getComputedStyle(document.querySelector('.ring-value')).animationName)
  await a.close()
  const b = await open({ reducedMotion: 'reduce' })
  await goto(b.page, '/projekte/street-food-compassion/', { hydrated: false })
  const still = await b.page.evaluate(() => getComputedStyle(document.querySelector('.ring-value')).animationName)
  await b.close()
  expect(animated === 'ring-fill' && still === 'none', `${animated} / ${still}`)
})

test('Projekt EN: /en/projects/<slug>/ vorgerendert, unbekannter Slug ist 404', async () => {
  const s = await open()
  await goto(s.page, '/en/projects/rh-haustechnik/', { hydrated: false })
  const r = await s.page.evaluate(() => ({ lang: document.documentElement.lang, title: document.title, canonical: document.querySelector('link[rel=canonical]').href, de: document.querySelector('link[hreflang="de-CH"]').href, crumb: document.querySelector('.page-breadcrumb').textContent.replace(/\s+/g, ' ').trim() }))
  expect(r.lang === 'en' && r.title.startsWith('RH Haustechnik: Case study') && r.canonical === 'https://www.sin-digital.com/en/projects/rh-haustechnik/' && r.de === 'https://www.sin-digital.com/projekte/rh-haustechnik/' && r.crumb.includes('Projects'), JSON.stringify(r))
  const response = await s.page.goto(base + '/projekte/gibt-es-nicht/')
  expect(response.status() === 404, String(response.status()))
  await s.close()
})

// ── Website check ────────────────────────────────────────────────────────────

const PSI = /googleapis\.com\/pagespeedonline/
const psiResult = {
  lighthouseResult: {
    finalDisplayedUrl: 'https://www.example.ch/',
    categories: { performance: { score: 0.72 }, accessibility: { score: 0.95 }, 'best-practices': { score: 1 }, seo: { score: 0.88 } },
    audits: {
      'largest-contentful-paint': { score: 0.3, numericValue: 4100 },
      'render-blocking-resources': { score: 0.2, details: { overallSavingsMs: 1800 } },
      'uses-responsive-images': { score: 0.5, details: { overallSavingsMs: 900, overallSavingsBytes: 500000 } },
      'meta-description': { score: 0 },
    },
  },
}
// Fulfils after a delay; a closed page is ignored (timeout test).
const fulfillJson = (route, status, body, delayMs = 0) =>
  setTimeout(() => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) }).catch(() => {}), delayMs)

const wc = (page) => ({
  rings: () => page.evaluate(() => [...document.querySelectorAll('.wc-result .ring-score')].map((el) => el.textContent).join('/')),
  tips: () => page.evaluate(() => [...document.querySelectorAll('.wc-tips strong')].map((el) => el.textContent)),
  error: () => page.evaluate(() => document.querySelector('.wc-error p')?.textContent || ''),
})

test('Website-Check: Fortschritt, Scores und drei Tipps nach Wirkung (API gemockt)', async () => {
  const s = await open()
  await s.page.route(PSI, (route) => fulfillJson(route, 200, psiResult, 2500))
  await goto(s.page, '/website-check/')
  await s.page.fill('#wc-url', 'www.example.ch')
  await s.page.click('.wc-submit')
  await s.page.waitForSelector('.wc-progress')
  const progress = await s.page.evaluate(() => ({ title: document.querySelector('.wc-progress-title').textContent, phase: document.querySelector('.wc-phase').textContent, disabled: document.getElementById('wc-url').disabled, btn: document.querySelector('.wc-submit').textContent }))
  expect(progress.title === 'Google misst gerade' && progress.phase === 'Verbindung zu PageSpeed Insights' && progress.disabled && progress.btn === 'Wird geprüft …', JSON.stringify(progress))
  await s.page.waitForSelector('.wc-result', { timeout: 10000 })
  const w = wc(s.page)
  expect((await w.rings()) === '72/95/100/88', await w.rings())
  const tips = await w.tips()
  expect(tips.join('|') === 'CSS und Scripts blockieren den ersten Eindruck|Der grösste Inhalt erscheint spät|Bilder sind zu gross für den Bildschirm', tips.join('|'))
  const r = await s.page.evaluate(() => ({ host: document.querySelector('.wc-result-host').textContent, focused: document.activeElement.className, cta: [...document.querySelectorAll('.wc-cta-actions a')].map((a) => a.getAttribute('href')).join() }))
  expect(r.host === 'www.example.ch' && r.focused === 'wc-result' && r.cta === '/#contact,/konfigurator/', JSON.stringify(r))
  await s.close()
})

test('Website-Check: ungültige Adresse, nicht erreichbar, Rate-Limit, Timeout', async () => {
  const s = await open()
  let calls = 0
  let mode = 'unreachable'
  await s.page.route(PSI, (route) => {
    calls++
    if (mode === 'unreachable') fulfillJson(route, 400, { error: { message: 'Lighthouse returned error: FAILED_DOCUMENT_REQUEST' } })
    else if (mode === 'rate') fulfillJson(route, 429, { error: { message: 'Quota exceeded' } })
    else fulfillJson(route, 200, psiResult, 6000)
  })
  await goto(s.page, '/website-check/')
  const w = wc(s.page)
  await s.page.fill('#wc-url', 'keine adresse')
  await s.page.click('.wc-submit')
  const invalid = await s.page.evaluate(() => document.getElementById('wc-url-error')?.textContent)
  expect(invalid?.startsWith('Bitte geben Sie eine gültige Adresse') && calls === 0, `${invalid} / Aufrufe ${calls}`)
  await s.page.fill('#wc-url', 'www.example.ch')
  await s.page.click('.wc-submit')
  await s.page.waitForSelector('.wc-error')
  expect((await w.error()).startsWith('Google konnte diese Adresse nicht laden'), await w.error())
  mode = 'rate'
  await s.page.click('.wc-error .wc-again')
  await s.page.click('.wc-submit')
  await s.page.waitForSelector('.wc-error')
  expect((await w.error()).startsWith('Gerade laufen zu viele Prüfungen'), await w.error())
  mode = 'slow'
  await s.page.evaluate(() => {
    window.__psiTimeoutMs = 1500
  })
  await s.page.click('.wc-error .wc-again')
  await s.page.click('.wc-submit')
  await s.page.waitForSelector('.wc-error', { timeout: 8000 })
  expect((await w.error()).startsWith('Die Messung hat zu lange gedauert'), await w.error())
  await s.close()
})

test('Website-Check vor Hydration: Eingabe und Absenden werden nachgeholt', async () => {
  const s = await open({ holdBundle: true })
  await s.page.route(PSI, (route) => fulfillJson(route, 200, psiResult, 300))
  await s.page.goto(base + '/website-check/')
  await s.page.fill('#wc-url', 'www.example.ch')
  await s.page.click('.wc-submit')
  await s.page.waitForTimeout(150)
  expect(await s.page.evaluate(() => !!document.getElementById('pending-submit-hint')), 'kein Hinweis')
  s.releaseBundle()
  await s.page.waitForSelector('.wc-result', { timeout: 15000 })
  expect((await wc(s.page).rings()) === '72/95/100/88', await wc(s.page).rings())
  await s.close()
})

test('Website-Check: Enter sendet, reduced motion ohne Animation, EN-Seite', async () => {
  const s = await open({ reducedMotion: 'reduce' })
  await s.page.route(PSI, (route) => fulfillJson(route, 200, psiResult, 2000))
  await goto(s.page, '/website-check/')
  await s.page.focus('#wc-url')
  await s.page.keyboard.type('www.example.ch')
  await s.page.keyboard.press('Enter')
  await s.page.waitForSelector('.wc-bar-fill')
  const bar = await s.page.evaluate(() => getComputedStyle(document.querySelector('.wc-bar-fill')).transitionDuration)
  expect(bar === '0s', bar)
  await s.page.waitForSelector('.wc-result', { timeout: 10000 })
  const ring = await s.page.evaluate(() => getComputedStyle(document.querySelector('.wc-result .ring-value')).animationName)
  expect(ring === 'none', ring)
  await s.page.goto(base + '/en/website-check/')
  const r = await s.page.evaluate(() => ({ lang: document.documentElement.lang, title: document.title, label: document.querySelector('.wc-label').textContent, footer: document.querySelector('.footer-links a').getAttribute('href') }))
  expect(r.lang === 'en' && r.title.startsWith('Website Check') && r.label === 'Address of your website' && r.footer === '/en/website-check/', JSON.stringify(r))
  await s.close()
})

// ── Maintenance ──────────────────────────────────────────────────────────────

test('Wartung: drei Pakete ohne JavaScript, Preise aus maintenance.js, FAQ-Schema', async () => {
  const s = await open()
  await goto(s.page, '/wartung/', { hydrated: false })
  const r = await s.page.evaluate(() => ({
    plans: [...document.querySelectorAll('.care-plan-name')].map((el) => el.textContent).join(','),
    prices: [...document.querySelectorAll('.care-price-monthly .care-amount')].map((el) => el.textContent).join(','),
    featured: document.querySelector('.care-plan.is-featured .care-plan-name')?.textContent,
    modules: document.querySelectorAll('script[type="module"]').length,
    faq: document.querySelectorAll('details.care-faq-item').length,
    schemaFaq: [...document.querySelectorAll('script[type="application/ld+json"]')].some((el) => el.textContent.includes('"FAQPage"')),
  }))
  expect(r.plans === 'Basis,Business,Premium' && r.prices === 'CHF 49,CHF 89,CHF 149' && r.featured === 'Business' && r.modules === 0 && r.faq === 8 && r.schemaFaq, JSON.stringify(r))
  await s.close()
})

test('Wartung: Jahres-Toggle per CSS (nur wenn ein Jahrespreis konfiguriert ist)', async () => {
  const s = await open()
  await goto(s.page, '/wartung/', { hydrated: false })
  const hasToggle = await s.page.evaluate(() => !!document.querySelector('.care-toggle'))
  if (hasToggle) {
    await s.page.click('label[for="billing-yearly"]')
    const r = await s.page.evaluate(() => ({ monthly: getComputedStyle(document.querySelector('.care-price-monthly')).display, yearly: getComputedStyle(document.querySelector('.care-price-yearly')).display }))
    expect(r.monthly === 'none' && r.yearly === 'block', JSON.stringify(r))
  } else {
    const yearly = await s.page.evaluate(() => document.querySelectorAll('.care-price-yearly').length)
    expect(yearly === 0, 'Jahrespreise ohne Toggle')
  }
  await s.close()
})

test('Wartung: FAQ per <details>, nur eins offen, Tastatur', async () => {
  const s = await open()
  await goto(s.page, '/wartung/', { hydrated: false })
  const items = s.page.locator('details.care-faq-item')
  await items.nth(0).locator('summary').click()
  await items.nth(1).locator('summary').click()
  let state = await s.page.evaluate(() => [...document.querySelectorAll('details.care-faq-item')].map((d) => d.open))
  expect(state[1] === true && state[0] === false, state.join(','))
  await items.nth(2).locator('summary').focus()
  await s.page.keyboard.press('Enter')
  state = await s.page.evaluate(() => [...document.querySelectorAll('details.care-faq-item')].map((d) => d.open))
  expect(state[2] === true && state[1] === false, state.join(','))
  await s.close()
})

test('Startseite: Partner-Stufen kommen aus maintenance.js', async () => {
  const s = await open()
  await goto(s.page, '/')
  const tiers = await s.page.evaluate(() => [...document.querySelectorAll('.care-tier-title')].map((el) => el.textContent).join('|'))
  expect(tiers === 'Basis Care, CHF 49/Monat|Business Care, CHF 89/Monat|Premium Care, CHF 149/Monat', tiers)
  await s.close()
})

// ── Server behaviour ─────────────────────────────────────────────────────────

test('404: unbekannter Pfad liefert Status 404 mit 404.html', async () => {
  const s = await open()
  const response = await s.page.goto(base + '/gibt-es-nicht')
  const h1 = await s.page.evaluate(() => document.querySelector('h1')?.textContent)
  expect(response.status() === 404 && h1 === 'Seite nicht gefunden', `${response.status()} / ${h1}`)
  await s.close()
})

test('Konsole: keine Fehler oder Warnungen auf allen Seiten', async () => {
  const problems = []
  for (const page of pagesToTest()) {
    const s = await open()
    await s.page.goto(base + page.path, { waitUntil: 'networkidle' }).catch(() => {})
    if (page.js) await s.page.waitForFunction(() => window.__VITE_REACT_SSG_CONTEXT__, null, { timeout: 15000 }).catch(() => s.messages.push('[test] nicht hydriert'))
    await s.page.waitForTimeout(400)
    if (s.messages.length) problems.push(`${page.path}: ${s.messages.join(' | ')}`)
    await s.close()
  }
  expect(problems.length === 0, problems.join(' || ').slice(0, 400))
})

// ── Runner ───────────────────────────────────────────────────────────────────

const selected = tests.filter((t) => !flags.only || t.name.includes(flags.only))
const rows = []
let failed = 0
for (const t of selected) {
  const started = Date.now()
  try {
    await t.fn()
    rows.push(['PASS', t.name, `${((Date.now() - started) / 1000).toFixed(1)} s`, ''])
  } catch (error) {
    failed++
    rows.push(['FAIL', t.name, `${((Date.now() - started) / 1000).toFixed(1)} s`, error.message.replace(/\s+/g, ' ').slice(0, 200)])
  }
  for (const context of openContexts) await context.close().catch(() => {})
  openContexts.clear()
}

await browser.close()
await close()
printTable(['', 'Test', 'Dauer', 'Details'], rows)
console.log(`\n${selected.length - failed} von ${selected.length} Tests bestanden`)
if (failed) process.exit(1)
