  const methodesLabels = {
    en_ligne: "Sites en ligne",
    pdf: "PDF / Documents",
    cours_classe: "Cours en classe",
  };
  const exerciceLabels = {
    epreuves: "Épreuves pratiques",
    qcm: "QCM",
    tuteur: "Apprendre avec un tuteur",
  };
  const filieresDictionnaire = {
    sciences_exactes: [
      "Mathématiques", "Physique", "Chimie", "Informatique", "Génie civil",
      "Génie électrique", "Génie mécanique", "Statistiques", "Biologie",
    ],
    sciences_humaines: [
      "Droit", "Sociologie", "Psychologie", "Histoire", "Géographie",
      "Philosophie", "Linguistique", "Sciences politiques", "Communication",
    ],
    gestion_commerce: [
      "Comptabilité", "Finance", "Marketing", "Management", "Commerce international",
      "Ressources humaines", "Audit", "Banque & Assurance", "Entrepreneuriat",
    ],
    sante_medical: [
      "Médecine générale", "Pharmacie", "Chirurgie dentaire", "Infirmerie",
      "Sage-femme", "Kinésithérapie", "Biologie médicale", "Santé publique",
    ],
    arts_design: [
      "Architecture", "Design graphique", "Arts plastiques", "Mode & Stylisme",
      "Audiovisuel", "Musique", "Animation 3D", "Photographie",
    ],
  };

  const diplomesEntree = [
    "Aucun diplôme officiel",
    "BEPC / CAP",
    "Baccalauréat",
    "Diplôme de l'enseignement supérieur (Licence, DUT, BTS, ou équivalent Bac+2/Bac+3)",
    "Diplôme de troisième cycle (Master, Doctorat, DEA, DESS, ou équivalent Bac+5 et plus)",
  ];

  const filieresCategoriesLabels = {
    sciences_exactes: "Sciences exactes & Ingénierie",
    sciences_humaines: "Sciences humaines & Sociales",
    gestion_commerce: "Gestion & Commerce",
    sante_medical: "Santé & Médical",
    arts_design: "Arts & Design",
  };


export { methodesLabels, exerciceLabels, filieresDictionnaire, diplomesEntree, filieresCategoriesLabels };