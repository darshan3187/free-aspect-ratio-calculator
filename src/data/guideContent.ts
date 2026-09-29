/**
 * In-depth technical content and category references for Guides
 * Delivers comprehensive, mathematically verified explanations without filler or keyword stuffing.
 */

export interface DetailedGuideContent {
  intro: string[];
  keyTakeaways: string[];
  sections: Array<{
    heading: string;
    paragraphs: string[];
    formula?: string;
    table?: {
      headers: string[];
      rows: string[][];
    };
    codeSnippet?: string;
  }>;
}

export const DETAILED_GUIDES: Record<string, DetailedGuideContent> = {
  'what-is-aspect-ratio': {
    intro: [
      'An aspect ratio is the proportional relationship between the width and height of an image, video frame, or display screen. It is universally expressed as two numbers separated by a colon, formatted as W:H (Width:Height).',
      'Crucially, an aspect ratio describes geometric shape rather than physical or pixel size. For example, a 1920×1080 monitor and a 3840×2160 television share the exact same 16:9 aspect ratio, despite the latter containing four times as many total pixels.'
    ],
    keyTakeaways: [
      'Aspect ratio describes shape (W:H), not total pixel count or physical inch size.',
      'Common ratios include 16:9 (widescreen), 4:3 (traditional/iPad), 4:5 (Instagram portrait), and 9:16 (vertical video).',
      'Preserving aspect ratio during resizing prevents visual distortion, unnatural stretching, and unwanted cropping.'
    ],
    sections: [
      {
        heading: 'How Aspect Ratios Are Calculated and Reduced',
        paragraphs: [
          'To determine the simplified aspect ratio of any digital image, find the Greatest Common Divisor (GCD) of the width and height, then divide both numbers by that divisor.',
          'For instance, consider a standard Full HD image measuring 1920 pixels wide by 1080 pixels high. The Greatest Common Divisor of 1920 and 1080 is 120:'
        ],
        formula: '1920 ÷ 120 = 16 (Width Units)\n1080 ÷ 120 = 9 (Height Units)\nAspect Ratio = 16:9'
      },
      {
        heading: 'Aspect Ratio vs. Resolution Comparison',
        paragraphs: [
          'While aspect ratio defines the bounding frame proportions, resolution dictates the total raster density and sharpness of the image. The table below illustrates how different resolutions share identical aspect ratios:'
        ],
        table: {
          headers: ['Aspect Ratio', 'Common Resolutions', 'Total Pixels', 'Primary Usage'],
          rows: [
            ['16:9', '1920×1080, 2560×1440, 3840×2160', '2.07M – 8.29M', 'YouTube, HDTV, Desktop Monitors, Gaming'],
            ['4:3', '1024×768, 1600×1200, 2048×1536', '0.78M – 3.14M', 'iPads, Retro Monitors, Micro 4/3 Photography'],
            ['4:5', '1080×1350, 1440×1800, 2160×2700', '1.45M – 5.83M', 'Instagram Vertical Posts, 8×10 Portrait Prints'],
            ['9:16', '1080×1920, 1440×2560, 2160×3840', '2.07M – 8.29M', 'TikTok, Instagram Reels, YouTube Shorts'],
            ['1:1', '1080×1080, 1200×1200, 2048×2048', '1.16M – 4.19M', 'Square Social Posts, Album Covers, Avatars'],
            ['21:9', '2560×1080, 3440×1440, 5120×2160', '2.76M – 11.05M', 'Ultrawide PC Displays, Anamorphic Cinema']
          ]
        }
      },
      {
        heading: 'Modern CSS Implementation',
        paragraphs: [
          'In modern web development, the CSS `aspect-ratio` property allows browsers to automatically compute container heights before images load, completely eliminating Cumulative Layout Shift (CLS):'
        ],
        codeSnippet: `/* Modern Responsive CSS */\n.video-container {\n  width: 100%;\n  max-width: 1200px;\n  aspect-ratio: 16 / 9;\n}\n\n.instagram-card {\n  width: 100%;\n  aspect-ratio: 4 / 5;\n  object-fit: cover;\n}`
      }
    ]
  },

  'how-to-calculate-aspect-ratio': {
    intro: [
      'Calculating an aspect ratio allows designers, animators, and software engineers to scale graphics, video containers, and canvas elements while guaranteeing zero visual distortion.',
      'Whether you are computing scaled pixel dimensions for a responsive interface or finding the simplified fraction for an uncommon screen resolution, the mathematical formulas are straightforward.'
    ],
    keyTakeaways: [
      'Formula to find new height from target width: New Height = (Original Height × Target Width) ÷ Original Width.',
      'Formula to find new width from target height: New Width = (Original Width × Target Height) ÷ Original Height.',
      'Use Euclid\'s Greatest Common Divisor (GCD) algorithm to reduce raw pixel counts into simplified ratios.'
    ],
    sections: [
      {
        heading: 'Formula 1: Solving for Scaled Height',
        paragraphs: [
          'When you know your original asset dimensions and want to scale to a specific new width, calculate the proportional height with the cross-multiplication formula:'
        ],
        formula: 'New Height = (Original Height × New Width) ÷ Original Width\n\nExample: Scaling a 1920×1080 video down to a width of 480px:\nNew Height = (1080 × 480) ÷ 1920 = 518,400 ÷ 1920 = 270px'
      },
      {
        heading: 'Formula 2: Solving for Scaled Width',
        paragraphs: [
          'When designing for fixed vertical constraints (such as a modal window or hero banner) where height is predetermined, compute the required width as follows:'
        ],
        formula: 'New Width = (Original Width × New Height) ÷ Original Height\n\nExample: Scaling a 1080×1350 Instagram portrait image to fit a 600px height container:\nNew Width = (1080 × 600) ÷ 1350 = 648,000 ÷ 1350 = 480px'
      },
      {
        heading: 'Formula 3: Finding the Simplified Ratio (GCD Method)',
        paragraphs: [
          'To determine whether an unknown resolution conforms to a standard ratio, divide both numbers by their Greatest Common Divisor (GCD):',
          'For a 2560×1440 QHD screen, GCD(2560, 1440) = 160. Dividing 2560 by 160 yields 16; dividing 1440 by 160 yields 9. Thus, 2560×1440 is an exact 16:9 ratio.'
        ],
        table: {
          headers: ['Original Dimension', 'Greatest Common Divisor', 'Division Math', 'Final Aspect Ratio'],
          rows: [
            ['1920 × 1080', '120', '1920/120 : 1080/120', '16:9 (Widescreen)'],
            ['1080 × 1350', '270', '1080/270 : 1350/270', '4:5 (Portrait)'],
            ['1080 × 1920', '120', '1080/120 : 1920/120', '9:16 (Vertical)'],
            ['3440 × 1440', '80', '3440/80 : 1440/80', '43:18 ≈ 21:9 (Ultrawide)'],
            ['2048 × 1536', '512', '2048/512 : 1536/512', '4:3 (iPad/Tablet)']
          ]
        }
      }
    ]
  },

  'resizing-images-without-stretching': {
    intro: [
      'Image distortion—squishing, stretching, or pixel warping—occurs whenever an image is forced into a layout container that does not match its native aspect ratio.',
      'Understanding the difference between locked proportion scaling, directional cropping, and viewport letterboxing is critical for maintaining professional visual quality across web and print workflows.'
    ],
    keyTakeaways: [
      'Locking aspect ratio guarantees that whenever width changes, height scales proportionately by the exact same multiplier.',
      'CSS object-fit: cover fills a container while preserving ratio, cleanly cropping excess overflow.',
      'CSS object-fit: contain ensures 100% of the image remains visible, introducing clean letterboxing or pillarboxing if ratios differ.',
      'Never specify independent fixed pixel values for both width and height without an object-fit rule.'
    ],
    sections: [
      {
        heading: 'Why Images Stretch and Distort',
        paragraphs: [
          'In HTML, assigning arbitrary width and height attributes (e.g. `<img width="600" height="200">`) to a 4:3 source photo forces the browser to stretch horizontal pixels while compressing vertical ones. The result is visual warping.',
          'To resize without distortion, you must either scale both dimensions by a uniform percentage or apply modern CSS container rules.'
        ],
        formula: 'Uniform Scale Factor (S) = New Dimension ÷ Original Dimension\nTarget Width = Original Width × S\nTarget Height = Original Height × S'
      },
      {
        heading: 'CSS object-fit Solutions for Web Developers',
        paragraphs: [
          'Modern responsive design relies on the `object-fit` CSS property to handle ratio mismatches cleanly inside fixed layout cards:'
        ],
        codeSnippet: `/* Solution A: Fill container cleanly without distortion (Crop overflow) */\n.card-img-cover {\n  width: 100%;\n  height: 320px;\n  object-fit: cover;\n  object-position: center;\n}\n\n/* Solution B: Show entire image without cropping (Letterbox padding) */\n.modal-img-contain {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  background-color: #000000;\n}`
      },
      {
        heading: 'Handling Crop vs. Padding in Production',
        paragraphs: [
          'When adapting a landscape photo (16:9) for an Instagram vertical post (4:5), you have two mathematical options:',
          '1. Crop: Shave off horizontal sides to fill the vertical frame without black bars.',
          '2. Padding (Pillarboxing): Place the complete horizontal image in the center and add neutral top and bottom border margins.'
        ]
      }
    ]
  },

  'pixel-dimensions-vs-aspect-ratio': {
    intro: [
      'One of the most frequent misconceptions in digital media is treating aspect ratio and resolution as interchangeable terms.',
      'While aspect ratio defines the geometric silhouette (proportions of width relative to height), pixel dimensions describe the absolute raster resolution (total amount of detail and storage data).'
    ],
    keyTakeaways: [
      'Aspect ratio is a dimensionless mathematical fraction (e.g., 16/9 = 1.778).',
      'Pixel dimensions measure raster resolution (e.g., 1920 pixels wide × 1080 pixels high).',
      'Images with identical aspect ratios can range from tiny 160×90 thumbnails to massive 7680×4320 8K canvases.'
    ],
    sections: [
      {
        heading: 'The 16:9 Resolution Spectrum',
        paragraphs: [
          'To see the clear distinction, observe how the universal 16:9 aspect ratio scales across standard display resolutions. Every single row in this table shares the exact same 16:9 shape:'
        ],
        table: {
          headers: ['Resolution Name', 'Pixel Dimensions', 'Total Megapixels', 'Relative Detail (vs 1080p)'],
          rows: [
            ['360p SD', '640 × 360', '0.23 MP', '0.11× (Low Bandwidth)'],
            ['720p HD', '1280 × 720', '0.92 MP', '0.44× (Web Video)'],
            ['1080p Full HD', '1920 × 1080', '2.07 MP', '1.00× (Baseline Standard)'],
            ['1440p QHD (2K)', '2560 × 1440', '3.68 MP', '1.77× (PC Gaming / Pro Monitors)'],
            ['4K UHD', '3840 × 2160', '8.29 MP', '4.00× (Modern Streaming / TVs)'],
            ['8K UHD', '7680 × 4320', '33.18 MP', '16.00× (Cinema & Archival)']
          ]
        }
      },
      {
        heading: 'Why This Distinction Matters for UI and Responsive Web',
        paragraphs: [
          'When writing responsive media queries or setting up CSS grid cards, you define layout containers by their aspect ratio (`aspect-ratio: 16 / 9;`), while serving source image files with varying pixel densities (`srcset="image-1080.webp 1x, image-2160.webp 2x"`) to match the user\'s retina display.'
        ]
      }
    ]
  },

  'ppi-and-dpi-explained': {
    intro: [
      'PPI (Pixels Per Inch) and DPI (Dots Per Inch) measure resolution density across digital screens and physical print media respectively.',
      'Understanding how to translate on-screen pixel dimensions into high-resolution physical print sizes at 300 DPI is essential for photographers, graphic artists, and merchandise designers.'
    ],
    keyTakeaways: [
      'PPI measures digital display pixel density; DPI measures physical printer ink droplet density.',
      '300 DPI is the universal benchmark for commercial, museum-grade, and offset print sharpness.',
      'Print Conversion Formula: Pixels = Inches × DPI. Example: An 8×10 inch print at 300 DPI requires 2400×3000 pixels.',
      'Standard screen graphics (72–96 PPI) will appear blurry and pixelated if printed at scale without sufficient raster resolution.'
    ],
    sections: [
      {
        heading: 'The Mathematical Formula: Converting Pixels to Inches',
        paragraphs: [
          'To calculate how large a digital image can be printed without loss of quality, divide its pixel dimensions by the desired print DPI (typically 300 DPI):'
        ],
        formula: 'Print Width (Inches) = Width (Pixels) ÷ DPI\nPrint Height (Inches) = Height (Pixels) ÷ DPI\n\nExample: A 3600 × 2400 pixel image printed at 300 DPI:\nWidth = 3600 ÷ 300 = 12.0 inches\nHeight = 2400 ÷ 300 = 8.0 inches\nPhysical Print Size = 12 × 8 inches (3:2 Ratio)'
      },
      {
        heading: 'Standard 300 DPI Print Resolution Chart',
        paragraphs: [
          'Use this reference matrix when preparing image exports for fine art prints, photo frames, and canvas wraps:'
        ],
        table: {
          headers: ['Print Frame Size', 'Aspect Ratio', 'Required Pixels @ 300 DPI', 'Minimum Megapixels'],
          rows: [
            ['4 × 6 inches', '3:2', '1200 × 1800 px', '2.16 MP'],
            ['5 × 7 inches', '5:7 (≈ 1:1.4)', '1500 × 2100 px', '3.15 MP'],
            ['8 × 10 inches', '4:5', '2400 × 3000 px', '7.20 MP'],
            ['11 × 14 inches', '11:14', '3300 × 4200 px', '13.86 MP'],
            ['12 × 18 inches', '2:3', '3600 × 5400 px', '19.44 MP'],
            ['16 × 20 inches', '4:5', '4800 × 6000 px', '28.80 MP'],
            ['24 × 36 inches (Poster)', '2:3', '7200 × 10800 px', '77.76 MP']
          ]
        }
      }
    ]
  },

  'best-aspect-ratio-for-youtube': {
    intro: [
      'YouTube is the world\'s largest video streaming platform, with specific aspect ratio requirements across its desktop player, mobile apps, thumbnail grids, and Shorts feeds.',
      'Selecting the correct dimensions ensures your content streams without unexpected black pillarbox bars and maximizes click-through rates across video recommendation carousels.'
    ],
    keyTakeaways: [
      'Standard YouTube Videos: Exactly 16:9 widescreen. The native video player is built natively for 16:9.',
      'Recommended Thumbnail Size: 1280×720 pixels (minimum 640px wide, max 2MB file size, 16:9 aspect ratio).',
      'YouTube Shorts: Exactly 9:16 vertical video (1080×1920 pixels).',
      'Channel Banner / Header: 2560×1440 pixels (with a 1546×423 px central safe area for mobile devices).'
    ],
    sections: [
      {
        heading: 'Standard YouTube Video Resolutions (16:9)',
        paragraphs: [
          'YouTube automatically encodes uploaded 16:9 videos into multiple playback tiers. Uploading in 1440p or 4K triggers higher bitrate VP09/AV01 codecs, resulting in visibly crisper playback even on 1080p displays:'
        ],
        table: {
          headers: ['Playback Tier', 'Resolution', 'Aspect Ratio', 'Recommended Upload Bitrate'],
          rows: [
            ['1080p Full HD', '1920 × 1080', '16:9', '8 – 12 Mbps'],
            ['1440p QHD (2K)', '2560 × 1440', '16:9', '16 – 24 Mbps (Enables VP9)'],
            ['4K UHD', '3840 × 2160', '16:9', '35 – 45 Mbps (Premium Quality)'],
            ['8K UHD', '7680 × 4320', '16:9', '80 – 100 Mbps (Future-Proof)']
          ]
        }
      },
      {
        heading: 'YouTube Shorts Guidelines (9:16)',
        paragraphs: [
          'YouTube Shorts requires vertical video recorded at a strict 9:16 aspect ratio (1080×1920 pixels). Keep vital visual elements and captions inside the central vertical zone to prevent UI overlay buttons (like, comment, channel badge) from obscuring key content.'
        ]
      }
    ]
  },

  'best-aspect-ratio-for-instagram': {
    intro: [
      'Instagram supports four primary image and video formats: vertical portrait feed posts (4:5), square feed posts (1:1), Stories & Reels (9:16), and horizontal landscape photos (1.91:1).',
      'Optimizing your media dimensions ensures full-screen display in user feeds without automatic compression or unwanted center-cropping.'
    ],
    keyTakeaways: [
      'Feed Posts (Recommended): 4:5 Portrait (1080×1350 px). Occupies maximum mobile screen space.',
      'Square Posts: 1:1 (1080×1080 px). Classic format, matches the profile grid thumbnail.',
      'Stories & Reels: 9:16 Vertical Video (1080×1920 px). Full-screen mobile experience.',
      'Profile Picture: 1:1 Square (320×320 px display, upload 1080×1080 for high-DPI displays).'
    ],
    sections: [
      {
        heading: 'Why 4:5 Is the Superior Feed Format',
        paragraphs: [
          'On mobile devices, vertical scrolling is natural. A 4:5 portrait post (1080×1350 pixels) displays approximately 25% more vertical screen real estate than a standard 1:1 square post (1080×1080 pixels).',
          'This increased screen footprint slows down user scroll speed, improves dwell time, and significantly increases engagement metrics.'
        ],
        table: {
          headers: ['Post Type', 'Aspect Ratio', 'Pixel Dimensions', 'Feed Screen Share'],
          rows: [
            ['Portrait Post', '4:5 (0.80)', '1080 × 1350 px', 'Highest (Recommended)'],
            ['Square Post', '1:1 (1.00)', '1080 × 1080 px', 'Standard'],
            ['Reels & Stories', '9:16 (0.56)', '1080 × 1920 px', 'Full Screen (Immersive)'],
            ['Landscape Post', '1.91:1 (1.91)', '1080 × 566 px', 'Lowest (Not Recommended)']
          ]
        }
      }
    ]
  },

  '1080p-vs-1440p-vs-4k': {
    intro: [
      '1080p (Full HD), 1440p (QHD), and 4K (UHD) are the three predominant display resolutions in modern computing, gaming, and television entertainment.',
      'While all three adhere to the identical 16:9 widescreen aspect ratio, their pixel density, hardware rendering demands, and optical fidelity differ substantially.'
    ],
    keyTakeaways: [
      'All three resolutions share the exact same 16:9 aspect ratio.',
      '1080p (1920×1080) contains 2.07 million pixels; baseline standard for budget displays and high-framerate esports.',
      '1440p (2560×1440) contains 3.68 million pixels (77% more detail than 1080p); sweet spot for desktop productivity and PC gaming.',
      '4K UHD (3840×2160) contains 8.29 million pixels (400% more detail than 1080p); ideal for creative production and large screens.'
    ],
    sections: [
      {
        heading: 'Technical Benchmark Matrix',
        paragraphs: [
          'Compare the rendering requirements and pixel counts across all three resolution tiers:'
        ],
        table: {
          headers: ['Metric', '1080p (Full HD)', '1440p (QHD / 2K)', '4K UHD (2160p)'],
          rows: [
            ['Pixel Count', '1920 × 1080', '2560 × 1440', '3840 × 2160'],
            ['Total Megapixels', '2.07 MP', '3.68 MP', '8.29 MP'],
            ['Pixel Multiplier', '1.0× (Baseline)', '1.77× of 1080p', '4.0× of 1080p'],
            ['Typical PPI (27" Screen)', '81.6 PPI (Visible pixels)', '108.8 PPI (Sharp)', '163.2 PPI (Retina clarity)'],
            ['GPU Rendering Load', 'Light (60–240+ FPS)', 'Moderate', 'Heavy (High VRAM required)']
          ]
        }
      }
    ]
  }
};
