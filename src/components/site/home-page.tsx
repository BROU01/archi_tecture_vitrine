import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { animePop, useAnimeReveal } from "@/components/site/anime-motion";
import { usePageMotion } from "@/components/site/motion-root";
import { ShaderField } from "@/components/site/shader-field";
import { marquee, pieces, press, projects, quotes, services, stats, steps } from "@/data/studio";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const featured = ["villa-palmier", "hotel-lagune", "rivoli"];

export function HomePage() {
  const ref = useRef<HTMLElement>(null);
  usePageMotion(ref);
  useAnimeReveal(ref);
  return (
    <main id="contenu" ref={ref}>
      <Hero />
      <Marquee />
      <Proof />
      <Lieux />
      <Atelier />
      <Ligne />
      <Process />
      <Visit />
    </main>
  );
}

function Hero() {
  const { locale } = useI18n();
  const en = locale === "en";
  return (
    <section data-hero className="relative flex h-svh min-h-svh flex-col justify-end overflow-hidden text-paper">
      <img
        data-hero-img
        src="/media/hero.jpg"
        alt="Salon ouvert sur une cour de palmes, canapé de lin et fauteuil d'iroko, fin d'après-midi."
        width={1792}
        height={1008}
        fetchPriority="high"
        loading="eager"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-night/55 via-night/15 to-night/75" />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 pt-24 pb-8 md:px-8 md:pb-10">
        <p data-hero-bit className="text-xs uppercase tracking-brand text-paper/80">
          {en ? "Architecture studio · Lomé" : "Atelier d’architecture · Lomé"}
        </p>
        <h1 data-hero-bit className="font-display text-hero font-medium">
          int<span className="text-clay">_</span><br className="md:hidden" />design
        </h1>
        <div data-hero-rule className="h-px w-24 origin-left bg-clay" />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p data-hero-bit className="max-w-md text-lg font-light text-paper/90">
            {en ? "Inside and out. We compose places where earth, timber and Gulf light do the work." : "Intérieur et extérieur. Nous composons des lieux où la terre, le bois et la lumière du golfe font le travail."}
          </p>
          <div data-hero-bit className="flex flex-col gap-3 sm:flex-row">
            <div data-magnetic className="inline-flex">
              <Link
                to="/galerie"
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-clay px-5 text-sm uppercase tracking-brand text-paper hover:bg-clay-deep"
              >
                {en ? "Explore the gallery" : "Voir la galerie"}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <div data-magnetic className="inline-flex">
              <a
                href="#rendez-vous"
                className="inline-flex min-h-11 items-center justify-center border border-paper/40 px-5 text-sm uppercase tracking-brand text-paper hover:bg-paper hover:text-ink"
              >
                {en ? "Book an appointment" : "Prendre rendez-vous"}
              </a>
            </div>
          </div>
        </div>
        <div data-hero-bit className="flex items-center justify-between pt-2 text-xs uppercase tracking-brand text-paper/70">
          <span>{en ? "Since 2012" : "Depuis 2012"}</span>
          <span>{en ? "Homes · hotels · landscapes" : "Résidences · hôtels · paysages"}</span>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <section className="overflow-hidden border-y border-line bg-paper" aria-label="Savoir-faire">
      <div data-marquee className="flex w-max py-4">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex" aria-hidden={copy === 1}>
            {row.map((item, index) => (
              <li key={`${copy}-${item}-${index}`} className="flex items-center">
                <span className="px-4 text-sm uppercase tracking-brand">{item}</span>
                <span className="text-clay" aria-hidden>
                  —
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section id="preuves" className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-brand text-muted">Preuves</p>
          <h2 data-rise className="mt-3 max-w-xl font-display text-display font-medium">
            Des lieux habités, pas des images.
          </h2>
        </div>
        <p data-rise className="max-w-sm text-muted">
          Quatorze ans à composer des maisons, des hôtels et des cours — puis les pièces qui y restent.
        </p>
      </div>

      <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-5">
        {press.map((name) => (
          <li key={name} className="text-sm uppercase tracking-brand text-ink">
            {name}
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {quotes.map((quote) => (
          <figure key={quote.name} data-rise className="border-t border-line pt-5">
            <span data-draw className="mb-5 block h-px w-10 origin-left bg-clay" />
            <blockquote className="font-display text-2xl leading-snug font-medium">« {quote.text} »</blockquote>
            <figcaption className="mt-5 text-sm text-muted">
              {quote.name}
              <span className="mt-1 block">{quote.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-line pt-10 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="font-display text-5xl font-medium tabular-nums">
              <span data-count={stat.value}>{stat.value.toLocaleString("fr-FR")}</span>
            </dt>
            <dd className="mt-2 text-sm uppercase tracking-brand text-muted">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Lieux() {
  const list = projects.filter((project) => featured.includes(project.id));
  return (
    <section id="lieux" className="bg-foam py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-brand text-muted">Lieux</p>
            <h2 data-rise className="mt-3 font-display text-display font-medium">
              Une sélection
            </h2>
          </div>
          <Link to="/galerie" className="hidden min-h-11 items-center gap-2 text-sm uppercase tracking-brand sm:inline-flex">
            Toute la galerie
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-12">
          {list.map((project, index) => {
            const frame = project.frames[0];
            return (
              <article key={project.id} className={cn("grid items-center gap-6 md:grid-cols-12", index === 1 && "md:[&>a]:order-2")}>
                <Link
                  to="/galerie"
                  hash={project.id}
                  data-parallax
                  data-clip
                  data-zoom
                  data-cursor
                  className={cn(
                    "relative block overflow-hidden bg-paper-2",
                    index === 1 ? "md:col-span-5" : "md:col-span-7",
                    project.ratio === "portrait" ? "aspect-portrait" : "aspect-land",
                  )}
                >
                  <img
                    src={frame.src}
                    alt={frame.alt}
                    width={frame.width}
                    height={frame.height}
                    loading="lazy"
                    className="parallax-img"
                  />
                </Link>
                <div data-rise className={cn(index === 1 ? "md:col-span-7 md:pr-10" : "md:col-span-5")}>
                  <p className="text-xs uppercase tracking-brand text-muted">
                    {project.index} — {project.place} · {project.year}
                  </p>
                  <h3 className="mt-3 font-display text-4xl font-medium">{project.title}</h3>
                  <p className="mt-4 max-w-md text-muted">{project.excerpt}</p>
                  <Link
                    to="/galerie"
                    hash={project.id}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm uppercase tracking-brand"
                  >
                    Ouvrir le lieu
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <Link
          to="/galerie"
          className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm uppercase tracking-brand sm:hidden"
        >
          Toute la galerie
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

function Atelier() {
  return (
    <section id="atelier" className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
      <div className="md:col-span-6">
        <p className="text-xs uppercase tracking-brand text-muted">L’atelier</p>
        <h2 data-rise className="mt-3 font-display text-display font-medium">
          Le dedans et le dehors se dessinent <em className="font-medium text-clay italic">ensemble</em>.
        </h2>
        <p data-rise className="mt-6 max-w-md text-lg font-light text-muted">
          int_design est né à Lomé. Nous dessinons la résidence, l’hôtellerie et le paysage, puis nous éditons les
          pièces qui restent dans la pièce. Peu de projets. Beaucoup de matière.
        </p>
      </div>
      <ul className="md:col-span-5 md:col-start-8">
        {services.map((service) => (
          <li key={service.index} data-rise className="border-t border-line py-5">
            <div className="flex gap-4">
              <span className="text-xs tracking-brand text-clay">{service.index}</span>
              <div>
                <h3 className="font-display text-2xl font-medium">{service.title}</h3>
                <p className="mt-2 text-muted">{service.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Ligne() {
  return (
    <section id="ligne" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="text-xs uppercase tracking-brand text-muted">La ligne</p>
          <h2 data-rise className="mt-3 font-display text-display font-medium">
            Cinq pièces phares
          </h2>
        </div>
        <a href="/galerie#pieces" className="inline-flex min-h-11 items-center gap-2 text-sm uppercase tracking-brand">
          Le visage des pièces
          <ArrowUpRight className="size-4" />
        </a>
      </div>
      <div className="snap-row mt-10 flex gap-5 overflow-x-auto px-5 pb-2 md:px-8">
        {pieces.map((piece) => (
          <a
            key={piece.id}
            href={`/galerie#${piece.id}`}
            data-cursor
            data-anime
            className="w-72 shrink-0 snap-start md:w-80"
          >
            <div data-zoom className="relative aspect-frame overflow-hidden bg-paper-2">
              <img
                src={piece.src}
                alt={piece.alt}
                loading="lazy"
                className={cn(
                  "size-full",
                  piece.fit === "contain" ? "object-contain" : "object-cover",
                  piece.position === "top" && "object-top",
                  piece.position === "bottom" && "object-bottom",
                )}
              />
            </div>
            <p className="mt-4 text-xs uppercase tracking-brand text-muted">{piece.index}</p>
            <h3 className="mt-1 font-display text-2xl font-medium">{piece.title}</h3>
            <p className="mt-1 text-sm text-muted">{piece.price}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="relative overflow-hidden bg-night py-20 text-paper md:py-28">
      <ShaderField className="absolute inset-0 size-full" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <p className="text-xs uppercase tracking-brand text-paper/60">Méthode</p>
        <h2 data-rise className="mt-3 max-w-xl font-display text-display font-medium">
          Quatre temps, pas davantage.
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-4">
          {steps.map((step) => (
            <li key={step.index} data-rise>
              <span data-draw className="mb-4 block h-px w-10 origin-left bg-clay" />
              <p className="text-xs tracking-brand text-clay">{step.index}</p>
              <h3 className="mt-2 font-display text-3xl font-medium">{step.title}</h3>
              <p className="mt-3 text-paper/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Visit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [kind, setKind] = useState("Résidence");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<string | null>(null);
  const sentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const piece = sessionStorage.getItem("int-design-piece");
    if (!piece) return;
    setKind("Mobilier");
    setMessage(`Je souhaite réserver la pièce « ${piece} ».`);
    sessionStorage.removeItem("int-design-piece");
  }, []);

  useEffect(() => {
    if (!sent || !sentRef.current) return;
    animePop(sentRef.current);
  }, [sent]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Indiquez un nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Cette adresse n’est pas lisible.";
    if (message.trim().length < 12) next.message = "Quelques lignes sur le lieu suffisent.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const body = [`Nom : ${name.trim()}`, `Projet : ${kind}`, "", message.trim()].join("\n");
    const href = `mailto:atelier@int-design.studio?subject=${encodeURIComponent(`Rendez-vous — ${kind}`)}&body=${encodeURIComponent(body)}`;
    setSent(href);
  }

  return (
    <section id="rendez-vous" className="scroll-mt-24 bg-paper">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-brand text-muted">Rendez-vous</p>
          <h2 data-rise className="mt-3 font-display text-display font-medium">
            Parlons du lieu.
          </h2>
          <p data-rise className="mt-5 max-w-sm text-lg font-light text-muted">
            Décrivez le site, le climat, ce que vous voulez y vivre. L’atelier répond sous quarante-huit heures.
          </p>
          <p className="mt-8 text-sm text-muted">
            14 rue des Flamboyants, Tokoin, Lomé
            <br />
            atelier@int-design.studio
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {sent ? (
            <div ref={sentRef} className="border border-line bg-foam p-8" role="status">
              <p className="font-display text-3xl font-medium">La demande est rédigée.</p>
              <p className="mt-3 text-muted">
                Ouvrez votre messagerie pour l’envoyer à l’atelier. Rien n’est transmis tant que vous ne validez pas le
                courriel.
              </p>
              <a
                href={sent}
                className="mt-6 inline-flex min-h-11 items-center bg-clay px-5 text-sm uppercase tracking-brand text-paper hover:bg-clay-deep"
              >
                Ouvrir le courriel
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5" noValidate>
              <Field label="Nom" error={errors.name}>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  name="nom"
                  autoComplete="name"
                  className={fieldClass}
                />
              </Field>
              <Field label="Courriel" error={errors.email}>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={fieldClass}
                />
              </Field>
              <Field label="Type de projet">
                <select value={kind} onChange={(event) => setKind(event.target.value)} name="type" className={fieldClass}>
                  {["Résidence", "Hôtellerie", "Paysage", "Mobilier", "Autre"].map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field label="Le lieu" error={errors.message}>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  name="message"
                  rows={5}
                  className={cn(fieldClass, "resize-y")}
                />
              </Field>
              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center bg-ink px-5 text-sm uppercase tracking-brand text-paper hover:bg-night-2"
              >
                Envoyer la demande
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const fieldClass =
  "min-h-11 w-full border border-line bg-foam px-3 text-ink outline-none focus:border-ink";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="uppercase tracking-brand text-muted">{label}</span>
      {children}
      {error ? <span className="text-clay">{error}</span> : null}
    </label>
  );
}
