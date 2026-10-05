// JSON-LD von webentwicklung-zuerich.html, 1:1 aus dem Original übernommen.
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
          "text": "Sin Digital arbeitet mit modernen Webtechnologien: HTML5, CSS3, JavaScript für das Frontend, sowie Java Spring Boot für Backend-Anwendungen. Hosting erfolgt auf zuverlässigen Cloud-Plattformen mit schnellen Ladezeiten und hoher Verfügbarkeit."
        }
      },
      {
        "@type": "Question",
        "name": "Kann Sin Digital auch Web-Apps oder individuelle Lösungen entwickeln?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Neben klassischen Websites entwickelt Sin Digital auch Web-Applikationen mit individueller Funktionalität: Buchungssysteme, Dashboards, Kontakt-Management und individuelle Integrationen, massgeschneidert auf Ihre Geschäftsanforderungen."
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
          "text": "Ja. Alle Websites von Sin Digital werden mit SSL-Verschlüsselung, sicheren Formularen und aktuellen Sicherheitsstandards ausgeliefert. Bei Web-Apps kommen zusätzlich JWT-Authentifizierung und weitere Sicherheitsmassnahmen zum Einsatz."
        }
      },
      {
        "@type": "Question",
        "name": "Bietet Sin Digital auch Hosting und Wartung an?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Sin Digital bietet professionelles Hosting und laufende Betreuung ab CHF 49/Monat an. Das umfasst Hosting, Sicherheitsupdates, Backups, Performance-Überwachung und Änderungswünsche."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Webentwicklung Zürich, Professionelle Websites für Unternehmen | Sin Digital",
    "description": "Professionelle Webentwicklung in Zürich. Massgeschneiderte Websites für KMU und Unternehmen.",
    "url": "https://www.sin-digital.com/webentwicklung-zuerich.html",
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
