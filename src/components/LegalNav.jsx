// Navigation of the legal pages: logo, "Zurück" link and the client-side DE/EN switch.
// "Zurück" leads to the English start page when English is the stored language.
export default function LegalNav({ lang, setLang, t }) {
  return (
    <nav id="main-nav" role="navigation" aria-label="Hauptnavigation">
      <a href="/" className="nav-logo" title="Sin Digital Agentur Zürich">
        <img src="/assets/Logo_Sin-Digital.webp" alt="Sin Digital Agentur Zürich" width="160" height="44" fetchpriority="high" />
      </a>
      <div className="nav-right">
        <a href={lang === 'en' ? '/en/' : '/'} className="nav-back">← <span>{t('Zurück', 'Back')}</span></a>
        <div className="lang-switcher">
          <button className={lang === 'de' ? 'lang-btn active' : 'lang-btn'} id="btn-de" onClick={() => setLang('de')}>DE</button>
          <button className={lang === 'en' ? 'lang-btn active' : 'lang-btn'} id="btn-en" onClick={() => setLang('en')}>EN</button>
        </div>
      </div>
    </nav>
  )
}
