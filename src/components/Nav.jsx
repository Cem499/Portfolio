import { homePath, mainNav, navHref } from '../data/navigation.js'
import LangSwitch from './LangSwitch.jsx'

export default function Nav({ lang, shared, paths, isHome, menuOpen, onToggleMenu }) {
  return (
    <nav id="main-nav" role="navigation" aria-label="Hauptnavigation Sin Digital">
      <a href={homePath(lang)} className="nav-logo" title="Sin Digital, Digitalagentur Zürich">
        <img src="/assets/Logo_Sin-Digital.webp" alt="Sin Digital, Digitalagentur Zürich für Webdesign und Webentwicklung" width="160" height="44" fetchpriority="high" loading="eager" />
      </a>

      <div className="nav-right">
        <ul className="nav-links" role="menubar">
          {mainNav.map((item) => (
            <li key={item.id} role="none">
              <a href={navHref(item, lang, isHome)} role="menuitem" className={item.cta ? 'nav-link nav-link-cta' : 'nav-link'}>{shared.nav[item.id]}</a>
            </li>
          ))}
        </ul>
        <LangSwitch lang={lang} paths={paths} />
        <button
          className={menuOpen ? 'hamburger open' : 'hamburger'}
          id="hamburger"
          aria-label="Menü öffnen"
          aria-expanded={menuOpen ? 'true' : 'false'}
          aria-controls="mobile-menu"
          onClick={onToggleMenu}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  )
}
