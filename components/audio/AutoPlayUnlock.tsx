"use client";

import { useEffect } from "react";

import { useMusic } from "./BackgroundMusic";

export default function AutoPlayUnlock() {
  const { unlock } = useMusic();

  useEffect(() => {
    let unlocked = false;

    const handleUnlock = async () => {
      if (unlocked) return;

      unlocked = true;

      removeListeners();

      await unlock();
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", handleUnlock);
      window.removeEventListener("touchstart", handleUnlock);
      window.removeEventListener("keydown", handleUnlock);
    };

    window.addEventListener("pointerdown", handleUnlock, {
      passive: true,
    });

    window.addEventListener("touchstart", handleUnlock, {
      passive: true,
    });

    window.addEventListener("keydown", handleUnlock);

    return () => {
      removeListeners();
    };
  }, [unlock]);

  return null;
}