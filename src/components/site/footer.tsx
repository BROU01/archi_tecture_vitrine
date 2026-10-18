import { toLocalePath, useI18n } from "@/lib/i18n";

export function Footer() {
  const { locale, t } = useI18n();
  const href = (path: string) => toLocalePath(path, locale);
  return (
    <footer className="border-t border-line bg-paper text-ink">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <p className="font-display text-4xl leading-none">
            int<span className="text-clay">_</span>design
          </p>
          <p className="mt-4 max-w-sm text-muted">
            {t("footer")}
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-brand text-muted">Atelier</p>
          <p className="mt-3">
            14 rue des Flamboyants
            <br />
            Tokoin, Lomé
          </p>
          <p className="mt-3 text-muted">Mardi — samedi, sur rendez-vous</p>
        </div>
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-brand text-muted">{t("writing")}</p>
          <a className="mt-3 block underline-offset-4 hover:underline" href="mailto:atelier@int-design.studio">
            atelier@int-design.studio
          </a>
          <div className="mt-6 flex flex-col gap-2">
            <a href={href("/galerie")} className="underline-offset-4 hover:underline">
              {t("gallery")}
            </a>
            <a href={`${href("/galerie")}#pieces`} className="underline-offset-4 hover:underline">
              {t("pieces")}
            </a>
            <a href={href("/journal")} className="underline-offset-4 hover:underline">
              {t("journal")}
            </a>
            <a href={href("/a-propos")} className="underline-offset-4 hover:underline">
              {t("about")}
            </a>
            <a href={`${href("/")}#rendez-vous`} className="underline-offset-4 hover:underline">
              {t("book")}
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 border-t border-line px-5 py-5 text-sm text-muted md:flex-row md:justify-between md:px-8">
        <p>© 2026 int_design</p>
        <p>Lomé · Kpalimé · Aného · Cotonou · Paris</p>
      </div>
    </footer>
  );
}
