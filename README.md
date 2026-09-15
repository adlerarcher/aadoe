# Presidential Innovation Initiatives at DOE

Hub for White House Presidential Innovation Initiatives at the Department of Energy: the permitting database (SEPI), the coordination dashboard (GPCP), and research and translation (field guide, hackathons). Nested apps live on the same origin.

Live: [aadoe.thermalunderground.org](https://aadoe.thermalunderground.org)

## Entries

Each card opens that product's landing page. Role pickers live on the product sites, not on this hub.

| Hub card | CTA | Lands on |
|---|---|---|
| **SEPI** | Enter | `/sepi/` |
| **GPCP** | Enter | `/gpcp/` |
| **Research and translation** | Field guide · Hackathons | `/guide/` · `/gpic/` |

Related ventures (secondary strip): **MDEV** `/mdev/`.

## Layout

```
public/sepi/     static SEPI site
public/gpcp/     static GPCP site (dashboard at /gpcp/gpcp/)
public/gpic/     static hackathons site
public/odev/     static ODEV site (paths rooted at /odev/)
apps/guide/      Vite SPA → dist/guide (base /guide/)
apps/mdev/       Vite SPA → dist/mdev (base /mdev/)
```

`npm run build` builds the hub, builds nested SPAs, and fails if any required nested folder is missing from `dist/`.

## Run locally

```
npm install
npm run build
npm run preview
```

Or hub only during UI work:

```
npm run dev
```

Hub: `http://localhost:5176`. After a full build, preview serves nested paths too.

## Deploy

Pushes to `main` build and deploy via GitHub Actions Pages. Nested apps are verified before upload.

### DNS

At the `thermalunderground.org` registrar:

```
CNAME  aadoe  →  adlerarcher.github.io
```

GitHub Pages custom domain: `aadoe.thermalunderground.org` with Enforce HTTPS. `public/CNAME` already holds that host.
