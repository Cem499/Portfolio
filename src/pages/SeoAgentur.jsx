import Seo from '../components/Seo.jsx'
import schema from '../data/schema/seoAgentur.js'
import '../styles/landing.css'

// seo-agentur-zuerich.html: SEO-Landingpage, nur Deutsch, ohne JavaScript ausgeliefert.
export default function SeoAgentur() {
  return (
    <>
      <Seo htmlAttributes={{ lang: 'de-CH' }} jsonLd={schema}>
        <title>{"SEO Agentur Zürich | Suchmaschinenoptimierung für KMU | Sin Digital"}</title>
        <meta name="description" content="SEO Agentur in Zürich: Sin Digital optimiert Ihre Website für Google. Lokales SEO, technisches SEO und Content-Strategie für KMU und Unternehmen in Zürich. Jetzt anfragen." />
        <meta name="keywords" content="SEO Agentur Zürich, SEO Zürich, Suchmaschinenoptimierung Zürich, Google Optimierung Zürich, lokales SEO Zürich, SEO Beratung Zürich, SEO für KMU Zürich, Google Ranking Zürich, SEO Experte Zürich" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="geo.region" content="CH-ZH" />
        <meta name="geo.placename" content="Zurich" />
        <meta name="author" content="Sin Digital, Digitalagentur Zürich" />
        <meta name="theme-color" content="#050505" />
        <link rel="canonical" href="https://www.sin-digital.com/seo-agentur-zuerich.html" />
        <link rel="alternate" hrefLang="de-CH" href="https://www.sin-digital.com/seo-agentur-zuerich.html" />
        <link rel="alternate" hrefLang="x-default" href="https://www.sin-digital.com/seo-agentur-zuerich.html" />
        <link rel="icon" type="image/webp" href="/assets/ICON-Logo_Sin-Digital.webp" />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SEO Agentur Zürich | Suchmaschinenoptimierung für KMU | Sin Digital" />
        <meta property="og:description" content="SEO Agentur Zürich: Lokales SEO, technisches SEO und Content-Strategie für mehr Sichtbarkeit bei Google. Sin Digital." />
        <meta property="og:url" content="https://www.sin-digital.com/seo-agentur-zuerich.html" />
        <meta property="og:image" content="https://www.sin-digital.com/assets/ICON-Logo_Sin-Digital.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Sin Digital, SEO Agentur in Zürich" />
        <meta property="og:site_name" content="Sin Digital" />
        <meta property="og:locale" content="de_CH" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sindigital" />
        <meta name="twitter:title" content="SEO Agentur Zürich | Sin Digital" />
        <meta name="twitter:description" content="Professionelle SEO-Agentur in Zürich. Lokales und technisches SEO für KMU. Bessere Rankings bei Google." />
        <meta name="twitter:image" content="https://www.sin-digital.com/assets/ICON-Logo_Sin-Digital.webp" />
      </Seo>
      <main className="wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          {" › "}
          <strong>SEO Agentur Zürich</strong>
        </nav>
        <h1>SEO Agentur Zürich: Suchmaschinenoptimierung für KMU und lokale Unternehmen</h1>
        <p className="lead">
          {"Ihre Website sieht gut aus, wird aber bei Google nicht gefunden? Sin Digital ist Ihre "}
          <strong>SEO-Agentur in Zürich</strong>
          . Wir optimieren Ihre Website für bessere Rankings, mehr Sichtbarkeit und mehr Kundenanfragen, lokal in Zürich und schweizweit.
        </p>
        <div className="card">
          <h2>Warum SEO für Ihr Unternehmen in Zürich unverzichtbar ist</h2>
          <p>
            {"Über 90% aller Online-Erlebnisse beginnen mit einer Google-Suche. Wenn Ihr Unternehmen bei relevanten Suchbegriffen wie \"Restaurant Zürich\", \"Coiffeur in der Nähe\" oder \"Webdesign Zürich\" nicht auf der ersten Seite erscheint, existieren Sie für potenzielle Kunden praktisch nicht."}
          </p>
          <p>
            Lokales SEO ist besonders für KMU in Zürich entscheidend: 46% aller Google-Suchen haben einen lokalen Bezug, und 76% der Personen, die lokal suchen, besuchen innerhalb von 24 Stunden ein Geschäft. Mit der richtigen SEO-Strategie holen Sie diese Kunden direkt zu Ihnen.
          </p>
        </div>
        <div className="card">
          <h2>Was Sin Digital als SEO-Agentur für Sie tut</h2>
          <h3>Technisches SEO</h3>
          <ul>
            <li>
              <strong>Ladezeit-Optimierung:</strong>
              {" Schnelle Websites ranken besser. Wir optimieren Code, Bilder und Server für Ladezeiten unter 2 Sekunden."}
            </li>
            <li>
              <strong>Mobile-First:</strong>
              {" Google indexiert seit 2021 nur noch die mobile Version. Wir stellen sicher, dass Ihre Website mobil perfekt funktioniert."}
            </li>
            <li>
              <strong>Saubere Seitenstruktur:</strong>
              {" Klare URL-Hierarchie, semantische HTML-Tags und korrektes Heading-Management."}
            </li>
            <li>
              <strong>Core Web Vitals:</strong>
              {" Optimierung der Google-Performance-Metriken (LCP, FID, CLS)."}
            </li>
          </ul>
          <h3>Lokales SEO für Zürich</h3>
          <ul>
            <li>
              <strong>Google Business Optimierung:</strong>
              {" Vollständiges und optimiertes Google-Business-Profil für lokale Sichtbarkeit."}
            </li>
            <li>
              <strong>Lokale Keywords:</strong>
              {" Strategische Platzierung von Suchbegriffen wie \"Webdesign Zürich\", \"SEO Zürich\" oder branchenspezifischen lokalen Keywords."}
            </li>
            <li>
              <strong>Strukturierte Daten:</strong>
              {" LocalBusiness Schema, FAQ Schema, Service Schema, für Rich Snippets und bessere Klickraten in den Google-Ergebnissen."}
            </li>
            <li>
              <strong>NAP-Konsistenz:</strong>
              {" Einheitliche Darstellung von Name, Adresse und Telefonnummer auf allen Plattformen."}
            </li>
          </ul>
          <h3>On-Page SEO</h3>
          <ul>
            <li>
              <strong>Meta-Tags:</strong>
              {" Optimierte Title-Tags und Meta-Descriptions für höhere Klickraten in den Suchergebnissen."}
            </li>
            <li>
              <strong>Content-Optimierung:</strong>
              {" SEO-optimierte Texte, die sowohl für Google als auch für Ihre Besucher relevant sind."}
            </li>
            <li>
              <strong>Interne Verlinkung:</strong>
              {" Strategisches Netzwerk von internen Links für optimale Autorität-Verteilung."}
            </li>
            <li>
              <strong>Bild-Optimierung:</strong>
              {" Alt-Tags, Komprimierung und moderne Formate für schnellere Ladezeiten."}
            </li>
          </ul>
        </div>
        <div className="card">
          <h2>SEO ist bei jeder Sin Digital Website inklusive</h2>
          <p>
            Anders als viele Agenturen, die SEO als teures Zusatzpaket verkaufen, ist die SEO-Basis bei Sin Digital in jedem Website-Paket ab CHF 990 enthalten. Denn eine schöne Website ohne SEO ist wie ein Schaufenster in einer Seitengasse, niemand sieht es.
          </p>
          <p>Was in der Basis enthalten ist:</p>
          <ul>
            <li>Saubere Seitenstruktur und semantisches HTML</li>
            <li>Optimierte Meta-Tags für alle Seiten</li>
            <li>Strukturierte Daten (Schema.org)</li>
            <li>Schnelle Ladezeiten und Mobile-Optimierung</li>
            <li>Lokale Optimierung für Zürich</li>
            <li>XML-Sitemap und robots.txt</li>
          </ul>
        </div>
        <div className="card">
          <h2>Für welche Branchen bietet Sin Digital SEO in Zürich an?</h2>
          <p>Lokales SEO funktioniert branchenübergreifend. Sin Digital optimiert Websites für:</p>
          <ul>
            <li>Gastronomie (Restaurants, Cafés, Bars)</li>
            <li>Beauty & Wellness (Coiffeure, Kosmetik, Spa)</li>
            <li>Gesundheit (Ärzte, Zahnärzte, Therapeuten)</li>
            <li>Handwerk (Schreiner, Elektriker, Maler)</li>
            <li>Beratung (Rechtsanwälte, Steuerberater)</li>
            <li>Fitness (Studios, Personal Trainer, Yoga)</li>
            <li>Immobilien (Makler, Architekten)</li>
            <li>E-Commerce und Online-Shops</li>
          </ul>
        </div>
        <div className="card">
          <h2>SEO Zürich: Häufige Fragen</h2>
          <h3>Wie lange dauert es, bis SEO wirkt?</h3>
          <p>
            Erste Verbesserungen sind nach 4-8 Wochen sichtbar. Stabile Top-Rankings für lokale Keywords bauen sich über 3-6 Monate auf.
          </p>
          <h3>Was kostet SEO bei Sin Digital?</h3>
          <p>
            Die SEO-Basis ist in jedem Website-Paket ab CHF 990 enthalten. Für erweiterte, laufende SEO-Betreuung erstellen wir individuelle Angebote.
          </p>
          <h3>Kann ich SEO auch ohne neue Website bekommen?</h3>
          <p>
            Ja. Sin Digital bietet auch SEO-Optimierung für bestehende Websites an. Kontaktieren Sie uns für eine Analyse Ihrer aktuellen Website.
          </p>
          <h3>Garantiert Sin Digital Rankings?</h3>
          <p>
            Niemand kann Google-Rankings garantieren, Agenturen, die das tun, sind unseriös. Was wir garantieren: eine technisch saubere, SEO-optimierte Website nach aktuellen Best Practices, die beste Voraussetzungen für Top-Rankings schafft.
          </p>
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
            <a href="guenstige-website-zuerich.html">Günstige Website Zürich</a>
            {' '}
            <a href="webentwicklung-zuerich.html">Webentwicklung Zürich</a>
            {' '}
            <a href="/#projects">Alle Leistungen</a>
            {' '}
            <a href="/#contact">Jetzt anfragen</a>
          </div>
        </div>
        <div className="cta-box">
          <h2>SEO-Beratung für Ihr Unternehmen in Zürich</h2>
          <p>
            Lassen Sie Ihre Website von Sin Digital analysieren. Wir zeigen Ihnen, wie Sie bei Google in Zürich besser gefunden werden.
          </p>
          <a className="btn" href="/#contact">Kostenlose SEO-Beratung anfragen</a>
        </div>
      </main>
    </>
  )
}
