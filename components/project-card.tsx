import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { getCategoryLabel, projects, type Project } from "@/lib/data/business";

interface ProjectCardProps {
  readonly project: Project;
  readonly className?: string;
  readonly imageClassName?: string;
  readonly imageSizes?: string;
  readonly compact?: boolean;
}

export function ProjectCard({
  project,
  className = "",
  imageClassName = "aspect-[4/5]",
  imageSizes = "(min-width: 1024px) 48vw, 100vw",
  compact = false,
}: ProjectCardProps) {
  const editorialIndex = `${String(project.id).padStart(2, "0")}/${String(projects.length).padStart(2, "0")}`;

  return (
    <article className={className}>
      <Link href={`/projetos/${project.slug}`} className="group/card block rounded-sm">
        <div className={`relative overflow-hidden bg-sage-pale ${imageClassName}`}>
          {/* WHY: cards e galerias permanecem lazy; somente a imagem única do hero compete pelo LCP. */}
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={imageSizes}
            style={{ objectPosition: project.cover.position }}
            className="object-cover transition-transform duration-700 ease-organic group-hover/card:scale-[1.025] group-focus-visible/card:scale-[1.025]"
          />
          <span className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-petal/95 text-content-onLight opacity-100 shadow-soft transition-[opacity,transform] duration-500 ease-organic group-hover/card:-translate-y-1 group-hover/card:translate-x-1 group-focus-visible/card:-translate-y-1 group-focus-visible/card:translate-x-1 sm:right-6 sm:top-6 sm:h-12 sm:w-12 lg:opacity-0 lg:group-hover/card:opacity-100 lg:group-focus-visible/card:opacity-100">
            <ArrowUpRightIcon className="h-5 w-5" />
          </span>
        </div>
        <div className={`${compact ? "flex flex-col gap-2 py-4 sm:flex-row sm:gap-4 sm:py-5" : "flex gap-5 py-5 sm:py-6"} relative items-start justify-between border-b border-stroke after:absolute after:-bottom-px after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-700 after:ease-organic group-hover/card:after:scale-x-100 group-focus-visible/card:after:scale-x-100`}>
          <div>
            <p className="text-[0.61rem] font-semibold uppercase tracking-[0.17em] text-accent-text">
              <span className="mr-2 inline-block tabular-nums text-content-muted">{editorialIndex}</span>
              {getCategoryLabel(project.category)} · {project.location}
            </p>
            <h3 className={`mt-2 font-editorial font-medium leading-none tracking-[-0.025em] text-content transition-colors duration-500 group-hover/card:text-accent-text group-focus-visible/card:text-accent-text ${compact ? "text-xl sm:text-3xl lg:text-4xl" : "text-[1.8rem] sm:text-4xl"}`}>
              {project.title}
            </h3>
          </div>
          <span className={`${compact ? "pt-0 sm:pt-1" : "pt-1"} text-xs font-medium text-content-muted`}>{project.year}</span>
        </div>
      </Link>
    </article>
  );
}
