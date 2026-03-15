import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/ThemeProvider";
import { GlobalProvider } from "@/components/GlobalContext";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TopNavigation } from "@/components/TopNavigation";
import { FixedThemeToggle } from "@/components/FixedThemeToggle";
import FloatingBar from "@/components/FloatingBar";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vectorbuilds.dev"),
  title: {
    default: "Vatsal Vora | Full-Stack Engineer & Product Architect",
    template: "%s | Vatsal Vora",
  },
  description: "Personal Portfolio and Digital Garden of Vatsal Vora. I build products that don't just look good, but actually work when it matters.",
  keywords: ["Vatsal Vora", "Software Engineer", "Full-Stack Developer", "Product Architect", "Next.js", "React", "Portfolio", "Digital Garden"],
  authors: [{ name: "Vatsal Vora", url: "https://vectorbuilds.dev" }],
  creator: "Vatsal Vora",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vectorbuilds.dev",
    title: "Vatsal Vora | Full-Stack Engineer",
    description: "Personal Portfolio and Digital Garden of Vatsal Vora. I build products that don't just look good, but actually work when it matters.",
    siteName: "Vatsal Vora Portfolio",
    images: [{
      url: "/images/avatar.png",
      width: 800,
      height: 800,
      alt: "Vatsal Vora Avatar",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vatsal Vora | Full-Stack Engineer",
    description: "Personal Portfolio and Digital Garden of Vatsal Vora. I build products that don't just look good, but actually work when it matters.",
    creator: "@vatsal30",
    images: ["/images/avatar.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalProvider>
            <div className="flex flex-col min-h-screen relative pb-24 md:pb-0">
              <ScrollProgress />
              <TopNavigation />
              <FixedThemeToggle />

              <main className="flex-grow">{children}</main>
              <Footer />
              <FloatingBar />
            </div>
          </GlobalProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
