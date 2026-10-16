import { useEffect, useRef, useState } from 'react'
import { packageById, packages } from '../data/packages.js'
import {
  DEFAULTS,
  EXPRESS,
  EXTRA_PAGE,
  LANGUAGE_COUNTS,
  addonPrice,
  addonState,
  addons as addonList,
  chf,
  estimate,
  expressState,
  launchAvailable,
  pageCount,
  startTooEarly,
  switchPackage,
  timings,
  toggleAddon,
} from '../data/pricing.js'
import { fill, packageValues, siteValues } from '../data/siteValues.js'
import usePendingSubmit, { valuesFromDom } from '../hooks/usePendingSubmit.js'
import AnimatedNumber from './AnimatedNumber.jsx'
import ContactForm from './ContactForm.jsx'

const STEPS = ['package', 'addons', 'terms', 'request']
const LAST_CHOICE = 3
const REQUEST = 4

// "3 – 5 Wochen" or "9 – 15 Arbeitstage"
function durationText(t, d) {
  const n = d.min === d.max ? String(d.min) : `${d.min} – ${d.max}`
  const unit = d.unit === 'days' ? (d.max === 1 ? t.summary.day : t.summary.days) : d.max === 1 ? t.summary.week : t.summary.weeks
  return `${n} ${unit}`
}

// "+2–3 Wochen" for an add-on, '' when it adds no time.
function weeksAdd(t, weeks) {
  if (!weeks.max) return ''
  const n = weeks.min === weeks.max ? String(weeks.min) : `${weeks.min}–${weeks.max}`
  return `+${n} ${weeks.max === 1 ? t.summary.week : t.summary.weeks}`
}

