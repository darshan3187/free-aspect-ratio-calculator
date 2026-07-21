import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CalculatorHeader from "@/components/CalculatorHeader";
import FooterSection from "@/components/FooterSection";

export const metadata: Metadata = {
  title: "Privacy Policy — Aspect Ratio Calculator",
  description:
    "Our 100% Client-Side Privacy Policy. We do not store, collect, or transmit any images or personal data to remote servers.",
  alternates: {
    canonical: "https://freeaspectratiocalculator.com/privacy-policy",
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
      name: "Privacy Policy",
      item: "https://freeaspectratiocalculator.com/privacy-policy",
    },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
        <CalculatorHeader />

        <article className="studio-card p-6 sm:p-10 space-y-6">
          <div className="border-b border-white/[0.08] pb-5">
            <span className="text-xs font-mono text-[#888888] uppercase tracking-wider block mb-1">
              Legal Document
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-display-lg font-sans">
              Privacy Policy.
            </h1>
            <p className="text-xs font-mono text-[#888888] mt-1">
              Effective Date: January 1, 2026 • Status: 100% Client-Side Verified
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-neutral-300 font-sans">
            <h2 className="text-base font-bold text-white font-sans">
              1. Client-Side Processing Guarantee
            </h2>
            <p>
              At <strong>Aspect Ratio Calculator</strong>, we believe user privacy is non-negotiable. This tool is built using a strict zero-server architecture. All image inspection, canvas rendering, crop alignment, and numerical calculations are performed <strong>locally within your web browser process memory</strong>.
            </p>

            <h2 className="text-base font-bold text-white font-sans">
              2. Zero Server Data Uploads
            </h2>
            <p>
              When you drag and drop an image file into our Image Inspector or Visual Canvas, the file is read using the browser&apos;s native HTML5 <code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">FileReader</code> API. <strong>No image bytes or file metadata are ever transmitted across any network or saved on any remote database.</strong>
            </p>

            <h2 className="text-base font-bold text-white font-sans">
              3. No Tracking Cookies or Personal Profiling
            </h2>
            <p>
              We do not use invasive cross-site tracking cookies, user profiling algorithms, or third-party ad networks. We do not sell, rent, or monetize your personal information or calculation parameters.
            </p>

            <h2 className="text-base font-bold text-white font-sans">
              4. Security Headers & CSP
            </h2>
            <p>
              Our application implements strict HTTP Content Security Policy (CSP) headers (<code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">frame-ancestors &apos;self&apos;</code>, <code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">nosniff</code>) to prevent cross-site scripting (XSS), clickjacking, or data injection attacks.
            </p>

            <h2 className="text-base font-bold text-white font-sans">
              5. Contact Information
            </h2>
            <p>
              If you have any questions regarding our security architecture or privacy standards, please reach out via our dedicated <Link href="/contact-us" className="text-white underline font-medium">Contact Us page</Link>.
            </p>
          </div>
        </article>

        <FooterSection />
      </div>
    </>
  );
}
