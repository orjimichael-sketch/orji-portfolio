import { whatIDo } from "@/content/site";
import SectionHeading from "@/components/SectionHeading";

/**
 * Numbered service rows in the reference pattern: "01  Label ……… chips".
 * Content unchanged from the old What-I-Do columns.
 */
export default function Services() {
  return (
    <section
      id="what-i-do"
      aria-labelledby="whatido-heading"
      className="mx-auto w-full max-w-[1240px] px-4 sm:px-6"
    >
      <div
        id="whatido-heading"
        className="rounded-[var(--radius-card)] bg-card p-6 sm:p-10 lg:p-14"
      >
        <SectionHeading eyebrow={whatIDo.heading} title={whatIDo.title} />

        <ol className="mt-12">
          {whatIDo.columns.map((col, i) => (
            <li key={col.id} className="grid gap-4 border-t border-line py-8 lg:grid-cols-12 lg:gap-12">
              <div className="flex items-baseline gap-6 lg:col-span-4">
                <span className="text-[13px] tabular-nums text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-medium tracking-tight text-ink sm:text-2xl">
                  {col.label}
                </h3>
              </div>
              <div className="lg:col-span-8">
                <ul className="flex max-w-2xl flex-wrap gap-2.5">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className={`rounded-full border px-4 py-2 text-[13px] ${
                        col.primary
                          ? "border-ink bg-ink text-white"
                          : "border-line-strong text-body"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
