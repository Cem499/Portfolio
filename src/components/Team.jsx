import useReveal, { revealClass } from '../hooks/useReveal.js'

export default function Team({ t }) {
  const [headerRef, headerVisible] = useReveal()
  const [gridRef, gridVisible] = useReveal()

  return (
    <section id="team" className="section team" aria-label="Team, Cem Sin, Gründer Sin Digital" aria-labelledby="team-heading">
      <div className="bg-accent" aria-hidden="true"></div>

      <div className="container">
        <div ref={headerRef} className={revealClass('team-header reveal', headerVisible)}>
          <span className="label-vertical" aria-hidden="true">Team</span>
          <div>
            <h2 id="team-heading" className="section-title">
              <span>{t.team.title1}</span><br />
              <span className="text-green">{t.team.title2}</span>
            </h2>
            <p className="section-desc">{t.team.desc}</p>
          </div>
        </div>

        <div
          ref={gridRef}
          className={revealClass('team-grid reveal reveal-delay-2', gridVisible)}
          role="list"
          aria-label="Sin Digital Team"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))', justifyContent: 'center' }}
        >
          <article className="team-member" data-delay="0" role="listitem" itemScope itemType="https://schema.org/Person">
            <div className="team-image">
              <img src="/assets/PortraitCem.webp" alt="Cem Sin, Gründer von Sin Digital Digitalagentur Zürich" loading="lazy" decoding="async" width="600" height="800" itemProp="image" />
              <div className="team-overlay" aria-hidden="true"></div>
            </div>
            <div className="team-info">
              <h3 itemProp="name">Cem Sin</h3>
              <p className="text-green" itemProp="jobTitle">{t.team.role}</p>
              <p className="team-bio" style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.7', marginTop: '0.75rem' }}>{t.team.bio}</p>
              <div className="team-line" aria-hidden="true"></div>
            </div>
          </article>
        </div>

        <div className="big-number" aria-hidden="true" inert="">01</div>
      </div>
    </section>
  )
}
