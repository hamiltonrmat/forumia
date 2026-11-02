/* Forum IA — programme interactif */
(function () {
  var D = window.FORUM, ev = D.evenement, esc = F.esc;
  var timeline = document.getElementById("timeline");

  document.getElementById("prog-date").textContent = ev.dateLabel + " · " + ev.horaires;

  function personnes(s) {
    return s.intervenants.map(function (p) { return p.nom; }).join(", ");
  }

  function cta(href, label, kicker) {
    return '<a class="cta" href="' + href + '">' +
      '<span class="cta-text"><span class="cta-kicker">' + esc(kicker) + '</span><span class="cta-label">' + esc(label) + "</span></span>" +
      '<span class="cta-icon" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span>' +
    "</a>";
  }

  function card(s) {
    var p = s.parcours ? D.parcours[s.parcours] : null;
    var detailId = "d-" + s.id;
    var people = s.intervenants.length
      ? "<ul>" + s.intervenants.map(function (i) {
          return "<li>" + esc(i.nom) + (i.role ? " <span>· " + esc(i.role) + "</span>" : "") + "</li>";
        }).join("") + "</ul>"
      : "";
    var livrable = s.livrable ? '<p><span class="muted">Livrable :</span> ' + esc(s.livrable) + "</p>" : "";

    return '<article class="card" id="seq-' + s.id + '"' + (p ? ' data-parcours="' + s.parcours + '"' : "") + ">" +
      '<button class="card-toggle" type="button" aria-expanded="false" aria-controls="' + detailId + '">' +
        "<span>" +
          '<span class="card-meta">' +
            (p ? '<span class="tag">Parcours ' + s.parcours + "</span>" : "") +
            "<span>" + F.heure(s.debut) + " – " + F.heure(s.fin) + "</span>" +
            "<span>" + F.duree(s.debut, s.fin) + "</span>" +
            "<span>" + esc(F.lieu(s.lieu)) + "</span>" +
          "</span>" +
          '<span class="card-title">' + esc(s.titre) + "</span>" +
          (s.sousTitre ? '<span class="card-sub">' + esc(s.sousTitre) + "</span>" : "") +
          (s.intervenants.length ? '<span class="card-people">' + esc(personnes(s)) + "</span>" : "") +
        "</span>" +
        '<span class="card-plus" aria-hidden="true"></span>' +
      "</button>" +
      '<div class="card-detail" id="' + detailId + '"><div><div class="card-detail-inner">' +
        (p ? '<p class="muted" style="font-style:italic">« ' + esc(p.profil) + " »</p>" : "") +
        "<p>" + esc(s.resume) + "</p>" + people + livrable +
        cta(F.seqUrl(s.id), s.lien || "Découvrir la séquence", p ? "Parcours " + s.parcours : "Page de la séquence") +
      "</div></div></div>" +
    "</article>";
  }

  // Agora de l'IA : une carte par stand, colorée selon son niveau, puis l'accès à la page détaillée
  function standsBlock(s) {
    var url = F.seqUrl(s.id);
    return '<p class="slot-intro">' + esc(s.resume) + "</p>" +
      '<div class="stand-grid">' +
        s.stands.map(function (st) { return F.standCard(st, url + "#stand-" + st.numero); }).join("") +
      "</div>" +
      cta(url, s.lien || s.titre, "Page détaillée");
  }

  var auj = F.estAujourdhui(), now = F.maintenant();

  timeline.innerHTML = D.creneaux.map(function (c) {
    var seqs = D.sequences.filter(function (s) { return s.creneau === c.id; });
    var split = seqs.some(function (s) { return s.parcours; });
    var enCours = auj && now >= F.minutes(c.debut) && now < F.minutes(c.fin);
    var cls = "slot" + (c.pause ? " is-pause" : "") + (split ? " is-split" : "") +
      (seqs.some(function (s) { return s.stands; }) ? " is-libre" : "") + (enCours ? " is-now" : "");
    var lieux = seqs.map(function (s) { return F.lieu(s.lieu); }).filter(function (l, i, a) { return a.indexOf(l) === i; });

    var body = c.pause
      ? '<p class="pause-note">' + esc(c.titre) + " · " + F.duree(c.debut, c.fin) + "</p>"
      : '<div class="slot-head"><h2>' + esc(c.titre) + "</h2>" +
          '<span class="where">' + esc(split ? "Salle à choisir" : lieux.join(", ")) + "</span>" +
          (enCours ? '<span class="now-badge">En cours</span>' : "") +
        "</div>" +
        (seqs.length === 1 && seqs[0].stands
          ? standsBlock(seqs[0])
          : '<div class="cards' + (split ? " split" : "") + '">' + seqs.map(card).join("") + "</div>");

    return '<li class="' + cls + ' reveal">' +
      '<div class="slot-time"><span class="start">' + F.heure(c.debut) + '</span><span class="end">' + (c.pause ? "" : "→ " + F.heure(c.fin)) + "</span></div>" +
      '<div class="slot-rail" aria-hidden="true"></div>' +
      '<div class="slot-body">' + body + "</div>" +
    "</li>";
  }).join("");

  // Déplier / replier
  function setOpen(cardEl, open) {
    cardEl.classList.toggle("is-open", open);
    cardEl.querySelector(".card-toggle").setAttribute("aria-expanded", String(open));
  }
  timeline.addEventListener("click", function (e) {
    var t = e.target.closest(".card-toggle");
    if (!t) return;
    var c = t.closest(".card");
    setOpen(c, !c.classList.contains("is-open"));
  });
  var expandBtn = document.getElementById("expand-all");
  expandBtn.addEventListener("click", function () {
    var cards = timeline.querySelectorAll(".card");
    var allOpen = timeline.querySelectorAll(".card.is-open").length === cards.length;
    cards.forEach(function (c) { setOpen(c, !allOpen); });
    expandBtn.textContent = allOpen ? "Tout déplier" : "Tout replier";
  });

  // Filtre parcours
  var chips = document.getElementById("chips");
  var note = document.getElementById("focus-note");
  var options = [{ k: "", nom: "Tout voir" }].concat(Object.keys(D.parcours).map(function (k) {
    return { k: k, nom: D.parcours[k].nom };
  }));
  chips.innerHTML = options.map(function (o) {
    return '<button class="chip" type="button" data-k="' + o.k + '"' + (o.k ? ' data-parcours="' + o.k + '"' : "") + ">" +
      (o.k ? '<span class="dot" aria-hidden="true"></span>' : "") + esc(o.nom) + "</button>";
  }).join("");

  function focus(k, scroll) {
    if (k && !D.parcours[k]) k = "";
    chips.querySelectorAll(".chip").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-k") === k));
    });
    if (k) {
      timeline.setAttribute("data-focus", k);
      var p = D.parcours[k];
      var s = F.seq(p.page);
      note.innerHTML = "Parcours initial : <strong>" + esc(p.nom) + "</strong>, " + esc(F.lieu(p.lieu)) +
        " de " + F.heure(s.debut) + " à " + F.heure(s.fin) + ". Ensuite, vous êtes libre : les stands de ce niveau sont simplement suggérés.";
    } else {
      timeline.removeAttribute("data-focus");
      note.textContent = "";
    }
    F.store("forumia-parcours", k);
    try { history.replaceState(null, "", k ? "?parcours=" + k : location.pathname); } catch (e) { /* file:// */ }
    if (k && scroll) {
      var el = document.getElementById("seq-" + D.parcours[k].page);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  chips.addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (b) focus(b.getAttribute("data-k"), true);
  });

  var param = new URLSearchParams(location.search).get("parcours");
  focus((param || F.store("forumia-parcours") || "").toUpperCase(), !!param);

  // Légende des lieux
  document.getElementById("legend").innerHTML = Object.keys(D.lieux).map(function (id) {
    var l = D.lieux[id];
    return "<div><strong>" + esc(l.nom) + "</strong><span>" + esc(l.role) + "</span></div>";
  }).join("");
})();
