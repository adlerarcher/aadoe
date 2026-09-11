(function (w, d) {
  var KEY = "gpcp-as";
  function read() {
    var q = "";
    try { q = new URLSearchParams(w.location.search).get("as") || ""; } catch (e) {}
    if (q === "applicant" || q === "reviewer") {
      try { w.sessionStorage.setItem(KEY, q); } catch (e) {}
      return q;
    }
    try { return w.sessionStorage.getItem(KEY) || "reviewer"; } catch (e) { return "reviewer"; }
  }
  var as = read();
  var applicant = as === "applicant";
  w.GPCP_AS = as;
  w.GPCP_USER = {
    as: as,
    name: applicant ? "Adler Archer" : "Allison Andrews",
    file: applicant ? "adler.jpg?v=2" : "allison.jpg"
  };
  function apply() {
    d.querySelectorAll("[data-record]").forEach(function (el) {
      el.hidden = el.getAttribute("data-record") !== as;
    });
    if (d.querySelector("[data-record]")) d.title = w.GPCP_USER.name;
    d.querySelectorAll("[data-user]").forEach(function (a) {
      var href = a.getAttribute("href") || "../profile/";
      href = href.split("?")[0];
      if (!/\/$/.test(href) && href.indexOf(".html") === -1) href += "/";
      a.setAttribute("href", href + "?as=" + as);
      a.setAttribute("aria-label", w.GPCP_USER.name);
      var img = a.querySelector("img");
      if (img) {
        var src = img.getAttribute("src") || "";
        img.src = src.replace(/[^/]+\.jpg(?:\?.*)?$/i, w.GPCP_USER.file);
      }
    });
  }
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", apply);
  else apply();
})(window, document);
