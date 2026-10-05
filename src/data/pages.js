// Every public page of the site, in sitemap order. Single source for the sitemap
// (generated at build time in vite.config.js) and for the test tooling in tools/.
//
// de / en   URL paths as served (always with trailing slash for directory pages)
// lastmod   set to the deploy date whenever the page's content changes
// noindex   page carries <meta name="robots" content="noindex"> (legal pages)
// sitemap   false keeps the page out of the sitemap (404)
// js        false means the page ships without the React bundle (no hydration)

export const SITE = 'https://www.sin-digital.com'

export const pages = [
  { id: 'home', de: '/', en: '/en/', lastmod: '2026-10-05', changefreq: 'weekly', priority: '1.0' },
  { id: 'webdesign', de: '/webdesign-zuerich.html', lastmod: '2026-03-13', changefreq: 'weekly', priority: '0.8', js: false },
  { id: 'website', de: '/website-zuerich.html', lastmod: '2026-03-13', changefreq: 'weekly', priority: '0.8', js: false },
  { id: 'guenstigeWebsite', de: '/guenstige-website-zuerich.html', lastmod: '2026-03-13', changefreq: 'weekly', priority: '0.8', js: false },
  { id: 'seoAgentur', de: '/seo-agentur-zuerich.html', lastmod: '2026-03-13', changefreq: 'weekly', priority: '0.8', js: false },
  { id: 'webentwicklung', de: '/webentwicklung-zuerich.html', lastmod: '2026-03-13', changefreq: 'weekly', priority: '0.8', js: false },
  { id: 'agb', de: '/agb.html', lastmod: '2026-03-13', changefreq: 'yearly', priority: '0.3', noindex: true },
  { id: 'datenschutz', de: '/datenschutz.html', lastmod: '2026-03-13', changefreq: 'yearly', priority: '0.3', noindex: true },
  { id: 'impressum', de: '/impressum.html', lastmod: '2026-03-13', changefreq: 'yearly', priority: '0.3', noindex: true },
  { id: 'notFound', de: '/404.html', sitemap: false, js: false },
]

// Flat list of every URL with its language, e.g. for tests.
export function allUrls() {
  const urls = []
  for (const page of pages) {
    urls.push({ id: page.id, lang: 'de', path: page.de, js: page.js !== false })
    if (page.en) urls.push({ id: page.id, lang: 'en', path: page.en, js: page.js !== false })
  }
  return urls
}

// Routes that are served as plain HTML without the React bundle.
export function staticRoutes() {
  return allUrls().filter((u) => !u.js).map((u) => u.path)
}
