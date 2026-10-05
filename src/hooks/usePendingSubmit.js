import { useEffect, useRef, useState } from 'react'

// Set by the inline loader in vite.config.js when a form was submitted before React took over.
const PENDING_SUBMIT_KEY = '__pendingSubmit'
const PENDING_HINT_ID = 'pending-submit-hint'
const DEFAULT_WAIT_MS = 8000

// What a visitor typed into a prerendered form before the JavaScript arrived.
// Use as useState initialiser so hydration doesn't wipe it.
export function valuesFromDom(formId, defaults) {
  if (typeof document === 'undefined') return defaults
  const form = document.getElementById(formId)
  if (!form) return defaults
  const values = { ...defaults }
  for (const name of Object.keys(defaults)) {
    const field = form.elements.namedItem(name)
    if (!field) continue
    values[name] = typeof defaults[name] === 'boolean' ? field.checked : field.value
  }
  return values
}

// Picks up a submit that happened before hydration and sends the form through React.
// `canSubmit` can hold it back (e.g. until a Turnstile token exists); `release()` sends it
// early, otherwise it goes after `waitMs` anyway.
export default function usePendingSubmit(formRef, { canSubmit, waitMs = DEFAULT_WAIT_MS } = {}) {
  const [pending, setPending] = useState(false)
  const releaseRef = useRef(null)

  useEffect(() => {
    if (window[PENDING_SUBMIT_KEY] === formRef.current) {
      delete window[PENDING_SUBMIT_KEY]
      setPending(true)
    }
  }, [formRef])

  useEffect(() => {
    if (!pending) return undefined
    const form = formRef.current
    let timer = null
    const send = () => {
      clearTimeout(timer)
      releaseRef.current = null
      document.getElementById(PENDING_HINT_ID)?.remove()
      setPending(false)
      if (form.requestSubmit) form.requestSubmit()
      else form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    }
    if (!canSubmit || canSubmit()) {
      send()
    } else {
      releaseRef.current = send
      timer = setTimeout(send, waitMs)
    }
    return () => clearTimeout(timer)
    // runs once per pending submit, with the values synced on hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending])

  return { pending, release: () => releaseRef.current?.() }
}
