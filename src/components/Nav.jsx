import LangSwitch from './LangSwitch.jsx'

export default function Nav({ t, lang, homePath, menuOpen, onToggleMenu }) {
  return (
    <nav id="main-nav" role="navigation" aria-label="Hauptnavigation Sin Digital">
      <a href={homePath} className="nav-logo" title="Sin Digital, Digitalagentur Zürich">
        <img src="/assets/Logo_Sin-Digital.webp" alt="Sin Digital, Digitalagentur Zürich für Webdesign und Webentwicklung" width="160" height="44" fetchpriority="high" loading="eager" />
      </a>

      <div className="nav-right">
        <ul className="nav-links" role="menubar">
          <li role="none"><a href="#team" role="menuitem" className="nav-link">{t.nav.team}</a></li>
          <li role="none"><a href="#projects" role="menuitem" className="nav-link">{t.nav.services}</a></li>
          <li role="none"><a href="#faq" role="menuitem" className="nav-link">{t.nav.faq}</a></li>
          <li role="none"><a href="#contact" role="menuitem" className="nav-link nav-link-cta">{t.nav.contact}</a></li>
        </ul>
        <LangSwitch lang={lang} />
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
