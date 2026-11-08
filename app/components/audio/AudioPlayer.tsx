"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const manuallyPausedRef = useRef(false);

  useEffect(() => {
    // 1. Create and configure background soundtrack
    const audio = new Audio("/audio/back-in-black.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "auto";
    audioRef.current = audio;

    // 2. Attempt immediate autoplay on mount
    const startAudio = () => {
      if (!audioRef.current || manuallyPausedRef.current) return;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            cleanupListeners();
          })
          .catch(() => {
            // Awaiting initial user gesture per browser policy; keep UI active
            setIsPlaying(true);
          });
      }
    };

    // 3. User interaction triggers (click, touch, scroll, pointerdown, mousedown, keydown)
    const onUserGesture = () => {
      if (!manuallyPausedRef.current && audioRef.current) {
        if (audioRef.current.paused) {
          const p = audioRef.current.play();
          if (p !== undefined) {
            p.then(() => {
              setIsPlaying(true);
              cleanupListeners();
            }).catch(() => {});
          }
        } else {
          cleanupListeners();
        }
      }
    };

    const cleanupListeners = () => {
      const events = [
        "click",
        "pointerdown",
        "pointerup",
        "mousedown",
        "mouseup",
        "touchstart",
        "touchend",
        "scroll",
        "wheel",
        "keydown",
      ];
      events.forEach((evt) => {
        window.removeEventListener(evt, onUserGesture, true);
        document.removeEventListener(evt, onUserGesture, true);
      });
    };

    // Try immediately on load and when audio buffers
    startAudio();
    audio.addEventListener("canplaythrough", startAudio, { once: true });
    audio.addEventListener("canplay", startAudio, { once: true });

    // Attach capture-phase gesture listeners across window & document
    const gestureEvents = [
      "click",
      "pointerdown",
      "pointerup",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "scroll",
      "wheel",
      "keydown",
    ];
    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, onUserGesture, { capture: true, passive: true });
      document.addEventListener(evt, onUserGesture, { capture: true, passive: true });
    });

    // Also auto-resume if user returns to tab
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible" && !manuallyPausedRef.current && audioRef.current?.paused) {
        audioRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cleanupListeners();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      audio.removeEventListener("canplaythrough", startAudio);
      audio.removeEventListener("canplay", startAudio);
      audio.pause();
      audio.src = "";
    };

    return () => {
      cleanupListeners();
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      manuallyPausedRef.current = true;
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      manuallyPausedRef.current = false;
      audioRef.current.volume = 0.5;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("[Audio] Play error:", err.message);
        });
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 select-none">
      <button
        onClick={togglePlay}
        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-black/75 backdrop-blur-2xl border transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.85)] hover:scale-105 active:scale-95 cursor-pointer group ${
          isPlaying
            ? "border-cyan-400/50 shadow-[0_0_25px_rgba(0,229,255,0.25)] text-cyan-400"
            : "border-white/15 hover:border-white/35 text-zinc-400 hover:text-white"
        }`}
        aria-label={isPlaying ? "Mute audio" : "Unmute audio"}
        title={isPlaying ? "Sound: ON (Click to mute)" : "Sound: OFF (Click to play)"}
      >
        {isPlaying ? (
          /* Sound ON Speaker Icon */
          <svg
            className="w-5 h-5 text-cyan-400 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"
            />
          </svg>
        ) : (
          /* Sound OFF / Muted Speaker Icon */
          <svg
            className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
