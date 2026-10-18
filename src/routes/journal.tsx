import { createFileRoute } from "@tanstack/react-router";
import { JournalPage } from "@/components/site/journal-page";

export const Route = createFileRoute("/journal")({
  component: JournalPage,
  head: () => ({
    meta: [
      { title: "Journal — int_design" },
      {
        name: "description",
        content: "Le journal de l'atelier int_design : chantiers, matières, lieux et pièces. Notes de terrain sur l'architecture au golfe.",
      },
    ],
  }),
});
