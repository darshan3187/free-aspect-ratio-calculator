import React from "react";
import type { Metadata } from "next";
import CalculatorHeader from "@/components/CalculatorHeader";
import ContactForm from "@/components/ContactForm";
import FooterSection from "@/components/FooterSection";
import { SITE_URL } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Contact Us — Aspect Ratio Calculator Studio",
  description:
    "Get in touch with the Aspect Ratio Calculator studio team for feedback, feature requests, or bug reports.",
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
    "Get in touch with the Aspect Ratio Calculator studio team for feedback, feature requests, or bug reports.",
};


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

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
        <CalculatorHeader />

        <article className="studio-card p-6 sm:p-10 space-y-6 max-w-2xl mx-auto">
          <div className="border-b border-white/[0.08] pb-5">
            <span className="text-xs font-mono text-[#888888] uppercase tracking-wider block mb-1">
              Get In Touch
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-display-lg font-sans">
              Contact Us.
            </h1>
            <p className="text-sm text-[#888888] mt-1 font-sans">
              Have feedback, feature requests, or mathematical inquiries? We would love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
            <div className="p-3.5 rounded-xl bg-[#000000] border border-white/[0.08]">
              <span className="text-[11px] font-mono text-neutral-400 block mb-1">Direct Email</span>
              <a
                href="mailto:contact@freeaspectratiocalculator.online"
                className="text-white font-semibold underline hover:text-blue-400 transition-colors break-all"
              >
                contact@freeaspectratiocalculator.online
              </a>
            </div>
            <div className="p-3.5 rounded-xl bg-[#000000] border border-white/[0.08]">
              <span className="text-[11px] font-mono text-neutral-400 block mb-1">Response Time</span>
              <span className="text-neutral-200">
                Typically within 24 to 48 business hours
              </span>
            </div>
          </div>

          <ContactForm />
        </article>


        <FooterSection />
      </div>
    </>
  );
}
