import Image from "next/image";
import { hero, profile } from "@/content/site";
import CTA from "@/components/ui/CTA";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section id="home" aria-label="Introduction" className="relative">
      <div className="mx-auto flex min-h-[92svh] max-w-[1200px] flex-col justify-center px-4 pt-28 pb-14 sm:px-6">
        <Reveal>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </Reveal>

        {/* Identity */}
        <Reveal delay={90}>
          <h1 className="mt-8 text-[clamp(3.5rem,11vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.02em] text-ink">
            {hero.nameLines[0]}
            <br />
            {hero.nameLines[1]}
          </h1>
        </Reveal>

        <Reveal delay={170}>
          <p className="mt-6 text-xl font-medium tracking-tight text-body sm:text-2xl">
            {hero.titleLines[0]} <span className="text-faint">·</span> {hero.titleLines[1]}
          </p>
        </Reveal>

        <Reveal delay={250}>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-body sm:text-base">
            {hero.intro}
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={330}>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTA href={hero.primaryCta.href} variant="solid">
              {hero.primaryCta.label} <span aria-hidden="true">↓</span>
            </CTA>
            <CTA href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label} <span aria-hidden="true">→</span>
            </CTA>
          </div>
        </Reveal>

        {/* Meta strip */}
        <Reveal delay={410}>
          <dl className="mt-16 grid grid-cols-1 gap-6 border-t border-line-strong pt-6 sm:grid-cols-3">
            {hero.meta.map((m) => (
              <div key={m.term}>
                <dt className="text-[11px] uppercase tracking-[0.14em] text-faint">{m.term}</dt>
                <dd className="mt-1.5 text-sm text-ink">{m.detail}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Portrait card — split media block echoing the reference's hero: */}
      {/* photo left, statement right. Falls back to the placeholder slot */}
      {/* if /public/portrait.jpg is ever removed. */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal delay={480}>
          <figure className="m-0 grid overflow-hidden rounded-[var(--radius-card)] border border-line bg-card sm:grid-cols-12">
            {/* Photo */}
            <div className="relative min-h-[320px] sm:col-span-5 sm:min-h-[380px] lg:col-span-4">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 42vw, 92vw"
                className="object-cover object-[center_28%]"
                priority
              />
            </div>

            {/* Statement */}
            <figcaption className="flex flex-col justify-between gap-8 p-7 sm:col-span-7 sm:p-10 lg:col-span-8">
              <div>
                <Eyebrow>Currently</Eyebrow>
                <p className="mt-5 max-w-[46ch] text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl">
                  {profile.currentFocus}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <p className="flex items-center gap-2.5 text-sm text-body">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-50" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
                  </span>
                  {profile.availability}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                  {profile.wordmarkShort} — {profile.location}
                </p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
