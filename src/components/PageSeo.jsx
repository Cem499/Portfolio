import { SITE } from '../data/pages.js'
import Seo from './Seo.jsx'

const OG_IMAGE = `${SITE}/assets/ICON-Logo_Sin-Digital.webp`

// <head> of the subpages: the same meta set as the start page, canonical and hreflang
// from `paths` ({ de, en }), JSON-LD blocks via `jsonLd`. `image` ({ src, srcSet, sizes })
// is preloaded (the LCP image of the page) and used for Open Graph.
export default function PageSeo({ lang, paths, title, description, ogTitle = title, jsonLd = [], image }) {
  const url = SITE + paths[lang]
  return (
    <Seo htmlAttributes={{ lang: lang === 'en' ? 'en' : 'de-CH', prefix: 'og: https://ogp.me/ns#' }} jsonLd={jsonLd}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Sin Digital, Digitalagentur Zürich" />
      <meta name="geo.region" content="CH-ZH" />
      <meta name="geo.placename" content="Zurich" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="theme-color" content="#050505" />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="de-CH" href={SITE + paths.de} />
      <link rel="alternate" hrefLang="en" href={SITE + paths.en} />
      <link rel="alternate" hrefLang="en-CH" href={SITE + paths.en} />
      <link rel="alternate" hrefLang="x-default" href={SITE + paths.de} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={description} />
      {image ? (
        <meta property="og:image" content={SITE + image.src} />
      ) : (
        <meta property="og:image" content={OG_IMAGE} />
      )}
      {!image && <meta property="og:image:width" content="1200" />}
      {!image && <meta property="og:image:height" content="630" />}
      <meta property="og:image:alt" content={image ? ogTitle : 'Sin Digital, Digitalagentur Zürich'} />
      <meta property="og:site_name" content="Sin Digital" />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : 'de_CH'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sindigital" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image ? SITE + image.src : OG_IMAGE} />
      {image && <link rel="preload" as="image" href={image.src} imageSrcSet={image.srcSet} imageSizes={image.sizes} fetchpriority="high" />}
      <link rel="icon" type="image/webp" href="/assets/ICON-Logo_Sin-Digital.webp" />
      <link rel="apple-touch-icon" href="/assets/ICON-Logo_Sin-Digital.webp" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="preload" href="/assets/Logo_Sin-Digital.webp" as="image" type="image/webp" fetchpriority="high" />
    </Seo>
  )
}
