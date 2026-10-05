# Sin Digital – Website (React + Vite)

Portfolio von [Sin Digital](https://www.sin-digital.com), migriert von statischem HTML auf React 18 + Vite.
Jede Seite wird beim Build mit [`vite-react-ssg`](https://github.com/Daydreamer-riri/vite-react-ssg) als
fertiges statisches HTML vorgerendert (Inhalt, Meta-Tags, JSON-LD). Die Startseite und die Legal-Seiten
werden danach im Browser hydriert, die SEO-Landingpages und die 404-Seite kommen ganz ohne JavaScript aus.

Das ursprüngliche statische HTML liegt zum Vergleich unverändert unter `Portfolio/` und wird nicht ausgeliefert.

## Entwicklung

Voraussetzung: Node.js 20.19+ (empfohlen 24, siehe `.node-version`).

```bash
npm install          # Abhängigkeiten installieren
cp .env.example .env # Env-Variablen anlegen (siehe unten)
npm run dev          # Dev-Server mit SSR, http://localhost:5173
npm run build        # statischer Build nach dist/
npm run preview      # dist/ lokal ausliefern
```

Hinweis zum Dev-Server: Der `?lang=en`-Redirect, das Inline-Laden des kritischen CSS und das verzögerte
Laden des JavaScripts passieren erst im Build (`vite.config.js`, `postProcess`). Für die Abnahme immer
`npm run build && npm run preview` verwenden.

## Tests

Einmalig `npm run test:setup` ausführen (lädt Chromium für Playwright, rund 150 MB; läuft nicht beim
Build, `npm ci` auf Render lädt keinen Browser). Alle Tests laufen gegen `dist/`, also zuerst `npm run build`.

| Script | Was passiert |
| --- | --- |
| `npm run serve` | `dist/` wie auf Render ausliefern: http://localhost:4173 (exakte Pfade, 404 mit Status 404, gzip) |
| `npm run test:e2e` | Playwright: FAQ, Menü, Karussell, Formular (auch vor der Hydration), Sprache, Legal-Seiten, 404, Konsole; inklusive Tastatur und `prefers-reduced-motion` |
| `npm run test:lighthouse` | Lighthouse mobil, Median aus 3 Läufen je Seite, Vergleich mit `tools/baseline.json`. Exit 1, wenn eine bestehende Seite in einer Kategorie einen Punkt verliert oder eine neue Seite unter Performance 95 liegt |
| `npm run test:lighthouse -- --update-baseline` | Basis neu schreiben, nur bewusst nach einem Review |
| `npm run test:visual -- --label baseline` | Screenshots aller Seiten bei 375, 768 und 1440 px nach `tools/screenshots/baseline/` |
| `npm run test:visual -- --compare baseline` | Neue Screenshots nach `tools/screenshots/current/`, Pixel-Diff gegen `baseline`, Diff-Bilder in `tools/screenshots/diff-current-vs-baseline/` |
| `npm test` | E2E und Lighthouse nacheinander |

Alle Scripts kennen `--only <Text>` (Seiten-ID oder Pfad, bei E2E der Testname). Lighthouse-Werte hängen
von der Maschine ab, die Basis taugt nur für Vergleiche auf demselben Rechner. Die Seitenliste der Tests
steht in `src/data/pages.js`. Screenshots und Lighthouse-Reports (`tools/screenshots/`, `tools/reports/`)
sind nicht im Repo.

## Env-Variablen

Alle vier sind öffentliche Client-Keys (sie standen vorher im HTML) und werden beim Build ins Bundle geschrieben.

| Variable | Wert | Zweck |
| --- | --- | --- |
| `VITE_EMAILJS_PUBLIC_KEY` | `_U_phGxH8KcaJXxfq` | EmailJS Public Key |
| `VITE_EMAILJS_SERVICE_ID` | `service_qlylu4x` | EmailJS Service |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_5mci63d` | EmailJS Template |
| `VITE_TURNSTILE_SITEKEY` | `0x4AAAAAACkZoLXteSgJ1jzs` | Cloudflare Turnstile Sitekey |
| `VITE_PSI_API_KEY` | eigener Key | Google PageSpeed Insights API für den Website-Check; in der Google Cloud Console auf den HTTP-Referrer `https://www.sin-digital.com/*` einschränken |

## Routen

| URL | Datei in `dist/` | Seite |
| --- | --- | --- |
| `/` | `index.html` | Startseite Deutsch |
| `/en/` | `en/index.html` | Startseite Englisch |
| `/konfigurator/` | `konfigurator/index.html` | Projekt-Konfigurator Deutsch (React, hydriert nach dem ersten Paint) |
| `/en/configurator/` | `en/configurator/index.html` | Projekt-Konfigurator Englisch |
| `/projekte/`, `/projekte/<slug>/` | `projekte/index.html`, `projekte/<slug>/index.html` | Case Studies Deutsch, ohne React (nur Inline-Script für den Slider) |
| `/en/projects/`, `/en/projects/<slug>/` | `en/projects/…` | Case Studies Englisch |
| `/agb.html`, `/datenschutz.html`, `/impressum.html` | gleichnamig | Legal-Seiten, vorgerendert Deutsch, DE/EN per localStorage |
| `/webdesign-zuerich.html`, `/website-zuerich.html`, `/guenstige-website-zuerich.html`, `/webentwicklung-zuerich.html`, `/seo-agentur-zuerich.html` | gleichnamig | SEO-Landingpages, nur Deutsch, ohne JS |
| `/404.html` | `404.html` | Fehlerseite, ohne JS |

- `/?lang=en` wird von einem Inline-Script ganz oben im `<head>` von `/` per `location.replace('/en/')` weitergeleitet, `?lang=de` wird entfernt.
- Der DE/EN-Switch der Startseite verlinkt `/` und `/en/` und merkt sich die Wahl in `localStorage['sindigital-lang']` für die Legal-Seiten.
- React wird erst nach `load` und dem ersten Paint geladen (Performance). Eingaben ins Kontaktformular
  vor diesem Zeitpunkt bleiben erhalten; ein früher Klick auf „Senden“ zeigt kurz „Einen Moment bitte …“,
  lädt React sofort und sendet danach automatisch (bei gültigen Feldern nach dem Turnstile-Token, max. 8 s).

## Projekt-Konfigurator

`/konfigurator/` führt in vier Schritten (Seitentyp, Umfang, Funktionen, Wunschtermin) zu einer
Preisspanne in CHF mit Zeitrahmen und übergibt die Auswahl im fünften Schritt an das Kontaktformular.
Die Zusammenfassung geht als EmailJS-Feld `configuration` mit (Template `template_5mci63d` enthält
`{{configuration}}`; bei normalen Kontaktanfragen bleibt das Feld leer).

- **Preise anpassen:** `src/data/pricing.js`. Je Seitentyp Spanne, enthaltene Seiten und Wochen;
  Staffeln für zusätzliche Seiten; Funktionen mit Aufpreis und Zusatzwochen; Express-Zuschlag.
  `estimate()` rechnet daraus, `tiersFor()` bestimmt, welche Staffeln ein Seitentyp anbietet.
  Der Typ `custom` und die Staffel `over20` haben keine Spanne („ab … CHF, Preis nach Gespräch“).
- **Texte:** `konfigurator` in `src/i18n/de.js` und `en.js` (Namen und Beschreibungen sind nach den
  IDs aus `pricing.js` verschlüsselt). Das JSON-LD (`OfferCatalog`) entsteht aus beiden Quellen.
- **Vor der Hydration:** Schritt 1 ist vorgerendert, die Richtpreis-Karte zeigt den Standard
  (`DEFAULTS`). Eine Auswahl vor dem Laden von React bleibt erhalten, ein früher Klick auf „Weiter“
  wird nach der Hydration nachgeholt (gleicher Mechanismus wie beim Kontaktformular).

## Case Studies

`/projekte/` listet die Projekte, `/projekte/<slug>/` zeigt je eine Case Study (Ausgangslage, Lösung,
Ergebnis, Messwerte der Live-Seite, Vorher/Nachher-Slider, Tech-Chips). Beide kommen ohne React aus;
nur der Slider hat ein kleines Inline-Script. Die Kundenlogos der Startseite verlinken auf die Case Studies.

- **Daten:** `src/data/projects.js` (Slug, URL, Jahr, Logo, Tech, Fakten, Bildnamen, optional `beforeUrl`
  für den Vorher-Screenshot und `credit`). Reihenfolge = Anzeige-Reihenfolge. Keine Projektpreise.
- **Texte:** `projekte.items[slug]` in `src/i18n/de.js` und `en.js` (Name, Kunde, Tagline, Zusammenfassung,
  Ausgangslage, Lösung, Ergebnis). Qualitativ, ohne erfundene Zahlen.
- **Messwerte und Bilder:** `npm run measure:projects` misst jede Live-Seite mit Lighthouse (mobil, Median
  aus 3), schreibt `src/data/measured.js` und legt Screenshots (1440 × 900 und 720 × 450, WebP) unter
  `public/assets/projects/` ab, bei `beforeUrl` auch das Vorher-Bild. Danach `npm run build`.
  Das Datum der Messung erscheint auf der Seite. Vor einem Deploy gelegentlich neu messen.
- **Neues Projekt:** Eintrag in `projects.js`, Texte in beiden Sprachen, `npm run measure:projects`,
  optional Logo auf der Startseite (`clients.js` mit `project: '<slug>'`). Routen, Sitemap und Tests
  folgen automatisch aus `projects.js`.

## Website-Check

`/website-check/` fragt Google PageSpeed Insights (mobil) direkt aus dem Browser ab und zeigt die
vier Scores als Ringe plus drei Tipps. Nichts wird gespeichert.

- **Key:** `VITE_PSI_API_KEY` (Google Cloud Console, API „PageSpeed Insights“, auf den Referrer
  `https://www.sin-digital.com/*` eingeschränkt). Ohne Key läuft die API mit einem sehr kleinen,
  geteilten Kontingent, reicht für lokale Tests.
- **Logik:** `src/data/pagespeed.js`. `normalizeUrl` ergänzt `https://`, `fetchPageSpeed` bricht nach
  60 s ab, `pickTips` wählt nach einer Prioritätsliste die drei wirksamsten Befunde; die Tipptexte
  stehen in `websiteCheck.tips` der i18n-Dateien (Schlüssel = Lighthouse-Audit-ID).
- **Fehlerfälle:** ungültige Adresse (ohne API-Aufruf), Seite nicht erreichbar (400 mit
  `Lighthouse returned error`), Rate-Limit (429), Timeout, sonstiges.
- **Proxy statt Key im Browser:** Wenn das Kontingent missbraucht wird, einen Cloudflare Worker
  vorschalten und in `fetchPageSpeed` nur `ENDPOINT` auf die Worker-URL umstellen.

## Projektstruktur

```
src/
  main.jsx, routes.jsx   Einstieg und Routen (lazy pro Seite, damit jede Seite nur ihr CSS lädt)
  pages/                 Home, Konfigurator, Projekte, Projekt (bekommen lang bzw. slug), Agb,
                         Datenschutz, Impressum, Landingpages, NotFound
  components/            SiteHeader (Skip-Link, Nav, MobileMenu, Menü-Zustand), SiteFooter, PageSeo
                         (Head der Unterseiten), PageBreadcrumb, Nav, MobileMenu, LangSwitch, Hero,
                         LocalSeo, Team, Clients, Projects, Faq, Reviews, ReviewsCarousel, Contact,
                         ContactForm, Turnstile, Footer, Breadcrumb, LegalNav, LegalGrid,
                         ScrollTopButton, Seo, Configurator, AnimatedNumber (rollende Ziffern),
                         ScoreRing (Lighthouse-Ring), BeforeAfterSlider (mit Inline-Script)
  hooks/                 useReveal, useSmoothScroll, useLegalLang, usePendingSubmit (Formular vor der
                         Hydration abgeschickt: Werte übernehmen, nach der Hydration senden)
  i18n/                  de.js, en.js: benannte Exporte je Seite (`shared` für Nav, Footer, Hinweise,
                         Kontaktformular; `home`, `konfigurator`, `projekte`), damit jede Seite nur
                         ihre Texte bündelt
  data/                  pages.js (alle Seiten: URLs, lastmod, Sitemap-Angaben, ohne JS?),
                         navigation.js (Hauptnavigation), pricing.js (Preisliste des Konfigurators),
                         projects.js (Case Studies), measured.js (generierte Messwerte), clients.js
                         (Kundenlogos), schema/ (JSON-LD, statisch oder als Funktion je Sprache)
  styles/                global.css (= Portfolio/styles.min.css; einzige Änderung: Kundenlogos immer
                         farbig, Hover nur noch Vergrössern), critical.css (Inline-Style
                         der Startseite), site.css (Unterseiten), konfigurator.css, projekte.css,
                         agb/datenschutz/impressum.css, landing*.css, notfound.css, lang-switch.css
public/                  assets/ (Logos, Portrait, projects/ mit den Case-Study-Screenshots),
                         manifest.json, robots.txt, sitemap-style.xsl
tools/                   Test-Tooling (siehe „Tests“) und measure-projects.mjs (siehe „Case Studies“)
vite.config.js           Build-Nachbearbeitung pro Seite (siehe Kommentare in postProcess) und
                         Sitemap-Generator
```

Pflege:

- Neue Seite: Eintrag in `src/data/pages.js` (URLs DE/EN, `lastmod`, `changefreq`, `priority`,
  `js: false` wenn sie ohne React auskommt). Daraus entstehen beim Build `dist/sitemap.xml` und die
  Liste der Seiten ohne JavaScript; die Tests laufen automatisch über alle Einträge.
- Inhalt einer Seite geändert: `lastmod` in `pages.js` auf das Deploy-Datum setzen.
- Navigation: `src/data/navigation.js` (Anker auf der Startseite oder eigene Seite je Sprache),
  Beschriftungen in `shared.nav` der i18n-Dateien.
- Neuer Kunde: Logo nach `public/assets/`, Eintrag in `src/data/clients.js`, optional
  JSON-LD-Block in `src/data/schema/home.js`.

## Deploy auf Render (Static Site)

1. Render Dashboard → **New → Static Site** → dieses Repository verbinden.
2. **Build Command:** `npm ci && npm run build`
3. **Publish Directory:** `dist`
4. **Environment:** die vier `VITE_*`-Variablen aus der Tabelle oben eintragen
   (bei Bedarf zusätzlich `NODE_VERSION=24`, sonst gilt `.node-version`).
5. **Redirects/Rewrites:** keine anlegen. Insbesondere **keine** Catch-all-Regel auf `/index.html`
   (das würde für jede falsche URL Status 200 liefern = Soft 404). Ein `_redirects`-File ignoriert Render.
   - `/index.html` kann nicht umgeleitet werden (Render wendet Regeln nicht an, wenn die Datei existiert).
     Der Canonical in `dist/index.html` zeigt auf `https://www.sin-digital.com/`, alle internen Links zeigen auf `/`.
   - `?lang=en` kann Render nicht matchen; das erledigt das Inline-Script auf `/` (siehe oben).
   - `http://` → `https://` erzwingt Render automatisch.

### Custom Domains (Render → Settings → Custom Domains)

- [ ] `www.sin-digital.com` eintragen (Haupt-Domain)
- [ ] `sin-digital.com` eintragen – Render leitet die Domain ohne `www` dann selbst auf `www` weiter
- [ ] Beide Domains zeigen in Render „Verified“ und ein gültiges Zertifikat

### DNS bei GoDaddy (Nameserver `domaincontrol.com`)

| Typ | Name | Wert |
| --- | --- | --- |
| `A` | `@` | die IP, die Render bei der Custom Domain `sin-digital.com` anzeigt |
| `CNAME` | `www` | die `onrender.com`-Adresse der Static Site (z. B. `sin-digital.onrender.com`) |

Alte `A`-/`CNAME`-Einträge für `@` und `www`, die auf das bisherige Hosting zeigen, entfernen.
Cloudflare wird nur für Turnstile genutzt und nicht als Proxy.

### Nach dem ersten Deploy prüfen

- [ ] `curl -sI https://www.sin-digital.com/gibt-es-nicht` → Status **404** und Inhalt von `404.html`.
      Falls Render hier 200 oder eine eigene Fehlerseite liefert: melden, nicht mit einer Rewrite-Regel lösen.
- [ ] `curl -sI http://sin-digital.com/` → Weiterleitung auf `https://www.sin-digital.com/`
- [ ] `curl -s https://www.sin-digital.com/en/ | grep "<title>"` → englischer Titel direkt im HTML
- [ ] `https://www.sin-digital.com/?lang=en` landet auf `/en/`
- [ ] Kontaktformular einmal echt absenden (EmailJS + Turnstile mit der Produktiv-Domain)

### Google Search Console

Nach dem Deploy:

1. Unter **Sitemaps** `https://www.sin-digital.com/sitemap.xml` erneut einreichen (enthält jetzt `/en/` statt `/?lang=en`).
2. Mit der **URL-Prüfung** `https://www.sin-digital.com/en/` prüfen und **Indexierung beantragen**.
3. Optional dasselbe für `https://www.sin-digital.com/`.
