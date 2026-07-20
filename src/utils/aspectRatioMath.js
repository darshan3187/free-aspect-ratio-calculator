/**
 * Aspect Ratio Math Utility Engine
 * With Input Sanitization & Bounds Protection
 */

const MAX_SAFE_DIMENSION = 100000; // 100k px maximum limit

// Helper to sanitize numeric input strings safely
export function sanitizeNumericInput(val, defaultVal = 0) {
  if (val === null || val === undefined) return defaultVal;
  const cleaned = String(val).replace(/[^0-9.]/g, '');
  const num = parseFloat(cleaned);
  if (isNaN(num) || !isFinite(num) || num < 0) return defaultVal;
  return Math.min(num, MAX_SAFE_DIMENSION);
}

// Calculate Greatest Common Divisor (Euclidean algorithm)
export function gcd(a, b) {
  a = Math.abs(Math.round(sanitizeNumericInput(a)));
  b = Math.abs(Math.round(sanitizeNumericInput(b)));
  if (!b) return a;
  return gcd(b, a % b);
}

// Simplify fraction (e.g. 1920 & 1080 -> { w: 16, h: 9, text: "16:9" })
export function simplifyRatio(w, h) {
  const numW = sanitizeNumericInput(w, 0);
  const numH = sanitizeNumericInput(h, 0);

  if (numW <= 0 || numH <= 0) {
    return { ratioW: 0, ratioH: 0, text: '0:0', decimal: 0, orientation: 'Unknown' };
  }

  // Handle common decimal ratios directly (e.g., 2.39:1, 1.414:1)
  const decimalVal = numW / numH;
  
  // Try integer GCD simplification first
  const divisor = gcd(numW, numH);
  let simpW = Math.round(numW / (divisor || 1));
  let simpH = Math.round(numH / (divisor || 1));

  // If numbers are large prime-like dimensions, approximate to standard close ratios
  if (simpW > 100 || simpH > 100) {
    const commonRatios = [
      { w: 16, h: 9, val: 16 / 9 },
      { w: 9, h: 16, val: 9 / 16 },
      { w: 4, h: 5, val: 4 / 5 },
      { w: 5, h: 4, val: 5 / 4 },
      { w: 1, h: 1, val: 1 },
      { w: 4, h: 3, val: 4 / 3 },
      { w: 3, h: 4, val: 3 / 4 },
      { w: 3, h: 2, val: 3 / 2 },
      { w: 2, h: 3, val: 2 / 3 },
      { w: 21, h: 9, val: 21 / 9 },
      { w: 3, h: 1, val: 3 },
      { w: 4, h: 1, val: 4 },
      { w: 1, h: 1.414, val: 1 / 1.414 }
    ];

    const match = commonRatios.find(r => Math.abs(r.val - decimalVal) < 0.015);
    if (match) {
      simpW = match.w;
      simpH = match.h;
    }
  }

  let orientation = 'Landscape';
  if (decimalVal < 0.98) orientation = 'Portrait';
  else if (Math.abs(decimalVal - 1) <= 0.02) orientation = 'Square';

  return {
    ratioW: simpW,
    ratioH: simpH,
    text: `${simpW}:${simpH}`,
    decimal: Number(decimalVal.toFixed(3)),
    orientation
  };
}

// Calculate target dimension from source & new input
export function calculateTargetDimension({ w1, h1, w2, h2, lastChanged, roundValues = true }) {
  const srcW = sanitizeNumericInput(w1, 0);
  const srcH = sanitizeNumericInput(h1, 0);

  if (srcW <= 0 || srcH <= 0) {
    return { w2: w2 || '', h2: h2 || '', roundingOccurred: false };
  }

  const ratio = srcW / srcH;
  let newW2 = sanitizeNumericInput(w2, NaN);
  let newH2 = sanitizeNumericInput(h2, NaN);
  let roundingOccurred = false;

  if (lastChanged === 'w2') {
    if (!isNaN(newW2) && newW2 > 0) {
      const exactH2 = newW2 / ratio;
      if (roundValues) {
        newH2 = Math.round(exactH2);
        if (Math.abs(exactH2 - newH2) > 0.001) roundingOccurred = true;
      } else {
        newH2 = Number(exactH2.toFixed(2));
      }
    }
  } else if (lastChanged === 'h2') {
    if (!isNaN(newH2) && newH2 > 0) {
      const exactW2 = newH2 * ratio;
      if (roundValues) {
        newW2 = Math.round(exactW2);
        if (Math.abs(exactW2 - newW2) > 0.001) roundingOccurred = true;
      } else {
        newW2 = Number(exactW2.toFixed(2));
      }
    }
  }

  return {
    w2: isNaN(newW2) ? '' : newW2,
    h2: isNaN(newH2) ? '' : newH2,
    roundingOccurred
  };
}


