import LegalGrid from '../components/LegalGrid.jsx'
import LegalNav from '../components/LegalNav.jsx'
import ScrollTopButton from '../components/ScrollTopButton.jsx'
import Seo from '../components/Seo.jsx'
import useLegalLang from '../hooks/useLegalLang.js'
import '../styles/global.css'
import '../styles/datenschutz.css'

// datenschutz.html: prerendered in German, switches to English on the client (localStorage).
export default function Datenschutz() {
  const { lang, setLang, t, htmlLang } = useLegalLang()

  return (
    <>
      <Seo htmlAttributes={{ lang: htmlLang }}>
        <title>{"Datenschutzerklärung | Sin Digital Agentur Zürich"}</title>
        <link rel="icon" type="image/webp" href="/assets/ICON-Logo_Sin-Digital.webp" />
        <meta name="description" content="Datenschutzerklärung der Sin Digital Agentur Zürich gemäss Schweizer DSG." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://www.sin-digital.com/datenschutz.html" />
      </Seo>
      <LegalNav lang={lang} setLang={setLang} t={t} />

      <main className="legal-page">
        <div className="container">
          <div className="legal-hero">
            <span className="legal-tag">{t("DSG-Konform", "FADP-Compliant")}</span>
            <h1 className="legal-title">
              <span>{t("DATEN", "DATA")}</span>
              <span className="text-green">{t("SCHUTZ", "PRIVACY")}</span>
            </h1>
            <p className="legal-subtitle">
              {t("Transparente Information über die Verarbeitung Ihrer personenbezogenen Daten gemäss Schweizer Datenschutzgesetz (DSG).", "Transparent information about the processing of your personal data in accordance with the Swiss Federal Act on Data Protection (FADP).")}
            </p>
            <p style={{ color: "#6b7280", marginTop: "1rem", fontSize: "0.85rem", opacity: "0", animation: "fadeSlideUp 0.6s ease forwards 0.5s" }}>{t("Stand: Februar 2026", "As of: February 2026")}</p>
          </div>
          <nav className="toc" aria-label="Inhaltsverzeichnis">
            <a href="#verantwortlicher" className="toc-link">{t("Verantwortlicher", "Controller")}</a>
            {' '}
            <a href="#erhebung" className="toc-link">{t("Datenerhebung", "Data Collection")}</a>
            {' '}
            <a href="#zweck" className="toc-link">{t("Verarbeitungszwecke", "Purposes")}</a>
            {' '}
            <a href="#rechtsgrundlagen" className="toc-link">{t("Rechtsgrundlagen", "Legal Basis")}</a>
            {' '}
            <a href="#empfaenger" className="toc-link">{t("Empfänger", "Recipients")}</a>
            {' '}
            <a href="#speicherung" className="toc-link">{t("Speicherdauer", "Retention")}</a>
            {' '}
            <a href="#rechte" className="toc-link">{t("Ihre Rechte", "Your Rights")}</a>
            {' '}
            <a href="#cookies" className="toc-link">{t("Cookies", "Cookies")}</a>
            {' '}
            <a href="#tools" className="toc-link">{t("Externe Dienste", "External Services")}</a>
          </nav>
          <div className="legal-divider"></div>
          <LegalGrid id="verantwortlicher" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">Art. 19 DSG</span>
              <h2>{t("Verantwort\u00adlicher", "Controller")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Datenschutzverantwortlicher", "Data Protection Officer")}</h3>
              <div className="legal-highlight">
                <p>
                  <strong>Sin Digital</strong>
                </p>
                <p>
                  {"E-Mail: "}
                  <a href="mailto:info@sin-digital.com">info@sin-digital.com</a>
                </p>
                <p>
                  {"Website: "}
                  <a href="https://www.sin-digital.com/" target="_blank" rel="noopener">www.sin-digital.com</a>
                </p>
              </div>
              <h3>{t("Kontakt Datenschutz", "Data Protection Contact")}</h3>
              <p>
                {"Bei Fragen zum Datenschutz wenden Sie sich direkt an: Cem Sin, "}
                <a href="mailto:info@sin-digital.com">info@sin-digital.com</a>
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="erhebung" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">{t("Welche Daten", "What Data")}</span>
              <h2>{t("Erhobene Daten", "Data Collected")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Automatisch erfasste Daten (Serverlog)", "Automatically Collected Data (Server Log)")}</h3>
              <p>
                {t("Beim Besuch unserer Website werden automatisch folgende technische Daten erfasst:", "When you visit our website, the following technical data is automatically collected:")}
              </p>
              <ul>
                <li>
                  {t("IP-Adresse des anfragenden Gerätes (anonymisiert nach 24h)", "IP address of the requesting device (anonymised after 24h)")}
                </li>
                <li>{t("Datum und Uhrzeit des Zugriffs", "Date and time of access")}</li>
                <li>{t("Aufgerufene URL und Referrer-URL", "Requested URL and referrer URL")}</li>
                <li>{t("Übertragene Datenmenge und HTTP-Statuscode", "Data volume transferred and HTTP status code")}</li>
                <li>{t("Browser-Typ, -Version und Betriebssystem", "Browser type, version and operating system")}</li>
              </ul>
              <h3>{t("Kontaktformular", "Contact Form")}</h3>
              <p>
                {t("Wenn Sie unser Kontaktformular nutzen, verarbeiten wir:", "When you use our contact form, we process:")}
              </p>
              <ul>
                <li>{t("Name und E-Mail-Adresse (Pflichtfelder)", "Name and email address (required fields)")}</li>
                <li>{t("Betreff und Nachrichteninhalt", "Subject and message content")}</li>
                <li>{t("Zeitpunkt der Kontaktaufnahme", "Time of contact")}</li>
              </ul>
              <h3>{t("Bewerbungsdaten", "Application Data")}</h3>
              <p>
                {t("Im Rahmen von Bewerbungen verarbeiten wir die von Ihnen übermittelten Bewerbungsunterlagen (Name, Kontaktdaten, Lebenslauf, Qualifikationen).", "In the context of applications, we process the documents you submit (name, contact details, CV, qualifications).")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="zweck" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">{t("Wozu", "Why")}</span>
              <h2>{t("Verarbei\u00adtungs\u00adzwecke", "Purposes of Processing")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Websitebetrieb", "Website Operation")}</h3>
              <p>
                {t("Die Verarbeitung von Serverlogdaten ist technisch notwendig, um die Website stabil, sicher und korrekt auszuliefern und um Angriffe oder Fehler erkennen zu können.", "Processing server log data is technically necessary to deliver the website stably, securely and correctly, and to detect attacks or errors.")}
              </p>
              <h3>{t("Anfragenbearbeitung", "Handling Enquiries")}</h3>
              <p>
                {t("Kontaktformulardaten verwenden wir ausschliesslich zur Bearbeitung Ihrer Anfrage und gegebenenfalls für eine Vertragsanbahnung. Eine Weitergabe an Dritte erfolgt nicht ohne Ihre Zustimmung.", "We use contact form data solely to process your enquiry and, where applicable, to initiate a contract. Data is not shared with third parties without your consent.")}
              </p>
              <h3>{t("Vertragserfüllung", "Contract Performance")}</h3>
              <p>
                {t("Bei Vertragsschluss verarbeiten wir die erforderlichen Daten zur Erbringung unserer Dienstleistungen, Rechnungsstellung und Kommunikation im Rahmen des Projekts.", "Upon conclusion of a contract, we process the necessary data to provide our services, issue invoices and communicate within the scope of the project.")}
              </p>
              <h3>{t("Sicherheit", "Security")}</h3>
              <p>
                {t("Zur Erkennung und Abwehr von Angriffen, Spam und missbräuchlicher Nutzung unserer Services.", "To detect and defend against attacks, spam and misuse of our services.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="rechtsgrundlagen" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">{t("Rechtsbasis", "Legal Basis")}</span>
              <h2>{t("Rechts\u00adgrund\u00adlagen", "Legal Bases")}</h2>
            </div>
            <div className="legal-block">
              <ul>
                <li>
                  {t("Art. 31 DSG, Einwilligung (z. B. Newsletter, optionale Cookies)", "Art. 31 FADP, Consent (e.g. newsletter, optional cookies)")}
                </li>
                <li>
                  {t("Art. 31 DSG, Vertragserfüllung oder vorvertragliche Massnahmen", "Art. 31 FADP, Contract performance or pre-contractual measures")}
                </li>
                <li>
                  {t("Art. 31 DSG, Rechtliche Verpflichtung (z. B. Aufbewahrungspflichten)", "Art. 31 FADP, Legal obligation (e.g. retention requirements)")}
                </li>
                <li>
                  {t("Art. 31 DSG, Überwiegendes berechtigtes Interesse (z. B. IT-Sicherheit, Serverlog)", "Art. 31 FADP, Overriding legitimate interest (e.g. IT security, server log)")}
                </li>
              </ul>
              <p style={{ marginTop: "1.5rem" }}>
                {t("Bei der Verarbeitung auf Basis berechtigter Interessen wurde eine Interessenabwägung vorgenommen. Details teilen wir Ihnen auf Anfrage mit.", "Where processing is based on legitimate interests, a balancing of interests has been carried out. Details are available upon request.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="empfaenger" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">{t("Weitergabe", "Disclosure")}</span>
              <h2>{t("Empfänger", "Recipients")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Interne Verarbeitung", "Internal Processing")}</h3>
              <p>
                {t("Ihre Daten werden grundsätzlich nur intern verarbeitet. Nur Mitarbeitende mit Zugriffsberechtigung erhalten Einsicht, und nur soweit es für die jeweilige Aufgabe erforderlich ist.", "Your data is generally processed internally only. Only employees with access authorisation may view it, and only to the extent required for the relevant task.")}
              </p>
              <h3>{t("Auftragsverarbeiter", "Data Processors")}</h3>
              <p>
                {t("Wir setzen sorgfältig ausgewählte Dienstleister ein, die alle vertraglich als Auftragsverarbeiter gemäss Schweizer DSG gebunden sind:", "We use carefully selected service providers, all contractually bound as data processors under Swiss FADP:")}
              </p>
              <ul>
                <li>{t("Hosting: Hetzner Online GmbH (Schweiz)", "Hosting: Hetzner Online GmbH (Switzerland)")}</li>
                <li>{t("Kontaktformular: EmailJS Inc. (USA)", "Contact form: EmailJS Inc. (USA)")}</li>
                <li>
                  {t("Analyse: Plausible Analytics (EU, keine Cookies)", "Analytics: Plausible Analytics (EU, no cookies)")}
                </li>
              </ul>
              <h3>{t("Drittländer", "Third Countries")}</h3>
              <p>
                {t("Kontaktformulardaten werden über EmailJS (USA) weitergeleitet, Spamschutz erfolgt über Cloudflare Turnstile (USA). Beide Anbieter sind gemäss EU-US Data Privacy Framework zertifiziert. Die Übermittlung erfolgt auf Basis geeigneter Garantien gemäss Schweizer DSG.", "Contact form data is forwarded via EmailJS (USA), spam protection via Cloudflare Turnstile (USA). Both providers are certified under the EU-US Data Privacy Framework. Transfer is based on appropriate guarantees under Swiss FADP.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="speicherung" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">{t("Retention", "Retention")}</span>
              <h2>{t("Speicher\u00addauer", "Retention Periods")}</h2>
            </div>
            <div className="legal-block">
              <ul>
                <li>
                  {t("Serverlogdaten: 7 Tage (dann automatisch gelöscht)", "Server log data: 7 days (then automatically deleted)")}
                </li>
                <li>
                  {t("Kontaktanfragen: 3 Monate nach abschliessender Bearbeitung", "Contact enquiries: 3 months after final processing")}
                </li>
                <li>
                  {t("Vertragsdaten: 10 Jahre (handels- und steuerrechtliche Aufbewahrungspflicht)", "Contract data: 10 years (statutory commercial and tax retention requirement)")}
                </li>
                <li>
                  {t("Rechnungen und buchhalterische Unterlagen: 10 Jahre (gemäss Art. 958f OR)", "Invoices and accounting documents: 10 years (pursuant to Art. 958f Swiss CO)")}
                </li>
                <li>
                  {t("Bewerbungsunterlagen (abgelehnt): 6 Monate nach Absage", "Application documents (rejected): 6 months after rejection")}
                </li>
                <li>{t("Newsletter: bis zum Widerruf der Einwilligung", "Newsletter: until withdrawal of consent")}</li>
              </ul>
              <div className="legal-highlight">
                <p>
                  {t("Nach Ablauf der jeweiligen Speicherfrist werden Ihre Daten vollständig und unwiderruflich gelöscht oder anonymisiert, sofern keine anderen gesetzlichen Pflichten dem entgegenstehen.", "After the respective retention period expires, your data will be completely and irreversibly deleted or anonymised, unless other legal obligations prevent this.")}
                </p>
              </div>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <div id="rechte">
            <div style={{ marginBottom: "3rem" }}>
              <span className="legal-tag">{t("Art. 2527 DSG", "Art. 2527 FADP")}</span>
              <h2 style={{ fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: "900", lineHeight: "1.1" }}>
                <span>{t("IHRE ", "YOUR ")}</span>
                <span className="text-green">{t("RECHTE", "RIGHTS")}</span>
              </h2>
              <p style={{ color: "var(--color-gray)", maxWidth: "40rem", marginTop: "1rem" }}>
                {t("Als betroffene Person stehen Ihnen umfangreiche Rechte gemäss Schweizer DSG zu. Wir nehmen diese ernst und bearbeiten entsprechende Anfragen unverzüglich.", "As a data subject, you have extensive rights under Swiss FADP. We take these seriously and process requests without delay.")}
              </p>
            </div>
            <div className="rights-grid">
              <div className="right-card">
                <h4>{t("Auskunftsrecht (Art. 25 DSG)", "Right of Access (Art. 25 FADP)")}</h4>
                <p>
                  {t("Sie haben das Recht zu erfahren, welche personenbezogenen Daten wir über Sie verarbeiten, zu welchem Zweck und an wen sie ggf. weitergegeben werden.", "You have the right to know what personal data we process about you, for what purpose and to whom it may be disclosed.")}
                </p>
              </div>
              <div className="right-card">
                <h4>{t("Berichtigung", "Rectification")}</h4>
                <p>
                  {t("Sie können die Korrektur unrichtiger oder Vervollständigung unvollständiger personenbezogener Daten verlangen.", "You may request the correction of inaccurate or the completion of incomplete personal data.")}
                </p>
              </div>
              <div className="right-card">
                <h4>{t("Löschung", "Erasure")}</h4>
                <p>
                  {t("Sie haben das Recht auf Löschung Ihrer Daten, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.", "You have the right to have your data deleted, provided no statutory retention obligations apply.")}
                </p>
              </div>
              <div className="right-card">
                <h4>{t("Einschränkung", "Restriction")}</h4>
                <p>
                  {t("In bestimmten Fällen können Sie die Einschränkung der Verarbeitung Ihrer Daten verlangen.", "In certain cases you may request the restriction of processing of your data.")}
                </p>
              </div>
              <div className="right-card">
                <h4>{t("Datenherausgabe", "Data Portability")}</h4>
                <p>
                  {t("Sie können Ihre Daten in einem gängigen Format erhalten oder an einen anderen Anbieter übertragen lassen.", "You may receive your data in a common format or have it transferred to another provider.")}
                </p>
              </div>
              <div className="right-card">
                <h4>{t("Widerspruch", "Objection")}</h4>
                <p>
                  {t("Sie können der Verarbeitung Ihrer Daten auf Basis überwiegender berechtigter Interessen jederzeit widersprechen.", "You may object at any time to processing based on overriding legitimate interests.")}
                </p>
              </div>
              <div className="right-card">
                <h4>{t("Widerruf der Einwilligung", "Withdrawal of Consent")}</h4>
                <p>
                  {t("Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen, ohne dass dies die Rechtmässigkeit der bisherigen Verarbeitung berührt.", "You may withdraw any consent at any time with effect for the future, without affecting the lawfulness of prior processing.")}
                </p>
              </div>
              <div className="right-card">
                <h4>{t("Beschwerderecht", "Right to Lodge a Complaint")}</h4>
                <p>
                  {t("Sie haben das Recht, Beschwerde beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) einzulegen.", "You have the right to lodge a complaint with the Federal Data Protection and Information Commissioner (FDPIC).")}
                </p>
              </div>
            </div>
            <div className="legal-highlight" style={{ marginTop: "2rem" }}>
              <p>
                {"Zur Ausübung Ihrer Rechte genügt eine formlose E-Mail an: "}
                <a href="mailto:info@sin-digital.com">info@sin-digital.com</a>
              </p>
              <p style={{ marginTop: "0.5rem" }}>
                {t("Wir beantworten Ihre Anfrage kostenlos innerhalb von 30 Tagen.", "We will respond to your request free of charge within 30 days.")}
              </p>
            </div>
          </div>
          <div className="legal-divider"></div>
          <LegalGrid id="cookies" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">{t("Tracking", "Tracking")}</span>
              <h2>{t("Cookies & Tracking", "Cookies & Tracking")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Technisch notwendige Cookies", "Technically Necessary Cookies")}</h3>
              <p>
                {t("Wir setzen ausschliesslich technisch notwendige Cookies ein, die für den Betrieb der Website unerlässlich sind. Diese Cookies speichern keine personenbezogenen Daten und erfordern keine Einwilligung gemäss Schweizer DSG.", "We use only technically necessary cookies that are essential for the operation of the website. These cookies do not store personal data and do not require consent under Swiss FADP.")}
              </p>
              <h3>{t("Keine Tracking- oder Marketing-Cookies", "No Tracking or Marketing Cookies")}</h3>
              <p>
                {t("Wir verwenden weder Google Analytics noch andere kommerzielle Tracking-Tools. Unser Analyse-Tool (Plausible Analytics) arbeitet cookielos, sammelt keine personenbezogenen Daten und ist vollständig DSG-konform.", "We use neither Google Analytics nor any other commercial tracking tools. Our analytics tool (Plausible Analytics) works without cookies, collects no personal data and is fully FADP-compliant.")}
              </p>
              <h3>{t("Cookie-Einstellungen", "Cookie Settings")}</h3>
              <p>
                {t("Da wir keine nicht-notwendigen Cookies setzen, ist kein Cookie-Banner erforderlich. Technisch notwendige Cookies können in Ihren Browser-Einstellungen verwaltet werden.", "Since we do not set any non-necessary cookies, no cookie banner is required. Technically necessary cookies can be managed in your browser settings.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="tools" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">{t("Drittanbieter", "Third Parties")}</span>
              <h2>{t("Externe Dienste", "External Services")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Cloudflare CDN", "Cloudflare CDN")}</h3>
              <p>
                {"Wir nutzen das Content Delivery Network von Cloudflare, Inc. (USA) zur schnellen Auslieferung von Inhalten. Cloudflare ist gemäss EU-US Data Privacy Framework zertifiziert. Datenschutzerklärung: "}
                <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">cloudflare.com/privacypolicy</a>
              </p>
              <h3>{t("Unsplash (Bilder)", "Unsplash (Images)")}</h3>
              <p>
                {"Einige Bilder auf dieser Website stammen von Unsplash (Unsplash Inc., Kanada). Beim Laden der Bilder werden ggf. technische Daten an Unsplash-Server übertragen. Datenschutzerklärung: "}
                <a href="https://unsplash.com/privacy" target="_blank" rel="noopener">unsplash.com/privacy</a>
              </p>
              <h3>{t("EmailJS (Kontaktformular)", "EmailJS (Contact Form)")}</h3>
              <p>
                {"Für die Verarbeitung von Kontaktanfragen nutzen wir EmailJS (EmailJS Inc., USA). Beim Absenden des Formulars werden Name, E-Mail und Nachricht über deren Server weitergeleitet. Kein dauerhafter Speicher. Grundlage: Art. 6 Abs. 1 lit. b DSG. Datenschutz: "}
                <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener">emailjs.com/legal/privacy-policy</a>
              </p>
              <h3>{t("Cloudflare Turnstile (Spamschutz)", "Cloudflare Turnstile (Spam Protection)")}</h3>
              <p>
                {"Zum Schutz vor Spam nutzen wir Cloudflare Turnstile (Cloudflare Inc., USA). Datenschutz: "}
                <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">cloudflare.com/privacypolicy</a>
              </p>
              <h3>{t("Google Fonts", "Google Fonts")}</h3>
              <p>
                {t("Diese Website verwendet keine Google Fonts. Alle Schriftarten werden lokal oder über Systemschriften geladen, um eine Datenübertragung an Google-Server zu vermeiden.", "This website does not use Google Fonts. All fonts are loaded locally or via system fonts to avoid data transmission to Google servers.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="datensicherheit" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">{t("Sicherheit", "Security")}</span>
              <h2>{t("Daten\u00adsicherheit & Backup", "Data Security & Backup")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Technische Massnahmen", "Technical Measures")}</h3>
              <p>
                {t("Sin Digital setzt branchenübliche technische und organisatorische Massnahmen ein, um Ihre Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen. Eine absolute Sicherheit kann jedoch nicht garantiert werden.", "Sin Digital employs industry-standard technical and organisational measures to protect your data from unauthorised access, loss or misuse. However, absolute security cannot be guaranteed.")}
              </p>
              <h3>{t("Backup-Regelung", "Backup Policy")}</h3>
              <p>
                {t("Im Rahmen der Hosting-Vereinbarung werden wöchentliche Backups der Website-Daten erstellt. Backups werden maximal 6 Monate aufbewahrt und danach automatisch gelöscht. Bei Datenverlust infolge höherer Gewalt, Cyberangriffen oder Ausfällen von Drittanbietern übernimmt Sin Digital keine Haftung, sofern kein vorsätzliches oder grob fahrlässiges Verhalten vorliegt.", "Weekly backups of website data are created as part of the hosting agreement. Backups are retained for a maximum of 6 months and then automatically deleted. Sin Digital accepts no liability for data loss resulting from force majeure, cyberattacks or third-party outages, unless intentional or grossly negligent conduct is present.")}
              </p>
              <h3>{t("Zugangsdaten", "Access Credentials")}</h3>
              <p>
                {t("Login-Zugangsdaten für das Dashboard sind vertraulich zu behandeln. Sin Digital übernimmt keine Haftung für Schäden durch unsachgemässe Handhabung der Zugangsdaten.", "Login credentials for the dashboard must be kept confidential. Sin Digital accepts no liability for damages resulting from improper handling of access credentials.")}
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
