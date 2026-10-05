import useReveal, { revealClass } from '../hooks/useReveal.js'

// `ctaHref` leads to the project configurator of the page's language.
export default function Hero({ t, ctaHref }) {
  const [trustRef, trustVisible] = useReveal()

  return (
    <section id="hero" className="section hero" aria-label="Einleitung, Sin Digital Webdesign Zürich" aria-labelledby="hero-heading">
      <div className="blob blob-1" aria-hidden="true"></div>
      <div className="blob blob-2" aria-hidden="true"></div>

      <div className="container hero-content">
        <span className="label hero-label hero-anim-1">{t.hero.label}</span>

        <div className="hero-grid">
          <div className="hero-left">
            <h1 id="hero-heading" className="hero-title hero-anim-2">
              <span aria-hidden="true">WE<br /><span className="text-green">CREATE</span><br />FUTURE</span>
            </h1>
            <a href={ctaHref} className="btn-primary hero-anim-3">{t.hero.cta}</a>
          </div>

          <div className="hero-right hero-anim-4">
            <p className="hero-text-1">{t.hero.text}</p>
          </div>
        </div>

        <div className="scroll-indicator" aria-label="Weiter scrollen" role="img">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>

        <div ref={trustRef} className={revealClass('hero-trust reveal', trustVisible)} aria-label="Vorteile von Sin Digital">
          {t.hero.trust.map((item) => (
            <span key={item} className="hero-trust-item">{item}</span>
          ))}
        </div>
      </div>

      <div className="line line-1" aria-hidden="true"></div>
      <div className="line line-2" aria-hidden="true"></div>
    </section>
  )
}
