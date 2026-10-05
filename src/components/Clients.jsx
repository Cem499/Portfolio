import clients from '../data/clients.js'
import { projectPaths } from '../data/projects.js'
import useReveal, { revealClass } from '../hooks/useReveal.js'

// Client logos. Each links to the client's case study; without one it opens the live site.
export default function Clients({ t, lang = 'de' }) {
  const [ref, visible] = useReveal()

  return (
    <section id="clients" className="section clients-section" aria-label="Unsere Kunden">
      <div className="container">
        <div ref={ref} className={revealClass('clients-inner reveal', visible)}>
          <span className="label">{t.clients.label}</span>
          <div className="clients-grid">
            {clients.map((client) => {
              const linkProps = client.project
                ? { href: projectPaths[lang](client.project) }
                : { href: client.url, target: '_blank', rel: 'noopener' }
              return (
                <a key={client.name} {...linkProps} className={`client-logo-link ${client.background}`} title={client.name}>
                  <img src={client.logo} alt={`${client.name}, Kunde von Sin Digital`} width="120" height="120" loading="lazy" decoding="async" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
