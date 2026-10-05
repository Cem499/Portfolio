// Lighthouse (mobile, simulated throttling) for every page of the build, median of
// several runs, compared with tools/baseline.json.
//
//   node tools/lighthouse.mjs                 compare with the baseline, exit 1 on regression
//   node tools/lighthouse.mjs --update-baseline   write tools/baseline.json
//   --runs 3        runs per page (median by performance score)
//   --only home     only pages whose id or path contains the text
//
// Rules: an existing page must not lose a point in any category; a page without
// baseline needs performance >= 95. Full reports land in tools/reports/.
import fs from 'node:fs'
import path from 'node:path'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'
import { ROOT, chromiumPath, label, pagesToTest, parseArgs, printTable, serveDist } from './lib.mjs'

const { flags } = parseArgs()
const RUNS = Number(flags.runs || 3)
const BASELINE_FILE = path.join(ROOT, 'tools', 'baseline.json')
const REPORTS_DIR = path.join(ROOT, 'tools', 'reports')
const MIN_NEW_PERFORMANCE = 95

const CATEGORIES = { performance: 'Perf', accessibility: 'A11y', 'best-practices': 'BP', seo: 'SEO' }
const METRICS = {
  fcp: 'first-contentful-paint',
  lcp: 'largest-contentful-paint',
  tbt: 'total-blocking-time',
  cls: 'cumulative-layout-shift',
  si: 'speed-index',
}

function summarize(result) {
  const scores = {}
  for (const id of Object.keys(CATEGORIES)) scores[id] = Math.round(result.categories[id].score * 100)
  const metrics = {}
  for (const [key, audit] of Object.entries(METRICS)) {
    const value = result.audits[audit].numericValue
    metrics[key] = key === 'cls' ? Number(value.toFixed(3)) : Math.round(value)
  }
  return { scores, metrics }
}

async function measure(url, chrome) {
  const runs = []
  for (let i = 0; i < RUNS; i++) {
    const { lhr } = await lighthouse(url, {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
      onlyCategories: Object.keys(CATEGORIES),
    })
    if (lhr.runtimeError) throw new Error(`${url}: ${lhr.runtimeError.message}`)
    runs.push({ lhr, ...summarize(lhr) })
  }
  runs.sort((a, b) => a.scores.performance - b.scores.performance || a.metrics.lcp - b.metrics.lcp)
  return { median: runs[Math.floor(runs.length / 2)], all: runs }
}

const baseline = fs.existsSync(BASELINE_FILE) ? JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8')) : { pages: {} }
const pages = pagesToTest(flags.only)
const { base, close } = await serveDist()
const chrome = await chromeLauncher.launch({ chromePath: chromiumPath(), chromeFlags: ['--headless=new', '--no-first-run'] })
fs.mkdirSync(REPORTS_DIR, { recursive: true })

const rows = []
const results = {}
let regressions = 0

try {
  for (const page of pages) {
    process.stdout.write(`${page.path} `)
    const { median, all } = await measure(base + page.path, chrome)
    process.stdout.write(`(${all.map((r) => r.scores.performance).join('/')})\n`)
    fs.writeFileSync(path.join(REPORTS_DIR, `${label(page)}.json`), JSON.stringify(median.lhr))
    results[page.path] = { scores: median.scores, metrics: median.metrics }

    const before = baseline.pages[page.path]
    const notes = []
    for (const [id, short] of Object.entries(CATEGORIES)) {
      const now = median.scores[id]
      if (before) {
        const delta = now - before.scores[id]
        if (delta < 0) {
          notes.push(`${short} ${delta}`)
          regressions++
        } else if (delta > 0) notes.push(`${short} +${delta}`)
      } else if (id === 'performance' && now < MIN_NEW_PERFORMANCE) {
        notes.push(`Perf < ${MIN_NEW_PERFORMANCE}`)
        regressions++
      }
    }
    const m = median.metrics
    rows.push([
      page.path,
      median.scores.performance,
      median.scores.accessibility,
      median.scores['best-practices'],
      median.scores.seo,
      m.fcp,
      m.lcp,
      m.tbt,
      m.cls,
      m.si,
      before ? notes.join(', ') || 'gleich' : 'neu' + (notes.length ? ', ' + notes.join(', ') : ''),
    ])
  }
} finally {
  await chrome.kill()
  await close()
}

console.log('')
printTable(['Seite', 'Perf', 'A11y', 'BP', 'SEO', 'FCP', 'LCP', 'TBT', 'CLS', 'SI', 'vs. Basis'], rows)

if (flags['update-baseline']) {
  const next = {
    note: 'Lighthouse mobile, median of several runs on the local Render-like server. Only comparable on the same machine.',
    measured: new Date().toISOString().slice(0, 10),
    runs: RUNS,
    pages: { ...baseline.pages, ...results },
  }
  fs.writeFileSync(BASELINE_FILE, JSON.stringify(next, null, 2) + '\n')
  console.log(`\nBasis gespeichert: tools/baseline.json (${Object.keys(next.pages).length} Seiten)`)
} else if (regressions) {
  console.log(`\n${regressions} Verschlechterung(en) gegenüber der Basis.`)
  process.exit(1)
} else {
  console.log('\nKeine Verschlechterung gegenüber der Basis.')
}
