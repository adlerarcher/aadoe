# AADOE

Adler DOE project dashboard for [The Thermal Underground](https://thermalunderground.org). One public front door for Index and Permitting coordination, with role-based entry.

Live: [aadoe.thermalunderground.org](https://aadoe.thermalunderground.org)

## Products

| Hub label | Target | Roles |
|---|---|---|
| **Index** | [SEPI](https://sepi.thermalunderground.org/) | System user · System owner |
| **Permitting coordination** | [GPCP](https://gpcp.thermalunderground.org/) | Applicant · Reviewer |

Secondary links keep the rest of the estate reachable: Field guide, GPIC, ODEV, MDEV.

## Role mapping

Deep links pass both `role=` (hub contract) and `as=` (what each target already reads):

| Hub role | URL params | Lands on |
|---|---|---|
| System user | `?role=user&as=user` | `sepi…/records/` |
| System owner | `?role=owner&as=admin` | `sepi…/records/` |
| Applicant | `?role=applicant&as=applicant` | `gpcp…/gpcp/` |
| Reviewer | `?role=reviewer&as=reviewer` | `gpcp…/gpcp/` |

### What targets support today

- **SEPI** reads `?as=user|admin` in `session-user.js`. Owner maps to `admin` until SEPI adds an `owner` alias.
- **GPCP** reads `?as=applicant|reviewer` in `session-user.js`.

### Next on the target sites

1. SEPI: accept `as=owner` (or `role=owner`) as an alias for admin / system-owner view.
2. Both sites: optionally read `role=` and treat it as the canonical hub param.
3. Optional path segments (`/as/user`, `/as/owner`) if query strings are awkward for bookmarks.

## Run locally

```
npm install
npm run dev
```

Opens at `http://localhost:5176`.

## Deploy

Pushes to `main` build and deploy via GitHub Actions Pages.

### DNS

At the `thermalunderground.org` registrar:

```
CNAME  aadoe  →  adlerarcher.github.io
```

GitHub Pages custom domain: `aadoe.thermalunderground.org` with Enforce HTTPS. `public/CNAME` already holds that host.

## Redirect candidates

Once Adler points people at AADOE first, these CNAMEs can redirect into hub entry points:

| Host | Suggested redirect |
|---|---|
| `sepi.thermalunderground.org` home | stay as product; hub links with roles |
| `gpcp.thermalunderground.org` home | stay as product; hub links with roles |
| Optional apex marketing | `thermalunderground.org` can link to AADOE as “Enter products” |

Keep SEPI and GPCP hosts live for deep links and connectors. Use AADOE as the public chooser so fewer people need to remember subdomains.
