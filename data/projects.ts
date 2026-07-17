export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  cover: string;
  images: string[];
  description: string;
};

export const projects: Project[] = [
  {
    slug: "private-residence",
    title: "Private Residence",
    category: "Residential",
    location: "Taoyuan",
    year: "2025",
    area: "38 sqm",
    cover: "/images/projects/project01.jpg",
    images: [
      "/images/projects/project01.jpg",
      "/images/hero/hero-home.jpg",
      "/images/hero/hero-home1.jpg",
      "/images/hero/hero-home2.jpg",
      "/images/hero/hero-home3.jpg",
    ],
    description:
      "A timeless residence designed with natural light, warm materials and refined proportions.",
  },
  {
    slug: "modern-apartment",
    title: "Modern Apartment",
    category: "Apartment",
    location: "Hsinchu",
    year: "2024",
    area: "42 sqm",
    cover: "/images/projects/project02.jpg",
    images: [
      "/images/projects/project02.jpg",
      "/images/hero/hero-home2.jpg",
      "/images/hero/hero-home3.jpg",
      "/images/hero/hero-home4.jpg",
    ],
    description:
      "A contemporary apartment balancing clean lines, soft textures and everyday comfort.",
  },
  {
    slug: "commercial-space",
    title: "Commercial Space",
    category: "Commercial",
    location: "Taipei",
    year: "2024",
    area: "85 sqm",
    cover: "/images/projects/project03.jpg",
    images: [
      "/images/projects/project03.jpg",
      "/images/hero/hero-home4.jpg",
      "/images/hero/hero-home3.jpg",
      "/images/hero/hero-home2.jpg",
    ],
    description:
      "A commercial environment designed to express brand identity with clarity and elegance.",
  },
];