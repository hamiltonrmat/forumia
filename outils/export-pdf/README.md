# Export PDF des documents Markdown

Transforme un fichier `.md` en PDF A4 aux couleurs du Forum IA. Aucun LaTeX n’est nécessaire : le PDF est imprimé par Chrome ou Edge.

Prérequis : [Node.js](https://nodejs.org) 18 ou plus récent, et Google Chrome ou Microsoft Edge.

## Utilisation

```bash
cd export-pdf
npm install                       # une seule fois
npm run programme                 # outils/programme-forum-ia-2026.md → assets/pdf/programme-forum-ia-2026.pdf
                                  #   (fichier proposé au téléchargement sur la page Programme du site)
node export.mjs ../mon-doc.md     # n’importe quel autre document → ../mon-doc.pdf (à côté du .md)
node export.mjs ../mon-doc.md --garder-html   # garde l’aperçu HTML pour ajuster la mise en page
```

Si Chrome ou Edge n’est pas trouvé : `CHROME="/chemin/vers/chrome" node export.mjs …`

## Conventions d’écriture

**En-tête** (facultatif) : s’il contient `titre`, une page de couverture est générée.

```yaml
---
titre: Forum IA
edition: 2026
surtitre: Programme            # petit texte rouge au-dessus du titre
accroche: Une phrase d’introduction.
organisateur: Collectivité européenne d’Alsace
date: Mardi 15 décembre 2026
horaires: 8h30 – 12h30
lieu: Hôtel d’Alsace, Strasbourg
logo: ../assets/img/logo-cea.png    # chemin relatif au fichier .md
pied: Forum IA 2026 · Programme      # texte en bas de chaque page
---
```

**Titres**
- `# Titre` : grande section ; à partir de la deuxième, elle commence sur une nouvelle page.
- `## 9h – 10h · Titre` : créneau horaire, avec l’heure dans la colonne de gauche. Les créneaux alimentent aussi la frise « La matinée en un coup d’œil » de la couverture.
- `###` et `####` : sous-titres (le `####` s’affiche en petites capitales grises).

**Couleurs de niveau** : `[A]`, `[B]`, `[C]` ou `[commun]` en début de puce, de titre ou de cellule de tableau.

```markdown
- [A] **01** Thème du stand
| [B] **Je m’inspire** | … |
```

**Blocs** : encadrer du texte par `::: nom` et `:::` (avec des lignes vides autour).

| Bloc | Effet |
|---|---|
| `::: parcours-a` / `parcours-b` / `parcours-c` | encadré coloré A (rouge clair), B (jaune), C (vert) |
| `::: commun` | encadré bleu |
| `::: note` | encadré gris neutre |
| `::: colonnes` | met les blocs qu’il contient côte à côte (3 colonnes) ; ce créneau commence sur une nouvelle page |
| `::: stands` | transforme une liste en grille de cartes de stands |

Retour à la ligne forcé dans un paragraphe ou un tableau : `<br>`.

La mise en page se règle dans `style-pdf.css`.
