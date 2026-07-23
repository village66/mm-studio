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
  const [active, setActive] = useState(false);

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive((v) => !v)}
      className={`group relative cursor-pointer select-none overflow-hidden ${className}`}
    >
      {/* 中文 */}

      <div
        className={`
          transition-all
          duration-500
          ease-[cubic-bezier(.22,.61,.36,1)]
          ${
            active
              ? "-translate-y-full opacity-0"
              : "translate-y-0 opacity-100"
          }
        `}
      >
        {zh}
      </div>

      {/* English */}

      <div
        className={`
          absolute
          inset-0
          transition-all
          duration-500
          ease-[cubic-bezier(.22,.61,.36,1)]
          ${
            active
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }
        `}
      >
        {en}
      </div>
    </div>
  );
}