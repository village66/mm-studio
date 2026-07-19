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

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("mmstudio-music");

    if (saved === "on") {
      setPlaying(true);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;
    audio.preload = "auto";

    let fade: NodeJS.Timeout | undefined;

    if (playing) {
      audio.play().catch(() => {});

      fade = setInterval(() => {
        if (audio.volume < 0.28) {
          audio.volume = Math.min(audio.volume + 0.02, 0.28);
        } else {
          clearInterval(fade);
        }
      }, 80);

      localStorage.setItem("mmstudio-music", "on");
    } else {
      fade = setInterval(() => {
        if (audio.volume > 0.02) {
          audio.volume -= 0.02;
        } else {
          clearInterval(fade);
          audio.pause();
          audio.currentTime = 0;
          audio.volume = 0;
        }
      }, 80);

      localStorage.setItem("mmstudio-music", "off");
    }

    return () => {
      if (fade) clearInterval(fade);
    };
  }, [playing]);

  return (
    <MusicContext.Provider
      value={{
        playing,
        toggle: () => setPlaying((v) => !v),
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