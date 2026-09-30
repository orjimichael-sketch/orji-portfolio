import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/Reveal";

/**
 * Consistent section opener inside a card: ● eyebrow, then a large
 * statement title and optional lede — matching the reference's
 * "● Our services / Everything your brand needs…" pattern.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "split",
}: {
  eyebrow: string;
  title?: string;
  description?: string;
  /** "split" = eyebrow left, title right (reference pattern). "stacked" = both left. */
  align?: "split" | "stacked";
}) {
  return (
    <Reveal>
      {align === "split" ? (
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            {title && (
              <h2 className="text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-ink">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-body">{description}</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          {title && (
            <h2 className="mt-6 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-ink">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-body">{description}</p>
          )}
        </div>
      )}
    </Reveal>
  );
}
