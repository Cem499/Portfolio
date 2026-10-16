// JSON-LD von index.html, 1:1 aus dem Original übernommen; letzter Block (Street Food Compassion) neu.
// HowTo: die Schritte kommen aus der Prozess-Timeline (i18n home.projects.process).
import { home, shared } from '../../i18n/de.js'
import { isLaunchDiscountActive } from '../launchDiscount.js'
import { cheapestPlan, plans } from '../maintenance.js'
import { CARE_MONTHS_INCLUDED, fixedPackages, individualPackage } from '../packages.js'
import { fill, packageValues, siteValues } from '../siteValues.js'

const values = siteValues('de')
const steps = home.projects.process.steps.map((step) => ({ ...step, desc: fill(step.desc, values) }))

// The packages as schema.org offers with their regular fixed prices (never the launch
// discount), plus the care plans. `detailed` adds availability and the unit.
function packageOffers(detailed) {
  const unit = (unitText, price) => (detailed ? { availability: 'https://schema.org/InStock', priceSpecification: { '@type': 'UnitPriceSpecification', price, priceCurrency: 'CHF', unitText } } : {})
  return [
    ...fixedPackages.map((pkg) => ({
      '@type': 'Offer',
      name: shared.packages[pkg.id].name,
      description: fill(home.projects.packages[pkg.id].claim, { ...values, ...packageValues(pkg, 'de', shared.care.plans) }),
      price: String(pkg.price),
      priceCurrency: 'CHF',
      ...unit('einmalig', String(pkg.price)),
    })),
    {
      '@type': 'Offer',
      name: shared.packages.individuell.name,
      description: fill(home.projects.individual.text, values),
      priceCurrency: 'CHF',
      priceSpecification: { '@type': 'PriceSpecification', minPrice: individualPackage.priceFrom, priceCurrency: 'CHF' },
    },
    {
      '@type': 'Offer',
      name: 'Wartung & Hosting',
      description: `Wartung in drei Stufen: ${plans.map((plan) => `${shared.care.plans[plan.id].name} (CHF ${plan.monthly} pro Monat)`).join(', ')}. Die ersten ${CARE_MONTHS_INCLUDED} Monate sind in jedem Website-Paket enthalten.`,
      price: String(cheapestPlan.monthly),
      priceCurrency: 'CHF',
      ...unit('monatlich', String(cheapestPlan.monthly)),
    },
  ]
}

// The FAQ of the start page (home.faq.items); the launch question only while the discount runs.
const faqEntities = home.faq.items
  .filter((item) => !item.launchOnly || isLaunchDiscountActive())
  .map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: fill(item.answer, values) } }))

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
    "description": fill("Sin Digital, Ihre Digitalagentur in Zürich. Webdesign, Webentwicklung & SEO für KMU, Startups und Unternehmen. Websites zum Fixpreis ab CHF {from}, Landingpage in {landingpageWeeks} Wochen.", values),
    "url": "https://www.sin-digital.com",
    "email": "info@sin-digital.com",
    "foundingDate": "2026",
    "currenciesAccepted": "CHF",
    "paymentAccepted": "Banküberweisung, TWINT",
    "priceRange": `CHF ${fixedPackages[0].price}, ${individualPackage.priceFrom}`,
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
      "itemListElement": packageOffers(true)
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
    "description": fill("Sin Digital, Ihre Digitalagentur in Zürich. Webdesign, Webentwicklung und SEO für KMU, Startups und Unternehmen, zum Fixpreis ab CHF {from}. {months} Monate Wartung inklusive, danach ab CHF {care} pro Monat.", values),
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
      "itemListElement": packageOffers(false)
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqEntities
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.sin-digital.com/#webpage",
    "url": "https://www.sin-digital.com/",
    "name": "Digitalagentur Zürich | Webdesign & Webentwicklung für KMU | Sin Digital",
    "description": fill(home.meta.description, values),
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
    "dateModified": "2026-10-08",
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
    "description": `In ${steps.length} Schritten zur professionellen Website für Ihr Unternehmen.`,
    "totalTime": `P${fixedPackages[fixedPackages.length - 1].weeks.max * 7}D`,
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "CHF",
      "value": String(fixedPackages[0].price)
    },
    "step": steps.map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.name,
      "text": step.desc,
      "url": "https://www.sin-digital.com/#projects"
    }))
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
