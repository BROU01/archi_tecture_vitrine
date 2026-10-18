export type Tag = "Intérieur" | "Extérieur" | "Paysage";

export type Frame = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Project = {
  id: string;
  index: string;
  title: string;
  place: string;
  year: string;
  tags: Tag[];
  ratio: "land" | "portrait" | "video";
  span: "5" | "7" | "12";
  surface: string;
  excerpt: string;
  story: string;
  materials: string[];
  frames: Frame[];
};

export type Piece = {
  id: string;
  index: string;
  title: string;
  lieu: string;
  material: string;
  dims: string;
  price: string;
  delay: string;
  note: string;
  src: string;
  alt: string;
  fit: "cover" | "contain";
  position: "center" | "top" | "bottom";
};

export const press = [
  "Revue Matière",
  "Casa Afrique",
  "Volume",
  "Climat & Forme",
  "Atelier Mag",
];

export const quotes = [
  {
    text: "Ils ont compris le climat avant le dessin. La maison respire, et le soir le laiton prend exactement la lumière qu’on avait nommée.",
    name: "Awa Mensah",
    role: "Hôtel Lagune, Aného",
  },
  {
    text: "Un intérieur parisien qui n’imite rien. La pierre vient du golfe, la lumière reste celle de la rue.",
    name: "Hélène Caron",
    role: "Appartement Rivoli",
  },
  {
    text: "Le jardin est devenu la pièce principale. On y entre pieds nus, et la maison se tait.",
    name: "Kojo Adewale",
    role: "Villa Palmier, Lomé",
  },
];

export const stats = [
  { value: 86, label: "projets livrés" },
  { value: 14, label: "années d’atelier" },
  { value: 28, label: "pièces éditées" },
  { value: 4, label: "pays" },
];

export const services = [
  {
    index: "01",
    title: "Architecture intérieure",
    text: "Distribution, lumière, mobilier intégré. Chaque pièce a une heure juste.",
  },
  {
    index: "02",
    title: "Architecture extérieure",
    text: "Volumes bas, seuils profonds, toitures qui portent l’ombre avant le décor.",
  },
  {
    index: "03",
    title: "Paysage",
    text: "Cours, bassins, graviers, sujets taillés. Le dehors comme une pièce de plus.",
  },
  {
    index: "04",
    title: "Pièces signature",
    text: "Une ligne éditée à l’atelier, en petites séries, pour les lieux que nous dessinons.",
  },
];

export const steps = [
  {
    index: "01",
    title: "Écoute",
    text: "Le site, le climat, les gestes déjà là. Rien ne se dessine avant.",
  },
  {
    index: "02",
    title: "Matière",
    text: "Échantillons, maquettes, un mur d’essai. La lumière se vérifie, elle ne s’imagine pas.",
  },
  {
    index: "03",
    title: "Chantier",
    text: "Suivi d’atelier et de site. Peu d’intervenants, des détails tenus jusqu’au bout.",
  },
  {
    index: "04",
    title: "Transmission",
    text: "Le lieu se vit. Les pièces restent, entretenues, parfois rééditées.",
  },
];

