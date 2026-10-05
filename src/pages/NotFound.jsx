import Seo from '../components/Seo.jsx'
import '../styles/notfound.css'

// 404.html: eigenständige Fehlerseite, ohne JavaScript ausgeliefert.
export default function NotFound() {
  return (
    <>
      <Seo htmlAttributes={{ lang: 'de-CH' }}>
        <title>{"Seite nicht gefunden, Sin Digital"}</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" type="image/webp" href="/assets/ICON-Logo_Sin-Digital.webp" />
      </Seo>
      <div className="error-container">
        <div className="logo">
          <a href="/" title="Sin Digital, Startseite">
            {' '}
            <img src="/assets/Logo_Sin-Digital.webp" alt="Sin Digital Logo" width="160" height="44" fetchpriority="high" loading="eager" />
            {' '}
          </a>
        </div>
        <div className="error-code">404</div>
        <h1>Seite nicht gefunden</h1>
        <p>
          Die gewünschte Seite existiert leider nicht oder wurde verschoben. Kehren Sie zur Startseite zurück, um mehr über Sin Digital zu erfahren.
        </p>
        <a href="/" className="btn-home">Zur Startseite</a>
      </div>
    </>
  )
}
