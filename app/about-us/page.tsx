import React from "react";
import type { Metadata } from "next";
import CalculatorHeader from "@/components/CalculatorHeader";
import FooterSection from "@/components/FooterSection";

export const metadata: Metadata = {
  title: "About Us — Free Aspect Ratio Calculator Studio",
  description:
    "Learn about our mission to build the fastest, 100% private, zero-server aspect ratio calculator utility for designers, video editors, and frontend developers.",
  alternates: {
    canonical: "https://freeaspectratiocalculator.com/about-us",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://freeaspectratiocalculator.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About Us",
      item: "https://freeaspectratiocalculator.com/about-us",
    },
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Aspect Ratio Calculator",
  url: "https://freeaspectratiocalculator.com/about-us",
  description:
    "Learn about our mission to build the fastest, 100% private, zero-server aspect ratio calculator utility.",
};

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
        <CalculatorHeader />

        <article className="studio-card p-6 sm:p-10 space-y-6">
          <div className="border-b border-white/[0.08] pb-5">
            <span className="text-xs font-mono text-[#888888] uppercase tracking-wider block mb-1">
              Company & Mission
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-display-lg font-sans">
              About Aspect Ratio Calculator.
            </h1>
            <p className="text-sm text-[#888888] mt-1 font-sans">
              Empowering creators with real-time, privacy-first dimension scaling tools.
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-neutral-300 font-sans">
            <h2 className="text-lg font-bold text-white font-sans">Our Mission</h2>
            <p>
              <strong>Aspect Ratio Calculator</strong> was built to solve a simple yet persistent problem faced by visual creators, video producers, frontend engineers, and graphic designers: calculating proportional dimensions quickly without invasive pop-up ads, laggy servers, or privacy leaks.
            </p>

            <h2 className="text-lg font-bold text-white font-sans">Why We Are Different</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08]">
                <h3 className="text-sm font-bold text-white mb-1 font-sans">
                  100% Client-Side Memory
                </h3>
                <p className="text-xs text-[#888888]">
                  All image processing, crop rendering, and GCD fraction math occur directly inside your web browser. No files leave your device.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08]">
                <h3 className="text-sm font-bold text-white mb-1 font-sans">
                  Ad-Free & Lightning Fast
                </h3>
                <p className="text-xs text-[#888888]">
                  Zero bloated scripts or banner advertisements. Clean Vercel-inspired dark interface optimized for immediate productivity.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08]">
                <h3 className="text-sm font-bold text-white mb-1 font-sans">
                  Developer & AI Ready
                </h3>
                <p className="text-xs text-[#888888]">
                  Generates production CSS, Tailwind CSS, SVG viewBox attributes, and Midjourney/SDXL AI prompt flags instantly.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08]">
                <h3 className="text-sm font-bold text-white mb-1 font-sans">
                  DPI Print Conversion
                </h3>
                <p className="text-xs text-[#888888]">
                  Calculates high-resolution physical print sizes in inches and centimeters at 300 DPI for print designers.
                </p>
              </div>
            </div>

            <h2 className="text-lg font-bold text-white font-sans pt-4">Engineering Standards</h2>
            <p>
              Built using Next.js 15 App Router and React 19, our web application leverages modern web standards including HTML5 Canvas, FileReader APIs, and strict Content Security Policies (CSP) to guarantee user safety and zero tracking.
            </p>
          </div>
        </article>

        <FooterSection />
      </div>
    </>
  );
}
