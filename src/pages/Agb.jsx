import LegalGrid from '../components/LegalGrid.jsx'
import LegalNav from '../components/LegalNav.jsx'
import ScrollTopButton from '../components/ScrollTopButton.jsx'
import Seo from '../components/Seo.jsx'
import { siteValues } from '../data/siteValues.js'
import useLegalLang from '../hooks/useLegalLang.js'
import '../styles/global.css'
import '../styles/agb.css'

// agb.html: prerendered in German, switches to English on the client (localStorage).
export default function Agb() {
  const { lang, setLang, t, htmlLang } = useLegalLang()
  const vd = siteValues('de')
  const ve = siteValues('en')

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
            <p className="legal-subtitle">{t("Stand: Oktober 2026", "As of: October 2026")}</p>
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
            <a href="#hosting" className="toc-link">{t("13. Hosting & Wartung", "13. Hosting & Maintenance")}</a>
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
            <a href="#projektkommunikation" className="toc-link">{t("§ 15 Projektkommunikation", "§ 15 Communication")}</a>
            {' '}
            <a href="#projektpause" className="toc-link">{t("§ 16 Projektpause", "§ 16 Project Pause")}</a>
            {' '}
            <a href="#referenznutzung" className="toc-link">{t("§ 17 Referenznutzung", "§ 17 References")}</a>
            {' '}
            <a href="#unangemessenes-verhalten" className="toc-link">{t("§ 18 Verhaltensklausel", "§ 18 Conduct Clause")}</a>
            {' '}
            <a href="#eigentumsvorbehalt" className="toc-link">{t("§ 19 Eigentumsvorbehalt", "§ 19 Retention of Title")}</a>
            {' '}
            <a href="#scope-creep" className="toc-link">{t("§ 20 Leistungsabgrenzung", "§ 20 Scope Definition")}</a>
            {' '}
            <a href="#online-stellung" className="toc-link">{t("§ 21 Veröffentlichung", "§ 21 Publication")}</a>
            {' '}
            <a href="#datenschutzerklaerung-impressum" className="toc-link">{t("§ 22 Datenschutz & Impressum", "§ 22 Privacy & Legal Notice")}</a>
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
                  {t("Der genaue Leistungsumfang richtet sich nach dem gewählten Paket (Landingpage, Onepager, Firmenwebsite oder Individuell) sowie individuellen Vereinbarungen, die im jeweiligen Angebot schriftlich festgehalten sind.", "The exact scope of services depends on the selected package (landing page, one-pager, company website or custom project) as well as individual agreements set out in writing in the respective offer.")}
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
                {t(`Die Lieferzeit richtet sich nach dem gewählten Paket (Landingpage ${vd.landingpageWeeks} Wochen, Onepager ${vd.onepagerWeeks} Wochen, Firmenwebsite ${vd.firmenwebsiteWeeks} Wochen, verlängert um die im Angebot genannten Zusätze) und läuft ab dem Tag, an dem alle Inhalte vollständig vorliegen und die Anzahlung eingegangen ist. Der Auftragnehmer informiert rechtzeitig über den Fertigstellungstermin.`, `The delivery time depends on the selected package (landing page ${ve.landingpageWeeks} weeks, one-pager ${ve.onepagerWeeks} weeks, company website ${ve.firmenwebsiteWeeks} weeks, extended by the extras stated in the offer) and runs from the day all content is complete and the deposit has been received. The contractor will notify the client of the completion date in good time.`)}
              </p>
              <p>
                {t(`Express (nur Onepager und Firmenwebsite, nicht zusammen mit dem Zusatz Texte schreiben): Lieferung in rund ${vd.expressTime} % der üblichen Zeit gegen ${vd.expressPercent} % Aufpreis auf die Zwischensumme, nach Verfügbarkeit und nur, wenn alle Inhalte beim Projektstart vollständig vorliegen.`, `Express (one-pager and company website only, not together with the copywriting extra): delivery in around ${ve.expressTime} % of the usual time for a ${ve.expressPercent} % surcharge on the subtotal, subject to availability and only if all content is complete at project start.`)}
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
                <li>
                  {t(`Zahlungsplan: ${vd.deposit} % bei Auftrag, ${vd.balance} % vor der Veröffentlichung. Bei individuellen Projekten ${vd.individualPayment} % (bei Auftrag, nach Freigabe des Entwurfs, vor der Veröffentlichung).`, `Payment plan: ${ve.deposit} % on order, ${ve.balance} % before publication. For custom projects ${ve.individualPayment} % (on order, after approval of the design, before publication).`)}
                </li>
                <li>{t("Die Veröffentlichung erfolgt erst nach vollständiger Bezahlung.", "Publication takes place only after full payment.")}</li>
                <li>
                  {t(`Individuelle Projekte beginnen mit einem Konzeptgespräch (${vd.conceptHours} Stunden, CHF ${vd.conceptPrice}), das bei Auftragserteilung angerechnet wird.`, `Custom projects start with a concept talk (${ve.conceptHours} hours, CHF ${ve.conceptPrice}), credited when the order is placed.`)}
                </li>
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
                {t(`Kosten für Drittanbieter-Leistungen (z.B. Domain, Plugins, APIs) sind nicht im Projektpreis enthalten. Sie werden im Angebot separat ausgewiesen und zusätzlich verrechnet. Änderungen der Preise von Drittanbietern nach Vertragsabschluss können an den Kunden weitergegeben werden. Die ersten ${vd.months} Monate Wartung sind im Projektpreis enthalten; danach sind Hosting und Wartung freiwillig (siehe Hosting & Wartung).`, `Costs for third-party services (e.g. domain, plugins, APIs) are not included in the project price. They are listed separately in the offer and billed in addition. Changes in third-party prices after conclusion of the contract may be passed on to the client. The first ${ve.months} months of maintenance are included in the project price; after that, hosting and maintenance are optional (see Hosting & Maintenance).`)}
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
                {t(`Der Kunde stellt alle notwendigen Inhalte (Texte, Bilder, Logos, Farbwelt) bis zum Projektstart bereit. Die Lieferzeit läuft ab vollständigen Inhalten. Fehlen Inhalte ${vd.contentGraceDays} Tage nach Projektstart noch, verschiebt sich das Projekt auf den nächsten freien Termin.`, `The client provides all necessary content (texts, images, logos, colour scheme) by project start. The delivery time runs from complete content. If content is still missing ${ve.contentGraceDays} days after project start, the project moves to the next free slot.`)}
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
                {t(`Während der Entwicklung sind ${vd.rounds} Korrekturrunden inbegriffen. Nach der Veröffentlichung behebt der Auftragnehmer während ${vd.bugfixDays} Tagen kostenlos Abweichungen vom vereinbarten Umfang. Weitere Änderungen und Mehraufwand werden mit CHF ${vd.hourly} pro Stunde verrechnet und vorher angekündigt. Neue Funktionen oder strukturelle Umbauten gelten nicht als Korrektur und werden separat offeriert.`, `${ve.rounds} rounds of corrections are included during development. After publication, the contractor fixes deviations from the agreed scope free of charge for ${ve.bugfixDays} days. Further changes and extra work are billed at CHF ${ve.hourly} per hour and announced beforehand. New functions or structural changes do not count as corrections and are quoted separately.`)}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="eigentum" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">10</span>
              <h2>{t("Eigentumsrechte & Nutzung", "Ownership & Use")}</h2>
            </div>
            <div className="legal-block">
              <ul>
                <li>
                  {t("Nach vollständiger Bezahlung gehen die Rechte an der individuell erstellten Website (Code, Design, Inhalte) auf den Auftraggeber über. Ausgenommen sind Schriften, Bilder, Bibliotheken und andere Komponenten von Dritten, die unter ihren eigenen Lizenzen bleiben.", "Upon full payment, the rights to the individually created website (code, design, content) pass to the client. Excluded are fonts, images, libraries and other third-party components, which remain under their own licences.")}
                </li>
                <li>
                  {t("Bis zur vollständigen Bezahlung kann der Auftragnehmer die Website zurückbehalten (siehe Zurückbehaltungsrecht und Eigentumsvorbehalt).", "Until full payment, the contractor may withhold the website (see right of retention and retention of title).")}
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
                {t(`Der Auftragnehmer behebt während ${vd.bugfixDays} Tagen nach der Veröffentlichung kostenlos Abweichungen vom vereinbarten Umfang und technische Mängel, die schriftlich gemeldet werden. Änderungswünsche und neue Funktionen sind davon ausgenommen.`, `For ${ve.bugfixDays} days after publication, the contractor fixes deviations from the agreed scope and technical defects reported in writing free of charge. Change requests and new functions are excluded.`)}
              </p>
            </div>
          </LegalGrid>
          <div className="legal-divider"></div>
          <LegalGrid id="hosting" className="legal-grid wide">
            <div className="legal-block">
              <span className="legal-block-label">13</span>
              <h2>{t("Hosting & Wartung", "Hosting & Maintenance")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t(`Die ersten ${vd.months} Monate Wartung sind in jedem Website-Paket enthalten (Landingpage: Basis, Onepager und Firmenwebsite: Business). Danach sind Hosting und Wartung freiwillig. Ohne Wartungspaket liegen Hosting, Updates und Backups beim Auftraggeber.`, `The first ${ve.months} months of maintenance are included in every website package (landing page: Basic, one-pager and company website: Business). After that, hosting and maintenance are optional. Without a maintenance plan, hosting, updates and backups are the responsibility of the client.`)}
              </p>
              <p>
                {t("Wählt der Auftraggeber ein Wartungspaket (Basis, Business oder Premium), richten sich Leistungen, Backups, Änderungskontingent und Reaktionszeit nach dem gewählten Paket gemäss sin-digital.com/wartung/. Die Reaktionszeit wird in Werktagen gerechnet (Montag bis Freitag ohne Feiertage im Kanton Zürich). Reaktion heisst Rückmeldung und Beginn der Analyse, nicht Behebung. Arbeiten über dem Kontingent des Pakets sowie neue Seiten, Funktionen oder strukturelle Änderungen werden nach vorheriger Rückfrage zu CHF 120.00 pro Stunde verrechnet.", "If the client chooses a maintenance plan (Basis, Business or Premium), services, backups, change allowance and response time depend on the selected plan as described at sin-digital.com/en/maintenance/. Response time is counted in working days (Monday to Friday, excluding public holidays in the canton of Zurich). Response means a reply and the start of the analysis, not the fix. Work beyond the plan's allowance as well as new pages, features or structural changes are billed at CHF 120.00 per hour after prior consultation.")}
              </p>
              <p>
                {t(`Die Gebühr ist monatlich oder jährlich zahlbar. Bei jährlicher Zahlung sind 10 statt 12 Monatsgebühren im Voraus zu bezahlen. Das Jahresabo verlängert sich um ${vd.renewal} Monate, wenn es nicht gekündigt wird; der Auftragnehmer erinnert ${vd.reminderDays} Tage vorher. Eine anteilige Rückerstattung erfolgt nicht. Die Wartungspreise bleiben ${vd.priceFixedMonths} Monate fix, Änderungen werden ${vd.priceChangeNoticeMonths} Monate vorher angekündigt.`, `The fee is payable monthly or yearly. With yearly payment, 10 instead of 12 monthly fees are payable in advance. A yearly subscription renews by ${ve.renewal} months unless cancelled; the contractor sends a reminder ${ve.reminderDays} days beforehand. There is no pro-rata refund. Maintenance prices stay fixed for ${ve.priceFixedMonths} months, changes are announced ${ve.priceChangeNoticeMonths} months ahead.`)}
              </p>
              <p>
                {t(`Ein Wartungspaket läuft mindestens ${vd.minMonths} Monate ab Abnahme der Website, die ${vd.months} inklusiven Monate zählen dazu. Danach kann es von beiden Parteien mit ${vd.noticeDays} Tagen Frist auf Monatsende schriftlich gekündigt werden. Ein Stufenwechsel startet keine neue Laufzeit. Die Gebühr beginnt nach Ablauf der inklusiven Monate. Nicht genutzte Änderungsminuten verfallen am Monatsende. Reaktion heisst Rückmeldung, nicht Behebung; während angekündigter Ferien des Auftragnehmers ruhen die Reaktionszeiten. Eine permanente oder unterbrechungsfreie Verfügbarkeit der Website wird nicht garantiert.`, `A maintenance plan runs for at least ${ve.minMonths} months from acceptance of the website, the ${ve.months} included months count towards it. After that, either party may cancel in writing with ${ve.noticeDays} days of notice to the end of a month. Changing the plan does not start a new term. The fee starts after the included months. Unused change minutes expire at the end of the month. Response means getting back to the client, not fixing; during the announced holidays of the contractor the response times pause. Permanent or uninterrupted availability of the website is not guaranteed.`)}
              </p>
              <p>
                {t(`Wählt der Auftraggeber nach Ablauf der inklusiven Monate trotz zweier Erinnerungen kein Wartungspaket, erhält er Code und Zugänge; die Website bleibt danach noch ${vd.graceDays} Tage online.`, `If the client does not choose a maintenance plan after the included months despite two reminders, the client receives the code and access details; the website then stays online for another ${ve.graceDays} days.`)}
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
                  {t(`Ein Wartungspaket kann frühestens nach Ablauf der Mindestlaufzeit von ${vd.minMonths} Monaten (inklusive der ${vd.months} im Projektpreis enthaltenen Monate) gekündigt werden, mit ${vd.noticeDays} Tagen Frist auf Monatsende. Bei jährlicher Zahlung läuft der Vertrag bis zum Ende des bezahlten Jahres, eine anteilige Rückerstattung erfolgt nicht. Bei vorzeitiger Kündigung sind die verbleibenden Monatsgebühren der Mindestlaufzeit geschuldet.`, `A maintenance plan can be cancelled at the earliest after the minimum term of ${ve.minMonths} months (including the ${ve.months} months contained in the project price), with ${ve.noticeDays} days of notice to the end of a month. With yearly payment, the contract runs until the end of the paid year; there is no pro-rata refund. In case of early termination, the remaining monthly fees of the minimum term are owed.`)}
                </li>
                <li>
                  {t("Die Domain ist auf den Auftraggeber registriert und wird bei Kündigung innerhalb von 7 Tagen übertragen. Auf Wunsch erhält der Auftraggeber die Website-Dateien und Inhalte kostenlos. Danach wird die Website vom Server des Auftragnehmers entfernt.", "The domain is registered in the client's name and will be transferred within 7 days upon termination. On request, the client receives the website files and content free of charge. The website is then removed from the contractor's server.")}
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
                {t("Der Leistungsumfang ergibt sich aus dem gewählten Paket (Landingpage, Onepager, Firmenwebsite oder Individuell) und wird im individuellen Angebot verbindlich festgehalten. Angaben auf der Website oder in Marketingunterlagen sind unverbindlich. Massgebend ist ausschliesslich das unterzeichnete Angebot.", "The scope of services is determined by the selected package (landing page, one-pager, company website or custom project) and is set out bindingly in the individual offer. Information on the website or in marketing materials is non-binding. The signed offer is the sole binding document.")}
              </p>
              <h3>{t("Entwicklungszeit & Lieferung", "Development Time & Delivery")}</h3>
              <p>
                {t(`Die Lieferzeit richtet sich nach dem gewählten Paket (Landingpage ${vd.landingpageWeeks} Wochen, Onepager ${vd.onepagerWeeks} Wochen, Firmenwebsite ${vd.firmenwebsiteWeeks} Wochen, verlängert um die im Angebot genannten Zusätze) und läuft ab dem Tag, an dem alle Inhalte vollständig vorliegen und die Anzahlung eingegangen ist. Der Auftragnehmer informiert rechtzeitig über den Fertigstellungstermin.`, `The delivery time depends on the selected package (landing page ${ve.landingpageWeeks} weeks, one-pager ${ve.onepagerWeeks} weeks, company website ${ve.firmenwebsiteWeeks} weeks, extended by the extras stated in the offer) and runs from the day all content is complete and the deposit has been received. The contractor will notify the client of the completion date in good time.`)}
              </p>
              <p>
                {t(`Express (nur Onepager und Firmenwebsite, nicht zusammen mit dem Zusatz Texte schreiben): Lieferung in rund ${vd.expressTime} % der üblichen Zeit gegen ${vd.expressPercent} % Aufpreis auf die Zwischensumme, nach Verfügbarkeit und nur, wenn alle Inhalte beim Projektstart vollständig vorliegen.`, `Express (one-pager and company website only, not together with the copywriting extra): delivery in around ${ve.expressTime} % of the usual time for a ${ve.expressPercent} % surcharge on the subtotal, subject to availability and only if all content is complete at project start.`)}
              </p>
              <h3>{t("Änderungswünsche", "Change Requests")}</h3>
              <ul>
                <li>
                  {t(`${vd.rounds} Korrekturrunden während der Entwicklung sind inklusive; nach der Veröffentlichung ${vd.bugfixDays} Tage Fehlerbehebung für Abweichungen vom vereinbarten Umfang.`, `${ve.rounds} rounds of corrections during development are included; after publication, ${ve.bugfixDays} days of bug fixing for deviations from the agreed scope.`)}
                </li>
                <li>
                  {t(`Weitere Änderungen und Mehraufwand werden mit CHF ${vd.hourly} pro Stunde berechnet und vorher angekündigt.`, `Further changes and extra work are charged at CHF ${ve.hourly} per hour and announced beforehand.`)}
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
                <li>
                  {t(`Einmaliger Fixpreis gemäss Angebot. Mehraufwand nur nach vorheriger Ankündigung, zu CHF ${vd.hourly} pro Stunde.`, `One-time fixed price as per offer. Extra work only after prior notice, at CHF ${ve.hourly} per hour.`)}
                </li>
                <li>
                  {t(`Hosting & Wartung: Die ersten ${vd.months} Monate sind im Projektpreis enthalten (Landingpage: Basis, Onepager und Firmenwebsite: Business). Danach Gebühr gemäss gewähltem Wartungspaket, monatlich oder jährlich. Bei jährlicher Zahlung 10 statt 12 Monatsgebühren, im Voraus zahlbar.`, `Hosting & maintenance: the first ${ve.months} months are included in the project price (landing page: Basic, one-pager and company website: Business). After that, the fee of the selected maintenance plan applies, monthly or yearly. With yearly payment, 10 instead of 12 monthly fees, payable in advance.`)}
                </li>
              </ul>
              <h3>{t("Zahlungsplan", "Payment Plan")}</h3>
              <div className="legal-highlight">
                <p>
                  <strong>{t("Zahlungsplan:", "Payment Plan:")}</strong>
                </p>
                <p>
                  {t(`• ${vd.deposit} % Anzahlung bei Auftrag (vor Entwicklungsbeginn)`, `• ${ve.deposit} % deposit on order (before development begins)`)}
                </p>
                <p>
                  {t(`• ${vd.balance} % Restbetrag vor der Veröffentlichung; die Website geht erst nach vollständiger Bezahlung online`, `• ${ve.balance} % balance before publication; the website goes online only after full payment`)}
                </p>
                <p>
                  {t(`• Individuelle Projekte: ${vd.individualPayment} % (bei Auftrag, nach Freigabe des Entwurfs, vor der Veröffentlichung)`, `• Custom projects: ${ve.individualPayment} % (on order, after approval of the design, before publication)`)}
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
              <h2>{t("Rechte an der Website & Urheberrecht", "Rights to the Website & Copyright")}</h2>
            </div>
            <div className="legal-block">
              <h3>{t("Rechteübergang", "Transfer of Rights")}</h3>
              <ul>
                <li>
                  {t("Nach vollständiger Bezahlung gehen die Rechte an der individuell erstellten Website (Code, Design, Inhalte) auf den Auftraggeber über. Ausgenommen sind Schriften, Bilder, Bibliotheken und andere Komponenten von Dritten, die unter ihren eigenen Lizenzen bleiben.", "Upon full payment, the rights to the individually created website (code, design, content) pass to the client. Excluded are fonts, images, libraries and other third-party components, which remain under their own licences.")}
                </li>
                <li>
                  {t("Bis zur vollständigen Bezahlung kann der Auftragnehmer die Website zurückbehalten (siehe Zurückbehaltungsrecht und Eigentumsvorbehalt).", "Until full payment, the contractor may withhold the website (see right of retention and retention of title).")}
                </li>
                <li>
                  {t("Der Auftragnehmer darf die Website im Portfolio erwähnen und einen diskreten Hinweis im Footer platzieren.", "The contractor may mention the website in their portfolio and place a discreet note in the footer ('Website created by Sin Digital').")}
                </li>
              </ul>
              <h3>{t("Drittanbieter & Open-Source", "Third-Party & Open-Source")}</h3>
              <p>
                {t("Notwendige Drittanbieter-Leistungen (z.B. Domain, Plugins, APIs) werden im Angebot separat ausgewiesen und zusätzlich verrechnet. Lizenzbedingungen von Drittanbietern sind einzuhalten.", "Necessary third-party services (e.g. domain, plugins, APIs) are listed separately in the offer and billed in addition. Third-party license terms must be complied with.")}
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
                  {t(`Ein Wartungspaket kann frühestens nach Ablauf der Mindestlaufzeit von ${vd.minMonths} Monaten (inklusive der ${vd.months} im Projektpreis enthaltenen Monate) gekündigt werden, mit ${vd.noticeDays} Tagen Frist auf Monatsende. Bei jährlicher Zahlung läuft der Vertrag bis zum Ende des bezahlten Jahres, eine anteilige Rückerstattung erfolgt nicht. Bei vorzeitiger Kündigung sind die verbleibenden Monatsgebühren der Mindestlaufzeit geschuldet.`, `A maintenance plan can be cancelled at the earliest after the minimum term of ${ve.minMonths} months (including the ${ve.months} months contained in the project price), with ${ve.noticeDays} days of notice to the end of a month. With yearly payment, the contract runs until the end of the paid year; there is no pro-rata refund. In case of early termination, the remaining monthly fees of the minimum term are owed.`)}
                </li>
                <li>
                  {t("Die Domain ist auf den Namen des Auftraggebers registriert und wird bei Kündigung innerhalb von 7 Tagen auf ihn übertragen.", "The domain is registered in the client's name and will be transferred to them within 7 days upon termination.")}
                </li>
                <li>
                  {t("Auf Wunsch erhält der Auftraggeber die Website-Dateien und Inhalte kostenlos. Nach Ablauf der Kündigungsfrist wird die Website vom Server des Auftragnehmers entfernt.", "On request, the client receives the website files and content free of charge. After the notice period, the website is removed from the contractor's server.")}
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
                {t("Im Rahmen eines Wartungspakets erstellt der Auftragnehmer Backups der Website-Daten in der Häufigkeit des gewählten Pakets (gemäss sin-digital.com/wartung/). Ohne Wartungspaket ist der Auftraggeber selbst für Backups verantwortlich. Backups werden maximal 6 Monate aufbewahrt und danach automatisch gelöscht. Die Wiederherstellung erfolgt ausschliesslich auf Basis des zuletzt verfügbaren Backups. Bei Datenverlust infolge von Drittanbieter-Ausfällen, höherer Gewalt oder Cyberangriffen übernimmt der Auftragnehmer keine Haftung, sofern kein vorsätzliches oder grob fahrlässiges Verhalten vorliegt. Dem Auftraggeber wird empfohlen, zusätzlich eigene Datensicherungen vorzunehmen.", "As part of a maintenance plan, the contractor creates backups of website data at the frequency of the selected plan (see sin-digital.com/en/maintenance/). Without a maintenance plan, backups are the client's responsibility. Backups are retained for a maximum of 6 months and then automatically deleted. Recovery is based exclusively on the most recent available backup. The contractor accepts no liability for data loss resulting from third-party outages, force majeure or cyberattacks, unless intentional or grossly negligent conduct is present. The client is advised to maintain their own additional backups.")}
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
                {t("Der Auftragnehmer stellt dem Auftraggeber nach Abnahme einen persönlichen Login-Zugang für das Dashboard bereit. Der Auftraggeber ist verpflichtet, seine Zugangsdaten vertraulich zu behandeln und nicht an Dritte weiterzugeben. Bei Verdacht auf Missbrauch oder Verlust ist der Auftraggeber verpflichtet, den Auftragnehmer unverzüglich schriftlich zu informieren. Der Auftragnehmer übernimmt keine Haftung für Schäden durch unsachgemässe Handhabung oder Weitergabe der Zugangsdaten. Bei Kündigung des Wartungspakets werden die Zugänge zu Systemen des Auftragnehmers innerhalb von 7 Tagen deaktiviert.", "After acceptance, the contractor provides the client with a personal login for the dashboard. The client is obliged to keep access credentials confidential and not share them with third parties. In case of suspected misuse or loss, the client must immediately notify the contractor in writing. The contractor accepts no liability for damages arising from improper handling or disclosure of access credentials. Upon termination of the maintenance plan, access to the contractor's systems will be deactivated within 7 days.")}
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
                {t(`Erfolgt bis ${vd.contentGraceDays} Tage nach Projektstart keine Rückmeldung des Auftraggebers oder fehlen erforderliche Inhalte (Texte, Bilder, Logos oder Zugangsdaten), verschiebt sich das Projekt auf den nächsten freien Termin des Auftragnehmers. Die Lieferzeit beginnt neu, sobald alle Inhalte vollständig vorliegen. Für die bis dahin geleistete Arbeit kann der Auftragnehmer eine Zwischenrechnung stellen.`, `If the client does not respond or required content (texts, images, logos or access details) is still missing ${ve.contentGraceDays} days after project start, the project moves to the next free slot of the contractor. The delivery time starts anew once all content is complete. The contractor may issue an interim invoice for the work done so far.`)}
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
                {t(`Der Auftragnehmer darf das erstellte Projekt nach der Veröffentlichung als Referenz zeigen: Darstellung der Website, Screenshots, Nennung des Firmennamens und Verwendung des Logos auf der eigenen Website, in Präsentationen, Social Media und Referenzlisten. Der Startrabatt (${vd.launchPercent} % auf den Paketpreis) wird ausschliesslich gegen dieses Referenzrecht mit Name, Logo und Screenshots gewährt; ohne Referenzrecht gilt der Normalpreis. Ohne Startrabatt kann der Auftraggeber der Referenznutzung schriftlich widersprechen.`, `After publication, the contractor may show the project as a reference: presentation of the website, screenshots, mention of the company name and use of the logo on the website of the contractor, in presentations, social media and reference lists. The launch discount (${ve.launchPercent} % off the package price) is granted exclusively in return for this reference right with name, logo and screenshots; without the reference right the regular price applies. Without a launch discount, the client may object to the reference use in writing.`)}
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
                {t("Bis zur vollständigen Bezahlung der Vergütung für die Erstellung der Website bleibt die erstellte Website, einschliesslich Design, Struktur, Quellcode und sämtlicher damit verbundenen Dateien, Eigentum des Auftragnehmers. Mit der vollständigen Bezahlung gehen die Rechte gemäss § 6 auf den Auftraggeber über. Der Auftragnehmer ist berechtigt, die Website oder einzelne Funktionen vorübergehend zu deaktivieren, sofern offene Forderungen bestehen oder vereinbarte Zahlungen nicht fristgerecht erfolgen. Eine dauerhafte Nutzung der Website ohne vollständige Zahlung der vereinbarten Vergütung ist ausgeschlossen.", "Until full payment of the remuneration for creating the website, the created website, including design, structure, source code and all associated files, remains the property of the contractor. Upon full payment, the rights pass to the client as set out in § 6. The contractor is entitled to temporarily deactivate the website or individual functions if outstanding claims exist or agreed payments are not made on time. Permanent use of the website without full payment of the agreed remuneration is excluded.")}
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
              <h2>{t("Veröffentlichung & Domainzugang", "Publication & Domain Access")}</h2>
            </div>
            <div className="legal-block">
              <p>
                {t("Der Auftraggeber stellt dem Auftragnehmer alle notwendigen Zugangsdaten zu Domain, Hosting und weiteren relevanten Systemen vollständig und korrekt zur Verfügung. Die Domain läuft auf den Auftraggeber. Die Veröffentlichung der Website erfolgt nach der Abnahme und erst nach vollständiger Bezahlung.", "The client provides the contractor with all necessary access details for domain, hosting and other relevant systems, complete and correct. The domain is registered in the client's name. The website is published after acceptance and only after full payment.")}
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
