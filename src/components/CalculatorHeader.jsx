import React, { useState } from 'react';
import { ShieldCheck, Lock, X, CheckCircle2, Shield } from 'lucide-react';

export default function CalculatorHeader() {
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  return (
    <header className="pt-4 sm:pt-8 pb-6 sm:pb-8 border-b border-white/[0.08] mb-6 sm:mb-8">
      {/* Vercel Nav Bar top strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Brand Container */}
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 shadow-lg bg-[#000000]">
            <img src="/logo.png" alt="Aspect Ratio Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-display-lg text-white font-sans leading-tight">
                Aspect Ratio Calculator.
              </h1>
              <button
                onClick={() => setShowSecurityModal(true)}
                aria-label="View security and privacy audit"
                className="px-3 py-0.5 rounded-full text-[10px] font-mono font-medium text-neutral-200 border border-white/10 bg-[#171717] hover:bg-neutral-800 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap"
                title="Click to view Security & Privacy Audit details"
              >
                <ShieldCheck className="w-3 h-3 text-neutral-300" />
                <span>100% Private & Verified</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#888888] mt-1 font-sans leading-relaxed">
              Calculate proportions, crop frames, social presets, and developer CSS instantly.
            </p>
          </div>
        </div>

        {/* Vercel Pill CTA Action */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setShowSecurityModal(true)}
            aria-label="Zero-Server Privacy Info"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-neutral-300 border border-white/10 bg-[#171717] hover:bg-neutral-800 hover:border-white/20 transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <Lock className="w-3 h-3 text-neutral-300" />
            <span>Zero-Server Privacy</span>
          </button>
        </div>
      </div>

      {/* Prominent Multi-Page Application (MPA) Header Nav Bar */}
      <nav aria-label="Main Website Navigation" className="flex flex-wrap items-center gap-2 mt-5 pt-3 border-t border-white/[0.05]">
        <a
          href="/"
          className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-white bg-[#171717] border border-white/20 shadow-sm transition-all"
        >
          Calculator
        </a>
        <a
          href="/about-us"
          className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-neutral-300 hover:text-white bg-[#000000] hover:bg-[#171717] border border-white/10 transition-all"
        >
          About Us
        </a>
        <a
          href="/privacy-policy"
          className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-neutral-300 hover:text-white bg-[#000000] hover:bg-[#171717] border border-white/10 transition-all"
        >
          Privacy Policy
        </a>
        <a
          href="/terms-and-conditions"
          className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-neutral-300 hover:text-white bg-[#000000] hover:bg-[#171717] border border-white/10 transition-all"
        >
          Terms of Service
        </a>
        <a
          href="/contact-us"
          className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-neutral-300 hover:text-white bg-[#000000] hover:bg-[#171717] border border-white/10 transition-all"
        >
          Contact Us
        </a>
      </nav>

      {/* Security & Privacy Audit Modal */}
      {showSecurityModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="studio-card max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowSecurityModal(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-neutral-400 hover:text-white transition-all active:scale-95 cursor-pointer"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 text-neutral-200 mb-4">
              <Shield className="w-5 h-5 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight leading-tight">Security & Privacy Audit.</h2>
                <span className="text-[11px] text-[#888888] font-mono">Status: Verified 100% Browser Execution</span>
              </div>
            </div>

            <div className="space-y-3 text-neutral-300 text-xs leading-relaxed border-t border-white/10 pt-4 font-sans">
              <div className="p-3.5 rounded-xl bg-[#171717] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Local Memory Execution</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  All aspect ratio calculations, batch dimension scales, preview canvas rendering, and crop math execute locally inside your browser process memory.
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2">
                  <span className="text-neutral-400 font-bold">•</span>
                  <p><strong className="text-white">Zero Server Data Uploads:</strong> Image previews remain on your device via HTML5 FileReader API.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neutral-400 font-bold">•</span>
                  <p><strong className="text-white">Strict CSP Headers:</strong> Implemented security policies preventing cross-site scripting and iframe clickjacking.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neutral-400 font-bold">•</span>
                  <p><strong className="text-white">RFC 9116 Compliant:</strong> Public standard vulnerability disclosure policy standard configured.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
