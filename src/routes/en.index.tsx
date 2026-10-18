import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/home-page";

export const Route = createFileRoute("/en/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "int_design — Interior & exterior architecture" },
      { name: "description", content: "int_design is an architecture studio in Lomé creating interiors, landscapes and signature objects." },
      { property: "og:locale", content: "en_US" },
    ],
    links: [
      { rel: "alternate", hrefLang: "fr", href: "/" },
      { rel: "alternate", hrefLang: "en", href: "/en" },
      { rel: "alternate", hrefLang: "x-default", href: "/" },
    ],
  }),
});
