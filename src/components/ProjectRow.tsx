import type { Project } from "@/content/site";
import ProjectPreview from "@/components/ProjectPreview";
import { SocialIcon } from "@/lib/social-icons";

/**
 * Reference-style case-study row: ● category tag, large title, description,
 * a row of three big stat blocks, and an "Explore →" link — with the preview
 * on the other side. Alternates sides via `flip`. Stacks on mobile.
 */
export default function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <article className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-14">
      {/* Preview */}
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : "lg:order-1"}`}>
        <ProjectPreview project={project} />
      </div>

      {/* Information */}
      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : "lg:order-2"}`}>
        <p className="flex items-center gap-2.5 text-[15px] font-medium text-ink">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink" />
          {project.kind}
        </p>

        <h3 className="mt-4 text-[clamp(1.9rem,3.2vw,2.6rem)] font-medium leading-[1.05] tracking-tight text-ink">
          {project.name}
        </h3>

        <p className="mt-4 text-[15px] leading-relaxed text-body">{project.description}</p>

        {/* Big stat blocks — reference signature. Values are descriptive
            placeholders until real metrics exist (see CONTENT-CHECKLIST.md). */}
        <dl className="mt-9 grid grid-cols-3 gap-4">
          {project.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="order-2 mt-1.5 text-[11px] uppercase tracking-[0.1em] text-faint">
                {stat.label}
              </dt>
              <dd className="order-1 text-[clamp(1.15rem,2vw,1.6rem)] font-medium leading-tight tracking-tight text-ink">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-7 space-y-2">
          {project.features.map((f) => (
            <li key={f} className="flex gap-3 text-sm leading-relaxed text-body">
              <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-faint" />
              {f}
            </li>
          ))}
        </ul>

        <dl className="mt-7 space-y-2 border-t border-line pt-5 text-[13px]">
          <div className="flex gap-3">
            <dt className="w-14 shrink-0 text-faint">Role</dt>
            <dd className="text-body">{project.role}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-14 shrink-0 text-faint">Stack</dt>
            <dd className="text-body">{project.tech.join(" · ")}</dd>
          </div>
        </dl>

        {(project.links.live || project.links.github) && (
          <div className="mt-7 flex gap-6">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink transition-colors hover:text-body"
              >
                Visit site <SocialIcon name="arrow" className="h-3.5 w-3.5" />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-ink transition-colors hover:text-body"
              >
                <SocialIcon name="github" className="h-4 w-4" /> Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
