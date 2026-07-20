import React, { useState } from 'react';
import { Code2, Copy, Check } from 'lucide-react';
import { generateCodeSnippets } from '../utils/aspectRatioMath';

export default function CodeExporter({ w1, h1, w2, h2, focalX = 50, focalY = 50, fitMode = 'cover' }) {
  const [activeTab, setActiveTab] = useState('css');
  const [copied, setCopied] = useState(false);

  const snippets = generateCodeSnippets(w1, h1, w2, h2, focalX, focalY, fitMode);

  const tabs = [
    { id: 'css', label: 'Modern CSS', code: snippets.cssExact },
    { id: 'tailwind', label: 'Tailwind CSS', code: snippets.tailwindPreset },
    { id: 'svg', label: 'SVG viewBox', code: snippets.svgViewBox },
    { id: 'legacy', label: 'Legacy CSS Padding', code: snippets.legacyPadding }
  ];

  const currentCode = tabs.find(t => t.id === activeTab)?.code || '';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="studio-card p-4 sm:p-6 mb-6">
      {/* Title & Copy Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <h2 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider font-sans">Developer Code Generator</h2>
        </div>

        {/* Vercel Pill Copy Button */}
        <button
          onClick={handleCopyCode}
          aria-label="Copy developer code snippet"
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
            copied
              ? 'bg-emerald-500 text-white shadow-md'
              : 'bg-white text-black hover:bg-neutral-200 shadow-md'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>

      {/* Vercel DESIGN.md tab-ghost Pill Row */}
      <div className="w-full overflow-x-auto no-scrollbar mb-3 pb-0.5">
        <div className="flex items-center gap-1 p-1 bg-[#090a0f] rounded-full border border-white/[0.08] min-w-max">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-label={`Select ${tab.label} code tab`}
              className={`px-3 py-1 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-[#888888] hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Vercel DESIGN.md code-editor-mockup component */}
      <div className="relative rounded-xl bg-[#000000] border border-white/[0.1] p-3.5 sm:p-4 font-mono text-xs text-cyan-300 overflow-x-auto shadow-inner">
        <pre className="whitespace-pre-wrap leading-relaxed min-w-0 font-mono text-[#50e3c2]">{currentCode}</pre>
      </div>
    </div>
  );
}
