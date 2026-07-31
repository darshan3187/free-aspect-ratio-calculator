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
      title: '16:9 Aspect Ratio Calculator & Dimensions Converter (1080p, 4K)',
      description: 'Free interactive 16:9 aspect ratio calculator. Easily calculate width, height, and pixel dimensions for 1080p, 1440p, 4K, YouTube videos, and monitors.',
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
      title: '4:3 Aspect Ratio Calculator & Resolution Specs (iPad, Photo)',
      description: 'Free 4:3 aspect ratio calculator. Calculate pixel dimensions, convert 4:3 resolutions for iPads, photography, Micro 4/3 sensors, and retro gaming.',
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
      title: '21:9 Ultrawide Aspect Ratio Calculator (3440x1440, 5120x2160)',
      description: 'Free 21:9 aspect ratio calculator. Calculate pixel dimensions for ultrawide monitors, 3440x1440 displays, 21:9 gaming, and cinematic video editing.',
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
      title: '1:1 Square Aspect Ratio Calculator (1080x1080 Instagram)',
      description: 'Free 1:1 square aspect ratio calculator. Calculate pixel dimensions for Instagram square posts, e-commerce product thumbnails, and square avatars.',
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
      'Fills 100% of mobile phone screens without requiring user to rotate device',
      'Proven highest engagement format for mobile social algorithms'
    ],
    cons: [
      'Pillarboxes heavily with large black bars when viewed on desktop monitors or TVs'
    ],
    faqs: [
      {
        question: 'What is 9:16 aspect ratio in pixels?',
        answer: 'The standard resolution for 9:16 vertical video is 1080x1920 pixels.'
      }
    ],
    meta: {
      title: '9:16 Vertical Aspect Ratio Calculator (TikTok, Reels, Shorts)',
      description: 'Free 9:16 vertical aspect ratio calculator. Calculate 1080x1920 pixel dimensions for TikTok videos, Instagram Reels, YouTube Shorts, and Snapchat.',
      keywords: ['9:16 aspect ratio calculator', '9 16 ratio', '1080x1920 aspect ratio', 'tiktok video dimensions', 'instagram reels calculator']
    }
  },
  '3-2-aspect-ratio-calculator': {
    slug: '3-2-aspect-ratio-calculator',
    name: '3:2 Aspect Ratio',
    ratioWidth: 3,
    ratioHeight: 2,
    decimalValue: 1.5,
    tagline: 'The native sensor standard for 35mm film, Full Frame DSLRs, mirrorless cameras, and Microsoft Surface laptops.',
    overview: 'The 3:2 aspect ratio (1.5:1) was introduced by Oskar Barnack for 35mm film negatives and remains the physical native aspect ratio of Full Frame and APS-C DSLR & mirrorless digital camera sensors.',
    formulaDescription: 'To calculate 3:2 dimensions, multiply height by 1.5 to solve width, or divide width by 1.5 to solve height. E.g., for 6000x4000, GCD is 2000 (6000/2000 = 3, 4000/2000 = 2).',
    gcdValue: 2000,
    commonResolutions: [
      { name: '4x6 Print Standard', width: 1800, height: 1200, category: 'Print' },
      { name: 'Full HD 3:2', width: 2160, height: 1440, category: 'Full HD' },
      { name: '24MP Camera Native', width: 6000, height: 4000, category: 'QHD / 2K' },
      { name: '45MP High-Res Photo', width: 8192, height: 5464, category: '8K UHD' }
    ],
    useCases: [
      { industry: 'Photography', title: '35mm & Full-Frame DSLRs', description: 'Native uncropped sensor exposure area for Canon, Sony, Nikon, and Leica cameras.', recommended: true },
      { industry: 'Printing', title: '4x6 & 12x18 Photo Prints', description: 'Prints 4x6 photo cards perfectly with zero edge cropping.', recommended: true },
      { industry: 'Laptops', title: 'Microsoft Surface Displays', description: 'Provides optimal vertical screen real estate for desktop productivity.', recommended: true }
    ],
    pros: [
      'Ideal balance between wide landscape views and vertical portrait space',
      'Native sensor format for 35mm photography - zero cropping required for 4x6 prints'
    ],
    cons: [
      'Requires top/bottom cropping to fit 16:9 video screens or 8x10 print frames'
    ],
    faqs: [
      {
        question: 'What print sizes match a 3:2 aspect ratio?',
        answer: 'Standard 3:2 print sizes include 4x6, 8x12, 12x18, 16x24, and 24x36 inches.'
      }
    ],
    meta: {
      title: '3:2 Aspect Ratio Calculator (35mm Photo, 4x6 Prints)',
      description: 'Free 3:2 aspect ratio calculator. Calculate pixel dimensions for Full Frame camera photos, 4x6 prints, Microsoft Surface screens, and 35mm framing.',
      keywords: ['3:2 aspect ratio calculator', '3 2 ratio', '4x6 aspect ratio', 'full frame camera ratio', '35mm photo dimensions']
    }
  },
  '5-4-aspect-ratio-calculator': {
    slug: '5-4-aspect-ratio-calculator',
    name: '5:4 Aspect Ratio',
    ratioWidth: 5,
    ratioHeight: 4,
    decimalValue: 1.25,
    tagline: 'The classic photographic print ratio for 8x10 portrait frames and Instagram vertical posts.',
    overview: 'The 5:4 aspect ratio (1.25:1) is famous for classic large-format 8x10 inch art portrait prints, historical 1280x1024 computer monitors, and Instagram mobile portrait post limits (4:5 vertical inverse).',
    formulaDescription: 'To calculate 5:4 aspect ratio, multiply height by 1.25 to solve width, or multiply width by 0.8 to solve height. E.g. (1280 / 5) * 4 = 1024.',
    gcdValue: 256,
    commonResolutions: [
      { name: 'SXGA Display Standard', width: 1280, height: 1024, category: 'Standard HD' },
      { name: '8x10 Photo Print (300 DPI)', width: 3000, height: 2400, category: 'Print' },
      { name: 'Instagram 4:5 Portrait Inverse', width: 1080, height: 1350, category: 'Social' }
    ],
    useCases: [
      { industry: 'Photo Printing', title: '8x10 & 16x20 Gallery Frames', description: 'Standard framing size for wall portrait prints and fine art gallery displays.', recommended: true },
      { industry: 'Social Media', title: 'Instagram 4:5 Portrait Posts', description: 'Occupies maximum vertical height allowed in Instagram feeds.', recommended: true }
    ],
    pros: [
      'Perfect match for standard 8x10 and 16x20 photo frames',
      'Provides high portrait density without unnecessary top/bottom empty space'
    ],
    cons: [
      'Requires substantial horizontal cropping when converting 16:9 images'
    ],
    faqs: [
      {
        question: 'Is 5:4 aspect ratio the same as 8x10?',
        answer: 'Yes! 8x10 inches reduces down to a 5:4 aspect ratio (8 / 2 = 4, 10 / 2 = 5).'
      }
    ],
    meta: {
      title: '5:4 Aspect Ratio Calculator (8x10 Prints, 4:5 Instagram)',
      description: 'Free 5:4 aspect ratio calculator. Calculate pixel dimensions for 8x10 photo prints, 1280x1024 monitors, and Instagram 4:5 portrait post sizing.',
      keywords: ['5:4 aspect ratio calculator', '5 4 ratio', '8x10 aspect ratio', '4:5 instagram ratio', '1280x1024 aspect ratio']
    }
  }
};
