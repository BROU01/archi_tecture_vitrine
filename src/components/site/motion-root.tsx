import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { useRouterState } from "@tanstack/react-router";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function usePageMotion(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cleanups: Array<() => void> = [];

      const heroImg = el.querySelector("[data-hero-img]");
      if (heroImg) {
        gsap.from(heroImg, { scale: 1.16, duration: 2.1, ease: "power2.out" });
      }

      const heroBits = el.querySelectorAll("[data-hero-bit]");
      if (heroBits.length) {
        gsap.from(heroBits, {
          y: 26,
          duration: 0.95,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.08,
        });
      }

      const rule = el.querySelector("[data-hero-rule]");
      if (rule) {
        gsap.from(rule, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          ease: "power3.out",
          delay: 0.15,
        });
      }

      // Cinematic push-out of the hero as you scroll away.
      const hero = el.querySelector<HTMLElement>("[data-hero]");
      if (hero) {
        gsap.to(hero, {
          yPercent: 14,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
      }

      const track = el.querySelector<HTMLElement>("[data-marquee]");
      if (track) {
        const tween = gsap.to(track, {
          xPercent: -50,
          duration: 36,
          ease: "none",
          repeat: -1,
        });
        const shell = track.parentElement;
        const pause = () => gsap.to(tween, { timeScale: 0, duration: 0.4 });
        const play = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });
        shell?.addEventListener("pointerenter", pause);
        shell?.addEventListener("pointerleave", play);
        cleanups.push(() => {
          shell?.removeEventListener("pointerenter", pause);
          shell?.removeEventListener("pointerleave", play);
        });

        // Type skew stretched by scroll velocity, relaxation by inertia (After Effects style).
        const proxy = { skew: 0 };
        const skewSetter = gsap.quickSetter(track, "skewX", "deg");
        const clampSkew = gsap.utils.clamp(-6, 6);
        ScrollTrigger.create({
          onUpdate: (self) => {
            const skew = clampSkew(self.getVelocity() / -300);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, {
                duration: 0.9,
                skewX: 0,
                ease: "power3.out",
                overwrite: true,
                onUpdate: () => skewSetter(proxy.skew),
              });
            }
          },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-rise]", el).forEach((node) => {
        // Headings get a masked line-by-line reveal (SplitText, After Effects style)…
        const splitCandidate = node.matches("h1, h2, h3");
        const hasRichInline = Boolean(node.querySelector("em, br, a, span, img"));
        if (splitCandidate && !hasRichInline) {
          const split = SplitText.create(node, { type: "lines", mask: "lines" });
          cleanups.push(() => split.revert());
          gsap.from(split.lines, {
            yPercent: 112,
            duration: 1.05,
            stagger: 0.09,
            ease: "power4.out",
            scrollTrigger: { trigger: node, start: "top 88%" },
          });
          return;
        }
        // …everything else rises gently.
        gsap.from(node, {
          y: 32,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: node, start: "top 88%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-draw]", el).forEach((node) => {
        gsap.from(node, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: node, start: "top 92%" },
        });
      });

      // Clip-path wipes on framed media: inset-0 to frame inset (crop reveal).
      gsap.utils.toArray<HTMLElement>("[data-clip]", el).forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: "inset(12% 9% 12% 9% round 0)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0)",
            duration: 1.25,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: frame, start: "top 86%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]", el).forEach((frame) => {
        const img = frame.querySelector("img");
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-count]", el).forEach((node) => {
        const target = Number(node.dataset.count || "0");
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 1.5,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: { trigger: node, start: "top 88%" },
          onUpdate: () => {
            node.textContent = Math.round(obj.n).toLocaleString("fr-FR");
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-zoom]", el).forEach((frame) => {
        const img = frame.querySelector("img");
        if (!img) return;
        const enter = () => gsap.to(img, { scale: 1.06, duration: 0.8, ease: "power3.out" });
        const leave = () => gsap.to(img, { scale: 1, duration: 0.8, ease: "power3.out" });
        frame.addEventListener("pointerenter", enter);
        frame.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          frame.removeEventListener("pointerenter", enter);
          frame.removeEventListener("pointerleave", leave);
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-magnetic]", el).forEach((node) => {
        const xTo = gsap.quickTo(node, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(node, "y", { duration: 0.4, ease: "power3.out" });
        const move = (event: PointerEvent) => {
          const rect = node.getBoundingClientRect();
          xTo(event.clientX - rect.left - rect.width / 2);
          yTo(event.clientY - rect.top - rect.height / 2);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        node.addEventListener("pointermove", move);
        node.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          node.removeEventListener("pointermove", move);
          node.removeEventListener("pointerleave", leave);
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      requestAnimationFrame(refresh);
      cleanups.push(() => window.removeEventListener("load", refresh));

      return () => cleanups.forEach((fn) => fn());
    });

    return () => mm.revert();
  }, [ref]);
}

export function MotionRoot({ children }: { children: ReactNode }) {
  const bar = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(el, {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.5,
            ease: "power2.inOut",
          });
        },
      },
    );
    return () => {
      tween.kill();
    };
  }, [pathname]);

  return (
    <div>
      <div
        ref={bar}
        data-route-bar
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left scale-x-0 bg-clay"
      />
      {children}
    </div>
  );
}
