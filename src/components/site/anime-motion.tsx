import { useEffect, type RefObject } from "react";

/**
 * anime.js v4 layer — scroll-entry choreography for `[data-anime]` children.
 * IntersectionObserver batches elements as they enter the viewport, then a
 * single `animate()` per batch with `stagger` does the wave. Elements start
 * visible in markup (no CSS flash); opacity is only dropped by JS, and left
 * untouched under `prefers-reduced-motion`.
 */
export function useAnimeReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-anime]"));
    if (!nodes.length) return;

    let disposed = false;
    let io: IntersectionObserver | undefined;

    void (async () => {
      const { animate, stagger } = await import("animejs");
      if (disposed) return;

      for (const node of nodes) {
        node.style.opacity = "0";
      }

      io = new IntersectionObserver(
        (entries) => {
          const fresh = entries.filter((entry) => entry.isIntersecting);
          if (!fresh.length) return;
          const batch = fresh.map((entry) => {
            io?.unobserve(entry.target);
            return entry.target as HTMLElement;
          });
          animate(batch, {
            translateY: [36, 0],
            opacity: [0, 1],
            scale: [0.965, 1],
            duration: 950,
            ease: "outExpo",
            delay: stagger(110),
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
      );
      for (const node of nodes) io.observe(node);
    })();

    return () => {
      disposed = true;
      io?.disconnect();
      for (const node of nodes) node.style.opacity = "";
    };
  }, [ref]);
}

/** Spring-pop used on confirmation cards (form sent, etc.). */
export function animePop(node: HTMLElement) {
  void (async () => {
    const { animate } = await import("animejs");
    animate(node, {
      opacity: [0, 1],
      translateY: [22, 0],
      scale: [0.93, 1],
      duration: 750,
      ease: "outBack(1.4)",
    });
  })();
}
