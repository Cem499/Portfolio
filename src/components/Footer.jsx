// Footer inside the contact section. Legal links are absolute so they also work from /en/.
export default function Footer({ t }) {
  return (
    <footer className="footer" role="contentinfo" itemScope itemType="https://schema.org/WPFooter">
      <p>{t.footer.copyright}</p>
      <nav className="footer-links" aria-label="Rechtliche Links Sin Digital">
        <a href="/impressum.html" title="Impressum von Sin Digital, Webdesign Agentur Zürich">{t.footer.imprint}</a>
        {' '}
        <a href="/datenschutz.html" title="Datenschutzerklärung Sin Digital Zürich">{t.footer.privacy}</a>
        {' '}
        <a href="/agb.html" title="AGB Sin Digital, Webdesign Zürich">{t.footer.terms}</a>
      </nav>
    </footer>
  )
}
