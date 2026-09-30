import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Shared pill button styling so hero, nav, cards, and forms stay consistent.
 * Solid = black pill with white text (hover: slightly lifted ink).
 * Outline = hairline pill (hover: ink border/text).
 * Server-safe — plain links, no interactivity beyond CSS.
 */
const base =
  "inline-flex h-11 items-center gap-2 rounded-full px-6 text-[13px] font-medium tracking-[0.01em] transition-colors duration-200";

const variants = {
  solid: "bg-ink text-white hover:bg-[#2a2c31]",
  outline: "border border-line-strong text-ink hover:border-ink",
} as const;

export default function CTA({
  href,
  variant = "solid",
  children,
  className = "",
  ...rest
}: {
  href: string;
  variant?: keyof typeof variants;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"a">) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
