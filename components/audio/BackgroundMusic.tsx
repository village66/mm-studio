"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type MusicContextType = {
  playing: boolean;
  toggle: () => void;
  unlock: () => Promise<boolean>;
};

const MusicContext = createContext<MusicContextType>({
  playing: true,
  toggle: () => {},
  unlock: async () => false,
});

export const useMusic = () => useContext(MusicContext);

const TARGET_VOLUME = 0.28;

export default function BackgroundMusic({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const userMutedRef = useRef(false);
  const playRequestRef = useRef(false);

  const [playing, setPlaying] = useState(true);

  const clearFade = useCallback(() => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  const fadeIn = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    clearFade();

    if (audio.volume >= TARGET_VOLUME) {
      audio.volume = TARGET_VOLUME;
      return;
    }

    fadeRef.current = setInterval(() => {
      if (audio.volume < TARGET_VOLUME) {
        audio.volume = Math.min(
          audio.volume + 0.02,
          TARGET_VOLUME
        );

        return;
      }

      clearFade();
    }, 60);
  }, [clearFade]);

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;

    if (
      !audio ||
      userMutedRef.current ||
      playRequestRef.current
    ) {
      return false;
    }

    playRequestRef.current = true;
    clearFade();

    audio.loop = true;
    audio.preload = "auto";

    try {
      await audio.play();

      userMutedRef.current = false;
      setPlaying(true);
      fadeIn();

      return true;
    } catch {
      return false;
    } finally {
      playRequestRef.current = false;
    }
  }, [clearFade, fadeIn]);

  const stopAudio = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    clearFade();

    fadeRef.current = setInterval(() => {
      if (audio.volume > 0.02) {
        audio.volume = Math.max(
          audio.volume - 0.02,
          0
        );

        return;
      }

      clearFade();

      audio.pause();
      audio.currentTime = 0;
      audio.volume = TARGET_VOLUME;
    }, 60);
  }, [clearFade]);

  /*
    第一次點擊頁面時直接呼叫 audio.play()。

    不經過 playRequestRef 的阻擋，避免網站載入時的
    autoplay 請求與第一次點擊互相衝突。
  */
  const unlock = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || userMutedRef.current) {
      return false;
    }

    if (!audio.paused) {
      setPlaying(true);
      return true;
    }

    clearFade();

    audio.loop = true;
    audio.preload = "auto";

    try {
      await audio.play();

      userMutedRef.current = false;
      setPlaying(true);
      fadeIn();

      return true;
    } catch {
      return false;
    }
  }, [clearFade, fadeIn]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    userMutedRef.current = false;

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = TARGET_VOLUME;

    setPlaying(true);
    void playAudio();

    return () => {
      clearFade();
      audio.pause();
    };
  }, [clearFade, playAudio]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      userMutedRef.current = false;
      setPlaying(true);
      void playAudio();

      return;
    }

    userMutedRef.current = true;
    setPlaying(false);
    stopAudio();
  }, [playAudio, stopAudio]);

  return (
    <MusicContext.Provider
      value={{
        playing,
        toggle,
        unlock,
      }}
    >
      <audio
        ref={audioRef}
        loop
        preload="auto"
        playsInline
        aria-hidden="true"
      >
        <source
          src="/audio/background.mp3"
          type="audio/mpeg"
        />
      </audio>

      {children}
    </MusicContext.Provider>
  );
}