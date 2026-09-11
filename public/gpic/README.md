# GPIC

The Geothermal Permitting Innovation Collaborative. A community of federal, state, Tribal, and applicant practitioners working on geothermal permitting.

The site is programs, an FY 2027 events calendar, and resource libraries (federal, state, Tribal, applicant). Event dates are estimated from Year 1 quarters.

Rebuild the pages from `scripts/build-pages.py`.

This repository is the captured static site. Intended host: [gpic.thermalunderground.org](https://gpic.thermalunderground.org)

---

## Serve this site

Requires Node 20 or later.

```
npm run dev
```

Opens the community home at `http://localhost:5175`.

---

## DNS

At the `thermalunderground.org` registrar, add:

```
gpic    CNAME    adlerarcher.github.io
```

In this repo, GitHub Pages should use the custom domain `gpic.thermalunderground.org` with Enforce HTTPS. The `CNAME` file in the root is that domain.

Do not host this demonstration on ai410.org.
