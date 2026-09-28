import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sravan Kumar Gummalla — Software Developer & AI Enthusiast",
  description:
    "Portfolio of Sravan Kumar Gummalla. Full-stack products, applied AI, and high-performance systems from Hyderabad.",
  keywords: [
    "Sravan Kumar Gummalla",
    "Full Stack Developer",
    "AI Engineer",
    "Next.js",
    "Hyderabad",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="min-h-screen font-[var(--font-sans)] antialiased">
        {children}
      </body>
    </html>
  );
}
