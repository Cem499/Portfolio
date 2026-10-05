import useReveal, { revealClass } from '../hooks/useReveal.js'

// Links to the SEO landing pages (absolute paths so they also work from /en/).
const LINKS = [
  { href: '/website-zuerich.html', title: 'Website Zürich erstellen lassen' },
  { href: '/guenstige-website-zuerich.html', title: 'Günstige Website Zürich' },
  { href: '/webdesign-zuerich.html', title: 'Webdesign Zürich' },
  { href: '/seo-agentur-zuerich.html', title: 'SEO Agentur Zürich' },
  { href: '/webentwicklung-zuerich.html', title: 'Webentwicklung Zürich' },
  { href: '/webdesign-zuerich.html', title: 'Digitale Agentur Zürich' },
  { href: '/website-zuerich.html', title: 'Webagentur Zürich' },
]

export default function LocalSeo({ t }) {
  const [ref, visible] = useReveal()

  return (
    <section id="local-seo" className="section" aria-label="Lokale SEO-Signale Zürich" aria-labelledby="local-seo-heading">
      <div className="container">
        <div ref={ref} className={revealClass('services-header reveal', visible)}>
          <div>
            <h2 id="local-seo-heading" className="section-title">
              <span>{t.localSeo.title1}</span><br />
              <span className="text-green">{t.localSeo.title2}</span>
            </h2>
            <p className="section-desc">{t.localSeo.desc1}</p>
            <p className="section-desc">{t.localSeo.desc2}</p>
            <div className="hero-trust" aria-label="Leistungen Zürich">
              {LINKS.map((link, i) => (
                <a key={link.title} className="hero-trust-item" href={link.href} title={link.title}>{t.localSeo.links[i]}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
