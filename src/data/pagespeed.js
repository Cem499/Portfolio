// Google PageSpeed Insights (v5) for the website check: request, error mapping and the
// selection of the three most useful tips. Pure functions apart from fetchPageSpeed().

const ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const API_KEY = import.meta.env.VITE_PSI_API_KEY
export const DEFAULT_TIMEOUT_MS = 60000

// Turns what a visitor typed into an absolute https URL, or null.
export function normalizeUrl(input) {
  let text = String(input || '').trim()
  if (!text) return null
  if (!/^https?:\/\//i.test(text)) text = `https://${text}`
  try {
    const url = new URL(text)
    if (!/^https?:$/.test(url.protocol)) return null
    if (!url.hostname.includes('.') || /\s/.test(url.hostname)) return null
    return url.href
  } catch {
    return null
  }
}

// Shown host for the result header, e.g. "www.example.ch".
export function displayHost(url) {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}

export class PageSpeedError extends Error {
  constructor(kind, message) {
    super(message || kind)
    this.kind = kind // 'unreachable' | 'rateLimit' | 'timeout' | 'generic'
  }
}

function errorKind(status, body) {
  const message = body?.error?.message || ''
  if (status === 429) return 'rateLimit'
  if (status === 400 && /DOCUMENT_REQUEST|NO_FCP|NOT_HTML|net::|DNS|ERRORED|FAILED/i.test(message)) return 'unreachable'
  if (status === 400 && /Lighthouse returned error/i.test(message)) return 'unreachable'
  if (status === 500 && /Lighthouse returned error/i.test(message)) return 'unreachable'
  return 'generic'
}

// Runs a mobile audit. `timeoutMs` can be lowered in tests via window.__psiTimeoutMs.
export async function fetchPageSpeed(url, { timeoutMs = DEFAULT_TIMEOUT_MS, signal } = {}) {
  const query = new URL(ENDPOINT)
  query.searchParams.set('url', url)
  query.searchParams.set('strategy', 'mobile')
  for (const category of ['performance', 'accessibility', 'best-practices', 'seo']) query.searchParams.append('category', category)
  if (API_KEY) query.searchParams.set('key', API_KEY)

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  signal?.addEventListener('abort', () => controller.abort())
  try {
    const response = await fetch(query, { signal: controller.signal })
    const body = await response.json().catch(() => null)
    if (!response.ok) throw new PageSpeedError(errorKind(response.status, body), body?.error?.message)
    return summarize(body)
  } catch (error) {
    if (error instanceof PageSpeedError) throw error
    if (error.name === 'AbortError') throw new PageSpeedError(signal?.aborted ? 'cancelled' : 'timeout')
    throw new PageSpeedError('generic', error.message)
  } finally {
    clearTimeout(timer)
  }
}

// Tip candidates in priority order: [audit id, tip id, test(audit) -> boolean].
const failing = (audit) => audit.score !== null && audit.score < 0.9
const savings = (audit, ms) => (audit.details?.overallSavingsMs || 0) >= ms
const TIP_RULES = [
  ['render-blocking-resources', 'render-blocking-resources', (a) => savings(a, 300)],
  ['largest-contentful-paint', 'largest-contentful-paint', (a) => a.numericValue > 2500],
  ['uses-responsive-images', 'uses-responsive-images', (a) => savings(a, 300) || (a.details?.overallSavingsBytes || 0) > 200000],
  ['server-response-time', 'server-response-time', (a) => a.numericValue > 600],
  ['total-blocking-time', 'total-blocking-time', (a) => a.numericValue > 300],
  ['cumulative-layout-shift', 'cumulative-layout-shift', (a) => a.numericValue > 0.1],
  ['unused-javascript', 'unused-javascript', (a) => savings(a, 500)],
  ['modern-image-formats', 'modern-image-formats', (a) => savings(a, 300)],
  ['uses-text-compression', 'uses-text-compression', (a) => savings(a, 200)],
  ['font-display', 'font-display', failing],
  ['unused-css-rules', 'unused-css-rules', (a) => savings(a, 500)],
  ['is-on-https', 'is-on-https', failing],
  ['viewport', 'viewport', failing],
  ['is-crawlable', 'is-crawlable', failing],
  ['document-title', 'document-title', failing],
  ['meta-description', 'meta-description', failing],
  ['image-alt', 'image-alt', failing],
  ['color-contrast', 'color-contrast', failing],
  ['link-text', 'link-text', failing],
  ['heading-order', 'heading-order', failing],
  ['target-size', 'target-size', failing],
  ['errors-in-console', 'errors-in-console', failing],
]

export function pickTips(audits, max = 3) {
  const tips = []
  for (const [auditId, tipId, test] of TIP_RULES) {
    const audit = audits[auditId]
    if (audit && test(audit)) tips.push(tipId)
    if (tips.length === max) break
  }
  return tips
}

export function summarize(body) {
  const lhr = body.lighthouseResult
  const score = (id) => Math.round((lhr.categories[id]?.score ?? 0) * 100)
  return {
    url: lhr.finalDisplayedUrl || lhr.finalUrl || lhr.requestedUrl,
    scores: {
      performance: score('performance'),
      accessibility: score('accessibility'),
      bestPractices: score('best-practices'),
      seo: score('seo'),
    },
    lcpMs: Math.round(lhr.audits['largest-contentful-paint']?.numericValue ?? 0),
    tips: pickTips(lhr.audits || {}),
  }
}
