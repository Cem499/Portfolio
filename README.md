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

## Env-Variablen

Alle vier sind öffentliche Client-Keys (sie standen vorher im HTML) und werden beim Build ins Bundle geschrieben.

| Variable | Wert | Zweck |
| --- | --- | --- |
| `VITE_EMAILJS_PUBLIC_KEY` | `_U_phGxH8KcaJXxfq` | EmailJS Public Key |
| `VITE_EMAILJS_SERVICE_ID` | `service_qlylu4x` | EmailJS Service |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_5mci63d` | EmailJS Template |
| `VITE_TURNSTILE_SITEKEY` | `0x4AAAAAACkZoLXteSgJ1jzs` | Cloudflare Turnstile Sitekey |

## Routen

| URL | Datei in `dist/` | Seite |
| --- | --- | --- |
| `/` | `index.html` | Startseite Deutsch |
| `/en/` | `en/index.html` | Startseite Englisch |
| `/agb.html`, `/datenschutz.html`, `/impressum.html` | gleichnamig | Legal-Seiten, vorgerendert Deutsch, DE/EN per localStorage |
| `/webdesign-zuerich.html`, `/website-zuerich.html`, `/guenstige-website-zuerich.html`, `/webentwicklung-zuerich.html`, `/seo-agentur-zuerich.html` | gleichnamig | SEO-Landingpages, nur Deutsch, ohne JS |
| `/404.html` | `404.html` | Fehlerseite, ohne JS |

- `/?lang=en` wird von einem Inline-Script ganz oben im `<head>` von `/` per `location.replace('/en/')` weitergeleitet, `?lang=de` wird entfernt.
- Der DE/EN-Switch der Startseite verlinkt `/` und `/en/` und merkt sich die Wahl in `localStorage['sindigital-lang']` für die Legal-Seiten.
- React wird erst nach `load` und dem ersten Paint geladen (Performance). Eingaben ins Kontaktformular
  vor diesem Zeitpunkt bleiben erhalten; ein früher Klick auf „Senden“ zeigt kurz „Einen Moment bitte …“,
  lädt React sofort und sendet danach automatisch (bei gültigen Feldern nach dem Turnstile-Token, max. 8 s).

## Projektstruktur

```
src/
  main.jsx, routes.jsx   Einstieg und Routen (lazy pro Seite, damit jede Seite nur ihr CSS lädt)
  pages/                 Home (bekommt lang), Agb, Datenschutz, Impressum, Landingpages, NotFound
  components/            Nav, MobileMenu, LangSwitch, Hero, LocalSeo, Team, Clients, Projects, Faq,
                         Reviews, ReviewsCarousel, Contact, ContactForm, Turnstile, Footer, Breadcrumb,
                         LegalNav, LegalGrid, ScrollTopButton, Seo
  hooks/                 useReveal, useSmoothScroll, useLegalLang
  i18n/                  de.js, en.js (Texte der Startseite)
  data/                  clients.js (Kundenlogos), schema/ (JSON-LD pro Seite)
  styles/                global.css (= Portfolio/styles.min.css, unverändert), critical.css (Inline-Style
                         der Startseite), agb/datenschutz/impressum.css, landing*.css, notfound.css,
                         lang-switch.css
public/                  assets/, manifest.json, robots.txt, sitemap.xml, sitemap-style.xsl
vite.config.js           Build-Nachbearbeitung pro Seite (siehe Kommentare in postProcess)
```

Neuen Kunden hinzufügen: Logo nach `public/assets/`, Eintrag in `src/data/clients.js`, optional
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
