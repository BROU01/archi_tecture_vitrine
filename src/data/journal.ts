export type JournalEntry = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  category: "chantier" | "matière" | "lieu" | "pièce";
  image: string;
  content: string[];
};

export const journalEntries: JournalEntry[] = [
  {
    id: "ombre-terre",
    date: "2024-09-15",
    title: "L'ombre comme matériau",
    category: "chantier",
    excerpt: "À la Maison Latérite, nous avons appris que l'ombre peut se construire. Un mur épais, un seul percement — et la fraîcheur tient sans climatisation.",
    image: "/media/facade.jpg",
    content: [
      "Sur les collines de Kpalimé, la maison se présente comme un mur. La latérite est damée en couches lisibles, le brise-soleil d'iroko rythme la hauteur.",
      "On entre par le côté, jamais de face. Dedans, la fraîcheur tient sans climatisation forcée. L'ombre n'est pas un accident, c'est le matériau principal.",
      "Le client nous a demandé une maison qui respire. Nous avons répondu par un mur qui cache tout, et révèle tout à l'intérieur.",
    ],
  },
  {
    id: "iroko-vapeur",
    date: "2024-08-22",
    title: "Le fauteuil Koro, courbé à la vapeur",
    category: "pièce",
    excerpt: "Comment nous cintrons l'iroko à la vapeur pour créer la coque du fauteuil Koro. Une technique ancienne, un résultat contemporain.",
    image: "/media/fauteuil.jpg",
    content: [
      "Le fauteuil Koro commence par une planche d'iroko massif. Nous la plaçons dans un moule, puis nous injectons de la vapeur sous pression.",
      "Le bois plie sans casser. La courbe se fige. Refroidi, il garde la forme. C'est une technique que nous avons apprise des ébénistes de Lomé.",
      "Chaque fauteuil est unique. La veine du bois suit la courbe, et la lumière ne rencontre jamais deux fois la même surface.",
    ],
  },
  {
    id: "travertin-pores",
    date: "2024-07-10",
    title: "Pourquoi nous ne vernissons jamais le travertin",
    category: "matière",
    excerpt: "Le travertin de la table Courbe garde ses pores ouverts. Nous refusons le vernis brillant qui étouffe la pierre.",
    image: "/media/appartement.jpg",
    content: [
      "La table Courbe est en travertin clair. Nous laissons les pores ouverts, jamais de vernis brillant. La pierre respire, la lumière la traverse.",
      "Chaque bloc diffère. L'oval est irrégulier, comme la nature. C'est ce que nous cherchons : une pièce qui ne ressemble à aucune autre.",
      "Le client à Paris voulait une table parfaite. Nous lui avons proposé une table vivante. Il a compris.",
    ],
  },
  {
    id: "bassin-immobile",
    date: "2024-05-03",
    title: "Le bassin immobile du Jardin des Ombres",
    category: "lieu",
    excerpt: "À Cotonou, nous avons refusé la pelouse. Le sol se lit, se balaye, se traverse lentement. L'eau ne bouge pas.",
    image: "/media/jardin.jpg",
    content: [
      "Le jardin précède la maison. Un bassin immobile, des pas japonais, des sujets taillés pour que le soleil n'entre qu'en biais.",
      "Nous avons refusé la pelouse. Le sol se lit, se balaye, se traverse lentement. C'est un jardin pour marcher pieds nus.",
      "Le matin, le bassin reflète le ciel. Le soir, il reflète les lanternes. L'eau ne bouge jamais, et c'est là sa force.",
    ],
  },
  {
    id: "suite-sable",
    date: "2024-03-18",
    title: "La Suite Sable : une chambre presque muette",
    category: "chantier",
    excerpt: "À l'Hôtel Lagune, la Suite Sable ne garde qu'un lit, un enduit et une ligne de soleil. Le reste a été retiré jusqu'au silence.",
    image: "/media/chambre.jpg",
    content: [
      "L'accueil est une table de travertin trop longue pour être pressée. Les suspensions en fibre descendent bas, pour que la voix reste près du sol.",
      "À l'étage, la Suite Sable ne garde qu'un lit, un enduit et une ligne de soleil. Nous avons retiré tout le reste jusqu'au silence.",
      "Les clients dorment mieux quand il n'y a rien à regarder. La chambre devient un refuge, pas un décor.",
    ],
  },
];
