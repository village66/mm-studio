"use client";

import { useMusic } from "./BackgroundMusic";

export default function SoundButton() {
  const { playing, toggle } = useMusic();

  return (
    <button
      type="button"
      aria-label="Background Music"
      onClick={toggle}
      title={playing ? "Mute Music" : "Play Music"}
      className="
        fixed
        bottom-8
        right-8
        z-[999]
        group
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        border
        border-white/40
        bg-white/65
        backdrop-blur-2xl
        shadow-[0_20px_60px_rgba(0,0,0,.12)]
        transition-all
        duration-500
        hover:scale-110
        hover:bg-white
      "
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-500 ${
          playing ? "text-[#b6925d]" : "text-[#181818]"
        }`}
      >
        {playing ? (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </>
        ) : (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        )}
      </svg>

      <span
        className="
          pointer-events-none
          absolute
          right-16
          whitespace-nowrap
          rounded-full
          bg-[#181818]
          px-4
          py-2
          text-[11px]
          uppercase
          tracking-[0.25em]
          text-white
          opacity-0
          transition-all
          duration-300
          group-hover:opacity-100
        "
      >
        {playing ? "Sound On" : "Sound Off"}
      </span>

      {playing && (
        <span
          className="
            absolute
            inset-0
            rounded-full
            animate-ping
            border
            border-[#b6925d]/40
          "
        />
      )}
    </button>
  );
}