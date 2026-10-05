// JSON-LD von index.html, 1:1 aus dem Original übernommen; letzter Block (Street Food Compassion) neu.
const schema = [
  {
    "@context": "https://schema.org",
    "@type": [
      "LocalBusiness",
      "ProfessionalService"
    ],
    "@id": "https://www.sin-digital.com/#business",
    "name": "Sin Digital",
    "alternateName": [
      "Sin Digital Zürich",
      "Sin Digital Webdesign Zürich",
      "Sin Digital Digitalagentur",
      "Sin Digital Webagentur Zürich",
      "Sin Digital Digital Agentur",
      "Sin Digital Digital Agentur Zurich",
      "Sin Digital Internetagentur",
      "Sin Digital, Digital Agency Zurich"
    ],
    "description": "Sin Digital, Ihre Digitalagentur in Zürich. Webdesign, Webentwicklung & SEO für KMU, Startups und Unternehmen. Professionelle Websites ab CHF 990, fertig in 2 Wochen.",
    "url": "https://www.sin-digital.com",
    "email": "info@sin-digital.com",
    "foundingDate": "2026",
    "currenciesAccepted": "CHF",
    "paymentAccepted": "Banküberweisung, TWINT",
    "priceRange": "CHF 990, 2490",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zürich",
      "addressRegion": "ZH",
      "addressCountry": "CH"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Zürich"
      },
      {
        "@type": "City",
        "name": "Zollikerberg"
      },
      {
        "@type": "City",
        "name": "Winterthur"
      },
      {
        "@type": "City",
        "name": "Basel"
      },
      {
        "@type": "City",
        "name": "Bern"
      },
      {
        "@type": "City",
        "name": "Luzern"
      },
      {
        "@type": "City",
        "name": "St. Gallen"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Kanton Zürich"
      },
      {
        "@type": "Country",
        "name": "Schweiz"
      }
    ],
    "knowsAbout": [
      "Webdesign",
      "Webentwicklung",
      "Suchmaschinenoptimierung",
      "SEO",
      "Responsive Design",
      "Mobile-First Webdesign",
      "UI/UX Design",
      "Landing Pages",
      "Corporate Websites",
      "Branding",
      "Google Business Optimierung",
      "Technisches SEO",
      "Lokales SEO Zürich"
    ],
    "serviceType": [
      "Digitalagentur",
      "Webagentur",
      "Webdesign",
      "Webentwicklung",
      "SEO",
      "Hosting",
      "Website für Unternehmen",
      "Corporate Websites",
      "Landing Pages",
      "Homepage erstellen",
      "Website erstellen lassen",
      "Online-Präsenz für KMU"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Webdesign-Pakete Zürich",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Basic Website",
          "description": "Professionelle Website bis 5 Seiten für Unternehmen",
          "price": "990",
          "priceCurrency": "CHF",
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "990",
            "priceCurrency": "CHF",
            "unitText": "einmalig"
          }
        },
        {
          "@type": "Offer",
          "name": "Growth Website mit erweiterten Funktionen",
          "description": "Erweiterte Website mit Integrationen und Suchmaschinenoptimierung",
          "price": "1690",
          "priceCurrency": "CHF",
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "1690",
            "priceCurrency": "CHF",
            "unitText": "einmalig"
          }
        },
        {
          "@type": "Offer",
          "name": "Pro Website Premium",
          "description": "Individuelle Premium-Website mit massgeschneidertem Design und 6 Monate Support",
          "price": "2490",
          "priceCurrency": "CHF",
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "2490",
            "priceCurrency": "CHF",
            "unitText": "einmalig"
          }
        },
        {
          "@type": "Offer",
          "name": "Partner Monatsbetreuung",
          "description": "Monatliche Betreuung in drei Care-Stufen: Basis (CHF 49), Business (CHF 89), Premium (CHF 149)",
          "price": "49",
          "priceCurrency": "CHF",
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "49",
            "priceCurrency": "CHF",
            "unitText": "monatlich"
          }
        }
      ]
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": [
        "German",
        "English"
      ]
    },
    "potentialAction": {
      "@type": "CommunicateAction",
      "target": "https://www.sin-digital.com/#contact",
      "name": "Webdesign-Projekt anfragen"
    },
    "sameAs": [
      "https://www.instagram.com/sindigitalarchitects/",
      "https://www.tiktok.com/@sindigitalarchitects"
    ],
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.sin-digital.com/assets/Logo_Sin-Digital.webp",
      "width": 300,
      "height": 100
    },
    "image": "https://www.sin-digital.com/assets/ICON-Logo_Sin-Digital.webp",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "5",
      "bestRating": "5",
      "worstRating": "1"
    },
    "founder": {
      "@type": "Person",
      "name": "Cem Sin",
      "@id": "https://www.sin-digital.com/#cem-sin"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.sin-digital.com/#website",
    "url": "https://www.sin-digital.com",
    "name": "Sin Digital",
    "description": "Digitalagentur Zürich, Webdesign, Webentwicklung & SEO für KMU und Unternehmen in der Schweiz",
    "publisher": {
      "@id": "https://www.sin-digital.com/#business"
    },
    "inLanguage": [
      "de-CH",
      "en"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.sin-digital.com/#cem-sin",
    "name": "Cem Sin",
    "jobTitle": "Founder",
    "description": "Founder of Sin Digital, a digital agency and web agency in Zurich.",
    "worksFor": {
      "@id": "https://www.sin-digital.com/#business"
    },
    "url": "https://www.sin-digital.com/#team",
    "sameAs": [
      "https://www.instagram.com/sindigitalarchitects/"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Digitalagentur Zürich, Webdesign & Webentwicklung für KMU | Sin Digital",
    "description": "Sin Digital, Ihre Digitalagentur in Zürich. Professionelles Webdesign, Webentwicklung, SEO und Hosting für KMU, Startups und Unternehmen ab CHF 990.",
    "provider": {
      "@id": "https://www.sin-digital.com/#business"
    },
    "serviceType": [
      "Digitalagentur",
      "Webagentur",
      "Webdesign",
      "Webentwicklung",
      "SEO Agentur",
      "Hosting"
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Zürich"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Kanton Zürich"
      },
      {
        "@type": "Country",
        "name": "Schweiz"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Webdesign-Pakete",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Basic",
          "description": "Professionelle Website mit bis zu 5 Seiten für Unternehmen",
          "price": "990",
          "priceCurrency": "CHF"
        },
        {
          "@type": "Offer",
          "name": "Growth",
          "description": "Erweiterte Website mit Integrationen und Suchmaschinenoptimierung",
          "price": "1690",
          "priceCurrency": "CHF"
        },
        {
          "@type": "Offer",
          "name": "Pro",
          "description": "Individuelle Premium-Website mit massgeschneidertem Design und 6 Monate Support",
          "price": "2490",
          "priceCurrency": "CHF"
        }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Welche Services bietet Sin Digital an?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sin Digital kümmert sich um alles vom ersten Design über die Entwicklung bis hin zur Veröffentlichung. Wir bieten Webdesign, Webentwicklung, SEO, Hosting und laufende Betreuung, alles aus einer Hand in Zürich."
        }
      },
      {
        "@type": "Question",
        "name": "Wie lange dauert ein Webdesign-Projekt bei Sin Digital?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Grundsätzlich starten wir innerhalb von 2 Wochen. Je nach Umfang kann die Gesamtdauer individuell variieren. Wir nehmen uns die Zeit, die Ihr Projekt wirklich verdient."
        }
      },
      {
        "@type": "Question",
        "name": "Was kostet eine Website bei Sin Digital?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unsere Pakete starten ab CHF 990 (Basic), CHF 1'690 (Growth mit erweiterten Funktionen), CHF 2'490 (Pro) und ab CHF 49/Monat (Partner-Betreuung). Die Website-Pakete sind Einmalpreise inklusive Einrichtung."
        }
      },
      {
        "@type": "Question",
        "name": "Erstellt Sin Digital Websites für Unternehmen in Zürich?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, Sin Digital erstellt professionelle Websites für Unternehmen jeder Branche in Zürich und der gesamten Schweiz, von KMU über Startups bis hin zu etablierten Firmen."
        }
      },
      {
        "@type": "Question",
        "name": "Arbeitet Sin Digital auch international?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolut. Sin Digital arbeitet mit Kunden aus aller Welt zusammen und hat bereits Projekte in ganz Europa, den USA und Asien erfolgreich umgesetzt."
        }
      },
      {
        "@type": "Question",
        "name": "Bietet Sin Digital auch SEO für Unternehmen in Zürich an?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, jede Website von Sin Digital wird von Grund auf suchmaschinenoptimiert. Das umfasst technisches SEO, lokale Optimierung für Google Maps und Google Business, schnelle Ladezeiten, mobile Optimierung und strukturierte Daten. So wird Ihr Unternehmen in Zürich besser gefunden."
        }
      },
      {
        "@type": "Question",
        "name": "Kann ich über meine Website Online-Anfragen und Buchungen erhalten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolut. Ab dem Growth-Paket erhalten Sie erweiterte Kontaktmöglichkeiten, Formulare und auf Wunsch ein Buchungssystem mit automatischen E-Mail-Bestätigungen. So können Ihre Kunden rund um die Uhr mit Ihnen in Kontakt treten."
        }
      },
      {
        "@type": "Question",
        "name": "Ist die Website auch für Smartphones optimiert?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Selbstverständlich. Alle Websites von Sin Digital werden Mobile-First entwickelt. Das bedeutet: Ihre Website sieht auf Smartphones, Tablets und Desktops perfekt aus und lädt blitzschnell. Google bevorzugt mobile-optimierte Websites im Ranking."
        }
      },
      {
        "@type": "Question",
        "name": "Warum sollte ich eine Digitalagentur aus Zürich wählen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine Digitalagentur in Zürich wie Sin Digital kennt den lokalen Markt, versteht Schweizer Unternehmen und kann persönliche Beratungsgespräche vor Ort führen. Wir kombinieren lokales Marktverständnis mit internationaler Expertise in Webdesign, SEO und Webentwicklung, damit Ihr Unternehmen online und lokal besser gefunden wird."
        }
      },
      {
        "@type": "Question",
        "name": "Was unterscheidet eine Webagentur wie Sin Digital von einem Freelancer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Als Webagentur in Zürich bietet Sin Digital ein Komplettpaket: Strategie, Webdesign, Webentwicklung, SEO und laufenden Support, alles aus einer Hand. Im Gegensatz zu einem Freelancer profitieren Sie von klaren Prozessen, transparenten Paketen, Hosting-Lösungen und langfristiger Betreuung."
        }
      },
      {
        "@type": "Question",
        "name": "Bietet Sin Digital auch günstige Websites in Zürich an?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Sin Digital erstellt günstige und professionelle Websites in Zürich bereits ab CHF 990. Damit erhalten KMU und lokale Unternehmen einen starken Webauftritt mit klarem Design, SEO-Basis und persönlicher Betreuung."
        }
      },
      {
        "@type": "Question",
        "name": "Kann ich meine Website in Zürich professionell erstellen lassen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Sin Digital erstellt professionelle Websites in Zürich für KMU, Startups und lokale Unternehmen. Sie erhalten Design, Webentwicklung und SEO aus einer Hand, transparent, effizient und auf Ihr Geschäft zugeschnitten."
        }
      },
      {
        "@type": "Question",
        "name": "Kann ich eine Website in Zürich günstig erstellen lassen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Bei Sin Digital erhalten Sie eine günstige Website in Zürich ab CHF 990, inklusive professionellem Design, technischer Umsetzung und SEO-Basis für lokale Sichtbarkeit."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.sin-digital.com/#webpage",
    "url": "https://www.sin-digital.com/",
    "name": "Digitalagentur Zürich | Webdesign & Webentwicklung für KMU | Sin Digital",
    "description": "Sin Digital, Ihre Digitalagentur in Zürich. Webdesign, Webentwicklung & SEO für KMU ab CHF 990. Fertig in 2 Wochen, hosting inklusive.",
    "inLanguage": [
      "de-CH",
      "en"
    ],
    "isPartOf": {
      "@id": "https://www.sin-digital.com/#website"
    },
    "about": {
      "@id": "https://www.sin-digital.com/#business"
    },
    "datePublished": "2024-01-01",
    "dateModified": "2026-03-13",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "@id": "https://www.sin-digital.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.sin-digital.com/"
        }
      ]
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        ".hero-title",
        ".contact-subtitle",
        ".section-desc"
      ]
    },
    "potentialAction": {
      "@type": "ReadAction",
      "target": [
        "https://www.sin-digital.com/"
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Wie läuft ein Webdesign-Projekt bei Sin Digital ab?",
    "description": "In 4 Schritten zur professionellen Website für Ihr Unternehmen.",
    "totalTime": "P15D",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "CHF",
      "value": "990"
    },
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Analyse",
        "text": "Wir lernen Ihr Unternehmen kennen, Ihre Zielgruppe, Dienstleistungen und Ziele.",
        "url": "https://www.sin-digital.com/#projects"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Konzeption",
        "text": "Gemeinsame Entwicklung von Struktur, Design und Inhalten mit frühem Feedback.",
        "url": "https://www.sin-digital.com/#projects"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Umsetzung",
        "text": "Professionelle Entwicklung Ihrer Website mit regelmässigen Updates.",
        "url": "https://www.sin-digital.com/#projects"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Livegang & Betreuung",
        "text": "Launch Ihrer Website mit persönlicher Begleitung und laufendem Support.",
        "url": "https://www.sin-digital.com/#contact"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Coiffeur Zürich, Website",
    "url": "https://coiffeurzurich.com/",
    "creator": {
      "@id": "https://www.sin-digital.com/#business"
    },
    "dateCreated": "2025",
    "description": "Professioneller Webauftritt für einen führenden Coiffeursalon in Zürich. Webdesign, lokales SEO und mobiloptimiertes Design von Sin Digital.",
    "about": {
      "@type": "LocalBusiness",
      "name": "Coiffeur Zürich",
      "url": "https://coiffeurzurich.com/"
    },
    "keywords": [
      "Webdesign Zürich",
      "SEO Zürich",
      "Coiffeur Zürich",
      "Beauty Website"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Street Food Compassion, Website",
    "url": "https://streetfood-compassion.ch/",
    "creator": {
      "@id": "https://www.sin-digital.com/#business"
    },
    "dateCreated": "2026",
    "description": "Website für Street Food Compassion, Organisator von Street-Food-Festivals und dem Badener Weihnachtszauber in Baden. Webdesign, Entwicklung und lokales SEO von Sin Digital.",
    "about": {
      "@type": "Organization",
      "name": "Street Food Compassion",
      "url": "https://streetfood-compassion.ch/"
    },
    "keywords": [
      "Webdesign",
      "Event Website",
      "Street Food Festival",
      "Baden"
    ]
  }
]

export default schema
