import { SITE } from '../pages.js'

// JSON-LD of /website-check/: the page with its breadcrumb and the tool as a web application.
export default function websiteCheckSchema(lang, t, paths) {
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
      mainEntity: { '@id': `${url}#app` },
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
      '@type': 'WebApplication',
      '@id': `${url}#app`,
      name: t.label,
      url,
      description: t.intro,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'CHF' },
      provider: { '@id': `${SITE}/#business` },
    },
  ]
}
