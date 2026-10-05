import { useEffect, useState } from 'react'
import MobileMenu from './MobileMenu.jsx'
import Nav from './Nav.jsx'

// Skip link, fixed nav and mobile menu, shared by the start page and the subpages.
// `paths` are the DE/EN URLs of the current page (for the language switch).
export default function SiteHeader({ lang, shared, paths, isHome = false }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Mobile menu side effects: body scroll lock and Escape to close.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
        style={{ position: 'absolute', left: '-9999px', top: '0', zIndex: '9999', padding: '8px 16px', background: '#C1FF72', color: '#010101', fontWeight: '700', borderRadius: '0 0 8px 0' }}
      >
        {shared.skipLink}
      </a>

      <Nav lang={lang} shared={shared} paths={paths} isHome={isHome} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />

      <MobileMenu lang={lang} shared={shared} isHome={isHome} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
