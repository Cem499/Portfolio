import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import worker, { readFields } from '../../worker/src/index.js'

const ENV = {
  ALLOWED_ORIGINS: 'https://www.sin-digital.com, https://sin-digital.com',
  TURNSTILE_SECRET: 'secret',
  EMAILJS_SERVICE_ID: 'service',
  EMAILJS_TEMPLATE_ID: 'template',
  EMAILJS_PUBLIC_KEY: 'public',
  EMAILJS_PRIVATE_KEY: 'private',
}
const ORIGIN = 'https://www.sin-digital.com'
const VALID = { name: ' Fritz Muster ', email: 'fritz@example.ch', subject: '', message: 'Ich brauche eine Website.', configuration: '', token: 'ticket' }

const realFetch = globalThis.fetch
afterEach(() => {
  globalThis.fetch = realFetch
})

// Replaces fetch: Turnstile answers `turnstile`, EmailJS answers with `mailStatus`. Returns the calls.
function mockFetch({ turnstile = true, mailStatus = 200 } = {}) {
  const calls = []
  globalThis.fetch = async (url, init) => {
    calls.push({ url, body: init.body })
    if (url.includes('siteverify')) return new Response(JSON.stringify({ success: turnstile }), { status: 200 })
    return new Response('OK', { status: mailStatus })
  }
  return calls
}

const post = (body, origin = ORIGIN) =>
  worker.fetch(new Request('https://worker.example/', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: typeof body === 'string' ? body : JSON.stringify(body) }), ENV)

test('valid request: token is checked first, then the mail goes out with the private key', async () => {
  const calls = mockFetch()
  const response = await post(VALID)
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { ok: true })
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), ORIGIN)
  assert.equal(calls.length, 2)
  assert.match(calls[0].url, /siteverify/)
  assert.equal(calls[0].body.get('secret'), 'secret')
  assert.equal(calls[0].body.get('response'), 'ticket')
  const mail = JSON.parse(calls[1].body)
  assert.equal(mail.accessToken, 'private')
  assert.deepEqual(mail.template_params, { name: 'Fritz Muster', from_email: 'fritz@example.ch', email: 'fritz@example.ch', subject: 'Keine Angabe', message: 'Ich brauche eine Website.', configuration: '' })
})

test('invalid or missing token: 403, no mail', async () => {
  let calls = mockFetch({ turnstile: false })
  let response = await post(VALID)
  assert.equal(response.status, 403)
  assert.deepEqual(await response.json(), { ok: false, error: 'turnstile' })
  assert.equal(calls.length, 1)

  calls = mockFetch()
  response = await post({ ...VALID, token: '' })
  assert.equal(response.status, 403)
  assert.equal(calls.length, 0)
})

test('foreign origin: 403 before anything is checked or sent', async () => {
  const calls = mockFetch()
  const response = await post(VALID, 'https://evil.example')
  assert.equal(response.status, 403)
  assert.deepEqual(await response.json(), { ok: false, error: 'origin' })
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), null)
  assert.equal(calls.length, 0)
})

test('bad fields: 400, nothing is checked or sent', async () => {
  const calls = mockFetch()
  for (const body of [{ ...VALID, name: '' }, { ...VALID, email: 'no-at-sign' }, { ...VALID, message: 'kurz' }, { ...VALID, message: 'x'.repeat(5001) }, 'not json', 'x'.repeat(20001)]) {
    const response = await post(body)
    assert.equal(response.status, 400)
    assert.deepEqual(await response.json(), { ok: false, error: 'fields' })
  }
  assert.equal(calls.length, 0)
})

test('EmailJS rejects the mail: 502', async () => {
  mockFetch({ mailStatus: 403 })
  const response = await post(VALID)
  assert.equal(response.status, 502)
  assert.deepEqual(await response.json(), { ok: false, error: 'mail' })
})

test('preflight and other methods', async () => {
  const options = (origin) => worker.fetch(new Request('https://worker.example/', { method: 'OPTIONS', headers: { Origin: origin } }), ENV)
  const allowed = await options('https://sin-digital.com')
  assert.equal(allowed.status, 204)
  assert.equal(allowed.headers.get('Access-Control-Allow-Origin'), 'https://sin-digital.com')
  assert.equal((await options('https://evil.example')).status, 403)
  const get = await worker.fetch(new Request('https://worker.example/', { headers: { Origin: ORIGIN } }), ENV)
  assert.equal(get.status, 405)
})

test('readFields trims and keeps the optional fields', () => {
  assert.deepEqual(readFields({ ...VALID, subject: ' Offerte ', configuration: ' Firmenwebsite ' }), { name: 'Fritz Muster', email: 'fritz@example.ch', subject: 'Offerte', message: 'Ich brauche eine Website.', configuration: 'Firmenwebsite' })
  assert.equal(readFields(null), null)
  assert.equal(readFields({ ...VALID, name: 42 }), null)
})
