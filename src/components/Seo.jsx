import { Head } from 'vite-react-ssg'

// Per-page <head>: meta tags as children, JSON-LD blocks as data.
export default function Seo({ htmlAttributes, bodyAttributes, jsonLd = [], children }) {
  return (
    <Head htmlAttributes={htmlAttributes} bodyAttributes={bodyAttributes}>
      {children}
      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(block, null, 2)}</script>
      ))}
    </Head>
  )
}
