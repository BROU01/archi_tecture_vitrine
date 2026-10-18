import type { ReactNode } from "react";
import { Cursor } from "@/components/site/cursor";
import { Footer } from "@/components/site/footer";
import { MotionRoot } from "@/components/site/motion-root";
import { Nav } from "@/components/site/nav";
import { I18nProvider, useI18n } from "@/lib/i18n";

export function SiteFrame({ children }: { children: ReactNode }) {
  return <I18nProvider><SiteFrameContents>{children}</SiteFrameContents></I18nProvider>;
}

function SiteFrameContents({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2"
      >
        {t("skip")}
      </a>
      <Nav />
      <Cursor />
      <MotionRoot>
        {children}
        <Footer />
      </MotionRoot>
    </>
  );
}
