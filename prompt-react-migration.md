# Prompt: Sin Digital Portfolio → React + Vite (Migration)

Du bist Senior Frontend Engineer. Migriere das bestehende statische Portfolio von Sin Digital nach React + Vite. Ziel ist eine 1:1 Migration: Das Ergebnis muss im Browser pixelgenau gleich aussehen, sich gleich verhalten und das gleiche SEO liefern. Kein Redesign, keine neuen Features, keine Textänderungen, keine "Verbesserungen" am Design. Die einzigen Ausnahmen stehen im Abschnitt "Gewollte Änderungen". Wenn du etwas nicht 1:1 übernehmen kannst oder dir eine Information fehlt, stopp und frag mich, statt zu raten.

## Ausgangslage im Repo

- Wir arbeiten im geklonten Repo `https://github.com/Cem499/Portfolio` auf dem Branch `react-migration`. Prüfe das mit `git branch`, bevor du etwas änderst. Nie auf `main` committen oder pushen, Render deployt die Live-Seite von `main`.
- Die alte statische Seite liegt im Hauptordner des Repos. Verschiebe sie als allerersten Schritt unverändert mit `git mv` in den Ordner `legacy/`. Nicht mitverschieben: `.git/`, diese Prompt-Datei und das Logo. Sie dient als Vorlage und für den visuellen Vergleich. Ändere nichts in `legacy/`. Alle Pfadangaben unten beziehen sich auf diesen Ordner.
- Das React-Projekt baust du im Hauptordner des Repos auf.
- Im Hauptordner liegen zusätzlich diese Prompt-Datei und das Logo `LogoStreetFoodCompassion`. Das Logo kann als `.webp` oder `.png` vorliegen. Falls es ein PNG ist, wandle es mit dem npm-Paket `sharp` in `public/assets/LogoStreetFoodCompassion.webp` um, 240×240, Qualität 90. Danach die Originaldatei aus dem Hauptordner löschen.
- Committe in sinnvollen Schritten auf `react-migration` (zum Beispiel nach dem Verschieben, nach dem Setup, nach jeder fertigen Seite). Pushen nur, wenn ich es sage.
- Am Schluss, wenn ich die Migration abgenommen habe, wird `legacy/` gelöscht. Das machst du nur auf meine Anweisung.

## Ist-Zustand (bereits analysiert, Pfade jetzt in `legacy/`)

Dateien:
- `index.html` (~2000 Zeilen): Hauptseite, zweisprachig DE/EN
- `styles.css` (Quelle, ~1600 Zeilen) und `styles.min.css` (wird von den Seiten eingebunden). Prüfe zuerst, ob `styles.min.css` exakt `styles.css` entspricht. Falls nicht, ist `styles.min.css` die Wahrheit, weil die Live-Seiten sie laden. Unterschiede melden.
- `script.js` / `script.min.js`: Reveal on Scroll (IntersectionObserver, unterschiedliche Optionen Mobile ≤768px vs Desktop), FAQ Accordion (immer nur eins offen, aria-expanded), Smooth Scroll für `#`-Anker mit 70px Nav-Offset, Mobile Menu (Hamburger, `open`-Klassen, aria-hidden, inert, Body-Scroll-Lock, Escape schliesst)
- Unterseiten: `agb.html`, `datenschutz.html`, `impressum.html` (laden `styles.min.css` + grossen eigenen `<style>`-Block, eigene Nav mit "Zurück"-Link, DE/EN-Umschaltung per localStorage, Scroll-to-Top-Button ab 400px, Reveal auf `.legal-grid` mit threshold 0.08). In `agb.html` ist der Script-Block doppelt vorhanden, nur einmal übernehmen.
- SEO-Landingpages: `webdesign-zuerich.html`, `website-zuerich.html`, `guenstige-website-zuerich.html`, `webentwicklung-zuerich.html`, `seo-agentur-zuerich.html` (eigenständig, nur Inline-`<style>`, kein `styles.min.css`, eigene JSON-LD Blöcke, nur Deutsch)
- `404.html` (eigenständig, nur Inline-Style)
- `assets/` (webp Logos, Portrait), `manifest.json`, `robots.txt`, `sitemap.xml`, `sitemap-style.xsl`

