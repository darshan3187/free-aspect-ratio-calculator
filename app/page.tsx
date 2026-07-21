import React from "react";
import RatioCraftApp from "@/components/RatioCraftApp";
import SeoArticleSection from "@/components/SeoArticleSection";
import FaqSection from "@/components/FaqSection";
import FooterSection from "@/components/FooterSection";

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Aspect Ratio Calculator",
  url: "https://freeaspectratiocalculator.com/",
  description:
    "Free online aspect ratio calculator to calculate 16:9, 4:3, and custom image & screen proportions in pixels and inches. 100% client-side browser privacy.",
  applicationCategory: "DesignApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "16:9 Aspect Ratio Calculator",
    "4:3 Aspect Ratio Calculator",
    "Aspect Ratio Calculator Pixels & Inches",
    "Real-time visual canvas inspector with focal point controls",
    "Social media & display screen presets",
    "CSS & HTML Code Exporter",
    "100% Client-side local processing",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an aspect ratio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An aspect ratio is the proportional relationship between an image or display screen's width and height. It is expressed as two numbers separated by a colon (such as 16:9 or 4:5).",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate scaled height from width?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To calculate height when scaling an image while preserving aspect ratio: Multiply original height by target width, then divide by original width. Formula: New Height = (Original Height × Target Width) ÷ Original Width.",
      },
    },
    {
      "@type": "Question",
      name: "What are the most common aspect ratios for social media?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most popular social media aspect ratios are 1:1 (Instagram Square), 4:5 (Instagram Portrait), 9:16 (TikTok & Reels), and 16:9 (YouTube Widescreen).",
      },
    },
    {
      "@type": "Question",
      name: "Why do images look stretched or squished when resizing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Images warp when width or height is scaled independently without maintaining the constant proportional ratio. Locking the aspect ratio guarantees uniform scaling.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Aspect Ratio in Pixels & Inches",
  description:
    "Step-by-step guide to calculating 16:9, 4:3, or custom aspect ratios for web design, photography, and video resizing.",
  step: [
    {
      "@type": "HowToStep",
      name: "Input Original Dimensions",
      text: "Enter your original width and height in pixels or physical inches.",
    },
    {
      "@type": "HowToStep",
      name: "Set Target Width or Height",
      text: "Specify your target width or height. The calculator automatically computes the missing dimension.",
    },
    {
      "@type": "HowToStep",
      name: "Export Code or Download Specs",
      text: "Copy instant CSS/HTML snippets or scale tables for developer implementation.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://freeaspectratiocalculator.com/",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      {/* Structured Data / JSON-LD for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen">
        {/* Interactive App Container */}
        <RatioCraftApp />

        {/* Server Rendered Static Articles for Instant SEO */}
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          <SeoArticleSection />
          <FaqSection />
          <FooterSection />
        </div>
      </main>
    </>
  );
}
