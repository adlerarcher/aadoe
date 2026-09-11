(function (root) {
  var LIVE = "/sepi/connectors.json";

  function methodLabel(m) {
    return { mcp: "MCP", gis: "GIS", extract: "Extract", stub: "MCP stub", none: "None" }[m] || m || "—";
  }
  function lightLabel(l) {
    return { go: "Connected", hold: "Interrupted", stop: "Retired", syn: "No public surface", open: "Not probed" }[l] || l || "—";
  }
  function lightTag(l) {
    return { go: "captured", hold: "sim", stop: "none", syn: "extract", open: "none" }[l] || "none";
  }

  function fetchJson(url, ms) {
    var ctrl = new AbortController();
    var t = setTimeout(function () { ctrl.abort(); }, ms || 4000);
    return fetch(url, { cache: "no-store", mode: "cors", signal: ctrl.signal }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    }).finally(function () { clearTimeout(t); });
  }

  function normalize(data) {
    var list = !data ? [] : Array.isArray(data) ? data : (data.connectors || []);
    return {
      connectors: list,
      updated: (data && data.updated) || "",
      source: (data && data.source) || "SEPI",
      url: (data && data.url) || LIVE
    };
  }

  function urls() {
    var list = [];
    var host = location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      list.push("http://localhost:5174/connectors.json");
    }
    list.push(LIVE);
    list.push("../data/sepi-connectors.json");
    return list;
  }

  async function load() {
    var last;
    var list = urls();
    for (var i = 0; i < list.length; i++) {
      try {
        return normalize(await fetchJson(list[i]));
      } catch (e) {
        last = e;
      }
    }
    throw last || new Error("SEPI index unavailable");
  }

  root.sepiIndex = {
    liveUrl: LIVE,
    methodLabel: methodLabel,
    lightLabel: lightLabel,
    lightTag: lightTag,
    load: load
  };
})(window);
