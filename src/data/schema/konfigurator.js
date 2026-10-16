import { packages } from '../packages.js'
import { SITE } from '../pages.js'
import { fill, packageValues, siteValues } from '../siteValues.js'

// JSON-LD of /konfigurator/ and /en/configurator/: the page itself with its breadcrumb,
// plus the packages as an OfferCatalog with their fixed prices (src/data/packages.js).
// Regular prices only, never the launch discount.
export default function konfiguratorSchema(lang, t, shared, paths) {
  const url = SITE + paths[lang]
  const home = SITE + (lang === 'en' ? '/en/' : '/')
  const values = siteValues(lang)
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
      itemListElement: packages.map((pkg) => ({
        '@type': 'Offer',
        name: shared.packages[pkg.id].name,
        description: fill(t.packages[pkg.id].desc, { ...values, ...packageValues(pkg, lang, shared.care.plans) }),
        priceCurrency: 'CHF',
        ...(pkg.onRequest
          ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: pkg.priceFrom, priceCurrency: 'CHF' } }
          : {
              price: String(pkg.price),
              priceSpecification: { '@type': 'UnitPriceSpecification', price: String(pkg.price), priceCurrency: 'CHF', unitText: lang === 'en' ? 'one-time' : 'einmalig' },
            }),
        availability: 'https://schema.org/InStock',
        offeredBy: { '@id': `${SITE}/#business` },
      })),
    },
  ]
}
