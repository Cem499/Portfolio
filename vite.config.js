import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { SITE, pages, staticRoutes } from './src/data/pages.js'
import { shared as deShared } from './src/i18n/de.js'
import { shared as enShared } from './src/i18n/en.js'

// Pages marked `js: false` in src/data/pages.js are prerendered and shipped as plain
// HTML + CSS (no React bundle, no hydration).
const STATIC_ROUTES = new Set(staticRoutes())

const HOME_ROUTES = new Set(['/', '/en/'])
const OUT_DIR = path.resolve('dist')

const langOf = (route) => (route.startsWith('/en/') ? 'en' : 'de')
const sharedTexts = { de: deShared, en: enShared }

// Runs before anything renders on "/": the old ?lang=en URL moves to /en/,
// ?lang=de is dropped because "/" is German anyway.
const LANG_REDIRECT = `<script>(function () { var p = new URLSearchParams(location.search), l = p.get('lang'); if (l === 'en') { location.replace('/en/' + location.hash); } else if (l === 'de') { p.delete('lang'); var q = p.toString(); history.replaceState(null, '', location.pathname + (q ? '?' + q : '') + location.hash); } })();</script>`

// Inline loader for the client bundle: waits for "load" and the first paint.
// Until React has taken over, a form submit must not fall back to a native GET request
// (it would put the form fields into the URL). Instead the submit is remembered, a short
// hint is shown (outside the React root) and React is loaded right away; the form then
// sends itself through usePendingSubmit (src/hooks/usePendingSubmit.js).
function hydrateAfterPaint(src, hint) {
  return `(function () {
  var started = false;
  function start() { if (started) return; started = true; var s = document.createElement('script'); s.type = 'module'; s.crossOrigin = ''; s.src = '${src}'; document.head.appendChild(s); }
  document.addEventListener('submit', function (e) {
    if (window.__VITE_REACT_SSG_CONTEXT__) return;
    e.preventDefault();
    if (window.__pendingSubmit) return;
    window.__pendingSubmit = e.target;
    var hint = document.createElement('div');
    hint.id = 'pending-submit-hint';
    hint.setAttribute('role', 'status');
    hint.textContent = ${JSON.stringify(hint)};
    hint.style.cssText = 'position:fixed;left:50%;bottom:1.5rem;transform:translateX(-50%);z-index:10000;max-width:calc(100% - 2rem);padding:1rem 1.25rem;border-radius:8px;font-size:0.9rem;background:#121212;color:#C1FF72;border:1px solid rgba(193,255,114,0.5);box-shadow:0 10px 26px rgba(0,0,0,0.4);';
    document.body.appendChild(hint);
    start();
  }, true);
  function afterPaint() {
    try { new PerformanceObserver(function (list, observer) { observer.disconnect(); setTimeout(start, 0); }).observe({ type: 'paint', buffered: true }); }
    catch (e) { setTimeout(start, 0); }
  }
  if (document.readyState === 'complete') afterPaint(); else addEventListener('load', afterPaint);
})();`
}

// Inline <style> of / and /en/: the original critical CSS plus the rules for the
// language links (kept inline so the home page still loads a single stylesheet).
function readInlineHomeCss() {
  const read = (file) => fs.readFileSync(path.resolve('src/styles', file), 'utf8')
  return `${read('critical.css')}\n${read('lang-switch.css')}`
}

