import React from "react";
import Link from "next/link";
import CalculatorHeader from "@/components/CalculatorHeader";
import FooterSection from "@/components/FooterSection";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
      <CalculatorHeader />

      <div className="studio-card p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto my-8 sm:my-12">
        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold text-white bg-[#171717] border border-white/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span>404 NOT FOUND</span>
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-display-lg font-sans leading-tight">
            404: This page could not be found.
          </h1>
          <p className="text-xs sm:text-sm text-[#888888] font-sans max-w-md mx-auto leading-relaxed">
            The URL you requested does not exist, has been removed, or moved to a new route.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs font-sans transition-all active:scale-95 cursor-pointer shadow-md"
          >
            Return to Calculator Home
          </Link>
        </div>

        <div className="pt-6 border-t border-white/[0.08] space-y-3">
          <span className="text-[11px] font-mono text-[#888888] uppercase tracking-wider block">
            Popular Converters
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
            <Link
              href="/"
              className="px-3 py-1 rounded-full bg-[#000000] hover:bg-[#171717] text-neutral-300 hover:text-white border border-white/10 transition-all"
            >
              16:9 Calculator
            </Link>
            <Link
              href="/about-us"
              className="px-3 py-1 rounded-full bg-[#000000] hover:bg-[#171717] text-neutral-300 hover:text-white border border-white/10 transition-all"
            >
              About Us
            </Link>
            <Link
              href="/contact-us"
              className="px-3 py-1 rounded-full bg-[#000000] hover:bg-[#171717] text-neutral-300 hover:text-white border border-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
