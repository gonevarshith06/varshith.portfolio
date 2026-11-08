"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Preloader from "./components/preloader/Preloader";
import Navbar from "./components/navigation/Navbar";
import HeroSection from "./components/hero/HeroSection";
import AboutSection from "./components/about/AboutSection";
import ServicesSection from "./components/services/ServicesSection";
import ContactSection from "./components/contact/ContactSection";
import AudioPlayer from "./components/audio/AudioPlayer";

const ProjectsSection = dynamic(
  () => import("./components/projects/ProjectsSection"),
  { ssr: false }
);

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [burstTrigger, setBurstTrigger] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#000000] text-white selection:bg-[#00e5ff] selection:text-[#000000] overflow-x-hidden max-w-full">
      {/* 1. Introductory Preloader Animation */}
      {showPreloader && (
        <Preloader
          onBurst={() => setBurstTrigger(true)}
          onPreloadComplete={() => {
            setBurstTrigger(true);
            setShowPreloader(false);
          }}
        />
      )}

      {/* 2. Main Portfolio Application Flow - Butterflies constrained strictly to Hero */}
      <div className="relative w-full">
        <Navbar show={burstTrigger} />
        <HeroSection burstTrigger={burstTrigger} />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
        <AudioPlayer />
      </div>
    </main>
  );
}
