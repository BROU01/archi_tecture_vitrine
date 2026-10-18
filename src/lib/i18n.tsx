import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";

export type Locale = "fr" | "en";

const copy = {
  fr: {
    nav: ["Atelier", "Lieux", "Galerie", "Pièces", "Journal", "À propos"],
    appointment: "Rendez-vous",
    book: "Prendre rendez-vous",
    menu: "Ouvrir le menu",
    close: "Fermer le menu",
    skip: "Aller au contenu",
    footer: "Atelier d’architecture intérieure et extérieure. Lomé, et les lieux qui s’y rattachent.",
    writing: "Écrire",
    gallery: "Galerie des lieux",
    pieces: "Pièces phares",
    journal: "Journal de l'atelier",
    about: "À propos",
  },
  en: {
    nav: ["Studio", "Places", "Gallery", "Objects", "Journal", "About"],
    appointment: "Meet us",
    book: "Book an appointment",
    menu: "Open menu",
    close: "Close menu",
    skip: "Skip to content",
    footer: "An interior and exterior architecture studio. Lomé, and the places connected to it.",
    writing: "Write to us",
    gallery: "Places gallery",
    pieces: "Signature objects",
    journal: "Studio journal",
    about: "About",
  },
} as const;

type I18n = { locale: Locale; t: (key: keyof (typeof copy)["fr"]) => string; changeLocale: (locale: Locale) => void };
const I18nContext = createContext<I18n | null>(null);

function localizedPath(pathname: string, locale: Locale) {
  const plain = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return locale === "en" ? `/en${plain === "/" ? "" : plain}` : plain;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const [locale, setLocale] = useState<Locale>(() => (pathname.startsWith("/en") ? "en" : "fr"));

  useEffect(() => {
    const pathLocale: Locale = pathname.startsWith("/en") ? "en" : "fr";
    setLocale(pathLocale);
    document.documentElement.lang = pathLocale;
    if (!localStorage.getItem("int-design-locale") && pathname === "/") {
      const preferred: Locale = navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
      if (preferred !== "fr") void navigate({ href: localizedPath(pathname, preferred), replace: true });
    }
  }, [navigate, pathname]);

  const value = useMemo<I18n>(() => ({
    locale,
    t: (key) => copy[locale][key] as string,
    changeLocale: (next) => {
      localStorage.setItem("int-design-locale", next);
      void navigate({ href: localizedPath(pathname, next) });
    },
  }), [locale, navigate, pathname]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}

export function toLocalePath(path: string, locale: Locale) {
  return localizedPath(path, locale);
}
