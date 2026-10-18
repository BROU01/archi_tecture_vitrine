import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/site/gallery-page";

export const Route = createFileRoute("/en/galerie")({
  component: GalleryPage,
  head: () => ({ meta: [{ title: "Gallery — int_design" }, { name: "description", content: "A selection of residential, hospitality and landscape work by int_design." }] }),
});
