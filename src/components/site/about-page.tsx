import { useRef } from "react";
import { useAnimeReveal } from "@/components/site/anime-motion";
import { usePageMotion } from "@/components/site/motion-root";
import { cn } from "@/lib/utils";

const team = [
  {
    name: "Kofi Mensah",
    role: "Fondateur · Architecte",
    bio: "Diplômé de l'École d'Architecture de Lomé en 2008. Quatorze ans à composer des lieux où la terre et le bois font le travail. La lumière reste son obsession.",
    image: "/media/hero.jpg",
  },
  {
    name: "Awa Togbe",
    role: "Associée · Paysagiste",
    bio: "Spécialiste des cours et bassins. Elle dessine l'ombre avant les plantes. Le jardin des Ombres à Cotonou est sa signature.",
    image: "/media/jardin.jpg",
  },
  {
    name: "Yao Koffi",
    role: "Associé · Designer",
    bio: "Responsable de la ligne éditoriale. Chaque pièce — fauteuil Koro, table Courbe — passe par ses mains avant l'atelier.",
    image: "/media/fauteuil.jpg",
  },
];

const values = [
  {
    title: "Matière d'abord",
    text: "Nous ne dessinons pas sur écran. Nous touchons la terre, le bois, la pierre. La lumière se vérifie, elle ne s'imagine pas.",
  },
  {
    title: "Climat local",
    text: "Chaque projet commence par le site. Le vent, le soleil, l'humidité dictent la forme. Pas de pastiche, pas d'importation.",
  },
  {
    title: "Peu mais juste",
    text: "Nous refusons la surproduction. Trois projets par an, maximum. Chaque lieu reçoit notre attention entière.",
  },
  {
    title: "Transmission",
    text: "Le lieu se vit. Nous restons disponibles pour l'entretien, les ajustements, parfois les rééditions. La relation continue.",
  },
];

const timeline = [
  { year: "2012", event: "Fondation de l'atelier int_design à Lomé" },
  { year: "2015", event: "Premier projet hôtelier : Hôtel Lagune, Aného" },
  { year: "2018", event: "Lancement de la ligne éditoriale (Fauteuil Koro)" },
  { year: "2020", event: "Expansion à Paris (Appartement Rivoli)" },
  { year: "2022", event: "Jardin des Ombres, Cotonou — premier projet paysager" },
  { year: "2024", event: "Villa Palmier, Lomé — signature contemporaine" },
];

export function AboutPage() {
  const ref = useRef<HTMLElement>(null);
  usePageMotion(ref);
  useAnimeReveal(ref);

  return (
    <main id="contenu" ref={ref} className="pt-16">
      <header className="mx-auto w-full max-w-7xl px-5 pt-12 pb-8 md:px-8 md:pt-20">
        <p className="text-xs uppercase tracking-brand text-muted">À propos</p>
        <h1 data-rise className="mt-3 max-w-3xl font-display text-display font-medium">
          L'atelier, puis les lieux.
        </h1>
        <p data-rise className="mt-5 max-w-xl text-lg font-light text-muted">
          Depuis 2012, nous composons des espaces où la terre, le bois et la lumière du golfe font le travail.
          Intérieur, extérieur, paysage — et les pièces qui y restent.
        </p>
      </header>

      <section className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <p className="text-xs uppercase tracking-brand text-muted">Philosophie</p>
        <h2 data-rise className="mt-3 max-w-2xl font-display text-display font-medium">
          Ce que nous croyons.
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {values.map((value, index) => (
            <div key={index} data-rise className={cn(index % 2 === 1 && "md:col-start-2")}>
              <span data-draw className="mb-4 block h-px w-10 origin-left bg-clay" />
              <h3 className="font-display text-2xl font-medium">{value.title}</h3>
              <p className="mt-3 text-muted">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-foam py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <p className="text-xs uppercase tracking-brand text-muted">L'équipe</p>
          <h2 data-rise className="mt-3 max-w-2xl font-display text-display font-medium">
            Trois personnes, une vision.
          </h2>
          <div className="mt-12 grid gap-16 md:grid-cols-3">
            {team.map((member, index) => (
              <article key={index} data-rise>
                <div className="aspect-frame overflow-hidden bg-paper-2">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="size-full object-cover"
                  />
                </div>
                <p className="mt-4 text-xs uppercase tracking-brand text-clay">{member.role}</p>
                <h3 className="mt-2 font-display text-2xl font-medium">{member.name}</h3>
                <p className="mt-3 text-muted">{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <p className="text-xs uppercase tracking-brand text-muted">Chronologie</p>
        <h2 data-rise className="mt-3 max-w-2xl font-display text-display font-medium">
          Quatorze ans d'atelier.
        </h2>
        <div className="mt-12 space-y-8 border-l border-line pl-8">
          {timeline.map((item, index) => (
            <div key={index} data-rise className="relative">
              <span className="absolute -left-[37px] top-1 size-3 rounded-full bg-clay" />
              <p className="text-sm uppercase tracking-brand text-clay">{item.year}</p>
              <p className="mt-1 text-muted">{item.event}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-brand text-muted">Rejoindre l'atelier</p>
              <h2 data-rise className="mt-3 max-w-xl font-display text-display font-medium">
                Vous dessinez comme nous vivons.
              </h2>
              <p data-rise className="mt-4 max-w-md text-muted">
                Nous ne recrutons pas souvent. Mais quand le profil correspond, nous écoutons.
                Envoyez votre book et une lettre sur votre relation à la matière.
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <a
                href="mailto:atelier@int-design.studio?subject=Candidature"
                className="inline-flex min-h-11 items-center justify-center bg-clay px-5 text-sm uppercase tracking-brand text-paper hover:bg-clay-deep"
              >
                Envoyer une candidature
              </a>
              <p className="mt-4 text-sm text-muted">
                atelier@int-design.studio
                <br />
                Lomé, Togo
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