Inline-Logik in `index.html`:
1. Kritischer Inline-`<style>` im Head (~376 Zeilen, ab Zeile ~499) gegen Layout Shift
2. Sprachsystem: Elemente mit `data-de` / `data-en` (134 Stück), `data-de-placeholder` / `data-en-placeholder`, Meta-Tags mit `data-de-content` / `data-en-content`. Sprache kommt aktuell aus `?lang=en|de`, sonst `localStorage['sindigital-lang']`, Default `de`. Canonical und hreflang-Links (`#canonical-link`, `#alt-de`, `#alt-en`, `#alt-en-ch`, `#alt-x`) werden je nach Sprache gesetzt. Elemente mit `<a>` im Text werden per innerHTML ersetzt. Ein Inline-Script im Head setzt `lang` vor dem Rendern. Dieses System wird für die Home ersetzt, siehe "Gewollte Änderungen".
3. Kontaktformular: EmailJS (Public Key `_U_phGxH8KcaJXxfq`, Service `service_qlylu4x`, Template `template_5mci63d`), Cloudflare Turnstile, Validierung in genau dieser Reihenfolge: Pflichtfelder (Name, E-Mail, Nachricht) → Datenschutz-Checkbox → Nachricht ≥10 Zeichen → Turnstile-Token. Button wird disabled + "Wird gesendet...". Status-Box `#form-status` mit exakt den bestehenden Farben (Erfolg `#C1FF72`, Fehler `#ff6464`), Erfolg blendet nach 8s aus, Formular + Turnstile werden zurückgesetzt. Alle Meldungstexte 1:1 übernehmen.
4. Reviews-Karussell: Endlos-Loop mit je N Klonen davor und danach, Start bei Index N, translateX in Kartenbreite + gap, 0.45s ease, Jump ohne Animation bei `transitionend`, Lock gegen Doppelklick, Autoplay alle 3500ms, Pause bei mouseenter/touchstart/Tab versteckt, kein Autoplay bei `prefers-reduced-motion`, Neuberechnung bei Resize (150ms Debounce).
5. JSON-LD Schema (LocalBusiness, HowTo, CreativeWork für Coiffeur Zürich etc.) im Head

Externe Scripts: EmailJS CDN, Turnstile. Das Script `/cdn-cgi/scripts/.../email-decode.min.js` wird vom CDN automatisch injiziert (E-Mail-Obfuscation), NICHT übernehmen.

## Gewollte Änderungen (nur diese)

### 1. Englische Startseite unter `/en/` statt `?lang=en`

Hintergrund: Laut Google Search Console hat `/?lang=en` fast so viele Impressionen wie die deutsche Startseite. Eine eigene vorgerenderte URL macht den englischen Inhalt für Google direkt lesbar.

- `/` wird auf Deutsch vorgerendert, `/en/` auf Englisch. Beide sind eigenständige statische HTML-Dateien (`dist/index.html`, `dist/en/index.html`) mit vollständigem Inhalt in der jeweiligen Sprache.
- Alle Texte aus `data-de` / `data-en` kommen in `src/i18n/de.js` und `src/i18n/en.js`. Die Home-Komponenten bekommen die Sprache als Prop bzw. Context von der Route, nicht aus localStorage.
- Head pro Sprache: `<html lang="de-CH">` bzw. `<html lang="en">`, title, description, OG, Twitter in der jeweiligen Sprache (Texte aus `data-de-content` / `data-en-content`), `og:locale` `de_CH` bzw. `en_US`, `og:url` passend.
- Canonical: `/` zeigt auf `https://www.sin-digital.com/`, `/en/` auf `https://www.sin-digital.com/en/`.
- hreflang auf beiden Seiten identisch: `de-CH` → `/`, `en` → `/en/`, `en-CH` → `/en/`, `x-default` → `/`.
- JSON-LD auf beiden Seiten gleich lassen wie im Original.
- Der DE/EN-Switch auf der Home ist jetzt ein Link (`<a>`) auf die jeweils andere Sprachversion, optisch identisch zu den bisherigen Buttons (gleiche Klassen, `active`-Zustand). Beim Klick die Wahl zusätzlich in `localStorage['sindigital-lang']` speichern, damit die Legal-Seiten sie weiterhin übernehmen. Keine automatische Weiterleitung anhand von localStorage oder Browsersprache (schlecht für Crawler).
- Anker-Links (`#contact`, `#faq` usw.) funktionieren auf beiden Versionen.
- Legal-Seiten (`agb.html`, `datenschutz.html`, `impressum.html`) behalten ihre bisherige clientseitige DE/EN-Umschaltung per localStorage, vorgerendert wird Deutsch. Der "Zurück"-Link führt zu `/en/`, wenn die gespeicherte Sprache Englisch ist, sonst zu `/`.
- Landingpages bleiben nur Deutsch.
- Weiterleitung `/?lang=en` → `/en/`: Es gibt keine Server-Weiterleitung, die Query-Parameter auswerten kann (Render kann das nicht, Cloudflare wird nicht genutzt). Lösung im Client: Ein kleines Inline-Script ganz oben im `<head>` von `/` prüft `?lang=en` und ruft sofort `location.replace('/en/')` auf, noch vor dem Rendern. Google folgt solchen JS-Weiterleitungen, zusätzlich zeigt der Canonical von `/en/` auf sich selbst.
- `?lang=de` auf `/` einfach ignorieren (Seite ist sowieso Deutsch), Parameter per `history.replaceState` entfernen.

