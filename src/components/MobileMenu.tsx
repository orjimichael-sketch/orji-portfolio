"use client";

import { useEffect, useRef, useState } from "react";
import { nav, profile, socials } from "@/content/site";
import { SocialIcon } from "@/lib/social-icons";

/**
 * Dedicated mobile navigation — replaces the desktop links below md.
 * Opens a full rounded-card panel with large items, social links,
 * and a direct email CTA. Closes on selection, outside click, or Escape.
 */
const menuItems = [{ id: "home", label: "Home" }, ...nav] as const;

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Outside click (pointerdown anywhere outside panel + trigger).
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-card text-ink transition-colors hover:border-ink"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {/* Animated glyph: two lines morph to an X, bottom line fades out */}
        <span aria-hidden="true" className="relative block h-[10px] w-[18px]">
          <span
            className={`absolute left-0 top-0 h-px w-full bg-current transition-all duration-300 ${
              open ? "top-1/2 rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 bottom-0 h-px w-full bg-current transition-all duration-300 ${
              open ? "top-1/2 -rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
        </span>
      </button>

      {/* Panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`fixed inset-x-0 top-[4.25rem] bottom-0 z-40 px-4 transition-[opacity,visibility] duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="h-full overflow-y-auto rounded-3xl border border-line bg-card p-6 shadow-[0_24px_60px_rgba(16,17,20,0.12)]"
        >
          <ul className="flex-1">
            {menuItems.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-line py-4 text-2xl font-medium tracking-tight text-ink transition-colors hover:text-body"
                >
                  <span className="text-[11px] tabular-nums text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-body transition-colors hover:border-ink hover:text-ink"
                >
                  <SocialIcon name={s.icon} className="h-4.5 w-4.5" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:${profile.email}`}
            className="mt-6 block rounded-full bg-ink px-6 py-3.5 text-center text-[13px] font-medium text-white"
          >
            {profile.email}
          </a>

          <p className="mt-6 text-[13px] text-faint">
            {profile.wordmarkShort} — {profile.location}
          </p>
        </nav>
      </div>
    </div>
  );
}
