// Copyright, the website check and the legal links. On the start page it sits inside the
// contact section, subpages wrap it in SiteFooter. Links are absolute so they also work from /en/.
export default function Footer({ shared, lang = 'de' }) {
  return (
    <footer className="footer" role="contentinfo" itemScope itemType="https://schema.org/WPFooter">
      <p>{shared.footer.copyright}</p>
      <nav className="footer-links" aria-label="Rechtliche Links Sin Digital">
        <a href={lang === 'en' ? '/en/website-check/' : '/website-check/'}>{shared.footer.websiteCheck}</a>
        {' '}
        <a href="/impressum.html" title="Impressum von Sin Digital, Webdesign Agentur Zürich">{shared.footer.imprint}</a>
        {' '}
        <a href="/datenschutz.html" title="Datenschutzerklärung Sin Digital Zürich">{shared.footer.privacy}</a>
        {' '}
        <a href="/agb.html" title="AGB Sin Digital, Webdesign Zürich">{shared.footer.terms}</a>
      </nav>
    </footer>
  )
}
