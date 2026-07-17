import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="MM Studio"
      className="shrink-0 leading-none"
    >
      <div className="flex flex-col">
        <span
          className="
            font-serif
            text-[1.9rem]
            font-light
            tracking-[0.18em]
            uppercase
            text-[#181818]
            transition-opacity
            duration-300
            hover:opacity-70
            md:text-[2.2rem]
          "
        >
          MM Studio
        </span>

        <span
          className="
            mt-1
            text-[10px]
            uppercase
            tracking-[0.42em]
            text-neutral-500
          "
        >
          Boutique Interior Design
        </span>
      </div>
    </Link>
  );
}