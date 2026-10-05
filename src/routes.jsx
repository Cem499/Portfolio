import { useParams } from 'react-router-dom'
import { projectPaths, projects } from './data/projects.js'

// Every route is lazy, so each page only pulls in its own CSS chunk.
// vite-react-ssg finds a route's CSS by reading the import() inside its lazy
// function, so the import has to stay inline (no shared helper).
// Paths keep the original .html URLs; vite.config.js renames the generated files.
// Case studies are dynamic routes; getStaticPaths lists the slugs to prerender.

const projectRoute = (lang) => ({
  path: `${lang === 'en' ? '/en/projects' : '/projekte'}/:slug/`,
  getStaticPaths: () => projects.map((project) => projectPaths[lang](project.slug)),
  lazy: async () => {
    const { default: Projekt } = await import('./pages/Projekt.jsx')
    return {
      Component: () => {
        const { slug } = useParams()
        return <Projekt lang={lang} slug={slug} />
      },
    }
  },
})

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
  {
    path: '/projekte/',
    lazy: async () => {
      const { default: Projekte } = await import('./pages/Projekte.jsx')
      return { Component: () => <Projekte lang="de" /> }
    },
  },
  {
    path: '/en/projects/',
    lazy: async () => {
      const { default: Projekte } = await import('./pages/Projekte.jsx')
      return { Component: () => <Projekte lang="en" /> }
    },
  },
  projectRoute('de'),
  projectRoute('en'),
  {
    path: '/wartung/',
    lazy: async () => {
      const { default: Wartung } = await import('./pages/Wartung.jsx')
      return { Component: () => <Wartung lang="de" /> }
    },
  },
  {
    path: '/en/maintenance/',
    lazy: async () => {
      const { default: Wartung } = await import('./pages/Wartung.jsx')
      return { Component: () => <Wartung lang="en" /> }
    },
  },
  {
    path: '/website-check/',
    lazy: async () => {
      const { default: WebsiteCheck } = await import('./pages/WebsiteCheck.jsx')
      return { Component: () => <WebsiteCheck lang="de" /> }
    },
  },
  {
    path: '/en/website-check/',
    lazy: async () => {
      const { default: WebsiteCheck } = await import('./pages/WebsiteCheck.jsx')
      return { Component: () => <WebsiteCheck lang="en" /> }
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
