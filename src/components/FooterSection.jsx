import React from 'react';
import { ShieldCheck, Mail, FileText, Info } from 'lucide-react';

export default function FooterSection({ onSelectPreset }) {
  return (
    <footer className="mt-10 sm:mt-16 pt-8 sm:pt-12 pb-6 sm:pb-8 border-t border-white/[0.08] text-[#888888] font-sans text-xs">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8 mb-8 sm:mb-12">
        {/* Col 1: Brand & E-E-A-T Trust */}
        <div className="sm:col-span-2 md:col-span-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-[#000000]">
              <img src="/logo.png" alt="Free Aspect Ratio Calculator Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug font-sans">Aspect Ratio Calculator.</span>
          </div>

          <p className="text-[#888888] text-[11px] sm:text-xs leading-relaxed font-sans">
            The free, ad-free, 100% private Aspect Ratio Calculator designed for digital creators, frontend engineers, UI/UX designers, and video editors. 
            All math and image processing happen client-side inside your browser.
          </p>
          <div className="flex items-center gap-2 text-neutral-300 font-mono text-[10px] sm:text-[11px] pt-1">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 text-white" />
            <span>Zero-Server Uploads • 100% Client-Side Privacy Guaranteed</span>
          </div>
        </div>

        {/* Col 2: SEO Quick Converters */}
        <div className="md:col-span-4 space-y-2">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 sm:mb-3 font-sans">
            Popular Converters
          </h3>
          <ul className="space-y-2 font-mono text-[10px] sm:text-[11px] text-[#888888]">
            <li>
              <button onClick={() => onSelectPreset(1920, 1080)} className="hover:text-white transition-colors text-left flex items-start gap-1.5 active:scale-98 cursor-pointer">
                <span>• 16:9 Aspect Ratio Calculator (1080p, 4K)</span>
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPreset(1080, 1350)} className="hover:text-white transition-colors text-left flex items-start gap-1.5 active:scale-98 cursor-pointer">
                <span>• 4:5 Instagram Portrait Resizer (1080 × 1350)</span>
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPreset(1080, 1920)} className="hover:text-white transition-colors text-left flex items-start gap-1.5 active:scale-98 cursor-pointer">
                <span>• 9:16 TikTok & Reels Vertical Video Scaler</span>
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPreset(3440, 1440)} className="hover:text-white transition-colors text-left flex items-start gap-1.5 active:scale-98 cursor-pointer">
                <span>• 21:9 Ultrawide Monitor Dimension Utility</span>
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPreset(1080, 1080)} className="hover:text-white transition-colors text-left flex items-start gap-1.5 active:scale-98 cursor-pointer">
                <span>• 1:1 Square Social Media Banner Generator</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Dedicated MPA Navigation Links */}
        <div className="md:col-span-3 space-y-2">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 sm:mb-3 font-sans">
            Pages & Legal
          </h3>
          <ul className="space-y-2.5 text-xs font-sans">
            <li>
              <a
                href="/about-us"
                className="text-white hover:text-neutral-300 underline font-medium flex items-center gap-1.5 transition-colors"
              >
                <Info className="w-3.5 h-3.5 text-neutral-400" />
                <span>About Us</span>
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="text-white hover:text-neutral-300 underline font-medium flex items-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Privacy Policy</span>
              </a>
            </li>
            <li>
              <a
                href="/terms-and-conditions"
                className="text-white hover:text-neutral-300 underline font-medium flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-neutral-400" />
                <span>Terms of Service</span>
              </a>
            </li>
            <li>
              <a
                href="/contact-us"
                className="text-white hover:text-neutral-300 underline font-medium flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>Contact Us</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="pt-4 sm:pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] text-[#888888] text-center sm:text-left font-sans">
        <p>© {new Date().getFullYear()} Aspect Ratio Calculator. All rights reserved.</p>
        <p className="font-mono">Built with Astro.js & React • Multi-Page Web App (MPA)</p>
      </div>
    </footer>
  );
}
