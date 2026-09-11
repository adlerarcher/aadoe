# SEPI

The Subsurface Energy Permitting Index. A DOE index that connects to other agencies. Those connections are coordinated once. Coordinating platforms, leasing platforms, and other DOE platforms then read from here, so partners work from authoritative agency streams.

Platforms read this index from [`connectors.json`](https://sepi.thermalunderground.org/connectors.json).

This repository is the captured static site. Intended host: [sepi.thermalunderground.org](https://sepi.thermalunderground.org)

---

## Tiers

| Tier | Meaning |
|---|---|
| SEPI | Authoritative record of what an agency has authorized |
| Nexus | Knowledge, science, or screening |
| Both | Used as an authorization record and as screening |
| Access | Identity, keys, and agreements required to read the rest |

## Lights

| Light | Meaning |
|---|---|
| Connected | Verified working by direct request |
| Interrupted | The endpoint moved or failed when requested |
| No public surface | No public connection |
| Not probed | Not yet requested. The light is not a guess |

The inventory is the source of truth. Rebuild `connectors.json` from `scripts/build-connectors.py`. GPCP picks up the published file on the next load.

---

## Serve this site

Requires Node 20 or later.

```
npm run dev
```

Opens the cover at `http://localhost:5174`. **User** and **Administrator** enter the status dashboard at `/records/`.

---

## DNS

At the `thermalunderground.org` registrar, add:

```
sepi    CNAME    adlerarcher.github.io
```

In this repo, GitHub Pages should use the custom domain `sepi.thermalunderground.org` with Enforce HTTPS. The `CNAME` file in the root is that domain.

Do not host this demonstration on ai410.org.
