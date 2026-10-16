// JSON-LD von website-zuerich.html, 1:1 aus dem Original übernommen.
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
        "name": "Website Zürich",
        "item": "https://www.sin-digital.com/website-zuerich.html"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Kann ich eine Firmenwebsite in Zürich erstellen lassen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Sin Digital erstellt professionelle Firmenwebsites in Zürich für KMU, Startups und lokale Betriebe. Von der Strategie über Design und Entwicklung bis zur Veröffentlichung, alles aus einer Hand, zum Fixpreis."
        }
      },
      {
        "@type": "Question",
        "name": "Was brauche ich, um eine Website erstellen zu lassen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Im Grunde nur eine Idee und Ihre Inhalte. Sin Digital übernimmt Konzept, Design, technische Entwicklung und SEO-Basis; Texte liefern Sie oder buchen sie als Zusatz. Die ersten ${v.months} Monate Wartung sind inklusive, danach ist sie freiwillig ab CHF ${v.care} pro Monat. Ein erstes unverbindliches Gespräch reicht, um loszulegen.`
        }
      },
      {
        "@type": "Question",
        "name": "Ist die Website mobiloptimiert?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, alle Websites werden Mobile-First entwickelt und für Smartphones, Tablets und Desktop optimiert. Über 70% der Besucher kommen heute über mobile Geräte, daher hat die mobile Darstellung oberste Priorität."
        }
      },
      {
        "@type": "Question",
        "name": "Was kostet eine Website in Zürich?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Bei Sin Digital hat jede Website einen Fixpreis: Landingpage CHF ${v.landingpage}, Onepager CHF ${v.onepager}, Firmenwebsite mit bis zu ${v.firmenwebsitePages} Seiten CHF ${v.firmenwebsite}. Alle Preise sind Einmalpreise, ${v.months} Monate Wartung sind inklusive.`
        }
      },
      {
        "@type": "Question",
        "name": "Kann ich die Website später selbst bearbeiten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Ja, mit dem Zusatz CMS pflegen Sie Texte und Bilder selbst, inklusive Einführung. Alternativ übernimmt Sin Digital Änderungen im Rahmen der Wartung ab CHF ${v.care} pro Monat.`
        }
      },
      {
        "@type": "Question",
        "name": "Wie läuft der Prozess ab, wenn ich eine Website erstellen lasse?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Der Prozess besteht aus 4 Schritten: 1) Erstgespräch, 2) Angebot mit Fixpreis, 3) Entwurf und Bau mit ${v.rounds} Korrekturrunden, 4) Veröffentlichung nach der Schlusszahlung, ${v.months} Monate Wartung inklusive.`
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Website Zürich erstellen lassen, Professionell zum Fixpreis | Sin Digital",
    "description": `Professionelle Website in Zürich erstellen lassen. Webdesign für KMU und Unternehmen zum Fixpreis ab CHF ${v.from}.`,
    "url": "https://www.sin-digital.com/website-zuerich.html",
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
