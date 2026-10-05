import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'sindigital-lang'

// Client-side DE/EN switch of the legal pages. Prerendered in German; the stored
// choice (also written by the home page language links) is applied after mount.
// The page passes `htmlLang` to <Seo> so <html lang> follows the switch.
export default function useLegalLang() {
  const [lang, setLangState] = useState('de')

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === 'en') setLangState('en')
    } catch {
      // storage unavailable: stay German
    }
  }, [])

  const setLang = useCallback((next) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  const t = useCallback((de, en) => (lang === 'en' ? en : de), [lang])

  return { lang, setLang, t, htmlLang: lang === 'en' ? 'en' : 'de-CH' }
}

export { STORAGE_KEY }
