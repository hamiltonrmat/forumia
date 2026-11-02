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
    hall:     { nom: "Hall d’entrée",  role: "Accueil, café, stands" },
    pleniere: { nom: "Salle plénière", role: "Ouverture et clôture" },
    salle1:   { nom: "Salle 1",        role: "Parcours A" },
    salle2:   { nom: "Salle 2",        role: "Parcours B" },
    salle3:   { nom: "Salle 3",        role: "Parcours C" }
  },

  parcours: {
    A: {
      nom: "Je découvre",
      niveau: "Niveau débutant : on découvre",
      profil: "Je suis débutant en IA et j’ai envie de l’explorer davantage.",
      format: "Exposé & mini-scène",
      lieu: "salle1",
      page: "parcours-a"
    },
    B: {
      nom: "J’explore",
      niveau: "Niveau intermédiaire : on explore",
      profil: "Je connais l’IA, j’ai envie de l’intégrer dans mon métier mais j’ai besoin de voir des cas pratiques et des témoignages concrets au sein de la Collectivité.",
      format: "Table ronde",
      lieu: "salle2",
      page: "parcours-b"
    },
    C: {
      nom: "Je m’inspire",
      niveau: "Le futur : vers où aller",
      profil: "J’ai confiance dans l’IA, je veux aller plus loin et voir des applications métier inspirantes.",
      format: "Démonstrations & témoignages",
      lieu: "salle3",
      page: "parcours-c"
    }
  },

  creneaux: [
    { id: "accueil",    debut: "08:30", fin: "09:00", titre: "Accueil" },
    { id: "ouverture",  debut: "09:00", fin: "10:00", titre: "Plénière d’ouverture" },
    { id: "transition", debut: "10:00", fin: "10:15", titre: "Changement de salle", pause: true },
    { id: "parcours",   debut: "10:15", fin: "11:00", titre: "Trois parcours au choix" },
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
      id: "introduction", creneau: "ouverture", debut: "09:00", fin: "09:10", lieu: "pleniere",
      titre: "Introduction — vision stratégique IA",
      sousTitre: "Les enjeux de l’IA pour la CeA : dimension interne et usager.",
      resume: "Ouverture officielle du forum et présentation de la vision stratégique de la Collectivité en matière d’IA.",
      intervenants: [
        { nom: "Gabriel GALLAND" },
        { nom: "Élu·e", role: "à confirmer" }
      ]
    },
    {
      id: "ia-exemples", creneau: "ouverture", debut: "09:10", fin: "09:45", lieu: "pleniere",
      titre: "IA : de quoi parle-t-on ?",
      sousTitre: "En quelques exemples.",
      resume: "Une introduction accessible à l’intelligence artificielle, illustrée par des exemples concrets.",
      intervenants: [
        { nom: "Hamilton DE ARAUJO" },
        { nom: "Expert IA externe", role: "à confirmer, capacité de vulgarisation" }
      ]
    },
    {
      id: "deroule", creneau: "ouverture", debut: "09:45", fin: "10:00", lieu: "pleniere",
      titre: "Déroulé de la matinée",
      resume: "Présentation des trois parcours et des salles pour que chacun choisisse le sien.",
      intervenants: [{ nom: "Hamilton DE ARAUJO" }]
    },
    {
      id: "parcours-a", creneau: "parcours", parcours: "A", debut: "10:15", fin: "11:00", lieu: "salle1",
      titre: "Je découvre",
      sousTitre: "« Chapeau de Bonneau » : l’IA, l’utilisateur lambda, le mauvais utilisateur.",
      resume: "Une mini-scène pour démarrer, suivie d’un débrief utile, puis 10 minutes de questions et de démonstration.",
      intervenants: [
        { nom: "David LAGUERRE", role: "Animation" },
        { nom: "Pierre GRAEF", role: "Animation" },
        { nom: "Emilie DISSARD", role: "Animation" }
      ],
      livrable: "Compte rendu au format PPT généré par IA"
    },
    {
      id: "parcours-b", creneau: "parcours", parcours: "B", debut: "10:15", fin: "11:00", lieu: "salle2",
      titre: "J’explore",
      sousTitre: "Table ronde : l’IA dans la CeA.",
      resume: "Trois profils d’agents témoignent de leurs usages réels de l’IA, du quotidien aux usages avancés.",
      intervenants: [
        { nom: "Hamilton DE ARAUJO", role: "Médiation" },
        { nom: "Intervenant 1", role: "Agent à l’aise avec l’IA générative pour des tâches quotidiennes" },
        { nom: "Lucas DELAGREE", role: "Référent TNS / OCR" },
        { nom: "Intervenant 3", role: "Utilisateur avancé : COM / DSI" }
      ],
      livrable: "Compte rendu au format PPT généré par IA"
    },
    {
      id: "parcours-c", creneau: "parcours", parcours: "C", debut: "10:15", fin: "11:00", lieu: "salle3",
      titre: "Je m’inspire",
      sousTitre: "Démonstrations & témoignages.",
      resume: "Trois démonstrations en direct : un outil simple à effet « wow », un outil métier à vraie valeur ajoutée, un outil qui fait rêver.",
      intervenants: [{ nom: "Gabriel GALLAND", role: "Médiation" }]
    },
    {
      id: "agora", creneau: "agora", debut: "11:00", fin: "12:00", lieu: "hall",
      titre: "L’Agora de l’IA",
      sousTitre: "Échanges, ateliers et démonstrations.",
      lien: "L’Agora de l’IA : échanges, ateliers et démonstrations",
      resume: "Chacun circule librement entre sept stands de démonstration et d’échange, quel que soit son parcours de 10h15.",
      intervenants: [],
      // niveau : "A" Je découvre · "B" J'explore · "C" Je m'inspire (donne la couleur du stand)
      // Répartition provisoire, à ajuster.
      stands: [
        { numero: 1, niveau: "A", titre: "Thème à définir", animateur: "À confirmer", description: "" },
        { numero: 2, niveau: "A", titre: "Thème à définir", animateur: "À confirmer", description: "" },
        { numero: 3, niveau: "B", titre: "Thème à définir", animateur: "À confirmer", description: "" },
        { numero: 4, niveau: "B", titre: "Thème à définir", animateur: "À confirmer", description: "" },
        { numero: 5, niveau: "B", titre: "Thème à définir", animateur: "À confirmer", description: "" },
        { numero: 6, niveau: "C", titre: "Thème à définir", animateur: "À confirmer", description: "" },
        { numero: 7, niveau: "C", titre: "Thème à définir", animateur: "À confirmer", description: "" }
      ]
    },
    {
      id: "adoptez-ia", creneau: "cloture", debut: "12:00", fin: "12:20", lieu: "pleniere",
      titre: "Adoptez l’IA dans votre quotidien",
      resume: "Des repères concrets pour utiliser l’IA dès demain dans son travail.",
      intervenants: [{ nom: "Hamilton DE ARAUJO" }]
    },
    {
      id: "mot-de-fin", creneau: "cloture", debut: "12:20", fin: "12:30", lieu: "pleniere",
      titre: "Mot de fin",
      sousTitre: "Ambition et prochaines actions en matière d’IA.",
      resume: "Clôture du forum : l’ambition de la Collectivité et les prochaines étapes.",
      intervenants: [{ nom: "Gabriel GALLAND" }]
    }
  ]
};
