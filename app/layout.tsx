import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Varshith — Creative Technologist & Full Stack Developer",
  description:
    "Portfolio of Varshith — Creative Technologist & Full Stack Developer specializing in WebGL, 3D interactive experiences, Next.js, and high-performance applications.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className="bg-[#000000] text-white antialiased selection:bg-[#00e5ff] selection:text-[#000000] overflow-x-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
