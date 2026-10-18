import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/site/about-page";

export const Route = createFileRoute("/en/a-propos")({
  component: AboutPage,
  head: () => ({ meta: [{ title: "About — int_design" }, { name: "description", content: "Meet the Lomé-based architecture studio behind int_design." }] }),
});
