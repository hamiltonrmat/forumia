# Site du Forum IA

Ouvrir `index.html` dans un navigateur : aucun serveur n'est nécessaire.

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil |
| `programme.html` | Déroulé interactif (filtre par parcours, détails dépliables) |
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
- **Indicateur « En cours »** : renseigner `evenement.date` (ex. `"2026-12-03"`) dans `data.js`.
