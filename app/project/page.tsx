"use client";

import Navbar from "../components/navigation/Navbar";
import ProjectsSection from "../components/projects/ProjectsSection";

export default function ProjectPage() {
  return (
    <main className="relative min-h-screen bg-[#000000] text-white selection:bg-[#00e5ff] selection:text-[#000000]">
      <Navbar show={true} />
      <div className="pt-16 md:pt-24">
        <ProjectsSection />
      </div>
    </main>
  );
}

