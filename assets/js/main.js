/* elaminendiaye.com - scripts légers, sans dépendance */
(function () {
  "use strict";

  /* Menu mobile */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* Animations d'apparition au scroll */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* Bandeau de suggestion de langue (non intrusif, pas de redirection : bon pour le SEO) */
  var banner = document.querySelector(".lang-banner");
  if (banner) {
    var pageLang = document.documentElement.lang || "fr";
    var browserLang = (navigator.language || "").slice(0, 2).toLowerCase();
    var dismissed = false;
    try { dismissed = localStorage.getItem("langBannerDismissed") === "1"; } catch (e) {}
    var wantsOther = (pageLang === "fr" && browserLang === "en") || (pageLang === "en" && browserLang === "fr");
    if (wantsOther && !dismissed) {
      banner.classList.add("is-visible");
      var close = banner.querySelector("button");
      if (close) close.addEventListener("click", function () {
        banner.classList.remove("is-visible");
        try { localStorage.setItem("langBannerDismissed", "1"); } catch (e) {}
      });
    }
  }

  /* Effet machine à écrire du hero */
  var word = document.querySelector(".hero__word");
  if (word && word.dataset.words) {
    var words = word.dataset.words.split("|");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { word.textContent = words[0]; }
    else {
      var wi = 0, ci = 0, deleting = false;
      var tick = function () {
        var w = words[wi];
        if (!deleting) {
          ci++; word.textContent = w.slice(0, ci);
          if (ci === w.length) { deleting = true; setTimeout(tick, 2200); return; }
          setTimeout(tick, 110);
        } else {
          ci--; word.textContent = w.slice(0, ci);
          if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(tick, 400); return; }
          setTimeout(tick, 55);
        }
      };
      setTimeout(tick, 600);
    }
  }

  /* Année dans le footer */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  /* Formulaire : si aucun service n'est configuré, bascule sur mailto */
  var form = document.querySelector("form.form");
  if (form && form.getAttribute("action").indexOf("REMPLACER") !== -1) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = new FormData(form);
      var subject = encodeURIComponent(form.dataset.subject || "Contact via elaminendiaye.com");
      var body = "";
      data.forEach(function (v, k) { if (k !== "_gotcha") body += k + ": " + v + "\n"; });
      window.location.href = "mailto:" + (form.dataset.email || "") + "?subject=" + subject + "&body=" + encodeURIComponent(body);
    });
  }
})();
