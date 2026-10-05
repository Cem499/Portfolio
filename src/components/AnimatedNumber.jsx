import { chf } from '../data/pricing.js'

const DIGITS = [...'0123456789']

// A CHF amount whose digits roll like a counter when the value changes: every digit is a
// strip of 0–9 moved with a CSS transform (no transition with prefers-reduced-motion).
// Screen readers get the plain number, the strips are hidden from them.
export default function AnimatedNumber({ value }) {
  const text = chf(value)
  return (
    <span className="konfig-num">
      <span className="konfig-sr">{text}</span>
      <span aria-hidden="true">
        {[...text].map((ch, i) =>
          /\d/.test(ch) ? (
            <span key={i} className="konfig-digit">
              <span className="konfig-digit-strip" style={{ transform: `translateY(-${ch}em)` }}>
                {DIGITS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          ) : (
            <span key={i}>{ch}</span>
          ),
        )}
      </span>
    </span>
  )
}
