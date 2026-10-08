import { useEffect } from 'react'

const NAV_HEIGHT = 70

// Smooth scroll for in-page "#" links with the fixed nav offset, like script.js.
// Uses one delegated listener instead of binding every anchor.
export default function useSmoothScroll() {
  useEffect(() => {
    function onClick(e) {
      const anchor = e.target.closest?.('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (href === '#' || href === '#!') return
      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
        window.scrollTo({ top, behavior: 'smooth' })
        // Keep the hash in the URL (no history entry) and tell listeners such as the contact
        // form, which prefills for #contact-<paket>; a native jump would skip the nav offset.
        if (window.location.hash !== href) {
          const oldURL = window.location.href
          window.history.replaceState(window.history.state, '', href)
          window.dispatchEvent(new HashChangeEvent('hashchange', { oldURL, newURL: window.location.href }))
        }
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
