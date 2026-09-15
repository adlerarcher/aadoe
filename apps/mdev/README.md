# MDEV

International market development under [AADOE](https://aadoe.thermalunderground.org) at `/mdev/`.

Home is the animated world map. Country profiles keep geothermal market briefs and list military bases where the public inventory has them.

## Routes

- `/mdev/` — map home
- `/mdev/geothermal/markets` — country index
- `/mdev/geothermal/markets/:slug` — country profile (+ military bases)
- `/mdev/geothermal/developments` — recent developments

Legacy `/mildev/*` redirects to `/mdev/` via the hub `404.html`.

## Run locally

```
npm install
npm run dev
```

Preview defaults to `http://127.0.0.1:4177/mdev/`.
