# Free Aspect Ratio Calculator

[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

An online aspect ratio calculator built with Next.js 15, React 19, TypeScript, and Tailwind CSS. It helps designers, developers, and creators quickly calculate and scale dimensions in pixels and inches while preserving exact proportions.

**Live Web Application:** [free-aspect-ratio-calculator.vercel.app](https://free-aspect-ratio-calculator.vercel.app)

---

## Features

- **Real-Time Calculation**: Automatically computes target width or height as you type.
- **Pixels & Inches Support**: Easily switch between pixel (`px`) and physical inch (`in`) measurements.
- **Visual Crop Canvas**: Preview image crops with focal point positioning and custom image uploads.
- **Image Inspector**: Drag and drop any image to automatically detect its dimensions and aspect ratio.
- **Social & Display Presets**: Quick-select common ratios for YouTube (16:9), Instagram (1:1, 4:5), TikTok (9:16), 4K monitors, and print.
- **Code Exporter**: Generate ready-to-copy CSS (`aspect-ratio`), Tailwind CSS classes, HTML `<picture>`, and SVG `viewBox` code.
- **Scale Table Generator**: View proportional dimensions across various resolution scales (0.25x to 4x).
- **100% Client-Side Privacy**: All processing runs locally in your browser. No images are uploaded to external servers.

---

## Getting Started

### Prerequisites

- Node.js version 18.17.0 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/darshan3187/free-aspect-ratio-calculator.git
   cd free-aspect-ratio-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```text
├── app/                  # Next.js App Router pages and layouts
│   ├── [slug]/           # Dynamic ratio and guide pages
│   ├── compare/          # Ratio comparison tool
│   ├── guides/           # Educational guides
│   ├── layout.tsx        # Root layout and SEO metadata
│   └── page.tsx          # Homepage entry point
├── src/
│   ├── components/       # UI components (Calculator, Canvas, Code Exporter)
│   ├── data/             # Ratios, guides, and comparison dataset
│   └── utils/            # Helper utilities and math functions
└── public/               # Static assets (favicons, manifest, images)
```

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

---

## Available Scripts

- `npm run dev`: Starts the local development server.
- `npm run build`: Builds the production bundle.
- `npm run start`: Runs the production server.
- `npm run lint`: Runs ESLint for code quality checks.

---

## License

This project is open source and available under the [MIT License](LICENSE).


