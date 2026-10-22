import ProcessTimeline from './ProcessTimeline.jsx'
import { plans } from '../data/maintenance.js'
import { configuratorTypeHref, maintenancePath } from '../data/navigation.js'
import { contactAnchor, partnerPackage } from '../data/packages.js'
import { chf, siteTypes } from '../data/pricing.js'
import useReveal, { revealClass } from '../hooks/useReveal.js'

const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key])

// "1 – 2 Wochen", with the week words of the configurator.
function weeksText(k, weeks) {
  const n = weeks.min === weeks.max ? String(weeks.min) : `${weeks.min} – ${weeks.max}`
  return `${n} ${weeks.max === 1 ? k.summary.week : k.summary.weeks}`
}

// Entry price as an Offer: "ab" price, so a minimum price, no fixed one.
function OfferPrice({ type, texts }) {
  return (
    <>
      <span itemProp="priceSpecification" itemScope itemType="https://schema.org/PriceSpecification">
        <meta itemProp="minPrice" content={String(type.priceFrom)} />
        <meta itemProp="priceCurrency" content="CHF" />
      </span>
      <strong>{texts.from} CHF {chf(type.priceFrom)}</strong>
    </>
  )
}

// A site type of the configurator, same name, description and entry price; the button opens
// the configurator with the type preselected (/konfigurator/?typ=firmenwebsite).
function TypeCard({ position, type, texts, k, lang }) {
  const name = k.siteTypes[type.id].name
  return (
    <div className="paket-card" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <meta itemProp="position" content={String(position)} />
      <div itemProp="item" itemScope itemType="https://schema.org/Offer">
        <span className="paket-label">{fill(texts.label, { weeks: weeksText(k, type.weeks) })}</span>
        <h3 className="paket-name" itemProp="name">{name}</h3>
        <p className="paket-positioning" itemProp="description">{k.siteTypes[type.id].desc}</p>
        <div className="paket-price">
          <OfferPrice type={type} texts={texts} />
          {' '}
          <span>{texts.priceNote}</span>
        </div>
      </div>
      <a href={configuratorTypeHref(lang, type)} className="paket-cta">{fill(texts.configure, { name })}</a>
    </div>
  )
}

// Individuell / Plattform: a full-width row below the three types (no time frame, see pricing.js).
function CustomRow({ position, type, texts, k, lang }) {
  const name = k.siteTypes[type.id].name
  return (
    <div className="paket-card paket-custom" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <meta itemProp="position" content={String(position)} />
      <div className="paket-custom-body" itemProp="item" itemScope itemType="https://schema.org/Offer">
        <div className="paket-custom-text">
          <span className="paket-label">{k.summary.weeksOnRequest}</span>
          <h3 className="paket-name" itemProp="name">{name}</h3>
          <p className="paket-positioning" itemProp="description">{k.siteTypes[type.id].desc}</p>
        </div>
        <div className="paket-price">
          <OfferPrice type={type} texts={texts} />
          {' '}
          <span>{texts.priceNote}</span>
        </div>
      </div>
      <a href={configuratorTypeHref(lang, type)} className="paket-cta">{fill(texts.configure, { name })}</a>
    </div>
  )
}

// The care tiers come from src/data/maintenance.js (prices) and shared.care (names, summaries),
// the same source as /wartung/. The button jumps to the contact form, which prefills subject and
// message (ContactForm reads the #contact-partner hash, so a click before hydration works too).
function PartnerCard({ position, pkg, texts, from, care, requestLabel }) {
  return (
    <div className="paket-card paket-partner" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <meta itemProp="position" content={String(position)} />
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
          <strong>{from} CHF {pkg.monthly} / <span>{texts.month}</span></strong>
          {' '}
          <span>{texts.priceNote}</span>
        </div>
      </div>
      <a href={`#${contactAnchor(pkg.id)}`} className="paket-cta">
        {fill(requestLabel, { name: pkg.name })}
      </a>
    </div>
  )
}

// `k`: the configurator texts of the page's language (site type names and descriptions).
export default function Projects({ t, k, care, lang }) {
  const p = t.projects
  const [headerRef, headerVisible] = useReveal()
  const [gridRef, gridVisible] = useReveal()
  const [ctaRef, ctaVisible] = useReveal()
  const timed = siteTypes.filter((type) => type.weeks)
  const custom = siteTypes.filter((type) => !type.weeks)

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
          {timed.map((type, i) => (
            <TypeCard key={type.id} position={i + 1} type={type} texts={p.types} k={k} lang={lang} />
          ))}
          {custom.map((type, i) => (
            <CustomRow key={type.id} position={timed.length + i + 1} type={type} texts={p.types} k={k} lang={lang} />
          ))}
          <PartnerCard position={siteTypes.length + 1} pkg={partnerPackage} texts={p.partner} from={p.types.from} care={care} requestLabel={p.request} />
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
