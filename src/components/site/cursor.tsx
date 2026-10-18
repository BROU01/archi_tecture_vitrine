import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const move = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
      const hot = (event.target as Element | null)?.closest?.("a, button, [data-cursor]");
      gsap.to(el, { scale: hot ? 1.7 : 1, duration: 0.35, ease: "power3.out" });
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="cursor-dot pointer-events-none fixed top-0 left-0 z-50 size-8 rounded-full border border-clay"
    />
  );
}
