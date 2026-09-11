(function (w, d) {
  var KEY = "sepi-as";
  function read() {
    var q = "";
    try { q = new URLSearchParams(w.location.search).get("as") || ""; } catch (e) {}
    if (q === "user" || q === "admin") {
      try { w.sessionStorage.setItem(KEY, q); } catch (e) {}
      return q;
    }
    try { return w.sessionStorage.getItem(KEY) || "user"; } catch (e) { return "user"; }
  }
  var as = read();
  var admin = as === "admin";
  w.SEPI_AS = as;
  w.SEPI_USER = {
    as: as,
    name: admin ? "Brendon Berry" : "Susan Smith",
    org: admin ? "BLM National Operations Center" : "DOE",
    file: admin ? "brendon.jpg" : "susan.jpg"
  };
  function apply() {
    d.querySelectorAll("[data-record]").forEach(function (el) {
      el.hidden = el.getAttribute("data-record") !== as;
    });
    if (d.querySelector("[data-record]")) d.title = w.SEPI_USER.name;
    d.querySelectorAll("[data-user]").forEach(function (a) {
      var href = a.getAttribute("href") || "../profile/";
      href = href.split("?")[0];
      if (href && !/\/$/.test(href) && href.indexOf(".html") === -1) href += "/";
      a.setAttribute("href", href + "?as=" + as);
      a.setAttribute("aria-label", w.SEPI_USER.name);
      var img = a.querySelector("img");
      if (img) {
        var src = img.getAttribute("src") || "";
        img.src = src.replace(/[^/]+\.jpg(?:\?.*)?$/i, w.SEPI_USER.file);
      } else {
        a.textContent = w.SEPI_USER.name;
      }
    });
    d.querySelectorAll("a[data-as]").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      href = href.split("?")[0];
      if (href && !/\/$/.test(href) && href.indexOf(".html") === -1) href += "/";
      a.setAttribute("href", href + "?as=" + as);
    });
  }
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", apply);
  else apply();
})(window, document);
