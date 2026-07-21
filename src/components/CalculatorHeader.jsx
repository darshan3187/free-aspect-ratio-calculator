'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, X, CheckCircle2, Shield } from 'lucide-react';

export default function CalculatorHeader({ showGuide = false, onToggleGuide = null }) {
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  return (
    <header className="pt-3 sm:pt-6 pb-4 sm:pb-6 border-b border-white/[0.08] mb-5 sm:mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 bg-[#000000] shadow-md">
            <Image src="/logo.png" alt="Aspect Ratio Logo" width={36} height={36} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white font-sans leading-tight">
              Aspect Ratio Calculator
            </h1>
            <p className="text-[11px] sm:text-xs text-neutral-400 font-sans mt-0.5">
              Instant proportion calculator & resolution resizer
            </p>
          </div>
        </div>

        {/* Header Navigation & Utility Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto justify-between md:justify-end">
          <nav aria-label="Main Website Navigation" className="flex flex-wrap items-center gap-1 sm:gap-1.5 max-w-full">
            <Link
              href="/"
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-semibold text-white bg-[#171717] border border-white/30 shadow-sm transition-all"
            >
              Calculator
            </Link>
            <Link
              href="/about-us"
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium text-neutral-400 hover:text-white bg-[#000000] hover:bg-[#171717] border border-white/10 transition-all"
            >
              About
            </Link>
            <Link
              href="/privacy-policy"
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium text-neutral-400 hover:text-white bg-[#000000] hover:bg-[#171717] border border-white/10 transition-all"
            >
              Privacy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium text-neutral-400 hover:text-white bg-[#000000] hover:bg-[#171717] border border-white/10 transition-all"
            >
              Terms
            </Link>
            <Link
              href="/contact-us"
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium text-neutral-400 hover:text-white bg-[#000000] hover:bg-[#171717] border border-white/10 transition-all"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => setShowSecurityModal(true)}
              title="100% Client-Side Private"
              className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium text-neutral-400 hover:text-white bg-[#000000] hover:bg-[#171717] border border-white/10 transition-all cursor-pointer flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Private</span>
            </button>

            {onToggleGuide && (
              <button
                onClick={onToggleGuide}
                aria-label="Toggle user guide"
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium text-white bg-[#171717] hover:bg-neutral-800 border border-white/20 transition-all cursor-pointer shadow-sm"
              >
                {showGuide ? 'Hide Help' : 'Help'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Security & Privacy Audit Modal */}
      {showSecurityModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="studio-card max-w-md w-full p-5 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowSecurityModal(false)}
              aria-label="Close modal"
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-neutral-200 mb-4">
              <Shield className="w-5 h-5 flex-shrink-0" />
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white leading-tight">Client-Side Privacy Guarantee</h2>
                <span className="text-[10px] sm:text-[11px] text-neutral-400 font-mono">Zero server data upload</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-neutral-300 leading-relaxed font-sans">
              <p>
                Our <strong>Aspect Ratio Calculator</strong> operates 100% inside your local browser sandbox.
              </p>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Zero Server Uploads</strong>: Your images and pixel data are processed using HTML5 canvas without backend storage.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>No Tracking Cookies</strong>: No analytical tracking or personal identify logs are collected.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Instant Processing</strong>: Calculations run in real-time on your graphics unit.</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => setShowSecurityModal(false)}
                  className="w-full py-2 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-all cursor-pointer font-sans text-xs"
                >
                  Understood & Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
