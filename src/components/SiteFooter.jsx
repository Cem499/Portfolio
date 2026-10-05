import Footer from './Footer.jsx'

// Page footer of the subpages (the start page has its footer inside the contact section).
export default function SiteFooter({ shared }) {
  return (
    <div className="site-footer">
      <div className="container">
        <Footer shared={shared} />
      </div>
    </div>
  )
}
