"use client";

import { useEffect } from "react";

import { useMusic } from "./BackgroundMusic";

export default function AutoPlayUnlock() {
  const { unlock } = useMusic();

  useEffect(() => {
    let completed = false;

    const removeListeners = () => {
      window.removeEventListener(
        "pointerdown",
        handleUnlock
      );

      window.removeEventListener(
        "touchstart",
        handleUnlock
      );

      window.removeEventListener(
        "keydown",
        handleUnlock
      );
    };

    const handleUnlock = async () => {
      if (completed) return;

      const success = await unlock();

      /*
        只有真正播放成功後才移除監聽器。
        若第一次互動仍被瀏覽器阻擋，下一次互動會再嘗試。
      */
      if (success) {
        completed = true;
        removeListeners();
      }
    };

    window.addEventListener(
      "pointerdown",
      handleUnlock,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "touchstart",
      handleUnlock,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "keydown",
      handleUnlock
    );

    return () => {
      removeListeners();
    };
  }, [unlock]);

  return null;
}