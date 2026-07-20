import React, { useState } from 'react';
import { Table, Copy, Check, FileSpreadsheet } from 'lucide-react';
import { generateScaleTable } from '../utils/aspectRatioMath';

export default function ScaleTable({ w1, h1 }) {
  const [copiedFormat, setCopiedFormat] = useState(null);
  const rows = generateScaleTable(w1, h1);

  const handleCopy = (format) => {
    let textToCopy = '';
    if (format === 'markdown') {
      textToCopy = `| Breakpoint Label | Width (px) | Height (px) |\n| :--- | :--- | :--- |\n` +
        rows.map(r => `| ${r.label} | ${r.width} | ${r.height} |`).join('\n');
    } else if (format === 'json') {
      textToCopy = JSON.stringify(rows.map(r => ({ label: r.label, width: r.width, height: r.height })), null, 2);
    } else if (format === 'csv') {
      textToCopy = `Label,Width,Height\n` + rows.map(r => `"${r.label}",${r.width},${r.height}`).join('\n');
    }

    navigator.clipboard.writeText(textToCopy);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="studio-card p-4 sm:p-6 mb-6">
      {/* Title & Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <h2 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider font-sans">Batch Resolution Scale Table</h2>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleCopy('markdown')}
            aria-label="Copy scale table as Markdown"
            className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 text-[11px] font-mono font-medium flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            {copiedFormat === 'markdown' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedFormat === 'markdown' ? 'Copied' : 'Markdown'}</span>
          </button>

          <button
            onClick={() => handleCopy('csv')}
            aria-label="Copy scale table as CSV"
            className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 text-[11px] font-mono font-medium flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            {copiedFormat === 'csv' ? <Check className="w-3 h-3 text-emerald-400" /> : <FileSpreadsheet className="w-3 h-3 text-amber-400" />}
            <span>{copiedFormat === 'csv' ? 'Copied' : 'CSV'}</span>
          </button>
        </div>
      </div>

      {/* Vercel DESIGN.md ex-data-table-cell specification */}
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#090a0f]">
        <table className="w-full text-left border-collapse text-xs min-w-[420px]">
          <thead>
            <tr className="border-b border-white/[0.08] bg-[#0d0e14] text-[#888888] font-mono text-[11px] uppercase tracking-wider">
              <th className="py-2.5 px-3.5 font-medium">Standard Breakpoint</th>
              <th className="py-2.5 px-3.5 font-medium">Width</th>
              <th className="py-2.5 px-3.5 font-medium">Height</th>
              <th className="py-2.5 px-3.5 font-medium">Dimension</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-[#d1d5db] font-mono text-xs">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/[0.03] transition-colors">
                <td className="py-2.5 px-3.5 font-sans font-medium text-white whitespace-nowrap">{row.label}</td>
                <td className="py-2.5 px-3.5 font-semibold text-amber-300 whitespace-nowrap">{row.width} px</td>
                <td className="py-2.5 px-3.5 font-semibold text-indigo-300 whitespace-nowrap">{row.height} px</td>
                <td className="py-2.5 px-3.5 text-[#888888] whitespace-nowrap">{row.dimensionText}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
