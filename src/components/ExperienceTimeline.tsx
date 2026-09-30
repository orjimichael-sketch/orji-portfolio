import { experience } from "@/content/site";
import SectionHeading from "@/components/SectionHeading";

/**
 * Experience as numbered rows in the reference's service-list pattern:
 * "01  Period / Role — Org" with bullet points and focus tags on the right.
 */
export default function ExperienceTimeline() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mx-auto w-full max-w-[1240px] px-4 sm:px-6"
    >
      <div
        id="experience-heading"
        className="rounded-[var(--radius-card)] bg-card p-6 sm:p-10 lg:p-14"
      >
        <SectionHeading eyebrow={experience.heading} title={experience.title} />

        <ol className="mt-12">
          {experience.entries.map((entry, i) => (
            <li key={entry.id} className="grid gap-4 border-t border-line py-8 lg:grid-cols-12 lg:gap-12">
              <div className="flex items-baseline gap-6 lg:col-span-5">
                <span className="text-[13px] tabular-nums text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  {entry.period && (
                    <p className="text-[11px] uppercase tracking-[0.12em] text-faint">
                      {entry.period}
                    </p>
                  )}
                  <h3 className="mt-1 text-xl font-medium tracking-tight text-ink sm:text-2xl">
                    {entry.title}
                  </h3>
                  <p className="mt-1 text-sm text-body">{entry.org}</p>
                </div>
              </div>

              <div className="lg:col-span-7">
                {entry.context && (
                  <p className="text-sm leading-relaxed text-body">{entry.context}</p>
                )}
                <ul className="mt-3 space-y-2">
                  {entry.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm leading-relaxed text-body">
                      <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-faint" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex flex-wrap gap-2">
                  {entry.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-line-strong px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-faint"
                    >
                      {f}
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
