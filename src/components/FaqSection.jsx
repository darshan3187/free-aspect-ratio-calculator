import React from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

export default function FaqSection() {
  const faqs = [
    {
      q: "What is an aspect ratio?",
      a: "An aspect ratio is the proportional relationship between an image or display screen's width and height. It is expressed as two numbers separated by a colon (such as 16:9 or 4:5). For example, a 16:9 aspect ratio means that for every 16 units of width, there are 9 units of height."
    },
    {
      q: "How do I calculate scaled height from width?",
      a: "To calculate height when scaling an image while preserving aspect ratio: Multiply original height by target width, then divide by original width. Formula: New Height = (Original Height × Target Width) ÷ Original Width. For example: (1080 × 400) ÷ 1920 = 225px."
    },
    {
      q: "What are the most common aspect ratios for social media?",
      a: "The most popular social media aspect ratios are: 1:1 for Instagram Square Posts (1080×1080px), 4:5 for Instagram Portrait Posts (1080×1350px), 9:16 for Instagram Stories, TikToks, & YouTube Shorts (1080×1920px), and 16:9 for YouTube Thumbnails & Banners (1280×720px)."
    },
    {
      q: "Why do images look stretched or squished when resizing?",
      a: "Images warp when width or height is scaled independently without maintaining the constant proportional ratio. Locking the aspect ratio guarantees that when you change width, the height adjusts proportionately."
    }
  ];

  return (
    <div className="studio-card rounded-2xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 border border-white/[0.08] relative">
      <div className="flex items-center gap-3 mb-5 sm:mb-6">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#171717] border border-white/10 flex-shrink-0 flex items-center justify-center text-white shadow-md">
          <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-300" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-display-lg leading-tight font-sans">Aspect Ratio Guide & FAQ.</h3>
          <p className="text-[11px] sm:text-xs text-[#888888] font-sans">Everything you need to know about scaling graphics and video</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-[#000000] rounded-xl p-4 sm:p-5 border border-white/[0.08]">
            <h4 className="text-xs sm:text-sm font-semibold text-white mb-2 flex items-start gap-2 font-sans">
              <Sparkles className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
              <span className="leading-snug">{faq.q}</span>
            </h4>
            <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed font-sans font-normal">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
