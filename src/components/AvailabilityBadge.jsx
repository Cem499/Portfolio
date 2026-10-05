import { formatMonth, nextStart } from '../data/availability.js'

// "Nächster freier Projektstart: <Monat>" in the hero. Renders nothing while no month is set.
export default function AvailabilityBadge({ label, lang }) {
  if (!nextStart) return null
  return (
    <p className="avail hero-anim-3">
      <span className="avail-dot" aria-hidden="true"></span>
      <span className="avail-label">{label}</span> <strong className="avail-month">{formatMonth(nextStart, lang)}</strong>
    </p>
  )
}
