// Measures the case-study sites: Lighthouse (mobile, median of 3) of every live site and
// 1440 × 900 screenshots of the live site ("after") and, where configured, of the previous
// site ("before", project.beforeUrl). Screenshots are encoded to WebP by Chromium itself
// (canvas), in 1440 and 720 px widths, into public/assets/projects/. Results land in
// src/data/measured.js.
//
//   node tools/measure-projects.mjs                 everything
//   node tools/measure-projects.mjs --only coiffeur  one project (slug substring)
//   --no-lighthouse / --no-shots                      skip a part
import fs from 'node:fs'
import path from 'node:path'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'
import { chromium } from 'playwright-core'
import { projects } from '../src/data/projects.js'
import { ROOT, chromiumPath, parseArgs, printTable } from './lib.mjs'

const { flags } = parseArgs()
const RUNS = 3
const OUT_IMAGES = path.join(ROOT, 'public', 'assets', 'projects')
const OUT_DATA = path.join(ROOT, 'src', 'data', 'measured.js')
const HIDE_CSS = '#wm-ipp-base, #wm-ipp-print, #donato { display: none !important }'

const selected = projects.filter((p) => !flags.only || p.slug.includes(flags.only))
fs.mkdirSync(OUT_IMAGES, { recursive: true })

// `hide`: extra selectors of the site to hide before the shot (cookie banners, chat bubbles).
async function screenshotWebp(browser, url, name, hide = []) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'de-CH' })
  const page = await context.newPage()
  await page.goto(url, { waitUntil: 'load', timeout: 90000 })
  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {})
  const hideCss = [HIDE_CSS, ...hide.map((selector) => `${selector} { display: none !important }`)].join('\n')
  await page.addStyleTag({ content: hideCss }).catch(() => {})
  await page.waitForTimeout(1500)
  const png = await page.screenshot({ type: 'png' })
  await context.close()

  // Encode with Chromium's own WebP encoder on a canvas, in two widths.
  const encoder = await browser.newPage()
  const dataUrl = `data:image/png;base64,${png.toString('base64')}`
  for (const width of [1440, 720]) {
    const webp = await encoder.evaluate(
      ([src, w]) =>
        new Promise((resolve) => {
          const img = new Image()
          img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = w
            canvas.height = Math.round((w * 900) / 1440)
            canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
            resolve(canvas.toDataURL('image/webp', 0.82).split(',')[1])
          }
          img.src = src
        }),
      [dataUrl, width],
    )
    const file = path.join(OUT_IMAGES, `${name}-${width}.webp`)
    fs.writeFileSync(file, Buffer.from(webp, 'base64'))
    console.log(`  ${path.relative(ROOT, file)} (${Math.round(fs.statSync(file).size / 1024)} KB)`)
  }
  await encoder.close()
}

async function measure(url, chrome) {
  const runs = []
  for (let i = 0; i < RUNS; i++) {
    const { lhr } = await lighthouse(url, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] })
    if (lhr.runtimeError) throw new Error(`${url}: ${lhr.runtimeError.message}`)
    runs.push({
      lighthouse: {
        performance: Math.round(lhr.categories.performance.score * 100),
        accessibility: Math.round(lhr.categories.accessibility.score * 100),
        bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
        seo: Math.round(lhr.categories.seo.score * 100),
      },
      lcpMs: Math.round(lhr.audits['largest-contentful-paint'].numericValue),
    })
  }
  runs.sort((a, b) => a.lighthouse.performance - b.lighthouse.performance || a.lcpMs - b.lcpMs)
  return runs[Math.floor(runs.length / 2)]
}

const existing = fs.existsSync(OUT_DATA) ? (await import(`file:///${OUT_DATA.replace(/\\/g, '/')}?t=${Date.now()}`)).measured : {}
const results = { ...existing }
const rows = []

if (!flags['no-shots']) {
  // Direct connection: a system proxy can break the TLS handshake with web.archive.org.
  const browser = await chromium.launch({ executablePath: chromiumPath(), args: ['--no-proxy-server'] })
  try {
    for (const project of selected) {
      console.log(`Screenshots ${project.slug}`)
      const shots = [[project.url, project.images.after]]
      if (project.beforeUrl && project.images.before) shots.push([project.beforeUrl, project.images.before])
      for (const [url, name] of shots) {
        // The Wayback Machine rate-limits; a failed shot must not stop the rest.
        try {
          await screenshotWebp(browser, url, name, project.hide)
        } catch (error) {
          console.log(`  FEHLER ${url}: ${error.message.split('\n')[0]}`)
        }
      }
    }
  } finally {
    await browser.close()
  }
}

if (!flags['no-lighthouse']) {
  const chrome = await chromeLauncher.launch({ chromePath: chromiumPath(), chromeFlags: ['--headless=new', '--no-first-run'] })
  try {
    for (const project of selected) {
      process.stdout.write(`Lighthouse ${project.url} `)
      const median = await measure(project.url, chrome)
      process.stdout.write(`${median.lighthouse.performance}\n`)
      results[project.slug] = { date: new Date().toISOString().slice(0, 10), ...median }
      rows.push([project.slug, median.lighthouse.performance, median.lighthouse.accessibility, median.lighthouse.bestPractices, median.lighthouse.seo, median.lcpMs])
    }
  } finally {
    await chrome.kill()
  }
  const header = `// Generated by tools/measure-projects.mjs. Lighthouse mobile (median of ${RUNS}) and LCP of the\n// live client sites, keyed by project slug. Re-run the tool instead of editing by hand.\n`
  fs.writeFileSync(OUT_DATA, `${header}export const measured = ${JSON.stringify(results, null, 2)}\n`)
  console.log('')
  printTable(['Projekt', 'Perf', 'A11y', 'BP', 'SEO', 'LCP ms'], rows)
  console.log(`\nGespeichert: ${path.relative(ROOT, OUT_DATA)}`)
}
