import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFrame } from "@/components/site/site-frame";
import appCss from "../styles.css?url";

const APP_NAME = "int_design";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "int_design, atelier d’architecture intérieure et extérieure à Lomé. Lieux, paysages et pièces signature.",
      },
      { name: "theme-color", content: "#f3efe6" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: APP_NAME },
      { property: "og:title", content: "int_design — Architecture intérieure & extérieure" },
      {
        property: "og:description",
        content: "Atelier int_design à Lomé. Architecture intérieure, extérieure, paysage et pièces signature.",
      },
      { property: "og:image", content: "/og.jpg" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "int_design — Architecture intérieure & extérieure" },
      {
        name: "twitter:description",
        content: "Atelier int_design à Lomé. Architecture intérieure, extérieure, paysage et pièces signature.",
      },
      { name: "twitter:image", content: "/og.jpg" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "int_design",
          url: "https://int-design.studio",
          logo: "https://int-design.studio/logo.png",
          description: "Atelier d'architecture intérieure et extérieure à Lomé. Lieux, paysages et pièces signature.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "14 rue des Flamboyants",
            addressLocality: "Tokoin",
            addressRegion: "Lomé",
            addressCountry: "TG",
          },
          contactPoint: {
            "@type": "ContactPoint",
            email: "atelier@int-design.studio",
            contactType: "customer service",
            areaServed: "FR",
            availableLanguage: ["fr"],
          },
          sameAs: [
            "https://www.instagram.com/intdesign.studio",
            "https://www.facebook.com/intdesign.studio",
          ],
        }),
      },
    ],
  }),
  component: () => (
    <html lang="fr" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="overflow-x-clip bg-paper font-sans text-ink">
        <PreviewHostBridge />
        <AuthProvider>
          <SiteFrame>
            <Outlet />
          </SiteFrame>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