export const projects: Project[] = [
  {
    id: "villa-palmier",
    index: "01",
    title: "Villa Palmier",
    place: "Lomé",
    year: "2024",
    tags: ["Extérieur", "Intérieur"],
    ratio: "land",
    span: "7",
    surface: "420 m²",
    excerpt: "Une maison basse ouverte sur une cour d’eau. Le salon regarde les palmes, pas la rue.",
    story:
      "La villa s’étire à l’horizontale, sous un débord de bois qui coupe le soleil de midi. Le soir, le bassin reprend la façade. À l’intérieur, la terre crue, le lin et un seul fauteuil de l’atelier tiennent la pièce — le reste est de l’air.",
    materials: ["Terre crue", "Calcaire", "Iroko", "Laiton brossé", "Lin"],
    frames: [
      {
        src: "/media/villa.jpg",
        alt: "Villa basse au crépuscule, bassin rectangulaire et palmes, lumière intérieure chaude.",
        caption: "Façade ouest, après le couchant",
        width: 1728,
        height: 1152,
      },
      {
        src: "/media/hero.jpg",
        alt: "Salon ouvert sur une cour tropicale, canapé de lin et fauteuil d'iroko.",
        caption: "Le salon de la cour",
        width: 1792,
        height: 1008,
      },
      {
        src: "/media/chambre.jpg",
        alt: "Chambre à coucher avec lit bas, mur en terre crue et vue sur le bassin.",
        caption: "Chambre principale",
        width: 1152,
        height: 1728,
      },
      {
        src: "/media/jardin.jpg",
        alt: "Vue du bassin depuis la terrasse, palmes réfléchies dans l'eau.",
        caption: "Le bassin au crépuscule",
        width: 1728,
        height: 1152,
      },
    ],
  },
  {
    id: "hotel-lagune",
    index: "02",
    title: "Hôtel Lagune",
    place: "Aného",
    year: "2025",
    tags: ["Intérieur"],
    ratio: "land",
    span: "5",
    surface: "18 clés",
    excerpt: "Un hall en double hauteur, puis des chambres presque muettes. L’eau est derrière la colonnade.",
    story:
      "L’accueil est une table de travertin trop longue pour être pressée. Les suspensions en fibre descendent bas, pour que la voix reste près du sol. À l’étage, la Suite Sable ne garde qu’un lit, un enduit et une ligne de soleil.",
    materials: ["Travertin", "Enduit de chaux", "Fibre tressée", "Béton ciré", "Iroko"],
    frames: [
      {
        src: "/media/hotel.jpg",
        alt: "Hall d’hôtel en double hauteur, banque de travertin et suspensions tressées, jardin au fond.",
        caption: "Le hall",
        width: 1728,
        height: 1152,
      },
      {
        src: "/media/chambre.jpg",
        alt: "Chambre en lin pierre et tête de lit d'iroko, mur d'enduit chaud, rayon de soleil.",
        caption: "Suite Sable",
        width: 1152,
        height: 1728,
      },
      {
        src: "/media/villa.jpg",
        alt: "Vue depuis la chambre sur le jardin et le lac au loin.",
        caption: "Vue sur le lac",
        width: 1728,
        height: 1152,
      },
    ],
  },
  {
    id: "maison-laterite",
    index: "03",
    title: "Maison Latérite",
    place: "Kpalimé",
    year: "2023",
    tags: ["Extérieur"],
    ratio: "portrait",
    span: "5",
    surface: "260 m²",
    excerpt: "Une façade épaisse, un seul percement. L’ombre y est un matériau.",
    story:
      "Sur les collines, la maison se présente comme un mur. La latérite est damée en couches lisibles, le brise-soleil d’iroko rythme la hauteur. On entre par le côté, jamais de face. Dedans, la fraîcheur tient sans climatisation forcée.",
    materials: ["Latérite damée", "Iroko", "Chaux"],
    frames: [
      {
        src: "/media/facade.jpg",
        alt: "Façade haute en terre rouge et brise-soleil vertical de bois, un seul jour étroit.",
        caption: "Mur ouest, midi",
        width: 1152,
        height: 1728,
      },
      {
        src: "/media/chambre.jpg",
        alt: "Intérieur avec mur en terre crue et sol en carreaux de terre cuite.",
        caption: "Séjour",
        width: 1728,
        height: 1152,
      },
      {
        src: "/media/jardin.jpg",
        alt: "Vue de la colline depuis la terrasse, végétation locale.",
        caption: "Terrasse",
        width: 1728,
        height: 1152,
      },
    ],
  },
  {
    id: "rivoli",
    index: "04",
    title: "Appartement Rivoli",
    place: "Paris",
    year: "2024",
    tags: ["Intérieur"],
    ratio: "land",
    span: "7",
    surface: "94 m²",
    excerpt: "Un appartement haussmannien repris par la pierre et le bois, sans pastiche.",
    story:
      "Le parquet reste. Le reste a été retiré jusqu’au silence : murs chauds, un voile de lin, une table basse de travertin dessinée pour cette pièce. Les objets viennent de l’atelier de Lomé. La fenêtre, elle, est toujours parisienne.",
    materials: ["Chêne", "Travertin", "Lin", "Céramique"],
    frames: [
      {
        src: "/media/appartement.jpg",
        alt: "Salon parisien au parquet en point de Hongrie, table basse de travertin et rideaux de lin.",
        caption: "La pièce de jour",
        width: 1728,
        height: 1152,
      },
      {
        src: "/media/chambre.jpg",
        alt: "Chambre avec parquet ancien et tête de lit en iroko.",
        caption: "Chambre",
        width: 1728,
        height: 1152,
      },
      {
        src: "/media/hero.jpg",
        alt: "Détail de la table basse en travertin avec lumière du matin.",
        caption: "Détail table",
        width: 1728,
        height: 1152,
      },
    ],
  },
  {
    id: "jardin-ombres",
    index: "05",
    title: "Jardin des Ombres",
    place: "Cotonou",
    year: "2022",
    tags: ["Paysage"],
    ratio: "land",
    span: "12",
    surface: "640 m²",
    excerpt: "Une cour d’eau et de gravier. Trois heures d’ombre dessinées avant les plantes.",
    story:
      "Le jardin précède la maison. Un bassin immobile, des pas japonais, des sujets taillés pour que le soleil n’entre qu’en biais. On a refusé la pelouse. Le sol se lit, se balaye, se traverse lentement.",
    materials: ["Gravier", "Calcaire", "Eau", "Terre cuite"],
    frames: [
      {
        src: "/media/jardin.jpg",
        alt: "Cour paysagère, bassin rectangulaire, gravier ratissé et arbres taillés au matin.",
        caption: "La cour principale",
        width: 1728,
        height: 1152,
      },
      {
        src: "/media/facade.jpg",
        alt: "Vue de la maison depuis le jardin, architecture basse et végétation.",
        caption: "La maison",
        width: 1728,
        height: 1152,
      },
      {
        src: "/media/villa.jpg",
        alt: "Détail des pas japonais et du gravier autour du bassin.",
        caption: "Les pas",
        width: 1728,
        height: 1152,
      },
    ],
  },
];

