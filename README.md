# Site du Forum IA

Ouvrir `index.html` dans un navigateur : aucun serveur n'est nécessaire.

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil |
| `programme.html` | Déroulé interactif (filtre par parcours, détails dépliables) |
| `plan-3d.html` | Plan 3D interactif des espaces (aussi intégré à l’accueil) |
| `mannele.html` | Présentation du Mannele, agent d’accueil IA |
| `sequences/*.html` | Une page par séquence, à rédiger |
| `sequences/_modele.html` | Modèle vierge pour une nouvelle séquence |
| `assets/js/data.js` | **Source unique** : date, lieu, horaires, salles, intervenants, résumés |

## Modifier

- **Horaires, intervenants, salles, date, lieu** → `assets/js/data.js`. Toutes les pages se mettent à jour.
- **Stands de l'Agora de l'IA** (thème, animateur, description, niveau `A`/`B`/`C` qui donne la couleur) → tableau `stands` de la séquence `agora` dans `data.js`.
- **Contenu d'une séquence** (objectif, déroulé) → `sequences/<id>.html`, dans `<article class="prose">`.
  Les passages surlignés en jaune portent `class="todo"` : retirez cette classe une fois le texte rédigé.
- **Ajouter une séquence** : copier `_modele.html` sous `<id>.html`, mettre `data-seq="<id>"` sur `<body>`,
  puis ajouter l'entrée correspondante (même `id`) dans `sequences` de `data.js`.
- **Indicateur « En cours »** : `evenement.date` (`"2026-12-15"`) dans `data.js`, au format AAAA-MM-JJ.
- **Couleurs** : A rouge clair, B jaune, C vert, commun bleu → variables `--pA`, `--pB`, `--pC`, `--pX` de `assets/css/style.css`.

## Pages qui lisent aussi `data.js`

- `plan-3d.html` : programme, salles, niveaux et stands viennent de `data.js`. Ce qui reste propre à la maquette
  (emplacement des espaces, nombre d’emplacements de stands : 6 le long des piliers, 4 près de l’espace écran)
  est en tête de son script, bloc « 1. CONTENU DU FORUM ». Les couleurs de la maquette sont les variables `--z-*`.
- `mannele.html` : les réponses de la conversation (horaires, salles, nombre de stands, lieu de la clôture)
  sont construites depuis `data.js`. Sa feuille de style est une copie de `style.css`, à garder alignée.

## Programme en PDF

Le programme imprimable s’écrit en Markdown dans `outils/programme-forum-ia-2026.md`, puis s’exporte vers
`assets/pdf/programme-forum-ia-2026.pdf` (le fichier proposé au téléchargement sur la page Programme).
Prérequis : Node.js 18 ou plus récent, et Google Chrome ou Microsoft Edge.

```bash
cd outils/export-pdf
npm install          # une seule fois
npm run programme
```

Ce Markdown ne lit pas `data.js` : toute modification du programme doit y être reportée, puis le PDF régénéré.
Voir `outils/export-pdf/README.md` pour les conventions d’écriture.
