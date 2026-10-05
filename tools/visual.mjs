// Full-page screenshots of every page at 375, 768 and 1440 px, optionally compared
// pixel by pixel with an earlier set.
//
//   node tools/visual.mjs --label baseline          screenshots into tools/screenshots/baseline/
//   node tools/visual.mjs --compare baseline        screenshots into tools/screenshots/current/, diff against baseline
//   --only home     only pages whose id or path contains the text
//
// Diff images land in tools/screenshots/diff-<label>-vs-<compare>/.
import fs from 'node:fs'
import path from 'node:path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import { chromium } from 'playwright-core'
import { ROOT, WIDTHS, chromiumPath, label, pagesToTest, parseArgs, printTable, serveDist, settlePage, stubThirdParty } from './lib.mjs'

const { flags } = parseArgs()
const SHOTS = path.join(ROOT, 'tools', 'screenshots')
const current = flags.label || 'current'
const compare = flags.compare
const outDir = path.join(SHOTS, current)
const diffDir = compare ? path.join(SHOTS, `diff-${current}-vs-${compare}`) : null
fs.mkdirSync(outDir, { recursive: true })
if (diffDir) fs.mkdirSync(diffDir, { recursive: true })

function diffImages(fileA, fileB, out) {
  const a = PNG.sync.read(fs.readFileSync(fileA))
  const b = PNG.sync.read(fs.readFileSync(fileB))
  const width = Math.min(a.width, b.width)
  const height = Math.min(a.height, b.height)
  const crop = (img) => {
    const c = new PNG({ width, height })
    PNG.bitblt(img, c, 0, 0, width, height, 0, 0)
    return c
  }
  const diff = new PNG({ width, height })
  const pixels = pixelmatch(crop(a).data, crop(b).data, diff.data, width, height, { threshold: 0.1 })
  if (pixels || a.height !== b.height) fs.writeFileSync(out, PNG.sync.write(diff))
  else if (fs.existsSync(out)) fs.unlinkSync(out)
  return { pixels, heightBefore: b.height, heightAfter: a.height }
}

const pages = pagesToTest(flags.only)
const { base, close } = await serveDist()
const browser = await chromium.launch({ executablePath: chromiumPath() })
const rows = []

try {
  for (const page of pages) {
    for (const width of WIDTHS) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
      await stubThirdParty(context)
      const tab = await context.newPage()
      await tab.goto(base + page.path, { waitUntil: 'load' })
      await settlePage(tab)
      const file = path.join(outDir, `${label(page)}-${width}.png`)
      await tab.screenshot({ path: file, fullPage: true })
      await context.close()

      if (compare) {
        const other = path.join(SHOTS, compare, path.basename(file))
        if (!fs.existsSync(other)) {
          rows.push([page.path, width, 'neu', '', ''])
          continue
        }
        const r = diffImages(file, other, path.join(diffDir, path.basename(file)))
        rows.push([page.path, width, r.pixels ? r.pixels + ' px' : 'identisch', r.heightBefore === r.heightAfter ? r.heightAfter : `${r.heightBefore} → ${r.heightAfter}`, r.pixels ? path.relative(ROOT, path.join(diffDir, path.basename(file))) : ''])
      } else rows.push([page.path, width, path.relative(ROOT, file)])
    }
  }
} finally {
  await browser.close()
  await close()
}

console.log('')
if (compare) printTable(['Seite', 'Breite', 'Unterschied', 'Höhe', 'Diff-Bild'], rows)
else printTable(['Seite', 'Breite', 'Datei'], rows)
