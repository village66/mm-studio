"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type MusicContextType = {
  playing: boolean;
  toggle: () => void;
};

const MusicContext = createContext<MusicContextType>({
  playing: false,
  toggle: () => {},
});

export const useMusic = () => useContext(MusicContext);

export default function BackgroundMusic({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const fadeRef = useRef<NodeJS.Timeout | null>(null);

  const [playing, setPlaying] = useState(false);

  // 讀取上次狀態
  useEffect(() => {
    const saved = localStorage.getItem("mmstudio-music");

    if (saved === "on") {
      setPlaying(true);
    }
  }, []);

  // 第一次進站，自動嘗試播放（瀏覽器允許時）
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.28;

    const tryPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
        localStorage.setItem("mmstudio-music", "on");
      } catch {
        // 等第一次互動
      }
    };

    tryPlay();

    const unlock = async () => {
      try {
        await audio.play();
        setPlaying(true);
        localStorage.setItem("mmstudio-music", "on");
      } catch {}

      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
    };

    window.addEventListener("pointerdown", unlock);
    window.addEventListener("touchstart", unlock);
    window.addEventListener("keydown", unlock);

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  // 播放 / 停止
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (fadeRef.current) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }

    if (playing) {
      localStorage.setItem("mmstudio-music", "on");

      audio.play().catch(() => {});

      fadeRef.current = setInterval(() => {
        if (audio.volume < 0.28) {
          audio.volume = Math.min(audio.volume + 0.02, 0.28);
        } else {
          if (fadeRef.current) {
            clearInterval(fadeRef.current);
            fadeRef.current = null;
          }
        }
      }, 60);
    } else {
      localStorage.setItem("mmstudio-music", "off");

      fadeRef.current = setInterval(() => {
        if (audio.volume > 0.02) {
          audio.volume = Math.max(audio.volume - 0.02, 0);
        } else {
          if (fadeRef.current) {
            clearInterval(fadeRef.current);
            fadeRef.current = null;
          }

          audio.pause();
          audio.currentTime = 0;
          audio.volume = 0.28;
        }
      }, 60);
    }

    return () => {
      if (fadeRef.current) {
        clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    };
  }, [playing]);

  const toggle = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        playing,
        toggle,
      }}
    >
      <audio ref={audioRef}>
        <source
          src="/audio/background.mp3"
          type="audio/mpeg"
        />
      </audio>

      {children}
    </MusicContext.Provider>
  );
}