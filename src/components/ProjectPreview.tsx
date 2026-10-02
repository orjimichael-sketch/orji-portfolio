import Image from "next/image";
import type { Project } from "@/content/site";

/**
 * Website preview inside a restrained browser frame.
 *
 * With a real screenshot (`preview.image`): the frame shows the capture;
 * on hover (desktop, motion allowed) the tall screenshot slowly pans to
 * reveal the full page — CSS only, no libraries.
 *
 * Without a screenshot yet: an intentional slot is rendered instead of a
 * fake screenshot. Drop a capture into /public/projects/ and set
 * `preview.image` in src/content/site.ts.
 */
export default function ProjectPreview({ project }: { project: Project }) {
  const { preview } = project;

  return (
    <figure className="preview-frame group relative m-0">
      {/* Browser chrome */}
      <div className="flex h-9 items-center gap-2 rounded-t-[var(--radius-card-sm)] border border-b-0 border-line-strong bg-raised px-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2 w-2 rounded-full bg-faint/60" />
          <i className="h-2 w-2 rounded-full bg-faint/60" />
          <i className="h-2 w-2 rounded-full bg-faint/60" />
        </span>
        {/* Never fabricate a domain — projects without one get an honest label. */}
        <span className="ml-2 truncate text-[11px] tracking-wide text-faint">
          {preview.domain ?? "Live link coming soon"}
        </span>
      </div>

      {/* Viewport */}
      <div
        className="preview-viewport relative aspect-[4/3] overflow-hidden rounded-b-[var(--radius-card-sm)] border border-line-strong bg-canvas sm:aspect-[16/10]"
        style={{ containerType: "size" }}
      >
        {preview.image ? (
          <Image
            src={preview.image}
            alt={`Preview of the ${project.name} website`}
            width={1600}
            height={1200}
            sizes="(min-width: 1024px) 58vw, 92vw"
            className="preview-canvas h-auto w-full max-w-none object-cover object-top"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 border-b-[3px] border-ink bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(16,17,20,0.025)_10px,rgba(16,17,20,0.025)_20px)] px-6 text-center">
            <p className="text-[11px] uppercase tracking-[0.18em] text-faint">Preview slot</p>
            <p className="max-w-[26ch] text-[13px] leading-relaxed text-faint">
              Screenshot pending — drop a capture into{" "}
              <code className="text-body">/public/projects/</code> and set{" "}
              <code className="text-body">preview.image</code>.
            </p>
          </div>
        )}

        {/* Hover affordance — desktop only */}
        {preview.image && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 bottom-3 hidden rounded-full bg-ink/85 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block"
          >
            Scroll preview
          </span>
        )}
      </div>

      {project.links.live && (
        <figcaption className="mt-3 text-[13px] text-faint">
          Live at{" "}
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer noopener"
            className="text-ink underline-offset-4 hover:underline"
          >
            {preview.domain ?? "the live site"}
          </a>
        </figcaption>
      )}
    </figure>
  );
}
