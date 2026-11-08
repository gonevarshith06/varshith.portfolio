"use client";

import { useState } from "react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: "01",
    title: "FULL STACK WEB DEVELOPMENT",
    description:
      "End-to-end web engineering utilizing Next.js, React, Node.js, and TypeScript. Building responsive, accessible, and hyper-performant digital platforms from conceptual wireframe to production deployment.",
    capabilities: [
      "Next.js App Router",
      "React 19 Server Components",
      "TypeScript Architecture",
      "API Design & Integration",
      "State Management",
    ],
  },
  {
    id: "02",
    title: "3D WEBGL & INTERACTIVE EXPERIENCES",
    description:
      "Creating immersive real-time WebGL and Three.js environments that run smoothly at 60+ FPS in the browser. Custom GLSL vertex and fragment shaders, physics simulations, particle systems, and mathematical generative visuals.",
    capabilities: [
      "Three.js & React Three Fiber",
      "Custom GLSL Shaders",
      "Procedural Geometries",
      "Particle & Boid Systems",
      "Performance Optimization",
    ],
  },
  {
    id: "03",
    title: "ARCHITECTURE & CLOUD SYSTEMS",
    description:
      "Designing resilient, secure, and autoscaling backend infrastructure. Specializing in containerized Docker microservices, PostgreSQL databases, serverless compute, and seamless CI/CD automation pipelines.",
    capabilities: [
      "PostgreSQL & Database Design",
      "Docker & Containerization",
      "Serverless Architecture",
      "RESTful & GraphQL APIs",
      "CI/CD Pipeline Setup",
    ],
  },
  {
    id: "04",
    title: "UI/UX DESIGN & CREATIVE DIRECTION",
    description:
      "Sculpting dark luxury digital identities with editorial typography, frosted glassmorphism, micro-interactions, and buttery smooth GSAP scroll choreography tailored for world-class impressions.",
    capabilities: [
      "Dark Aesthetic Design",
      "Frosted Glassmorphism",
      "GSAP ScrollTrigger Choreography",
      "Framer Motion Transitions",
      "Design Systems & Tokens",
    ],
  },
];

export default function ServicesSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="service"
      className="bg-[#000000] text-white pt-20 md:pt-28 pb-12 px-4 sm:px-8 md:px-16 flex flex-col relative overflow-hidden max-w-full"
    >
      {/* Top Heading */}
      <div className="flex flex-col md:flex-row items-end md:items-start justify-end w-full pb-10 sm:pb-14">
        <div className="flex flex-col items-end pr-2 md:pr-0 text-right">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-zinc-500 mb-2 sm:mb-3 font-mono">
            Expertise &amp; Offerings
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter drop-shadow-2xl leading-[0.9] uppercase text-right">
            {["WHAT WE", "CAN DO"].map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-700">
                  {line}
                </span>
              </span>
            ))}
          </h2>
        </div>
      </div>

      {/* Interactive Service Rows */}
      <div className="z-10 relative -mx-4 sm:-mx-8 md:-mx-16 border-t border-white/15 divide-y divide-white/10">
        {SERVICES.map((s) => {
          const isExpanded = expandedId === s.id;
          const isHovered = hoveredId === s.id;
          const isLit = isHovered || (isExpanded && hoveredId === null);

          return (
            <div
              key={s.id}
              className={`service-row relative py-5 sm:py-6 md:py-8 px-4 sm:px-8 md:px-16 cursor-pointer transition-all duration-500 ease-out ${
                isLit
                  ? "bg-[#e8e4dc] text-[#050505]"
                  : "bg-transparent text-white hover:bg-white/[0.04]"
              }`}
              onClick={() => setExpandedId(isExpanded ? null : s.id)}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex justify-between items-start gap-4">
                {/* Left: Number and Title */}
                <div className="flex items-start gap-3 sm:gap-6 md:gap-14 flex-1">
                  <span
                    className={`text-lg sm:text-2xl md:text-3xl font-mono font-bold transition-colors duration-300 ${
                      isLit ? "text-[#050505]" : "text-zinc-500"
                    }`}
                  >
                    {s.id}
                  </span>

                  <div className="flex flex-col flex-1 pr-2">
                    <h3
                      className={`text-base sm:text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight transition-colors duration-300 leading-snug ${
                        isLit ? "text-[#050505]" : "text-white"
                      }`}
                    >
                      {s.title}
                    </h3>

                    {/* Expandable Accordion Content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded
                          ? "max-h-[500px] opacity-100 mt-4"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p
                        className={`text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-xl ${
                          isLit ? "text-zinc-800" : "text-zinc-400"
                        }`}
                      >
                        {s.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-5">
                        {s.capabilities.map((cap) => (
                          <span
                            key={cap}
                            className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono tracking-wider uppercase border transition-colors ${
                              isLit
                                ? "border-zinc-800/20 bg-black/[0.06] text-zinc-900"
                                : "border-white/10 bg-white/[0.04] text-zinc-300"
                            }`}
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Expand Indicator Button */}
                <div className="flex-shrink-0 pt-0.5">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isLit
                        ? "border-zinc-900/30 text-zinc-900 bg-black/[0.05]"
                        : "border-white/15 text-zinc-300 bg-white/[0.04]"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? "rotate-45" : "rotate-0"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

