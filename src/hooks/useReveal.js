import { useEffect, useRef, useState } from 'react'

// Same observer options as the original script.js (decided once per element on mount).
function defaultOptions() {
  return window.innerWidth <= 768
    ? { threshold: 0.01, rootMargin: '0px 0px 50px 0px' }
    : { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
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
