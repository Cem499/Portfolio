import useReveal, { revealClass } from '../hooks/useReveal.js'
import ContactForm from './ContactForm.jsx'
import Footer from './Footer.jsx'

const MAPS_URL = 'https://www.google.com/maps/place/Sin+Digital/@47.4009377,8.4082974,10.9z/data=!4m8!3m7!1s0xfb5425956d5fd7:0x5a64c84bb9485552!8m2!3d47.3774417!4d8.5367356!9m1!1b1!16s%2Fg%2F11z1yv_130?entry=ttu&g_ep=EgoyMDI2MDMwNS4wIKXMDSoASAFQAw%3D%3D'

export default function Contact({ t, shared, lang }) {
  const c = t.contact
  const [headerRef, headerVisible] = useReveal()
  const [formRef, formVisible] = useReveal()
  const [infoRef, infoVisible] = useReveal()

  return (
    <section id="contact" className="section contact" aria-label="Kontakt, Projekt anfragen bei Sin Digital" aria-labelledby="contact-heading">
      <div className="rotating-circle" aria-hidden="true"></div>

      <div className="container">
        <header ref={headerRef} className={revealClass('contact-header reveal', headerVisible)}>
          <h2 id="contact-heading" className="contact-title">
            LET&apos;S<br />
            <span className="text-green">TALK</span>
          </h2>
          <p className="contact-subtitle">{c.subtitle}</p>
          <p className="contact-details-text" style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.7', maxWidth: '40rem', margin: '1rem auto 0' }}>{c.details}</p>
        </header>

        <div className="contact-grid">
          <div ref={formRef} className={revealClass('contact-form-wrapper reveal', formVisible)}>
            <ContactForm texts={shared.contactForm} />
          </div>

          <div ref={infoRef} className={revealClass('contact-info reveal reveal-delay-2', infoVisible)} itemScope itemType="https://schema.org/Organization">
            <meta itemProp="name" content="Sin Digital" />
            <meta itemProp="url" content="https://www.sin-digital.com" />

            <div className="contact-detail">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div>
                <p className="detail-label">{c.locationLabel}</p>
                <address itemProp="address" itemScope itemType="https://schema.org/PostalAddress" style={{ fontStyle: 'normal', color: '#ffffff' }}>
                  <span itemProp="addressLocality">Zürich</span><span aria-hidden="true">, </span><span itemProp="addressCountry">Schweiz</span>
                </address>
              </div>
            </div>

            <div className="contact-detail">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <div>
                <p className="detail-label">{c.phoneLabel}</p>
                <a href="tel:+41783187887" itemProp="telephone">+41 78 318 78 87</a>
              </div>
            </div>

            <div className="contact-detail">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-10 6L2 7"></path>
              </svg>
              <div>
                <p className="detail-label">{c.emailLabel}</p>
                <a href="mailto:info@sin-digital.com" itemProp="email">info@sin-digital.com</a>
              </div>
            </div>

            <div className="social-section">
              <p className="detail-label">{c.followLabel}</p>
              <nav className="social-links" aria-label="Sin Digital Social Media Links">
                <a href="https://www.instagram.com/sindigitalarchitects/" className="social-link" title="Sin Digital auf Instagram" rel="noopener noreferrer me" target="_blank" aria-label="Sin Digital auf Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                {' '}
                <a href="https://www.tiktok.com/@sindigitalarchitects?_r=1&_t=ZG-94KWF34B13R" className="social-link" title="Sin Digital auf TikTok" rel="noopener noreferrer me" target="_blank" aria-label="Sin Digital auf TikTok">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16.6 5.82c1.15.82 2.49 1.3 3.89 1.38v2.74a8.63 8.63 0 0 1-3.89-.93v5.62a6.16 6.16 0 1 1-6.16-6.16c.32 0 .64.03.95.08v2.79a3.33 3.33 0 1 0 2.37 3.19V3.5h2.84v2.32Z"></path>
                  </svg>
                </a>
                {' '}
                <a href={MAPS_URL} className="social-link" title="Sin Digital auf Google Maps" rel="noopener noreferrer" target="_blank" aria-label="Sin Digital auf Google Maps">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10Z"></path>
                    <circle cx="12" cy="11" r="2.5"></circle>
                  </svg>
                </a>
              </nav>
            </div>

            <div className="contact-big-number" aria-hidden="true" inert="">04</div>
          </div>
        </div>

        <Footer shared={shared} lang={lang} />
      </div>

      <div className="bottom-line" aria-hidden="true"></div>
    </section>
  )
}
