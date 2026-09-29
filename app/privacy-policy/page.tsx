import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CalculatorHeader from "@/components/CalculatorHeader";
import FooterSection from "@/components/FooterSection";
import { SITE_URL } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Privacy Policy — Aspect Ratio Calculator",
  description:
    "Our 100% Client-Side Privacy Policy. We do not store, collect, or transmit any images or personal data to remote servers.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
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
      name: "Privacy Policy",
      item: `${SITE_URL}/privacy-policy`,
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
              1. Client-Side Processing & Data Minimization
            </h2>
            <p>
              At <strong>Aspect Ratio Calculator</strong>, privacy is engineered into our architecture. All image inspection, aspect ratio math, crop boundary alignment, and scale calculations run <strong>entirely in your local web browser memory</strong>. When you select or drag and drop an image file, it is processed via the standard HTML5 <code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">FileReader</code> API. No image bytes or file metadata are ever transmitted to or stored on our servers.
            </p>

            <h2 className="text-base font-bold text-white font-sans">
              2. Cookies and Third-Party Advertising Disclosures
            </h2>
            <p>
              To support the ongoing maintenance and free availability of our utilities, we partner with third-party advertising networks, including <strong>Google AdSense</strong>. Please review the following advertising and cookie disclosures:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-2">
              <li>
                <strong>Third-Party Vendors & Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites across the Internet.
              </li>
              <li>
                <strong>Advertising Cookies:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visits to this site and/or other sites on the Internet.
              </li>
              <li>
                <strong>Personalized Advertising Opt-Out:</strong> Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-blue-400 transition-colors">Google Ads Settings</a>.
              </li>
              <li>
                <strong>Third-Party Opt-Out:</strong> Users may also opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-blue-400 transition-colors">www.aboutads.info</a> or <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-blue-400 transition-colors">Your Online Choices</a> (for EEA/UK users).
              </li>
            </ul>

            <h2 className="text-base font-bold text-white font-sans">
              3. Web Analytics & Measurement
            </h2>
            <p>
              We utilize Google Analytics and privacy-conscious Vercel Web Analytics to measure aggregate web traffic, popular calculation presets, and frontend performance (Core Web Vitals). These analytics tools collect non-personally identifiable diagnostic metrics (such as browser type, general geographical region, and session duration) to help us optimize user experience.
            </p>

            <h2 className="text-base font-bold text-white font-sans">
              4. Security Headers & Content Security Policy (CSP)
            </h2>
            <p>
              Our application implements strict HTTP security headers, including <code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">X-Content-Type-Options: nosniff</code>, <code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">Strict-Transport-Security</code>, and Content Security Policies to protect visitors from cross-site scripting (XSS), clickjacking, and unauthorized data injection.
            </p>

            <h2 className="text-base font-bold text-white font-sans">
              5. User Rights & Data Protection (GDPR & CCPA)
            </h2>
            <p>
              Because our calculator functions client-side without user account registration, we do not maintain personal profiles, contact databases, or financial records. For analytics or advertising inquiries, users in the European Economic Area (EEA), United Kingdom, and California enjoy the right to access, restrict, or opt out of tracking as outlined in the opt-out links above.
            </p>

            <h2 className="text-base font-bold text-white font-sans">
              6. Contact Information
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy or our operational practices, please contact us at <a href="mailto:contact@freeaspectratiocalculator.online" className="text-white underline font-medium hover:text-blue-400">contact@freeaspectratiocalculator.online</a> or visit our <Link href="/contact-us" className="text-white underline font-medium hover:text-blue-400">Contact Us page</Link>.
            </p>

          </div>
        </article>

        <FooterSection />
      </div>
    </>
  );
}
