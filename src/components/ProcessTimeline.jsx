import { useEffect, useRef, useState } from 'react'
import useReveal, { revealClass } from '../hooks/useReveal.js'

// Where the progress line ends: a reference line at this share of the viewport height.
const REFERENCE = 0.5

// Six steps from first call to care, as a vertical timeline (styles in home.css).
//
// The grey track is drawn in CSS from dot to dot, so the prerendered page is complete
// without JavaScript. After hydration a green line grows from dot 01 down to the point
// where the reference line crosses the timeline (never past dot 06), via transform only.
// The active step is the last dot the green line has reached (aria-current="step").
// With prefers-reduced-motion nothing moves: the CSS shows the whole line green and no
// step is highlighted.
export default function ProcessTimeline({ t, careHref }) {
  const [revealRef, visible] = useReveal()
  const listRef = useRef(null)
  const fillRef = useRef(null)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    const list = listRef.current
    const fill = fillRef.current
    if (!list || !fill) return undefined
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let centers = [] // dot centres relative to the top of the list, in px
    let frame = 0
    let listening = false
    let lastActive = -1

    // Layout reads: only on mount and when the list changes size (resize, font swap).
    function measure() {
      const top = list.getBoundingClientRect().top
      centers = [...list.querySelectorAll('.timeline-dot')].map((dot) => {
        const rect = dot.getBoundingClientRect()
        return rect.top + rect.height / 2 - top
      })
      // The fill starts at dot 01 in CSS (top: 1rem); only its length is set here, which
      // never moves anything (it is still scaled to 0 at this point).
      const length = centers.length > 1 ? centers[centers.length - 1] - centers[0] : 0
      fill.style.height = `${length}px`
    }

    // Per frame: one rect read, one transform write, a state update only when the step changes.
    function update() {
      frame = 0
      if (centers.length < 2) return
      const reference = window.innerHeight * REFERENCE - list.getBoundingClientRect().top
      const total = centers[centers.length - 1] - centers[0]
      const length = Math.min(Math.max(reference - centers[0], 0), total)
      fill.style.transform = `scaleY(${total ? length / total : 0})`
      let next = -1
      if (reference >= centers[0]) {
        next = 0
        for (let i = 1; i < centers.length; i++) if (reference >= centers[i]) next = i
      }
      if (next !== lastActive) {
        lastActive = next
        setActive(next)
      }
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    function start() {
      if (listening) return
      listening = true
      window.addEventListener('scroll', schedule, { passive: true })
    }

    function stop() {
      if (!listening) return
      listening = false
      window.removeEventListener('scroll', schedule)
    }

    // Scroll work only while the timeline is in view; one last update on the way out so a
    // fast jump past it still ends on the right state.
    const intersection = new IntersectionObserver(([entry]) => {
      update()
      if (entry.isIntersecting) start()
      else stop()
    })
    const resize = new ResizeObserver(() => {
      measure()
      update()
    })

    function enable() {
      measure()
      update()
      intersection.observe(list)
      resize.observe(list)
    }

    function disable() {
      stop()
      intersection.disconnect()
      resize.disconnect()
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      lastActive = -1
      setActive(-1)
      fill.style.transform = ''
    }

    const onMotionChange = () => (motion.matches ? disable() : enable())
    if (!motion.matches) enable()
    motion.addEventListener('change', onMotionChange)

    return () => {
      motion.removeEventListener('change', onMotionChange)
      disable()
    }
  }, [])

  return (
    <div ref={revealRef} className={revealClass('prozess-section reveal timeline', visible)}>
      <span className="prozess-label">{t.label}</span>
      <h3 className="prozess-title">
        <span>{t.title1}</span>
        <br />
        <span className="text-green">{t.title2}</span>
      </h3>

      <ol ref={listRef} className="timeline-list">
        <li ref={fillRef} className="timeline-fill" aria-hidden="true"></li>
        {t.steps.map((step, i) => {
          const state = i === active ? ' is-active' : i < active ? ' is-passed' : ''
          return (
            <li key={step.name} className={`timeline-step${state}`} aria-current={i === active ? 'step' : undefined}>
              <span className="timeline-dot" aria-hidden="true"></span>
              <div className="timeline-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
              <div className="timeline-body">
                <div className="timeline-name">{step.name}</div>
                <p className="timeline-desc">
                  {step.desc}
                  {step.link && (
                    <>
                      {' '}
                      <a className="timeline-link" href={careHref}>{step.link}</a>
                    </>
                  )}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
