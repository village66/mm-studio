export type ProjectHighlight = {
  labelZh: string;
  labelEn: string;
  valueZh: string;
  valueEn: string;
};

export type ProjectPhaseKey =
  | "before"
  | "progress"
  | "completed";

export type ProjectImage = {
  src: string;
  captionZh?: string;
  captionEn?: string;
};

export type ProjectPhase = {
  key: ProjectPhaseKey;
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  images: ProjectImage[];
};

export type ProjectCase = {
  id: string;
  titleZh: string;
  titleEn: string;
  storyZh: string;
  storyEn: string;
  phases: ProjectPhase[];
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
  cases: ProjectCase[];
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
    categoryZh: "住宅設計",
    categoryEn: "Residential Design",
    descriptionZh:
      "本選集彙整 MM Studio 對住宅設計的觀察，從生活動線、自然採光到材質比例，呈現舒適、耐看並能長久使用的空間樣貌。",
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

    cases: [
      {
        id: "residence-01",
        titleZh: "自然光宅",
        titleEn: "Residence in Natural Light",
        storyZh:
          "由生活動線出發，整合採光、收納與材質比例，讓公共空間保持開闊，也讓日常使用更自然安定。",
        storyEn:
          "A home shaped by natural light, integrated storage and a calm rhythm for everyday living.",
        phases: [
          {
            key: "completed",
            titleZh: "完成空間",
            titleEn: "Completed",
            summaryZh:
              "以光線、材質與生活尺度，呈現空間完成後的整體氛圍與細節。",
            images: [
              {
                src: "/images/projects/project01.jpg",
                captionZh: "公共空間與日常動線",
              },
              {
                src: "/images/hero/hero-home.jpg",
                captionZh: "自然採光與材質層次",
              },
              {
                src: "/images/hero/hero-home1.jpg",
                captionZh: "收納與立面整合",
              },
              {
                src: "/images/hero/hero-home2.jpg",
                captionZh: "空間比例與生活尺度",
              },
              {
                src: "/images/hero/hero-home3.jpg",
                captionZh: "完成空間細節",
              },
            ],
          },
        ],
      },
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
    categoryZh: "住宅設計",
    categoryEn: "Residential Design",
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

    cases: [
      {
        id: "apartment-01",
        titleZh: "光序寓所",
        titleEn: "Apartment of Light",
        storyZh:
          "重新梳理玄關、公共空間與收納關係，以簡潔線條引導光線，建立兼具機能、秩序與柔和感的居住環境。",
        storyEn:
          "A contemporary apartment where light, circulation and integrated storage create a quiet sense of order.",
        phases: [
          {
            key: "completed",
            titleZh: "完成空間",
            titleEn: "Completed",
            summaryZh:
              "以簡潔線條、柔和材質與整合收納，呈現現代寓所的安定日常。",
            images: [
              {
                src: "/images/projects/project02.jpg",
                captionZh: "玄關機能與展示收納",
              },
              {
                src: "/images/hero/hero-home2.jpg",
                captionZh: "公共空間的光線關係",
              },
              {
                src: "/images/hero/hero-home3.jpg",
                captionZh: "材質銜接與空間層次",
              },
              {
                src: "/images/hero/hero-home4.jpg",
                captionZh: "完成空間細節",
              },
            ],
          },
        ],
      },
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
    categoryZh: "商業設計",
    categoryEn: "Commercial Design",
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

    cover:
      "/images/projects/commercial/commercial-01/cover/cover-01.jpg",

    images: [
      "/images/projects/commercial/commercial-01/completed/completed-01.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-02.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-03.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-04.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-05.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-06.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-07.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-08.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-09.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-10.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-11.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-12.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-13.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-14.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-15.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-16.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-17.jpg",
      "/images/projects/commercial/commercial-01/completed/completed-18.jpg",
    ],

    cases: [
      {
        id: "commercial-01",
        titleZh: "品牌空間",
        titleEn: "Brand Space",
        storyZh:
          "從品牌定位與顧客動線出發，整合空間識別、材質表現與使用機能，讓環境成為品牌體驗的一部分。",
        storyEn:
          "A commercial environment shaped by brand identity, customer flow and a clear material language.",
        phases: [
          {
            key: "before",
            titleZh: "原始空間",
            titleEn: "Before",
            summaryZh:
              "從既有格局、現場條件與使用需求出發，釐清空間限制與改造方向。",
            images: [
              {
                src: "/images/projects/commercial/commercial-01/before/before-01.jpg",
                captionZh: "原始空間與現場條件",
              },
              {
                src: "/images/projects/commercial/commercial-01/before/before-02.jpg",
                captionZh: "既有格局與使用動線",
              },
              {
                src: "/images/projects/commercial/commercial-01/before/before-03.jpg",
                captionZh: "改造前空間細節",
              },
            ],
          },
          {
            key: "progress",
            titleZh: "設計實現",
            titleEn: "In Progress",
            summaryZh:
              "透過工程整合、現場協調與細節確認，逐步將設計規劃落實於空間。",
            images: [
              {
                src: "/images/projects/commercial/commercial-01/progress/progress-01.jpg",
                captionZh: "工程施作與現場整合",
              },
              {
                src: "/images/projects/commercial/commercial-01/progress/progress-02.jpg",
                captionZh: "格局與介面施工",
              },
              {
                src: "/images/projects/commercial/commercial-01/progress/progress-03.jpg",
                captionZh: "設備與管線協調",
              },
              {
                src: "/images/projects/commercial/commercial-01/progress/progress-04.jpg",
                captionZh: "空間結構逐步成形",
              },
              {
                src: "/images/projects/commercial/commercial-01/progress/progress-05.jpg",
                captionZh: "材質與施工細節確認",
              },
              {
                src: "/images/projects/commercial/commercial-01/progress/progress-06.jpg",
                captionZh: "現場工程品質管理",
              },
              {
                src: "/images/projects/commercial/commercial-01/progress/progress-07.jpg",
                captionZh: "設計細節落實",
              },
              {
                src: "/images/projects/commercial/commercial-01/progress/progress-08.jpg",
                captionZh: "完工前整體檢視",
              },
            ],
          },
          {
            key: "completed",
            titleZh: "完成空間",
            titleEn: "Completed",
            summaryZh:
              "透過品牌識別、使用動線與材質表現，呈現空間完成後的整體體驗與細節。",
            images: [
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-01.jpg",
                captionZh: "完成空間與主要動線",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-02.jpg",
                captionZh: "空間識別與整體氛圍",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-03.jpg",
                captionZh: "材質表現與比例關係",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-04.jpg",
                captionZh: "使用情境與空間細節",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-05.jpg",
                captionZh: "立面設計與機能整合",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-06.jpg",
                captionZh: "光線與材質層次",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-07.jpg",
                captionZh: "空間轉折與視覺延伸",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-08.jpg",
                captionZh: "細部工藝與收邊",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-09.jpg",
                captionZh: "空間機能與使用體驗",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-10.jpg",
                captionZh: "品牌氛圍與視覺焦點",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-11.jpg",
                captionZh: "材質銜接與設計細節",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-12.jpg",
                captionZh: "整體配置與空間關係",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-13.jpg",
                captionZh: "空間尺度與動線安排",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-14.jpg",
                captionZh: "燈光配置與情境營造",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-15.jpg",
                captionZh: "展示機能與立面細節",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-16.jpg",
                captionZh: "完成空間局部視角",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-17.jpg",
                captionZh: "整體氛圍與空間層次",
              },
              {
                src: "/images/projects/commercial/commercial-01/completed/completed-18.jpg",
                captionZh: "完成空間設計細節",
              },
            ],
          },
        ],
      },
    ],
  },
];
