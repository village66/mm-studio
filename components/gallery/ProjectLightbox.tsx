"use client";

import { useState } from "react";
import Image from "next/image";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Props = {
  title: string;
  images: string[];
};

export default function ProjectLightbox({
  title,
  images,
}: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openImage = (imageIndex: number) => {
    setIndex(imageIndex);
    setOpen(true);
  };

  return (
    <>
      <section
        aria-labelledby="project-gallery-title"
        className="mt-14 sm:mt-16 lg:mt-20"
      >
        {/* 選集標題 */}
        <div
          className="
            flex
            flex-col
            gap-5
            border-b
            border-[#dcd8cf]
            pb-6
            sm:flex-row
            sm:items-end
            sm:justify-between
            lg:pb-8
          "
        >
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.36em] text-[#9a7d56] sm:text-[10px]">
              Curated Spaces
            </p>

            <h2
              id="project-gallery-title"
              className="
                mt-3
                text-[28px]
                font-extralight
                tracking-[-0.03em]
                text-[#292929]
                sm:text-[34px]
                lg:text-[38px]
              "
            >
              空間作品選集
            </h2>

            <p className="mt-3 max-w-[560px] text-[13px] font-light leading-7 text-neutral-500 sm:text-[14px]">
              以影像呈現不同空間中的比例、材質、光線與生活細節。
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#c7b79f]" />

            <p className="text-[10px] font-light tracking-[0.18em] text-neutral-500">
              收錄 {String(images.length).padStart(2, "0")} 組影像
            </p>
          </div>
        </div>

        {/* 小圖索引 */}
        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-x-5
            gap-y-8
            sm:mt-10
            md:grid-cols-2
            lg:grid-cols-3
            lg:gap-x-6
            lg:gap-y-10
            2xl:grid-cols-4
          "
        >
          {images.map((image, imageIndex) => (
            <button
              key={`${image}-${imageIndex}`}
              type="button"
              aria-label={`查看 ${title} 第 ${
                imageIndex + 1
              } 張圖片`}
              onClick={() => openImage(imageIndex)}
              className="group/image block w-full text-left outline-none"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e5de]">
                <Image
                  src={image}
                  alt={`${title} 空間影像 ${
                    imageIndex + 1
                  }`}
                  fill
                  sizes="
                    (max-width: 768px) 100vw,
                    (max-width: 1024px) 50vw,
                    (max-width: 1536px) 33vw,
                    25vw
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-[900ms]
                    ease-out
                    group-hover/image:scale-[1.04]
                    group-focus-visible/image:scale-[1.04]
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/35
                    via-transparent
                    to-transparent
                    opacity-25
                    transition-opacity
                    duration-500
                    group-hover/image:opacity-100
                    group-focus-visible/image:opacity-100
                  "
                />

                {/* 影像編號 */}
                <div className="absolute left-4 top-4 bg-[#f8f8f5]/90 px-3 py-2 backdrop-blur-md">
                  <span className="text-[9px] font-light tracking-[0.2em] text-[#796446]">
                    {String(imageIndex + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </div>

                {/* 查看影像 */}
                <div
                  className="
                    absolute
                    bottom-4
                    right-4
                    flex
                    translate-y-2
                    items-center
                    gap-3
                    opacity-0
                    transition-all
                    duration-500
                    group-hover/image:translate-y-0
                    group-hover/image:opacity-100
                    group-focus-visible/image:translate-y-0
                    group-focus-visible/image:opacity-100
                  "
                >
                  <span className="hidden text-[9px] tracking-[0.18em] text-white sm:block">
                    查看影像
                  </span>

                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/60
                      bg-black/10
                      text-[16px]
                      font-extralight
                      text-white
                      backdrop-blur-md
                      transition-transform
                      duration-500
                      group-hover/image:scale-110
                    "
                  >
                    +
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-[#ddd8d0] py-3 transition-colors duration-500 group-hover/image:border-[#a4865d]">
                <p className="text-[10px] font-light tracking-[0.14em] text-neutral-500">
                  空間影像
                </p>

                <p className="text-[9px] font-light tracking-[0.15em] text-[#9a7d56]">
                  {String(imageIndex + 1).padStart(
                    2,
                    "0"
                  )}
                  {" / "}
                  {String(images.length).padStart(
                    2,
                    "0"
                  )}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 圖片燈箱 */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((image, imageIndex) => ({
          src: image,
          alt: `${title} 空間影像 ${
            imageIndex + 1
          }`,
        }))}
        on={{
          view: ({ index: currentIndex }) => {
            setIndex(currentIndex);
          },
        }}
        carousel={{
          finite: images.length <= 1,
          padding: "8%",
          spacing: "4%",
        }}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
        }}
        animation={{
          fade: 350,
          swipe: 450,
        }}
        styles={{
          root: {
            "--yarl__color_backdrop":
              "rgba(20, 19, 17, 0.96)",
          },
          container: {
            zIndex: 99999,
          },
        }}
      />
    </>
  );
}