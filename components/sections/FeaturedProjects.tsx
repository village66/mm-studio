import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/data/projects";



export default function FeaturedProjects() {
  return (
    <section
      id="portfolio"
      className="py-32 bg-[#f4f3ef]"
    >
      <Container>

        <div className="mb-16">
          <p className="uppercase tracking-[0.4em] text-xs text-neutral-500 mb-3">
            Selected Works
          </p>

          <h2 className="text-5xl font-light">
            Portfolio
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {projects.map((project, index) => (

            <Reveal key={project.title} delay={index * 0.15}>
  <div className="group cursor-pointer">

              <div className="relative aspect-[4/5] overflow-hidden">

                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

              </div>

              <div className="mt-5">

                <h3 className="text-xl font-light">
                  {project.title}
                </h3>

                <p className="text-neutral-500 mt-1">
                  {project.category}
                </p>

              </div>

                </div>
</Reveal>

))}

        </div>

      </Container>
    </section>
  );
}