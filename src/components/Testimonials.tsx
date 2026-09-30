"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/content/site";

/**
 * Testimonial carousel in the reference pattern: white cards in a
 * horizontally scrollable row, thin progress bar, circular prev/next
 * Cards are real quotes; the Sample tag renders only for entries flagged `sample: true` (see CONTENT-CHECKLIST.md).
 * quotes exist (see CONTENT-CHECKLIST.md).
 */
export default function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      el.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="testimonials-heading" className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div
        id="testimonials-heading"
        className="rounded-[var(--radius-card)] bg-canvas p-6 sm:p-10 lg:p-14"
      >
        <p id="testimonials-heading" className="flex items-center gap-2.5 text-[15px] font-medium text-ink">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink" />
          Testimonials
        </p>

        <ul
          ref={trackRef}
          className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <li
              key={t.name}
              className="flex w-[85%] shrink-0 snap-start flex-col justify-between rounded-2xl border border-line bg-card p-7 sm:w-[46%] lg:w-[31.5%]"
            >
              <blockquote className="text-[15px] leading-relaxed text-ink">“{t.quote}”</blockquote>
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
                <div>
                  <p className="flex items-center gap-2 font-medium text-ink">
                    {t.name}
                    {t.sample && (
                      <span className="rounded-full border border-line-strong px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-faint">
                        Sample
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-sm text-body">{t.role}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-faint"
                >
                  ”
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Controls — only where the track actually overflows; hidden on lg+ where all cards fit. */}
        <div className="mt-8 flex items-center gap-6 lg:hidden">
          <div
            className="h-0.5 flex-1 overflow-hidden rounded-full bg-line-strong"
            role="presentation"
          >
            <div
              className="h-full rounded-full bg-ink transition-[width] duration-200"
              style={{ width: `${Math.max(12, progress * 100)}%` }}
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-card text-ink transition-colors hover:border-ink"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-card text-ink transition-colors hover:border-ink"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
