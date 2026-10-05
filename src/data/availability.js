// Next free project start, shown as a badge in the hero of the start page.
// ISO month ('2026-11') or null to hide the badge. The site is static: changing the
// value takes effect with the next build and deploy.
export const nextStart = null

export function formatMonth(isoMonth, lang) {
  const [year, month] = isoMonth.split('-').map(Number)
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'de-CH', { month: 'long', year: 'numeric' }).format(new Date(year, month - 1, 1))
}
