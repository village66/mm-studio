export type ProjectHighlight = {
  labelZh: string;
  labelEn: string;
  valueZh: string;
  valueEn: string;
};

export type Project = {
  slug: string;

  /*
    保留舊欄位，避免其他尚未修改的元件發生錯誤。
  */
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  description: string;

  /*
    新版集合頁使用的中英文資料。
  */
  titleZh: string;
  titleEn: string;
  categoryZh: string;
  categoryEn: string;
  descriptionZh: string;
  descriptionEn: string;
  highlights: ProjectHighlight[];

  cover: string;
  images: string[];
};

export const projects: Project[] = [
  {
    slug: "private-residence",

    title: "Private Residence",
    category: "Residential",
    location: "Taoyuan",
    year: "2025",
    area: "38 sqm",
    description:
      "A curated collection exploring natural light, warm materials and refined proportions in residential design.",

    titleZh: "私宅設計選集",
    titleEn: "Private Residence Collection",
    categoryZh: "居住空間",
    categoryEn: "Residential",
    descriptionZh:
      "本選集彙整 MM Studio 對居住空間的設計觀察，從生活動線、自然採光到材質比例，呈現舒適、耐看並能長久使用的空間樣貌。",
    descriptionEn:
      "A curated collection of residential spaces shaped by everyday movement, natural light, material balance and enduring comfort.",

    highlights: [
      {
        labelZh: "規劃核心",
        labelEn: "Planning Focus",
        valueZh: "生活動線",
        valueEn: "Daily Flow",
      },
      {
        labelZh: "設計語彙",
        labelEn: "Design Language",
        valueZh: "自然與平衡",
        valueEn: "Nature & Balance",
      },
    ],

    cover: "/images/projects/project01.jpg",

    images: [
      "/images/projects/project01.jpg",
      "/images/hero/hero-home.jpg",
      "/images/hero/hero-home1.jpg",
      "/images/hero/hero-home2.jpg",
      "/images/hero/hero-home3.jpg",
    ],
  },
  {
    slug: "modern-apartment",

    title: "Modern Apartment",
    category: "Apartment",
    location: "Hsinchu",
    year: "2024",
    area: "42 sqm",
    description:
      "A contemporary apartment collection balancing clean lines, soft textures and everyday comfort.",

    titleZh: "現代寓所選集",
    titleEn: "Modern Apartment Collection",
    categoryZh: "居住空間",
    categoryEn: "Residential",
    descriptionZh:
      "以現代生活需求為基礎，重新梳理格局、收納與光線關係，透過簡潔線條與柔和材質，創造安定而自在的居住感受。",
    descriptionEn:
      "A residential collection shaped by clean lines, thoughtful storage, soft textures and the quiet rhythm of contemporary living.",

    highlights: [
      {
        labelZh: "規劃核心",
        labelEn: "Planning Focus",
        valueZh: "機能整合",
        valueEn: "Integrated Function",
      },
      {
        labelZh: "設計語彙",
        labelEn: "Design Language",
        valueZh: "簡潔與柔和",
        valueEn: "Clean & Soft",
      },
    ],

    cover: "/images/projects/project02.jpg",

    images: [
      "/images/projects/project02.jpg",
      "/images/hero/hero-home2.jpg",
      "/images/hero/hero-home3.jpg",
      "/images/hero/hero-home4.jpg",
    ],
  },
  {
    slug: "commercial-space",

    title: "Commercial Space",
    category: "Commercial",
    location: "Taipei",
    year: "2024",
    area: "85 sqm",
    description:
      "A commercial collection exploring brand identity, spatial clarity and customer experience.",

    titleZh: "商業空間選集",
    titleEn: "Commercial Space Collection",
    categoryZh: "商業空間",
    categoryEn: "Commercial",
    descriptionZh:
      "本選集聚焦品牌定位、空間識別與使用動線，透過材質、光線與比例建立清楚的空間語言，提升品牌形象與顧客體驗。",
    descriptionEn:
      "A collection of commercial interiors shaped by brand identity, spatial clarity, material expression and customer experience.",

    highlights: [
      {
        labelZh: "規劃核心",
        labelEn: "Planning Focus",
        valueZh: "品牌體驗",
        valueEn: "Brand Experience",
      },
      {
        labelZh: "設計語彙",
        labelEn: "Design Language",
        valueZh: "識別與秩序",
        valueEn: "Identity & Order",
      },
    ],

    cover: "/images/projects/project03.jpg",

    images: [
      "/images/projects/project03.jpg",
      "/images/hero/hero-home4.jpg",
      "/images/hero/hero-home3.jpg",
      "/images/hero/hero-home2.jpg",
    ],
  },
];