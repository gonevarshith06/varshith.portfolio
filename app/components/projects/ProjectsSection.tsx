"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ViscoseCarousel = dynamic(() => import("../viscose/Carousel"), {
  ssr: false,
});

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Dwell detection: only mount when user actually arrives at and views Projects for the first time
    let dwellTimer: NodeJS.Timeout | null = null;
    let observerRef: IntersectionObserver | null = null;

    // Direct navigation trigger from "Explore Work" button or Navbar "Projects" link
    const onActivate = () => {
      setShouldRender(true);
      if (observerRef) {
        observerRef.disconnect();
      }
    };
    window.addEventListener("activate-projects", onActivate);

    // If initial load is directly at #project hash
    if (typeof window !== "undefined" && window.location.hash === "#project") {
      setShouldRender(true);
      return () => {
        window.removeEventListener("activate-projects", onActivate);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (dwellTimer) {
          clearTimeout(dwellTimer);
          dwellTimer = null;
        }

        // If user clicked "Get In Touch" or "Contact", do not mount projects while passing through
        if (typeof window !== "undefined" && (window as any).__navigatingToContact) {
          return;
        }

        if (entry.isIntersecting) {
          dwellTimer = setTimeout(() => {
            if (typeof window !== "undefined" && (window as any).__navigatingToContact) {
              return;
            }
            if (el) {
              const r = el.getBoundingClientRect();
              // Verify user actually settled on the projects section and didn't fly past to Contact
              if (r.bottom > window.innerHeight * 0.35 && r.top < window.innerHeight * 0.65) {
                setShouldRender(true);
                observer.disconnect(); // Plays once per session until page refresh
              }
            }
          }, 220);
        }
      },
      {
        threshold: [0.35, 0.6],
      }
    );

    observerRef = observer;
    observer.observe(el);

    return () => {
      if (dwellTimer) clearTimeout(dwellTimer);
      window.removeEventListener("activate-projects", onActivate);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="project"
      className="relative w-full h-screen min-h-[750px] lg:min-h-[900px] bg-[#000000] text-white overflow-hidden select-none"
    >
      {/* Viscose WebGL Signed Distance Field Carousel Stage */}
      <div className="relative w-full h-full overflow-hidden">
        {shouldRender && <ViscoseCarousel />}
      </div>
    </section>
  );
}


