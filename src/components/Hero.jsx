import { fill } from '../data/siteValues.js'
import useReveal, { revealClass } from '../hooks/useReveal.js'

// `ctaHref` leads to the project configurator of the page's language. `values` are the
// placeholder values from src/data (prices, durations, included care months).
export default function Hero({ t, ctaHref, values }) {
  const [trustRef, trustVisible] = useReveal()

  return (
    <section id="hero" className="section hero" aria-label="Einleitung, Sin Digital Webdesign Zürich" aria-labelledby="hero-heading">
      <div className="blob blob-1" aria-hidden="true"></div>
      <div className="blob blob-2" aria-hidden="true"></div>
      <div className="hero-scan" aria-hidden="true"></div>

      <div className="container hero-content">
        <span className="label hero-label hero-anim-1">{t.hero.label}</span>

        <div className="hero-grid">
          <div className="hero-left">
            <h1 id="hero-heading" className="hero-title hero-anim-2">
              {t.hero.title1}
              <br />
              <span className="text-green">{t.hero.title2}</span>
            </h1>
            <a href={ctaHref} className="btn-primary hero-anim-3">{t.hero.cta}</a>
          </div>

          <div className="hero-right hero-anim-4">
            <p className="hero-text-1">{fill(t.hero.text, values)}</p>
          </div>
        </div>

        <div ref={trustRef} className={revealClass('hero-trust reveal', trustVisible)} aria-label="Vorteile von Sin Digital">
          {t.hero.trust.map((item) => (
            <span key={item} className="hero-trust-item">{fill(item, values)}</span>
          ))}
        </div>
      </div>

      <div className="hero-line" aria-hidden="true"></div>
    </section>
  )
}
