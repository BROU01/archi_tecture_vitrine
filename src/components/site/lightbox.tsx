import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type Image = {
  src: string;
  alt: string;
  caption?: string;
};

type LightboxProps = {
  images: Image[];
  initialIndex?: number;
  onClose: () => void;
};

export function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (!imgRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      imgRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
    );
  }, [index]);

  function next() {
    setIndex((prev) => (prev + 1) % images.length);
  }

  function prev() {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  const current = images[index];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/95"
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse d'images"
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 inline-flex size-11 items-center justify-center rounded-full bg-paper/10 text-paper hover:bg-paper/20"
        aria-label="Fermer"
        onClick={onClose}
      >
        <X className="size-5" />
      </button>

      <button
        type="button"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 inline-flex size-12 items-center justify-center rounded-full bg-paper/10 text-paper hover:bg-paper/20 disabled:opacity-30"
        aria-label="Image précédente"
        onClick={prev}
        disabled={images.length <= 1}
      >
        <ChevronLeft className="size-6" />
      </button>

      <button
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 inline-flex size-12 items-center justify-center rounded-full bg-paper/10 text-paper hover:bg-paper/20 disabled:opacity-30"
        aria-label="Image suivante"
        onClick={next}
        disabled={images.length <= 1}
      >
        <ChevronRight className="size-6" />
      </button>

      <div className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center justify-center px-4">
        <img
          ref={imgRef}
          src={current.src}
          alt={current.alt}
          className="max-h-[85vh] max-w-full object-contain"
        />
        {current.caption && (
          <p className="mt-4 text-center text-sm text-paper/80">{current.caption}</p>
        )}
        {images.length > 1 && (
          <div className="mt-4 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={cn(
                  "h-1 w-8 rounded-full transition-all",
                  i === index ? "bg-clay" : "bg-paper/30"
                )}
                aria-label={`Aller à l'image ${i + 1}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
