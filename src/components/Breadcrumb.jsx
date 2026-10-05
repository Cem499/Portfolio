// Visually hidden breadcrumb (microdata) of the home page.
export default function Breadcrumb({ homeUrl }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList" style={{ position: 'absolute', left: '-9999px', top: '0', width: '1px', height: '1px', overflow: 'hidden' }}>
      <ol style={{ listStyle: 'none', display: 'flex', gap: '0.4rem', fontSize: '0.7rem', margin: '0', padding: '0' }}>
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <a itemProp="item" href={homeUrl}>
            <span itemProp="name">Home</span>
          </a>
          <meta itemProp="position" content="1" />
        </li>
      </ol>
    </nav>
  )
}
