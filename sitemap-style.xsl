<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="de">
      <head>
        <title>XML Sitemap — Sin Digital</title>
        <link rel="icon" type="image/png" href="/assets/ICON-Logo_Sin-Digital.png" />
        <meta name="robots" content="noindex, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #050505;
            color: #ffffff;
            min-height: 100vh;
            padding: 3rem 1.5rem;
          }

          .container {
            max-width: 960px;
            margin: 0 auto;
          }

          .header {
            margin-bottom: 3rem;
          }

          .header h1 {
            font-size: 2.5rem;
            font-weight: 900;
            letter-spacing: -0.03em;
            margin-bottom: 0.5rem;
          }

          .header h1 span {
            color: #C1FF72;
          }

          .header p {
            color: #9ca3af;
            font-size: 0.95rem;
            line-height: 1.7;
            max-width: 540px;
          }

          .stats {
            display: flex;
            gap: 2rem;
            margin: 2rem 0 3rem;
            flex-wrap: wrap;
          }

          .stat-card {
            background: rgba(193, 255, 114, 0.03);
            border: 1px solid rgba(193, 255, 114, 0.15);
            border-radius: 6px;
            padding: 1.25rem 1.75rem;
            min-width: 160px;
          }

          .stat-card .stat-label {
            font-size: 0.65rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: rgba(193, 255, 114, 0.5);
            margin-bottom: 0.4rem;
            font-weight: 600;
          }

          .stat-card .stat-value {
            font-size: 1.75rem;
            font-weight: 900;
            color: #C1FF72;
            letter-spacing: -0.02em;
          }

          .stat-card .stat-sub {
            font-size: 0.78rem;
            color: #6b7280;
            margin-top: 0.25rem;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-radius: 6px;
            overflow: hidden;
          }

          thead th {
            background: rgba(193, 255, 114, 0.06);
            color: #C1FF72;
            font-size: 0.7rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            font-weight: 700;
            padding: 1rem 1.25rem;
            text-align: left;
            border-bottom: 1px solid rgba(193, 255, 114, 0.15);
          }

          tbody tr {
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            transition: background 0.2s;
          }

          tbody tr:last-child {
            border-bottom: none;
          }

          tbody tr:hover {
            background: rgba(193, 255, 114, 0.025);
          }

          td {
            padding: 1rem 1.25rem;
            font-size: 0.88rem;
          }

          td.url a {
            color: #ffffff;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.2s;
          }

          td.url a:hover {
            color: #C1FF72;
          }

          td.url .path {
            display: block;
            color: #6b7280;
            font-size: 0.75rem;
            margin-top: 0.2rem;
            font-weight: 400;
          }

          .badge {
            display: inline-block;
            font-size: 0.68rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 0.2rem 0.6rem;
            border-radius: 3px;
            font-weight: 700;
          }

          .badge-high {
            background: rgba(193, 255, 114, 0.15);
            color: #C1FF72;
          }

          .badge-medium {
            background: rgba(193, 255, 114, 0.08);
            color: rgba(193, 255, 114, 0.6);
          }

          .badge-low {
            background: rgba(255, 255, 255, 0.05);
            color: #6b7280;
          }

          .freq {
            color: #9ca3af;
            font-size: 0.82rem;
          }

          .date {
            color: #9ca3af;
            font-size: 0.82rem;
            font-variant-numeric: tabular-nums;
          }

          .footer {
            margin-top: 3rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.07);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .footer p {
            color: #6b7280;
            font-size: 0.78rem;
          }

          .footer a {
            color: #C1FF72;
            text-decoration: none;
            font-size: 0.78rem;
            font-weight: 600;
          }

          @media (max-width: 640px) {
            body { padding: 2rem 1rem; }
            .header h1 { font-size: 1.75rem; }
            .stats { gap: 1rem; }
            .stat-card { min-width: 130px; padding: 1rem 1.25rem; flex: 1; }
            .stat-card .stat-value { font-size: 1.35rem; }
            table { font-size: 0.82rem; }
            td, thead th { padding: 0.75rem 0.75rem; }

            /* Hide less important columns on mobile */
            .col-freq, .col-lang { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">

          <div class="header">
            <h1>XML <span>Sitemap</span></h1>
            <p>Diese Sitemap enthält alle indexierbaren Seiten von sin-digital.com und hilft Suchmaschinen, die Website effizient zu crawlen.</p>
          </div>

          <div class="stats">
            <div class="stat-card">
              <div class="stat-label">URLs Total</div>
              <div class="stat-value">
                <xsl:value-of select="count(sitemap:urlset/sitemap:url)" />
              </div>
              <div class="stat-sub">Indexierbare Seiten</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Letzte Aktualisierung</div>
              <div class="stat-value" style="font-size: 1.15rem;">
                <xsl:value-of select="sitemap:urlset/sitemap:url[1]/sitemap:lastmod" />
              </div>
              <div class="stat-sub">Hauptseite</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Status</div>
              <div class="stat-value" style="font-size: 1.15rem;">✓ Valid</div>
              <div class="stat-sub">Sitemaps-Protokoll 0.9</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>URL</th>
                <th class="col-lang">Sprachen</th>
                <th class="col-freq">Aktualisierung</th>
                <th>Priorität</th>
                <th>Zuletzt geändert</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:variable name="pos" select="position()" />
                <tr>
                  <td style="color: #6b7280; font-size: 0.78rem; font-weight: 600;">
                    <xsl:value-of select="$pos" />
                  </td>
                  <td class="url">
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc" />
                    </a>
                    <xsl:if test="count(xhtml:link) &gt; 0">
                      <span class="path">
                        <xsl:value-of select="count(xhtml:link)" /> Hreflang-Varianten
                      </span>
                    </xsl:if>
                  </td>
                  <td class="col-lang">
                    <xsl:for-each select="xhtml:link">
                      <span class="badge badge-medium" style="margin-right: 0.3rem;">
                        <xsl:value-of select="@hreflang" />
                      </span>
                    </xsl:for-each>
                    <xsl:if test="count(xhtml:link) = 0">
                      <span style="color: #6b7280;">—</span>
                    </xsl:if>
                  </td>
                  <td class="freq col-freq">
                    <xsl:value-of select="sitemap:changefreq" />
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="sitemap:priority &gt;= 0.8">
                        <span class="badge badge-high">
                          <xsl:value-of select="sitemap:priority" />
                        </span>
                      </xsl:when>
                      <xsl:when test="sitemap:priority &gt;= 0.5">
                        <span class="badge badge-medium">
                          <xsl:value-of select="sitemap:priority" />
                        </span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="badge badge-low">
                          <xsl:value-of select="sitemap:priority" />
                        </span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td class="date">
                    <xsl:value-of select="sitemap:lastmod" />
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>

          <div class="footer">
            <p>Generated by Sin Digital — Digitalagentur Zürich</p>
            <a href="https://www.sin-digital.com/">← Zurück zur Website</a>
          </div>

        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
