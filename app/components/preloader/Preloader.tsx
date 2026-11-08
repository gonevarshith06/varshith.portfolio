"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
  onBurst: () => void;
  onPreloadComplete: () => void;
}

const LETTERS = ["V", "A", "R", "S", "H", "I", "T", "H"];

export default function Preloader({ onBurst, onPreloadComplete }: PreloaderProps) {
  // activeLetterIndex: -1 (all white), 0 ('V'), 1 ('A'), ... 7 ('H' - last letter)
  const [activeLetterIndex, setActiveLetterIndex] = useState<number>(-1);
  const [isBursting, setIsBursting] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // 1. Initial pause with pristine white text
    const startTimer = setTimeout(() => {
      setActiveLetterIndex(0);
    }, 350);

    // 2. Letter-by-letter electric blue charging sweep
    const letterTimers: NodeJS.Timeout[] = [];
    for (let i = 1; i < LETTERS.length; i++) {
      const timer = setTimeout(() => {
        setActiveLetterIndex(i);
      }, 350 + i * 220); // Each letter lights up every 220ms
      letterTimers.push(timer);
    }

    // 3. When the last letter is reached (350 + 7 * 220 = 1890ms), trigger the 1000 butterfly burst at ~2100ms
    const burstTimer = setTimeout(() => {
      setIsBursting(true);
      onBurst();
    }, 2150);

    // 4. Complete preloader and hand off cleanly to hero
    const doneTimer = setTimeout(() => {
      setIsDismissed(true);
      onPreloadComplete();
    }, 2700);

    return () => {
      clearTimeout(startTimer);
      letterTimers.forEach(clearTimeout);
      clearTimeout(burstTimer);
      clearTimeout(doneTimer);
    };
  }, [onBurst, onPreloadComplete]);

  const handleSkip = () => {
    setIsBursting(true);
    onBurst();
    setTimeout(() => {
      setIsDismissed(true);
      onPreloadComplete();
    }, 350);
  };

  if (isDismissed) return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#000000] transition-opacity duration-700 pointer-events-auto cursor-pointer select-none overflow-hidden ${
        isBursting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Pure Pitch-Black Void */}
      <div className="absolute inset-0 bg-[#000000]" />

      {/* Subtle Tech Grid Behind Preloader */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,240,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.08) 1px, transparent 1px)",
          backgroundSize: "75px 75px",
        }}
      />

      {/* Elegant Soft Ambient Radial Glow (GPU Accelerated) */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          activeLetterIndex >= 0 ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(0,200,255,0.18) 0%, rgba(0,80,220,0.06) 45%, transparent 70%)",
        }}
      />

      {/* Central Typographic Experience */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Main "V A R S H I T H" Letters with Sequential Rich Electric Blue Lighting */}
        <div className="relative flex items-center justify-center gap-1.5 sm:gap-3 md:gap-6 font-black tracking-widest uppercase font-mono px-4">
          {LETTERS.map((letter, idx) => {
            const isLit = idx <= activeLetterIndex;
            const isCurrent = idx === activeLetterIndex;

            return (
              <span
                key={idx}
                className={`text-3xl sm:text-6xl md:text-8xl lg:text-9xl inline-block transform ${
                  isBursting
                    ? "scale-100 opacity-0 transition-opacity duration-300"
                    : isCurrent
                    ? "scale-120 -translate-y-2 transition-transform duration-200"
                    : isLit
                    ? "scale-105 translate-y-0 transition-transform duration-200"
                    : "scale-100 translate-y-0"
                }`}
                style={{
                  color: isCurrent
                    ? "#ffffff"
                    : isLit
                    ? "#00b4ff"
                    : "rgba(255, 255, 255, 0.28)",
                  textShadow: isCurrent
                    ? "0 0 18px #00f0ff, 0 0 38px #0088ff"
                    : isLit
                    ? "0 0 12px #0091ff"
                    : "none",
                  transition: "color 0.2s ease-out, text-shadow 0.2s ease-out, transform 0.2s ease-out",
                  willChange: "transform, opacity",
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