function postProcess(route, html) {
  // Helmet tags are inserted right after <head>; move charset/viewport (and the
  // redirect) back to the very top like in the original pages.
  const top = []
  html = html.replace(/<meta charset="UTF-8">\s*/, (m) => {
    top.push(m.trim())
    return ''
  })
  html = html.replace(/<meta name="viewport"[^>]*>\s*/, (m) => {
    top.push(m.trim())
    return ''
  })
  if (route === '/') top.push(LANG_REDIRECT)
  html = html.replace('<head>', `<head>${top.join('')}`)

  // Stylesheets in the original cascade order: global.css (= styles.min.css) first, then
  // the page's own styles. Chunk order from Vite would put the page CSS first.
  // No crossorigin on same-origin CSS: Chrome would fetch it over a separate connection.
  const sheets = []
  html = html.replace(/<link rel="stylesheet"[^>]*>\s*/g, (m) => {
    sheets.push(m.trim().replace(' crossorigin=""', ''))
    return ''
  })
  sheets.sort((a, b) => Number(!a.includes('/global-')) - Number(!b.includes('/global-')))
  // The original home page preloaded its stylesheet right before the <link>.
  if (HOME_ROUTES.has(route) && sheets.length) {
    sheets.unshift(sheets[0].replace('rel="stylesheet"', 'rel="preload"').replace('>', ' as="style">'))
  }
  html = html.replace('</head>', `${sheets.join('')}</head>`)

  // Subpages: the page's own stylesheets are small, inline them so only the shared
  // global.css stays a render-blocking request.
  if (!HOME_ROUTES.has(route)) {
    html = html.replace(/<link rel="stylesheet" href="(\/static\/(?!global-)[^"]+\.css)">/g, (_, href) => `<style>${fs.readFileSync(path.join(OUT_DIR, href), 'utf8')}</style>`)
  }

  // Critical inline style of the home page, after the stylesheet links (same cascade order as before).
  if (HOME_ROUTES.has(route)) {
    html = html.replace('</head>', `<style>\n${readInlineHomeCss()}\n</style></head>`)
  }

  if (!STATIC_ROUTES.has(route)) {
    // The prerendered HTML is complete; the React bundle only adds interactivity (hydration).
    // Start it once the page has loaded and painted, so loading and hydrating React never
    // delays the first render (the original site also started its carousel on "load").
    const entry = html.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>\s*/)
    html = html
      .replace(entry[0], '')
      .replace(/<link rel="modulepreload"[^>]*>\s*/g, '')
      .replace('</head>', `<script>${hydrateAfterPaint(entry[1], sharedTexts[langOf(route)].pendingSubmitHint)}</script></head>`)
  }

  if (STATIC_ROUTES.has(route)) {
    html = html
      .replace(/<script type="module"[^>]*><\/script>\s*/g, '')
      .replace(/<link rel="modulepreload"[^>]*>\s*/g, '')
      .replace(/<script>window\.__staticRouterHydrationData[\s\S]*?<\/script>/, '')
      .replace(/\s*<script>\/\* SCRIPT_COMMENT_PLACEHOLDER \*\/<\/script>/, '')
      .replace(/ data-rh="true"/g, '')
    // Unwrap the React root container, the original body had no wrapper.
    const open = html.match(/<div id="root"[^>]*>/)
    const close = html.lastIndexOf('</div>', html.indexOf('</body>'))
    html = html.slice(0, open.index) + html.slice(open.index + open[0].length, close) + html.slice(close + '</div>'.length)
  }
  return html
}

// sitemap.xml from src/data/pages.js: pages with an English version get a DE and an EN
// entry that both list the same alternates; German-only pages point to themselves;
// noindex pages carry no alternates.
function sitemapXml() {
  const entry = (loc, page, alternates) => [
    '  <url>',
    `    <loc>${SITE}${loc}</loc>`,
    ...alternates.map(([hreflang, href]) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${SITE}${href}"/>`),
    `    <lastmod>${page.lastmod}</lastmod>`,
    `    <changefreq>${page.changefreq}</changefreq>`,
    `    <priority>${page.priority}</priority>`,
    '  </url>',
  ].join('\n')

  const entries = []
  for (const page of pages) {
    if (page.sitemap === false) continue
    let alternates = []
    if (page.en) alternates = [['de-CH', page.de], ['en', page.en], ['x-default', page.de]]
    else if (!page.noindex) alternates = [['de-CH', page.de], ['x-default', page.de]]
    entries.push(entry(page.de, page, alternates))
    if (page.en) entries.push(entry(page.en, page, alternates))
  }
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="sitemap-style.xsl"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n')
}

function finish(outDir) {
  const out = path.resolve(outDir)
  fs.writeFileSync(path.join(out, 'sitemap.xml'), sitemapXml())
  // Routes ending in .html come out as foo.html.html in "flat" mode.
  for (const file of fs.readdirSync(out)) {
    if (file.endsWith('.html.html')) fs.renameSync(path.join(out, file), path.join(out, file.slice(0, -5)))
  }
  // No route uses loaders; drop the generated loader data and build manifests.
  for (const file of fs.readdirSync(out)) {
    if (file.startsWith('static-loader-data')) fs.rmSync(path.join(out, file), { recursive: true, force: true })
  }
  fs.rmSync(path.join(out, '.vite'), { recursive: true, force: true })
}

export default defineConfig({
  plugins: [react()],
  build: {
    // public/assets holds the original images, keep Vite's hashed files apart.
    assetsDir: 'static',
    // Ship the CSS exactly as written: global.css already is the original styles.min.css,
    // and re-minifying it rewrites some declarations.
    cssMinify: false,
  },
  ssgOptions: {
    dirStyle: 'flat',
    beastiesOptions: false,
    onPageRendered: postProcess,
    onFinished: finish,
  },
})
