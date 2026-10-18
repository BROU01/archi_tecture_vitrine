import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { toLocalePath, useI18n } from "@/lib/i18n";

const links = [
  { href: "/#atelier", label: "Atelier" },
  { href: "/#lieux", label: "Lieux" },
  { href: "/galerie", label: "Galerie" },
  { href: "/galerie#pieces", label: "Pièces" },
  { href: "/journal", label: "Journal" },
  { href: "/a-propos", label: "À propos" },
];

export function Nav() {
  const { locale, t, changeLocale } = useI18n();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [y, setY] = useState(0);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setY(window.scrollY);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open || !menuRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-menu-link]", {
        y: 18,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      });
    }, menuRef);
    return () => ctx.revert();
  }, [open]);

  const light = (pathname === "/" || pathname === "/en") && y < 40 && !open;
  const localHref = (href: string) => {
    const [path, hash] = href.split("#");
    return `${toLocalePath(path || "/", locale)}${hash ? `#${hash}` : ""}`;
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40",
        light ? "text-paper" : "border-b border-line bg-paper/95 text-ink backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <a href={localHref("/")} className="font-display text-2xl leading-none tracking-tight" aria-label="int_design">
          int<span className="text-clay">_</span>design
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {links.map((link, index) => (
            <a key={link.href} href={localHref(link.href)} className="text-sm uppercase tracking-brand">
              {t("nav")[index]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={localHref("/#rendez-vous")}
            className="hidden min-h-11 items-center bg-clay px-5 text-sm uppercase tracking-brand text-paper hover:bg-clay-deep sm:inline-flex"
          >
            {t("appointment")}
          </a>
          <button type="button" onClick={() => changeLocale(locale === "fr" ? "en" : "fr")} className="hidden min-h-11 px-2 text-xs uppercase tracking-brand sm:inline-flex" aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}>
            {locale === "fr" ? "EN" : "FR"}
          </button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? t("close") : t("menu")}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="menu-mobile" ref={menuRef} className="border-t border-line bg-paper text-ink lg:hidden">
          <nav className="flex flex-col px-5 py-4" aria-label="Mobile">
            {links.map((link, index) => (
              <a
                key={link.href}
                href={localHref(link.href)}
                data-menu-link
                className="flex min-h-11 items-center font-display text-3xl"
                onClick={() => setOpen(false)}
              >
                {t("nav")[index]}
              </a>
            ))}
            <a
              href={localHref("/#rendez-vous")}
              data-menu-link
              className="mt-3 inline-flex min-h-11 items-center justify-center bg-clay px-5 text-sm uppercase tracking-brand text-paper"
              onClick={() => setOpen(false)}
            >
              {t("book")}
            </a>
            <button type="button" data-menu-link className="mt-2 min-h-11 border border-line text-sm uppercase tracking-brand" onClick={() => changeLocale(locale === "fr" ? "en" : "fr")}>
              {locale === "fr" ? "English" : "Français"}
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
