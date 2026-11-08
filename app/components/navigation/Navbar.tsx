"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { NavItem } from "./GooeyNavbar";

const GooeyNavbar = dynamic(() => import("./GooeyNavbar"), { ssr: false });

const NAV_LINKS: NavItem[] = [
  { label: "Home", link: "#home" },
  { label: "About", link: "#about" },
  { label: "Services", link: "#service" },
  { label: "Projects", link: "#project" },
  { label: "Contact", link: "#contact" },
];

interface NavbarProps {
  show?: boolean;
}

export default function Navbar({ show = true }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = NAV_LINKS.map((link) =>
            document.getElementById(link.link.replace("#", ""))
          ).filter(Boolean);

          for (let i = sections.length - 1; i >= 0; i--) {
            const el = sections[i];
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 250) {
                setActiveSection(el.id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    if (href === "#contact" && typeof window !== "undefined") {
      (window as any).__navigatingToContact = true;
      setTimeout(() => {
        (window as any).__navigatingToContact = false;
      }, 1800);
    }
    if (href === "#project" && typeof window !== "undefined") {
      (window as any).__navigatingToContact = false;
      window.dispatchEvent(new CustomEvent("activate-projects"));
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/" + href;
    }
  };

  const activeIdx = Math.max(
    0,
    NAV_LINKS.findIndex((item) => item.link.replace("#", "") === activeSection)
  );

  return (
    <>
      {/* Floating Modern Header with Liquid Gooey Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 py-4 md:py-6 px-6 md:px-16 flex items-center justify-center pointer-events-none ${
          show
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-8 pointer-events-none"
        }`}
      >
        {/* Center Desktop Liquid Gooey Navigation */}
        <div className="hidden md:flex items-center justify-center pointer-events-auto">
          {show && (
            <GooeyNavbar
              items={NAV_LINKS}
              activeIndex={activeIdx}
              onSelect={(idx, item) => scrollTo(item.link)}
              pillColor="rgba(0, 0, 0, 0.72)"
              textColor="rgba(255, 255, 255, 0.75)"
              hoverTextColor="#ffffff"
              fontSize={13}
              paddingX={22}
              paddingY={12}
              cornerRadius={14}
              gap={0}
              neighborPush={28}
            />
          )}
        </div>

        {/* Mobile Menu Hamburger Button */}
        <div className="md:hidden absolute right-4 sm:right-6 top-4 sm:top-6 flex items-center pointer-events-auto">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full border border-white/10 bg-black/75 backdrop-blur-md text-zinc-300 hover:text-white shadow-lg active:scale-95 transition-all"
            aria-label="Toggle Navigation Menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 md:hidden">
          {/* Top Bar with Brand & Close */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs tracking-widest uppercase text-zinc-400">
              Varshith • Portfolio
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-full border border-white/15 bg-white/5 text-zinc-300 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-6 my-auto">
            {NAV_LINKS.map((link, idx) => {
              const isActive = activeSection === link.link.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.link}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.link);
                  }}
                  className={`text-2xl sm:text-3xl font-black uppercase tracking-wider transition-all flex items-center justify-between py-1 border-b border-white/[0.05] ${
                    isActive ? "text-white translate-x-2" : "text-zinc-500 hover:text-zinc-200"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-zinc-600">0{idx + 1}</span>
                </a>
              );
            })}
          </nav>

          {/* Bottom Contact Shortcut */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-zinc-400">
            <a
              href="mailto:varshithg94@gmail.com"
              className="hover:text-white transition-colors"
            >
              varshithg94@gmail.com
            </a>
            <span>+91 7065674284</span>
          </div>
        </div>
      )}
    </>
  );
}
