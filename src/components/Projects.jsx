import { plans } from '../data/maintenance.js'
import useReveal, { revealClass } from '../hooks/useReveal.js'

// Package name and price markup (language independent, same on / and /en/).
const PACKAGES = [
  { name: 'Basic', price: '990', priceText: 'Ab CHF 990' },
  { name: 'Growth', price: '1690', priceText: "Ab CHF 1'690", featured: true },
  { name: 'Pro', price: '2490', priceText: "Ab CHF 2'490" },
]

function PaketCard({ position, pkg, texts }) {
  return (
    <div className={pkg.featured ? 'paket-card featured' : 'paket-card'} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <meta itemProp="position" content={String(position)} />
      <div itemProp="item" itemScope itemType="https://schema.org/Offer">
        {texts.badge && <span className="paket-badge">{texts.badge}</span>}
        {texts.badge && ' '}
        <span className="paket-label">{texts.label}</span>
        <h3 className="paket-name" itemProp="name">{pkg.name}</h3>
        <p className="paket-positioning">{texts.positioning}</p>
        <ul className="paket-features">
          {texts.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
        <div className="paket-price">
          <strong itemProp="price" content={pkg.price}><span itemProp="priceCurrency" content="CHF">{pkg.priceText}</span></strong>
          {' '}
          <span>{texts.priceNote}</span>
        </div>
      </div>
    </div>
  )
}

// The care tiers come from src/data/maintenance.js (prices) and shared.care (names, summaries),
// the same source as /wartung/.
function PartnerCard({ texts, care }) {
  return (
    <div className="paket-card" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <meta itemProp="position" content="4" />
      <div itemProp="item" itemScope itemType="https://schema.org/Offer">
        <span className="paket-label">{texts.label}</span>
        <h3 className="paket-name" itemProp="name">Partner</h3>
        <p className="paket-positioning">{texts.positioning}</p>
        <ul className="paket-features partner-care-list">
          {plans.map((plan) => (
            <li key={plan.id} className="care-tier">
              <span className="care-tier-title">{`${care.plans[plan.id].name} Care, CHF ${plan.monthly}/${texts.month}`}</span>
              {' '}
              <span className="care-tier-text">{care.plans[plan.id].summary}</span>
            </li>
          ))}
        </ul>
        <div className="paket-price">
          <strong>Ab CHF 49 / <span>{texts.month}</span></strong>
          {' '}
          <span>{texts.priceNote}</span>
        </div>
      </div>
    </div>
  )
}

export default function Projects({ t, care }) {
  const p = t.projects
  const [headerRef, headerVisible] = useReveal()
  const [gridRef, gridVisible] = useReveal()
  const [processRef, processVisible] = useReveal()
  const [ctaRef, ctaVisible] = useReveal()

  return (
    <section id="projects" className="section projects" aria-label="Leistungen und Webdesign-Pakete" aria-labelledby="projects-heading">
      <div className="circle-bg" aria-hidden="true"></div>

      <div className="container">

        <div ref={headerRef} className={revealClass('services-header reveal', headerVisible)}>
          <div>
            <span className="label">{p.label}</span>
            <h2 id="projects-heading" className="section-title">
              <span>{p.title1}</span><br />
              <span className="text-green">{p.title2}</span>
            </h2>
          </div>
          <p className="section-desc-right pakete-intro">{p.intro}</p>
        </div>

        <div ref={gridRef} className={revealClass('pakete-grid reveal reveal-delay-1', gridVisible)} itemScope itemType="https://schema.org/ItemList">
          <meta itemProp="name" content="Sin Digital Webdesign-Pakete, Digitalagentur Zürich" />
          {PACKAGES.map((pkg, i) => (
            <PaketCard key={pkg.name} position={i + 1} pkg={pkg} texts={p.packages[i]} />
          ))}
          <PartnerCard texts={p.packages[3]} care={care} />
        </div>

        <div ref={processRef} className={revealClass('prozess-section reveal', processVisible)}>
          <span className="prozess-label">{p.process.label}</span>
          <h3 className="prozess-title">
            <span>{p.process.title1}</span><br />
            <span className="text-green">{p.process.title2}</span>
          </h3>

          <div className="prozess-grid">
            {p.process.steps.map((step, i) => (
              <div key={i} className="prozess-step">
                <div className="prozess-step-num">{`0${i + 1}`}</div>
                <div className="prozess-step-name">{step.name}</div>
                <p className="prozess-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={ctaRef} className={revealClass('leistungen-cta reveal', ctaVisible)}>
          <div className="leistungen-cta-text">
            <h3>{p.cta.title}</h3>
            <p>{p.cta.text}</p>
          </div>
          <a href="#contact" className="leistungen-cta-btn">{p.cta.button}</a>
        </div>

        <div className="big-number-center" aria-hidden="true" inert="">02</div>
      </div>
    </section>
  )
}
