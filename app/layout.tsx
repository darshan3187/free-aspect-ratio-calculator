import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freeaspectratiocalculator.com"),
  title: {
    default: "Aspect Ratio Calculator — 16:9, 4:3, Pixels & Inches Online",
    template: "%s | Aspect Ratio Calculator",
  },
  description:
    "Free online aspect ratio calculator to calculate 16:9, 4:3, and 16x9 image & screen dimensions in pixels and inches. Features real-time visual canvas, social media presets, and 100% browser privacy.",
  keywords: [
    "aspect ratio calculator",
    "16:9 aspect ratio calculator",
    "image aspect ratio calculator",
    "16x9 aspect ratio calculator",
    "aspect ratio calculator inches",
    "aspect ratio calculator pixels",
    "calculate aspect ratio",
    "how to calculate aspect ratio",
    "aspect ratio calculator online",
    "4:3 aspect ratio calculator",
    "screen aspect ratio calculator",
    "resize image aspect ratio",
    "online aspect calculator",
  ],
  authors: [{ name: "Aspect Ratio Calculator Studio" }],
  creator: "Aspect Ratio Calculator Studio",
  publisher: "Aspect Ratio Calculator Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/logo.webp",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://freeaspectratiocalculator.com",
    siteName: "Aspect Ratio Calculator",
    title: "Aspect Ratio Calculator — 16:9, 4:3, Pixels & Inches Online",
    description:
      "Free online aspect ratio calculator to calculate 16:9, 4:3, and 16x9 image & screen dimensions in pixels and inches. 100% client-side browser privacy.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Aspect Ratio Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aspect Ratio Calculator — 16:9, 4:3, Pixels & Inches Online",
    description:
      "Free online aspect ratio calculator to calculate 16:9, 4:3, and 16x9 image & screen dimensions in pixels and inches.",
    images: ["/og-image.webp"],
  },
  verification: {
    google: "IFEo_oGRlJ6YFwXZi7UfcC2USeVgLbPlNWKjuDhJaVk",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-7MVDEVKNT2`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-7MVDEVKNT2');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#000000] text-[#a1a1a1] antialiased selection:bg-white selection:text-black min-h-screen flex flex-col justify-between`}
      >
        <div className="relative min-h-screen flex flex-col justify-between">
          <div className="hero-mesh-bg" />
          <div className="relative z-10">{children}</div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
