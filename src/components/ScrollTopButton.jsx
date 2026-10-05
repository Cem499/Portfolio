import { useEffect, useState } from 'react'

// "Nach oben" button of the legal pages, shown after 400px of scrolling.
export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={visible ? 'scroll-top-btn visible' : 'scroll-top-btn'}
      id="scrollTopBtn"
      aria-label="Nach oben scrollen"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </button>
  )
}
