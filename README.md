# AADOE

Animated map of [The Thermal Underground](https://thermalunderground.org) properties: each host on `thermalunderground.org`, and what it does.

Live: [aadoe.thermalunderground.org](https://aadoe.thermalunderground.org)

Drag to pan, scroll to zoom, click a node.

## Properties

| Host | What it does |
|---|---|
| [thermalunderground.org](https://thermalunderground.org/) | Geothermal field guide |
| [sepi.thermalunderground.org](https://sepi.thermalunderground.org/) | Subsurface Energy Permitting Index |
| [gpcp.thermalunderground.org](https://gpcp.thermalunderground.org/) | Geothermal Permitting Coordination Platform |
| [gpic.thermalunderground.org](https://gpic.thermalunderground.org/) | Geothermal Permitting Innovation Collaborative |
| [mdev.thermalunderground.org](https://mdev.thermalunderground.org/) | International market development |
| [odev.thermalunderground.org](https://odev.thermalunderground.org/) | Organization development |
| [aadoe.thermalunderground.org](https://aadoe.thermalunderground.org/) | This directory |

Records live in `src/properties.js`.

## Run locally

```
npm install
npm run dev
```

Opens at `http://localhost:5176`.

## Deploy

Pushes to `main` build and deploy via GitHub Actions Pages.

### DNS

At the `thermalunderground.org` registrar, add:

```
CNAME  aadoe  →  adlerarcher.github.io
```

In this repo, GitHub Pages should use the custom domain `aadoe.thermalunderground.org` with Enforce HTTPS.
