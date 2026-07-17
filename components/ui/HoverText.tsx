"use client";

type Props = {
  zh: string;
  en: string;
  className?: string;
};

export default function HoverText({
  zh,
  en,
  className = "",
}: Props) {
  return (
    <span
      className={`group relative inline-block overflow-hidden align-top ${className}`}
    >
      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
        {zh}
      </span>

      <span className="absolute inset-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 text-[#b6925d]">
        {en}
      </span>
    </span>
  );
}