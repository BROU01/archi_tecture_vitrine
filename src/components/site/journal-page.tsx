import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, X } from "lucide-react";
import { useAnimeReveal } from "@/components/site/anime-motion";
import { usePageMotion } from "@/components/site/motion-root";
import { journalEntries, type JournalEntry } from "@/data/journal";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function JournalPage() {
  const ref = useRef<HTMLElement>(null);
  usePageMotion(ref);
  useAnimeReveal(ref);
  const navigate = useNavigate();
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  const categories = ["tous", "chantier", "matière", "lieu", "pièce"] as const;
  const [categoryFilter, setCategoryFilter] = useState<(typeof categories)[number]>("tous");

  const filteredEntries =
    categoryFilter === "tous"
      ? journalEntries
      : journalEntries.filter((entry) => entry.category === categoryFilter);

  return (
    <main id="contenu" ref={ref} className="pt-16">
      <header className="mx-auto w-full max-w-7xl px-5 pt-12 pb-8 md:px-8 md:pt-20">
        <p className="text-xs uppercase tracking-brand text-muted">Journal</p>
        <h1 data-rise className="mt-3 max-w-3xl font-display text-display font-medium">
          Notes de terrain.
        </h1>
        <p data-rise className="mt-5 max-w-xl text-lg font-light text-muted">
          Ce que nous apprenons sur le chantier, dans l'atelier, et sur les lieux que nous habitons.
          Pas de promotion, juste des traces.
        </p>
        <div className="mt-8 flex flex-wrap gap-2" role="toolbar" aria-label="Filtrer le journal">
          {categories.map((cat) => {
            const on = categoryFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={on}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "min-h-9 px-3 text-xs uppercase tracking-brand",
                  on ? "bg-clay text-paper" : "border border-line text-ink hover:border-ink",
                )}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            );
          })}
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-5 pb-20 md:px-8">
        <ul className="grid gap-12 md:grid-cols-2">
          {filteredEntries.map((entry, index) => (
            <li key={entry.id} data-rise>
              <article className="group cursor-pointer" onClick={() => setSelectedEntry(entry)}>
                <div className="aspect-video overflow-hidden bg-paper-2">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="size-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-3">
                    <time className="text-xs uppercase tracking-brand text-muted">
                      {format(new Date(entry.date), "dd MMMM yyyy", { locale: fr })}
                    </time>
                    <span className="text-xs uppercase tracking-brand text-clay">
                      {entry.category}
                    </span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-medium group-hover:text-clay transition-colors">
                    {entry.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-muted">{entry.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm uppercase tracking-brand">
                    Lire la note
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
        {filteredEntries.length === 0 ? (
          <p className="py-16 text-muted">Aucune note dans cette catégorie.</p>
        ) : null}
      </section>

      {selectedEntry ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/95"
          role="dialog"
          aria-modal="true"
          aria-label={selectedEntry.title}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 inline-flex size-11 items-center justify-center rounded-full bg-paper/10 text-paper hover:bg-paper/20"
            aria-label="Fermer"
            onClick={() => setSelectedEntry(null)}
          >
            <X className="size-5" />
          </button>
          <div className="relative flex max-h-[90vh] max-w-[90vw] flex-col overflow-y-auto px-5 py-8 md:px-12 md:py-12">
            <div className="mx-auto w-full max-w-3xl">
              <div className="aspect-video overflow-hidden bg-paper-2 mb-8">
                <img src={selectedEntry.image} alt={selectedEntry.title} className="size-full object-cover" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <time className="text-xs uppercase tracking-brand text-paper/60">
                  {format(new Date(selectedEntry.date), "dd MMMM yyyy", { locale: fr })}
                </time>
                <span className="text-xs uppercase tracking-brand text-clay">
                  {selectedEntry.category}
                </span>
              </div>
              <h2 className="font-display text-3xl font-medium text-paper mb-6">{selectedEntry.title}</h2>
              <p className="text-lg text-paper/80 mb-8">{selectedEntry.excerpt}</p>
              <div className="space-y-6 text-paper/90">
                {selectedEntry.content.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
