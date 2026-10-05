import { SITE } from '../pages.js'
import { listPaths, projectPaths, projects } from '../projects.js'

const BUSINESS = { '@id': `${SITE}/#business` }

function creativeWork(lang, t, project) {
  const texts = t.items[project.slug]
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${SITE}${projectPaths[lang](project.slug)}#work`,
    name: `${texts.name}, Website`,
    url: project.url,
    creator: BUSINESS,
    ...(project.year ? { dateCreated: String(project.year) } : {}),
    description: texts.summary,
    about: { '@type': 'Organization', name: texts.name, url: project.url },
    keywords: project.tech,
    inLanguage: lang === 'en' ? 'en' : 'de-CH',
  }
}

// /projekte/: the collection with its items.
export function projectListSchema(lang, t, paths) {
  const url = SITE + paths[lang]
  const home = SITE + (lang === 'en' ? '/en/' : '/')
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${url}#webpage`,
      url,
      name: t.meta.title,
      description: t.meta.description,
      inLanguage: lang === 'en' ? 'en' : 'de-CH',
      isPartOf: { '@id': `${SITE}/#website` },
      about: BUSINESS,
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
      '@type': 'ItemList',
      itemListElement: projects.map((project, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: SITE + projectPaths[lang](project.slug),
        name: t.items[project.slug].name,
      })),
    },
  ]
}

// /projekte/<slug>/: the page and the work it describes.
export function projectSchema(lang, t, project, paths) {
  const url = SITE + paths[lang]
  const home = SITE + (lang === 'en' ? '/en/' : '/')
  const texts = t.items[project.slug]
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: `${texts.name}: ${texts.tagline}`,
      description: texts.summary,
      inLanguage: lang === 'en' ? 'en' : 'de-CH',
      isPartOf: { '@id': `${SITE}/#website` },
      mainEntity: { '@id': `${url}#work` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: home },
          { '@type': 'ListItem', position: 2, name: t.breadcrumb, item: SITE + listPaths[lang] },
          { '@type': 'ListItem', position: 3, name: texts.name, item: url },
        ],
      },
    },
    creativeWork(lang, t, project),
  ]
}
