export interface CommonResolution {
  name: string;
  width: number;
  height: number;
  category: 'Standard HD' | 'Full HD' | 'QHD / 2K' | '4K UHD' | '8K UHD' | 'Social' | 'Print' | 'Cinema';
}

export interface RatioUseCase {
  industry: string;
  title: string;
  description: string;
  recommended: boolean;
}

export interface RatioFAQ {
  question: string;
  answer: string;
}

export interface RatioWorkedExample {
  title: string;
  scenario: string;
  steps: string[];
  formula: string;
}

export interface RatioData {
  slug: string;
  name: string;
  ratioWidth: number;
  ratioHeight: number;
  decimalValue: number;
  tagline: string;
  overview: string;
  formulaDescription: string;
  gcdValue: number;
  workedExample: RatioWorkedExample;
  commonResolutions: CommonResolution[];
  useCases: RatioUseCase[];
  pros: string[];
  cons: string[];
  faqs: RatioFAQ[];
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const RATIOS_DATA: Record<string, RatioData> = {
  '16-9-aspect-ratio-calculator': {
    slug: '16-9-aspect-ratio-calculator',
    name: '16:9 Aspect Ratio',
    ratioWidth: 16,
    ratioHeight: 9,
    decimalValue: 1.7777777777777777,
    tagline: 'The universal widescreen standard for HDTV, YouTube, gaming, and modern monitors.',
    overview: 'The 16:9 aspect ratio (pronounced "sixteen-by-nine") is the universal widescreen display standard for high-definition television, computer monitors, YouTube video streaming, and digital gaming consoles. It balances expansive horizontal viewing field with comfortable vertical framing.',
    formulaDescription: 'To calculate 16:9 aspect ratio dimensions, multiply height by 1.7778 to find width, or multiply width by 0.5625 to find height. The Greatest Common Divisor (GCD) for 1920x1080 is 120 (1920/120 = 16, 1080/120 = 9).',
    gcdValue: 120,
    workedExample: {
      title: 'Step-by-Step 16:9 Calculation Example',
      scenario: 'Calculating the required height for a YouTube thumbnail or banner container with a custom width of 1280 pixels:',
      steps: [
        'Identify target aspect ratio: 16 units of width for every 9 units of height.',
        'Select the solving formula: Target Height = (Target Width × 9) ÷ 16, or Target Width × 0.5625.',
        'Substitute the target width: Height = (1280 × 9) ÷ 16.',
        'Multiply numerator: 1280 × 9 = 11,520.',
        'Divide by 16: 11,520 ÷ 16 = 720 pixels.',
        'Verification: 1280 ÷ 80 = 16, 720 ÷ 80 = 9 (GCD is 80), confirming exact 16:9 proportion.'
      ],
      formula: 'Height = (1280 × 9) ÷ 16 = 720px (Standard 720p HD)'
    },
    commonResolutions: [
      { name: '720p HD', width: 1280, height: 720, category: 'Standard HD' },
      { name: '1080p Full HD', width: 1920, height: 1080, category: 'Full HD' },
      { name: '1440p QHD (2K)', width: 2560, height: 1440, category: 'QHD / 2K' },
      { name: '4K UHD', width: 3840, height: 2160, category: '4K UHD' },
      { name: '8K UHD', width: 7680, height: 4320, category: '8K UHD' },
    ],
    useCases: [
      { industry: 'Video Streaming', title: 'YouTube & Vimeo Main Videos', description: 'Default resolution container for desktop and widescreen video players.', recommended: true },
      { industry: 'Gaming', title: 'PC & Console Gaming Monitors', description: 'Supported by virtually 100% of modern video games without letterboxing.', recommended: true },
      { industry: 'Broadcasting', title: 'HDTV & Cable Television', description: 'International telecommunications standard for high-definition broadcasts.', recommended: true },
      { industry: 'Social Media', title: 'Horizontal Facebook & LinkedIn Posts', description: 'Ideal widescreen format for desktop social feed video posts.', recommended: true }
    ],
    pros: [
      'Universal compatibility across 99% of modern monitors and TVs',
      'Native format for YouTube, Netflix, Twitch, and broadcast media',
      'Zero black letterbox bars when playing standard HD & 4K video content',
      'Perfect human visual field-of-view match for desktop immersion'
    ],
    cons: [
      'Less vertical screen space for document editing compared to 16:10 or 4:3',
      'Requires letterboxing for ultra-wide anamorphic cinema (2.39:1 movies)',
      'Requires pillarboxing when displaying vertical mobile videos (9:16)'
    ],
    faqs: [
      {
        question: 'What is the 16:9 aspect ratio in pixels?',
        answer: 'Common 16:9 resolutions in pixels include 1920x1080 (Full HD), 2560x1440 (QHD), and 3840x2160 (4K UHD).'
      },
      {
        question: 'How do I calculate a 16:9 aspect ratio from any pixel dimension?',
        answer: 'Divide the width by 16 and multiply by 9 to get the height. E.g. (1920 / 16) * 9 = 1080.'
      },
      {
        question: 'Why did 16:9 become the universal display standard?',
        answer: 'In the late 1980s, Dr. Kerns H. Powers designed 16:9 as a mathematical compromise (geometric mean) between 4:3 TV displays and 2.35:1 widescreen cinema.'
      }
    ],
    meta: {
      title: '16:9 Aspect Ratio Calculator — 1080p & 4K Dimensions',
      description: 'Free 16:9 aspect ratio calculator. Calculate width, height, and pixel dimensions for 1080p, 1440p, 4K UHD, YouTube videos, and widescreen computer monitors.',
      keywords: ['16:9 aspect ratio calculator', '16 9 ratio', '1920x1080 aspect ratio', '4k 16:9 resolution', 'youtube aspect ratio calculator']
    }
  },
  '4-3-aspect-ratio-calculator': {
    slug: '4-3-aspect-ratio-calculator',
    name: '4:3 Aspect Ratio',
    ratioWidth: 4,
    ratioHeight: 3,
    decimalValue: 1.3333333333333333,
    tagline: 'The classic standard for photography, iPad displays, retro TV broadcasts, and Micro 4/3 sensors.',
    overview: 'The 4:3 aspect ratio (also known as 1.33:1) was the dominant display standard for 20th-century CRT televisions, early cinema, and legacy desktop monitors. Today it remains heavily used in Micro Four Thirds digital photography, Apple iPad tablets, and presentation decks.',
    formulaDescription: 'To calculate 4:3 dimensions, multiply height by 1.3333 to solve width, or multiply width by 0.75 to solve height. E.g., for 1024x768, GCD is 256 (1024/256 = 4, 768/256 = 3).',
    gcdValue: 256,
    workedExample: {
      title: 'Step-by-Step 4:3 Calculation Example',
      scenario: 'Calculating the required height for an iPad tablet canvas with a width of 1024 pixels:',
      steps: [
        'Identify target ratio: 4 units of width to 3 units of height.',
        'Formula: Height = (Width × 3) ÷ 4, or Width × 0.75.',
        'Substitute width: Height = (1024 × 3) ÷ 4.',
        'Multiply numerator: 1024 × 3 = 3072.',
        'Divide by 4: 3072 ÷ 4 = 768 pixels.',
        'Result: A width of 1024px requires an exact height of 768px for a standard 4:3 XGA display.'
      ],
      formula: 'Height = (1024 × 3) ÷ 4 = 768px (Standard XGA)'
    },
    commonResolutions: [
      { name: 'VGA / Standard SD', width: 640, height: 480, category: 'Standard HD' },
      { name: 'XGA Display', width: 1024, height: 768, category: 'Standard HD' },
      { name: 'Full HD 4:3 (iPad)', width: 2048, height: 1536, category: 'Full HD' },
      { name: 'Micro 4/3 Native Photo', width: 4000, height: 3000, category: 'QHD / 2K' },
    ],
    useCases: [
      { industry: 'Photography', title: 'Micro Four Thirds Cameras', description: 'Native image sensor ratio for Olympus, Panasonic, and drone photography.', recommended: true },
      { industry: 'Tablets', title: 'Apple iPad Screens', description: 'Provides balanced vertical and horizontal canvas for tablet interaction.', recommended: true },
      { industry: 'Retro Gaming', title: 'CRT Gaming Consoles', description: 'Native display framing for NES, SNES, PS1, and arcade gaming emulation.', recommended: true },
      { industry: 'Presentations', title: 'Classic Slide Decks', description: 'Traditional slideshow ratio for legacy projectors and document viewing.', recommended: false }
    ],
    pros: [
      'Provides superior vertical height for reading documents, ebooks, and coding',
      'Native format for Micro Four Thirds photography and digital art tablets',
      'Ideal compact ratio for portrait photography framing without empty dead space'
    ],
    cons: [
      'Creates thick pillarbox vertical black bars when viewed on 16:9 HDTVs',
      'Less immersive horizontal panoramic view for video games and widescreen films'
    ],
    faqs: [
      {
        question: 'What is a 4:3 aspect ratio in pixels?',
        answer: 'Common 4:3 resolutions include 640x480 (VGA), 1024x768 (XGA), 1600x1200 (UXGA), and 2048x1536 (iPad Retina).'
      },
      {
        question: 'Is 4:3 smaller than 16:9?',
        answer: '4:3 is squarer and shorter horizontally than 16:9, but provides more vertical height for the same screen diagonal.'
      }
    ],
    meta: {
      title: '4:3 Aspect Ratio Calculator — iPad & Photo Dimensions',
      description: 'Free 4:3 aspect ratio calculator. Calculate pixel dimensions, convert 4:3 resolutions for iPads, photography, Micro 4/3 sensors, and retro CRT console gaming.',
      keywords: ['4:3 aspect ratio calculator', '4 3 ratio', '1024x768 aspect ratio', 'ipad aspect ratio', 'micro four thirds ratio']
    }
  },
  '21-9-aspect-ratio-calculator': {
    slug: '21-9-aspect-ratio-calculator',
    name: '21:9 Aspect Ratio',
    ratioWidth: 21,
    ratioHeight: 9,
    decimalValue: 2.3333333333333335,
    tagline: 'The cinematic ultrawide standard for immersive PC gaming, multi-tasking, and film playback.',
    overview: 'The 21:9 aspect ratio (technically 64:27 or 2.37:1) is the ultrawide display standard designed for panoramic desktop productivity and cinematic film viewing. It eliminates top/bottom letterboxing on widescreen anamorphic movies.',
    formulaDescription: 'To calculate 21:9 aspect ratio dimensions, multiply height by 2.333 to find width, or multiply width by 0.4286 to solve height. E.g. 3440 / 1440 ≈ 2.388 (43:18 actual).',
    gcdValue: 160,
    workedExample: {
      title: 'Step-by-Step 21:9 Calculation Example',
      scenario: 'Calculating the ultrawide width for a 1440p vertical panel height (UW-QHD):',
      steps: [
        'Identify target ultrawide ratio: 43:18 (commercial 21:9 UW-QHD specification).',
        'Formula: Width = (Height × 43) ÷ 18, or approximately Height × 2.3888.',
        'Substitute target height: Width = (1440 × 43) ÷ 18.',
        'Multiply numerator: 1440 × 43 = 61,920.',
        'Divide by 18: 61,920 ÷ 18 = 3440 pixels.',
        'Result: A 1440p vertical display height scales to standard 3440×1440 UW-QHD ultrawide resolution.'
      ],
      formula: 'Width = (1440 × 43) ÷ 18 = 3440px (UW-QHD Ultrawide)'
    },
    commonResolutions: [
      { name: 'WFHD Ultrawide', width: 2560, height: 1080, category: 'Full HD' },
      { name: 'WQHD Ultrawide', width: 3440, height: 1440, category: 'QHD / 2K' },
      { name: '5K2K Ultrawide', width: 5120, height: 2160, category: '4K UHD' }
    ],
    useCases: [
      { industry: 'Productivity', title: 'Multi-Window Workstations', description: 'Replaces dual-monitor setups with a seamless single curved monitor canvas.', recommended: true },
      { industry: 'Cinema', title: 'Anamorphic Widescreen Movies', description: 'Matches 2.39:1 scope cinema release aspect ratio with zero black bars.', recommended: true },
      { industry: 'Gaming', title: 'Immersive PC Simulation Gaming', description: 'Expands horizontal peripheral Field of View (FOV) in racing, flight, and RPG games.', recommended: true }
    ],
    pros: [
      '33% wider horizontal viewing area compared to standard 16:9 screens',
      'Perfect native match for 2.39:1 cinematic movies',
      'Replaces messy dual 16:9 monitor bezels with one clean display'
    ],
    cons: [
      'Causes vertical black pillarbox bars when playing standard 16:9 video content',
      'Requires higher GPU graphics performance for games due to ~34% more pixels'
    ],
    faqs: [
      {
        question: 'What is 3440x1440 in aspect ratio terms?',
        answer: '3440x1440 is an Ultrawide 21:9 aspect ratio (technically 43:18 ratio).'
      },
      {
        question: 'Is 21:9 better than dual 16:9 monitors?',
        answer: 'Yes, 21:9 offers a continuous display surface without monitor frame bezels interrupting your desktop.'
      }
    ],
    meta: {
      title: '21:9 Aspect Ratio Calculator — Ultrawide Dimensions',
      description: 'Free 21:9 aspect ratio calculator. Calculate pixel dimensions for ultrawide monitors, 3440x1440 displays, 21:9 gaming FOV, and cinematic video editing setups.',
      keywords: ['21:9 aspect ratio calculator', '21 9 ratio', '3440x1440 aspect ratio', 'ultrawide monitor resolution', '21:9 vs 16:9 calculator']
    }
  },
  '1-1-aspect-ratio-calculator': {
    slug: '1-1-aspect-ratio-calculator',
    name: '1:1 Square Aspect Ratio',
    ratioWidth: 1,
    ratioHeight: 1,
    decimalValue: 1.0,
    tagline: 'The perfectly symmetrical square format for Instagram feeds, e-commerce product cards, and avatars.',
    overview: 'The 1:1 square aspect ratio means width and height are perfectly equal. Popularized by medium-format 6x6 film cameras and Instagram, 1:1 is the premier format for social feed photos, e-commerce product grids, and profile avatars.',
    formulaDescription: 'Calculating 1:1 aspect ratio is instant: Width = Height. Any resolution where X = Y (e.g. 1080x1080) maintains a 1:1 ratio.',
    gcdValue: 1080,
    workedExample: {
      title: 'Step-by-Step 1:1 Calculation Example',
      scenario: 'Setting up an Instagram square product carousel post:',
      steps: [
        'Identify target ratio: 1:1 (Width equals Height).',
        'Formula: Height = Width × 1, Width = Height × 1.',
        'Choose standard social resolution: 1080 pixels width.',
        'Calculate matching height: 1080 × 1 = 1080 pixels.',
        'Result: Exactly 1080×1080px (1.17 Megapixels), guaranteeing zero feed cropping.'
      ],
      formula: 'Height = Width = 1080px (Instagram Square Post)'
    },
    commonResolutions: [
      { name: 'Instagram Square Post', width: 1080, height: 1080, category: 'Social' },
      { name: 'HD Square Asset', width: 2048, height: 2048, category: 'Full HD' },
      { name: 'Print 8x8 Canvas', width: 2400, height: 2400, category: 'Print' },
      { name: 'Audiobook Cover Art', width: 3000, height: 3000, category: 'Social' }
    ],
    useCases: [
      { industry: 'Social Media', title: 'Instagram & Facebook Feed Posts', description: 'Occupies prime feed visual space consistently across mobile and desktop.', recommended: true },
      { industry: 'E-Commerce', title: 'Product Catalog Thumbnail Cards', description: 'Universal standard for Shopify, Amazon, and WooCommerce product photos.', recommended: true },
      { industry: 'Publishing', title: 'Podcast Artwork & Audiobooks', description: 'Official size specification for Apple Podcasts, Spotify, and Audible.', recommended: true }
    ],
    pros: [
      '100% symmetrical visual balance with zero side-bias',
      'Maximum visibility on both vertical mobile feeds and horizontal desktop screens',
      'Universal standard for profile avatars, product icons, and album art'
    ],
    cons: [
      'Crops horizontal landscape photos and vertical portrait shots severely',
      'Unsuitable for widescreen video playback'
    ],
    faqs: [
      {
        question: 'What pixel dimensions are best for a 1:1 square image?',
        answer: '1080x1080 pixels is the standard recommendation for Instagram and web feeds.'
      }
    ],
    meta: {
      title: '1:1 Aspect Ratio Calculator — Square Post Dimensions',
      description: 'Free 1:1 square aspect ratio calculator. Calculate pixel dimensions for Instagram square posts (1080x1080), e-commerce product thumbnails, and square avatars.',
      keywords: ['1:1 aspect ratio calculator', '1 1 ratio', '1080x1080 aspect ratio', 'square image size', 'instagram square calculator']
    }
  },
  '9-16-aspect-ratio-calculator': {
    slug: '9-16-aspect-ratio-calculator',
    name: '9:16 Vertical Aspect Ratio',
    ratioWidth: 9,
    ratioHeight: 16,
    decimalValue: 0.5625,
    tagline: 'The full-screen mobile vertical video format for TikTok, Instagram Reels, and YouTube Shorts.',
    overview: 'The 9:16 vertical aspect ratio is the exact inverse of widescreen 16:9. Designed specifically for smartphone screens held vertically, 9:16 dominates short-form video algorithms on TikTok, Reels, Shorts, and Stories.',
    formulaDescription: 'To calculate 9:16 dimensions, multiply width by 1.7778 to find height, or multiply height by 0.5625 to solve width. E.g. (1080 * 1.7778) = 1920.',
    gcdValue: 120,
    workedExample: {
      title: 'Step-by-Step 9:16 Calculation Example',
      scenario: 'Calculating vertical resolution for an Instagram Reel, TikTok video, or YouTube Short:',
      steps: [
        'Identify target aspect ratio: 9 units width by 16 units height.',
        'Formula: Height = (Width × 16) ÷ 9, or Width × 1.7778.',
        'Choose standard mobile width: 1080 pixels.',
        'Multiply numerator: 1080 × 16 = 17,280.',
        'Divide by 9: 17,280 ÷ 9 = 1920 pixels.',
        'Result: Exactly 1080×1920 pixels, matching 100% of modern smartphone vertical viewports.'
      ],
      formula: 'Height = (1080 × 16) ÷ 9 = 1920px (1080p Vertical Full HD)'
    },
    commonResolutions: [
      { name: '720p Vertical', width: 720, height: 1280, category: 'Social' },
      { name: '1080p Vertical HD (Reels/TikTok)', width: 1080, height: 1920, category: 'Social' },
      { name: '1440p Vertical QHD', width: 1440, height: 2560, category: 'Social' },
      { name: '4K Vertical UHD', width: 2160, height: 3840, category: 'Social' }
    ],
    useCases: [
      { industry: 'Mobile Video', title: 'TikTok, Reels & YouTube Shorts', description: 'Occupies 100% of mobile screen real estate for maximum user retention.', recommended: true },
      { industry: 'Advertising', title: 'Mobile Interstitial & Story Ads', description: 'Standard format for full-screen Snapchat, Meta, and TikTok video ads.', recommended: true }
    ],
    pros: [
      'Fills 100% of handheld mobile screen area without phone rotation',
      'Produces significantly higher user engagement on social video apps',
      'Matches natural one-handed smartphone orientation'
    ],
    cons: [
      'Unusable for television broadcasts or desktop computer monitors without heavy pillarboxing',
      'Requires strategic center framing to prevent text being hidden behind app UI buttons'
    ],
    faqs: [
      {
        question: 'What is 9:16 in pixels?',
        answer: 'The standard 9:16 resolution is 1080x1920 pixels (Full HD Vertical).'
      },
      {
        question: 'Is 9:16 the same as 16:9?',
        answer: '9:16 has the same proportional relationship as 16:9, but is oriented vertically (portrait) instead of horizontally (landscape).'
      }
    ],
    meta: {
      title: '9:16 Aspect Ratio Calculator — Reels & TikTok Video',
      description: 'Free 9:16 vertical aspect ratio calculator. Calculate 1080x1920 pixel dimensions for TikTok videos, Instagram Reels, YouTube Shorts, and full-screen mobile ads.',
      keywords: ['9:16 aspect ratio calculator', '9 16 ratio', '1080x1920 aspect ratio', 'tiktok video dimensions', 'reels aspect ratio']
    }
  },
  '3-2-aspect-ratio-calculator': {
    slug: '3-2-aspect-ratio-calculator',
    name: '3:2 Aspect Ratio',
    ratioWidth: 3,
    ratioHeight: 2,
    decimalValue: 1.5,
    tagline: 'The timeless standard for 35mm film photography, DSLR sensors, and 4x6 photo prints.',
    overview: 'The 3:2 aspect ratio is the historic gold standard of 35mm still photography established by Oskar Barnack for Leica in the 1910s. It remains the native sensor ratio for almost all DSLR and mirrorless digital cameras today.',
    formulaDescription: 'To calculate 3:2 dimensions, multiply height by 1.5 to find width, or multiply width by 0.6667 to find height. E.g. (6000 * 0.6667) = 4000 (24MP photo).',
    gcdValue: 2000,
    workedExample: {
      title: 'Step-by-Step 3:2 Calculation Example',
      scenario: 'Calculating the exact pixel dimensions for a 4x6 inch photographic print at 300 DPI:',
      steps: [
        'Determine physical dimensions: 6 inches wide by 4 inches high (3:2 ratio).',
        'Apply resolution formula: Pixels = Inches × DPI.',
        'Calculate width: 6 inches × 300 DPI = 1800 pixels.',
        'Calculate height: 4 inches × 300 DPI = 1200 pixels.',
        'Verify ratio: 1800 ÷ 600 = 3, 1200 ÷ 600 = 2 (GCD is 600).',
        'Result: Exactly 1800×1200 pixels (2.16 MP) provides razor-sharp 300 DPI print quality.'
      ],
      formula: 'Width = 6 × 300 = 1800px, Height = 4 × 300 = 1200px (4×6 Print at 300 DPI)'
    },
    commonResolutions: [
      { name: '4x6 Print @ 300 DPI', width: 1800, height: 1200, category: 'Print' },
      { name: '6x9 Print @ 300 DPI', width: 2700, height: 1800, category: 'Print' },
      { name: '24MP Full Frame Camera', width: 6000, height: 4000, category: 'QHD / 2K' },
      { name: 'Microsoft Surface Display', width: 3000, height: 2000, category: 'Full HD' }
    ],
    useCases: [
      { industry: 'Photography', title: 'DSLR & Mirrorless Digital Cameras', description: 'Native raw sensor capture ratio for Canon, Sony, Nikon, and Fujifilm cameras.', recommended: true },
      { industry: 'Print Media', title: 'Standard 4x6 Photo Prints', description: 'The most popular print lab size in the world with zero edge cropping.', recommended: true }
    ],
    pros: [
      'Native ratio for full-frame and APS-C camera sensors (zero sensor cropping)',
      'Prints standard 4x6 and 8x12 photos without losing edge details',
      'More vertical room than 16:9 for balanced portrait and landscape framing'
    ],
    cons: [
      'Requires cropping when printing to common 8x10 or 5x7 frame sizes',
      'Requires letterboxing when displayed on 16:9 TVs or computer screens'
    ],
    faqs: [
      {
        question: 'Why do cameras shoot in 3:2 aspect ratio?',
        answer: '3:2 originates from classic 35mm film (36mm x 24mm exposure area), which digital camera manufacturers adopted to maintain lens compatibility.'
      }
    ],
    meta: {
      title: '3:2 Aspect Ratio Calculator — 35mm & 4x6 Photo Sizes',
      description: 'Free 3:2 aspect ratio calculator. Calculate pixel dimensions for Full Frame camera photos, 4x6 photo prints, Microsoft Surface screens, and 35mm film framing.',
      keywords: ['3:2 aspect ratio calculator', '3 2 ratio', '4x6 aspect ratio', '35mm aspect ratio', 'dslr aspect ratio']
    }
  },
  '5-4-aspect-ratio-calculator': {
    slug: '5-4-aspect-ratio-calculator',
    name: '5:4 Aspect Ratio',
    ratioWidth: 5,
    ratioHeight: 4,
    decimalValue: 1.25,
    tagline: 'The classic large-format photography standard for 8x10 prints and SXGA computer monitors.',
    overview: 'The 5:4 aspect ratio (1.25:1) is the classic proportion of traditional 8x10 and 16x20 inch photographic wall prints and early SXGA 1280x1024 LCD desktop monitors. It provides a compact, nearly square composition.',
    formulaDescription: 'To calculate 5:4 dimensions, multiply height by 1.25 to find width, or multiply width by 0.8 to solve height. E.g. (1280 * 0.8) = 1024.',
    gcdValue: 256,
    workedExample: {
      title: 'Step-by-Step 5:4 Calculation Example',
      scenario: 'Calculating pixel dimensions for an 8x10 inch fine art wall print at 300 DPI:',
      steps: [
        'Determine dimensions: 10 inches width by 8 inches height (5:4 aspect ratio).',
        'Apply DPI formula: Pixels = Inches × 300.',
        'Calculate width: 10 inches × 300 DPI = 3000 pixels.',
        'Calculate height: 8 inches × 300 DPI = 2400 pixels.',
        'Verify ratio: 3000 ÷ 600 = 5, 2400 ÷ 600 = 4 (GCD is 600).',
        'Result: Exactly 3000×2400 pixels (7.2 Megapixels) yields an uncompressed 8×10 print.'
      ],
      formula: 'Width = 10 × 300 = 3000px, Height = 8 × 300 = 2400px (8×10 Print at 300 DPI)'
    },
    commonResolutions: [
      { name: 'SXGA LCD Monitor', width: 1280, height: 1024, category: 'Standard HD' },
      { name: '8x10 Print @ 300 DPI', width: 3000, height: 2400, category: 'Print' },
      { name: '16x20 Print @ 300 DPI', width: 6000, height: 4800, category: 'Print' }
    ],
    useCases: [
      { industry: 'Wall Art', title: '8x10 & 16x20 Framed Photo Prints', description: 'Standard gallery frame size sold by retailers worldwide.', recommended: true },
      { industry: 'Legacy IT', title: 'SXGA 19-inch LCD Monitors', description: 'Common business monitor standard in medical and factory terminals.', recommended: false }
    ],
    pros: [
      'Standard dimension for 8x10, 11x14, and 16x20 photo frames',
      'Provides generous vertical space for portrait orientation wall art',
      'Nearly square symmetry gives powerful visual weight to subjects'
    ],
    cons: [
      'Incompatible with modern widescreen 16:9 displays without heavy pillarboxing',
      'Requires cropping 3:2 camera sensor photos along the horizontal edges'
    ],
    faqs: [
      {
        question: 'Is 5:4 the same as 4:5?',
        answer: 'Yes, 5:4 is horizontal (landscape) and 4:5 is vertical (portrait). Both share the exact same 1.25 proportional ratio.'
      }
    ],
    meta: {
      title: '5:4 Aspect Ratio Calculator — 8x10 Print Dimensions',
      description: 'Free 5:4 aspect ratio calculator. Calculate pixel dimensions for 8x10 photo prints, 1280x1024 SXGA monitors, and large-format gallery photo framing standards.',
      keywords: ['5:4 aspect ratio calculator', '5 4 ratio', '8x10 aspect ratio', '1280x1024 aspect ratio', 'sxga resolution']
    }
  },
  '4-5-aspect-ratio-calculator': {
    slug: '4-5-aspect-ratio-calculator',
    name: '4:5 Aspect Ratio',
    ratioWidth: 4,
    ratioHeight: 5,
    decimalValue: 0.8,
    tagline: 'The ideal vertical portrait format for Instagram feed posts and 8x10 portrait photo prints.',
    overview: 'The 4:5 aspect ratio (0.8:1) is the maximum vertical dimension allowed for standard in-feed Instagram posts (1080x1350px). It occupies significantly more mobile screen real estate than a square 1:1 post.',
    formulaDescription: 'To calculate 4:5 dimensions, multiply width by 1.25 to solve height, or multiply height by 0.8 to solve width. E.g. (1080 * 1.25) = 1350.',
    gcdValue: 270,
    workedExample: {
      title: 'Step-by-Step 4:5 Calculation Example',
      scenario: 'Calculating the maximum vertical canvas height for an Instagram feed post at 1080px width:',
      steps: [
        'Identify target aspect ratio: 4 units width to 5 units height.',
        'Formula: Height = (Width × 5) ÷ 4, or Width × 1.25.',
        'Substitute maximum feed width: Height = (1080 × 5) ÷ 4.',
        'Multiply numerator: 1080 × 5 = 5400.',
        'Divide by 4: 5400 ÷ 4 = 1350 pixels.',
        'Result: Exactly 1080×1350 pixels, filling the maximum vertical height allowed in Instagram feeds.'
      ],
      formula: 'Height = (1080 × 5) ÷ 4 = 1350px (Instagram Portrait Maximum)'
    },
    commonResolutions: [
      { name: 'Instagram Vertical Post', width: 1080, height: 1350, category: 'Social' },
      { name: 'High-Res 4:5 Portrait', width: 2160, height: 2700, category: 'Full HD' },
      { name: '8x10 Portrait Print @ 300 DPI', width: 2400, height: 3000, category: 'Print' }
    ],
    useCases: [
      { industry: 'Social Media', title: 'Instagram Portrait Feed Posts', description: 'Dominates mobile feed screens, resulting in higher engagement and dwell time.', recommended: true },
      { industry: 'Portraiture', title: 'Studio Portrait Photography', description: 'Ideal vertical composition for headshots and fashion photography.', recommended: true }
    ],
    pros: [
      'Takes up 25% more vertical feed space on Instagram than 1:1 square posts',
      'Flattering vertical proportion for human portraiture and outfit modeling',
      'Native proportion for standard 8x10 portrait picture frames'
    ],
    cons: [
      'Slightly trimmed on desktop Instagram browser viewports',
      'Not supported as a video aspect ratio on widescreen displays'
    ],
    faqs: [
      {
        question: 'What is the 4:5 ratio for Instagram in pixels?',
        answer: 'The recommended pixel size for a 4:5 Instagram post is 1080x1350 pixels.'
      }
    ],
    meta: {
      title: '4:5 Aspect Ratio Calculator — Instagram Vertical Sizes',
      description: 'Free 4:5 aspect ratio calculator. Calculate pixel dimensions for Instagram vertical posts (1080x1350), 8x10 photo prints, and portrait feed photography.',
      keywords: ['4:5 aspect ratio calculator', '4 5 ratio', '1080x1350 aspect ratio', 'instagram portrait size', 'instagram 4:5 calculator']
    }
  },
  '16-10-aspect-ratio-calculator': {
    slug: '16-10-aspect-ratio-calculator',
    name: '16:10 Aspect Ratio',
    ratioWidth: 16,
    ratioHeight: 10,
    decimalValue: 1.6,
    tagline: 'The modern laptop productivity standard used by Apple MacBooks and Dell XPS screens.',
    overview: 'The 16:10 aspect ratio (also expressed as 8:5) provides ~11% more vertical screen canvas than standard 16:9 widescreen displays. It has become the gold standard for premium laptops like Apple MacBook Pro, Dell XPS, and Lenovo ThinkPad.',
    formulaDescription: 'To calculate 16:10 aspect ratio dimensions, multiply height by 1.6 to find width, or multiply width by 0.625 to solve height. E.g. (1920 * 0.625) = 1200.',
    gcdValue: 120,
    workedExample: {
      title: 'Step-by-Step 16:10 Calculation Example',
      scenario: 'Calculating the vertical resolution for a WUXGA professional laptop panel with a 1920px width:',
      steps: [
        'Identify target ratio: 16:10 (simplified to 8:5, multiplier 1.6).',
        'Formula: Height = (Width × 10) ÷ 16, or Width × 0.625.',
        'Substitute width: Height = (1920 × 10) ÷ 16.',
        'Multiply numerator: 1920 × 10 = 19,200.',
        'Divide by 16: 19,200 ÷ 16 = 1200 pixels.',
        'Comparison: 1920×1200 provides 120 extra vertical pixels over standard 1080p, perfect for toolbars and code.'
      ],
      formula: 'Height = (1920 × 10) ÷ 16 = 1200px (WUXGA Laptop Standard)'
    },
    commonResolutions: [
      { name: 'WXGA Display', width: 1280, height: 800, category: 'Standard HD' },
      { name: 'WUXGA Full HD+', width: 1920, height: 1200, category: 'Full HD' },
      { name: 'WQXGA (2.5K)', width: 2560, height: 1600, category: 'QHD / 2K' },
      { name: 'MacBook Pro 16" Retina', width: 3456, height: 2234, category: '4K UHD' }
    ],
    useCases: [
      { industry: 'Laptops', title: 'MacBook & Professional Ultrabooks', description: 'Superior vertical canvas for coding, spreadsheets, and web design.', recommended: true },
      { industry: 'Productivity', title: 'Business Desktop Monitors', description: 'Allows viewing two full letter pages side-by-side with less vertical scrolling.', recommended: true }
    ],
    pros: [
      '11% more vertical workspace than 16:9 for coding and document editing',
      'Native aspect ratio for Apple MacBook Air and MacBook Pro displays',
      'Comfortable proportions for creative timelines in video and audio editors'
    ],
    cons: [
      'Produces thin black letterbox bars on top and bottom when playing standard 16:9 video',
      'Less widely available in budget desktop monitors compared to mass-market 16:9'
    ],
    faqs: [
      {
        question: 'What is 1920x1200 in aspect ratio terms?',
        answer: '1920x1200 is an exact 16:10 aspect ratio (also known as WUXGA resolution).'
      }
    ],
    meta: {
      title: '16:10 Aspect Ratio Calculator — MacBook Display Sizes',
      description: 'Free 16:10 aspect ratio calculator. Calculate pixel dimensions for MacBook Retina displays, WUXGA monitors (1920x1200), and Dell XPS 16:10 laptop screens.',
      keywords: ['16:10 aspect ratio calculator', '16 10 ratio', '1920x1200 aspect ratio', 'macbook aspect ratio', 'wuxga resolution']
    }
  },
  '2-39-1-aspect-ratio-calculator': {
    slug: '2-39-1-aspect-ratio-calculator',
    name: '2.39:1 Cinema Scope Aspect Ratio',
    ratioWidth: 239,
    ratioHeight: 100,
    decimalValue: 2.39,
    tagline: 'The cinematic widescreen standard for theatrical movies and anamorphic filmmaking.',
    overview: 'The 2.39:1 aspect ratio (often marketed as 2.40:1 or CinemaScope) is the modern theatrical release standard for widescreen motion pictures. It creates the iconic panoramic movie theater aesthetic.',
    formulaDescription: 'To calculate 2.39:1 cinema dimensions, divide width by 2.39 to find height, or multiply height by 2.39 to solve width. E.g. (1920 / 2.39) ≈ 804 pixels.',
    gcdValue: 1,
    workedExample: {
      title: 'Step-by-Step 2.39:1 Calculation Example',
      scenario: 'Calculating the active movie image height and letterbox black bars for a 1080p container (1920×1080):',
      steps: [
        'Identify target scope ratio: 2.39:1.',
        'Formula: Active Height = Width ÷ 2.39.',
        'Substitute 1080p container width: Active Height = 1920 ÷ 2.39.',
        'Calculate active video height: 1920 ÷ 2.39 ≈ 804 pixels.',
        'Calculate black letterbox matte bars: (1080 - 804) ÷ 2 = 138 pixels top and bottom.',
        'Result: Active movie area is 1920×804px centered within the 1920×1080px video frame.'
      ],
      formula: 'Active Height = 1920 ÷ 2.39 = 804px (138px Letterbox Bars)'
    },
    commonResolutions: [
      { name: '1080p Scope Crop', width: 1920, height: 804, category: 'Full HD' },
      { name: '4K UHD Scope Crop', width: 3840, height: 1606, category: '4K UHD' },
      { name: 'DCI 4K Scope Native', width: 4096, height: 1716, category: 'Cinema' }
    ],
    useCases: [
      { industry: 'Filmmaking', title: 'Theatrical Feature Films', description: 'Hollywood widescreen standard for blockbuster movies and prestige drama.', recommended: true },
      { industry: 'Color Grading', title: 'Letterbox Video Mastering', description: 'Exporting cinematic letterboxed video master files for streaming distribution.', recommended: true }
    ],
    pros: [
      'The definitive "cinematic" aesthetic familiar to global movie audiences',
      'Expansive panoramic field of view ideal for sweeping landscapes and action scenes',
      'Fills 21:9 ultrawide desktop monitors and anamorphic projection screens completely'
    ],
    cons: [
      'Requires thick top and bottom black letterbox bars on standard 16:9 televisions',
      'Extremely restrictive vertical framing for tall vertical subjects'
    ],
    faqs: [
      {
        question: 'What is 2.39:1 resolution in 4K?',
        answer: 'In consumer 4K UHD (3840x2160), 2.39:1 active picture area is 3840x1606 pixels. In cinema DCI 4K, it is 4096x1716 pixels.'
      }
    ],
    meta: {
      title: '2.39:1 Aspect Ratio Calculator — Anamorphic Cinema',
      description: 'Free 2.39:1 cinema aspect ratio calculator. Calculate active film dimensions, letterbox matte sizes, and anamorphic video resolutions for 1080p and 4K UHD.',
      keywords: ['2.39:1 aspect ratio calculator', 'cinemascope aspect ratio', 'anamorphic ratio', '2.40:1 aspect ratio', 'movie aspect ratio calculator']
    }
  },
  '32-9-aspect-ratio-calculator': {
    slug: '32-9-aspect-ratio-calculator',
    name: '32:9 Super Ultrawide Aspect Ratio',
    ratioWidth: 32,
    ratioHeight: 9,
    decimalValue: 3.5555555555555554,
    tagline: 'The panoramic super ultrawide standard for 49" curved gaming and multi-window productivity.',
    overview: 'The 32:9 aspect ratio (super ultrawide) represents the exact horizontal width of two 16:9 monitors placed side-by-side without a center bezel. Popularized by Samsung Odyssey 49" and 57" curved displays.',
    formulaDescription: 'To calculate 32:9 dimensions, multiply height by 3.5556 to find width, or multiply width by 0.28125 to find height. E.g. (1440 * 3.5556) = 5120.',
    gcdValue: 160,
    workedExample: {
      title: 'Step-by-Step 32:9 Calculation Example',
      scenario: 'Calculating the super ultrawide resolution for a Dual-QHD monitor with 1440p height:',
      steps: [
        'Identify target ratio: 32:9 (equivalent to two 16:9 displays side-by-side).',
        'Formula: Width = (Height × 32) ÷ 9, or Height × 3.5556.',
        'Substitute panel height: Width = (1440 × 32) ÷ 9.',
        'Multiply numerator: 1440 × 32 = 46,080.',
        'Divide by 9: 46,080 ÷ 9 = 5120 pixels.',
        'Result: Exactly 5120×1440 pixels (Dual-QHD DQHD), matching popular 49-inch curved monitors.'
      ],
      formula: 'Width = (1440 × 32) ÷ 9 = 5120px (Dual-QHD 49" Super Ultrawide)'
    },
    commonResolutions: [
      { name: 'Dual-FHD (49" 1080p)', width: 3840, height: 1080, category: 'Full HD' },
      { name: 'Dual-QHD (49" 1440p)', width: 5120, height: 1440, category: 'QHD / 2K' },
      { name: 'Dual-4K (57" UHD)', width: 7680, height: 2160, category: '4K UHD' }
    ],
    useCases: [
      { industry: 'Sim Racing', title: 'Flight & Racing Simulators', description: 'Replicates real vehicle cockpit side windows with seamless curved panoramic view.', recommended: true },
      { industry: 'Finance', title: 'Financial Trading Desks', description: 'Displays 6 to 8 live market candlestick charts concurrently on a single curved monitor.', recommended: true }
    ],
    pros: [
      'Replaces dual 16:9 monitor setups with zero center bezels',
      'Unmatched panoramic peripheral immersion for gaming and flight simulators',
      'Supports Picture-by-Picture (PBP) to display two independent computer inputs simultaneously'
    ],
    cons: [
      'Requires substantial desktop physical space and high-end graphics card (GPU)',
      'Most standard video streaming sites display massive black bars on the sides'
    ],
    faqs: [
      {
        question: 'What resolution is a 32:9 monitor?',
        answer: 'The most popular 32:9 resolution is 5120x1440 pixels (Dual QHD), followed by 3840x1080 (Dual Full HD) and 7680x2160 (Dual 4K).'
      }
    ],
    meta: {
      title: '32:9 Aspect Ratio Calculator — Super Ultrawide Specs',
      description: 'Free 32:9 super ultrawide calculator. Calculate pixel dimensions for 49-inch curved monitors, dual-QHD (5120x1440), and dual-4K desktop multi-window setups.',
      keywords: ['32:9 aspect ratio calculator', 'super ultrawide aspect ratio', '5120x1440 aspect ratio', '49 inch monitor resolution', 'dual qhd calculator']
    }
  },
  'golden-ratio-aspect-ratio-calculator': {
    slug: 'golden-ratio-aspect-ratio-calculator',
    name: 'Golden Ratio (1.618:1)',
    ratioWidth: 1618,
    ratioHeight: 1000,
    decimalValue: 1.618033988749895,
    tagline: 'The divine aesthetic proportion (Phi φ) used in classical art, architecture, and UI layout design.',
    overview: 'The Golden Ratio (represented by the Greek letter Phi φ ≈ 1.618034) is a mathematical proportion found abundantly in nature, classical architecture, and modern UI design. It creates organic visual harmony that the human eye naturally finds balanced.',
    formulaDescription: 'To calculate Golden Ratio dimensions, multiply height by 1.618034 to find width, or divide width by 1.618034 to solve height. E.g. (618 * 1.618034) ≈ 1000.',
    gcdValue: 1,
    workedExample: {
      title: 'Step-by-Step Golden Ratio Calculation Example',
      scenario: 'Calculating the aesthetically balanced height for a UI card container with a 800px width:',
      steps: [
        'Identify the Golden Ratio constant: φ ≈ 1.618034.',
        'Formula: Height = Width ÷ φ (or Width × 0.618034).',
        'Substitute container width: Height = 800 ÷ 1.618034.',
        'Perform division: 800 ÷ 1.618034 ≈ 494.4 pixels.',
        'Round to whole pixels: 494 pixels.',
        'Result: A card sized 800×494px embodies the divine proportion, creating optimal visual harmony for UI layouts.'
      ],
      formula: 'Height = 800 ÷ 1.618034 = 494px (Golden Rectangle UI Card)'
    },
    commonResolutions: [
      { name: 'UI Card Small', width: 485, height: 300, category: 'Social' },
      { name: 'UI Card Standard', width: 809, height: 500, category: 'Social' },
      { name: 'Golden Hero Banner', width: 1618, height: 1000, category: 'Full HD' }
    ],
    useCases: [
      { industry: 'UI/UX Design', title: 'Content Card & Hero Layouts', description: 'Creates visually soothing geometric balance in web layouts and typography scales.', recommended: true },
      { industry: 'Art & Photography', title: 'Compositional Framing', description: 'Applies the golden spiral grid to position focal points with maximum visual impact.', recommended: true }
    ],
    pros: [
      'Mathematically proven to produce intuitive aesthetic balance',
      'Widely used in corporate logo design, editorial layouts, and fine art framing',
      'Provides a disciplined design system for spacing, typography, and card dimensions'
    ],
    cons: [
      'Does not correspond directly to standard mass-market computer displays or TVs',
      'Slightly non-standard pixel dimensions may require rounding to whole integers'
    ],
    faqs: [
      {
        question: 'What is the Golden Ratio in numbers?',
        answer: 'The Golden Ratio is an irrational mathematical constant approximately equal to 1.6180339887... (abbreviated as 1.618:1).'
      }
    ],
    meta: {
      title: 'Golden Ratio Aspect Ratio Calculator — 1.618:1 Phi',
      description: 'Free Golden Ratio aspect ratio calculator. Calculate dimensions using the divine proportion (1.618034:1) for UI card layouts, graphic design, and photography.',
      keywords: ['golden ratio calculator', '1.618 aspect ratio', 'phi aspect ratio calculator', 'golden rectangle calculator', 'divine proportion dimensions']
    }
  }
};
