import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
const SITEKEY = import.meta.env.VITE_TURNSTILE_SITEKEY

let scriptPromise = null

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true
      script.defer = true
      script.onload = () => resolve(window.turnstile)
      script.onerror = reject
      document.head.appendChild(script)
    })
  }
  return scriptPromise
}

// Cloudflare Turnstile widget. The script is only requested by the page that renders
// this component (the home page) and the widget is rendered after mount, so the
// prerendered markup stays an empty container and hydration is untouched.
const Turnstile = forwardRef(function Turnstile({ onToken }, ref) {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)
  const onTokenRef = useRef(onToken)
  onTokenRef.current = onToken

  useImperativeHandle(ref, () => ({
    getResponse() {
      if (widgetIdRef.current == null || !window.turnstile) return ''
      return window.turnstile.getResponse(widgetIdRef.current) || ''
    },
    reset() {
      if (widgetIdRef.current != null && window.turnstile) window.turnstile.reset(widgetIdRef.current)
    },
  }), [])

  useEffect(() => {
    let cancelled = false
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return
        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: SITEKEY,
          theme: 'dark',
          language: 'de',
          callback: (token) => onTokenRef.current?.(token),
        })
      })
      .catch((error) => console.error('Turnstile konnte nicht geladen werden:', error))
    return () => {
      cancelled = true
      if (widgetIdRef.current != null && window.turnstile) window.turnstile.remove(widgetIdRef.current)
      widgetIdRef.current = null
    }
  }, [])

  return <div ref={containerRef} className="cf-turnstile" data-sitekey={SITEKEY} data-theme="dark" data-language="de" style={{ marginTop: '0.5rem' }}></div>
})

export default Turnstile
