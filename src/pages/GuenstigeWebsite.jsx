import Seo from '../components/Seo.jsx'
import schema from '../data/schema/guenstigeWebsite.js'
import { siteValues } from '../data/siteValues.js'
import '../styles/landing.css'
import '../styles/landing-price.css'

const v = siteValues('de')

// guenstige-website-zuerich.html: SEO-Landingpage, nur Deutsch, ohne JavaScript ausgeliefert.
export default function GuenstigeWebsite() {
  return (
    <>
      <Seo htmlAttributes={{ lang: 'de-CH' }} jsonLd={schema}>
        <title>{"Günstige Website Zürich | Professionell ab CHF 990 | Sin Digital"}</title>
        <meta name="description" content={`Website in Zürich zum Fixpreis ab CHF ${v.from}: Landingpage, Onepager oder Firmenwebsite. Eigener Code, SEO-Basis und ${v.months} Monate Wartung inklusive. Ideal für KMU in Zürich.`} />
        <meta name="keywords" content="günstige Website Zürich, Website Zürich günstig, professionelle Website Zürich günstig, KMU Website Zürich, billige Website Zürich, preiswerte Website Zürich, Website günstig erstellen lassen Zürich, Homepage günstig Zürich" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="geo.region" content="CH-ZH" />
        <meta name="geo.placename" content="Zurich" />
        <meta name="author" content="Sin Digital, Digitalagentur Zürich" />
        <meta name="theme-color" content="#050505" />
        <link rel="canonical" href="https://www.sin-digital.com/guenstige-website-zuerich.html" />
        <link rel="alternate" hrefLang="de-CH" href="https://www.sin-digital.com/guenstige-website-zuerich.html" />
        <link rel="alternate" hrefLang="x-default" href="https://www.sin-digital.com/guenstige-website-zuerich.html" />
        <link rel="icon" type="image/webp" href="/assets/ICON-Logo_Sin-Digital.webp" />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Günstige Website Zürich | Professionell ab CHF 990 | Sin Digital" />
        <meta property="og:description" content={`Website in Zürich zum Fixpreis ab CHF ${v.from}. Faire Preise, starkes Design, SEO inklusive.`} />
        <meta property="og:url" content="https://www.sin-digital.com/guenstige-website-zuerich.html" />
        <meta property="og:image" content="https://www.sin-digital.com/assets/ICON-Logo_Sin-Digital.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Sin Digital, Günstige Website in Zürich" />
        <meta property="og:site_name" content="Sin Digital" />
        <meta property="og:locale" content="de_CH" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sindigital" />
        <meta name="twitter:title" content="Günstige Website Zürich | Sin Digital" />
        <meta name="twitter:description" content={`Website in Zürich zum Fixpreis ab CHF ${v.from}. Professionell, SEO-optimiert, für alle Geräte. Jetzt anfragen.`} />
        <meta name="twitter:image" content="https://www.sin-digital.com/assets/ICON-Logo_Sin-Digital.webp" />
      </Seo>
      <main className="wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          {" › "}
          <strong>Günstige Website Zürich</strong>
        </nav>
        <h1>Günstige Website Zürich, professionell ab CHF 990</h1>
        <p className="lead">
          {"Sie suchen eine "}
          <strong>Website in Zürich mit klarem Preis</strong>
          ? Sin Digital arbeitet mit Fixpreisen: Landingpage CHF {v.landingpage}, Onepager CHF {v.onepager}, Firmenwebsite CHF {v.firmenwebsite}. Eigener Code, schnelle Ladezeiten und SEO-Basis inklusive.
        </p>
        <div className="price-highlight">
          <strong>Ab CHF {v.from} einmalig, Fixpreis</strong>
          {`: Landingpage CHF ${v.landingpage}, Onepager CHF ${v.onepager}, Firmenwebsite CHF ${v.firmenwebsite}. Keine versteckten Kosten, ${v.months} Monate Wartung inklusive.`}
          {v.launchActive && (
            <span className="price-launch">
              {`Startrabatt: ${v.launchPercent} % auf den Paketpreis für eines der nächsten ${v.totalSlots} Projekte. Landingpage CHF ${v.landingpageLaunch}, Onepager CHF ${v.onepagerLaunch}, Firmenwebsite CHF ${v.firmenwebsiteLaunch}. Noch ${v.remainingSlots} Plätze, bis ${v.endDate}.`}
            </span>
          )}
        </div>
        <div className="card">
          <h2>Was heisst fairer Preis bei Sin Digital?</h2>
          <p>
            Fair heisst: feste Preise für professionelle Arbeit, vor dem Start bekannt. Sin Digital arbeitet schlank und effizient, klare Pakete, kein unnötiger Overhead, keine aufgeblähten Strukturen. Das spart Kosten, ohne bei der Qualität zu sparen.
          </p>
          <p>
            {`Während viele Zürcher Webagenturen Preise ab CHF 5'000 aufrufen, erhalten Sie bei Sin Digital eine Landingpage für CHF ${v.landingpage} und eine Firmenwebsite mit bis zu ${v.firmenwebsitePages} Seiten für CHF ${v.firmenwebsite}, als Fixpreis.`}
          </p>
        </div>
        <div className="card">
          <h2>Was ist im Fixpreis enthalten?</h2>
          <ul>
            <li>
              <strong>Eigener Code:</strong>
              {" Kein Baukasten. Website, Code und Domain gehören nach Bezahlung Ihnen."}
            </li>
            <li>
              <strong>Das passende Paket:</strong>
              {` Landingpage mit bis zu ${v.landingpageSections} Abschnitten, Onepager mit bis zu ${v.onepagerSections} Abschnitten oder Firmenwebsite mit bis zu ${v.firmenwebsitePages} Seiten.`}
            </li>
            <li>
              <strong>Für alle Geräte:</strong>
              {" Handy, Tablet und Computer."}
            </li>
            <li>
              <strong>Kontaktformular:</strong>
              {" Ihre Kunden können Sie direkt über die Website kontaktieren."}
            </li>
            <li>
              <strong>Google Maps Einbindung:</strong>
              {" Ihr Standort in Zürich wird direkt sichtbar."}
            </li>
            <li>
              <strong>Sauber für Google:</strong>
              {" Titel, Beschreibungen, strukturierte Daten, schnelle Ladezeit und lokale Optimierung für Zürich."}
            </li>
            <li>
              <strong>Wartung inklusive:</strong>
              {` Die ersten ${v.months} Monate sind dabei, danach freiwillig ab CHF ${v.care} pro Monat.`}
            </li>
          </ul>
        </div>
        <div className="card">
          <h2>Fixpreis statt Baukasten, der Unterschied</h2>
          <p>
            Baukasten-Websites sehen oft zunächst gut aus, bringen aber Probleme mit sich:
          </p>
          <ul>
            <li>Langsame Ladezeiten, die Google-Rankings zerstören</li>
            <li>Kein richtiges SEO, Sie werden nicht gefunden</li>
            <li>{"Template-Design, das wie 1'000 andere Seiten aussieht"}</li>
            <li>Kein Support, wenn etwas nicht funktioniert</li>
            <li>Versteckte monatliche Kosten, die sich summieren</li>
          </ul>
          <p>
            Bei Sin Digital erhalten Sie ein professionelles Ergebnis zu einem fairen Preis, mit persönlicher Betreuung, echtem SEO und einem Design, das Ihre Zielgruppe in Zürich anspricht.
          </p>
        </div>
        <div className="card">
          <h2>Für wen passt eine Website zum Fixpreis?</h2>
          <p>Eine Website zum Fixpreis von Sin Digital ist ideal für:</p>
          <ul>
            <li>
              <strong>Gründer und Startups:</strong>
              {" Die einen professionellen Webauftritt brauchen, aber mit einem überschaubaren Budget starten."}
            </li>
            <li>
              <strong>Lokale Dienstleister:</strong>
              {" Coiffeure, Reinigungsfirmen, Handwerker, die online gefunden werden wollen."}
            </li>
            <li>
              <strong>Gastronomiebetriebe:</strong>
              {" Restaurants, Cafés und Bars, die Speisekarte und Öffnungszeiten online präsentieren möchten."}
            </li>
            <li>
              <strong>Freiberufler:</strong>
              {" Fotografen, Berater, Therapeuten, die eine einfache aber professionelle Visitenkarte im Web brauchen."}
            </li>
            <li>
              <strong>KMU in Zürich:</strong>
              {" Die ihren veralteten Webauftritt modernisieren möchten, ohne ein Vermögen auszugeben."}
            </li>
          </ul>
        </div>
        <div className="card">
          <h2>Die Pakete im Überblick</h2>
          <p>{`Drei Pakete, alle zum Fixpreis, alle mit ${v.months} Monaten Wartung:`}</p>
          <h3>{`Landingpage, CHF ${v.landingpage}`}</h3>
          <p>{`Eine Seite mit bis zu ${v.landingpageSections} Abschnitten, ein Ziel. Dauer ${v.landingpageWeeks} Wochen.`}</p>
          <h3>{`Onepager, CHF ${v.onepager}`}</h3>
          <p>{`Ihr ganzes Angebot auf einer Seite mit bis zu ${v.onepagerSections} Abschnitten. Dauer ${v.onepagerWeeks} Wochen.`}</p>
          <h3>{`Firmenwebsite, CHF ${v.firmenwebsite}`}</h3>
          <p>{`Bis zu ${v.firmenwebsitePages} Seiten, eigene Seite pro Leistung. Dauer ${v.firmenwebsiteWeeks} Wochen.`}</p>
          <h3>{`Wartung, ab CHF ${v.care} pro Monat`}</h3>
          <p>{`Hosting, Sicherheit, Updates, Backups und Überwachung. Die ersten ${v.months} Monate sind inklusive.`}</p>
        </div>
        <div className="card">
          <h2>Häufige Fragen zu günstigen Websites in Zürich</h2>
          <h3>Kann ich die Website später erweitern?</h3>
          <p>Ja. Neue Seiten, Funktionen oder Sprachen kommen als Zusätze dazu, ebenfalls mit festen Preisen.</p>
          <h3>Gibt es versteckte Kosten?</h3>
          <p>
            Nein. Der Fixpreis ist einmalig und deckt Design, Entwicklung und SEO-Basis ab. Domain und andere Drittanbieter-Kosten weisen wir im Angebot separat aus. Die ersten {v.months} Monate Wartung sind inklusive, danach ist sie freiwillig ab CHF {v.care} / Monat: <a href="/wartung/">Wartungspakete</a>.
          </p>
          <h3>Wie schnell ist meine Website online?</h3>
          <p>{`Eine Landingpage in ${v.landingpageWeeks} Wochen, ein Onepager in ${v.onepagerWeeks} Wochen, eine Firmenwebsite in ${v.firmenwebsiteWeeks} Wochen, ab vollständigen Inhalten.`}</p>
        </div>
        <div className="card">
          <h2>Weitere Leistungen</h2>
          <div className="internal-links">
            <a href="/">Digitalagentur Zürich</a>
            {' '}
            <a href="webdesign-zuerich.html">Webdesign Zürich</a>
            {' '}
            <a href="website-zuerich.html">Website Zürich erstellen lassen</a>
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
          <h2>Website zum Fixpreis anfragen</h2>
          <p>
            Kontaktieren Sie Sin Digital und erhalten Sie ein Angebot mit Fixpreis für Ihre Website ab CHF {v.from}.
          </p>
          <a className="btn" href="/#contact">Unverbindliche Offerte anfragen</a>
        </div>
      </main>
    </>
  )
}
