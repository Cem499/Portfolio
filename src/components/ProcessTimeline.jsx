import useReveal, { revealClass } from '../hooks/useReveal.js'

// Six steps from first call to care, as a vertical timeline. The line fills while the
// section scrolls through the viewport (CSS scroll-driven animation); browsers without it
// and visitors with prefers-reduced-motion get the filled line (styles in home.css).
export default function ProcessTimeline({ t, careHref }) {
  const [ref, visible] = useReveal()

  return (
    <div ref={ref} className={revealClass('prozess-section reveal timeline', visible)}>
      <span className="prozess-label">{t.label}</span>
      <h3 className="prozess-title">
        <span>{t.title1}</span>
        <br />
        <span className="text-green">{t.title2}</span>
      </h3>

      <ol className="timeline-list">
        <li className="timeline-line" aria-hidden="true"></li>
        {t.steps.map((step, i) => (
          <li key={step.name} className="timeline-step">
            <span className="timeline-dot" aria-hidden="true"></span>
            <div className="timeline-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
            <div className="timeline-body">
              <div className="timeline-name">{step.name}</div>
              <p className="timeline-desc">
                {step.desc}
                {step.link && (
                  <>
                    {' '}
                    <a className="timeline-link" href={careHref}>{step.link}</a>
                  </>
                )}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
