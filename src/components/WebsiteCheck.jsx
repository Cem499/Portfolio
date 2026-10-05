import { useEffect, useRef, useState } from 'react'
import { DEFAULT_TIMEOUT_MS, displayHost, fetchPageSpeed, normalizeUrl } from '../data/pagespeed.js'
import usePendingSubmit, { valuesFromDom } from '../hooks/usePendingSubmit.js'
import ScoreRing from './ScoreRing.jsx'

const SCORE_IDS = ['performance', 'accessibility', 'bestPractices', 'seo']
// Seconds at which the progress text moves to the next phase.
const PHASE_AT = [0, 3, 15, 40]

const phaseIndex = (seconds) => PHASE_AT.filter((at) => seconds >= at).length - 1
// Eases towards 95 % while Google works; the bar completes when the result arrives.
const progressPercent = (seconds) => Math.min(95, Math.round(100 * (1 - Math.exp(-seconds / 18))))

// URL in, four scores and three tips out. The form is prerendered; a submit before
// hydration is picked up by usePendingSubmit, the typed URL comes from the DOM.
export default function WebsiteCheck({ t, contactHref, configuratorHref }) {
  const [values, setValues] = useState(() => valuesFromDom('website-check', { url: '' }))
  const [status, setStatus] = useState({ state: 'idle' })
  const [elapsed, setElapsed] = useState(0)
  const formRef = useRef(null)
  const abortRef = useRef(null)
  const panelRef = useRef(null)

  usePendingSubmit(formRef)

  const loading = status.state === 'loading'

  useEffect(() => {
    if (!loading) return undefined
    const started = Date.now()
    setElapsed(0)
    const timer = setInterval(() => setElapsed(Math.round((Date.now() - started) / 1000)), 1000)
    return () => clearInterval(timer)
  }, [loading])

  // Bring the result or error into view and hand it the focus.
  useEffect(() => {
    if (status.state !== 'done' && status.state !== 'error') return
    const el = panelRef.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    el.focus({ preventScroll: true })
  }, [status.state])

  useEffect(() => () => abortRef.current?.abort(), [])

  async function onSubmit(e) {
    e.preventDefault()
    const url = normalizeUrl(values.url)
    if (!url) {
      setStatus({ state: 'invalid' })
      return
    }
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setStatus({ state: 'loading', url })
    try {
      const result = await fetchPageSpeed(url, { timeoutMs: window.__psiTimeoutMs || DEFAULT_TIMEOUT_MS, signal: controller.signal })
      setStatus({ state: 'done', url, result })
    } catch (error) {
      if (error.kind === 'cancelled') return
      setStatus({ state: 'error', url, kind: error.kind || 'generic' })
    }
  }

  function reset() {
    abortRef.current?.abort()
    setStatus({ state: 'idle' })
    setValues({ url: '' })
    document.getElementById('wc-url')?.focus()
  }

  const result = status.result
  const tips = result?.tips || []

  return (
    <div className="wc">
      <form ref={formRef} id="website-check" className="wc-form" onSubmit={onSubmit} noValidate aria-label={t.label}>
        <label htmlFor="wc-url" className="wc-label">{t.form.label}</label>
        <div className="wc-field">
          <span className="wc-input">
            <span className="wc-prompt" aria-hidden="true">›</span>
            <input
              id="wc-url"
              name="url"
              type="url"
              inputMode="url"
              autoComplete="url"
              spellCheck="false"
              placeholder={t.form.placeholder}
              value={values.url}
              onChange={(e) => setValues({ url: e.target.value })}
              aria-invalid={status.state === 'invalid' ? 'true' : undefined}
              aria-describedby={status.state === 'invalid' ? 'wc-url-error' : undefined}
              disabled={loading}
            />
          </span>
          <button type="submit" className="btn-primary wc-submit" disabled={loading}>
            {loading ? t.form.checking : t.form.submit}
          </button>
        </div>
        {status.state === 'invalid' && (
          <p id="wc-url-error" className="wc-invalid" role="alert">
            {t.form.invalid}
          </p>
        )}
      </form>

      {loading && (
        <div className="wc-progress" role="status">
          <div className="wc-progress-head">
            <span className="wc-progress-title">{t.progress.title}</span>
            <span className="wc-progress-time">
              {elapsed} {t.progress.seconds}
            </span>
          </div>
          <div className="wc-bar" aria-hidden="true">
            <div className="wc-bar-fill" style={{ width: `${progressPercent(elapsed)}%` }}></div>
          </div>
          <p className="wc-phase" aria-live="polite">{t.progress.phases[phaseIndex(elapsed)]}</p>
          <p className="wc-hint">{t.progress.hint}</p>
        </div>
      )}

      {status.state === 'error' && (
        <div ref={panelRef} className="wc-error" role="alert" tabIndex={-1}>
          <p>{t.errors[status.kind] || t.errors.generic}</p>
          <button type="button" className="wc-again" onClick={() => setStatus({ state: 'idle' })}>
            {t.errors.retry}
          </button>
        </div>
      )}

      {status.state === 'done' && (
        <section ref={panelRef} className="wc-result" tabIndex={-1} aria-labelledby="wc-result-title">
          <span className="label">{t.result.title}</span>
          <h2 id="wc-result-title" className="wc-result-host">{displayHost(result.url)}</h2>
          <div className="wc-rings">
            {SCORE_IDS.map((id) => (
              <ScoreRing key={id} score={result.scores[id]} label={t.result.scores[id]} />
            ))}
          </div>
          <p className="wc-measured">{t.result.measured}</p>

          <h3 className="wc-tips-title">{t.result.tipsTitle}</h3>
          {tips.length ? (
            <ol className="wc-tips">
              {tips.map((id) => (
                <li key={id}>
                  <strong>{t.tips[id].title}</strong>
                  <span>{t.tips[id].text}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="wc-allgood">{t.result.allGood}</p>
          )}

          <div className="wc-cta">
            <h3 className="wc-cta-title">{t.result.cta.title}</h3>
            <p>{t.result.cta.text}</p>
            <div className="wc-cta-actions">
              <a className="btn-primary" href={contactHref}>{t.result.cta.button}</a>
              <a className="wc-link" href={configuratorHref}>{t.result.cta.secondary}</a>
            </div>
          </div>

          <button type="button" className="wc-again" onClick={reset}>
            {t.result.again}
          </button>
        </section>
      )}
    </div>
  )
}
