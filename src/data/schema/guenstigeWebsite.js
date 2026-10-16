// JSON-LD von guenstige-website-zuerich.html, 1:1 aus dem Original übernommen.
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
        "name": "Günstige Website Zürich",
        "item": "https://www.sin-digital.com/guenstige-website-zuerich.html"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Gibt es eine Website in Zürich zum Fixpreis mit professionellem Design?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Ja. Bei Sin Digital hat jede Website einen Fixpreis, ab CHF ${v.from} für eine Landingpage. Sie erhalten ein modernes Design, Kontaktformular, SEO-Basis und eine Website für alle Geräte, mit eigenem Code statt Baukasten.`
        }
      },
      {
        "@type": "Question",
        "name": "Was ist bei einer Website von Sin Digital dabei?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Je nach Paket: Landingpage mit bis zu ${v.landingpageSections} Abschnitten (CHF ${v.landingpage}), Onepager mit bis zu ${v.onepagerSections} Abschnitten (CHF ${v.onepager}) oder Firmenwebsite mit bis zu ${v.firmenwebsitePages} Seiten (CHF ${v.firmenwebsite}). Immer dabei: Kontaktformular, Google Maps, SEO-Grundlagen, ein Design, das zu Ihrem Unternehmen passt, und ${v.months} Monate Wartung.`
        }
      },
      {
        "@type": "Question",
        "name": "Ist SEO bei jeder Website dabei?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Bei jeder Website von Sin Digital ist die SEO-Basis enthalten: saubere Seitenstruktur, Meta-Tags, schnelle Ladezeiten, Mobile-Optimierung und strukturierte Daten für bessere Google-Sichtbarkeit in Zürich."
        }
      },
      {
        "@type": "Question",
        "name": "Wo ist der Unterschied zwischen Fixpreis und Baukasten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Fixpreis bedeutet bei Sin Digital: feste Preise bei professioneller Qualität, ab CHF ${v.from}. Kein Template-Einheitsbrei, sondern ein sauberer, individuell gestalteter Webauftritt mit echtem SEO und persönlicher Betreuung. Baukasten-Websites haben oft laufende Plattformkosten, langsame Ladezeiten und kein richtiges SEO.`
        }
      },
      {
        "@type": "Question",
        "name": "Kann ich die Website später erweitern?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Neue Seiten, Funktionen, Sprachversionen oder ein Buchungstool kommen als Zusätze mit festen Preisen dazu. Die Website wächst mit Ihrem Unternehmen."
        }
      },
      {
        "@type": "Question",
        "name": "Warum sind die Preise von Sin Digital tiefer als bei vielen Agenturen in Zürich?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sin Digital arbeitet schlank und effizient: klare Pakete, kein unnötiger Overhead, keine aufgeblähten Projektmanagement-Strukturen. Das ermöglicht professionelle Qualität zu fairen Preisen, ohne Kompromisse bei Design, Technik oder SEO."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Günstige Website Zürich, Professionell ab CHF ${v.from} | Sin Digital`,
    "description": `Website in Zürich zum Fixpreis ab CHF ${v.from}. Ideal für KMU und lokale Unternehmen.`,
    "url": "https://www.sin-digital.com/guenstige-website-zuerich.html",
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
