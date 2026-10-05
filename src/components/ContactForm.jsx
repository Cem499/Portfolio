import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Turnstile from './Turnstile.jsx'

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

// Status box colours and messages are taken over unchanged (messages are German-only on both languages).
const STATUS_BASE = { padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }
const STATUS_COLORS = {
  success: { background: 'rgba(193, 255, 114, 0.15)', color: '#C1FF72', border: '1px solid rgba(193,255,114,0.5)' },
  error: { background: 'rgba(255, 100, 100, 0.15)', color: '#ff6464', border: '1px solid rgba(255,100,100,0.5)' },
}
const SUCCESS_HIDE_MS = 8000

// Set by the inline loader in vite.config.js when the form was submitted before React took over.
const PENDING_SUBMIT_KEY = '__pendingSubmit'
const PENDING_HINT_ID = 'pending-submit-hint'
// How long a submit from before hydration waits for the Turnstile token before it is sent anyway
// (it then shows the usual "kein Bot" message, as on a normal submit without token).
const PENDING_TOKEN_WAIT_MS = 8000

const EMPTY = { name: '', email: '', subject: '', message: '', privacyConsent: false }

// The page is prerendered; hydrating the controlled inputs would wipe whatever a visitor typed
// before the JavaScript arrived. On the first client render, start from the values in the DOM.
function initialValues() {
  if (typeof document === 'undefined') return EMPTY
  const form = document.getElementById('contactForm')
  if (!form) return EMPTY
  const field = (name) => form.elements.namedItem(name)
  return {
    name: field('name').value,
    email: field('email').value,
    subject: field('subject').value,
    message: field('message').value,
    privacyConsent: field('privacyConsent').checked,
  }
}

// First three checks of the original, in the original order.
function fieldError(values) {
  if (!values.name.trim() || !values.email.trim() || !values.message.trim()) return 'Bitte fülle alle Pflichtfelder aus (Name, E-Mail, Nachricht).'
  if (!values.privacyConsent) return 'Bitte stimme der Datenschutzerklärung zu.'
  if (values.message.trim().length < 10) return 'Die Nachricht muss mindestens 10 Zeichen lang sein.'
  return null
}

let emailjsReady = false

export default function ContactForm({ t }) {
  const f = t.contact.form
  const [values, setValues] = useState(initialValues)
  const [status, setStatus] = useState({ visible: false, message: '', type: null })
  const [sending, setSending] = useState(false)
  const [pendingSubmit, setPendingSubmit] = useState(false)
  const formRef = useRef(null)
  const turnstileRef = useRef(null)
  const hideTimersRef = useRef([])
  const sendPendingRef = useRef(null)

  useEffect(() => () => hideTimersRef.current.forEach(clearTimeout), [])

  // A submit from before hydration: pick it up once React is in control.
  useEffect(() => {
    if (window[PENDING_SUBMIT_KEY] === formRef.current) {
      delete window[PENDING_SUBMIT_KEY]
      setPendingSubmit(true)
    }
  }, [])

  useEffect(() => {
    if (!pendingSubmit) return undefined
    const form = formRef.current
    let timer = null
    const send = () => {
      clearTimeout(timer)
      sendPendingRef.current = null
      document.getElementById(PENDING_HINT_ID)?.remove()
      setPendingSubmit(false)
      if (form.requestSubmit) form.requestSubmit()
      else form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    }
    // Field errors show right away; a valid form waits for Turnstile to hand out its token.
    if (fieldError(values) || turnstileRef.current?.getResponse()) {
      send()
    } else {
      sendPendingRef.current = send
      timer = setTimeout(send, PENDING_TOKEN_WAIT_MS)
    }
    return () => clearTimeout(timer)
    // runs once per pending submit with the values that were synced on hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingSubmit])

  function showStatus(message, type) {
    setStatus({ visible: true, message, type })
    if (type === 'success') {
      hideTimersRef.current.push(setTimeout(() => setStatus((s) => ({ ...s, visible: false })), SUCCESS_HIDE_MS))
    }
  }

  function update(e) {
    const { name, type, checked, value } = e.target
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
  }

  async function onSubmit(e) {
    e.preventDefault()

    if (!emailjsReady) {
      emailjs.init(EMAILJS_PUBLIC_KEY)
      emailjsReady = true
    }

    const error = fieldError(values)
    if (error) {
      showStatus(error, 'error')
      return
    }

    const cfToken = turnstileRef.current ? turnstileRef.current.getResponse() : ''
    if (!cfToken) {
      showStatus('Bitte bestätige, dass du kein Bot bist.', 'error')
      return
    }

    const email = values.email.trim()
    setSending(true)
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: values.name.trim(),
        from_email: email,
        email,
        subject: values.subject.trim() || 'Keine Angabe',
        message: values.message.trim(),
      })

      showStatus('Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.', 'success')
      setValues(EMPTY)
      turnstileRef.current?.reset()
    } catch (error) {
      console.error('EmailJS error:', error)
      showStatus('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.', 'error')
    } finally {
      setSending(false)
    }
  }

  const statusStyle = status.type
    ? { display: status.visible ? 'block' : 'none', ...STATUS_BASE, ...STATUS_COLORS[status.type] }
    : { display: 'none', ...STATUS_BASE }

  return (
    <form ref={formRef} className="contact-form" id="contactForm" noValidate aria-label="Kontaktformular Sin Digital" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="contact-name">{f.nameLabel}</label>
        {' '}
        <input type="text" id="contact-name" name="name" placeholder={f.namePlaceholder} required autoComplete="name" value={values.name} onChange={update} />
      </div>
      <div className="form-group">
        <label htmlFor="contact-email">{f.emailLabel}</label>
        {' '}
        <input type="email" id="contact-email" name="email" placeholder="Fritz.Muster@gmail.com" required autoComplete="email" value={values.email} onChange={update} />
      </div>
      <div className="form-group">
        <label htmlFor="contact-subject">{f.subjectLabel}</label>
        {' '}
        <input type="text" id="contact-subject" name="subject" placeholder={f.subjectPlaceholder} autoComplete="off" value={values.subject} onChange={update} />
      </div>
      <div className="form-group">
        <label htmlFor="contact-message">{f.messageLabel}</label>
        {' '}
        <textarea id="contact-message" name="message" rows="6" placeholder={f.messagePlaceholder} required value={values.message} onChange={update}></textarea>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.5rem' }}>
        <input type="checkbox" id="privacy-consent" name="privacyConsent" required style={{ accentColor: '#C1FF72', width: '16px', height: '16px', flexShrink: '0', cursor: 'pointer' }} checked={values.privacyConsent} onChange={update} />
        <label htmlFor="privacy-consent" style={{ color: '#9ca3af', fontSize: '0.82rem', lineHeight: '1.6', cursor: 'pointer', margin: '0' }}>
          {f.privacyBefore}<a href="/datenschutz.html" target="_blank" rel="noopener" style={{ color: '#C1FF72', textDecoration: 'underline' }}>{f.privacyLink}</a>{f.privacyAfter}
        </label>
      </div>

      <Turnstile ref={turnstileRef} onToken={() => sendPendingRef.current?.()} />

      <div id="form-status" role="alert" aria-live="polite" style={statusStyle}>{status.message}</div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '0.78rem', borderRadius: '6px' }} disabled={sending}>
          {sending ? 'Wird gesendet...' : f.submit}
        </button>
      </div>
    </form>
  )
}
