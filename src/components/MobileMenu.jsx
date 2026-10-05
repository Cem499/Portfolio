export default function MobileMenu({ t, open, onClose }) {
  return (
    <div className={open ? 'mobile-menu open' : 'mobile-menu'} id="mobile-menu" aria-hidden={open ? 'false' : 'true'} inert={open ? undefined : ''}>
      <ul className="mobile-menu-links" role="menu">
        <li role="none"><a href="#team" role="menuitem" className="mobile-link" onClick={onClose}>{t.nav.team}</a></li>
        <li role="none"><a href="#projects" role="menuitem" className="mobile-link" onClick={onClose}>{t.nav.services}</a></li>
        <li role="none"><a href="#faq" role="menuitem" className="mobile-link" onClick={onClose}>{t.nav.faq}</a></li>
        <li role="none"><a href="#contact" role="menuitem" className="mobile-link mobile-link-cta" onClick={onClose}>{t.nav.contact}</a></li>
      </ul>
    </div>
  )
}
