import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, X, Maximize2, Camera, Building2, Armchair } from "lucide-react";
import gsap from "gsap";
import { useAnimeReveal } from "@/components/site/anime-motion";
import { usePageMotion } from "@/components/site/motion-root";
import { Lightbox } from "@/components/site/lightbox";
import {
  galleryPhotos,
  pieceById,
  pieces,
  projectById,
  projects,
  type GalleryCategory,
  type GalleryPhoto,
  type Piece,
  type Project,
  type Tag,
} from "@/data/studio";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

type MainTab = "photos" | "projets" | "pieces";
type Filter = "tous" | Tag;
type LocationFilter = "tous" | "Lomé" | "Paris" | "Aného" | "Kpalimé" | "Cotonou";
type YearFilter = "tous" | "2025" | "2024" | "2023" | "2022";
type Selection = { kind: "project"; id: string } | { kind: "piece"; id: string };

const projectFilters: { id: Filter; label: string }[] = [
  { id: "tous", label: "Tous" },
  { id: "Intérieur", label: "Intérieur" },
  { id: "Extérieur", label: "Extérieur" },
  { id: "Paysage", label: "Paysage" },
];

const photoCategories: { id: GalleryCategory; label: string }[] = [
  { id: "Tous", label: "Tous" },
  { id: "Salons & Séjours", label: "Salons & Séjours" },
  { id: "Cuisines & Repas", label: "Cuisines & Repas" },
  { id: "Chambres & Bains", label: "Chambres & Bains" },
  { id: "Architecture & Escaliers", label: "Architecture & Escaliers" },
  { id: "Mobilier & Luminaires", label: "Mobilier & Luminaires" },
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
  const { locale } = useI18n();
  const en = locale === "en";
  const navigate = useNavigate();
  const pageRef = useRef<HTMLElement>(null);
  usePageMotion(pageRef);
  useAnimeReveal(pageRef);

  const [activeTab, setActiveTab] = useState<MainTab>("photos");
  const [photoCategory, setPhotoCategory] = useState<GalleryCategory>("Tous");
  const [projectFilter, setProjectFilter] = useState<Filter>("tous");
  const [locationFilter, setLocationFilter] = useState<LocationFilter>("tous");
  const [yearFilter, setYearFilter] = useState<YearFilter>("tous");

  const [selection, setSelection] = useState<Selection | null>(null);
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt: string; caption?: string }[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const panelRef = useRef<HTMLElement>(null);

  // Filtered photos
  const filteredPhotos = galleryPhotos.filter((photo) => {
    const categoryMatch = photoCategory === "Tous" || photo.category === photoCategory;
    const locationMatch = locationFilter === "tous" || photo.place === locationFilter;
    const yearMatch = yearFilter === "tous" || photo.year === yearFilter;
    return categoryMatch && locationMatch && yearMatch;
  });

  // Filtered projects
  const visibleProjects = projects.filter((project) => {
    const tagMatch = projectFilter === "tous" || project.tags.includes(projectFilter);
    const locationMatch = locationFilter === "tous" || project.place === locationFilter;
    const yearMatch = yearFilter === "tous" || project.year === yearFilter;
    return tagMatch && locationMatch && yearMatch;
  });

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    if (id === "pieces") {
      setActiveTab("pieces");
      return;
    }
    if (id === "projets") {
      setActiveTab("projets");
      return;
    }
    if (id === "photos") {
      setActiveTab("photos");
      return;
    }
    const node = document.getElementById(id);
    if (node) {
      requestAnimationFrame(() => node.scrollIntoView({ block: "start" }));
    }
    if (projectById(id)) {
      setActiveTab("projets");
      setSelection({ kind: "project", id });
    }
    if (pieceById(id)) {
      setActiveTab("pieces");
      setSelection({ kind: "piece", id });
    }
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
        <p className="text-xs uppercase tracking-brand text-muted">
          {en ? "Gallery & Archives" : "Galerie & Archives"}
        </p>
        <h1 data-rise className="mt-3 max-w-3xl font-display text-display font-medium">
          {en
            ? "Places, pieces and atelier photographic archives."
            : "Les lieux, les pièces et les clichés d'atelier."}
        </h1>
        <p data-rise className="mt-5 max-w-2xl text-lg font-light text-muted">
          {en
            ? "Explore our complete photographic gallery, our architectural projects in Lomé, the Gulf and Paris, and our crafted furniture collection."
            : "Explorez notre photothèque complète (51 clichés), nos réalisations architecturales à Lomé, dans le golfe et à Paris, ainsi que notre ligne de mobilier d'édition."}
        </p>

        {/* Tab switcher */}
        <div className="mt-10 flex flex-wrap gap-3 border-b border-line pb-6">
          <button
            type="button"
            onClick={() => setActiveTab("photos")}
            className={cn(
              "inline-flex min-h-12 items-center gap-2.5 px-5 text-sm uppercase tracking-brand transition-colors",
              activeTab === "photos"
                ? "bg-ink text-paper"
                : "border border-line bg-paper text-ink hover:border-ink hover:bg-foam",
            )}
          >
            <Camera className="size-4 text-clay" />
            <span>{en ? "All Photos" : "Tous les clichés"}</span>
            <span
              className={cn(
                "ml-1 rounded-full px-2 py-0.5 text-xs font-mono",
                activeTab === "photos" ? "bg-paper/20 text-paper" : "bg-foam text-muted",
              )}
            >
              {galleryPhotos.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("projets")}
            className={cn(
              "inline-flex min-h-12 items-center gap-2.5 px-5 text-sm uppercase tracking-brand transition-colors",
              activeTab === "projets"
                ? "bg-ink text-paper"
                : "border border-line bg-paper text-ink hover:border-ink hover:bg-foam",
            )}
          >
            <Building2 className="size-4 text-clay" />
            <span>{en ? "Architecture Projects" : "Projets d'architecture"}</span>
            <span
              className={cn(
                "ml-1 rounded-full px-2 py-0.5 text-xs font-mono",
                activeTab === "projets" ? "bg-paper/20 text-paper" : "bg-foam text-muted",
              )}
            >
              {projects.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pieces")}
            className={cn(
              "inline-flex min-h-12 items-center gap-2.5 px-5 text-sm uppercase tracking-brand transition-colors",
              activeTab === "pieces"
                ? "bg-ink text-paper"
                : "border border-line bg-paper text-ink hover:border-ink hover:bg-foam",
            )}
          >
            <Armchair className="size-4 text-clay" />
            <span>{en ? "Pieces & Editions" : "Pièces & Édition"}</span>
            <span
              className={cn(
                "ml-1 rounded-full px-2 py-0.5 text-xs font-mono",
                activeTab === "pieces" ? "bg-paper/20 text-paper" : "bg-foam text-muted",
              )}
            >
              {pieces.length}
            </span>
          </button>
        </div>

        {/* Filters depending on tab */}
        <div className="mt-6 flex flex-col gap-4" role="toolbar" aria-label="Filtrer la sélection">
          {activeTab === "photos" && (
            <div className="flex flex-wrap gap-2">
              {photoCategories.map((item) => {
                const on = photoCategory === item.id;
                const count =
                  item.id === "Tous"
                    ? galleryPhotos.length
                    : galleryPhotos.filter((p) => p.category === item.id).length;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setPhotoCategory(item.id)}
                    className={cn(
                      "inline-flex min-h-10 items-center gap-2 px-3.5 text-xs uppercase tracking-brand transition-colors",
                      on ? "bg-clay text-paper" : "border border-line text-ink hover:border-ink hover:bg-foam",
                    )}
                  >
                    <span>{item.label}</span>
                    <span className={cn("text-[10px] opacity-75", on ? "text-paper" : "text-muted")}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === "projets" && (
            <div className="flex flex-wrap gap-2">
              {projectFilters.map((item) => {
                const on = projectFilter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setProjectFilter(item.id)}
                    className={cn(
                      "min-h-10 px-4 text-xs uppercase tracking-brand transition-colors",
                      on ? "bg-ink text-paper" : "border border-line text-ink hover:border-ink hover:bg-foam",
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}

          {activeTab !== "pieces" && (
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="self-center pr-2 text-xs uppercase tracking-brand text-muted">
                {en ? "Location:" : "Lieu :"}
              </span>
              {locationFilters.map((item) => {
                const on = locationFilter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setLocationFilter(item.id)}
                    className={cn(
                      "min-h-8 px-2.5 text-[11px] uppercase tracking-brand transition-colors",
                      on ? "bg-ink text-paper" : "border border-line text-ink hover:border-ink hover:bg-foam",
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* VIEW 1: TOUS LES CLICHÉS (PHOTOS GALLERY) */}
      {activeTab === "photos" && (
        <section className="mx-auto w-full max-w-7xl px-5 pb-24 md:px-8" aria-label="Photothèque de l'atelier">
          <div className="mb-6 flex items-center justify-between text-xs text-muted uppercase tracking-brand">
            <span>
              {filteredPhotos.length} {en ? "photos displayed" : "clichés affichés"}
            </span>
            <span>{en ? "Click a photo to zoom" : "Cliquez une photo pour agrandir"}</span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredPhotos.map((photo, index) => (
              <figure
                key={photo.id}
                data-anime
                className="group relative flex flex-col overflow-hidden border border-line/60 bg-paper transition-shadow hover:shadow-lg"
              >
                <button
                  type="button"
                  data-cursor
                  className="relative aspect-4/3 w-full overflow-hidden bg-paper-2 text-left"
                  onClick={() =>
                    openLightbox(
                      filteredPhotos.map((p) => ({
                        src: p.src,
                        alt: p.alt,
                        caption: `${p.title} — ${p.place} (${p.category})`,
                      })),
                      index,
                    )
                  }
                  aria-label={`Agrandir ${photo.title}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-night/0 transition-colors duration-300 group-hover:bg-night/25 flex items-center justify-center">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-paper/90 text-ink opacity-0 shadow-md backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100">
                      <Maximize2 className="size-4" />
                    </span>
                  </div>
                  <span className="absolute top-2.5 right-2.5 bg-paper/90 px-2 py-0.5 text-[10px] uppercase tracking-brand text-ink shadow-xs backdrop-blur-xs">
                    {photo.place}
                  </span>
                </button>
                <figcaption className="flex flex-1 flex-col justify-between p-3.5">
                  <div>
                    <p className="text-[10px] uppercase tracking-brand text-clay">{photo.category}</p>
                    <h3 className="mt-1 font-display text-base font-medium text-ink line-clamp-1">{photo.title}</h3>
                  </div>
                  <p className="mt-2 text-xs text-muted line-clamp-2">{photo.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="py-20 text-center text-muted">
              <p>{en ? "No photo matching these criteria." : "Aucun cliché ne correspond à ces critères."}</p>
              <button
                type="button"
                onClick={() => {
                  setPhotoCategory("Tous");
                  setLocationFilter("tous");
                  setYearFilter("tous");
                }}
                className="mt-4 border border-line px-4 py-2 text-xs uppercase tracking-brand hover:border-ink"
              >
                {en ? "Reset filters" : "Réinitialiser les filtres"}
              </button>
            </div>
          )}
        </section>
      )}

      {/* VIEW 2: PROJETS D'ARCHITECTURE */}
      {activeTab === "projets" && (
        <section className="mx-auto w-full max-w-7xl px-5 pb-24 md:px-8" aria-label="Projets d'architecture">
          <ul className="grid grid-cols-1 items-start gap-x-8 gap-y-14 md:grid-cols-12">
            {visibleProjects.map((project) => {
              const frame = project.frames[0];
              return (
                <li
                  key={project.id}
                  id={project.id}
                  data-anime
                  className={cn(
                    "work-card scroll-mt-28",
                    project.span === "12"
                      ? "md:col-span-12"
                      : project.span === "7"
                        ? "md:col-span-7"
                        : "md:col-span-5",
                  )}
                >
                  <button
                    type="button"
                    data-cursor
                    className="block w-full text-left"
                    onClick={() => setSelection({ kind: "project", id: project.id })}
                  >
                    <div
                      data-zoom
                      data-clip
                      className={cn(
                        "relative overflow-hidden bg-paper-2",
                        project.ratio === "portrait"
                          ? "aspect-portrait"
                          : project.ratio === "video"
                            ? "aspect-video"
                            : "aspect-land",
                        project.span === "12" && "md:aspect-video",
                      )}
                    >
                      <img
                        src={frame.src}
                        alt={frame.alt}
                        width={frame.width}
                        height={frame.height}
                        className="size-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-3 left-3 bg-paper/90 px-2.5 py-1 text-[11px] uppercase tracking-brand text-ink shadow-xs backdrop-blur-xs">
                        {project.frames.length} {en ? "views" : "clichés"}
                      </div>
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
          {visibleProjects.length === 0 ? (
            <p className="py-16 text-muted">
              {en ? "No project matching these criteria." : "Aucun projet dans cette famille."}
            </p>
          ) : null}
        </section>
      )}

      {/* VIEW 3: PIÈCES & MOBILIER D'ÉDITION */}
      {activeTab === "pieces" && (
        <section id="pieces" className="scroll-mt-24 border-t border-line bg-foam py-16 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
            <p className="text-xs uppercase tracking-brand text-muted">
              {en ? "Signature collection" : "Pièces phares"}
            </p>
            <h2 data-rise className="mt-3 max-w-2xl font-display text-display font-medium">
              {en ? "The atelier collection, shown where it lives." : "La ligne atelier, montrée là où elle vit."}
            </h2>
            <p data-rise className="mt-4 max-w-xl text-muted">
              {en
                ? "Limited editions designed and crafted in our workshops. Prices ex-atelier."
                : "Éditions courtes, fabriquées à Lomé et dans nos ateliers partenaires. Les prix sont départ atelier. Le délai commence à la validation des matières."}
            </p>

            <div className="mt-14 grid gap-16">
              {pieces.map((piece, index) => (
                <article
                  key={piece.id}
                  id={piece.id}
                  data-rise
                  className="grid scroll-mt-28 items-center gap-8 md:grid-cols-12"
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
                        <dt className="text-muted">{en ? "Material" : "Matière"}</dt>
                        <dd className="text-right">{piece.material}</dd>
                      </div>
                      <div className="flex justify-between gap-6 border-t border-line pt-3">
                        <dt className="text-muted">{en ? "Dimensions" : "Mesures"}</dt>
                        <dd>{piece.dims}</dd>
                      </div>
                      <div className="flex justify-between gap-6 border-t border-line pt-3">
                        <dt className="text-muted">{en ? "Edition" : "Édition"}</dt>
                        <dd className="font-medium">{piece.price}</dd>
                      </div>
                      <div className="flex justify-between gap-6 border-t border-line pt-3">
                        <dt className="text-muted">{en ? "Lead time" : "Délai"}</dt>
                        <dd>{piece.delay}</dd>
                      </div>
                    </dl>
                    <p className="mt-5 text-muted">{piece.note}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setSelection({ kind: "piece", id: piece.id })}
                        className="inline-flex min-h-11 items-center gap-2 border border-line px-5 text-sm uppercase tracking-brand hover:border-ink"
                      >
                        {en ? "View details" : "Voir la pièce"}
                        <ArrowUpRight className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => reserve(piece.title)}
                        className="inline-flex min-h-11 items-center bg-ink px-5 text-sm uppercase tracking-brand text-paper hover:bg-night-2"
                      >
                        {en ? "Reserve this piece" : "La réserver"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DRAWERS & MODALS */}
      {activeProject ? (
        <Detail onClose={requestClose} panelRef={panelRef} title={activeProject.title}>
          <ProjectSheet
            project={activeProject}
            onImageClick={(idx) =>
              openLightbox(
                activeProject.frames.map((f) => ({ src: f.src, alt: f.alt, caption: f.caption })),
                idx,
              )
            }
          />
        </Detail>
      ) : null}
      {activePiece ? (
        <Detail onClose={requestClose} panelRef={panelRef} title={activePiece.title}>
          <PieceSheet
            piece={activePiece}
            onReserve={() => reserve(activePiece.title)}
            onImageClick={() => openLightbox([{ src: activePiece.src, alt: activePiece.alt }])}
          />
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
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center"
            aria-label="Fermer la fiche"
          >
            <X className="size-5" />
          </button>
        </div>
        {children}
      </article>
    </div>
  );
}

function ProjectSheet({
  project,
  onImageClick,
}: {
  project: Project;
  onImageClick: (index: number) => void;
}) {
  return (
    <div className="grid gap-8 px-5 py-6 md:px-8 md:py-8">
      <div className="grid gap-6">
        {project.frames.map((frame, index) => (
          <figure key={frame.src}>
            <button
              type="button"
              className="block w-full text-left group"
              onClick={() => onImageClick(index)}
              aria-label={`Agrandir l'image ${index + 1}`}
            >
              <div className="relative overflow-hidden bg-paper-2">
                <img
                  src={frame.src}
                  alt={frame.alt}
                  width={frame.width}
                  height={frame.height}
                  className="w-full object-cover cursor-zoom-in transition-opacity group-hover:opacity-90"
                />
                <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 bg-paper/85 px-2 py-1 text-[11px] text-ink backdrop-blur-xs">
                  <Maximize2 className="size-3" />
                  Agrandir
                </span>
              </div>
            </button>
            <figcaption className="mt-2 text-sm text-muted">{frame.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-12 border-t border-line pt-6">
        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-brand text-muted">
            {project.place} · {project.year} · {project.surface}
          </p>
          <p className="mt-4 text-lg font-light leading-relaxed">{project.story}</p>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <p className="text-xs uppercase tracking-brand text-muted">Matières</p>
          <ul className="mt-3 grid gap-2">
            {project.materials.map((material) => (
              <li key={material} className="border-t border-line pt-2 text-sm">
                {material}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs uppercase tracking-brand text-muted">Typologie</p>
          <p className="mt-2 text-sm text-ink">{project.tags.join(" · ")}</p>
        </div>
      </div>
    </div>
  );
}

function PieceSheet({
  piece,
  onReserve,
  onImageClick,
}: {
  piece: Piece;
  onReserve: () => void;
  onImageClick: () => void;
}) {
  return (
    <div className="grid gap-8 px-5 py-6 md:grid-cols-2 md:px-8 md:py-8">
      <div className="bg-paper-2">
        <button
          type="button"
          className="block w-full group relative"
          onClick={onImageClick}
          aria-label="Agrandir l'image"
        >
          <img
            src={piece.src}
            alt={piece.alt}
            loading="lazy"
            className={cn(
              "aspect-frame w-full cursor-zoom-in transition-opacity group-hover:opacity-90",
              piece.fit === "contain" ? "object-contain p-8" : "object-cover",
              piece.position === "top" && "object-top",
            )}
          />
          <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 bg-paper/85 px-2 py-1 text-[11px] text-ink backdrop-blur-xs">
            <Maximize2 className="size-3" />
            Agrandir
          </span>
        </button>
      </div>
      <div>
        <p className="text-xs uppercase tracking-brand text-clay">{piece.lieu}</p>
        <p className="mt-4 text-lg font-light leading-relaxed">{piece.note}</p>
        <dl className="mt-6 grid gap-3">
          <Row label="Matière" value={piece.material} />
          <Row label="Mesures" value={piece.dims} />
          <Row label="Prix départ atelier" value={piece.price} />
          <Row label="Délai de fabrication" value={piece.delay} />
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
