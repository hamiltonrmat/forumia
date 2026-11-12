/*
 * Forum IA — source unique des données du programme.
 * Modifiez ce fichier pour changer horaires, salles, intervenants ou résumés :
 * l'accueil, le programme et les en-têtes des pages séquence se mettent à jour seuls.
 * Le contenu détaillé de chaque séquence se rédige dans sequences/<page>.html.
 */
window.FORUM = {
  evenement: {
    titre: "Forum IA",
    edition: "2026",
    organisateur: "Collectivité européenne d’Alsace",
    accroche: "Comprendre, explorer, s’inspirer : une matinée pour faire entrer l’intelligence artificielle dans nos métiers.",
    date: null,               // format "2026-12-03" : active l’indicateur « en cours » le jour J
    dateLabel: "15 décembre 2026",
    horaires: "8h30 – 12h30",
    lieu: "Hôtel d'Alsace, Strasbourg",
    contact: "Direction de la transformation, data & IA"
  },

  lieux: {
    hall:       { nom: "Hall d’entrée",  role: "Accueil, café, stands, Agora de l'IA" },
    pleniere:   { nom: "Salle plénière", role: "Ouverture et clôture" },
    salleA:     { nom: "Salle 1006/1007", role: "Parcours A : Je découvre" },
    salleB:     { nom: "Salle 1005",      role: "Parcours B : Je m’inspire" },
    espaceHall: { nom: "Espace écran dans le hall", role: "Parcours C : Je me projette" }
  },

  parcours: {
    A: {
      nom: "Je découvre",
      niveau: "Pas d’IA",
      profil: "Je suis débutant en IA et j’ai envie de l’explorer davantage.",
      format: "3 situations : Scène → Débat → Apport théorique + conclusion participative",
      lieu: "salleA",
      page: "parcours-a"
    },
    B: {
      nom: "Je m’inspire",
      niveau: "Le présent : on le fait déjà",
      profil: "Je connais l’IA, j’ai envie de l’intégrer dans ma mission mais je souhaiterais voir des cas pratiques, témoignages concrets existants dans la Collectivité.",
      format: "Table ronde : l’IA dans la CeA",
      lieu: "salleB",
      page: "parcours-b"
    },
    C: {
      nom: "Je me projette",
      niveau: "Le futur : vers où aller",
      profil: "J’ai confiance dans l’IA, je veux me projeter et exploiter de nouvelles possibilités.",
      format: "L’émission du futur : Simuler (Voir avant d’agir) · Anticiper (Agir avant que le problème n’arrive) · Augmenter (Des agents aux nouvelles capacités)",
      lieu: "espaceHall",
      page: "parcours-c"
    }
  },

  creneaux: [
    { id: "accueil",    debut: "08:30", fin: "09:00", titre: "Accueil café & enregistrement" },
    { id: "ouverture",  debut: "09:00", fin: "10:00", titre: "Plénière d’ouverture" },
    { id: "transition", debut: "10:00", fin: "10:10", titre: "Changement de salle", pause: true },
    { id: "parcours",   debut: "10:10", fin: "11:00", titre: "Trois parcours au choix" },
    { id: "agora",      debut: "11:00", fin: "12:00", titre: "L’Agora de l’IA" },
    { id: "cloture",    debut: "12:00", fin: "12:30", titre: "Plénière de clôture" }
  ],

  sequences: [
    {
      id: "accueil", creneau: "accueil", debut: "08:30", fin: "09:00", lieu: "hall",
      titre: "Accueil café & enregistrement",
      resume: "Accueil des participants autour d’un café, enregistrement et remise des badges.",
      lien: "Infos d’enregistrement",
      intervenants: []
    },
    {
      id: "mot-bienvenue", creneau: "ouverture", debut: "09:00", fin: "09:05", lieu: "pleniere",
      titre: "Mot de bienvenue",
      sousTitre: "L’ambition de la CeA en termes d’IA : Proximité, Efficacité et Simplicité",
      resume: "Ouverture officielle du forum par Gabriel GALLAND et un·e élu·e.",
      intervenants: [
        { nom: "Gabriel GALLAND" },
        { nom: "Élu·e", role: "à confirmer" }
      ]
    },
    {
      id: "ia-de-quoi-parle-t-on", creneau: "ouverture", debut: "09:05", fin: "09:55", lieu: "pleniere",
      titre: "IA : de quoi parle-t-on ?",
      sousTitre: "Le délégué à l’IA CeA interroge un expert reconnu sur le sujet",
      resume: "Une introduction accessible à l’intelligence artificielle, illustrée par des exemples concrets.",
      intervenants: [
        { nom: "Hamilton DE ARAUJO" },
        { nom: "Germain FORESTIER (UHA)", role: "Expert IA" }
      ]
    },
    {
      id: "deroule", creneau: "ouverture", debut: "09:55", fin: "10:00", lieu: "pleniere",
      titre: "Déroulé de la journée",
      resume: "Présentation du programme de la matinée.",
      intervenants: [{ nom: "Hamilton DE ARAUJO" }]
    },
    {
      id: "parcours-a", creneau: "parcours", parcours: "A", debut: "10:10", fin: "11:00", lieu: "salleA",
      titre: "Le SAV de l’IA",
      sousTitre: "Découvrir et comprendre les principaux sujets liés à l’utilisation de l’IA générative",
      resume: "3 situations sous format : Scène → Débat → Apport théorique, suivies d’une conclusion participative avec le public.",
      intervenants: [
        { nom: "Pierre GRAEF", role: "Animation" },
        { nom: "Emilie D", role: "IA" },
        { nom: "Benoit F", role: "SAV" }
      ],
      livrable: "CR en format PPT généré par IA"
    },
    {
      id: "parcours-b", creneau: "parcours", parcours: "B", debut: "10:10", fin: "11:00", lieu: "salleB",
      titre: "Table ronde - l’IA dans la CeA",
      sousTitre: "Échanges avec des agents utilisant déjà l’IA dans leur métier",
      resume: "Agent bien à l’aise avec l’IA générative pour des tâches quotidiennes (Licences Copilot) · Projet OCR Solidarités · Une IA a produit presque une de nos applications (DSIN).",
      intervenants: [
        { nom: "Hamilton DE ARAUJO", role: "Médiation" },
        { nom: "Lucas DELAGREE" },
        { nom: "Romain WIESER" }
      ],
      livrable: "CR en format PPT généré par IA"
    },
    {
      id: "parcours-c", creneau: "parcours", parcours: "C", debut: "10:10", fin: "11:00", lieu: "espaceHall",
      titre: "L’émission du futur",
      sousTitre: "Trois visions du service public alsacien de 2030",
      resume: "Simuler (Voir avant d’agir) · Anticiper (Agir avant que le problème n’arrive) · Augmenter (Des agents aux nouvelles capacités).",
      intervenants: [
        { nom: "Gabriel GALLAND ou Stéphanie MENIGOZ", role: "Médiation" }
      ]
    },
    {
      id: "agora", creneau: "agora", debut: "11:00", fin: "12:00", lieu: "hall",
      titre: "L’Agora de l’IA",
      sousTitre: "Séquence libre : ateliers, démonstrations et échanges autour d’un café",
      lien: "L’Agora de l’IA : échanges, ateliers et démonstrations",
      resume: "Séquence libre dans le hall d’entrée (indépendante du choix de parcours). Ateliers, démonstrations et échanges autour d’un café.",
      intervenants: [],
      stands: [
        { numero: 1, niveau: "A", titre: "À définir", animateur: "À confirmer", description: "Stand pour les débutants en IA" },
        { numero: 2, niveau: "A", titre: "À définir", animateur: "À confirmer", description: "Stand pour les débutants en IA" },
        { numero: 3, niveau: "B", titre: "À définir", animateur: "À confirmer", description: "Stand pour ceux qui veulent s’inspirer" },
        { numero: 4, niveau: "B", titre: "À définir", animateur: "À confirmer", description: "Stand pour ceux qui veulent s’inspirer" },
        { numero: 5, niveau: "B", titre: "À définir", animateur: "À confirmer", description: "Stand pour ceux qui veulent s’inspirer" },
        { numero: 6, niveau: "C", titre: "À définir", animateur: "À confirmer", description: "Stand pour ceux qui veulent se projeter" },
        { numero: 7, niveau: "C", titre: "À définir", animateur: "À confirmer", description: "Stand pour ceux qui veulent se projeter" },
        { numero: 8, titre: "Stand Café", animateur: "", description: "Espace détente et échanges informels" }
      ]
    },
    {
      id: "adoptez-ia", creneau: "cloture", debut: "12:00", fin: "12:20", lieu: "pleniere",
      titre: "Adoptez l’IA dans votre quotidien",
      sousTitre: "Les outils et ressources de la CeA",
      resume: "Des repères concrets pour utiliser l’IA dès demain dans son travail, avec les outils et ressources disponibles au sein de la Collectivité.",
      intervenants: [{ nom: "Hamilton DE ARAUJO" }]
    },
    {
      id: "mot-de-fin", creneau: "cloture", debut: "12:20", fin: "12:30", lieu: "pleniere",
      titre: "Mot de fin",
      sousTitre: "Ambition et prochaines actions en matière d’IA",
      resume: "Clôture du forum : retour sur l’ambition de la Collectivité en termes d’IA (Proximité, Efficacité, Simplicité) et présentation des prochaines actions.",
      intervenants: [{ nom: "Gabriel GALLAND" }]
    }
  ]
};
