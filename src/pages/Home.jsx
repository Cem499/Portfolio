import Breadcrumb from '../components/Breadcrumb.jsx'
import Clients from '../components/Clients.jsx'
import Contact from '../components/Contact.jsx'
import Faq from '../components/Faq.jsx'
import Hero from '../components/Hero.jsx'
import LocalSeo from '../components/LocalSeo.jsx'
import Projects from '../components/Projects.jsx'
import Reviews from '../components/Reviews.jsx'
import Seo from '../components/Seo.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import Team from '../components/Team.jsx'
import { configuratorPath } from '../data/navigation.js'
import schema from '../data/schema/home.js'
import useSmoothScroll from '../hooks/useSmoothScroll.js'
import { home as deHome, shared as deShared } from '../i18n/de.js'
import { home as enHome, shared as enShared } from '../i18n/en.js'
import '../styles/global.css'

// critical.css and lang-switch.css are inlined into <head> of / and /en/ at build time
// (vite.config.js). In dev there is no prerender step, so load them as normal stylesheets.
if (import.meta.env.DEV && !import.meta.env.SSR) {
  import('../styles/critical.css')
  import('../styles/lang-switch.css')
}

const SITE = 'https://www.sin-digital.com'
const PATHS = { de: '/', en: '/en/' }
const URLS = { de: `${SITE}${PATHS.de}`, en: `${SITE}${PATHS.en}` }

function HomeHead({ t, lang }) {
  const url = URLS[lang]
  const locale = lang === 'en' ? 'en_US' : 'de_CH'
  const altLocales = lang === 'en' ? ['de_CH', 'en_CH'] : ['en_US', 'en_CH']

  return (
    <Seo
      htmlAttributes={{ lang: lang === 'en' ? 'en' : 'de-CH', prefix: 'og: https://ogp.me/ns#' }}
      bodyAttributes={{ itemscope: '', itemtype: 'https://schema.org/WebPage' }}
      jsonLd={schema}
    >
      <title>{t.meta.title}</title>
      <meta name="description" content={t.meta.description} />
      <meta name="keywords" content="Digitalagentur Zürich, Digital Agentur Zürich, digitale Agentur Zürich, Webagentur Zürich, Webdesign Zürich, Webentwicklung Zürich, Website Zürich, günstige Website Zürich, professionelle Website Zürich, KMU Website Zürich, Firmenwebsite Zürich, Website erstellen Zürich, Website erstellen lassen Zürich, website Zurich, affordable website Zurich, digital agency Zurich, web agency Zurich, web design Zurich, web development Zurich, professional website Zurich, business website Zurich, Sin Digital, Cem Sin" />
      <meta name="author" content="Sin Digital, Digitalagentur Zürich" />
      <meta name="language" content="de-CH, en" />
      <meta name="geo.region" content="CH-ZH" />
      <meta name="geo.placename" content="Zurich" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="theme-color" content="#050505" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Sin Digital" />
      <link id="canonical-link" rel="canonical" href={url} />
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      <link id="alt-de" rel="alternate" hrefLang="de-CH" href={URLS.de} />
      <link id="alt-en" rel="alternate" hrefLang="en" href={URLS.en} />
      <link id="alt-en-ch" rel="alternate" hrefLang="en-CH" href={URLS.en} />
      <link id="alt-x" rel="alternate" hrefLang="x-default" href={URLS.de} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={t.meta.ogTitle} />
      <meta property="og:description" content={t.meta.ogDescription} />
      <meta property="og:image" content="https://www.sin-digital.com/assets/ICON-Logo_Sin-Digital.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Sin Digital, Digitalagentur Zürich" />
      <meta property="og:site_name" content="Sin Digital" />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={altLocales[0]} />
      <meta property="og:locale:alternate" content={altLocales[1]} />
      <meta property="og:updated_time" content="2026-03-13T00:00:00+01:00" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sindigital" />
      <meta name="twitter:title" content={t.meta.twitterTitle} />
      <meta name="twitter:description" content={t.meta.twitterDescription} />
      <meta name="twitter:image" content="https://www.sin-digital.com/assets/ICON-Logo_Sin-Digital.webp" />
      <link rel="icon" type="image/webp" href="/assets/ICON-Logo_Sin-Digital.webp" />
      <link rel="apple-touch-icon" href="/assets/ICON-Logo_Sin-Digital.webp" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="preload" href="/assets/Logo_Sin-Digital.webp" as="image" type="image/webp" fetchpriority="high" />
      <link rel="prefetch" href="/webdesign-zuerich.html" />
      <link rel="prefetch" href="/website-zuerich.html" />
      <link rel="prefetch" href="/seo-agentur-zuerich.html" />
      <link rel="prefetch" href="/webentwicklung-zuerich.html" />
      <link rel="prefetch" href="/guenstige-website-zuerich.html" />
    </Seo>
  )
}

// Start page, prerendered once per language: "/" (de) and "/en/" (en).
export default function Home({ lang }) {
  const t = lang === 'en' ? enHome : deHome
  const shared = lang === 'en' ? enShared : deShared

  useSmoothScroll()

  return (
    <>
      <HomeHead t={t} lang={lang} />

      <SiteHeader lang={lang} shared={shared} paths={PATHS} isHome />

      <main id="main-content" role="main" itemScope itemType="https://schema.org/WebPageElement">
        <Breadcrumb homeUrl={URLS[lang]} />
        <Hero t={t} ctaHref={configuratorPath(lang)} />
        <LocalSeo t={t} />
        <Team t={t} />
        <Clients t={t} />
        <Projects t={t} />
        <Faq t={t} />
        <Reviews t={t} />
        <Contact t={t} shared={shared} />
      </main>
    </>
  )
}
