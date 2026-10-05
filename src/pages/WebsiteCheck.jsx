import PageBreadcrumb from '../components/PageBreadcrumb.jsx'
import PageSeo from '../components/PageSeo.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import WebsiteCheck from '../components/WebsiteCheck.jsx'
import { configuratorPath, homePath } from '../data/navigation.js'
import websiteCheckSchema from '../data/schema/websiteCheck.js'
import { shared as deShared, websiteCheck as deTexts } from '../i18n/de.js'
import { shared as enShared, websiteCheck as enTexts } from '../i18n/en.js'
import '../styles/global.css'
import '../styles/site.css'
import '../styles/rings.css'
import '../styles/website-check.css'

export const PATHS = { de: '/website-check/', en: '/en/website-check/' }

// Website check with Google PageSpeed Insights, prerendered per language, hydrated after paint.
export default function WebsiteCheckPage({ lang }) {
  const t = lang === 'en' ? enTexts : deTexts
  const shared = lang === 'en' ? enShared : deShared

  return (
    <>
      <PageSeo lang={lang} paths={PATHS} title={t.meta.title} description={t.meta.description} ogTitle={t.meta.ogTitle} jsonLd={websiteCheckSchema(lang, t, PATHS)} />

      <SiteHeader lang={lang} shared={shared} paths={PATHS} />

      <main id="main-content" className="site-main" role="main">
        <section className="section wc-section" aria-labelledby="wc-heading">
          <div className="container">
            <PageBreadcrumb lang={lang} current={t.breadcrumb} />
            <header className="wc-header">
              <span className="label">{t.label}</span>
              <h1 id="wc-heading" className="section-title">
                <span>{t.title1}</span>
                <br />
                <span className="text-green">{t.title2}</span>
              </h1>
              <p className="section-desc wc-intro">{t.intro}</p>
            </header>

            <WebsiteCheck t={t} contactHref={`${homePath(lang)}#contact`} configuratorHref={configuratorPath(lang)} />

            <section className="wc-about" aria-labelledby="wc-about-title">
              <h2 id="wc-about-title" className="wc-about-title">{t.about.title}</h2>
              <dl className="wc-about-grid">
                {t.about.items.map((item) => (
                  <div key={item.title}>
                    <dt>{item.title}</dt>
                    <dd>{item.text}</dd>
                  </div>
                ))}
              </dl>
              <p className="wc-about-note">{t.about.note}</p>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter shared={shared} lang={lang} />
    </>
  )
}
