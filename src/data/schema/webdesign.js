// JSON-LD von webdesign-zuerich.html, 1:1 aus dem Original übernommen.
import { siteValues } from '../siteValues.js'

const v = siteValues('de')
const schema = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.sin-digital.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Webdesign Zürich",
        "item": "https://www.sin-digital.com/webdesign-zuerich.html"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was kostet professionelles Webdesign in Zürich?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Jede Website von Sin Digital hat einen Fixpreis: Landingpage CHF ${v.landingpage} (eine Seite, bis ${v.landingpageSections} Abschnitte), Onepager CHF ${v.onepager} (bis ${v.onepagerSections} Abschnitte), Firmenwebsite CHF ${v.firmenwebsite} (bis ${v.firmenwebsitePages} Seiten). Zusätze wie Shop, CMS oder weitere Sprachen haben feste Preise. Individuelle Projekte beginnen bei CHF ${v.individuell}.`
        }
      },
      {
        "@type": "Question",
        "name": "Wie lange dauert ein Webdesign-Projekt in Zürich?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Eine Landingpage dauert ${v.landingpageWeeks} Wochen, ein Onepager ${v.onepagerWeeks} Wochen, eine Firmenwebsite ${v.firmenwebsiteWeeks} Wochen, gerechnet ab dem Tag, an dem alle Inhalte vorliegen. Das umfasst Konzept, Entwurf, Bau und Veröffentlichung.`
        }
      },
      {
        "@type": "Question",
        "name": "Ist das Webdesign von Sin Digital mobiloptimiert?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, alle Websites werden Mobile-First entwickelt. Das bedeutet: Ihr Webdesign funktioniert auf Smartphones, Tablets und Desktop und lädt schnell. Google bevorzugt mobile-optimierte Websites im Ranking."
        }
      },
      {
        "@type": "Question",
        "name": "Ist SEO im Webdesign von Sin Digital enthalten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Jede Website von Sin Digital wird mit einer soliden SEO-Basis erstellt: saubere Seitenstruktur, Meta-Tags, strukturierte Daten, schnelle Ladezeiten und lokale Optimierung für Zürich. So wird Ihr Unternehmen besser gefunden."
        }
      },
      {
        "@type": "Question",
        "name": "Warum sollte ich eine Webdesign-Agentur in Zürich beauftragen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine lokale Webdesign-Agentur wie Sin Digital versteht den Zürcher Markt und spricht Ihre Zielgruppe direkt an. Wir bieten persönliche Beratung vor Ort, kennen die Anforderungen von Schweizer KMU und optimieren Ihre Website gezielt für lokale Google-Suchen in Zürich. Anders als internationale Agenturen oder anonyme Online-Dienste haben Sie bei Sin Digital einen direkten Ansprechpartner, der Ihr Unternehmen kennt und langfristig begleitet. Das Ergebnis: ein Webauftritt, der lokal überzeugt und bei Google Zürich besser rankt."
        }
      },
      {
        "@type": "Question",
        "name": "Kann ich bei Sin Digital ein individuelles Design bekommen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Jede Website von Sin Digital wird individuell gestaltet, mit eigenem Code und ohne Baukasten. Logo und Branding gibt es als Zusatz mit festem Preis."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Webdesign Zürich, Professionelle Websites für KMU | Sin Digital",
    "description": `Professionelles Webdesign in Zürich für KMU, Startups und lokale Unternehmen zum Fixpreis ab CHF ${v.from}.`,
    "url": "https://www.sin-digital.com/webdesign-zuerich.html",
    "isPartOf": {
      "@id": "https://www.sin-digital.com/#website"
    },
    "about": {
      "@id": "https://www.sin-digital.com/#business"
    },
    "datePublished": "2025-01-01",
    "dateModified": "2026-10-08",
    "inLanguage": "de-CH"
  }
]

export default schema
