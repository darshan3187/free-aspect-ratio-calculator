import React from "react";
import type { Metadata } from "next";
import CalculatorHeader from "@/components/CalculatorHeader";
import ContactForm from "@/components/ContactForm";
import FooterSection from "@/components/FooterSection";
import { SITE_URL, SUPPORT_EMAIL } from "@/utils/constants";
import { generateOrganizationSchema } from "@/utils/schema";
import { Mail, Clock, HelpCircle, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — Aspect Ratio Calculator Studio",
  description:
    "Contact the Aspect Ratio Calculator studio team for technical inquiries, mathematical discrepancies, feature suggestions, or accessibility feedback.",
  alternates: {
    canonical: `${SITE_URL}/contact-us`,
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
      name: "Contact Us",
      item: `${SITE_URL}/contact-us`,
    },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Aspect Ratio Calculator",
  url: `${SITE_URL}/contact-us`,
  description:
    "Get in touch with the Aspect Ratio Calculator studio team for feedback, feature requests, or mathematical inquiries.",
};

const organizationSchema = generateOrganizationSchema();

export default function ContactUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
        <CalculatorHeader />

        <div className="max-w-4xl mx-auto space-y-8">
          <article className="studio-card p-6 sm:p-10 space-y-6">
            <div className="border-b border-white/[0.08] pb-5">
              <span className="text-xs font-mono text-[#888888] uppercase tracking-wider block mb-1">
                Support & Inquiries
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-display-lg font-sans">
                Contact Us
              </h1>
              <p className="text-sm text-[#888888] mt-1 font-sans">
                Have feedback, feature requests, mathematical inquiries, or accessibility suggestions? We welcome your input.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
              <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center gap-1.5 text-blue-400 font-mono text-[11px]">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Direct Email</span>
                </div>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-white font-semibold underline hover:text-blue-400 transition-colors break-all block text-xs"
                >
                  {SUPPORT_EMAIL}
                </a>
                <span className="text-[10px] text-neutral-400 block">Monitored during business days</span>
              </div>

              <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center gap-1.5 text-blue-400 font-mono text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Response Time</span>
                </div>
                <span className="text-white font-semibold block text-xs">
                  24 to 48 Hours
                </span>
                <span className="text-[10px] text-neutral-400 block">Typical turnaround for email responses</span>
              </div>

              <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center gap-1.5 text-blue-400 font-mono text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Client Privacy</span>
                </div>
                <span className="text-white font-semibold block text-xs">
                  100% Client-Side
                </span>
                <span className="text-[10px] text-neutral-400 block">Zero user calculation data retained</span>
              </div>
            </div>

            {/* Inquiries Scope Guidance */}
            <div className="bg-[#0a0a0a] rounded-xl p-5 border border-white/[0.06] space-y-3 text-xs text-neutral-300 font-sans">
              <h2 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-400" />
                How We Can Help You
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-400 text-xs">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Mathematical Edge Cases:</strong> Formula checks, subpixel rounding, non-square pixel ratios (PAR).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>New Ratio Presets:</strong> Request custom camera sensors, social platforms, or monitor specs.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Accessibility Feedback:</strong> Report screen reader, keyboard navigation, or color contrast issues.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Commercial Permissions:</strong> FreeAspectRatioCalculator is 100% free for commercial use.</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-white/[0.08] pt-6">
              <h2 className="text-sm font-mono text-neutral-400 uppercase tracking-wider mb-4">
                Send a Direct Message
              </h2>
              <ContactForm />
            </div>
          </article>
        </div>

        <FooterSection />
      </div>
    </>
  );
}
