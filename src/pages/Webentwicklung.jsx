import Seo from '../components/Seo.jsx'
import schema from '../data/schema/webentwicklung.js'
import '../styles/landing.css'
import '../styles/landing-tech.css'

// webentwicklung-zuerich.html: SEO-Landingpage, nur Deutsch, ohne JavaScript ausgeliefert.
export default function Webentwicklung() {
  return (
    <>
      <Seo htmlAttributes={{ lang: 'de-CH' }} jsonLd={schema}>
        <title>{"Webentwicklung Zürich | Professionelle Website-Entwicklung | Sin Digital"}</title>
        <meta name="description" content="Professionelle Webentwicklung in Zürich: sauberer Code, schnelle Performance und sichere Technik. Sin Digital entwickelt Websites, Web-Apps und digitale Lösungen für KMU in Zürich." />
        <meta name="keywords" content="Webentwicklung Zürich, Webentwickler Zürich, Website Entwicklung Zürich, Webprogrammierung Zürich, Frontend Entwicklung Zürich, Web-App Zürich, professionelle Webentwicklung Zürich" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="geo.region" content="CH-ZH" />
        <meta name="geo.placename" content="Zurich" />
        <meta name="author" content="Sin Digital, Digitalagentur Zürich" />
        <meta name="theme-color" content="#050505" />
        <link rel="canonical" href="https://www.sin-digital.com/webentwicklung-zuerich.html" />
        <link rel="alternate" hrefLang="de-CH" href="https://www.sin-digital.com/webentwicklung-zuerich.html" />
        <link rel="alternate" hrefLang="x-default" href="https://www.sin-digital.com/webentwicklung-zuerich.html" />
        <link rel="icon" type="image/webp" href="/assets/ICON-Logo_Sin-Digital.webp" />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Webentwicklung Zürich | Professionelle Website-Entwicklung | Sin Digital" />
        <meta property="og:description" content="Professionelle Webentwicklung in Zürich: sauberer Code, schnelle Performance, sichere Technik. Sin Digital für KMU." />
        <meta property="og:url" content="https://www.sin-digital.com/webentwicklung-zuerich.html" />
        <meta property="og:image" content="https://www.sin-digital.com/assets/ICON-Logo_Sin-Digital.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Sin Digital, Webentwicklung in Zürich" />
        <meta property="og:site_name" content="Sin Digital" />
        <meta property="og:locale" content="de_CH" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sindigital" />
        <meta name="twitter:title" content="Webentwicklung Zürich | Sin Digital" />
        <meta name="twitter:description" content="Professionelle Webentwicklung in Zürich. Sauberer Code, schnelle Performance, sichere Technik für KMU." />
        <meta name="twitter:image" content="https://www.sin-digital.com/assets/ICON-Logo_Sin-Digital.webp" />
      </Seo>
      <main className="wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          {" › "}
          <strong>Webentwicklung Zürich</strong>
        </nav>
        <h1>Webentwicklung Zürich: Sauberer Code, schnelle Performance, sichere Technik</h1>
        <p className="lead">
          {"Sie brauchen mehr als ein hübsches Design, Sie brauchen eine Website, die "}
          <strong>technisch einwandfrei</strong>
          {" funktioniert. Sin Digital ist Ihre "}
          <strong>Webentwicklung-Agentur in Zürich</strong>
          {" für performante, sichere und skalierbare digitale Lösungen."}
        </p>
        <div className="card">
          <h2>Warum professionelle Webentwicklung entscheidend ist</h2>
          <p>
            Eine schöne Website nützt nichts, wenn sie langsam lädt, auf dem Smartphone nicht funktioniert oder Sicherheitslücken hat. Professionelle Webentwicklung ist das Fundament für jeden erfolgreichen Webauftritt:
          </p>
          <ul>
            <li>
              <strong>Performance:</strong>
              {" Jede Sekunde Ladezeit kostet Sie 7% Conversion. Schnelle Websites verkaufen mehr."}
            </li>
            <li>
              <strong>Sicherheit:</strong>
              {" SSL-Verschlüsselung, sichere Formulare und aktuelle Standards schützen Ihre Kunden und Ihr Geschäft."}
            </li>
            <li>
              <strong>Skalierbarkeit:</strong>
              {" Sauberer Code wächst mit Ihrem Unternehmen, neue Funktionen lassen sich einfach ergänzen."}
            </li>
            <li>
              <strong>SEO:</strong>
              {" Google belohnt schnelle, mobile und technisch saubere Websites mit besseren Rankings."}
            </li>
          </ul>
        </div>
        <div className="card">
          <h2>Unsere Webentwicklung-Leistungen</h2>
          <h3>Frontend-Entwicklung</h3>
          <p>
            Sin Digital entwickelt das, was Ihre Besucher sehen und erleben: responsive Layouts, flüssige Animationen, intuitive Navigation und schnelle Interaktionen. Alles mit modernem, sauberem Code, kein WordPress-Template-Chaos.
          </p>
          <h3>Backend-Entwicklung</h3>
          <p>
            Für Websites mit erweiterter Funktionalität, Kontaktformulare mit E-Mail-Integration, Terminbuchungssysteme, Admin-Dashboards oder API-Schnittstellen, entwickelt Sin Digital massgeschneiderte Backend-Lösungen mit Java Spring Boot.
          </p>
          <h3>Performance-Optimierung</h3>
          <p>
            Durch Code-Optimierung, Bildkomprimierung, Lazy Loading und intelligentes Caching laden unsere Websites in unter 2 Sekunden. Das verbessert Rankings, Nutzererfahrung und Conversion-Rate.
          </p>
          <h3>Hosting & Infrastruktur</h3>
          <p>
            Sin Digital bietet professionelles Hosting auf zuverlässigen Cloud-Plattformen. SSL-Verschlüsselung, automatische Backups und Performance-Monitoring sind Standard.
          </p>
        </div>
        <div className="card">
          <h2>Technologien</h2>
          <div className="tech-grid">
            <div className="tech-item">HTML5 & CSS3</div>
            <div className="tech-item">JavaScript</div>
            <div className="tech-item">Java Spring Boot</div>
            <div className="tech-item">Responsive Design</div>
            <div className="tech-item">REST APIs</div>
            <div className="tech-item">SSL / HTTPS</div>
            <div className="tech-item">Cloud Hosting</div>
            <div className="tech-item">Git & CI/CD</div>
          </div>
        </div>
        <div className="card">
          <h2>Webentwicklung für welche Branchen in Zürich?</h2>
          <p>Sin Digital entwickelt Websites und Web-Apps für Unternehmen jeder Branche:</p>
          <ul>
            <li>
              <strong>Dienstleister:</strong>
              {" Firmenwebsites mit Kontaktformular, Leistungsübersicht und lokaler SEO-Optimierung."}
            </li>
            <li>
              <strong>Gastronomie:</strong>
              {" Websites mit Speisekarte, Öffnungszeiten, Online-Reservierung und Google Maps."}
            </li>
            <li>
              <strong>Gesundheit & Wellness:</strong>
              {" Praxis-Websites mit Terminbuchung, Leistungsbeschreibungen und Team-Seiten."}
            </li>
            <li>
              <strong>Beratung & Recht:</strong>
              {" Professionelle Webauftritte, die Kompetenz und Vertrauen vermitteln."}
            </li>
            <li>
              <strong>Startups:</strong>
              {" Schnelle MVPs und Landing Pages, die validieren und konvertieren."}
            </li>
          </ul>
        </div>
        <div className="card">
          <h2>Webdesign und Webentwicklung, beides aus einer Hand</h2>
          <p>
            Bei vielen Agenturen sind Design und Entwicklung getrennt, das führt zu Reibungsverlusten, Missverständnissen und höheren Kosten. Bei Sin Digital erhalten Sie beides nahtlos aus einer Hand:
          </p>
          <ul>
            <li>Design und Code werden parallel entwickelt, schnellere Umsetzung.</li>
            <li>Keine Übergabeverluste zwischen Designer und Entwickler.</li>
            <li>Ein Ansprechpartner für alles, klare Kommunikation.</li>
            <li>Das Design wird exakt so umgesetzt, wie es konzipiert wurde.</li>
          </ul>
        </div>
        <div className="card">
          <h2>Webentwicklung Zürich: Häufige Fragen</h2>
          <h3>Brauche ich ein CMS wie WordPress?</h3>
          <p>
            Nicht zwingend. Sin Digital entwickelt viele Websites als statische oder leichtgewichtige Lösungen, die schneller, sicherer und günstiger im Unterhalt sind als WordPress. Je nach Anforderung kann ein CMS aber sinnvoll sein.
          </p>
          <h3>Kann ich die Website später um neue Funktionen erweitern?</h3>
          <p>
            Ja. Sauberer, modularer Code bedeutet: Neue Funktionen lassen sich einfach ergänzen, ohne die bestehende Website umbauen zu müssen.
          </p>
          <h3>Wie lange dauert die Entwicklung?</h3>
          <p>
            Eine Standard-Website ist in ca. 2 Wochen fertig. Web-Apps mit individueller Funktionalität können je nach Umfang 3-6 Wochen dauern.
          </p>
          <h3>Was kostet Webentwicklung bei Sin Digital?</h3>
          <p>
            Websites starten ab CHF 990 (Basic). Web-Apps und individuelle Lösungen werden nach Aufwand kalkuliert transparent und ohne versteckte Kosten.
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
            <a href="seo-agentur-zuerich.html">SEO Agentur Zürich</a>
            {' '}
            <a href="/#projects">Alle Leistungen</a>
            {' '}
            <a href="/#contact">Jetzt anfragen</a>
          </div>
        </div>
        <div className="cta-box">
          <h2>Webentwicklung-Projekt in Zürich starten</h2>
          <p>Kontaktieren Sie Sin Digital für ein unverbindliches Gespräch über Ihre technischen Anforderungen.</p>
          <a className="btn" href="/#contact">Projekt anfragen</a>
        </div>
      </main>
    </>
  )
}
