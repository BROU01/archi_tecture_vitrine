import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, X } from "lucide-react";
import gsap from "gsap";
import { useAnimeReveal } from "@/components/site/anime-motion";
import { usePageMotion } from "@/components/site/motion-root";
import { Lightbox } from "@/components/site/lightbox";
import { pieceById, pieces, projectById, projects, type Piece, type Project, type Tag } from "@/data/studio";
import { cn } from "@/lib/utils";

type Filter = "tous" | Tag;
type LocationFilter = "tous" | "Lomé" | "Paris" | "Aného" | "Kpalimé" | "Cotonou";
type YearFilter = "tous" | "2025" | "2024" | "2023" | "2022";
type Selection = { kind: "project"; id: string } | { kind: "piece"; id: string };

const filters: { id: Filter; label: string }[] = [
  { id: "tous", label: "Tous" },
  { id: "Intérieur", label: "Intérieur" },
  { id: "Extérieur", label: "Extérieur" },
  { id: "Paysage", label: "Paysage" },
];

const locationFilters: { id: LocationFilter; label: string }[] = [
  { id: "tous", label: "Tous les lieux" },
  { id: "Lomé", label: "Lomé" },
  { id: "Paris", label: "Paris" },
  { id: "Aného", label: "Aného" },
  { id: "Kpalimé", label: "Kpalimé" },
  { id: "Cotonou", label: "Cotonou" },
];

const yearFilters: { id: YearFilter; label: string }[] = [
  { id: "tous", label: "Toutes les années" },
  { id: "2025", label: "2025" },
  { id: "2024", label: "2024" },
  { id: "2023", label: "2023" },
  { id: "2022", label: "2022" },
];

