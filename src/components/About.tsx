import { about, education } from "@/content/site";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto w-full max-w-[1240px] px-4 sm:px-6"
    >
      <div id="about-heading" className="rounded-[var(--radius-card)] bg-card p-6 sm:p-10 lg:p-14">
        <SectionHeading eyebrow={about.heading} title={about.title} />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="max-w-xl space-y-5">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-body">
                  {p}
                </p>
              ))}
            </div>

            {/* Education — merged into the About card */}
            <div className="mt-12 border-t border-line pt-8">
              <p className="text-[11px] uppercase tracking-[0.14em] text-faint">
                {education.heading}
              </p>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium tracking-tight text-ink">
                    {education.degree}
                  </h3>
                  <p className="mt-1 text-sm text-body">
                    {education.school} · {education.status}
                  </p>
                </div>
                <span className="h-fit shrink-0 rounded-full border border-line-strong px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-body">
                  {education.schoolShort}
                </span>
              </div>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-body">{education.note}</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <dl className="border-t border-line">
              {about.facts.map((f) => (
                <div
                  key={f.term}
                  className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <dt className="w-28 shrink-0 text-[11px] uppercase tracking-[0.12em] text-faint">
                    {f.term}
                  </dt>
                  <dd className="text-sm leading-relaxed text-ink">{f.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
