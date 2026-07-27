"use client";

import { useEffect } from "react";

import { useMusic } from "./BackgroundMusic";

export default function AutoPlayUnlock() {
  const { unlock } = useMusic();

  useEffect(() => {
    let completed = false;
    let attempting = false;

    const removeListeners = () => {
      document.removeEventListener("click", handleUnlock, true);
      document.removeEventListener("touchend", handleUnlock, true);
      document.removeEventListener("keydown", handleUnlock, true);
    };

    const handleUnlock = () => {
      if (completed || attempting) return;

      attempting = true;

      /*
        不在事件處理器內先等待其他程式，
        直接於這次使用者操作中呼叫 unlock。
      */
      void unlock()
        .then((success) => {
          if (success) {
            completed = true;
            removeListeners();
          }
        })
        .finally(() => {
          attempting = false;
        });
    };

    /*
      使用 capture=true，讓播放解鎖早於：
      - Next.js Link 導航
      - Hero 按鈕事件
      - 其他元件的 onClick
    */
    document.addEventListener("click", handleUnlock, true);
    document.addEventListener("touchend", handleUnlock, true);
    document.addEventListener("keydown", handleUnlock, true);

    return () => {
      removeListeners();
    };
  }, [unlock]);

  return null;
}