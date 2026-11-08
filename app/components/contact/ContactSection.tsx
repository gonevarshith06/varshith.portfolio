"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ContactCube = dynamic(() => import("./ContactCube"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square max-w-[420px] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-white/30 border-t-white animate-spin" />
    </div>
  ),
});

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldRenderCube, setShouldRenderCube] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setShouldRenderCube(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRenderCube(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen text-white font-sans flex flex-col justify-between overflow-hidden bg-[#000000] max-w-full"
    >
      {/* Background Volumetric Silver / Midnight Atmospheric Radiance */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#06080e]/30 to-[#000000]/70 pointer-events-none" />
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(circle at center, black 35%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 80%)",
        }}
      />
      <div className="absolute top-1/3 right-0 sm:right-1/4 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] rounded-full bg-white/[0.03] blur-[80px] sm:blur-[140px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 pt-20 pb-12 md:pt-36 flex-1 flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-12 lg:gap-16">
          {/* Left Column: Bold, Ultra-Clean Editorial Heading ONLY */}
          <div className="w-full lg:w-5/12 flex flex-col text-center lg:text-left">
            <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter drop-shadow-2xl leading-[0.9] uppercase font-mono select-none">
              <span className="block text-white">GET IN</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-600">
                TOUCH.
              </span>
            </h2>
          </div>

          {/* Right Column: Floating 3D Interactive Luxury Monolith Glass Cube */}
          <div className="w-full lg:w-7/12 flex flex-col items-center justify-center">
            {shouldRenderCube && <ContactCube />}
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 pb-8 sm:pb-10">
        <div className="border-t border-white/10 pt-6 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 sm:gap-5 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Varshith. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#service" className="hover:text-white transition-colors">Services</a>
            <a href="#project" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </section>
  );
}