# MILDEV

Overseas U.S. military installation geothermal. A [Thermal Underground](https://thermalunderground.org) venture, nested on AADOE at `/mildev/`.

Not an official U.S. government publication.

Geothermal geography follows Pacific Ring of Fire host countries. Installation pages link to official public sites where available.

## Routes

- `/mildev/`  world map
- `/mildev/country/:slug`  host-country geothermal program, installations, public offices
- `/mildev/region/:id`  region summary and host countries
- `/mildev/inventory`  flat installation index
- `/mildev/sources`  sources and method

## Run locally

```
npm install
npm run dev -- --host 127.0.0.1
```

Preview: [http://127.0.0.1:5178/mildev/](http://127.0.0.1:5178/mildev/)

## Deploy

Built into `dist/mildev/` by the AADOE root `npm run build` and verified in GitHub Actions.
