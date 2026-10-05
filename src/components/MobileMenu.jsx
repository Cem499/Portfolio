import { mainNav, navHref } from '../data/navigation.js'

export default function MobileMenu({ lang, shared, isHome, open, onClose }) {
  return (
    <div className={open ? 'mobile-menu open' : 'mobile-menu'} id="mobile-menu" aria-hidden={open ? 'false' : 'true'} inert={open ? undefined : ''}>
      <ul className="mobile-menu-links" role="menu">
        {mainNav.map((item) => (
          <li key={item.id} role="none">
            <a href={navHref(item, lang, isHome)} role="menuitem" className={item.cta ? 'mobile-link mobile-link-cta' : 'mobile-link'} onClick={onClose}>{shared.nav[item.id]}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
