"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ABOUT_PARAGRAPHS = [
  "I am Varshith, a passionate Full Stack Developer and Creative Technologist dedicated to building fluid, human-centric web experiences.",
  "My work merges high-performance engineering with computational artistry — transforming complex logic into elegant, interactive 3D realities on the modern web.",
  "From architecting scalable cloud backends and responsive Next.js web applications to crafting bespoke WebGL shaders and real-time graphics, I focus on precision, speed, and immersive design.",
];

const TECH_ROW_1 = [
  "Next.js 15",
  "React 19",
  "Three.js / WebGL",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "GSAP Animations",
  "GLSL Shaders",
];

const TECH_ROW_2 = [
  "Python",
  "PostgreSQL",
  "Docker",
  "REST & GraphQL",
  "Git & GitHub",
  "Vite",
  "Framer Motion",
  "Cloud Architecture",
];

export default function AboutSection() {
  const [scrollWordsLit, setScrollWordsLit] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Split words for smooth scroll lighting effect
  const allWords = ABOUT_PARAGRAPHS.join(" ").split(" ");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowH = window.innerHeight;

            const start = windowH * 0.85;
            const end = windowH * 0.2;
            const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));

            const litCount = Math.floor(progress * allWords.length);
            setScrollWordsLit(litCount);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allWords.length]);

  return (
    <section
      id="about"
      className="bg-[#000000] text-white pt-20 md:pt-28 pb-0 px-4 sm:px-8 md:px-16 flex flex-col justify-center relative overflow-hidden max-w-full"
    >
      {/* Top Atmospheric Bridge softly blending from Hero into About */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-52 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 100% at 50% 0%, rgba(0, 100, 255, 0.08) 0%, rgba(0, 240, 255, 0.03) 45%, transparent 80%)",
          filter: "blur(45px)",
        }}
      />

      {/* Top Section Intro */}
      <div className="max-w-7xl mx-auto w-full z-10 py-8 sm:py-12 md:py-16">
        {/* Intro Heading - Left aligned with the image on desktop */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-6 sm:mb-8">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-zinc-500 mb-2 font-mono">
            About me
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 drop-shadow-xl uppercase">
            Intro
          </h2>
        </div>

        {/* 2-Column Row: Left Portrait Image & Right Narrative Card with Matching Height */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 md:gap-12 lg:gap-14 items-stretch">
          {/* Left Column: Varshith's Portrait Photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[260px] sm:max-w-[300px] lg:w-[320px] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group">
              <Image
                src="/images/varshith_portrait.jpg"
                alt="Varshith"
                fill
                sizes="(max-width: 768px) 260px, 320px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/75 backdrop-blur-md border border-white/15 text-zinc-300 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Full Stack • Creative Tech
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Frosted Glass Narrative Card (Stretched to match Image Height) */}
          <div
            ref={containerRef}
            className="relative flex flex-col justify-center bg-white/[0.035] backdrop-blur-xl px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-10 rounded-2xl sm:rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-left hover:bg-white/[0.05] transition-colors duration-500 h-auto lg:h-full"
          >
            <p className="text-zinc-300 text-sm sm:text-base md:text-lg lg:text-[17px] xl:text-lg leading-relaxed font-light">
              {allWords.map((word, idx) => {
                const isLit = idx <= scrollWordsLit;
                return (
                  <span
                    key={idx}
                    className={`inline-block transition-colors duration-200 mr-1 sm:mr-1.5 ${
                      isLit
                        ? "text-white font-normal"
                        : "text-zinc-600 opacity-60"
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Marquee Stack Ticker */}
      <div className="relative mt-12 sm:mt-16 -mx-4 sm:-mx-8 md:-mx-16 pt-8 pb-10 bg-[#000000]/60 backdrop-blur-md border-t border-b border-white/[0.08] overflow-hidden max-w-none">
        <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-8 md:px-16 mb-6">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-zinc-500 whitespace-nowrap font-mono">
            The stack &amp; capabilities
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        {/* Row 1: Forward Marquee */}
        <div className="marquee-row overflow-hidden whitespace-nowrap py-1">
          <div className="animate-marquee flex gap-6 items-center">
            {[...TECH_ROW_1, ...TECH_ROW_1].map((tech, i) => (
              <span
                key={i}
                className="px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs sm:text-sm font-mono tracking-wider text-zinc-300 uppercase hover:border-white/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Reverse Marquee */}
        <div className="marquee-row overflow-hidden whitespace-nowrap py-1 mt-3">
          <div className="animate-marquee-reverse flex gap-6 items-center">
            {[...TECH_ROW_2, ...TECH_ROW_2].map((tech, i) => (
              <span
                key={i}
                className="px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs sm:text-sm font-mono tracking-wider text-zinc-400 uppercase hover:border-white/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
