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
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  description: string;
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

type NumberedImageOptions = {
  start?: number;
  extension?: "jpg" | "JPG";
  folder?: string;
};

const makeNumberedImages = (
  base: string,
  phase: ProjectPhaseKey,
  captions: string[],
  options: NumberedImageOptions = {}
): ProjectImage[] => {
  const {
    start = 1,
    extension = "jpg",
    folder = phase,
  } = options;

  return captions.map((captionZh, index) => ({
    src: `${base}/${folder}/${phase}-${String(
      start + index
    ).padStart(2, "0")}.${extension}`,
    captionZh,
  }));
};

const makeNamedImages = (
  base: string,
  folder: string,
  files: string[],
  captions: string[]
): ProjectImage[] =>
  files.map((file, index) => ({
    src: `${base}/${folder}/${file}`,
    captionZh: captions[index],
  }));

const phase = (
  key: ProjectPhaseKey,
  summaryZh: string,
  images: ProjectImage[]
): ProjectPhase => {
  const titles = {
    before: {
      titleZh: "原始空間",
      titleEn: "Before",
    },
    progress: {
      titleZh: "設計實現",
      titleEn: "In Progress",
    },
    completed: {
      titleZh: "完成空間",
      titleEn: "Completed",
    },
  };

  return {
    key,
    ...titles[key],
    summaryZh,
    images,
  };
};

const residential01 =
  "/images/projects/residential/residence-01";
const residential02 =
  "/images/projects/residential/residence-02";
const residential03 =
  "/images/projects/residential/residence-03";
const renovation01 =
  "/images/projects/renovation/renovation-01";
const commercial01 =
  "/images/projects/commercial/commercial-01";
const commercial02 =
  "/images/projects/commercial/commercial-02";
const commercial03 =
  "/images/projects/commercial/commercial-03";
const commercial04 =
  "/images/projects/commercial/commercial-04";

