import { STORAGE_KEY } from '../hooks/useLegalLang.js'

function remember(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // storage unavailable: the link still works
  }
}

// DE/EN switch of the home page: links between / and /en/. The choice is also stored
// so the legal pages open in the same language.
export default function LangSwitch({ lang }) {
  return (
    <div className="lang-switcher">
      <a href="/" className={lang === 'de' ? 'lang-btn active' : 'lang-btn'} id="btn-de" hrefLang="de-CH" onClick={() => remember('de')}>DE</a>
      <a href="/en/" className={lang === 'en' ? 'lang-btn active' : 'lang-btn'} id="btn-en" hrefLang="en" onClick={() => remember('en')}>EN</a>
    </div>
  )
}
