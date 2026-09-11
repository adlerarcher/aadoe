# GPCP

The Geothermal Permitting Coordination Platform. For a specified geothermal project: what applies, who runs each review, what waits on what, and how long it takes.

SEPI is the DOE index of agency systems. Those connections are made once. This platform is built on that index, so it reads the agencies’ own data rather than a copy. Connector status is read at runtime from [sepi.thermalunderground.org/connectors.json](/sepi/connectors.json). Records that arrive through SEPI are marked SEPI. The schedule is computed from the encoded rule set.

This repository is the captured static site. Live: [gpcp.thermalunderground.org](https://gpcp.thermalunderground.org)

---

## Servers

| Server | Tools | Source |
|---|---|---|
| `sepi` | `get_authorization_status`, `get_well_records`, `screen_location`, `get_regulations` | Agency systems of record |
| `gpcp-timeline` | `build_timeline`, `list_rules` | Encoded dependency rule set |

Every response carries `source`, `url`, and `retrieved`.

MCP servers are local processes and a static host cannot run them. What is published here is what those servers produced.

---

## Serve this site

Requires Node 20 or later.

```
npm run dev
```

Opens the landing page at `http://localhost:5173`. GPCP is at `/gpcp/`.

---

## The rule set

`rules/dependencies.json` is the substance. Eighteen reviews plus two categorical exclusions, each with:

- triggering conditions
- prerequisites
- what it blocks
- low, typical, and high duration estimates
- a basis marker: statutory clock, published agency figure, or stated assumption
- statutory citation

`gpcp-timeline` computes the schedule by topological sort over that graph. Earliest start of each review is the maximum finish of everything blocking it; the longest path to the terminal node is the critical path. Deterministic. Not model output.

The rule set is a data file. Domain knowledge lives there, and so do errors. An early version placed ESA Section 7 consultation off the critical path with 230 days of float, because it modeled informal and formal consultation as parallel and omitted the biological assessment and its field survey seasons. The correction was to the rule set, not the code.

---

## Identifier resolution

Six identifier schemes appear across systems SEPI indexes: BLM MLRS case serial, IPaC location polygon, PAD-US `Source_PAID`, NEPATEC project hash, RAPID jurisdiction path, Census GEOID.

Spatial intersection is the only join available between them. There is no published crosswalk from a lease serial to a NEPA document, from a lease serial to a well record, or from an ePlanning project number to a case serial, in any direction.

---

## Sources

USFWS IPaC · eCFR · Federal Register · BLM MLRS geothermal leases · USGS PAD-US · USFWS National Wetlands Inventory · USGS National Hydrography Dataset · USGS 3DEP · Census TIGERweb · OpenEI RAPID Toolkit · INFRA-COMPASS · PNNL NEPATEC 2.0 · PNNL PermitTEC v0.1 · GSA Site Scanning

---

## DNS

At the `thermalunderground.org` registrar, add:

```
gpcp    CNAME    adlerarcher.github.io
```

In this repo, GitHub Pages should use the custom domain `gpcp.thermalunderground.org` with Enforce HTTPS. The `CNAME` file in the root is that domain.

---

## License

MIT.
