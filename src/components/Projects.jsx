import ProcessTimeline from './ProcessTimeline.jsx'
import { PHONE } from '../data/contact.js'
import { isLaunchDiscountActive } from '../data/launchDiscount.js'
import { configuratorPath, maintenancePath } from '../data/navigation.js'
import { contactAnchor, fixedPackages, individualPackage } from '../data/packages.js'
import { chf } from '../data/pricing.js'
import { fill, packageValues } from '../data/siteValues.js'
import useReveal, { revealClass } from '../hooks/useReveal.js'

// One package card. Prices, pages, sections and duration come from src/data/packages.js, the
// texts from i18n (home.projects.packages); the button opens the configurator with the package.
function PackageCard({ pkg, index, t, shared, values, lang, launchActive, configuratorHref }) {
  const pv = { ...values, ...packageValues(pkg, lang, shared.care.plans) }
  const texts = t.packages[pkg.id]
  const name = shared.packages[pkg.id].name
  return (
    <div className={pkg.featured ? 'paket-card featured' : 'paket-card'} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <meta itemProp="position" content={String(index + 1)} />
      <div itemProp="item" itemScope itemType="https://schema.org/Offer">
        {pkg.featured && <span className="paket-badge">{shared.care.badges.recommended}</span>}
        {pkg.featured && ' '}
        <span className="paket-label">{fill(t.packageLabel, { n: String(index + 1).padStart(2, '0') })}</span>
        <h3 className="paket-name" itemProp="name">{name}</h3>
        <p className="paket-positioning">{texts.claim}</p>
        <p className="paket-ideal">
          <strong>{t.idealFor}:</strong> {texts.idealFor}
        </p>
        <ul className="paket-features">
          {texts.scope.map((item) => (
            <li key={item}>{fill(item, pv)}</li>
          ))}
        </ul>
        <div className="paket-price">
          <strong itemProp="price" content={String(pkg.price)}>
            <span itemProp="priceCurrency" content="CHF">CHF {chf(pkg.price)}</span> · {t.fixedPrice}
          </strong>{' '}
          <span>{fill(t.priceNote, pv)}</span>
          {launchActive && <span className="paket-launch">{fill(t.launchLine, pv)}</span>}
        </div>
      </div>
      <a href={`${configuratorHref}?paket=${pkg.id}`} className="paket-cta">
        {fill(t.calculate, { name })}
      </a>
    </div>
  )
}

// Services and prices on the start page: the three fixed-price packages, the individual
// project, what is always included, the four steps and the call to action.
export default function Projects({ t, shared, values, lang }) {
  const p = t.projects
  const launchActive = isLaunchDiscountActive()
  const configuratorHref = configuratorPath(lang)
  const [headerRef, headerVisible] = useReveal()
  const [gridRef, gridVisible] = useReveal()
  const [alwaysRef, alwaysVisible] = useReveal()
  const [ctaRef, ctaVisible] = useReveal()
  const process = { ...p.process, steps: p.process.steps.map((step) => ({ ...step, desc: fill(step.desc, values) })) }

  return (
    <section id="projects" className="section projects" aria-label="Leistungen und Preise" aria-labelledby="projects-heading">
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
          <div className="pricing-person">
            <img src="/assets/PortraitCem.webp" alt={p.person.photoAlt} width="72" height="72" loading="lazy" decoding="async" />
            <div>
              <p className="pricing-person-intro">{p.intro}</p>
              <p className="pricing-person-meta">
                <strong>{p.person.name}</strong>, {p.person.role} · <a href={PHONE.href}>{PHONE.display}</a>
              </p>
            </div>
          </div>
        </div>

        <div ref={gridRef} className={revealClass('pakete-grid pakete-grid-3 reveal reveal-delay-1', gridVisible)} itemScope itemType="https://schema.org/ItemList">
          <meta itemProp="name" content="Sin Digital Website-Pakete, Zürich" />
          {fixedPackages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} t={p} shared={shared} values={values} lang={lang} launchActive={launchActive} configuratorHref={configuratorHref} />
          ))}
        </div>

        <div className="pakete-individual">
          <p>{fill(p.individual.text, values)}</p>
          <a href={`#${contactAnchor(individualPackage.id)}`} className="leistungen-cta-btn pakete-individual-btn">
            {p.individual.button}
          </a>
        </div>

        <div ref={alwaysRef} className={revealClass('pakete-always reveal', alwaysVisible)}>
          <h3 className="pakete-always-title">{p.always.title}</h3>
          <ul className="pakete-always-list">
            {p.always.items.map((item) => (
              <li key={item}>{fill(item, values)}</li>
            ))}
          </ul>
          <a className="pakete-always-link" href={maintenancePath(lang)}>
            {p.always.careLink}
          </a>
        </div>

        <ProcessTimeline t={process} careHref={maintenancePath(lang)} />

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
