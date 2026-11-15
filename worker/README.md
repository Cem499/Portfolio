# Kontakt-Worker

Kleiner Cloudflare Worker, über den das Kontaktformular seine Mails verschickt. Er prüft das
Turnstile-Ticket mit dem geheimen Schlüssel und sendet die Mail erst danach über EmailJS. Ohne ihn
prüft niemand das Ticket, und Bots können EmailJS direkt aus dem Browser aufrufen.

Solange `VITE_CONTACT_ENDPOINT` nicht gesetzt ist, sendet das Formular wie bisher direkt an EmailJS.
Der Worker kann also in Ruhe eingerichtet werden, ohne dass auf der Seite etwas ausfällt.

## Einrichten

Reihenfolge einhalten, sonst fällt das Formular zwischendurch aus.

1. Im Ordner `worker/`: `npx wrangler login`, dann `npx wrangler deploy`. Die Ausgabe nennt die Adresse
   des Workers, zum Beispiel `https://sin-digital-contact.<konto>.workers.dev`.
2. Geheime Schlüssel hinterlegen:
   - `npx wrangler secret put TURNSTILE_SECRET` (Cloudflare Dashboard, Turnstile, Secret Key des Widgets)
   - `npx wrangler secret put EMAILJS_PRIVATE_KEY` (EmailJS, Account, General, Private Key)
3. In EmailJS unter Account, Security die Nutzung der API für Anwendungen ausserhalb des Browsers erlauben.
   Ohne diese Einstellung lehnt EmailJS Aufrufe vom Worker ab.
4. In Render bei der Seite die Umgebungsvariable `VITE_CONTACT_ENDPOINT` auf die Adresse aus Schritt 1
   setzen und neu deployen. Lokal dieselbe Zeile in `.env`.
5. Formular auf der Live-Seite einmal absenden und prüfen, dass die Mail ankommt.
6. Erst jetzt in EmailJS unter Account, Security den Private Key als Pflicht einschalten. Ab dann nimmt
   EmailJS keine Aufrufe mehr an, die direkt aus dem Browser kommen.

Für Tests von einer Render-Vorschau oder von `localhost` die Adresse in `wrangler.toml` bei
`ALLOWED_ORIGINS` ergänzen und neu deployen.

## Schnittstelle

`POST` mit JSON `{ name, email, subject, message, configuration, token }`. Antwort `{ "ok": true }` oder
`{ "ok": false, "error": "fields" | "origin" | "turnstile" | "mail" }`.

Tests: `npm run test:unit` im Hauptordner (`tools/unit/contact-worker.test.mjs`).
