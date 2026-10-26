/**
 * Aspect Ratio Math Utility Engine
 * With Input Sanitization & Bounds Protection
 */

const MAX_SAFE_DIMENSION = 100000; // 100k px maximum limit

// Helper to sanitize numeric input strings safely
export function sanitizeNumericInput(val, defaultVal = 0) {
  if (val === null || val === undefined || val === '') return defaultVal;
  // If negative, reject rather than flipping sign
  const rawStr = String(val).trim();
  if (rawStr.startsWith('-')) return defaultVal;
  const cleaned = rawStr.replace(/[^0-9.]/g, '');
  const num = parseFloat(cleaned);
  if (isNaN(num) || !isFinite(num) || num <= 0) return defaultVal;
  return Math.min(num, MAX_SAFE_DIMENSION);
}

// Calculate Greatest Common Divisor (Euclidean algorithm)
export function gcd(a, b) {
  a = Math.abs(Math.round(sanitizeNumericInput(a, 0)));
  b = Math.abs(Math.round(sanitizeNumericInput(b, 0)));
  if (!b) return a;
  return gcd(b, a % b);
}

// Simplify fraction (e.g. 1920 & 1080 -> { w: 16, h: 9, text: "16:9" })
// Preserves exact integer reduction, detects approximations explicitly without silent mutation
export function simplifyRatio(w, h, options = {}) {
  const { allowApproximation = false } = options;
  const numW = sanitizeNumericInput(w, 0);
  const numH = sanitizeNumericInput(h, 0);

  if (numW <= 0 || numH <= 0) {
    return {
      ratioW: 0,
      ratioH: 0,
      text: '0:0',
      decimal: 0,
      orientation: 'Unknown',
      isExact: true,
      approximatedFrom: null
    };
  }

  const decimalVal = numW / numH;
  
  // Exact integer GCD simplification
  const divisor = gcd(numW, numH);
  const exactSimpW = Math.round(numW / (divisor || 1));
  const exactSimpH = Math.round(numH / (divisor || 1));

  let finalW = exactSimpW;
  let finalH = exactSimpH;
  let isExact = true;
  let approximateMatch = null;

  // Check known standard ratios for closest match information
  const commonRatios = [
    { w: 16, h: 9, val: 16 / 9, text: '16:9' },
    { w: 9, h: 16, val: 9 / 16, text: '9:16' },
    { w: 4, h: 5, val: 4 / 5, text: '4:5' },
    { w: 5, h: 4, val: 5 / 4, text: '5:4' },
    { w: 1, h: 1, val: 1, text: '1:1' },
    { w: 4, h: 3, val: 4 / 3, text: '4:3' },
    { w: 3, h: 4, val: 3 / 4, text: '3:4' },
    { w: 3, h: 2, val: 3 / 2, text: '3:2' },
    { w: 2, h: 3, val: 2 / 3, text: '2:3' },
    { w: 16, h: 10, val: 16 / 10, text: '16:10' },
    { w: 21, h: 9, val: 21 / 9, text: '21:9' },
    { w: 32, h: 9, val: 32 / 9, text: '32:9' }
  ];

  const closeMatch = commonRatios.find(r => Math.abs(r.val - decimalVal) < 0.015);
  if (closeMatch && (exactSimpW !== closeMatch.w || exactSimpH !== closeMatch.h)) {
    approximateMatch = closeMatch;
    // Only snap if explicitly requested; otherwise preserve exact math
    if (allowApproximation) {
      finalW = closeMatch.w;
      finalH = closeMatch.h;
      isExact = false;
    }
  }

  let orientation = 'Landscape';
  if (decimalVal < 0.98) orientation = 'Portrait';
  else if (Math.abs(decimalVal - 1) <= 0.02) orientation = 'Square';

  return {
    ratioW: finalW,
    ratioH: finalH,
    text: `${finalW}:${finalH}`,
    decimal: Number(decimalVal.toFixed(3)),
    orientation,
    isExact,
    approximateMatch: approximateMatch ? approximateMatch.text : null
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

  // Calculate raw floating-point measurements to prevent compound rounding loss
  const rawInchesW = w / dpiVal;
  const rawInchesH = h / dpiVal;
  const rawCmW = rawInchesW * 2.54;
  const rawCmH = rawInchesH * 2.54;

  const inchesW = Number(rawInchesW.toFixed(2));
  const inchesH = Number(rawInchesH.toFixed(2));
  const cmW = Number(rawCmW.toFixed(2));
  const cmH = Number(rawCmH.toFixed(2));

  return {
    dpi: dpiVal,
    inches: `${inchesW}″ × ${inchesH}″`,
    cm: `${cmW} cm × ${cmH} cm`,
    inchesW, inchesH, cmW, cmH
  };
}

// Convert between Pixels, Inches, and Centimeters at a specified DPI/PPI
export function convertUnitDimensions({ width, height, fromUnit, toUnit, dpi = 300 }) {
  const numW = parseFloat(width);
  const numH = parseFloat(height);
  const dpiVal = sanitizeNumericInput(dpi, 300) || 300;

  if (isNaN(numW) || isNaN(numH) || numW <= 0 || numH <= 0 || fromUnit === toUnit) {
    return {
      width: isNaN(numW) ? '' : numW,
      height: isNaN(numH) ? '' : numH,
      unit: toUnit,
      dpi: dpiVal
    };
  }

  // Convert source dimensions to pixels first (canonical unit)
  let pxW = numW;
  let pxH = numH;

  if (fromUnit === 'in') {
    pxW = numW * dpiVal;
    pxH = numH * dpiVal;
  } else if (fromUnit === 'cm') {
    pxW = (numW / 2.54) * dpiVal;
    pxH = (numH / 2.54) * dpiVal;
  }

  // Convert canonical pixels to destination unit
  let targetW = pxW;
  let targetH = pxH;

  if (toUnit === 'in') {
    targetW = Number((pxW / dpiVal).toFixed(2));
    targetH = Number((pxH / dpiVal).toFixed(2));
  } else if (toUnit === 'cm') {
    targetW = Number(((pxW / dpiVal) * 2.54).toFixed(2));
    targetH = Number(((pxH / dpiVal) * 2.54).toFixed(2));
  } else if (toUnit === 'px') {
    targetW = Math.round(pxW);
    targetH = Math.round(pxH);
  }

  return {
    width: targetW,
    height: targetH,
    unit: toUnit,
    dpi: dpiVal
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


