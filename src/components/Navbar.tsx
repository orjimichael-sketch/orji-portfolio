"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/site";
import CTA from "@/components/ui/CTA";
import MobileMenu from "@/components/MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6">
      <div
        className={`mx-auto mt-3 flex h-14 max-w-[1200px] items-center justify-between rounded-full border px-5 transition-all duration-300 sm:px-7 ${
          scrolled
            ? "border-line bg-card/95 shadow-[0_8px_30px_rgba(16,17,20,0.07)]"
            : "border-transparent bg-transparent"
        }`}
      >
        <a
          href="#home"
          className="text-[15px] font-semibold tracking-[0.04em] text-ink transition-colors hover:text-body"
        >
          {profile.wordmark}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {/* Animated underline slides in from the left on hover. */}
          {["work", "about", "experience", "skills"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="group relative text-[14px] text-ink transition-colors hover:text-body"
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </a>
          ))}
          <CTA href="#contact" variant="outline">
            Start a conversation
          </CTA>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
