import Seo from '../components/Seo.jsx'
import schema from '../data/schema/webdesign.js'
import { siteValues } from '../data/siteValues.js'
import '../styles/landing.css'

const v = siteValues('de')

// webdesign-zuerich.html: SEO-Landingpage, nur Deutsch, ohne JavaScript ausgeliefert.
export default function Webdesign() {
  return (
    <>
      <Seo htmlAttributes={{ lang: 'de-CH' }} jsonLd={schema}>
        <title>{"Webdesign Zürich | Professionelle Website für KMU ab CHF 990 | Sin Digital"}</title>
        <meta name="description" content={`Professionelles Webdesign in Zürich für KMU, Startups und lokale Unternehmen. Moderne, schnelle und SEO-optimierte Websites zum Fixpreis ab CHF ${v.from}. Landingpage in ${v.landingpageWeeks} Wochen. Jetzt anfragen.`} />
        <meta name="keywords" content="Webdesign Zürich, Webdesigner Zürich, Website Zürich, Webagentur Zürich, professionelle Website Zürich, KMU Website Zürich, Webdesign Agentur Zürich, responsive Webdesign Zürich, modernes Webdesign Zürich" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="geo.region" content="CH-ZH" />
        <meta name="geo.placename" content="Zurich" />
        <meta name="author" content="Sin Digital, Digitalagentur Zürich" />
        <meta name="theme-color" content="#050505" />
        <link rel="canonical" href="https://www.sin-digital.com/webdesign-zuerich.html" />
        <link rel="alternate" hrefLang="de-CH" href="https://www.sin-digital.com/webdesign-zuerich.html" />
        <link rel="alternate" hrefLang="x-default" href="https://www.sin-digital.com/webdesign-zuerich.html" />
        <link rel="icon" type="image/webp" href="/assets/ICON-Logo_Sin-Digital.webp" />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Webdesign Zürich | Professionelle Website für KMU ab CHF 990 | Sin Digital" />
        <meta property="og:description" content={`Professionelles Webdesign in Zürich: moderne Websites für KMU und lokale Unternehmen. Zum Fixpreis, Landingpage in ${v.landingpageWeeks} Wochen.`} />
        <meta property="og:url" content="https://www.sin-digital.com/webdesign-zuerich.html" />
        <meta property="og:image" content="https://www.sin-digital.com/assets/ICON-Logo_Sin-Digital.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Sin Digital, Professionelles Webdesign in Zürich" />
        <meta property="og:site_name" content="Sin Digital" />
        <meta property="og:locale" content="de_CH" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sindigital" />
        <meta name="twitter:title" content="Webdesign Zürich | Sin Digital" />
        <meta name="twitter:description" content={`Professionelles Webdesign in Zürich zum Fixpreis ab CHF ${v.from}. Landingpage in ${v.landingpageWeeks} Wochen.`} />
        <meta name="twitter:image" content="https://www.sin-digital.com/assets/ICON-Logo_Sin-Digital.webp" />
      </Seo>
      <main className="wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          {" › "}
          <strong>Webdesign Zürich</strong>
        </nav>
        <h1>Webdesign Zürich: Professionelle Websites für KMU und lokale Unternehmen</h1>
        <p className="lead">
          {"Sie suchen eine "}
          <strong>Webdesign-Agentur in Zürich</strong>
          , die Ihnen eine professionelle, moderne und schnelle Website erstellt? Sin Digital baut Websites zum Fixpreis für KMU, Startups und lokale Betriebe in Zürich, mit klarem Fokus auf Sichtbarkeit, Anfragen und Vertrauen.
        </p>
        <div className="card">
          <h2>Warum Sie eine professionelle Website in Zürich brauchen</h2>
          <p>
            Über 80% der Kunden informieren sich online, bevor sie ein lokales Unternehmen kontaktieren. Wenn Ihre Website nicht professionell aussieht, nicht mobil optimiert ist oder bei Google nicht gefunden wird, verlieren Sie täglich potenzielle Kunden an Ihre Konkurrenz.
          </p>
          <p>
            Als Webdesign-Agentur in Zürich versteht Sin Digital die Bedürfnisse von Schweizer Unternehmen. Wir erstellen Websites, die nicht nur gut aussehen, sondern aktiv neue Anfragen generieren, durch strategisches Design, schnelle Ladezeiten und lokale Suchmaschinenoptimierung.
          </p>
        </div>
        <div className="card">
          <h2>Was macht unser Webdesign in Zürich besonders?</h2>
          <ul>
            <li>
              <strong>Strategisches Design:</strong>
              {" Jedes Element ist auf Leads und Vertrauen ausgerichtet. Kein Designspielerei, sondern Wirkung."}
            </li>
            <li>
              <strong>Mobile-First:</strong>
              {" Ihre Website wird zuerst für Smartphones entwickelt und funktioniert auf allen Geräten."}
            </li>
            <li>
              <strong>Schnelle Ladezeiten:</strong>
              {" Optimierter Code und komprimierte Bilder sorgen für Ladezeiten unter 2 Sekunden."}
            </li>
            <li>
              <strong>SEO von Anfang an:</strong>
              {" Saubere Seitenstruktur, Meta-Tags, strukturierte Daten und lokale Optimierung für Google Zürich."}
            </li>
            <li>
              <strong>Transparente Preise:</strong>
              {` Fixpreise ab CHF ${v.from}: Landingpage, Onepager oder Firmenwebsite. Keine versteckten Kosten, keine Überraschungen.`}
            </li>
            <li>
              <strong>Persönliche Betreuung:</strong>
              {" Direkter Ansprechpartner in Zürich, keine anonyme Hotline."}
            </li>
          </ul>
        </div>
        <div className="card">
          <h2>Die Pakete, alle zum Fixpreis</h2>
          <h3>{`Landingpage, CHF ${v.landingpage}`}</h3>
          <p>{`Eine Seite, ein Ziel: Anfragen, Anmeldungen oder Buchungen. Bis ${v.landingpageSections} Abschnitte, ein klarer Hauptbutton, Formular. Dauer ${v.landingpageWeeks} Wochen ab vollständigen Inhalten, ${v.months} Monate Wartung inklusive.`}</p>
          <h3>{`Onepager, CHF ${v.onepager}`}</h3>
          <p>{`Ihr ganzes Angebot auf einer Seite, zum Durchscrollen. Bis ${v.onepagerSections} Abschnitte, Menü, Formular, Karte. Dauer ${v.onepagerWeeks} Wochen, ${v.months} Monate Wartung inklusive.`}</p>
          <h3>{`Firmenwebsite, CHF ${v.firmenwebsite}`}</h3>
          <p>{`Mehrere Seiten für Betriebe mit mehreren Leistungen. Bis ${v.firmenwebsitePages} Seiten, eigene Seite pro Leistung, Formular, Karte. Dauer ${v.firmenwebsiteWeeks} Wochen, ${v.months} Monate Wartung inklusive.`}</p>
          <h3>{`Individuell, ab CHF ${v.individuell}`}</h3>
          <p>{`Mehr als ${v.maxPages} Seiten oder eigene Funktionen. Fixpreis nach einem Konzeptgespräch.`}</p>
        </div>
        <div className="card">
          <h2>Für welche Branchen in Zürich erstellt Sin Digital Websites?</h2>
          <p>
            Unser Webdesign in Zürich ist branchenübergreifend: Wir arbeiten mit Coiffeuren, Beauty-Studios, Restaurants, Gastronomiebetrieben, Handwerkern, Ärzten, Anwälten, Immobilienmaklern, Fitnessstudios, Yoga-Studios, Beratern und vielen weiteren Dienstleistern.
          </p>
          <p>
            Egal ob Sie einen Friseursalon in Wiedikon betreiben, eine Zahnarztpraxis am Bellevue haben oder ein Restaurant im Kreis 5 führen, Sin Digital erstellt eine Website, die zu Ihrem Geschäft passt und Ihre Zielgruppe in Zürich erreicht.
          </p>
        </div>
        <div className="card">
          <h2>Unser Webdesign-Prozess</h2>
          <p>
            <strong>1. Analyse:</strong>
            {" Wir lernen Ihr Unternehmen kennen, Zielgruppe, Dienstleistungen, Wettbewerb und Ziele."}
          </p>
          <p>
            <strong>2. Konzeption:</strong>
            {" Gemeinsame Entwicklung von Struktur, Design und Inhalten mit frühzeitigem Feedback."}
          </p>
          <p>
            <strong>3. Umsetzung:</strong>
            {" Professionelle Entwicklung Ihrer Website mit regelmässigen Updates zum Projektstand."}
          </p>
          <p>
            <strong>4. Veröffentlichung & Betreuung:</strong>
            {` Nach der Schlusszahlung geht Ihre Website online. Die ersten ${v.months} Monate Wartung sind inklusive, danach ab CHF ${v.care} pro Monat.`}
          </p>
        </div>
        <div className="card">
          <h2>Webdesign Zürich: Häufige Fragen</h2>
          <h3>Was kostet professionelles Webdesign in Zürich?</h3>
          <p>
            {`Jede Website hat einen Fixpreis: Landingpage CHF ${v.landingpage}, Onepager CHF ${v.onepager}, Firmenwebsite CHF ${v.firmenwebsite}. Zusätze wie Shop, CMS oder weitere Sprachen haben ebenfalls feste Preise. Im Konfigurator sehen Sie Ihren Preis sofort.`}
          </p>
          <h3>Wie lange dauert ein Webdesign-Projekt?</h3>
          <p>{`Eine Landingpage dauert ${v.landingpageWeeks} Wochen, ein Onepager ${v.onepagerWeeks} Wochen, eine Firmenwebsite ${v.firmenwebsiteWeeks} Wochen, gerechnet ab vollständigen Inhalten.`}</p>
          <h3>Ist die SEO-Optimierung im Preis inbegriffen?</h3>
          <p>
            Ja. Jede Website wird mit SEO-Basis geliefert: saubere Struktur, Meta-Tags, schnelle Ladezeiten und lokale Optimierung für Zürich.
          </p>
          <h3>Kann ich die Website später erweitern?</h3>
          <p>
            Ja. Alle Websites von Sin Digital sind modular aufgebaut und können jederzeit mit neuen Seiten, Funktionen oder Integrationen erweitert werden.
          </p>
          <h3>Warum Sin Digital statt einem Freelancer?</h3>
          <p>
            Als Webdesign-Agentur in Zürich bietet Sin Digital klare Prozesse, Fixpreise, eigenen Code und auf Wunsch laufende Betreuung, alles aus einer Hand.
          </p>
        </div>
        <div className="card">
          <h2>Weitere Leistungen</h2>
          <div className="internal-links">
            <a href="/">Digitalagentur Zürich</a>
            {' '}
            <a href="website-zuerich.html">Website Zürich erstellen lassen</a>
            {' '}
            <a href="guenstige-website-zuerich.html">Günstige Website Zürich</a>
            {' '}
            <a href="seo-agentur-zuerich.html">SEO Agentur Zürich</a>
            {' '}
            <a href="webentwicklung-zuerich.html">Webentwicklung Zürich</a>
            {' '}
            <a href="/#projects">Alle Leistungen</a>
            {' '}
            <a href="/#contact">Jetzt anfragen</a>
          </div>
        </div>
        <div className="cta-box">
          <h2>Bereit für professionelles Webdesign in Zürich?</h2>
          <p>
            Sin Digital erstellt Ihre neue Website, professionell, schnell und SEO-optimiert. Kontaktieren Sie uns für ein unverbindliches Gespräch.
          </p>
          <a className="btn" href="/#contact">Kostenlose Anfrage starten</a>
        </div>
      </main>
    </>
  )
}
