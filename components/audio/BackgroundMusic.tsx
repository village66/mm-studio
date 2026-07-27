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
  unlock: () => Promise<void>;
};

const MusicContext = createContext<MusicContextType>({
  playing: true,
  toggle: () => {},
  unlock: async () => {},
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

  const [playing, setPlaying] = useState(true);

  const clearFade = useCallback(() => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || userMutedRef.current) return;

    clearFade();

    audio.loop = true;
    audio.preload = "auto";

    if (audio.volume <= 0) {
      audio.volume = 0;
    }

    try {
      await audio.play();
      setPlaying(true);

      fadeRef.current = setInterval(() => {
        if (audio.volume < TARGET_VOLUME) {
          audio.volume = Math.min(audio.volume + 0.02, TARGET_VOLUME);
          return;
        }

        clearFade();
      }, 60);
    } catch {
      setPlaying(true);
    }
  }, [clearFade]);

  const stopAudio = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    clearFade();

    fadeRef.current = setInterval(() => {
      if (audio.volume > 0.02) {
        audio.volume = Math.max(audio.volume - 0.02, 0);
        return;
      }

      clearFade();

      audio.pause();
      audio.currentTime = 0;
      audio.volume = TARGET_VOLUME;
    }, 60);
  }, [clearFade]);

  const unlock = useCallback(async () => {
    if (userMutedRef.current) return;

    await playAudio();
  }, [playAudio]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    userMutedRef.current = false;

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = TARGET_VOLUME;

    void playAudio();

    return () => {
      clearFade();
      audio.pause();
    };
  }, [clearFade, playAudio]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      userMutedRef.current = true;
      setPlaying(false);
      stopAudio();
      return;
    }

    userMutedRef.current = false;
    setPlaying(true);
    void playAudio();
  }, [playAudio, playing, stopAudio]);

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