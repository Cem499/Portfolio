const RADIUS = 26
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// Lighthouse-style score ring (0–100). The fill is a stroke-dashoffset, animated once
// by CSS on load (no animation with prefers-reduced-motion). Works without JavaScript.
export default function ScoreRing({ score, label }) {
  const level = score >= 90 ? 'good' : score >= 50 ? 'mid' : 'low'
  return (
    <div className={`ring ring-${level}`}>
      <svg className="ring-svg" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
        <circle className="ring-track" cx="32" cy="32" r={RADIUS} />
        <circle className="ring-value" cx="32" cy="32" r={RADIUS} style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset: CIRCUMFERENCE * (1 - score / 100) }} />
      </svg>
      <span className="ring-score">{score}</span>
      <span className="ring-label">{label}</span>
    </div>
  )
}

export { CIRCUMFERENCE }
