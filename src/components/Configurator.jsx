import { useEffect, useMemo, useRef, useState } from 'react'
import { DEFAULTS, LANGUAGE_COUNTS, chf, estimate, features as featureList, siteTypes, tiersFor, timings } from '../data/pricing.js'
import usePendingSubmit, { valuesFromDom } from '../hooks/usePendingSubmit.js'
import AnimatedNumber from './AnimatedNumber.jsx'
import ContactForm from './ContactForm.jsx'

const STEPS = ['type', 'scope', 'features', 'timing', 'request']
const LAST_CHOICE = 4
const REQUEST = 5

// "ab CHF 2'490"
const fromText = (t, item) => `${t.summary.from} CHF ${chf(item.priceFrom)}`

function weeksText(t, min, max) {
  const n = min === max ? String(min) : `${min} – ${max}`
  return `${n} ${max === 1 ? t.summary.week : t.summary.weeks}`
}

// "3 – 5 Wochen", or "Zeitrahmen nach Gespräch" without weeks.
const durationText = (t, weeks) => (weeks ? weeksText(t, weeks.min, weeks.max) : t.summary.weeksOnRequest)

// "+1 Woche pro Sprache", "+2–3 Wochen"; empty when nothing is added.
function addedWeeksText(t, weeks, perLanguage = false) {
  const { min, max } = typeof weeks === 'number' ? { min: weeks, max: weeks } : weeks
  if (!max) return ''
  const n = min === max ? String(min) : `${min}–${max}`
  return `+${n} ${max === 1 ? t.summary.week : t.summary.weeks}${perLanguage ? ` ${t.summary.perLanguage}` : ''}`
}

// "Mehrsprachig (2 zusätzliche Sprachen), Shop"
function featuresText(t, state) {
  const names = state.features.map((id) => {
    if (id !== 'multilingual') return t.features[id].name
    const n = Number(state.languages) || 1
    return `${t.features[id].name} (${n} ${n === 1 ? t.languages.one : t.languages.many})`
  })
  return names.join(', ') || t.configuration.none
}

