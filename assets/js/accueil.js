/* Forum IA — page d'accueil : rendu à partir de data.js */
(function () {
  var D = window.FORUM, ev = D.evenement, esc = F.esc;

  document.getElementById("hero-org").textContent = ev.organisateur;
  document.getElementById("hero-title").innerHTML =
    esc(ev.titre).replace(/IA$/, "<em>IA</em>") + '<span class="ed">' + esc(ev.edition) + "</span>";
  document.getElementById("hero-lede").textContent = ev.accroche;
  document.getElementById("hero-meta").innerHTML = [
    ["Date", ev.dateLabel], ["Horaires", ev.horaires], ["Lieu", ev.lieu]
  ].map(function (m) { return "<div><dt>" + m[0] + "</dt><dd>" + esc(m[1]) + "</dd></div>"; }).join("");

  // Frise : un point par créneau (hors transitions)
  document.getElementById("glance").innerHTML = D.creneaux.filter(function (c) { return !c.pause; }).map(function (c) {
    var seqs = D.sequences.filter(function (s) { return s.creneau === c.id; });
    var lieux = seqs.map(function (s) { return F.lieu(s.lieu); })
      .filter(function (l, i, a) { return a.indexOf(l) === i; });
    var detail = c.id === "parcours" ? "Salles 1, 2 et 3" : lieux.join(", ");
    return '<li class="' + (c.id === "parcours" ? "split" : "") + '">' +
      '<span class="t">' + F.heure(c.debut) + "</span>" +
      '<span class="n">' + esc(c.titre) + "</span>" +
      '<span class="l">' + esc(detail) + "</span></li>";
  }).join("");

  // Cartes parcours
  document.getElementById("paths").innerHTML = Object.keys(D.parcours).map(function (k, i) {
    var p = D.parcours[k], s = F.seq(p.page);
    return '<a class="path reveal" style="transition-delay:' + i * 90 + 'ms" data-p="' + k + '" href="' + F.seqUrl(p.page) + '">' +
      '<span class="path-letter">' + k + "</span>" +
      "<h3>" + esc(p.nom) + "</h3>" +
      '<p class="niveau">' + esc(p.niveau) + "</p>" +
      "<blockquote>« " + esc(p.profil) + " »</blockquote>" +
      "<dl><dt>Format</dt><dd>" + esc(p.format) + "</dd>" +
      "<dt>Salle</dt><dd>" + esc(F.lieu(p.lieu)) + "</dd>" +
      "<dt>Horaire</dt><dd>" + F.heure(s.debut) + " – " + F.heure(s.fin) + "</dd></dl>" +
      '<span class="more">Voir la séquence <span class="arrow" aria-hidden="true">→</span></span>' +
      "</a>";
  }).join("");

  // Infos pratiques
  document.getElementById("infos-grid").innerHTML = [
    ["Accueil", "Café d’accueil et enregistrement dès " + F.heure(D.creneaux[0].debut) + ", dans le " + F.lieu("hall").toLowerCase() + "."],
    ["Lieu", ev.lieu + ". Plénière, salles 1 à 3 et stands sont regroupés sur le même site."],
    ["Contact", ev.contact + "."]
  ].map(function (b) { return "<div><h3>" + b[0] + "</h3><p>" + esc(b[1]) + "</p></div>"; }).join("");
})();
