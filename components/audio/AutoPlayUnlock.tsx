"use client";

import { useEffect } from "react";
import { useMusic } from "./BackgroundMusic";

export default function AutoPlayUnlock() {
  const { playing, toggle } = useMusic();

  useEffect(() => {
    if (!playing) return;

    const unlock = () => {
      toggle();
      setTimeout(() => toggle(), 60);

      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [playing, toggle]);

  return null;
}