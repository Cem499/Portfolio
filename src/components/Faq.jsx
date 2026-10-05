import { useState } from 'react'
import useReveal, { revealClass } from '../hooks/useReveal.js'

// Accordion: at most one answer open; clicking the open one closes it.
export default function Faq({ t }) {
  const [openId, setOpenId] = useState(null)
  const [headerRef, headerVisible] = useReveal()
  const [listRef, listVisible] = useReveal()

  return (
    <section id="faq" className="section faq" aria-label="Häufige Fragen zu Webdesign und Sin Digital" aria-labelledby="faq-heading">
      <div className="bg-gradient" aria-hidden="true"></div>

      <div className="container">
        <header ref={headerRef} className={revealClass('faq-header reveal', headerVisible)}>
          <span className="label">{t.faq.label}</span>
          <h2 id="faq-heading" className="section-title">
            <span>{t.faq.title1}</span><br />
            <span className="text-green">{t.faq.title2}</span>
          </h2>
          <p style={{ color: '#9ca3af', maxWidth: '40rem', margin: '1rem auto 0' }}>{t.faq.intro}</p>
        </header>

        <div ref={listRef} className={revealClass('faq-list reveal reveal-delay-1', listVisible)} role="list">
          {t.faq.items.map((item) => {
            const active = openId === item.id
            return (
              <div key={item.id} className={active ? 'faq-item active' : 'faq-item'} role="listitem">
                <button
                  className="faq-question"
                  aria-expanded={active ? 'true' : 'false'}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-btn-${item.id}`}
                  onClick={() => setOpenId(active ? null : item.id)}
                >
                  <span role="heading" aria-level="3">{item.question}</span>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </button>
                <div className="faq-answer" id={`faq-answer-${item.id}`} role="region" aria-labelledby={`faq-btn-${item.id}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="decorative-box box-1" aria-hidden="true"></div>
        <div className="decorative-box box-2" aria-hidden="true"></div>
        <div className="big-number-right" aria-hidden="true" inert="">03</div>
      </div>
    </section>
  )
}
