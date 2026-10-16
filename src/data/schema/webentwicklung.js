// JSON-LD von webentwicklung-zuerich.html, 1:1 aus dem Original übernommen.
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
        "name": "Webentwicklung Zürich",
        "item": "https://www.sin-digital.com/webentwicklung-zuerich.html"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was ist der Unterschied zwischen Webdesign und Webentwicklung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Webdesign befasst sich mit dem visuellen Erscheinungsbild und der Benutzerführung einer Website. Webentwicklung hingegen ist die technische Umsetzung: sauberer Code, Performance-Optimierung, Sicherheit, Datenbankanbindung und Funktionalität. Bei Sin Digital erhalten Sie beides aus einer Hand."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Technologien nutzt Sin Digital für die Webentwicklung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sin Digital arbeitet mit modernen Webtechnologien: HTML5, CSS3, JavaScript für das Frontend, sowie Java Spring Boot für Backend-Anwendungen. Das Hosting läuft auf zuverlässigen Cloud-Plattformen und ist Teil der Wartung."
        }
      },
      {
        "@type": "Question",
        "name": "Kann Sin Digital auch Web-Apps oder individuelle Lösungen entwickeln?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Neben klassischen Websites entwickelt Sin Digital auch Web-Applikationen mit individueller Funktionalität: Buchungssysteme, Dashboards, Kontakt-Management und individuelle Integrationen, passend zu Ihren Geschäftsanforderungen."
        }
      },
      {
        "@type": "Question",
        "name": "Wie schnell sind von Sin Digital entwickelte Websites?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Durch optimierten Code, komprimierte Bilder, Lazy Loading und performante Hosting-Lösungen laden Sin Digital Websites in unter 2 Sekunden. Google bewertet Ladezeit als direkten Ranking-Faktor, jede Sekunde Verzögerung kostet durchschnittlich 7% Conversion. Wir optimieren gezielt die Core Web Vitals (LCP, FID, CLS) für maximale Performance sowohl für Nutzer als auch für Google."
        }
      },
      {
        "@type": "Question",
        "name": "Ist die Website sicher?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Alle Websites von Sin Digital werden mit verschlüsselter Verbindung (HTTPS), sicheren Formularen und aktuellen Sicherheitsstandards ausgeliefert. Bei Web-Apps kommen zusätzlich JWT-Authentifizierung und weitere Sicherheitsmassnahmen zum Einsatz."
        }
      },
      {
        "@type": "Question",
        "name": "Bietet Sin Digital auch Hosting und Wartung an?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Ja. Die ersten ${v.months} Monate Wartung sind in jedem Website-Paket enthalten, danach gibt es drei Wartungspakete ab CHF ${v.care} pro Monat: Hosting, Sicherheitsupdates, Backups, Überwachung und je nach Paket Änderungen.`
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Webentwicklung Zürich, Professionelle Websites für Unternehmen | Sin Digital",
    "description": "Professionelle Webentwicklung in Zürich. Websites und Web-Apps mit eigenem Code für KMU und Unternehmen.",
    "url": "https://www.sin-digital.com/webentwicklung-zuerich.html",
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
