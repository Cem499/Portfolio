// Shared helpers for the test tooling: a static server that behaves like Render,
// the pages to test, the Chromium that playwright-core installed, small utilities.
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import { allUrls } from '../src/data/pages.js'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const DIST = path.join(ROOT, 'dist')
export const WIDTHS = [375, 768, 1440]

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.xsl': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

export function requireDist() {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('dist/ fehlt oder ist unvollständig. Zuerst `npm run build` ausführen.')
    process.exit(1)
  }
}

// Serves a folder like Render's static hosting: exact paths, directory index,
// unknown paths get 404.html with status 404, text responses are gzipped.
export function createStaticServer(root) {
  return http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost')
    let file = path.join(root, decodeURIComponent(url.pathname))
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403).end()
      return
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
    let status = 200
    if (!fs.existsSync(file)) {
      status = 404
      file = path.join(root, '404.html')
    }
    const type = TYPES[path.extname(file)] || 'application/octet-stream'
    const gzip = /text|javascript|json|xml/.test(type) && /gzip/.test(req.headers['accept-encoding'] || '')
    res.writeHead(status, {
      'content-type': type,
      'cache-control': 'no-store',
      ...(gzip ? { 'content-encoding': 'gzip' } : {}),
    })
    const stream = fs.createReadStream(file)
    ;(gzip ? stream.pipe(zlib.createGzip()) : stream).pipe(res)
  })
}

export function listen(server, port = 0) {
  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      resolve({
        port: server.address().port,
        close: () => new Promise((done) => server.close(done)),
      })
    })
  })
}

export async function serveDist() {
  requireDist()
  const { port, close } = await listen(createStaticServer(DIST))
  return { base: `http://127.0.0.1:${port}`, close }
}

export function chromiumPath() {
  const file = chromium.executablePath()
  if (!fs.existsSync(file)) {
    console.error('Chromium fehlt. Einmalig `npm run test:setup` ausführen.')
    process.exit(1)
  }
  return file
}

// --flag value / --flag, plus positional arguments.
export function parseArgs(argv = process.argv.slice(2)) {
  const flags = {}
  const rest = []
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg.startsWith('--')) {
      const next = argv[i + 1]
      if (next !== undefined && !next.startsWith('--')) {
        flags[arg.slice(2)] = next
        i++
      } else flags[arg.slice(2)] = true
    } else rest.push(arg)
  }
  return { flags, rest }
}

// Pages to test, optionally filtered by --only <substring of id or path>.
export function pagesToTest(only) {
  const urls = allUrls()
  if (!only) return urls
  return urls.filter((u) => u.id.includes(only) || u.path.includes(only))
}

export function label(url) {
  return `${url.id}-${url.lang}`
}

export function printTable(headers, rows) {
  const widths = headers.map((h, i) => Math.max(String(h).length, ...rows.map((r) => String(r[i] ?? '').length)))
  const line = (cells) => cells.map((c, i) => String(c ?? '').padEnd(widths[i])).join('  ')
  console.log(line(headers))
  console.log(widths.map((w) => '-'.repeat(w)).join('  '))
  for (const row of rows) console.log(line(row))
}

// Cloudflare Turnstile stand-in for tests: optional token handed out after `delayMs`.
export function turnstileStub({ token = '', delayMs = 0 } = {}) {
  return `window.turnstile = {
  _t: '',
  render: function (el, o) {
    ${token ? `setTimeout(function () { window.turnstile._t = ${JSON.stringify(token)}; if (o && o.callback) o.callback(window.turnstile._t) }, ${delayMs});` : ''}
    return 'w'
  },
  getResponse: function () { return window.turnstile._t },
  reset: function () { window.turnstile._t = ''; window.__turnstileResets = (window.__turnstileResets || 0) + 1 },
  remove: function () {}
}`
}

export async function stubThirdParty(context, turnstile = {}) {
  await context.route(/challenges\.cloudflare\.com/, (route) => route.fulfill({ contentType: 'text/javascript', body: turnstileStub(turnstile) }))
}

// Scrolls through the page so reveal animations have fired, then freezes all
// animations and transitions so screenshots are deterministic.
export async function settlePage(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 250) {
    await page.evaluate((top) => window.scrollTo(0, top), y)
    await page.waitForTimeout(40)
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await page.waitForTimeout(400)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.waitForTimeout(800)
  await page.addStyleTag({
    content: '*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;animation-iteration-count:1!important;transition-duration:0s!important;transition-delay:0s!important;caret-color:transparent!important}',
  })
  await page.waitForTimeout(300)
}
