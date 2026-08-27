import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import FilmRail from "@/components/FilmRail";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hadeer Mouwad — Photographer",
  description:
    "Photographer focused on people, places, and honest moments. Based on Egypt, Available worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${inter.variable} ${jbmono.variable} antialiased bg-ink text-paper`}
      >
        <div className="grain" aria-hidden="true" />
        <FilmRail side="left" />
        <FilmRail side="right" />
        {children}
      </body>
    </html>
  );
}