### 2. Weiterleitungen gegen Duplikate

Google indexiert aktuell `/index.html` und `http://sin-digital.com/` als eigene Seiten.
- `/index.html`: Kann nicht per 301 umgeleitet werden, weil Render Regeln nicht anwendet, wenn eine Datei existiert. Der Canonical auf `/` reicht hier, er muss im vorgerenderten `dist/index.html` korrekt drin sein. Alle internen Links zeigen auf `/`, nie auf `/index.html`.
- `http://` → `https://` erzwingt Render automatisch. Domain ohne `www` → `www`: Im Render Dashboard müssen beide Custom Domains (`sin-digital.com` und `www.sin-digital.com`) eingetragen sein, dann leitet Render selbst weiter. Im README als Checkliste dokumentieren, inklusive der DNS-Einträge bei GoDaddy (A-Record für die Root-Domain auf die von Render angegebene IP, CNAME `www` auf die onrender.com-Adresse).

### 3. Neuer Kunde: Street Food Compassion

In der Sektion `#clients` (`.clients-grid`) nach Coiffeur Zürich und RH Haustechnik einen dritten Eintrag ergänzen, exakt im gleichen Markup-Muster:
- Link: `https://streetfood-compassion.ch/`, `target="_blank" rel="noopener"`, `title="Street Food Compassion"`
- Bild: `/assets/LogoStreetFoodCompassion.webp`, `alt="Street Food Compassion, Kunde von Sin Digital"`, `width="120" height="120" loading="lazy" decoding="async"`
- Klassen `client-logo-link logo-dark-bg`
- Die Logo-Datei (240×240, quadratisch, dunkelgrüner Hintergrund) kommt nach `public/assets/LogoStreetFoodCompassion.webp`, siehe "Ausgangslage im Repo". Sie wird wie die anderen Logos rund, graustufig und erst beim Hover farbig angezeigt.
- Prüfe, dass `.clients-grid` mit drei Logos auf 375px, 768px und 1440px sauber aussieht. Falls das Grid für drei Logos angepasst werden muss, zeig mir zuerst die Änderung.
- JSON-LD analog zum bestehenden Coiffeur-Zürich-Block ergänzen:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Street Food Compassion, Website",
    "url": "https://streetfood-compassion.ch/",
    "creator": {"@id": "https://www.sin-digital.com/#business"},
    "dateCreated": "2026",
    "description": "Website für Street Food Compassion, Organisator von Street-Food-Festivals und dem Badener Weihnachtszauber in Baden. Webdesign, Entwicklung und lokales SEO von Sin Digital.",
    "about": {"@type": "Organization", "name": "Street Food Compassion", "url": "https://streetfood-compassion.ch/"},
    "keywords": ["Webdesign", "Event Website", "Street Food Festival", "Baden"]
  }
  ```

### 4. Sitemap

- `https://www.sin-digital.com/?lang=en` in `sitemap.xml` durch `https://www.sin-digital.com/en/` ersetzen, auch in allen `xhtml:link`-Einträgen.
- `/en/` als eigenen `<url>`-Eintrag mit den gleichen hreflang-Alternates wie `/`.
- `lastmod` aller geänderten Seiten auf das Deploy-Datum setzen.

## Ziel-Architektur

- React 18 + Vite, JavaScript (kein TypeScript), Vanilla CSS. Kein Tailwind, kein CSS-in-JS, keine UI-Library.
- SEO ist kritisch. Eine reine Client-SPA ist nicht akzeptabel. Jede Route muss beim Build als fertiges statisches HTML mit vollständigen Meta-Tags, Inhalt und JSON-LD vorgerendert werden. Verwende `vite-react-ssg` (oder schlag mir eine gleichwertige Alternative mit Trade-offs vor, bevor du sie einbaust). Meta-Tags pro Route über den Head-Mechanismus des SSG-Tools bzw. `react-helmet-async`.
- Routen und erzeugte Dateien:
  - `/` → `dist/index.html` (DE)
  - `/en/` → `dist/en/index.html` (EN)
  - `/agb.html`, `/datenschutz.html`, `/impressum.html`
  - `/webdesign-zuerich.html`, `/website-zuerich.html`, `/guenstige-website-zuerich.html`, `/webentwicklung-zuerich.html`, `/seo-agentur-zuerich.html`
  - `/404.html`
  Alle bestehenden URLs mit `.html`-Endung bleiben exakt gleich.
