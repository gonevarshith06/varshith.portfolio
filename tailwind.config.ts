import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          DEFAULT: "var(--accent, #e8e4dc)",
          hover: "var(--accent-hover, #d6d1c6)",
          contrast: "var(--accent-contrast, #050505)",
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        marquee: "marquee 28s linear infinite",
        halo: "halo 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        halo: {
          "75%, 100%": {
            transform: "scale(2.5)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;

