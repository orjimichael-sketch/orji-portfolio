import { skills } from "@/content/site";
import SectionHeading from "@/components/SectionHeading";

/**
 * Skills as a marquee band — the reference's clients-logo strip, filled
 * with real skill names instead of logos. Two independent rows scroll in
 * opposite directions; content is duplicated for a seamless loop and the
 * track pauses on hover. Reduced-motion users see static rows.
 */
function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden" aria-hidden="false">
      <ul
        className={`marquee-track flex w-max items-center gap-4 ${reverse ? "[animation-direction:reverse]" : ""}`}
      >
        {doubled.map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-4 whitespace-nowrap"
          >
            <span className="rounded-full border border-line-strong bg-card px-5 py-2.5 text-sm text-body">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  // Flatten groups into two alternating rows for the band.
  const rowA = [...skills[0].items, ...skills[2].items];
  const rowB = [...skills[1].items, ...skills[3].items];

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="mx-auto w-full max-w-[1240px] overflow-x-clip px-4 sm:px-6"
    >
      <div
        id="skills-heading"
        className="rounded-[var(--radius-card)] bg-card p-6 sm:p-10 lg:p-14"
      >
        <SectionHeading
          eyebrow="Skills"
          title="The toolkit — and the people skills behind it."
        />

        <div className="mt-12 space-y-4">
          <MarqueeRow items={rowA} />
          <MarqueeRow items={rowB} reverse />
        </div>

        {/* Screen-reader-friendly complete list */}
        <ul className="sr-only">
          {skills.map((g) => (
            <li key={g.id}>
              {g.label}: {g.items.join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
