import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/home-page";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "int_design — Architecture intérieure & extérieure" },
      {
        name: "description",
        content:
          "Atelier int_design à Lomé. Architecture intérieure, extérieure, paysage et pièces signature.",
      },
    ],
  }),
});
