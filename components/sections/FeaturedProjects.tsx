import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/design/SectionTitle";

const projects = [
  {
    title: "Private Residence",
    category: "Residential",
    image: "/images/projects/project01.jpg",
    href: "/portfolio/private-residence",
  },
  {
    title: "Modern Apartment",
    category: "Apartment",
    image: "/images/projects/project02.jpg",
    href: "/portfolio/modern-apartment",
  },
  {
    title: "Commercial Space",
    category: "Commercial",
    image: "/images/projects/project03.jpg",
    href: "/portfolio/commercial-space",
  },
];

export default function FeaturedProjects() {
  return (
    <Section id="portfolio" className="bg-white">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="SELECTED PROJECTS"
            title="Featured Works"
          />
        </Reveal>

        <div className="mt-20 grid gap-10 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={index * 0.08}
            >
              <Link
                href={project.href}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-neutral-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width:1024px)100vw,33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="mt-6">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                    {project.category}
                  </p>

                  <h3 className="mt-3 text-[30px] font-light tracking-tight text-[#181818] transition-colors duration-300 group-hover:text-[#b89a73]">
                    {project.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}