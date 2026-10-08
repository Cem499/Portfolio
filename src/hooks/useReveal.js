import { useEffect, useRef, useState } from 'react'

// Observer options, decided once per element on mount. A block is revealed as soon as it peeks
// into the viewport (the original script.js wanted 12 % on desktop: after "Leistungen" in the
// nav the tall package grid showed only ~7 %, so the packages stayed invisible until the next
// scroll). Desktop keeps the 40 px margin below the fold, mobile reveals a little early.
function defaultOptions() {
  return window.innerWidth <= 768
    ? { threshold: 0.01, rootMargin: '0px 0px 50px 0px' }
    : { threshold: 0.01, rootMargin: '0px 0px -40px 0px' }
}

// Adds the "visible" class once the element scrolls into view, then stops observing.
export default function useReveal(options) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      })
    }, options || defaultOptions())
    observer.observe(el)
    return () => observer.disconnect()
    // options are constant per call site
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, visible]
}

export function revealClass(base, visible) {
  return visible ? `${base} visible` : base
}
