// Contact endpoint for the Sin Digital contact form (Cloudflare Worker).
// The browser posts the form fields plus the Turnstile token here. The token is checked
// with the secret key, and only then is the mail sent through EmailJS with the private key.
// Neither secret ever reaches the browser.
//
// Request:  POST application/json { name, email, subject, message, configuration, token }
// Response: { ok: true } or { ok: false, error: <code> }
//   400 fields      a required field is missing, too short or too long
//   403 origin      request from a page that is not in ALLOWED_ORIGINS
//   403 turnstile   token missing, invalid, expired or already used
//   502 mail        EmailJS did not accept the mail
//
// Variables (wrangler.toml): ALLOWED_ORIGINS, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
// EMAILJS_PUBLIC_KEY. Secrets (wrangler secret put): TURNSTILE_SECRET, EMAILJS_PRIVATE_KEY.

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const EMAILJS_URL = 'https://api.emailjs.com/api/v1.0/email/send'
const MAX_BODY_BYTES = 20000
const LIMITS = { name: 200, email: 320, subject: 300, message: 5000, configuration: 5000 }
const MIN_MESSAGE = 10
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const allowedOrigins = (env) => (env.ALLOWED_ORIGINS || '').split(',').map((origin) => origin.trim()).filter(Boolean)

function reply(status, body, origin) {
  const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', Vary: 'Origin' }
  if (origin) headers['Access-Control-Allow-Origin'] = origin
  return new Response(JSON.stringify(body), { status, headers })
}

const text = (value) => (typeof value === 'string' ? value.trim() : '')

// Returns the cleaned fields, or null when something is missing or out of bounds.
export function readFields(data) {
  if (!data || typeof data !== 'object') return null
  const fields = { name: text(data.name), email: text(data.email), subject: text(data.subject), message: text(data.message), configuration: text(data.configuration) }
  if (!fields.name || !fields.email || fields.message.length < MIN_MESSAGE) return null
  if (!EMAIL_PATTERN.test(fields.email)) return null
  if (Object.keys(LIMITS).some((key) => fields[key].length > LIMITS[key])) return null
  return fields
}

async function turnstileValid(token, ip, env) {
  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token })
  if (ip) body.set('remoteip', ip)
  const response = await fetch(SITEVERIFY_URL, { method: 'POST', body })
  if (!response.ok) return false
  const result = await response.json()
  return result.success === true
}

async function sendMail(fields, env) {
  const response = await fetch(EMAILJS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: env.EMAILJS_SERVICE_ID,
      template_id: env.EMAILJS_TEMPLATE_ID,
      user_id: env.EMAILJS_PUBLIC_KEY,
      accessToken: env.EMAILJS_PRIVATE_KEY,
      // Same template fields as the form used when it called EmailJS from the browser.
      template_params: {
        name: fields.name,
        from_email: fields.email,
        email: fields.email,
        subject: fields.subject || 'Keine Angabe',
        message: fields.message,
        configuration: fields.configuration,
      },
    }),
  })
  if (!response.ok) console.error('EmailJS', response.status, await response.text())
  return response.ok
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin')
    const allowed = origin && allowedOrigins(env).includes(origin) ? origin : null

    if (request.method === 'OPTIONS') {
      if (!allowed) return new Response(null, { status: 403 })
      return new Response(null, {
        status: 204,
        headers: { 'Access-Control-Allow-Origin': allowed, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400', Vary: 'Origin' },
      })
    }
    if (request.method !== 'POST') return reply(405, { ok: false, error: 'method' }, allowed)
    if (!allowed) return reply(403, { ok: false, error: 'origin' }, null)

    const raw = await request.text()
    if (raw.length > MAX_BODY_BYTES) return reply(400, { ok: false, error: 'fields' }, allowed)
    let data
    try {
      data = JSON.parse(raw)
    } catch {
      return reply(400, { ok: false, error: 'fields' }, allowed)
    }

    const fields = readFields(data)
    if (!fields) return reply(400, { ok: false, error: 'fields' }, allowed)

    const token = text(data.token)
    if (!token || !(await turnstileValid(token, request.headers.get('CF-Connecting-IP'), env))) {
      return reply(403, { ok: false, error: 'turnstile' }, allowed)
    }

    if (!(await sendMail(fields, env))) return reply(502, { ok: false, error: 'mail' }, allowed)
    return reply(200, { ok: true }, allowed)
  },
}
