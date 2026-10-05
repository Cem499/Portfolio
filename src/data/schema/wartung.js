import { plans } from '../maintenance.js'
import { SITE } from '../pages.js'

// JSON-LD of /wartung/: the page, the care plans as a Service with monthly offers, and the FAQ.
// `care` is shared.care (plan names and summaries, also used on the start page).
export default function wartungSchema(lang, t, care, paths) {
  const url = SITE + paths[lang]
  const home = SITE + (lang === 'en' ? '/en/' : '/')
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: t.meta.title,
      description: t.meta.description,
      inLanguage: lang === 'en' ? 'en' : 'de-CH',
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${SITE}/#business` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: home },
          { '@type': 'ListItem', position: 2, name: t.breadcrumb, item: url },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: t.label,
      serviceType: lang === 'en' ? 'Website maintenance and hosting' : 'Website-Wartung und Hosting',
      provider: { '@id': `${SITE}/#business` },
      areaServed: { '@type': 'Country', name: lang === 'en' ? 'Switzerland' : 'Schweiz' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: t.label,
        itemListElement: plans.map((plan) => ({
          '@type': 'Offer',
          name: `${care.plans[plan.id].name} Care`,
          description: care.plans[plan.id].summary,
          price: String(plan.monthly),
          priceCurrency: 'CHF',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: String(plan.monthly),
            priceCurrency: 'CHF',
            unitText: lang === 'en' ? 'per month' : 'monatlich',
          },
          availability: 'https://schema.org/InStock',
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: t.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ]
}
