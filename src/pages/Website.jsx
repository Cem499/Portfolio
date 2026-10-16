import Seo from '../components/Seo.jsx'
import schema from '../data/schema/website.js'
import { siteValues } from '../data/siteValues.js'
import '../styles/landing.css'

const v = siteValues('de')

// website-zuerich.html: SEO-Landingpage, nur Deutsch, ohne JavaScript ausgeliefert.
export default function Website() {
  return (
    <>
      <Seo htmlAttributes={{ lang: 'de-CH' }} jsonLd={schema}>
        <title>{"Website Zürich erstellen lassen | Professionell ab CHF 990 | Sin Digital"}</title>
        <meta name="description" content={`Website in Zürich erstellen lassen: professionell, schnell und auf Ihr Unternehmen zugeschnitten. Sin Digital begleitet Sie von der Idee bis zur Veröffentlichung. Zum Fixpreis ab CHF ${v.from}, Landingpage in ${v.landingpageWeeks} Wochen.`} />
        <meta name="keywords" content="Website Zürich, Website erstellen Zürich, Website erstellen lassen Zürich, Firmenwebsite Zürich, KMU Website Zürich, Webagentur Zürich, Homepage Zürich, Homepage erstellen lassen Zürich, Unternehmenswebsite Zürich" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="geo.region" content="CH-ZH" />
        <meta name="geo.placename" content="Zurich" />
        <meta name="author" content="Sin Digital, Digitalagentur Zürich" />
        <meta name="theme-color" content="#050505" />
        <link rel="canonical" href="https://www.sin-digital.com/website-zuerich.html" />
        <link rel="alternate" hrefLang="de-CH" href="https://www.sin-digital.com/website-zuerich.html" />
        <link rel="alternate" hrefLang="x-default" href="https://www.sin-digital.com/website-zuerich.html" />
        <link rel="icon" type="image/webp" href="/assets/ICON-Logo_Sin-Digital.webp" />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Website Zürich erstellen lassen | Professionell ab CHF 990 | Sin Digital" />
        <meta property="og:description" content={`Firmenwebsite in Zürich professionell umsetzen lassen. Design, Technik und SEO aus einer Hand, zum Fixpreis ab CHF ${v.from}.`} />
        <meta property="og:url" content="https://www.sin-digital.com/website-zuerich.html" />
        <meta property="og:image" content="https://www.sin-digital.com/assets/ICON-Logo_Sin-Digital.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Sin Digital, Website erstellen lassen in Zürich" />
        <meta property="og:site_name" content="Sin Digital" />
        <meta property="og:locale" content="de_CH" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sindigital" />
        <meta name="twitter:title" content="Website Zürich erstellen lassen | Sin Digital" />
        <meta name="twitter:description" content={`Professionelle Website in Zürich erstellen lassen ab CHF ${v.from}. Design, Technik und SEO aus einer Hand. ${v.months} Monate Wartung inklusive, danach ab CHF ${v.care} / Monat.`} />
        <meta name="twitter:image" content="https://www.sin-digital.com/assets/ICON-Logo_Sin-Digital.webp" />
      </Seo>
      <main className="wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          {" › "}
          <strong>Website Zürich erstellen lassen</strong>
        </nav>
        <h1>Website Zürich erstellen lassen, professionell, schnell und auf Ihr Unternehmen zugeschnitten</h1>
        <p className="lead">
          {"Sie möchten eine "}
          <strong>Website in Zürich erstellen lassen</strong>
          ? Sin Digital begleitet Sie von der ersten Idee bis zur Veröffentlichung. Professionelles Design, saubere Technik, SEO-Basis, alles aus einer Hand, zum Fixpreis ab CHF {v.from}.
        </p>
        <div className="card">
          <h2>Warum eine professionelle Website für Ihr Unternehmen in Zürich?</h2>
          <p>
            Ihre Website ist das digitale Schaufenster Ihres Unternehmens. In Zürich, wo der Wettbewerb in fast jeder Branche stark ist, entscheidet oft der erste Eindruck online darüber, ob ein potenzieller Kunde Sie kontaktiert , oder zur Konkurrenz geht.
          </p>
          <p>
            Eine professionelle Firmenwebsite gibt Ihnen Glaubwürdigkeit, macht Sie bei Google sichtbar und ermöglicht es Kunden, Sie rund um die Uhr zu erreichen. Das ist kein Luxus, sondern die Grundlage für modernes Geschäft.
          </p>
        </div>
        <div className="card">
          <h2>Was Sie erhalten, wenn Sie bei Sin Digital eine Website erstellen lassen</h2>
          <ul>
            <li>
              <strong>Professionelles Design:</strong>
              {" Ein Webauftritt, der zu Ihrer Marke passt und Vertrauen schafft."}
            </li>
            <li>
              <strong>Saubere technische Umsetzung:</strong>
              {" Schnell, sicher und zuverlässig, kein Baukasten."}
            </li>
            <li>
              <strong>SEO-Basis für lokale Sichtbarkeit:</strong>
              {" Meta-Tags, strukturierte Daten, schnelle Ladezeiten und lokale Optimierung für Zürich."}
            </li>
            <li>
              <strong>Kontaktformular & Google Maps:</strong>
              {" Ihre Kunden können Sie sofort kontaktieren und finden."}
            </li>
            <li>
              <strong>Mobile-First:</strong>
              {" 70% der Zürcher suchen mobil, Ihre Website funktioniert auf jedem Gerät."}
            </li>
            <li>
              <strong>Klarer Ansprechpartner:</strong>
              {" Direkter Kontakt zu Sin Digital in Zürich, keine anonyme Agentur."}
            </li>
          </ul>
        </div>
        <div className="card">
          <h2>Für welche Branchen erstellen wir Websites in Zürich?</h2>
          <p>Sin Digital erstellt Websites für Unternehmen jeder Branche in Zürich:</p>
          <ul>
            <li>
              <strong>Gastronomie:</strong>
              {" Restaurants, Cafés, Bars, Catering-Services"}
            </li>
            <li>
              <strong>Beauty & Wellness:</strong>
              {" Coiffeure, Nagelstudios, Kosmetik, Spa"}
            </li>
            <li>
              <strong>Gesundheit:</strong>
              {" Ärzte, Zahnärzte, Therapeuten, Physiotherapie"}
            </li>
            <li>
              <strong>Handwerk:</strong>
              {" Schreiner, Elektriker, Maler, Sanitär"}
            </li>
            <li>
              <strong>Beratung:</strong>
              {" Rechtsanwälte, Steuerberater, Unternehmensberater"}
            </li>
            <li>
              <strong>Fitness:</strong>
              {" Fitnessstudios, Personal Trainer, Yoga-Studios"}
            </li>
            <li>
              <strong>Immobilien:</strong>
              {" Makler, Hausverwaltungen, Architekten"}
            </li>
          </ul>
        </div>
        <div className="card">
          <h2>So läuft die Website-Erstellung bei Sin Digital ab</h2>
          <p>
            <strong>Schritt 1, Analyse:</strong>
            {" Wir lernen Ihr Unternehmen kennen. Was macht Sie besonders? Wer sind Ihre Kunden? Was sind Ihre Ziele? Ein offenes Gespräch, kein Verkaufspitch."}
          </p>
          <p>
            <strong>Schritt 2, Konzeption:</strong>
            {" Gemeinsam entwickeln wir Struktur und Design. Sie sehen frühzeitig, wie Ihre Website aussehen wird."}
          </p>
          <p>
            <strong>Schritt 3, Umsetzung:</strong>
            {" Sin Digital baut Ihre Website sauber und professionell. Sie erhalten regelmässige Updates."}
          </p>
          <p>
            <strong>Schritt 4, Veröffentlichung:</strong>
            {` Nach der Schlusszahlung geht Ihre Website online. Die ersten ${v.months} Monate Wartung sind inklusive, danach optional ab CHF ${v.care} pro Monat.`}
          </p>
        </div>
        <div className="card">
          <h2>Website Zürich: Häufige Fragen</h2>
          <h3>Was brauche ich, um eine Website erstellen zu lassen?</h3>
          <p>
            Im Grunde nur eine Idee und Ihre Inhalte. Sin Digital übernimmt Konzept, Design, Entwicklung und SEO-Basis; Texte liefern Sie oder buchen sie als Zusatz. Die ersten {v.months} Monate Wartung sind inklusive, danach optional ab CHF {v.care} / Monat: <a href="/wartung/">Wartungspakete</a>.
          </p>
          <h3>Wie schnell ist meine Website online?</h3>
          <p>{`Eine Landingpage in ${v.landingpageWeeks} Wochen, ein Onepager in ${v.onepagerWeeks} Wochen, eine Firmenwebsite in ${v.firmenwebsiteWeeks} Wochen, ab vollständigen Inhalten.`}</p>
          <h3>Bekomme ich SEO, wenn ich eine Website erstellen lasse?</h3>
          <p>
            Ja. Jede Website von Sin Digital enthält eine solide SEO-Basis für lokale Sichtbarkeit in Zürich und der Schweiz.
          </p>
          <h3>Kann ich die Website später erweitern?</h3>
          <p>
            Ja. Alle Websites sind modular aufgebaut und können jederzeit um neue Seiten, Funktionen oder Sprachen erweitert werden.
          </p>
        </div>
        <div className="card">
          <h2>Weitere Leistungen</h2>
          <div className="internal-links">
            <a href="/">Digitalagentur Zürich</a>
            {' '}
            <a href="webdesign-zuerich.html">Webdesign Zürich</a>
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
          <h2>Jetzt Website in Zürich erstellen lassen</h2>
          <p>
            Kontaktieren Sie Sin Digital für ein unverbindliches Gespräch. Wir zeigen Ihnen, was für Ihr Unternehmen möglich ist.
          </p>
          <a className="btn" href="/#contact">Projekt in Zürich anfragen</a>
        </div>
      </main>
    </>
  )
}
