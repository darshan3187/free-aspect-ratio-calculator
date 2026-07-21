import React from "react";
import type { Metadata } from "next";
import CalculatorHeader from "@/components/CalculatorHeader";
import ContactForm from "@/components/ContactForm";
import FooterSection from "@/components/FooterSection";

export const metadata: Metadata = {
  title: "Contact Us — Aspect Ratio Calculator Studio",
  description:
    "Get in touch with the Aspect Ratio Calculator studio team for feedback, feature requests, or bug reports.",
  alternates: {
    canonical: "https://freeaspectratiocalculator.com/contact-us",
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
      name: "Contact Us",
      item: "https://freeaspectratiocalculator.com/contact-us",
    },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Aspect Ratio Calculator",
  url: "https://freeaspectratiocalculator.com/contact-us",
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
              Have feedback, feature requests, or bug reports? We&apos;d love to hear from you.
            </p>
          </div>

          <ContactForm />
        </article>

        <FooterSection />
      </div>
    </>
  );
}
