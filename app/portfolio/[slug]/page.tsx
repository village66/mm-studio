import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import ProjectLightbox from "@/components/gallery/ProjectLightbox";

import { projects } from "@/data/projects";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];

  const previousProject =
    projectIndex > 0 ? projects[projectIndex - 1] : null;

  const nextProject =
    projectIndex < projects.length - 1
      ? projects[projectIndex + 1]
      : null;

  return (
    <main className="bg-[#f8f8f5] min-h-screen pt-32 pb-24">
      <Container>
        {/* Back */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm uppercase tracking-[0.25em] text-neutral-500 transition hover:text-black"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Category */}
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
          {project.category}
        </p>

        {/* Title */}
        <h1 className="mt-5 text-5xl md:text-6xl font-extralight tracking-tight text-neutral-900">
          {project.title}
        </h1>

        {/* Info */}
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.2em] text-neutral-500">
          <span>{project.location}</span>
          <span>•</span>
          <span>{project.area}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>

        {/* Hero */}
        <div className="relative mt-20 aspect-[16/9] overflow-hidden rounded-sm">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Description */}
        <div className="mt-20 max-w-3xl">
          <p className="text-lg leading-9 text-neutral-600">
            {project.description}
          </p>
        </div>

        {/* Gallery */}
        <ProjectLightbox
          title={project.title}
          images={project.images}
        />

        {/* Navigation */}
        <div className="mt-24 flex justify-between border-t border-neutral-300 pt-10">
          <div>
            {previousProject && (
              <>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  Previous Project
                </p>

                <Link
                  href={`/portfolio/${previousProject.slug}`}
                  className="mt-3 inline-block text-2xl font-light transition hover:underline"
                >
                  {previousProject.title}
                </Link>
              </>
            )}
          </div>

          <div className="text-right">
            {nextProject && (
              <>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  Next Project
                </p>

                <Link
                  href={`/portfolio/${nextProject.slug}`}
                  className="mt-3 inline-block text-2xl font-light transition hover:underline"
                >
                  {nextProject.title}
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}