// "15. Januar 2027" for an individual date, the timing name otherwise.
function timingText(t, state) {
  if (state.timing !== 'date') return (t.timings[state.timing] || t.timings[DEFAULTS.timing]).name
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(state.start || '')
  if (!match) return t.configuration.startOpen
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  return new Intl.DateTimeFormat(t.dateLocale, { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

function languagesText(t, n) {
  if (!n) return t.languages.none
  return n === 1 ? t.languages.one : fill(t.languages.many, { n })
}

// Plain-text summary that travels with the enquiry (EmailJS field "configuration").
function configurationText(t, shared, values, state, est) {
  const c = t.configuration
  const pkg = packageById(state.pkg) || packageById(DEFAULTS.pkg)
  const lines = [[c.package, shared.packages[pkg.id].name]]
  if (est.onRequest) {
    if (est.reason === 'pages') lines.push([c.pages, String(est.pages)])
    lines.push([c.price, fill(c.priceOnRequest, values)])
    lines.push([c.duration, t.summary.durationOnRequest])
  } else {
    if (EXTRA_PAGE.only.includes(pkg.id)) lines.push([c.pages, String(est.pages)])
    lines.push([c.languages, languagesText(t, est.languages)])
    lines.push([c.addons, est.addons.map((a) => t.addons[a.id].name).join(', ') || c.none])
    if (est.expressOn) lines.push([c.express, `${c.yes} (+ CHF ${chf(est.express)})`])
    if (est.discount) {
      const name = est.discountType === 'launch' ? t.summary.lines.launch : t.summary.lines.club
      lines.push([c.discount, `${name}, − CHF ${chf(est.discount)}${est.bothDiscounts ? ` (${t.discounts.higher})` : ''}`])
    }
    lines.push([c.price, `CHF ${chf(est.total)}`])
    lines.push([c.duration, durationText(t, est.duration)])
  }
  lines.push([c.timing, timingText(t, state)])
  return lines.map(([label, value]) => `${label}: ${value}`).join('\n')
}

function Tile({ type, name, value, checked, onChange, title, badge, desc, price, meta, hint, disabled, reason }) {
  const cls = ['konfig-tile', checked ? 'is-selected' : '', disabled ? 'is-disabled' : ''].filter(Boolean).join(' ')
  return (
    <label className={cls}>
      <input type={type} name={name} value={value} checked={checked} disabled={disabled} onChange={onChange} />
      <span className="konfig-tile-name">
        {title}
        {badge && <span className="konfig-tile-badge">{badge}</span>}
      </span>
      {desc && <span className="konfig-tile-desc">{desc}</span>}
      {price && <span className="konfig-tile-price">{price}</span>}
      {meta && <span className="konfig-tile-meta">{meta}</span>}
      {disabled && reason && <span className="konfig-tile-reason">{reason}</span>}
      {!disabled && hint && <span className="konfig-tile-hint">{hint}</span>}
    </label>
  )
}

// Package, extras, discount and start, then the contact form with the configuration attached.
// Step 1 is prerendered; choices made before React is ready stay (valuesFromDom) and a "Weiter"
// pressed early is picked up (usePendingSubmit). The price is a fixed amount, the duration a range.
export default function Configurator({ t, shared, lang, formTexts }) {
  const values = siteValues(lang)
  // Choices made before hydration are read once, but applied only after React is in control:
  // rendering them during hydration would not match the prerendered HTML (summary texts),
  // and React would then rebuild the DOM and lose the form node a pending submit points to.
  const [fromDom] = useState(() => valuesFromDom('configurator', DEFAULTS))
  const [state, setState] = useState(DEFAULTS)
  const [step, setStep] = useState(1)
  const [dropped, setDropped] = useState([])
  // Today, set after hydration so the prerendered HTML stays stable (date field minimum,
  // launch discount, "too early" hint).
  const [today, setToday] = useState(null)
  const formRef = useRef(null)
  const stepRefs = useRef([])
  const moveFocusRef = useRef(false)

  useEffect(() => {
    // A package button on the start page links to /konfigurator/?paket=<id>.
    const wanted = new URLSearchParams(window.location.search).get('paket')
    setState(packageById(wanted) ? switchPackage(fromDom, wanted).state : fromDom)
    setToday(new Date())
  }, [fromDom])

  usePendingSubmit(formRef)

  const now = today || new Date()
  const pkg = packageById(state.pkg) || packageById(DEFAULTS.pkg)
  const est = estimate(state, { today: now })
  const configText = configurationText(t, shared, values, state, est)
  const launchOffered = launchAvailable(pkg.id, now)
  const pagesAllowed = EXTRA_PAGE.only.includes(pkg.id)
  const express = expressState(pkg, state.addons)
  const todayIso = today ? `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}` : undefined
  const tooEarly = !est.onRequest && state.timing === 'date' && startTooEarly(state.start, est.weeks.max, now)

  function selectPackage(id) {
    setState((s) => {
      const next = switchPackage(s, id)
      setDropped(next.dropped)
      return next.state
    })
  }

  function goTo(next) {
    moveFocusRef.current = true
    setStep(next)
  }

  // After a step change: bring the new step into view and move focus to it.
  useEffect(() => {
    if (!moveFocusRef.current) return
    moveFocusRef.current = false
    const el = stepRefs.current[step - 1]
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    el.focus({ preventScroll: true })
  }, [step])

  function onSubmit(e) {
    e.preventDefault()
    if (step > LAST_CHOICE) return
    // The individual package has no price calculation: straight to the conversation.
    goTo(pkg.onRequest ? REQUEST : step + 1)
  }

  const stepRef = (index) => (el) => {
    stepRefs.current[index] = el
  }

  const legend = (index, key) => (
    <legend className="konfig-legend">
      <span className="konfig-step-label">
        {t.stepWord} {index + 1} {t.ofWord} {STEPS.length} · {t.steps[key].title}
      </span>
      <span className="konfig-question">{t.steps[key].question}</span>
    </legend>
  )

  const reasonText = (st) => (st.allowed ? '' : fill(t.reasons[st.reason], { blocker: st.blocker ? t.addons[st.blocker].name : '' }))

  const nextLabel = pkg.onRequest ? t.discuss : step === LAST_CHOICE ? t.toRequest : t.next

  return (
    <div className="konfig">
      <form id="configurator" className="konfig-steps" ref={formRef} onSubmit={onSubmit} noValidate aria-label={t.label}>
        <ol className="konfig-progress" aria-label={t.stepWord}>
          {STEPS.map((key, i) => {
            const n = i + 1
            const cls = n < step ? 'is-done' : n === step ? 'is-current' : ''
            return (
              <li key={key} className={cls} aria-current={n === step ? 'step' : undefined}>
                <span className="konfig-progress-num">{String(n).padStart(2, '0')}</span>
                <span className="konfig-progress-title">{t.steps[key].title}</span>
              </li>
            )
          })}
        </ol>

        <fieldset ref={stepRef(0)} className="konfig-step" hidden={step !== 1} tabIndex={-1}>
          {legend(0, 'package')}
          <div className="konfig-tiles" data-count={packages.length}>
            {packages.map((p) => {
              const pv = { ...values, ...packageValues(p, lang, shared.care.plans) }
              return (
                <Tile
                  key={p.id}
                  type="radio"
                  name="pkg"
                  value={p.id}
                  checked={state.pkg === p.id}
                  onChange={() => selectPackage(p.id)}
                  title={shared.packages[p.id].name}
                  badge={p.featured ? t.badge : undefined}
                  desc={fill(t.packages[p.id].desc, pv)}
                  price={p.onRequest ? `${t.summary.from} CHF ${chf(p.priceFrom)}` : `CHF ${chf(p.price)} · ${t.fixedPrice}`}
                  meta={fill(t.packages[p.id].meta, pv)}
                />
              )
            })}
          </div>
          {dropped.length > 0 && (
            <p className="konfig-hint konfig-dropped" role="status">
              {t.dropped.intro} {dropped.map((id) => t.dropped[id] || t.addons[id]?.name || id).join(', ')}
            </p>
          )}
        </fieldset>

        <fieldset ref={stepRef(1)} className="konfig-step" hidden={step !== 2} tabIndex={-1}>
          {legend(1, 'addons')}
          <p className="konfig-hint">{t.steps.addons.hint}</p>
          <div className="konfig-fields">
            <div className={pagesAllowed ? 'konfig-field' : 'konfig-field is-disabled'}>
              <label htmlFor="konfig-pages">{t.pages.label}</label>
              <input
                id="konfig-pages"
                type="number"
                name="pages"
                inputMode="numeric"
                min={pagesAllowed ? pkg.pages : undefined}
                max={pagesAllowed ? EXTRA_PAGE.max : undefined}
                step="1"
                value={pagesAllowed ? state.pages : String(pkg.pages || 1)}
                disabled={!pagesAllowed}
                aria-describedby="konfig-pages-hint"
                onChange={(e) => setState((s) => ({ ...s, pages: e.target.value }))}
              />
              <span id="konfig-pages-hint" className="konfig-field-hint">
                {pagesAllowed
                  ? pageCount(pkg, state.pages) > EXTRA_PAGE.max
                    ? fill(t.pages.tooMany, { ...values, individuell: shared.packages.individuell.name })
                    : fill(t.pages.hint, { ...values, included: pkg.pages })
                  : fill(t.pages.onlyFirm, { firmenwebsite: shared.packages.firmenwebsite.name })}
              </span>
            </div>
            <div className="konfig-field">
              <label htmlFor="konfig-languages">{t.languages.label}</label>
              <select
                id="konfig-languages"
                name="languages"
                value={state.languages}
                aria-describedby="konfig-languages-hint"
                onChange={(e) => setState((s) => ({ ...s, languages: e.target.value }))}
              >
                {LANGUAGE_COUNTS.map((n) => (
                  <option key={n} value={n}>
                    {languagesText(t, Number(n))}
                  </option>
                ))}
              </select>
              <span id="konfig-languages-hint" className="konfig-field-hint">
                {fill(t.languages.hint, values)}
              </span>
            </div>
          </div>
          <div className="konfig-tiles">
            {addonList.map((addon) => {
              const st = addonState(addon, pkg, state.addons.filter((id) => id !== addon.id))
              const price = addonPrice(addon, pkg, est.onRequest ? 0 : est.extraPages)
              const time = weeksAdd(t, addon.weeks)
              return (
                <Tile
                  key={addon.id}
                  type="checkbox"
                  name="addons"
                  value={addon.id}
                  checked={state.addons.includes(addon.id)}
                  disabled={!st.allowed}
                  reason={reasonText(st)}
                  onChange={() => setState((s) => ({ ...s, addons: toggleAddon(s.addons, addon.id) }))}
                  title={t.addons[addon.id].name}
                  desc={fill(t.addons[addon.id].desc, values)}
                  price={`+ CHF ${chf(price)}${time ? ` · ${time}` : ''}`}
                  hint={t.addons[addon.id].hint}
                />
              )
            })}
            <Tile
              type="checkbox"
              name="express"
              value="1"
              checked={Boolean(state.express)}
              disabled={!express.allowed}
              reason={reasonText(express)}
              onChange={() => setState((s) => ({ ...s, express: !s.express }))}
              title={t.addons.express.name}
              desc={fill(t.addons.express.desc, values)}
              price={`+ ${EXPRESS.percent} %${!est.onRequest && est.expressOn ? ` · + CHF ${chf(est.express)}` : ''}`}
              hint={t.addons.express.hint}
            />
          </div>
        </fieldset>

        <fieldset ref={stepRef(2)} className="konfig-step" hidden={step !== 3} tabIndex={-1}>
          {legend(2, 'terms')}
          <p className="konfig-hint">{t.steps.terms.hint}</p>
          <div className="konfig-tiles" data-count={launchOffered ? 2 : 1}>
            {launchOffered && (
              <Tile
                type="checkbox"
                name="launch"
                value="1"
                checked={Boolean(state.launch)}
                onChange={() => setState((s) => ({ ...s, launch: !s.launch }))}
                title={t.discounts.launch.name}
                desc={fill(t.discounts.launch.desc, values)}
                price={!est.onRequest && est.launch ? `− CHF ${chf(est.launch)}` : `− ${values.launchPercent} %`}
                hint={t.discounts.launch.condition}
              />
            )}
            <Tile
              type="checkbox"
              name="club"
              value="1"
              checked={Boolean(state.club)}
              onChange={() => setState((s) => ({ ...s, club: !s.club }))}
              title={t.discounts.club.name}
              desc={fill(t.discounts.club.desc, values)}
              price={!est.onRequest && est.club ? `− CHF ${chf(est.club)}` : `− ${values.clubPercent} %`}
              hint={t.discounts.club.hint}
            />
          </div>
          {!est.onRequest && est.bothDiscounts && (
            <p className="konfig-hint konfig-higher" role="status">
              {t.discounts.higher}
            </p>
          )}
          <div className="konfig-subhead">{t.configuration.timing}</div>
          <div className="konfig-tiles" data-count={timings.length}>
            {timings.map((timing) => (
              <Tile
                key={timing.id}
                type="radio"
                name="timing"
                value={timing.id}
                checked={state.timing === timing.id}
                onChange={() => setState((s) => ({ ...s, timing: timing.id }))}
                title={t.timings[timing.id].name}
                desc={t.timings[timing.id].desc}
              />
            ))}
          </div>
          {state.timing === 'date' && (
            <div className="konfig-field">
              <label htmlFor="konfig-start">{t.start.label}</label>
              <input
                id="konfig-start"
                type="date"
                name="start"
                value={state.start}
                min={todayIso}
                aria-describedby="konfig-start-hint"
                onChange={(e) => setState((s) => ({ ...s, start: e.target.value }))}
              />
              <span id="konfig-start-hint" className={tooEarly ? 'konfig-field-hint is-warning' : 'konfig-field-hint'}>
                {tooEarly ? t.start.tooEarly : t.start.hint}
              </span>
            </div>
          )}
        </fieldset>

        {step <= LAST_CHOICE && (
          <div className="konfig-nav">
            {step > 1 && (
              <button type="button" className="konfig-back" onClick={() => goTo(step - 1)}>
                {t.back}
              </button>
            )}
            <button type="submit" className="btn-primary konfig-next">
              {nextLabel}
            </button>
          </div>
        )}
      </form>

      {step === REQUEST && (
        <section ref={stepRef(3)} className="konfig-request" tabIndex={-1} aria-labelledby="konfig-request-title">
          <span className="konfig-step-label">
            {t.stepWord} {REQUEST} {t.ofWord} {STEPS.length} · {t.steps.request.title}
          </span>
          <h2 id="konfig-request-title" className="konfig-question">
            {pkg.onRequest ? t.request.titleIndividual : t.request.title}
          </h2>
          <p className="konfig-hint">{fill(pkg.onRequest ? t.request.textIndividual : t.request.text, values)}</p>
          <pre className="konfig-config" aria-label={t.summary.selection}>
            {configText}
          </pre>
          <ContactForm texts={formTexts} configuration={configText} />
          <button type="button" className="konfig-back" onClick={() => goTo(pkg.onRequest ? 1 : LAST_CHOICE)}>
            {t.back}
          </button>
        </section>
      )}

      <aside className="konfig-summary" aria-label={t.summary.title}>
        <div className="konfig-summary-main" aria-live="polite" aria-atomic="true">
          <span className="konfig-summary-title">{t.summary.title}</span>
          <div className="konfig-price">
            {est.onRequest ? (
              <>
                <span className="konfig-from">{t.summary.from}</span>{' '}
                <span className="konfig-amount">
                  <span className="konfig-currency">CHF</span> <AnimatedNumber value={est.priceFrom} />
                </span>
              </>
            ) : (
              <span className="konfig-amount">
                <span className="konfig-currency">CHF</span> <AnimatedNumber value={est.total} />
              </span>
            )}
          </div>
          <p className="konfig-meta">{est.onRequest ? `${t.summary.onRequest} · ${t.summary.durationOnRequest}` : durationText(t, est.duration)}</p>
        </div>
        <div className="konfig-summary-details">
          <span className="konfig-details-title">{t.summary.selection}</span>
          <ul className="konfig-selection">
            <li>
              <span>{t.summary.lines.package}</span>
              <strong>{shared.packages[pkg.id].name}</strong>
            </li>
            {!est.onRequest && est.extraPages > 0 && (
              <li>
                <span>
                  {t.summary.lines.pages} ({est.extraPages} × CHF {chf(EXTRA_PAGE.price)})
                </span>
                <strong>+ CHF {chf(est.extraPages * EXTRA_PAGE.price)}</strong>
              </li>
            )}
            {!est.onRequest && est.languages > 0 && (
              <li>
                <span>
                  {t.summary.lines.languages} ({est.languages} × CHF {chf(est.perLanguage)})
                </span>
                <strong>+ CHF {chf(est.languagesTotal)}</strong>
              </li>
            )}
            {!est.onRequest &&
              est.addons.map((line) => (
                <li key={line.id}>
                  <span>{t.addons[line.id].name}</span>
                  <strong>+ CHF {chf(line.price)}</strong>
                </li>
              ))}
            {!est.onRequest && est.expressOn && (
              <li>
                <span>{t.summary.lines.express}</span>
                <strong>+ CHF {chf(est.express)}</strong>
              </li>
            )}
            {!est.onRequest && est.discount > 0 && (
              <li>
                <span>{est.discountType === 'launch' ? t.summary.lines.launch : t.summary.lines.club}</span>
                <strong>− CHF {chf(est.discount)}</strong>
              </li>
            )}
            <li>
              <span>{t.configuration.timing}</span>
              <strong>{timingText(t, state)}</strong>
            </li>
          </ul>
          {!est.onRequest && est.bothDiscounts && <p className="konfig-field-hint">{t.discounts.higher}</p>}
          <ul className="konfig-notes">
            {t.summary.notes.map((note) => (
              <li key={note}>{fill(note, values)}</li>
            ))}
            <li>{shared.vatNote}</li>
          </ul>
        </div>
      </aside>
    </div>
  )
}
