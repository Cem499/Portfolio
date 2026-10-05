import useReveal, { revealClass } from '../hooks/useReveal.js'

const LEGAL_REVEAL = { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }

// A section of the legal pages (.legal-grid) that fades in on scroll.
export default function LegalGrid({ className, children, ...rest }) {
  const [ref, visible] = useReveal(LEGAL_REVEAL)
  return (
    <div ref={ref} className={revealClass(className, visible)} {...rest}>
      {children}
    </div>
  )
}