export const pieces: Piece[] = [
  {
    id: "koro",
    index: "01",
    title: "Fauteuil Koro",
    lieu: "Salon, Villa Palmier",
    material: "Iroko massif, laiton brossé, lin",
    dims: "L 78 × P 84 × H 72 cm",
    price: "2 450 €",
    delay: "12 semaines",
    note: "Coque cintrée à la vapeur, pieds démontables. Édition de vingt-quatre par an.",
    src: "/media/fauteuil.jpg",
    alt: "Fauteuil sculptural en iroko clair, pieds de laiton et assise de lin, fond d’enduit.",
    fit: "contain",
    position: "center",
  },
  {
    id: "avoine",
    index: "02",
    title: "Canapé Avoine",
    lieu: "Vu en situation, Villa Palmier",
    material: "Lin stonewashed, chêne fumé",
    dims: "L 240 × P 96 × H 68 cm",
    price: "4 800 €",
    delay: "14 semaines",
    note: "Assise basse, coutures apparentes, tissu déhoussable. La pièce se pose, elle ne s’impose pas.",
    src: "/media/hero.jpg",
    alt: "Canapé bas de lin avoine dans un salon ouvert sur une cour de palmes.",
    fit: "cover",
    position: "center",
  },
  {
    id: "nattes",
    index: "03",
    title: "Suspension Nattes",
    lieu: "Hall, Hôtel Lagune",
    material: "Fibre de raphia, laiton",
    dims: "Ø 55 × H 90 cm",
    price: "960 €",
    delay: "8 semaines",
    note: "Tressée à la main, livrée en grappe de trois ou seule. Lumière basse, presque un feu.",
    src: "/media/hotel.jpg",
    alt: "Groupe de suspensions en fibre naturelle au-dessus d’une banque de travertin.",
    fit: "cover",
    position: "top",
  },
  {
    id: "courbe",
    index: "04",
    title: "Table Courbe",
    lieu: "Vu en situation, Rivoli",
    material: "Travertin clair",
    dims: "L 120 × P 70 × H 32 cm",
    price: "1 850 €",
    delay: "10 semaines",
    note: "Oval irrégulier, pores ouverts, pas de vernis brillant. Chaque bloc diffère.",
    src: "/media/appartement.jpg",
    alt: "Table basse organique en travertin dans un salon aux rideaux de lin.",
    fit: "cover",
    position: "center",
  },
  {
    id: "lit-iroko",
    index: "05",
    title: "Tête Iroko",
    lieu: "Suite Sable, Hôtel Lagune",
    material: "Iroko, lin, enduit",
    dims: "L 180 × H 110 cm",
    price: "1 280 €",
    delay: "9 semaines",
    note: "Panneau plein, huile mate. Se fixe au mur ou se pose derrière un cadre existant.",
    src: "/media/chambre.jpg",
    alt: "Tête de lit en iroko dans une chambre de lin, lumière du matin sur le drap.",
    fit: "cover",
    position: "center",
  },
];

export const marquee = [
  "Architecture intérieure",
  "Paysage",
  "Mobilier d’édition",
  "Hôtellerie",
  "Cours et bassins",
  "Direction de matière",
  "Résidences",
  "Lomé",
];

export function projectById(id: string) {
  return projects.find((project) => project.id === id);
}

export function pieceById(id: string) {
  return pieces.find((piece) => piece.id === id);
}
