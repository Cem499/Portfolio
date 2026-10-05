import { SITE } from '../pages.js'
import { siteTypes } from '../pricing.js'

// JSON-LD of /konfigurator/ and /en/configurator/: the page itself with its breadcrumb,
// plus the public price list as an OfferCatalog (starting prices from src/data/pricing.js;
// a type on request carries no price).
export default function konfiguratorSchema(lang, t, paths) {
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
      '@type': 'OfferCatalog',
      name: t.label,
      url,
      itemListElement: siteTypes.map((type) => ({
        '@type': 'Offer',
        name: t.siteTypes[type.id].name,
        description: t.siteTypes[type.id].desc,
        ...(type.onRequest
          ? {}
          : {
              priceCurrency: 'CHF',
              priceSpecification: { '@type': 'PriceSpecification', minPrice: type.priceFrom, priceCurrency: 'CHF' },
            }),
        offeredBy: { '@id': `${SITE}/#business` },
      })),
    },
  ]
}
