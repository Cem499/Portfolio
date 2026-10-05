import LegalGrid from '../components/LegalGrid.jsx'
import LegalNav from '../components/LegalNav.jsx'
import ScrollTopButton from '../components/ScrollTopButton.jsx'
import Seo from '../components/Seo.jsx'
import useLegalLang from '../hooks/useLegalLang.js'
import '../styles/global.css'
import '../styles/agb.css'

// agb.html: prerendered in German, switches to English on the client (localStorage).
export default function Agb() {
  const { lang, setLang, t, htmlLang } = useLegalLang()

  return (
    <>
      <Seo htmlAttributes={{ lang: htmlLang }}>
        <title>{"AGB | Allgemeine Geschäftsbedingungen | Sin Digital Agentur Zürich"}</title>
        <meta name="description" content="Allgemeine Geschäftsbedingungen der Sin Digital Agentur Zürich für Webdesign, Branding und Entwicklungsdienstleistungen." />
        <link rel="icon" type="image/webp" href="/assets/ICON-Logo_Sin-Digital.webp" />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://www.sin-digital.com/agb.html" />
      </Seo>
      <LegalNav lang={lang} setLang={setLang} t={t} />

      <main className="legal-page">
        <div className="container">
          <div className="legal-hero">
            <span className="legal-tag">{t("AGB", "T&C")}</span>
            <h1 className="legal-title">{t("Allgemeine Geschäftsbedingungen", "General Terms & Conditions")}</h1>
            <p className="legal-subtitle">{t("Stand: Februar 2026", "As of: February 2026")}</p>
          </div>
          <nav className="toc" aria-label="Inhaltsverzeichnis">
            <a href="#leistungsumfang" className="toc-link">{t("1. Leistungsumfang", "1. Scope of Services")}</a>
            {' '}
            <a href="#entwicklungszeit" className="toc-link">{t("2. Entwicklungszeit & Lieferung", "2. Development & Delivery")}</a>
            {' '}
            <a href="#zahlung" className="toc-link">{t("3. Preis & Zahlungsbedingungen", "3. Price & Payment")}</a>
            {' '}
            <a href="#projektpreis" className="toc-link">{t("4. Projektpreis & Drittanbieter", "4. Project Price & Third Parties")}</a>
            {' '}
            <a href="#zahlungsverzug" className="toc-link">{t("5. Zahlungsverzug & Mahnung", "5. Default & Reminder")}</a>
            {' '}
            <a href="#mitwirkung" className="toc-link">{t("6. Mitwirkungspflicht", "6. Client Obligations")}</a>
            {' '}
            <a href="#datenschutz" className="toc-link">{t("7. Datenschutz", "7. Data Protection")}</a>
            {' '}
            <a href="#hoeheregewalt" className="toc-link">{t("8. Höhere Gewalt", "8. Force Majeure")}</a>
            {' '}
            <a href="#aenderungen" className="toc-link">{t("9. Änderungen nach Lieferung", "9. Post-Delivery Changes")}</a>
            {' '}
            <a href="#eigentum" className="toc-link">{t("10. Eigentumsrechte & Nutzung", "10. Ownership & Use")}</a>
            {' '}
            <a href="#haftung" className="toc-link">{t("11. Haftungsausschluss", "11. Liability Disclaimer")}</a>
            {' '}
            <a href="#gewaehrleistung" className="toc-link">{t("12. Gewährleistung", "12. Warranty")}</a>
            {' '}
            <a href="#hosting" className="toc-link">{t("13. Hosting", "13. Hosting")}</a>
            {' '}
            <a href="#abnahme" className="toc-link">{t("14. Abnahme", "14. Acceptance")}</a>
            {' '}
            <a href="#kuendigung" className="toc-link">{t("15. Kündigung", "15. Termination")}</a>
            {' '}
            <a href="#recht" className="toc-link">{t("16. Recht & Gerichtsstand", "16. Law & Jurisdiction")}</a>
            {' '}
            <a href="#salvatorisch" className="toc-link">{t("17. Salvatorische Klausel", "17. Severability")}</a>
            {' '}
            <a href="#schriftform" className="toc-link">{t("18. Schriftform", "18. Written Form")}</a>
            {' '}
            <a href="#projektkommunikation" className="toc-link">{t("19. Projektkommunikation", "19. Communication")}</a>
            {' '}
            <a href="#projektpause" className="toc-link">{t("20. Projektpause", "20. Project Pause")}</a>
            {' '}
            <a href="#referenznutzung" className="toc-link">{t("21. Referenznutzung", "21. References")}</a>
            {' '}
            <a href="#unangemessenes-verhalten" className="toc-link">{t("22. Verhaltensklausel", "22. Conduct Clause")}</a>
            {' '}
            <a href="#eigentumsvorbehalt" className="toc-link">{t("23. Eigentumsvorbehalt", "23. Retention of Title")}</a>
            {' '}
            <a href="#scope-creep" className="toc-link">{t("24. Leistungsabgrenzung", "24. Scope Definition")}</a>
            {' '}
            <a href="#online-stellung" className="toc-link">{t("25. Online-Stellung", "25. Go-Live")}</a>
            {' '}
            <a href="#datenschutzerklaerung-impressum" className="toc-link">{t("26. Datenschutz & Impressum", "26. Privacy & Legal Notice")}</a>
          </nav>
          <div className="legal-divider"></div>
          <LegalGrid id="leistungsumfang" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">1</span>
              <h2>{t("Leistungsumfang", "Scope of Services")}</h2>
            </div>
            <div className="legal-block">
              <ul>
                <li>
                  {t("Der genaue Leistungsumfang richtet sich nach dem gewählten Paket (Basic, Growth, Pro oder Partner) sowie individuellen Vereinbarungen, die im jeweiligen Angebot schriftlich festgehalten sind.", "The exact scope of services depends on the selected package (Basic, Growth, Pro or Partner) as well as individual agreements set out in writing in the respective offer.")}
                </li>
                <li>
                  {t("Mögliche Leistungen umfassen u.a.: Websiteerstellung, Content-Management-Systeme, Dashboards sowie Backend-Entwicklung. Massgebend ist ausschliesslich das unterzeichnete Angebot.", "Possible services include, among others: website creation, content management systems, dashboards and backend development. The signed offer is the sole binding document.")}
                </li>
                <li>
                  {t("Nicht ausdrücklich im Angebot aufgeführte Leistungen sind nicht Bestandteil des Vertrags und werden separat verrechnet.", "Services not expressly listed in the offer are not part of the contract and will be billed separately.")}
                </li>
              </ul>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="entwicklungszeit" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">2</span>
              <h2>{t("Entwicklungszeit & Lieferung", "Development Time & Delivery")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Die Entwicklung beginnt nach Eingang der vereinbarten Anzahlung und dauert maximal die im Angebot genannte Frist. Der Auftragnehmer informiert rechtzeitig über den Fertigstellungstermin.", "Development begins upon receipt of the agreed deposit and takes a maximum of the timeframe stated in the offer. The contractor will notify the client of the completion date in good time.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="zahlung" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">3</span>
              <h2>{t("Preis & Zahlungsbedingungen", "Price & Payment Terms")}</h2>
            </div>
            <div className="legal-block">
              <ul>
                <li>
                  {t("Die Preise und Zahlungsmodalitäten richten sich nach dem jeweiligen Angebot.", "Prices and payment terms are governed by the respective offer.")}
                </li>
                <li>{t("Der Zahlungsplan ist im Angebot geregelt.", "The payment plan is specified in the offer.")}</li>
              </ul>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="projektpreis" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">4</span>
              <h2>{t("Projektpreis & Drittanbieter", "Project Price & Third-Party Providers")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Im Projektpreis sind alle für die Umsetzung notwendigen Drittanbieter-Leistungen (z.B. Domain, Hosting, Plugins, APIs) enthalten, sofern nicht anders vereinbart. Änderungen der Preise von Drittanbietern nach Vertragsabschluss können an den Kunden weitergegeben werden.", "The project price includes all necessary third-party services (e.g. domain, hosting, plugins, APIs) unless otherwise agreed. Changes in third-party prices after contract conclusion may be passed on to the client.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="zahlungsverzug" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">5</span>
              <h2>{t("Zahlungsverzug & Mahnung", "Payment Default & Reminder")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Rechnungen sind innert 14 Tagen zahlbar. Bei Zahlungsverzug wird pro Mahnung eine Gebühr von CHF 20.00 erhoben. Bei Zahlungsverzug von mehr als 10 Tagen ist der Auftragnehmer berechtigt, die Website oder Hosting-Leistungen bis zur vollständigen Begleichung vorübergehend zu deaktivieren.", "Invoices are due within 14 days. In case of late payment, a reminder fee of CHF 20.00 will be charged per reminder. If payment is overdue by more than 10 days, the contractor is entitled to temporarily deactivate the website or hosting services until full payment is received.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="mitwirkung" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">6</span>
              <h2>{t("Mitwirkungspflicht", "Client Cooperation Obligation")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Der Kunde ist verpflichtet, alle notwendigen Inhalte (Texte, Bilder, Logos, Farbwelt) rechtzeitig bereitzustellen. Verzögerungen durch den Kunden verlängern die Entwicklungszeit entsprechend.", "The client is obliged to provide all necessary content (texts, images, logos, color scheme) in a timely manner. Delays caused by the client will extend the development timeline accordingly.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="datenschutz" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">7</span>
              <h2>{t("Datenschutz", "Data Protection")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Der Kunde bleibt Verantwortlicher im Sinne des Schweizer Datenschutzgesetzes (DSG) für sämtliche über die Website erhobenen personenbezogenen Daten. Der Auftragnehmer verarbeitet Daten ausschliesslich im Rahmen der Vertragserfüllung. Soweit der Auftragnehmer personenbezogene Daten im Auftrag verarbeitet, gilt er als Auftragsbearbeiter im Sinne des DSG.", "The client remains the data controller under Swiss data protection law (DSG) for all personal data collected via the website. The contractor processes data exclusively within the scope of contract performance. Where the contractor processes personal data on behalf of the client, it acts as a data processor within the meaning of the Swiss DSG.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="hoeheregewalt" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">8</span>
              <h2>{t("Höhere Gewalt", "Force Majeure")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Der Auftragnehmer haftet nicht für Verzögerungen oder Leistungsausfälle, die auf höhere Gewalt, unvorhersehbare Ereignisse oder Störungen bei Drittanbietern zurückzuführen sind.", "The contractor is not liable for delays or service failures due to force majeure, unforeseeable events, or disruptions at third-party providers.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="aenderungen" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">9</span>
              <h2>{t("Änderungen nach Lieferung", "Changes After Delivery")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Im Vertrag inbegriffen ist bis zu 1 Änderungswunsch nach Lieferung. Weitere Änderungen werden mit CHF 120.00 pro Stunde verrechnet. Als Änderung gilt die Anpassung eines bestehenden Elements wie Text, Bild oder Farbe. Neue Funktionen oder strukturelle Umbauten gelten nicht als Änderung und werden separat verrechnet.", "Up to 1 change request after delivery is included in the contract. Additional changes are billed at CHF 120.00 per hour. A change is defined as an adjustment to an existing element such as text, image or colour. New features or structural changes do not qualify as changes and will be billed separately.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="eigentum" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">10</span>
              <h2>{t("Eigentumsrechte & Nutzung", "Ownership & Usage Rights")}</h2>
            </div>
            <div className="legal-block">
              <ul>
                <li>
                  {t("Der Quellcode verbleibt dauerhaft Eigentum des Auftragnehmers.", "The source code remains the permanent property of the contractor.")}
                </li>
                <li>
                  {t("Der Kunde erhält ein nicht übertragbares Nutzungsrecht für die Dauer der Hosting-Vereinbarung.", "The client receives a non-transferable right of use for the duration of the hosting agreement.")}
                </li>
                <li>
                  {t("Keine Weitergabe oder Lizenzierung an Dritte ohne schriftliche Zustimmung.", "No transfer or licensing to third parties without written consent.")}
                </li>
                <li>
                  {t("Der Auftragnehmer darf die Website im Portfolio erwähnen und einen diskreten Hinweis im Footer platzieren.", "The contractor may mention the website in their portfolio and place a discreet note in the footer.")}
                </li>
              </ul>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="haftung" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">11</span>
              <h2>{t("Haftungsausschluss", "Liability Disclaimer")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Der Auftragnehmer haftet nur bei vorsätzlichem oder grob fahrlässigem Verhalten. Die Haftung ist der Höhe nach auf den vereinbarten Projektpreis beschränkt. Eine Haftung für indirekte Schäden, Folgeschäden, entgangenen Gewinn, Datenverlust oder Ansprüche Dritter ist ausgeschlossen.", "The contractor is only liable in cases of intentional or grossly negligent conduct. Liability is limited to the agreed project price. Liability for indirect damages, consequential damages, loss of profit, data loss, or third-party claims is excluded.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="gewaehrleistung" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">12</span>
              <h2>{t("Gewährleistung", "Warranty")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Der Auftragnehmer gewährleistet die einwandfreie Funktion der Website für 30 Tage nach Abnahme. Technische Mängel sind schriftlich zu melden und werden innerhalb dieser Frist kostenlos behoben. Änderungswünsche und neue Funktionen sind davon ausgenommen.", "The contractor warrants the proper functioning of the website for 30 days after acceptance. Technical defects must be reported in writing and will be rectified free of charge within this period. Change requests and new features are excluded from this warranty.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="hosting" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">13</span>
              <h2>{t("Hosting", "Hosting")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Die monatliche Hosting-Gebühr richtet sich nach dem gewählten Paket und umfasst Serverbereitstellung, Sicherheitsupdates, kleinere Inhaltspflege (Texte, Bilder, Preise) sowie E-Mail-Support (Reaktionszeit bis zu 48 Stunden an Werktagen). Neue Seiten, Funktionen oder strukturelle Änderungen sind nicht enthalten und werden separat zu CHF 120.00 pro Stunde verrechnet.", "The monthly hosting fee depends on the selected package and includes server provision, security updates, minor content maintenance (texts, images, prices) and email support (response time up to 48 hours on working days). New pages, features or structural changes are not included and will be billed separately at CHF 120.00 per hour.")}
              </p>
              <p>
                {t("Die Hosting-Vereinbarung läuft mindestens 6 Monate ab Abnahme der Website. Nach Ablauf der Mindestlaufzeit kann sie von beiden Parteien mit 30 Tagen Frist auf Monatsende schriftlich gekündigt werden. Die Gebühr beginnt ab Abnahme der Website. Eine permanente oder unterbrechungsfreie Verfügbarkeit wird nicht geschuldet.", "The hosting agreement runs for a minimum of 6 months from acceptance of the website. After the minimum term, it may be terminated by either party with 30 days' notice at the end of the month. The fee commences upon acceptance of the website. Permanent or uninterrupted availability is not guaranteed.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="abnahme" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">14</span>
              <h2>{t("Abnahme", "Acceptance")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Nach Fertigstellung informiert der Auftragnehmer den Kunden über die Bereitstellung der Website. Der Kunde ist verpflichtet, die Website innerhalb von 7 Kalendertagen zu prüfen. Erfolgt keine schriftliche Mängelanzeige innerhalb dieser Frist, gilt die Website als abgenommen.", "Upon completion, the contractor will notify the client of the website's availability. The client must review the website within 7 calendar days. If no written notice of defects is received within this period, the website shall be deemed accepted.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="kuendigung" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">15</span>
              <h2>{t("Kündigung", "Termination")}</h2>
            </div>
            <div className="legal-block">
              <ul>
                <li>
                  {t("Bei Kündigung nach Entwicklungsbeginn wird die bis dahin geleistete Arbeit anteilsmässig in Rechnung gestellt. Die Anzahlung wird nicht zurückerstattet.", "If termination occurs after development has begun, the work completed up to that point will be invoiced proportionally. The deposit is non-refundable.")}
                </li>
                <li>
                  {t("Eine Kündigung der Hosting-Vereinbarung ist frühestens nach Ablauf der Mindestlaufzeit von 6 Monaten möglich. Nach Ablauf kann sie von beiden Seiten mit 30 Tagen Frist auf Monatsende schriftlich gekündigt werden. Bei vorzeitiger Kündigung sind die verbleibenden Monate bis zum Ende der Mindestlaufzeit vollständig geschuldet.", "The hosting agreement may only be terminated after the minimum term of 6 months. After expiry, it may be terminated by either party with 30 days' notice at the end of the month. In the event of early termination, the remaining months until the end of the minimum term are fully owed.")}
                </li>
                <li>
                  {t("Die Domain ist auf den Auftraggeber registriert und wird bei Kündigung innerhalb von 7 Tagen übertragen. Die Website wird nach Ablauf der Frist vollständig entfernt. Ein Datenexport ist gegen CHF 50.00 möglich.", "The domain is registered in the client's name and will be transferred within 7 days upon termination. The website will be completely removed after the notice period. A data export is available for CHF 50.00.")}
                </li>
              </ul>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="recht" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">16</span>
              <h2>{t("Recht & Gerichtsstand", "Governing Law & Jurisdiction")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Es gilt Schweizer Recht. Gerichtsstand ist Zürich, Schweiz.", "Swiss law applies. The place of jurisdiction is Zurich, Switzerland.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="salvatorisch" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">17</span>
              <h2>{t("Salvatorische Klausel", "Severability Clause")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Anstelle der unwirksamen Bestimmung gilt eine zulässige Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.", "Should any provision of these T&C be invalid, the validity of the remaining provisions shall not be affected. The invalid provision shall be replaced by a permissible rule that most closely achieves the economic purpose.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="schriftform" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">18</span>
              <h2>{t("Schriftform", "Written Form Requirement")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Alle Änderungen oder Ergänzungen dieser AGB bedürfen der Schriftform.", "All amendments or additions to these T&C must be made in writing.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="leistungen" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 3</span>
              <h2>{t("Leistungen", "Services")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Leistungsumfang", "Scope of Services")}</h3>
              <p>
                {t("Der Leistungsumfang ergibt sich aus dem gewählten Paket (Basic, Growth, Pro oder Partner) und wird im individuellen Angebot verbindlich festgehalten. Angaben auf der Website oder in Marketingunterlagen sind unverbindlich. Massgebend ist ausschliesslich das unterzeichnete Angebot.", "The scope of services is determined by the selected package (Basic, Growth, Pro or Partner) and is binding as set out in the individual offer. Information on the website or in marketing materials is non-binding. Only the signed offer is authoritative.")}
              </p>
              <h3>{t("Entwicklungszeit & Lieferung", "Development Time & Delivery")}</h3>
              <p>
                {t("Die Entwicklung beginnt nach Eingang der Anzahlung und dauert bis zu 15 Arbeitstage. Der Auftragnehmer informiert rechtzeitig über den Fertigstellungstermin.", "Development begins upon receipt of the deposit and takes up to 15 working days. The contractor will notify the client of the completion date in good time.")}
              </p>
              <h3>{t("Änderungswünsche", "Change Requests")}</h3>
              <ul>
                <li>
                  {t("Bis zu 1 Änderungswunsch nach Lieferung ist inklusive.", "Up to 1 change request after delivery is included.")}
                </li>
                <li>
                  {t("Weitere Änderungen werden mit CHF 120.00 pro Stunde berechnet.", "Additional changes will be charged at CHF 120.00 per hour.")}
                </li>
              </ul>
              <h3>{t("Unterauftragsvergabe", "Subcontracting")}</h3>
              <p>
                {t("Der Auftragnehmer kann zur Vertragserfüllung qualifizierte Dritte einsetzen.", "The contractor may engage qualified third parties to fulfil the contract.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="mitwirkungspflichten" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 4</span>
              <h2>{t("Mitwirkungspflichten", "Client Obligations")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Pflichten des Kunden", "Client's Duties")}</h3>
              <p>
                {t("Der Kunde verpflichtet sich zur aktiven Mitwirkung bei der Projektdurchführung. Insbesondere ist er verpflichtet:", "The client commits to actively cooperating in the project. In particular, the client is obliged to:")}
              </p>
              <ul>
                <li>
                  {t("Alle notwendigen Materialien, Texte, Bilder und Informationen rechtzeitig bereitzustellen", "Provide all necessary materials, texts, images and information in a timely manner")}
                </li>
                <li>
                  {t("Freigaben und Entscheidungen innerhalb vereinbarter Fristen zu erteilen", "Grant approvals and make decisions within agreed deadlines")}
                </li>
                <li>
                  {t("Einen festen Ansprechpartner mit Entscheidungsbefugnis zu benennen", "Designate a fixed contact person with decision-making authority")}
                </li>
                <li>
                  {t("Zugangsdaten (Server, CMS, Tools) zeitnah zu übermitteln", "Provide access credentials (server, CMS, tools) promptly")}
                </li>
              </ul>
              <h3>{t("Verzögerung durch den Kunden", "Delays Caused by the Client")}</h3>
              <p>
                {t("Verzögerungen, die durch mangelnde Mitwirkung des Kunden entstehen, berechtigen die Agentur zur entsprechenden Verlängerung der Fristen sowie zur Geltendmachung entstandener Mehrkosten. Die Agentur ist berechtigt, das Projekt nach schriftlicher Mahnung und Fristsetzung ruhend zu stellen.", "Delays resulting from insufficient client cooperation entitle the agency to extend deadlines accordingly and to claim any additional costs incurred. The agency is entitled to suspend the project after written notice and a set deadline.")}
              </p>
              <h3>{t("Richtigkeit von Inhalten", "Accuracy of Content")}</h3>
              <p>
                {t("Für die rechtliche Zulässigkeit und inhaltliche Richtigkeit der vom Kunden bereitgestellten Materialien ist ausschliesslich der Kunde verantwortlich.", "The client is solely responsible for the legal permissibility and factual accuracy of materials provided by the client.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="verguetung" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 5</span>
              <h2>{t("Vergütung & Zahlung", "Remuneration & Payment")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Preis & Zahlungsbedingungen", "Price & Payment Terms")}</h3>
              <ul>
                <li>{t("Einmalige Entwicklungsgebühr: gemäss Angebot", "One-time development fee: as per offer")}</li>
                <li>
                  {t("Monatliche Hosting & Wartungsgebühr: gemäss Angebot", "Monthly hosting & maintenance fee: as per offer")}
                </li>
              </ul>
              <h3>{t("Zahlungsplan", "Payment Plan")}</h3>
              <div className="legal-highlight">
                <p>
                  <strong>{t("Zahlungsplan:", "Payment Plan:")}</strong>
                </p>
                <p>
                  {t("• 50 % Anzahlung bei Vertragsabschluss (vor Entwicklungsbeginn)", "• 50% deposit upon signing (before development begins)")}
                </p>
                <p>
                  {t("• 50 % Restbetrag bei Lieferung der fertigen Website", "• 50% balance upon delivery of the finished website")}
                </p>
                <p>
                  {t("Bankverbindung Sin Digital: IBAN CH08 0070 0114 9050 6319 6 | Bank: Zürcher Kantonalbank", "Bank details Sin Digital: IBAN CH08 0070 0114 9050 6319 6 | Bank: Zürcher Kantonalbank")}
                </p>
              </div>
              <h3>{t("Zahlungsverzug & Mahngebühr", "Late Payment & Reminder Fee")}</h3>
              <p>
                {t("Rechnungen sind innert 14 Tagen zahlbar. Bei Zahlungsverzug wird pro Mahnung eine Gebühr von CHF 20.00 erhoben. Bei Zahlungsverzug von mehr als 10 Tagen ist der Auftragnehmer berechtigt, die Website oder Hosting-Leistungen bis zur vollständigen Begleichung vorübergehend zu deaktivieren.", "Invoices are due within 14 days. In case of late payment, a reminder fee of CHF 20.00 will be charged per reminder. If payment is overdue by more than 10 days, the contractor is entitled to temporarily deactivate the website or hosting services until full payment is received.")}
              </p>
              <h3>{t("Zurückbehaltungsrecht", "Right of Retention")}</h3>
              <p>
                {t("Der Auftragnehmer behält sich das Recht vor, die Website bis zur vollständigen Bezahlung zu deaktivieren oder nicht zu übertragen.", "The contractor reserves the right to deactivate or withhold the website until full payment has been received.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="nutzungsrechte" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 6</span>
              <h2>{t("Nutzungsrechte & Urheberrecht", "Usage Rights & Copyright")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Eigentumsrechte & Nutzung", "Ownership & Usage")}</h3>
              <ul>
                <li>
                  {t("Der Quellcode bleibt dauerhaft Eigentum des Auftragnehmers.", "The source code remains the permanent property of the contractor.")}
                </li>
                <li>
                  {t("Der Auftraggeber erhält ein nicht übertragbares Nutzungsrecht für die Dauer der Hosting-Vereinbarung.", "The client receives a non-transferable right of use for the duration of the hosting agreement.")}
                </li>
                <li>
                  {t("Keine Weitergabe oder Lizenzierung an Dritte ohne schriftliche Zustimmung.", "No transfer or licensing to third parties without written consent.")}
                </li>
                <li>
                  {t("Der Auftragnehmer darf die Website im Portfolio erwähnen und einen diskreten Hinweis im Footer platzieren.", "The contractor may mention the website in their portfolio and place a discreet note in the footer ('Website created by Sin Digital').")}
                </li>
              </ul>
              <h3>{t("Drittanbieter & Open-Source", "Third-Party & Open-Source")}</h3>
              <p>
                {t("Notwendige Drittanbieter-Leistungen (z.B. Domain, Hosting, Plugins, APIs) werden separat ausgewiesen. Lizenzbedingungen von Drittanbietern sind einzuhalten.", "Necessary third-party services (e.g. domain, hosting, plugins, APIs) are listed separately. Third-party license terms must be complied with.")}
              </p>
              <h3>{t("Kundenmaterialien", "Client Materials")}</h3>
              <p>
                {t("Der Auftraggeber versichert, dass er über alle Rechte an bereitgestellten Materialien verfügt und stellt den Auftragnehmer von Ansprüchen Dritter frei.", "The client warrants that they hold all rights to the materials provided and indemnifies the contractor against third-party claims.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="geheimhaltung" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 7</span>
              <h2>{t("Vertraulichkeit", "Confidentiality")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Geheimhaltungspflicht", "Confidentiality Obligation")}</h3>
              <p>
                {t("Beide Vertragsparteien verpflichten sich, alle im Rahmen der Zusammenarbeit erlangten vertraulichen Informationen der anderen Partei vertraulich zu behandeln und nicht an Dritte weiterzugeben.", "Both parties agree to treat all confidential information obtained in the course of cooperation as confidential and not to disclose it to third parties.")}
              </p>
              <h3>{t("Dauer", "Duration")}</h3>
              <p>
                {t("Die Geheimhaltungspflicht besteht während der Laufzeit des Vertrages und für einen Zeitraum von 3 Jahren nach dessen Beendigung.", "The confidentiality obligation applies during the term of the contract and for a period of 3 years after its termination.")}
              </p>
              <h3>{t("Ausnahmen", "Exceptions")}</h3>
              <p>
                {t("Informationen sind nicht vertraulich, wenn sie öffentlich bekannt sind, der empfangenden Partei bereits bekannt waren oder von Dritten ohne Verletzung einer Geheimhaltungspflicht offenbart wurden.", "Information is not confidential if it is publicly known, was already known to the receiving party, or was disclosed by third parties without breaching any confidentiality obligation.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="haftung2" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 8</span>
              <h2>{t("Haftung", "Liability")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Haftungsausschluss", "Liability Disclaimer")}</h3>
              <p>
                {t("Der Auftragnehmer haftet ausschliesslich bei vorsätzlichem oder grob fahrlässigem Verhalten. Die Haftung ist der Höhe nach auf den vereinbarten Projektpreis beschränkt. Eine Haftung für indirekte Schäden, Folgeschäden, entgangenen Gewinn, Datenverlust oder Ansprüche Dritter ist ausgeschlossen.", "The contractor is only liable in cases of intentional or grossly negligent conduct. Liability is limited to the agreed project price. Liability for indirect damages, consequential damages, loss of profit, data loss, or third-party claims is excluded.")}
              </p>
              <h3>{t("Freistellung", "Indemnification")}</h3>
              <p>
                {t("Der Auftraggeber stellt den Auftragnehmer von allen Ansprüchen Dritter frei, die aus der rechtswidrigen Verwendung der Website oder aus rechtswidrigen Inhalten entstehen.", "The client indemnifies the contractor against all third-party claims arising from unlawful use of the website or unlawful content.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="kuendigung2" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 9</span>
              <h2>{t("Laufzeit & Kündigung", "Term & Termination")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Kündigung", "Termination")}</h3>
              <ul>
                <li>
                  {t("Bei Kündigung nach Entwicklungsbeginn wird die bis dahin geleistete Arbeit anteilsmässig in Rechnung gestellt. Die Anzahlung wird nicht zurückerstattet.", "If termination occurs after development has begun, work completed to date will be invoiced proportionally. The deposit is non-refundable.")}
                </li>
                <li>
                  {t("Eine Kündigung der Hosting-Vereinbarung ist frühestens nach Ablauf der Mindestlaufzeit von 6 Monaten möglich. Danach kann sie von beiden Seiten mit 30 Tagen Frist auf Monatsende schriftlich gekündigt werden. Bei vorzeitiger Kündigung sind die verbleibenden Monate bis zum Ende der Mindestlaufzeit vollständig geschuldet.", "The hosting agreement may only be terminated after the minimum term of 6 months. Thereafter, it may be terminated by either party with 30 days' notice at the end of the month. In the event of early termination, the remaining months until the end of the minimum term are fully owed.")}
                </li>
                <li>
                  {t("Die Domain ist auf den Namen des Auftraggebers registriert und wird bei Kündigung innerhalb von 7 Tagen auf ihn übertragen.", "The domain is registered in the client's name and will be transferred to them within 7 days upon termination.")}
                </li>
                <li>
                  {t("Die Website wird nach Ablauf der Kündigungsfrist vollständig vom Server entfernt. Ein Datenexport kann gegen eine Pauschale von CHF 50.00 angefordert werden.", "The website will be completely removed from the server after the notice period. A data export can be requested for a flat fee of CHF 50.00.")}
                </li>
              </ul>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="schlussbestimmungen" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 10</span>
              <h2>{t("Schlussbestimmungen", "Final Provisions")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Anwendbares Recht & Gerichtsstand", "Governing Law & Jurisdiction")}</h3>
              <p>
                {t("Dieser Vertrag unterliegt Schweizer Recht. Gerichtsstand ist Zürich, Schweiz.", "This agreement is governed by Swiss law. The place of jurisdiction is Zurich, Switzerland.")}
              </p>
              <h3>{t("Salvatorische Klausel", "Severability Clause")}</h3>
              <p>
                {t("Sollte eine Bestimmung dieses Vertrags ganz oder teilweise unwirksam oder undurchführbar sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Anstelle der unwirksamen Bestimmung gilt eine rechtlich zulässige Regelung als vereinbart, die dem wirtschaftlichen Zweck der ursprünglichen Bestimmung am nächsten kommt.", "Should any provision of this contract be wholly or partially invalid or unenforceable, the validity of the remaining provisions shall remain unaffected. The invalid provision shall be replaced by a legally permissible rule that most closely serves the economic purpose of the original.")}
              </p>
              <h3>{t("Schriftformklausel", "Written Form Clause")}</h3>
              <p>
                {t("Alle Änderungen oder Ergänzungen müssen schriftlich erfolgen, mündliche Nebenabreden gelten nicht.", "All amendments or additions must be made in writing; verbal side agreements are not valid.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="browser-kompatibilitaet" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 11</span>
              <h2>{t("Browser- & Geräte-Kompatibilität", "Browser & Device Compatibility")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Der Auftragnehmer gewährleistet die korrekte Darstellung und Funktion der Website auf aktuellen Versionen der Browser Chrome, Safari und Firefox sowie auf gängigen mobilen Endgeräten (iOS und Android). Ältere Browserversionen sind von dieser Gewährleistung ausgenommen.", "The contractor guarantees the correct display and functionality of the website on current versions of Chrome, Safari and Firefox, as well as on common mobile devices (iOS and Android). Older browser versions are excluded from this warranty.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="backup-regelung" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 12</span>
              <h2>{t("Backup-Regelung", "Backup Policy")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Der Auftragnehmer erstellt wöchentliche Backups der Website-Daten im Rahmen der Hosting-Vereinbarung. Backups werden maximal 6 Monate aufbewahrt und danach automatisch gelöscht. Die Wiederherstellung erfolgt ausschliesslich auf Basis des zuletzt verfügbaren Backups. Bei Datenverlust infolge von Drittanbieter-Ausfällen, höherer Gewalt oder Cyberangriffen übernimmt der Auftragnehmer keine Haftung, sofern kein vorsätzliches oder grob fahrlässiges Verhalten vorliegt. Dem Auftraggeber wird empfohlen, zusätzlich eigene Datensicherungen vorzunehmen.", "The contractor creates weekly backups of website data as part of the hosting agreement. Backups are retained for a maximum of 6 months and then automatically deleted. Recovery is based exclusively on the most recent available backup. The contractor accepts no liability for data loss resulting from third-party outages, force majeure or cyberattacks, unless intentional or grossly negligent conduct is present. The client is advised to maintain their own additional backups.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="it-sicherheit" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 13</span>
              <h2>{t("IT-Sicherheit", "IT Security")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Der Auftragnehmer setzt branchenübliche technische und organisatorische Sicherheitsmassnahmen ein. Eine absolute Sicherheit gegen Hackerangriffe oder unbefugte Zugriffe kann jedoch nicht garantiert werden. Eine Haftung für Cyberangriffe oder Sicherheitsverletzungen durch Dritte ist ausgeschlossen, sofern kein vorsätzliches oder grob fahrlässiges Verhalten vorliegt.", "The contractor employs industry-standard technical and organisational security measures. However, absolute protection against cyberattacks or unauthorised access cannot be guaranteed. Liability for cyberattacks or security breaches by third parties is excluded unless intentional or grossly negligent conduct is present.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="zugangsdaten" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 14</span>
              <h2>{t("Login & Zugangsdaten", "Login & Access Data")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Der Auftragnehmer stellt dem Auftraggeber nach Abnahme einen persönlichen Login-Zugang für das Dashboard bereit. Der Auftraggeber ist verpflichtet, seine Zugangsdaten vertraulich zu behandeln und nicht an Dritte weiterzugeben. Bei Verdacht auf Missbrauch oder Verlust ist der Auftraggeber verpflichtet, den Auftragnehmer unverzüglich schriftlich zu informieren. Der Auftragnehmer übernimmt keine Haftung für Schäden durch unsachgemässe Handhabung oder Weitergabe der Zugangsdaten. Bei Kündigung der Hosting-Vereinbarung werden alle Zugangsdaten innerhalb von 7 Tagen vollständig deaktiviert.", "After acceptance, the contractor provides the client with a personal login for the dashboard. The client is obliged to keep access credentials confidential and not share them with third parties. In case of suspected misuse or loss, the client must immediately notify the contractor in writing. The contractor accepts no liability for damages arising from improper handling or disclosure of access credentials. Upon termination of the hosting agreement, all client access credentials will be fully deactivated within 7 days.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="projektkommunikation" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 15</span>
              <h2>{t("Projektkommunikation", "Project Communication")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Projektbezogene Kommunikation sowie Änderungswünsche sind ausschliesslich per E-Mail an die im Vertrag angegebene Adresse einzureichen. Anfragen, Änderungswünsche oder Anweisungen, die über andere Kommunikationskanäle (z. B. WhatsApp, Telefon, SMS oder Social Media) übermittelt werden, gelten erst nach schriftlicher Bestätigung per E-Mail als verbindlich. Der Auftragnehmer ist berechtigt, ausschliesslich auf Grundlage schriftlich bestätigter Anweisungen zu arbeiten.", "Project-related communication and change requests must be submitted exclusively by email to the address specified in the contract. Requests, change requests or instructions submitted via other channels (e.g. WhatsApp, phone, SMS or social media) are only binding after written confirmation by email. The contractor is entitled to work exclusively on the basis of written confirmed instructions.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="projektpause" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 16</span>
              <h2>{t("Projektpause bei fehlender Mitwirkung", "Project Pause Due to Lack of Cooperation")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Erfolgt über einen Zeitraum von 30 Kalendertagen keine Rückmeldung des Auftraggebers oder werden erforderliche Inhalte (z. B. Texte, Bilder, Logos oder Zugangsdaten) nicht bereitgestellt, gilt das Projekt automatisch als pausiert. Der Auftragnehmer ist berechtigt, das Projekt erst nach erneuter Terminvereinbarung fortzuführen. Eine sofortige Weiterbearbeitung kann in diesem Fall nicht garantiert werden. Eine Verzögerung durch fehlende Mitwirkung des Auftraggebers verlängert sämtliche vereinbarten Lieferfristen entsprechend.", "If the client does not respond within 30 calendar days or fails to provide required content (e.g. texts, images, logos or access data), the project is automatically considered paused. The contractor is entitled to resume the project only after a new appointment has been arranged. Immediate continuation cannot be guaranteed in this case. Delays caused by lack of client cooperation extend all agreed delivery deadlines accordingly.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="referenznutzung" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 17</span>
              <h2>{t("Referenznutzung & Marketing", "Reference Use & Marketing")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Der Auftragnehmer ist berechtigt, das erstellte Projekt nach Veröffentlichung zu Referenzzwecken zu nutzen. Dies umfasst insbesondere die Darstellung der Website, Screenshots, die Nennung des Firmennamens sowie die Verwendung des Logos des Auftraggebers auf der Website, in Präsentationen, Social Media, Referenzlisten und sonstigen Marketingunterlagen des Auftragnehmers.", "The contractor is entitled to use the completed project for reference purposes after publication. This includes, in particular, the display of the website, screenshots, the mention of the company name and the use of the client's logo on the website, in presentations, social media, reference lists and other marketing materials of the contractor.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="unangemessenes-verhalten" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 18</span>
              <h2>{t("Beendigung bei unangemessenem Verhalten", "Termination Due to Inappropriate Behaviour")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Der Auftragnehmer behält sich das Recht vor, die Zusammenarbeit ausserordentlich zu beenden, sofern der Auftraggeber wiederholt unangemessenes Verhalten zeigt. Dazu zählen insbesondere Beleidigungen, Drohungen, unzumutbare Anforderungen oder ein Verhalten, das eine professionelle Zusammenarbeit erheblich beeinträchtigt. In diesem Fall werden bereits erbrachte Leistungen anteilsmässig verrechnet. Bereits geleistete Zahlungen werden nicht zurückerstattet.", "The contractor reserves the right to terminate the collaboration with immediate effect if the client repeatedly displays inappropriate behaviour. This includes, in particular, insults, threats, unreasonable demands or conduct that significantly impairs professional cooperation. In such cases, services already rendered will be invoiced proportionally. Payments already made will not be refunded.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="eigentumsvorbehalt" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 19</span>
              <h2>{t("Eigentumsvorbehalt", "Retention of Title")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Bis zur vollständigen Begleichung aller aus diesem Vertrag resultierenden Forderungen bleibt die erstellte Website, einschliesslich Design, Struktur, Quellcode und sämtlicher damit verbundenen Dateien, Eigentum des Auftragnehmers. Der Auftraggeber erhält erst nach vollständiger Bezahlung sämtlicher Rechnungen das vertraglich vereinbarte Nutzungsrecht. Der Auftragnehmer ist berechtigt, die Website oder einzelne Funktionen vorübergehend zu deaktivieren, sofern offene Forderungen bestehen oder vereinbarte Zahlungen nicht fristgerecht erfolgen. Eine dauerhafte Nutzung der Website ohne vollständige Zahlung der vereinbarten Vergütung ist ausgeschlossen.", "Until full payment of all claims arising from this contract, the created website, including design, structure, source code and all associated files, remains the property of the contractor. The client only receives the contractually agreed right of use after full payment of all invoices. The contractor is entitled to temporarily deactivate the website or individual functions if outstanding claims exist or agreed payments are not made on time. Permanent use of the website without full payment of the agreed remuneration is excluded.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="scope-creep" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 20</span>
              <h2>{t("Leistungsabgrenzung", "Scope Definition")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Der Leistungsumfang ergibt sich ausschliesslich aus dem vom Auftraggeber gewählten Paket sowie dem unterzeichneten Angebot. Leistungen, Funktionen, Seiten, Integrationen oder Anpassungen, die nicht ausdrücklich im Angebot aufgeführt sind, gelten als zusätzliche Leistungen. Solche zusätzlichen Leistungen werden ausschliesslich nach vorheriger Abstimmung erbracht und separat zu CHF 120.00 pro Stunde verrechnet oder in einem separaten Angebot festgehalten. Der Auftragnehmer ist nicht verpflichtet, Leistungen zu erbringen, die über den vereinbarten Leistungsumfang hinausgehen. Zusätzliche Anforderungen können die vereinbarte Lieferfrist entsprechend verlängern.", "The scope of services is determined exclusively by the client's selected package and the signed offer. Services, features, pages, integrations or adjustments not expressly listed in the offer are considered additional services. Such additional services will only be provided after prior agreement and will be billed separately at CHF 120.00 per hour or recorded in a separate offer. The contractor is not obliged to provide services that exceed the agreed scope. Additional requirements may extend the agreed delivery deadline accordingly.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="online-stellung" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 21</span>
              <h2>{t("Online-Stellung & Domainzugang", "Go-Live & Domain Access")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Mit Unterzeichnung dieses Vertrags erteilt der Auftraggeber dem Auftragnehmer die uneingeschränkte Erlaubnis, die Website online zu stellen. Der Auftraggeber verpflichtet sich, dem Auftragnehmer sämtliche notwendigen Zugangsdaten zu Domain, Hosting, Server, CMS und weiteren relevanten Systemen vollständig und korrekt zur Verfügung zu stellen. Die Online-Stellung der Website erfolgt erst nach Bereitstellung dieser Zugänge. Sollte der Auftraggeber diese Zugänge nicht bereitstellen, wird der Auftragnehmer von jeglicher Verantwortung für Verzögerungen oder fehlende Online-Stellung freigestellt.", "By signing this contract, the client grants the contractor unrestricted permission to publish the website. The client undertakes to provide the contractor with all necessary access credentials for domain, hosting, server, CMS and other relevant systems completely and correctly. The website will only go live after these credentials have been provided. If the client fails to provide these credentials, the contractor is released from any responsibility for delays or failure to go live.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="datenschutzerklaerung-impressum" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">§ 22</span>
              <h2>{t("Datenschutzerklärung & Impressum", "Privacy Policy & Legal Notice")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Der Auftragnehmer erstellt im Rahmen des Projekts eine Datenschutzerklärung sowie ein Impressum gemäss den Anforderungen des Schweizer Datenschutzgesetzes (DSG). Der Auftraggeber ist verantwortlich, den Auftragnehmer über alle datenschutzrelevanten Informationen rechtzeitig zu informieren. Änderungen an gesetzlichen Anforderungen nach Abnahme der Website obliegen dem Auftraggeber und werden separat verrechnet.", "As part of the project, the contractor creates a privacy policy and legal notice in accordance with the requirements of the Swiss Data Protection Act (DSG). The client is responsible for informing the contractor of all data protection-relevant information in a timely manner. Changes to legal requirements after acceptance of the website are the responsibility of the client and will be billed separately.")}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
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
