# MILDEV

Overseas U.S. military installation energy development (geothermal + SMR). A [Thermal Underground](https://thermalunderground.org) venture, nested on AADOE at `/mildev/`.

Not an official U.S. government, DoD, or DOE publication. Public open sources only. Candidate inventory, not an authoritative basing map.

## Routes

- `/mildev/`  -  scope and framing
- `/mildev/inventory`  -  curated public candidate sites
- `/mildev/geothermal`  -  geothermal lens
- `/mildev/smr`  -  SMR lens
- `/mildev/sources`  -  sources and method

## Run locally

```
npm install
npm run dev -- --host 127.0.0.1
```

Preview: [http://127.0.0.1:5178/mildev/](http://127.0.0.1:5178/mildev/)

## Deploy

Built into `dist/mildev/` by the AADOE root `npm run build` and verified in GitHub Actions.
