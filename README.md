# Databases and dashboards

Hub for The Thermal Underground: the permitting database (SEPI) and the coordination dashboard (GPCP), with role-based entry. Nested apps live on the same origin.

Live: [aadoe.thermalunderground.org](https://aadoe.thermalunderground.org)

## Entries

| Hub label | Role | Lands on |
|---|---|---|
| **SEPI** | System user · System owner | `/sepi/records/` |
| **GPCP** | Applicant · Reviewer | `/gpcp/gpcp/` |

Secondary: `/guide/`, `/gpic/`, `/odev/`, `/mdev/`.

## Role mapping

Deep links pass both `role=` (hub contract) and `as=` (what each target already reads):

| Hub role | URL params | Lands on |
|---|---|---|
| System user | `?role=user&as=user` | `/sepi/records/` |
| System owner | `?role=owner&as=admin` | `/sepi/records/` |
| Applicant | `?role=applicant&as=applicant` | `/gpcp/gpcp/` |
| Reviewer | `?role=reviewer&as=reviewer` | `/gpcp/gpcp/` |

### What targets support today

- **SEPI** reads `?as=user|admin` in `session-user.js`. Owner maps to `admin` until SEPI adds an `owner` alias.
- **GPCP** reads `?as=applicant|reviewer` in `session-user.js`.

## Layout

```
public/sepi/     static SEPI site
public/gpcp/     static GPCP site (dashboard at /gpcp/gpcp/)
public/gpic/     static GPIC site
public/odev/     static ODEV site (paths rooted at /odev/)
apps/mdev/       Vite SPA → dist/mdev (base /mdev/)
apps/guide/      Vite SPA → dist/guide (base /guide/)
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