- Hosting: Render Static Site. DNS liegt bei GoDaddy (Nameserver domaincontrol.com), Cloudflare wird nur für Turnstile genutzt und nicht als Proxy. Render liefert Dateien unter ihrem exakten Pfad aus, die `.html`-URLs bleiben also erhalten, und `/en/` wird über `dist/en/index.html` bedient.
  - Build Command `npm ci && npm run build`, Publish Directory `dist`.
  - Wichtig: Render wendet Redirect-Regeln NICHT an, wenn unter dem Pfad eine Datei existiert, und kann keine Query-Parameter matchen. Darum gibt es für `/index.html` und `?lang=en` keine Server-Weiterleitung, siehe "Gewollte Änderungen". Kein `_redirects`-File anlegen, das ignoriert Render.
  - Prüfe nach dem ersten Deploy, ob Render bei unbekannten Pfaden `404.html` mit Status 404 ausliefert. Falls nicht, melde es mir mit einem Lösungsvorschlag. Keine Catch-all-Rewrite-Regel auf `/index.html`, das würde für jede falsche URL Status 200 liefern (Soft 404).
  - Falls ein `render.yaml` angelegt wird, nur mit Build Command, Publish Directory und Env-Variablen. Redirects dokumentierst du im README.

Ordnerstruktur:
```
src/
  main.jsx
  routes.jsx
  pages/          Home (bekommt lang), Agb, Datenschutz, Impressum, Webdesign, Website, GuenstigeWebsite, Webentwicklung, SeoAgentur, NotFound
  components/     Nav, MobileMenu, LangSwitch, Hero, LocalSeo, Team, Clients, Projects, Faq, Reviews, ReviewsCarousel, Contact, ContactForm, Footer, Breadcrumb, ScrollTopButton, Seo (Head + JSON-LD), Turnstile
  hooks/          useReveal, useSmoothScroll, useLegalLang
  i18n/           de.js, en.js
  data/           clients.js (Kundenliste), schema/ (JSON-LD Objekte pro Seite)
  styles/         global.css (= styles.min.css bzw. styles.css 1:1), critical.css, legal.css, landing.css, notfound.css
public/
  assets/, manifest.json, robots.txt, sitemap.xml, sitemap-style.xsl
```

## Regeln für die Umsetzung

CSS:
- `styles.css` 1:1 übernehmen, keine Klasse umbenennen, keine Werte ändern, nicht in CSS Modules umbauen. Alle Klassennamen im JSX bleiben identisch (`className`).
- Inline-`<style>`-Blöcke der Seiten in eigene CSS-Dateien auslagern, aber nur in der jeweiligen Seite laden. Prüfe, ob sich die Styles der Legal-Seiten, Landingpages und 404 gegenseitig oder die Home beeinflussen (gleiche Selektoren wie `body`, `.wrap`, `nav`) und melde Konflikte. Falls nötig mit einer Wrapper-Klasse auf Seitenebene scopen, ohne das visuelle Ergebnis zu ändern. Im vorgerenderten HTML jeder Seite darf nur das CSS landen, das die Seite auch im Original hatte.
- Der kritische Head-Style der Home muss weiterhin inline im vorgerenderten HTML landen, auf `/` und `/en/`.

Markup:
- HTML-Struktur 1:1 nach JSX: gleiche Tags, gleiche IDs, gleiche Klassen, gleiche `aria-*`, `role`, `itemscope`/`itemprop`/`itemtype` Attribute, gleiche `alt`-Texte, gleiche Reihenfolge der Sektionen. Keine zusätzlichen Wrapper-Divs.
- Bilder aus `public/assets/` mit identischen Pfaden, `loading`, `width`/`height` und `preload`/`fetchpriority` wie im Original.
- Externe Links mit gleichen `target`/`rel`.
- Auf `/en/` müssen interne Links, Breadcrumb und Footer-Links korrekt funktionieren (Legal-Seiten und Landingpages bleiben unter ihren bisherigen URLs).

