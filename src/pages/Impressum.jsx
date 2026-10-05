import LegalGrid from '../components/LegalGrid.jsx'
import LegalNav from '../components/LegalNav.jsx'
import ScrollTopButton from '../components/ScrollTopButton.jsx'
import Seo from '../components/Seo.jsx'
import useLegalLang from '../hooks/useLegalLang.js'
import '../styles/global.css'
import '../styles/impressum.css'

// impressum.html: prerendered in German, switches to English on the client (localStorage).
export default function Impressum() {
  const { lang, setLang, t, htmlLang } = useLegalLang()

  return (
    <>
      <Seo htmlAttributes={{ lang: htmlLang }}>
        <link rel="icon" type="image/webp" href="/assets/ICON-Logo_Sin-Digital.webp" />
        <title>{"Impressum | Sin Digital Agentur Zürich"}</title>
        <meta name="description" content="Impressum der Sin Digital Agentur Zürich. Angaben gemäss Schweizer Recht." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://www.sin-digital.com/impressum.html" />
      </Seo>
      <LegalNav lang={lang} setLang={setLang} t={t} />

      <main className="legal-page">
        <div className="container">
          <div className="legal-hero">
            <span className="legal-tag">{t("Rechtliches", "Legal Notice")}</span>
            <h1 className="legal-title">
              <span>{t("IMPRES", "LEGAL")}</span>
              <span className="text-green">{t("SUM", "NOTICE")}</span>
            </h1>
            <p className="legal-subtitle">
              {t("Angaben gemäss Art. 3 lit. s UWG (Schweizer Lauterkeitsrecht)", "Information pursuant to Art. 3 lit. s UCA (Swiss Unfair Competition Act)")}
            </p>
            <div className="legal-number" aria-hidden="true">§</div>
          </div>
          <div className="legal-divider"></div>
          <LegalGrid className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">{t("Anbieter", "Provider")}</span>
              <h2 className="legal-company-title">{t("Unternehmens\u00adangaben", "Company Details")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Verantwortlicher Betreiber", "Responsible Operator")}</h3>
              <address className="legal-address-block">
                <span className="legal-address-line">Sin Digital</span>
                {' '}
                <span className="legal-address-line">{t("Inhaber: Cem Sin", "Owner: Cem Sin")}</span>
                {' '}
                <span className="legal-address-line">{t("Schweiz", "Switzerland")}</span>
              </address>
              <div className="legal-highlight">
                <p>
                  <strong>{t("Rechtsform: Einzelunternehmen", "Legal form: Sole proprietorship")}</strong>
                </p>
              </div>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">{t("Kontakt", "Contact")}</span>
              <h2>{t("Erreich\u00adbarkeit", "Contact Details")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Kontaktdaten", "Contact Information")}</h3>
              <ul>
                <li>
                  <span>
                    <strong style={{ color: "#fff" }}>E-Mail:</strong>
                    {' '}
                    <a href="mailto:info@sin-digital.com">info@sin-digital.com</a>
                  </span>
                </li>
                <li>
                  <span>
                    <strong style={{ color: "#fff" }}>Website:</strong>
                    {' '}
                    <a href="https://www.sin-digital.com/" target="_blank" rel="noopener">www.sin-digital.com</a>
                  </span>
                </li>
              </ul>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">{t("Verantwortung", "Responsibility")}</span>
              <h2>{t("Inhalt\u00adlich Verant\u00adwortliche", "Editorial Responsibility")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Verantwortlich für redaktionellen Inhalt", "Responsible for editorial content")}</h3>
              <p>Cem Sin</p>
              <p>
                {t("Verantwortlich für den Inhalt dieser Website gemäss Schweizer Recht: Cem Sin, Sin Digital, Zürich.", "Responsible for the content of this website under Swiss law: Cem Sin, Sin Digital, Zürich.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">{t("Haftung", "Liability")}</span>
              <h2>{t("Haftungs\u00adausschluss", "Liability Disclaimer")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Haftung für Inhalte", "Liability for Content")}</h3>
              <p>
                {t("Als Anbieter dieser Website sind wir für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.", "As the provider of this website, we are responsible for our own content in accordance with general laws. However, we are not obliged to monitor transmitted or stored third-party information.")}
              </p>
              <p>
                {t("Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.", "Obligations to remove or block the use of information under general laws remain unaffected. Liability in this regard is only possible from the point in time at which a specific legal infringement becomes known.")}
              </p>
              <h3>{t("Haftung für Links", "Liability for Links")}</h3>
              <p>
                {t("Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.", "Our website contains links to external third-party websites over whose content we have no influence. We therefore cannot accept any liability for this third-party content. The respective provider or operator of the linked pages is always responsible for their content.")}
              </p>
              <p>
                {t("Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstösse überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.", "The linked pages were checked for possible legal violations at the time of linking. No illegal content was apparent at the time of linking. Upon becoming aware of legal infringements, we will remove such links immediately.")}
              </p>
              <h3>{t("Urheberrecht", "Copyright")}</h3>
              <p>
                {t("Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem Schweizer Urheberrecht (URG). Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.", "The content and works created by the site operator on this website are subject to Swiss copyright law (URG). Reproduction, editing, distribution and any form of exploitation beyond the limits of copyright law require the written consent of the respective author or creator.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">{t("Streitbeilegung", "Dispute Resolution")}</span>
              <h2>{t("Streit\u00adschlich\u00adtung", "Dispute Settlement")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Aussergerichtliche Streitbeilegung", "Out-of-Court Dispute Resolution")}</h3>
              <p>
                {t("Sin Digital ist nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Bei Streitigkeiten gilt Schweizer Recht mit Gerichtsstand Zürich.", "Sin Digital is not obliged and not willing to participate in dispute resolution proceedings before a consumer arbitration board. In the event of disputes, Swiss law applies with the place of jurisdiction being Zurich.")}
              </p>
            </div>
          </LegalGrid>
          <footer className="footer-legal" role="contentinfo">
            <p>
              {t("© 2026 Sin Digital Agentur Zürich. Alle Rechte vorbehalten.", "© 2026 Sin Digital Agency Zürich. All rights reserved.")}
            </p>
            <nav className="footer-links" aria-label="Rechtliche Links">
              <a href="impressum.html">{t("Impressum", "Imprint")}</a>
              {' '}
              <a href="datenschutz.html">{t("Datenschutz", "Privacy Policy")}</a>
              {' '}
              <a href="agb.html">{t("AGB", "T&C")}</a>
            </nav>
          </footer>
        </div>
      </main>

      <ScrollTopButton />

      <div style={{ position: "fixed", top: "20%", right: "-5%", width: "30rem", height: "30rem", borderRadius: "50%", background: "#C1FF72", opacity: "0.02", filter: "blur(100px)", pointerEvents: "none", zIndex: "0" }} aria-hidden="true"></div>
      <div style={{ position: "fixed", bottom: "10%", left: "-5%", width: "20rem", height: "20rem", borderRadius: "50%", background: "#C1FF72", opacity: "0.02", filter: "blur(100px)", pointerEvents: "none", zIndex: "0" }} aria-hidden="true"></div>
    </>
  )
}
