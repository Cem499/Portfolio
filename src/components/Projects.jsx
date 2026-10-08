import ProcessTimeline from './ProcessTimeline.jsx'
import { plans } from '../data/maintenance.js'
import { maintenancePath } from '../data/navigation.js'
import { contactAnchor, partnerPackage, websitePackages } from '../data/packages.js'
import { chf } from '../data/pricing.js'
import useReveal, { revealClass } from '../hooks/useReveal.js'

const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key])

// "Growth anfragen": jumps to the contact form, which prefills subject and message for the
// package. ContactForm reads the #contact-<id> hash, so a click before hydration works too.
function RequestButton({ pkg, label }) {
  return (
    <a href={`#${contactAnchor(pkg.id)}`} className="paket-cta">
      {fill(label, { name: pkg.name })}
    </a>
  )
}

function PaketCard({ position, pkg, texts, requestLabel }) {
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
          <strong itemProp="price" content={String(pkg.price)}><span itemProp="priceCurrency" content="CHF">Ab CHF {chf(pkg.price)}</span></strong>
          {' '}
          <span>{texts.priceNote}</span>
        </div>
      </div>
      <RequestButton pkg={pkg} label={requestLabel} />
    </div>
  )
}

// The care tiers come from src/data/maintenance.js (prices) and shared.care (names, summaries),
// the same source as /wartung/.
function PartnerCard({ pkg, texts, care, requestLabel }) {
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
          <strong>Ab CHF {pkg.monthly} / <span>{texts.month}</span></strong>
          {' '}
          <span>{texts.priceNote}</span>
        </div>
      </div>
      <RequestButton pkg={pkg} label={requestLabel} />
    </div>
  )
}

export default function Projects({ t, care, lang }) {
  const p = t.projects
  const [headerRef, headerVisible] = useReveal()
  const [gridRef, gridVisible] = useReveal()
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
          {websitePackages.map((pkg, i) => (
            <PaketCard key={pkg.id} position={i + 1} pkg={pkg} texts={p.packages[i]} requestLabel={p.request} />
          ))}
          <PartnerCard pkg={partnerPackage} texts={p.packages[3]} care={care} requestLabel={p.request} />
        </div>

        <ProcessTimeline t={p.process} careHref={maintenancePath(lang)} />

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
