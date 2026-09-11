# The Thermal Underground

A geothermal primer. Vite + React + Tailwind, deployed to GitHub Pages.

## Run locally

```
npm install
npm run dev
```

## Where the content lives

All primer copy is in the `SECTIONS` array near the top of `src/App.jsx`.
Each entry is one "stratum" of the descent. Reorder, reword, add, or remove
freely. Optional `aside` adds a callout box.

The palette and animations are in `tailwind.config.js`.

## Deploying to GitHub Pages

1. Create a repo and push this code to the `main` branch.
2. In the repo: **Settings -> Pages -> Source: "GitHub Actions"**.
3. The workflow in `.github/workflows/deploy.yml` builds and deploys on every
   push to `main`.

### Important: the `base` path

`vite.config.js` sets `base: '/'` for the custom domain `thermalunderground.org`.
If you deploy only to `https://<username>.github.io/<repo>/` without a custom
domain, change it to `base: '/<repo>/'` so asset URLs match that path prefix.
