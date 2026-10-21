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
            The free, distraction-free, 100% private Aspect Ratio Calculator designed for digital creators, frontend engineers, UI/UX designers, and video editors. 
            All math and image processing happen client-side inside your browser.
          </p>

          <div className="flex items-center gap-2 text-neutral-300 font-mono text-[10px] sm:text-[11px] pt-1">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 text-white" />
            <span>Zero-Server Uploads • 100% Client-Side Privacy Guaranteed</span>
          </div>
        </div>

        {/* Col 2: Core Aspect Ratio Calculators */}
        <div className="sm:col-span-1 md:col-span-3 space-y-2">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 sm:mb-3 font-sans">
            Ratio Calculators
          </h3>
          <ul className="space-y-1.5 font-mono text-[10px] sm:text-[11px] text-[#888888]">
            <li>
              <Link href="/16-9-aspect-ratio-calculator" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • 16:9 Widescreen (1080p, 4K)
              </Link>
            </li>
            <li>
              <Link href="/4-3-aspect-ratio-calculator" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • 4:3 Standard (iPad, Photo)
              </Link>
            </li>
            <li>
              <Link href="/21-9-aspect-ratio-calculator" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • 21:9 Ultrawide Monitor
              </Link>
            </li>
            <li>
              <Link href="/1-1-aspect-ratio-calculator" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • 1:1 Square (Instagram Post)
              </Link>
            </li>
            <li>
              <Link href="/9-16-aspect-ratio-calculator" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • 9:16 Vertical (TikTok, Reels)
              </Link>
            </li>
            <li>
              <Link href="/3-2-aspect-ratio-calculator" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • 3:2 Photography (35mm, 4x6)
              </Link>
            </li>
            <li>
              <Link href="/5-4-aspect-ratio-calculator" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • 5:4 Photo Print (8x10 Frame)
              </Link>
            </li>
            <li>
              <Link href="/4-5-aspect-ratio-calculator" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • 4:5 Instagram Portrait
              </Link>
            </li>
            <li>
              <Link href="/16-10-aspect-ratio-calculator" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • 16:10 Laptop (MacBook)
              </Link>
            </li>
            <li>
              <Link href="/2-39-1-aspect-ratio-calculator" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • 2.39:1 Cinema Scope
              </Link>
            </li>
            <li>
              <Link href="/32-9-aspect-ratio-calculator" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • 32:9 Super Ultrawide
              </Link>
            </li>
            <li>
              <Link href="/golden-ratio-aspect-ratio-calculator" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • Golden Ratio (1.618:1)
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Side-by-Side Comparisons */}
        <div className="sm:col-span-1 md:col-span-2 space-y-2">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 sm:mb-3 font-sans">
            Comparisons
          </h3>
          <ul className="space-y-1.5 font-mono text-[10px] sm:text-[11px] text-[#888888]">
            <li>
              <Link href="/compare" prefetch={false} className="text-white hover:text-blue-400 font-semibold underline flex items-center gap-1 font-sans mb-1 transition-colors">
                All Comparisons Hub →
              </Link>
            </li>
            <li>
              <Link href="/compare/16-9-vs-4-3" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • 16:9 vs 4:3
              </Link>
            </li>
            <li>
              <Link href="/compare/16-9-vs-21-9" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • 16:9 vs 21:9
              </Link>
            </li>
            <li>
              <Link href="/compare/1080p-vs-1440p" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • 1080p vs 1440p
              </Link>
            </li>
            <li>
              <Link href="/compare/1440p-vs-4k" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • 1440p vs 4K
              </Link>
            </li>
            <li>
              <Link href="/compare/portrait-vs-landscape" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • Portrait vs Landscape
              </Link>
            </li>
            <li>
              <Link href="/compare/instagram-post-vs-reel" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
                • Post vs Reel
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Guides & Company */}
        <div className="sm:col-span-1 md:col-span-2 space-y-2">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 sm:mb-3 font-sans">
            Guides & Legal
          </h3>
          <ul className="space-y-2 text-xs font-sans text-[#888888]">
            <li>
              <Link href="/guides" prefetch={false} className="text-white hover:text-blue-400 font-semibold underline flex items-center gap-1 transition-colors">
                <span>Knowledge Hub (50+ Guides)</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                prefetch={false}
                className="hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Info className="w-3.5 h-3.5 text-neutral-400" />
                <span>About Us</span>
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                prefetch={false}
                className="hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>Contact Us</span>
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                prefetch={false}
                className="hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Privacy Policy</span>
              </Link>
            </li>
            <li>
              <Link
                href="/terms-and-conditions"
                prefetch={false}
                className="hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-neutral-400" />
                <span>Terms of Service</span>
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
