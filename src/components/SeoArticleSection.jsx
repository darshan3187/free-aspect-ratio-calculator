import React from 'react';
import { BookOpen, Calculator, Monitor, Image, ShieldCheck, Layers } from 'lucide-react';

export default function SeoArticleSection() {
  return (
    <article className="studio-card p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 border border-white/[0.08] text-neutral-300 font-sans text-sm leading-relaxed space-y-6">
      {/* Article Header */}
      <div className="border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-2 text-[#888888] font-mono text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4 text-white" />
          <span>Technical Guide & Documentation</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-display-lg font-sans">
          Aspect Ratio Calculator: Comprehensive Guide to Image & Screen Resizing.
        </h2>
        <p className="text-xs sm:text-sm text-[#888888] mt-1 font-sans">
          Learn how to calculate aspect ratio in pixels and inches for responsive web design, video production, and social media platforms.
        </p>
      </div>

      {/* Section 1: Introduction & How to Calculate Aspect Ratio */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-sans">
          <Calculator className="w-4 h-4 text-neutral-300" />
          <span>What is an Aspect Ratio & How to Calculate Aspect Ratio?</span>
        </h3>
        <p>
          An <strong>aspect ratio</strong> defines the proportional ratio between the width and height of an image, video frame, or display screen. Expressed as two numbers separated by a colon (<code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">W:H</code>), such as <code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">16:9</code> or <code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">4:3</code>, it determines shape regardless of absolute physical size.
        </p>
        <p>
          When learning <strong>how to calculate aspect ratio</strong>, the mathematical formula multiplies the target dimension by the proportional ratio of the source. Using our <strong>aspect ratio calculator online</strong>, you can <strong>calculate aspect ratio</strong> instantly without manual fraction division or rounding errors.
        </p>
      </div>

      {/* Section 2: 16:9 and 4:3 Aspect Ratio Calculators */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-sans">
          <Monitor className="w-4 h-4 text-neutral-300" />
          <span>16:9 Aspect Ratio Calculator & 16x9 Aspect Ratio Calculator Specs</span>
        </h3>
        <p>
          The <strong className="text-white">16:9 aspect ratio calculator</strong> (often typed as <strong className="text-white">16x9 aspect ratio calculator</strong>) is the standard international widescreen aspect ratio for high-definition video, YouTube thumbnails, desktop monitors, and digital displays. Common <strong className="text-white">16:9 aspect ratio</strong> resolutions include <code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">1920×1080</code> (Full HD), <code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">2560×1440</code> (QHD), and <code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">3840×2160</code> (4K Ultra HD).
        </p>
        <p>
          Conversely, the <strong className="text-white">4:3 aspect ratio calculator</strong> mode is essential for legacy television content, retro photography, micro four-thirds camera sensors, and iPad display layouts. Using our <strong>4:3 aspect ratio calculator</strong> preset converts widescreen dimensions into traditional square-adjacent proportions like <code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">1024×768</code> or <code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">2048×1536</code>.
        </p>
      </div>

      {/* Section 3: Pixels vs. Inches Aspect Ratio Calculation */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-sans">
          <Image className="w-4 h-4 text-neutral-300" />
          <span>Aspect Ratio Calculator Pixels vs. Aspect Ratio Calculator Inches</span>
        </h3>
        <p>
          Digital graphics creators require an <strong>image aspect ratio calculator</strong> that supports both pixel counts for web applications and physical measurements for high-resolution print production:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[#a1a1a1] pl-2 font-sans">
          <li>
            <strong className="text-white">Aspect Ratio Calculator Pixels:</strong> Ensures pixel perfection for CSS layout containers, responsive images, React components, and HTML canvas previews.
          </li>
          <li>
            <strong className="text-white">Aspect Ratio Calculator Inches:</strong> Converts pixel dimensions to physical print sizes (<code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">Inches</code> and <code className="font-mono text-white bg-[#171717] px-1.5 py-0.5 rounded">Centimeters</code>) based on standard 300 DPI high-definition print quality.
          </li>
        </ul>
      </div>

      {/* Section 4: Screen Aspect Ratio Calculator & Privacy Architecture */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-sans">
          <Layers className="w-4 h-4 text-neutral-300" />
          <span>Screen Aspect Ratio Calculator for Monitors & 100% Client-Side Privacy</span>
        </h3>
        <p>
          Our <strong>screen aspect ratio calculator</strong> helps game developers, UI designers, and hardware enthusiasts calculate exact dimensions for ultrawide gaming monitors (21:9 and 32:9), mobile screens (9:16 vertical video), and custom display resolutions.
        </p>
        <p>
          Unlike legacy calculators that upload your images to remote servers, our <strong>aspect ratio calculator</strong> executes 100% client-side inside your browser process memory. Your uploaded images and calculations remain private on your device at all times.
        </p>
      </div>

      {/* Formula Box */}
      <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08] font-mono text-xs space-y-2">
        <div className="flex items-center gap-2 text-white font-bold font-sans">
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>Mathematical Formula for Scaled Dimensions</span>
        </div>
        <p className="text-[#a1a1a1]">
          To calculate target height (<code className="text-white">H2</code>) given target width (<code className="text-white">W2</code>) and original dimensions (<code className="text-white">W1 × H1</code>):
        </p>
        <div className="p-2.5 rounded bg-[#171717] text-white font-bold text-center text-xs">
          H2 = (H1 × W2) ÷ W1
        </div>
      </div>
    </article>
  );
}