Interaktivität (alles als React, kein `document.querySelector` ausser wo technisch nötig, z.B. Messung im Karussell via `useRef`):
- `useReveal`: gleiche Observer-Optionen wie `script.js`, Klasse `visible` setzen, `reveal-delay-*` Klassen bleiben.
- FAQ: State im Component, nur eins offen, `active`-Klasse und `aria-expanded` wie vorher.
- Smooth Scroll: gleicher 70px Offset, `#` und `#!` ignorieren.
- Mobile Menu: gleiches Verhalten inkl. `inert`, `aria-hidden`, Body-Scroll-Lock, Escape, Schliessen beim Link-Klick. Cleanup beim Unmount.
- SSR-sicher: kein Zugriff auf `window`, `document` oder `localStorage` während des Prerenders, nur in `useEffect`. Keine Hydration Mismatches.
- Kontaktformular: kontrollierte Inputs, EmailJS über `@emailjs/browser` npm-Paket statt CDN, Turnstile als Component (Script nur auf der Home laden, Widget nach Mount rendern, Reset nach Erfolg). Keys in `.env` (`VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_TURNSTILE_SITEKEY` aus dem Original-Markup) plus `.env.example`. Validierung, Texte, Farben und Timings exakt wie im Original. Die Fehlermeldungen sind im Original nur Deutsch, auch auf `/en/` so lassen.
- Reviews-Karussell: gleiche Endlos-Logik mit Klonen (Klone per Render statt cloneNode, `data-clone` und `aria-hidden="true"` auf Klonen), gleiche Timings, Pause-Bedingungen, reduced-motion, Resize-Debounce. Timer und Listener sauber aufräumen.
- Scroll-to-Top-Button der Legal-Seiten ab 400px.

SEO:
- Pro Seite alle Meta-Tags aus dem Original übernehmen (title, description, keywords, robots, geo, OG, Twitter, canonical, hreflang, theme-color, Icons, manifest).
- Alle JSON-LD Blöcke 1:1 pro Seite als `<script type="application/ld+json">` im vorgerenderten HTML, plus der neue Street-Food-Compassion-Block.
- `robots.txt` und `manifest.json` unverändert in `public/`.

## Vorgehen

1. Branch prüfen, alte Seite nach `legacy/` verschieben und committen. Dann das Projekt mit `npm create vite@latest` (React, JS) im Hauptordner aufsetzen und Abhängigkeiten installieren. `.gitignore` muss `node_modules/`, `dist/` und `.env` enthalten.
2. Bevor du Code schreibst: kurze Liste aller Sektionen, Komponenten und Routen plus gefundene Unklarheiten (CSS-Konflikte, Unterschied `styles.css` vs `styles.min.css`). Warte auf mein OK.
3. Seite für Seite migrieren: zuerst Home auf Deutsch 1:1, dann `/en/`, dann Legal-Seiten, dann Landingpages, dann 404.
4. Danach die gewollten Änderungen 2 bis 4 (Weiterleitungen, Street Food Compassion, Sitemap).
5. Nach jedem Schritt gegen das Original prüfen.

## Abnahmekriterien

- `npm run build` erzeugt in `dist/` alle Routen als vorgerendertes HTML mit sichtbarem Text und allen Meta/JSON-LD Tags. `dist/en/index.html` enthält den englischen Text direkt im HTML (prüfbar mit "Seitenquelltext anzeigen" bzw. `curl`).
- Visueller Vergleich Original (`legacy/`, lokal mit einem einfachen Static Server ausgeliefert) vs. React auf 375px, 768px, 1440px für `/` (gegen Original DE) und `/en/` (gegen Original mit `?lang=en`): keine Unterschiede ausser dem neuen Kundenlogo. Am besten mit Playwright Screenshots beider Versionen und Pixel-Diff.
- Alle Interaktionen funktionieren identisch: Reveal, FAQ, Smooth Scroll, Mobile Menu, Sprachwechsel (Link zwischen `/` und `/en/`, localStorage für Legal-Seiten), Formular inkl. aller Fehlerfälle, Karussell inkl. Loop und Autoplay, Scroll-to-Top.
- `/?lang=en` landet sofort auf `/en/`. `dist/index.html` enthält den Canonical auf `https://www.sin-digital.com/`.
- Canonical und hreflang auf `/` und `/en/` stimmen und zeigen gegenseitig aufeinander.
- Keine Console Errors, keine React Warnings (Keys, Hydration Mismatch).
- Lighthouse Performance, SEO, Accessibility mindestens so gut wie das Original.
- Alle Texte zeichengenau identisch zum Original in DE und EN.

Am Ende: README mit `npm install`, `npm run dev`, `npm run build`, `npm run preview`, benötigten Env-Variablen, Deploy-Anleitung für Render (Static Site, Build Command, Publish Directory, Env-Variablen im Dashboard, beide Custom Domains) und den DNS-Einträgen bei GoDaddy. Plus ein Hinweis, dass nach dem Deploy in der Google Search Console die neue Sitemap eingereicht und `/en/` zur Indexierung beantragt werden soll.