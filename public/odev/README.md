# ODEV

Office of Geothermal Organizational Development. Companion to [The Thermal Underground](https://thermalunderground.org).

This site is Organizational Development. SWG is IT Strategy Management.

Live: [odev.thermalunderground.org](https://odev.thermalunderground.org)

Source outline: `source/OG-Strategy-Management-2026.pptx` (filename is historical; the site is Organizational Development).

## Serve this site

Requires Node 20 or later.

```
npm run dev
```

Opens at `http://localhost:5176`.

## Pages

- `/` Home
- `/programs/rd/` Research & Development
- `/programs/pd/` Pilot & Demonstration
- `/programs/csup/` Commercial Scale-Up structure
- `/programs/support/` Program Support (HR, Ops, Finance, Communications)
- `/cycle/` Six-stage strategy cycle (infographic)
- `/model/` Operating model (infographic)
- `/groups/` Strategy Working Groups and Strategic Initiatives. SWG is IT Strategy Management, not the site name.

## Deploy

Pushes to `main` deploy via GitHub Actions Pages.

### DNS

At the `thermalunderground.org` registrar, add:

```
odev    CNAME    adlerarcher.github.io
```

In this repo, GitHub Pages should use the custom domain `odev.thermalunderground.org` with Enforce HTTPS. The `CNAME` file in the root is that domain.
