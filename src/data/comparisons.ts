export interface ComparisonSpec {
  feature: string;
  itemA: string;
  itemB: string;
}

export interface ComparisonFAQ {
  question: string;
  answer: string;
}

export interface ComparisonData {
  slug: string;
  title: string;
  itemAName: string;
  itemBName: string;
  itemARatio: { w: number; h: number };
  itemBRatio: { w: number; h: number };
  overview: string;
  specsTable: ComparisonSpec[];
  itemAPros: string[];
  itemACons: string[];
  itemBPros: string[];
  itemBCons: string[];
  useCases: {
    itemA: string[];
    itemB: string[];
  };
  recommendations: {
    chooseAIf: string[];
    chooseBIf: string[];
  };
  faqs: ComparisonFAQ[];
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const COMPARISONS_DATA: Record<string, ComparisonData> = {
  '16-9-vs-4-3': {
    slug: '16-9-vs-4-3',
    title: '16:9 Widescreen vs 4:3 Standard Aspect Ratio',
    itemAName: '16:9 Widescreen',
    itemBName: '4:3 Standard',
    itemARatio: { w: 16, h: 9 },
    itemBRatio: { w: 4, h: 3 },
    overview: '16:9 widescreen is the universal standard for modern HDTVs, YouTube videos, and PC monitors. 4:3 is the classic square-like ratio used in vintage CRT TVs, iPad screens, Micro Four Thirds photography, and presentation decks.',
    specsTable: [
      { feature: 'Decimal Ratio', itemA: '1.78:1', itemB: '1.33:1' },
      { feature: 'Field of View', itemA: 'Wide Widescreen', itemB: 'Compact Square-ish' },
      { feature: 'Standard Resolutions', itemA: '1920x1080, 2560x1440, 3840x2160', itemB: '1024x768, 1600x1200, 2048x1536' },
      { feature: 'Primary Era', itemA: '2000s - Present (HD Standard)', itemB: '1950s - 2000s (SD Broadcast)' },
      { feature: 'Primary Use Case', itemA: 'YouTube, Movies, Gaming, HDTV', itemB: 'iPad Apps, Photography, Retro Gaming' }
    ],
    itemAPros: [
      'Universal compatibility across virtually all modern monitors and TVs',
      'Native format for YouTube, Netflix, Twitch, and broadcast HDTV',
      'Matches natural human horizontal vision field-of-view'
    ],
    itemACons: [
      'Less vertical screen space for document editing than 4:3 or 16:10',
      'Requires pillarboxing (black side bars) for legacy 4:3 content'
    ],
    itemBPros: [
      'More vertical canvas height for reading ebooks, coding, and web browsing',
      'Native image sensor ratio for Micro Four Thirds digital cameras',
      'Native format for Apple iPad displays'
    ],
    itemBCons: [
      'Thick black pillarbox bars when viewed on modern 16:9 monitors or TVs',
      'Restricted horizontal viewing angle for widescreen gaming and movies'
    ],
    useCases: {
      itemA: [
        'Producing videos for YouTube, Vimeo, and television broadcast',
        'PC and console gaming on widescreen monitors',
        'Watching movies and TV shows without letterboxing'
      ],
      itemB: [
        'Designing apps specifically for Apple iPad screens',
        'Shooting with Micro Four Thirds photography sensors',
        'Playing retro video games (NES, SNES, PS1) on emulators'
      ]
    },
    recommendations: {
      chooseAIf: [
        'You stream or create video content for YouTube or web platforms',
        'You use a modern widescreen monitor for gaming and media consumption'
      ],
      chooseBIf: [
        'You prioritize vertical reading height for tablets or document editing',
        'You shoot Micro 4/3 photography or preserve retro CRT video content'
      ]
    },
    faqs: [
      {
        question: 'Which aspect ratio is wider: 16:9 or 4:3?',
        answer: '16:9 is significantly wider horizontally than 4:3. For the same screen height, 16:9 extends further to the left and right.'
      },
      {
        question: 'Why do old TV shows have black bars on modern 16:9 TVs?',
        answer: 'Old TV shows were filmed in 4:3. When shown on a 16:9 TV without stretching, vertical black pillarbox bars fill the empty side spaces.'
      }
    ],
    meta: {
      title: '16:9 vs 4:3 Aspect Ratio Comparison: Differences & Visual Guide',
      description: 'Comprehensive 16:9 vs 4:3 aspect ratio comparison. Learn key differences in field of view, resolutions, photography, gaming, and video compatibility.',
      keywords: ['16:9 vs 4:3', '16 9 vs 4 3 aspect ratio', 'widescreen vs standard', 'difference between 16 9 and 4 3']
    }
  },
  '16-9-vs-21-9': {
    slug: '16-9-vs-21-9',
    title: '16:9 Widescreen vs 21:9 Ultrawide Aspect Ratio',
    itemAName: '16:9 Widescreen',
    itemBName: '21:9 Ultrawide',
    itemARatio: { w: 16, h: 9 },
    itemBRatio: { w: 21, h: 9 },
    overview: '16:9 is the universal widescreen display standard for TV and gaming. 21:9 ultrawide expands screen width by 33%, providing a panoramic canvas for multi-tasking and cinematic film viewing.',
    specsTable: [
      { feature: 'Decimal Ratio', itemA: '1.78:1', itemB: '2.37:1 (64:27)' },
      { feature: 'Horizontal Field of View', itemA: 'Standard Widescreen', itemB: 'Panoramic Ultrawide (+33% wider)' },
      { feature: 'Standard Resolutions', itemA: '1920x1080, 2560x1440, 3840x2160', itemB: '2560x1080, 3440x1440, 5120x2160' },
      { feature: 'Movie Playback', itemA: 'Letterboxed (Top/Bottom bars)', itemB: 'Full Screen (Zero black bars on 2.39:1 films)' },
      { feature: 'Multi-Tasking', itemA: '2 Side-by-Side Windows', itemB: '3 Full Side-by-Side Windows' }
    ],
    itemAPros: [
      'Universal compatibility across 99% of digital devices and video streaming platforms',
      'No black side bars on YouTube videos, TV broadcasts, and console games',
      'Less demanding on GPU graphics cards than ultrawide resolutions'
    ],
    itemACons: [
      'Top and bottom letterbox bars appear when watching widescreen cinema films',
      'Requires dual physical monitors for complex multi-window workflows'
    ],
    itemBPros: [
      'Replaces multi-monitor setups with one seamless bezel-free screen canvas',
      'Native full-screen playback for 2.39:1 anamorphic cinema releases',
      'Expanded peripheral Field of View in PC simulation and racing games'
    ],
    itemBCons: [
      'Vertical black side bars appear when playing standard 16:9 video content',
      'Requires ~34% more graphics power to drive pixels at high framerates'
    ],
    useCases: {
      itemA: [
        'Console gaming (PS5, Xbox Series X)',
        'Streaming Twitch and watching standard YouTube videos',
        'Standard office desktop work'
      ],
      itemB: [
        'Immersive PC gaming and flight/racing simulations',
        'Video editing timelines requiring long horizontal tracks',
        'Workstations running 3 side-by-side application windows'
      ]
    },
    recommendations: {
      chooseAIf: [
        'You play competitive console games or watch standard YouTube content',
        'You have limited desk depth or budget constraints'
      ],
      chooseBIf: [
        'You want to replace dual monitors with one clean curved monitor',
        'You watch movies or edit long horizontal video timelines'
      ]
    },
    faqs: [
      {
        question: 'Is 21:9 worth it for gaming?',
        answer: 'Yes! Over 95% of modern PC games natively support 21:9, delivering an immersive panoramic Field of View.'
      }
    ],
    meta: {
      title: '16:9 vs 21:9 Ultrawide Aspect Ratio: Which Is Better for Gaming & Work?',
      description: 'Detailed 16:9 vs 21:9 comparison. Compare standard 16:9 widescreen vs 21:9 ultrawide monitors for productivity, gaming FOV, and movie playback.',
      keywords: ['16:9 vs 21:9', '16 9 vs 21 9 monitor', 'ultrawide vs widescreen', '3440x1440 vs 2560x1440']
    }
  },
  '1080p-vs-1440p': {
    slug: '1080p-vs-1440p',
    title: '1080p (Full HD) vs 1440p (QHD) Resolution',
    itemAName: '1080p Full HD',
    itemBName: '1440p QHD (2K)',
    itemARatio: { w: 16, h: 9 },
    itemBRatio: { w: 16, h: 9 },
    overview: 'Both 1080p and 1440p share the exact 16:9 widescreen aspect ratio. However, 1440p delivers 77% more total pixels than 1080p, resulting in sharper text, crisper image details, and increased desktop workspace.',
    specsTable: [
      { feature: 'Pixel Dimensions', itemA: '1920 x 1080', itemB: '2560 x 1440' },
      { feature: 'Total Pixel Count', itemA: '2,073,600 pixels (2.07 MP)', itemB: '3,686,400 pixels (3.68 MP)' },
      { feature: 'Aspect Ratio', itemA: '16:9', itemB: '16:9' },
      { feature: 'Pixel Density (27" Monitor)', itemA: '81 PPI (Noticeable pixels)', itemB: '108 PPI (Sweet spot sharpness)' },
      { feature: 'GPU Performance Requirement', itemA: 'Low to Medium', itemB: 'Medium to High' }
    ],
    itemAPros: [
      'Low hardware requirements - easy to drive 144Hz+ on budget GPUs',
      'Affordable monitor price points',
      'Standard format for esports competitive gaming'
    ],
    itemACons: [
      'Lower pixel density on monitors 27 inches or larger (visible pixelation)',
      'Less screen real estate for multi-tasking windows'
    ],
    itemBPros: [
      '77% sharper image quality and pixel density than 1080p on 27" screens',
      'Optimal desktop screen real estate balance for work and gaming',
      'Great middle ground before demanding 4K GPU performance'
    ],
    itemBCons: [
      'Requires moderately powerful graphics card for high-fps gaming',
      'Slightly higher monitor cost than budget 1080p displays'
    ],
    useCases: {
      itemA: [
        'High-FPS competitive esports gaming (CS:GO, Valorant)',
        'Budget PC setups and 24-inch monitors'
      ],
      itemB: [
        'AAA PC gaming on 27-inch monitors',
        'Graphic design, coding, and general office productivity'
      ]
    },
    recommendations: {
      chooseAIf: [
        'You play esports titles at 240Hz+ on a budget GPU',
        'You prefer a 24-inch or smaller monitor screen size'
      ],
      chooseBIf: [
        'You are buying a 27-inch monitor and want crisp text and sharp graphics',
        'You want a balance between high graphics resolution and high framerates'
      ]
    },
    faqs: [
      {
        question: 'Is 1440p noticeable over 1080p?',
        answer: 'Yes! On a 27-inch screen, 1440p increases pixel density from 81 PPI to 108 PPI, making text significantly sharper and graphics less pixelated.'
      }
    ],
    meta: {
      title: '1080p vs 1440p Resolution: Is 1440p Worth It for Gaming & Work?',
      description: 'Compare 1080p Full HD vs 1440p QHD resolutions. Analyze pixel density, graphics performance, monitor sizing, and gaming performance differences.',
      keywords: ['1080p vs 1440p', '1080p vs 2k', '1920x1080 vs 2560x1440', 'is 1440p worth it']
    }
  },
  '1440p-vs-4k': {
    slug: '1440p-vs-4k',
    title: '1440p (QHD) vs 4K (UHD) Resolution',
    itemAName: '1440p QHD',
    itemBName: '4K UHD',
    itemARatio: { w: 16, h: 9 },
    itemBRatio: { w: 16, h: 9 },
    overview: '1440p and 4K both use the 16:9 widescreen ratio. 4K UHD has exactly 4 times the pixels of 1080p and 2.25 times the pixels of 1440p, offering unmatched clarity at the expense of high GPU rendering loads.',
    specsTable: [
      { feature: 'Pixel Dimensions', itemA: '2560 x 1440', itemB: '3840 x 2160' },
      { feature: 'Total Pixel Count', itemA: '3,686,400 pixels', itemB: '8,294,400 pixels' },
      { feature: 'Aspect Ratio', itemA: '16:9', itemB: '16:9' },
      { feature: 'Pixel Density (32" Monitor)', itemA: '91 PPI', itemB: '138 PPI (Ultra-sharp)' },
      { feature: 'GPU Requirement', itemA: 'Medium to High', itemB: 'Top-tier High End GPU required' }
    ],
    itemAPros: [
      'Easier to achieve high 120Hz-165Hz framerates in modern AAA games',
      'Excellent pixel density for 27-inch monitors',
      'More affordable high-refresh rate monitors'
    ],
    itemACons: [
      'Slightly lower fine detail than 4K on 32-inch or larger displays'
    ],
    itemBPros: [
      'Incredible razor-sharp detail for 32-inch+ screens and large TVs',
      'Native playback for 4K video content on YouTube, Netflix, and Blu-ray',
      'Maximum desktop workspace real estate'
    ],
    itemBCons: [
      'Very demanding GPU rendering power needed for high-fps 4K gaming',
      'Higher display cost'
    ],
    useCases: {
      itemA: [
        'High refresh rate gaming (144Hz+) on 27-inch monitors',
        'Balanced gaming and work workstations'
      ],
      itemB: [
        '4K video editing and high-resolution photo editing',
        'Immersive single-player gaming on 32-inch monitors or 4K OLED TVs'
      ]
    },
    recommendations: {
      chooseAIf: [
        'You prioritize high framerates (144FPS+) in competitive PC games',
        'You use a 27-inch monitor'
      ],
      chooseBIf: [
        'You work with 4K video editing, CAD design, or high-res photography',
        'You play immersive games on a 32-inch display or TV with a flagship GPU'
      ]
    },
    faqs: [
      {
        question: 'How many pixels is 4K compared to 1440p?',
        answer: '4K (8.29 million pixels) has 2.25 times as many pixels as 1440p (3.68 million pixels).'
      }
    ],
    meta: {
      title: '1440p vs 4K Resolution Comparison: Which Is Best for Gaming & Media?',
      description: 'Compare 1440p QHD vs 4K UHD resolutions. Benchmark pixel counts, performance hit on GPUs, text clarity, and monitor screen size selection.',
      keywords: ['1440p vs 4k', '2560x1440 vs 3840x2160', 'is 4k better than 1440p', '4k gaming performance']
    }
  },
  'portrait-vs-landscape': {
    slug: 'portrait-vs-landscape',
    title: 'Portrait vs Landscape Orientation & Aspect Ratios',
    itemAName: 'Landscape (Horizontal)',
    itemBName: 'Portrait (Vertical)',
    itemARatio: { w: 16, h: 9 },
    itemBRatio: { w: 9, h: 16 },
    overview: 'Landscape orientation (wider than tall) is designed for human binocular vision on TV screens and desktop monitors. Portrait orientation (taller than wide) is the primary format for handheld smartphone feeds and vertical print media.',
    specsTable: [
      { feature: 'Orientation Shape', itemA: 'Horizontal (Width > Height)', itemB: 'Vertical (Height > Width)' },
      { feature: 'Common Aspect Ratios', itemA: '16:9, 21:9, 4:3, 3:2', itemB: '9:16, 4:5, 1:1, 9:19.5' },
      { feature: 'Primary Devices', itemA: 'TVs, Laptops, Monitors, Cameras', itemB: 'Smartphones, Tablets, Print Posters' },
      { feature: 'Primary Platforms', itemA: 'YouTube, Netflix, Twitch, Desktop', itemB: 'TikTok, Instagram Reels, Shorts' }
    ],
    itemAPros: [
      'Optimal format for natural human horizontal visual field',
      'Standard for cinema, broadcast TV, and desktop computing'
    ],
    itemACons: [
      'Requires smartphone rotation when viewed on mobile devices'
    ],
    itemBPros: [
      'Occupies 100% of mobile phone screens naturally without device rotation',
      'Drives higher mobile feed engagement algorithms'
    ],
    itemBCons: [
      'Awkward pillarboxed display when viewed on desktop screens or TVs'
    ],
    useCases: {
      itemA: [
        'Horizontal video production and widescreen movies',
        'Desktop computer monitors and TV broadcasting'
      ],
      itemB: [
        'Short-form vertical video (TikTok, Instagram Reels, YouTube Shorts)',
        'Portrait photo prints and mobile app feeds'
      ]
    },
    recommendations: {
      chooseAIf: [
        'Your target audience views content on desktop monitors, TVs, or laptops'
      ],
      chooseBIf: [
        'Your target audience views content on mobile smartphones held vertically'
      ]
    },
    faqs: [
      {
        question: 'What is the main difference between portrait and landscape aspect ratio?',
        answer: 'Landscape width is greater than height (e.g. 16:9), whereas portrait height is greater than width (e.g. 9:16).'
      }
    ],
    meta: {
      title: 'Portrait vs Landscape Aspect Ratio: Dimensions & Best Use Cases',
      description: 'Learn the differences between Portrait and Landscape aspect ratios. Understand how orientation impacts video production, mobile apps, and photography.',
      keywords: ['portrait vs landscape aspect ratio', 'vertical vs horizontal video', 'portrait image dimensions', 'landscape resolution']
    }
  },
  'instagram-post-vs-reel': {
    slug: 'instagram-post-vs-reel',
    title: 'Instagram Post vs Reel Aspect Ratio & Dimensions (2026)',
    itemAName: 'Instagram Post (4:5 / 1:1)',
    itemBName: 'Instagram Reel (9:16)',
    itemARatio: { w: 4, h: 5 },
    itemBRatio: { w: 9, h: 16 },
    overview: 'Instagram Feed Posts support Square (1:1 - 1080x1080) and Portrait (4:5 - 1080x1350). Instagram Reels use full-screen vertical (9:16 - 1080x1920) to maximize mobile immersion.',
    specsTable: [
      { feature: 'Aspect Ratio', itemA: '4:5 Portrait or 1:1 Square', itemB: '9:16 Vertical Full Screen' },
      { feature: 'Optimal Resolution', itemA: '1080 x 1350 px (4:5) / 1080 x 1080 px (1:1)', itemB: '1080 x 1920 px (9:16)' },
      { feature: 'Feed Display Area', itemA: 'Center Feed Card', itemB: 'Full Mobile Viewport + Feed Tab' },
      { feature: 'Content Type', itemA: 'Photos, Carousels, Short Clips', itemB: 'Short-Form Immersive Video' }
    ],
    itemAPros: [
      'High visual sharpness without UI button overlaps',
      'Ideal for photo carousels and infographics'
    ],
    itemACons: [
      'Does not fill full mobile screen'
    ],
    itemBPros: [
      'Fills 100% of mobile screen for maximum retention',
      'Favored heavily by Instagram discovery algorithm'
    ],
    itemBCons: [
      'Bottom and right edges overlap with UI buttons and text overlays'
    ],
    useCases: {
      itemA: [
        'Multi-slide photo carousels and educational guides',
        'Product photos and announcements'
      ],
      itemB: [
        'Trending video clips, tutorials, and short video reels'
      ]
    },
    recommendations: {
      chooseAIf: [
        'You are sharing high-res photography, infographics, or carousels'
      ],
      chooseBIf: [
        'You are sharing engaging short videos to reach new audiences'
      ]
    },
    faqs: [
      {
        question: 'Will Instagram crop a 16:9 video in Reels?',
        answer: 'Yes! Instagram Reels forces a 9:16 vertical ratio. Horizontal 16:9 videos will be cropped or pillarboxed.'
      }
    ],
    meta: {
      title: 'Instagram Post vs Reel Dimensions & Aspect Ratios (2026 Guide)',
      description: 'Master Instagram dimensions: compare 4:5 / 1:1 Feed Posts vs 9:16 Reels. Learn exact pixel sizes to prevent auto-cropping on Instagram.',
      keywords: ['instagram post vs reel dimensions', 'instagram post aspect ratio', 'instagram reel size 9 16', '1080x1350 vs 1080x1920']
    }
  }
};
