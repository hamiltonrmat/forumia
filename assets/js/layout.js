/* Forum IA — utilitaires partagés, en-tête et pied de page communs. */
(function () {
  var D = window.FORUM;
  var root = document.body.getAttribute("data-root") || "";
  var page = document.body.getAttribute("data-page") || "";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function heure(t) {               // "08:30" -> "8h30", "09:00" -> "9h"
    var p = t.split(":");
    return parseInt(p[0], 10) + "h" + (p[1] === "00" ? "" : p[1]);
  }
  function minutes(t) { var p = t.split(":"); return +p[0] * 60 + +p[1]; }
  function duree(a, b) { return minutes(b) - minutes(a) + " min"; }
  function lieu(id) { return (D.lieux[id] || { nom: id }).nom; }
  function seqUrl(id) { return root + "sequences/" + id + ".html"; }
  function seq(id) {
    for (var i = 0; i < D.sequences.length; i++) if (D.sequences[i].id === id) return D.sequences[i];
    return null;
  }
  function estAujourdhui() {
    if (!D.evenement.date) return false;
    var d = new Date();
    var iso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    return iso === D.evenement.date;
  }
  function maintenant() { var d = new Date(); return d.getHours() * 60 + d.getMinutes(); }
  function store(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (e) { return null; }
  }

  // Stands : numéro affiché ("01"…, "☕" pour le Stand Café), libellé et code couleur (A, B, C ou commun)
  function standNum(st) { return st.cafe ? "☕" : (st.numero < 10 ? "0" : "") + st.numero; }
  function standNom(st) { return st.cafe ? "Commun à tous" : "Stand " + st.numero; }
  function standCouleur(st) { return st.cafe ? "commun" : (D.parcours[st.niveau] ? st.niveau : ""); }

  // Carte de stand : lien (programme) ou bouton ouvrant la fenêtre de détail (page Agora)
  function standCard(st, href, idx) {
    var p = D.parcours[st.niveau];
    var coul = standCouleur(st);
    var open = href
      ? '<a class="stand" href="' + href + '"'
      // pas d'id="stand-N" : le #stand-N de l'URL ferait défiler la page à l'ouverture de la fenêtre
      : '<button type="button" class="stand" data-stand="' + idx + '" aria-haspopup="dialog"';
    return open + (coul ? ' data-parcours="' + coul + '"' : "") + ">" +
      '<span class="stand-top"><span class="stand-num" aria-hidden="' + (st.cafe ? "true" : "false") + '">' + standNum(st) + "</span>" +
        (p ? '<span class="stand-level"><span class="dot" aria-hidden="true"></span>' + esc(p.nom) + "</span>" : "") +
      "</span>" +
      '<span class="stand-label">' + standNom(st) + "</span>" +
      '<span class="stand-title">' + esc(st.titre) + "</span>" +
      (st.animateur ? '<span class="stand-who">' + esc(st.animateur) + "</span>" : "") +
      (href ? "" : '<span class="stand-open">Voir le détail <span class="arrow" aria-hidden="true">→</span></span>') +
    (href ? "</a>" : "</button>");
  }

  window.F = {
    esc: esc, heure: heure, minutes: minutes, duree: duree, lieu: lieu,
    seqUrl: seqUrl, seq: seq, root: root, estAujourdhui: estAujourdhui,
    maintenant: maintenant, store: store, standCard: standCard,
    standNum: standNum, standNom: standNom, standCouleur: standCouleur
  };

  var ev = D.evenement;
  var nav = [
    { id: "accueil", label: "Accueil", href: root + "index.html" },
    { id: "programme", label: "Programme", href: root + "programme.html" },
    { id: "parcours", label: "Parcours", href: root + "index.html#parcours" },
    { id: "agora", label: "Agora IA", href: seqUrl("agora") },
    { id: "plan", label: "Plan interactif", href: root + "plan-3d.html" },
    { id: "mannele", label: "Le Mannele", href: root + "mannele.html" },
    { id: "infos", label: "Infos pratiques", href: root + "index.html#infos" }
  ];

  var header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<div class="wrap header-inner">' +
        '<a class="brand" href="' + root + 'index.html" aria-label="Accueil du ' + esc(ev.titre) + '">' +
          '<span class="brand-mark" aria-hidden="true"></span>' +
          '<span class="brand-name">' + esc(ev.titre) + '</span>' +
          '<span class="brand-ed">' + esc(ev.edition) + '</span>' +
        '</a>' +
        '<button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>' +
        '<nav id="site-nav" class="site-nav" aria-label="Navigation principale">' +
          nav.map(function (n) {
            return '<a href="' + n.href + '"' + (n.id === page ? ' aria-current="page"' : "") + ">" + esc(n.label) + "</a>";
          }).join("") +
        "</nav>" +
      "</div>";
    var toggle = header.querySelector(".nav-toggle");
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      header.classList.toggle("nav-open", !open);
    });
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="wrap footer-inner">' +
        '<p class="footer-title">' + esc(ev.titre) + " " + esc(ev.edition) + "</p>" +
        "<p>" + esc(ev.organisateur) + " · " + esc(ev.dateLabel) + " · " + esc(ev.horaires) + "</p>" +
        '<p><a href="' + root + 'programme.html">Voir le programme complet</a></p>' +
      "</div>";
  }

  // Apparition douce des blocs marqués .reveal (après le rendu des scripts de page)
  document.addEventListener("DOMContentLoaded", reveal);
  function reveal() {
    var items = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px" });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }
})();
