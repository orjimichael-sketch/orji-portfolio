import Link from "next/link";
import { profile } from "@/content/site";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-[1200px] flex-col items-center justify-center px-4 sm:px-6">
      <div className="w-full rounded-[var(--radius-card)] bg-card p-8 text-center sm:p-14">
        <p className="text-[11px] uppercase tracking-[0.14em] text-faint">404</p>
        <h1 className="mt-4 text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-ink">
          This page doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-body">
          The page you&apos;re looking for was moved, renamed, or never existed.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full bg-ink px-6 text-[13px] font-medium text-white transition-colors hover:bg-[#2a2c31]"
          >
            Back to home
          </Link>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-11 items-center rounded-full border border-line-strong px-6 text-[13px] font-medium text-ink transition-colors hover:border-ink"
          >
            Email me
          </a>
        </div>
      </div>
    </main>
  );
}