const projectCollections: Project[] = [
  {
    slug: "private-residence",
    title: "New Residence Design",
    category: "Residential",
    location: "Taiwan",
    year: "Selected Works",
    area: "Multiple Projects",
    description:
      "A curated collection of new residences shaped around light, circulation and everyday living.",
    titleZh: "新屋設計選集",
    titleEn: "New Residence Collection",
    categoryZh: "住宅設計",
    categoryEn: "Residential Design",
    descriptionZh:
      "從新成屋的格局條件與居住需求出發，整合採光、動線、收納與材質比例，讓空間在初次規劃時就建立清楚秩序，成為舒適、耐看且能陪伴生活成長的家。",
    descriptionEn:
      "A collection of new residences shaped from the outset around natural light, intuitive circulation, integrated storage and enduring material balance.",
    highlights: [
      {
        labelZh: "設計核心",
        labelEn: "Design Focus",
        valueZh: "生活整合",
        valueEn: "Integrated Living",
      },
      {
        labelZh: "空間價值",
        labelEn: "Spatial Value",
        valueZh: "秩序與舒適",
        valueEn: "Order & Comfort",
      },
    ],
    cover: `${residential01}/cover/cover-01.jpg`,
    images: [],
    cases: [
      {
        id: "residence-01",
        titleZh: "柔光序居",
        titleEn: "Soft-Lit Residence",
        storyZh:
          "以客餐廳的開闊感為核心，整合電視牆、展示櫃與大容量收納；低彩度材質延續自然光線，建立安定而流暢的日常動線。",
        storyEn:
          "A calm new residence where integrated storage, a restrained palette and natural light create an open, effortless rhythm for everyday life.",
        phases: [
          phase(
            "before",
            "記錄新成屋原始格局、採光條件與公共空間尺度。",
            makeNumberedImages(
              residential01,
              "before",
              [
                "客廳原始採光與落地窗條件",
                "公共空間原始格局與開放尺度",
                "走道與房間入口的既有關係",
              ]
            )
          ),
          phase(
            "progress",
            "從木作、地坪、收納到燈光，逐步建立完整空間秩序。",
            makeNumberedImages(
              residential01,
              "progress",
              [
                "玄關與走道木作保護施工",
                "公共區域櫃體骨架與分區成形",
                "地坪找平與基礎工程確認",
                "客廳天花與電視牆基礎完成",
                "走道牆面與隱藏門介面整合",
                "櫃體板材進場與尺寸核對",
                "公共空間櫃體現場組裝",
                "電視牆、展示櫃與照明完成測試",
              ]
            )
          ),
          phase(
            "completed",
            "以柔和灰階、整合收納與間接光線，呈現舒適而清晰的居住場景。",
            makeNumberedImages(
              residential01,
              "completed",
              [
                "整合收納櫃與懸浮電視平台",
                "客廳以柔光延伸開闊視野",
                "客餐廳櫃體串聯生活動線",
                "深色電視牆平衡淺色空間",
                "餐桌望向客廳的通透關係",
                "用餐區與自然採光相互連結",
                "懸浮電視平台保留視覺輕盈感",
                "間接燈光強化電視主牆層次",
                "圓几與水平線條建立柔和節奏",
                "收納櫃與電視牆形成連續立面",
                "深淺材質對比聚焦公共空間",
                "窗邊高櫃善用狹長空間收納",
                "玻璃展示櫃成為立面視覺焦點",
                "隱藏門與展示櫃維持牆面完整",
                "臥室入口整合衣櫃與梳妝機能",
                "玄關展示櫃以燈光提升穿透感",
                "玄關櫃與大門形成俐落迎賓動線",
                "梳妝平台銜接展示櫃與房門",
              ]
            )
          ),
        ],
      },
      {
        id: "residence-02",
        titleZh: "藝境之家",
        titleEn: "Artful Residence",
        storyZh:
          "以石紋主牆、深木色與焦糖皮革建立鮮明個性，將藝術展示、餐廚機能與臥室收納納入同一設計語彙，塑造具有收藏氣質的現代居所。",
        storyEn:
          "An expressive home where marble textures, warm timber, art and tailored storage form a layered yet cohesive living experience.",
        phases: [
          phase(
            "before",
            "記錄空屋原始格局、採光、動線與既有材質，作為藝術展示與完整收納規劃的設計起點。",
            makeNumberedImages(
              residential02,
              "before",
              [
                "客餐廳原始尺度與玄關動線",
                "主牆原始條件與房間入口關係",
                "公共空間、陽台與房門動線現況",
                "臥室原始格局與既有深色地坪",
              ]
            )
          ),
          phase(
            "completed",
            "透過藝術陳設、鮮明材質與精準收納，呈現成熟而富層次的居住氛圍。",
            makeNumberedImages(
              residential02,
              "completed",
              [
                "客餐廳以藝術陳設串聯空間焦點",
                "焦糖皮革沙發增添溫潤質感",
                "石紋主牆與開放視野形成空間主軸",
                "客廳材質層次與餐區自然銜接",
                "玄關收納與端景展示整合",
                "沙發區以藝術壁飾平衡俐落線條",
                "石紋電視牆展現鮮明空間性格",
                "深木色與黑白材質建立沉穩對比",
                "餐區結合收納、展示與備餐機能",
                "吊燈與木質櫃體營造用餐氛圍",
                "餐桌望向整合式餐廚立面",
                "桌面陳設呈現精緻生活尺度",
                "餐區以光線、木質與展示創造層次",
                "電視牆的石紋與懸浮櫃細節",
                "臥室以灰階櫃體建立安定基調",
                "電視櫃與衣櫃整合臥室機能",
                "開放衣櫃兼顧收納與取用便利",
                "窗邊梳妝台善用自然採光",
                "木質床頭牆營造溫暖休憩感",
              ],
              { start: 0 }
            )
          ),
        ],
      },
      {
        id: "residence-03",
        titleZh: "黑白映居",
        titleEn: "Monochrome Residence",
        storyZh:
          "以黑、白、灰建立明確視覺秩序，透過高櫃、矮櫃與展示格整合收納需求；簡潔立面讓採光與空間尺度成為日常主角。",
        storyEn:
          "A monochrome residence defined by clean geometry, integrated cabinetry and a restrained palette that lets light and proportion take the lead.",
        phases: [
          phase(
            "before",
            "保留原始採光與開放格局，重新思考收納和生活機能的配置。",
            makeNumberedImages(
              residential03,
              "before",
              [
                "玄關與公共空間的原始格局",
                "客廳原始採光與落地窗條件",
                "空屋牆面與日照方向觀察",
              ]
            )
          ),
          phase(
            "progress",
            "以木作骨架、櫃體分割與照明配置，逐步完成黑白立面的精準比例。",
            makeNamedImages(
              residential03,
              "progress",
              [
                "progress-01.jpg",
                "progress-02.jpg",
                "progress-03.JPG",
                "progress-04.JPG",
                "progress-05.JPG",
                "progress-06.JPG",
              ],
              [
                "公共空間木作骨架與天花施工",
                "玄關櫃體骨架與門片介面確認",
                "客廳施工期間的空間尺度檢視",
                "收納櫃與展示格現場組裝",
                "照明完成後確認採光與明暗層次",
                "櫃體門片安裝與細節校正",
              ]
            )
          ),
          phase(
            "completed",
            "俐落黑白配色結合完整收納，讓小坪數公共空間維持明亮與秩序。",
            makeNumberedImages(
              residential03,
              "completed",
              [
                "玄關高櫃與客廳立面形成整體",
                "水平矮櫃延伸客廳視覺尺度",
                "黑白櫃體以比例建立簡潔焦點",
                "展示格與電視平台整合收納",
                "玄關、展示與客廳機能一體成形",
                "客餐廳保留通透的生活動線",
                "落地窗為簡約空間引入自然光",
                "玄關高櫃界定入門與公共區域",
                "臥室以木質床頭燈帶營造暖意",
                "淺木門片柔化黑白空間語彙",
                "開放展示格提供靈活收納",
                "長向電視平台放大客廳寬度",
                "從客廳望向玄關的完整空間秩序",
              ]
            )
          ),
        ],
      },
    ],
  },
  {
    slug: "modern-apartment",
    title: "Home Renovation",
    category: "Renovation",
    location: "Taiwan",
    year: "Selected Works",
    area: "Multiple Projects",
    description:
      "A curated collection transforming existing homes through structural insight, spatial renewal and precise execution.",
    titleZh: "舊屋改造選集",
    titleEn: "Home Renovation Collection",
    categoryZh: "舊屋改造",
    categoryEn: "Home Renovation",
    descriptionZh:
      "從既有建物的結構、採光與生活問題重新梳理，透過格局調整、機能更新與工程整合，保留值得延續的空間記憶，同時賦予老屋更安全、舒適且符合當代生活的全新樣貌。",
    descriptionEn:
      "A collection of existing homes renewed through structural understanding, spatial reconfiguration and careful construction—preserving character while creating safer, brighter and more contemporary ways of living.",
    highlights: [
      {
        labelZh: "改造核心",
        labelEn: "Renovation Focus",
        valueZh: "重整與延續",
        valueEn: "Renew & Preserve",
      },
      {
        labelZh: "工程價值",
        labelEn: "Project Value",
        valueZh: "安全與新生",
        valueEn: "Safety & Renewal",
      },
    ],
    cover: `${renovation01}/cover/cover-01.jpg`,
    images: [],
    cases: [
      {
        id: "renovation-01",
        titleZh: "庭院老宅新生",
        titleEn: "Courtyard House Renewal",
        storyZh:
          "從老宅外牆、庭院與室內機能全面更新，重新整理結構介面、採光通風與生活動線；以深色餐廚、開放客廳和花園平台，讓既有住宅展開更自在的新生活。",
        storyEn:
          "A comprehensive renewal of an existing courtyard house, reworking its envelope, circulation and interior functions to reconnect daily life with light, garden and open living.",
        phases: [
          phase(
            "before",
            "記錄老宅外牆、庭院與既有餐廚空間，釐清結構和生活機能問題。",
            makeNumberedImages(
              renovation01,
              "before",
              [
                "老宅外牆、窗體與設備現況",
                "既有庭院遮棚與生活設施",
                "改造前庭院地坪與植栽條件",
                "原有廚房收納與設備配置",
                "舊餐廚空間與生活動線",
              ]
            )
          ),
          phase(
            "progress",
            "從外牆開口、鋼構雨棚、庭院地坪到室內拆除，完整記錄老宅更新過程。",
            makeNumberedImages(
              renovation01,
              "progress",
              [
                "外牆立面飾材施工與垂直校正",
                "庭院清整與既有植栽保護",
                "戶外鋼構材料進場與尺寸核對",
                "外牆開口調整與門窗介面施工",
                "外牆施工架設置與立面修整",
                "庭院基礎開挖與地坪整備",
                "新舊牆體交接處防水細節",
                "戶外平台基礎與排水工程",
                "鋼構雨棚骨架現場組裝",
                "外牆塗裝與戶外樓梯完成",
                "室內天花骨架與空間介面施工",
                "雨棚主結構定位與焊接固定",
                "外牆修整、門窗與設備介面整合",
                "雨棚、樓梯與庭院立面成形",
                "室內拆除後重新配置隔間",
                "外牆金屬格柵安裝細節",
                "雨棚遮陽格柵與採光關係",
                "舊牆拆除與室內結構整理",
                "垂直格柵完成後的立面比例",
              ],
              { extension: "JPG" }
            )
          ),
          phase(
            "completed",
            "新餐廚、客廳與庭院形成連續生活場景，外觀亦以清爽立面回應既有環境。",
            makeNumberedImages(
              renovation01,
              "completed",
              [
                "庭院入口與新設玻璃門銜接室內",
                "客廳以藝術陳設與柔光營造層次",
                "餐廚展示櫃融入色彩與收藏",
                "中島吧台串聯餐廚與客廳",
                "更新後外牆與戶外樓梯全景",
                "老宅立面以柔和色彩重新整理",
                "深色餐廚整合高櫃與中島機能",
                "L 型廚房提升備餐與收納效率",
                "對外窗引入庭院採光與通風",
                "中島座位與高櫃形成完整餐廚核心",
                "庭院地坪與既有植栽重新整合",
                "新舊外牆與花園景觀自然銜接",
                "戶外平台保留開闊休憩尺度",
                "植栽圍牆與步道形成安定庭院",
                "鋼構雨棚界定半戶外生活空間",
                "雨棚與花樹共同形成庭院端景",
                "戶外平台與欄杆細節",
                "庭院步道串聯植栽與住宅入口",
                "深色廚房完工後的機能全景",
              ]
            )
          ),
        ],
      },
    ],
  },
  {
    slug: "commercial-space",
    title: "Commercial Interiors",
    category: "Commercial",
    location: "Taiwan",
    year: "Selected Works",
    area: "Multiple Projects",
    description:
      "A commercial collection connecting brand identity, customer flow and memorable spatial experience.",
    titleZh: "商業空間選集",
    titleEn: "Commercial Interior Collection",
    categoryZh: "商業空間",
    categoryEn: "Commercial Space",
    descriptionZh:
      "從品牌定位、顧客動線與營運需求出發，透過陳列策略、燈光、材質與空間識別，讓每一處商業場域兼具清楚機能、獨特記憶與舒適體驗。",
    descriptionEn:
      "A collection of commercial interiors shaped by brand positioning, customer flow, display strategy and operational clarity—turning each space into a memorable brand experience.",
    highlights: [
      {
        labelZh: "規劃核心",
        labelEn: "Planning Focus",
        valueZh: "品牌體驗",
        valueEn: "Brand Experience",
      },
      {
        labelZh: "空間價值",
        labelEn: "Spatial Value",
        valueZh: "識別與營運",
        valueEn: "Identity & Operation",
      },
    ],
    cover: `${commercial01}/cover/cover01.jpg`,
    images: [],
    cases: [
      {
        id: "commercial-01",
        titleZh: "旅讀選物空間",
        titleEn: "Travel & Lifestyle Store",
        storyZh:
          "以長向動線串聯書籍、旅行選物與主題展示，透過木質陳列、圓形展示窗與暖色燈光建立探索感；後區紅磚場景則提供更具故事性的停留體驗。",
        storyEn:
          "A travel and lifestyle store organized as a journey through books, curated objects and warm thematic displays, ending in an intimate brick-lined retreat.",
        phases: [
          phase(
            "progress",
            "從主要動線、展示牆、收銀台到情境燈光，逐步校正商業陳列與品牌氛圍。",
            makeNumberedImages(
              commercial01,
              "progress",
              [
                "長向店面動線與展示系統初步完成",
                "弧形天花燈帶建立空間導引",
                "主展示牆層板與圓形端景",
                "圓形展示窗與櫃體比例確認",
                "後區情境牆與軌道照明測試",
                "入口至後場的整體視線關係",
                "展示牆、收銀台與主要動線整合",
                "工業吊燈與紅磚情境牆完成",
                "長向空間照明與櫃體色彩校正",
                "玻璃展示櫃與品牌背牆細節",
                "掛架展示牆與門片介面整合",
                "模組展示板與照明層次",
                "木質主題牆與商品掛點配置",
                "收銀台背牆與幾何線條細節",
                "店面主通道與入口採光關係",
                "轉角玻璃櫃增加展示穿透感",
                "層板燈光強化商品陳列節奏",
                "雙向展示櫃建立對稱秩序",
                "圓形展示窗形成牆面視覺記憶",
                "紅磚牆與深色門片材質對比",
                "後區情境牆與家具配置確認",
                "暖色壁燈強化故事性展示氛圍",
                "收銀台與後區端景的視線連結",
                "入口視角呈現清晰行走動線",
                "中央服務櫃整合抽屜與開放收納",
                "工作櫃與展示檯兼顧營運機能",
                "後區展示架與紅磚牆形成焦點",
                "造型吊燈建立後區天花節奏",
                "壁燈、軌道燈與紅磚材質協調",
                "收銀服務台與品牌展示背牆",
                "側向展示櫃與掛架系統完整呈現",
              ]
            )
          ),
          phase(
            "completed",
            "書籍、選物與情境展示共同形成有層次的品牌旅程，兼顧商品辨識與停留體驗。",
            makeNamedImages(
              commercial01,
              "completed",
              [
                "A1 - 15.jpg",
                "A1 - 16.jpg",
                "A1 - 24.jpg",
                "A1 - 26.jpg",
                "A1 - 34.jpg",
                "A1 - 43.jpg",
                ...Array.from(
                  { length: 17 },
                  (_, index) =>
                    `completed-${String(
                      index + 1
                    ).padStart(2, "0")}.jpg`
                ),
              ],
              [
                "木質書牆依商品尺度分層陳列",
                "入口側書牆引導顧客深入空間",
                "中央選物檯形成瀏覽與停留焦點",
                "書籍與生活選品創造豐富視覺層次",
                "斜向展示架提升小型商品辨識度",
                "品牌識別融入幾何木質背牆",
                "圓形展示窗嵌入書牆形成端景",
                "長向主通道清楚連結入口與後區",
                "中央選物檯與兩側書牆建立完整動線",
                "書牆照明讓不同商品保持清楚層次",
                "中央展示島提供彈性主題陳列",
                "高低陳列兼顧商品密度與閱讀舒適",
                "入口活動資訊與店內選品相互呼應",
                "書牆模組提供多元尺寸陳列",
                "店內動線保留開闊視野與瀏覽節奏",
                "紅磚後區營造溫暖而具故事性的角落",
                "情境展示架結合座席與生活選物",
                "中央展示桌強化主題商品聚焦",
                "暖色主通道串聯完整品牌體驗",
                "紅磚紋理為後區增加材質深度",
                "壁燈營造適合停留的情境光線",
                "圓形展示窗聚焦品牌特色商品",
                "開放店面呈現清楚而吸引人的迎賓視線",
              ]
            )
          ),
        ],
      },
      {
        id: "commercial-02",
        titleZh: "甜點品牌概念店",
        titleEn: "Patisserie Concept Store",
        storyZh:
          "以明亮白色為基底，將甜點展示、品嚐座位與品牌接待整合於開放場域；格狀光膜天花與金色細節，讓產品在柔和光線下呈現精緻質感。",
        storyEn:
          "A luminous patisserie concept store combining product display, tasting and reception within an open setting defined by soft ceiling light and subtle gold details.",
        phases: [
          phase(
            "before",
            "原始店面採光良好但缺乏品牌辨識，需重新整合展示、服務與顧客停留動線。",
            makeNumberedImages(
              commercial02,
              "before",
              [
                "原始店面開放格局與既有櫃台",
                "室內樑柱與設備施工現況",
                "原有後場隔間與空間深度",
                "臨街開口與自然採光條件",
              ]
            )
          ),
          phase(
            "progress",
            "以設計模擬檢視座位、展示櫃、服務台與燈光，確認完整品牌體驗後再進入實現。",
            makeNamedImages(
              commercial02,
              "progress",
              [
                ...Array.from(
                  { length: 16 },
                  (_, index) =>
                    `1/progress-${String(
                      index + 1
                    ).padStart(2, "0")}.jpg`
                ),
                "evAfter-1.jpg",
                "evAfter-4.jpg",
                "evAfter-5.jpg",
                "evAfter-6.jpg",
                "evAfter-7.jpg",
                "evAfter-8.jpg",
                "evAfter-9.jpg",
                "evAfter-10.jpg",
                "evAfter-11.jpg",
                "evAfter-17.jpg",
                "evAfter-18.jpg",
              ],
              [
                "展示牆與品嚐座位的整體模擬",
                "品牌背牆、吊燈與座席比例",
                "接待區與牆面展示的視線關係",
                "光膜天花建立均勻明亮的空間基調",
                "臨街開口與中央座區的互動",
                "開放空間中的座位與服務動線",
                "靠窗展示檯連結街道與品牌內容",
                "甜點工作台與展示設備配置",
                "中央服務台與顧客動線模擬",
                "後場、吧台與座席空間整合",
                "窗邊吧台提供明亮停留位置",
                "大理石紋服務台建立精緻焦點",
                "品牌商品牆與工作檯細節",
                "甜點展示櫃成為空間中心",
                "入口識別與服務櫃台動線",
                "完整空間的光線與座位配置",
                "玻璃門面呈現通透品牌形象",
                "由街道望入的展示與品嚐場景",
                "白色展示牆與柔和座椅配色",
                "座席區以光膜天花保持明亮舒適",
                "展示牆串聯商品、座位與動線",
                "木質地坪界定休憩區域",
                "中央座席與戶外視野相互連結",
                "臨街品嚐區提升顧客停留感",
                "服務台、工作區與展示櫃全景",
                "空間深處的品牌背牆與接待端景",
                "入口導引與櫃台機能整合",
              ]
            )
          ),
          phase(
            "completed",
            "乾淨白色立面、金色線條與柔光天花，共同襯托甜點商品與品牌服務。",
            makeNamedImages(
              commercial02,
              "completed",
              Array.from(
                { length: 12 },
                (_, index) => `A${index + 1}.jpg`
              ),
              [
                "完工後展示牆與品嚐座席全景",
                "光膜天花均勻照亮開放場域",
                "服務台與商品展示形成清楚動線",
                "金色水平線條聚焦品牌禮盒",
                "白色櫃體以細緻分割維持俐落",
                "展示層板結合植栽與品牌商品",
                "線性層板提供彈性商品陳列",
                "座席、展示與服務區整體關係",
                "深木色後場平衡明亮前區",
                "白色接待櫃台與品牌吊燈",
                "窗邊端景融入植栽與暖木質",
                "大理石紋服務台展現精緻品牌質感",
              ]
            )
          ),
        ],
      },
      {
        id: "commercial-03",
        titleZh: "簡約服飾專櫃",
        titleEn: "Minimal Fashion Boutique",
        storyZh:
          "以黑白框架和高亮度背景建立清楚商品辨識，開放式吊掛、中央展示台與鏡面端景維持俐落動線，讓服裝色彩成為空間主角。",
        storyEn:
          "A minimal fashion boutique using crisp black-and-white geometry, open rails and mirrored focal points to let color, form and merchandise lead the experience.",
        phases: [
          phase(
            "completed",
            "簡潔框架與均勻照明，讓服飾陳列保持清晰、輕盈且具有品牌辨識。",
            makeNumberedImages(
              commercial03,
              "completed",
              [
                "開放吊掛與中央展示台建立清楚分區",
                "服飾色彩在黑白框架中自然突出",
                "中央陳列台提供摺疊與主題展示",
                "柔和彩色服裝形成季節視覺層次",
                "黑色吊掛系統強化簡潔線條",
                "全店均勻照明維持商品真實色彩",
                "入口端景以模特兒傳達品牌形象",
                "吊掛高度依商品類型清楚分層",
                "白色服飾以材質細節成為焦點",
                "環形陳列動線提升瀏覽效率",
                "中央展示與周邊吊掛保持通透",
                "模特兒端景與背光品牌牆",
                "鏡面試衣入口延伸空間深度",
                "深色試衣區界定私密機能",
              ]
            )
          ),
        ],
      },
      {
        id: "commercial-04",
        titleZh: "開放式餐飲空間",
        titleEn: "Open Kitchen Dining",
        storyZh:
          "以黑色金屬框架界定開放廚房和客席區，讓料理過程成為空間體驗；植栽、吊燈與白色牆面平衡工業語彙，塑造明亮而親切的餐飲場域。",
        storyEn:
          "An open-kitchen dining space framed in black steel, where food preparation becomes part of the experience and greenery softens the crisp industrial language.",
        phases: [
          phase(
            "progress",
            "以設計模擬確認門面、開放廚房、備餐設備與客席尺度，讓營運和觀看體驗同步成立。",
            makeNumberedImages(
              commercial04,
              "progress",
              [
                "臨街門面與品牌入口整體模擬",
                "通透開口向街道展示餐飲場景",
                "接待櫃台與開放廚房前場關係",
                "客席望向料理區的互動視角",
                "黑色框架整合設備與懸掛植栽",
                "玻璃隔屏兼顧展示與衛生需求",
                "開放廚房成為空間核心舞台",
                "料理工作檯與出餐動線配置",
                "設備牆、備餐台與收納整合",
                "後場不鏽鋼設備與清潔動線",
                "顧客近距離觀看料理過程",
                "工作檯下方收納提升操作效率",
                "層架、設備與照明符合工作需求",
                "前後場以金屬框架保持視覺連續",
                "窗邊座席回應街道與自然採光",
                "入口客席保留舒適等候尺度",
              ]
            )
          ),
          phase(
            "completed",
            "俐落黑框、溫暖燈光與開放料理場景，共同形成具辨識度且易於營運的餐飲空間。",
            makeNumberedImages(
              commercial04,
              "completed",
              [
                "店面照明與品牌招牌建立夜間辨識",
                "入口雨遮與招牌細節",
                "窗邊高腳座席善用臨街視野",
                "玻璃門面完整展示店內料理場景",
                "黑框隔屏界定客席與工作區",
                "服務櫃台以幾何立面形成焦點",
                "階梯下座位有效運用畸零空間",
                "開放廚房帶來透明料理體驗",
                "長向動線串聯入口、櫃台與後場",
              ]
            )
          ),
        ],
      },
    ],
  },
];

export const projects: Project[] =
  projectCollections.map((project) => ({
    ...project,
    images: project.cases.flatMap((projectCase) =>
      projectCase.phases.flatMap((item) =>
        item.images.map((image) => image.src)
      )
    ),
  }));
