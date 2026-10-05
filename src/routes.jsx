// Every route is lazy, so each page only pulls in its own CSS chunk.
// vite-react-ssg finds a route's CSS by reading the import() inside its lazy
// function, so the import has to stay inline (no shared helper).
// Paths keep the original .html URLs; vite.config.js renames the generated files.

export const routes = [
  {
    path: '/',
    lazy: async () => {
      const { default: Home } = await import('./pages/Home.jsx')
      return { Component: () => <Home lang="de" /> }
    },
  },
  {
    path: '/en/',
    lazy: async () => {
      const { default: Home } = await import('./pages/Home.jsx')
      return { Component: () => <Home lang="en" /> }
    },
  },
  {
    path: '/konfigurator/',
    lazy: async () => {
      const { default: Konfigurator } = await import('./pages/Konfigurator.jsx')
      return { Component: () => <Konfigurator lang="de" /> }
    },
  },
  {
    path: '/en/configurator/',
    lazy: async () => {
      const { default: Konfigurator } = await import('./pages/Konfigurator.jsx')
      return { Component: () => <Konfigurator lang="en" /> }
    },
  },
  { path: '/agb.html', lazy: async () => ({ Component: (await import('./pages/Agb.jsx')).default }) },
  { path: '/datenschutz.html', lazy: async () => ({ Component: (await import('./pages/Datenschutz.jsx')).default }) },
  { path: '/impressum.html', lazy: async () => ({ Component: (await import('./pages/Impressum.jsx')).default }) },
  { path: '/webdesign-zuerich.html', lazy: async () => ({ Component: (await import('./pages/Webdesign.jsx')).default }) },
  { path: '/website-zuerich.html', lazy: async () => ({ Component: (await import('./pages/Website.jsx')).default }) },
  { path: '/guenstige-website-zuerich.html', lazy: async () => ({ Component: (await import('./pages/GuenstigeWebsite.jsx')).default }) },
  { path: '/webentwicklung-zuerich.html', lazy: async () => ({ Component: (await import('./pages/Webentwicklung.jsx')).default }) },
  { path: '/seo-agentur-zuerich.html', lazy: async () => ({ Component: (await import('./pages/SeoAgentur.jsx')).default }) },
  { path: '/404.html', lazy: async () => ({ Component: (await import('./pages/NotFound.jsx')).default }) },
]
