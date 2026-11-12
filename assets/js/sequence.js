/* Forum IA — page séquence : en-tête, encart et navigation générés depuis data.js.
 * Le contenu rédactionnel (objectif, déroulé, notes…) reste dans le fichier HTML de la séquence. */
(function () {
  var D = window.FORUM, esc = F.esc;
  var id = document.body.getAttribute("data-seq");
  var s = F.seq(id);
  if (!s) return;

  var p = s.parcours ? D.parcours[s.parcours] : null;
  var creneau = D.creneaux.filter(function (c) { return c.id === s.creneau; })[0];
  document.title = s.titre + " · " + D.evenement.titre + " " + D.evenement.edition;

  var head = document.getElementById("seq-head");
  head.innerHTML =
    '<p class="crumbs"><a href="' + F.root + 'programme.html">Programme</a> / ' + esc(creneau ? creneau.titre : "") + "</p>" +
    '<header class="seq-hero"' + (p ? ' data-parcours="' + s.parcours + '"' : "") + ">" +
      '<p class="overline">' +
        (p ? '<span class="pill">Parcours ' + s.parcours + "</span>" : "") +
        "<span>" + F.heure(s.debut) + " – " + F.heure(s.fin) + "</span>" +
        "<span>" + esc(F.lieu(s.lieu)) + "</span>" +
      "</p>" +
      "<h1>" + (p ? "<em>" + esc(s.titre) + "</em>" : esc(s.titre)) + "</h1>" +
      (s.sousTitre ? '<p class="sub">' + esc(s.sousTitre) + "</p>" : "") +
      '<dl class="seq-facts">' +
        "<div><dt>Horaire</dt><dd>" + F.heure(s.debut) + " – " + F.heure(s.fin) + "</dd></div>" +
        "<div><dt>Durée</dt><dd>" + F.duree(s.debut, s.fin) + "</dd></div>" +
        "<div><dt>Lieu</dt><dd>" + esc(F.lieu(s.lieu)) + "</dd></div>" +
        "<div><dt>" + (p ? "Format" : "Public") + "</dt><dd>" + esc(p ? p.format : "Tous les participants") + "</dd></div>" +
      "</dl>" +
    "</header>";

  var aside = document.getElementById("seq-aside");
  if (aside) {
    var html = "";
    if (s.intervenants.length) {
      html += "<h2>Intervenants</h2><ul>" + s.intervenants.map(function (i) {
        return "<li><strong>" + esc(i.nom) + "</strong>" + (i.role ? "<span>" + esc(i.role) + "</span>" : "") + "</li>";
      }).join("") + "</ul>";
    }
    if (p) {
      html += '<h2>Pour qui ?</h2><div class="box"><p style="margin:0;font-family:var(--serif);font-style:italic">« ' + esc(p.profil) + " »</p></div>";
    }
    if (s.livrable) {
      html += '<h2 style="margin-top:2rem">Livrable</h2><p>' + esc(s.livrable) + "</p>";
    }
    aside.innerHTML = html;
  }

  var standsEl = document.getElementById("stands");
  if (standsEl && s.stands) stands(s.stands, standsEl);

  // Agora de l'IA : cartes cliquables + fenêtre de détail + rappel des couleurs
  function stands(list, grid) {
    grid.innerHTML = list.map(function (st, i) { return F.standCard(st, null, i); }).join("");

    var legend = document.getElementById("stands-legend");
    if (legend) {
      legend.innerHTML = Object.keys(D.parcours).map(function (k) {
        var n = list.filter(function (st) { return st.niveau === k; }).length;
        return '<div data-parcours="' + k + '"><strong><span class="legend-dot" aria-hidden="true"></span>' + esc(D.parcours[k].nom) + "</strong>" +
          "<span>" + esc(D.parcours[k].niveau) + "</span>" +
          '<span class="count">' + n + " stand" + (n > 1 ? "s" : "") + "</span></div>";
      }).join("");
    }

    var dlg = document.createElement("dialog");
    dlg.className = "stand-dialog";
    dlg.setAttribute("aria-labelledby", "stand-dialog-title");
    document.body.appendChild(dlg);
    var courant = 0;

    function render(idx) {
      courant = (idx + list.length) % list.length;
      var st = list[courant], p = D.parcours[st.niveau];
      dlg.setAttribute("data-parcours", F.standCouleur(st));
      dlg.innerHTML =
        '<div class="sd-top">' +
          '<span class="stand-num">' + F.standNum(st) + "</span>" +
          (p ? '<span class="stand-level"><span class="dot" aria-hidden="true"></span>' + esc(p.nom) + " · " + esc(p.niveau) + "</span>" : "") +
          '<button class="sd-close" type="button" aria-label="Fermer">×</button>' +
        "</div>" +
        '<p class="stand-label">' + F.standNom(st) + "</p>" +
        '<h2 id="stand-dialog-title" class="sd-title">' + esc(st.titre) + "</h2>" +
        (st.animateur ? '<p class="sd-who">Animé par ' + esc(st.animateur) + "</p>" : "") +
        (st.description
          ? '<p class="sd-desc">' + esc(st.description) + "</p>"
          : '<p class="sd-desc todo">Description à venir (champ « description » du stand dans data.js).</p>') +
        (p ? '<p class="sd-for">Idéal si : « ' + esc(p.profil) + " »</p>" : "") +
        '<div class="sd-nav">' +
          '<button type="button" data-step="-1">← Stand précédent</button>' +
          '<span class="muted">' + (courant + 1) + " / " + list.length + "</span>" +
          '<button type="button" data-step="1">Stand suivant →</button>' +
        "</div>";
      try { history.replaceState(null, "", "#stand-" + st.numero); } catch (e) { /* file:// */ }
    }
    function ouvrir(idx) {
      render(idx);
      if (!dlg.open) dlg.showModal();
    }

    grid.addEventListener("click", function (e) {
      var b = e.target.closest("[data-stand]");
      if (b) ouvrir(+b.getAttribute("data-stand"));
    });
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg || e.target.closest(".sd-close")) return dlg.close();
      var step = e.target.closest("[data-step]");
      if (step) render(courant + +step.getAttribute("data-step"));
    });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") render(courant + 1);
      if (e.key === "ArrowLeft") render(courant - 1);
    });
    dlg.addEventListener("close", function () {
      try { history.replaceState(null, "", location.pathname); } catch (e) { /* file:// */ }
      var b = grid.querySelector('[data-stand="' + courant + '"]');
      if (b) b.focus();
    });

    // Arrivée depuis le programme (#stand-3) : on ouvre directement ce stand
    var m = /^#stand-(\d+)$/.exec(location.hash);
    if (m) {
      var idx = list.map(function (st) { return st.numero; }).indexOf(+m[1]);
      if (idx > -1) { grid.scrollIntoView({ block: "start" }); ouvrir(idx); }
    }
  }

  // Précédent / suivant dans l'ordre du programme
  // (les parcours A, B, C étant simultanés, on saute les autres parcours du même créneau)
  var list = D.sequences, i = list.indexOf(s), j = i;
  if (s.parcours) {
    while (i > 0 && list[i - 1].creneau === s.creneau) i--;
    while (j < list.length - 1 && list[j + 1].creneau === s.creneau) j++;
  }
  var prev = list[i - 1], next = list[j + 1];
  var nav = document.getElementById("seq-nav");
  if (nav) {
    nav.innerHTML =
      (prev ? '<a href="' + prev.id + '.html"><span>← Précédent · ' + F.heure(prev.debut) + "</span><strong>" + esc(prev.titre) + "</strong></a>" : "<span></span>") +
      (next ? '<a href="' + next.id + '.html"><span>' + F.heure(next.debut) + " · Suivant →</span><strong>" + esc(next.titre) + "</strong></a>" : "");
  }
})();
