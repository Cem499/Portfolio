// End-to-end checks of the build with Playwright: interactions, keyboard, reduced
// motion, forms before and after hydration, language handling, console errors.
//
//   node tools/e2e.mjs                 all tests, exit 1 if one fails
//   node tools/e2e.mjs --only Formular  tests whose name contains the text
//
// Third-party scripts are stubbed (Turnstile, EmailJS), nothing leaves the machine.
import { chromium } from 'playwright-core'
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
  await s.page.click('.nav-link[href="#faq"]')
  await s.page.waitForTimeout(1500)
  const r = await s.page.evaluate(() => ({ y: window.scrollY, target: document.querySelector('#faq').getBoundingClientRect().top + window.scrollY - 70 }))
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
