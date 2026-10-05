import clients from '../data/clients.js'
import useReveal, { revealClass } from '../hooks/useReveal.js'

export default function Clients({ t }) {
  const [ref, visible] = useReveal()

  return (
    <section id="clients" className="section clients-section" aria-label="Unsere Kunden">
      <div className="container">
        <div ref={ref} className={revealClass('clients-inner reveal', visible)}>
          <span className="label">{t.clients.label}</span>
          <div className="clients-grid">
            {clients.map((client) => (
              <a key={client.url} href={client.url} target="_blank" rel="noopener" className={`client-logo-link ${client.background}`} title={client.name}>
                <img src={client.logo} alt={`${client.name}, Kunde von Sin Digital`} width="120" height="120" loading="lazy" decoding="async" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
