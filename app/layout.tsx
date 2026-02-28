import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GlobalProvider } from "@/components/GlobalContext";
import Navbar from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import FloatingBar from "@/components/FloatingBar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Personal Portfolio and Digital Garden",
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
            <div className="flex flex-col min-h-screen relative">
              <ScrollProgress />
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <FloatingBar />
            </div>
          </GlobalProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
