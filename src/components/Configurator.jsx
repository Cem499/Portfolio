import { useEffect, useRef, useState } from 'react'
import { DEFAULTS, chf, estimate, features as featureList, siteTypes, tiersFor, timings } from '../data/pricing.js'
import usePendingSubmit, { valuesFromDom } from '../hooks/usePendingSubmit.js'
import AnimatedNumber from './AnimatedNumber.jsx'
import ContactForm from './ContactForm.jsx'

const STEPS = ['type', 'scope', 'features', 'timing', 'request']
const LAST_CHOICE = 4
const REQUEST = 5

const range = (item) => `CHF ${chf(item.price.min)} – ${chf(item.price.max)}`

function weeksText(t, min, max) {
  const n = min === max ? String(min) : `${min} – ${max}`
  return `${n} ${max === 1 ? t.summary.week : t.summary.weeks}`
}

// "+ CHF 600 – 1'500 · +1 Woche"
function addOnText(t, feature) {
  const price = `+ ${range(feature)}`
  if (!feature.weeks.max) return price
  const n = feature.weeks.min === feature.weeks.max ? String(feature.weeks.min) : `${feature.weeks.min}–${feature.weeks.max}`
  return `${price} · +${n} ${feature.weeks.max === 1 ? t.summary.week : t.summary.weeks}`
}

// Plain-text summary that travels with the enquiry (EmailJS field "configuration").
function configurationText(t, state, est) {
  const lines = [
    [t.configuration.type, t.siteTypes[state.siteType].name],
    [t.configuration.scope, t.pageTiers[state.pages].name],
    [t.configuration.features, state.features.map((id) => t.features[id].name).join(', ') || t.configuration.none],
    [t.configuration.timing, t.timings[state.timing].name],
    [t.configuration.price, est.onRequest ? `${t.summary.from} CHF ${chf(est.priceFrom)}, ${t.summary.onRequest}` : `${range(est)}${est.express ? ` (${t.summary.express})` : ''}`],
    [t.configuration.weeks, est.onRequest ? t.summary.weeksOnRequest : weeksText(t, est.weeks.min, est.weeks.max)],
  ]
  return lines.map(([label, value]) => `${label}: ${value}`).join('\n')
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

// Four choices (site type, scope, features, start date) with a live price range, then the
// contact form with the configuration attached. Step 1 is prerendered; choices made before
// React is ready stay (valuesFromDom) and a "Weiter" pressed early is picked up (usePendingSubmit).
export default function Configurator({ t, formTexts }) {
  // Choices made before hydration are read once, but applied only after React is in control:
  // rendering them during hydration would not match the prerendered HTML (summary texts),
  // and React would then rebuild the DOM and lose the form node a pending submit points to.
  const [fromDom] = useState(() => valuesFromDom('configurator', DEFAULTS))
  const [state, setState] = useState(DEFAULTS)
  const [step, setStep] = useState(1)
  const formRef = useRef(null)
  const stepRefs = useRef([])
  const moveFocusRef = useRef(false)

  useEffect(() => {
    setState(fromDom)
  }, [fromDom])

  usePendingSubmit(formRef)

  const est = estimate(state)
  const tiers = tiersFor(state.siteType)
  const configText = configurationText(t, state, est)

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
                price={type.onRequest ? `${t.summary.from} CHF ${chf(type.priceFrom)}` : range(type)}
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
                price={tier.onRequest || !tier.price.max ? '' : `+ ${range(tier)}${tier.weeks ? ` · +${tier.weeks} ${tier.weeks === 1 ? t.summary.week : t.summary.weeks}` : ''}`}
                note={t.pageTiers[tier.id].note}
              />
            ))}
          </div>
          {tiers.length === 1 && <p className="konfig-hint">{t.steps.scope.singleHint}</p>}
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
                price={addOnText(t, feature)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset ref={stepRef(3)} className="konfig-step" hidden={step !== 4} tabIndex={-1}>
          {legend(3, 'timing')}
          <div className="konfig-tiles">
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
          <ContactForm texts={formTexts} configuration={configText} />
          <button type="button" className="konfig-back" onClick={() => goTo(LAST_CHOICE)}>
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
                <span className="konfig-currency">CHF</span> <AnimatedNumber value={est.price.min} />
                <span className="konfig-dash">–</span>
                <AnimatedNumber value={est.price.max} />
              </span>
            )}
          </div>
          <p className="konfig-meta">
            {est.onRequest ? `${t.summary.onRequest} · ${t.summary.weeksOnRequest}` : weeksText(t, est.weeks.min, est.weeks.max)}
            {est.express && !est.onRequest ? ` · ${t.summary.express}` : ''}
          </p>
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
              <strong>{state.features.map((id) => t.features[id].name).join(', ') || t.configuration.none}</strong>
            </li>
            <li>
              <span>{t.configuration.timing}</span>
              <strong>{t.timings[state.timing].name}</strong>
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
