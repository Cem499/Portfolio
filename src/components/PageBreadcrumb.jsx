import { homePath } from '../data/navigation.js'

// Visible breadcrumb of the subpages (the BreadcrumbList schema is in each page's JSON-LD).
// `parent` ({ href, label }) adds a level between Home and the current page.
export default function PageBreadcrumb({ lang, current, parent }) {
  return (
    <nav className="page-breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li>
          <a href={homePath(lang)}>Home</a>
        </li>
        {parent && (
          <li>
            <a href={parent.href}>{parent.label}</a>
          </li>
        )}
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  )
}
