import useReveal, { revealClass } from '../hooks/useReveal.js'
import ReviewsCarousel from './ReviewsCarousel.jsx'

const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/place/Sin+Digital/@47.4009377,8.4082974,10z/data=!4m8!3m7!1s0xfb5425956d5fd7:0x5a64c84bb9485552!8m2!3d47.3774417!4d8.5367356!9m1!1b1!16s%2Fg%2F11z1yv_130?entry=ttu&g_ep=EgoyMDI2MDMwNS4wIKXMDSoASAFQAw%3D%3D'

export default function Reviews({ t }) {
  const [headerRef, headerVisible] = useReveal()
  const [sectionRef, sectionVisible] = useReveal()
  const [actionsRef, actionsVisible] = useReveal()

  return (
    <section id="reviews" className="section reviews" aria-label="Kundenbewertungen für Sin Digital">
      <div className="container">
        <header ref={headerRef} className={revealClass('faq-header reveal', headerVisible)}>
          <span className="label">{t.reviews.label}</span>
          <h2 className="section-title">
            <span>{t.reviews.title1}</span><br />
            <span className="text-green">{t.reviews.title2}</span>
          </h2>
          <p className="reviews-intro">{t.reviews.intro}</p>
        </header>

        <section ref={sectionRef} className={revealClass('reviews-section reveal reveal-delay-1', sectionVisible)} aria-label="Kundenbewertungen Sin Digital">
          <ReviewsCarousel reviews={t.reviews.items} />
        </section>
        <div ref={actionsRef} className={revealClass('reviews-actions reveal reveal-delay-2', actionsVisible)}>
          <a className="reviews-google-btn" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">{t.reviews.googleButton}</a>
        </div>
      </div>
    </section>
  )
}
