import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import type { FeaturedProject } from "@/components/sections/FeaturedProjects";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";

import AutoPlayUnlock from "@/components/audio/AutoPlayUnlock";
import { getFeaturedContentProjects } from "@/lib/content-engine/production-projects";

const categoryFor = (services: readonly string[]): FeaturedProject["category"] => {
  const value = services.join(" ");
  if (/商業|店面|辦公/.test(value)) return "commercial";
  if (/老屋|翻新|改造/.test(value)) return "renovation";
  return "residential";
};

export default async function Home() {
  const contentProjects: FeaturedProject[] = (await getFeaturedContentProjects()).map(({ bundle }) => ({
    id: bundle.website.slug,
    titleZh: bundle.website.title,
    titleEn: bundle.website.title,
    category: categoryFor(bundle.website.services),
    image: `/content-assets/${bundle.website.slug}/${bundle.website.coverImage}`,
    href: `/portfolio/${bundle.website.slug}`,
  }));

  return (
    <main className="min-h-screen bg-[#f8f8f5] text-[#111111]">
      <AutoPlayUnlock />

      <Header />
      <Hero />
      <About />
      <Services />
      <FeaturedProjects contentProjects={contentProjects} />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
