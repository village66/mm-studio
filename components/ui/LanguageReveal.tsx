"use client";

import { useState } from "react";

type Props = {
  zh: React.ReactNode;
  en: React.ReactNode;
  className?: string;
};

export default function LanguageReveal({
  zh,
  en,
  className = "",
}: Props) {
  const [showEnglish, setShowEnglish] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowEnglish(true)}
      onMouseLeave={() => setShowEnglish(false)}
      onClick={() => setShowEnglish((v) => !v)}
      className={`group cursor-pointer select-none ${className}`}
    >
      <div className="overflow-hidden">

        <div
          className="transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform"
          style={{
            transform: showEnglish
              ? "translate3d(0,-50%,0)"
              : "translate3d(0,0,0)",
          }}
        >
          {/* Chinese */}

          <div className="flex min-h-full items-center">
            {zh}
          </div>

          {/* English */}

          <div className="flex min-h-full items-center">
            {en}
          </div>

        </div>

      </div>
    </div>
  );
}