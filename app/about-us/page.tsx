import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CalculatorHeader from "@/components/CalculatorHeader";
import FooterSection from "@/components/FooterSection";
import { SITE_URL } from "@/utils/constants";


export const metadata: Metadata = {
  title: "About Us — Free Aspect Ratio Calculator Studio",
  description:
    "Learn about our mission to build the fastest, 100% private, zero-server aspect ratio calculator utility for designers, video editors, and frontend developers.",
  alternates: {
    canonical: `${SITE_URL}/about-us`,
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
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About Us",
      item: `${SITE_URL}/about-us`,
    },
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Aspect Ratio Calculator",
  url: `${SITE_URL}/about-us`,
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
              <strong>Aspect Ratio Calculator</strong> was built to solve a persistent daily challenge faced by digital creators, video editors, frontend developers, and visual designers: calculating proportional dimensions quickly, reliably, and with guaranteed privacy.
            </p>

            <h2 className="text-lg font-bold text-white font-sans">Core Architectural Principles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08]">
                <h3 className="text-sm font-bold text-white mb-1 font-sans">
                  100% Client-Side Computing
                </h3>
                <p className="text-xs text-[#888888]">
                  All image analysis, canvas rendering, crop alignment, and numerical algorithms execute directly inside your browser&apos;s sandbox. No image data is ever uploaded to our servers.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08]">
                <h3 className="text-sm font-bold text-white mb-1 font-sans">
                  Distraction-Free & Fast
                </h3>
                <p className="text-xs text-[#888888]">
                  Built on Next.js 15 with zero client-side computational latency. Clean dark interface optimized for workflow focus without obstructive pop-ups or deceptive layout shifts.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08]">
                <h3 className="text-sm font-bold text-white mb-1 font-sans">
                  Developer & AI Ready
                </h3>
                <p className="text-xs text-[#888888]">
                  Export production-ready CSS <code className="font-mono text-white">aspect-ratio</code> rules, Tailwind utility classes, SVG <code className="font-mono text-white">viewBox</code> attributes, and Midjourney/SDXL command flags with one click.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08]">
                <h3 className="text-sm font-bold text-white mb-1 font-sans">
                  Print & DPI Scaling
                </h3>
                <p className="text-xs text-[#888888]">
                  Calculate physical dimensions in inches and centimeters at 300 DPI for professional giclée, offset, and photographic print production.
                </p>
              </div>
            </div>

            <h2 className="text-lg font-bold text-white font-sans pt-4">Mathematical Accuracy & Standards</h2>
            <p>
              Our ratio reduction engine uses Euclidean algorithm GCD (Greatest Common Divisor) factorization to ensure mathematically sound fraction simplification. Screen resolution presets comply with international standards established by SMPTE, ITU-R (Rec. 709 and Rec. 2020), DCI (Digital Cinema Initiatives), and ISO 216 paper proportions.
            </p>

            <h2 className="text-lg font-bold text-white font-sans pt-4">Editorial Integrity & Maintenance</h2>
            <p>
              Every educational guide, comparison matrix, and technical formula published in our knowledge hub is authored and maintained with care. We routinely update our presets to reflect evolving social platform specifications (such as Instagram Reels, YouTube Shorts, and modern ultrawide gaming monitors).
            </p>

            <h2 className="text-lg font-bold text-white font-sans pt-4">Get in Touch</h2>
            <p>
              We welcome suggestions, correction reports, and feature requests from the community. You can reach our engineering team directly at <a href="mailto:contact@freeaspectratiocalculator.online" className="text-white underline hover:text-blue-400">contact@freeaspectratiocalculator.online</a> or through our <Link href="/contact-us" className="text-white underline hover:text-blue-400">Contact Us page</Link>.
            </p>

          </div>
        </article>

        <FooterSection />
      </div>
    </>
  );
}
