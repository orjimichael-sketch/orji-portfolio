import { projects } from "@/content/site";
import SectionHeading from "@/components/SectionHeading";
import ProjectRow from "@/components/ProjectRow";

export default function ProjectList() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="mx-auto w-full max-w-[1240px] px-4 sm:px-6"
    >
      <div id="work-heading" className="rounded-[var(--radius-card)] bg-card p-6 sm:p-10 lg:p-14">
        <SectionHeading
          eyebrow="Selected work"
          title="Four products, built end to end."
          description="Storefront, logistics, learning, and hospitality — each project covers the full path from data model to deployed interface."
        />

        <div className="mt-4">
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} flip={i % 2 === 1} />
          ))}
        </div>

        <p className="mt-6 text-center text-[13px] text-faint">
          More work in the pipeline — live links are added as projects ship.
        </p>
      </div>
    </section>
  );
}
