# MDEV

International market development companion to [The Thermal Underground](https://thermalunderground.org).

Live: [mdev.thermalunderground.org](https://mdev.thermalunderground.org)

Landing chooser programs:

- **Geothermal** (live) — International Geothermal Markets reference
- Nuclear · Oil & gas · Critical minerals — coming soon

## Run locally

```
npm install
npm run dev
```

## Content

Geothermal market records live in `src/content/geothermal.js` (markets, developments, documents, U.S. engagement, domestic policy).

## Deploy

Pushes to `main` build and deploy via GitHub Actions Pages.

### DNS

```
CNAME  mdev  →  adlerarcher.github.io
```
