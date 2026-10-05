import { useCallback, useEffect, useRef, useState } from 'react'

const AUTO_DELAY = 3500

function ReviewCard({ review, clone }) {
  return (
    <article className="review-card" data-clone={clone ? '' : undefined} aria-hidden={clone ? 'true' : undefined}>
      <p className="review-stars" aria-label="5 von 5 Sternen">★★★★★</p>
      <p className="review-text">{review.text}</p>
      <p className="review-author">{review.author}</p>
    </article>
  )
}

// Endless loop: [clones][originals][clones], start on the first original. After a slide
// lands in a clone block, jump without animation to the matching original.
export default function ReviewsCarousel({ reviews }) {
  const n = reviews.length
  const trackRef = useRef(null)
  const idxRef = useRef(n)
  const lockedRef = useRef(false)
  const autoTimerRef = useRef(null)
  const [track, setTrack] = useState(null) // { offset, animate } once measured

  const cardStep = useCallback(() => {
    const el = trackRef.current
    const card = el?.children[0]
    if (!card) return 0
    const gap = parseFloat(getComputedStyle(el).gap) || 0
    return card.getBoundingClientRect().width + gap
  }, [])

  const moveTo = useCallback((i, animate) => {
    idxRef.current = i
    setTrack({ offset: i * cardStep(), animate })
  }, [cardStep])

  const next = useCallback(() => {
    if (lockedRef.current) return
    lockedRef.current = true
    moveTo(idxRef.current + 1, true)
  }, [moveTo])

  const prev = useCallback(() => {
    if (lockedRef.current) return
    lockedRef.current = true
    moveTo(idxRef.current - 1, true)
  }, [moveTo])

  const stopAuto = useCallback(() => {
    clearInterval(autoTimerRef.current)
    autoTimerRef.current = null
  }, [])

  const startAuto = useCallback(() => {
    stopAuto()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    autoTimerRef.current = setInterval(() => {
      if (!document.hidden) next()
    }, AUTO_DELAY)
  }, [next, stopAuto])

  function onTransitionEnd() {
    lockedRef.current = false
    const idx = idxRef.current
    if (idx >= 2 * n) moveTo(idx - n, false)
    else if (idx < n) moveTo(idx + n, false)
  }

  useEffect(() => {
    let resizeTimer = null
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => moveTo(idxRef.current, false), 150)
    }
    const onVisibility = () => (document.hidden ? stopAuto() : startAuto())
    // Re-measure once all assets are loaded, like the original init on window "load".
    const onLoad = () => moveTo(idxRef.current, false)

    moveTo(n, false)
    startAuto()
    window.addEventListener('resize', onResize)
    window.addEventListener('load', onLoad)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stopAuto()
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', onLoad)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [n, moveTo, startAuto, stopAuto])

  const trackStyle = track
    ? { transition: track.animate ? 'transform 0.45s ease' : 'none', transform: `translateX(-${track.offset}px)` }
    : undefined

  return (
    <div className="reviews-carousel" id="reviews-carousel" onMouseEnter={stopAuto} onMouseLeave={startAuto} onTouchStart={stopAuto} onTouchEnd={startAuto}>
      <button className="reviews-nav reviews-nav-prev" type="button" aria-label="Vorherige Bewertung" onClick={() => { prev(); startAuto() }}>‹</button>
      <div className="reviews-viewport">
        <div className="reviews-list" id="reviews-list" ref={trackRef} style={trackStyle} onTransitionEnd={onTransitionEnd}>
          {reviews.map((review, i) => <ReviewCard key={`before-${i}`} review={review} clone />)}
          {reviews.map((review, i) => <ReviewCard key={`orig-${i}`} review={review} />)}
          {reviews.map((review, i) => <ReviewCard key={`after-${i}`} review={review} clone />)}
        </div>
      </div>
      <button className="reviews-nav reviews-nav-next" type="button" aria-label="Nächste Bewertung" onClick={() => { next(); startAuto() }}>›</button>
    </div>
  )
}
