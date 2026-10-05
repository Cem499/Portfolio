import PageBreadcrumb from '../components/PageBreadcrumb.jsx'
import PageSeo from '../components/PageSeo.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import { configuratorPath } from '../data/navigation.js'
import { listPaths, projectImage, projectPaths, projects } from '../data/projects.js'
import { projectListSchema } from '../data/schema/projekte.js'
import { projekte as deTexts, shared as deShared } from '../i18n/de.js'
import { projekte as enTexts, shared as enShared } from '../i18n/en.js'
import '../styles/global.css'
import '../styles/site.css'
import '../styles/projekte.css'

// /projekte/: all case studies, prerendered per language, served without JavaScript.
export default function Projekte({ lang }) {
  const t = lang === 'en' ? enTexts : deTexts
  const shared = lang === 'en' ? enShared : deShared

  return (
    <>
      <PageSeo lang={lang} paths={listPaths} title={t.meta.title} description={t.meta.description} ogTitle={t.meta.ogTitle} jsonLd={projectListSchema(lang, t, listPaths)} />

      <SiteHeader lang={lang} shared={shared} paths={listPaths} />

      <main id="main-content" className="site-main" role="main">
        <section className="section proj-section" aria-labelledby="proj-heading">
          <div className="container">
            <PageBreadcrumb lang={lang} current={t.breadcrumb} />
            <header className="proj-header">
              <span className="label">{t.label}</span>
              <h1 id="proj-heading" className="section-title">
                <span>{t.title1}</span>
                <br />
                <span className="text-green">{t.title2}</span>
              </h1>
              <p className="section-desc proj-intro">{t.intro}</p>
            </header>

            <ol className="proj-list">
              {projects.map((project, i) => {
                const texts = t.items[project.slug]
                const image = projectImage(project.images.after)
                return (
                  <li key={project.slug} className="proj-row">
                    <span className="proj-row-num" aria-hidden="true" data-num={String(i + 1).padStart(2, '0')}></span>
                    <div className="proj-row-body">
                      <span className="label">
                        {t.caseStudy}
                        {project.firstSite ? ` · ${t.firstSite}` : ''}
                      </span>
                      <h2 className="proj-row-name">
                        <a className="proj-row-link" href={projectPaths[lang](project.slug)}>{texts.name}</a>
                      </h2>
                      <p className="proj-row-tagline">{texts.tagline}</p>
                      <p className="proj-row-meta">
                        {texts.client}
                        {project.year ? ` · ${project.year}` : ''}
                      </p>
                      <ul className="proj-chips" aria-label={t.tech}>
                        {project.tech.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <span className="proj-row-more" aria-hidden="true">{t.readMore} →</span>
                    </div>
                    <figure className="proj-row-media">
                      <img src={image.src} srcSet={image.srcSet} sizes="(min-width: 900px) 40vw, 100vw" width="1440" height="900" alt="" loading={i === 0 ? 'eager' : 'lazy'} fetchpriority={i === 0 ? 'high' : undefined} decoding="async" />
                    </figure>
                  </li>
                )
              })}
            </ol>

            <section className="proj-cta" aria-labelledby="proj-cta-title">
              <h2 id="proj-cta-title" className="proj-cta-title">{t.cta.title}</h2>
              <p>{t.cta.text}</p>
              <div className="proj-cta-actions">
                <a className="btn-primary" href={configuratorPath(lang)}>{t.cta.configure}</a>
                <a className="proj-cta-link" href={`${lang === 'en' ? '/en/' : '/'}#contact`}>{t.cta.contact}</a>
              </div>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter shared={shared} />
    </>
  )
}
