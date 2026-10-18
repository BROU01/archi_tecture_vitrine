import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/site/about-page";

export const Route = createFileRoute("/a-propos")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "À propos — int_design" },
      {
        name: "description",
        content: "L'équipe int_design : architectes d'intérieur et d'extérieur basés à Lomé. Notre philosophie, notre histoire et nos valeurs.",
      },
    ],
  }),
});