// Generate batch resolution matrix for common breakpoints
export function generateScaleTable(w1, h1) {
  const numW = parseFloat(w1) || 1920;
  const numH = parseFloat(h1) || 1080;
  const ratio = numW / numH;

  const standardWidths = [
    { label: '8K Ultra HD', width: 7680 },
    { label: '4K Ultra HD', width: 3840 },
    { label: 'QHD 1440p', width: 2560 },
    { label: 'Full HD 1080p', width: 1920 },
    { label: 'HD 720p', width: 1280 },
    { label: 'SD 480p', width: 854 },
    { label: 'Tablet / Medium Card', width: 600 },
    { label: 'Mobile Wide Card', width: 400 },
    { label: 'Mobile Compact', width: 320 }
  ];

  return standardWidths.map(item => {
    const exactH = item.width / ratio;
    const roundedH = Math.round(exactH);
    return {
      label: item.label,
      width: item.width,
      height: roundedH,
      exactHeight: Number(exactH.toFixed(2)),
      dimensionText: `${item.width} × ${roundedH} px`
    };
  });
}

// Generate developer code snippets with object-position support
export function generateCodeSnippets(w1, h1, w2, h2, focalX = 50, focalY = 50, fitMode = 'cover') {
  const numW = parseFloat(w1) || 1920;
  const numH = parseFloat(h1) || 1080;
  const ratioObj = simplifyRatio(numW, numH);
  const targetW = parseFloat(w2) || numW;
  const targetH = parseFloat(h2) || numH;
  const paddingPercent = ((numH / numW) * 100).toFixed(2);

  return {
    cssProperty: `aspect-ratio: ${ratioObj.text.replace(':', ' / ')};\nobject-fit: ${fitMode};\nobject-position: ${focalX}% ${focalY}%;`,
    cssExact: `width: ${targetW}px;\nheight: ${targetH}px;\naspect-ratio: ${ratioObj.text.replace(':', ' / ')};\nobject-fit: ${fitMode};\nobject-position: ${focalX}% ${focalY}%;`,
    tailwindClass: `aspect-[${ratioObj.text.replace(':', '/')}] object-${fitMode}`,
    tailwindPreset: ratioObj.text === '16:9' ? 'aspect-video' : ratioObj.text === '1:1' ? 'aspect-square' : `aspect-[${ratioObj.text.replace(':', '/')}]`,
    legacyPadding: `.aspect-box {\n  position: relative;\n  width: 100%;\n  padding-bottom: ${paddingPercent}%; /* ${ratioObj.text} ratio */\n}\n.aspect-box img {\n  position: absolute;\n  top: 0; left: 0;\n  width: 100%; height: 100%;\n  object-fit: ${fitMode};\n  object-position: ${focalX}% ${focalY}%;\n}`,
    svgViewBox: `<svg viewBox="0 0 ${numW} ${numH}" width="${targetW}" height="${targetH}">\n  <!-- Your SVG Content -->\n</svg>`
  };
}

// Calculate physical print size in Inches and CM at given DPI (e.g. 300 DPI for print, 72 DPI for web)
export function calculatePrintDimensions(wPx, hPx, dpi = 300) {
  const w = sanitizeNumericInput(wPx, 1920);
  const h = sanitizeNumericInput(hPx, 1080);
  const dpiVal = sanitizeNumericInput(dpi, 300) || 300;

  const inchesW = Number((w / dpiVal).toFixed(2));
  const inchesH = Number((h / dpiVal).toFixed(2));
  const cmW = Number((inchesW * 2.54).toFixed(2));
  const cmH = Number((inchesH * 2.54).toFixed(2));

  return {
    dpi: dpiVal,
    inches: `${inchesW}″ × ${inchesH}″`,
    cm: `${cmW} cm × ${cmH} cm`,
    inchesW, inchesH, cmW, cmH
  };
}

// AI Image Generator Prompt Flag Builder (Midjourney, Stable Diffusion, DALL-E)
export function generateAiPromptFlags(w1, h1) {
  const ratioObj = simplifyRatio(w1, h1);
  return {
    midjourneyFlag: `--ar ${ratioObj.text}`,
    stableDiffusion: `Width: ${w1}, Height: ${h1} (Aspect ${ratioObj.text})`,
    dalle3Preset: ratioObj.orientation === 'Portrait' ? '1024x1792 (Portrait)' : ratioObj.orientation === 'Square' ? '1024x1024 (Square)' : '1792x1024 (Landscape)'
  };
}


