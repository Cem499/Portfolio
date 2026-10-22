// JSON-LD von webdesign-zuerich.html, 1:1 aus dem Original übernommen.
import { konfigurator } from '../../i18n/de.js'
import { entryPricesText } from '../pricing.js'

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
          "text": `Bei Sin Digital starten professionelle Websites in Zürich ab CHF 990. Es gibt vier Seitentypen mit Einstiegspreis: ${entryPricesText(konfigurator.siteTypes)}. Der Festpreis hängt vom Umfang und den gewünschten Funktionen ab, Sie erhalten ihn mit dem Angebot.`
        }
      },
      {
        "@type": "Question",
        "name": "Wie lange dauert ein Webdesign-Projekt in Zürich?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ein typisches Webdesign-Projekt bei Sin Digital ist in ca. 2 Wochen fertig. Das umfasst Analyse, Designkonzept, Entwicklung und Livegang. Bei komplexeren Projekten planen wir entsprechend mehr Zeit ein."
        }
      },
      {
        "@type": "Question",
        "name": "Ist das Webdesign von Sin Digital mobiloptimiert?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, alle Websites werden Mobile-First entwickelt. Das bedeutet: Ihr Webdesign sieht auf Smartphones, Tablets und Desktop perfekt aus und lädt blitzschnell. Google bevorzugt mobile-optimierte Websites im Ranking."
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
          "text": "Ja. Jede Website passen wir an Ihre Marke an. Ein vollständig individuelles Design mit eigener Farbwelt, massgeschneiderten Animationen und Interaktionen ist bei jedem Seitentyp möglich; der Aufwand fliesst in den Festpreis Ihres Angebots ein."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Webdesign Zürich, Professionelle Websites für KMU | Sin Digital",
    "description": "Professionelles Webdesign in Zürich für KMU, Startups und lokale Unternehmen ab CHF 990.",
    "url": "https://www.sin-digital.com/webdesign-zuerich.html",
    "isPartOf": {
      "@id": "https://www.sin-digital.com/#website"
    },
    "about": {
      "@id": "https://www.sin-digital.com/#business"
    },
    "datePublished": "2025-01-01",
    "dateModified": "2026-03-13",
    "inLanguage": "de-CH"
  }
]

export default schema
