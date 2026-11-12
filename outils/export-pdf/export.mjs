#!/usr/bin/env node
/*
 * Forum IA — export Markdown → PDF
 *
 *   node export.mjs <fichier.md> [sortie.pdf]
 *   npm run programme            (exporte ../programme-forum-ia-2026.md)
 *
 * Le PDF est imprimé par Chrome ou Edge en mode « headless » (aucun LaTeX nécessaire).
 * Mise en page : style-pdf.css. Conventions Markdown : voir README.md de ce dossier.
 */
import { readFileSync, writeFileSync, existsSync, unlinkSync, mkdirSync } from "node:fs";
import { dirname, resolve, basename, join } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { marked } from "marked";

const ici = dirname(fileURLToPath(import.meta.url));
const options = process.argv.slice(2).filter((a) => a.startsWith("--"));
const [entree, sortieArg] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (!entree) {
  console.error("Usage : node export.mjs <fichier.md> [sortie.pdf]");
  process.exit(1);
}
const mdPath = resolve(entree);
const pdfPath = resolve(sortieArg || mdPath.replace(/\.md$/i, ".pdf"));
const source = readFileSync(mdPath, "utf8");

/* ---------- 1. En-tête YAML simple (clé: valeur) ---------- */
const meta = {};
let corps = source;
const fm = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(source);
if (fm) {
  corps = source.slice(fm[0].length);
  for (const ligne of fm[1].split(/\r?\n/)) {
    const m = /^([\w-]+)\s*:\s*(.*)$/.exec(ligne);
    if (m) meta[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/* ---------- 2. Blocs colorés  ::: classe  …  ::: ---------- */
corps = corps
  .split(/\r?\n/)
  .map((l) => {
    const m = /^:::\s*([\w -]+?)\s*$/.exec(l);
    if (m) return `\n<div class="bloc ${esc(m[1])}">\n`;
    if (/^:::\s*$/.test(l)) return "\n</div>\n";
    return l;
  })
  .join("\n");

/* ---------- 3. Markdown → HTML ---------- */
let html = marked.parse(corps, { gfm: true });

// Titres de créneau « ## 8h30 – 9h · Titre » : le créneau et son contenu (jusqu’au titre
// suivant de niveau 1 ou 2) forment un bloc, avec l’heure dans une colonne à gauche.
html = html.split(/(?=<h[12][ >])/).map((morceau) => {
  const m = /^<h2>([^<·]*?\d+h\d*[^<·]*?)\s*·\s*([\s\S]*?)<\/h2>/.exec(morceau);
  if (!m) return morceau;
  return '<section class="creneau"><div class="heure">' + m[1] + "</div>" +
    '<div class="corps"><h2>' + m[2] + "</h2>" + morceau.slice(m[0].length) + "</div></section>";
}).join("");
// Repères de niveau en début d’élément : [A] [B] [C] [commun]
const niv = (n) => "niv-" + n.toLowerCase();
html = html
  .replace(/<li>\s*\[(A|B|C|commun)\]\s*/g, (_, n) => `<li class="${niv(n)}">`)
  .replace(/<(h[2-4])>\s*\[(A|B|C|commun)\]\s*/g, (_, h, n) => `<${h} class="${niv(n)}">`)
  .replace(/<td>\s*\[(A|B|C|commun)\]\s*/g, (_, n) => `<td><span class="pastille ${niv(n)}"></span>`);

/* ---------- 4. Couverture (si l’en-tête YAML a un titre) ---------- */
const creneaux = [...corps.matchAll(/^##\s+([^\n·]*?\d+h\d*[^\n·]*?)\s*·\s*(.+)$/gm)]
  .map((m) => ({ heure: m[1].split(/\s*[–-]\s*/)[0], titre: m[2].replace(/[*_]/g, "") }));

const couverture = meta.titre ? `
<section class="couverture">
  <svg class="ornement" viewBox="0 0 200 200" aria-hidden="true">
    <g fill="none" stroke-width="1.1">
      <circle cx="100" cy="78" r="52" stroke="var(--pA)"/>
      <circle cx="80" cy="113" r="52" stroke="var(--pB)"/>
      <circle cx="120" cy="113" r="52" stroke="var(--pC)"/>
    </g>
    <circle cx="100" cy="101" r="3.2" fill="var(--pX)"/>
  </svg>
  <header>
    ${meta.logo ? `<img class="logo" src="${esc(meta.logo)}" alt="">` : ""}
    ${meta.organisateur ? `<p class="surtitre">${esc(meta.organisateur)}</p>` : ""}
  </header>
  <div class="titraille">
    ${meta.surtitre ? `<p class="surtitre accent">${esc(meta.surtitre)}</p>` : ""}
    <h1>${esc(meta.titre).replace(/IA$/, "<em>IA</em>")}${meta.edition ? `<span class="edition">${esc(meta.edition)}</span>` : ""}</h1>
    ${meta.accroche ? `<p class="accroche">${esc(meta.accroche)}</p>` : ""}
  </div>
  <dl class="infos">
    ${["date", "horaires", "lieu"].filter((k) => meta[k]).map((k) =>
      `<div><dt>${k[0].toUpperCase() + k.slice(1)}</dt><dd>${esc(meta[k])}</dd></div>`).join("")}
  </dl>
  ${creneaux.length > 1 ? `
  <div class="apercu">
    <p class="surtitre">La matinée en un coup d’œil</p>
    <ol>${creneaux.map((c) => `<li><span class="h">${esc(c.heure)}</span><span class="t">${esc(c.titre)}</span></li>`).join("")}</ol>
  </div>` : ""}
  ${meta.contact ? `<p class="contact">${esc(meta.contact)}</p>` : ""}
</section>` : "";

/* ---------- 5. Page HTML complète ---------- */
const pied = meta.pied || [meta.titre, meta.edition].filter(Boolean).join(" ") || basename(mdPath, ".md");
const css = readFileSync(join(ici, "style-pdf.css"), "utf8").replace("__PIED__", pied.replace(/"/g, '\\"'));
const page = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<base href="${pathToFileURL(dirname(mdPath) + "/").href}">
<title>${esc(pied)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..500;1,9..144,300..500&family=Inter:wght@400;500;600&display=block" rel="stylesheet">
<style>${css}</style>
</head>
<body>
${couverture}
<main class="contenu">
${html}
</main>
</body>
</html>`;

mkdirSync(dirname(pdfPath), { recursive: true });
const htmlPath = pdfPath.replace(/\.pdf$/i, ".apercu.html");
writeFileSync(htmlPath, page);

/* ---------- 6. Impression PDF par Chrome / Edge ---------- */
const candidats = [
  process.env.CHROME,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/microsoft-edge"
].filter(Boolean);
const navigateur = candidats.find((p) => existsSync(p));
if (!navigateur) {
  console.error("Chrome ou Edge introuvable. Indiquez son chemin : CHROME=/chemin/vers/chrome node export.mjs …");
  console.error("Aperçu HTML conservé : " + htmlPath);
  process.exit(1);
}
execFileSync(navigateur, [
  "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
  "--virtual-time-budget=8000", "--run-all-compositor-stages-before-draw",
  `--print-to-pdf=${pdfPath}`, pathToFileURL(htmlPath).href
], { stdio: "ignore" });

if (options.includes("--garder-html")) console.log("Aperçu HTML : " + htmlPath);
else unlinkSync(htmlPath);
console.log("PDF créé : " + pdfPath);
