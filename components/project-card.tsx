import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { getCategoryLabel, type Project } from "@/lib/data/business";

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
  return (
    <article className={`group ${className}`}>
      <Link href={`/projetos/${project.slug}`} className="block rounded-sm">
        <div className={`relative overflow-hidden bg-sage-pale ${imageClassName}`}>
          {/* WHY: cards e galerias permanecem lazy; somente a imagem única do hero compete pelo LCP. */}
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={imageSizes}
            style={{ objectPosition: project.cover.position }}
            className="object-cover transition-transform duration-700 ease-organic group-hover:scale-[1.025]"
          />
          <span className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-petal/95 text-content-onLight opacity-100 shadow-soft transition-transform duration-500 ease-organic group-hover:-translate-y-1 group-hover:translate-x-1 sm:right-6 sm:top-6 sm:h-12 sm:w-12 lg:opacity-0 lg:group-hover:opacity-100">
            <ArrowUpRightIcon className="h-5 w-5" />
          </span>
        </div>
        <div className={`${compact ? "flex flex-col gap-2 py-4 sm:flex-row sm:gap-4 sm:py-5" : "flex gap-5 py-5 sm:py-6"} items-start justify-between border-b border-stroke`}>
          <div>
            <p className="text-[0.61rem] font-semibold uppercase tracking-[0.17em] text-accent-text">
              {getCategoryLabel(project.category)} · {project.location}
            </p>
            <h3 className={`mt-2 font-editorial font-medium leading-none tracking-[-0.025em] text-content ${compact ? "text-xl sm:text-3xl lg:text-4xl" : "text-[1.8rem] sm:text-4xl"}`}>
              {project.title}
            </h3>
          </div>
          <span className={`${compact ? "pt-0 sm:pt-1" : "pt-1"} text-xs font-medium text-content-muted`}>{project.year}</span>
        </div>
      </Link>
    </article>
  );
}
