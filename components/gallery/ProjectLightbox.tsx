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

  return (
    <>
      {/* Gallery */}

      <section className="mt-24">

        <div className="mb-12 flex items-end justify-between">

          <div>

            <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500">
              Project Gallery
            </p>

            <h2 className="mt-4 text-4xl font-extralight text-neutral-900">
              Design Details
            </h2>

          </div>

          <p className="hidden text-sm tracking-[0.25em] text-neutral-400 md:block">
            {images.length} Photos
          </p>

        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">

          {images.map((image, i) => {
            const layout =
              i === 0
                ? "md:col-span-12 aspect-[16/9]"
                : i % 5 === 0
                ? "md:col-span-12 aspect-[3/2]"
                : i % 2 === 0
                ? "md:col-span-7 aspect-[4/5]"
                : "md:col-span-5 aspect-[4/5]";

            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
                className={`group relative overflow-hidden rounded-sm bg-neutral-100 ${layout}`}
              >
                <Image
                  src={image}
                  alt={`${title} ${i + 1}`}
                  fill
                  sizes="(max-width:768px)100vw,50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/20" />

                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="rounded-full bg-white/90 px-4 py-2 text-[11px] uppercase tracking-[0.25em]">
                    View
                  </span>
                </div>

              </button>
            );
          })}

        </div>

      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((image) => ({
          src: image,
        }))}
        carousel={{
          finite: false,
        }}
        controller={{
          closeOnBackdropClick: true,
        }}
        styles={{
          container: {
            zIndex: 9000,
          },
        }}
      />
    </>
  );
}