// "So schnell wie möglich", or for an individual date "15. Januar 2027" ("Datum offen" while
// empty). The date is parsed as a local date (no time zone shift).
function timingText(t, state) {
  if (state.timing !== 'date') return (t.timings[state.timing] || t.timings[DEFAULTS.timing]).name
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(state.start || '')
  if (!match) return t.configuration.startOpen
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  return new Intl.DateTimeFormat(t.dateLocale, { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

// Plain-text summary that travels with the enquiry (EmailJS field "configuration").
function configurationText(t, state, est) {
  const lines = [
    [t.configuration.type, t.siteTypes[state.siteType].name],
    [t.configuration.scope, t.pageTiers[state.pages].name],
    [t.configuration.features, featuresText(t, state)],
    [t.configuration.timing, timingText(t, state)],
    [t.configuration.price, fromText(t, est)],
    [t.configuration.weeks, durationText(t, est.weeks)],
  ]
  return lines.map(([label, value]) => `${label}: ${value}`).join('\n')
}

// "Mehr als eine Seite? Dann passt die {business}." with the site type name as a button.
function hintWithLink(text, label, onClick) {
  const [before, after] = text.split('{business}')
  if (after === undefined) return text
  return (
    <>
      {before}
      <button type="button" className="konfig-link" onClick={onClick}>
        {label}
      </button>
      {after}
    </>
  )
}

function Tile({ type, name, value, checked, onChange, title, desc, price, note }) {
  return (
    <label className={checked ? 'konfig-tile is-selected' : 'konfig-tile'}>
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} />
      <span className="konfig-tile-name">{title}</span>
      {desc && <span className="konfig-tile-desc">{desc}</span>}
      {(price || note) && (
        <span className="konfig-tile-price">
          {price}
          {price && note ? ' · ' : ''}
          {note}
        </span>
      )}
    </label>
  )
}

// Four choices (site type, scope, features, desired start) with the entry price of the site
// type and a live time frame, then the contact form with the configuration attached; the
// fixed price comes with the offer. Step 1 is prerendered; choices made before
// React is ready stay (valuesFromDom) and a "Weiter" pressed early is picked up (usePendingSubmit).
export default function Configurator({ t, formTexts }) {
  // Choices made before hydration are read once, but applied only after React is in control:
  // rendering them during hydration would not match the prerendered HTML (summary texts),
  // and React would then rebuild the DOM and lose the form node a pending submit points to.
  const [fromDom] = useState(() => valuesFromDom('configurator', DEFAULTS))
  const [state, setState] = useState(DEFAULTS)
  const [step, setStep] = useState(1)
  // Earliest selectable date for "individual start"; set after hydration (stable prerender).
  const [today, setToday] = useState('')
  const formRef = useRef(null)
  const stepRefs = useRef([])
  const moveFocusRef = useRef(false)

  useEffect(() => {
    setState(fromDom)
  }, [fromDom])

  useEffect(() => {
    const now = new Date()
    const pad = (n) => String(n).padStart(2, '0')
    setToday(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`)
  }, [])

  usePendingSubmit(formRef)

  const est = estimate(state)
  const tiers = tiersFor(state.siteType)
  const configText = configurationText(t, state, est)
  const requestFormTexts = useMemo(() => ({ ...formTexts, submit: t.request.submit }), [formTexts, t])

  function selectType(id) {
    setState((s) => {
      const available = tiersFor(id)
      return { ...s, siteType: id, pages: available.some((tier) => tier.id === s.pages) ? s.pages : available[0].id }
    })
  }

  function toggleFeature(id) {
    setState((s) => ({ ...s, features: s.features.includes(id) ? s.features.filter((f) => f !== id) : [...s.features, id] }))
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
    if (step <= LAST_CHOICE) goTo(step + 1)
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
          {legend(0, 'type')}
          <div className="konfig-tiles" data-count={siteTypes.length}>
            {siteTypes.map((type) => (
              <Tile
                key={type.id}
                type="radio"
                name="siteType"
                value={type.id}
                checked={state.siteType === type.id}
                onChange={() => selectType(type.id)}
                title={t.siteTypes[type.id].name}
                desc={t.siteTypes[type.id].desc}
                price={fromText(t, type)}
                note={durationText(t, type.weeks)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset ref={stepRef(1)} className="konfig-step" hidden={step !== 2} tabIndex={-1}>
          {legend(1, 'scope')}
          <div className="konfig-tiles" data-count={tiers.length}>
            {tiers.map((tier) => (
              <Tile
                key={tier.id}
                type="radio"
                name="pages"
                value={tier.id}
                checked={state.pages === tier.id}
                onChange={() => setState((s) => ({ ...s, pages: tier.id }))}
                title={t.pageTiers[tier.id].name}
                note={tier.onRequest ? t.summary.weeksOnRequest : addedWeeksText(t, tier.weeks)}
              />
            ))}
          </div>
          {tiers.length === 1 && (
            <p className="konfig-hint">
              {hintWithLink(t.steps.scope.singleHint, t.siteTypes.business.name, () => {
                selectType('business')
                goTo(1)
              })}
            </p>
          )}
        </fieldset>

        <fieldset ref={stepRef(2)} className="konfig-step" hidden={step !== 3} tabIndex={-1}>
          {legend(2, 'features')}
          <p className="konfig-hint">{t.steps.features.hint}</p>
          <div className="konfig-tiles">
            {featureList.map((feature) => (
              <Tile
                key={feature.id}
                type="checkbox"
                name="features"
                value={feature.id}
                checked={state.features.includes(feature.id)}
                onChange={() => toggleFeature(feature.id)}
                title={t.features[feature.id].name}
                desc={t.features[feature.id].desc}
                note={addedWeeksText(t, feature.weeks, feature.perLanguage)}
              />
            ))}
          </div>
          {state.features.includes('multilingual') && (
            <div className="konfig-field">
              <label htmlFor="konfig-languages">{t.languages.label}</label>
              <select
                id="konfig-languages"
                name="languages"
                value={state.languages}
                onChange={(e) => setState((s) => ({ ...s, languages: e.target.value }))}
              >
                {LANGUAGE_COUNTS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <span className="konfig-field-hint">{t.languages.hint}</span>
            </div>
          )}
        </fieldset>

        <fieldset ref={stepRef(3)} className="konfig-step" hidden={step !== 4} tabIndex={-1}>
          {legend(3, 'timing')}
          <p className="konfig-hint">{t.steps.timing.hint}</p>
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
                min={today || undefined}
                aria-describedby="konfig-start-hint"
                onChange={(e) => setState((s) => ({ ...s, start: e.target.value }))}
              />
              <span id="konfig-start-hint" className="konfig-field-hint">
                {t.start.hint}
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
              {step === LAST_CHOICE ? t.toRequest : t.next}
            </button>
          </div>
        )}
      </form>

      {step === REQUEST && (
        <section ref={stepRef(4)} className="konfig-request" tabIndex={-1} aria-labelledby="konfig-request-title">
          <span className="konfig-step-label">
            {t.stepWord} {REQUEST} {t.ofWord} {STEPS.length} · {t.steps.request.title}
          </span>
          <h2 id="konfig-request-title" className="konfig-question">
            {t.request.title}
          </h2>
          <p className="konfig-hint">{t.request.text}</p>
          <pre className="konfig-config" aria-label={t.summary.selection}>
            {configText}
          </pre>
          <ContactForm texts={requestFormTexts} configuration={configText} />
          <button type="button" className="konfig-back" onClick={() => goTo(LAST_CHOICE)}>
            {t.back}
          </button>
        </section>
      )}

      <aside className="konfig-summary" aria-label={t.summary.title}>
        <div className="konfig-summary-main" aria-live="polite" aria-atomic="true">
          <div className="konfig-price">
            <span className="konfig-from">{t.summary.fromStart}</span>{' '}
            <span className="konfig-amount">
              <span className="konfig-currency">CHF</span> <AnimatedNumber value={est.priceFrom} />
            </span>
          </div>
          <p className="konfig-offer">{t.summary.offer}</p>
          <p className="konfig-meta">{est.weeks ? `${t.summary.duration} ${weeksText(t, est.weeks.min, est.weeks.max)}` : t.summary.weeksOnRequest}</p>
        </div>
        <div className="konfig-summary-details">
          <span className="konfig-details-title">{t.summary.selection}</span>
          <ul className="konfig-selection">
            <li>
              <span>{t.configuration.type}</span>
              <strong>{t.siteTypes[state.siteType].name}</strong>
            </li>
            <li>
              <span>{t.configuration.scope}</span>
              <strong>{t.pageTiers[state.pages].name}</strong>
            </li>
            <li>
              <span>{t.configuration.features}</span>
              <strong>{featuresText(t, state)}</strong>
            </li>
            <li>
              <span>{t.configuration.timing}</span>
              <strong>{timingText(t, state)}</strong>
            </li>
          </ul>
          <ul className="konfig-notes">
            {t.summary.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
