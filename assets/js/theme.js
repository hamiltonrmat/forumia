/* Forum IA — vue claire / vue sombre.
 * Chargé dans le <head> de chaque page (avant l'affichage, pour éviter un clignotement).
 * Par défaut, le site suit le réglage de l'ordinateur ; un clic sur un bouton [data-theme-toggle]
 * impose la vue claire ou sombre et la mémorise dans ce navigateur.
 * Les autres pages ouvertes (et le plan 3D intégré à l'accueil) suivent le changement. */
(function () {
  var CLE = "forumia-theme";
  var racine = document.documentElement;
  var systeme = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function lire() { try { return localStorage.getItem(CLE); } catch (e) { return null; } }
  function ecrire(t) { try { localStorage.setItem(CLE, t); } catch (e) { /* stockage indisponible */ } }
  function appliquer(t) {
    if (t === "light" || t === "dark") racine.setAttribute("data-theme", t);
    else racine.removeAttribute("data-theme");
  }
  function actuel() {
    return racine.getAttribute("data-theme") || (systeme && systeme.matches ? "dark" : "light");
  }
  function majBoutons() {
    var sombre = actuel() === "dark";
    var libelle = sombre ? "Passer en vue claire" : "Passer en vue sombre";
    var boutons = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < boutons.length; i++) {
      boutons[i].setAttribute("aria-pressed", String(sombre));
      boutons[i].setAttribute("aria-label", libelle);
      boutons[i].title = libelle;
    }
  }
  function basculer() {
    var t = actuel() === "dark" ? "light" : "dark";
    ecrire(t); appliquer(t); majBoutons();
  }

  appliquer(lire());

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-theme-toggle]");
    if (b) basculer();
  });
  window.addEventListener("storage", function (e) {
    if (e.key === CLE) { appliquer(e.newValue); majBoutons(); }
  });
  if (systeme && systeme.addEventListener) systeme.addEventListener("change", majBoutons);
  document.addEventListener("DOMContentLoaded", majBoutons);

  // Bouton prêt à insérer (utilisé par layout.js et les pages à en-tête propre)
  window.ForumTheme = {
    basculer: basculer, actuel: actuel, maj: majBoutons,
    bouton: '<button class="theme-toggle" type="button" data-theme-toggle aria-pressed="false" aria-label="Changer de vue">' +
      '<svg class="i-lune" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>' +
      '<svg class="i-soleil" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/>' +
      '<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
    "</button>"
  };
})();
