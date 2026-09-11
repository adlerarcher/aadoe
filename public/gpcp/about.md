# Geothermal Permitting Coordination Platform

This demonstration is GPCP. For a specified geothermal project it identifies applicable reviews, the responsible agency for each, the dependencies among them, and an estimated duration of the sequence.

SEPI is the DOE index of agency systems. Those connections are made once. This platform is built on that index, so it reads the agencies’ own data rather than a copy. Connector status is read from SEPI. Records that arrive through SEPI are marked SEPI. The schedule is computed from the encoded rule set.

## What GPCP reads

GPCP has two MCP servers. Agency systems are reached through SEPI, the DOE index, so those connections are not rebuilt here. The rule set is local. Each response carries its source name, endpoint, and retrieval timestamp.

| Server | Source |
|---|---|
| `sepi` | Agency systems of record |
| `gpcp-timeline` | Encoded dependency rule set |

The schedule is computed from the rule set by topological sort. Same input, same output, every time.

MCP servers are local processes. A static host cannot run them. This site publishes what they produced.

## Provenance

Every record carries a marker.

**SEPI.** The DOE index of agency systems. Connections are made once. This platform reads those streams rather than holding a copy.
**Extracted.** Derived from a published dataset by a third party.
**GPCP.** Computed from the encoded rule set on this platform.

## Sources

USFWS IPaC · eCFR · Federal Register · USGS PAD-US · USFWS National Wetlands Inventory · USGS National Hydrography Dataset · USGS 3DEP · Census TIGERweb · BLM MLRS · SEPI · OpenEI RAPID Toolkit · INFRA-COMPASS · PNNL NEPATEC 2.0

Rule set v0.3.0. Data captured 20–21 August 2026.
