import PageBreadcrumb from '../components/PageBreadcrumb.jsx'
import PageSeo from '../components/PageSeo.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import { plans, rows, yearlyPaidMonths, yearlyPrice } from '../data/maintenance.js'
import { configuratorPath, homePath } from '../data/navigation.js'
import { chf } from '../data/pricing.js'
import wartungSchema from '../data/schema/wartung.js'
import { fill, siteValues } from '../data/siteValues.js'
import { shared as deShared, wartung as deTexts } from '../i18n/de.js'
import { shared as enShared, wartung as enTexts } from '../i18n/en.js'
import '../styles/global.css'
import '../styles/site.css'
import '../styles/wartung.css'

export const PATHS = { de: '/wartung/', en: '/en/maintenance/' }

// Care plans, prerendered per language and served without JavaScript: the monthly/yearly
// toggle is two radio buttons read by CSS (:has), the FAQ uses <details name>. Prices, rows
// and terms come from src/data/maintenance.js, the texts carry {placeholders}.
export default function Wartung({ lang }) {
  const raw = lang === 'en' ? enTexts : deTexts
  const shared = lang === 'en' ? enShared : deShared
  const values = siteValues(lang)
  const t = {
    ...raw,
    meta: Object.fromEntries(Object.entries(raw.meta).map(([key, text]) => [key, fill(text, values)])),
    intro: fill(raw.intro, values),
    faq: raw.faq.map((item) => ({ q: item.q, a: fill(item.a, values) })),
  }
  const yearly = Boolean(yearlyPaidMonths)
  const contact = `${homePath(lang)}#contact`

  return (
    <>
      <PageSeo lang={lang} paths={PATHS} title={t.meta.title} description={t.meta.description} ogTitle={t.meta.ogTitle} jsonLd={wartungSchema(lang, t, shared.care, PATHS)} />

      <SiteHeader lang={lang} shared={shared} paths={PATHS} />

      <main id="main-content" className="site-main" role="main">
        <section className="section care-section" aria-labelledby="care-heading">
          <div className="container">
            <PageBreadcrumb lang={lang} current={t.breadcrumb} />
            <header className="care-header">
              <span className="label">{t.label}</span>
              <h1 id="care-heading" className="section-title">
                <span>{t.title1}</span>
                <br />
                <span className="text-green">{t.title2}</span>
              </h1>
              <p className="section-desc care-intro">{t.intro}</p>
            </header>

            <div className="care">
              {yearly && (
                <div className="care-toggle" role="group" aria-label={t.billing.label}>
                  <input type="radio" name="billing" id="billing-monthly" value="monthly" defaultChecked />
                  <label htmlFor="billing-monthly">{t.billing.monthly}</label>
                  <input type="radio" name="billing" id="billing-yearly" value="yearly" />
                  <label htmlFor="billing-yearly">
                    {t.billing.yearly}
                    <span className="care-save">{fill(t.billing.save, { months: 12 - yearlyPaidMonths })}</span>
                  </label>
                </div>
              )}

              <div className="care-plans">
                {plans.map((plan, i) => {
                  const name = shared.care.plans[plan.id].name
                  const previous = i > 0 ? shared.care.plans[plans[i - 1].id].name : null
                  const year = yearlyPrice(plan)
                  return (
                    <article key={plan.id} className={plan.featured ? 'care-plan is-featured' : 'care-plan'} aria-labelledby={`care-${plan.id}`}>
                      {plan.badge && <span className={`care-badge care-badge-${plan.badge}`}>{shared.care.badges[plan.badge]}</span>}
                      <h2 id={`care-${plan.id}`} className="care-plan-name">{name}</h2>
                      <p className="care-plan-tagline">{t.plans[plan.id].tagline}</p>
                      <p className="care-price">
                        <span className="care-price-monthly">
                          <span className="care-amount">CHF {chf(plan.monthly)}</span>
                          <span className="care-unit">{t.billing.perMonth}</span>
                        </span>
                        {year && (
                          <span className="care-price-yearly">
                            <span className="care-amount">CHF {chf(year)}</span>
                            <span className="care-unit">{t.billing.perYear}</span>
                            <span className="care-equals">{fill(t.billing.equals, { price: chf(Math.round(year / 12)) })}</span>
                          </span>
                        )}
                      </p>
                      {previous && <p className="care-includes">{fill(t.includesAll, { plan: previous })}</p>}
                      <dl className="care-plan-rows">
                        {rows.map((row) => (
                          <div key={row}>
                            <dt>{t.rows[row]}</dt>
                            <dd>{fill(t.values[row][String(plan[row])], values)}</dd>
                          </div>
                        ))}
                      </dl>
                      <a className={plan.featured ? 'btn-primary care-cta' : 'care-cta care-cta-secondary'} href={contact}>
                        {t.choose}
                      </a>
                    </article>
                  )
                })}
              </div>

              <p className="care-note">
                {fill(t.note.before, values)}
                <a href={configuratorPath(lang)}>{t.note.link}</a>
                {t.note.after}
              </p>
            </div>

            <section className="care-conditions" aria-labelledby="care-conditions-title">
              <h2 id="care-conditions-title" className="care-faq-title">{t.conditionsTitle}</h2>
              <ul className="care-conditions-list">
                {t.conditions.map((item) => (
                  <li key={item}>{fill(item, values)}</li>
                ))}
              </ul>
              <p className="care-note">{shared.vatNote}</p>
            </section>

            <section className="care-faq" aria-labelledby="care-faq-title">
              <h2 id="care-faq-title" className="care-faq-title">{t.faqTitle}</h2>
              {t.faq.map((item, i) => (
                <details key={i} className="care-faq-item" name="care-faq">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </section>
          </div>
        </section>
      </main>

      <SiteFooter shared={shared} lang={lang} />
    </>
  )
}
