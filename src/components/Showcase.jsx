import { useState } from 'react'
import BeforeAfterSlider from './BeforeAfterSlider.jsx'
import { comparePair, listPaths, projectBySlug, projectPaths, projectSections } from '../data/projects.js'
import useReveal, { revealClass } from '../hooks/useReveal.js'

const FEATURED = 'street-food-compassion'
const SIZES = '(min-width: 1360px) 1320px, calc(100vw - 3rem)'

// References on the start page: the featured project's before/after pairs (start page plus
// every compared section of its case study) behind one slider, switched with tabs.
export default function Showcase({ t, projekte, lang }) {
  const project = projectBySlug(FEATURED)
  const texts = projekte.items[FEATURED]
  const main = comparePair(project)
  const views = [
    { id: 'home', title: t.showcase.homeTab, before: main.before, after: main.after },
    ...projectSections(project).compared.map((section) => ({ ...section, title: texts.sections[section.id].title })),
  ]
  const [active, setActive] = useState(0)
  const [position, setPosition] = useState(50)
  const [headRef, headVisible] = useReveal()
  const [stageRef, stageVisible] = useReveal()
  const view = views[active]

  return (
    <section id="work" className="section showcase" aria-labelledby="showcase-heading">
      <div className="container">
        <div ref={headRef} className={revealClass('showcase-head reveal', headVisible)}>
          <div>
            <span className="label">{t.showcase.label}</span>
            <h2 id="showcase-heading" className="section-title">
              <span>{t.showcase.title1}</span><br />
              <span className="text-green">{t.showcase.title2}</span>
            </h2>
          </div>
          <p className="section-desc-right">{t.showcase.intro}</p>
        </div>

        <div ref={stageRef} className={revealClass('showcase-stage reveal reveal-delay-1', stageVisible)}>
          <div className="showcase-bar">
            <p className="showcase-project">
              <strong>{t.showcase.project}</strong>
              <span>{texts.client}</span>
            </p>
            <div className="showcase-tabs" role="group" aria-label={t.showcase.tabsLabel}>
              {views.map((item, i) => (
                <button key={item.id} type="button" className={i === active ? 'showcase-tab active' : 'showcase-tab'} aria-pressed={i === active} onClick={() => setActive(i)}>
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          <BeforeAfterSlider
            priority={false}
            position={position}
            onPosition={setPosition}
            before={{ ...view.before, sizes: SIZES, alt: `${projekte.compare.before}: ${texts.name}, ${view.title}` }}
            after={{ ...view.after, sizes: SIZES, alt: `${projekte.compare.after}: ${texts.name}, ${view.title}` }}
            labels={projekte.compare}
          />

          <div className="showcase-foot">
            <p>{texts.tagline}</p>
            <div className="showcase-links">
              <a className="btn-primary" href={projectPaths[lang](FEATURED)}>{t.showcase.caseLink}</a>
              <a className="showcase-all" href={listPaths[lang]}>{t.showcase.allLink} →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
