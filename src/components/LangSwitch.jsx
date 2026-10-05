import { STORAGE_KEY } from '../hooks/useLegalLang.js'

function remember(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // storage unavailable: the link still works
  }
}

// DE/EN switch: links to the other language version of the current page (`paths`).
// The choice is also stored so the legal pages open in the same language.
export default function LangSwitch({ lang, paths = { de: '/', en: '/en/' } }) {
  return (
    <div className="lang-switcher">
      <a href={paths.de} className={lang === 'de' ? 'lang-btn active' : 'lang-btn'} id="btn-de" hrefLang="de-CH" onClick={() => remember('de')}>DE</a>
      <a href={paths.en} className={lang === 'en' ? 'lang-btn active' : 'lang-btn'} id="btn-en" hrefLang="en" onClick={() => remember('en')}>EN</a>
    </div>
  )
}
