"use client";

import { useState, useEffect } from "react";
import HeroExperience from "./HeroExperience";

interface HeroSectionProps {
  burstTrigger?: boolean;
}

export default function HeroSection({ burstTrigger = false }: HeroSectionProps) {
  const [isRevealed, setIsRevealed] = useState(burstTrigger);

  useEffect(() => {
    if (burstTrigger) {
      setIsRevealed(true);
    }
  }, [burstTrigger]);

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProjects = () => {
    if (typeof window !== "undefined") {
      (window as any).__navigatingToContact = false;
      window.dispatchEvent(new CustomEvent("activate-projects"));
    }
    const el = document.getElementById("project");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    if (typeof window !== "undefined") {
      (window as any).__navigatingToContact = true;
      setTimeout(() => {
        (window as any).__navigatingToContact = false;
      }, 1800);
    }
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 pt-24 pb-14 overflow-hidden select-none bg-[#000000]"
    >
      {/* 3D 1000 Sharp Sparkling Electric Blue Butterflies - Hardware Blitted with Zero Composite Masking */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-[5]">
        <HeroExperience burstTrigger={burstTrigger} />
      </div>

      {/* 1. Subtle Tech Coordinate Grid from Reference Photo */}
      <div
        className={`absolute inset-0 pointer-events-none opacity-20 z-0 transition-opacity duration-1000 ${
          isRevealed ? "opacity-20" : "opacity-0"
        }`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "85px 85px",
          maskImage: "radial-gradient(ellipse 85% 70% at 50% 45%, black 20%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 70% at 50% 45%, black 20%, transparent 85%)",
        }}
      />

      {/* 2. Deep Volumetric Atmospheric Blue Radial Glow behind Ring - Pure GPU Rendered */}
      <div
        className={`absolute pointer-events-none z-0 transition-opacity duration-1000 ease-out gpu-accelerated ${
          isRevealed ? "opacity-100" : "opacity-0"
        }`}
        style={{
          top: "-15%",
          left: "0%",
          right: "0%",
          height: "110%",
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(13, 71, 240, 0.42) 0%, rgba(0, 35, 190, 0.25) 40%, rgba(0, 220, 255, 0.08) 65%, transparent 85%)",
          transform: "translate3d(0, 0, 0)",
          willChange: "transform, opacity",
        }}
      />

      {/* 3. The Grand Glowing Eclipse Light Ring */}
      <div
        className={`absolute inset-0 pointer-events-none flex items-start justify-center overflow-hidden max-w-full z-[1] transition-opacity duration-1000 ease-out ${
          isRevealed ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: "translate3d(0, 0, 0)",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
        }}
      >
        <svg
          viewBox="0 0 1600 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto min-w-[700px] sm:min-w-[1100px] max-w-[1920px] -translate-y-6 sm:-translate-y-12"
          style={{
            mixBlendMode: "screen",
            transform: "translate3d(0, 0, 0)",
            willChange: "transform",
          }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="ultraWideScatter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="40" />
            </filter>

            <filter id="wideAtmosphericBloom" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="24" />
            </filter>

            <filter id="mediumCyanBloom" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="12" />
            </filter>

            <filter id="softCoreBloom" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" />
            </filter>

            <filter id="filamentSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          {/* Group with Additive Photometric Screen Blending */}
          <g style={{ mixBlendMode: "screen" }}>
            {/* Layer 1: Ultra-Wide Deep Atmospheric Royal Blue Halo */}
            <path
              d="M -50 20 C 350 780, 1250 780, 1650 20"
              stroke="#003cd6"
              strokeWidth="150"
              strokeLinecap="round"
              opacity="0.85"
              filter="url(#ultraWideScatter)"
            />

            {/* Layer 2: Wide Radiant Cobalt-to-Azure Scatter */}
            <path
              d="M -50 20 C 350 780, 1250 780, 1650 20"
              stroke="#0066ff"
              strokeWidth="100"
              strokeLinecap="round"
              opacity="0.8"
              filter="url(#wideAtmosphericBloom)"
            />

            {/* Layer 3: Saturated Razor Electric Cyan Beam Body */}
            <path
              d="M -50 20 C 350 780, 1250 780, 1650 20"
              stroke="#00e5ff"
              strokeWidth="52"
              strokeLinecap="round"
              opacity="0.85"
              filter="url(#mediumCyanBloom)"
            />

            {/* Layer 4: Soft Blended Incandescent Ice Cyan / White Core */}
            <path
              d="M -50 20 C 350 780, 1250 780, 1650 20"
              stroke="#e0f7ff"
              strokeWidth="22"
              strokeLinecap="round"
              opacity="0.95"
              filter="url(#softCoreBloom)"
            />

            {/* Layer 5: Blazing White-Hot Filament Beam */}
            <path
              d="M -50 20 C 350 780, 1250 780, 1650 20"
              stroke="#ffffff"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="1.0"
              filter="url(#filamentSoftGlow)"
            />
          </g>
        </svg>
      </div>

      {/* Screen Frame Specular Corner Reflections */}
      <div
        className={`absolute top-0 left-0 w-48 h-32 pointer-events-none bg-gradient-to-br from-cyan-400/15 via-transparent to-transparent blur-xl z-[2] transition-opacity duration-1000 gpu-accelerated ${
          isRevealed ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute top-0 right-0 w-48 h-32 pointer-events-none bg-gradient-to-bl from-blue-400/15 via-transparent to-transparent blur-xl z-[2] transition-opacity duration-1000 gpu-accelerated ${
          isRevealed ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Centered Content Stack Matching Reference Photo Exactly */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto my-auto w-full pt-10 sm:pt-16 pb-6">
        {/* 1. Main Title "VARSHITH": Silky Smooth Glowing Celestial Anchor */}
        <div className="relative mb-4 select-none group">
          {/* Silky-Smooth GPU Hardware-Accelerated Ambient Breathing Aura */}
          <div
            className={`absolute -inset-10 sm:-inset-16 rounded-full pointer-events-none transition-opacity duration-1000 ${
              isRevealed ? "opacity-90 animate-name-glow" : "opacity-0"
            }`}
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0, 240, 255, 0.4) 0%, rgba(0, 102, 255, 0.22) 45%, rgba(0, 30, 180, 0.08) 70%, transparent 90%)",
              transform: "translate3d(0, 0, 0)",
              willChange: "transform, opacity",
            }}
          />

          {/* Smooth Fast-Path GPU Text Rendering (Zero CPU Jitter) */}
          <h1
            className="relative z-10 text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-wider sm:tracking-widest uppercase font-mono text-white"
            style={{
              textShadow:
                "0 0 25px rgba(0, 240, 255, 0.85), 0 0 60px rgba(0, 120, 255, 0.55), 0 4px 20px rgba(0, 0, 0, 0.95)",
              transform: "translate3d(0, 0, 0)",
              willChange: "transform",
            }}
          >
            VARSHITH
          </h1>
        </div>

        {/* 2. Subtitle Headline & Description - Smooth Upward Glide */}
        <div
          className={`flex flex-col items-center transition-all duration-800 delay-300 ease-out ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="mt-6 sm:mt-10 text-lg sm:text-2xl md:text-3xl font-medium tracking-tight text-white mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] text-center px-4">
            Full Stack &amp; Creative Technologist
          </h2>

          <p className="max-w-xl text-xs sm:text-sm md:text-base text-zinc-400 font-light leading-relaxed mb-8 sm:mb-10 px-4 text-center">
            Architecting bespoke digital experiences, high-performance web systems, and interactive 3D WebGL architectures.
          </p>
        </div>

        {/* 3. Side-by-Side Dual CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-10 sm:mb-12 w-full max-w-xs sm:max-w-none transition-all duration-800 delay-500 ease-out ${
            isRevealed
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {/* Left Button: Solid White Rounded Pill with Dark Text ("Download Demo" in photo) */}
          <button
            id="hero-btn-explore"
            data-hero-btn="explore"
            onClick={scrollToProjects}
            className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.45)] hover:shadow-[0_0_45px_rgba(0,240,255,0.85)] hover:bg-cyan-50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer w-full sm:w-auto"
          >
            <span>Explore Work</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
            </svg>
          </button>

          {/* Right Button: Translucent Dark Pill with Blue Glow ("Learn More" in photo) */}
          <button
            id="hero-btn-contact"
            data-hero-btn="contact"
            onClick={scrollToContact}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-blue-950/40 backdrop-blur-xl border border-blue-500/50 text-white hover:text-cyan-300 hover:border-cyan-400/70 hover:bg-blue-900/60 shadow-[0_0_20px_rgba(0,102,255,0.35)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer w-full sm:w-auto"
          >
            <span>Get In Touch</span>
          </button>
        </div>

        {/* 4. Bottom Scroll Indicator */}
        <button
          id="hero-btn-scroll"
          data-hero-btn="scroll"
          onClick={scrollToAbout}
          className={`group relative z-10 flex flex-col items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-all duration-1000 delay-[900ms] ease-out cursor-pointer ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          aria-label="Scroll down to explore"
        >
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-zinc-500 group-hover:text-cyan-400 transition-colors">
            Scroll to explore
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-cyan-400/50 flex items-start justify-center p-1 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(0,240,255,1)] animate-bounce" />
          </div>
        </button>
      </div>

      {/* Seamless Soft Fade out at Bottom of Hero into About */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-[#000000]/60 to-[#000000] pointer-events-none z-[4]" />
    </section>
  );
}