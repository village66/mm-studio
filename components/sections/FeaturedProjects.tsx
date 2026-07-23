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
    /* 關鍵：關閉一屏限制，讓內容舒服展開 */
    <Section id="portfolio" className="bg-white" fullScreen={false}>
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="SELECTED PROJECTS"
            title="Featured Works"
          />
        </Reveal>

        <div className="mt-12 lg:mt-16 grid gap-8 lg:gap-10 md:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={index * 0.08}
            >
              <Link
                href={project.href}
                className="group block"
              >
                {/* 圖片採用優雅的 4/3 比例，圖片與文字完美獨立 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-neutral-100 shadow-sm transition-all duration-500 group-hover:shadow-md">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width:1024px)100vw,33vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="mt-5">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-light">
                    {project.category}
                  </p>

                  <h3 className="mt-2 text-xl lg:text-2xl font-light tracking-tight text-[#181818] transition-colors duration-300 group-hover:text-[#b89a73]">
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