export function GalleryPage() {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLElement>(null);
  usePageMotion(pageRef);
  useAnimeReveal(pageRef);
  const [filter, setFilter] = useState<Filter>("tous");
  const [locationFilter, setLocationFilter] = useState<LocationFilter>("tous");
  const [yearFilter, setYearFilter] = useState<YearFilter>("tous");
  const [selection, setSelection] = useState<Selection | null>(null);
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt: string; caption?: string }[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const panelRef = useRef<HTMLElement>(null);

  const visible = projects.filter((project) => {
    const tagMatch = filter === "tous" || project.tags.includes(filter);
    const locationMatch = locationFilter === "tous" || project.place === locationFilter;
    const yearMatch = yearFilter === "tous" || project.year === yearFilter;
    return tagMatch && locationMatch && yearMatch;
  });

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const node = document.getElementById(id);
    if (node) {
      requestAnimationFrame(() => node.scrollIntoView({ block: "start" }));
    }
    if (projectById(id)) setSelection({ kind: "project", id });
    if (pieceById(id)) setSelection({ kind: "piece", id });
  }, []);

  useEffect(() => {
    if (!selection) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [selection]);

  useEffect(() => {
    if (!selection || !panelRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(panelRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: "power3.out" });
  }, [selection]);

  function requestClose() {
    const panel = panelRef.current;
    if (!panel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSelection(null);
      return;
    }
    gsap.to(panel, {
      x: 28,
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => setSelection(null),
    });
  }

  function reserve(title: string) {
    sessionStorage.setItem("int-design-piece", title);
    setSelection(null);
    void navigate({ to: "/", hash: "rendez-vous" });
  }

  function openLightbox(images: { src: string; alt: string; caption?: string }[], startIndex = 0) {
    setLightboxImages(images);
    setLightboxIndex(startIndex);
  }

  function closeLightbox() {
    setLightboxImages(null);
  }

  const activeProject = selection?.kind === "project" ? projectById(selection.id) : undefined;
  const activePiece = selection?.kind === "piece" ? pieceById(selection.id) : undefined;

  return (
    <main id="contenu" ref={pageRef} className="pt-16">
      <header className="mx-auto w-full max-w-7xl px-5 pt-12 pb-8 md:px-8 md:pt-20">
        <p className="text-xs uppercase tracking-brand text-muted">Galerie</p>
        <h1 data-rise className="mt-3 max-w-3xl font-display text-display font-medium">
          Les lieux, puis les pièces qui les habitent.
        </h1>
        <p data-rise className="mt-5 max-w-xl text-lg font-light text-muted">
          Cinq projets récents — Lomé, le golfe, Paris — et la ligne éditée à l’atelier. Cliquez un lieu pour le lire de
          près.
        </p>
        <div className="mt-8 flex flex-col gap-4" role="toolbar" aria-label="Filtrer les lieux">
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => {
              const on = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(item.id)}
                  className={cn(
                    "min-h-11 px-4 text-sm uppercase tracking-brand",
                    on ? "bg-ink text-paper" : "border border-line text-ink hover:border-ink",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            {locationFilters.map((item) => {
              const on = locationFilter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setLocationFilter(item.id)}
                  className={cn(
                    "min-h-9 px-3 text-xs uppercase tracking-brand",
                    on ? "bg-clay text-paper" : "border border-line text-ink hover:border-ink",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            {yearFilters.map((item) => {
              const on = yearFilter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setYearFilter(item.id)}
                  className={cn(
                    "min-h-9 px-3 text-xs uppercase tracking-brand",
                    on ? "bg-clay text-paper" : "border border-line text-ink hover:border-ink",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-5 pb-20 md:px-8" aria-label="Projets">
        <ul className="grid grid-cols-1 items-start gap-x-8 gap-y-14 md:grid-cols-12">
          {projects.map((project) => {
            const show = visible.some((item) => item.id === project.id);
            const frame = project.frames[0];
            return (
              <li
                key={project.id}
                id={project.id}
                data-anime
                className={cn(
                  "work-card scroll-mt-28",
                  project.span === "12" ? "md:col-span-12" : project.span === "7" ? "md:col-span-7" : "md:col-span-5",
                  !show && "hidden",
                )}
              >
                <button type="button" data-cursor className="block w-full text-left" onClick={() => setSelection({ kind: "project", id: project.id })}>
                  <div
                    data-zoom
                    data-clip
                    className={cn(
                      "relative overflow-hidden bg-paper-2",
                      project.ratio === "portrait" ? "aspect-portrait" : project.ratio === "video" ? "aspect-video" : "aspect-land",
                      project.span === "12" && "md:aspect-video",
                    )}
                  >
                    <img src={frame.src} alt={frame.alt} width={frame.width} height={frame.height} className="size-full object-cover" loading="lazy" />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-brand text-muted">
                        {project.index} — {project.place}
                      </p>
                      <h2 className="mt-1 font-display text-3xl font-medium">{project.title}</h2>
                    </div>
                    <span className="text-sm text-muted">{project.year}</span>
                  </div>
                  <p className="mt-2 max-w-md text-muted">{project.excerpt}</p>
                </button>
              </li>
            );
          })}
        </ul>
        {visible.length === 0 ? (
          <p className="py-16 text-muted">Aucun lieu dans cette famille.</p>
        ) : null}
      </section>

      <section id="pieces" className="scroll-mt-24 border-t border-line bg-foam py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <p className="text-xs uppercase tracking-brand text-muted">Pièces phares</p>
          <h2 data-rise className="mt-3 max-w-2xl font-display text-display font-medium">
            La ligne atelier, montrée là où elle vit.
          </h2>
          <p data-rise className="mt-4 max-w-xl text-muted">
            Cinq éditions courtes, fabriquées à Lomé. Les prix sont départ atelier. Le délai commence à la validation du
            bois ou de la pierre.
          </p>

          <div className="mt-14 grid gap-16">
            {pieces.map((piece, index) => (
              <article
                key={piece.id}
                id={piece.id}
                data-rise
                className="grid scroll-mt-28 items-center gap-6 md:grid-cols-12"
              >
                <button
                  type="button"
                  data-cursor
                  data-zoom
                  data-clip
                  onClick={() => setSelection({ kind: "piece", id: piece.id })}
                  className={cn(
                    "relative aspect-frame overflow-hidden bg-paper-2 md:col-span-6",
                    index % 2 === 1 && "md:order-2",
                  )}
                >
                  <img
                    src={piece.src}
                    alt={piece.alt}
                    loading="lazy"
                    className={cn(
                      "size-full",
                      piece.fit === "contain" ? "object-contain p-8" : "object-cover",
                      piece.position === "top" && "object-top",
                      piece.position === "bottom" && "object-bottom",
                    )}
                  />
                </button>
                <div className={cn("md:col-span-6 md:pl-8", index % 2 === 1 && "md:order-1 md:pr-8 md:pl-0")}>
                  <p className="text-xs uppercase tracking-brand text-clay">{piece.lieu}</p>
                  <h2 className="mt-3 font-display text-display font-medium">{piece.title}</h2>
                  <dl className="mt-6 grid gap-3 text-sm">
                    <div className="flex justify-between gap-6 border-t border-line pt-3">
                      <dt className="text-muted">Matière</dt>
                      <dd className="text-right">{piece.material}</dd>
                    </div>
                    <div className="flex justify-between gap-6 border-t border-line pt-3">
                      <dt className="text-muted">Mesures</dt>
                      <dd>{piece.dims}</dd>
                    </div>
                    <div className="flex justify-between gap-6 border-t border-line pt-3">
                      <dt className="text-muted">Édition</dt>
                      <dd className="font-medium">{piece.price}</dd>
                    </div>
                  </dl>
                  <p className="mt-5 text-muted">{piece.note}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setSelection({ kind: "piece", id: piece.id })}
                      className="inline-flex min-h-11 items-center gap-2 border border-line px-5 text-sm uppercase tracking-brand hover:border-ink"
                    >
                      Voir la pièce
                      <ArrowUpRight className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => reserve(piece.title)}
                      className="inline-flex min-h-11 items-center bg-ink px-5 text-sm uppercase tracking-brand text-paper hover:bg-night-2"
                    >
                      La réserver
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeProject ? (
        <Detail onClose={requestClose} panelRef={panelRef} title={activeProject.title}>
          <ProjectSheet project={activeProject} onImageClick={(idx) => openLightbox(activeProject.frames.map(f => ({ src: f.src, alt: f.alt, caption: f.caption })), idx)} />
        </Detail>
      ) : null}
      {activePiece ? (
        <Detail onClose={requestClose} panelRef={panelRef} title={activePiece.title}>
          <PieceSheet piece={activePiece} onReserve={() => reserve(activePiece.title)} onImageClick={() => openLightbox([{ src: activePiece.src, alt: activePiece.alt }])} />
        </Detail>
      ) : null}
      {lightboxImages ? (
        <Lightbox images={lightboxImages} initialIndex={lightboxIndex} onClose={closeLightbox} />
      ) : null}
    </main>
  );
}

function Detail({
  title,
  onClose,
  panelRef,
  children,
}: {
  title: string;
  onClose: () => void;
  panelRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="absolute inset-0 bg-night/70" aria-label="Fermer" onClick={onClose} />
      <article
        ref={panelRef}
        className="absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto bg-paper md:max-w-4xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-paper/95 px-5 py-3 backdrop-blur-md md:px-8">
          <p className="font-display text-xl">{title}</p>
          <button type="button" onClick={onClose} className="inline-flex size-11 items-center justify-center" aria-label="Fermer la fiche">
            <X className="size-5" />
          </button>
        </div>
        {children}
      </article>
    </div>
  );
}

function ProjectSheet({ project, onImageClick }: { project: Project; onImageClick: (index: number) => void }) {
  return (
    <div className="grid gap-8 px-5 py-6 md:px-8 md:py-8">
      <div className="grid gap-4">
        {project.frames.map((frame, index) => (
          <figure key={frame.src}>
            <button
              type="button"
              className="block w-full text-left"
              onClick={() => onImageClick(index)}
              aria-label={`Agrandir l'image ${index + 1}`}
            >
              <img src={frame.src} alt={frame.alt} width={frame.width} height={frame.height} className="w-full object-cover cursor-zoom-in hover:opacity-90 transition-opacity" />
            </button>
            <figcaption className="mt-2 text-sm text-muted">{frame.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-brand text-muted">
            {project.place} · {project.year} · {project.surface}
          </p>
          <p className="mt-4 text-lg font-light">{project.story}</p>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <p className="text-xs uppercase tracking-brand text-muted">Matières</p>
          <ul className="mt-3 grid gap-2">
            {project.materials.map((material) => (
              <li key={material} className="border-t border-line pt-2">
                {material}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">{project.tags.join(" · ")}</p>
        </div>
      </div>
    </div>
  );
}

function PieceSheet({ piece, onReserve, onImageClick }: { piece: Piece; onReserve: () => void; onImageClick: () => void }) {
  return (
    <div className="grid gap-8 px-5 py-6 md:grid-cols-2 md:px-8 md:py-8">
      <div className="bg-paper-2">
        <button
          type="button"
          className="block w-full"
          onClick={onImageClick}
          aria-label="Agrandir l'image"
        >
          <img
            src={piece.src}
            alt={piece.alt}
            loading="lazy"
            className={cn("aspect-frame w-full cursor-zoom-in hover:opacity-90 transition-opacity", piece.fit === "contain" ? "object-contain p-8" : "object-cover", piece.position === "top" && "object-top")}
          />
        </button>
      </div>
      <div>
        <p className="text-xs uppercase tracking-brand text-clay">{piece.lieu}</p>
        <p className="mt-4 text-lg font-light">{piece.note}</p>
        <dl className="mt-6 grid gap-3">
          <Row label="Matière" value={piece.material} />
          <Row label="Mesures" value={piece.dims} />
          <Row label="Prix" value={piece.price} />
          <Row label="Délai" value={piece.delay} />
        </dl>
        <button
          type="button"
          onClick={onReserve}
          className="mt-8 inline-flex min-h-11 items-center bg-clay px-5 text-sm uppercase tracking-brand text-paper hover:bg-clay-deep"
        >
          Réserver cette pièce
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 border-t border-line pt-3 text-sm">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
