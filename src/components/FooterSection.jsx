import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Mail, FileText, Info } from 'lucide-react';

export default function FooterSection({ onSelectPreset = null }) {
  return (
    <footer className="mt-10 sm:mt-16 pt-8 sm:pt-12 pb-6 sm:pb-8 border-t border-white/[0.08] text-[#888888] font-sans text-xs">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8 mb-8 sm:mb-12">
        {/* Col 1: Brand & E-E-A-T Trust */}
        <div className="sm:col-span-2 md:col-span-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-[#000000]">
              <Image src="/logo.webp" alt="Free Aspect Ratio Calculator Logo" width={28} height={28} className="w-full h-full object-cover" />
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
              {onSelectPreset ? (
                <button onClick={() => onSelectPreset(1920, 1080)} className="hover:text-white transition-colors text-left flex items-start gap-1.5 active:scale-98 cursor-pointer">
                  <span>• 16:9 Aspect Ratio Calculator (1080p, 4K)</span>
                </button>
              ) : (
                <Link href="/?w1=1920&h1=1080" className="hover:text-white transition-colors text-left flex items-start gap-1.5 cursor-pointer">
                  <span>• 16:9 Aspect Ratio Calculator (1080p, 4K)</span>
                </Link>
              )}
            </li>
            <li>
              {onSelectPreset ? (
                <button onClick={() => onSelectPreset(1080, 1350)} className="hover:text-white transition-colors text-left flex items-start gap-1.5 active:scale-98 cursor-pointer">
                  <span>• 4:5 Instagram Portrait Resizer (1080 × 1350)</span>
                </button>
              ) : (
                <Link href="/?w1=1080&h1=1350" className="hover:text-white transition-colors text-left flex items-start gap-1.5 cursor-pointer">
                  <span>• 4:5 Instagram Portrait Resizer (1080 × 1350)</span>
                </Link>
              )}
            </li>
            <li>
              {onSelectPreset ? (
                <button onClick={() => onSelectPreset(1080, 1920)} className="hover:text-white transition-colors text-left flex items-start gap-1.5 active:scale-98 cursor-pointer">
                  <span>• 9:16 TikTok & Reels Vertical Video Scaler</span>
                </button>
              ) : (
                <Link href="/?w1=1080&h1=1920" className="hover:text-white transition-colors text-left flex items-start gap-1.5 cursor-pointer">
                  <span>• 9:16 TikTok & Reels Vertical Video Scaler</span>
                </Link>
              )}
            </li>
            <li>
              {onSelectPreset ? (
                <button onClick={() => onSelectPreset(3440, 1440)} className="hover:text-white transition-colors text-left flex items-start gap-1.5 active:scale-98 cursor-pointer">
                  <span>• 21:9 Ultrawide Monitor Dimension Utility</span>
                </button>
              ) : (
                <Link href="/?w1=3440&h1=1440" className="hover:text-white transition-colors text-left flex items-start gap-1.5 cursor-pointer">
                  <span>• 21:9 Ultrawide Monitor Dimension Utility</span>
                </Link>
              )}
            </li>
            <li>
              {onSelectPreset ? (
                <button onClick={() => onSelectPreset(1080, 1080)} className="hover:text-white transition-colors text-left flex items-start gap-1.5 active:scale-98 cursor-pointer">
                  <span>• 1:1 Square Social Media Banner Generator</span>
                </button>
              ) : (
                <Link href="/?w1=1080&h1=1080" className="hover:text-white transition-colors text-left flex items-start gap-1.5 cursor-pointer">
                  <span>• 1:1 Square Social Media Banner Generator</span>
                </Link>
              )}
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
              <Link
                href="/about-us"
                className="text-white hover:text-neutral-300 underline font-medium flex items-center gap-1.5 transition-colors"
              >
                <Info className="w-3.5 h-3.5 text-neutral-400" />
                <span>About Us</span>
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="text-white hover:text-neutral-300 underline font-medium flex items-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Privacy Policy</span>
              </Link>
            </li>
            <li>
              <Link
                href="/terms-and-conditions"
                className="text-white hover:text-neutral-300 underline font-medium flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-neutral-400" />
                <span>Terms of Service</span>
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="text-white hover:text-neutral-300 underline font-medium flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="pt-4 sm:pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] text-[#888888] text-center sm:text-left font-sans">
        <p>© {new Date().getFullYear()} Aspect Ratio Calculator. All rights reserved.</p>
        <p className="font-mono">Built with Next.js 15 & React • Multi-Page Web App (MPA)</p>
      </div>
    </footer>
  );
}
