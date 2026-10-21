import React from 'react';
import { BookOpen, Calculator, Monitor, Image, Layers, Code, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SeoArticleSection() {
  return (
    <article className="studio-card p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 border border-white/[0.08] text-neutral-300 font-sans text-sm leading-relaxed space-y-8">
      {/* Article Header */}
      <div className="border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-2 text-[#888888] font-mono text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4 text-white" />
          <span>Technical Guide & Reference</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-display-lg font-sans">
          Proportional Scaling & Aspect Ratio Calculation Explained
        </h2>
        <p className="text-xs sm:text-sm text-[#888888] mt-1 font-sans">
          A definitive engineering guide to computing image dimensions, aspect ratios, responsive CSS containers, and 300 DPI print standards.
        </p>
      </div>

      {/* Section 1: Definition */}
      <section className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-sans">
          <Calculator className="w-4 h-4 text-neutral-300" />
          <span>What Is an Aspect Ratio?</span>
        </h3>
        <p>
          An <strong>aspect ratio</strong> expresses the proportional relationship between the width and height of an image, video frame, or physical display canvas. Formatted as two integers separated by a colon (<code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">Width:Height</code>), it defines geometry independent of total pixel resolution or physical measurements.
        </p>
        <p>
          For example, a high-definition 1080p canvas (1920×1080) and an ultra-high-definition 4K monitor (3840×2160) share the exact same 16:9 proportion, even though the 4K display contains four times as many individual pixels.
        </p>
      </section>

      {/* Section 2: Mathematical Formulas */}
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-sans">
          <Layers className="w-4 h-4 text-neutral-300" />
          <span>Mathematical Calculation Formulas</span>
        </h3>
        <p>
          When resizing graphics while preserving proportions, two fundamental formulas govern dimension scaling:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08] space-y-2">
            <span className="text-xs font-mono text-neutral-400 block font-semibold">1. Solving for New Height</span>
            <div className="p-2.5 rounded bg-[#171717] text-white font-mono text-xs text-center">
              New Height = (Original Height × New Width) ÷ Original Width
            </div>
            <p className="text-[11px] text-[#888888]">
              Example: Scaling a 1920×1080 graphic down to 600px width: (1080 × 600) ÷ 1920 = <strong>337.5px</strong>.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08] space-y-2">
            <span className="text-xs font-mono text-neutral-400 block font-semibold">2. Solving for New Width</span>
            <div className="p-2.5 rounded bg-[#171717] text-white font-mono text-xs text-center">
              New Width = (Original Width × New Height) ÷ Original Height
            </div>
            <p className="text-[11px] text-[#888888]">
              Example: Scaling an Instagram 1080×1350 portrait to fit 400px height: (1080 × 400) ÷ 1350 = <strong>320px</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Industry Standard Reference Matrix */}
      <section className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-sans">
          <Monitor className="w-4 h-4 text-neutral-300" />
          <span>Standard Display & Media Formats</span>
        </h3>
        <p>
          The table below highlights the most prevalent aspect ratios across modern digital platforms, video production workflows, and photography:
        </p>
        <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#000000]">
          <table className="w-full text-left border-collapse text-xs min-w-[500px]">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02] font-mono text-neutral-300">
                <th className="p-3">Ratio</th>
                <th className="p-3">Common Resolutions</th>
                <th className="p-3">Decimal</th>
                <th className="p-3">Primary Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05] text-[#a1a1a1]">
              <tr className="hover:bg-white/[0.02]">
                <td className="p-3 font-mono text-white font-bold">16:9</td>
                <td className="p-3">1920×1080, 2560×1440, 3840×2160</td>
                <td className="p-3 font-mono">1.78:1</td>
                <td className="p-3">YouTube, HDTV, PC Monitors, Gaming Consoles</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-3 font-mono text-white font-bold">4:5</td>
                <td className="p-3">1080×1350, 1440×1800, 2160×2700</td>
                <td className="p-3 font-mono">0.80:1</td>
                <td className="p-3">Instagram Vertical Feed, 8×10 Portrait Prints</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-3 font-mono text-white font-bold">9:16</td>
                <td className="p-3">1080×1920, 1440×2560, 2160×3840</td>
                <td className="p-3 font-mono">0.56:1</td>
                <td className="p-3">TikTok, Instagram Reels, YouTube Shorts</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-3 font-mono text-white font-bold">1:1</td>
                <td className="p-3">1080×1080, 1200×1200, 2048×2048</td>
                <td className="p-3 font-mono">1.00:1</td>
                <td className="p-3">Square Feed Posts, Profile Avatars, Album Art</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-3 font-mono text-white font-bold">4:3</td>
                <td className="p-3">1024×768, 1600×1200, 2048×1536</td>
                <td className="p-3 font-mono">1.33:1</td>
                <td className="p-3">Apple iPad Screens, Micro 4/3 Photography</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-3 font-mono text-white font-bold">21:9</td>
                <td className="p-3">2560×1080, 3440×1440, 5120×2160</td>
                <td className="p-3 font-mono">2.33:1</td>
                <td className="p-3">Ultrawide Productivity & Anamorphic Cinema</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Print at 300 DPI */}
      <section className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-sans">
          <Image className="w-4 h-4 text-neutral-300" />
          <span>Pixels to Physical Inches at 300 DPI</span>
        </h3>
        <p>
          While screens display raster images in discrete pixel units, physical printing requires physical dimensions (inches or centimeters) paired with an ink droplet density standard. The commercial industry benchmark for high-fidelity photo and fine-art printing is <strong>300 DPI (Dots Per Inch)</strong>.
        </p>
        <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08] font-mono text-xs space-y-1">
          <span className="text-white font-bold font-sans block mb-1">Print Conversion Formula:</span>
          <div className="text-neutral-300">Required Pixels = Physical Inches × 300 DPI</div>
          <div className="text-neutral-300">Physical Inches = Pixel Count ÷ 300 DPI</div>
          <p className="text-[11px] text-[#888888] pt-1 font-sans">
            For example, printing a high-resolution 8×10 inch portrait photograph requires a source file of at least <strong>2400 × 3000 pixels</strong> (7.2 Megapixels).
          </p>
        </div>
      </section>

      {/* Section 5: Modern Responsive CSS */}
      <section className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-sans">
          <Code className="w-4 h-4 text-neutral-300" />
          <span>Responsive CSS & Layout Shift Prevention</span>
        </h3>
        <p>
          In modern web design, reserving layout geometry with the native CSS <code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">aspect-ratio</code> property ensures that the browser reserves exact container dimensions before remote media finishes loading. This eliminates Cumulative Layout Shift (CLS) and guarantees a seamless Core Web Vitals score:
        </p>
        <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08] font-mono text-xs text-blue-300 overflow-x-auto">
          <code>{`/* Native CSS Aspect Ratio Container */\n.video-card {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n}\n\n.responsive-portrait-image {\n  width: 100%;\n  aspect-ratio: 4 / 5;\n  object-fit: cover;\n}`}</code>
        </div>
      </section>

      {/* Navigation Quick Links */}
      <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-neutral-400 font-sans">Explore dedicated format calculators:</span>
        <div className="flex flex-wrap gap-2">
          <Link href="/16-9-aspect-ratio-calculator" prefetch={false} className="text-blue-400 hover:underline">16:9 Calculator</Link>
          <span className="text-neutral-600">•</span>
          <Link href="/4-5-aspect-ratio-calculator" prefetch={false} className="text-blue-400 hover:underline">4:5 Calculator</Link>
          <span className="text-neutral-600">•</span>
          <Link href="/9-16-aspect-ratio-calculator" prefetch={false} className="text-blue-400 hover:underline">9:16 Calculator</Link>
          <span className="text-neutral-600">•</span>
          <Link href="/compare" prefetch={false} className="text-blue-400 hover:underline">Comparison Hub</Link>
        </div>
      </div>
    </article>
  );
}
