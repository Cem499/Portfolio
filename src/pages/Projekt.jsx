import BeforeAfterSlider, { BEFORE_AFTER_SCRIPT } from '../components/BeforeAfterSlider.jsx'
import PageBreadcrumb from '../components/PageBreadcrumb.jsx'
import PageSeo from '../components/PageSeo.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import { configuratorPath } from '../data/navigation.js'
import { comparePair, listPaths, projectBySlug, projectImage, projectPaths, projects } from '../data/projects.js'
import { projectSchema } from '../data/schema/projekte.js'
import { projekte as deTexts, shared as deShared } from '../i18n/de.js'
import { projekte as enTexts, shared as enShared } from '../i18n/en.js'
import '../styles/global.css'
import '../styles/site.css'
import '../styles/projekte.css'

const IMAGE_SIZES = '(min-width: 1360px) 1280px, calc(100vw - 3rem)'

// /projekte/<slug>/: one case study, prerendered per language, served without React.
// Only the before/after slider carries a small inline script.
export default function Projekt({ lang, slug }) {
  const t = lang === 'en' ? enTexts : deTexts
  const shared = lang === 'en' ? enShared : deShared
  const project = projectBySlug(slug)
  const texts = t.items[slug]
  const paths = { de: projectPaths.de(slug), en: projectPaths.en(slug) }
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  const after = projectImage(project.images.after)
  const pair = comparePair(project)
  // A pair with its own size is shown at most at its width (see BeforeAfterSlider).
  const pairSizes = pair && pair.width !== 1440 ? `(min-width: ${pair.width + 48}px) ${pair.width}px, calc(100vw - 3rem)` : IMAGE_SIZES
  const home = lang === 'en' ? '/en/' : '/'

  return (
    <>
      <PageSeo
        lang={lang}
        paths={paths}
        title={`${texts.name}: ${t.caseStudy} | Sin Digital`}
        description={`${texts.tagline} ${texts.summary}`}
        ogTitle={`${texts.name}: ${texts.tagline}`}
        jsonLd={projectSchema(lang, t, project, paths)}
        image={{ src: after.src, srcSet: after.srcSet, sizes: IMAGE_SIZES }}
        preload={pair ? { ...pair.before, sizes: pairSizes } : undefined}
      />

      <SiteHeader lang={lang} shared={shared} paths={paths} />

      <main id="main-content" className="site-main" role="main">
        <article className="section proj-section proj-detail">
          <div className="container">
            <PageBreadcrumb lang={lang} current={texts.name} parent={{ href: listPaths[lang], label: t.breadcrumb }} />

            <header className="proj-head">
              <span className="label">
                {t.caseStudy}
                {project.firstSite ? ` · ${t.firstSite}` : ''}
              </span>
              <h1 className="section-title proj-title">{texts.name}</h1>
              <p className="proj-tagline">{texts.tagline}</p>
              <dl className="proj-facts">
                <div>
                  <dt>{t.clientLabel}</dt>
                  <dd>{texts.client}</dd>
                </div>
                {project.year && (
                  <div>
                    <dt>{t.yearLabel}</dt>
                    <dd>{project.year}</dd>
                  </div>
                )}
                {project.credit && (
                  <div>
                    <dt>{t.madeWith}</dt>
                    <dd>{project.credit}</dd>
                  </div>
                )}
                <div>
                  <dt>{t.tech}</dt>
                  <dd>
                    <ul className="proj-chips">
                      {project.tech.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
              <a className="btn-primary proj-visit" href={project.url} target="_blank" rel="noopener">
                {t.visit}
              </a>
            </header>

            {pair ? (
              <>
                <BeforeAfterSlider
                  width={pair.width}
                  height={pair.height}
                  before={{ ...pair.before, sizes: pairSizes, alt: texts.beforeAlt || `${t.compare.before}: ${texts.name}` }}
                  after={{ ...pair.after, sizes: pairSizes, alt: texts.afterAlt || `${t.compare.after}: ${texts.name}` }}
                  labels={t.compare}
                />
                <script dangerouslySetInnerHTML={{ __html: BEFORE_AFTER_SCRIPT }} />
              </>
            ) : (
              <figure className="proj-cover">
                <img src={after.src} srcSet={after.srcSet} sizes={IMAGE_SIZES} width="1440" height="900" alt={`${texts.name}: ${t.compare.after}`} fetchpriority="high" decoding="async" />
              </figure>
            )}

            {project.facts.length > 0 && (
              <section className="proj-metrics" aria-labelledby="proj-metrics-title">
                <h2 id="proj-metrics-title" className="proj-h2">{t.metrics.title}</h2>
                <div className="proj-metrics-grid">
                  {project.facts.map((fact) => (
                    <div key={fact.id} className="proj-fact">
                      <span className="proj-fact-value">{fact.value}</span>
                      <span className="proj-fact-label">{t.metrics[fact.id]}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="proj-story">
              {['situation', 'solution', 'result'].map((key, i) => (
                <section key={key} className="proj-story-block" aria-labelledby={`proj-${key}`}>
                  <h2 id={`proj-${key}`} className="proj-h2">
                    <span className="proj-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    {t.sections[key]}
                  </h2>
                  <p>{texts[key]}</p>
                </section>
              ))}
            </div>

            <nav className="proj-next" aria-label={t.next}>
              <span className="label">{t.next}</span>
              <a href={projectPaths[lang](next.slug)}>{t.items[next.slug].name} →</a>
            </nav>

            <section className="proj-cta" aria-labelledby="proj-cta-title">
              <h2 id="proj-cta-title" className="proj-cta-title">{t.cta.title}</h2>
              <p>{t.cta.text}</p>
              <div className="proj-cta-actions">
                <a className="btn-primary" href={configuratorPath(lang)}>{t.cta.configure}</a>
                <a className="proj-cta-link" href={`${home}#contact`}>{t.cta.contact}</a>
              </div>
            </section>
          </div>
        </article>
      </main>

      <SiteFooter shared={shared} lang={lang} />
    </>
  )
}
