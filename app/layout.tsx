import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Samyak Shende | UI/UX Designer & Frontend Developer",
  description: "Interactive portfolio showcasing UI/UX design, frontend development, and creative projects. Featuring Three.js animations and modern web technologies.",
  keywords: [
    "UI/UX Designer",
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "Three.js",
    "Portfolio",
    "Web Design",
    "Interactive Design",
    "Samyak Shende"
  ],
  authors: [{ name: "Samyak Shende" }],
  creator: "Samyak Shende",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samyak.dev",
    title: "Samyak Shende | UI/UX Designer & Frontend Developer",
    description: "Interactive portfolio showcasing creative web experiences with Three.js and modern technologies.",
    siteName: "Samyak Shende Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samyak Shende | UI/UX Designer & Frontend Developer",
    description: "Interactive portfolio showcasing creative web experiences",
    creator: "@samyak",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to optimize font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Additional meta tags */}
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="skip-to-content"
        >
          Skip to main content
        </a>

        {/* Main content wrapper */}
        <div id="main-content">
          {children}
        </div>

        {/* Screen reader announcement for dynamic content */}
        <div 
          className="sr-only" 
          role="status" 
          aria-live="polite" 
          aria-atomic="true"
        />
      </body>
    </html>
  );
}