import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/site/gallery-page";
import { projects } from "@/data/studio";

export const Route = createFileRoute("/galerie")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: "Galerie — int_design" },
      {
        name: "description",
        content: "Lieux et pièces phares de l'atelier int_design : villas, hôtels, paysages, mobilier d'édition.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Galerie — int_design" },
      { property: "og:description", content: "Lieux et pièces phares de l'atelier int_design : villas, hôtels, paysages, mobilier d'édition." },
      { property: "og:image", content: "/og.jpg" },
      { property: "og:url", content: "https://int-design.studio/galerie" },
    ],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Galerie",
          description: "Lieux et pièces phares de l'atelier int_design : villas, hôtels, paysages, mobilier d'édition.",
          url: "https://int-design.studio/galerie",
          mainEntity: projects.map((p) => ({
            "@type": "CreativeWork",
            name: p.title,
            description: p.excerpt,
            image: p.frames[0].src,
            dateCreated: `${p.year}-01-01`,
            locationCreated: {
              "@type": "Place",
              name: p.place,
              addressCountry: p.place === "Paris" ? "FR" : "TG",
            },
          })),
        }),
      },
    ],
  }),
});
