"use client";

import { useState } from "react";
import { faq } from "@/content/site";
import SectionHeading from "@/components/SectionHeading";

/**
 * FAQ accordion in the reference pattern: numbered questions on the right,
 * circular +/× toggle, hairline dividers. One item open at a time.
 * Buttons are keyboard-accessible with aria-expanded/controls.
 */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-heading" className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
      <div id="faq-heading" className="rounded-[var(--radius-card)] bg-card p-6 sm:p-10 lg:p-14">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions." />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Questions */}
          <ol className="lg:col-span-8 lg:col-start-5">
            {faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-t border-line">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="grid w-full grid-cols-[2.5rem_1fr_auto] items-start gap-4 py-6 text-left"
                    >
                      <span className="pt-1 text-[13px] tabular-nums text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg font-medium leading-snug tracking-tight text-ink sm:text-xl">
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-lg text-ink transition-transform duration-300 ${
                          isOpen ? "rotate-45 bg-ink text-white" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    hidden={!isOpen}
                    className="pb-6"
                  >
                    <p className="max-w-2xl pl-[3.5rem] text-[15px] leading-relaxed text-body">
                      {item.a}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
