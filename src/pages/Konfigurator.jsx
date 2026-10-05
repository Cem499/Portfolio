import Configurator from '../components/Configurator.jsx'
import PageBreadcrumb from '../components/PageBreadcrumb.jsx'
import PageSeo from '../components/PageSeo.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import konfiguratorSchema from '../data/schema/konfigurator.js'
import { konfigurator as deTexts, shared as deShared } from '../i18n/de.js'
import { konfigurator as enTexts, shared as enShared } from '../i18n/en.js'
import '../styles/global.css'
import '../styles/site.css'
import '../styles/konfigurator.css'

const PATHS = { de: '/konfigurator/', en: '/en/configurator/' }

// Project configurator, prerendered once per language.
export default function Konfigurator({ lang }) {
  const t = lang === 'en' ? enTexts : deTexts
  const shared = lang === 'en' ? enShared : deShared

  return (
    <>
      <PageSeo lang={lang} paths={PATHS} title={t.meta.title} description={t.meta.description} ogTitle={t.meta.ogTitle} jsonLd={konfiguratorSchema(lang, t, PATHS)} />

      <SiteHeader lang={lang} shared={shared} paths={PATHS} />

      <main id="main-content" className="site-main" role="main">
        <section className="section konfig-section" aria-labelledby="konfig-heading">
          <div className="container">
            <PageBreadcrumb lang={lang} current={t.breadcrumb} />
            <header className="konfig-header">
              <span className="label">{t.label}</span>
              <h1 id="konfig-heading" className="section-title">
                <span>{t.title1}</span>
                <br />
                <span className="text-green">{t.title2}</span>
              </h1>
              <p className="section-desc konfig-intro">{t.intro}</p>
            </header>
            <Configurator t={t} formTexts={shared.contactForm} />
          </div>
        </section>
      </main>

      <SiteFooter shared={shared} />
    </>
  )
}
